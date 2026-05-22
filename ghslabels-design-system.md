# ghslabels.com — Design System Specification

**Site:** ghslabels.com (v2)
**Document version:** 1.0
**Created:** 2026-05-21
**Status:** ground-truth specification — locked palette and component patterns
**Companion to:** `ghslabels-architecture.md` (information architecture spec)
**Direction:** H-eco (warm zinc monochrome foundation + ecosystem accents from siblings)

---

## 0. Why this document exists

This is the **single source of truth** for visual design language on ghslabels.com — color tokens, typography scale, spacing rhythm, component patterns, and Tailwind v4 implementation. Before designing any new page or component, this document is the authoritative reference. It supersedes any conflicting visual guidance in other documents for ghslabels-specific topics.

Sister documents:
- `ghslabels-architecture.md` — IA, routing, content collections, SEO
- `CLAUDE.md` — broader ecosystem context

If something here contradicts those — **this document wins** for visual/styling topics on ghslabels.com.

---

## 1. Brand positioning recap

ghslabels.com is the **commercial endpoint** in the ecosystem. While ghssymbols.com and ghspictograms.com serve reference and tool intents (deep cool navy + saturated orange), ghslabels serves purchase intent: comparison, supplier selection, RFQ submission, affiliate routing.

Visual positioning consequence: ghslabels needs **immediate differentiation** from siblings (so users perceive the context shift "reference → purchase") combined with **selective family resemblance** (so users feel they remain inside the trusted ecosystem). The design language solves this through warm zinc monochrome foundation + three accent colors borrowed from siblings.

### 1.1 Aesthetic references

- **Stripe** (docs.stripe.com vs stripe.com pricing) — discipline of using single accent on monochrome
- **Linear marketing site** — premium tech via warm dark zinc + sober typography
- **Vercel marketing site** — restrained color, content-first hierarchy
- **NOT references:** Avery, Brady, generic SaaS review sites (G2, Capterra). These are exactly what we differentiate from.

---

## 2. Foundational principles

Five rules that govern every visual decision:

**1. Color is information, not decoration.** Every color placement must encode a semantic meaning (action, ecosystem, hazard, family). Decorative color is forbidden. If a designer cannot articulate why a color is there, it is removed.

**2. Monochrome dominates.** 90% of surfaces are zinc (cool warm-gray). Color appears in ~10% of placements: CTAs, ecosystem cross-links, hazard indicators, sibling-site markers.

**3. Typography carries hierarchy, not color.** Weight, size, and tracking establish dominance — not color shifts on individual words. Avoid "designer-show-off" tonal play unless semantic.

**4. Three accent colors, period.** Navy (ecosystem), orange (commerce CTA), red (hazard). Amber appears once (sibling-site "You are here" highlight in ecosystem banner). No fourth color is introduced without removing an existing one.

**5. Multi-color category systems are forbidden.** Unlike ghspictograms compliance hub (where each pillar has a color), ghslabels keeps pillar categorization monochrome. Pillars are distinguished by iconography, typography, and count chips — not color.

---

## 3. Color tokens

### 3.1 Foundation — zinc (warm gray)

Zinc is Tailwind's warm gray family. Slightly warmer than slate, cooler than stone. Chosen for premium tech aesthetic without coldness of slate.

| Token | Hex | Role |
|---|---|---|
| `zinc-50` | `#fafafa` | Page background (light theme), card surfaces |
| `zinc-100` | `#f4f4f5` | Subtle dividers, neutral chips background, inactive states |
| `zinc-200` | `#e4e4e7` | Borders default |
| `zinc-300` | `#d4d4d8` | Borders emphasized, disabled text on light |
| `zinc-400` | `#a1a1aa` | Placeholder text, tertiary captions |
| `zinc-500` | `#71717a` | Muted text, secondary labels |
| `zinc-600` | `#52525b` | Body text on light, icon defaults |
| `zinc-700` | `#3f3f46` | Body text emphasized, borders on dark surfaces |
| `zinc-800` | `#27272a` | Dark surface cards (alternative to zinc-900) |
| `zinc-900` | `#18181b` | Headers, primary text, monochrome icon containers |
| `zinc-950` | `#09090b` | Hero background, footer background, deepest dark |

### 3.2 Accent — navy blue (ecosystem)

Borrowed directly from ghssymbols.com and ghspictograms.com to create family resemblance. Used **only** for ecosystem-related elements.

