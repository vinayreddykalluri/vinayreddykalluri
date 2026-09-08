type NarrativePanelProps = {
  narrative: readonly string[];
};

export function NarrativePanel({ narrative }: NarrativePanelProps) {
  return (
    <article className="relative overflow-hidden rounded-[3px] border border-[var(--border)] bg-[color:var(--surface)] p-8 md:p-10">
      <div className="pointer-events-none absolute -left-10 top-16 h-40 w-40 rounded-full bg-[color:var(--accent-soft)] blur-3xl" />
      <div className="relative space-y-5 text-base leading-8 text-[color:var(--muted)] md:space-y-6 md:leading-9">
        {narrative.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
