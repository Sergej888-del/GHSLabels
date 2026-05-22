# ghslabels.com — Information Architecture & Sitemap Spec

**Site:** ghslabels.com
**Document version:** 1.0
**Created:** 2026-05-21
**Status:** ground-truth specification for ghslabels v2 build
**Stack:** Astro 6 + Tailwind CSS v4 + React 19 islands + MDX + Supabase + Cloudflare Pages

---

## 0. Why this document exists

This is the **single source of truth** for the architecture, content structure, routing, and SEO patterns of ghslabels.com v2 (the GHS Label Procurement Hub). Before publishing any page or modifying core infrastructure, this document is the authoritative reference.

It supersedes any conflicting information in `CLAUDE.md` or older session notes for ghslabels-specific topics.

Sister documents:
- `CLAUDE.md` — broader ecosystem context
- `compliance-hub-infrastructure.md` — analogous spec for ghspictograms Compliance Hub (reference for patterns)
- `GHS_Ecosystem_Master_Plan.md` — cross-site coordination

If something here contradicts those — **this document wins** for ghslabels.com topics.

---

## 1. Site positioning & strategic context

### 1.1 Role in the ecosystem

ghslabels.com is the **commercial endpoint** (bottom of funnel) for the GHS ecosystem:

| Site | Funnel position | Primary user intent |
|---|---|---|
| ghssymbols.com | Top — reference | "What is this substance, what hazards" |
| ghspictograms.com | Mid — tools + education | "How do I classify, label, comply" |
| ghspasport.com (future) | Platform — accounts, saved state | "I'm returning to my work" |
| **ghslabels.com** | **Bottom — purchase intent** | **"I'm ready to buy, order, print"** |

ghslabels.com does **NOT** host educational content about CLP/GHS/REACH theory — that lives on ghspictograms.com Compliance Hub. ghslabels covers the **physical and service layer** of labels: where to buy them, what materials to use, who prints them, which suppliers compare best for a given use case.

### 1.2 Monetization model

Three streams in priority order:

1. **Affiliate revenue** — Avery (in progress), Brady, DuraLabel, Seton, NiceLabel, EcoMundo (label-adjacent). Disclosure required on every affiliate-containing page.
2. **Lead generation** — RFQ form (Formspree → Brevo) for custom label printing services. Existing flow from v1 preserved.
3. **Own services** (future) — Label compliance audit, automated label generation via API access to Label Constructor (ghspictograms) + ghspasport account.

SDS Manager affiliate does **NOT** belong on ghslabels.com — intent mismatch. SDS Manager goes on ghspictograms Compliance Hub and (future) ghspasport platform.

### 1.3 Competitive differentiation

- **G2 / Capterra:** generic SaaS reviews — no physical label expertise, no GHS specifics
- **Avery / Brady:** vendor sites — biased toward their own products, no comparison content
- **ChemSafetyPro / Verisk:** educational — no commercial procurement focus
- **Our gap:** GHS-niche label procurement systematically covered with cross-referenced supplier data, material specifications, and use-case-driven recommendations. Backed by Supabase substance database (4,178 CLP Annex VI substances) for unique substance-to-label material recommendations.

---

## 2. Architecture overview

### 2.1 Tech stack decisions

| Component | Choice | Reason |
|---|---|---|
| **Framework** | Astro 6 | Static-first, matches ghspictograms/ghssymbols, zero learning curve |
| **Output mode** | `output: 'static'` | All pages prerenderable; no per-request dynamics needed |
| **Cloudflare adapter** | **NOT used** | Static-only sites + adapter = 300s prerenderer timeouts (lesson from ghssymbols/ghspictograms) |
| **API routes** | Cloudflare Pages Functions (`functions/` folder) | For RFQ submissions, lead capture, future supplier data fetches |
| **Styling** | Tailwind CSS v4 | Same as other sites |
| **Interactivity** | React 19 islands | Only where needed: filters, comparison tables, quote forms |
| **Content** | MDX via Content Collections | Same authoring pattern as ghspictograms |
| **Database** | Supabase (shared with other sites) | Vendor profiles, material specs, substance-to-label mappings |
| **Deploy** | Cloudflare Pages → `dist/` | Auto-deploy on git push |
| **Forms** | Formspree (existing `xdapqgjk`) + Brevo (new lead lists) | Reuse existing infrastructure |
| **Search** | Fuse.js client-side (Phase 2+) | Same pattern as SubstanceFilterBrowse |

