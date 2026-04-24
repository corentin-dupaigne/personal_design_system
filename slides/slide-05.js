// slide-05.js — CLOSING_DARK
'use strict';

const pptxgen = require('pptxgenjs');
const {
  FONT, SW, SH, MARGIN,
  FOOTER_H, FOOTER_Y, FOOTER_LINE_Y,
  C, PT,
} = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();

  // ── Full dark background ──────────────────────────────────────────────────
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: SW, h: SH,
    fill: { color: C.fg },
    line: { type: 'none' },
  });

  // ── Closing line ──────────────────────────────────────────────────────────
  slide.addText('Questions & Next Steps', { margin: 0.079,
    x: 1.2, y: 2.0, w: SW - 1.2 - MARGIN, h: 0.6,
    fontSize: 28, lineSpacing: 36, fontFace: FONT,
    color: C.bg, bold: true,
    valign: 'middle',
  });

  // ── Horizontal accent rule (2" wide, ~3pt thick = 0.03") ─────────────────
  slide.addShape(pres.ShapeType.rect, {
    x: 1.2, y: 2.65, w: 2.0, h: 0.03,
    fill: { color: C.accent },
    line: { type: 'none' },
  });

  // ── Contact line ──────────────────────────────────────────────────────────
  slide.addText('strategy@company.com  ·  +1 (415) 555-0182', { margin: 0.079,
    x: 1.2, y: 2.85, w: SW - 1.2 - MARGIN, h: 0.32,
    fontSize: 11, lineSpacing: 14, fontFace: FONT,
    color: C.muted,
    valign: 'middle',
  });

  // ── Deck name ─────────────────────────────────────────────────────────────
  slide.addText('Strategic Performance Review · April 2026', { margin: 0.079,
    x: 1.2, y: 5.1, w: SW - 1.2 - MARGIN, h: 0.22,
    fontSize: PT.footer, fontFace: FONT,
    color: C.faint,
    valign: 'middle',
  });

  // ── Footer separator line ─────────────────────────────────────────────────
  slide.addShape(pres.ShapeType.rect, {
    x: MARGIN, y: FOOTER_LINE_Y, w: SW - 2 * MARGIN, h: 0.01,
    fill: { color: C.faint },
    line: { type: 'none' },
  });

  // ── Footer left: Confidential ─────────────────────────────────────────────
  slide.addText('Confidential', { margin: 0.079,
    x: MARGIN, y: FOOTER_Y, w: 6, h: FOOTER_H,
    fontSize: PT.footer, fontFace: FONT,
    color: C.faint, valign: 'middle',
  });

  // ── Footer right: slide number ────────────────────────────────────────────
  slide.addText('05', { margin: 0.079,
    x: SW - MARGIN - 1, y: FOOTER_Y, w: 1, h: FOOTER_H,
    fontSize: PT.footer, fontFace: FONT,
    color: C.faint, align: 'right', valign: 'middle',
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
  pres.writeFile({ fileName: './output/slide-05-preview.pptx' });
}

module.exports = { createSlide };
