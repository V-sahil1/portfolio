import type { Project } from "@/types";

/**
 * Projects. Add a new entry here and it appears everywhere automatically.
 * `featured: true` surfaces it on the home page (top 3 featured are shown).
 */
export const projects: Project[] = [
  {
    id: 1,
    name: "AI Image Generator",
    tagline: "Text-to-image SaaS",
    description:
      "An AI-powered image generation platform built with Next.js and TypeScript. Features text-to-image conversion, UPI QR payments, instant downloads and a sleek animated UI.",
    image: "/image/ai.png",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    github: "https://github.com/V-sahil1/Ai-image-Generator",
    demo: "https://ai-image-generator-acv3.vercel.app/",
    category: "AI",
    featured: true,
  },
  {
    id: 2,
    name: "OptiCare",
    tagline: "Healthcare booking platform",
    description:
      "A healthcare appointment booking platform with real-time slot booking, Google/GitHub authentication, profile management and QR-based UPI payments.",
    image: "/image/opticare.png",
    tech: ["React", "JavaScript", "Tailwind CSS", "Clerk Auth"],
    github: "https://github.com/V-sahil1/opti-care",
    demo: "https://opti-care-zeta.vercel.app/",
    category: "Full-Stack",
    featured: true,
  },
  {
    id: 3,
    name: "TripNest",
    tagline: "Hotel booking platform",
    description:
      "A responsive hotel booking platform featuring Google Maps integration, secure authentication via Clerk and an owner dashboard for managing listings.",
    image: "/image/Tripnest.png",
    tech: ["React", "Tailwind CSS", "Clerk Auth", "Google Maps"],
    github: "https://github.com/V-sahil1/Trip-nest",
    demo: "https://trip-nest-lfhd.vercel.app/",
    category: "Full-Stack",
    featured: true,
  },
  {
    id: 4,
    name: "Tomato",
    tagline: "Food delivery web app",
    description:
      "A food delivery web app offering food categorisation, cart management, QR-based payments, Google login and email collection via Web3Forms.",
    image: "/image/Tomato.png",
    tech: ["React", "JavaScript", "Tailwind CSS", "Web3Forms"],
    github: "https://github.com/V-sahil1/Food-Delivery",
    demo: "https://food-delivery-jet-kappa.vercel.app/",
    category: "Full-Stack",
  },
  {
    id: 5,
    name: "The Gentle Pour",
    tagline: "Animated cocktail experience",
    description:
      "An animated cocktail website built with React and GSAP, featuring scroll-based animations, a dark luxury theme and a responsive interactive UI.",
    image: "/image/mojito.png",
    tech: ["React", "GSAP", "Tailwind CSS", "React Router"],
    github: "https://github.com/V-sahil1/mojito",
    demo: "https://mojito-n6yi.vercel.app/",
    category: "Frontend",
  },
  {
    id: 6,
    name: "World Atlas",
    tagline: "Country explorer",
    description:
      "A React app to search, sort and filter countries by continent, with live data fetched from a REST API using Axios.",
    image: "/image/atlas.png",
    tech: ["React", "REST APIs", "Axios", "CSS"],
    github: "https://github.com/V-sahil1/world-atlas",
    demo: "https://world-atlas-seven.vercel.app/",
    category: "Frontend",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
