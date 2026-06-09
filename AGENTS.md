# AGENTS.md

Guidance for AI coding agents working in this repo. Read this first when starting any task here, it captures conventions that are easy to miss from the file tree alone.

## What this repo is

`ctp-templates` holds **all templates** for Core Technology Platforms at NYU Abu Dhabi, every format the unit produces deliverables in (Slidev decks, LaTeX reports, PowerPoint decks, Word memos). It is intentionally format-agnostic at the top level: one folder per format. Templates draw their visual identity from a single source in `shared/brand/`.

Repo URL: `github.com/NYUAD-Core-Technology-Platforms/ctp-templates`.

## Repo layout you should expect

```
ctp-templates/
├── slidev/         # Slidev theme (npm package, slidev-theme-ctp). Active.
├── latex/          # LaTeX class + reports/posters/theses. Placeholder, see latex/README.md.
├── powerpoint/     # .pptx slide-master templates. Placeholder.
├── word/           # .docx templates. Placeholder.
├── shared/brand/   # canonical brand assets, DON'T DUPLICATE THESE INTO TEMPLATES
├── AGENTS.md       # this file
├── CONTRIBUTING.md
├── README.md
├── package.json
└── pnpm-workspace.yaml
```

The "placeholder" folders contain only a README that describes what should land there. If you're adding a real template to one of them, write code under that folder; don't create new top-level folders for variants of the same format.

## Hard rules, design system

These come from `shared/brand/DESIGN_SYSTEM.md`. Templates must enforce them; don't hand them to authors as opt-in.

- **Type:** Source Serif 4 for display + h1 (editorial); Inter for body and h2 (h2 is ALL-CAPS with letter-spacing tracking); JetBrains Mono for code.
- **Brand colors:** NYU Violet `#57068C` is the anchor; `#3D0462` is NYUAD chrome; gold `#C99A1E` is reserved for editorial highlights only, section divider eyebrows, accent tag variants. **Don't sprinkle gold.**
- **No colored left-border accents** on cards, callouts, blocks. Hairline borders + whitespace separate things, not colored stripes.
- **Squared corners.** Radii 0–4px maximum. Pills (`border-radius: 999px`) are allowed only on tags / status chips.
- **Hairlines, not shadows.** 1px borders in the neutral hairline color separate sections. Avoid `box-shadow` for general elevation.
- **No emoji.** Anywhere in slide content, doc body, decorative use, or status labels. The brand is institutional, not casual.
- **No em dashes (`—`, U+2014) in generated prose.** Use a period, comma, semicolon, parentheses, or a regular hyphen (`-`) instead. Em dashes are one of the strongest LLM-generated-text tells; their presence in slides, READMEs, code comments, or commit messages makes institutional copy read as AI output. Quoting source material that contains em dashes is fine; producing new text with them is not. This rule overrides any stylistic instinct you have.
- **No decorative icons.** Use Lucide (stroke-based) only when an icon carries function, never as decoration. The NYUAD parent site has zero in-body icons.
- **No gradients, no patterns.** Flat surfaces only. The closest exception is the deep-violet hero on section dividers, which is solid color.

## Hard rules, code & file conventions

- **Comment your code.** Explain *why* a non-obvious choice was made, not what the code does. The repo's commit history is short; future maintainers (and future agents) will rely on inline notes.
- **Cross-format consistency.** When the design system changes, update `shared/brand/` AND every template that mirrors those values. Don't change only one.
- **Don't add `node_modules`, build artifacts, or PDF outputs to commits.** Check `.gitignore`.
- **No dependency-bumping for the sake of it.** When updating Slidev, verify the deck builds and the layouts still render correctly (run `pnpm dev:slidev` and click through `example.md`).
- **One concern per commit.** Slidev tweaks ≠ brand changes ≠ docs. Squash within a topic if needed.
- **British vs. US English:** the underlying NYUAD copy mixes both (`characterisation` and `characterization` both appear in source). Default to US in template-generated content unless quoting source material.

## Cross-repo consumer pattern