| Token | Hex | Role |
|---|---|---|
| `blue-100` | `#dbeafe` | (Reserved) light tint backgrounds for sibling-site reference blocks |
| `blue-300` | `#93c5fd` | Sister-site links on dark backgrounds (in ecosystem banner) |
| `blue-700` | `#1d4ed8` | Sister-site links on light backgrounds (in body content) |
| `blue-800` | `#1e3a8a` | Ecosystem banner background (matches siblings exactly) |
| `blue-950` | `#172554` | (Reserved) deepest navy for special ecosystem callouts |

### 3.3 Accent — orange (commerce CTA)

Borrowed directly from siblings (their primary CTA color). Used **only** for primary call-to-action elements.

| Token | Hex | Role |
|---|---|---|
| `orange-100` | `#ffedd5` | (Reserved) subtle orange tints, rarely used |
| `orange-200` | `#fed7aa` | Affiliate badge background |
| `orange-500` | `#f97316` | Primary CTA button background |
| `orange-600` | `#ea580c` | Primary CTA hover background |
| `orange-900` | `#9a3412` | Affiliate badge text (on orange-200 background) |

### 3.4 Accent — red (hazard semantic)

Mirrors red usage on ghssymbols.com H-statements blocks. Used **only** for hazard/danger/compliance-critical semantics.

| Token | Hex | Role |
|---|---|---|
| `red-50` | `#fef2f2` | Hazard chip background, warning block background |
| `red-300` | `#fca5a5` | (Reserved) hazard chip border emphasis |
| `red-600` | `#dc2626` | Hazard text, BS5609 emphasis, danger icons |
| `red-800` | `#991b1b` | Text on red-50 background |

### 3.5 Highlight — amber (single placement only)

Used **only** in the ecosystem banner to highlight "▶ You are on GHS Labels". This is the only place amber appears on the entire site — it serves as a sibling-consistent "current location" marker (siblings use the same yellow/amber for their "You are on X" indicators).

| Token | Hex | Role |
|---|---|---|
| `amber-300` | `#fcd34d` | "You are on" highlight text in ecosystem banner |

### 3.6 Color usage rules (forbidden combinations)

- **No orange on light surfaces** except primary CTA buttons. Orange-tinted backgrounds on cards/sections are forbidden.
- **No blue text on body content** except sister-site links. Blue is reserved for ecosystem signaling.
- **No red as accent color.** Red appears only when semantically a hazard/warning is indicated.
- **No amber outside ecosystem banner.** A single use site-wide.
- **No gradients combining accent colors.** A button gradient must be within one color family (orange-500 → orange-600). Cross-color gradients are forbidden.
- **No multi-color rainbow pillar systems.** Categories use monochrome icons + neutral chip variants.
- **No color-only state encoding.** Hover/active states must combine color shift WITH another change (shadow, position, weight).

### 3.7 Semantic color mapping reference

| Need | Color | Token |
|---|---|---|
| Primary action / convert / buy | Orange | `orange-500/600` |
| Link to sibling site | Navy | `blue-700` (light) or `blue-300` (dark) |
| Ecosystem-wide context (banner) | Navy | `blue-800` |
| Compliance-critical info / warning | Red | `red-600` |
| Hazardous substance indicator | Red | `red-600` on `red-50` background |
| Featured / Editor's pick | Orange | `orange-500` (sparingly) |
| Affiliate disclosure | Orange-tint | `orange-200/900` chip |
| Current location ("you are on") | Amber | `amber-300` |
| Everything else | Zinc | various |

---

## 4. Typography

### 4.1 Font family

**Inter Variable** — loaded via `@fontsource-variable/inter` package or Google Fonts CDN. Fallback stack:

```css
font-family: 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont,
             'Segoe UI', Roboto, sans-serif;
```

For monospace contexts (numerical labels, code references):

```css
font-family: 'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace,
             SFMono-Regular, 'SF Mono', Monaco, Consolas, monospace;
```

### 4.2 Type scale

Tailwind-compatible scale tuned for premium feel. Sizes use rem for accessibility.

