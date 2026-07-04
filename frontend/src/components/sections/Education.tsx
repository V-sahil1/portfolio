import { education } from "@/data/education";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading eyebrow="Background" title="Education" align="left" />

      <div className="mt-12 grid max-w-4xl gap-5">
        {education.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.08} y={16}>
            <div className="surface flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:items-center sm:gap-7 sm:p-7">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-2 dark:border-white/[0.08] dark:bg-white/5">
                <img
                  src={item.logo}
                  alt={`${item.institution} logo`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {item.institution}
                  </h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs text-slate-500 dark:bg-white/5 dark:text-slate-400">
                    {item.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-300">
                  {item.degree}
                </p>
                {item.detail && (
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {item.detail}
                  </p>
                )}
                {item.points && (
                  <ul className="mt-3 space-y-1.5">
                    {item.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
