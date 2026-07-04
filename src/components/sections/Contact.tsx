import { useState, type FormEvent } from "react";
import { FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { site } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";

const inputClasses =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus-visible:border-brand-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500";

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Section id="contact" className="bg-slate-50/60 dark:bg-white/[0.02]">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something great"
        description="Have a project in mind or just want to connect? My inbox is always open."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        {/* Info */}
        <Reveal className="flex flex-col gap-6">
          <div className="glass flex items-center gap-4 rounded-2xl p-5">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white">
              <FiMail className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Email
              </p>
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-slate-900 hover:text-brand-600 dark:text-white dark:hover:text-brand-300"
              >
                {site.email}
              </a>
            </div>
          </div>

          <div className="glass flex items-center gap-4 rounded-2xl p-5">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white">
              <FiMapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Location
              </p>
              <p className="font-medium text-slate-900 dark:text-white">{site.location}</p>
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <p className="flex items-center gap-2 font-display font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Open for opportunities
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Available for freelance, full-time and collaborative full-stack projects.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">Find me online</p>
            <SocialLinks />
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="glass flex flex-col gap-4 rounded-2xl p-6 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Name
                </label>
                <input id="name" name="name" required placeholder="Your name" className={inputClasses} />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={inputClasses}
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project…"
                className={`${inputClasses} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-500 px-6 py-3 font-medium text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:shadow-brand-500/40"
            >
              {sent ? "Opening your mail app…" : "Send Message"}
              <FiSend className="h-4 w-4" />
            </button>
            {sent && (
              <p role="status" className="text-center text-sm text-emerald-600 dark:text-emerald-400">
                Your email draft is ready — thanks for reaching out!
              </p>
            )}
          </form>
        </Reveal>
      </div>

      <p className="mt-16 text-center text-sm text-slate-500 dark:text-slate-500">
        Made with <span className="text-red-500">♥</span> by {site.name}
      </p>
    </Section>
  );
}
