/**
 * Worker in front of the static export.
 *
 * Static assets are served first and never touch this code. The only route
 * handled here is /api/github, which proxies the public GitHub API so the
 * homepage can show live activity.
 *
 * Why proxy instead of calling GitHub from the browser:
 *  - one shared edge cache instead of one API call per visitor
 *  - the unauthenticated GitHub limit (60/hr/IP) is spent once per cache miss
 *  - the response can be reshaped, so the client ships less code
 *
 * On any upstream failure it serves the last good cached payload rather than
 * an error, so the homepage degrades to slightly stale numbers, never broken.
 */

// Minimal local declarations, so this file needs no @cloudflare/workers-types
// dependency and never enters the Next.js type-check.
interface Fetcher {
  fetch(request: Request): Promise<Response>;
}
interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
}
declare const caches: { default: Cache };

interface Env {
  ASSETS: Fetcher;
  /*
   * logo.dev token, set with `wrangler secret put LOGO_DEV_TOKEN`.
   * Deliberately never committed and never sent to the browser: requests are
   * proxied through /api/logo so the token stays server-side. logo.dev treats
   * the publishable key as safe to expose, but proxying keeps it out of page
   * source, out of git, and out of anyone's devtools.
   */
  LOGO_DEV_TOKEN?: string;
  /*
   * Optional read-only GitHub token, set with `wrangler secret put GITHUB_TOKEN`.
   *
   * Without it these calls are anonymous, and anonymous means 60 core requests
   * per hour *per IP* — where the IP is Cloudflare's shared egress, spent by
   * every other Worker on it. In practice the core endpoints (/users/:login,
   * /users/:login/repos) are throttled to a permanent 403 at the edge while the
   * search endpoints, which have their own per-minute budget, keep answering.
   * That is why live data could arrive with holes in it.
   *
   * A token raises core to 5,000/hr and search to 30/min, which removes the
   * problem rather than working around it. It needs no scopes: public read is
   * enough. The token stays server-side; nothing here is ever sent to the
   * browser.
   */
  GITHUB_TOKEN?: string;
}

const USER = "vinayreddykalluri";
const TTL_SECONDS = 600; // 10 minutes
const STALE_KEY = "https://cache.internal/github-last-good";

const GH_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": `${USER}-site`,
};

type RecentCommit = {
  repo: string;
  message: string;
  date: string;
  url: string;
};

/**
 * A fetch that reports why it failed.
 *
 * The status is kept because "GitHub said 403 rate limit" and "GitHub has no
 * such user" need different responses, and because a partial failure has to be
 * visible in the response headers instead of silently becoming a null on the
 * page.
 */
type Fetched<T> = { status: number; data: T | null };

async function ghJson<T>(url: string, token?: string): Promise<Fetched<T>> {
  try {
    const res = await fetch(url, {
      headers: token ? { ...GH_HEADERS, Authorization: `Bearer ${token}` } : GH_HEADERS,
    });
    if (!res.ok) return { status: res.status, data: null };
    return { status: res.status, data: (await res.json()) as T };
  } catch {
    return { status: 0, data: null };
  }
}

type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  fork: boolean;
  pushed_at: string;
};

type PrSearch = {
  total_count: number;
  items?: Array<{
    title: string;
    html_url: string;
    state: string;
    repository_url: string;
    created_at: string;
    pull_request?: { merged_at?: string | null };
  }>;
};

type CommitSearch = {
  total_count: number;
  items?: Array<{
    html_url: string;
    repository: { name: string };
    commit: { message: string; author: { date: string } };
  }>;
};

function isoDaysAgo(days: number) {
  return new Date(Date.now() - days * 24 * 3600 * 1000).toISOString().slice(0, 10);
}

