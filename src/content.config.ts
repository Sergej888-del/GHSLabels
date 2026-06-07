// src/content.config.ts
//
// Content Collections schema for ghslabels.com.
// Defines Zod schemas for all 7 content collections.
//
// === Adding a new collection ===
// 1. Add the collection slug to src/lib/hubs.ts (HUBS array, `collection` field).
// 2. Define a new `defineCollection({ ... })` block below, following the patterns here.
// 3. Add it to the `collections` export at the bottom.
// 4. Create the folder src/content/<collection-name>/ (Astro auto-creates on first MDX).
// 5. Drop your first MDX file into that folder with matching frontmatter.
//
// === Schema conventions used here ===
// - title:        max 60 chars (Google snippet limit)
// - description:  max 155 chars (meta description sweet spot)
// - slug:         kebab-case, matches filename, required in frontmatter
// - pubDate:      ISO date, coerced from frontmatter YAML
// - keywords:     array of strings, used in OG meta + AI discovery
// - draft:        when true, item is excluded from listings (filter at usage site)
// - language:     locked to 'en-US' for now
// - schemaType:   schema.org type emitted as JSON-LD on detail pages
// - relatedPages: internal /<path>/ URLs for cross-linking
// - crossDomainLinks: ghssymbols.com or ghspictograms.com URLs
//
// === Schema rationale ===
// suppliers uses `name` (not `title`) because it's a schema.org Organization entity.
// All other collections use `title` (content-style headline).
// Comparisons/kits/services intentionally omit `crossDomainLinks` (commerce-genre, less linking out).

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ─── 1. Suppliers ────────────────────────────────────────────────────────────
// Vendor profile pages. Renders as schema.org Organization on detail pages.
const suppliers = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/suppliers' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    logo: z.string().optional(),
    websiteUrl: z.string().url(),
    affiliateUrl: z.string().url().optional(),
    affiliateProgram: z.enum(['active', 'pending', 'none']).default('none'),
    tagline: z.string().max(160),
    description: z.string(),
    foundedYear: z.number().optional(),
    headquarters: z.string().optional(),
    servesRegions: z.array(z.string()),               // ['US', 'EU', 'UK', 'global']
    productCategories: z.array(z.string()),           // ['blank-labels', 'pre-printed', 'printers']
    pricingModel: z.enum(['retail', 'enterprise', 'quote', 'mixed']),
    ghsSpecialist: z.boolean(),                       // true if has dedicated GHS line
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    bestFor: z.array(z.string()),                     // use cases
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    schemaType: z.literal('Organization').default('Organization'),
    relatedSuppliers: z.array(z.string()).optional(), // slugs of other suppliers
    relatedComparisons: z.array(z.string()).optional(),
  }),
});

// ─── 2. Comparisons ──────────────────────────────────────────────────────────
// Head-to-head supplier comparisons (URL: /compare/[slug]/).
// Collection name 'comparisons' but URL slug 'compare' — handled in hubs.ts.
const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/comparisons' }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(155),
    slug: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    vendorsCompared: z.array(z.string()).min(2),      // slugs of 2+ suppliers
    primaryKeyword: z.string(),
    keywords: z.array(z.string()),
    verdict: z.string(),                              // one-line summary at top
    bestForVendorA: z.array(z.string()),
    bestForVendorB: z.array(z.string()),
    draft: z.boolean().default(false),
    language: z.literal('en-US').default('en-US'),
    schemaType: z.literal('Article').default('Article'),
    author: z.string().default('GHS Labels Editorial'),
    relatedPages: z.array(z.string()).optional(),
  }),
});

// ─── 3. Materials ────────────────────────────────────────────────────────────
// Label material specifications (BS5609, chemical-resistant PP, polyester, etc.).
const materials = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/materials' }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(155),
    slug: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    materialType: z.enum(['paper', 'polypropylene', 'polyester', 'vinyl', 'specialty']),
    durability: z.array(z.string()),                  // ['BS5609', 'IMDG', 'UV-resistant']
    chemicalResistance: z.array(z.string()).optional(),// substance families
    temperatureRange: z.string().optional(),          // '-40°C to +80°C'
    typicalApplications: z.array(z.string()),
    recommendedSuppliers: z.array(z.string()).optional(),
    keywords: z.array(z.string()),
    draft: z.boolean().default(false),
    language: z.literal('en-US').default('en-US'),
    schemaType: z.literal('Article').default('Article'),
    author: z.string().default('GHS Labels Editorial'),
    relatedPages: z.array(z.string()).optional(),
    crossDomainLinks: z.array(z.string()).optional(),
  }),
});

