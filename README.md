# Unrivaled Baseball — Static Site (Vercel)

Static demo of the Unrivaled Baseball site, built with Astro and the design system documented at `../UnrivaledBaseball/DESIGN_SYSTEM.md`.

## Stack

- **Astro 5** — component-based static site generator with near-plain-HTML output
- **No CMS** — all content is in the page files
- **No external CSS framework** — design tokens live in `src/styles/tokens.css`
- **Vercel** — first-class Astro support, zero config needed

## Local development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321` by default.

## Production build

```bash
npm run build
npm run preview
```

The static build output lands in `dist/`.

## Deploy to Vercel

The first time:

```bash
# install the Vercel CLI if you don't have it
npm i -g vercel

# from this directory
vercel
```

Vercel auto-detects Astro and configures the build (`npm run build`) and output directory (`dist/`).

For subsequent deploys, push to the connected Git branch or run `vercel --prod`.

## Project structure

```
src/
  components/
    atoms/        — PillarDot, PillarTag, PillarChip, Btn, Breadcrumb
    chrome/       — SiteHeader, SiteFooter
    heroes/       — Hero, PillarHero, SubPageHero, PageHeader
    cards/        — PillarCard, LocationCard, FoundingCard, VenueCard, CsCard, StoryCard
    sections/     — CtaBand, CrossSell, PillarExplainer, AtAGlance, StoryBlock,
                    Gallery, ContinueExploring, WhatToExpect, FeaturedRail, FilterBar,
                    ListRow, Ticker, FindYourPath, Manifesto, ByTheNumbers,
                    DynamicTimeline, Leadership, EditorialLead, SeriesModule,
                    WatchModule, VoicesModule, NewsletterSignup, SocialFeed
  layouts/        — BaseLayout (header + footer wrapper), SubPropertyLayout
  pages/          — One .astro file per route
  styles/         — tokens.css, reset.css, global.css
```

## Page map

| Route                                  | Template file                                  |
|----------------------------------------|------------------------------------------------|
| `/`                                    | `src/pages/index.astro`                        |
| `/local/`                              | `src/pages/local.astro`                        |
| `/destinations/`                       | `src/pages/destinations.astro`                 |
| `/nationals/`                          | `src/pages/nationals.astro`                    |
| `/training/`                           | `src/pages/training.astro`                     |
| `/cooperstown/`                        | `src/pages/cooperstown.astro`                  |
| `/rocker-b/`                           | `src/pages/rocker-b.astro`                     |
| `/sports-force-parks-cedar-point/`     | `src/pages/sports-force-parks-cedar-point.astro` |
| `/sports-force-parks-manteca/`         | `src/pages/sports-force-parks-manteca.astro`   |
| `/ripken-aberdeen/`                    | `src/pages/ripken-aberdeen.astro`              |
| `/ripken-myrtle-beach/`                | `src/pages/ripken-myrtle-beach.astro`          |
| `/ripken-pigeon-forge/`                | `src/pages/ripken-pigeon-forge.astro`          |
| `/baseball-factory/`                   | `src/pages/baseball-factory.astro`             |
| `/all-ripken/`                         | `src/pages/all-ripken.astro`                   |
| `/prospect-select/`                    | `src/pages/prospect-select.astro`              |
| `/spring-training/`                    | `src/pages/spring-training.astro`              |
| `/venues/`                             | `src/pages/venues.astro`                       |
| `/events/`                             | `src/pages/events.astro`                       |
| `/events/[slug]/`                      | `src/pages/events/[slug].astro` (Phase 2 stub) |
| `/stories/`                            | `src/pages/stories.astro`                      |
| `/stories/[slug]/`                     | `src/pages/stories/[slug].astro` (Phase 2 stub) |
| `/about/`                              | `src/pages/about.astro`                        |
| `/404`                                 | `src/pages/404.astro`                          |

## Design system notes

- **Tokens** in `src/styles/tokens.css` mirror DESIGN_SYSTEM.md §1.1, §1.2, §1.3, §1.4, §1.5
- **Brand fonts** — Review, Review Poster, Neue Plak, Neue Plak Text are self-hosted from `public/fonts/` (mirrored from `UnrivaledSportsCorporate/assets/fonts/`). `@font-face` declarations live in `src/styles/fonts.css`. Fallback chain ends in Helvetica/Arial in case the woff files fail to load.
- **Pillar colors** are referenced semantically via `data-pillar="local|destinations|training|ripken|nationals"` on parent elements; child components read `var(--pillar)` for fills.
- **Patterns** (decorative line work) — Pattern 1 (Velocity) is implemented as a CSS repeating-linear-gradient on `pillar-hero` background. Patterns 3 and 4 (Wedges, Stacked Blocks) will ship as SVG assets in `public/images/patterns/` (not yet added — placeholder gradients used).
- **No JavaScript needed** for any feature on the site except the ticker animation (CSS keyframes). Filter chip and form-chip "active" states are pure CSS demonstrations.

## What's intentionally not built

- Real photos — every image placeholder is a grayscale gradient
- Hamburger menu / mobile navigation (the desktop nav hides below 1024px, but a mobile drawer isn't wired up yet)
- Form submissions (the Newsletter and Find Your Path forms have `event.preventDefault()` handlers and don't post)
- Dynamic event/story content — `/events/[slug]/` and `/stories/[slug]/` each ship two sample paths via `getStaticPaths`

These are scoped for follow-up work, not Phase 1 deliverables.
