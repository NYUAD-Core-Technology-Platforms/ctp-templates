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

If you want a one-off deck **outside** the workshop series — a seminar talk, a poster pitch, a meeting deck — follow these six steps. Assume you have nothing yet.

### Step 0 — Plan your folder layout

You'll put your new presentation **next to** the `ctp-templates` folder, so they share a parent. I'll use `C:\Users\hz3752` as an example; you can pick any folder on your machine.

The end state looks like this:

```
C:\Users\hz3752\
├── ctp-templates\                     <-- this repo (already on your machine)
└── my-new-talk\                       <-- we're going to create this
```

The reason they have to share a parent: your new deck's `package.json` will point at the theme using a relative path like `..\ctp-templates\slidev`. If the two folders aren't neighbors, that path doesn't resolve.

### Step 1 — Confirm `ctp-templates` is on your machine

Open a terminal (PowerShell on Windows, Terminal on macOS / Linux). Navigate to the folder you chose:

```bash
cd C:\Users\hz3752
```

> `cd` ("change directory") moves your terminal's current location into that folder. From here on, any command you run is executed relative to this folder. On macOS / Linux use forward slashes: `cd /Users/hadi`.

```bash
ls
```

> Lists the files and folders in the current location. PowerShell, Bash, and Zsh all accept `ls`. If you see `ctp-templates` in the output, skip to Step 2. If not, do the next three commands.

```bash
git clone https://github.com/NYUAD-Core-Technology-Platforms/ctp-templates.git
```

> Downloads the `ctp-templates` repository from GitHub into a folder named `ctp-templates/` right here. After this finishes, `ls` should show it.

```bash
cd ctp-templates
pnpm install
cd ..
```

> Move into the new folder, install its dependencies (pnpm reads `package.json` and downloads everything listed there), then go back up to the parent.

You only do this once per machine, not per presentation.

### Step 2 — Create a starter Slidev project

Still in the same parent folder (`C:\Users\hz3752` in our example):

```bash
npm create slidev@latest
```

> Slidev ships an official scaffolding command. `npm create slidev@latest` downloads it and runs it interactively. The `@latest` part means "use the most recent version of the scaffolder". It creates a new folder with a working starter deck — `slides.md`, `package.json`, `components/`, etc.

The command asks you a few questions. Answer like this:

- **"Project name?"** — type `my-new-talk` (or whatever you want to call the project; this will be the folder name).
- **"Install and start it now?"** — type `n` (we have to wire in the CTP theme first; if you accept here, you'll install the default theme and have to undo it).
- **Anything else** — press Enter to accept the default.

When the command finishes, you'll have a new folder `my-new-talk\` with starter Slidev files inside.

### Step 3 — Switch the deck to the CTP theme

Navigate into the new project and open it in your editor:

```bash
cd my-new-talk
```

> Moves into the freshly-created project folder.

```bash
code .
```

> Opens VS Code in the current folder (the `.` is shorthand for "this folder"). If you use a different editor, open the `my-new-talk` folder however you usually would.

**Edit `package.json`.** Find the `dependencies` block — it has a line that looks like one of:

```json
"@slidev/theme-default": "*"
```
or
```json
"@slidev/theme-seriph": "*"
```

Delete that line and replace it with this one:

```json
"slidev-theme-ctp": "link:..\\..\\ctp-templates\\slidev"
```

> **Windows quirk:** in JSON strings on Windows, backslashes between folders need to be doubled (`\\`). On macOS / Linux use forward slashes: `"link:../../ctp-templates/slidev"`.

Save the file.

**Edit `slides.md`.** The top of the file has a block of settings between two `---` lines (this is called "frontmatter"). Find the line that reads:

```yaml
theme: seriph
```

(or `theme: default`, depending on what the scaffolder picked.) Change it to:

```yaml
theme: ctp
```

Save the file.

### Step 4 — Copy the NYUAD logo into the project

Back in your terminal, still inside `my-new-talk`:

```bash
mkdir public\brand
```

> Creates a new folder `public/brand/` inside the current location. Slidev treats the `public/` folder as static content that's served as-is at the web root (so `public/brand/foo.png` becomes available at the URL `/brand/foo.png`). PowerShell uses backslashes; macOS / Linux use `mkdir -p public/brand` with forward slashes (the `-p` flag tells `mkdir` to also create any missing parent folders).

```bash
copy ..\ctp-templates\shared\brand\nyuad-logo.png public\brand\
```

> Copies the NYUAD logo from the sibling `ctp-templates` repo into your new project's `public/brand/` folder. macOS / Linux: `cp ../ctp-templates/shared/brand/nyuad-logo.png public/brand/`.

This is what makes the `<CtpLogo />` component find its image. Slidev serves anything inside `public/` at the URL root, so `public/brand/nyuad-logo.png` becomes `/brand/nyuad-logo.png` in the running deck — which is exactly where `CtpLogo` looks for it.

### Step 5 — Install dependencies and run the dev server

```bash
npm install
```

> Reads `package.json`, follows the `link:` pointer back to `..\..\ctp-templates\slidev`, and creates a symlink in `node_modules/` so the theme is available to the deck. Also downloads Slidev itself and every other dependency listed. First run takes ~1 minute; subsequent runs are seconds.

```bash
npm run dev
```

> Runs the script named `dev` in `package.json`. The scaffolder set that script to `slidev --open`, which starts a local web server and opens your browser to it. The server stays running until you press `Ctrl-C`. While it's running, every edit to `slides.md` or anything in `components/` triggers a hot-reload in the browser. It prints:

```
  Slidev v0.49.x

  ➜  Local:   http://localhost:3030/
```

Open that URL in your browser. You should see the starter slides rendered with the CTP look — violet, serif title, hairline footer.

### Step 6 — Start writing

`slides.md` is your deck. Edit it, save, and the browser auto-reloads. Add `title`, `author`, and `info` to the frontmatter at the top of the file:

```yaml
---
theme: ctp
title: My Talk Title
author: Your Name
info: |
  One-paragraph description of the talk.
  Appears in the presenter view and PDF exports.
highlighter: shiki
mdc: true
layout: cover
---
```

For what layouts and components you can use, see the [What's in this theme](#whats-in-this-theme) section below. For a worked example, look at `ctp-upscaling-workshop-series/workshops/01-slidev/slides.md` — a complete deck using all the theme's features.

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
