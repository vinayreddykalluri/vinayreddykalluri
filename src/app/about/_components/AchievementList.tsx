type AchievementListProps = {
  achievements: readonly string[];
};

export function AchievementList({ achievements }: AchievementListProps) {
  return (
    <article className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[linear-gradient(145deg,var(--surface),var(--surface-strong))] p-7 shadow-[0_8px_40px_rgba(0,0,0,0.06)] backdrop-blur-md md:p-8">
      <div className="pointer-events-none absolute right-2 top-0 h-28 w-28 rounded-full bg-[color:var(--accent-soft)] blur-2xl" />
      <h2 className="text-2xl font-semibold tracking-tight">Selected Achievements</h2>
      <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
        Outcomes that reflect impact across speed, reliability, and execution.
      </p>

      <ol className="relative mt-5 space-y-3">
        {achievements.map((item, index) => (
          <li
            key={item}
            className="surface-card rounded-xl px-4 py-3.5 text-sm leading-7 text-[color:var(--muted)]"
          >
            <span className="mr-2 font-mono text-xs text-[color:var(--accent)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item}
          </li>
        ))}
      </ol>
    </article>
  );
}
