import github from "@/data/github.json";

function yearsSince(iso: string | null) {
  if (!iso) return null;
  return Math.floor((Date.now() - new Date(iso).getTime()) / (365.25 * 24 * 3600 * 1000));
}

/**
 * Public GitHub activity, fetched at build time by scripts/fetch-github.mjs.
 * Every figure is real; the section hides itself if the fetch produced nothing.
 */
export function GithubStats() {
  if (!github.commits && !github.publicRepos) return null;

  const years = yearsSince(github.memberSince ?? null);
  const figures = [
    { value: github.commits?.toLocaleString() ?? "—", label: "Commits authored" },
    { value: String(github.publicRepos ?? "—"), label: "Public repositories" },
    { value: years ? `${years} yrs` : "—", label: "On GitHub" },
    { value: String(github.followers ?? "—"), label: "Followers" },
  ];

  const updated = github.fetchedAt
    ? new Date(github.fetchedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <section className="shell border-t border-[var(--border)] py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="kicker">Open source</span>
          <h2 className="display-lg mt-4 max-w-[16ch]">
            What I push, in public.
          </h2>
        </div>
        <a
          href={github.url ?? "https://github.com/vinayreddykalluri"}
          target="_blank"
          rel="noreferrer"
          className="spark-link px-6 py-3 text-sm"
        >
          @{github.login ?? "vinayreddykalluri"}
        </a>
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {figures.map((f) => (
          <div key={f.label} className="border-t-2 border-[color:var(--accent)] pt-5">
            <p className="stat-figure">{f.value}</p>
            <p className="data-label mt-3 text-[color:var(--faint)]">{f.label}</p>
          </div>
        ))}
      </div>

      {github.topLanguages?.length ? (
        <div className="mt-14">
          <p className="data-label text-[color:var(--faint)]">
            Languages across public repositories
          </p>
          <div
            className="mt-4 flex h-3 w-full overflow-hidden"
            role="img"
            aria-label={github.topLanguages
              .map((l) => `${l.name} ${l.share}%`)
              .join(", ")}
          >
            {github.topLanguages.map((lang, i) => (
              <span
                key={lang.name}
                style={{
                  width: `${lang.share}%`,
                  opacity: 1 - i * 0.13,
                }}
                className="block bg-[color:var(--accent)]"
              />
            ))}
          </div>
          <div className="signal-track mt-4">
            {github.topLanguages.map((lang) => (
              <span key={lang.name} className="signal-pill">
                {lang.name} {lang.share}%
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {github.recent?.length ? (
        <div className="mt-14 grid gap-px bg-[color:var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {github.recent.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="group bg-[color:var(--background)] p-6 transition-colors hover:bg-[color:var(--surface)]"
            >
              <p className="font-mono text-sm font-semibold text-[color:var(--accent-strong)]">
                {repo.name}
              </p>
              <p className="mt-2 line-clamp-3 text-[0.9rem] leading-relaxed text-[color:var(--muted)]">
                {repo.description ?? "No description"}
              </p>
              <p className="data-label mt-4 text-[color:var(--faint)]">
                {repo.language ?? "—"}
                {repo.stars ? ` · ★ ${repo.stars}` : ""}
              </p>
            </a>
          ))}
        </div>
      ) : null}

      {updated ? (
        <p className="data-label mt-8 text-[color:var(--faint)]">
          Fetched from the GitHub API at build time — {updated}
        </p>
      ) : null}
    </section>
  );
}
