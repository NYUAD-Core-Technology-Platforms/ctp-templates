# CTP LaTeX templates

LaTeX templates for CTP deliverables — reports, posters, theses, methods notes. Placeholder for now; the structure below is a suggestion when the first template lands.

## Planned layout

```
latex/
├── README.md                       # this file
├── shared/
│   └── ctp.cls                     # shared CTP LaTeX class — colors, fonts, page geometry
│
├── report/                         # technique / methods report template
│   ├── main.tex
│   ├── Makefile
│   ├── README.md
│   └── figs/.gitkeep
│
└── poster/                         # conference poster template
    ├── main.tex
    ├── Makefile
    └── README.md
```

Each subfolder should be a self-contained `latexmk`-buildable project. The shared `ctp.cls` file is where the brand identity (NYU violet, Source Serif 4 / Inter via `fontspec`, tracked uppercase eyebrows, hairlines) lives so individual reports stay slim.

## Source the brand from `shared/brand/`

Anywhere a logo or color is needed:

- Logo: `\includegraphics{../shared/brand/nyuad-logo.png}` (or a `\graphicspath` declaration in `ctp.cls`).
- Colors: define LaTeX macros that mirror the values in `../shared/brand/colors_and_type.css`.

When the design system changes (`shared/brand/`), update the macros in `ctp.cls` to follow.

## Conventions when adding the first template

- Use `lualatex` (or `xelatex`) — we need `fontspec` to load Inter and Source Serif 4 (the design-system fonts).
- Keep a `Makefile` at the root of each template with `make`, `make clean`, `make watch` targets.
- Don't commit `*.aux`, `*.log`, `*.pdf` build artifacts — they go in `.gitignore`.
- Document the build command in the template's own `README.md`.

See the top-level `AGENTS.md` for cross-template rules (no emoji, no decorative left borders, etc.).
