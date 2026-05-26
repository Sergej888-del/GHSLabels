# ghslabels.com — Design System

**Direction:** Phthalo Night
**Version:** 2.0 (replaces v1 "H-eco")
**Last updated:** 23 May 2026
**Status:** Live on production (commit `f77fc8a`)

This document describes the design language currently deployed on ghslabels.com. It supersedes `ghslabels-design-system.md v1` (which described Direction "H-eco" — a light-foundation palette never deployed). For routing, content collections, and SEO architecture, see the companion document `ghslabels-architecture.md`.

---

## 1. Direction: Phthalo Night

### Concept

ghslabels.com is the third sibling in the GHS Ecosystem. It is the commercial / procurement hub — the destination where EHS professionals source certified labels for chemical compliance.

Where the two siblings own reference and design tooling, this site owns commerce and decision-making. EHS professionals spend hours per day in procurement tools. The aesthetic must support extended attention, not punctuate it.

The direction is **committed dark with light as precious accent**. Foundation is `zinc-950`. Light, color, and motion are reserved — used only where they carry meaning.

### The name

**Phthalocyanine Blue** (CI Pigment Blue 15) is the synthetic pigment used in essentially all CLP-compliant, BS5609-certified, ADR-rated chemical-resistant label inks. The labels that pass through ghslabels.com are physically printed with this molecule.

The brand color is the color of the product. This is not decorative — it is the same heritage as Prussian Blue (`#003049`, the first synthetic pigment, discovered 1704), foundational to industrial chemistry.

### Sibling spectrum

Each of the three sites owns a position on the blue spectrum, with ghslabels at the deepest pigment end.

| Site | Hex | Role |
|---|---|---|
| ghssymbols.com | `#1e3a8a` (navy) | Reference / hazard database. Authority blue. |
| ghspictograms.com | `~#2a4fa5` (mid-navy) | Design tools / pictogram library. Creative blue. |
| **ghslabels.com** | `#0c4a6e` (sky-900) light context, `#38bdf8` (sky-400) dark context | Procurement / commerce. Pigment blue. |

The Spectrum Mark gradient (see §4) passes through `#3b82f6` (bright navy) at its midpoint — bridging through the sibling-family color while extending beyond it on both sides.

---

## 2. Page-genre visual intensity

The single most important principle. Visual intensity is calibrated to page genre, not applied uniformly.

> **"Different page types deserve different visual energy. Reading documents whisper. Marketing pages shout."** — Wathan & Schoger, *Refactoring UI*, ch. on hierarchy

### Genre × intensity matrix

| Genre | Intensity | Examples | Allowed |
|---|---|---|---|
| **Reading** | Quiet | Legal pages (`/privacy/`, `/terms/`), individual articles, single supplier profiles | Minimal accent. 1–2 callouts per page max. No featured cards. Typography is the hero. |
| **Hub** | Medium | `/suppliers/`, `/compare/`, `/materials/`, `/industries/` | Moderate accent. Brass/Phthalo chips, 1 featured card per hub, Spectrum Mark moments between sections. |
| **Commerce** | Expressive | Home page, comparison detail pages, `/quote/`, CTA-heavy pages | Full vocabulary. Multiple Spectrum Mark moments, brass featured cards, phthalo halos on hover, radial gradient backdrops, glowing CTAs. |

### Practical implication

Legal pages on production today (P1-A) intentionally use the minimum vocabulary — one Phthalo chip row, one or two callouts, foundation typography. This is **correct**. A maximalist legal page would read as "templated marketing" rather than "this is a serious document."

Commerce pages should feel meaningfully different — same design language, different volume.

---

## 3. Color system

### Foundation: zinc

The dark canvas. Multiple tonal levels create elevation hierarchy without drop shadows (Material Design 3 principle).

| Token | Hex | Surface role |
|---|---|---|
| `zinc-950` | `#09090b` | Page background, footer, body default |
| `zinc-900` | `#18181b` | Elevated sections (page headers, content sections that need separation) |
| `zinc-800` | `#27272a` | Card hover state, mid-level elevation |
| `zinc-700` | `#3f3f46` | Borders, dividers |
| `zinc-600` | `#52525b` | Subtle dividers |
| `zinc-500` | `#71717a` | Disabled / minor text |
| `zinc-400` | `#a1a1aa` | Muted body text |
| `zinc-300` | `#d4d4d8` | Secondary body text |
| `zinc-100` | `#f4f4f5` | Strong text (rare) |
| `zinc-50` | `#fafafa` | Primary text on dark surfaces |

