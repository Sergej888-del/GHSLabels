// src/lib/tools.ts
//
// Free Tools registry — single source of truth for the T1-T5 interactive
// utilities. Consumed by:
//   - StickyHeader.astro Tools mega menu (Phase B.2)
//   - Future home FreeTools section (Phase F)
//   - Future /tools/index.astro hub page (backlog)
//   - Future /tools/[slug].astro individual tool pages (backlog)
//
// Adding a new tool: append to TOOLS array. Both header and home section
// will pick it up automatically. T-codes must stay sequential and unique.
//
// Status semantics:
//   - 'live'        — fully functional, indexable
//   - 'beta'        — usable, hidden from sitemap, "Beta" chip shown
//   - 'coming-soon' — placeholder, no link, "Coming soon" label shown
//
// All five tools below are coming-soon until each individual page is built.
// The data exists so the mega menu can show them with proper labels and
// the future home section has consistent content to render.

export type ToolStatus = 'live' | 'beta' | 'coming-soon';

export interface Tool {
  /** Sequential identifier (T1, T2, ...). Used as the tile chip label. */
  code: string;
  /** URL slug under /tools/. */
  slug: string;
  /** Display name (sentence case, e.g. "BS5609 checker"). */
  name: string;
  /** One-line description for mega menu items (under ~70 chars). */
  shortDesc: string;
  /** Two-line description for home section tiles (under ~140 chars). */
  longDesc: string;
  /** Lifecycle state. */
  status: ToolStatus;
}

export const TOOLS: readonly Tool[] = [
  {
    code: 'T1',
    slug: 'bs5609-checker',
    name: 'BS5609 checker',
    shortDesc: 'Verify a material against marine-grade requirements',
    longDesc:
      'Verify a label material against BS5609 marine-grade requirements ' +
      'before you order. Section 2, 3, and 4 conformance checks.',
    status: 'coming-soon',
  },
  {
    code: 'T2',
    slug: 'sds-reader',
    name: 'SDS reader',
    shortDesc: 'Parse safety data sheets, extract label elements',
    longDesc:
      'Parse a safety data sheet PDF and extract the required GHS label ' +
      'elements: pictograms, signal word, H- and P-statements.',
    status: 'coming-soon',
  },
  {
    code: 'T3',
    slug: 'hazard-lookup',
    name: 'Hazard class lookup',
    shortDesc: 'Find the right GHS class by CAS or name',
    longDesc:
      'Find the right GHS hazard class for a chemical by CAS number or ' +
      'substance name. Searches CLP Annex VI + ECHA classifications.',
    status: 'coming-soon',
  },
  {
    code: 'T4',
    slug: 'label-sizing',
    name: 'Label sizing calculator',
    shortDesc: 'Minimum dimensions per regulation and container',
    longDesc:
      'Calculate minimum label dimensions per regulation and container ' +
      'size. CLP, OSHA HCS, ADR, IMDG minimums included.',
    status: 'coming-soon',
  },
  {
    code: 'T5',
    slug: 'compliance-map',
    name: 'Compliance map',
    shortDesc: 'Country-by-country label requirements',
    longDesc:
      'Country-by-country label requirement comparison. Coverage: EU/CLP, ' +
      'US/OSHA HCS, UK/CLP, Japan, China, plus regional variants.',
    status: 'coming-soon',
  },
] as const;

/**
 * Get a tool by its T-code (e.g. 'T3').
 * Returns undefined if not found.
 */
export function getToolByCode(code: string): Tool | undefined {
  return TOOLS.find((t) => t.code === code);
}

/**
 * Get a tool by its URL slug (e.g. 'sds-reader').
 * Returns undefined if not found.
 */
export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

/**
 * Filter tools by status.
 * Default: returns live + beta (publishable tools).
 */
export function getPublishableTools(): Tool[] {
  return TOOLS.filter((t) => t.status === 'live' || t.status === 'beta');
}
