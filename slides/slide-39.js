// slide-39.js — BLANK
// Blank slide with dark header, footer, and safe-zone margin guides.

const pptxgen = require('pptxgenjs');
const { FONT, C, PT, SW, SH, MARGIN,
        addHeader, addFooter } = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };

  addHeader(pres, slide);

  // Safe-zone guides (very subtle faint rect outlines)

  // Top guide
  slide.addShape(pres.ShapeType.rect, {
    x: 0.47, y: 0.47, w: 9.06, h: 0.01,
    fill: { color: C.faint },
    line: { type: 'none' },
  });

  // Bottom guide
  slide.addShape(pres.ShapeType.rect, {
    x: 0.47, y: 5.15, w: 9.06, h: 0.01,
    fill: { color: C.faint },
    line: { type: 'none' },
  });

  // Left guide
  slide.addShape(pres.ShapeType.rect, {
    x: 0.47, y: 0.47, w: 0.01, h: 4.7,
    fill: { color: C.faint },
    line: { type: 'none' },
  });

  // Right guide
  slide.addShape(pres.ShapeType.rect, {
    x: 9.53, y: 0.47, w: 0.01, h: 4.7,
    fill: { color: C.faint },
    line: { type: 'none' },
  });

  // Center label
  slide.addText('[ BLANK SLIDE — SAFE ZONE GUIDES SHOWN ]', { margin: 0.079,
    x: 3.5, y: 2.7, w: 3, h: 0.3,
    fontSize: 9, lineSpacing: 12, fontFace: FONT,
    color: C.faint,
    align: 'center', valign: 'middle',
  });

  addFooter(pres, slide, 39);

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
  pres.writeFile({ fileName: './output/slide-39-preview.pptx' });
}

module.exports = { createSlide };
