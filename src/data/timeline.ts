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
  /** Organisation the event belongs to, so its mark can anchor the entry. */
  org?: { name: string; domain?: string };
};

export const timelineEvents: TimelineEvent[] = [
  {
    year: 2012,
    date: "2012-06-01",
    title: "Began M.S. Software Engineering at VIT",
    category: "Learning",
    org: { name: "VIT University", domain: "vit.ac.in" },
    details:
      "Started the five-year integrated programme at Vellore Institute of Technology — the beginning of the engineering foundation everything since is built on.",
  },
  {
    year: 2015,
    date: "2015-07-01",
    title: "Led the Android Student Club as President",
    category: "Learning",
    org: { name: "VIT University", domain: "vit.ac.in" },
    details:
      "Ran workshops, hackathons and app-building sessions for 100+ students on the Android SDK and Java — the first taste of mentoring engineers rather than only writing code.",
  },
  {
    year: 2016,
    date: "2016-04-01",
    title: "Best Project Based Learning Award",
    category: "Award",
    org: { name: "VIT University", domain: "vit.ac.in" },
    details:
      "Awarded for a dietary management system that analysed a user's health status and generated individual diet recommendations.",
  },
  {
    year: 2017,
    date: "2017-05-01",
    title: "Graduated Rank #1 with the Gold Medal",
    category: "Award",
    org: { name: "VIT University", domain: "vit.ac.in" },
    details:
      "Finished first in the class with a 9.24/10 GPA, honoured with the Gold Medal for academic excellence across the full five-year programme.",
  },
  {
    year: 2017,
    date: "2017-05-15",
    title: "Best Project Award from Cognizant",
    category: "Award",
    org: { name: "Cognizant", domain: "cognizant.com" },
    details:
      "Recognised for the real-time drowsiness detection system built as the final-year project, before joining the company that September.",
  },
  {
    year: 2017,
    date: "2017-11-28",
    title: "Published Driver Fatigue Detection Paper",
    category: "Publication",
    details:
      "Published in the International Journal of Civil Engineering and Technology on real-time driver fatigue and drowsiness detection from face image streams.",
  },
  {
    year: 2017,
    date: "2017-09-01",
    title: "Started at Cognizant",
    org: { name: "Cognizant", domain: "cognizant.com" },
    category: "Career",
    details:
      "Joined as Programmer Analyst and began building enterprise healthcare microservices.",
  },
  {
    year: 2019,
    date: "2019-12-01",
    title: "Joined Legato Health Technologies",
    org: { name: "Carelon", domain: "carelon.com" },
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
    org: { name: "UMKC", domain: "umkc.edu" },
    category: "Learning",
    details:
      "Pursued advanced study in scalable systems while expanding applied research work.",
  },
  {
    year: 2023,
    date: "2023-03-01",
    title: "Consulted at Hays (Client: Anthem)",
    org: { name: "Hays", domain: "hays.com" },
    category: "Career",
    details:
      "Led AWS microservices migration and streaming architecture improvements.",
  },
  {
    year: 2023,
    date: "2023-05-15",
    title: "Graduated with M.S. CS (GPA 3.9)",
    org: { name: "UMKC", domain: "umkc.edu" },
    category: "Learning",
    details:
      "Completed graduate degree at UMKC with Hack-A-Roo recognition and research assistantship.",
  },
  {
    year: 2024,
    date: "2024-01-05",
    title: "Joined UST as Developer III",
    org: { name: "UST", domain: "ust.com" },
    category: "Career",
    details:
      "Took ownership of high-impact backend initiatives for Elevance Health systems.",
  },
  {
    year: 2024,
    date: "2024-07-10",
    title: "Completed Enterprise Migration Program",
    org: { name: "UST", domain: "ust.com" },
    category: "Project",
    details:
      "Cut end-to-end migration load time by 75% through parallel processing, SQL optimization, and batch orchestration.",
  },
  {
    year: 2025,
    date: "2025-02-20",
    title: "Recognized with Multiple Impact Awards",
    org: { name: "UST", domain: "ust.com" },
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
    org: { name: "UST", domain: "ust.com" },
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
