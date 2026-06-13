// src/lib/hubs.ts
//
// Hub registry for ghslabels.com.
// Single source of truth for all top-level content hubs.
//
// === Adding a new hub (the whole point of this file) ===
// 1. Append a Hub entry to the HUBS array below.
// 2. Add a matching Zod schema in src/content.config.ts
//    (collection name = `hub.collection`).
// 3. Create src/pages/<hub.slug>/index.astro using HubPageLayout (when built).
// 4. Drop the first MDX file into src/content/<hub.collection>/.
// HubGrid on home page picks up new hubs automatically — no further wiring.
//
// === intent semantics ===
// 'directory'   → browseable list of profiles/entities (e.g. suppliers)
// 'comparison'  → head-to-head pages (e.g. compare)
// 'reference'   → spec-heavy reference content (e.g. materials, industries)
// 'commerce'    → pages with strong purchase intent (e.g. kits, services)
// 'editorial'   → guides, articles, opinion pieces (e.g. guides)

export type HubIntent =
  | 'directory'
  | 'comparison'
  | 'reference'
  | 'commerce'
  | 'editorial';

/** Content-collection hub (has MDX collection + intent). */
export interface HubCollection {
  slug: string;
  /** Mega-menu category. 'procurement' = commerce intent, 'resources' = reference. */
  group: 'procurement' | 'resources';
  /** Whether this entry has a content collection ('hub') or is a standalone page ('page'). */
  type: 'hub';
  collection: string;
  label: string;
  abbr: string;
  intent: HubIntent;
  description: string;
  countLabel: string;
  enabled: boolean;
  order: number;
}

/** Standalone site page (no content collection). */
export interface HubPage {
  slug: string;
  /** Mega-menu category. 'procurement' = commerce intent, 'resources' = reference. */
  group: 'procurement' | 'resources';
  /** Whether this entry has a content collection ('hub') or is a standalone page ('page'). */
  type: 'page';
  label: string;
  abbr: string;
  tone: 'ecosystem' | 'neutral';
  description: string;
  order: number;
}

export type Hub = HubCollection | HubPage;

export const HUBS: Hub[] = [
  {
    slug: 'suppliers',
    group: 'procurement',
    type: 'hub',
    collection: 'suppliers',
    label: 'Suppliers',
    abbr: 'SUP',
    intent: 'directory',
    description:
      'Vetted GHS label suppliers with regions, certifications, and product categories.',
    countLabel: 'profiles',
    enabled: true,
    order: 1,
  },
  {
    slug: 'compare',
    group: 'procurement',
    type: 'hub',
    collection: 'comparisons',
    label: 'Compare',
    abbr: 'CMP',
    intent: 'comparison',
    description:
      'Head-to-head comparisons of label suppliers across 12+ procurement criteria.',
    countLabel: 'comparisons',
    enabled: false,
    order: 2,
  },
  {
    slug: 'materials',
    group: 'resources',
    type: 'hub',
    collection: 'materials',
    label: 'Materials',
    abbr: 'MAT',
    intent: 'reference',
    description:
      'Label material specs: BS5609, chemical resistance, temperature ranges, durability.',
    countLabel: 'materials',
    enabled: true,
    order: 3,
  },
  {
    slug: 'industries',
    group: 'resources',
    type: 'hub',
    collection: 'industries',
    label: 'Industries',
    abbr: 'IND',
    intent: 'reference',
    description:
      'Industry-specific label requirements: lab, agrochem, paint, cosmetics, electronics.',
    countLabel: 'verticals',
    enabled: true,
    order: 4,
  },
  {
    slug: 'kits',
    group: 'procurement',
    type: 'hub',
    collection: 'kits',
    label: 'Kits',
    abbr: 'KIT',
    intent: 'commerce',
    description:
      'Ready-made label kits for laboratories, transport, and industry-specific operations.',
    countLabel: 'kits',
    enabled: true,
    order: 5,
  },
  {
    slug: 'services',
    group: 'procurement',
    type: 'hub',
    collection: 'services',
    label: 'Services',
    abbr: 'SVC',
    intent: 'commerce',
    description:
      'Custom label printing, compliance audit, and translation services from our team.',
    countLabel: 'services',
    enabled: true,
    order: 6,
  },
  {
    slug: 'guides',
    group: 'resources',
    type: 'hub',
    collection: 'guides',
    label: 'Guides',
    abbr: 'GDE',
    intent: 'editorial',
    description:
      "Buyer's guides, how-to articles, and decision frameworks for label procurement.",
    countLabel: 'guides',
    enabled: true,
    order: 7,
  },
  {
    slug: 'methodology',
    label: 'Methodology',
    abbr: 'MTH',
    group: 'resources',
    type: 'page',
    tone: 'ecosystem',
    description: 'How we vet suppliers, evaluate materials, and write comparisons. Editorial standards and conflict-of-interest disclosures.',
    order: 8,
  },
  {
    slug: 'about',
    label: 'About',
    abbr: 'ABT',
    group: 'resources',
    type: 'page',
    tone: 'neutral',
    description: 'About ghslabels.com — an independent procurement reference for GHS chemical labels.',
    order: 9,
  },
  {
    slug: 'contact',
    label: 'Contact',
    abbr: 'CNT',
    group: 'resources',
    type: 'page',
    tone: 'neutral',
    description: 'Contact the editorial team. Questions, corrections, supplier outreach.',
    order: 10,
  },
];

// === Helper functions ===
// Use these instead of touching HUBS directly elsewhere in the codebase.

/** Enabled hubs sorted by `order` ascending. Use in HubGrid, sitemap, nav. */
export function getEnabledHubs(): Hub[] {
  return HUBS.filter((h) => h.enabled).sort((a, b) => a.order - b.order);
}

/** Lookup hub by URL slug. Returns undefined if not found. */
export function getHubBySlug(slug: string): Hub | undefined {
  return HUBS.find((h) => h.slug === slug);
}

/** Lookup hub by content collection name. Returns undefined if not found. */
export function getHubByCollection(collection: string): Hub | undefined {
  return HUBS.find((h) => h.collection === collection);
}

/** Canonical URL for a hub home page. Always trailing-slashed. */
export function getHubUrl(hub: Hub): string {
  return `/${hub.slug}/`;
}

/**
 * Get all hub/page entries belonging to a mega-menu group,
 * sorted by their order field ascending.
 */
export function getEntriesByGroup(group: 'procurement' | 'resources'): Hub[] {
  return HUBS.filter((h) => h.group === group).sort((a, b) => a.order - b.order);
}
