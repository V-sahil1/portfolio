import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { featuredProjects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Portfolio"
        title="Featured projects"
        description="A selection of full-stack and frontend applications I've designed, built and deployed."
      />

      <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex justify-center">
        <Link
          to="/projects"
          onClick={() => window.scrollTo(0, 0)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-7 py-3 text-base font-medium text-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-600 dark:border-white/15 dark:text-slate-100 dark:hover:border-brand-400/60"
        >
          View All Projects <FiArrowRight className="h-5 w-5" />
        </Link>
      </Reveal>
    </Section>
  );
}
