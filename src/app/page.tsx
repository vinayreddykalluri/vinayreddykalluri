import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/data/profile";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Senior Java Backend Engineer portfolio focused on high-throughput microservices, Kafka event systems, and AWS backend platforms.",
};

export default function HomePage() {
  return (
    <div className="space-y-16 md:space-y-20">
      <section className="surface-panel grid gap-10 p-7 md:grid-cols-[1.2fr_0.8fr] md:p-12">
        <div className="space-y-6 motion-safe:animate-[fade-up_650ms_ease-out_forwards]">
          <p className="soft-chip inline-flex rounded-full px-3 py-1 font-mono text-xs tracking-[0.1em] uppercase">
            {siteConfig.role}
          </p>

          <div className="space-y-5">
            <h1 className="text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {siteConfig.name}
            </h1>
            <p className="max-w-3xl text-lg font-medium text-[color:var(--foreground)]">{siteConfig.headline}</p>
            <p className="max-w-3xl text-base leading-8 text-[color:var(--muted)]">{siteConfig.summary}</p>
            <p className="max-w-3xl text-sm text-[color:var(--muted)]">
              {siteConfig.workAuthorization.visa} | {siteConfig.workAuthorization.availability}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-[linear-gradient(135deg,#7400B8,#5E60CE)] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(94,96,206,0.35)] transition hover:-translate-y-0.5"
            >
              View Work
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-[var(--border)] bg-[color:var(--surface-strong)] px-6 py-2.5 text-sm font-semibold transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            >
              About Me
            </Link>
          </div>
        </div>

        <aside className="surface-card p-6">
          <h2 className="text-lg font-semibold">At a glance</h2>
          <ul className="mt-5 space-y-3">
            {siteConfig.metrics.map((item) => (
              <li key={item.label} className="surface-card rounded-xl p-3.5">
                <p className="text-xs text-[color:var(--muted)]">{item.label}</p>
                <p className="mt-0.5 text-xl font-semibold tracking-tight">{item.value}</p>
                <p className="mt-1 text-xs text-[color:var(--muted)]">{item.detail}</p>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/career"
          className="surface-card p-6"
        >
          <h3 className="text-lg font-semibold">Career Impact</h3>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">Architecture, scale, and production outcomes across 4 roles.</p>
        </Link>
        <Link
          href="/projects"
          className="surface-card p-6"
        >
          <h3 className="text-lg font-semibold">Projects</h3>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">Case-study style breakdowns: problem, solution, stack, and impact.</p>
        </Link>
        <Link
          href="/timeline"
          className="surface-card p-6"
        >
          <h3 className="text-lg font-semibold">Timeline</h3>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">A living archive of milestones, awards, publications, and learning.</p>
        </Link>
        <Link
          href="/blog"
          className="surface-card p-6"
        >
          <h3 className="text-lg font-semibold">Blog</h3>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">Technical writing and engineering insights, including Medium links.</p>
        </Link>
      </section>
    </div>
  );
}
