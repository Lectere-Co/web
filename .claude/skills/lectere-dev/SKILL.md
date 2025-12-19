---
name: lectere-dev
description: Development standards for the Lectere website project. Use this skill when writing code, creating components, installing packages, or running commands in this workspace. Enforces bun as the package manager/runtime, React 19 with TypeScript, Motion (framer-motion v12+) for animations, and shadcn/ui for UI components.
---

# Lectere Development Standards

## Tech Stack (Required)

- **Runtime/Package Manager**: Bun (never use npm, yarn, or pnpm)
- **Framework**: React 19 with TypeScript
- **Animation**: Motion (framer-motion v12+)
- **UI Components**: shadcn/ui (Radix-based, already configured)
- **Build Tool**: Vite
- **Styling**: CSS Modules + shadcn/ui + Tailwind (when configured)

## Commands

### Installing packages
```bash
bun add <package>        # Add dependency
bun add -d <package>     # Add dev dependency
bun install              # Install all dependencies
```

### Running the project
```bash
bun dev      # Start dev server
bun build    # Production build
bun preview  # Preview production build
```

### Adding shadcn/ui components
```bash
bunx --bun shadcn@latest add <component>
```

## Component Patterns

### React Components
- Use functional components with TypeScript
- Use `.tsx` extension
- Place in `src/components/`
- Use CSS Modules (`.module.css`) for component-specific styles

### Animation with Motion
```tsx
import { motion } from "motion/react";

// Use motion components for animations
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### shadcn/ui Components
- Import from `@/components/ui/` when available
- Use `bunx --bun shadcn@latest add <component>` to add new components
- Components are customizable in `src/components/ui/`

## File Structure
```
src/
  components/     # React components with CSS modules
    ui/           # shadcn/ui components (when added)
  styles/         # Global styles
  App.tsx         # Main app component
  main.tsx        # Entry point
```

## Critical Rules

1. **Always use `bun`** - Never use npm, yarn, pnpm, or npx
2. **Use `bunx --bun`** - For running package binaries (e.g., `bunx --bun shadcn@latest`)
3. **TypeScript required** - All new files should be `.ts` or `.tsx`
4. **Motion for animations** - Use `motion/react` import path
5. **CSS Modules** - Use `.module.css` for component styles
