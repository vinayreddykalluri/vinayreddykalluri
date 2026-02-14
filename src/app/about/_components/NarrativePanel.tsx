type NarrativePanelProps = {
  narrative: readonly string[];
};

export function NarrativePanel({ narrative }: NarrativePanelProps) {
  return (
    <article className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[linear-gradient(145deg,var(--surface),var(--surface-strong))] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] backdrop-blur-md md:p-10">
      <div className="pointer-events-none absolute -left-10 top-16 h-40 w-40 rounded-full bg-[color:var(--accent-soft)] blur-3xl" />
      <div className="relative space-y-5 text-base leading-8 text-[color:var(--muted)] md:space-y-6 md:leading-9">
        {narrative.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
