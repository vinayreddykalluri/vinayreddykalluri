import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/Reveal";
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
  Career: "border-[color:var(--accent)] text-[color:var(--accent-strong)]",
  Project: "border-[color:var(--accent-alt)] text-[color:var(--accent-alt)]",
  Award: "border-[color:var(--foreground)] text-[color:var(--foreground)]",
  Learning: "border-[var(--border)] text-[color:var(--muted)]",
  Publication: "border-[var(--border)] text-[color:var(--faint)]",
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
    <div className="shell py-14 md:py-20">
      <PageHeader
        kicker="Timeline"
        title="A living archive of growth and execution."
        lede="Career moves, shipped work, recognition, publications and study, kept in the order they happened."
      />

      <div>
        {years.map((year) => (
          <Reveal key={year}>
            <section
              aria-labelledby={`year-${year}`}
              className="grid gap-6 border-b border-[var(--border)] py-10 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-12"
            >
              <h2 id={`year-${year}`} className="stat-figure text-[color:var(--border)]">
                {year}
              </h2>

              <ol className="flex flex-col gap-8">
                {grouped[year]
                  .sort((a, b) => +new Date(a.date) - +new Date(b.date))
                  .map((event) => (
                    <li key={`${event.date}-${event.title}`}>
                      <div className="grid gap-3 sm:grid-cols-[minmax(0,7rem)_1fr] sm:gap-6">
                        <span
                          className={`h-fit w-fit border-t-2 pt-2 data-label ${categoryStyles[event.category]}`}
                        >
                          {event.category}
                        </span>
                        <div>
                          <p className="data-label text-[color:var(--faint)]">
                            {formatDate(event.date)}
                          </p>
                          <h3 className="mt-1.5 font-sans text-lg font-bold">
                            {event.title}
                          </h3>
                          <p className="measure mt-2 leading-relaxed text-[color:var(--muted)]">
                            {event.details}
                          </p>
                        </div>
                      </div>
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
