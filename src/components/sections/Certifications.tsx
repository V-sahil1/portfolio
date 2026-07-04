import { FiExternalLink, FiAward } from "react-icons/fi";
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
        description="Courses and credentials that back up my learning journey in web development."
      />

      <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <Reveal key={cert.id} delay={i * 0.1}>
            <article className="glass flex h-full flex-col overflow-hidden rounded-2xl transition-transform hover:-translate-y-1.5">
              <div className="flex items-center justify-center bg-slate-50 p-6 dark:bg-white/5">
                <img
                  src={cert.image}
                  alt={`${cert.name} certificate from ${cert.org}`}
                  loading="lazy"
                  className="h-28 w-auto object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-brand-500">
                  <FiAward className="h-4 w-4" />
                  <span className="font-mono text-xs uppercase tracking-wide">
                    {cert.org}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg font-bold text-slate-900 dark:text-white">
                  {cert.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {cert.description}
                </p>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-600 transition-colors hover:text-brand-500 dark:text-brand-300"
                >
                  View Certificate <FiExternalLink className="h-4 w-4" />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
