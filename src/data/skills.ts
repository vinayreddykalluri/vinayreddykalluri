export type SkillGroup = {
  label: string;
  items: string[];
};

/** Core technical skills, grouped as they read on the résumé. */
export const skillGroups: SkillGroup[] = [
  {
    label: "Backend (Primary)",
    items: [
      "Java",
      "Spring Boot (MVC, Data JPA, Security)",
      "Hibernate",
      "REST APIs",
      "WebSocket",
      "JSON (Jackson/Gson)",
      "Lombok",
    ],
  },
  {
    label: "Microservices & Integration",
    items: [
      "Microservices",
      "Event-driven architecture",
      "Distributed systems",
      "Real-time communication",
      "Kafka (Streams)",
      "API design & integration",
    ],
  },
  {
    label: "Datastores",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "AWS (EC2, S3, Lambda, RDS, CloudWatch)",
      "Docker",
      "GitHub Actions",
      "Jenkins",
      "Terraform",
      "Maven / Gradle",
    ],
  },
  {
    label: "Testing & Quality",
    items: ["JUnit 5", "Mockito", "REST Assured", "Postman", "SonarQube"],
  },
  {
    label: "AI-Assisted Engineering",
    items: [
      "GitHub Copilot",
      "OpenAI Codex",
      "Claude",
      "Prompt engineering",
    ],
  },
  {
    label: "Tooling",
    items: [
      "Linux (Ubuntu)",
      "Bash",
      "Git / GitHub",
      "IntelliJ IDEA",
      "VS Code",
    ],
  },
];
