// slide-40.js — TOKEN_REFERENCE
// Internal design token reference: colors, typography, spacing.

const pptxgen = require('pptxgenjs');
const { FONT, C, PT, SW, SH, MARGIN,
        addHeader, addFooter, addInsightTitle } = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };

  addHeader(pres, slide);
  addInsightTitle(slide, 'Design Token Reference — colors, typography, and spacing scale');

  // ── SECTION 1: Color Palette ────────────────────────────────────────────────

  slide.addText('COLOR PALETTE', { margin: 0.079,
    x: MARGIN, y: 1.1, w: 3, h: 0.18,
    fontSize: 8, lineSpacing: 10, fontFace: FONT,
    color: C.muted, bold: true,
    charSpacing: 1.5,
    valign: 'middle',
  });

  const swatchColors = [
    C.bg, C.bgSubtle, C.bgSurface, C.bgOverlay, C.fg,
    C.muted, C.faint, C.accent, C.border, C.borderStrong,
  ];
  const swatchHexLabels = [
    '#f7f3eb', '#f0ead9', '#ede6d6', '#e6dcc8', '#2c1f0e',
    '#9a7f5e', '#c4a882', '#b8882a', '#d9c8a9', '#c4a882',
  ];
  const swatchTokenLabels = [
    '--bg', '--bg-subtle', '--bg-surface', '--bg-overlay', '--fg',
    '--muted', '--faint', '--accent', '--border', '--border-strong',
  ];
  const swatchXPositions = [0.47, 1.37, 2.27, 3.17, 4.07, 4.97, 5.87, 6.77, 7.67, 8.57];
  const swatchW = 0.75;
  const swatchH = 0.3;
  const swatchY = 1.3;

  swatchColors.forEach((color, i) => {
    const x = swatchXPositions[i];

    // Swatch rect
    slide.addShape(pres.ShapeType.rect, {
      x, y: swatchY, w: swatchW, h: swatchH,
      fill: { color },
      line: { color: C.border, pt: 0.5 },
    });

    // Hex label below swatch
    slide.addText(swatchHexLabels[i], { margin: 0.079,
      x, y: 1.65, w: swatchW, h: 0.2,
      fontSize: 8, lineSpacing: 10, fontFace: FONT,
      color: C.faint,
      align: 'center', valign: 'middle',
    });

    // Token name further below
    slide.addText(swatchTokenLabels[i], { margin: 0.079,
      x, y: 1.9, w: swatchW, h: 0.18,
      fontSize: 7, lineSpacing: 9, fontFace: FONT,
      color: C.faint,
      align: 'center', valign: 'middle',
    });
  });

  // ── SECTION 2: Semantic Colors ───────────────────────────────────────────────

  slide.addText('SEMANTIC', { margin: 0.079,
    x: MARGIN, y: 2.2, w: 3, h: 0.18,
    fontSize: 8, lineSpacing: 10, fontFace: FONT,
    color: C.muted, bold: true,
    charSpacing: 1.5,
    valign: 'middle',
  });

  const semanticColors  = [C.success, C.warning, C.danger, C.info];
  const semanticTokens  = ['--success', '--warning', '--danger', '--info'];
  const semanticXPos    = [0.47, 1.85, 3.23, 4.61];
  const semanticW       = 1.2;

  semanticColors.forEach((color, i) => {
    const x = semanticXPos[i];

    slide.addShape(pres.ShapeType.rect, {
      x, y: 2.4, w: semanticW, h: 0.3,
      fill: { color },
      line: { type: 'none' },
    });

    slide.addText(semanticTokens[i], { margin: 0.079,
      x, y: 2.75, w: semanticW, h: 0.18,
      fontSize: 7, lineSpacing: 9, fontFace: FONT,
      color: C.faint,
      align: 'center', valign: 'middle',
    });
  });

  // ── SECTION 3: Type Scale ────────────────────────────────────────────────────

  slide.addText('TYPE SCALE (PT)', { margin: 0.079,
    x: MARGIN, y: 3.0, w: 4, h: 0.18,
    fontSize: 8, lineSpacing: 10, fontFace: FONT,
    color: C.muted, bold: true,
    charSpacing: 1.5,
    valign: 'middle',
  });

  // Row 1 — type specimens
  const typeRow1 = [
    { token: 'insight-title', size: '22pt' },
    { token: 'section-header', size: '13pt' },
    { token: 'body', size: '11pt' },
    { token: 'stat-value', size: '36pt' },
  ];
  const typeRow2 = [
    { token: 'stat-label', size: '8pt' },
    { token: 'caption', size: '8pt' },
    { token: 'footer', size: '7pt' },
    { token: 'header-brand', size: '7pt' },
  ];
  const typeXPositions = [0.47, 2.7, 5.0, 7.3];
  const typeColW = 2.0;

  const renderTypeRow = (row, y) => {
    row.forEach((spec, i) => {
      const x = typeXPositions[i];
      // Token name (7pt faint)
      slide.addText(spec.token, { margin: 0.079,
        x, y, w: typeColW, h: 0.18,
        fontSize: 7, lineSpacing: 9, fontFace: FONT,
        color: C.faint,
        valign: 'middle',
      });
      // Size value (8pt fg)
      slide.addText(spec.size, { margin: 0.079,
        x, y: y + 0.16, w: typeColW, h: 0.2,
        fontSize: 8, lineSpacing: 10, fontFace: FONT,
        color: C.fg,
        valign: 'middle',
      });
    });
  };

  renderTypeRow(typeRow1, 3.2);
  renderTypeRow(typeRow2, 3.6);

  // ── SECTION 4: Spacing Scale ─────────────────────────────────────────────────

  slide.addText('SPACING SCALE', { margin: 0.079,
    x: MARGIN, y: 4.0, w: 4, h: 0.18,
    fontSize: 8, lineSpacing: 10, fontFace: FONT,
    color: C.muted, bold: true,
    charSpacing: 1.5,
    valign: 'middle',
  });

  const spacingItems = [
    { x: 0.47, barW: 0.5,  label: '--space-1 / 0.25rem' },
    { x: 2.0,  barW: 0.7,  label: '--space-4 / 0.75rem' },
    { x: 3.8,  barW: 0.9,  label: '--space-5 / 1.0rem'  },
    { x: 5.8,  barW: 1.4,  label: '--space-8 / 2.0rem'  },
  ];

  spacingItems.forEach(({ x, barW, label }) => {
    // Bar
    slide.addShape(pres.ShapeType.rect, {
      x, y: 4.25, w: barW, h: 0.08,
      fill: { color: C.accent },
      line: { type: 'none' },
    });
    // Label below bar
    slide.addText(label, { margin: 0.079,
      x, y: 4.38, w: 2.0, h: 0.18,
      fontSize: 7, lineSpacing: 9, fontFace: FONT,
      color: C.faint,
      valign: 'middle',
    });
  });

  addFooter(pres, slide, 40);

  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a',
    light: 'f0ead9', bg: 'f7f3eb',
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-40-preview.pptx' });
}

module.exports = { createSlide };
