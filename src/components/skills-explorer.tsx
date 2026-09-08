import { TechLogo } from "@/components/tech-logo";
import { Spotlight } from "@/components/spotlight";
import type { SkillUsage } from "@/lib/skill-usage";

/**
 * Skills tiered by evidence rather than listed flat.
 *
 * Fifty equal tiles assert nothing and cost fifty logo requests. Ranking by
 * how many roles actually used a technology gives the page a point of view:
 * a handful of things carried through every role, a second tier that shipped,
 * and everything else named honestly as familiarity rather than dressed up to
 * look equivalent.
 *
 * Only the top two tiers request a logo, which cuts image requests on this
 * page by roughly two thirds. No filter UI either — the ranking does the job
 * the filters were doing, so this is a server component with no client JS.
 */
export function SkillsExplorer({ usage }: { usage: SkillUsage[] }) {
  const core = usage
    .filter((item) => item.roleCount >= 3)
    .sort(
      (a, b) => b.roleCount - a.roleCount || (a.since ?? 0) - (b.since ?? 0),
    );

  const shipped = usage
    .filter((item) => item.roleCount > 0 && item.roleCount < 3)
    .sort((a, b) => b.roleCount - a.roleCount);

  const toolbox = usage.filter((item) => item.roleCount === 0);

  return (
    <div>
      {/* ---------- core stack ---------- */}
      <section className="border-b border-[var(--border)] py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker">Core stack</p>
            <h2 className="display-lg mt-4 max-w-[18ch]">
              What carried through every role.
            </h2>
          </div>
          <p className="measure text-[color:var(--muted)]">
            Used in three or more roles. The tools the work actually rests on,
            not everything ever touched.
          </p>
        </div>

        <Spotlight className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {core.map((item) => (
            <article
              key={item.skill.name}
              className="spot flex flex-col gap-4 border border-[var(--border)] bg-[color:var(--surface)] p-6"
            >
              <TechLogo
                icon={item.skill.icon}
                domain={item.skill.domain}
                name={item.skill.name}
                size={44}
              />
              <div>
                <p className="font-sans text-lg font-bold leading-snug">
                  {item.skill.name}
                </p>
                <p className="data-label mt-2 text-[color:var(--accent-strong)]">
                  {item.roleCount} roles
                  {item.since ? ` · since ${item.since}` : ""}
                </p>
              </div>
              {/*
                Company names rather than repeated logo tiles: the same five
                marks recurring on every core tile was visual noise and dozens
                of extra image elements, and the names read faster anyway.
              */}
              <p className="mt-auto pt-1 data-label text-[color:var(--faint)]">
                {item.companies.map((company) => company.name).join(" · ")}
              </p>
            </article>
          ))}
        </Spotlight>
      </section>

      {/* ---------- also shipped ---------- */}
      {shipped.length ? (
        <section className="border-b border-[var(--border)] py-14">
          <p className="kicker">Also shipped</p>
          <h2 className="display-lg mt-4 max-w-[18ch]">
            Production, if not everywhere.
          </h2>

          <Spotlight className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {shipped.map((item) => (
              <article
                key={item.skill.name}
                className="spot flex items-center gap-3 border border-[var(--border)] bg-[color:var(--surface)] p-4"
              >
                <TechLogo
                  icon={item.skill.icon}
                  domain={item.skill.domain}
                  name={item.skill.name}
                  size={32}
                />
                <div className="min-w-0">
                  <p className="truncate font-sans text-[0.95rem] font-semibold">
                    {item.skill.name}
                  </p>
                  <p className="data-label mt-1 text-[color:var(--faint)]">
                    {item.roleCount} role{item.roleCount === 1 ? "" : "s"}
                    {item.since ? ` · ${item.since}` : ""}
                  </p>
                </div>
              </article>
            ))}
          </Spotlight>
        </section>
      ) : null}

      {/* ---------- toolbox ---------- */}
      {toolbox.length ? (
        <section className="py-14">
          <p className="kicker">Toolbox</p>
          <h2 className="display-lg mt-4 max-w-[22ch]">
            Familiar, and used where it fits.
          </h2>
          <p className="measure mt-5 text-[color:var(--muted)]">
            Named plainly rather than dressed up to look like the core stack.
          </p>

          <ul className="signal-track mt-8">
            {toolbox.map((item) => (
              <li key={item.skill.name} className="signal-pill">
                {item.skill.name}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
