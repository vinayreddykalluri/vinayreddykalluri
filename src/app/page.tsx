import Link from "next/link";
import type { Metadata } from "next";
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

export default function HomePage() {
  const jsonLd = getPersonAndWebsiteJsonLd();
  const featuredProjects = projects.slice(0, 3);
  const latestTimeline = [...timelineEvents]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 4);
  const capabilityCards = [
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
      signal: "1M+ events/day patterns from enterprise healthcare systems",
    },
    {
      title: "Performance and Delivery Velocity",
      summary:
        "Balancing technical depth with execution speed through JVM profiling, SQL optimization, and clear ownership.",
      signal: "35TB+ migration reduced from 16 days to 4 days",
    },
  ] as const;
  const currentStack = Array.from(
    new Set(
      experiences
        .flatMap((experience) => experience.stack)
        .filter((item) => item.length > 0),
    ),
  ).slice(0, 12);
  const featuredHighlights = experiences[0]?.highlights.slice(0, 3) ?? [];
  const featuredArticle = externalArticles[0];

  return (
    <div className="space-y-16 md:space-y-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Reveal>
        <section className="hero-shell surface-panel mesh-grid relative p-7 md:p-11">
          <div className="relative grid gap-9 md:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-7">
              <p className="soft-chip motion-entry inline-flex w-fit rounded-[3px] px-3 py-1 font-mono text-xs tracking-[0.1em] uppercase">
                {siteConfig.role}
              </p>
              <h1 className="motion-entry delay-1 text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-gradient">
                  Backend systems that stay stable when scale gets messy.
                </span>
              </h1>
              <p className="motion-entry delay-2 max-w-3xl text-base leading-8 text-[color:var(--muted)] md:text-lg">
                {siteConfig.summary}
              </p>
              <p className="motion-entry delay-3 max-w-3xl text-sm text-[color:var(--muted)]">
                {siteConfig.location} | {siteConfig.workAuthorization.visa} |{" "}
                {siteConfig.workAuthorization.availability}
              </p>

              <div className="motion-entry delay-3 flex flex-wrap gap-3">
                <Link
                  href="/career"
                  className="cta-primary px-6 py-2.5 text-sm font-semibold"
                >
                  Explore Career Impact
                </Link>
                <Link
                  href="/projects"
                  className="spark-link px-6 py-2.5 text-sm font-semibold"
                >
                  View Project Stories
                </Link>
                <Link
                  href="/contact"
                  className="spark-link px-6 py-2.5 text-sm font-semibold"
                >
                  Let&apos;s Connect
                </Link>
              </div>

              <div className="grid gap-3 pt-2 sm:grid-cols-3">
                {siteConfig.metrics.slice(0, 3).map((item, index) => (
                  <article
                    key={item.label}
                    className={`surface-card rounded-xl p-4 motion-entry delay-${index + 1}`}
                  >
                    <p className="text-xs text-[color:var(--muted)]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xl font-semibold tracking-tight">
                      {item.value}
                    </p>
                    <p className="mt-1.5 text-xs text-[color:var(--muted)]">
                      {item.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="surface-card h-full p-6 md:p-7">
              <p className="kicker">Snapshot</p>
              <h2 className="mt-2 text-2xl font-semibold leading-tight">
                What teams get when I own backend execution
              </h2>
              <ul className="timeline-rail mt-6 space-y-4">
                {featuredHighlights.map((highlight) => (
                  <li key={highlight} className="relative flex items-start">
                    <span className="timeline-dot" />
                    <p className="text-sm leading-7 text-[color:var(--muted)]">
                      {highlight}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-[var(--border)] pt-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--muted)]">
                  Mission Direction
                </p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                  {siteConfig.mission}
                </p>
              </div>
            </aside>
          </div>

          <div className="signal-strip mt-8">
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
      </Reveal>

      <Reveal delay={0.04}>
        <section className="grid gap-5 lg:grid-cols-3">
          {capabilityCards.map((capability) => (
            <article key={capability.title} className="surface-card p-6">
              <p className="kicker">Capability</p>
              <h2 className="mt-2 text-xl font-semibold">{capability.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                {capability.summary}
              </p>
              <p className="mt-4 rounded-xl border border-[var(--border)] bg-[color:var(--accent-soft)] px-3.5 py-2 text-xs font-medium text-[color:var(--accent-strong)]">
                {capability.signal}
              </p>
            </article>
          ))}
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="space-y-6">
          <header className="max-w-3xl space-y-3">
            <p className="kicker">Featured Work</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Selected projects with clear problem-to-impact storytelling
            </h2>
            <p className="text-base leading-7 text-[color:var(--muted)]">
              Instead of listing tools, each project explains context, technical
              decisions, and measurable outcomes.
            </p>
          </header>

          <div className="grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article key={project.name} className="surface-card p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="kicker">{project.type}</p>
                  <span className="soft-chip rounded-[3px] px-3 py-1 text-xs">
                    {project.period}
                  </span>
                </div>
                <h3 className="mt-2 text-xl font-semibold">{project.name}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                  {project.problem}
                </p>
                <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
                  <span className="font-semibold text-[color:var(--foreground)]">
                    Impact:
                  </span>{" "}
                  {project.impact}
                </p>
              </article>
            ))}
          </div>

          <Link
            href="/projects"
            className="spark-link inline-flex px-5 py-2.5 text-sm font-semibold"
          >
            Open Full Projects Archive
          </Link>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="surface-card p-6 md:p-7">
            <p className="kicker">Recent Milestones</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight">
              Latest timeline events that shape current direction
            </h2>
            <ul className="timeline-rail mt-6 space-y-4">
              {latestTimeline.map((item) => (
                <li key={`${item.date}-${item.title}`} className="flex items-start">
                  <span className="timeline-dot" />
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs uppercase tracking-[0.08em] text-[color:var(--muted)]">
                      {formatDate(item.date)} | {item.category}
                    </p>
                    <p className="mt-1.5 text-sm leading-7 text-[color:var(--muted)]">
                      {item.details}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/timeline"
              className="spark-link mt-5 inline-flex px-5 py-2.5 text-sm font-semibold"
            >
              View Full Timeline
            </Link>
          </article>

          <article className="surface-card p-6 md:p-7">
            <p className="kicker">Writing and Perspective</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight">
              Engineering notes beyond portfolio snapshots
            </h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              I publish practical backend engineering lessons and architecture
              reasoning that teams can apply in production environments.
            </p>
            <div className="mt-5 rounded-xl border border-[var(--border)] bg-[color:var(--surface-strong)] p-4">
              <p className="text-xs uppercase tracking-[0.08em] text-[color:var(--muted)]">
                Featured External Writing
              </p>
              {featuredArticle ? (
                <>
                  <p className="mt-2 text-sm font-semibold">
                    {featuredArticle.title}
                  </p>
                  <p className="mt-1 text-xs text-[color:var(--muted)]">
                    {formatDate(featuredArticle.publishedAt)}
                  </p>
                  <a
                    href={featuredArticle.href}
                    target="_blank"
                    rel="noreferrer"
                    className="spark-link mt-4 inline-flex px-4 py-2 text-xs font-semibold"
                  >
                    Visit Medium
                  </a>
                </>
              ) : (
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  External writing links will appear here soon.
                </p>
              )}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="spark-link inline-flex px-4 py-2 text-xs font-semibold"
              >
                Read Blog
              </Link>
              <Link
                href="/about"
                className="spark-link inline-flex px-4 py-2 text-xs font-semibold"
              >
                Learn About Me
              </Link>
            </div>
          </article>
        </section>
      </Reveal>

      <Reveal delay={0.12}>
        <section className="hero-shell surface-panel p-7 md:p-10">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className="kicker">Open to Opportunities</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                If you need a backend engineer who can ship and scale, let&apos;s
                talk.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--muted)]">
                Currently open to remote, hybrid, and onsite roles in the U.S.
                focused on distributed systems, platform reliability, and
                backend modernization.
              </p>
            </div>
            <Link
              href="/contact"
              className="cta-primary inline-flex w-fit px-6 py-2.5 text-sm font-semibold"
            >
              Start Conversation
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