### 2.2 Top-level structure

```
ghslabels.com/
├── /                              ← home (commercial hero + featured)
│
├── /suppliers/                    ← Pillar 1: Vendor directory
│   └── /suppliers/[slug]/         ← Supplier profile pages
│
├── /compare/                      ← Pillar 1b: Head-to-head comparisons
│   └── /compare/[slug]/           ← e.g. /compare/avery-vs-brady/
│
├── /materials/                    ← Pillar 2: Materials & durability
│   └── /materials/[slug]/         ← e.g. /materials/bs5609-marine-grade/
│
├── /kits/                         ← Pillar 3: Ready-made kits
│   └── /kits/[slug]/              ← e.g. /kits/laboratory-ghs-starter-kit/
│
├── /industries/                   ← Pillar 5: Vertical landing pages
│   └── /industries/[slug]/        ← lab, paints, agrochem, cosmetics, electronics
│
├── /services/                     ← Pillar 4: Own services
│   ├── /services/custom-printing/
│   ├── /services/label-audit/
│   └── /services/translation/
│
├── /guides/                       ← Buyer's guides hub
│   └── /guides/[slug]/            ← e.g. /guides/how-to-choose-label-printer/
│
├── /quote/                        ← Existing RFQ flow (preserved)
│
├── /about/
├── /contact/
├── /affiliate-disclosure/         ← FTC/EU compliance required
├── /privacy/
└── /terms/
```

Total Phase 5 endpoint: roughly 60-100 indexed pages across all pillars.

---

## 3. URL & file structure

### 3.1 Routes table

| URL pattern | Astro file | Generation | Phase |
|---|---|---|---|
| `/` | `src/pages/index.astro` | static | 0 |
| `/suppliers/` | `src/pages/suppliers/index.astro` | static | 1 |
| `/suppliers/[slug]/` | `src/pages/suppliers/[slug].astro` | static per MDX | 1 |
| `/compare/` | `src/pages/compare/index.astro` | static | 1 |
| `/compare/[slug]/` | `src/pages/compare/[slug].astro` | static per MDX | 1 |
| `/materials/` | `src/pages/materials/index.astro` | static | 2 |
| `/materials/[slug]/` | `src/pages/materials/[slug].astro` | static per MDX | 2 |
| `/kits/` | `src/pages/kits/index.astro` | static | 4 |
| `/kits/[slug]/` | `src/pages/kits/[slug].astro` | static per MDX | 4 |
| `/industries/` | `src/pages/industries/index.astro` | static | 3 |
| `/industries/[slug]/` | `src/pages/industries/[slug].astro` | static per MDX | 3 |
| `/services/` | `src/pages/services/index.astro` | static | 5 |
| `/services/[slug]/` | `src/pages/services/[slug].astro` | static per MDX | 5 |
| `/guides/` | `src/pages/guides/index.astro` | static | 2 |
| `/guides/[slug]/` | `src/pages/guides/[slug].astro` | static per MDX | 2 |
| `/quote/` | `src/pages/quote.astro` | static | 0 (preserve) |
| `/about/` | `src/pages/about.astro` | static | 0 |
| `/contact/` | `src/pages/contact.astro` | static | 0 |
| `/affiliate-disclosure/` | `src/pages/affiliate-disclosure.astro` | static | 0 (BLOCKER for affiliate launch) |
| `/privacy/` | `src/pages/privacy.astro` | static | 0 |
| `/terms/` | `src/pages/terms.astro` | static | 0 |
| `/sitemap.xml` | `src/pages/sitemap.xml.ts` | static | 0 |
| `/robots.txt` | `public/robots.txt` | static file | 0 |

All routes use `trailingSlash: 'always'` (consistent with rest of ecosystem).

### 3.2 Folder structure

