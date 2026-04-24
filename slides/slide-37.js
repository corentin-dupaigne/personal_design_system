// slide-37.js — DIAGRAM
// Architecture diagram placeholder with simplified box diagram.

const pptxgen = require('pptxgenjs');
const { FONT, C, PT, SW, SH, MARGIN,
        CONTENT_X, CONTENT_Y, CONTENT_W,
        addHeader, addFooter, addInsightTitle } = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };

  addHeader(pres, slide);
  addInsightTitle(slide, 'System architecture enables horizontal scalability across all service tiers');

  // Outer diagram placeholder rect
  slide.addShape(pres.ShapeType.rect, {
    x: 0.47, y: 1.1, w: 9.06, h: 4.0,
    fill: { color: C.bgSurface },
    line: { color: C.border, pt: 1 },
  });

  // Placeholder title inside
  slide.addText('[ DIAGRAM PLACEHOLDER ]', { margin: 0.079,
    x: 0.47, y: 1.5, w: 9.06, h: 0.35,
    fontSize: 13, lineSpacing: 17, fontFace: FONT,
    color: C.muted,
    align: 'center', valign: 'middle',
  });

  // Sub-label
  slide.addText('Replace with architecture diagram, flow chart, or system map', { margin: 0.079,
    x: 0.47, y: 1.9, w: 9.06, h: 0.3,
    fontSize: 9, lineSpacing: 12, fontFace: FONT,
    color: C.faint,
    align: 'center', valign: 'middle',
  });

  // ── Box diagram ───────────────────────────────────────────────────────────

  // CLIENT box
  slide.addShape(pres.ShapeType.rect, {
    x: 0.8, y: 2.3, w: 1.4, h: 0.55,
    fill: { color: C.bgOverlay },
    line: { color: C.border, pt: 1 },
  });
  slide.addText('CLIENT', { margin: 0.079,
    x: 0.8, y: 2.3, w: 1.4, h: 0.55,
    fontSize: 8, lineSpacing: 10, fontFace: FONT,
    color: C.fg, bold: false,
    align: 'center', valign: 'middle',
  });

  // Arrow CLIENT → API GATEWAY
  slide.addShape(pres.ShapeType.rect, {
    x: 2.2, y: 2.57, w: 0.6, h: 0.01,
    fill: { color: C.borderStrong },
    line: { type: 'none' },
  });

  // API GATEWAY box
  slide.addShape(pres.ShapeType.rect, {
    x: 2.8, y: 2.3, w: 1.6, h: 0.55,
    fill: { color: C.bgOverlay },
    line: { color: C.border, pt: 1 },
  });
  slide.addText('API GATEWAY', { margin: 0.079,
    x: 2.8, y: 2.3, w: 1.6, h: 0.55,
    fontSize: 8, lineSpacing: 10, fontFace: FONT,
    color: C.fg,
    align: 'center', valign: 'middle',
  });

  // Arrow API GATEWAY → SERVICES
  slide.addShape(pres.ShapeType.rect, {
    x: 4.4, y: 2.57, w: 0.6, h: 0.01,
    fill: { color: C.borderStrong },
    line: { type: 'none' },
  });

  // SERVICES box
  slide.addShape(pres.ShapeType.rect, {
    x: 5.0, y: 2.3, w: 1.6, h: 0.55,
    fill: { color: C.bgSubtle },
    line: { color: C.border, pt: 1 },
  });
  slide.addText('SERVICES', { margin: 0.079,
    x: 5.0, y: 2.3, w: 1.6, h: 0.55,
    fontSize: 8, lineSpacing: 10, fontFace: FONT,
    color: C.fg,
    align: 'center', valign: 'middle',
  });

  // Arrow SERVICES → DATA STORE
  slide.addShape(pres.ShapeType.rect, {
    x: 6.6, y: 2.57, w: 0.6, h: 0.01,
    fill: { color: C.borderStrong },
    line: { type: 'none' },
  });

  // DATA STORE box
  slide.addShape(pres.ShapeType.rect, {
    x: 7.2, y: 2.3, w: 1.6, h: 0.55,
    fill: { color: C.bgOverlay },
    line: { color: C.border, pt: 1 },
  });
  slide.addText('DATA STORE', { margin: 0.079,
    x: 7.2, y: 2.3, w: 1.6, h: 0.55,
    fontSize: 8, lineSpacing: 10, fontFace: FONT,
    color: C.fg,
    align: 'center', valign: 'middle',
  });

  // Dashed annotation — drop line from API GATEWAY down
  slide.addShape(pres.ShapeType.rect, {
    x: 3.6, y: 2.85, w: 0.01, h: 0.35,
    fill: { color: C.muted },
    line: { type: 'none' },
  });

  // Load Balancer label
  slide.addText('Load Balancer', { margin: 0.079,
    x: 2.9, y: 3.25, w: 1.6, h: 0.2,
    fontSize: 7, lineSpacing: 9, fontFace: FONT,
    color: C.muted,
    align: 'center', valign: 'middle',
  });

  addFooter(pres, slide, 37);

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
  pres.writeFile({ fileName: './output/slide-37-preview.pptx' });
}

module.exports = { createSlide };
