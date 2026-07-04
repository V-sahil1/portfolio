import { useState, type FormEvent } from "react";
import { FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { site } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";

const inputClasses =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus-visible:border-brand-400 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-100 dark:placeholder:text-slate-500";

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
    <Section id="contact" className="bg-slate-50/60 dark:bg-white/[0.015]">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch"
        description="I'm open to backend and full-stack roles. Send a note and I'll reply within a day."
        align="left"
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Info */}
        <Reveal className="flex flex-col gap-4" y={16}>
          <a
            href={`mailto:${site.email}`}
            className="surface hover-lift flex items-center gap-4 rounded-xl p-5"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-brand-600 dark:border-white/[0.08] dark:text-brand-300">
              <FiMail className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Email
              </p>
              <p className="font-medium text-slate-900 dark:text-white">{site.email}</p>
            </div>
          </a>

          <div className="surface flex items-center gap-4 rounded-xl p-5">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-brand-600 dark:border-white/[0.08] dark:text-brand-300">
              <FiMapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Location
              </p>
              <p className="font-medium text-slate-900 dark:text-white">{site.location}</p>
            </div>
          </div>

          <div className="mt-2">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Find me online
            </p>
            <SocialLinks />
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1} y={16}>
          <form onSubmit={handleSubmit} className="surface flex flex-col gap-4 rounded-2xl p-6 sm:p-7">
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
                placeholder="Tell me about the role or project…"
                className={`${inputClasses} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-medium text-white transition-colors hover:bg-brand-500"
            >
              {sent ? "Opening your mail app…" : "Send message"}
              <FiSend className="h-4 w-4" />
            </button>
            {sent && (
              <p role="status" aria-live="polite" className="text-center text-sm text-emerald-600 dark:text-emerald-400">
                Your email draft is ready — thanks for reaching out.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
