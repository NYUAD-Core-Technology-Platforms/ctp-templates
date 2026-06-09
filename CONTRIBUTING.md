# Contributing

A short guide for adding to or maintaining the CTP templates.

## Repo structure

- Each template is its own package under `packages/`. Templates are independent, one can change without affecting the others.
- `shared/` holds assets (currently brand) that multiple templates source from. Don't duplicate brand files inside individual template packages; reference `shared/brand/` instead.

## Working on the Slidev theme

```bash
pnpm install
pnpm dev:slidev      # opens slidev/example.md at http://localhost:3030
```

`example.md` documents every layout and component the theme exposes. Treat it as the theme's living manual, when you add a new layout or component, demo it there.

## Design-system rules baked into the templates

These come from `shared/brand/DESIGN_SYSTEM.md`. The templates enforce them automatically; don't override in template content:

- Serif (Source Serif 4) for display + h1; sans (Inter) all-caps tracked for h2.
- No colored left-border accents on cards or callouts.
- Squared corners (0–4px); pill radius only for tags.
- Hairlines + whitespace separate sections, not shadows.
- Gold (`#C99A1E`) is reserved for editorial highlights, section eyebrows + accent tag only.
- No emoji in template content. Lucide line icons only if needed.

## Cross-repo dev workflow

The Slidev theme is consumed by `ctp-upscaling-workshop-series` (and any future presentation repos) via `link:` to a sibling checkout. When you edit the theme:

1. Save the change here.
2. The consumer's running `pnpm dev` already has the new behavior (live symlink, hot reload).
3. Commit + push here when ready. Consumer doesn't need a commit unless its content also changed.

If you make a breaking change to the theme (rename a layout, remove a component slot), open an issue in the consumer repo too so the workshops get updated in sync.

## Versioning

For now the theme tracks `0.x` versions in `slidev/package.json`. Bump:

- **patch** (`0.1.0` → `0.1.1`) for visual tweaks, bug fixes, additive component props.
- **minor** (`0.1.0` → `0.2.0`) for additive layouts/components, design-system token additions.
- **major** when stable, for breaking layout/component API changes.

Tag the repo when you release: `git tag slidev-theme-v0.2.0 && git push --tags`.

## Conventions

- Commit messages: imperative present tense, short. e.g. `slidev: add quote layout`, `brand: bump accent gold to #C99A1E`.
- One concern per commit / PR.
- When adding a new layout/component to the Slidev theme, demo it in `slidev/example.md` in the same PR.
