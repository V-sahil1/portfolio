import { MdOutlineFileDownload } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { value: "50+", label: "REST APIs built" },
  { value: "4", label: "Production apps" },
  { value: "CodeLamda", label: "MERN intern" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[88vh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* Faint top grid, masked so it fades out — no floating blobs */}
      <div className="grid-bg absolute inset-0 -z-10 opacity-70" aria-hidden />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Text */}
          <div>
            <Reveal y={16}>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-700 dark:text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Open to backend &amp; full-stack roles
              </span>
            </Reveal>

            <Reveal y={16} delay={0.05}>
              <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
                {site.name}
              </h1>
            </Reveal>

            <Reveal y={16} delay={0.1}>
              <p className="mt-5 max-w-xl font-display text-xl font-medium leading-snug text-slate-700 sm:text-2xl dark:text-slate-200">
                I build the APIs, auth, and data layers that products run on.
              </p>
            </Reveal>

            <Reveal y={16} delay={0.15}>
              <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-slate-600 dark:text-slate-400">
                {site.summary}
              </p>
            </Reveal>

            <Reveal y={16} delay={0.2}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button as="a" href="#projects" size="lg">
                  View projects <FiArrowRight className="h-5 w-5" />
                </Button>
                <Button
                  as="a"
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                >
                  Résumé <MdOutlineFileDownload className="h-5 w-5" />
                </Button>
              </div>
            </Reveal>

            <Reveal y={16} delay={0.25}>
              <div className="mt-8">
                <SocialLinks />
              </div>
            </Reveal>
          </div>

          {/* Request card — proof, not decoration */}
          <Reveal y={16} delay={0.15}>
            <RequestCard />
          </Reveal>
        </div>

        {/* Stats */}
        <Reveal y={16} delay={0.3}>
          <dl className="mt-16 grid max-w-2xl grid-cols-3 divide-x divide-slate-200 border-y border-slate-200 dark:divide-white/[0.08] dark:border-white/[0.08]">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-5 first:pl-0">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-white">
                    {s.value}
                  </span>
                  <span className="mt-1 block font-mono text-xs text-slate-500 dark:text-slate-400">
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

function RequestCard() {
  return (
    <div className="surface overflow-hidden rounded-xl shadow-sm">
      {/* window bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-white/[0.08] dark:bg-white/[0.03]">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
        <span className="ml-2 font-mono text-xs text-slate-500 dark:text-slate-400">
          POST /api/auth/login
        </span>
      </div>
      {/* request → response */}
      <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed text-slate-600 dark:text-slate-300">
        <code>
          <span className="text-slate-400 dark:text-slate-500">$ curl -X POST /api/auth/login \</span>
          {"\n"}
          <span className="text-slate-400 dark:text-slate-500">{"  "}-d '{`{ "email": "…", "password": "…" }`}'</span>
          {"\n\n"}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">HTTP/1.1 200 OK</span>
          {"\n"}
          <span className="text-slate-400 dark:text-slate-500">{"{"}</span>
          {"\n"}
          {"  "}
          <span className="text-brand-600 dark:text-brand-300">"accessToken"</span>
          <span className="text-slate-400">: </span>
          <span className="text-amber-600 dark:text-amber-300">"eyJhbGciOiJIUzI1Ni…"</span>
          <span className="text-slate-400">,</span>
          {"\n"}
          {"  "}
          <span className="text-brand-600 dark:text-brand-300">"refreshToken"</span>
          <span className="text-slate-400">: </span>
          <span className="text-amber-600 dark:text-amber-300">"dXNlcl9yZWZyZXNo…"</span>
          <span className="text-slate-400">,</span>
          {"\n"}
          {"  "}
          <span className="text-brand-600 dark:text-brand-300">"role"</span>
          <span className="text-slate-400">: </span>
          <span className="text-amber-600 dark:text-amber-300">"admin"</span>
          {"\n"}
          <span className="text-slate-400 dark:text-slate-500">{"}"}</span>
          <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-caret bg-brand-500/70" aria-hidden />
        </code>
      </pre>
    </div>
  );
}