/**
 * Assembles the live payload.
 *
 * Two rules hold everything together:
 *
 *  1. A field whose source failed is *omitted*, never set to null. The client
 *     merges this over the build-time snapshot, so an omitted field keeps its
 *     last known good value. Sending `publicRepos: null` instead used to
 *     overwrite a perfectly good 20 with an em dash, and `featured: []` made
 *     the projects grid vanish the moment the live fetch succeeded — the live
 *     call actively made the page worse than no live call at all.
 *
 *  2. Where a core endpoint has a search-API equivalent, the search API is the
 *     fallback. Core and search have separate rate-limit budgets, so when the
 *     shared edge IP has burned its anonymous core quota, search still answers.
 */
async function buildPayload(env: Env) {
  const since = isoDaysAgo(90);
  const token = env.GITHUB_TOKEN;

  /*
   * The public events feed no longer carries commit counts — GitHub stripped
   * `size`, `distinct_size` and `commits` from PushEvent payloads, so it can
   * only tell you that a push happened, not how big it was. The commit search
   * API gives real counts and the commits themselves, so everything comes
   * from there instead.
   */
  const [user, recent, windowed, repos, prs] = await Promise.all([
    ghJson<Record<string, unknown>>(`https://api.github.com/users/${USER}`, token),
    ghJson<CommitSearch>(
      `https://api.github.com/search/commits?q=author:${USER}&sort=author-date&order=desc&per_page=6`,
      token,
    ),
    ghJson<CommitSearch>(
      `https://api.github.com/search/commits?q=author:${USER}+author-date:%3E${since}&per_page=1`,
      token,
    ),
    ghJson<Repo[]>(
      `https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`,
      token,
    ),
    // Pull requests raised against repositories the user does not own — the
    // clearest signal of upstream open-source contribution.
    ghJson<PrSearch>(
      `https://api.github.com/search/issues?q=author:${USER}+type:pr&sort=updated&order=desc&per_page=30`,
      token,
    ),
  ]);

  // Repository search covers for the owned-repos endpoint when core is
  // throttled. It indexes fewer repositories than the profile reports (empty
  // ones never make the index), so it stands in for the *list*, never for the
  // count — an invented count is worse than yesterday's real one.
  let repoList = repos.data;
  const repoSearch = repoList
    ? null
    : await ghJson<{ total_count: number; items?: Repo[] }>(
        `https://api.github.com/search/repositories?q=user%3A${USER}&sort=stars&order=desc&per_page=100`,
        token,
      );
  if (!repoList && repoSearch?.data?.items) repoList = repoSearch.data.items;

  const sources: Record<string, number> = {
    user: user.status,
    commits: recent.status,
    commitsWindow: windowed.status,
    repos: repos.status,
    pullRequests: prs.status,
  };
  if (repoSearch) sources.repoSearch = repoSearch.status;

  if (!user.data && !recent.data && !repoList) return null;

  const recentCommits: RecentCommit[] = (recent.data?.items ?? []).map((item) => ({
    repo: item.repository.name,
    message: item.commit.message.split("\n")[0].slice(0, 90),
    date: item.commit.author.date,
    url: item.html_url,
  }));

  // Rank owned repositories by signal (stars, forks, then recency) so the
  // homepage leads with real projects rather than whatever was pushed last.
  const featured = (repoList ?? [])
    .filter((r) => !r.fork && r.name !== USER && r.description)
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        b.forks_count - a.forks_count ||
        Date.parse(b.pushed_at) - Date.parse(a.pushed_at),
    )
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      topics: (r.topics ?? []).slice(0, 4),
      pushedAt: r.pushed_at,
    }));

  /*
   * A closed pull request is not the same as a rejected one. Several projects
   * — Spring among them — rebase a contribution in rather than using GitHub's
   * merge button, which leaves the PR `closed` with `merged: false` even though
   * the commit is in the branch. Labelling that "closed" on a portfolio reads
   * as rejected, so each closed PR is checked against the repository's commit
   * history for commits authored by this user; if any exist, the contribution
   * landed, and the commit also supplies the date it actually landed.
   *
   * That date matters: the PR's own `created_at` is when it was *opened*, so
   * rendering it beside the word "merged" claimed a contribution had landed
   * three weeks before it did.
   */
  const upstreamRaw = (prs.data?.items ?? [])
    .filter((pr) => !pr.repository_url.includes(`/repos/${USER}/`))
    .slice(0, 5);

  const upstream = await Promise.all(
    upstreamRaw.map(async (pr) => {
      const repo = pr.repository_url.split("/repos/")[1] ?? "";
      const mergedAt = pr.pull_request?.merged_at ?? null;

      let landed = Boolean(mergedAt);
      let landedAt = mergedAt;

      if (!landed && pr.state === "closed" && repo) {
        const authored = await ghJson<
          Array<{ commit?: { message?: string; committer?: { date?: string } } }>
        >(`https://api.github.com/repos/${repo}/commits?author=${USER}&per_page=5`, token);

        const commits = authored.data ?? [];
        // Prefer the commit whose subject matches the PR title: a rebase keeps
        // the title, so this ties the right commit to the right PR when there
        // is more than one contribution to the same repository.
        const match =
          commits.find(
            (c) => (c.commit?.message ?? "").split("\n")[0].trim() === pr.title.trim(),
          ) ?? commits[0];

        if (match) {
          landed = true;
          landedAt = match.commit?.committer?.date ?? null;
        }
      }

      return {
        title: pr.title,
        url: pr.html_url,
        repo,
        createdAt: pr.created_at,
        landedAt,
        state: pr.state,
        landed,
      };
    }),
  );

  // Only fields that actually resolved are emitted; see rule 1 above.
  const payload: Record<string, unknown> = {
    ok: true,
    updatedAt: new Date().toISOString(),
    login: (user.data?.login as string) ?? USER,
    url: (user.data?.html_url as string) ?? `https://github.com/${USER}`,
    sources,
    auth: token ? "token" : "anon",
  };

  const put = (key: string, value: unknown) => {
    if (value === null || value === undefined) return;
    if (Array.isArray(value) && value.length === 0) return;
    payload[key] = value;
  };

  put("publicRepos", user.data?.public_repos as number | undefined);
  put("followers", user.data?.followers as number | undefined);
  put("memberSince", user.data?.created_at as string | undefined);
  put("commits", recent.data?.total_count);
  put("commitsLast90", windowed.data?.total_count);
  put("pullRequests", prs.data?.total_count);
  put("lastActiveAt", recentCommits[0]?.date);
  put("recentCommits", recentCommits);
  put("featured", featured);
  put("upstream", upstream);

  // Anything the client still has to take from its own snapshot, named.
  payload.degraded = [
    "publicRepos",
    "commits",
    "commitsLast90",
    "pullRequests",
    "recentCommits",
    "featured",
    "upstream",
  ].filter((key) => !(key in payload));

  return payload;
}

