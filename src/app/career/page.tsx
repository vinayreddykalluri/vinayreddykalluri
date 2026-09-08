import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/Reveal";
import { ExperienceCard } from "@/components/experience-card";
import { experiences } from "@/data/experience";
import { skillGroups } from "@/data/skills";
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
          <Reveal key={`${experience.company}-${experience.period}`}>
            <ExperienceCard experience={experience} index={index} />
          </Reveal>
        ))}
      </section>

      <section className="pt-14">
        <p className="kicker">Core technical skills</p>
        <h2 className="display-lg mt-4 max-w-[18ch]">
          The tools behind the outcomes.
        </h2>

        <dl className="mt-10 grid gap-px bg-[color:var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="bg-[color:var(--background)] p-6 md:p-7"
            >
              <dt className="data-label text-[color:var(--accent-strong)]">
                {group.label}
              </dt>
              <dd className="signal-track mt-4">
                {group.items.map((item) => (
                  <span key={item} className="signal-pill">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
