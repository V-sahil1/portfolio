import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiShadcnui,
  SiGreensock,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiPassport,
  SiRedis,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiSequelize,
  SiPython,
  SiOpenjdk,
  SiGit,
  SiGithub,
  SiSwagger,
  SiPostman,
  SiVercel,
  SiEslint,
  SiClaude,
} from "react-icons/si";
import { TbApi, TbShieldLock, TbListCheck } from "react-icons/tb";
import {
  LuServer,
  LuDatabase,
  LuLayoutDashboard,
  LuCode,
  LuWrench,
  LuRocket,
} from "react-icons/lu";
import type { SkillCategory } from "@/types";

/**
 * Skills, backend-first. Content mirrors the résumé exactly.
 * Deliberately omits RabbitMQ / WebSockets / Webhooks — listed but not
 * demonstrated in projects.
 */
export const skillCategories: SkillCategory[] = [
  {
    title: "Backend",
    icon: LuServer,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express", icon: SiExpress, color: "#94a3b8" },
      { name: "REST APIs", icon: TbApi, color: "#6366f1" },
      { name: "MVC", icon: TbListCheck, color: "#818cf8" },
      { name: "BullMQ", icon: LuServer, color: "#f59e0b" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
    ],
  },
  {
    title: "Auth & Security",
    icon: TbShieldLock,
    skills: [
      { name: "JWT", icon: SiJsonwebtokens, color: "#EC4899" },
      { name: "Refresh Tokens", icon: TbShieldLock, color: "#818cf8" },
      { name: "Passport.js", icon: SiPassport, color: "#34E27A" },
      { name: "Google OAuth", icon: TbShieldLock, color: "#6366f1" },
      { name: "RBAC", icon: TbShieldLock, color: "#94a3b8" },
    ],
  },
  {
    title: "Databases",
    icon: LuDatabase,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "Sequelize ORM", icon: SiSequelize, color: "#52B0E7" },
    ],
  },
  {
    title: "Frontend",
    icon: LuLayoutDashboard,
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#94a3b8" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
      { name: "shadcn/ui", icon: SiShadcnui, color: "#94a3b8" },
      { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
    ],
  },
  {
    title: "Languages",
    icon: LuCode,
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Java", icon: SiOpenjdk, color: "#f89820" },
    ],
  },
  {
    title: "Tools",
    icon: LuWrench,
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#94a3b8" },
      { name: "Swagger", icon: SiSwagger, color: "#85EA2D" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Vercel", icon: SiVercel, color: "#94a3b8" },
      { name: "ESLint", icon: SiEslint, color: "#4B32C3" },
      { name: "Claude Code", icon: SiClaude, color: "#D97757" },
      { name: "Antigravity", icon: LuRocket, color: "#4285F4" },
    ],
  },
];

/** Flat list — kept for any tech strip that needs it */
export const flatSkills = skillCategories.flatMap((c) => c.skills);