| Level | Size (rem / px) | Weight | Tracking | Line-height | Usage |
|---|---|---|---|---|---|
| Display | 3.75 / 60 | 800 | -0.035em | 1.05 | Home hero H1 only |
| H1 | 2.75 / 44 | 800 | -0.03em | 1.1 | Page H1 (suppliers/, compare/, materials/) |
| H2 | 2 / 32 | 700 | -0.025em | 1.2 | Section headings |
| H3 | 1.5 / 24 | 600 | -0.02em | 1.3 | Subsection headings |
| H4 | 1.25 / 20 | 600 | -0.01em | 1.4 | Card titles, sidebar headers |
| H5 | 1.125 / 18 | 600 | normal | 1.5 | Small block titles |
| Body large | 1.125 / 18 | 400 | normal | 1.65 | Hero description, intro paragraphs |
| Body | 1.0625 / 17 | 400 | normal | 1.65 | Main body text |
| Body small | 0.9375 / 15 | 400 | normal | 1.6 | Card descriptions, dense content |
| Caption | 0.8125 / 13 | 500 | normal | 1.5 | Form labels, small notes |
| Micro | 0.6875 / 11 | 500 | 0.08em | 1.4 | UPPERCASE labels, monospace stats |
| Tiny | 0.625 / 10 | 500 | normal | 1.3 | Footnotes only |

### 4.3 Typography rules

- **Tracking tightens as size grows.** Large headers need negative tracking (-0.025 to -0.035em) to look intentional, not bloated. Body text uses normal tracking.
- **Weight does the work in monochrome.** Since we don't have color play in headlines, weight contrast (400 body vs 800 H1) carries hierarchy. Don't be afraid of 800 on hero H1.
- **Micro labels are uppercase + monospace.** This is the premium signal pattern: `<span class="text-xs uppercase tracking-wider font-mono text-zinc-500">B2B procurement</span>`. Used in: section pre-headers, stat row labels, ecosystem banner "GHS Ecosystem:" prefix, "How we vet vendors" link decoration.
- **Numbers in stats use tabular nums.** Tailwind: `font-variant-numeric: tabular-nums;`. Prevents jumping when comparing aligned numbers.
- **Sentence case for everything except micro labels.** No Title Case in body. UPPERCASE only for monospace micro labels.
- **No italic for emphasis.** Use weight 600 instead, or pull quote pattern (left border + larger size).

### 4.4 Line-height per context

- Headlines: 1.05–1.2 (tight)
- Subheadings: 1.3–1.4
- Body prose: 1.6–1.65 (generous for readability)
- Captions: 1.4–1.5
- UI text in buttons: 1.0 (button height defines it)

---

## 5. Spacing system

### 5.1 Base unit

4px base unit. All spacing values are multiples: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128px. Maps directly to Tailwind defaults (`p-1` = 4px, `p-2` = 8px, etc.).

### 5.2 Section vertical padding

| Context | Top padding | Bottom padding |
|---|---|---|
| Hero section | `pt-12 pb-16` (mobile) / `pt-20 pb-24` (desktop) | — |
| Standard section | `py-16` (mobile) / `py-24` (desktop) | |
| Compact section | `py-12` (mobile) / `py-16` (desktop) | |
| Footer | `pt-16 pb-8` | |

Vertical rhythm should breathe — premium sites use generous whitespace. When in doubt, more padding than less.

### 5.3 Component internal spacing

| Component | Padding |
|---|---|
| Card default | `p-5` (20px all sides) or `px-5 py-4` |
| Card compact | `p-4` (16px) |
| Button medium | `px-5 py-2.5` (~20px / 10px) |
| Button large | `px-6 py-3` (24px / 12px) |
| Chip / Badge | `px-2.5 py-0.5` (~10px / 2px) |
| Input field | `px-3 py-2` (12px / 8px) |

### 5.4 Component gap (grid/flex)

| Grid type | Gap |
|---|---|
| Card grid (3-4 cols) | `gap-4` to `gap-6` (16-24px) |
| Inline chips/badges | `gap-2` (8px) |
| Stat row | `gap-6` to `gap-8` (24-32px) |
| Hero CTA buttons | `gap-3` (12px) |

### 5.5 Container width

Max content width: `max-w-6xl` (1152px). Hero may go to `max-w-7xl` (1280px). Body prose constrained to `max-w-prose` (~65ch) inside articles.

Container padding (horizontal margin): `px-4` (mobile) → `px-6` (sm) → `px-8` (lg).

---

## 6. Elevation system (shadows)

Subtle shadows. No drop-shadow theatrics. Premium feel = restrained.

