import { skillCategories } from "@/data/skills";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <Section id="skills" className="bg-slate-50/60 dark:bg-white/[0.015]">
      <SectionHeading
        eyebrow="Toolkit"
        title="Skills & technologies"
        description="Grouped by where I spend my time — backend and data first."
        align="left"
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, ci) => (
          <Reveal key={category.title} delay={ci * 0.05} y={16}>
            <div className="surface h-full rounded-2xl p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-brand-600 dark:border-white/[0.08] dark:text-brand-300">
                  <category.icon className="h-4.5 w-4.5" aria-hidden />
                </span>
                <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li key={skill.name}>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-200 dark:hover:border-brand-400/40">
                      <skill.icon
                        className="h-4 w-4 shrink-0"
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
