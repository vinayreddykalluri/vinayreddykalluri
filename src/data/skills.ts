export type Skill = {
  name: string;
  /**
   * Simple Icons slug. Resolved to an inline SVG path at build time, so a
   * technology mark costs no network request at all — unlike the company
   * logos, which have to go through the proxy.
   */
  icon?: string;
  /**
   * Domain of the project or vendor behind the technology, used to resolve a
   * mark via the /api/logo proxy. Omitted where the item is a practice rather
   * than a product (there is no logo for "event-driven architecture"), and the
   * tile falls back to a monogram.
   */
  domain?: string;
};

export type SkillGroup = {
  label: string;
  summary: string;
  items: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Backend",
    summary:
      "The primary stack — where most of the last eight years has been spent.",
    items: [
      { name: "Java", icon: "openjdk", domain: "java.com" },
      { name: "Spring Boot", icon: "springboot", domain: "spring.io" },
      { name: "Spring Security", icon: "springsecurity", domain: "spring.io" },
      { name: "Hibernate", icon: "hibernate", domain: "hibernate.org" },
      { name: "REST APIs" },
      { name: "WebSocket" },
      { name: "Jackson / Gson" },
      { name: "Lombok", domain: "projectlombok.org" },
    ],
  },
  {
    label: "Microservices & integration",
    summary:
      "Moving data between services without coupling them to each other.",
    items: [
      { name: "Apache Kafka", icon: "apachekafka", domain: "kafka.apache.org" },
      { name: "Kafka Streams", icon: "apachekafka", domain: "kafka.apache.org" },
      { name: "Event-driven architecture" },
      { name: "Distributed systems" },
      { name: "API design" },
      { name: "Idempotency & retries" },
    ],
  },
  {
    label: "Datastores",
    summary: "Relational where it matters, cache and document where it helps.",
    items: [
      { name: "MySQL", icon: "mysql", domain: "mysql.com" },
      { name: "PostgreSQL", icon: "postgresql", domain: "postgresql.org" },
      { name: "MongoDB", icon: "mongodb", domain: "mongodb.com" },
      { name: "Redis", icon: "redis", domain: "redis.io" },
    ],
  },
  {
    label: "Cloud & DevOps",
    summary: "Provisioning, shipping, and keeping it running.",
    items: [
      { name: "AWS", domain: "aws.amazon.com" },
      { name: "Docker", icon: "docker", domain: "docker.com" },
      { name: "Kubernetes", icon: "kubernetes", domain: "kubernetes.io" },
      { name: "Terraform", icon: "terraform", domain: "terraform.io" },
      { name: "GitHub Actions", icon: "githubactions", domain: "github.com" },
      { name: "Jenkins", icon: "jenkins", domain: "jenkins.io" },
      { name: "Cloudflare", icon: "cloudflare", domain: "cloudflare.com" },
      { name: "Maven", icon: "apachemaven", domain: "maven.apache.org" },
      { name: "Gradle", icon: "gradle", domain: "gradle.org" },
    ],
  },
  {
    label: "Testing & quality",
    summary: "Proving it works before production does it for you.",
    items: [
      { name: "JUnit 5", icon: "junit5", domain: "junit.org" },
      { name: "Mockito", domain: "site.mockito.org" },
      { name: "REST Assured", domain: "rest-assured.io" },
      { name: "Postman", icon: "postman", domain: "postman.com" },
      { name: "SonarQube", domain: "sonarsource.com" },
    ],
  },
  {
    label: "AI-assisted engineering",
    summary: "Used deliberately, and reviewed like any other contribution.",
    items: [
      { name: "GitHub Copilot", icon: "githubcopilot", domain: "github.com" },
      { name: "OpenAI Codex", domain: "openai.com" },
      { name: "Claude", icon: "anthropic", domain: "anthropic.com" },
      { name: "Prompt engineering" },
    ],
  },
  {
    label: "Tooling",
    summary: "The everyday environment.",
    items: [
      { name: "Linux / Ubuntu", icon: "ubuntu", domain: "ubuntu.com" },
      { name: "Git", icon: "git", domain: "git-scm.com" },
      { name: "GitHub", icon: "github", domain: "github.com" },
      { name: "IntelliJ IDEA", icon: "intellijidea", domain: "jetbrains.com" },
      { name: "VS Code", icon: "vscodium", domain: "code.visualstudio.com" },
      { name: "Bash", icon: "gnubash" },
    ],
  },
  {
    label: "Also shipped with",
    summary: "Beyond the backend, from products built end to end.",
    items: [
      { name: "TypeScript", icon: "typescript", domain: "typescriptlang.org" },
      { name: "Next.js", icon: "nextdotjs", domain: "nextjs.org" },
      { name: "React", icon: "react", domain: "react.dev" },
      { name: "Tailwind CSS", icon: "tailwindcss", domain: "tailwindcss.com" },
      { name: "Flutter", icon: "flutter", domain: "flutter.dev" },
      { name: "Dart", icon: "dart", domain: "dart.dev" },
      { name: "Python", icon: "python", domain: "python.org" },
      { name: "Firebase", icon: "firebase", domain: "firebase.google.com" },
    ],
  },
];

export const skillCount = skillGroups.reduce(
  (total, group) => total + group.items.length,
  0,
);
