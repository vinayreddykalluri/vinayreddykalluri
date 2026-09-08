import Link from "next/link";
import type { Metadata } from "next";
import { EventLanes } from "@/components/event-lanes";
import { GithubStats } from "@/components/github-stats";
import { Parallax } from "@/components/parallax";
import { Reveal } from "@/components/Reveal";
import { externalArticles } from "@/data/blog";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/profile";
import { timelineEvents } from "@/data/timeline";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { getPersonAndWebsiteJsonLd } from "@/lib/structured-data";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "Home",
  description:
    "Senior Java Backend Engineer portfolio focused on high-throughput microservices, Kafka event systems, and AWS backend platforms.",
  path: "/",
});

/**
 * Headline outcomes. Every figure here comes from src/data — nothing invented.
 * The migration entry carries its real before/after so the bar pair below can
 * encode actual numbers rather than a decorative squiggle.
 */
type Outcome = {
  figure: string;
  label: string;
  note: string;
  /** Relative before/after, used to draw the reduction to scale. */
  bars?: { from: number; to: number; fromLabel: string; toLabel: string };
};

const OUTCOMES: Outcome[] = [
  {
    figure: "\u221275%",
    label: "Migration load time",
    note: "Parallel processing, SQL tuning, batch orchestration",
    bars: { from: 100, to: 25, fromLabel: "before", toLabel: "after" },
  },
  { figure: "1M+", label: "Events / hour", note: "Event-driven services at Anthem" },
  { figure: "99.9%", label: "Consistency", note: "Idempotency, sequencing, dead-letter handling" },
  { figure: "+20%", label: "API throughput", note: "Async execution, Redis caching, JVM tuning" },
  { figure: "\u221240%", label: "Manual effort", note: "Incentive compensation workflow automation" },
  { figure: "20+", label: "Services migrated", note: "Standardised onto Spring Boot on AWS" },
];

const CAPABILITIES = [
  {
    title: "Reliability-Centered Architecture",
    summary:
      "Designing resilient backend systems with retry strategies, fallback paths, and observability-first operations.",
    signal: "99.9% consistency on distributed compensation workflows",
  },
  {
    title: "Event-Driven Platform Engineering",
    summary:
      "Using Kafka and microservice orchestration to keep data movement fast, dependable, and easier to scale.",
    signal: "1M+ events/hour on event-driven healthcare services",
  },
  {
    title: "Performance and Delivery Velocity",
    summary:
      "Balancing technical depth with execution speed through JVM profiling, SQL optimization, and clear ownership.",
    signal: "Migration load time cut by 75% end to end",
  },
] as const;

