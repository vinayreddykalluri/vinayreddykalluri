import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
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
  Career: "border border-[#0F6FFF55] bg-[#0F6FFF1A] text-[#0F6FFF]",
  Project: "border border-[#20A4F355] bg-[#20A4F31A] text-[#1A83C9]",
  Award: "border border-[#FF7A4555] bg-[#FF7A451A] text-[#DB612E]",
  Learning: "border border-[#2CB67D55] bg-[#2CB67D1A] text-[#208B5F]",
  Publication: "border border-[#5476F455] bg-[#5476F41A] text-[#3F60DB]",
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
      <Reveal>
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
      </Reveal>

      <div className="space-y-10">
        {years.map((year, index) => (
          <Reveal key={year} delay={0.04 * (index % 4)}>
            <section
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
          </Reveal>
        ))}
      </div>
    </div>
  );
}
