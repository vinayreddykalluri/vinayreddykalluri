import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { formatDate } from "@/lib/format";
import { timelineEvents, type TimelineCategory } from "@/data/timeline";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "Timeline",
  description:
    "Living timeline of career milestones, launches, awards, publications, and learning moments.",
  path: "/timeline",
});

const categoryStyles: Record<TimelineCategory, string> = {
  Career: "border border-[#5E60CE55] bg-[#5E60CE1A] text-[#5E60CE]",
  Project: "border border-[#4EA8DE55] bg-[#4EA8DE1A] text-[#4EA8DE]",
  Award: "border border-[#6930C355] bg-[#6930C31A] text-[#6930C3]",
  Learning: "border border-[#80FFDB66] bg-[#80FFDB1F] text-[#56CFE1]",
  Publication: "border border-[#7400B855] bg-[#7400B81A] text-[#7400B8]",
};

function groupTimelineByYear() {
  // Keep timeline rendering simple by grouping once on the server.
  return timelineEvents.reduce<Record<number, typeof timelineEvents>>(
    (acc, event) => {
      const year = event.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(event);
      return acc;
    },
    {},
  );
}

export default function TimelinePage() {
  const grouped = groupTimelineByYear();
  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="space-y-10 md:space-y-12">
      <header className="max-w-3xl space-y-4">
        <p className="kicker">Timeline</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Living archive of growth and execution
        </h1>
        <p className="text-base leading-7 text-[color:var(--muted)]">
          Career milestones, project launches, awards, publications, and
          learning checkpoints organized by year.
        </p>
      </header>

      <div className="space-y-10">
        {years.map((year) => (
          <section
            key={year}
            aria-labelledby={`year-${year}`}
            className="surface-panel p-6 md:p-7"
          >
            <h2
              id={`year-${year}`}
              className="text-2xl font-semibold tracking-tight"
            >
              {year}
            </h2>

            <ol className="relative mt-5 space-y-4 border-l border-[var(--border)] pl-5">
              {grouped[year]
                .sort((a, b) => +new Date(a.date) - +new Date(b.date))
                .map((event) => (
                  <li key={`${event.date}-${event.title}`} className="relative">
                    <RevealOnScroll>
                      <span className="absolute -left-[1.55rem] top-2 h-3 w-3 rounded-full border border-[var(--accent)] bg-[color:var(--surface)]" />
                      <article className="surface-card rounded-xl p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-base font-semibold">
                            {event.title}
                          </h3>
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${categoryStyles[event.category]}`}
                          >
                            {event.category}
                          </span>
                        </div>
                        <p className="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-[color:var(--muted)]">
                          {formatDate(event.date)}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                          {event.details}
                        </p>
                      </article>
                    </RevealOnScroll>
                  </li>
                ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
