import type { Metadata } from "next";
import { CompanyLogo } from "@/components/company-logo";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/Reveal";
import { Spotlight } from "@/components/spotlight";
import { timelineEvents, type TimelineCategory } from "@/data/timeline";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "Timeline",
  description:
    "Career milestones, project launches, awards, publications, and learning checkpoints, in the order they happened.",
  path: "/timeline",
});

/**
 * Category is encoded twice — a colour on the marker and a label on the card —
 * so it survives both a quick scan and a colour-blind reader.
 */
const CATEGORY: Record<
  TimelineCategory,
  { dot: string; text: string; label: string }
> = {
  Career: {
    dot: "bg-[color:var(--accent)]",
    text: "text-[color:var(--accent-strong)]",
    label: "Career",
  },
  Project: {
    dot: "bg-[color:var(--accent-alt)]",
    text: "text-[color:var(--accent-alt)]",
    label: "Project",
  },
  Award: {
    dot: "bg-[color:var(--foreground)]",
    text: "text-[color:var(--foreground)]",
    label: "Award",
  },
  Learning: {
    dot: "bg-[color:var(--muted)]",
    text: "text-[color:var(--muted)]",
    label: "Learning",
  },
  Publication: {
    dot: "bg-[color:var(--faint)]",
    text: "text-[color:var(--faint)]",
    label: "Publication",
  },
};

export default function TimelinePage() {
  const sorted = [...timelineEvents].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );

  const years = [...new Set(sorted.map((event) => event.year))];
  const byYear = years.map((year) => ({
    year,
    events: sorted.filter((event) => event.year === year),
  }));

  const counts = sorted.reduce<Record<string, number>>((acc, event) => {
    acc[event.category] = (acc[event.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="shell py-14 md:py-20">
      <PageHeader
        kicker="Timeline"
        title="A living archive of growth and execution."
        lede="Career moves, shipped work, recognition, publications and study — newest first, in the order they actually happened."
        aside={
          <div className="text-right">
            <p className="stat-figure">{sorted.length}</p>
            <p className="data-label mt-2 text-[color:var(--faint)]">
              Milestones
            </p>
          </div>
        }
      />

      {/* legend */}
      <div className="signal-track mt-8">
        {(Object.keys(CATEGORY) as TimelineCategory[])
          .filter((key) => counts[key])
          .map((key) => (
            <span key={key} className="signal-pill gap-2">
              <span
                className={`h-2 w-2 shrink-0 ${CATEGORY[key].dot}`}
                aria-hidden="true"
              />
              {CATEGORY[key].label} · {counts[key]}
            </span>
          ))}
      </div>

      <div className="mt-14">
        {byYear.map(({ year, events }) => (
          <section
            key={year}
            aria-labelledby={`year-${year}`}
            className="grid gap-6 md:grid-cols-[minmax(0,11rem)_1fr] md:gap-10"
          >
            {/* sticky year anchor */}
            <div className="md:sticky md:top-24 md:h-fit md:self-start md:pb-16">
              <h2
                id={`year-${year}`}
                className="stat-figure text-[color:var(--border)]"
              >
                {year}
              </h2>
              <p className="data-label mt-2 text-[color:var(--faint)]">
                {events.length} {events.length === 1 ? "entry" : "entries"}
              </p>
            </div>

            {/* the spine and its entries */}
            <Spotlight className="relative border-l border-[var(--border)] pl-8 md:pl-10">
              {events.map((event, index) => {
                const style = CATEGORY[event.category];
                const isLatest = year === years[0] && index === 0;

                return (
                  <Reveal key={`${event.date}-${event.title}`}>
                    <article className="spot relative mb-3 border border-[var(--border)] bg-[color:var(--surface)] p-6">
                      {/* marker on the spine */}
                      <span
                        className={`absolute left-[-2.05rem] top-7 h-2.5 w-2.5 md:left-[-2.55rem] ${style.dot}`}
                        aria-hidden="true"
                      />
                      <span
                        className="absolute left-[-1.72rem] top-[2.1rem] h-px w-5 bg-[var(--border)] md:left-[-2.22rem] md:w-7"
                        aria-hidden="true"
                      />

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className={`data-label ${style.text}`}>
                          {style.label}
                        </span>
                        <span className="data-label text-[color:var(--faint)]">
                          {formatDate(event.date)}
                        </span>
                        {isLatest ? (
                          <span className="border border-[color:var(--accent)] bg-[color:var(--accent-soft)] px-2 py-0.5 data-label text-[color:var(--accent-strong)]">
                            Most recent
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-3 flex items-start gap-4">
                        {event.org ? (
                          <CompanyLogo
                            domain={event.org.domain}
                            name={event.org.name}
                            size={40}
                          />
                        ) : null}
                        <div>
                          <h3 className="font-sans text-xl font-bold leading-snug">
                            {event.title}
                          </h3>
                          <p className="measure mt-2 leading-relaxed text-[color:var(--muted)]">
                            {event.details}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </Spotlight>
          </section>
        ))}
      </div>

      {/* the beginning */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,11rem)_1fr] md:gap-10">
        <div />
        <p className="border-l border-[var(--border)] py-6 pl-8 data-label text-[color:var(--faint)] md:pl-10">
          Where it started
        </p>
      </div>
    </div>
  );
}
