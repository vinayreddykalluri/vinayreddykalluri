export type ProjectItem = {
  name: string;
  type: "Platform" | "Product" | "Mobile App";
  period: string;
  problem: string;
  solution: string;
  stack: string[];
  impact: string;
  href?: string;
  hrefLabel?: string;
};

export const projects: ProjectItem[] = [
  {
    name: "Work Visa Insights",
    type: "Platform",
    period: "2025 - Present",
    problem:
      "Employer sponsorship data for U.S. work visas is scattered across large, messy public datasets, so applicants and employers have no reliable way to see real sponsorship trends.",
    solution:
      "Built a backend platform that aggregates and analyzes USCIS, H-1B, and PERM public datasets, with ETL pipelines and normalized PostgreSQL schemas that clean, deduplicate, and load multi-year data for accurate reporting.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "ETL", "REST APIs"],
    impact:
      "Turns raw federal filing data into employer sponsorship trends and visa outcome insights, served through Spring Boot REST APIs with filtering, search, and pagination.",
    href: "https://workvisainsights.com",
    hrefLabel: "workvisainsights.com",
  },
  {
    name: "Sales Incentive Compensation System",
    type: "Platform",
    period: "2024 - Present",
    problem:
      "Commission workflows at Elevance Health were manual, error-prone, and difficult to reconcile across distributed systems.",
    solution:
      "Designed an event-driven backend on Java, Spring Boot, Kafka, and MySQL with orchestration, idempotency, sequencing, multi-level retries, and dead-letter handling.",
    stack: ["Java", "Spring Boot", "Kafka", "MySQL", "Redis", "AWS"],
    impact:
      "Reduced manual processing by 40%, held data consistency above 99.9%, raised API throughput by 20%, and cut migration load time by 75%.",
  },
  {
    name: "Play Together",
    type: "Mobile App",
    period: "2017 - 2018",
    problem:
      "Wanted to own a product end to end — design, build, ship, and maintain a real Android app in front of real users.",
    solution:
      "Developed and released an Android app for social play matching with responsive UI and complete user flows in Flutter and Dart, integrating REST APIs with local persistence for offline-friendly use.",
    stack: ["Flutter", "Dart", "REST APIs", "Google Play"],
    impact:
      "Published on Google Play with full ownership of testing, release management, and ongoing updates.",
    href: "https://play.google.com/store/apps/dev?id=5669286937377429055",
    hrefLabel: "View on Google Play",
  },
];
