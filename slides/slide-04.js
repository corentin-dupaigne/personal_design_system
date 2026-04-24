// slide-04.js — SECTION_DIVIDER
'use strict';

const pptxgen = require('pptxgenjs');
const {
  FONT, SW, SH, MARGIN,
  FOOTER_H, FOOTER_Y, FOOTER_LINE_Y,
  C, PT,
} = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();

  // ── Background (bgSubtle) ─────────────────────────────────────────────────
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: SW, h: SH,
    fill: { color: C.bgSubtle },
    line: { type: 'none' },
  });

  // ── 3pt vertical accent rule ──────────────────────────────────────────────
  // 3pt ≈ 0.03" at 96dpi; kept as a rect
  slide.addShape(pres.ShapeType.rect, {
    x: 1.1, y: 1.8, w: 0.03, h: 2.0,
    fill: { color: C.accent },
    line: { type: 'none' },
  });

  // ── Section index label ───────────────────────────────────────────────────
  slide.addText('02 / 05', { margin: 0.079,
    x: 1.4, y: 2.0, w: SW - 1.4 - MARGIN, h: 0.28,
    fontSize: 8, lineSpacing: 10, fontFace: FONT,
    color: C.muted, bold: true,
    charSpacing: 1.5,
    valign: 'middle',
  });

  // ── Section title ─────────────────────────────────────────────────────────
  slide.addText('Financial Performance\n& Variance Analysis', { margin: 0.079,
    x: 1.4, y: 2.3, w: SW - 1.4 - MARGIN - 0.5, h: 1.1,
    fontSize: 28, lineSpacing: 36, fontFace: FONT,
    color: C.fg, bold: true,
    valign: 'top',
  });

  // ── Footer separator line ─────────────────────────────────────────────────
  slide.addShape(pres.ShapeType.rect, {
    x: MARGIN, y: FOOTER_LINE_Y, w: SW - 2 * MARGIN, h: 0.01,
    fill: { color: C.border },
    line: { type: 'none' },
  });

  // ── Footer left ───────────────────────────────────────────────────────────
  slide.addText('Internal · Source: Internal Analysis', { margin: 0.079,
    x: MARGIN, y: FOOTER_Y, w: 6, h: FOOTER_H,
    fontSize: PT.footer, fontFace: FONT,
    color: C.muted, valign: 'middle',
  });

  // ── Footer right: slide number ────────────────────────────────────────────
  slide.addText('04', { margin: 0.079,
    x: SW - MARGIN - 1, y: FOOTER_Y, w: 1, h: FOOTER_H,
    fontSize: PT.footer, fontFace: FONT,
    color: C.muted, align: 'right', valign: 'middle',
  });

  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: '2c1f0e',
    secondary: '9a7f5e',
    accent: 'b8882a',
    light: 'f0ead9',
    bg: 'f7f3eb',
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-04-preview.pptx' });
}

module.exports = { createSlide };
