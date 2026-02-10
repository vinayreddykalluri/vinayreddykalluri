import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Story and professional philosophy of Vinay Reddy Kalluri: India to U.S., builder mindset, and mission-driven engineering.",
  path: "/about",
});

export default function AboutPage() {
  const spotlightMetrics = siteConfig.metrics.slice(0, 4);

  return (
    <div className="space-y-14 md:space-y-16">
      <header className="max-w-4xl space-y-4 md:space-y-5">
        <p className="kicker">About</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          A builder&apos;s journey with systems, scale, and purpose
        </h1>
        <p className="max-w-3xl text-base leading-8 text-[color:var(--muted)]">
          I build backend systems that stay reliable under pressure, communicate
          clearly to stakeholders, and create measurable business outcomes.
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="surface-panel space-y-5 p-8 leading-8 md:p-10">
          {siteConfig.aboutNarrative.map((paragraph) => (
            <p key={paragraph} className="text-[color:var(--muted)]">
              {paragraph}
            </p>
          ))}
        </article>

        <aside className="space-y-5">
          <div className="surface-panel p-6">
            <h2 className="text-xl font-semibold">Current Focus</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {spotlightMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="surface-card rounded-xl p-3.5"
                >
                  <p className="text-xs text-[color:var(--muted)]">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold">{metric.value}</p>
                  <p className="mt-1 text-xs leading-5 text-[color:var(--muted)]">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-[var(--border)] bg-[color:var(--accent-soft)] px-3 py-2 text-xs text-[color:var(--accent-strong)]">
              {siteConfig.location} | {siteConfig.workAuthorization.visa}
            </div>
          </div>

          <div className="surface-panel p-6">
            <h2 className="text-xl font-semibold">Engineering Mindset</h2>
            <ul className="mt-4 space-y-3 text-sm text-[color:var(--muted)]">
              {siteConfig.mindset.map((item, index) => (
                <li
                  key={item}
                  className="surface-card flex items-start gap-3 rounded-xl px-3.5 py-3"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7400B8,#5E60CE)] text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="leading-6">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="surface-panel relative overflow-hidden p-8 md:p-10">
        <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[color:var(--accent-soft)] blur-2xl" />
        <h2 className="text-2xl font-semibold">
          Mission &amp; Long-Term Vision
        </h2>
        <p className="relative mt-4 max-w-4xl leading-8 text-[color:var(--muted)]">
          {siteConfig.mission}
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="surface-panel p-7 md:p-8">
          <h2 className="text-2xl font-semibold">Education</h2>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Academic foundation, research exposure, and outcomes.
          </p>
          <div className="mt-5 space-y-4">
            {siteConfig.education.map((item) => (
              <div
                key={`${item.degree}-${item.period}`}
                className="surface-card overflow-hidden rounded-2xl"
              >
                <div className="h-1.5 bg-[linear-gradient(90deg,#7400B8,#5E60CE,#4EA8DE)]" />
                <div className="space-y-4 p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-[4.5rem] w-[6.5rem] shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[color:var(--surface-strong)] p-2">
                      <Image
                        src={item.logo}
                        alt={item.logoAlt}
                        width={160}
                        height={70}
                        className="h-11 w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base leading-6 font-semibold">
                        {item.degree}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                        {item.institution}
                      </p>
                      <p className="mt-2 inline-flex rounded-full border border-[var(--border)] bg-[color:var(--accent-soft)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[color:var(--accent-strong)]">
                        {item.period}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2.5">
                    {item.details.map((detail) => {
                      const [left, ...rightParts] = detail.split(":");
                      const hasValue = rightParts.length > 0;
                      const right = rightParts.join(":").trim();

                      return (
                        <li
                          key={detail}
                          className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[color:var(--surface-strong)] px-3.5 py-2.5 text-sm leading-6 text-[color:var(--muted)]"
                        >
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[color:var(--accent)]" />
                          {hasValue ? (
                            <p>
                              <span className="font-semibold text-[color:var(--foreground)]">
                                {left}:
                              </span>{" "}
                              {right}
                            </p>
                          ) : (
                            <p>{detail}</p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="surface-panel p-7">
          <h2 className="text-2xl font-semibold">Selected Achievements</h2>
          <ul className="mt-5 space-y-3">
            {siteConfig.achievements.map((item, index) => (
              <li
                key={item}
                className="surface-card rounded-xl px-4 py-3.5 text-sm leading-7 text-[color:var(--muted)]"
              >
                <span className="mr-2 font-mono text-xs text-[color:var(--accent)]">
                  0{index + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
