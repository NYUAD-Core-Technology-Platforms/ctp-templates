#!/usr/bin/env node
/*
 * scripts/new-deck.mjs
 *
 * Scaffold a fresh standalone Slidev deck that uses the CTP theme.
 *
 * Usage (from the ctp-templates repo root):
 *   pnpm new-deck <kebab-slug>
 *
 * Examples:
 *   pnpm new-deck imaging-summit
 *   pnpm new-deck dei-update-q3
 *
 * What it does:
 *   1. Picks a sibling folder name from your slug.
 *   2. Creates that folder NEXT TO ctp-templates (so the relative `link:`
 *      to the theme always resolves):
 *        <parent>/
 *        ├── ctp-templates/
 *        └── <slug>/                  <-- new deck
 *   3. Generates:
 *        - package.json      (name = <slug>, Slidev pinned to ^0.49.0)
 *        - slides.md         (minimal cover + section + content + end)
 *        - public/brand/     (NYUAD logo copied from ctp-templates)
 *        - README.md         (run instructions for this deck)
 *        - .gitignore        (node_modules, dist, etc.)
 *   4. Prints the next two commands to run.
 *
 * Slidev is pinned to ^0.49.0 because v52 has a Windows path bug.
 * The pin can be relaxed once that fix ships upstream.
 */

import { existsSync, mkdirSync, readdirSync, writeFileSync, cpSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')               // ctp-templates/
const parentDir = resolve(repoRoot, '..')               // <parent>/  — where sibling decks live
const themeRel = '../ctp-templates/slidev'              // relative from new deck → theme

// ----- Parse + validate the slug ---------------------------------------------

const rawArg = process.argv[2]
if (!rawArg) {
  console.error('Usage: pnpm new-deck <kebab-slug>')
  console.error('Example: pnpm new-deck imaging-summit')
  process.exit(1)
}

const slug = rawArg
  .toLowerCase()
  .replace(/[^a-z0-9-]/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '')

if (!slug) {
  console.error(`Invalid slug: "${rawArg}". Use kebab-case letters and digits, e.g. imaging-summit.`)
  process.exit(1)
}

// ----- Make sure target doesn't already exist --------------------------------

const targetDir = join(parentDir, slug)

if (existsSync(targetDir)) {
  console.error(`Folder already exists at ${targetDir}.`)
  console.error('Pick a different slug or delete the existing folder.')
  process.exit(1)
}

// ----- Generate the deck -----------------------------------------------------

const today = new Date().toISOString().slice(0, 10)
const titleCase = slug
  .split('-')
  .map((w) => w[0].toUpperCase() + w.slice(1))
  .join(' ')

console.log(`Creating ${targetDir}/ ...`)

mkdirSync(targetDir, { recursive: true })
mkdirSync(join(targetDir, 'public', 'brand'), { recursive: true })
mkdirSync(join(targetDir, 'public', 'img'), { recursive: true })

// Copy the NYUAD lockup so /brand/nyuad-logo.png resolves in the running deck.
const brandSrc = join(repoRoot, 'shared', 'brand', 'nyuad-logo.png')
if (existsSync(brandSrc)) {
  cpSync(brandSrc, join(targetDir, 'public', 'brand', 'nyuad-logo.png'))
} else {
  console.warn(`Warning: brand asset not found at ${brandSrc}; skipping logo copy.`)
}

// package.json — Slidev pinned to ^0.49.0 because v52 has a Windows path bug.
writeFileSync(
  join(targetDir, 'package.json'),
  JSON.stringify(
    {
      name: slug,
      version: '0.1.0',
      private: true,
      description: `${titleCase} — a CTP presentation built with slidev-theme-ctp.`,
      scripts: {
        dev: 'slidev --open',
        build: 'slidev build',
        export: 'slidev export',
        'export:pdf': 'slidev export --format pdf',
      },
      dependencies: {
        // file: protocol — symlinks to the sibling ctp-templates repo.
        // (Equivalent to `link:` in pnpm but npm doesn't recognize `link:`,
        // so `file:` is the cross-tool-compatible choice. Both protocols
        // create a symlink in node_modules for local directory paths.)
        'slidev-theme-ctp': `file:${themeRel}`,
      },
      devDependencies: {
        // Pin to 0.49.x — v52 has a Windows path bug; drop the upper bound
        // once that's fixed upstream.
        '@slidev/cli': '^0.49.0',
        '@slidev/types': '^0.49.0',
        vue: '^3.4.0',
      },
    },
    null,
    2,
  ) + '\n',
)

// slides.md — minimal starter that exercises the theme's main layouts.
writeFileSync(
  join(targetDir, 'slides.md'),
  `---
theme: ctp
title: ${titleCase}
author: Your Name
info: |
  ${titleCase}.

  Replace this description with a one-paragraph summary of the talk.
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: fade
mdc: true
layout: cover
---

# ${titleCase}

::eyebrow::
<span class="ctp-tag ctp-tag--accent">CTP · NYUAD</span>

::meta::
Core Technology Platforms · NYU Abu Dhabi
${today}

<!--
Speaker notes for the cover slide.
-->

---
layout: default
---

# Outline

- Topic A
- Topic B
- Topic C

---
layout: section
---

::number::
PART 01

# First section

::subtitle::
Optional lede paragraph beneath the title.

---

# A content slide

Body content.

<CtpCallout label="Tip">
Use callouts to highlight a key takeaway.
</CtpCallout>

---
layout: end
---

# Thanks!

::meta::

Questions? Reach out via the CTP Upscaling channel.
`,
)

// README — run instructions specific to this deck.
writeFileSync(
  join(targetDir, 'README.md'),
  `# ${titleCase}

A CTP presentation built with [\`slidev-theme-ctp\`](../ctp-templates/slidev).

## Prerequisites

- **Node.js 18+** and **npm** (verify with \`node --version\` and \`npm --version\`).
- The sibling [\`ctp-templates\`](https://github.com/NYUAD-Core-Technology-Platforms/ctp-templates) repo checked out one level up from this folder.

## Run locally

\`\`\`bash
npm install
npx slidev
\`\`\`

The dev server prints \`http://localhost:3030/\`. Open that in your browser. Edits to \`slides.md\` hot-reload.

## Build / export

\`\`\`bash
npx slidev build            # static site → ./dist
npx slidev export           # PDF → ./slides-export.pdf
\`\`\`

PDF export requires Playwright (one-time install): \`npm install --save-dev playwright-chromium\`.

## Structure

- \`slides.md\` — the deck (edit this)
- \`public/img/\` — your deck-specific images
- \`public/brand/\` — NYUAD lockup, mirrored from \`ctp-templates/shared/brand/\`

For the full theme reference (every layout, every component, every CSS variable you can override), see [\`ctp-templates/slidev/README.md\`](../ctp-templates/slidev/README.md).
`,
)

// .gitignore — keep node_modules and build artifacts out of version control.
writeFileSync(
  join(targetDir, '.gitignore'),
  `# Dependencies
node_modules/
.pnpm-store/

# Slidev build artifacts
dist/
.slidev/
slides-export.pdf

# Editor / OS
.DS_Store
.vscode/
.idea/
*.swp
*~

# Logs
*.log
npm-debug.log*
`,
)

writeFileSync(join(targetDir, 'public', 'img', '.gitkeep'), '')

// ----- Done ------------------------------------------------------------------

console.log(`Created ${targetDir}/`)
console.log()
console.log('Next steps:')
console.log(`  cd ${targetDir}`)
console.log(`  npm install`)
console.log(`  npx slidev`)
console.log()
console.log(`Then edit slides.md to author the deck.`)
