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

      <div className="relative mt-10 overflow-hidden rounded-[3px] border border-[var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
        <div className="pointer-events-none absolute left-[1.95rem] top-10 bottom-8 w-px bg-[color:var(--border)] md:left-[2.45rem]" />

        <ol className="space-y-8">
          {journey.map((item) => (
            <li key={`${item.year}-${item.title}`} className="relative pl-9 md:pl-11">
              <span className="absolute left-[1.43rem] top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[color:var(--accent)] md:left-[1.95rem]" />
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
