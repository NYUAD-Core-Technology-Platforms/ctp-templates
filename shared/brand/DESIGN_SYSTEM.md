# NYUAD Core Technology Platforms — Design System

A design system for **NYU Abu Dhabi Core Technology Platforms (CTP)** — a network of 12 shared research-grade facilities at NYUAD spanning manufacturing, materials, imaging, biology, robotics, photonics, marine sciences, and sequencing.

This system distills the visual + content language of the [NYUAD public site](https://nyuad.nyu.edu) — specifically the [Core Technology Platforms page](https://nyuad.nyu.edu/en/research/facilities-and-support/core-technology-platforms.html) — into tokens, components and a UI kit you can compose into mocks, prototypes, slides, and production interfaces.

---

## Sources

- **Primary reference:** https://nyuad.nyu.edu/en/research/facilities-and-support/core-technology-platforms.html
- **Brand parent:** NYU global brand (NYU Violet — Pantone 2685, hex `#57068C`).
- **NYUAD meta theme color:** `#3D0462` (deep violet, from page `<meta theme-color>`).
- **Logo source:** `https://nyuad.nyu.edu/apps/nyuad/docroot/icons/nyuad-logo-white.svg`
- **Social handles:** @nyuabudhabi (X/Instagram), nyuad (Facebook), school/new-york-university-abu-dhabi (LinkedIn).

> **Logo:** The official NYUAD lockup is at `assets/nyuad-logo.png` (purple on transparent, 877×221, user-supplied). For dark backgrounds, apply `filter: brightness(0) invert(1)` to invert to white. The SVG files `nyuad-logo-white.svg` / `nyuad-logo-violet.svg` / `nyuad-mark.svg` are simplified fallback wordmarks — prefer the PNG when available.

---

## The 12 Core Technology Platforms

1. Advanced Manufacturing & Electronics
2. Analytical and Materials Characterization
3. Biomedical Imaging
4. High-Throughput Screening
5. Kinesis (robotics / motion / AI)
6. Light Microscopy
7. Marine Sciences
8. Micro-Fabrication
9. Molecular & Cell Biology
10. Photonics
11. Spectrometry & Spectroscopy
12. Sequencing

Each CTP follows the same content shell on the public site: hero photo of a Research Instrumentation Scientist using the equipment, an all-caps `<h2>` platform name, a short editorial paragraph, an optional expand/collapse subsection list, and a `View Equipment` link.

---

## Content Fundamentals

**Voice.** Authoritative, factual, and editorial — the voice of a research university reporting capability, not a startup selling a product. Sentences are full and dense; copy reads like the methods section of a paper softened for a general academic audience.

**Person.** Third-person institutional ("The Marine Sciences facility…", "Researchers are utilizing this CTP to…"). Avoids "we" / "you". When people appear, they appear named with title, e.g. *"Rainer Straubinger, NYUAD Core Technology Platforms Research Instrumentation Scientist, performing Analytical Materials Characterization."*

**Tone.** Calm, precise, neutral. No exclamation marks, no hype words ("amazing", "revolutionary"), no contractions in body copy. Verbs are concrete: *supports, enables, facilitates, characterizes, monitors, sequences.* Hedging is sparse.

**Casing.**
- Platform names and major section headings: **ALL CAPS** (`MARINE SCIENCES`, `MOLECULAR & CELL BIOLOGY`). Display headings on the broader NYUAD site mix Title Case serif with all-caps sans labels.
- Body: Sentence case. Acronyms remain expanded on first mention (`Core Technology Platform (CTP)`, `microelectromechanical systems (MEMS)`).
- Ampersand `&` is used in platform names ("Spectrometry & Spectroscopy"), not the word "and".

**Punctuation.** Oxford comma. Em-dashes are rare. Bulleted lists use a centred mid-dot `●` on the source page; either `●` or a plain disc `•` is acceptable.

**Vocabulary.** Equipment-forward: *state-of-the-art instrumentation, suite of equipment, library preparation, high-throughput, high-content imaging, biogeographic patterns, signal integrity, fluorescently labelled samples.* Spell using **British/international English where it appears in source** (e.g. *labelled, characterisation* show up alongside US spellings; default to US unless quoting).

**No emoji. No icons-as-decoration. No marketing CTAs.** The two CTAs on every CTP block are simply `View Equipment` and a contextual `Publications` / `Contact Us` link. Action verbs are restrained.

**Example openings** (real, from source):
- *"The Biomedical Imaging Core is a state-of-the-art research facility dedicated to advancing the study of cognition and biological processes through non-invasive imaging techniques."*
- *"The Kinesis Lab is a shared multi-space laboratory for design, exploration, and experimentation, related movement by utilizing Robotics, Artificial intelligence, and Automation technologies."*
- *"The sequencing facility enables researchers to rapidly collect large amounts of data on DNA and RNA sequences."*

Each opens with *what the facility is*, then *what research it enables*, then *what equipment / techniques it offers*. Use that three-beat structure.

---

## Visual Foundations

**Color.** NYU Violet (`#57068C`) is the brand anchor. NYUAD layers a deeper violet (`#3D0462`) for chrome (nav, theme color). Everything else is restrained: white pages, near-black text, a light grey hairline + surface system, and one warm gold accent (`#C99A1E`) reserved for editorial highlights / awards. Imagery skews **warm-neutral** — Abu Dhabi sun, lab whites, scientists in nitrile gloves. No saturated brand secondary colors; no gradient backgrounds.

**Type.** Serif display (Times-style) paired with a neutral sans (Helvetica Neue / Arial in production; substituted with **Source Serif 4** + **Inter** in this kit — see *Font substitution* below). Section labels are **ALL CAPS, tracked sans**; lede paragraphs are often serif for editorial weight; body is sans.

**Layout.**
- Anchored to a generous container (`~1240px` max) with `24px` gutters.
- Each CTP entry on the source page is a two-column row: full-bleed photo left, headline + body right, divided by hairline `<hr>` rules.
- Section rhythm is `image · headline · body · CTA · rule`. Use the `<hr>` aggressively to keep sections distinct — NYUAD does not rely on cards for separation, it relies on horizontal rules.
- Squared corners. Cards and inputs use `--r-0` to `--r-2` (max 4px). The brand reads serious / institutional; rounded radii feel off-tone.

**Backgrounds.** Mostly flat white. Hero / nav uses solid deep violet (`#3D0462`). No gradients, no patterns, no illustrations. Full-bleed editorial photos serve as visual anchors.

**Imagery.** Documentary photographs of scientists at instruments, mid-task. Warm, balanced exposure; not desaturated; never B&W; no heavy grain. Subjects are named with role + facility. Use real photos; placeholders should be neutral grey blocks labelled *"NYUAD photo placeholder — scientist + instrument."*

**Shadows / elevation.** Minimal. `--sh-1` for hover lift on interactive elements; `--sh-3` for floating menus only. The dominant separation device is the **hairline rule + whitespace**, not shadow.

**Borders.** 1px hairlines in `--ink-200`. Buttons use 2px solid borders in `--nyu-violet`. No dashed, no dotted.

**Radii.** Squared (0–4px max). Pills (`--r-pill`) used only for tags / status badges. No fully rounded cards.

**Hover states.** Subtle. Links: thickness goes 1px → 2px and color from `--violet-500` → `--violet-700`. Buttons: filled violet → deeper violet (`--violet-700`). Image tiles: a 2–4% lift via `transform: translateY(-2px)` + `--sh-1`. **Never** opacity-only hovers — they read amateur.

**Press states.** Buttons: shift to `--violet-800`, scale `0.98`, transition `120ms`. No bouncy press animations.

**Transitions.** Standard easing `cubic-bezier(.2,.7,.2,1)`, `200ms` default, `120ms` for press. No bounces, no springs. Page transitions are crossfades, not slides.

**Transparency / blur.** Restrained. The sticky nav uses an opaque violet, not a glass blur. Reserve `backdrop-filter` for modal scrims (`rgba(17,17,17,0.5)`) only.

**Cards.** When used: white background, 1px hairline border, 0 radius (or 2px max), no shadow at rest, optional `--sh-1` on hover. Cards never carry colored left-borders as accents — that's an avoided trope.

**Animation.** Minimal and functional. Use fades + small translates for state changes. Avoid keyframe loops, parallax, and entrance animations on body content. Page nav and form interaction = fast, snappy, predictable.

**Fixed elements.** Top global nav is fixed at scroll; breadcrumbs sit below the hero, not fixed. Footer is static.

**Font substitution.**

| Role | NYUAD Production | This Kit (Google Fonts) |
|---|---|---|
| Sans (UI/body) | Helvetica Neue / Arial | **Inter** |
| Serif (display/editorial) | Times / Times New Roman | **Source Serif 4** |
| Mono (data/code) | (none specified) | **JetBrains Mono** |

> ⚠️ **Flag:** The NYUAD site uses Helvetica Neue/Arial via the system stack and a Times-family serif. Google Fonts substitutes are visually close but not identical metrics. If you have licensed Helvetica Neue files, replace the `@import` in `colors_and_type.css` and drop the files into `fonts/`.

---

## Iconography

**Approach.** NYUAD's public site uses **very few decorative icons.** The published CTP page has zero in-body icons — only a magnifying-glass for search in the global header, social glyphs in the footer (Twitter/X, Facebook, YouTube, Instagram, LinkedIn), and an arrow on the "Back To Top" link. Iconography is utilitarian, monoline, and unobtrusive.

**Rules for this design system.**
- Use **Lucide** (https://lucide.dev) as the default icon set — stroke-based, 24px grid, 1.5–2px stroke. It's a close match to the institutional NYUAD feel and CDN-available.
- Linked via CDN: `<script src="https://unpkg.com/lucide@latest"></script>`.
- Icons are `currentColor` only — never multi-color, never filled-and-stroked.
- **No emoji** in any UI or content. Decline if asked.
- **No unicode dingbats** as icons. The mid-dot `●` (U+25CF) is the only typographic mark used decoratively (as bullet) — and only in long-form body lists.
- **Logos** in `assets/`:
  - `nyuad-logo.png` — **official lockup** (purple on transparent, user-supplied). Default. For dark backgrounds use `filter: brightness(0) invert(1);` to invert to white.
  - `nyuad-logo-violet.svg` / `nyuad-logo-white.svg` / `nyuad-mark.svg` — simplified fallback wordmarks (use only if the PNG isn't available, or for very small contexts where bitmaps don't scale).

---

## File Index

| Path | What's in it |
|---|---|
| `README.md` | This file — overview, content + visual foundations, iconography. |
| `SKILL.md` | Agent-Skill-compatible entry point for invoking this system. |
| `colors_and_type.css` | Color + type + spacing + radii + shadow + motion tokens (CSS custom props) and semantic element styles. |
| `assets/` | Logos (`nyuad-logo-white.svg`, `nyuad-logo-violet.svg`, `nyuad-mark.svg`). Drop real photos / additional icons here. |
| `preview/` | Self-contained HTML cards rendered into the Design System tab (one concept per card). |
| `ui_kits/website/` | High-fidelity React (JSX) recreation of the NYUAD CTP marketing site — header, hero, CTP row, footer, equipment detail page. |
| `fonts/` | (Empty by default — drop licensed Helvetica Neue / Times files here to swap out the Google Fonts substitutes.) |

---

## UI Kits

- **`ui_kits/website/`** — Marketing/research site (the public NYUAD CTP pages). `index.html` opens on the CTP landing, lets you click into a single platform's equipment detail page, then back. Includes components: `Header`, `Breadcrumbs`, `Hero`, `CtpRow`, `Footer`, `Button`, `EquipmentCard`, `ExpandRow`.

---

## Caveats & Open Questions

- **Fonts are substituted.** Production NYUAD uses Helvetica Neue / Arial + a Times family. This kit uses Inter + Source Serif 4 via Google Fonts. Metrics differ slightly — please confirm whether to license real Helvetica Neue files.
- **Photography is placeholder.** Every CTP row + equipment card uses a violet-gradient placeholder. Replace with real documentary photos of scientists at instruments.
- **CTP equipment lists** beyond the *Sequencing* platform are illustrative, not researched. Treat as wireframe content until verified with the CTP teams.
- **Mobile nav drawer** is not implemented in the UI kit.
- **No Arabic / RTL pass.** The real NYUAD site has a full عربي mirror. Layout and type would need a Noto Sans Arabic / IBM Plex Sans Arabic pairing and RTL flow.

## How to use

1. Link `colors_and_type.css` in any HTML file you produce.
2. Pull components from `ui_kits/website/` for marketing-style surfaces.
3. Reference `assets/nyuad-logo-*.svg` for the lockup.
4. Follow the **Content Fundamentals** voice rules — third-person institutional, ALL CAPS section heads, no emoji, no hype.
5. Default to white pages, violet chrome, hairlines instead of shadows, squared corners.
