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

async function ghJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: GH_HEADERS });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
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

async function buildPayload() {
  const since = isoDaysAgo(90);

  /*
   * The public events feed no longer carries commit counts — GitHub stripped
   * `size`, `distinct_size` and `commits` from PushEvent payloads, so it can
   * only tell you that a push happened, not how big it was. The commit search
   * API gives real counts and the commits themselves, so everything comes
   * from there instead.
   */
  const [user, recent, windowed, repos, prs] = await Promise.all([
    ghJson<Record<string, unknown>>(`https://api.github.com/users/${USER}`),
    ghJson<CommitSearch>(
      `https://api.github.com/search/commits?q=author:${USER}&sort=author-date&order=desc&per_page=6`,
    ),
    ghJson<CommitSearch>(
      `https://api.github.com/search/commits?q=author:${USER}+author-date:%3E${since}&per_page=1`,
    ),
    ghJson<Repo[]>(
      `https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`,
    ),
    // Pull requests raised against repositories the user does not own — the
    // clearest signal of upstream open-source contribution.
    ghJson<PrSearch>(
      `https://api.github.com/search/issues?q=author:${USER}+type:pr&sort=updated&order=desc&per_page=30`,
    ),
  ]);

  if (!user && !recent) return null;

  const recentCommits: RecentCommit[] = (recent?.items ?? []).map((item) => ({
    repo: item.repository.name,
    message: item.commit.message.split("\n")[0].slice(0, 90),
    date: item.commit.author.date,
    url: item.html_url,
  }));

  // Rank owned repositories by signal (stars, forks, then recency) so the
  // homepage leads with real projects rather than whatever was pushed last.
  const featured = (repos ?? [])
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

  const upstream = (prs?.items ?? [])
    .filter((pr) => !pr.repository_url.includes(`/repos/${USER}/`))
    .slice(0, 5)
    .map((pr) => ({
      title: pr.title,
      url: pr.html_url,
      state: pr.state,
      repo: pr.repository_url.split("/repos/")[1] ?? "",
      createdAt: pr.created_at,
    }));

  return {
    ok: true,
    updatedAt: new Date().toISOString(),
    login: (user?.login as string) ?? USER,
    url: (user?.html_url as string) ?? `https://github.com/${USER}`,
    publicRepos: (user?.public_repos as number) ?? null,
    followers: (user?.followers as number) ?? null,
    memberSince: (user?.created_at as string) ?? null,
    commits: recent?.total_count ?? null,
    commitsLast90: windowed?.total_count ?? null,
    lastActiveAt: recentCommits[0]?.date ?? null,
    recentCommits,
    featured,
    upstream,
    pullRequests: prs?.total_count ?? null,
  };
}

async function handleGithub(ctx: ExecutionContext): Promise<Response> {
  const cache = caches.default;
  const key = new Request(`https://cache.internal/github?v=3`);

  const hit = await cache.match(key);
  if (hit) return hit;

  const payload = await buildPayload();

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

  const body = JSON.stringify(payload);
  const response = new Response(body, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": `public, max-age=${TTL_SECONDS}`,
      "x-github-source": "live",
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

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/github") {
      if (request.method !== "GET") {
        return new Response("Method Not Allowed", { status: 405 });
      }
      return handleGithub(ctx);
    }

    // Everything else falls back to the static export, which keeps the
    // configured trailing-slash and 404-page behaviour.
    return env.ASSETS.fetch(request);
  },
};