// ─── 4. Kits ─────────────────────────────────────────────────────────────────
// Ready-made label kits (lab starter, transport pack, multi-language sets).
// Detail pages render schema.org Product (per SEO matrix in architecture spec).
const kits = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/kits' }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(155),
    slug: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    kitType: z.enum(['pictogram-stickers', 'pre-printed-clp', 'multi-language', 'industry-bundle']),
    targetAudience: z.array(z.string()),
    supplier: z.string().optional(),                  // slug if single-supplier kit
    priceRange: z.string().optional(),                // '$$', '$$$', 'quote'
    affiliateUrl: z.string().url().optional(),
    keywords: z.array(z.string()),
    draft: z.boolean().default(false),
    language: z.literal('en-US').default('en-US'),
    schemaType: z.literal('Product').default('Product'),
    author: z.string().default('GHS Labels Editorial'),
    relatedPages: z.array(z.string()).optional(),
  }),
});

// ─── 5. Industries ───────────────────────────────────────────────────────────
// Vertical landing pages (lab, paint, agrochem, cosmetics, electronics).
// Cross-domain links to ghssymbols substance pages enabled (high-value internal SEO).
const industries = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/industries' }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(155),
    slug: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    industryName: z.string(),
    typicalContainers: z.array(z.string()),
    requiredMaterials: z.array(z.string()),
    relevantRegulations: z.array(z.string()),         // ['CLP', 'OSHA HCS', 'REACH']
    recommendedSuppliers: z.array(z.string()),
    recommendedKits: z.array(z.string()).optional(),
    keywords: z.array(z.string()),
    draft: z.boolean().default(false),
    language: z.literal('en-US').default('en-US'),
    schemaType: z.literal('Article').default('Article'),
    author: z.string().default('GHS Labels Editorial'),
    relatedPages: z.array(z.string()).optional(),
    crossDomainLinks: z.array(z.string()).optional(),
  }),
});

// ─── 6. Services ─────────────────────────────────────────────────────────────
// Own services (custom printing, label audit, translation).
// Detail pages render schema.org Service.
const services = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/services' }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(155),
    slug: z.string(),
    pubDate: z.coerce.date(),
    serviceName: z.string(),
    pricingModel: z.enum(['fixed', 'quote', 'subscription', 'tier']),
    keyBenefits: z.array(z.string()),
    typicalTurnaround: z.string().optional(),
    ctaText: z.string().default('Request a quote'),
    ctaUrl: z.string().default('/quote/'),
    keywords: z.array(z.string()),
    draft: z.boolean().default(false),
    language: z.literal('en-US').default('en-US'),
    schemaType: z.literal('Service').default('Service'),
    relatedPages: z.array(z.string()).optional(),
  }),
});

// ─── 7. Guides ───────────────────────────────────────────────────────────────
// Buyer's guides, how-tos, decision frameworks.
const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(155),
    slug: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    guideType: z.enum(['buyer-guide', 'how-to', 'comparison-methodology', 'decision-tree', 'educational']),
    primaryKeyword: z.string(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    keywords: z.array(z.string()),
    estimatedReadTime: z.number(),                    // minutes
    draft: z.boolean().default(false),
    language: z.literal('en-US').default('en-US'),
    schemaType: z.literal('Article').default('Article'),
    author: z.string().default('GHS Labels Editorial'),
    relatedPages: z.array(z.string()).optional(),
    crossDomainLinks: z.array(z.string()).optional(),
  }),
});

// ─── Exports ─────────────────────────────────────────────────────────────────
// Keys here MUST match the `collection` field in src/lib/hubs.ts HUBS array.
// If you rename a key, update hubs.ts in the same commit.

export const collections = {
  suppliers,
  comparisons,
  materials,
  kits,
  industries,
  services,
  guides,
};
