import { FiBriefcase } from "react-icons/fi";
import { experience } from "@/data/experience";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  const primary = experience.filter((e) => e.variant !== "minor");
  const minor = experience.filter((e) => e.variant === "minor");

  return (
    <Section id="experience">
      <SectionHeading eyebrow="Experience" title="Where I've worked" align="left" />

      <div className="relative mt-12 max-w-3xl">
        {/* vertical rail */}
        <span
          className="absolute left-4 top-3 bottom-3 w-px bg-gradient-to-b from-brand-500/50 via-slate-200 to-transparent sm:left-5 dark:via-white/10"
          aria-hidden
        />

        <ol className="space-y-6">
          {primary.map((item, i) => (
            <li key={item.id} className="relative pl-14 sm:pl-16">
              <span className="absolute left-0 top-1 grid h-9 w-9 place-items-center rounded-full border border-brand-500/40 bg-brand-500 text-white shadow-sm sm:h-10 sm:w-10">
                <FiBriefcase className="h-4 w-4" aria-hidden />
              </span>

              <Reveal delay={i * 0.06} y={16}>
                <div className="surface rounded-2xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
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
                    <span className="rounded-md border border-slate-200 px-2.5 py-1 font-mono text-xs text-slate-500 dark:border-white/[0.08] dark:text-slate-400">
                      {item.period}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2.5">
                    {item.points.map((point, pi) => (
                      <li
                        key={pi}
                        className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* De-emphasised leadership roles */}
        {minor.length > 0 && (
          <Reveal className="mt-8 pl-14 sm:pl-16" y={16}>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-slate-400">
              Also
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {minor.map((item) => (
                <li
                  key={item.id}
                  className="surface rounded-xl px-4 py-3 text-sm text-slate-600 dark:text-slate-400"
                >
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {item.role}
                  </span>
                  <span className="mt-0.5 block font-mono text-xs text-slate-400">
                    {item.company} · {item.period}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