export default function HomePage() {
  const jsonLd = getPersonAndWebsiteJsonLd();
  const featuredProjects = projects.slice(0, 3);
  const latestTimeline = [...timelineEvents]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 4);
  const currentStack = Array.from(
    new Set(experiences.flatMap((experience) => experience.stack)),
  ).slice(0, 12);
  const featuredHighlights = experiences[0]?.highlights.slice(0, 3) ?? [];
  const featuredArticle = externalArticles[0];
  const current = experiences[0];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= HERO ================= */}
      <section className="mesh-grid pb-16 pt-6 md:pb-24 md:pt-10">
        <div className="shell grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          <div>
            <p className="kicker motion-entry">
              {siteConfig.role} — {siteConfig.location}
            </p>

            <h1 className="display-xl motion-entry delay-1 mt-5">
              Backend systems
              <br />
              that stay stable
              <br />
              <span className="text-[color:var(--accent)]">when scale</span>
              <br />
              gets messy.
            </h1>

            <hr className="rule-accent motion-entry delay-2 mt-8" />

            <p className="measure motion-entry delay-2 mt-6 text-lg leading-relaxed text-[color:var(--muted)] md:text-xl">
              {siteConfig.summary}
            </p>

            <div className="motion-entry delay-3 mt-8 flex flex-wrap items-center gap-3">
              <Link href="/career" className="cta-primary px-7 py-3 text-sm">
                Explore career impact
              </Link>
              <Link href="/projects" className="spark-link px-6 py-3 text-sm">
                Project stories
              </Link>
              <Link href="/contact" className="spark-link px-6 py-3 text-sm">
                Get in touch
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 data-label text-[color:var(--faint)]">
              <span>{siteConfig.workAuthorization.visa}</span>
              <span aria-hidden="true">/</span>
              <span>{siteConfig.workAuthorization.availability}</span>
            </div>
          </div>

          {/* instrument column — drifts slightly against the headline */}
          <Parallax speed={0.06} className="flex flex-col gap-6">
            <div className="surface-panel p-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="kicker">Partitions p0–p3</span>
                <span className="data-label text-[color:var(--faint)]">
                  Event lanes
                </span>
              </div>
              <div className="mt-3">
                <EventLanes />
              </div>
              <p className="mt-3 border-t border-[var(--border-soft)] pt-3 data-label text-[color:var(--faint)]">
                Illustrative motif — not live data
              </p>
            </div>

            <div className="surface-panel p-6">
              <span className="kicker">Currently</span>
              <p className="mt-3 font-sans text-xl font-bold leading-tight">
                {current?.role}
              </p>
              <p className="mt-1 text-[color:var(--muted)]">
                {current?.company} — {current?.period}
              </p>
              <ul className="timeline-rail mt-5 space-y-3">
                {featuredHighlights.map((highlight) => (
                  <li key={highlight} className="flex items-start">
                    <span className="timeline-dot" />
                    <span className="text-[0.95rem] leading-relaxed text-[color:var(--muted)]">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Parallax>
        </div>

        <div className="signal-strip shell mt-12">
          <p className="kicker mb-3">Current stack</p>
          <div className="signal-track">
            {currentStack.map((stack) => (
              <span key={stack} className="signal-pill">
                {stack}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUTCOMES BAND ================= */}
      <section className="band-invert py-16 md:py-24">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-lg max-w-[16ch]">
              What the systems actually did.
            </h2>
            <p className="band-dim measure text-[0.95rem]">
              Seven-plus years of backend ownership across healthcare and
              enterprise platforms, measured by what changed after each shipped.
            </p>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {OUTCOMES.map((item) => (
              <article
                key={item.label}
                className="border-t-2 border-current/25 pt-5"
              >
                <p className="stat-figure">{item.figure}</p>
                <p className="data-label mt-4">{item.label}</p>
                <p className="band-dim mt-2 text-[0.95rem] leading-relaxed">
                  {item.note}
                </p>

                {item.bars ? (
                  <div className="mt-5">
                    <div className="flex items-center gap-3">
                      <span
                        className="block h-2.5 bg-current opacity-30"
                        style={{ width: `${item.bars.from}px` }}
                      />
                      <span className="data-label opacity-70">
                        {item.bars.fromLabel}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <span
                        className="block h-2.5 bg-[color:var(--accent)]"
                        style={{ width: `${item.bars.to}px` }}
                      />
                      <span className="data-label">{item.bars.toLabel}</span>
                    </div>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CAPABILITIES ================= */}
      <Reveal>
        <section className="shell py-16 md:py-24">
          <span className="kicker">How I work</span>
          <div className="mt-8 grid gap-px bg-[color:var(--border)] md:grid-cols-3">
            {CAPABILITIES.map((capability) => (
              <article
                key={capability.title}
                className="bg-[color:var(--background)] p-7 md:p-9"
              >
                <h3 className="text-2xl">{capability.title}</h3>
                <p className="mt-4 leading-relaxed text-[color:var(--muted)]">
                  {capability.summary}
                </p>
                <p className="mt-6 border-l-2 border-[color:var(--accent)] pl-4 data-label text-[color:var(--accent-strong)]">
                  {capability.signal}
                </p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ================= FEATURED WORK ================= */}
      <Reveal>
        <section className="shell border-t border-[var(--border)] py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="kicker">Selected work</span>
              <h2 className="display-lg mt-4 max-w-[18ch]">
                Problem, decision, and what changed.
              </h2>
            </div>
            <Link href="/projects" className="spark-link px-6 py-3 text-sm">
              Full archive
            </Link>
          </div>

          <div className="mt-12 flex flex-col">
            {featuredProjects.map((project, index) => (
              <article
                key={project.name}
                className="group grid gap-6 border-t border-[var(--border)] py-9 md:grid-cols-[auto_1.1fr_1fr] md:gap-12"
              >
                <p className="stat-figure text-[color:var(--border)] md:w-24">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="kicker">{project.type}</span>
                    <span className="data-label text-[color:var(--faint)]">
                      {project.period}
                    </span>
                  </div>
                  <h3 className="mt-3 text-3xl">{project.name}</h3>
                  <p className="mt-4 leading-relaxed text-[color:var(--muted)]">
                    {project.problem}
                  </p>
                </div>
                <div className="md:border-l md:border-[var(--border)] md:pl-12">
                  <p className="data-label text-[color:var(--faint)]">Impact</p>
                  <p className="mt-3 text-lg leading-relaxed">
                    {project.impact}
                  </p>
                  <div className="signal-track mt-5">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="signal-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ================= GITHUB ================= */}
      <Reveal>
        <GithubStats />
      </Reveal>

      {/* ================= TIMELINE + WRITING ================= */}
      <Reveal>
        <section className="shell grid gap-12 border-t border-[var(--border)] py-16 md:py-24 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <span className="kicker">Recent milestones</span>
            <h2 className="display-lg mt-4 max-w-[16ch]">
              The last four things that moved.
            </h2>
            <ul className="timeline-rail mt-9 space-y-7">
              {latestTimeline.map((item) => (
                <li key={`${item.date}-${item.title}`} className="flex items-start">
                  <span className="timeline-dot" />
                  <div>
                    <p className="data-label text-[color:var(--faint)]">
                      {formatDate(item.date)} — {item.category}
                    </p>
                    <p className="mt-1 font-sans text-lg font-bold">
                      {item.title}
                    </p>
                    <p className="mt-1.5 leading-relaxed text-[color:var(--muted)]">
                      {item.details}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/timeline" className="spark-link mt-8 px-6 py-3 text-sm">
              Full timeline
            </Link>
          </div>

          <aside className="surface-panel h-fit p-7 md:p-9">
            <span className="kicker">Writing</span>
            <h3 className="mt-4 text-2xl">
              Engineering notes beyond the portfolio
            </h3>
            <p className="mt-4 leading-relaxed text-[color:var(--muted)]">
              I publish practical backend lessons and architecture reasoning that
              teams can apply in production.
            </p>
            {featuredArticle ? (
              <div className="mt-7 border-t border-[var(--border)] pt-5">
                <p className="data-label text-[color:var(--faint)]">
                  {formatDate(featuredArticle.publishedAt)}
                </p>
                <p className="mt-2 font-sans text-lg font-bold leading-snug">
                  {featuredArticle.title}
                </p>
                <a
                  href={featuredArticle.href}
                  target="_blank"
                  rel="noreferrer"
                  className="spark-link mt-5 px-5 py-2.5 text-sm"
                >
                  Read on Medium
                </a>
              </div>
            ) : null}
          </aside>
        </section>
      </Reveal>

      {/* ================= CTA BAND ================= */}
      <section className="band-accent py-16 md:py-24">
        <div className="shell flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="kicker">Open to opportunities</span>
            <h2 className="display-lg mt-4 max-w-[20ch]">
              Need a backend engineer who can ship and scale?
            </h2>
            <p className="band-dim measure mt-5 text-lg">
              Currently open to remote, hybrid, and onsite roles in the U.S.
              focused on distributed systems, platform reliability, and backend
              modernization.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="cta-primary px-7 py-3 text-sm">
              Start a conversation
            </Link>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="spark-link px-6 py-3 text-sm"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
