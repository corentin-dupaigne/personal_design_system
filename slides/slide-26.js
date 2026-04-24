// slide-26.js — PROCESS_5: Enterprise sales motion, five steps
const pptxgen = require('pptxgenjs');
const {
  FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
  INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y,
  addHeader, addFooter, addInsightTitle, addHRule, addVRule,
} = require('./shared.js');

const STEPS = [
  { num: '01', title: 'QUALIFY',   desc: 'Need and budget confirmed' },
  { num: '02', title: 'DISCOVER',  desc: 'Pain points mapped to solutions' },
  { num: '03', title: 'PROPOSE',   desc: 'Tailored commercial offer built' },
  { num: '04', title: 'NEGOTIATE', desc: 'Terms agreed, legal reviewed' },
  { num: '05', title: 'CLOSE',     desc: 'Contract signed, kickoff booked' },
];

const BOX_XS = [0.47, 2.24, 4.01, 5.78, 7.55];
const BOX_W  = 1.6;
const BOX_H  = 2.5;
const BOX_Y  = 1.5;

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };

  addHeader(pres, slide);
  addInsightTitle(slide, 'Five steps define our enterprise sales motion from pipeline to close');

  // ── Process step boxes ──────────────────────────────────────────────────────
  STEPS.forEach((step, i) => {
    const x = BOX_XS[i];

    // Box background
    slide.addShape(pres.ShapeType.roundRect, {
      x, y: BOX_Y, w: BOX_W, h: BOX_H,
      fill: { color: C.bgSurface },
      line: { color: C.border, pt: 1 },
      rectRadius: 0.03,
    });

    // Number circle (oval centered horizontally in box)
    const circleD = 0.35;
    const circleX = x + (BOX_W - circleD) / 2;
    const circleY = BOX_Y + 0.18;
    slide.addShape(pres.ShapeType.ellipse, {
      x: circleX, y: circleY, w: circleD, h: circleD,
      fill: { color: C.accent },
      line: { type: 'none' },
    });

    // Number text
    slide.addText(step.num, { margin: 0.079,
      x: circleX, y: circleY, w: circleD, h: circleD,
      fontSize: 11, lineSpacing: 14, fontFace: FONT,
      color: C.bg, bold: true,
      align: 'center', valign: 'middle',
    });

    // Step title
    slide.addText(step.title, { margin: 0.079,
      x: x + 0.08, y: BOX_Y + 0.65, w: BOX_W - 0.16, h: 0.4,
      fontSize: 10, lineSpacing: 13, fontFace: FONT,
      color: C.fg, bold: true,
      align: 'center', valign: 'middle',
      charSpacing: 0.8,
    });

    // Description
    slide.addText(step.desc, { margin: 0.079,
      x: x + 0.08, y: BOX_Y + 1.1, w: BOX_W - 0.16, h: 1.15,
      fontSize: 8, lineSpacing: 10, fontFace: FONT,
      color: C.muted,
      align: 'center', valign: 'top',
      wrap: true,
    });
  });

  // ── Connector lines between boxes ───────────────────────────────────────────
  const connectorY = 2.75;
  for (let i = 0; i < STEPS.length - 1; i++) {
    const lineX = BOX_XS[i] + BOX_W;
    const lineW = BOX_XS[i + 1] - lineX;
    slide.addShape(pres.ShapeType.rect, {
      x: lineX, y: connectorY, w: lineW, h: 0.01,
      fill: { color: C.borderStrong },
      line: { type: 'none' },
    });
    // Arrow head triangle approximation with a small rect
    slide.addShape(pres.ShapeType.rect, {
      x: BOX_XS[i + 1] - 0.06, y: connectorY - 0.05, w: 0.06, h: 0.11,
      fill: { color: C.borderStrong },
      line: { type: 'none' },
    });
  }

  addFooter(pres, slide, 26);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-26-preview.pptx' });
}

module.exports = { createSlide };
