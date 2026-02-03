# Lectere Website

Official website for Lectere - AI assistant that lives inside software.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Animations**: Motion (framer-motion v12+)
- **Routing**: React Router v7
- **Build Tool**: Vite
- **Runtime/Package Manager**: Bun

## Getting Started

Install dependencies:

```bash
bun install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# ConvertKit Newsletter Integration
PUBLIC_CONVERTKIT_FORM_ID=your_form_id_here
CONVERTKIT_API_KEY=your_api_key_here
```

**Note**: `PUBLIC_CONVERTKIT_FORM_ID` is exposed to the client (for display purposes only), while `CONVERTKIT_API_KEY` is kept server-side for security.

Run development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
bun run build
```

## Preview Production Build

```bash
bun run preview
```

## Features

- **Multi-page Application**: Home, Product, Solutions, Pricing, and About pages
- **Modern Design System**: Dark theme with custom brand colors (primary: hsl(346 77% 50%))
- **Component Library**: shadcn/ui components with custom theming
- **Typography**: Custom fonts (Fraunces for display, Outfit for body text)
- **Animations**: Smooth Motion animations with scroll-based progress bar
- **Interactive Effects**: Cursor-reactive lighting effects and glassmorphism
- **Fully Responsive**: Mobile-first design optimized for all screen sizes
- **Type-safe**: Full TypeScript coverage with strict mode enabled
