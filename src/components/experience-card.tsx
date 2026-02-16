import type { ExperienceItem } from "@/data/experience";

type ExperienceCardProps = {
  experience: ExperienceItem;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="surface-card p-7">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="kicker">Role</p>
          <h3 className="mt-2 text-xl font-semibold">{experience.role}</h3>
          <p className="mt-1 text-sm text-[color:var(--muted)]">
            {experience.company} | {experience.location}
          </p>
        </div>
        <p className="soft-chip rounded-full px-3 py-1 font-mono text-xs">
          {experience.period}
        </p>
      </header>

      <p className="mt-5 rounded-xl border border-[var(--border)] bg-[color:var(--surface-strong)] p-4 text-sm leading-7 text-[color:var(--muted)]">
        {experience.summary}
      </p>

      <ul className="mt-5 space-y-2.5 pl-5 text-sm leading-7 text-[color:var(--muted)]">
        {experience.highlights.map((highlight) => (
          <li key={highlight} className="list-disc">
            {highlight}
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap gap-2">
        {experience.stack.map((tag) => (
          <li key={tag} className="soft-chip rounded-full px-3 py-1 text-xs">
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
