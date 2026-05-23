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

export interface Hub {
  slug: string;        // URL segment → /<slug>/
  collection: string;  // content collection key (may differ from slug)
  label: string;       // display name, H1, nav label
  abbr: string;        // 3-letter mono icon (uppercase, no spaces)
  intent: HubIntent;
  description: string; // 1-sentence subtitle for hub card
  countLabel: string;  // plural noun: '12 profiles', '5 comparisons'
  enabled: boolean;    // false → registered but hidden from grids
  order: number;       // ascending sort in HubGrid
}

export const HUBS: Hub[] = [
  {
    slug: 'suppliers',
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
    collection: 'comparisons',
    label: 'Compare',
    abbr: 'CMP',
    intent: 'comparison',
    description:
      'Head-to-head comparisons of label suppliers across 12+ procurement criteria.',
    countLabel: 'comparisons',
    enabled: true,
    order: 2,
  },
  {
    slug: 'materials',
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
