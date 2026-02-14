import { SectionHeader } from "./SectionHeader";

type JourneyEntry = {
  year: string;
  title: string;
  description: string;
};

type JourneyTimelineProps = {
  journey: readonly JourneyEntry[];
};

export function JourneyTimeline({ journey }: JourneyTimelineProps) {
  return (
    <section className="relative">
      <SectionHeader
        kicker="Journey"
        title="From Curiosity to Distributed Systems"
        description="A concise timeline of milestones that shaped engineering depth, execution range, and systems thinking."
      />

      <div className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[linear-gradient(145deg,var(--surface),var(--surface-strong))] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] backdrop-blur-md md:p-8">
        <div className="pointer-events-none absolute left-[1.95rem] top-10 bottom-8 w-px bg-gradient-to-b from-[color:var(--accent)]/70 via-[color:var(--accent-strong)]/55 to-transparent md:left-[2.45rem]" />

        <ol className="space-y-8">
          {journey.map((item) => (
            <li key={`${item.year}-${item.title}`} className="relative pl-9 md:pl-11">
              <span className="absolute left-[1.43rem] top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border border-white/45 bg-[linear-gradient(135deg,#7400B8,#5E60CE)] shadow-[0_0_0_5px_color-mix(in_oklab,var(--accent-soft)_75%,transparent)] md:left-[1.95rem]" />
              <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">
                {item.year}
              </p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-[color:var(--muted)]">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
