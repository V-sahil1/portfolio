import { Typewriter } from "react-simple-typewriter";
import { MdOutlineFileDownload } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { value: "6+", label: "Projects Shipped" },
  { value: "3", label: "Certifications" },
  { value: "MERN", label: "+ TypeScript" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* Background */}
      <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute -top-24 -left-24 -z-10 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl animate-blob"
        aria-hidden
      />
      <div
        className="absolute top-40 -right-24 -z-10 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl animate-blob [animation-delay:4s]"
        aria-hidden
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div className="text-center lg:text-left">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for opportunities
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                Hi, I'm <span className="text-gradient">{site.name}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-4 flex min-h-[2.25rem] items-center justify-center font-mono text-lg font-semibold text-slate-700 sm:text-xl lg:justify-start dark:text-slate-300">
                <span className="mr-2 text-brand-500">&lt;/&gt;</span>
                <Typewriter
                  words={site.roles}
                  loop
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={40}
                  delaySpeed={1800}
                />
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 lg:mx-0 dark:text-slate-400">
                {site.summary}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Button as="a" href="#projects" size="lg">
                  View My Work <FiArrowRight className="h-5 w-5" />
                </Button>
                <Button
                  as="a"
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                >
                  Resume <MdOutlineFileDownload className="h-5 w-5" />
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 flex justify-center lg:justify-start">
                <SocialLinks />
              </div>
            </Reveal>
          </div>

          {/* Code card */}
          <Reveal delay={0.15} className="hidden lg:block">
            <CodeCard />
          </Reveal>
        </div>

        {/* Stats */}
        <Reveal delay={0.3}>
          <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl px-4 py-5 text-center"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}

function CodeCard() {
  return (
    <div className="animate-float rounded-2xl border border-slate-200/70 bg-slate-900 shadow-2xl shadow-brand-900/20 dark:border-white/10">
      {/* window bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-3 font-mono text-xs text-slate-400">developer.ts</span>
      </div>
      {/* code */}
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
        <code>
          <span className="text-pink-400">const</span>{" "}
          <span className="text-sky-300">developer</span>
          <span className="text-slate-400">: </span>
          <span className="text-emerald-300">Developer</span>{" "}
          <span className="text-slate-400">= {"{"}</span>
          {"\n"}
          {"  "}
          <span className="text-sky-300">name</span>
          <span className="text-slate-400">: </span>
          <span className="text-amber-300">'Sahil Vardekar'</span>
          <span className="text-slate-400">,</span>
          {"\n"}
          {"  "}
          <span className="text-sky-300">stack</span>
          <span className="text-slate-400">: [</span>
          <span className="text-amber-300">'Mongo'</span>
          <span className="text-slate-400">, </span>
          <span className="text-amber-300">'Express'</span>
          <span className="text-slate-400">, </span>
          <span className="text-amber-300">'React'</span>
          <span className="text-slate-400">, </span>
          <span className="text-amber-300">'Node'</span>
          <span className="text-slate-400">],</span>
          {"\n"}
          {"  "}
          <span className="text-sky-300">language</span>
          <span className="text-slate-400">: </span>
          <span className="text-amber-300">'TypeScript'</span>
          <span className="text-slate-400">,</span>
          {"\n"}
          {"  "}
          <span className="text-sky-300">shipsProduction</span>
          <span className="text-slate-400">: </span>
          <span className="text-pink-400">true</span>
          <span className="text-slate-400">,</span>
          {"\n"}
          <span className="text-slate-400">{"};"}</span>
        </code>
      </pre>
    </div>
  );
}
