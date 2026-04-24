// slide-31.js — COMPARISON_3
const pptxgen = require('pptxgenjs');
const {
  FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
  INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y,
  addHeader, addFooter, addInsightTitle, addHRule,
} = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(pres, slide);
  addInsightTitle(slide, 'Option C provides the optimal balance of cost, speed, and long-term capability');

  const cardY   = 1.1;
  const cardH   = 4.0;
  const cardW   = 2.82;
  const xPos    = [0.47, 3.49, 6.51];

  // ── Card 1: Option A (Status Quo) ──────────────────────────────────────────
  const x1 = xPos[0];
  slide.addShape(pres.ShapeType.roundRect, {
    x: x1, y: cardY, w: cardW, h: cardH,
    fill: { color: C.bgSurface },
    line: { color: C.border, pt: 1 },
    rectRadius: 0.04,
  });
  slide.addText('OPTION A', { margin: 0.079,
    x: x1 + 0.18, y: cardY + 0.18, w: cardW - 0.36, h: 0.22,
    fontSize: 7, lineSpacing: 9, fontFace: FONT, color: C.muted, bold: true, charSpacing: 1.2,
  });
  slide.addText('Status Quo', { margin: 0.079,
    x: x1 + 0.18, y: cardY + 0.4, w: cardW - 0.36, h: 0.35,
    fontSize: 12, lineSpacing: 16, fontFace: FONT, color: C.fg, bold: true,
  });
  slide.addText('$0', { margin: 0.079,
    x: x1 + 0.18, y: cardY + 0.78, w: cardW - 0.36, h: 0.5,
    fontSize: 20, lineSpacing: 26, fontFace: FONT, color: C.muted, bold: true,
  });
  slide.addText('No change — manage existing constraints', { margin: 0.079,
    x: x1 + 0.18, y: cardY + 1.3, w: cardW - 0.36, h: 0.45,
    fontSize: 8, lineSpacing: 10, fontFace: FONT, color: C.muted,
  });
  const features1 = ['No implementation risk', 'Declining competitiveness', 'Rising maintenance costs'];
  features1.forEach((f, i) => {
    slide.addText('· ' + f, { margin: 0.079,
      x: x1 + 0.18, y: cardY + 1.82 + i * 0.35, w: cardW - 0.36, h: 0.32,
      fontSize: 9, lineSpacing: 12, fontFace: FONT, color: C.muted,
    });
  });

  // ── Card 2: Option B (Partial Upgrade) ─────────────────────────────────────
  const x2 = xPos[1];
  slide.addShape(pres.ShapeType.roundRect, {
    x: x2, y: cardY, w: cardW, h: cardH,
    fill: { color: C.bgSurface },
    line: { color: C.border, pt: 1 },
    rectRadius: 0.04,
  });
  slide.addText('OPTION B', { margin: 0.079,
    x: x2 + 0.18, y: cardY + 0.18, w: cardW - 0.36, h: 0.22,
    fontSize: 7, lineSpacing: 9, fontFace: FONT, color: C.muted, bold: true, charSpacing: 1.2,
  });
  slide.addText('Partial Upgrade', { margin: 0.079,
    x: x2 + 0.18, y: cardY + 0.4, w: cardW - 0.36, h: 0.35,
    fontSize: 12, lineSpacing: 16, fontFace: FONT, color: C.fg, bold: true,
  });
  slide.addText('$3.2M', { margin: 0.079,
    x: x2 + 0.18, y: cardY + 0.78, w: cardW - 0.36, h: 0.5,
    fontSize: 20, lineSpacing: 26, fontFace: FONT, color: C.fg, bold: true,
  });
  slide.addText('Selective modernisation of priority systems', { margin: 0.079,
    x: x2 + 0.18, y: cardY + 1.3, w: cardW - 0.36, h: 0.45,
    fontSize: 8, lineSpacing: 10, fontFace: FONT, color: C.muted,
  });
  const features2 = ['18-month horizon', 'Moderate disruption', 'Limited future-proofing'];
  features2.forEach((f, i) => {
    slide.addText('· ' + f, { margin: 0.079,
      x: x2 + 0.18, y: cardY + 1.82 + i * 0.35, w: cardW - 0.36, h: 0.32,
      fontSize: 9, lineSpacing: 12, fontFace: FONT, color: C.fg,
    });
  });

  // ── Card 3: Option C (Recommended) ─────────────────────────────────────────
  const x3 = xPos[2];
  slide.addShape(pres.ShapeType.roundRect, {
    x: x3, y: cardY, w: cardW, h: cardH,
    fill: { color: C.fg },
    line: { color: C.accent, pt: 2 },
    rectRadius: 0.04,
  });
  // RECOMMENDED badge
  slide.addShape(pres.ShapeType.rect, {
    x: x3 + 0.18, y: cardY + 0.13, w: 1.3, h: 0.22,
    fill: { color: C.accent },
    line: { type: 'none' },
  });
  slide.addText('RECOMMENDED', { margin: 0.079,
    x: x3 + 0.18, y: cardY + 0.13, w: 1.3, h: 0.22,
    fontSize: 7, lineSpacing: 9, fontFace: FONT, color: C.bg, bold: true,
    align: 'center', valign: 'middle', charSpacing: 0.8,
  });
  slide.addText('OPTION C', { margin: 0.079,
    x: x3 + 0.18, y: cardY + 0.4, w: cardW - 0.36, h: 0.22,
    fontSize: 7, lineSpacing: 9, fontFace: FONT, color: C.faint, bold: true, charSpacing: 1.2,
  });
  slide.addText('Full Transformation', { margin: 0.079,
    x: x3 + 0.18, y: cardY + 0.62, w: cardW - 0.36, h: 0.35,
    fontSize: 12, lineSpacing: 16, fontFace: FONT, color: C.bg, bold: true,
  });
  slide.addText('$5.8M', { margin: 0.079,
    x: x3 + 0.18, y: cardY + 1.0, w: cardW - 0.36, h: 0.5,
    fontSize: 20, lineSpacing: 26, fontFace: FONT, color: C.accent, bold: true,
  });
  slide.addText('Complete platform overhaul with sustained ROI', { margin: 0.079,
    x: x3 + 0.18, y: cardY + 1.52, w: cardW - 0.36, h: 0.45,
    fontSize: 8, lineSpacing: 10, fontFace: FONT, color: C.muted,
  });
  const features3 = ['12-month delivery', '340% 5-year ROI', 'Scalable architecture'];
  features3.forEach((f, i) => {
    slide.addText('· ' + f, { margin: 0.079,
      x: x3 + 0.18, y: cardY + 2.04 + i * 0.35, w: cardW - 0.36, h: 0.32,
      fontSize: 9, lineSpacing: 12, fontFace: FONT, color: C.bg,
    });
  });

  addFooter(pres, slide, 31);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-31-preview.pptx' });
}

module.exports = { createSlide };
