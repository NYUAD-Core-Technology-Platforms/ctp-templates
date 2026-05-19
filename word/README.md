# CTP Word / document templates

`.docx` templates for CTP correspondence, memos, methods notes, and SOPs. Placeholder for now.

## Planned layout

```
word/
├── README.md                       # this file
├── ctp-memo.docx                   # internal memo template
├── ctp-report.docx                 # short report / methods note template
├── ctp-letter.docx                 # external letter template (letterhead)
└── assets/                         # logos, signature blocks if needed
```

## How to build a template

Open Word, set up the **Styles** to match the design system:

- **Headings:** Source Serif 4 (display + h1), Inter (h2 all-caps tracked, h3+ sans).
- **Body:** Inter, 11pt, 1.5 line spacing.
- **Theme colors:** NYU Violet `#57068C` for accents, hairline rule color from neutrals.
- **Letterhead / header:** NYUAD lockup top-left, all-caps tracked sans deck title in the right (or footer).
- **Footer:** small uppercase tracked sans with page number.

Save the styles to the template so they're available in the Styles gallery when someone opens it.

## Conventions

- **No tracked changes left in the template** when committing.
- **Embed fonts** if the recipient might not have Inter / Source Serif 4 installed (File → Options → Save → "Embed fonts in the file").
- **Use real styles, not direct formatting.** Anyone using the template should be able to change "Body" once and have everything re-flow.
- **Logo asset:** insert `../shared/brand/nyuad-logo.png` into the header section so it tiles to every page automatically.

See `../AGENTS.md` for cross-template conventions.
