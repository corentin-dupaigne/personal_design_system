const pptxgen = require('pptxgenjs');
const { FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
        INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y, COL_GAP,
        addHeader, addFooter, addInsightTitle, addHRule, addVRule } = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(pres, slide);
  addInsightTitle(slide, 'Four phases guide our annual strategic planning cycle');

  // ── Step configuration ────────────────────────────────────────────────────────
  const BOX_W  = 2.0;
  const BOX_H  = 2.6;
  const BOX_Y  = 1.5;
  const xPositions = [0.47, 2.65, 4.83, 7.01];

  const steps = [
    { num: '01', title: 'ASSESS',     desc: 'Gather market intelligence and internal performance data' },
    { num: '02', title: 'PRIORITISE', desc: 'Rank initiatives by impact, feasibility, and strategic fit' },
    { num: '03', title: 'PLAN',       desc: 'Allocate resources and set measurable 90-day milestones' },
    { num: '04', title: 'EXECUTE',    desc: 'Deploy with weekly cadence reviews and real-time dashboards' },
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
    const circleX = bx + BOX_W / 2 - 0.2;
    const circleY = BOX_Y + 0.15;
    slide.addShape(pres.ShapeType.ellipse, {
      x: circleX, y: circleY, w: 0.4, h: 0.4,
      fill: { color: C.accent },
      line: { type: 'none' },
    });

    // Number text
    slide.addText(step.num, { margin: 0.079,
      x: circleX, y: circleY, w: 0.4, h: 0.4,
      fontSize: 12, lineSpacing: 16, fontFace: FONT,
      color: C.bg, bold: true,
      align: 'center', valign: 'middle',
    });

    // Step title
    slide.addText(step.title, { margin: 0.079,
      x: bx + 0.08, y: BOX_Y + 0.68, w: BOX_W - 0.16, h: 0.35,
      fontSize: 11, lineSpacing: 14, fontFace: FONT,
      color: C.fg, bold: true,
      align: 'center', valign: 'middle',
      charSpacing: 0.8,
    });

    // Thin accent underline beneath title
    slide.addShape(pres.ShapeType.rect, {
      x: bx + BOX_W / 2 - 0.3, y: BOX_Y + 1.03, w: 0.6, h: 0.012,
      fill: { color: C.accent },
      line: { type: 'none' },
    });

    // Description
    slide.addText(step.desc, { margin: 0.079,
      x: bx + 0.15, y: BOX_Y + 1.1, w: BOX_W - 0.3, h: 1.35,
      fontSize: 8, lineSpacing: 10, fontFace: FONT,
      color: C.muted,
      align: 'center', valign: 'top',
      wrap: true,
    });

    // Connector line to next box
    if (i < steps.length - 1) {
      const connStartX = bx + BOX_W;
      const connEndX   = xPositions[i + 1];

      // Thin horizontal line at box vertical center
      slide.addShape(pres.ShapeType.rect, {
        x: connStartX, y: BOX_CENTER_Y - 0.005, w: connEndX - connStartX - 0.08, h: 0.01,
        fill: { color: C.borderStrong },
        line: { type: 'none' },
      });

      // Arrowhead: two small diagonal rects forming a > chevron
      slide.addShape(pres.ShapeType.rect, {
        x: connEndX - 0.09, y: BOX_CENTER_Y - 0.05, w: 0.08, h: 0.01,
        fill: { color: C.borderStrong },
        line: { type: 'none' },
        rotate: 45,
      });
      slide.addShape(pres.ShapeType.rect, {
        x: connEndX - 0.09, y: BOX_CENTER_Y + 0.04, w: 0.08, h: 0.01,
        fill: { color: C.borderStrong },
        line: { type: 'none' },
        rotate: -45,
      });
    }
  });

  addFooter(pres, slide, 25);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-25-preview.pptx' });
}

module.exports = { createSlide };
