import { FiExternalLink } from "react-icons/fi";
import { certifications } from "@/data/certifications";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow="Credentials"
        title="Certifications"
        description="Verified coursework in backend and full-stack development."
        align="left"
      />

      <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-white/[0.08] dark:bg-white/[0.08]">
        {certifications.map((cert, i) => (
          <li key={cert.id} className="bg-white dark:bg-slate-900/40">
            <Reveal delay={i * 0.06} y={16}>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col p-6 transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.02]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-600 dark:text-brand-300">
                    {cert.org}
                  </span>
                  <FiExternalLink className="h-4 w-4 text-slate-400 transition-colors group-hover:text-brand-500" />
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-slate-900 dark:text-white">
                  {cert.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {cert.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-300">
                  View certificate
                  <FiExternalLink className="h-3.5 w-3.5" />
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
