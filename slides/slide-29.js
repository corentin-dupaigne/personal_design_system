// slide-29.js — PROS_CONS: Strengths and challenges balanced assessment
const pptxgen = require('pptxgenjs');
const {
  FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
  INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y,
  addHeader, addFooter, addInsightTitle, addHRule, addVRule,
} = require('./shared.js');

const STRENGTHS = [
  'Market-leading product in three out of four core segments',
  'Highly differentiated technology with 14 active patents',
  'Long-term customer contracts averaging 4.2 years',
  'Management team with deep domain expertise',
];

const CHALLENGES = [
  'Customer concentration risk: top 5 clients = 48% of revenue',
  'Geographic exposure to single macro region',
  'Product development cycle longer than key competitors',
  'Talent attrition above sector benchmark in engineering roles',
];

// Evenly space 4 bullets between y=1.5 and y=4.8
function bulletYPositions(count, startY, endY) {
  const positions = [];
  const step = (endY - startY) / (count - 1);
  for (let i = 0; i < count; i++) {
    positions.push(startY + i * step);
  }
  return positions;
}

const BULLET_START_Y = 1.55;
const BULLET_END_Y   = 4.5;
const BULLET_YS      = bulletYPositions(4, BULLET_START_Y, BULLET_END_Y);
const BULLET_H       = 0.6;
const VBAR_W         = 0.03; // ~2pt as inches
const VBAR_H         = 0.42;

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };

  addHeader(pres, slide);
  addInsightTitle(slide, 'A balanced assessment reveals four clear strengths and four material risks');

  // ── Vertical divider between columns ────────────────────────────────────────
  slide.addShape(pres.ShapeType.rect, {
    x: 4.97, y: 1.1, w: 0.01, h: 4.0,
    fill: { color: C.border },
    line: { type: 'none' },
  });

  // ── LEFT COLUMN — STRENGTHS ─────────────────────────────────────────────────
  const lx = 0.47;
  const lw = 4.3;

  slide.addText('STRENGTHS', { margin: 0.079,
    x: lx, y: 1.1, w: lw, h: 0.28,
    fontSize: 13, lineSpacing: 17, fontFace: FONT,
    color: C.success, bold: true, charSpacing: 1,
    valign: 'middle',
  });

  // Success rule below label
  slide.addShape(pres.ShapeType.rect, {
    x: lx, y: 1.38, w: lw, h: 0.015,
    fill: { color: C.success },
    line: { type: 'none' },
  });

  // Bullets
  BULLET_YS.forEach((by, i) => {
    // Left vertical accent bar
    slide.addShape(pres.ShapeType.rect, {
      x: lx, y: by, w: VBAR_W, h: VBAR_H,
      fill: { color: C.success },
      line: { type: 'none' },
    });
    // Bullet text
    slide.addText(STRENGTHS[i], { margin: 0.079,
      x: lx + VBAR_W + 0.1, y: by, w: lw - VBAR_W - 0.12, h: VBAR_H,
      fontSize: 11, lineSpacing: 14, fontFace: FONT,
      color: C.fg, valign: 'middle', wrap: true,
    });
  });

  // ── RIGHT COLUMN — CHALLENGES ───────────────────────────────────────────────
  const rx = 5.1;
  const rw = 4.43;

  slide.addText('CHALLENGES', { margin: 0.079,
    x: rx, y: 1.1, w: rw, h: 0.28,
    fontSize: 13, lineSpacing: 17, fontFace: FONT,
    color: C.danger, bold: true, charSpacing: 1,
    valign: 'middle',
  });

  // Danger rule below label
  slide.addShape(pres.ShapeType.rect, {
    x: rx, y: 1.38, w: rw, h: 0.015,
    fill: { color: C.danger },
    line: { type: 'none' },
  });

  // Bullets
  BULLET_YS.forEach((by, i) => {
    // Left vertical accent bar
    slide.addShape(pres.ShapeType.rect, {
      x: rx, y: by, w: VBAR_W, h: VBAR_H,
      fill: { color: C.danger },
      line: { type: 'none' },
    });
    // Bullet text
    slide.addText(CHALLENGES[i], { margin: 0.079,
      x: rx + VBAR_W + 0.1, y: by, w: rw - VBAR_W - 0.12, h: VBAR_H,
      fontSize: 11, lineSpacing: 14, fontFace: FONT,
      color: C.fg, valign: 'middle', wrap: true,
    });
  });

  addFooter(pres, slide, 29);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-29-preview.pptx' });
}

module.exports = { createSlide };
