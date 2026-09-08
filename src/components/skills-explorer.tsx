"use client";

import { useMemo, useState } from "react";
import { CompanyLogo } from "@/components/company-logo";
import { Spotlight } from "@/components/spotlight";
import type { SkillUsage } from "@/lib/skill-usage";

/**
 * Skills as evidence rather than a list.
 *
 * Every item is cross-referenced against the work history, so a card can say
 * how many roles used it, since when, and at which companies — the difference
 * between claiming a technology and showing where it was used. Filtering and
 * search are client-side over data already in the page, so the full grid is
 * server-rendered and readable with no JavaScript.
 */
export function SkillsExplorer({
  usage,
  groups,
}: {
  usage: SkillUsage[];
  groups: { label: string; summary: string }[];
}) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<string | null>(null);
  const [provenOnly, setProvenOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return usage.filter((item) => {
      if (group && item.group !== group) return false;
      if (provenOnly && item.roleCount === 0) return false;
      if (q && !item.skill.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [usage, query, group, provenOnly]);

  const byGroup = useMemo(() => {
    const map = new Map<string, SkillUsage[]>();
    for (const item of filtered) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return map;
  }, [filtered]);

  return (
    <div>
      {/* controls */}
      <div className="sticky top-[57px] z-20 -mx-[clamp(1.25rem,5vw,5rem)] border-b border-[var(--border)] bg-[color:var(--background)]/95 px-[clamp(1.25rem,5vw,5rem)] py-4 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative flex-1 min-w-[14rem]">
            <span className="sr-only">Search skills</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the stack…"
              className="w-full border border-[var(--border)] bg-[color:var(--surface)] px-4 py-2.5 font-mono text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--faint)] focus:border-[color:var(--accent)] focus:outline-none"
            />
          </label>

          <button
            type="button"
            onClick={() => setProvenOnly((value) => !value)}
            aria-pressed={provenOnly}
            className={`border px-4 py-2.5 data-label transition-colors ${
              provenOnly
                ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--accent-strong)]"
                : "border-[var(--border)] text-[color:var(--muted)]"
            }`}
          >
            Shipped in production
          </button>
        </div>

        <div className="signal-track mt-3">
          <button
            type="button"
            onClick={() => setGroup(null)}
            aria-pressed={group === null}
            className={`signal-pill transition-colors ${
              group === null
                ? "border-[color:var(--accent)] text-[color:var(--accent-strong)]"
                : ""
            }`}
          >
            All
          </button>
          {groups.map((g) => (
            <button
              key={g.label}
              type="button"
              onClick={() => setGroup(g.label === group ? null : g.label)}
              aria-pressed={group === g.label}
              className={`signal-pill transition-colors ${
                group === g.label
                  ? "border-[color:var(--accent)] text-[color:var(--accent-strong)]"
                  : ""
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* results */}
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-[color:var(--muted)]">
          Nothing matches “{query}”.
        </p>
      ) : (
        groups
          .filter((g) => byGroup.has(g.label))
          .map((g) => {
            const items = byGroup.get(g.label) ?? [];
            return (
              <section
                key={g.label}
                className="grid gap-8 border-b border-[var(--border)] py-12 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-12"
              >
                <div>
                  <h2 className="font-sans text-xl font-bold leading-tight">
                    {g.label}
                  </h2>
                  <p className="mt-3 leading-relaxed text-[color:var(--muted)]">
                    {g.summary}
                  </p>
                </div>

                <Spotlight className="self-start">
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <li
                      key={item.skill.name}
                      className="spot flex flex-col gap-3 border border-[var(--border)] bg-[color:var(--surface)] p-5"
                    >
                      <div className="flex items-center gap-3">
                        <CompanyLogo
                          domain={item.skill.domain}
                          name={item.skill.name}
                          size={34}
                        />
                        <span className="font-sans text-[0.95rem] font-semibold leading-snug">
                          {item.skill.name}
                        </span>
                      </div>

                      {item.roleCount > 0 ? (
                        <div className="mt-auto">
                          <p className="data-label text-[color:var(--accent-strong)]">
                            {item.roleCount} role{item.roleCount === 1 ? "" : "s"}
                            {item.since ? ` · since ${item.since}` : ""}
                          </p>
                          <div className="mt-2.5 flex items-center gap-1.5">
                            {item.companies.map((company) => (
                              <span key={company.name} title={company.name}>
                                <CompanyLogo
                                  domain={company.domain}
                                  name={company.name}
                                  size={22}
                                />
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="data-label mt-auto text-[color:var(--faint)]">
                          Toolbox
                        </p>
                      )}
                    </li>
                  ))}
                  </ul>
                </Spotlight>
              </section>
            );
          })
      )}
    </div>
  );
}
