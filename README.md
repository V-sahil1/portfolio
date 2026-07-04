# Sahil Vardekar — Portfolio

A modern, fully responsive portfolio for a **Full-Stack MERN + TypeScript Developer**, built with React 19, TypeScript, Vite and Tailwind CSS v4. Features a data-driven architecture, dark/light mode, GSAP scroll animations, and an SEO- and accessibility-conscious design.

## Tech Stack

- **React 19** + **TypeScript** (strict)
- **Vite 7** with `@` path alias
- **Tailwind CSS v4** (CSS-first config, class-based dark mode)
- **GSAP** (ScrollTrigger) for scroll reveals
- **react-router-dom 7** with lazy-loaded routes
- **react-icons** for the tech/skill iconography

## Getting Started

```bash
npm install
npm run dev        # start dev server
npm run build      # typecheck (tsc -b) + production build
npm run preview    # preview the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Project Structure

```
src/
├─ components/
│  ├─ layout/      Navbar, Footer
│  ├─ sections/    Hero, About, Skills, Projects, Experience, Education, Certifications, Contact
│  └─ ui/          Reusable primitives (Button, Card, Section, Reveal, Badge, …)
├─ data/           ← Edit these typed files to update content
│  ├─ site.ts          name, role, summary, resume, email
│  ├─ projects.ts      project list (set `featured: true` to show on home)
│  ├─ skills.ts        categorised skills with icons
│  ├─ certifications.ts
│  ├─ experience.ts
│  ├─ education.ts
│  ├─ socials.ts
│  └─ navigation.ts
├─ hooks/          useTheme, useScrollSpy
├─ lib/            utils (cn)
├─ pages/          HomePage, ProjectsPage, NotFound
└─ types/          Shared TypeScript interfaces
```

## Updating Content

All content lives in `src/data/*.ts` — no markup edits required. For example, to add a
project, append an entry to `projects.ts`; to change your summary or resume link, edit
`site.ts`. Everything is typed, so your editor will guide you.