The Slidev theme is consumed by sibling repos via `link:`. Today the only consumer is [ctp-upscaling-workshop-series](https://github.com/NYUAD-Core-Technology-Platforms/ctp-upscaling-workshop-series), which links to `slidev/` from each workshop's `package.json`. The consumer assumes both repos are checked out under the same parent directory.

**If you're changing the Slidev theme:**

- Live edits propagate to any running consumer dev server through the symlink, no install / publish step.
- Breaking changes (renaming a layout, removing a component slot, restructuring CSS variable names) are visible to every consumer immediately. Either don't break, or open issues in each consumer repo first.
- If you must restructure path-sensitive things (move a file in `slidev/`, rename the package), grep consumer repos for the old path BEFORE committing, Slidev's `theme: ctp` resolution is happy as long as the package name stays `slidev-theme-ctp`, but file paths and `import` paths inside the theme aren't.

**If you're adding a new template:**

- Check that consumers wanting to use it have a clean way to pull it in. Document the consumption pattern in the template's own README.
- Update the top-level `README.md` table.
- Update this file if the new template has format-specific rules agents need to know.

**Cross-repo coordination, consumer agents:**

When the user is working in a consumer repo (currently only [`ctp-upscaling-workshop-series`](https://github.com/NYUAD-Core-Technology-Platforms/ctp-upscaling-workshop-series)), that repo has its own `AGENTS.md` files:

- [`ctp-upscaling-workshop-series/AGENTS.md`](https://github.com/NYUAD-Core-Technology-Platforms/ctp-upscaling-workshop-series/blob/main/AGENTS.md), consumer-side rules: the sibling-checkout assumption, build gotchas (`--base ./`, blank `dist/index.html`), npm vs pnpm incompatibility, Windows symlink permissions.
- [`ctp-upscaling-workshop-series/workshops/AGENTS.md`](https://github.com/NYUAD-Core-Technology-Platforms/ctp-upscaling-workshop-series/blob/main/workshops/AGENTS.md), slide-authoring conventions: frontmatter, snippets, speaker notes, the `<<<` import gotcha for `.md` files, the dark-background-contrast rule.

If you're making a theme change here that affects consumer behavior, also read those files so you understand what the consumer expects. Add a note to them too if you introduce a new consumer-visible convention.

## Working on the Slidev theme

```bash
pnpm install          # at the repo root
pnpm dev:slidev       # opens slidev/example.md at http://localhost:3030
```

`slidev/example.md` is the theme's living manual. Every layout and component should be demoed there. When you add a new layout or component, demo it in `example.md` in the same change.

### Slidev-specific gotchas

- **Layouts using `<slot />` for the title slot must NOT wrap the slot in an `<h1>`.** The markdown `# Title` already produces an `<h1>`; nesting one inside another causes the parser to demote the inner heading to `<h2>` and break the styling. Target the inner `<h1>` from scoped CSS via `:deep(h1)` instead. See `slidev/layouts/section.vue` for the pattern.
- **`<<< @/path` snippet imports** work cleanly for code files (`.ts`, `.js`, `.vue`, `.yml`) but tangle the MDC/Shiki pipeline for `.md` files, the imported `---` and `::slot::` markers leak into the host slide. Inline markdown examples as literal code blocks (` ```md ... ``` `) instead.
- **Dark backgrounds need locally re-bound color tokens**, not per-element `color` overrides. The `.slidev-layout` rule sets `color: var(--fg1)` for all children, so individual elements stay near-black on a violet background unless you redefine `--fg1` locally on the layout container. See `slidev/layouts/section.vue`.
- **Vue scoped CSS doesn't reach slot content** (slot content belongs to the parent's scope). Use `:deep(selector)` from the layout's scoped CSS to style markdown-generated descendants.
- **Don't import runtime helpers from `@slidev/types` in the theme** (e.g. `defineAppSetup` in `setup/main.ts`). `@slidev/types` is a devDependency of this theme; consumers building decks won't have it installed transitively, and rollup will fail with "Failed to resolve import @slidev/types". Write plain functions with explicit parameter types instead. The setup helper is essentially an identity function, its only value is type inference inside this file.

### File layout

```
slidev/
├── package.json        # name: slidev-theme-ctp
├── example.md          # demo deck (preview with pnpm dev:slidev)
├── layouts/            # cover, section, default, two-cols-header, end
├── components/         # CtpLogo, CtpFooter, CtpCallout, CtpKbd
├── styles/
│   ├── index.ts        # Slidev style entry, imports tokens.css + layout.css
│   ├── tokens.css      # design-system tokens + --ctp-* aliases
│   └── layout.css      # typography + slide-level rules
├── setup/main.ts       # Vue app setup hook
└── public/brand/       # NYUAD logo, mirrored from shared/brand/
```

## Design system as the contract

When in doubt, consult `shared/brand/DESIGN_SYSTEM.md`. It is the contract between templates. Templates implement it; they don't redefine it.

If you find a design-system rule that's getting in the way of a real need, **don't override it locally**, propose a change to `DESIGN_SYSTEM.md` and propagate it to every template that's affected. The whole point of having a design system is that things stay consistent; one-off exceptions defeat that.

## Versioning

For now, templates track their own `package.json` (or equivalent) versions inside their folder. Bump:

- **patch** for visual tweaks, bug fixes, additive props.
- **minor** for additive layouts/components or new tokens.
- **major** for breaking layout/component API changes, only once a template is stable.

Tag the repo per template release: `git tag slidev-theme-v0.2.0`. Future-you will need these tags to reproduce a specific consumer build.

## When you're done

- Update `README.md` if you added or changed a template's status.
- Update this `AGENTS.md` if you discovered a new gotcha that future agents should know.
- Run `pnpm dev:slidev` and click through `slidev/example.md` before committing slidev changes, Vite hot reload tells you about most regressions immediately.
