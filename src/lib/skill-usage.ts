import { experiences } from "@/data/experience";
import { skillGroups, type Skill } from "@/data/skills";

export type SkillUsage = {
  skill: Skill;
  group: string;
  /** Distinct positions whose stack included this skill. */
  roleCount: number;
  /** Earliest year it appears in the work history, if it does. */
  since: number | null;
  /** Companies that used it, newest first, for the attribution row. */
  companies: { name: string; domain?: string }[];
};

/**
 * Skill names on the skills page and stack entries on roles are written for
 * different audiences ("Apache Kafka" vs "Kafka", "GitHub Actions" vs
 * "CI/CD"), so matching is by an explicit alias table rather than substring
 * containment — which would happily match "Git" inside "GitHub".
 */
const ALIASES: Record<string, string[]> = {
  "Apache Kafka": ["kafka", "apache kafka"],
  "Spring Boot": ["spring boot", "spring framework"],
  "Spring Security": ["spring security"],
  "REST APIs": ["rest apis", "rest api"],
  AWS: ["aws", "cloudformation"],
  "GitHub Actions": ["ci/cd", "github actions"],
  Jenkins: ["ci/cd"],
  Git: ["git"],
  GitHub: ["git"],
  MySQL: ["mysql", "sql"],
  PostgreSQL: ["postgresql"],
  // "Event-driven architecture" and "Distributed systems" alias to Kafka
  // because the role highlights say exactly that in prose. "Kafka Streams"
  // deliberately does not: no role stack names Streams, so claiming it ran in
  // five roles would be evidence the data does not support. It falls to the
  // toolbox tier instead.
  "Idempotency & retries": ["observability"],
  "Event-driven architecture": ["apache kafka", "kafka"],
  "Distributed systems": ["apache kafka", "kafka"],
  Python: ["python"],
  MongoDB: ["mongodb"],
  Java: ["java"],
  Redis: ["redis"],
};

const norm = (value: string) => value.trim().toLowerCase();

function startYear(period: string): number | null {
  const match = period.match(/(19|20)\d{2}/);
  return match ? Number(match[0]) : null;
}

function matches(skill: Skill, stackEntry: string) {
  const entry = norm(stackEntry);
  const aliases = ALIASES[skill.name]?.map(norm) ?? [norm(skill.name)];
  return aliases.includes(entry);
}

/** Cross-references every skill against the work history. */
export function buildSkillUsage(): SkillUsage[] {
  const usage: SkillUsage[] = [];

  for (const group of skillGroups) {
    for (const skill of group.items) {
      let roleCount = 0;
      let since: number | null = null;
      const companies: { name: string; domain?: string }[] = [];

      for (const company of experiences) {
        let usedHere = false;
        for (const position of company.positions) {
          if (!position.stack.some((entry) => matches(skill, entry))) continue;
          usedHere = true;
          roleCount += 1;
          const year = startYear(position.period);
          if (year && (since === null || year < since)) since = year;
        }
        if (usedHere) {
          companies.push({ name: company.company, domain: company.domain });
        }
      }

      usage.push({ skill, group: group.label, roleCount, since, companies });
    }
  }

  return usage;
}

export function usageStats(usage: SkillUsage[]) {
  const proven = usage.filter((u) => u.roleCount > 0);
  const deep = usage.filter((u) => u.roleCount >= 3);
  const earliest = proven.reduce<number | null>(
    (min, u) => (u.since && (min === null || u.since < min) ? u.since : min),
    null,
  );
  return {
    total: usage.length,
    proven: proven.length,
    deep: deep.length,
    earliest,
  };
}
