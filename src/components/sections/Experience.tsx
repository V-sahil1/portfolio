import { FiBriefcase } from "react-icons/fi";
import { experience } from "@/data/experience";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Journey"
        title="Experience & involvement"
        description="Where I've applied my skills — building products and leading teams."
      />

      <div className="relative mx-auto mt-14 max-w-3xl">
        {/* vertical line */}
        <span
          className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-brand-500/60 via-slate-200 to-transparent sm:left-5 dark:via-white/10"
          aria-hidden
        />

        <ol className="space-y-8">
          {experience.map((item, i) => (
            <li key={item.id} className="relative pl-14 sm:pl-16">
              {/* node */}
              <span className="absolute left-0 top-1 grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-brand-500 shadow-sm sm:h-10 sm:w-10 dark:border-white/10 dark:bg-slate-900">
                <FiBriefcase className="h-4 w-4" />
              </span>

              <Reveal delay={i * 0.06}>
                <div className="glass rounded-2xl p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                        {item.role}
                      </h3>
                      <p className="text-sm font-medium text-brand-600 dark:text-brand-300">
                        {item.company}
                        {item.location && (
                          <span className="text-slate-400 dark:text-slate-500">
                            {" · "}
                            {item.location}
                          </span>
                        )}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs text-slate-500 dark:bg-white/5 dark:text-slate-400">
                      {item.period}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {item.points.map((point, pi) => (
                      <li
                        key={pi}
                        className="flex gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
