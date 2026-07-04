import { site } from "@/data/site";
import { navLinks } from "@/data/navigation";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 py-10 dark:border-white/10">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {site.name}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{site.role}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <SocialLinks />
        </div>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-500">
          © {year} {site.name}. Built with React, TypeScript &amp; Tailwind CSS.
        </p>
      </Container>
    </footer>
  );
}
