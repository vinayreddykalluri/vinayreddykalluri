type MetricItem = {
  label: string;
  value: string;
  detail: string;
};

type MetricGridProps = {
  metrics: readonly MetricItem[];
  location: string;
  visa: string;
  mindset: readonly string[];
};

export function MetricGrid({ metrics, location, visa, mindset }: MetricGridProps) {
  return (
    <aside className="space-y-5" aria-label="Current focus and builder identity">
      <section className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[linear-gradient(145deg,var(--surface),var(--surface-strong))] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] backdrop-blur-md">
        <div className="pointer-events-none absolute -right-7 top-0 h-28 w-28 rounded-full bg-[color:var(--accent-soft)] blur-2xl" />
        <h3 className="text-xl font-semibold">Current Focus</h3>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="surface-card rounded-xl p-3.5 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <p className="text-xs text-[color:var(--muted)]">{metric.label}</p>
              <p className="mt-1 text-lg font-semibold tracking-tight">{metric.value}</p>
              <p className="mt-1 text-xs leading-5 text-[color:var(--muted)]">
                {metric.detail}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-4 rounded-xl border border-[var(--border)] bg-[color:var(--accent-soft)] px-3 py-2 text-xs text-[color:var(--accent-strong)]">
          {location} | {visa}
        </p>
      </section>

      <section className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[linear-gradient(145deg,var(--surface),var(--surface-strong))] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] backdrop-blur-md">
        <div className="pointer-events-none absolute -left-8 bottom-2 h-24 w-24 rounded-full bg-[color:var(--accent-soft)] blur-3xl" />
        <h3 className="text-xl font-semibold">Builder Identity</h3>
        <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
          The principles I optimize for before writing any production system.
        </p>

        {/* `details` gives accessible interaction without adding client-side state. */}
        <ul className="relative mt-4 space-y-3">
          {mindset.map((item, index) => (
            <li key={item}>
              <details className="group rounded-xl border border-[var(--border)] bg-[linear-gradient(160deg,var(--surface),rgba(255,255,255,0.56))] px-4 py-3 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-strong)] open:border-[color:var(--accent)] open:bg-[color:var(--accent-soft)]/50">
                <summary className="flex cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-alt))] text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium text-[color:var(--foreground)]">
                    Principle {index + 1}
                  </span>
                  <span
                    aria-hidden
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] text-sm text-[color:var(--muted)] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 pl-9 text-sm leading-6 text-[color:var(--muted)]">
                  {item}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
