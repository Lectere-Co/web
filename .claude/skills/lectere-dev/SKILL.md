---
name: lectere-dev
description: Development standards for the Lectere marketing website. Use this skill when writing code, creating components, installing packages, or running commands in this workspace. Enforces Astro island architecture with React 19 for interactive components, Tailwind CSS v4 for styling, Motion for animations, and shadcn/ui for UI primitives. Bun is the only allowed package manager.
---

# Lectere Development Standards

## Tech Stack

- **Framework**: Astro 5.8.x (island architecture) — pages are `.astro` files
- **Interactive islands**: React 19 + TypeScript (`.tsx`) — only for components requiring interactivity
- **Package Manager / Runtime**: Bun (never use npm, yarn, pnpm, or npx)
- **Styling**: Tailwind CSS v4 (Vite plugin) — no CSS Modules
- **Animation**: Motion (`motion/react` import path)
- **UI Primitives**: shadcn/ui (Radix-based, `new-york` style)
- **Icons**: Lucide React
- **Deployment**: Cloudflare Pages (static output, no SSR adapter)

## Commands

```bash
bun install              # Install all dependencies
bun run dev              # Start dev server (http://localhost:4321)
bun run build            # Production build → dist/
bun run preview          # Preview production build

bun add <package>        # Add dependency
bun add -d <package>     # Add dev dependency

bunx shadcn@latest add <component>   # Add shadcn/ui component
```

## Component Patterns

### Astro vs React — When to Use Each

| Situation | Use |
|-----------|-----|
| Static content, no interactivity needed | `.astro` component |
| Requires `useState`, event listeners, or JS at runtime | `.tsx` React component |

### Astro Island Directives

```astro
<MyComponent client:load />     <!-- Hydrate immediately (nav, scroll progress) -->
<MyComponent client:visible />  <!-- Hydrate when scrolled into view (page sections) -->
```

Prefer `client:visible` for below-the-fold sections to improve load performance.

### Astro Component Pattern

```astro
---
// Frontmatter: imports, props
import { Button } from "@/components/ui/button";
const { title } = Astro.props;
---

<section class="section-padding">
  <h2>{title}</h2>
  <slot />
</section>
```

### React Component Pattern

```tsx
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function MyComponent({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("...", className)}
    >
      Content
    </motion.div>
  );
}
```

### Scroll Reveal in Astro Components

Use CSS classes + `data-delay` for scroll-triggered reveals (handled by IntersectionObserver in Layout):

```html
<div class="reveal reveal-up" data-delay="1">Content</div>
<div class="reveal reveal-up" data-delay="2">Content</div>
```

Classes: `reveal-up`, `reveal-left`, `reveal-right`, `reveal-scale`, `reveal-rotate`. Delays 1–8.

### shadcn/ui Components

```tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
```

## File Structure

```
src/
  components/        # All components (flat — no nested subdirectories beyond ui/)
    ui/              # shadcn/ui primitives (Button, Card, Badge, etc.)
    Navigation.tsx   # React islands (interactive)
    HeroSection.astro  # Astro components (static)
  layouts/
    Layout.astro     # Root HTML layout (nav, footer, fonts, scroll progress)
  pages/             # File-based routing
    index.astro      # /
    product.astro    # /product
    pricing.astro    # /pricing
    solutions.astro  # /solutions
    about.astro      # /about
  lib/
    utils.ts         # cn() helper (clsx + tailwind-merge)
  styles/
    globals.css      # @theme vars, base styles, custom utilities
```

## Styling

### Path Alias

```typescript
import { cn } from "@/lib/utils";      // maps to src/lib/utils.ts
import { Button } from "@/components/ui/button";
```

### Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#eb336e` | Razzmatazz Pink — buttons, links, accents |
| `accent` | `#9b274c` | Amaranth Purple — gradients, hover states |

Stay within the pink-to-purple spectrum. Do not introduce blue, green, or other hues.

### Typography

- `font-display` (Fraunces) — all headings (`h1`–`h6`)
- `font-sans` (Outfit) — all body text

### Custom Utilities

```html
<span class="text-gradient">Gradient text</span>   <!-- pink → purple -->
<div class="glow-primary">...</div>                 <!-- pink glow shadow -->
<section class="section-padding">...</section>      <!-- py-16 sm:py-24 md:py-32 lg:py-40 -->
```

## Critical Rules

1. **Always use `bun`** — never npm, yarn, pnpm, or npx
2. **`bun run <script>`** — scripts need the `run` keyword (e.g., `bun run dev`)
3. **TypeScript required** — all new files must be `.ts` or `.tsx`
4. **No CSS Modules** — use Tailwind utility classes for all styling
5. **Flat components** — keep all components in `src/components/` (only `ui/` subdirectory allowed)
6. **Static-first** — use `.astro` components unless interactivity requires React
7. **No SSR adapter** — this is a static site; do not add server-side rendering
