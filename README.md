# ctp-templates

Templates and shared design assets for **Core Technology Platforms (CTP) at NYU Abu Dhabi**. One folder per output format — Slidev decks, LaTeX reports, PowerPoint decks, Word memos. The brand identity (NYU violet, Source Serif 4 + Inter, hairline-driven layout) is canonical here and re-applied by every template.

## Layout

```
.
├── slidev/                 # Slidev presentation theme (slidev-theme-ctp). Active.
├── latex/                  # LaTeX class + reports, posters, theses. Placeholder.
├── powerpoint/             # .pptx slide-master templates. Placeholder.
├── word/                   # .docx letter / memo / report templates. Placeholder.
├── shared/
│   └── brand/              # canonical NYUAD lockup + design-system reference
│       ├── nyuad-logo.png
│       ├── colors_and_type.css        # tokens (every template mirrors these)
│       ├── DESIGN_SYSTEM.md           # palette, type, voice, do/avoid
│       └── README.md
├── AGENTS.md               # guidance for agents working in this repo
├── CONTRIBUTING.md
├── package.json            # workspace root (for Node-based templates only)
├── pnpm-workspace.yaml
└── README.md
```

The structure is **flat by format**, not Node-centric. Each top-level folder is its own template — internally it can be a Node package (slidev), a LaTeX project (latex), a .pptx file (powerpoint), or whatever the format demands. The `pnpm-workspace.yaml` only lists folders that are npm packages.

## Templates

| Template | Folder | Status | What it produces |
|----------|--------|--------|------------------|
| Slidev theme | `slidev/` | v0.1 — usable | Slidev decks (`slides.md` → HTML / PDF) |
| LaTeX | `latex/` | placeholder | Reports, posters, theses |
| PowerPoint | `powerpoint/` | placeholder | `.pptx` decks |
| Word | `word/` | placeholder | `.docx` letters, memos, reports |

The Slidev theme is the only working template right now. The others have READMEs that document what should go in them when they're built out.

## Brand: one canonical source

`shared/brand/` is the source-of-truth for the CTP visual identity. Every template draws from it:

- `nyuad-logo.png` — official NYUAD lockup.
- `colors_and_type.css` — canonical CSS tokens for color and type. Even non-CSS templates mirror these values (LaTeX color macros, PowerPoint theme colors, Word style definitions) so a single edit here can be propagated everywhere.
- `DESIGN_SYSTEM.md` — full design-system reference: palette, type pairings, voice, do/avoid list.
- `README.md` — usage notes.

When the brand shifts, update `shared/brand/` first, then each template that mirrors those values.

## Working on the Slidev theme

```bash
pnpm install
pnpm dev:slidev          # opens slidev/example.md at http://localhost:3030
```

`slidev/example.md` documents every layout and component the theme exposes.

## How consumer repos use templates

### Slidev (today)

Downstream repos (e.g. [ctp-upscaling-workshop-series](https://github.com/NYUAD-Core-Technology-Platforms/ctp-upscaling-workshop-series)) check `ctp-templates` out as a sibling and `link:` to the slidev folder:

```
<parent>/
├── ctp-templates/                      # this repo
└── ctp-upscaling-workshop-series/      # consumer
    └── workshops/01-slidev/package.json
        depends on "slidev-theme-ctp": "link:../../../ctp-templates/slidev"
```

The `link:` protocol creates a symlink — theme edits hot-reload across both repos.

### Other formats (when they land)

- **LaTeX:** consumers add this repo as a git submodule, or use `latexmk` with `-I` pointing at `ctp-templates/latex/shared/`. Once stable, package as a CTAN-style class. Document the chosen approach in `latex/README.md`.
- **PowerPoint / Word:** users download the `.pptx` / `.docx` from this repo (or a release page) and open via "New from Template". No package management — distribute via a shared drive or GitHub release if version control matters.

### When the slidev theme stabilizes

Publish it to GitHub Packages (private npm registry for the NYUAD org) so consumers stop needing a sibling checkout:

```json
"slidev-theme-ctp": "^0.1.0"
```

## Adding a new template

1. Decide if it's Node-based (npm package) or not.
2. Create a top-level folder named for the format (`<format>/`, kebab-case).
3. If it's Node-based: add a `package.json`, add the folder to `pnpm-workspace.yaml`.
4. Source brand from `shared/brand/` — never duplicate the values.
5. Write a `<format>/README.md` describing the template, how to build/use it, and any format-specific conventions.
6. Add a row to the **Templates** table above and document anything notable in `AGENTS.md`.

See `CONTRIBUTING.md` for editorial conventions and `AGENTS.md` for rules baked into the design language.

## License

Internal CTP / NYUAD materials. Ask the maintainers before redistributing.
