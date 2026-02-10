export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experiences: ExperienceItem[] = [
  {
    role: "Developer III - Software Engineering",
    company: "UST",
    location: "Atlanta, GA",
    period: "Jan 2024 - Present",
    summary:
      "Leading backend initiatives for healthcare compensation systems with event-driven architecture and large-scale data migration.",
    highlights: [
      "Designed and deployed a Sales Incentive Compensation System for Elevance Health using Spring Boot, Kafka, and MySQL, reducing manual processing by 40%.",
      "Architected a Kafka-driven microservices platform for real-time synchronization across distributed systems and high-volume data pipelines.",
      "Improved API throughput by 20% through asynchronous execution, Redis caching, and JVM profiling.",
      "Led a 35TB+ migration initiative with optimized SQL and batch orchestration, reducing processing time from 16 days to 4 days.",
      "Implemented fault-tolerant recovery with sequencing logic and multi-level retries, sustaining 99.9% data consistency.",
    ],
    stack: ["Java", "Spring Boot", "Kafka", "MySQL", "Redis", "AWS"],
  },
  {
    role: "Software Engineering Consultant",
    company: "Hays UK",
    location: "Kansas City, MO",
    period: "Mar 2023 - Jan 2024",
    summary:
      "Modernized enterprise architecture on AWS with microservices, streaming workflows, and infrastructure automation.",
    highlights: [
      "Migrated 20+ services into Spring Cloud microservices architecture on AWS for better scalability and deployment efficiency.",
      "Built Kafka-based real-time streaming flows for insurance commission workloads with high event throughput.",
      "Implemented IaC using AWS CloudFormation for repeatable environment provisioning and CI/CD deployments.",
      "Designed throttled REST APIs for high-volume, low-latency traffic patterns.",
      "Executed profiling and load testing to maintain stability under 100K+ concurrent users.",
    ],
    stack: ["Spring Cloud", "Kafka", "AWS", "CloudFormation", "REST APIs", "CI/CD"],
  },
  {
    role: "Software Engineer",
    company: "Legato Health Technologies",
    location: "Hyderabad, India",
    period: "Dec 2019 - Dec 2021",
    summary: "Delivered high-throughput healthcare services and improved reliability through streaming and observability patterns.",
    highlights: [
      "Developed Spring Boot and JDBC Template applications handling millions of transactions per day.",
      "Built Kafka-based real-time pipelines to improve interoperability and reduce service coupling.",
      "Optimized ETL jobs by 30% through SQL tuning, batch strategies, and caching.",
      "Created centralized logging and exception handling standards to improve debugging and operational visibility.",
      "Collaborated with cross-functional Agile teams to deliver releases on schedule.",
    ],
    stack: ["Java", "Spring Boot", "Kafka", "JDBC", "MySQL", "Monitoring"],
  },
  {
    role: "Programmer Analyst",
    company: "Cognizant",
    location: "Hyderabad, India",
    period: "Sep 2017 - Nov 2019",
    summary: "Built scalable event-driven backend services and improved operational efficiency for enterprise healthcare clients.",
    highlights: [
      "Developed event-driven microservices for Anthem Inc. processing 1M+ events per day with Spring Boot and Kafka.",
      "Improved response time by 35% through SQL optimization and Redis-based caching.",
      "Built automation tools that reduced manual workflows by 60%.",
      "Mentored junior engineers on Java practices, microservices patterns, and Git workflows.",
    ],
    stack: ["Spring Boot", "Kafka", "Redis", "SQL", "Microservices"],
  },
];
