import type { ExperienceItem } from "@/types";

/**
 * Experience & involvement timeline.
 * The first entry reflects self-driven full-stack work (deployed projects below).
 * Replace or extend with internships / roles as you gain them.
 */
export const experience: ExperienceItem[] = [
  {
    id: 1,
    role: "Full-Stack Developer — Freelance & Personal Projects",
    company: "Self-directed",
    period: "2023 — Present",
    location: "Remote",
    type: "Project-based",
    points: [
      "Designed, built and deployed 6+ full-stack web applications using the MERN stack, Next.js and TypeScript.",
      "Implemented authentication, payment flows, REST APIs and third-party integrations (Clerk, Google Maps, Web3Forms).",
      "Shipped responsive, accessible UIs and managed CI/deployments on Vercel with Git version control.",
    ],
  },
  {
    id: 2,
    role: "Event Coordinator — Techtonic 2025",
    company: "Government Engineering College, Bharuch",
    period: "2025",
    location: "Bharuch, India",
    type: "Leadership",
    points: [
      "Coordinated the flagship technical fest, managing scheduling, logistics and cross-team communication.",
    ],
  },
  {
    id: 3,
    role: "Athletic Sports Coordinator — Nabham 2024",
    company: "Government Engineering College, Bharuch",
    period: "2024",
    location: "Bharuch, India",
    type: "Leadership",
    points: [
      "Organised and led sports events, coordinating volunteers and participants across multiple disciplines.",
    ],
  },
];
