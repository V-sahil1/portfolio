import { FiGithub, FiExternalLink } from "react-icons/fi";
import type { Project } from "@/types";
import { Badge } from "./Badge";

interface ProjectCardProps {
  project: Project;
}

/** Visual header: screenshot when available, otherwise a code / architecture panel. */
function CardMedia({ project }: ProjectCardProps) {
  if (project.image) {
    return (
      <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={project.image}
          alt={`${project.name} preview`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-md border border-white/10 bg-slate-900/70 px-2.5 py-1 font-mono text-xs font-medium text-white backdrop-blur">
          {project.category}
        </span>
      </div>
    );
  }

  return (
    <div className="surface-inset relative aspect-video overflow-hidden">
      <span className="absolute right-3 top-3 rounded-md border border-slate-200 bg-white/70 px-2.5 py-1 font-mono text-xs font-medium text-slate-500 dark:border-white/[0.08] dark:bg-white/5 dark:text-slate-400">
        {project.category}
      </span>
      <pre
        className="h-full overflow-hidden p-5 font-mono text-[12px] leading-relaxed text-slate-600 dark:text-slate-300"
        aria-label={`${project.name} architecture and endpoints`}
      >
        <code>{project.codePreview?.join("\n")}</code>
      </pre>
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const wide = project.wide;

  return (
    <article
      className={`surface hover-lift group flex h-full overflow-hidden rounded-2xl ${
        wide ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      <div className={wide ? "md:w-1/2" : ""}>
        <CardMedia project={project} />
      </div>

      <div className={`flex flex-1 flex-col p-6 ${wide ? "md:w-1/2 md:justify-center" : ""}`}>
        <div className="flex items-center gap-2">
          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
            {project.name}
          </h3>
          {wide && (
            <span className="rounded-md border border-brand-500/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-brand-600 dark:text-brand-300">
              Featured
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{project.tagline}</p>

        {project.arch && (
          <p className="mt-3 font-mono text-xs text-brand-600/90 dark:text-brand-300/90">
            {project.arch}
          </p>
        )}

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} source code on GitHub`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-white/[0.08] dark:text-slate-200 dark:hover:border-brand-400/60"
            >
              <FiGithub className="h-4 w-4" /> Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} live demo`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-500"
            >
              <FiExternalLink className="h-4 w-4" /> Live demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