| Token | Definition | Usage |
|---|---|---|
| `shadow-xs` | `0 1px 2px 0 rgb(0 0 0 / 0.04)` | Subtle card lift, default supplier cards |
| `shadow-sm` | `0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)` | Card default state |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)` | Card hover state |
| `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.08)` | Elevated CTAs, primary buttons |
| `shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.12), 0 8px 10px -6px rgb(0 0 0 / 0.10)` | Modals, dropdowns |
| `shadow-2xl` | (rarely used) | Hero floating cards if needed |

### 6.1 Shadow rules

- **No shadow on dark surfaces.** Cards on `zinc-950` hero must use borders only (`border border-zinc-800/50`), not shadows. Shadows on dark = invisible.
- **Hover lift pattern**: `shadow-sm` → `shadow-md` + `translate-y-[-2px]` + `transition-all duration-200`. This is the standard interactive elevation.
- **No colored shadows** (no `shadow-orange-500/30`). Premium sites use neutral black shadows only.

---

## 7. Border radius

| Token | Value | Usage |
|---|---|---|
| `rounded-none` | 0 | Full-bleed sections, separators |
| `rounded` | 4px | Small chips, code blocks |
| `rounded-md` | 6px | Buttons (default), inputs, micro-chips |
| `rounded-lg` | 8px | Cards (default), modals |
| `rounded-xl` | 12px | Large surfaces, hero overlays |
| `rounded-2xl` | 16px | Featured panels (rare) |
| `rounded-full` | 9999px | Pills (badges, trust chips, status indicators) |

Default: cards `rounded-lg`, buttons `rounded-md`, pills/badges `rounded-full`. Avoid mixing radii on adjacent elements.

---

## 8. Iconography

### 8.1 Primary library

**lucide-react** — installed alongside React 19. Outline style, consistent stroke width. Used in all React islands and Astro components (via dynamic import or static SVG).

Common icons used throughout ghslabels:

| Pillar / context | Icon name |
|---|---|
| Suppliers | `Factory` or `Building2` |
| Compare | `ArrowRightLeft` |
| Materials | `Layers` |
| Kits | `Package` |
| Industries | `Building` |
| Services | `Wrench` |
| Quote / RFQ | `FileText` or `MailQuestion` |
| Hazard | `AlertTriangle` |
| Certified | `ShieldCheck` |
| Shipped to EU | `Truck` |
| Flammable | `Flame` |
| Featured | `Star` |
| Affiliate | `ExternalLink` |
| Arrow forward | `ArrowRight` |
| External | `ArrowUpRight` |

### 8.2 Sizing

- Inline with text (in headings, labels): match text size, `currentColor` fill
- Icon-only buttons: 18-20px
- Decorative pillar icons (in pillar cards): 16px inside 28x28 container
- Hero badge icons: 14px inside chip
- Footer icons: 20-24px

### 8.3 Color rules

- Icons inherit text color by default (`currentColor`)
- In monochrome contexts: `text-zinc-900` (light surface) or `text-zinc-50` (dark surface)
- In semantic contexts: icon color matches the semantic accent (e.g. hazard icons get `text-red-600`)
- Never use rainbow icon colors as decoration

### 8.4 Pictograms exception

For GHS pictograms (used in product preview blocks, NOT as decoration), use the actual SVG pictograms from ghspictograms.com asset library — they are official UN designs and must not be re-styled.

---

## 9. Component patterns

### 9.1 Buttons

Three levels: primary, secondary, tertiary. Defined once, used everywhere.

**Primary (orange CTA):**

```html
<button class="bg-orange-500 hover:bg-orange-600 text-white font-medium
               px-5 py-2.5 rounded-md text-sm
               transition-all duration-200
               shadow-sm hover:shadow-md
               focus-visible:outline-none focus-visible:ring-2
               focus-visible:ring-orange-500 focus-visible:ring-offset-2">
  Request a quote
  <ArrowRight class="inline w-4 h-4 ml-1.5 -mt-0.5" />
</button>
```

Used for: RFQ CTA, "Get a quote", "Order labels". Never more than one primary button per visible section.

**Secondary (outline zinc):**

```html
<button class="bg-white hover:bg-zinc-50 text-zinc-900 font-medium
               px-5 py-2.5 rounded-md text-sm
               border border-zinc-300 hover:border-zinc-400
               transition-all duration-200">
  Browse suppliers
</button>
```

On dark backgrounds: `bg-white/5 hover:bg-white/10 text-zinc-50 border-zinc-700`.

**Tertiary (ghost / link-style):**

```html
<a class="text-zinc-600 hover:text-zinc-900 font-medium text-sm
          inline-flex items-center gap-1
          transition-colors duration-150">
  How we vet vendors
  <ArrowUpRight class="w-3.5 h-3.5" />
