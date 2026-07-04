import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { projects } from "@/data/projects";
import type { ProjectCategory } from "@/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/utils";

type Filter = ProjectCategory | "All";

const filters: Filter[] = ["All", "Full-Stack", "Frontend", "AI"];

export default function ProjectsPage() {
  const [active, setActive] = useState<Filter>("All");

  const visible = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <div className="min-h-screen pt-28 pb-24">
      <Container>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"
        >
          <FiArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="mt-6 max-w-2xl">
          <p className="mb-3 font-mono text-sm font-medium uppercase tracking-widest text-brand-500">
            Portfolio
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            All Projects
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            The complete collection of applications I've built and shipped.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === f
                  ? "bg-gradient-to-r from-brand-600 to-accent-500 text-white shadow-md"
                  : "border border-slate-200 text-slate-600 hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:text-slate-300 dark:hover:border-brand-400/60",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-slate-500">No projects in this category yet.</p>
        )}
      </Container>
    </div>
  );
}