async function handleGithub(
  ctx: ExecutionContext,
  env: Env,
  url: URL,
): Promise<Response> {
  /*
   * ?debug=1 bypasses the cache and reports the HTTP status of every upstream
   * call, whether a token is in use, and the remaining rate-limit budget. It
   * exposes no secret and no private data — just enough to tell "the GitHub
   * connection is throttled" apart from "the data really is that old", which
   * otherwise looks identical from the outside.
   */
  if (url.searchParams.get("debug") === "1") {
    const token = env.GITHUB_TOKEN;
    const limits = await ghJson<{
      resources?: Record<string, { limit: number; remaining: number; reset: number }>;
    }>("https://api.github.com/rate_limit", token);
    const payload = await buildPayload(env);

    return new Response(
      JSON.stringify(
        {
          auth: token ? "token" : "anon",
          rateLimit: limits.data?.resources
            ? {
                core: limits.data.resources.core,
                search: limits.data.resources.search,
              }
            : { error: limits.status },
          sources: payload?.sources ?? null,
          degraded: payload?.degraded ?? null,
        },
        null,
        2,
      ),
      {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store",
        },
      },
    );
  }

  const cache = caches.default;
  // The version moves whenever the payload shape changes, so a deploy is never
  // read through the previous shape's cached body.
  const key = new Request(`https://cache.internal/github?v=4`);

  const hit = await cache.match(key);
  if (hit) return hit;

  const payload = await buildPayload(env);

  if (!payload) {
    // Upstream failed (rate limit, outage). Serve the last good payload if we
    // still have one; otherwise tell the client to keep its own fallback.
    const stale = await cache.match(new Request(STALE_KEY));
    if (stale) {
      const body = await stale.text();
      return new Response(body, {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "public, max-age=60",
          "x-github-source": "stale",
        },
      });
    }
    return new Response(JSON.stringify({ ok: false }), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=60",
      },
    });
  }

  const degraded = (payload.degraded as string[]) ?? [];
  const body = JSON.stringify(payload);
  const response = new Response(body, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      // A partial payload is cached for one minute, not ten: it is worth
      // retrying soon, since the usual cause is a rate limit that resets.
      "cache-control": `public, max-age=${degraded.length ? 60 : TTL_SECONDS}`,
      "x-github-source": "live",
      "x-github-auth": payload.auth as string,
      "x-github-degraded": degraded.length ? degraded.join(",") : "none",
    },
  });

  ctx.waitUntil(cache.put(key, response.clone()));
  ctx.waitUntil(
    cache.put(
      new Request(STALE_KEY),
      new Response(body, {
        headers: {
          "content-type": "application/json; charset=utf-8",
          // Keep a long-lived copy purely as a failure fallback.
          "cache-control": "public, max-age=604800",
        },
      }),
    ),
  );

  return response;
}

