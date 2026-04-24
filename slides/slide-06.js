const pptxgen = require('pptxgenjs');
const {
  FONT, C, PT, SW, SH, MARGIN, HEADER_H, FOOTER_Y, FOOTER_LINE_Y,
  INSIGHT_Y, INSIGHT_H, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
  COL_GAP, addHeader, addFooter, addInsightTitle, addHRule, addVRule,
} = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();

  // Full-slide light background
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: SW, h: SH,
    fill: { color: C.bgSubtle },
    line: { type: 'none' },
  });

  // 3pt vertical accent rule
  addVRule(pres, slide, 1.1, 1.8, 2.0, C.accent, 3);

  // Closing line
  slide.addText('Thank You', { margin: 0.079,
    x: 1.4, y: 2.1, w: 7, h: 0.5,
    fontSize: 28, lineSpacing: 36, fontFace: FONT,
    color: C.fg, bold: true,
    valign: 'middle',
  });

  // Subtitle
  slide.addText('We look forward to your questions.', { margin: 0.079,
    x: 1.4, y: 2.7, w: 7, h: 0.3,
    fontSize: PT.sectionHeader, fontFace: FONT,
    color: C.muted,
    valign: 'middle',
  });

  // Horizontal accent rule
  slide.addShape(pres.ShapeType.rect, {
    x: 1.4, y: 3.0, w: 1.5, h: 2 / 100,
    fill: { color: C.accent },
    line: { type: 'none' },
  });

  // Contact line
  slide.addText('strategy@company.com  \u00b7  +1 (415) 555-0182', { margin: 0.079,
    x: 1.4, y: 3.15, w: 6, h: 0.25,
    fontSize: PT.body, fontFace: FONT,
    color: C.muted,
    valign: 'middle',
  });

  // Deck name (bottom left)
  slide.addText('Strategic Performance Review \u00b7 April 2026', { margin: 0.079,
    x: MARGIN, y: 5.1, w: 5, h: 0.2,
    fontSize: PT.footer, fontFace: FONT,
    color: C.faint,
    valign: 'middle',
  });

  // Footer separator line
  slide.addShape(pres.ShapeType.rect, {
    x: MARGIN, y: FOOTER_LINE_Y, w: CONTENT_W, h: 0.01,
    fill: { color: C.border },
    line: { type: 'none' },
  });

  // Footer left: Confidential
  slide.addText('Confidential', { margin: 0.079,
    x: MARGIN, y: FOOTER_Y, w: 4, h: 0.28,
    fontSize: PT.footer, fontFace: FONT,
    color: C.muted,
    valign: 'middle',
  });

  // Footer right: slide number
  slide.addText('06', { margin: 0.079,
    x: SW - MARGIN - 1, y: FOOTER_Y, w: 1, h: 0.28,
    fontSize: PT.footer, fontFace: FONT,
    color: C.muted, align: 'right', valign: 'middle',
  });

  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-06-preview.pptx' });
}

module.exports = { createSlide };
