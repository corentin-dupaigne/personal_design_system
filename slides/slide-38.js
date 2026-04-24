// slide-38.js — APPENDIX_DIVIDER
// Minimal appendix section divider — no header band.

const pptxgen = require('pptxgenjs');
const { FONT, C, PT, SW, SH, MARGIN,
        addFooter } = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bgSubtle };

  // Large section letter "A"
  slide.addText('A', { margin: 0.079,
    x: 0.8, y: 0.8, w: 3, h: 2.5,
    fontSize: 96, lineSpacing: 125, fontFace: FONT,
    color: C.fg, bold: true,
    valign: 'middle',
  });

  // "APPENDIX" label — uppercase, muted, bold, high letter-spacing
  slide.addText('APPENDIX', { margin: 0.079,
    x: 0.8, y: 3.5, w: 4, h: 0.3,
    fontSize: 13, lineSpacing: 17, fontFace: FONT,
    color: C.muted, bold: true,
    charSpacing: 4,
    valign: 'middle',
  });

  // 2pt horizontal rule
  slide.addShape(pres.ShapeType.rect, {
    x: 0.8, y: 3.9, w: 3.5, h: 0.02,
    fill: { color: C.border },
    line: { type: 'none' },
  });

  // Sub-label
  slide.addText('Supporting data and reference material', { margin: 0.079,
    x: 0.8, y: 4.1, w: 5, h: 0.25,
    fontSize: 9, lineSpacing: 12, fontFace: FONT,
    color: C.faint,
    valign: 'middle',
  });

  addFooter(pres, slide, 38, 'Internal');

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
  pres.writeFile({ fileName: './output/slide-38-preview.pptx' });
}

module.exports = { createSlide };
