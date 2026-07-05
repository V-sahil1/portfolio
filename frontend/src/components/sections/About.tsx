import { FiServer, FiDatabase, FiShield, FiLayout } from "react-icons/fi";
import { site } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const highlights = [
  {
    icon: FiServer,
    title: "REST APIs & MVC",
    text: "50+ production endpoints with validation, middleware and centralized error handling.",
  },
  {
    icon: FiDatabase,
    title: "PostgreSQL & Sequelize",
    text: "Schema design, relationships, transactions, pagination and query optimization.",
  },
  {
    icon: FiShield,
    title: "Auth & Security",
    text: "JWT, refresh tokens, Google OAuth, Passport.js, RBAC and ownership authorization.",
  },
  {
    icon: FiLayout,
    title: "Frontend & Deploy",
    text: "React, Next.js and TypeScript on top, shipped with Git-based workflows.",
  },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="Who I am"
        title="Backend-Driven Full-Stack Engineer"
        align="left"
      />

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-5">
        {/* Portrait */}
        <Reveal className="lg:col-span-2" y={16}>
          <div className="relative mx-auto max-w-xs sm:max-w-sm">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl border border-slate-200 sm:aspect-[4/6] dark:border-white/[0.08]">
              <img
                src={site.avatar}
                alt={`Portrait of ${site.name}`}
                loading="lazy"
                width={420}
                height={525}
                className="h-full w-full object-cover object-[50%_35%]"
              />
            </div>
            <div className="surface absolute -bottom-4 left-4 rounded-lg px-3 py-2">
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {site.location} · open to roles
              </p>
            </div>
          </div>
        </Reveal>

        {/* Text + highlights */}
        <div className="lg:col-span-3">
          <Reveal y={16}>
            <p className="max-w-[62ch] text-lg leading-relaxed text-slate-700 dark:text-slate-200">
              I'm a full-stack developer who works from the database up. Most of my time goes
              into API design, authentication, and data modeling in{" "}
              <strong className="font-semibold text-slate-900 dark:text-white">
                Node.js, Express, and PostgreSQL
              </strong>{" "}
              — then I build the React and Next.js frontends that consume them.
            </p>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-slate-600 dark:text-slate-400">
              I'm currently a MERN developer  at{" "}
              <strong className="font-medium text-slate-800 dark:text-slate-200">
                CodeLamda Technologies
              </strong>
              , where I've shipped 50+ production REST APIs behind JWT auth, role-based access
              control, and Redis-backed background jobs.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 dark:border-white/[0.08] dark:bg-white/[0.08]">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.06} y={16}>
                <div className="h-full bg-white p-5 dark:bg-slate-900/40">
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-brand-600 dark:border-white/[0.08] dark:text-brand-300">
                    <h.icon className="h-4.5 w-4.5" aria-hidden />
                  </div>
                  <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                    {h.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {h.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