```
ghslabels/
├── astro.config.mjs               ← output: 'static', no adapter
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── robots.txt
│   ├── og-default.png             ← 1200x630 (do this from Phase 0, don't repeat ghspictograms mistake)
│   ├── favicon.svg
│   └── images/
│       ├── suppliers/             ← supplier logos (with permission)
│       ├── materials/             ← material photos
│       └── industries/
├── src/
│   ├── content.config.ts          ← Content Collections schema
│   ├── content/
│   │   ├── suppliers/
│   │   │   ├── avery.mdx
│   │   │   ├── brady.mdx
│   │   │   └── duralabel.mdx
│   │   ├── comparisons/
│   │   │   └── avery-vs-brady.mdx
│   │   ├── materials/
│   │   │   ├── bs5609-marine-grade.mdx
│   │   │   ├── chemical-resistant-pp.mdx
│   │   │   └── cryogenic-labels.mdx
│   │   ├── kits/
│   │   ├── industries/
│   │   │   ├── laboratory.mdx
│   │   │   ├── paint-coatings.mdx
│   │   │   ├── agrochemicals.mdx
│   │   │   ├── cosmetics.mdx
│   │   │   └── electronics.mdx
│   │   ├── services/
│   │   └── guides/
│   ├── components/
│   │   ├── EcosystemBanner.astro  ← cross-link to other 3 sites
│   │   ├── AffiliateDisclosure.astro  ← required on affiliate pages
│   │   ├── SupplierCard.astro
│   │   ├── ComparisonTable.astro
│   │   ├── MaterialSpecBlock.astro
│   │   ├── QuoteForm.tsx          ← React island for RFQ
│   │   └── CTABlock.astro
│   ├── layouts/
│   │   ├── Layout.astro           ← base layout with SEO meta + canonical
│   │   └── ArticleLayout.astro    ← for content pages with article-style typography
│   ├── lib/
│   │   ├── supabase.ts            ← shared Supabase client
│   │   ├── affiliateLinks.ts      ← centralized affiliate URL handling
│   │   └── jsonLd.ts              ← schema.org builders
│   ├── pages/                     ← (as routes table above)
│   └── styles/
│       └── global.css
└── functions/
    ├── api/
    │   ├── quote.ts               ← RFQ submission handler
    │   └── leads.ts               ← Brevo lead capture
    └── _routes.json               ← Cloudflare Pages routing
```

### 3.3 File naming rules

- All slugs: kebab-case, lowercase, no underscores, no spaces, no accents
- MDX filename = slug = URL segment
- Vendor slugs: brand name only, no suffix (`avery.mdx` not `avery-labels.mdx`)
- Comparison slugs: `<vendor-a>-vs-<vendor-b>` alphabetical
- Material slugs: descriptive feature (`bs5609-marine-grade`, not `material-3`)

---

## 4. Content Collections schema

Defined in `src/content.config.ts`. **Verify schema BEFORE writing any new MDX** — lesson learned from ghspictograms where missing `category` field caused silent build failures.

### 4.1 Collection definitions

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
    servesRegions: z.array(z.string()),                  // ['US', 'EU', 'UK', 'global']
    productCategories: z.array(z.string()),              // ['blank-labels', 'pre-printed', 'printers']
    pricingModel: z.enum(['retail', 'enterprise', 'quote', 'mixed']),
    ghsSpecialist: z.boolean(),                          // true if has dedicated GHS line
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    bestFor: z.array(z.string()),                        // use cases
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    schemaType: z.literal('Organization').default('Organization'),
    relatedSuppliers: z.array(z.string()).optional(),    // slugs
    relatedComparisons: z.array(z.string()).optional(),
  }),
});

const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/comparisons' }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(155),
    slug: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    vendorsCompared: z.array(z.string()).min(2),         // slugs of suppliers
    primaryKeyword: z.string(),
    keywords: z.array(z.string()),
    verdict: z.string(),                                 // one-line summary
    bestForVendorA: z.array(z.string()),
    bestForVendorB: z.array(z.string()),
    draft: z.boolean().default(false),
    language: z.literal('en-US').default('en-US'),
    schemaType: z.literal('Article').default('Article'),
    author: z.string().default('GHS Labels Editorial'),
    relatedPages: z.array(z.string()).optional(),
  }),
});

const materials = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/materials' }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(155),
    slug: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    materialType: z.enum(['paper', 'polypropylene', 'polyester', 'vinyl', 'specialty']),
    durability: z.array(z.string()),                     // ['BS5609', 'IMDG', 'UV-resistant']
    chemicalResistance: z.array(z.string()).optional(),  // substance families
    temperatureRange: z.string().optional(),             // '-40°C to +80°C'
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
    supplier: z.string().optional(),                     // slug if single supplier
    priceRange: z.string().optional(),                   // '$$', '$$$', 'quote'
    affiliateUrl: z.string().url().optional(),
    keywords: z.array(z.string()),
    draft: z.boolean().default(false),
    language: z.literal('en-US').default('en-US'),
    schemaType: z.literal('Product').default('Product'),
    relatedPages: z.array(z.string()).optional(),
  }),
});

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
    relevantRegulations: z.array(z.string()),            // ['CLP', 'OSHA HCS', 'REACH']
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

