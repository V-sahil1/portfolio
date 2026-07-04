import type { ExperienceItem } from "@/types";

/**
 * Experience timeline. The internship is the primary entry; leadership roles
 * render compact (`variant: "minor"`) so engineering work leads.
 */
export const experience: ExperienceItem[] = [
  {
    id: 1,
    role: "MERN Developer Intern",
    company: "CodeLamda Technologies",
    period: "Jan 2026 — Present",
    location: "Remote",
    type: "Internship",
    variant: "primary",
    points: [
      "Built 50+ production REST APIs on an MVC architecture with request validation, auth/authorization middleware, and centralized error handling.",
      "Implemented JWT and refresh-token auth, Google OAuth via Passport.js, role-based access control, and ownership-based authorization for protected routes.",
      "Designed PostgreSQL and MongoDB schemas with Sequelize — relationships, transactions, pagination, and query optimization.",
      "Offloaded email, file processing, and heavy work to Redis-backed BullMQ background jobs; added Nodemailer email verification and password-reset flows.",
      "Documented APIs with Swagger, tested with Postman, and worked in an Agile team using Git/GitHub, Morgan, and ESLint.",
    ],
  },
  {
    id: 2,
    role: "Event Coordinator — Techtonic 2025",
    company: "Government Engineering College, Bharuch",
    period: "2025",
    location: "Bharuch, India",
    type: "Leadership",
    variant: "minor",
    points: [
      "Coordinated the flagship technical fest — scheduling, logistics, and cross-team communication.",
    ],
  },
  {
    id: 3,
    role: "Athletic Sports Coordinator — Nabham 2024",
    company: "Government Engineering College, Bharuch",
    period: "2024",
    location: "Bharuch, India",
    type: "Leadership",
    variant: "minor",
    points: [
      "Organised and led sports events across multiple disciplines, coordinating volunteers and participants.",
    ],
  },
];
