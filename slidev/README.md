# slidev-theme-ctp

The Slidev theme for CTP at NYU Abu Dhabi. It bundles the layouts, components, fonts, and colors that give every CTP presentation the same look. This folder is the theme itself; presentations that use it live in other repos (like `ctp-upscaling-workshop-series`) or in their own folder on your machine.

The visual identity is the **official NYUAD CTP Design System** — see `../shared/brand/DESIGN_SYSTEM.md` for the full reference (palette, type, voice, do/avoid). This theme is the design system, applied to Slidev decks.

---

## Table of contents

- [Preview the theme on its own](#preview-the-theme-on-its-own) — see what the theme looks like before you use it
- [Use the theme for a new workshop in the workshop series](#use-the-theme-for-a-new-workshop-in-the-workshop-series) — one command, all set
- [Use the theme for a standalone presentation](#use-the-theme-for-a-standalone-presentation) — six steps the first time
- [What's in this theme](#whats-in-this-theme) — layouts, components, CSS tokens
- [Re-skinning / customizing](#re-skinning--customizing) — change colors or fonts
- [File layout](#file-layout)
- [Design-language rules baked in](#design-language-rules-baked-in)

---

## Preview the theme on its own

If you just want to see what the theme looks like before deciding to use it, you can run the demo deck that ships in this folder:

```bash
pnpm install
```

> Run this from the `ctp-templates` repo root. It reads `package.json` and the workspace, downloads everything Slidev needs, and creates a `node_modules/` folder. Only needs to be done once per checkout (or after a `git pull` that touches dependencies).

```bash
pnpm dev:slidev
```

> Runs the script named `dev:slidev` in the root `package.json`. That script is `pnpm --filter slidev-theme-ctp dev`, which runs `slidev example.md --open` inside the `slidev/` folder. Slidev starts a dev server and auto-opens your browser to `http://localhost:3030` showing `example.md`. The server stays running until you press `Ctrl-C`.

`example.md` demonstrates every layout and component the theme provides, side by side. Treat it as the theme's living manual.

---

## Use the theme for a new workshop in the workshop series

If you're adding a workshop to [ctp-upscaling-workshop-series](https://github.com/NYUAD-Core-Technology-Platforms/ctp-upscaling-workshop-series), you don't need to do anything manually. That repo has a scaffold script that wires the theme in for you:

```bash
cd ctp-upscaling-workshop-series
```

> Move your terminal into the workshop-series repo (assumes you're starting in the parent folder that contains both repos).

```bash
pnpm new-workshop git-basics
```

> Replace `git-basics` with your topic name in kebab-case (lowercase letters, digits, hyphens). The script picks the next workshop number automatically and creates `workshops/NN-git-basics/` with a minimal starter deck, a `package.json` already pointing at this theme, and the NYUAD logo copied in.

```bash
pnpm install
```

> Registers the new workshop folder as a workspace package. Creates `node_modules/` symlinks pointing at this theme (`../../../ctp-templates/slidev`).

```bash
pnpm --filter ./workshops/02-git-basics dev
```

> Starts the Slidev dev server for that workshop and opens `http://localhost:3030`. Edits to `slides.md` hot-reload.

The full walkthrough with explanations of every step lives in [`ctp-upscaling-workshop-series/README.md`](https://github.com/NYUAD-Core-Technology-Platforms/ctp-upscaling-workshop-series).

---

## Use the theme for a standalone presentation

For a one-off deck **outside** the workshop series — a seminar talk, a meeting deck, a poster pitch — one command scaffolds everything.

### Prerequisite — `ctp-templates` cloned once

Have this repo (`ctp-templates`) checked out somewhere on your machine. The new deck folder will be created **next to** it, so they share a parent. If you don't have it yet:

```bash
cd <wherever-you-keep-code>      # e.g. C:\Projects or ~/projects
git clone https://github.com/NYUAD-Core-Technology-Platforms/ctp-templates.git
cd ctp-templates
pnpm install
```

You only do this once per machine.

### One command to scaffold a new deck

From inside `ctp-templates`:

```bash
pnpm new-deck my-talk
```

> Replace `my-talk` with whatever you want to call your deck — kebab-case (lowercase letters, digits, hyphens). The script creates a sibling folder `../my-talk/` with everything wired up. It aborts if the folder already exists.

The script generates:

```
<parent>/
├── ctp-templates/                  (this repo)
└── my-talk/                        (new — created by the script)
    ├── slides.md                   (minimal cover + section + content + end)
    ├── package.json                (Slidev pinned to ^0.49.0; theme via link:)
    ├── README.md                   (deck-specific run instructions)
    ├── .gitignore
    └── public/
        ├── brand/nyuad-logo.png    (copied from ctp-templates/shared/brand/)
        └── img/                    (your deck-specific images go here)
```

It prints the next three commands at the end. Run them:

```bash
cd ../my-talk
npm install
npx slidev
```

> `npm install` reads `package.json`, follows the `link:` pointer back to `../ctp-templates/slidev`, and creates a symlink so the theme is available to the deck. First run takes ~1 minute. `npx slidev` starts the dev server and opens `http://localhost:3030/` in your browser. Edits to `slides.md` hot-reload.

### What gets generated in `slides.md`

A minimal starter that exercises the main theme layouts — cover, section divider, default content slide, end. Replace it with your content:

```yaml
---
theme: ctp
title: My Talk
author: Your Name
info: |
  One-paragraph description.
highlighter: shiki
mdc: true
layout: cover
---

# My Talk

::eyebrow::
<span class="ctp-tag ctp-tag--accent">CTP · NYUAD</span>

::meta::
Core Technology Platforms · NYU Abu Dhabi
2026-06-08
```

For the full set of layouts, components, and CSS variables you can override, see [What's in this theme](#whats-in-this-theme) below. For a worked example, look at `ctp-upscaling-workshop-series/workshops/01-slidev/slides.md` — a complete deck using all the theme's features.

### If you'd rather do it by hand

The script just automates the equivalent of: create a folder, write a `package.json` with `"slidev-theme-ctp": "file:../ctp-templates/slidev"`, write a `slides.md` with `theme: ctp`, copy `nyuad-logo.png` into `public/brand/`, and write a `.gitignore`. (`file:` is used rather than `link:` so the deck works with either `npm install` or `pnpm install` — `link:` is a pnpm-specific protocol that npm rejects with `EUNSUPPORTEDPROTOCOL`.) Open `scripts/new-deck.mjs` in this repo if you want to see exactly what it does — it's short and commented. Tweak it freely if your workflow needs extra steps (e.g. add a custom layout, init git, etc.).

---

## Keeping up with template updates

Your deck depends on the theme via `"slidev-theme-ctp": "file:../ctp-templates/slidev"` — a **symlink**, not a copy. So when the CTP brand or layouts evolve in this repo, you don't reinstall anything.

### Get the latest theme

```bash
cd /path/to/ctp-templates
git pull
```

That's it. Your next browser reload (or next `npx slidev build` / `export`) picks up the new theme. The same `git pull` updates every deck on your machine that links to this repo — workshops in the series, every standalone deck you've scaffolded.

### When a breaking change ships

Rare, but possible — a renamed layout, a removed CSS variable, a tightened component prop. The templates repo flags any breaking change in two places:

- The relevant section of [`AGENTS.md`](../AGENTS.md) — the canonical "what changed and why" record for agents and humans.
- A note in the [Slidev README](README.md) (this file), usually near the layout or component that changed.

Check those if a slide suddenly renders wrong after a pull. Most fixes are one-line edits in your `slides.md` (rename a slot marker, swap a class). If you need to stay on the old theme, every commit in `ctp-templates` is git-addressable — `git checkout <commit-or-tag>` in the templates repo pins your deck to that snapshot.

### Decks you've already shipped don't move

PDFs and static builds are frozen at the moment you ran `npx slidev export` or `npx slidev build`. Template updates don't retroactively change a file you've already produced — only running dev servers and **future** builds see the new theme. If you need to rebuild a delivered deck against the same theme version, tag the templates commit you shipped on (`git tag ws01-delivered-2026-05-12`) and `git checkout` that tag before rebuilding.

To **export to PDF** when you're done:

```bash
npm install --save-dev playwright-chromium
```

> `--save-dev` means install this as a devDependency (only needed during development, not by users of the deck). `playwright-chromium` is a stripped-down Chromium browser that Slidev drives in the background to render slides for PDF capture. One-time install per project. About 150 MB download.

```bash
npx slidev export
```

> `npx` runs the `slidev` CLI binary that's installed in this project's `node_modules/`. `export` is the PDF subcommand. Produces a single file `slides-export.pdf` in the project root — one slide per PDF page.

To **build a static site** you can host anywhere:

```bash
npx slidev build
```

> Produces a `dist/` folder containing the deck as HTML/CSS/JS files. The folder is self-contained: upload it to any web host (Netlify, GitHub Pages, S3, NGINX) and the deck works. No Slidev or Node needed at the host end.

---

## What's in this theme

### Layouts (set with `layout: <name>` in slide frontmatter)

| Name | Use it for | Slots |
|------|-----------|-------|
| `cover` | Title slide of the deck | `eyebrow` (small label above title), `meta` (date / presenter / location below title) |
| `section` | Full-bleed divider between major parts | `number` (e.g. "PART 01"), `subtitle` (lede paragraph) |
| `default` | Everyday content slide with the CTP footer | — |
| `two-cols-header` | Header row spanning both columns, then two columns underneath | `left`, `right` |
| `end` | Closing thanks / contact slide | `meta` |

Example using `cover`:

```md
---
layout: cover
---

# My Workshop Title

::eyebrow::
<span class="ctp-tag ctp-tag--accent">Workshop 02</span>

::meta::
Core Technology Platforms · NYU Abu Dhabi
12 May 2026
```

### Components (auto-imported, just use them in `.md`)

| Component | What it is | Example |
|-----------|-----------|---------|
| `<CtpLogo />` | NYUAD lockup. Pass `white` for dark backgrounds. | `<CtpLogo white />` |
| `<CtpFooter />` | Footer with deck title + author + slide number. Already wired into `default` and `two-cols-header`. | (auto) |
| `<CtpCallout label="…" tone="violet\|accent\|sand">` | Labeled note box (hairline border, no left-accent stripe). | `<CtpCallout label="Tip">Body content</CtpCallout>` |
| `<CtpKbd>K</CtpKbd>` | Keyboard key chip. | Press `<CtpKbd>Cmd</CtpKbd>+<CtpKbd>K</CtpKbd>` |

### CSS utility classes (use directly in HTML inside slides)

| Class | What it does |
|-------|--------------|
| `.ctp-tag` | Pill chip in brand violet. |
| `.ctp-tag--accent` | Same shape, gold border on transparent (sparingly). |
| `.ctp-tag--ghost` | Same shape, violet border on transparent. |
| `.eyebrow` / `.ctp-eyebrow` | Small all-caps tracked sans label. |

---

## Re-skinning / customizing

### Change a color for one deck only

Drop a `style.css` file at the root of your deck folder (alongside `slides.md`). Slidev auto-loads it. To change the accent color just for this deck:

```css
:root {
  --gold: #4DB6AC;
  --ctp-color-accent: var(--gold);
}
```

Reload the browser. Every accent in your deck repaints.

### Change colors / fonts for every CTP deck (the brand globally)

Edit `styles/tokens.css` in this theme. It has two halves:

1. **Canonical NYUAD design tokens** — match `../shared/brand/colors_and_type.css` 1:1. Editing here propagates everywhere.
   - Brand: `--nyu-violet` (`#57068C`), `--nyuad-deep-violet` (`#3D0462`), full violet scale `--violet-050` … `--violet-900`
   - Neutrals: `--ink-050` … `--ink-900`, `--white`
   - Accent: `--gold` (`#C99A1E`) — reserved for editorial highlights, do not sprinkle
   - Type: `--font-sans` (Inter), `--font-serif` (Source Serif 4), `--font-mono` (JetBrains Mono)
   - Scale: `--t-display`, `--t-h1`, `--t-h2`, `--t-eyebrow`, `--t-body`, `--lh-*`, `--tracked*`
   - Spacing: `--s-1` (4px) … `--s-10` (128px)
   - Radii: `--r-0` … `--r-3`, `--r-pill` (institutional — squared by design)
2. **`--ctp-*` aliases** — what this theme's layouts and components actually reference. Don't change these; change the canonical tokens above and the aliases follow.

If you change tokens here, also update `../shared/brand/colors_and_type.css` so the canonical source stays in sync.

### Dark mode

Slidev toggles a `.dark` class on `<html>` when the user presses `d`. The theme handles this via an `html.dark { … }` block that adopts a deep-violet chrome treatment. NYUAD doesn't officially define a dark mode, so we extend the brand into one.

---

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
│   ├── index.ts            # Slidev style entry — imports tokens.css + layout.css
│   ├── tokens.css          # Design-system tokens + --ctp-* aliases
│   └── layout.css          # Typography and slide-level rules
└── setup/
    └── main.ts             # Vue app setup hook
```

---

## Design-language rules baked in

The layouts and components enforce these automatically; don't override them in slide content.

- **Serif (Source Serif 4)** for h1 and the display rank on covers / sections / end slides.
- **Sans (Inter) all-caps tracked** for h2 (institutional section heads).
- **No colored left-border accents** on callouts or cards. Hairline borders + whitespace do the separating.
- **Squared corners** (0–4px). Pill radius (`--r-pill`) only on tags and status chips.
- **Hairlines, not shadows.** A 1px border in the neutral hairline color is the dominant separator.
- **Gold** (`#C99A1E`) is reserved for editorial highlights — section-divider eyebrows and the accent tag variant. Don't sprinkle it.
- **No emoji** in slide content. The brand is institutional.

---

## Notes

- Slidev auto-imports any `.vue` file in `components/`. Capitalize the file name (`CtpFoo.vue`) to use it in `.md` as `<CtpFoo />`.
- Layouts are referenced by **file name** (without extension) in slide frontmatter: `layout: section`, `layout: two-cols-header`.
- Workshop-specific or deck-specific components should live in the consumer repo's own `components/` folder, not here.
