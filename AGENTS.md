<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# dillonnagar.com — Agent & Claude Code Guide

## Project Overview
Personal portfolio for Dillon Nagar, a high school developer. Next.js 15 (App Router) + TypeScript + Tailwind CSS. Deployed on Vercel via GitHub auto-deploy from `main`.

## Tech Stack
- **Framework**: Next.js 15 (App Router) — use `app/` directory only, no `pages/`
- **Language**: TypeScript — strict mode, no `any`
- **Styling**: Tailwind CSS — utility classes only, no CSS modules or styled-components
- **Fonts**: Geist Sans + Geist Mono via `next/font/google`
- **Deployment**: Vercel auto-deploys on push to `main`

## File Structure
```
app/              # App Router pages and layouts
components/
  layout/         # Navbar, Footer — used in root layout.tsx
  home/           # Hero, FeaturedProjects, ExperienceSnapshot
  projects/       # ProjectCard, CaseStudyLayout
  experience/     # ExperienceItem
  ui/             # Badge, Button, SectionHeader — shared primitives
data/             # All site content as typed TypeScript exports
  projects.ts
  experience.ts
  skills.ts
lib/
  utils.ts        # cn() className helper
public/
  screenshots/    # Project images (PNG/WebP)
  resume.pdf
```

## Design System
- **Background**: `#0a0a0a` — always dark, no light mode
- **Text**: `#ededed` primary, `text-white/70` secondary, `text-white/50` muted
- **Accent**: `#3b82f6` (Tailwind `blue-500`)
- **Cards**: `border border-white/10 bg-white/5 rounded-xl p-6`
- **Hover**: `hover:-translate-y-0.5 transition-transform duration-150`
- **No**: gradients, heavy animations, stock photos, emoji, light mode toggle

## Content Rules
- ✅ "Founder and developer of RentMax AI, a live rental property analytics platform"
- ❌ "CEO", "raised $X", "thousands of users", "award-winning"
- ✅ "Submitted a formal $3,000 sponsorship proposal to the Rotary Club of Lafayette"
- ❌ "Raised $3,000 for robotics"
- ✅ "DropSplit AI — Next.js MVP, prototype stage"
- ❌ "Launched DropSplit AI"
- No inflated metrics. Accurate status labels only (`live` | `prototype` | `in-progress`).

## All Content Lives in `data/`
Update `data/projects.ts`, `data/experience.ts`, or `data/skills.ts` for content changes — no need to touch page components.

## Key External URLs
- Live site: https://dillonnagar.com
- GitHub repo: https://github.com/Manateek1/dillonnagar
- RentMax AI: https://rentmaxai.com
- VisualCover: https://github.com/Manateek1/VisualCover
- LinkedIn: https://linkedin.com/in/dillonnagar

## Running Locally
```bash
npm run dev     # http://localhost:3000
npm run build   # production build check
npm run lint    # ESLint
```

## Committing
- Push to `main` triggers Vercel deploy automatically
- Keep commits scoped (one feature/fix per commit)
- Never commit `.env*` files or secrets
