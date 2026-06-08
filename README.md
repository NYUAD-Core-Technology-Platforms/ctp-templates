# ctp-templates

This repository holds **all templates** used by Core Technology Platforms at NYU Abu Dhabi to produce deliverables — Slidev presentations, LaTeX reports, PowerPoint decks, Word memos, and any future format CTP staff scaffold more than once. It's also the source-of-truth for the CTP visual identity: every template here draws its colors, fonts, logos, and design rules from the single source in `shared/brand/`.

Other CTP repos (like [`ctp-upscaling-workshop-series`](https://github.com/NYUAD-Core-Technology-Platforms/ctp-upscaling-workshop-series)) consume templates from this repo. **One brand, one source, propagated everywhere.**

---

## Table of contents

- [What's in this repo](#whats-in-this-repo) — folder tour
- [Which template do I want](#which-template-do-i-want) — quick decision guide
- [Brand assets — the single source](#brand-assets--the-single-source) — `shared/brand/`
- [Set up locally](#set-up-locally) — first-time clone and install
- [How consumer repos use these templates](#how-consumer-repos-use-these-templates) — sibling-checkout pattern
- [Adding a new template format](#adding-a-new-template-format)
- [More docs](#more-docs)

---

## What's in this repo

```
.
├── slidev/                 # Slidev presentation theme. Active.
├── latex/                  # LaTeX class + reports/posters/theses. Placeholder.
├── powerpoint/             # .pptx slide-master templates. Placeholder.
├── word/                   # .docx letter/memo/report templates. Placeholder.
├── shared/
│   └── brand/              # Canonical NYUAD brand source (logo, colors, type, design system).
├── AGENTS.md               # Guidance for AI agents working in this repo.
├── CONTRIBUTING.md         # Editorial and code conventions.
├── package.json            # pnpm workspace root (Node-based templates only).
├── pnpm-workspace.yaml
└── README.md               # this file
```

Each top-level folder is **one template format**:

- `slidev/` is a Node package (the `slidev-theme-ctp` npm theme). It has a `package.json` and is registered as a pnpm workspace.
- `latex/`, `powerpoint/`, `word/` are not Node packages. They're plain folders containing format-specific files (`.cls` and `.tex` for LaTeX, `.pptx` for PowerPoint, `.docx` for Word).

The structure is **flat by format**, not Node-centric. Adding a new format means creating a new top-level folder — that's it.

---

## Which template do I want

| If you're making a... | Open this folder | Status |
|----------------------|------------------|--------|
| **Slidev presentation** (workshop deck, seminar slides, anything HTML-based) | [`slidev/`](slidev/) | **Working.** Read `slidev/README.md` for the full walkthrough. |
| **LaTeX report / poster / thesis** | [`latex/`](latex/) | Placeholder. README documents the planned structure. |
| **PowerPoint deck** (when Slidev isn't an option) | [`powerpoint/`](powerpoint/) | Placeholder. |
| **Word letter / memo / SOP** | [`word/`](word/) | Placeholder. |

Currently the only template you can actually use is **Slidev**. The placeholder folders contain a README each, documenting what *will* go there when someone builds out that format.

---

## Brand assets — the single source

`shared/brand/` is the canonical home for the CTP visual identity. Every template here reads from it:

```
shared/brand/
├── nyuad-logo.png              # official NYUAD lockup, used everywhere
├── colors_and_type.css         # canonical color + type tokens (the slidev theme mirrors these 1:1)
├── DESIGN_SYSTEM.md            # full design-system reference: palette, type, voice, do/avoid list
└── README.md
```

**The rule for templates:** never duplicate brand values. If you need NYU violet in a LaTeX color macro, mirror it from `colors_and_type.css`. If you need the logo in a PowerPoint slide master, point at `nyuad-logo.png`. One source change should propagate to every template.

If you've never read `DESIGN_SYSTEM.md`, do that before authoring any new template — it captures the voice, the do/avoid list, and the "what not to do" lessons (no emoji, no colored left-border accents, squared corners, gold reserved for editorial highlights, etc.).

---

## Set up locally

You need:

- **Node.js 18 or newer** (for the Slidev theme).
- **pnpm 9 or newer** — `npm install -g pnpm` if you don't have it.
- **git**.

Once those are installed:

```bash
git clone https://github.com/NYUAD-Core-Technology-Platforms/ctp-templates.git
cd ctp-templates
pnpm install
```

`pnpm install` installs dependencies for any Node-based template (currently just `slidev/`).

To preview the Slidev theme — that is, see a demo deck rendered with every layout and component visible side by side:

```bash
pnpm dev:slidev
```

Opens `slidev/example.md` at `http://localhost:3030`.

---

## How consumer repos use these templates

### The current pattern: sibling checkout

Today, downstream repos clone `ctp-templates` as a **neighbor folder** on disk:

```
<some-parent-folder>/
├── ctp-templates/                      <-- this repo
└── ctp-upscaling-workshop-series/      <-- a consumer that uses the Slidev theme
```

The consumer's `package.json` then declares a relative-path dependency:

```json
"slidev-theme-ctp": "file:../../../ctp-templates/slidev"
```

`link:` is a pnpm protocol that creates a symlink rather than copying files. The consequence: edits to `ctp-templates/slidev/` are immediately visible to any running consumer dev server — no rebuild, no reinstall.

The consumer's docs ([ctp-upscaling-workshop-series/README.md](https://github.com/NYUAD-Core-Technology-Platforms/ctp-upscaling-workshop-series)) explain the exact folder layout it expects. The Slidev theme's [own README](slidev/README.md#use-the-theme-for-a-standalone-presentation) has a full six-step walkthrough for creating a one-off presentation from scratch.

### The future: publish to a registry

When the Slidev theme stabilizes and a second team starts using it, the right move is publishing it to GitHub Packages (the npm registry built into GitHub for NYUAD's organization). Consumers then pin a specific version:

```json
"slidev-theme-ctp": "^0.1.0"
```

The sibling-checkout requirement goes away. We don't need this yet because the theme is still evolving and there's only one consumer.

---

## Adding a new template format

Step-by-step for adding (e.g.) a poster template, an Affinity Publisher template, or a new format we haven't thought of:

1. **Pick a folder name** — kebab-case, names the format: `poster`, `affinity`, etc.
2. **Create the folder** at the repo root.
3. **If it's a Node package** (rare for non-Slidev): add a `package.json`, add the folder name to `pnpm-workspace.yaml`. For most non-Node formats, skip this.
4. **Source brand assets from `shared/brand/`** — don't duplicate. Reference colors from `colors_and_type.css`, embed the logo from `nyuad-logo.png`.
5. **Write a `<format>/README.md`** describing what the template is, how to build/use it, and any format-specific conventions.
6. **Add a row to the "Which template do I want" table** above so the new template is discoverable.
7. **Update `AGENTS.md`** if the new format has rules that future contributors (or agents) need to know.

The existing placeholder READMEs (`latex/README.md`, `powerpoint/README.md`, `word/README.md`) show the level of detail expected.

---

## More docs

- [`slidev/README.md`](slidev/README.md) — Slidev theme: full reference, layouts, components, two walkthroughs (new workshop and standalone presentation).
- [`shared/brand/README.md`](shared/brand/README.md) — brand assets in detail.
- [`shared/brand/DESIGN_SYSTEM.md`](shared/brand/DESIGN_SYSTEM.md) — palette, type rules, voice, do/avoid list.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — editorial and code conventions when modifying templates.
- [`AGENTS.md`](AGENTS.md) — guidance for AI agents working in this repo (design rules, gotchas, file conventions).

### For AI agents working in the consumer repo

The Slidev theme here is consumed by [`ctp-upscaling-workshop-series`](https://github.com/NYUAD-Core-Technology-Platforms/ctp-upscaling-workshop-series). If you're an agent operating across both, the workshop-series repo has its own AGENTS.md files at the root and at `workshops/` — consult them for consumer-side rules (build gotchas, sibling-checkout assumption, slide-authoring conventions). Cross-references are in [this repo's `AGENTS.md`](AGENTS.md).

---

## License

Internal CTP / NYUAD materials. Ask the maintainers before redistributing.
