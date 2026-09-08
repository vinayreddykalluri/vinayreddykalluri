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
};

async function json(url) {
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

try {
  const [user, repos, commits] = await Promise.all([
    json(`https://api.github.com/users/${USER}`),
    json(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`),
    json(`https://api.github.com/search/commits?q=author:${USER}&per_page=1`).catch(
      () => ({ total_count: null }),
    ),
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

  const recent = repos
    .filter((r) => !r.fork)
    .slice(0, 4)
    .map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
      url: r.html_url,
    }));

  const data = {
    fetchedAt: new Date().toISOString(),
    login: user.login,
    url: user.html_url,
    publicRepos: user.public_repos,
    followers: user.followers,
    memberSince: user.created_at,
    commits: commits.total_count,
    topLanguages: topLanguages.map((l) => ({
      ...l,
      share: Math.round((l.count / totalLangRepos) * 100),
    })),
    recent,
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