const LOGO_TTL = 60 * 60 * 24 * 30; // 30 days; corporate marks rarely change

/** Only ever proxy plain hostnames, so this can't be used as an open relay. */
function isSafeDomain(value: string) {
  return /^[a-z0-9.-]{3,80}$/i.test(value) && value.includes(".") && !value.includes("..");
}

async function handleLogo(url: URL, env: Env): Promise<Response> {
  const domain = url.searchParams.get("d") ?? "";
  if (!isSafeDomain(domain)) return new Response("Bad domain", { status: 400 });

  // No token configured yet — 404 so the component falls back to its monogram
  // rather than rendering a broken image. The header says why, so "key not
  // set" is never confused with "logo not found" when debugging.
  if (!env.LOGO_DEV_TOKEN) {
    return new Response("Not configured", {
      status: 404,
      headers: { "x-logo-status": "no-token" },
    });
  }

  const size = Math.min(Number(url.searchParams.get("s") ?? 128) || 128, 512);
  const upstream = new URL(`https://img.logo.dev/${domain}`);
  upstream.searchParams.set("token", env.LOGO_DEV_TOKEN);
  upstream.searchParams.set("size", String(size));
  upstream.searchParams.set("format", "png");
  upstream.searchParams.set("retina", "true");

  const res = await fetch(upstream.toString(), {
    cf: { cacheTtl: LOGO_TTL, cacheEverything: true },
  });
  if (!res.ok) {
    // 401 means the token is wrong or revoked; anything else means logo.dev
    // has no mark for this domain. Both fall back to a monogram, but the
    // header distinguishes them without ever echoing the token.
    const reason = res.status === 401 ? "bad-token" : `upstream-${res.status}`;
    return new Response("Not found", {
      status: 404,
      headers: { "x-logo-status": reason },
    });
  }

  return new Response(res.body, {
    headers: {
      "content-type": res.headers.get("content-type") ?? "image/png",
      "cache-control": `public, max-age=${LOGO_TTL}, immutable`,
      "x-logo-status": "ok",
    },
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/logo") {
      if (request.method !== "GET") {
        return new Response("Method Not Allowed", { status: 405 });
      }
      return handleLogo(url, env);
    }

    if (url.pathname === "/api/github") {
      if (request.method !== "GET") {
        return new Response("Method Not Allowed", { status: 405 });
      }
      return handleGithub(ctx, env, url);
    }

    // Everything else falls back to the static export, which keeps the
    // configured trailing-slash and 404-page behaviour.
    return env.ASSETS.fetch(request);
  },
};
