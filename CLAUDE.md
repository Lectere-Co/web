# CLAUDE.md — Lectere Website

## Overview

Lectere is an AI-powered learning assistant that lives inside software and guides users visually on their real screen. This repository contains the marketing/product website for Lectere.

**Live deployment target**: Cloudflare Pages

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Astro (island architecture) | 5.8.x |
| UI Islands | React | 19.x |
| Styling | Tailwind CSS (v4, Vite plugin) | 4.x |
| Animations | Motion (Framer Motion) | 12.x |
| Icons | Lucide React | latest |
| UI Primitives | Radix UI + shadcn/ui (new-york style) | — |
| Language | TypeScript (strict mode) | 5.8.x |
| Package Manager / Runtime / Bundler | **Bun** | latest |

### Important: Use Bun Everywhere

This project uses **Bun** as the package manager, JavaScript runtime, and bundler. Do NOT use npm, yarn, or pnpm.

```bash
bun install          # Install dependencies
bun run dev          # Start dev server
bun run build        # Production build
bun run preview      # Preview production build
bun add <pkg>        # Add a dependency
bun add -d <pkg>     # Add a dev dependency
```

The lockfile is `bun.lock` — never commit a `package-lock.json` or `yarn.lock`.

---

## Project Structure

```
web/
├── public/                     # Static assets (served as-is)
│   ├── favicon.svg
│   ├── lecterelogo.svg         # Full logo with text
│   └── lecterelogonotext.svg   # Logo icon only
├── src/
│   ├── components/             # All components
│   │   ├── ui/                 # shadcn/ui primitives (Button, Card, Badge)
│   │   ├── *.tsx               # React island components (interactive)
│   │   ├── Footer.astro        # Static Astro components
│   │   └── Newsletter.astro
│   ├── layouts/
│   │   └── Layout.astro        # Root HTML layout (head, nav, footer)
│   ├── pages/                  # File-based routing (Astro)
│   │   ├── index.astro         # Home — /
│   │   ├── product.astro       # Product — /product
│   │   ├── solutions.astro     # Solutions — /solutions
│   │   ├── pricing.astro       # Pricing — /pricing
│   │   └── about.astro         # About — /about
│   ├── lib/
│   │   └── utils.ts            # cn() helper (clsx + tailwind-merge)
│   ├── styles/
│   │   └── globals.css         # Global styles, theme variables, custom utilities
│   └── env.d.ts                # Astro type declarations
├── .claude/skills/             # Claude AI skill modules (not part of the website build)
├── astro.config.mjs            # Astro + React + Tailwind Vite plugin config
├── tailwind.config.js          # Tailwind theme extensions (colors, fonts, animations)
├── tsconfig.json               # TypeScript config (strict, path aliases)
├── components.json             # shadcn/ui configuration
├── bun.lock                    # Bun lockfile
└── package.json
```

---

## Deployment — Cloudflare

This site is deployed to **Cloudflare Pages**. Key considerations:

- The build output is a static site in `dist/`.
- Build command: `bun run build`
- Output directory: `dist`
- Astro is configured for static output (default, no SSR adapter).
- Do NOT add a Node.js-specific server adapter — keep it static.
- Environment variables, if needed, should be set in the Cloudflare Pages dashboard or via `wrangler`.

---

## Architecture & Conventions

### Astro Island Architecture

This project uses Astro's island architecture — pages are `.astro` files that render static HTML, and interactive React components are hydrated selectively using client directives:

- **`client:load`** — Hydrate immediately on page load. Used for components that must be interactive right away (Navigation, ScrollProgress).
- **`client:visible`** — Hydrate when the component scrolls into view. Used for most page sections (HeroSection, ProblemSection, etc.) to improve initial load performance.
- **No directive** — Astro components (Footer, Newsletter) render as static HTML with zero JavaScript.

Example page pattern:
```astro
---
import Layout from '../layouts/Layout.astro';
import { HeroSection } from '../components/HeroSection';
import { FeatureSection } from '../components/FeatureSection';
---
<Layout>
  <HeroSection client:load />
  <FeatureSection client:visible />
</Layout>
```

### Component Conventions

- **React components** (`.tsx`): PascalCase, named exports preferred (e.g., `export function HeroSection() {}`).
- **Astro components** (`.astro`): PascalCase, used for static-only content.
- **UI primitives** live in `src/components/ui/` and follow shadcn/ui patterns (cva variants, cn utility, Radix primitives).
- **Feature components** are named after their page section: `ProductHero`, `PricingFAQ`, `SolutionsCTA`, etc.
- Components are flat in `src/components/` — no nested subdirectories beyond `ui/`.

