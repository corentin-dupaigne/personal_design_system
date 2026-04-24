// slide-28.js — PYRAMID: Four-level organisational maturity progression
const pptxgen = require('pptxgenjs');
const {
  FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
  INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y,
  addHeader, addFooter, addInsightTitle, addHRule, addVRule,
} = require('./shared.js');

const LEVELS = [
  {
    x: 3.7,  y: 1.3,  w: 2.6, h: 0.7,
    fill: C.fg,       textColor: C.bg,
    label: 'VISION',
    annotation: 'Defined future state', annotY: 1.6,
    lineFromX: 3.7 + 2.6, // right edge of rect
  },
  {
    x: 3.1,  y: 2.05, w: 3.8, h: 0.7,
    fill: C.muted,    textColor: C.bg,
    label: 'STRATEGY',
    annotation: 'Multi-year priorities', annotY: 2.35,
    lineFromX: 3.1 + 3.8,
  },
  {
    x: 2.5,  y: 2.8,  w: 5.0, h: 0.7,
    fill: C.accent,   textColor: C.bg,
    label: 'CAPABILITY',
    annotation: 'Processes and tools', annotY: 3.1,
    lineFromX: 2.5 + 5.0,
  },
  {
    x: 1.8,  y: 3.55, w: 6.4, h: 0.7,
    fill: C.bgOverlay, textColor: C.fg,
    label: 'FOUNDATION',
    annotation: 'People, data, culture', annotY: 3.85,
    lineFromX: 1.8 + 6.4,
  },
];

const ANNOT_X      = 8.3;
const ANNOT_W      = 1.5;
const CONNECTOR_TO = 8.28; // where connector line meets annotation

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };

  addHeader(pres, slide);
  addInsightTitle(slide, 'Organisational maturity follows a four-level progression');

  // ── Pyramid levels ──────────────────────────────────────────────────────────
  LEVELS.forEach((lvl) => {
    // Level rect
    slide.addShape(pres.ShapeType.rect, {
      x: lvl.x, y: lvl.y, w: lvl.w, h: lvl.h,
      fill: { color: lvl.fill },
      line: { type: 'none' },
    });

    // Label text centered in rect
    slide.addText(lvl.label, { margin: 0.079,
      x: lvl.x, y: lvl.y, w: lvl.w, h: lvl.h,
      fontSize: 11, lineSpacing: 14, fontFace: FONT,
      color: lvl.textColor, bold: true,
      align: 'center', valign: 'middle',
      charSpacing: 1,
    });

    // Connector line: from right edge of rect to annotation area
    const lineStartX = lvl.x + lvl.w;
    const lineMidY   = lvl.y + lvl.h / 2;
    const lineW      = CONNECTOR_TO - lineStartX;
    if (lineW > 0) {
      slide.addShape(pres.ShapeType.rect, {
        x: lineStartX, y: lineMidY, w: lineW, h: 0.01,
        fill: { color: C.borderStrong },
        line: { type: 'none' },
      });
    }

    // Annotation text
    slide.addText(lvl.annotation, { margin: 0.079,
      x: ANNOT_X, y: lvl.annotY - 0.15, w: ANNOT_W, h: 0.3,
      fontSize: 9, lineSpacing: 12, fontFace: FONT,
      color: C.muted, valign: 'middle',
    });
  });

  addFooter(pres, slide, 28);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-28-preview.pptx' });
}

module.exports = { createSlide };
