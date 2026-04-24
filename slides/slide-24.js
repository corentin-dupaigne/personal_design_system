const pptxgen = require('pptxgenjs');
const { FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
        INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y, COL_GAP,
        addHeader, addFooter, addInsightTitle, addHRule, addVRule } = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(pres, slide);
  addInsightTitle(slide, 'Three sequential steps define the customer onboarding experience');

  // ── Step configuration ────────────────────────────────────────────────────────
  const BOX_W  = 2.7;
  const BOX_H  = 2.8;
  const BOX_Y  = 1.5;
  const xPositions = [0.47, 3.37, 6.27];

  const steps = [
    { num: '01', title: 'DISCOVER', desc: 'Needs assessment and stakeholder alignment across key business units' },
    { num: '02', title: 'DESIGN',   desc: 'Solution architecture and implementation blueprint with defined milestones' },
    { num: '03', title: 'DEPLOY',   desc: 'Phased rollout with dedicated success management and change enablement' },
  ];

  const BOX_CENTER_Y = BOX_Y + BOX_H / 2;

  steps.forEach((step, i) => {
    const bx = xPositions[i];

    // Step box
    slide.addShape(pres.ShapeType.roundRect, {
      x: bx, y: BOX_Y, w: BOX_W, h: BOX_H,
      fill: { color: C.bgSurface },
      line: { color: C.border, pt: 1 },
      rectRadius: 0.04,
    });

    // Number circle
    const circleX = bx + BOX_W / 2 - 0.225;
    const circleY = BOX_Y + 0.15;
    slide.addShape(pres.ShapeType.ellipse, {
      x: circleX, y: circleY, w: 0.45, h: 0.45,
      fill: { color: C.accent },
      line: { type: 'none' },
    });

    // Number text
    slide.addText(step.num, { margin: 0.079,
      x: circleX, y: circleY, w: 0.45, h: 0.45,
      fontSize: 13, lineSpacing: 17, fontFace: FONT,
      color: C.bg, bold: true,
      align: 'center', valign: 'middle',
    });

    // Step title
    slide.addText(step.title, { margin: 0.079,
      x: bx + 0.1, y: BOX_Y + 0.75, w: BOX_W - 0.2, h: 0.35,
      fontSize: 13, lineSpacing: 17, fontFace: FONT,
      color: C.fg, bold: true,
      align: 'center', valign: 'middle',
      charSpacing: 1.0,
    });

    // Thin accent underline beneath title
    slide.addShape(pres.ShapeType.rect, {
      x: bx + BOX_W / 2 - 0.4, y: BOX_Y + 1.1, w: 0.8, h: 0.015,
      fill: { color: C.accent },
      line: { type: 'none' },
    });

    // Description
    slide.addText(step.desc, { margin: 0.079,
      x: bx + 0.2, y: BOX_Y + 1.15, w: BOX_W - 0.4, h: 1.5,
      fontSize: 9, lineSpacing: 12, fontFace: FONT,
      color: C.muted,
      align: 'center', valign: 'top',
      wrap: true,
    });

    // Connector arrow to next box
    if (i < steps.length - 1) {
      const connStartX = bx + BOX_W;
      const connEndX   = xPositions[i + 1];
      const connY      = BOX_CENTER_Y;

      // Connector line
      slide.addShape(pres.ShapeType.rect, {
        x: connStartX, y: connY - 0.005, w: connEndX - connStartX - 0.08, h: 0.01,
        fill: { color: C.borderStrong },
        line: { type: 'none' },
      });

      // Arrowhead: two small diagonal rects forming a > chevron
      slide.addShape(pres.ShapeType.rect, {
        x: connEndX - 0.1, y: connY - 0.06, w: 0.09, h: 0.01,
        fill: { color: C.borderStrong },
        line: { type: 'none' },
        rotate: 45,
      });
      slide.addShape(pres.ShapeType.rect, {
        x: connEndX - 0.1, y: connY + 0.05, w: 0.09, h: 0.01,
        fill: { color: C.borderStrong },
        line: { type: 'none' },
        rotate: -45,
      });
    }
  });

  addFooter(pres, slide, 24);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-24-preview.pptx' });
}

module.exports = { createSlide };
