"use client";

import { useEffect, useState } from "react";
import seed from "@/data/github.json";

type RecentCommit = { repo: string; message: string; date: string; url: string };
type Featured = {
  name: string; description: string | null; url: string; language: string | null;
  stars: number; forks: number; topics: string[]; pushedAt: string;
};
type Upstream = { title: string; url: string; state: string; repo: string; createdAt: string };

type Live = {
  ok?: boolean;
  updatedAt?: string;
  login?: string;
  url?: string;
  publicRepos?: number | null;
  followers?: number | null;
  memberSince?: string | null;
  commits?: number | null;
  commitsLast90?: number;
  lastActiveAt?: string | null;
  recentCommits?: RecentCommit[];
  featured?: Featured[];
  upstream?: Upstream[];
  pullRequests?: number | null;
};

function relative(iso?: string | null) {
  if (!iso) return null;
  const diff = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(diff)) return null;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  return months < 12 ? `${months}mo ago` : `${Math.round(months / 12)}y ago`;
}

function yearsSince(iso?: string | null) {
  if (!iso) return null;
  return Math.floor(
    (Date.now() - new Date(iso).getTime()) / (365.25 * 24 * 3600 * 1000),
  );
}

/**
 * Live GitHub activity.
 *
 * Renders the build-time snapshot immediately, then swaps in live data from
 * the Worker's /api/github route. Never shows a spinner or an empty state:
 * if the fetch fails the seeded figures simply stay.
 */
export function GithubStats() {
  const [live, setLive] = useState<Live | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Live | null) => {
        if (cancelled || !data || data.ok === false) return;
        setLive(data);
        setIsLive(true);
      })
      .catch(() => {
        /* keep the seeded values */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const data: Live = { ...seed, ...(live ?? {}) };
  const years = yearsSince(data.memberSince);
  const lastActive = relative(data.lastActiveAt);

  const figures = [
    { value: data.commits?.toLocaleString() ?? "—", label: "Commits authored" },
    {
      value: data.commitsLast90 != null ? String(data.commitsLast90) : "—",
      label: "Commits, last 90 days",
    },
    { value: String(data.publicRepos ?? "—"), label: "Public repositories" },
    {
      value: data.pullRequests != null ? String(data.pullRequests) : "—",
      label: "Pull requests opened",
    },
  ];

  return (
    <section className="shell border-t border-[var(--border)] py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="kicker">Open source</span>
          <h2 className="display-lg mt-4 max-w-[16ch]">
            What I push, in public.
          </h2>
          {lastActive ? (
            <p className="mt-4 inline-flex items-center gap-2.5 text-[color:var(--muted)]">
              <span
                className={`inline-block h-2 w-2 rounded-full bg-[color:var(--accent)] ${
                  isLive ? "animate-pulse" : ""
                }`}
                aria-hidden="true"
              />
              <span className="data-label">
                Last pushed {lastActive}
              </span>
            </p>
          ) : null}
        </div>
        <a
          href={data.url ?? "https://github.com/vinayreddykalluri"}
          target="_blank"
          rel="noreferrer"
          className="spark-link px-6 py-3 text-sm"
        >
          @{data.login ?? "vinayreddykalluri"}
        </a>
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {figures.map((f) => (
          <div
            key={f.label}
            className="border-t-2 border-[color:var(--accent)] pt-5"
          >
            <p className="stat-figure">{f.value}</p>
            <p className="data-label mt-3 text-[color:var(--faint)]">
              {f.label}
            </p>
          </div>
        ))}
      </div>

      {data.upstream?.length ? (
        <div className="mt-14">
          <p className="data-label text-[color:var(--faint)]">
            Upstream contributions
          </p>
          <ul className="mt-5 flex flex-col">
            {data.upstream.map((pr) => (
              <li key={pr.url} className="border-t border-[var(--border)]">
                <a
                  href={pr.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-5 transition-colors hover:text-[color:var(--accent-strong)]"
                >
                  <span className="font-mono text-sm text-[color:var(--accent-strong)]">
                    {pr.repo}
                  </span>
                  <span className="flex-1 text-[1.05rem] leading-snug">
                    {pr.title}
                  </span>
                  <span className="data-label text-[color:var(--faint)]">
                    {pr.state} · {relative(pr.createdAt)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {data.featured?.length ? (
        <div className="mt-14">
          <p className="data-label text-[color:var(--faint)]">
            Open-source projects
          </p>
          <div className="mt-5 grid gap-px bg-[color:var(--border)] sm:grid-cols-2 lg:grid-cols-3">
            {data.featured.map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-3 bg-[color:var(--background)] p-6 transition-colors hover:bg-[color:var(--surface)]"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-sm font-semibold text-[color:var(--accent-strong)]">
                    {repo.name}
                  </span>
                  {repo.stars > 0 ? (
                    <span className="data-label text-[color:var(--faint)]">
                      ★ {repo.stars}
                    </span>
                  ) : null}
                </div>
                <p className="text-[0.95rem] leading-relaxed text-[color:var(--muted)]">
                  {repo.description}
                </p>
                <div className="signal-track mt-auto pt-2">
                  {repo.language ? (
                    <span className="signal-pill">{repo.language}</span>
                  ) : null}
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="signal-pill">
                      {topic}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : null}

      {data.recentCommits?.length ? (
        <div className="mt-14">
          <p className="data-label text-[color:var(--faint)]">Latest commits</p>
          <ul className="mt-5 grid gap-px bg-[color:var(--border)] sm:grid-cols-2 lg:grid-cols-3">
            {data.recentCommits.slice(0, 6).map((commit) => (
              <li key={commit.url}>
                <a
                  href={commit.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-full flex-col justify-between gap-3 bg-[color:var(--background)] p-5 transition-colors hover:bg-[color:var(--surface)]"
                >
                  <p className="text-[0.95rem] leading-snug">
                    {commit.message}
                  </p>
                  <p className="data-label text-[color:var(--faint)]">
                    <span className="text-[color:var(--accent-strong)]">
                      {commit.repo}
                    </span>{" "}
                    · {relative(commit.date)}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="data-label mt-8 text-[color:var(--faint)]">
        {isLive
          ? "Live from the GitHub API, cached 10 minutes at the edge"
          : "From the last build"}
      </p>
    </section>
  );
}
