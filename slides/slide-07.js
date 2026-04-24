const pptxgen = require('pptxgenjs');
const {
  FONT, C, PT, SW, SH, MARGIN, HEADER_H, FOOTER_Y, FOOTER_LINE_Y,
  INSIGHT_Y, INSIGHT_H, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
  COL_GAP, addHeader, addFooter, addInsightTitle, addHRule, addVRule,
} = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();

  // Background
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: SW, h: SH,
    fill: { color: C.bg },
    line: { type: 'none' },
  });

  // Header band
  addHeader(pres, slide, 'ACME CORPORATION', 'Strategic Performance Review \u00b7 April 2026');

  // Insight title
  addInsightTitle(slide, 'Four structural shifts are reshaping the competitive landscape');

  // Bullet items
  const bullets = [
    'Market consolidation accelerating across three core segments',
    'Regulatory pressure increasing in EMEA and APAC regions',
    'Digital-native challengers capturing mid-market share',
    'Supply chain realignment creating new cost structures',
  ];

  const bulletStartY = 1.1;
  const bulletSpacing = 0.55;
  const ruleW = 2 / 100;   // 2pt wide rect
  const ruleX = CONTENT_X;
  const textX = CONTENT_X + ruleW + 0.12;
  const textW = CONTENT_W - ruleW - 0.12;

  bullets.forEach((text, i) => {
    const y = bulletStartY + i * bulletSpacing;

    // Left-border accent rect (2pt wide)
    slide.addShape(pres.ShapeType.rect, {
      x: ruleX, y: y, w: ruleW, h: 0.32,
      fill: { color: C.borderStrong },
      line: { type: 'none' },
    });

    // Bullet text
    slide.addText(text, { margin: 0.079,
      x: textX, y: y, w: textW, h: 0.32,
      fontSize: PT.body, fontFace: FONT,
      color: C.fg,
      valign: 'middle',
    });
  });

  // Footer
  addFooter(pres, slide, '07', 'Internal \u00b7 Source: Internal Analysis');

  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-07-preview.pptx' });
}

module.exports = { createSlide };
