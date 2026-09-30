import Link from "next/link";
import type { Metadata } from "next";
import { CompanyLogo } from "@/components/company-logo";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/Reveal";
import { Spotlight } from "@/components/spotlight";
import { TimelineSpine } from "@/components/timeline-spine";
import {
  timelineEvents,
  type TimelineCategory,
  type TimelineEvent,
} from "@/data/timeline";
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

/**
 * The entry's title doubles as its link, and the link stretches over the whole
 * card through the pseudo-element — so the entire card is a click target while
 * the accessibility tree still holds exactly one link, named by the title.
 * Internal destinations go through next/link to keep client navigation; upstream
 * evidence opens in a new tab so the reader does not lose their place in a
 * fourteen-year scroll.
 */
function EntryLink({
  link,
  children,
}: {
  link: NonNullable<TimelineEvent["link"]>;
  children: React.ReactNode;
}) {
  const className =
    "underline decoration-[color:var(--border)] decoration-1 underline-offset-[6px] transition-colors hover:decoration-[color:var(--accent)] after:absolute after:inset-0 after:content-['']";

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {children}
    </Link>
  );
}

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

      {/* One continuous spine for the whole run, so 2012 to 2026 reads as a
          single thread rather than fourteen disconnected year blocks. */}
      <TimelineSpine>
        <Spotlight className="mt-14 pl-8 md:pl-12">
          {byYear.map(({ year, events }) => (
            <section key={year} aria-labelledby={`year-${year}`}>
              {/* year marker, pinned while its entries scroll past */}
              <div className="sticky top-[68px] z-20 -ml-8 mb-6 flex items-center gap-4 bg-[color:var(--background)] py-3 md:-ml-12">
                <span
                  className="h-2.5 w-2.5 shrink-0 translate-x-[-4px] bg-[color:var(--accent)]"
                  aria-hidden="true"
                />
                <h2
                  id={`year-${year}`}
                  className="font-sans text-3xl font-extrabold tracking-tight md:text-4xl"
                >
                  {year}
                </h2>
                <span className="data-label text-[color:var(--faint)]">
                  {events.length} {events.length === 1 ? "entry" : "entries"}
                </span>
                <span className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
              </div>

              <div className="mb-10">
                {events.map((event, index) => {
                  const style = CATEGORY[event.category];
                  const isLatest = year === years[0] && index === 0;

                  return (
                    <Reveal key={`${event.date}-${event.title}`}>
                      <article
                        className={`spot group relative mb-3 border border-[var(--border)] bg-[color:var(--surface)] p-6 transition-colors ${
                          event.link
                            ? "hover:border-[color:var(--accent)] focus-within:border-[color:var(--accent)]"
                            : ""
                        }`}
                      >
                        <span
                          className={`absolute left-[-2.05rem] top-8 h-2 w-2 transition-transform group-hover:scale-150 md:left-[-3.05rem] ${style.dot}`}
                          aria-hidden="true"
                        />
                        <span
                          className="absolute left-[-1.8rem] top-[2.2rem] h-px w-6 bg-[var(--border)] md:left-[-2.8rem] md:w-10"
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
                              {event.link ? (
                                <EntryLink link={event.link}>
                                  {event.title}
                                </EntryLink>
                              ) : (
                                event.title
                              )}
                            </h3>
                            <p className="measure mt-2 leading-relaxed text-[color:var(--muted)]">
                              {event.details}
                            </p>

                            {event.link ? (
                              <p className="mt-4 inline-flex items-center gap-2 data-label text-[color:var(--faint)] transition-colors group-hover:text-[color:var(--accent-strong)]">
                                {event.link.label}
                                <span aria-hidden="true">
                                  {event.link.external ? "\u2197" : "\u2192"}
                                </span>
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </section>
          ))}

          <p className="pb-2 data-label text-[color:var(--faint)]">
            Where it started &mdash; VIT University, 2012
          </p>
        </Spotlight>
      </TimelineSpine>

    </div>
  );
}
