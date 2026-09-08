export type ExperienceItem = {
  role: string;
  company: string;
  /** Corporate domain, used to resolve a logo via the /api/logo proxy. */
  domain?: string;
  /** Present name, where the employer has since been renamed or absorbed. */
  nowKnownAs?: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experiences: ExperienceItem[] = [
  {
    role: "Lead I - Software Engineering",
    company: "UST",
    domain: "ust.com",
    location: "Atlanta, GA",
    period: "Jan 2024 - Present",
    summary:
      "Leading backend delivery for healthcare compensation platforms — event-driven architecture, resilient recovery pipelines, and large-scale data migration.",
    highlights: [
      "Designed and delivered a Sales Incentive Compensation System for Elevance Health using Java, Spring Boot, Apache Kafka, and MySQL, automating incentive workflows and reducing manual processing by 40%.",
      "Architected an event-driven microservices ecosystem with Kafka (pub/sub, consumer groups) enabling near real-time data synchronization across distributed services and high-throughput pipelines.",
      "Increased API performance by 20% through asynchronous processing (thread pools and non-blocking patterns), Redis caching, and JVM tuning with profiling and GC analysis.",
      "Led a complete data migration using parallel processing, SQL optimization, and batch orchestration, cutting end-to-end load time by 75%.",
      "Built resilient recovery pipelines with idempotency, sequencing, multi-level retries, and dead-letter handling, maintaining 99.9%+ data consistency and faster incident recovery.",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "Apache Kafka",
      "MySQL",
      "Redis",
      "AWS",
      "JVM Tuning",
    ],
  },
  {
    role: "Software Engineering Consultant",
    company: "Hays (Client: Anthem)",
    domain: "hays.com",
    location: "Kansas City, MO",
    period: "Mar 2023 - Jan 2024",
    summary:
      "Modernized enterprise services onto AWS microservices with Kafka streaming, hardened APIs, and infrastructure automation.",
    highlights: [
      "Migrated and standardized 20+ services to Java and Spring Boot microservices on AWS (EC2, RDS, S3), improving scalability and deployment consistency.",
      "Designed Kafka-based event-driven pipelines for sales and insurance commission processing, optimizing topic and partition strategy, consumer groups, and replay/backfill for high-throughput workloads.",
      "Built resilient processing and recovery with idempotency, multi-level retries, and dead-letter handling, improving operational stability and data correctness.",
      "Developed secure, high-volume REST APIs with Spring MVC and Spring Security, adding validation, pagination, and rate limiting for low-latency integrations across distributed systems.",
      "Automated provisioning and releases with AWS CloudFormation and CI/CD (GitHub Actions, Jenkins), and improved performance via JVM profiling, Redis caching, and targeted SQL optimization.",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "Kafka",
      "AWS",
      "CloudFormation",
      "CI/CD",
      "Spring Security",
    ],
  },
  {
    role: "Graduate Research Assistant",
    company: "University of Missouri-Kansas City",
    domain: "umkc.edu",
    location: "Kansas City, MO",
    period: "Feb 2022 - Jun 2022",
    summary:
      "Applied machine learning to smart grid security, detecting anomalies in Phasor Measurement Unit data streams.",
    highlights: [
      "Researched machine learning applications for smart grid anomaly detection, focused on identifying fraudulent behaviour in Phasor Measurement Unit (PMU) data.",
      "Built and evaluated predictive models in Python, improving anomaly classification accuracy on real-time energy data streams.",
      "Maintained reproducible research workflows and experiment tracking with Git-based collaboration.",
      "Contributed to a data-driven framework supporting energy efficiency and reliability in modern power systems.",
    ],
    stack: ["Python", "Machine Learning", "Research", "Git"],
  },
  {
    role: "Software Engineer",
    company: "Legato Health Technologies",
    domain: "carelon.com",
    nowKnownAs: "Carelon",
    location: "Hyderabad, India",
    period: "Dec 2019 - Dec 2021",
    summary:
      "Delivered high-volume healthcare services and built the observability and error-handling foundation the platform ran on.",
    highlights: [
      "Developed and maintained Java and Spring Boot services and RESTful APIs for healthcare platforms using Spring MVC, JDBC Template, and SQL, supporting millions of daily transactions.",
      "Implemented Kafka-based integration to decouple services and enable near real-time data exchange, improving interoperability across internal systems.",
      "Improved ETL and batch job performance by 30% through SQL tuning (indexing, query plans), batch execution, and application-level caching to reduce database round trips.",
      "Built a reusable observability and error-handling foundation with centralized logging, standardized exception mapping, correlation IDs, and actionable metrics, reducing triage time and production defects.",
      "Delivered features in an Agile/Scrum environment, partnering with QA, product, and DevOps on refinement, code reviews, and release support.",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "Kafka",
      "JDBC Template",
      "SQL",
      "Observability",
    ],
  },
  {
    role: "Programmer Analyst",
    company: "Cognizant",
    domain: "cognizant.com",
    location: "Hyderabad, India",
    period: "Sep 2017 - Nov 2019",
    summary:
      "Built event-driven backend services for Anthem at high event throughput, and mentored engineers on Java and microservice practice.",
    highlights: [
      "Developed and supported Java and Spring Boot microservices for Anthem Inc. using Apache Kafka to implement event-driven architecture, processing 1M+ events per day.",
      "Improved application and database performance by optimizing SQL (query refactoring, indexing, execution plan analysis) and implementing Redis caching, reducing API response time by 35%.",
      "Built internal automation tools and scripts in Java, Python, and Shell to streamline operational workflows, reducing manual effort by 60% and improving reliability.",
      "Collaborated in an Agile/Scrum environment on requirements, estimation, implementation, code reviews, and production support.",
      "Mentored junior developers on Java best practices, Git workflows, and microservices patterns, improving code quality and onboarding speed.",
    ],
    stack: ["Java", "Spring Boot", "Kafka", "Redis", "SQL", "Python", "Shell"],
  },
];
