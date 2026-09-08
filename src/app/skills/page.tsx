import type { Metadata } from "next";
import { CompanyLogo } from "@/components/company-logo";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/Reveal";
import { skillCount, skillGroups } from "@/data/skills";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "Skills",
  description:
    "The stack behind eight years of backend engineering: Java, Spring Boot, Apache Kafka, AWS, and the datastores, tooling, and testing around them.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <div className="shell py-14 md:py-20">
      <PageHeader
        kicker="Skills"
        title="The stack behind the outcomes."
        lede="Grouped by what it is used for rather than by how impressive it looks in a list. Everything here has shipped to production or into a released product."
        aside={
          <div className="text-right">
            <p className="stat-figure">{skillCount}</p>
            <p className="data-label mt-2 text-[color:var(--faint)]">
              Technologies
            </p>
          </div>
        }
      />

      <div className="flex flex-col">
        {skillGroups.map((group, index) => (
          <Reveal key={group.label}>
            <section className="grid gap-8 border-b border-[var(--border)] py-12 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-12">
              <div>
                <p className="stat-figure mb-4 text-[color:var(--border)] md:text-[2.5rem]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="font-sans text-xl font-bold leading-tight">
                  {group.label}
                </h2>
                <p className="mt-3 leading-relaxed text-[color:var(--muted)]">
                  {group.summary}
                </p>
                <p className="data-label mt-4 text-[color:var(--faint)]">
                  {group.items.length} items
                </p>
              </div>

              <ul className="grid grid-cols-2 gap-px self-start bg-[color:var(--border)] sm:grid-cols-3 lg:grid-cols-4">
                {group.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-3 bg-[color:var(--background)] p-4 transition-colors hover:bg-[color:var(--surface)]"
                  >
                    <CompanyLogo
                      domain={skill.domain}
                      name={skill.name}
                      size={32}
                    />
                    <span className="text-[0.9rem] font-medium leading-snug">
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
