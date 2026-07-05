import type { SiteConfig } from "@/types";
// Bundled by Vite (hashed + verified at build time) — deployment-safe.
// Replace src/assets/profile-formal.jpg with your professional photo.
import profileFormal from "@/assets/profile-formal.jpg";

/**
 * Central site configuration.
 * Update these values to personalise the portfolio — everything downstream
 * (hero, contact, meta) reads from here.
 */
export const site: SiteConfig = {
  name: "Sahil Vardekar",
  firstName: "Sahil",
  role: "Backend-focused Full-Stack Developer",
  // Short role labels (used in meta / secondary spots — no longer typed out)
  roles: [
    "Backend-focused Full-Stack Developer",
    "Node.js & Express Developer",
    "REST API Engineer",
    "PostgreSQL & Redis",
  ],
  tagline: "I build the APIs, auth, and data layers that products run on.",
  summary:
    "Backend-leaning full-stack developer working in Node.js, Express, and PostgreSQL. " +
    "I design REST APIs, authentication systems, and database schemas — and ship the " +
    "React and Next.js frontends on top of them.",
  // TODO: replace with your preferred contact email
  email: "sahil.vardekar@gmail.com",
  location: "Surat, India",
  resumeUrl:
    "https://drive.google.com/file/d/1UPbVnhrYM3noI-lMIFpmppBHF_NTdxcd/view?usp=sharing",
  avatar: profileFormal,
};
