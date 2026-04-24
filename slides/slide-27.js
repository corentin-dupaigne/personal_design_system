// slide-27.js — MATRIX_2X2: Prioritisation matrix, impact vs effort
const pptxgen = require('pptxgenjs');
const {
  FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
  INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y,
  addHeader, addFooter, addInsightTitle, addHRule, addVRule,
} = require('./shared.js');

const GRID_X = 0.47;
const GRID_Y = 1.1;
const GRID_W = 9.06;
const GRID_H = 4.0;
const MID_X  = GRID_X + GRID_W / 2; // 4.97
const MID_Y  = GRID_Y + GRID_H / 2; // 3.175

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };

  addHeader(pres, slide);
  addInsightTitle(slide, 'Prioritisation matrix: impact vs implementation effort for 2026 initiatives');

  // ── Quadrant fills ──────────────────────────────────────────────────────────
  // TL — Quick Wins (high impact, low effort)
  slide.addShape(pres.ShapeType.rect, {
    x: GRID_X, y: GRID_Y, w: MID_X - GRID_X, h: MID_Y - GRID_Y,
    fill: { color: C.bgSubtle },
    line: { type: 'none' },
  });
  // TR — Strategic Bets (high impact, high effort)
  slide.addShape(pres.ShapeType.rect, {
    x: MID_X, y: GRID_Y, w: GRID_X + GRID_W - MID_X, h: MID_Y - GRID_Y,
    fill: { color: C.bg },
    line: { type: 'none' },
  });
  // BL — Fill-ins (low impact, low effort)
  slide.addShape(pres.ShapeType.rect, {
    x: GRID_X, y: MID_Y, w: MID_X - GRID_X, h: GRID_Y + GRID_H - MID_Y,
    fill: { color: C.bg },
    line: { type: 'none' },
  });
  // BR — Deprioritise (low impact, high effort)
  slide.addShape(pres.ShapeType.rect, {
    x: MID_X, y: MID_Y, w: GRID_X + GRID_W - MID_X, h: GRID_Y + GRID_H - MID_Y,
    fill: { color: C.bgSurface },
    line: { type: 'none' },
  });

  // ── Outer border ────────────────────────────────────────────────────────────
  slide.addShape(pres.ShapeType.rect, {
    x: GRID_X, y: GRID_Y, w: GRID_W, h: GRID_H,
    fill: { type: 'none' },
    line: { color: C.border, pt: 1 },
  });

  // ── Dividers ────────────────────────────────────────────────────────────────
  // Vertical divider
  slide.addShape(pres.ShapeType.rect, {
    x: MID_X, y: GRID_Y, w: 0.01, h: GRID_H,
    fill: { color: C.border },
    line: { type: 'none' },
  });
  // Horizontal divider
  slide.addShape(pres.ShapeType.rect, {
    x: GRID_X, y: MID_Y, w: GRID_W, h: 0.01,
    fill: { color: C.border },
    line: { type: 'none' },
  });

  // ── Axis labels ─────────────────────────────────────────────────────────────
  // Bottom label
  slide.addText('← Lower Effort    Higher Effort →', { margin: 0.079,
    x: 1, y: 4.82, w: 8, h: 0.2,
    fontSize: 8, lineSpacing: 10, fontFace: FONT,
    color: C.muted, align: 'center', valign: 'middle',
  });
  // Left label (vertical impression via newlines)
  slide.addText('↑ High Impact\n\n\n\n↓ Low Impact', { margin: 0.079,
    x: 0.05, y: 1.2, w: 0.4, h: 3.8,
    fontSize: 8, lineSpacing: 10, fontFace: FONT,
    color: C.muted, align: 'center', valign: 'top',
    wrap: true,
  });

  // ── Quadrant content ────────────────────────────────────────────────────────
  // TL: Quick Wins
  slide.addText('QUICK WINS', { margin: 0.079,
    x: 0.6, y: 1.15, w: 4.2, h: 0.3,
    fontSize: 10, lineSpacing: 13, fontFace: FONT,
    color: C.accent, bold: true, charSpacing: 0.8,
    valign: 'middle',
  });
  slide.addText('Automate weekly reporting pipeline', { margin: 0.079,
    x: 0.6, y: 1.52, w: 4.2, h: 0.25,
    fontSize: 9, lineSpacing: 12, fontFace: FONT, color: C.fg, valign: 'middle',
  });
  slide.addText('Consolidate vendor contracts', { margin: 0.079,
    x: 0.6, y: 1.82, w: 4.2, h: 0.25,
    fontSize: 9, lineSpacing: 12, fontFace: FONT, color: C.fg, valign: 'middle',
  });

  // TR: Strategic Bets
  slide.addText('STRATEGIC BETS', { margin: 0.079,
    x: 5.1, y: 1.15, w: 4.2, h: 0.3,
    fontSize: 10, lineSpacing: 13, fontFace: FONT,
    color: C.fg, bold: true, charSpacing: 0.8,
    valign: 'middle',
  });
  slide.addText('Full ERP platform migration', { margin: 0.079,
    x: 5.1, y: 1.52, w: 4.2, h: 0.25,
    fontSize: 9, lineSpacing: 12, fontFace: FONT, color: C.fg, valign: 'middle',
  });
  slide.addText('International market expansion', { margin: 0.079,
    x: 5.1, y: 1.82, w: 4.2, h: 0.25,
    fontSize: 9, lineSpacing: 12, fontFace: FONT, color: C.fg, valign: 'middle',
  });

  // BL: Fill-ins
  slide.addText('FILL-INS', { margin: 0.079,
    x: 0.6, y: 3.25, w: 4.2, h: 0.3,
    fontSize: 10, lineSpacing: 13, fontFace: FONT,
    color: C.muted, bold: true, charSpacing: 0.8,
    valign: 'middle',
  });
  slide.addText('Office layout optimisation', { margin: 0.079,
    x: 0.6, y: 3.62, w: 4.2, h: 0.25,
    fontSize: 9, lineSpacing: 12, fontFace: FONT, color: C.fg, valign: 'middle',
  });
  slide.addText('Minor UX improvements', { margin: 0.079,
    x: 0.6, y: 3.92, w: 4.2, h: 0.25,
    fontSize: 9, lineSpacing: 12, fontFace: FONT, color: C.fg, valign: 'middle',
  });

  // BR: Deprioritise
  slide.addText('DEPRIORITISE', { margin: 0.079,
    x: 5.1, y: 3.25, w: 4.2, h: 0.3,
    fontSize: 10, lineSpacing: 13, fontFace: FONT,
    color: C.danger, bold: true, charSpacing: 0.8,
    valign: 'middle',
  });
  slide.addText('Legacy reporting system rebuild', { margin: 0.079,
    x: 5.1, y: 3.62, w: 4.2, h: 0.25,
    fontSize: 9, lineSpacing: 12, fontFace: FONT, color: C.fg, valign: 'middle',
  });
  slide.addText('Low-margin product extensions', { margin: 0.079,
    x: 5.1, y: 3.92, w: 4.2, h: 0.25,
    fontSize: 9, lineSpacing: 12, fontFace: FONT, color: C.fg, valign: 'middle',
  });

  addFooter(pres, slide, 27);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-27-preview.pptx' });
}

module.exports = { createSlide };