const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(155),
    slug: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    guideType: z.enum(['buyer-guide', 'how-to', 'comparison-methodology', 'decision-tree']),
    primaryKeyword: z.string(),
    keywords: z.array(z.string()),
    estimatedReadTime: z.number(),                        // minutes
    draft: z.boolean().default(false),
    language: z.literal('en-US').default('en-US'),
    schemaType: z.literal('Article').default('Article'),
    author: z.string().default('GHS Labels Editorial'),
    relatedPages: z.array(z.string()).optional(),
    crossDomainLinks: z.array(z.string()).optional(),
  }),
});

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

export const collections = { suppliers, comparisons, materials, kits, industries, guides, services };
```

### 4.2 Required frontmatter — supplier example

```yaml
---
name: "Avery"
slug: "avery"
logo: "/images/suppliers/avery.svg"
websiteUrl: "https://www.avery.com"
affiliateUrl: "https://www.avery.com?aff=ghslabels"   # populated after Avery approves
affiliateProgram: "pending"                           # 'active' once approved
tagline: "Largest DIY label brand with extensive GHS template library"
description: "Avery offers a broad catalog of blank labels..."
foundedYear: 1935
headquarters: "Brea, California, USA"
servesRegions: ["US", "EU", "UK", "global"]
productCategories: ["blank-labels", "templates", "software"]
pricingModel: "retail"
ghsSpecialist: false                                  # GHS is one product line, not main focus
strengths: ["Free templates", "Wide retail availability", "Strong template ecosystem"]
weaknesses: ["Not chemical-resistant by default", "Limited BS5609 options"]
bestFor: ["SMEs starting out", "DIY label printing", "Office environments"]
pubDate: 2026-05-21
draft: false
relatedSuppliers: ["brady", "onlinelabels"]
relatedComparisons: ["avery-vs-brady"]
---
```

---

## 5. Page types — detailed spec

### 5.1 Home (`/`)

**File:** `src/pages/index.astro`

**Rendered sections:**
1. Hero — headline ("Find the right GHS labels for your industry"), subhead (value prop), primary CTA (browse comparisons / request quote)
2. Trust strip — featured supplier logos + "Used by EHS pros at..." (Phase 2+)
3. Featured pillars — 4 cards linking to `/compare/`, `/materials/`, `/industries/`, `/guides/`
4. Featured comparison — most popular comparison (manually curated)
5. Featured industries — 3 industry cards
6. Quote CTA strip
7. Footer (with affiliate disclosure micro-link)

**JSON-LD:** `Organization` + `WebSite` (with `SearchAction` if Phase 2 search enabled)

**SEO:**
- Title: `GHS Labels — Industrial Chemical Labels, Suppliers & Materials`
- Meta: `Compare GHS label suppliers, materials, and printing services. Independent procurement guides for EHS professionals.`

### 5.2 Supplier directory (`/suppliers/`)

**File:** `src/pages/suppliers/index.astro`

**Rendered sections:**
1. Hero with category filters (region, product type, GHS specialist Yes/No)
2. Supplier grid — `SupplierCard` per supplier (logo, tagline, regions, strengths, "View profile" CTA)
3. Filter bar — React island (Phase 2)
4. "Don't see your supplier?" — quote CTA
5. Affiliate disclosure block

**JSON-LD:** `CollectionPage` with `mainEntity` = `ItemList` of suppliers

**Data:** `await getCollection('suppliers', ({ data }) => !data.draft)`

### 5.3 Supplier profile (`/suppliers/[slug]/`)

**File:** `src/pages/suppliers/[slug].astro`

**Rendered sections:**
1. Header — logo + name + tagline + region badges + GHS specialist badge
2. Quick facts table — founded, HQ, regions, pricing model, product categories
3. `<Content />` — MDX body (history, product lineup, GHS-specific offerings, materials available)
4. Strengths / Weaknesses block
5. Best for (use cases) block
6. Comparison links — "Avery vs Brady", "Avery vs OnlineLabels" (auto-generated from `relatedComparisons`)
7. CTA — "Visit Avery" (affiliate link with `rel="sponsored nofollow"`) + "Request a quote from us" secondary
8. Related suppliers (3 cards from `relatedSuppliers`)
9. Affiliate disclosure inline if `affiliateProgram === 'active'`

**JSON-LD:** `Organization` (with brand, address, sameAs) + `BreadcrumbList`

**Critical:** all outbound affiliate links use `<a href="..." rel="sponsored nofollow" target="_blank">` per FTC + Google guidelines.

### 5.4 Comparison hub (`/compare/`)

**File:** `src/pages/compare/index.astro`

**Sections:**
1. Hero — "Side-by-side comparisons of GHS label suppliers"
2. Comparison grid — card per comparison (vendor A logo vs vendor B logo + verdict snippet + "Read full comparison")
3. Categorized comparisons (by region, by use case)

**JSON-LD:** `CollectionPage`

### 5.5 Comparison page (`/compare/[slug]/`)

**File:** `src/pages/compare/[slug].astro`

**Sections:**
1. Title — "Avery vs Brady: Which Is Better for GHS Labels?"
2. Verdict box — one-paragraph summary at top
3. Quick comparison table (`ComparisonTable` component) — 12-15 criteria rows
4. Side-by-side detailed sections per criterion (pricing, materials, GHS templates, customer support, durability, ecosystem, certifications)
5. "Best for Vendor A" / "Best for Vendor B" use case lists
6. Verdict reprise + dual CTA (both vendors as affiliate links)
7. Related comparisons + alternatives
8. Affiliate disclosure inline (mandatory — this page IS the affiliate vehicle)

**JSON-LD:** `Article` + `BreadcrumbList` (`Home > Compare > [comparison]`)

### 5.6 Materials guide (`/materials/[slug]/`)

**Sections:**
1. Header with material category badge
2. Quick spec table — material type, durability standards, temperature range, typical applications
3. `<Content />` — MDX body
4. Chemical compatibility section — pulls from Supabase substance database where possible: "This material is suitable for storing: [list of substance families from your DB]"
5. Recommended suppliers (cards from `recommendedSuppliers`)
6. Cross-link to `/industries/[matching]/`
7. CTA — "Get a quote for custom labels with this material"

**JSON-LD:** `Article` + `BreadcrumbList`

### 5.7 Industry vertical (`/industries/[slug]/`)

**Sections:**
1. Header with industry badge
2. Hero stats — "X regulated substances in this industry per CLP Annex VI" (pulled from Supabase live count by industry mapping)
3. `<Content />` — MDX body covering:
   - Typical chemicals & containers
   - Required label materials
   - Relevant regulations (cross-link to ghspictograms Compliance Hub pillars)
   - Common pitfalls
4. Recommended suppliers (cards)
5. Recommended materials (cards)
6. Cross-domain CTA: "See substances regulated for this industry on ghssymbols.com" + "Design labels on ghspictograms.com Label Constructor"
7. Quote CTA

**JSON-LD:** `Article` + `BreadcrumbList`

### 5.8 Quote page (`/quote/`)

**Existing v1 RFQ flow — preserve.**

Improvements for v2:
- Add structured fields: industry, container type, quantity range, required certifications (BS5609 / IMDG / FDA), language requirements
- Brevo segmentation by lead type (DIY-curious vs enterprise vs specialty)
- Conditional routing: if "DIY budget" → suggest Avery affiliate, if "enterprise BS5609" → custom RFQ to your service

### 5.9 Affiliate disclosure page (`/affiliate-disclosure/`)

**MUST EXIST BEFORE any affiliate link goes live.** This is FTC and EU CAP Code requirement.

Boilerplate template provided in `Appendix A`. Linked from:
- Footer (every page)
- Inline on every page containing affiliate links (via `AffiliateDisclosure.astro` component)
- Above-the-fold for comparison pages (visible without scrolling)

---

## 6. SEO & JSON-LD requirements

### 6.1 Per-page-type schema matrix

| Page type | BreadcrumbList | Article | Organization | Product | Service | CollectionPage |
|---|---|---|---|---|---|---|
| Home | optional | ❌ | ✅ | ❌ | ❌ | ❌ |
| `/suppliers/` | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| `/suppliers/[slug]/` | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| `/compare/` | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| `/compare/[slug]/` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `/materials/[slug]/` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `/kits/[slug]/` | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| `/industries/[slug]/` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `/services/[slug]/` | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| `/guides/[slug]/` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |

### 6.2 Canonical & trailing slash

- `trailingSlash: 'always'` in `astro.config.mjs`
- Every internal link must end with `/` (lesson learned from ghspictograms)
- Canonical URL auto-emitted by `Layout.astro` based on current path

### 6.3 OpenGraph

- `/public/og-default.png` (1200×630) — create BEFORE first deploy (don't repeat the ghspictograms mistake of doing this later)
- Per-page OG images optional in Phase 1+

### 6.4 robots.txt + sitemap

- `public/robots.txt` — allow all, disallow `/api/`, `/functions/`, link to sitemap
- `src/pages/sitemap.xml.ts` — generate from all collections + static pages
- Cloudflare "Managed robots.txt" must be **disabled** in dashboard (lesson learned from ghspictograms — Cloudflare silently overrides custom robots.txt)

### 6.5 Keyword research targets (from CLAUDE.md backlog)

Verified affiliate-adjacent keywords with high CPC:

| Keyword | Volume | CPC | Target page |
|---|---|---|---|
| `sds authoring software` | TBD via Semrush | $40.58 | NOT on ghslabels (ghspictograms hub) |
| `sds authoring` | TBD | $47.31 | NOT on ghslabels |
| `sds authoring services` | TBD | $46.93 | NOT on ghslabels |
| `bs5609 labels` | TBD | verify | `/materials/bs5609-marine-grade/` |
| `chemical resistant labels` | TBD | verify | `/materials/chemical-resistant-pp/` |
| `ghs label printer` | TBD | verify | `/guides/how-to-choose-label-printer/` |
| `avery vs brady labels` | TBD | verify | `/compare/avery-vs-brady/` |
| `industrial labels [industry]` | TBD | verify | `/industries/[slug]/` |

**Action item before Phase 1:** Semrush + Ubersuggest research for label-specific commercial intent keywords. CPC validation per page.

---

## 7. Affiliate disclosure & FTC compliance

### 7.1 Legal context

- **US (FTC):** 16 CFR Part 255 — material connection must be disclosed clearly and conspicuously. "Clear" = unambiguous language. "Conspicuous" = same medium, near affiliate link, before consumer clicks.
- **UK (CAP Code):** Rule 2.4 — commercial intent must be obvious. ASA enforces.
- **EU (Unfair Commercial Practices Directive):** Article 7(2) — hidden commercial intent is misleading.

### 7.2 Disclosure component

`src/components/AffiliateDisclosure.astro` rendered on every page with `affiliateUrl` populated. Variants:

```astro
---
const { variant = 'inline' } = Astro.props;
---
{variant === 'top' && (
  <div class="bg-amber-50 border-l-4 border-amber-500 px-4 py-3 mb-6 text-sm">
    <strong>Affiliate disclosure:</strong> This page contains affiliate links.
    If you purchase through these links, we may earn a commission at no extra cost to you.
    <a href="/affiliate-disclosure/" class="underline">Learn more</a>.
  </div>
)}
{variant === 'inline' && (
  <p class="text-xs text-gray-500 italic mt-4">
    Disclosure: Links to suppliers marked with † are affiliate links.
    <a href="/affiliate-disclosure/" class="underline">Full disclosure</a>.
  </p>
)}
```

### 7.3 Rules of placement

- **Comparison pages:** `variant='top'` — above the fold, before any affiliate link
- **Supplier profiles:** `variant='top'` when `affiliateProgram === 'active'`
- **Industry / material pages with affiliate cards:** `variant='inline'` near each card
- **Footer:** persistent link to `/affiliate-disclosure/` on every page

### 7.4 Link attributes

All affiliate outbound links:

```html
<a href={affiliateUrl} rel="sponsored nofollow noopener" target="_blank">
  Visit Avery †
