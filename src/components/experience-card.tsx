import { CompanyLogo } from "@/components/company-logo";
import type { ExperienceItem } from "@/data/experience";

/**
 * One company as a spec-sheet block: identity and total tenure in a fixed left
 * rail, every position held there stacked on the right. Multiple positions
 * render as a connected track so a promotion reads as progression rather than
 * two unrelated jobs.
 */
export function ExperienceCard({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index?: number;
}) {
  const multiple = experience.positions.length > 1;

  return (
    <article className="grid gap-8 border-b border-[var(--border)] py-12 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-12">
      {/* company rail */}
      <div>
        {index != null ? (
          <p className="stat-figure mb-5 text-[color:var(--border)] md:text-[2.5rem]">
            {String(index + 1).padStart(2, "0")}
          </p>
        ) : null}

        <CompanyLogo
          domain={experience.domain}
          name={experience.company}
          size={52}
        />

        <p className="mt-4 font-sans text-lg font-bold leading-tight">
          {experience.company}
        </p>
        {experience.formerly ? (
          <p className="data-label mt-1 text-[color:var(--faint)]">
            Formerly {experience.formerly}
          </p>
        ) : null}

        <p className="data-label mt-4 text-[color:var(--accent-strong)]">
          {experience.tenure}
        </p>
        <p className="data-label mt-1.5 text-[color:var(--faint)]">
          {experience.location}
        </p>
        {experience.employmentType ? (
          <p className="data-label mt-1.5 text-[color:var(--faint)]">
            {experience.employmentType}
          </p>
        ) : null}

        {multiple ? (
          <p className="data-label mt-4 text-[color:var(--faint)]">
            {experience.positions.length} positions
          </p>
        ) : null}
      </div>

      {/* positions held at this company */}
      <div className={multiple ? "flex flex-col gap-10" : ""}>
        {experience.positions.map((position, i) => (
          <section
            key={position.role}
            className={
              multiple
                ? "relative pl-7 before:absolute before:left-[4px] before:top-4 before:bottom-[-2.5rem] before:w-px before:bg-[color:var(--border)] last:before:hidden"
                : ""
            }
          >
            {multiple ? (
              <span
                className={`absolute left-0 top-2.5 h-[9px] w-[9px] ${
                  i === 0
                    ? "bg-[color:var(--accent)]"
                    : "border border-[color:var(--border)] bg-[color:var(--background)]"
                }`}
                aria-hidden="true"
              />
            ) : null}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h3 className="text-2xl md:text-3xl">{position.role}</h3>
              {position.current ? (
                <span className="border border-[color:var(--accent)] bg-[color:var(--accent-soft)] px-2.5 py-1 data-label text-[color:var(--accent-strong)]">
                  Current
                </span>
              ) : null}
            </div>

            <p className="data-label mt-2.5 text-[color:var(--faint)]">
              {position.period}
            </p>

            {position.summary ? (
              <p className="measure-wide mt-4 leading-relaxed text-[color:var(--muted)]">
                {position.summary}
              </p>
            ) : null}

            <ul className="mt-6 flex flex-col gap-3.5">
              {position.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="relative max-w-[80ch] pl-6 leading-relaxed"
                >
                  <span
                    className="absolute left-0 top-[0.62em] h-px w-3 bg-[color:var(--accent)]"
                    aria-hidden="true"
                  />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="signal-track mt-6">
              {position.stack.map((tech) => (
                <span key={tech} className="signal-pill">
                  {tech}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