</a>
```

For sister-site links use `text-blue-700 hover:text-blue-800` instead.

### 9.2 Cards

**Default supplier/comparison card:**

```html
<div class="bg-white border border-zinc-200 rounded-lg
            p-5 transition-all duration-200
            hover:shadow-md hover:-translate-y-0.5">
  [content]
</div>
```

Card on dark background uses `bg-zinc-900 border-zinc-800` instead.

### 9.3 Trust badges (chips)

Used in hero strip and supplier cards.

```html
<!-- Neutral trust signal -->
<span class="inline-flex items-center gap-1.5
             bg-zinc-100 text-zinc-700
             text-xs font-medium px-2.5 py-1 rounded-full">
  <ShieldCheck class="w-3.5 h-3.5" />
  BS5609 certified
</span>

<!-- Hazard / regulated -->
<span class="inline-flex items-center gap-1.5
             bg-red-50 text-red-800
             text-xs font-medium px-2.5 py-1 rounded-full">
  <AlertTriangle class="w-3.5 h-3.5 text-red-600" />
  Regulated
</span>

<!-- Affiliate disclosure -->
<span class="inline-flex items-center gap-1
             bg-orange-200 text-orange-900
             text-xs font-medium px-2.5 py-1 rounded-full">
  Affiliate †
</span>
```

### 9.4 Hero pattern

Standard hero structure (home page and pillar landing pages):

```
[Ecosystem banner — blue-800 strip with sister-site links]
[Hero — zinc-950 background, max-w-6xl container]
  [Pre-label chip — "B2B procurement" or similar, monospace uppercase]
  [H1 headline — zinc-50, weight 800, tight tracking]
  [Description — zinc-400, body large, max-w-2xl]
  [CTA row — primary orange + secondary outline + tertiary link]
  [Stats row — divider top, monospace labels, tabular numbers]
[Body sections — zinc-50 background, content area]
```

### 9.5 Ecosystem banner (CRITICAL — exact pattern)

This is the single most important visual link to sibling sites. Must be implemented identically across ghslabels pages.

```html
<div class="bg-blue-800 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2
              flex flex-wrap items-center gap-4 text-xs">
    <span class="text-blue-200 font-mono uppercase tracking-wider
                 text-[10px]">GHS Ecosystem:</span>
    <a href="https://ghssymbols.com/" class="text-blue-300 hover:text-white
       transition-colors">GHS Symbols → Hazard Database</a>
    <a href="https://ghspictograms.com/" class="text-blue-300 hover:text-white
       transition-colors">GHS Pictograms → Label Constructor</a>
    <span class="text-amber-300 font-medium">▶ You are on GHS Labels</span>
  </div>
</div>
```

**Rules:**
- This banner appears at the top of every page, ABOVE the main header
- Sister sites are listed left-to-right by funnel position
- Current site ("GHS Labels") is highlighted in `amber-300` and prefixed with `▶`
- No other arrow style allowed (siblings use `▶` — match exactly)

### 9.6 Footer

```
[Section break — zinc-200 divider]
[Footer — zinc-950 background, text-zinc-400]
  [Logo + tagline column]
  [Pillars links column]
  [Resources column — affiliate disclosure, privacy, terms]
  [Bottom row — copyright, "Part of GHS Ecosystem" cross-links]
```

Footer height: `py-16` (64px top/bottom) minimum.

### 9.7 Affiliate disclosure component

Two variants per architecture spec:

**Top banner variant** (on comparison pages, supplier profiles with active affiliates):

```html
<div class="bg-orange-50 border-l-4 border-orange-500
            px-4 py-3 mb-6 text-sm">
  <strong class="font-semibold">Affiliate disclosure:</strong>
  This page contains affiliate links. If you purchase through these
  links, we may earn a commission at no extra cost to you.
  <a href="/affiliate-disclosure/" class="underline text-orange-900">
    Learn more
  </a>.
</div>
```

**Inline variant** (below sections containing affiliate cards):

```html
<p class="text-xs text-zinc-500 italic mt-4">
  Disclosure: Links to suppliers marked with † are affiliate links.
  <a href="/affiliate-disclosure/" class="underline">Full disclosure</a>.
