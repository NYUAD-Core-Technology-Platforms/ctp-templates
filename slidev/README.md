# slidev-theme-ctp

The Slidev theme for **Core Technology Platforms at NYU Abu Dhabi**. It bundles the layouts, components, fonts, and color tokens that give every CTP presentation the same look. Lives in `ctp-templates/slidev/`, consumed by downstream repos like `ctp-upscaling-workshop-series`.

**The visual language is the official NYUAD CTP Design System.** The canonical reference lives at `../shared/brand/` (palette, type rules, voice, do/avoid list). `styles/tokens.css` here mirrors the design system's tokens and adds `--ctp-*` aliases that the components consume.

## Preview the theme

```bash
# From ctp-templates root
pnpm install
pnpm dev:slidev         # opens example.md at http://localhost:3030
```

`example.md` documents every layout and component the theme exposes — start there.

## Use the theme in a downstream repo

Clone `ctp-templates` as a sibling to your consumer repo:

```
<parent-dir>/
├── ctp-templates/
└── ctp-upscaling-workshop-series/    # consumer
```

Then in the consumer's deck `package.json`:

```json
{
  "dependencies": {
    "slidev-theme-ctp": "link:../../../ctp-templates/slidev"
  }
}
```

(Adjust the relative path to match the deck's depth inside its repo.)

In your `slides.md` frontmatter:

```yaml
---
theme: ctp
title: My Workshop Title
info: |
  Short description that appears in the presenter view and PDF exports.
author: Your Name
---
```

Once published to an npm registry, this becomes `"slidev-theme-ctp": "^0.1.0"` and the sibling-checkout requirement goes away.

## What the theme provides

### Layouts

| Layout name | When to use it |
|-------------|----------------|
| `cover` | Title slide. Has `eyebrow` and `meta` slots. |
| `section` | Full-bleed divider between major parts. Slots: `number`, `subtitle`. |
| `default` | Everyday content slide with the CTP footer. |
| `two-cols-header` | Header row + two columns. Slots: default (header), `left`, `right`. |
| `end` | Closing thanks/contact slide. Slot: `meta`. |

### Components (auto-imported, use directly in `.md`)

| Component | Purpose |
|-----------|---------|
| `<CtpLogo />` | Brand wordmark. Pass `white` for dark backgrounds. |
| `<CtpFooter />` | Deck title + author + slide number. Already wired into `default` and `two-cols-header`. |
| `<CtpCallout label="…" tone="violet\|accent">` | Labeled note box. |
| `<CtpKbd>K</CtpKbd>` | Keyboard key chip. |

### CSS utility classes

| Class | Effect |
|-------|--------|
| `.ctp-tag` | Pill-style chip (brand violet). |
| `.ctp-tag--accent` | Same, in accent gold. |
| `.ctp-callout` / `.ctp-callout--accent` | Hand-rolled callouts if you don't want the component. |

## Re-skinning

All colors and fonts live in `styles/tokens.css` as CSS variables. The file has two halves:

1. **Canonical NYUAD design tokens** — match `../shared/brand/colors_and_type.css` 1:1. Editing here propagates everywhere.
   - Brand: `--nyu-violet` (`#57068C`), `--nyuad-deep-violet` (`#3D0462`), full violet scale `--violet-050` … `--violet-900`
   - Neutrals: `--ink-050` … `--ink-900`, `--white`
   - Accent: `--gold` (`#C99A1E`) — reserved for editorial highlights
   - Type: `--font-sans` (Inter), `--font-serif` (Source Serif 4), `--font-mono` (JetBrains Mono)
   - Scale: `--t-display`, `--t-h1`, `--t-h2`, `--t-eyebrow`, `--t-body`, `--lh-*`, `--tracked*`
   - Spacing: `--s-1` (4px) … `--s-10` (128px)
   - Radii: `--r-0` … `--r-3`, `--r-pill` (institutional — squared by design)
   - Shadows: `--sh-0` … `--sh-3`, `--sh-violet`
2. **`--ctp-*` aliases** — what the template's layouts/components reference. Don't change these; change the canonical tokens and the aliases follow.

Dark mode is handled by an `html.dark { … }` block that adopts a deep-violet chrome treatment (NYUAD doesn't define a dark mode officially, so we extend the brand into one). Slidev toggles `.dark` on `<html>` when the user hits `d`.

## File layout

```
slidev/
├── example.md              # Demo deck — preview by running pnpm dev:slidev
├── package.json            # name: slidev-theme-ctp
├── components/
│   ├── CtpLogo.vue         # NYUAD lockup (PNG from /public/brand/)
│   ├── CtpFooter.vue       # Eyebrow + tabular page number
│   ├── CtpCallout.vue      # Hairline note box (no left-border accent)
│   └── CtpKbd.vue
├── layouts/
│   ├── cover.vue           # Editorial: logo, eyebrow, serif display title
│   ├── section.vue         # Deep-violet bg, gold eyebrow, serif display title
│   ├── default.vue
│   ├── two-cols-header.vue
│   └── end.vue             # Deep-violet bg, white lockup, serif title
├── public/
│   └── brand/              # NYUAD logo files mirrored from ../shared/brand/
├── styles/
│   ├── index.ts            # Slidev style entry
│   ├── tokens.css          # Design-system tokens + --ctp-* aliases
│   └── layout.css          # Typography and slide-level rules
└── setup/
    └── main.ts             # Vue app setup hook
```

## Design-language rules baked in

The components and layouts enforce a few NYUAD design choices automatically — don't override them in slide content:

- **Serif** for h1 and display ranks; **all-caps tracked sans** for h2.
- **No colored left-border accents** on callouts / cards.
- **Squared corners** (0–4px); pill radius only on tags.
- **Hairlines** rather than shadows for separation.
- **Gold** (`#C99A1E`) is reserved for editorial highlights — used only in the section-divider eyebrows and the accent tag variant.
- **No emoji** in slide content.

## Notes

- Slidev auto-imports anything in `components/`. Capitalize the file name to use it as `<PascalCase />` in slides.
- Layouts are referenced by **file name** in slide frontmatter: `layout: section`, `layout: two-cols-header`.
- Don't add workshop-specific bits here — keep them in `workshops/NN-.../components/` or local CSS.
