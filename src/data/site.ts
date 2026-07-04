import type { SiteConfig } from "@/types";

/**
 * Central site configuration.
 * Update these values to personalise the portfolio — everything downstream
 * (hero, contact, meta) reads from here.
 */
export const site: SiteConfig = {
  name: "Sahil Vardekar",
  firstName: "Sahil",
  role: "Full-Stack MERN + TypeScript Developer",
  // Rotated by the typewriter in the hero
  roles: [
    "Full-Stack MERN Developer",
    "TypeScript Engineer",
    "React & Next.js Developer",
    "Node.js & Express Developer",
  ],
  tagline: "I build fast, scalable web applications — end to end.",
  summary:
    "Full-Stack Developer specialising in the MERN stack and TypeScript. " +
    "I design and ship production-ready web applications — from responsive React & Next.js " +
    "frontends to secure Node.js/Express REST APIs and MongoDB data models — with a focus on " +
    "clean architecture, performance, and great user experience.",
  // TODO: replace with your preferred contact email
  email: "sahil.vardekar@gmail.com",
  location: "Surat, India",
  resumeUrl:
    "https://drive.google.com/file/d/149SfgN1UlWrI56dj0EgwwWQOKnKavGLs/view?usp=sharing",
  avatar: "/image/photo.jpg",
};
