import { skillCategories } from "@/data/skills";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <Section id="skills" className="bg-slate-50/60 dark:bg-white/[0.02]">
      <SectionHeading
        eyebrow="Tech Stack"
        title="Skills & technologies"
        description="The tools I reach for to design, build and ship full-stack applications."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {skillCategories.map((category, ci) => (
          <Reveal key={category.title} delay={ci * 0.08}>
            <div className="glass h-full rounded-3xl p-6 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white">
                  <category.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <ul className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <li key={skill.name}>
                    <span className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-brand-400/50">
                      <skill.icon
                        className="h-[18px] w-[18px] shrink-0 transition-transform group-hover:scale-110"
                        style={{ color: skill.color }}
                        aria-hidden
                      />
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
