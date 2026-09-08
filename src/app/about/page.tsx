import Image from "next/image";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/Reveal";
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
  const { credentials } = siteConfig;

  return (
    <div className="shell py-14 md:py-20">
      <PageHeader
        kicker="About"
        title="A builder's journey with systems, scale, and purpose."
        lede="I build backend systems that stay reliable under pressure, communicate clearly to stakeholders, and create measurable business outcomes."
      />

      {/* ---------- narrative + principles ---------- */}
      <Reveal>
        <section className="grid gap-12 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="flex flex-col gap-5">
            {siteConfig.aboutNarrative.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 40)}
                className={`measure text-[1.05rem] leading-relaxed ${
                  index === 0 ? "drop-cap" : "text-[color:var(--muted)]"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <aside>
            <p className="kicker">How I work</p>
            <ol className="mt-6 flex flex-col">
              {siteConfig.mindset.map((principle, index) => (
                <li
                  key={principle}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-[var(--border)] py-5"
                >
                  <span className="data-label text-[color:var(--faint)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans font-semibold leading-snug">
                    {principle}
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </section>
      </Reveal>

      {/* ---------- metrics band ---------- */}
      <Reveal>
        <section className="band-invert -mx-[clamp(1.25rem,5vw,5rem)] px-[clamp(1.25rem,5vw,5rem)] py-14 md:py-20">
          <p className="kicker">By the numbers</p>
          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.metrics.slice(0, 4).map((metric) => (
              <div
                key={metric.label}
                className="border-t-2 border-current/25 pt-5"
              >
                <p className="stat-figure">{metric.value}</p>
                <p className="data-label mt-3">{metric.label}</p>
                <p className="band-dim mt-2 text-[0.95rem] leading-relaxed">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ---------- journey ---------- */}
      <Reveal>
        <section className="py-14">
          <p className="kicker">The journey</p>
          <h2 className="display-lg mt-4 max-w-[18ch]">
            India to Atlanta, one system at a time.
          </h2>

          <ol className="mt-12">
            {siteConfig.journey.map((step) => (
              <li
                key={step.year}
                className="grid gap-4 border-b border-[var(--border)] py-8 md:grid-cols-[minmax(0,12rem)_1fr] md:gap-12"
              >
                <span className="data-label text-[color:var(--accent-strong)]">
                  {step.year}
                </span>
                <div>
                  <h3 className="font-sans text-xl font-bold">{step.title}</h3>
                  <p className="measure-wide mt-2 leading-relaxed text-[color:var(--muted)]">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      {/* ---------- mission ---------- */}
      <Reveal>
        <section className="band-accent -mx-[clamp(1.25rem,5vw,5rem)] px-[clamp(1.25rem,5vw,5rem)] py-14 md:py-20">
          <span className="kicker">Mission</span>
          <p className="mt-6 max-w-[38ch] font-sans text-2xl font-bold leading-snug md:text-4xl">
            {siteConfig.mission}
          </p>
        </section>
      </Reveal>

      {/* ---------- education ---------- */}
      <Reveal>
        <section className="py-14">
          <p className="kicker">Education</p>
          <h2 className="display-lg mt-4 max-w-[18ch]">
            Where the foundation was built.
          </h2>

          <div className="mt-12 grid gap-px bg-[color:var(--border)] md:grid-cols-2">
            {siteConfig.education.map((item) => (
              <article
                key={item.degree}
                className="bg-[color:var(--background)] p-7 md:p-9"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-16 w-24 shrink-0 items-center justify-center border border-[var(--border)] bg-[color:var(--surface-strong)] p-2">
                    <Image
                      src={item.logo}
                      alt={item.logoAlt}
                      width={160}
                      height={80}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-sans text-xl font-bold leading-tight">
                      {item.degree}
                    </h3>
                    <p className="mt-1.5 text-[color:var(--muted)]">
                      {item.institution}
                    </p>
                    <p className="data-label mt-2 text-[color:var(--faint)]">
                      {item.period}
                    </p>
                  </div>
                </div>
                <ul className="signal-track mt-6">
                  {item.details.map((detail) => (
                    <li key={detail} className="signal-pill">
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ---------- recognition ---------- */}
      <Reveal>
        <section className="border-t border-[var(--border)] py-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <p className="kicker">Selected impact</p>
              <ul className="mt-7 flex flex-col">
                {siteConfig.achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="relative border-b border-[var(--border)] py-5 pl-6 leading-relaxed"
                  >
                    <span
                      className="absolute left-0 top-[1.9em] h-px w-3 bg-[color:var(--accent)]"
                      aria-hidden="true"
                    />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="kicker">Honors &amp; recognition</p>
              <ul className="mt-7 flex flex-col">
                {credentials.honors.map((honor) => (
                  <li
                    key={honor}
                    className="border-b border-[var(--border)] py-5 leading-relaxed text-[color:var(--muted)]"
                  >
                    {honor}
                  </li>
                ))}
              </ul>

              <div className="mt-9 border border-[var(--border)] p-6">
                <p className="data-label text-[color:var(--faint)]">
                  Publication
                </p>
                <p className="mt-3 font-sans font-bold leading-snug">
                  {credentials.publication.title}
                </p>
                <p className="mt-2 text-[0.95rem] text-[color:var(--muted)]">
                  {credentials.publication.venue} &middot;{" "}
                  {credentials.publication.date}
                </p>
              </div>

              <div className="signal-track mt-6">
                <span className="signal-pill">
                  {credentials.certifications} certifications
                </span>
                {credentials.languages.map((language) => (
                  <span key={language} className="signal-pill">
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
