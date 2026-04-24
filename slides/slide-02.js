// slide-02.js — TITLE_LIGHT cover slide
'use strict';

const pptxgen = require('pptxgenjs');
const {
  FONT, SW, SH, MARGIN,
  FOOTER_H, FOOTER_Y, FOOTER_LINE_Y,
  C, PT,
} = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();

  // ── Light background (bgSubtle) ───────────────────────────────────────────
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: SW, h: SH,
    fill: { color: C.bgSubtle },
    line: { type: 'none' },
  });

  // ── Vertical accent rule (left of text block) ─────────────────────────────
  // 3pt wide ≈ 0.03"
  slide.addShape(pres.ShapeType.rect, {
    x: 0.85, y: 1.8, w: 0.03, h: 1.8,
    fill: { color: C.accent },
    line: { type: 'none' },
  });

  // ── Large title ───────────────────────────────────────────────────────────
  slide.addText('Strategic Performance Review', { margin: 0.079,
    x: 1.2, y: 2.1, w: SW - 1.2 - MARGIN, h: 0.65,
    fontSize: 32, lineSpacing: 42, fontFace: FONT,
    color: C.fg, bold: true,
    valign: 'middle',
  });

  // ── Subtitle ──────────────────────────────────────────────────────────────
  slide.addText('Enterprise Operations · Full Year Analysis', { margin: 0.079,
    x: 1.2, y: 2.8, w: SW - 1.2 - MARGIN, h: 0.38,
    fontSize: 13, lineSpacing: 17, fontFace: FONT,
    color: C.muted,
    valign: 'middle',
  });

  // ── Author ────────────────────────────────────────────────────────────────
  slide.addText('J. MARTINEZ, CHIEF STRATEGY OFFICER', { margin: 0.079,
    x: 1.2, y: 3.35, w: SW - 1.2 - MARGIN, h: 0.28,
    fontSize: 9, lineSpacing: 12, fontFace: FONT,
    color: C.muted,
    valign: 'middle',
  });

  // ── Date ──────────────────────────────────────────────────────────────────
  slide.addText('April 2026', { margin: 0.079,
    x: 1.2, y: 3.68, w: SW - 1.2 - MARGIN, h: 0.25,
    fontSize: 9, lineSpacing: 12, fontFace: FONT,
    color: C.muted,
    valign: 'middle',
  });

  // ── Footer separator line ─────────────────────────────────────────────────
  slide.addShape(pres.ShapeType.rect, {
    x: MARGIN, y: FOOTER_LINE_Y, w: SW - 2 * MARGIN, h: 0.01,
    fill: { color: C.border },
    line: { type: 'none' },
  });

  // ── Footer left ───────────────────────────────────────────────────────────
  slide.addText('Confidential', { margin: 0.079,
    x: MARGIN, y: FOOTER_Y, w: 6, h: FOOTER_H,
    fontSize: PT.footer, fontFace: FONT,
    color: C.muted, valign: 'middle',
  });

  // ── Footer right: slide number ────────────────────────────────────────────
  slide.addText('02', { margin: 0.079,
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
  pres.writeFile({ fileName: './output/slide-02-preview.pptx' });
}

module.exports = { createSlide };
