/**
 * Launch-phase config — single source of truth.
 *
 *   1 = soft launch: Home, Ways to Play (Local / Destinations / Ripken / Training & Development), About.
 *   2 = full site:  unhide Our Venues, Events, Stories, the 11 sub-property pages,
 *                   and the standalone Nationals page; deep cross-links restore.
 *
 * To flip phases, change CURRENT_PHASE below. Everything downstream
 * (SiteHeader, SiteFooter, BaseLayout's noindex, homepage cross-links,
 * pillar cross-sell cards) reads from this file.
 */
export const CURRENT_PHASE: 1 | 2 = 1;

export type Phase = 1 | 2;
export type Phased<T> = T & { phase: Phase };

export const isLive = (item: { phase: Phase }) => item.phase <= CURRENT_PHASE;
export const liveOnly = <T extends { phase: Phase }>(items: readonly T[]): T[] => items.filter(isLive);

/** Return p2 when Phase 2 is live, otherwise p1. Useful for cross-links. */
export const phaseLink = (p2: string, p1: string): string => (CURRENT_PHASE >= 2 ? p2 : p1);

// =============================================================================
// NAV — Ways to Play dropdown items
// =============================================================================
export type WayToPlay = Phased<{
  slug: string;
  href: string;
  name: string;
  meta: string;
  pillar: 'local' | 'destinations' | 'ripken' | 'nationals' | 'training';
}>;

export const WAYS_TO_PLAY: readonly WayToPlay[] = [
  { slug: 'local',        href: '/local/',        name: 'Local and Regional Weekend Tournaments', meta: 'Unrivaled Baseball Network · USSSA-sanctioned play', pillar: 'local',        phase: 1 },
  { slug: 'destinations', href: '/destinations/', name: 'Destination Experiences',                meta: 'Cooperstown · Aberdeen · Rocker B',                  pillar: 'destinations', phase: 1 },
  { slug: 'ripken',       href: '/ripken/',       name: 'Ripken Nationals',                       meta: '16-Team Championship · Cooperstown',                 pillar: 'ripken',       phase: 1 },
  { slug: 'training',     href: '/training/',     name: 'Training & Development',  meta: 'Baseball Factory · Prospect Select',    pillar: 'training',     phase: 1 },
  { slug: 'nationals',    href: '/nationals/',    name: 'Ripken Nationals',        meta: '16-team Championship',                  pillar: 'nationals',    phase: 2 },
];

// =============================================================================
// NAV — top-level links next to the Ways to Play dropdown
// =============================================================================
export type TopNavLink = Phased<{ key: 'venues' | 'events' | 'stories' | 'about'; label: string; href: string }>;

export const TOP_NAV: readonly TopNavLink[] = [
  { key: 'venues',  label: 'Our Venues', href: '/venues/',  phase: 2 },
  { key: 'events',  label: 'Events',     href: '/events/',  phase: 2 },
  { key: 'stories', label: 'Stories',    href: '/stories/', phase: 2 },
  { key: 'about',   label: 'About',      href: '/about/',   phase: 1 },
];

// =============================================================================
// FOOTER — link columns
// =============================================================================
export type FooterLink = Phased<{ label: string; href: string }>;

export const FOOTER = {
  // Footer column order matches the wireframe: Local → Destinations → Training → Ripken.
  waysToPlay: [
    { label: 'Local and Regional Weekend Tournaments', href: '/local/',        phase: 1 },
    { label: 'Destination Experiences',                href: '/destinations/', phase: 1 },
    { label: 'Training & Development',                 href: '/training/',     phase: 1 },
    { label: 'Ripken Nationals',                       href: '/ripken/',       phase: 1 },
    { label: 'Nationals',                              href: '/nationals/',    phase: 2 },
  ],
  properties: [
    { label: 'Cooperstown',            href: '/cooperstown/',                    phase: 1 },
    { label: 'Rocker B Ranch',         href: '/rocker-b/',                       phase: 1 },
    { label: 'Ripken Experience',      href: '/ripken-aberdeen/',                phase: 1 },
    { label: 'Sports Force Parks',     href: '/sports-force-parks-cedar-point/', phase: 1 },
    { label: 'Baseball Factory',       href: '/baseball-factory/',               phase: 1 },
  ],
  forYou: [
    { label: 'Players',  href: '#', phase: 1 },
    { label: 'Parents',  href: '#', phase: 1 },
    { label: 'Coaches',  href: '#', phase: 1 },
  ],
  company: [
    { label: 'About',   href: '/about/', phase: 1 },
    { label: 'Careers', href: '#',       phase: 1 },
    { label: 'Press',   href: '#',       phase: 1 },
    { label: 'Contact', href: '#',       phase: 1 },
  ],
} as const satisfies Record<string, readonly FooterLink[]>;

// =============================================================================
// PAGE → phase map (drives noindex via BaseLayout). Unlisted pages = phase 1.
// =============================================================================
export const PAGE_PHASES: Readonly<Record<string, Phase>> = {
  '/venues/':                            2,
  '/events/':                            2,
  '/stories/':                           2,
  '/nationals/':                         2,
  // 7 destination + 4 training sub-properties promoted to Phase 1 (indexable, linked).
  // Legacy/internal homepage variants
  '/home-a/':                            2,
  '/home-b/':                            2,
  '/home-c/':                            2,
  '/home-v4/':                           2,
};

/** Prefixes whose pages should be hidden in Phase 1 (catches dynamic [slug] routes). */
export const HIDDEN_PREFIXES: readonly string[] = [
  '/events/',  // /events/:slug
  '/stories/', // /stories/:slug
];

/** True when the page at `pathname` should be hidden from search engines in the current phase. */
export function isPageHidden(pathname: string): boolean {
  // Normalise: collapse trailing slashes and any /index.html suffix to a leading-slash, trailing-slash form.
  const p = pathname.replace(/index\.html$/, '').replace(/\/+$/, '/') || '/';
  // Direct map hit
  if (PAGE_PHASES[p] !== undefined) return PAGE_PHASES[p]! > CURRENT_PHASE;
  // Dynamic [slug] under a hidden prefix (e.g. /events/foo, /stories/bar)
  if (CURRENT_PHASE < 2 && HIDDEN_PREFIXES.some(prefix => p.startsWith(prefix) && p !== prefix)) return true;
  return false;
}
