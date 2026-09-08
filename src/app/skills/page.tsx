import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { SkillsExplorer } from "@/components/skills-explorer";
import { skillGroups } from "@/data/skills";
import { buildSkillUsage, usageStats } from "@/lib/skill-usage";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "Skills",
  description:
    "The stack behind eight years of backend engineering, cross-referenced against the roles that used it: Java, Spring Boot, Apache Kafka, AWS, and the datastores, tooling, and testing around them.",
  path: "/skills",
});

export default function SkillsPage() {
  const usage = buildSkillUsage();
  const stats = usageStats(usage);

  const figures = [
    { value: String(stats.total), label: "Technologies" },
    { value: String(stats.proven), label: "Shipped in production" },
    { value: String(stats.deep), label: "Used in 3+ roles" },
    {
      value: stats.earliest ? String(stats.earliest) : "—",
      label: "Earliest in the stack",
    },
  ];

  return (
    <div className="shell py-14 md:py-20">
      <PageHeader
        kicker="Skills"
        title="Not a list. A record of what shipped."
        lede="Every technology here is cross-referenced against the roles that actually used it, so each one carries how many roles it appeared in, since when, and where. Search it, filter it, or narrow to only what has run in production."
      />

      <section className="grid gap-x-8 gap-y-10 border-b border-[var(--border)] py-12 sm:grid-cols-2 lg:grid-cols-4">
        {figures.map((figure) => (
          <div
            key={figure.label}
            className="border-t-2 border-[color:var(--accent)] pt-5"
          >
            <p className="stat-figure">{figure.value}</p>
            <p className="data-label mt-3 text-[color:var(--faint)]">
              {figure.label}
            </p>
          </div>
        ))}
      </section>

      <SkillsExplorer
        usage={usage}
        groups={skillGroups.map((group) => ({
          label: group.label,
          summary: group.summary,
        }))}
      />
    </div>
  );
}
