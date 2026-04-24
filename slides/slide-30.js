// slide-30.js — COMPARISON_2: Option A vs Option B, two-card layout
const pptxgen = require('pptxgenjs');
const {
  FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
  INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y,
  addHeader, addFooter, addInsightTitle, addHRule, addVRule,
} = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };

  addHeader(pres, slide);
  addInsightTitle(slide, 'Option B offers superior long-term value despite higher upfront investment');

  // ════════════════════════════════════════════════════════════════════════════
  // OPTION A — standard card
  // ════════════════════════════════════════════════════════════════════════════
  const aX = 0.47;
  const aY = 1.1;
  const aW = 4.3;
  const aH = 4.0;

  slide.addShape(pres.ShapeType.roundRect, {
    x: aX, y: aY, w: aW, h: aH,
    fill: { color: C.bgSurface },
    line: { color: C.border, pt: 1 },
    rectRadius: 0.04,
  });

  // Tag label "OPTION A"
  slide.addShape(pres.ShapeType.roundRect, {
    x: aX + 0.18, y: aY + 0.12, w: 0.9, h: 0.22,
    fill: { color: C.bgSurface },
    line: { color: C.border, pt: 0.75 },
    rectRadius: 0.02,
  });
  slide.addText('OPTION A', { margin: 0.079,
    x: aX + 0.18, y: aY + 0.12, w: 0.9, h: 0.22,
    fontSize: 7, lineSpacing: 9, fontFace: FONT,
    color: C.muted, bold: false,
    align: 'center', valign: 'middle',
    charSpacing: 0.8,
  });

  // Option title
  slide.addText('Incremental Optimisation', { margin: 0.079,
    x: aX + 0.18, y: aY + 0.42, w: aW - 0.3, h: 0.35,
    fontSize: 13, lineSpacing: 17, fontFace: FONT,
    color: C.fg, bold: true, valign: 'middle',
  });

  // Price
  slide.addText('$2.1M', { margin: 0.079,
    x: aX + 0.18, y: aY + 0.82, w: aW - 0.3, h: 0.5,
    fontSize: 22, lineSpacing: 29, fontFace: FONT,
    color: C.fg, bold: true, valign: 'middle',
  });

  // Description
  slide.addText('Targeted enhancements to existing infrastructure with minimal disruption', { margin: 0.079,
    x: aX + 0.18, y: aY + 1.38, w: aW - 0.3, h: 0.55,
    fontSize: 9, lineSpacing: 12, fontFace: FONT,
    color: C.muted, valign: 'top', wrap: true,
  });

  // Divider rule
  slide.addShape(pres.ShapeType.rect, {
    x: aX + 0.18, y: aY + 1.98, w: aW - 0.36, h: 0.01,
    fill: { color: C.border },
    line: { type: 'none' },
  });

  // Feature lines
  const aFeatures = [
    '+ 12–18 month implementation',
    '+ Low change management burden',
    '+ Limited performance uplift',
  ];
  aFeatures.forEach((feat, i) => {
    slide.addText(feat, { margin: 0.079,
      x: aX + 0.18, y: aY + 2.15 + i * 0.45, w: aW - 0.3, h: 0.38,
      fontSize: 9, lineSpacing: 12, fontFace: FONT,
      color: C.fg, valign: 'middle', wrap: true,
    });
  });

  // ════════════════════════════════════════════════════════════════════════════
  // OPTION B — recommended, highlighted card (slightly taller / lifted)
  // ════════════════════════════════════════════════════════════════════════════
  const bX = 5.0;
  const bY = 1.1;
  const bW = 4.53;
  const bH = 4.0;

  slide.addShape(pres.ShapeType.roundRect, {
    x: bX, y: bY, w: bW, h: bH,
    fill: { color: C.fg },
    line: { color: C.accent, pt: 2 },
    rectRadius: 0.04,
  });

  // "RECOMMENDED" badge — top right
  const badgeW = 1.25;
  const badgeH = 0.22;
  slide.addShape(pres.ShapeType.roundRect, {
    x: bX + bW - badgeW - 0.14, y: bY + 0.12, w: badgeW, h: badgeH,
    fill: { color: C.accent },
    line: { type: 'none' },
    rectRadius: 0.02,
  });
  slide.addText('RECOMMENDED', { margin: 0.079,
    x: bX + bW - badgeW - 0.14, y: bY + 0.12, w: badgeW, h: badgeH,
    fontSize: 7, lineSpacing: 9, fontFace: FONT,
    color: C.bg, bold: true,
    align: 'center', valign: 'middle',
    charSpacing: 0.8,
  });

  // Option title
  slide.addText('Platform Transformation', { margin: 0.079,
    x: bX + 0.18, y: bY + 0.42, w: bW - 1.5, h: 0.35,
    fontSize: 13, lineSpacing: 17, fontFace: FONT,
    color: C.bg, bold: true, valign: 'middle',
  });

  // Price
  slide.addText('$5.8M', { margin: 0.079,
    x: bX + 0.18, y: bY + 0.82, w: bW - 0.3, h: 0.5,
    fontSize: 22, lineSpacing: 29, fontFace: FONT,
    color: C.accent, bold: true, valign: 'middle',
  });

  // Description
  slide.addText('End-to-end modernisation delivering sustained competitive advantage', { margin: 0.079,
    x: bX + 0.18, y: bY + 1.38, w: bW - 0.3, h: 0.55,
    fontSize: 9, lineSpacing: 12, fontFace: FONT,
    color: C.muted, valign: 'top', wrap: true,
  });

  // Divider rule (faint on dark bg)
  slide.addShape(pres.ShapeType.rect, {
    x: bX + 0.18, y: bY + 1.98, w: bW - 0.36, h: 0.01,
    fill: { color: C.faint },
    line: { type: 'none' },
  });

  // Feature lines
  const bFeatures = [
    '→ 8–12 month full deployment',
    '→ 340% projected 5-year ROI',
    '→ Future-proof architecture',
  ];
  bFeatures.forEach((feat, i) => {
    slide.addText(feat, { margin: 0.079,
      x: bX + 0.18, y: bY + 2.15 + i * 0.45, w: bW - 0.3, h: 0.38,
      fontSize: 9, lineSpacing: 12, fontFace: FONT,
      color: C.bg, valign: 'middle', wrap: true,
    });
  });

  addFooter(pres, slide, 30);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-30-preview.pptx' });
}

module.exports = { createSlide };
