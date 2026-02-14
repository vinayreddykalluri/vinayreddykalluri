export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Career", href: "/career" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Timeline", href: "/timeline" },
  { label: "Contact", href: "/contact" },
] as const;

export const siteConfig = {
  name: "Vinay Reddy Kalluri",
  shortName: "VRK",
  role: "Senior Java Backend Engineer",
  location: "Atlanta, Georgia, USA",
  headline:
    "Building high-throughput microservices and event platforms that scale with confidence.",
  summary:
    "Senior backend engineer with 7+ years of experience delivering resilient distributed systems across healthcare and enterprise domains using Java, Spring Boot, Kafka, Redis, MySQL, and AWS.",
  mission:
    "I focus on backend systems that improve reliability, decision speed, and service quality at scale. My long-term vision is to build nationally impactful software infrastructure and engineering practices aligned with the U.S. national interest.",
  metrics: [
    {
      label: "Data Pipelines",
      value: "35TB+",
      detail: "Large-scale migration and ETL modernization",
    },
    {
      label: "Experience",
      value: "7+ Years",
      detail: "Backend systems across healthcare and enterprise",
    },
    {
      label: "Core Streaming",
      value: "Kafka",
      detail: "Event-driven architecture and real-time sync",
    },
    {
      label: "Cloud Platform",
      value: "AWS",
      detail: "Production workloads and CI/CD automation",
    },
    {
      label: "Recognition",
      value: "7 Awards",
      detail: "Impact awards for engineering outcomes",
    },
  ],
  contact: {
    email: "vinayreddykalluri@gmail.com",
    linkedin: "https://linkedin.com/in/vinayreddykalluri",
    github: "https://github.com/vinayreddykalluri",
    medium: "https://vinayreddykalluri.medium.com",
  },
  aboutNarrative: [
    "I started my engineering journey in India, where I built my foundation in software engineering and earned recognition for both technical depth and leadership. During this phase, I worked on event-driven enterprise systems and learned how architecture decisions directly affect business outcomes.",
    "After moving to the United States for my M.S. in Computer Science at the University of Missouri-Kansas City, I deepened my focus on scalable backend platforms, distributed systems, and measurable product impact.",
    "Today, I work as a Senior Java Backend Engineer in Atlanta, delivering low-latency microservices, fault-tolerant data pipelines, and cloud-native systems that operate reliably under production pressure.",
  ],
  journey: [
    {
      year: "2012-2017",
      title: "Software Foundation in India",
      description:
        "Built core engineering discipline during graduate studies while leading campus technical communities and shipping production-grade systems.",
    },
    {
      year: "2017-2021",
      title: "Enterprise Backend and Event Architectures",
      description:
        "Worked on high-volume enterprise workflows, where event-driven architecture and observability became central to reliability and decision speed.",
    },
    {
      year: "2022-2023",
      title: "U.S. Graduate Depth in Computer Science",
      description:
        "Completed M.S. in Computer Science at UMKC with research exposure and hackathon outcomes focused on scalable and data-intensive platforms.",
    },
    {
      year: "2023-Present",
      title: "Senior Backend Engineering in Atlanta",
      description:
        "Own and evolve low-latency microservices, cloud-native data pipelines, and production systems designed for sustained reliability at scale.",
    },
  ],
  mindset: [
    "Design for reliability first, then optimize for velocity.",
    "Treat observability as a product feature, not an afterthought.",
    "Build systems that are explainable to both engineers and stakeholders.",
    "Use architecture to reduce long-term operational load.",
  ],
  achievements: [
    "Automated a sales compensation backend workflow and reduced manual processing effort by 40%.",
    "Led a 35TB+ migration initiative that reduced runtime from 16 days to 4 days.",
    "Improved API throughput by 20% through async execution, caching, and JVM profiling.",
    "Received 7 Impact Awards for backend scalability and reliability engineering.",
  ],
  education: [
    {
      degree: "M.S. in Computer Science",
      institution: "University of Missouri-Kansas City, USA",
      period: "Jan 2022 - May 2023",
      logo: "/education/umkc-logo.png",
      logoAlt: "University of Missouri-Kansas City logo",
      details: [
        "GPA: 3.9/4.0",
        "Hack-A-Roo Hackathon Winner",
        "Machine Learning Research Assistant",
      ],
    },
    {
      degree: "M.S. in Software Engineering",
      institution: "VIT University, India",
      period: "Jun 2012 - May 2017",
      logo: "/education/vit-logo.png",
      logoAlt: "VIT University logo",
      details: ["GPA: 9.3/10", "Gold Medalist", "President, Android Club"],
    },
  ],
  workAuthorization: {
    visa: "H-1B (Open to Transfer)",
    availability: "Remote / Hybrid / Onsite (U.S.)",
  },
  footerTagline:
    "Engineering calm, scalable backend systems for real-world impact.",
} as const;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vinayreddykalluri.vercel.app"
).replace(/\/$/, "");
