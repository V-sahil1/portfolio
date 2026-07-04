import { FiCode, FiServer, FiDatabase, FiZap } from "react-icons/fi";
import { site } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const highlights = [
  {
    icon: FiCode,
    title: "Frontend Engineering",
    text: "Responsive, accessible UIs with React, Next.js, TypeScript & Tailwind CSS.",
  },
  {
    icon: FiServer,
    title: "Backend & APIs",
    text: "Secure REST APIs, authentication and business logic with Node.js & Express.",
  },
  {
    icon: FiDatabase,
    title: "Databases",
    text: "Modelling and querying data with MongoDB, Mongoose and SQL.",
  },
  {
    icon: FiZap,
    title: "Ship & Deploy",
    text: "Git-based workflows, CI and deployment to Vercel and cloud platforms.",
  },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About Me"
        title="Turning ideas into full-stack products"
      />

      <div className="mt-14 grid items-center gap-12 lg:grid-cols-5">
        {/* Portrait */}
        <Reveal className="lg:col-span-2">
          <div className="relative mx-auto max-w-xs sm:max-w-sm">
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-brand-500/30 to-accent-500/30 blur-2xl" />
            <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img
                src={site.avatar}
                alt={`Portrait of ${site.name}`}
                loading="lazy"
                width={420}
                height={525}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="glass absolute -bottom-5 -right-4 rounded-2xl px-4 py-3 shadow-lg">
              <p className="font-display text-sm font-bold text-slate-900 dark:text-white">
                Full-Stack
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                MERN + TypeScript
              </p>
            </div>
          </div>
        </Reveal>

        {/* Text + highlights */}
        <div className="lg:col-span-3">
          <Reveal>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              I'm a full-stack developer who enjoys owning features from database to
              deployment. I build fast, maintainable applications with the{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-100">
                MERN stack and TypeScript
              </strong>
              , caring equally about clean architecture and a polished user experience.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
              Alongside shipping projects, I sharpen my problem-solving with DSA and stay
              current with modern tools like Next.js, Docker and CI/CD workflows.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08}>
                <div className="glass h-full rounded-2xl p-5 transition-transform hover:-translate-y-1">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white">
                    <h.icon className="h-5 w-5" />
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
