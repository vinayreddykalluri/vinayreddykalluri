export type TimelineCategory =
  | "Career"
  | "Project"
  | "Award"
  | "Learning"
  | "Publication";

export type TimelineEvent = {
  year: number;
  date: string;
  title: string;
  category: TimelineCategory;
  details: string;
};

export const timelineEvents: TimelineEvent[] = [
  {
    year: 2017,
    date: "2017-06-01",
    title: "Published Driver Fatigue Detection Paper",
    category: "Publication",
    details:
      "Published in the International Journal of Civil Engineering and Technology on real-time driver fatigue and drowsiness detection from face image streams.",
  },
  {
    year: 2017,
    date: "2017-09-01",
    title: "Started at Cognizant",
    category: "Career",
    details:
      "Joined as Programmer Analyst and began building enterprise healthcare microservices.",
  },
  {
    year: 2019,
    date: "2019-12-01",
    title: "Joined Legato Health Technologies",
    category: "Career",
    details:
      "Built high-throughput healthcare services and Kafka-based interoperability pipelines.",
  },
  {
    year: 2021,
    date: "2021-12-01",
    title: "Transitioned to U.S. Graduate Journey",
    category: "Learning",
    details:
      "Moved focus toward advanced systems design and graduate studies in the United States.",
  },
  {
    year: 2022,
    date: "2022-01-15",
    title: "Started M.S. in Computer Science (UMKC)",
    category: "Learning",
    details:
      "Pursued advanced study in scalable systems while expanding applied research work.",
  },
  {
    year: 2023,
    date: "2023-03-01",
    title: "Consulted at Hays (Client: Anthem)",
    category: "Career",
    details:
      "Led AWS microservices migration and streaming architecture improvements.",
  },
  {
    year: 2023,
    date: "2023-05-15",
    title: "Graduated with M.S. CS (GPA 3.9)",
    category: "Learning",
    details:
      "Completed graduate degree at UMKC with Hack-A-Roo recognition and research assistantship.",
  },
  {
    year: 2024,
    date: "2024-01-05",
    title: "Joined UST as Developer III",
    category: "Career",
    details:
      "Took ownership of high-impact backend initiatives for Elevance Health systems.",
  },
  {
    year: 2024,
    date: "2024-07-10",
    title: "Completed Enterprise Migration Program",
    category: "Project",
    details:
      "Cut end-to-end migration load time by 75% through parallel processing, SQL optimization, and batch orchestration.",
  },
  {
    year: 2025,
    date: "2025-02-20",
    title: "Recognized with Multiple Impact Awards",
    category: "Award",
    details:
      "Received 7 Impact Awards for scalability, reliability, and backend performance engineering outcomes.",
  },
  {
    year: 2025,
    date: "2025-08-01",
    title: "Launched Work Visa Insights Direction",
    category: "Project",
    details:
      "Started shaping a mission-driven platform focused on immigration clarity and trusted guidance.",
  },
  {
    year: 2026,
    date: "2026-01-15",
    title: "Shipped Play Together on Google Play",
    category: "Project",
    details:
      "Released the Flutter and Firebase relationship-games app, owning testing, release management, and updates end to end.",
  },
  {
    year: 2026,
    date: "2026-08-01",
    title: "Promoted to Lead I - Software Engineering",
    category: "Career",
    details:
      "Stepped up to lead backend delivery at UST for Elevance Health compensation platforms.",
  },
  {
    year: 2026,
    date: "2026-01-10",
    title: "Expanded Public Technical Writing",
    category: "Learning",
    details:
      "Committed to sharing backend architecture and engineering strategy insights publicly.",
  },
];
