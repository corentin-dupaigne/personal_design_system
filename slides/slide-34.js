// slide-34.js — ROADMAP
const pptxgen = require('pptxgenjs');
const {
  FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
  INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y,
  addHeader, addFooter, addInsightTitle,
} = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(pres, slide);
  addInsightTitle(slide, 'Four delivery phases span 18 months from programme launch to full benefit realisation');

  // Timeline spine
  slide.addShape(pres.ShapeType.rect, {
    x: 0.47, y: 2.5, w: 9.06, h: 0.04,
    fill: { color: C.border },
    line: { type: 'none' },
  });

  const xStarts    = [0.47, 2.72, 4.97, 7.22];
  const phaseW     = 2.0;
  const barW       = 1.9;
  const phaseLabels = ['PHASE 1', 'PHASE 2', 'PHASE 3', 'PHASE 4'];
  const barFills    = [C.accent, C.muted, C.muted, C.borderStrong];
  const dateRanges  = ['Jan–Mar 2026', 'Apr–Jun 2026', 'Jul–Sep 2026', 'Oct–Dec 2026'];
  const deliverables = [
    ['Governance structure', 'Technology assessment', 'Quick win delivery'],
    ['Core platform migration', 'Process redesign', 'Capability building'],
    ['Full deployment', 'Integration testing', 'Performance tuning'],
    ['Benefits realisation', 'Sustainability review', 'Optimisation cycle'],
  ];

  xStarts.forEach((x, i) => {
    // Date range above bar
    slide.addText(dateRanges[i], { margin: 0.079,
      x: x, y: 1.95, w: phaseW, h: 0.28,
      fontSize: 8, lineSpacing: 10, fontFace: FONT,
      color: C.muted, align: 'center',
    });

    // Phase bar
    slide.addShape(pres.ShapeType.rect, {
      x: x, y: 2.3, w: barW, h: 0.4,
      fill: { color: barFills[i] },
      line: { type: 'none' },
    });

    // Phase label inside bar
    slide.addText(phaseLabels[i], { margin: 0.079,
      x: x, y: 2.3, w: barW, h: 0.4,
      fontSize: 9, lineSpacing: 12, fontFace: FONT,
      color: C.bg, bold: true,
      align: 'center', valign: 'middle',
      charSpacing: 0.8,
    });

    // Connector dot on spine
    slide.addShape(pres.ShapeType.ellipse, {
      x: x + barW / 2 - 0.05, y: 2.47, w: 0.1, h: 0.1,
      fill: { color: barFills[i] },
      line: { type: 'none' },
    });

    // Deliverables below
    deliverables[i].forEach((d, j) => {
      slide.addText('· ' + d, { margin: 0.079,
        x: x + 0.05, y: 2.85 + j * 0.38, w: 1.9, h: 0.35,
        fontSize: 8, lineSpacing: 10, fontFace: FONT,
        color: C.fg,
      });
    });
  });

  addFooter(pres, slide, 34);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-34-preview.pptx' });
}

module.exports = { createSlide };
