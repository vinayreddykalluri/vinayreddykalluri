export type Position = {
  role: string;
  period: string;
  /** Marks the role currently held, so it can be badged. */
  current?: boolean;
  summary?: string;
  highlights: string[];
  stack: string[];
};

export type ExperienceItem = {
  company: string;
  /** Corporate domain, used to resolve a logo via the /api/logo proxy. */
  domain?: string;
  /** Prior name, where the employer has since been renamed. */
  formerly?: string;
  location: string;
  /** Total span at the company, across every position held there. */
  tenure: string;
  employmentType?: string;
  /**
   * Positions held at this company, newest first. Modelled as a list rather
   * than a single flat role so promotions stay visible instead of being
   * collapsed into whatever the latest title happens to be.
   */
  positions: Position[];
};

export const experiences: ExperienceItem[] = [
  {
    company: "UST",
    domain: "ust.com",
    location: "Atlanta, GA",
    tenure: "Jan 2024 - Present",
    employmentType: "Full-time · Hybrid",
    positions: [
      {
        role: "Lead I - Software Engineering",
        period: "Aug 2026 - Present",
        current: true,
        summary:
          "Promoted to Lead I for demonstrating technical leadership across backend initiatives.",
        highlights: [
          "Lead backend delivery for Elevance Health compensation platforms, owning architecture decisions and the reliability of what ships.",
          "Set direction on event-driven design, failure recovery, and data consistency across the services the team runs.",
          "Mentor engineers on Java, Spring Boot, and Kafka practice, and review the designs that reach production.",
        ],
        stack: [
          "Java",
          "Spring Boot",
          "Apache Kafka",
          "AWS",
          "Technical Leadership",
        ],
      },
      {
        role: "Developer III - Software Engineering",
        period: "Jan 2024 - Aug 2026",
        summary:
          "Built the Sales Incentive Compensation System for Elevance Health, and the event-driven platform underneath it.",
        highlights: [
          "Designed and delivered a Sales Incentive Compensation System for Elevance Health using Java, Spring Boot, Apache Kafka, and MySQL, automating incentive workflows and reducing manual processing by 40%.",
          "Architected an event-driven microservices ecosystem with Kafka (pub/sub, consumer groups) enabling near real-time data synchronization across distributed services and high-throughput pipelines.",
          "Increased API performance by 20% through asynchronous processing, Redis caching, and JVM tuning with profiling and GC analysis.",
          "Led a large-scale data migration using parallel processing, SQL optimization, and batch orchestration, cutting end-to-end load time by 75%.",
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
    ],
  },
  {
    company: "Hays",
    domain: "hays.com",
    location: "Kansas City, MO",
    tenure: "Mar 2023 - Jan 2024",
    employmentType: "Full-time · Client: Anthem",
    positions: [
      {
        role: "Software Engineering Consultant",
        period: "Mar 2023 - Jan 2024",
        summary:
          "Modernized enterprise services onto AWS microservices with Kafka streaming, hardened APIs, and infrastructure automation.",
        highlights: [
          "Migrated and standardized 20+ services to Java and Spring Boot microservices on AWS (EC2, RDS, S3), improving scalability and deployment consistency.",
          "Designed Kafka-based event-driven pipelines for sales and insurance commission processing, optimizing topic and partition strategy, consumer groups, and replay/backfill for high-throughput workloads.",
          "Built resilient processing and recovery with idempotency, multi-level retries, and dead-letter handling, improving operational stability and data correctness.",
          "Developed secure, high-volume REST APIs with Spring MVC and Spring Security, adding validation, pagination, and rate limiting for low-latency integrations.",
          "Automated provisioning and releases with AWS CloudFormation and CI/CD (GitHub Actions, Jenkins), and sustained stability under 100K+ concurrent users through load testing and profiling.",
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
    ],
  },
  {
    company: "University of Missouri-Kansas City",
    domain: "umkc.edu",
    location: "Kansas City, MO",
    tenure: "Feb 2022 - Jun 2022",
    employmentType: "Part-time",
    positions: [
      {
        role: "Graduate Research Assistant",
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
    ],
  },
  {
    company: "Carelon",
    domain: "carelon.com",
    formerly: "Legato Health Technologies",
    location: "Hyderabad, India",
    tenure: "Dec 2019 - Dec 2021",
    employmentType: "Full-time",
    positions: [
      {
        role: "Software Engineer",
        period: "Dec 2019 - Dec 2021",
        summary:
          "Delivered high-volume healthcare services and built the observability and error-handling foundation the platform ran on.",
        highlights: [
          "Developed and maintained Java and Spring Boot services and RESTful APIs for healthcare platforms using Spring MVC, JDBC Template, and SQL, supporting millions of daily transactions.",
          "Implemented Kafka-based integration to decouple services and enable near real-time data exchange, improving interoperability across internal systems.",
          "Improved ETL and batch job performance by 30% through SQL tuning (indexing, query plans), batch execution, and application-level caching.",
          "Built a reusable observability and error-handling foundation with centralized logging, standardized exception mapping, correlation IDs, and actionable metrics, reducing triage time and production defects.",
          "Led Agile ceremonies and partnered with BAs and QA to deliver features across complex healthcare workflows.",
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
    ],
  },
  {
    company: "Cognizant",
    domain: "cognizant.com",
    location: "Hyderabad, India",
    tenure: "Sep 2017 - Nov 2019",
    employmentType: "Full-time",
    positions: [
      {
        role: "Programmer Analyst",
        period: "Sep 2018 - Nov 2019",
        summary:
          "Built event-driven backend services for Anthem at high event throughput, and mentored engineers on Java practice.",
        highlights: [
          "Developed and supported Java and Spring Boot microservices for Anthem Inc. using Apache Kafka to implement event-driven architecture, processing 1M+ events per day.",
          "Improved application and database performance by optimizing SQL (query refactoring, indexing, execution plan analysis) and implementing Redis caching, reducing API response time by 35%.",
          "Built internal automation tools and scripts in Java, Python, and Shell to streamline operational workflows, reducing manual effort by 60%.",
          "Delivered production features in Agile sprints, coordinating with product owners, QA, and DevOps.",
          "Mentored junior developers on Java best practices, Git workflows, and microservices patterns, improving code quality and onboarding speed.",
        ],
        stack: ["Java", "Spring Boot", "Kafka", "Redis", "SQL", "Python", "Shell"],
      },
      {
        role: "Programmer Analyst Trainee",
        period: "Sep 2017 - Aug 2018",
        summary:
          "Trained into the Java stack and deployed to the Healthcare Business Unit.",
        highlights: [
          "Completed intensive training in full-stack Java web development covering the Spring Framework, RESTful APIs, and MongoDB.",
          "Deployed to the Healthcare Business Unit, supporting real-world development and API integrations.",
          "Gained hands-on experience with Git, Bitbucket, Kafka, and core software engineering principles.",
        ],
        stack: ["Java", "Spring Framework", "REST APIs", "MongoDB", "Git"],
      },
    ],
  },
];

/** Every position held, newest first, with its company attached. */
export const allPositions = experiences.flatMap((company) =>
  company.positions.map((position) => ({ ...position, company })),
);

/** Distinct technologies across every position, most senior role first. */
export const allStack = Array.from(
  new Set(allPositions.flatMap((position) => position.stack)),
);
