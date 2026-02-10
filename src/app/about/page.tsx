import type { Metadata } from "next";
import { siteConfig } from "@/data/profile";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About",
  description: "Story and professional philosophy of Vinay Reddy Kalluri: India to U.S., builder mindset, and mission-driven engineering.",
};

export default function AboutPage() {
  return (
    <div className="space-y-12 md:space-y-14">
      <header className="max-w-3xl space-y-4 md:space-y-5">
        <p className="kicker">About</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">A builder&apos;s journey with systems, scale, and purpose</h1>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="surface-panel space-y-5 p-7 leading-8 md:p-9">
          {siteConfig.aboutNarrative.map((paragraph) => (
            <p key={paragraph} className="text-[color:var(--muted)]">
              {paragraph}
            </p>
          ))}
        </article>

        <aside className="space-y-4">
          <div className="surface-panel aspect-square p-6">
            <div className="surface-card flex h-full items-center justify-center border border-dashed border-[var(--border)]">
              <p className="text-sm text-[color:var(--muted)]">Portrait Placeholder</p>
            </div>
          </div>

          <div className="surface-panel p-6">
            <h2 className="text-xl font-semibold">Engineering Mindset</h2>
            <ul className="mt-4 space-y-2 text-sm text-[color:var(--muted)]">
              {siteConfig.mindset.map((item) => (
                <li key={item} className="list-disc pl-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="surface-panel max-w-4xl p-7 md:p-8">
        <h2 className="text-2xl font-semibold">Mission &amp; Long-Term Vision</h2>
        <p className="mt-4 leading-8 text-[color:var(--muted)]">{siteConfig.mission}</p>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="surface-panel p-6">
          <h2 className="text-2xl font-semibold">Education</h2>
          <div className="mt-4 space-y-4">
            {siteConfig.education.map((item) => (
              <div key={`${item.degree}-${item.period}`} className="surface-card p-4">
                <h3 className="text-base font-semibold">{item.degree}</h3>
                <p className="text-sm text-[color:var(--muted)]">{item.institution}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-[color:var(--accent)]">{item.period}</p>
                <ul className="mt-3 space-y-1 text-sm text-[color:var(--muted)]">
                  {item.details.map((detail) => (
                    <li key={detail} className="list-disc pl-1">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>

        <article className="surface-panel p-6">
          <h2 className="text-2xl font-semibold">Selected Achievements</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            {siteConfig.achievements.map((item) => (
              <li key={item} className="list-disc pl-1">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
