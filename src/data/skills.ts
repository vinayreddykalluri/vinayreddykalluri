export type Skill = {
  name: string;
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
      { name: "Java", domain: "java.com" },
      { name: "Spring Boot", domain: "spring.io" },
      { name: "Spring Security", domain: "spring.io" },
      { name: "Hibernate", domain: "hibernate.org" },
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
      { name: "Apache Kafka", domain: "kafka.apache.org" },
      { name: "Kafka Streams", domain: "kafka.apache.org" },
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
      { name: "MySQL", domain: "mysql.com" },
      { name: "PostgreSQL", domain: "postgresql.org" },
      { name: "MongoDB", domain: "mongodb.com" },
      { name: "Redis", domain: "redis.io" },
    ],
  },
  {
    label: "Cloud & DevOps",
    summary: "Provisioning, shipping, and keeping it running.",
    items: [
      { name: "AWS", domain: "aws.amazon.com" },
      { name: "Docker", domain: "docker.com" },
      { name: "Kubernetes", domain: "kubernetes.io" },
      { name: "Terraform", domain: "terraform.io" },
      { name: "GitHub Actions", domain: "github.com" },
      { name: "Jenkins", domain: "jenkins.io" },
      { name: "Cloudflare", domain: "cloudflare.com" },
      { name: "Maven", domain: "maven.apache.org" },
      { name: "Gradle", domain: "gradle.org" },
    ],
  },
  {
    label: "Testing & quality",
    summary: "Proving it works before production does it for you.",
    items: [
      { name: "JUnit 5", domain: "junit.org" },
      { name: "Mockito", domain: "site.mockito.org" },
      { name: "REST Assured", domain: "rest-assured.io" },
      { name: "Postman", domain: "postman.com" },
      { name: "SonarQube", domain: "sonarsource.com" },
    ],
  },
  {
    label: "AI-assisted engineering",
    summary: "Used deliberately, and reviewed like any other contribution.",
    items: [
      { name: "GitHub Copilot", domain: "github.com" },
      { name: "OpenAI Codex", domain: "openai.com" },
      { name: "Claude", domain: "anthropic.com" },
      { name: "Prompt engineering" },
    ],
  },
  {
    label: "Tooling",
    summary: "The everyday environment.",
    items: [
      { name: "Linux / Ubuntu", domain: "ubuntu.com" },
      { name: "Git", domain: "git-scm.com" },
      { name: "GitHub", domain: "github.com" },
      { name: "IntelliJ IDEA", domain: "jetbrains.com" },
      { name: "VS Code", domain: "code.visualstudio.com" },
      { name: "Bash" },
    ],
  },
  {
    label: "Also shipped with",
    summary: "Beyond the backend, from products built end to end.",
    items: [
      { name: "TypeScript", domain: "typescriptlang.org" },
      { name: "Next.js", domain: "nextjs.org" },
      { name: "React", domain: "react.dev" },
      { name: "Tailwind CSS", domain: "tailwindcss.com" },
      { name: "Flutter", domain: "flutter.dev" },
      { name: "Dart", domain: "dart.dev" },
      { name: "Python", domain: "python.org" },
      { name: "Firebase", domain: "firebase.google.com" },
    ],
  },
];

export const skillCount = skillGroups.reduce(
  (total, group) => total + group.items.length,
  0,
);
