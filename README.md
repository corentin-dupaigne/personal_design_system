# system_design

A warm, monospaced design system and a matching 40-slide PowerPoint master deck generated from it.

The design system defines tokens (color, type, spacing, radius, motion) in a single HTML reference. The slide generator reuses those tokens to produce a consistent `.pptx` deck via [pptxgenjs](https://github.com/gitbrent/PptxGenJS).

## Structure

```
system_design/
├── system-design.html     # design tokens + component reference (open in a browser)
└── slides/
    ├── compile.js         # assembles all 40 slide modules into master-deck.pptx
    ├── shared.js          # shared tokens, layout constants, and helpers
    ├── slide-01.js …      # one module per slide, exporting createSlide(pres, theme)
    ├── slide-40.js
    ├── patch_fixes.js     # one-off codemod for addText margin/lineSpacing
    ├── package.json
    └── output/            # generated .pptx (gitignored)
```

## Design tokens

Defined as CSS custom properties in `system-design.html` and mirrored as JS constants in `slides/shared.js`.

- Palette — warm neutrals on `#f7f3eb`, accent `#b8882a`, semantic success / warning / danger / info
- Type — `IBM Plex Mono`, separate scales for slides (pt) and web (rem)
- Spacing — 11-step scale from `0.25rem` to `6rem`
- Slide layout — 10 × 5.625 in canvas, 1.2 cm safe margin, 1 cm header, 0.7 cm footer, 0.3 cm minimum element gap

When editing tokens, update both the HTML `:root` block and the `C` / `PT` objects in `shared.js` to keep the deck and the reference in sync.

## Generating the deck

```sh
cd slides
npm install
node compile.js
```

Output is written to `slides/output/master-deck.pptx`. Each slide module is required in order; a failure in any module aborts the build with the module name.

## Adding a slide

1. Create `slides/slide-NN.js` exporting `createSlide(pres, theme)`.
2. Import layout constants and helpers from `./shared.js` (`addHeader`, `addFooter`, `addInsightTitle`, `addStatCard`, etc.) rather than hard-coding coordinates.
3. Bump the loop bound in `compile.js` if you are extending past slide 40.

## Viewing the design reference

Open `system-design.html` directly in a browser — no build step.
