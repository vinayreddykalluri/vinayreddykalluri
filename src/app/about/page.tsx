import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";
import { AchievementList } from "./_components/AchievementList";
import { EducationCard } from "./_components/EducationCard";
import { JourneyTimeline } from "./_components/JourneyTimeline";
import { MetricGrid } from "./_components/MetricGrid";
import { NarrativePanel } from "./_components/NarrativePanel";
import { SectionHeader } from "./_components/SectionHeader";
import { VisionPanel } from "./_components/VisionPanel";

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
    <div className="shell py-14 md:py-20 relative space-y-16 pb-2 md:space-y-20">
      <div className="pointer-events-none absolute -top-8 left-[15%] h-36 w-36 rounded-full bg-[color:var(--accent-soft)] blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] top-[22rem] h-44 w-44 rounded-full bg-[color:var(--accent-soft)] blur-3xl" />

      {/* Section-level reveal preserves motion quality without wrapping every card. */}
      <Reveal>
        <section className="relative max-w-5xl space-y-5">
          <SectionHeader
            kicker="About"
            headingLevel="h1"
            title="A builder&apos;s journey with systems, scale, and purpose"
            titleClassName="text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
            description="I build backend systems that stay reliable under pressure, communicate clearly to stakeholders, and create measurable business outcomes."
          />
        </section>
      </Reveal>

      <Reveal delay={0.04}>
        <section className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <NarrativePanel narrative={siteConfig.aboutNarrative} />
          <MetricGrid
            metrics={spotlightMetrics}
            mindset={siteConfig.mindset}
            location={siteConfig.location}
            visa={siteConfig.workAuthorization.visa}
          />
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <JourneyTimeline journey={siteConfig.journey} />
      </Reveal>

      <Reveal delay={0.1}>
        <VisionPanel mission={siteConfig.mission} />
      </Reveal>

      <Reveal delay={0.12}>
        <section className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
          <article className="relative overflow-hidden rounded-[3px] border border-[var(--border)] bg-[color:var(--surface)] p-7 md:p-8">
            <SectionHeader
              title="Education"
              description="Academic foundation, research exposure, and outcomes."
              titleClassName="text-2xl md:text-[2rem]"
            />

            <div className="mt-6 space-y-4">
              {siteConfig.education.map((item) => (
                <EducationCard
                  key={`${item.degree}-${item.period}`}
                  item={item}
                />
              ))}
            </div>
          </article>

          <AchievementList achievements={siteConfig.achievements} />
        </section>
      </Reveal>
    </div>
  );
}