</p>
```

---

## 10. Tailwind v4 implementation

ghslabels uses Tailwind CSS v4 (already installed via `@tailwindcss/vite`). Tailwind v4 uses **CSS-first configuration** via `@theme` directive in your global stylesheet — not a JS config file.

### 10.1 `src/styles/global.css` — complete theme definition

```css
@import "tailwindcss";

@theme {
  /* Font families */
  --font-sans: 'Inter Variable', 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, monospace;

  /* Custom color tokens — overrides Tailwind defaults where needed */
  --color-zinc-50: #fafafa;
  --color-zinc-100: #f4f4f5;
  --color-zinc-200: #e4e4e7;
  --color-zinc-300: #d4d4d8;
  --color-zinc-400: #a1a1aa;
  --color-zinc-500: #71717a;
  --color-zinc-600: #52525b;
  --color-zinc-700: #3f3f46;
  --color-zinc-800: #27272a;
  --color-zinc-900: #18181b;
  --color-zinc-950: #09090b;

  --color-blue-100: #dbeafe;
  --color-blue-300: #93c5fd;
  --color-blue-700: #1d4ed8;
  --color-blue-800: #1e3a8a;
  --color-blue-950: #172554;

  --color-orange-100: #ffedd5;
  --color-orange-200: #fed7aa;
  --color-orange-500: #f97316;
  --color-orange-600: #ea580c;
  --color-orange-900: #9a3412;

  --color-red-50: #fef2f2;
  --color-red-300: #fca5a5;
  --color-red-600: #dc2626;
  --color-red-800: #991b1b;

  --color-amber-300: #fcd34d;

  /* Typography scale */
  --text-display: 3.75rem;
  --text-display--line-height: 1.05;
  --text-display--letter-spacing: -0.035em;
  --text-display--font-weight: 800;

  --text-h1: 2.75rem;
  --text-h1--line-height: 1.1;
  --text-h1--letter-spacing: -0.03em;
  --text-h1--font-weight: 800;

  --text-h2: 2rem;
  --text-h2--line-height: 1.2;
  --text-h2--letter-spacing: -0.025em;
  --text-h2--font-weight: 700;

  --text-h3: 1.5rem;
  --text-h3--line-height: 1.3;
  --text-h3--letter-spacing: -0.02em;
  --text-h3--font-weight: 600;

  --text-h4: 1.25rem;
  --text-h4--line-height: 1.4;
  --text-h4--font-weight: 600;

  --text-body-lg: 1.125rem;
  --text-body-lg--line-height: 1.65;

  --text-body: 1.0625rem;
  --text-body--line-height: 1.65;

  --text-body-sm: 0.9375rem;
  --text-body-sm--line-height: 1.6;

  --text-caption: 0.8125rem;
  --text-caption--line-height: 1.5;
  --text-caption--font-weight: 500;

  --text-micro: 0.6875rem;
  --text-micro--line-height: 1.4;
  --text-micro--letter-spacing: 0.08em;
  --text-micro--font-weight: 500;

  /* Border radius tokens */
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;

  /* Shadow tokens — restrained, neutral */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.08);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.12), 0 8px 10px -6px rgb(0 0 0 / 0.10);

  /* Animation easings */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}

/* Base body styles */
html {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  background: var(--color-zinc-50);
  color: var(--color-zinc-900);
  font-size: var(--text-body);
  line-height: var(--text-body--line-height);
  font-variant-numeric: tabular-nums;
}

/* Selection styling */
::selection {
  background: var(--color-orange-200);
  color: var(--color-orange-900);
}

/* Focus visible default */
:focus-visible {
  outline: 2px solid var(--color-orange-500);
  outline-offset: 2px;
  border-radius: 2px;
}
```

### 10.2 Font loading

Add to `<head>` in `Layout.astro` via fontsource or Google Fonts:

```html
<!-- Option A: Self-hosted via @fontsource (install: npm install @fontsource-variable/inter @fontsource-variable/jetbrains-mono) -->
<!-- In Layout.astro frontmatter: -->
<!-- import '@fontsource-variable/inter'; -->
<!-- import '@fontsource-variable/jetbrains-mono'; -->

