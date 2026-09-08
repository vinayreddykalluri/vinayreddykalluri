import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
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
    <div className="shell py-14 md:py-20">
      <PageHeader
        kicker="Career"
        title="Experience framed by impact, scale, and reliability."
        lede="Architectural ownership, distributed systems performance, and production reliability outcomes — in the order they happened."
      />

      <section>
        {experiences.map((experience, index) => (
          <Reveal key={`${experience.company}-${experience.tenure}`}>
            <ExperienceCard experience={experience} index={index} />
          </Reveal>
        ))}
      </section>

      <section className="flex flex-wrap items-center justify-between gap-6 pt-14">
        <div>
          <p className="kicker">Skills</p>
          <h2 className="display-lg mt-3 max-w-[20ch]">
            The stack behind all of it.
          </h2>
        </div>
        <Link href="/skills" className="cta-primary px-7 py-3 text-sm">
          Browse the full stack
        </Link>
      </section>
    </div>
  );
}