**Never used:** pure black `#000000`, pure white `#ffffff`. Pure black surfaces are forbidden (MD3 dark guidance). Pure white text is only used in marketing hero H1 with deliberate intent.

### Semantic accent palette

Each color owns exactly one semantic role. Never used cross-purpose.

#### Phthalo (sky family) — brand identity

| Token | Hex | Dark-context use |
|---|---|---|
| `sky-200` | `#bae6fd` | Link hover, emphasized accent text |
| `sky-300` | `#7dd3fc` | Link default, footer accent links |
| `sky-400` | `#38bdf8` | Primary brand accent (eyebrows, dot in logo, primary highlight) |
| `sky-500` | `#0ea5e9` | Mid emphasis, Spectrum Mark right edge |
| `sky-700` | `#0369a1` | Callout left border |
| `sky-900` | `#0c4a6e` | Subtle brand accent backgrounds |
| `sky-950` | `#082f49` | Tinted accent backgrounds (callouts, hero radials) |

**Used for:** brand identity, links, regulatory references (CLP, ADR, IMDG, OSHA HCS), family signaling, "Recommended" markers, Spectrum Mark, focus rings.

#### Brass (amber family) — premium / certified

| Token | Hex | Dark-context use |
|---|---|---|
| `amber-200` | `#fde68a` | Text on brass-tinted bg |
| `amber-300` | `#fcd34d` | Primary brass accent (eyebrows on premium content, ecosystem "You are on" marker) |
| `amber-400` | `#fbbf24` | Mid brass emphasis |
| `amber-700` | `#b45309` | Callout left border |
| `amber-900` | `#78350f` | Featured card border |
| `amber-950` | `#451a03` | Subtle brass-tinted backgrounds (Editor's notes, premium tier backgrounds) |

**Used for:** sertification badges (BS5609, ISO 9001, FDA), "Featured" supplier markers, editor's notes, premium tier highlights, in-flow text highlights (rare).

#### Orange — commerce CTA only

| Token | Hex | Use |
|---|---|---|
| `orange-500` | `#f97316` | Primary CTA button background |
| `orange-400` | `#fb923c` | Primary CTA hover (lightens on dark) |
| `orange-600` | `#ea580c` | Primary CTA active state |

**Used for:** only primary commerce action buttons ("Request a quote", "Contact us", "Submit"). Never for highlights, badges, accents, or text.

#### Red — hazard only

| Token | Hex | Use |
|---|---|---|
| `red-300` | `#fca5a5` | Hazard chip text |
| `red-400` | `#f87171` | Validation error text |
| `red-600` | `#dc2626` | Critical hazard indicators |
| `red-950` | `#450a0a` | Hazard chip background |

**Used for:** substance hazards (CMR, acute toxicity), form validation errors, critical warnings. Never for visual interest, category coding, or decoration.

#### Navy (blue family) — ecosystem only

| Token | Hex | Use |
|---|---|---|
| `blue-800` | `#1e3a8a` | Ecosystem banner background (matches siblings exactly) |
| `blue-300` | `#93c5fd` | Ecosystem banner links |
| `blue-500` | `#3b82f6` | Spectrum Mark gradient midpoint |

**Used for:** only the ecosystem banner (which appears identically on all three siblings) and the Spectrum Mark midpoint. Not used elsewhere on ghslabels — Phthalo is the site's own blue.

### Semantic boundaries — what each color does NOT do

| If you see | It must NEVER also be used for |
|---|---|
| Phthalo (sky) | CTAs · premium markers · hazards |
| Brass (amber) | CTAs · regular links · hazards |
| Orange | Highlights · badges · accent borders · text |
| Red | Visual interest · category coding · decoration |
| Navy (blue-800) | Site content (only ecosystem banner) |

This creates a deterministic visual language: a user sees brass → "premium / certified"; sees orange → "this is an action"; sees phthalo → "brand / regulatory reference." No color is decorative.

---

## 4. The Spectrum Mark

The signature visual element of ghslabels.com.

### Specification

A horizontal gradient strip applied at exactly two locations in `Layout.astro`:
1. Immediately below `<EcosystemBanner />` (top of page)
2. Immediately above `<footer>` (bottom of content)

Implementation in `src/styles/global.css`:

```css
:root {
  --spectrum-mark: linear-gradient(
    90deg,
    var(--color-blue-800)  0%,    /* #1e3a8a — family navy */
    var(--color-blue-500)  50%,   /* #3b82f6 — bright bridge */
    var(--color-sky-500)   100%   /* #0ea5e9 — phthalo industrial */
  );
}

.spectrum-mark {
  height: 3px;
  background: var(--spectrum-mark);
  box-shadow:
    0 0 12px rgba(56, 189, 248, 0.45),   /* inner glow */
    0 0 24px rgba(56, 189, 248, 0.18);   /* outer halo */
}
```

### Semantics

The Spectrum Mark is not decoration. It encodes the ghslabels position in the ecosystem:

- **Left edge** `#1e3a8a` — exact sibling navy. The family kinship.
- **Midpoint** `#3b82f6` — bright bridge, the connection point.
- **Right edge** `#0ea5e9` — ghslabels' own Phthalo. What this site adds beyond the family.

The gradient literally passes through the family color and extends past it. This is the visual statement of being a sibling-and-also-something-more.

### Usage rules

| Allowed | Required |
|---|---|
| Height 3px (default) | Must use `--spectrum-mark` gradient (no other gradient) |
| 2px (rare, subtle) | Must include dual-layer box-shadow glow on dark surfaces |
| 8px (rare, hero moments) | Must be horizontal (90deg) — never vertical or diagonal |
| Up to 4–5 instances per page (commerce pages only) | Never on light surfaces (the glow only works on dark) |

### Variants for future use

On commerce pages (P1-B home, comparison hubs, supplier hubs), the Spectrum Mark appears at additional section transitions — between hero and pillars, between pillars and featured comparison, before final CTA strip. Each is a "page chapter" boundary.

Currently the deployed version uses exactly two instances per page. This is correct for reading-genre pages.

---

## 5. Tonal surface elevation

Depth is created by tonal variation in dark, not by drop shadows or borders alone.

### Surface stack (deepest to highest)

| Tier | Token | Hex | Used for |
|---|---|---|---|
| 0 (deepest) | `zinc-950` | `#09090b` | Page background, footer, body |
| 1 (elevated section) | `zinc-900` | `#18181b` | Page headers, content sections that need separation |
| 2 (card surface) | between `zinc-900` and `zinc-800` | `#1f1f22` *(custom: --surface-card)* | Default card background |
| 3 (card hover) | `zinc-800` | `#27272a` | Card hover state |
| 4 (rare) | `zinc-700` | `#3f3f46` | Borders, occasional separator surfaces |

### How sections separate without harshness

The contrast between adjacent tiers is intentionally low (~1.1:1). The separation reads as a soft tonal shift, not a cut. Borders (`border-zinc-800` or `border-zinc-700`) reinforce the edge subtly.

Result: the page reads as one continuous dark canvas with gentle tonal rhythm — never as multiple harsh sections stacked.

### Forbidden moves

- ❌ Mixing dark and light sections (e.g., `bg-white` after `bg-zinc-950` — this is the "torture jump" that broke previous iterations).
- ❌ Drop shadows on elevated surfaces (use tonal lift instead, MD3 principle).
- ❌ Pure black surfaces (`#000000`).

---

## 6. Typography

### Families

- **Display & body:** Inter Variable (self-hosted via `@fontsource-variable/inter`)
- **Mono:** JetBrains Mono Variable (self-hosted via `@fontsource-variable/jetbrains-mono`)
- **Fallbacks:** `system-ui, -apple-system, sans-serif` for sans; `ui-monospace, monospace` for mono.

### Scale (commerce hero downward)

| Element | Size | Weight | Tracking | Line-height |
|---|---|---|---|---|
| Commerce hero H1 | 84px → 48px mobile | 800 | -0.04em | 0.98 |
| Page header H1 (legal/hub) | 48px → 36px mobile | 800 | -0.025em | 1.1 |
| Section H2 | 30–48px | 700 | -0.025em | 1.15 |
| Card / component title | 18–20px | 600 | -0.015em | 1.2 |
| Body | 17px | 400 | 0 | 1.6–1.7 |
| Body small | 15px | 400 | 0 | 1.55 |
| Eyebrow / mono label | 11–12px | 500–600 | +0.08em uppercase | 1.4 |

### Mono usage

JetBrains Mono is used for:
- Eyebrow labels above H1 ("LEGAL", "ABOUT")
- Footer column titles ("PROCUREMENT", "RESOURCES")
- Stat numbers in commerce pages
- Code snippets in body
- Date strings ("Last updated: 22 May 2026")
- Tags on supplier cards
- Spectrum Mark CSS values in docs

Mono signals **technical precision** — used to mark reference content, not for decoration.

### Color application to typography

- Headings → `zinc-50` default. `text-strong` (white) only on commerce hero H1.
- Body → `zinc-300` default. `zinc-400` for muted/secondary body.
- Eyebrow → `sky-400` for legal/about (cool semantic), `amber-300` for editor's/premium content (warm semantic).
- Inline strong → `zinc-100` (slightly brighter than body).
- Links → `sky-400` default, `sky-300` hover, with `underline-offset-2`.

---

## 7. Components

Three reusable components are deployed and documented. All live in `src/components/`.

### 7.1 `Callout.astro`

Inline notice block, two variants.

```astro
<Callout variant="phthalo" title="Cross-border data transfers">
  Transfers outside the EEA are protected by SCCs...
</Callout>

<Callout variant="brass" title="Editor's commitment">
  Commission never overrides accuracy.
</Callout>
```

**Phthalo variant** (`sky-700` left border, `sky-950/30` bg, `sky-300` title) — used for regulatory notes, supervisory authority info, technical clarifications.

**Brass variant** (`amber-700` left border, `amber-950/30` bg, `amber-300` title) — used for editor's notes, premium recommendations, editorial commitments.

### 7.2 `Chip.astro`

Inline status / property badge, four variants, optional dot indicator.

```astro
<Chip variant="phthalo" dot>GDPR compliant</Chip>
<Chip variant="brass">BS5609 certified</Chip>
<Chip variant="neutral">Polypropylene</Chip>
<Chip variant="hazard">CMR substance</Chip>
```

| Variant | Bg | Text | Border |
|---|---|---|---|
| phthalo | `sky-950/60` | `sky-300` | `sky-900` |
| brass | `amber-950/50` | `amber-300` | `amber-900` |
| neutral | `zinc-800/80` | `zinc-300` | `zinc-700` |
| hazard | `red-950/50` | `red-300` | `red-900` |

The `dot` prop adds a colored 6×6px circle inside the chip — used for "active" or "primary" status indicators.

### 7.3 `SupplierCard.astro` — The signature component

Three tier variants with distinct visual treatments:

**Featured** (`marker="featured"`):
- Border: `amber-900`
- Background: `linear-gradient` from `amber-950/70` (top) → `zinc-900` (40%) → `zinc-900` (bottom)
- Marker badge: brass `amber-950/80` bg + `amber-300` text + `amber-900` border
- "View profile →" link in `amber-300`

This is the visual moment Sergej identified as the signature effect — the warm brass gradient fade combined with brass border creates the "premium / featured" reading without any drop shadow.

**Recommended** (`marker="recommended"`):
- Border: `sky-800`
- Background: solid `zinc-900`
- Marker badge: phthalo `sky-950/80` bg + `sky-300` text + `sky-900` border
- "View profile →" link in `sky-400`

**Neutral** (no marker):
- Border: `zinc-800`
- Background: solid `zinc-900`
- No marker badge

All three variants share: hover state lightens the border, smooth 200ms transition, tag row above name, h3 title in `zinc-50`, tagline in `zinc-400`.

### Future component candidates (not yet built)

- `CTAButton.astro` — primary (orange) and secondary (outline) buttons
- `FeaturedComparisonCard.astro` — large editor's-pick card for home page
- `PillarCard.astro` — hub-pillar card with mono icon and halo hover
- `StatNumber.astro` — large sky-400 number with mono label for stat rows

---

## 8. Implementation tokens (CSS variables reference)

Defined in `src/styles/global.css`. Single source of truth.

```css
@theme {
  /* Zinc — foundation */
  --color-zinc-50:  #fafafa;
  --color-zinc-100: #f4f4f5;
  /* ... 200, 300, 400, 500, 600, 700, 800, 900 */
  --color-zinc-950: #09090b;

  /* Navy — ecosystem family (matches siblings) */
  --color-blue-300: #93c5fd;
  --color-blue-500: #3b82f6;
  --color-blue-800: #1e3a8a;

  /* Phthalo (sky) — brand identity */
  --color-sky-200: #bae6fd;
  --color-sky-300: #7dd3fc;
  --color-sky-400: #38bdf8;
  --color-sky-500: #0ea5e9;
  --color-sky-700: #0369a1;
  --color-sky-900: #0c4a6e;
  --color-sky-950: #082f49;

  /* Brass (amber) — premium / certified */
  --color-amber-200: #fde68a;
  --color-amber-300: #fcd34d;
  --color-amber-400: #fbbf24;
  --color-amber-700: #b45309;
  --color-amber-900: #78350f;
  --color-amber-950: #451a03;

  /* Orange — commerce CTA only */
  --color-orange-400: #fb923c;
  --color-orange-500: #f97316;
  --color-orange-600: #ea580c;

  /* Red — hazard only */
  --color-red-300: #fca5a5;
  --color-red-600: #dc2626;
  --color-red-950: #450a0a;
}

:root {
  --surface-page:       var(--color-zinc-950);
  --surface-section:    var(--color-zinc-900);
  --surface-card:       #1f1f22;
  --surface-card-hover: var(--color-zinc-800);
  --spectrum-mark:      linear-gradient(90deg, ...);
}
```

Tailwind v4 utility classes follow standard naming: `bg-zinc-950`, `text-sky-400`, `border-amber-900`, etc. No custom Tailwind plugin needed — all colors are defined via the `@theme` directive.

---

## 9. Migration notes — sibling sites future sync

When (and if) Sergej decides to refresh the visual language on ghssymbols.com and ghspictograms.com to match Phthalo Night, the following migration path applies. Not in scope for current work.

### Suggested sibling adaptations

Each sibling could adopt its own **Spectrum Mark variant**, all passing through `#1e3a8a` (sibling navy) at the midpoint, with sibling-specific edges:

```
ghssymbols.com Spectrum Mark:
  #1e3a8a → #1e3a8a → #4f46e5   (navy origin, indigo extension)

ghspictograms.com Spectrum Mark:
  #2563eb → #1e3a8a → #6366f1   (blue origin, violet extension)

ghslabels.com Spectrum Mark (current):
  #1e3a8a → #3b82f6 → #0ea5e9   (navy origin, phthalo extension)
```

This would make the family hierarchy **visually explicit** across the ecosystem — each site shares the family hue but extends it in its own direction. Optional, not required.

### What does NOT migrate

- The ecosystem banner stays exactly identical across all three sites (`bg-blue-800` `#1e3a8a` with `amber-300` "You are on X" highlight). This is the family identifier — must not diverge.
- Brass (amber family) is **specific to ghslabels** for premium/certified semantics. Siblings can adopt different secondary accents (e.g., ghssymbols could use a hazard-emphasis red for danger pictograms).

---

## 10. Design references

The canon that informs Phthalo Night. Each reference resolves a specific design decision documented in this spec.

| Reference | What it resolves |
|---|---|
| **Refactoring UI** (Wathan & Schoger, 2018) | Page-genre intensity principle (§2). Semantic color boundaries (§3). Restraint as luxury. |
| **Material Design 3 — Dark theme guidelines** (Google, 2021) | Tonal surface elevation (§5). Avoid pure black. Multiple dark tones for hierarchy. |
| **Linear's "Building Linear" essay** (Linear, 2022) | Committed-dark for long-attention tools. Light as precious. |
| **Albers — *Interaction of Color*** (Josef Albers, 1963) | Color reads relative to its ground. Same hex behaves differently on dark vs. light (§3, Phthalo dark-context vs. light-context tokens). |
| **Müller-Brockmann — *Grid Systems in Graphic Design*** (1981) | Restriction creates clarity. Single max-width container, consistent gutters, active whitespace. |
| **Butterick — *Practical Typography*** (Matthew Butterick, 2010) | Typography as the hero. Hierarchy through scale and weight, not decoration. Reading endurance over visual punch. |

---

## Status checklist

- ✅ `global.css` deployed (commit `f77fc8a`)
- ✅ `Layout.astro` deployed with dual Spectrum Mark + dark footer
- ✅ `Callout.astro`, `Chip.astro`, `SupplierCard.astro` components shipped
- ✅ 4 legal pages live on `https://ghslabels.com` in Phthalo Night language
- ⏸ `og-default.png` (1200×630) — pending manual design in Canva
- ⏸ Cloudflare Dashboard: Rules → Managed robots.txt **Disabled**, AI Audit **Disabled** for zone

---

*This document is the ground-truth design specification for ghslabels.com. It supersedes all prior design documentation. When implementing new pages, components, or visual treatments, this document is the source of authority. Discrepancies between this document and production code should be resolved in favor of this document, with a follow-up PR to bring production in sync.*