### Path Aliases

The `@/` alias maps to `src/`:
```typescript
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
```

### Layout System

All pages use `Layout.astro` which provides:
- HTML document structure with meta tags
- Google Fonts preconnect links (Fraunces, Outfit)
- ScrollProgress bar (`client:load`)
- Navigation (`client:load`, receives `currentPath`)
- Main content slot with `pt-[72px]` for fixed nav offset
- Optional Newsletter section (controlled via `showNewsletter` prop)
- Footer

---

## Styling

### Tailwind CSS v4

Tailwind v4 is configured via the Vite plugin in `astro.config.mjs` — NOT via `postcss.config.js`. The `tailwind.config.js` file provides extended theme values (colors, fonts, animations) but the primary theme definition uses Tailwind v4's `@theme` directive in `globals.css`.

### Brand Colors

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `primary` | `hsl(341 82% 56%)` | `#eb336e` | Razzmatazz Pink — buttons, links, accents |
| `accent` | `hsl(341 60% 38%)` | `#9b274c` | Amaranth Purple — gradient endpoints, hover |
| `background` | `hsl(0 0% 100%)` | `#ffffff` | Page background |
| `foreground` | `hsl(0 0% 10%)` | `#1a1a1a` | Body text |

All brand colors must stay within the pink-to-purple spectrum. Do NOT introduce blue, green, or other hue families into the brand palette.

### Typography

- **Display font** (`font-display`): Fraunces — used for all headings (`h1`–`h6`).
- **Body font** (`font-sans`): Outfit — used for all body text.
- Fonts are imported via Google Fonts in `globals.css`.

### Custom Utilities

Defined in `globals.css`:
- `.text-gradient` — Brand gradient text (Razzmatazz to Amaranth Purple)
- `.glow-primary` — Pink glow box-shadow
- `.glow-sm` — Subtle glow
- `.section-padding` — Consistent vertical section spacing (`py-24 md:py-32 lg:py-40`)
- `.fade-in-up` — Entrance animation

### Animations

Components use the `motion` library (Framer Motion) for:
- Scroll-triggered entrance animations (fade, slide-up)
- Hover effects and micro-interactions
- Staggered children animations

Custom Tailwind keyframe animations are also available: `accordion-down`, `accordion-up`, `pulse-ring`, `float`, `glow`.

---

## Development Workflow

### Getting Started

```bash
bun install
bun run dev
```

The dev server starts at `http://localhost:4321` with hot module replacement.

### Building for Production

```bash
bun run build
bun run preview    # Test the production build locally
```

### Adding a New Page

1. Create `src/pages/<name>.astro`
2. Import `Layout` and wrap content
3. Create React components for interactive sections
4. Add navigation link in `src/components/Navigation.tsx`

### Adding a New Component

1. Create `src/components/<Name>.tsx`
2. Use named exports: `export function ComponentName() {}`
3. Use `cn()` for conditional Tailwind classes
4. Use `motion` for animations where needed
5. Import in the relevant `.astro` page with the appropriate client directive

### Adding shadcn/ui Components

```bash
bunx shadcn@latest add <component-name>
```

Components install to `src/components/ui/`. The project uses the `new-york` style variant with `lucide` icons.

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config: React integration + Tailwind Vite plugin |
| `tailwind.config.js` | Extended theme: colors, fonts, animations, container |
| `src/styles/globals.css` | Theme variables (`@theme`), base styles, custom utilities |
| `src/layouts/Layout.astro` | Root HTML layout shared by all pages |
| `src/lib/utils.ts` | `cn()` utility for merging Tailwind classes |
| `components.json` | shadcn/ui configuration (style, aliases, icon library) |
| `tsconfig.json` | TypeScript strict mode, `@/` path alias |

---

## Things to Avoid

- **Do NOT use npm/yarn/pnpm** — use Bun for all package operations.
- **Do NOT add SSR adapters** — this is a static site deployed to Cloudflare Pages.
- **Do NOT introduce new color hues** outside the pink/purple brand palette without explicit approval.
- **Do NOT nest components** in deep subdirectories — keep them flat in `src/components/`.
- **Do NOT use `client:load`** on every component — prefer `client:visible` for below-the-fold sections.
- **Do NOT commit `node_modules/`, `dist/`, `.astro/`, or `.env` files.**
- **Do NOT modify the README.md** tech stack section (it references legacy info from the React SPA era and is kept for historical context).

---

## No Tests or CI/CD (Current State)

There are currently no automated tests or CI/CD pipelines configured. If adding tests in the future, use `bun test` (Bun's built-in test runner) rather than Jest or Vitest.
