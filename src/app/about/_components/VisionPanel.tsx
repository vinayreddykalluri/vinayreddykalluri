type VisionPanelProps = {
  mission: string;
};

export function VisionPanel({ mission }: VisionPanelProps) {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute -left-10 top-8 h-40 w-40 rounded-full bg-[color:var(--accent-soft)] blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-0 h-28 w-28 rounded-full bg-[color:var(--accent-soft)] blur-2xl" />

      <div className="rounded-[1.75rem] bg-gradient-to-r from-[#7400B8] via-[#5E60CE] to-[#4EA8DE] p-[1px] shadow-[0_16px_48px_rgba(94,96,206,0.25)]">
        <article className="relative overflow-hidden rounded-[calc(1.75rem-1px)] border border-white/15 bg-[linear-gradient(145deg,var(--surface),var(--surface-strong))] p-8 backdrop-blur-md md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Mission &amp; Long-Term Vision
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[color:var(--muted)] md:leading-9">
            {mission}
          </p>
        </article>
      </div>
    </section>
  );
}
