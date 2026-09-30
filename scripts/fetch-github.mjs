// Pulls public GitHub stats at build time and writes them into the static
// export, so the homepage shows real numbers without any client-side API call.
//
// Fail-safe by design: on any network or rate-limit error the existing
// src/data/github.json is kept and the build continues. Never blocks a deploy.

import { writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const USER = "vinayreddykalluri";
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../src/data/github.json");

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": `${USER}-site-build`,
  // Optional: raises the anonymous 60/hr limit to 5,000/hr. Needed if this ever
  // runs from shared CI addresses, where the anonymous budget is already spent.
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

async function json(url) {
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

try {
  const since = new Date(Date.now() - 90 * 864e5).toISOString().slice(0, 10);
  const [user, repos, commits, windowed, prs] = await Promise.all([
    json(`https://api.github.com/users/${USER}`),
    json(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`),
    json(
      `https://api.github.com/search/commits?q=author:${USER}&sort=author-date&order=desc&per_page=6`,
    ).catch(() => ({ total_count: null, items: [] })),
    json(
      `https://api.github.com/search/commits?q=author:${USER}+author-date:%3E${since}&per_page=1`,
    ).catch(() => ({ total_count: null })),
    json(
      `https://api.github.com/search/issues?q=author:${USER}+type:pr&sort=updated&order=desc&per_page=30`,
    ).catch(() => ({ total_count: null, items: [] })),
  ]);

  const languages = {};
  for (const repo of repos) {
    if (repo.fork || !repo.language) continue;
    languages[repo.language] = (languages[repo.language] ?? 0) + 1;
  }

  const topLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }));

  const totalLangRepos = topLanguages.reduce((sum, l) => sum + l.count, 0) || 1;

  // Same ranking and shape the Worker uses, so the seeded markup and the live
  // payload render identically and the swap is invisible.
  const featured = repos
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

  // Mirrors the Worker: a closed PR is not a rejected one. Projects that
  // rebase contributions in leave the PR closed with merged=false even though
  // the commit is upstream, so each closed PR is checked against the repo's
  // commit history for commits authored by this user.
  const upstream = await Promise.all(
    (prs.items ?? [])
      .filter((pr) => !pr.repository_url.includes(`/repos/${USER}/`))
      .slice(0, 5)
      .map(async (pr) => {
        const repo = pr.repository_url.split("/repos/")[1] ?? "";
        const mergedAt = pr.pull_request?.merged_at ?? null;
        let landed = Boolean(mergedAt);
        let landedAt = mergedAt;

        if (!landed && pr.state === "closed" && repo) {
          const authored = await json(
            `https://api.github.com/repos/${repo}/commits?author=${USER}&per_page=5`,
          ).catch(() => []);
          const list = Array.isArray(authored) ? authored : [];
          // A rebase keeps the PR title as the commit subject, so matching on it
          // ties the right commit to the right PR when a repo has several.
          const match =
            list.find(
              (c) =>
                (c.commit?.message ?? "").split("\n")[0].trim() === pr.title.trim(),
            ) ?? list[0];
          if (match) {
            landed = true;
            landedAt = match.commit?.committer?.date ?? null;
          }
        }

        return {
          title: pr.title,
          url: pr.html_url,
          state: pr.state,
          repo,
          createdAt: pr.created_at,
          landedAt,
          landed,
        };
      }),
  );

  const recentCommits = (commits.items ?? []).map((item) => ({
    repo: item.repository.name,
    message: item.commit.message.split("\n")[0].slice(0, 90),
    date: item.commit.author.date,
    url: item.html_url,
  }));

  const data = {
    fetchedAt: new Date().toISOString(),
    login: user.login,
    url: user.html_url,
    publicRepos: user.public_repos,
    followers: user.followers,
    memberSince: user.created_at,
    commits: commits.total_count,
    commitsLast90: windowed.total_count ?? null,
    pullRequests: prs.total_count ?? null,
    lastActiveAt: recentCommits[0]?.date ?? null,
    topLanguages: topLanguages.map((l) => ({
      ...l,
      share: Math.round((l.count / totalLangRepos) * 100),
    })),
    recentCommits,
    featured,
    upstream,
  };

  await writeFile(OUT, `${JSON.stringify(data, null, 2)}\n`);
  console.log(
    `[github] ${data.commits ?? "?"} commits, ${data.publicRepos} repos, ${topLanguages.length} languages`,
  );
} catch (error) {
  console.warn(`[github] fetch failed (${error.message}); keeping existing data`);
  try {
    await readFile(OUT);
  } catch {
    // No cached file either — write an empty shape so the import still resolves
    // and the section renders nothing rather than breaking the build.
    await writeFile(
      OUT,
      `${JSON.stringify({ fetchedAt: null, commits: null, publicRepos: null, topLanguages: [], recent: [] }, null, 2)}\n`,
    );
  }
}