</a>
```

The `†` (or similar marker) before the link is the visible material connection indicator. Combine with `<sup>†</sup>` legend at bottom of section.

---

## 8. Internal linking strategy

### 8.1 Hub-and-spoke per pillar

Each pillar has:
- One **hub page** (`/suppliers/`, `/materials/`, etc.) linking down to all leaf pages
- Each leaf page links back up to hub + sideways to 2-3 related leaves

### 8.2 Cross-pillar

- Supplier profile → materials they offer (sideways to `/materials/[slug]/`)
- Material page → suppliers offering it (sideways to `/suppliers/[slug]/`)
- Industry page → relevant materials + suppliers (cross to both pillars)
- Comparison page → both supplier profiles + alternative comparisons

### 8.3 Cross-domain ecosystem

Each ghslabels page links **out** to:
- ghspictograms Label Constructor when relevant ("Design before you print")
- ghspictograms Compliance Hub when explaining regulatory context
- ghssymbols substance pages when discussing specific chemicals
- (future) ghspasport when account features become relevant

Each linked-from ghspictograms / ghssymbols page eventually links **back** to ghslabels for commercial intent ("Ready to order? Compare suppliers").

This bidirectional linking is the **funnel infrastructure**.

---

## 9. Tech setup specifics

### 9.1 `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ghslabels.com',
  output: 'static',                  // ← critical: NOT 'server'
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    mdx(),
    react(),
    sitemap()
  ],
  // ★ NO @astrojs/cloudflare adapter — would cause prerenderer timeouts on static site
});
```

### 9.2 Cloudflare Pages config

- Build command: `npm run build`
- Output directory: `dist` (NOT `dist/client` — that's for adapter mode)
- Environment variables required:
  - `PUBLIC_SUPABASE_URL`
  - `PUBLIC_SUPABASE_ANON_KEY`
  - `BREVO_API_KEY` (functions only, not public)
  - `FORMSPREE_FORM_ID=xdapqgjk` (preserve existing)
- "Managed robots.txt" → **Disable** in dashboard
- AI Audit → **Disable** (allow AI crawlers, lesson from ghspictograms)

### 9.3 Cache clearing protocol

After any rename in `src/content/*`:

```powershell
Remove-Item -Recurse -Force .astro, dist, node_modules/.vite, node_modules/.astro -ErrorAction SilentlyContinue
npm run build
```

(Both `.astro/` AND `node_modules/.astro/data-store.json` must be cleared — lesson learned from ghspictograms 21 May 2026.)

### 9.4 PowerShell quirks

- No `&&` — use `;` or one command per line
- Bracket paths need `-LiteralPath`: `Get-Content -LiteralPath "src/pages/suppliers/[slug].astro"`
- Clipboard paste works correctly (bug from earlier sessions does not reproduce)

### 9.5 Build time expectation

For Phase 0-1 (10-20 pages): ~5-8 seconds
For Phase 5 endpoint (60-100 pages): ~10-15 seconds
If build exceeds 30 seconds — something is wrong (likely accidental dynamic mode or unbounded getStaticPaths).

### 9.6 Defensive filters to apply

When iterating collections, always filter `!data.draft`. Optional drafts allow staging content without publishing.

---

## 10. Cross-domain ecosystem integration

### 10.1 EcosystemBanner component

Reuse pattern from ghspictograms — banner appears on home + key pillar pages cross-linking all four sites:

- Logo + name + one-line value prop per site
- Active site highlighted but not linked
- Three other sites are linked

### 10.2 Shared Supabase data

ghslabels reads from same Supabase project:
- `clp_substances` table — for industry pages (substance counts by industry)
- `vendors` table (new — to be created) — supplier metadata mirrored from MDX for runtime queries
- `leads` table — Brevo-synced lead capture

### 10.3 Future ghspasport integration points

Spec'd but NOT implemented in Phase 1-5:

- "Save this comparison" button — sends to ghspasport auth + saves to user account
- "Re-order from saved design" — pulls saved Label Constructor design from ghspasport, prefills RFQ
- "My saved suppliers" — bookmarked supplier list

These require ghspasport to exist first. Spec'd here so we don't paint ourselves into a corner.

---

## 11. Roadmap & phases

### Phase 0 — Foundation (~1 week)

**Goal:** Working scaffold with home, RFQ, legal pages, ecosystem banner.

- [ ] Astro project initialized with config above
- [ ] Tailwind v4 setup, color palette: teal `#0e7490`, amber `#f59e0b`, hero `#042f3d` (matches v1)
- [ ] `Layout.astro` with SEO meta + canonical + OG defaults
- [ ] Content Collections schema configured (all 7 collections)
- [ ] `/` home page with hero + 4 pillar placeholders + RFQ CTA
- [ ] `/quote/` — preserve existing v1 RFQ via Formspree
- [ ] `/about/`, `/contact/`
- [ ] `/affiliate-disclosure/`, `/privacy/`, `/terms/` (legal blockers for affiliate launch)
- [ ] `og-default.png` 1200×630 in `public/`
- [ ] `robots.txt`, `sitemap.xml.ts`
- [ ] EcosystemBanner component
- [ ] AffiliateDisclosure component
- [ ] Cloudflare Pages deploy verified
- [ ] First commit: `feat(ghslabels-v2): foundation scaffolding`

### Phase 1 — Suppliers + first comparison (~2 weeks)

**Trigger:** Avery affiliate approval received.

- [ ] `/suppliers/` hub
- [ ] First 5 supplier profiles: Avery, Brady, DuraLabel, OnlineLabels, Seton
- [ ] `/compare/` hub
- [ ] First 2 comparisons: `avery-vs-brady`, `avery-vs-onlinelabels`
- [ ] Supplier filter island (Fuse.js)
- [ ] GSC + sitemap submitted
- [ ] First affiliate link live (Avery)

### Phase 2 — Materials + buyer's guides (~2 weeks)

- [ ] `/materials/` hub + 4-6 material pages (BS5609, chemical-resistant PP, polyester, vinyl, cryogenic, paper)
- [ ] `/guides/` hub + 3-4 buyer's guides
- [ ] Keyword research validated for materials

### Phase 3 — Industry verticals (~2 weeks)

- [ ] `/industries/` hub + 5 industry pages
- [ ] Supabase live substance counts per industry
- [ ] Cross-domain links to ghssymbols substance pages

### Phase 4 — Kits + more comparisons (~2 weeks)

- [ ] `/kits/` hub + 4-6 kit pages
- [ ] 4-6 additional comparison pages
- [ ] Second-wave supplier profiles (5+ more)

### Phase 5 — Services + scale (~2 weeks)

- [ ] `/services/` hub + 3 own services
- [ ] Label compliance audit service launched
- [ ] Full sitemap of 60+ pages indexed

### Phase 6 (future, post-ghspasport) — Platform integration

- [ ] "Save" buttons cross-domain to ghspasport
- [ ] Re-order from saved designs flow
- [ ] Logged-in supplier bookmarking

---

## 12. Appendix

### Appendix A — Affiliate disclosure boilerplate (`/affiliate-disclosure/`)

```markdown
# Affiliate Disclosure

Last updated: [date]

GHS Labels (ghslabels.com) participates in affiliate programs with various
suppliers of labels, label printers, label materials, and chemical compliance
services. When you click on links to these suppliers from our pages and
subsequently make a purchase, we may earn a commission at no additional cost
to you.

## Affiliate programs we currently participate in

- Avery (label templates and supplies)
- [other suppliers as approved]

## How affiliate links are marked

Affiliate links on our site are marked with a dagger symbol (†) immediately
adjacent to the link. We also use `rel="sponsored nofollow"` HTML attributes
on all affiliate links to comply with Google's webmaster guidelines.

## Editorial independence

Our editorial team makes recommendations based on technical merit, supplier
reputation, and use-case fit — not on commission rates. We frequently
recommend suppliers and products for which we receive no commission, when
they are the right fit for the reader's needs.

We never write a comparison or supplier profile based on financial incentive.
Where a supplier has paid for a featured listing, that listing is clearly
marked as "Sponsored" and segregated from editorial content.

## Questions

If you have questions about our affiliate relationships or editorial process,
contact us at [contact email].

This disclosure complies with the United States Federal Trade Commission's
16 CFR Part 255 and the UK CAP Code Rule 2.4.
```

### Appendix B — Sample comparison page outline

H1: [Vendor A] vs [Vendor B]: Which Is Better for GHS Labels in [year]?

```
[Affiliate disclosure banner — top variant]
[Verdict box — one paragraph]
## Quick comparison
[ComparisonTable with 12-15 rows]
## Pricing
## Materials & durability
## GHS templates & compliance
## Customer support & resources
## Ecosystem & integrations
## Best for [Vendor A]
## Best for [Vendor B]
## Final verdict
[Dual CTA — both affiliate links with † markers]
## Related comparisons
## Sources & methodology
```

### Appendix C — Pre-launch checklist before first affiliate link goes live

- [ ] `/affiliate-disclosure/` page published
- [ ] `AffiliateDisclosure.astro` component on relevant page(s)
- [ ] All affiliate links use `rel="sponsored nofollow noopener" target="_blank"`
- [ ] Visible † markers next to affiliate-linked text
- [ ] Footer link to `/affiliate-disclosure/` on every page
- [ ] Privacy policy mentions affiliate cookie usage
- [ ] Terms of service mentions affiliate relationships
- [ ] First affiliate program signed contract reviewed by Sergej for any specific disclosure requirements (some programs require specific wording)

---

*End of ghslabels.com architecture spec. Updates to this document require commit to ghslabels repo `docs/architecture.md` AND Project Knowledge re-upload.*
