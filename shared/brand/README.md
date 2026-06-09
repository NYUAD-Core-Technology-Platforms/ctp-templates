# CTP brand assets

The canonical home for the **CTP at NYUAD** visual identity. Every template in this repo (Slidev, LaTeX, PowerPoint, Word) reads from this folder. **Don't duplicate values from here into templates**, mirror them instead, so that one edit propagates everywhere.

---

## Files

| File | What it is |
|------|-----------|
| `DESIGN_SYSTEM.md` | The complete CTP Design System reference: palette, type, voice, layout rules, do/avoid list. **Read this before authoring any new template.** |
| `colors_and_type.css` | Canonical CSS tokens, colors, fonts, spacing, radii, shadows. The Slidev theme's `slidev/styles/tokens.css` is derived from this file. Non-CSS templates (LaTeX, PowerPoint, Word) mirror the same values into their own format. |
| `nyuad-logo.png` | Official NYUAD lockup (purple-on-transparent, 877×221). Used everywhere. For dark backgrounds, apply `filter: brightness(0) invert(1)` (CSS) or the equivalent in your target format. The Slidev `CtpLogo` component's `white` prop does this automatically. |
| `README.md` | This file. |

The design system also defines SVG wordmark fallbacks (`nyuad-logo-violet.svg`, `nyuad-logo-white.svg`, `nyuad-mark.svg`). They're not bundled here because the PNG is always available; fetch them from the upstream design system if you ever need a vector fallback for a tight context (e.g. very small print where bitmap scaling would be visible).

---

## How the Slidev theme consumes this folder

- `slidev/styles/tokens.css` declares CSS custom properties (`--nyu-violet`, `--gold`, `--fg1`, etc.) that match the values in `colors_and_type.css` 1:1.
- `slidev/public/brand/nyuad-logo.png` is a copy of `nyuad-logo.png` from this folder. The Slidev dev server serves it at `/brand/nyuad-logo.png`, which is where `<CtpLogo />` looks for it.

When the brand shifts:

1. Edit the relevant file in this folder.
2. If you changed `colors_and_type.css`, update the matching variable in `slidev/styles/tokens.css`.
3. If you changed `nyuad-logo.png`, copy the new file into `slidev/public/brand/`:
   ```bash
   cp shared/brand/nyuad-logo.png slidev/public/brand/
   ```

Consumer repos (like `ctp-upscaling-workshop-series`) also keep a copy of `nyuad-logo.png` in each workshop's `public/brand/`. If the logo changes, those mirrors need updating too. The workshop-series scaffold script copies the logo from `shared/brand/` at workshop creation, so new workshops are always current.

For future templates (LaTeX, PowerPoint, Word), the same pattern applies, they reference assets here and mirror token values into their format-specific config.

---

## When the design system changes

`DESIGN_SYSTEM.md` is the contract that every template implements. If you find a design rule that's getting in the way of a real need, **don't override it locally**, propose a change to `DESIGN_SYSTEM.md`, then propagate it to every template that's affected. The whole point of having a design system is consistency; one-off exceptions defeat that.

---

## Hard rules baked into every template

These come straight from `DESIGN_SYSTEM.md`. Restating them here so they're impossible to miss:

- **Type:** Source Serif 4 for display + h1 (editorial); Inter for body and h2 (h2 is ALL-CAPS with letter-spacing tracking); JetBrains Mono for code.
- **Brand color:** NYU Violet `#57068C`. NYUAD chrome: deep violet `#3D0462`. Gold `#C99A1E` is reserved for editorial highlights only.
- **No colored left-border accents** on callouts or cards, hairline borders and whitespace separate things.
- **Squared corners** (0–4px). Pills (`border-radius: 999px`) allowed only on tag chips.
- **Hairlines, not shadows.**
- **No emoji** in any template content. The brand is institutional.
- **No decorative icons.** Use Lucide (stroke-based) only when an icon carries function.
- **No gradients, no patterns.** Flat surfaces only.

If you're authoring a new template and any of these rules feels wrong for that format, take it to a maintainer before deviating, don't silently make exceptions.
