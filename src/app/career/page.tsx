import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ExperienceCard } from "@/components/experience-card";
import { experiences } from "@/data/experience";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "Career",
  description:
    "Career journey and impact metrics across backend engineering roles in healthcare and enterprise systems.",
  path: "/career",
});

export default function CareerPage() {
  return (
    <div className="shell py-14 md:py-20 space-y-10 md:space-y-12">
      <Reveal>
        <header className="max-w-3xl space-y-4">
          <p className="kicker">Career</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Experience framed by impact, scale, and reliability
          </h1>
          <p className="text-base leading-7 text-[color:var(--muted)]">
            Chronological experience focused on architectural ownership,
            distributed systems performance, and production reliability
            outcomes.
          </p>
        </header>
      </Reveal>

      <section className="space-y-6">
        {experiences.map((experience, index) => (
          <Reveal
            key={`${experience.company}-${experience.period}`}
            delay={0.04 * (index % 4)}
          >
            <ExperienceCard experience={experience} />
          </Reveal>
        ))}
      </section>
    </div>
  );
}
