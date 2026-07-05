import type { IconType } from "react-icons";

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

export interface Skill {
  name: string;
  icon: IconType;
  /** Brand hex colour used for the icon accent */
  color: string;
}

export interface SkillCategory {
  title: string;
  icon: IconType;
  skills: Skill[];
}

export type ProjectCategory = "Full-Stack" | "Frontend" | "Backend" | "AI" |"GSAP";

export interface Project {
  id: number;
  name: string;
  tagline: string;
  description: string;
  /** Screenshot. Optional — backend/API projects use `codePreview` instead. */
  image?: string;
  /** Mono code/endpoint lines rendered when there is no screenshot. */
  codePreview?: string[];
  /** One-line architecture summary shown under the tagline. */
  arch?: string;
  tech: string[];
  github?: string;
  demo?: string;
  category: ProjectCategory;
  featured?: boolean;
  /** Flagship card that spans the full width of the grid. */
  wide?: boolean;
}

export interface Certification {
  id: number;
  name: string;
  org: string;
  image: string;
  description: string;
  url: string;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  location?: string;
  type?: string;
  points: string[];
  /** "minor" renders a compact, de-emphasised entry (e.g. non-engineering roles) */
  variant?: "primary" | "minor";
}

export interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  period: string;
  detail?: string;
  logo: string;
  points?: string[];
}

export interface SiteConfig {
  name: string;
  firstName: string;
  role: string;
  roles: string[];
  tagline: string;
  summary: string;
  email: string;
  location: string;
  resumeUrl: string;
  avatar: string;
}
