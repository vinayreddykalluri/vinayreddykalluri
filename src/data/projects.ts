export type ProjectItem = {
  name: string;
  type: "Platform" | "Product" | "Mobile App";
  period: string;
  problem: string;
  solution: string;
  stack: string[];
  impact: string;
  href?: string;
};

export const projects: ProjectItem[] = [
  {
    name: "Work Visa Insights",
    type: "Platform",
    period: "2025 - Present",
    problem:
      "International professionals often struggle to understand fragmented U.S. work visa and immigration pathways.",
    solution:
      "Built a content and insights platform concept that translates complex visa pathways into clear, actionable guidance with structured resource navigation.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Static Content Architecture"],
    impact:
      "Established a mission-driven product direction at the intersection of technology, immigration clarity, and public access to information.",
  },
  {
    name: "Sales Compensation Backend Platform",
    type: "Platform",
    period: "2024 - Present",
    problem:
      "Commission workflows were manual, error-prone, and difficult to reconcile across distributed systems.",
    solution:
      "Designed an event-driven backend platform using Spring Boot, Kafka, and MySQL with robust orchestration, retries, and consistency safeguards.",
    stack: ["Java", "Spring Boot", "Kafka", "MySQL", "Redis", "AWS"],
    impact: "Reduced manual effort by 40%, improved consistency to 99.9%, and increased API throughput by 20%.",
  },
  {
    name: "Revisitly",
    type: "Product",
    period: "2023",
    problem: "Users lacked a clean way to organize and revisit saved web discoveries across categories.",
    solution:
      "Created a lightweight product concept focused on quick capture, contextual notes, and deliberate revisit workflows.",
    stack: ["Flutter", "Dart", "REST APIs", "Firebase-ready Architecture"],
    impact: "Improved personal knowledge retention patterns and validated product-thinking workflows from ideation to launch.",
  },
  {
    name: "Flames Match",
    type: "Mobile App",
    period: "2017 - 2018",
    problem: "Needed a polished, production-ready Android app to publish and validate mobile development capabilities.",
    solution:
      "Designed and released a complete Android application with focused UX, responsive UI flows, and market distribution readiness.",
    stack: ["Android SDK", "Java", "Material Design", "Google Play"],
    impact: "Published on Google Play and established early proof of end-to-end product execution.",
    href: "https://play.google.com/dev?id=56692869",
  },
];