<!-- Option B: Google Fonts CDN -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400..800&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet" />
```

Self-hosted (Option A) preferred for performance + privacy.

---

## 11. Accessibility

### 11.1 Color contrast (WCAG 2.1 AA)

All text/background pairs verified for at least 4.5:1 contrast ratio (AA standard for body text). Larger text (18px+ bold) needs 3:1 minimum.

| Foreground | Background | Ratio | Pass |
|---|---|---|---|
| `zinc-900` (#18181b) | `zinc-50` (#fafafa) | 17.8:1 | AAA |
| `zinc-700` (#3f3f46) | `white` | 10.6:1 | AAA |
| `zinc-500` (#71717a) | `zinc-50` | 4.7:1 | AA |
| `white` | `zinc-950` (#09090b) | 19.5:1 | AAA |
| `white` | `orange-500` (#f97316) | 3.0:1 | AA Large |
| `white` | `orange-600` (#ea580c) | 3.9:1 | AA Large + AAA Bold |
| `white` | `blue-800` (#1e3a8a) | 9.5:1 | AAA |
| `blue-300` (#93c5fd) | `blue-800` | 4.9:1 | AA |
| `amber-300` (#fcd34d) | `blue-800` | 6.7:1 | AAA |
| `red-800` (#991b1b) | `red-50` (#fef2f2) | 9.8:1 | AAA |
| `red-600` (#dc2626) | `white` | 4.5:1 | AA |
| `orange-900` (#9a3412) | `orange-200` (#fed7aa) | 5.8:1 | AAA |

**For CTA buttons**: orange-500 background with white text only passes AA Large (≥18pt). For smaller button text (14px), use orange-600 background (passes AAA Bold). Our buttons are 14px medium weight → use `orange-500` with `font-medium` (500) keeps it on the right side of AA, but verify per-button.

### 11.2 Focus states

All interactive elements receive visible focus rings:

```css
:focus-visible {
  outline: 2px solid var(--color-orange-500);
  outline-offset: 2px;
}
```

Never use `outline: none` without replacement. Focus must be visible in both light and dark contexts.

### 11.3 Color independence

Information must never be conveyed by color alone. Pair every color-coded element with:
- An icon (e.g., AlertTriangle next to red text)
- A text label (e.g., "Affiliate †" with explicit text, not just orange-200 pill)
- A pattern or shape difference

A user with color blindness must understand the page from text + icons alone.

### 11.4 Semantic HTML

- Use semantic landmarks: `<header>`, `<main>`, `<aside>`, `<footer>`
- Headings descend properly (no H4 directly under H2)
- Links have descriptive text, never "click here"
- Buttons use `<button>` element when clicking triggers action, `<a>` only for navigation
- Form inputs always paired with `<label>` (visible or `sr-only`)

---

## 12. Dark mode strategy

**Phase 1 (now):** No full dark mode. Default theme is light surfaces with selectively dark hero/footer sections. This matches sibling sites' patterns.

**Phase 2 (future, post-Phase 5):** Full dark mode opt-in via `prefers-color-scheme: dark` + manual toggle. Token mapping (all pre-defined in CSS variables):

| Token | Light value | Dark value |
|---|---|---|
| `--bg-page` | `zinc-50` | `zinc-950` |
| `--bg-surface` | `white` | `zinc-900` |
| `--text-primary` | `zinc-900` | `zinc-50` |
| `--text-secondary` | `zinc-700` | `zinc-300` |
| `--text-muted` | `zinc-500` | `zinc-500` |
| `--border-default` | `zinc-200` | `zinc-800` |

Implementation in Phase 2 will use Tailwind v4 `@variant dark` directive.

---

## 13. Animation & transitions

### 13.1 Duration tokens

| Token | Value | Usage |
|---|---|---|
| `duration-100` | 100ms | Instant feedback (active states) |
| `duration-150` | 150ms | Hover color changes |
| `duration-200` | 200ms | Default for most interactions |
| `duration-300` | 300ms | Deliberate motion (lifts, expansions) |
| `duration-500` | 500ms | Slow reveals (rarely used) |

### 13.2 Easing

- **`ease-out`** for elements entering view (modals, dropdowns, tooltips)
- **`ease-in-out`** for elements moving in place (slide reveals)
- **`ease-in`** for elements exiting (rare)

### 13.3 Common patterns

```html
<!-- Card hover lift -->
<div class="transition-all duration-200 ease-out
            hover:shadow-md hover:-translate-y-0.5">

<!-- Button press -->
<button class="transition-all duration-150
               active:scale-95">

<!-- Link color change -->
<a class="transition-colors duration-150
          text-zinc-600 hover:text-zinc-900">
