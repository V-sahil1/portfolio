import type { Project } from "@/types";

/**
 * Projects, backend-first. All four are featured on the home page.
 * Backend/API-only projects use `codePreview` instead of a screenshot.
 */
export const projects: Project[] = [
  {
    id: 1,
    name: "Buildify",
    tagline: "Construction management platform · client project",
    arch: "PostgreSQL + Sequelize · Node/Express REST APIs · BullMQ jobs · Next.js",
    description:
      "A construction-management platform built for a client. I owned the backend: a PostgreSQL data layer with Sequelize, Node/Express REST APIs, Google OAuth, and BullMQ background jobs — behind a Next.js frontend, with a focus on architecture and performance.",
    codePreview: [
      "Next.js  ──▶  Express REST API  ──▶  PostgreSQL",
      "                     │",
      "         Google OAuth (Passport.js)",
      "         BullMQ + Redis  →  background jobs",
    ],
    tech: ["PostgreSQL", "Node.js", "Express", "Sequelize", "BullMQ", "Google OAuth", "Next.js"],
    github: "https://github.com/V-sahil1",
    category: "Full-Stack",
    featured: true,
    wide: true,
  },
  {
    id: 2,
    name: "Scalable Backend REST API System",
    tagline: "Production-grade API architecture",
    arch: "MVC · JWT + refresh tokens · RBAC · Redis · Swagger",
    description:
      "A production-grade REST API on a clean MVC architecture: JWT authentication with refresh tokens, role-based access control and ownership authorization, Redis caching, robust error handling, and full Swagger documentation.",
    codePreview: [
      "POST /api/v1/auth/login            → 200 OK",
      "GET  /api/v1/projects   [Bearer]   → 200 OK",
      "POST /api/v1/projects   [admin]    → 201 Created",
      "DELETE /api/v1/projects/:id        → 403 Forbidden (RBAC)",
    ],
    tech: ["Node.js", "Express", "JWT", "RBAC", "Redis", "Swagger"],
    github: "https://github.com/V-sahil1/PostCore",
    category: "Backend",
    featured: true,
  },
  {
    id: 3,
    name: "OptiCare",
    tagline: "Healthcare appointment platform",
    arch: "Auth · Google OAuth · REST APIs · CI/CD",
    description:
      "A healthcare appointment platform with authentication and Google OAuth, third-party API integration, and a CI/CD pipeline connecting the backend to a React frontend.",
    image: "/image/opticare.png",
    tech: ["Auth", "Google OAuth", "REST APIs", "CI/CD", "React"],
    github: "https://github.com/V-sahil1/opti-care",
    demo: "https://opti-care-zeta.vercel.app/",
    category: "Frontend",
    featured: true,
  },
  {
    id: 4,
    name: "AI Image Generator",
    tagline: "Text-to-image app",
    arch: "Next.js · TypeScript · third-party API integration",
    description:
      "A text-to-image application in Next.js and TypeScript with a polished, responsive workflow and third-party AI API integration.",
    image: "/image/ai.png",
    tech: ["Next.js", "TypeScript", "API Integration", "Tailwind CSS"],
    github: "https://github.com/V-sahil1/Ai-image-Generator",
    demo: "https://ai-image-generator-acv3.vercel.app/",
    category: "AI",
    featured: true,
  },
    {
    id: 5,
    name: "Mojito | Crafted with GSAP",
    tagline: "Sip the Spirit of Summer",
    arch: "GSAP · React.js · Responsive Design",
    description:
      "A modern animated landing page built with React.js and GSAP, featuring smooth scroll animations, immersive interactions, and a fully responsive design.",
    image: "/image/mojito.png",
    tech: ["React.js", "JavaScript", "GSAP", "Tailwind CSS"],
    github: "https://github.com/V-sahil1/mojitor",
    demo: "https://mojito-theta.vercel.app/",
    category: "GSAP",
    featured: true,
  },
{
  id: 6,
  name: "TOMATO | Food Delivery Platform",
  tagline: "Order Fresh Food, Delivered Fast",
  arch: "React.js · Context API · Tailwind CSS · Vite",
  description:
    "A modern food delivery application featuring restaurant browsing, category-based filtering, cart management, responsive UI, and a seamless ordering experience built with React.",
  image: "/image/Tomato.png",
  tech: [
    "React.js",
    "JavaScript",
    "Tailwind CSS",
    "Context API"
  ],
  github: "https://github.com/V-sahil1/Food-Delivery",
  demo: "https://food-delivery-jet-kappa.vercel.app/",
  category: "Frontend",
  featured: true,
},
{
  id: 7,
  name: "TripNest | Hostel Booking Platform",
  tagline: "Find, Compare & Book Hostels with Ease",
  arch: "React.js · Tailwind CSS · Context API · Responsive Design",
  description:
    "A modern hostel booking platform that enables users to browse hostels, view detailed property information, search by destination, and book accommodations through a clean, responsive interface.",
  image: "/image/Tripnest.png",
  tech: [
    "React.js",
    "JavaScript",
    "Tailwind CSS",
    "Context API"
  ],
  github: "https://github.com/V-sahil1/TripNest",
  demo: "https://tripnest.vercel.app/",
  category: "Frontend",
  featured: true,
},
];

export const featuredProjects = projects.filter((p) => p.featured);
