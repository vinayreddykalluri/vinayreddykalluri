type VisionPanelProps = {
  mission: string;
};

export function VisionPanel({ mission }: VisionPanelProps) {
  return (
    <section className="relative">
      
      <div className="border-l-2 border-[color:var(--accent)]">
        <article className="relative overflow-hidden border border-l-0 border-[var(--border)] bg-[color:var(--surface)] p-8 md:p-10">
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
