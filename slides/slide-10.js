const pptxgen = require('pptxgenjs');
const {
  FONT, C, PT, SW, SH, MARGIN, HEADER_H, FOOTER_Y, FOOTER_LINE_Y,
  INSIGHT_Y, INSIGHT_H, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
  COL_GAP, addHeader, addFooter, addInsightTitle, addHRule, addVRule,
} = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();

  // bgSubtle background
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: SW, h: SH,
    fill: { color: C.bgSubtle },
    line: { type: 'none' },
  });

  // Dark header band
  addHeader(pres, slide, 'ACME CORPORATION', 'Strategic Performance Review \u00b7 April 2026');

  // 3pt vertical accent rule to the left of the quote block
  addVRule(pres, slide, 1.0, 1.4, 2.5, C.accent, 3);

  // Large pullquote text
  slide.addText(
    'The organizations that thrive in the next decade will be those that treat operational excellence not as a cost center, but as a competitive advantage.',
    { margin: 0.079,
      x: 1.2, y: 1.4, w: 7.6, h: 2.5,
      fontSize: 20, lineSpacing: 26, fontFace: FONT,
      color: C.fg,
      italic: true,
      valign: 'middle',
      wrap: true,
    }
  );

  // Speaker attribution
  slide.addText('\u2014 Dr. Sarah Chen, Chief Executive Officer', { margin: 0.079,
    x: 1.4, y: 4.1, w: 7, h: 0.28,
    fontSize: PT.body, fontFace: FONT,
    color: C.muted,
    valign: 'middle',
  });

  // Source attribution
  slide.addText('World Economic Forum Annual Meeting, 2026', { margin: 0.079,
    x: 1.4, y: 4.4, w: 7, h: 0.25,
    fontSize: 9, lineSpacing: 12, fontFace: FONT,
    color: C.faint,
    valign: 'middle',
  });

  // Footer
  addFooter(pres, slide, '10', 'Internal \u00b7 Source: Internal Analysis');

  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-10-preview.pptx' });
}

module.exports = { createSlide };
