import { CompanyLogo } from "@/components/company-logo";
import type { ExperienceItem } from "@/data/experience";

/**
 * A role as a spec-sheet row: company and dates in a fixed left rail, the
 * substance on the right. Hairline separated rather than boxed, matching the
 * project rows and the homepage bands.
 */
export function ExperienceCard({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index?: number;
}) {
  return (
    <article className="grid gap-6 border-b border-[var(--border)] py-10 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-12">
      <div>
        {index != null ? (
          <p className="stat-figure mb-4 text-[color:var(--border)] md:text-[2.5rem]">
            {String(index + 1).padStart(2, "0")}
          </p>
        ) : null}
        <div className="flex items-center gap-3">
          <CompanyLogo
            domain={experience.domain}
            name={experience.company}
            size={44}
          />
          <div>
            <p className="font-sans text-lg font-bold leading-tight">
              {experience.company}
            </p>
            {experience.nowKnownAs ? (
              <p className="data-label mt-1 text-[color:var(--faint)]">
                Now {experience.nowKnownAs}
              </p>
            ) : null}
          </div>
        </div>
        <p className="data-label mt-3 text-[color:var(--faint)]">
          {experience.period}
        </p>
        <p className="data-label mt-1.5 text-[color:var(--faint)]">
          {experience.location}
        </p>
      </div>

      <div>
        <h3 className="text-2xl md:text-3xl">{experience.role}</h3>
        <p className="measure-wide mt-4 leading-relaxed text-[color:var(--muted)]">
          {experience.summary}
        </p>

        <ul className="mt-7 flex flex-col gap-3.5">
          {experience.highlights.map((highlight) => (
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

        <div className="signal-track mt-7">
          {experience.stack.map((tech) => (
            <span key={tech} className="signal-pill">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