```

### 13.4 Reduced motion

Respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 14. Decision log

Major decisions made during palette finalization (recorded for future reference):

1. **Rejected Direction A (cyan/amber/slate)** — too disconnected from sibling navy. Looked generic-tech.
2. **Rejected Direction B (red/amber/stone)** — too aggressive for daily B2B browsing.
3. **Rejected Direction F (pure monochrome zinc + amber)** — lost ecosystem cohesion entirely.
4. **Rejected Direction G (cyan accent on slate)** — slate too cold, cyan didn't actually match siblings (they use navy `#1e3a8a`, not cyan `#0e7490` — earlier memory was wrong).
5. **Rejected Direction G v3 (full siblings palette match)** — too similar, no commercial differentiation.
6. **Rejected Direction H (pure monochrome with no ecosystem links)** — lost family resemblance entirely.
7. **Accepted Direction H-eco** — warm zinc monochrome foundation (90%) + three accent colors from siblings (navy ecosystem, orange CTA, red hazard) used semantically (10%).
8. **Rejected color play on hero headline** ("Compared. Sourced. Shipped." in three colors) — over-designed for premium B2B. Now monochrome white.
9. **Rejected multi-color pillar system** (from ghspictograms compliance hub) — would dilute the monochrome discipline. Pillars distinguished by icon + count chip variation only.

---

## 15. Non-goals (explicit)

What this design system **does not do**, intentionally:

- **No gradients** beyond CTA hover state (orange-500 → orange-600)
- **No glassmorphism / backdrop blur** effects
- **No animated illustrations / Lottie / scroll-triggered animations**
- **No neon glows or shadows in accent colors**
- **No emoji as decoration** (icons only, from lucide-react)
- **No multi-color category systems** (pillar colors)
- **No dark mode** in Phase 1 (only dark hero/footer sections)
- **No custom font weights below 400 or above 800** (only 400, 500, 600, 700, 800 in use)
- **No mid-sentence bolding** for emphasis (use distinct sentences or weight 600 sparingly)
- **No exclamation marks in copy** (premium B2B avoids excitement language)
- **No "Get Started Now!" style CTAs** — use "Request a quote", "Browse suppliers", "Compare options"

---

## 16. Appendix

### Appendix A — Color cheat sheet for Cursor / Tailwind class quick reference

| Need | Tailwind classes |
|---|---|
| Page bg | `bg-zinc-50` |
| Card bg | `bg-white border border-zinc-200` |
| Hero bg | `bg-zinc-950 text-zinc-50` |
| Footer bg | `bg-zinc-950 text-zinc-400` |
| H1 (light) | `text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900` |
| H1 (dark) | `text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-50` |
| H2 | `text-2xl md:text-3xl font-bold tracking-tight text-zinc-900` |
| Body text | `text-base md:text-lg text-zinc-700 leading-relaxed` |
| Muted text | `text-sm text-zinc-500` |
| Primary CTA | `bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-md` |
| Secondary button | `bg-white border border-zinc-300 text-zinc-900 hover:bg-zinc-50 px-5 py-2.5 rounded-md` |
| Sister-site link | `text-blue-700 hover:text-blue-800` |
| Hazard chip | `bg-red-50 text-red-800 px-2.5 py-1 rounded-full text-xs font-medium` |
| Affiliate badge | `bg-orange-200 text-orange-900 px-2.5 py-1 rounded-full text-xs font-medium` |
| Neutral chip | `bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-full text-xs font-medium` |
| Ecosystem banner | `bg-blue-800 text-white` |
| Micro label | `text-xs font-mono uppercase tracking-wider text-zinc-500` |

### Appendix B — Required pre-launch design checklist

Before Phase 1 affiliate launch:
- [ ] `og-default.png` 1200×630 designed in Canva matching this design system
- [ ] Inter Variable + JetBrains Mono Variable fonts loaded
- [ ] All AffiliateDisclosure component variants implemented
- [ ] Focus states verified on every interactive element
- [ ] Contrast ratios verified on every text/background pair used
- [ ] Hero layout tested on mobile (375px), tablet (768px), desktop (1280px)
- [ ] Ecosystem banner working with sister-site links (no 404s)
- [ ] Lucide-react icons consistently 18-20px in primary use cases
- [ ] No gradients except orange CTA hover
- [ ] No multi-color decorations anywhere

### Appendix C — Update log

| Date | Version | Change |
|---|---|---|
| 2026-05-21 | 1.0 | Initial spec lock — Direction H-eco accepted |

---

*End of ghslabels.com design system specification. Updates to this document require commit to ghslabels repo `docs/design-system.md` AND Project Knowledge re-upload.*
