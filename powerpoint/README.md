# CTP PowerPoint templates

`.pptx` templates for CTP staff who present in Microsoft PowerPoint rather than Slidev. Placeholder for now.

## Planned layout

```
powerpoint/
├── README.md                       # this file
├── ctp-deck.pptx                   # main CTP deck template (slide master + sample slides)
├── ctp-deck-16x9.potx              # PowerPoint Template format — what users open via "New from template"
└── assets/                         # any embedded assets specific to the template
```

## How to build the template

Open PowerPoint, set up the **Slide Master** to match the design system:

- **Theme colors:** NYU Violet `#57068C`, NYUAD deep violet `#3D0462`, gold `#C99A1E`, neutrals from `../shared/brand/colors_and_type.css`.
- **Fonts:** Inter for body / headings, Source Serif 4 for display / title. (PowerPoint will need both fonts installed locally; document this in the template's notes.)
- **Slide masters:**
  - Title (cover) — large serif title, eyebrow above, NYUAD lockup top-left.
  - Section divider — deep-violet bg, gold "PART NN" eyebrow, serif title.
  - Content — clean white surface, hairline footer with deck title + page number.
  - Two-column — header + left/right.
  - End — deep-violet bg, white lockup, serif title.
- **Footer placeholder:** small uppercase tracked sans showing deck title + page number.
- **Logo:** insert `../shared/brand/nyuad-logo.png` into the master so every layout inherits it. For dark slides use a white version (apply PowerPoint's "Recolor → White" picture effect, or pre-convert the asset).

Save as both `.pptx` (for direct editing) and `.potx` (Template format that opens cleanly via "File → New from Template").

## Conventions

- **Don't deviate from the design system.** Same rules as the Slidev theme — no emoji, no colored left-border accents, squared corners, hairlines.
- **Embed the fonts** when saving (File → Options → Save → "Embed fonts in the file") so the template renders correctly on machines without Inter / Source Serif 4 installed.
- **Document the design choices** inside the deck on a "Notes for editors" hidden slide at the end. Anyone opening the template should be able to see why elements look the way they do.

See `../AGENTS.md` for cross-template conventions.
