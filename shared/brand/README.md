# NYUAD CTP brand assets

The canonical source for the visual identity used by every deck in the workshop series.

## Files

| File | What it is |
|------|-----------|
| `DESIGN_SYSTEM.md` | The complete CTP Design System reference (palette, type, voice, layout rules, "do/avoid" list). |
| `colors_and_type.css` | The canonical CSS tokens file from the design system. The Slidev template re-derives its tokens from this file — keep it as the source of truth. |
| `nyuad-logo.png` | Official lockup, purple on transparent (877×221). Used everywhere; apply `filter: brightness(0) invert(1)` for dark backgrounds (`CtpLogo`'s `white` prop does this). |

The design system also ships SVG wordmark fallbacks (`nyuad-logo-violet.svg`, `nyuad-logo-white.svg`, `nyuad-mark.svg`); they're not bundled here because the PNG is always available. Fetch them from the upstream design system if you ever need a vector fallback for a tight context.

## How the Slidev template consumes these

- `template/styles/tokens.css` mirrors the variables defined in `colors_and_type.css`, then adds `--ctp-*` aliases that template components use internally. Re-skin by editing this one file.
- Logo assets are mirrored into each Slidev project's `public/brand/` folder so `<img src="/brand/nyuad-logo.png">` resolves at build time. The `CtpLogo` component points to that path.

## To update the brand later

1. Edit `colors_and_type.css` here (or replace with a newer version from the design-system source).
2. Mirror any token changes into `template/styles/tokens.css`.
3. If the logo changes, replace `nyuad-logo.png` here and re-run:
   ```bash
   cp shared/brand/nyuad-logo.png template/public/brand/
   cp shared/brand/nyuad-logo.png workshops/*/public/brand/
   ```
   (Could be automated with a `presync` script if you find yourself doing it often.)

## Design language quick-reference

- **Anchor color:** NYU Violet `#57068C`. Chrome / dark hero: NYUAD deep violet `#3D0462`.
- **Type:** Source Serif 4 for display + h1 (editorial), Inter for sans (UI, h2 all-caps tracked), JetBrains Mono for code.
- **No gradients, no patterns, no decorative left-border accents on cards.** Hairline rules + whitespace do the separating.
- **Squared corners:** 0–4px radii, pills only for tags.
- **Gold (`#C99A1E`)** is reserved for editorial highlights and awards — don't sprinkle it.
- **No emoji, no decorative icons** in slide content. Lucide line icons only if needed.
