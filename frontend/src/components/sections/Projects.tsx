import { FiArrowRight, FiGithub } from "react-icons/fi";
import { featuredProjects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  const flagship = featuredProjects.filter((p) => p.wide);
  const rest = featuredProjects.filter((p) => !p.wide);

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Selected work"
        title="Projects"
        description="Backend-first applications — API architecture, authentication, and data modeling, with the frontends on top."
        align="left"
      />

      <div className="mt-12 space-y-7">
        {flagship.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.05} y={16}>
            <ProjectCard project={project} />
          </Reveal>
        ))}

        {rest.length > 0 && (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.08} y={16}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <Reveal className="mt-10 flex justify-center" y={16}>
        <a
          href="https://github.com/V-sahil1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-800 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-white/[0.12] dark:text-slate-100 dark:hover:border-brand-400/60"
        >
          <FiGithub className="h-4 w-4" /> More on GitHub <FiArrowRight className="h-4 w-4" />
        </a>
      </Reveal>
    </Section>
  );
}
