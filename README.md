# BuiltWell CT — Frontend

Production-grade marketing website for **BuiltWell CT**, a Connecticut-based home remodeling contractor. Built with Next.js App Router and driven by a Laravel CMS backend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI Primitives | Radix UI |
| Icons | Lucide React |
| Markdown | React Markdown + remark-gfm |
| Fonts | Inter (sans), Playfair Display (serif) |
| Backend | Laravel REST API |

---

## Project Structure

```
/app
  layout.tsx          # Root layout (fonts, providers, navbar, footer)
  page.tsx            # Home page
  [...slug]/          # Catch-all dynamic route for CMS pages
  preview/            # CMS preview mode (noindex protected)

/src
  /templates          # 40+ page template components
  /components         # Reusable section, layout, SEO, and UI components
  /api                # Backend API integration (fetch wrappers)
  /context            # React Context providers (page data, phone)
  /types              # TypeScript type definitions

/lib
  cms.ts              # CMS helpers and page data resolution
  footer.ts           # Dynamic footer variant resolution
  phoneNumbers.ts     # Context-aware phone number management
```

---

## How It Works

Pages are rendered dynamically based on a **template slug** returned by the Laravel API. Each page response contains:

- **SEO metadata** — title, description, canonical URL, Open Graph, robots directives, JSON-LD schema
- **Sections array** — ordered list of section types with their props, rendered by the catch-all route

The catch-all route (`[...slug]`) maps each `section.type` to a React component. 40+ section types are supported (Hero, LeadForm, Testimonials, FAQ, ProjectsMasonryGrid, etc.).

ISR is used in production (`revalidate: 600`). In development, responses are fetched with `no-store`.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the [BuiltWell backend](../builtwell-backend) (Laravel)

### Environment Variables

Create a `.env.local` file in the project root:

```env
LARAVEL_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=https://builtwellct.com
```

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Key Features

- **CMS-driven pages** — all content managed via Laravel backend, no hardcoded copy
- **40+ page templates** — home, service pages, local area pages, case studies, portfolio, and more
- **60+ section components** — hero variants, lead forms, testimonials, before/after grids, FAQ, stats, etc.
- **Dynamic footer variants** — footer layout (A/B/C/D) resolved per page template/slug
- **Full SEO control** — per-page metadata, canonical URLs, robots directives, JSON-LD structured data
- **Preview mode** — draft content preview with signature validation and `noindex` protection
- **Local area targeting** — dedicated pages for Fairfield County, New Haven County, and 10+ Connecticut towns
- **Performance** — ISR with 10-minute revalidation, Next.js Image optimization, remote image domains whitelisted

---

## Design Tokens

Defined in `app/globals.css` and used via Tailwind:

| Token | Value | Usage |
|---|---|---|
| `navy` | `#1E2B43` | Primary brand color, dark backgrounds |
| `gold` | `#A57D48` | Accent color, CTAs, highlights |
| `light` | `#F5F1E9` | Light background sections |
