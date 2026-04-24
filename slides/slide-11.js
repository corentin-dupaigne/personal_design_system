const pptxgen = require('pptxgenjs');
const {
  FONT, C, PT, SW, SH, MARGIN, HEADER_H, FOOTER_Y, FOOTER_LINE_Y,
  INSIGHT_Y, INSIGHT_H, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
  COL_GAP, addHeader, addFooter, addInsightTitle, addHRule, addVRule, addStatCard,
} = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bgSubtle };

  addHeader(pres, slide);

  // Large centered key message statement
  slide.addText(
    'Revenue retention has reached 94% — the highest in company history.',
    { margin: 0.079,
      x: 1.2, y: 1.6, w: 7.6, h: 2.4,
      fontSize: 26, lineSpacing: 34, fontFace: FONT,
      color: C.fg, bold: true,
      align: 'left', valign: 'middle',
    }
  );

  // Thin 2pt accent horizontal rule below text
  slide.addShape(pres.ShapeType.rect, {
    x: 1.2, y: 3.7, w: 3.0, h: 2 / 72,
    fill: { color: C.accent },
    line: { type: 'none' },
  });

  addFooter(pres, slide, 11);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a',
    light: 'f0ead9', bg: 'f7f3eb',
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-11-preview.pptx' });
}

module.exports = { createSlide };
