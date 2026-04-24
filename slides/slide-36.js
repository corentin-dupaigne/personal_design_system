// slide-36.js — FULL_IMAGE
// Full-bleed image placeholder with dark insight overlay strip at bottom.
// No header band (full bleed).

const pptxgen = require('pptxgenjs');
const { FONT, C, PT, SW, SH, MARGIN } = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bgSurface };

  // Full-bleed image placeholder rect
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 5.625,
    fill: { color: C.bgSurface },
    line: { type: 'none' },
  });

  // Placeholder label
  slide.addText('[ FULL-BLEED IMAGE PLACEHOLDER ]', { margin: 0.079,
    x: 0, y: 2.3, w: 10, h: 0.4,
    fontSize: 13, lineSpacing: 17, fontFace: FONT,
    color: C.muted,
    align: 'center', valign: 'middle',
  });

  // Sub-label
  slide.addText('Replace with photography or illustration', { margin: 0.079,
    x: 0, y: 2.8, w: 10, h: 0.3,
    fontSize: 9, lineSpacing: 12, fontFace: FONT,
    color: C.faint,
    align: 'center', valign: 'middle',
  });

  // Dark overlay strip at bottom
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 4.3, w: 10, h: 1.325,
    fill: { color: '2c1f0e', transparency: 20 },
    line: { type: 'none' },
  });

  // Insight title overlaid in dark strip
  slide.addText('The facility operates 24/7 across three continental time zones', { margin: 0.079,
    x: 0.47, y: 4.45, w: 8, h: 0.6,
    fontSize: 16, lineSpacing: 21, fontFace: FONT,
    color: C.bg, bold: true,
    valign: 'middle',
  });

  // Footer — left "Internal"
  slide.addText('Internal', { margin: 0.079,
    x: 0.47, y: 5.3, w: 3, h: 0.25,
    fontSize: PT.footer, fontFace: FONT,
    color: C.faint, valign: 'middle',
  });

  // Footer — right slide number
  slide.addText('36', { margin: 0.079,
    x: 9.0, y: 5.3, w: 0.6, h: 0.25,
    fontSize: PT.footer, fontFace: FONT,
    color: C.faint,
    align: 'right', valign: 'middle',
  });

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
  pres.writeFile({ fileName: './output/slide-36-preview.pptx' });
}

module.exports = { createSlide };
