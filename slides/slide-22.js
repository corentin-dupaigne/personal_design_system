const pptxgen = require('pptxgenjs');
const { FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
        INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y, COL_GAP,
        addHeader, addFooter, addInsightTitle, addHRule, addVRule } = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(pres, slide);
  addInsightTitle(slide, 'The product roadmap spans five major milestones through end of year');

  // ── Horizontal timeline spine ─────────────────────────────────────────────────
  // 1pt border-colored line from x=0.6 to x=9.4 at y=3.0
  slide.addShape(pres.ShapeType.rect, {
    x: 0.6, y: 3.0, w: 8.8, h: 0.01,
    fill: { color: C.border },
    line: { type: 'none' },
  });

  // ── 5 events ─────────────────────────────────────────────────────────────────
  const xPositions   = [1.0, 2.9, 4.8, 6.7, 8.6];
  const timestamps   = ['Jan 2026', 'Mar 2026', 'Jun 2026', 'Sep 2026', 'Dec 2026'];
  const descriptions = [
    'Strategy Alignment\n& Planning',
    'Platform Architecture\nFinalized',
    'Pilot Programme\nLaunch',
    'Full Market\nRollout',
    'Performance Review\n& Optimisation',
  ];

  xPositions.forEach((xc, i) => {
    // Circle dot on the line (centered at xc, y=3.0)
    slide.addShape(pres.ShapeType.ellipse, {
      x: xc - 0.06, y: 2.94, w: 0.12, h: 0.12,
      fill: { color: C.accent },
      line: { type: 'none' },
    });

    // Timestamp above the line (centered)
    slide.addText(timestamps[i], { margin: 0.079,
      x: xc - 0.85, y: 2.5, w: 1.7, h: 0.25,
      fontSize: 8, lineSpacing: 10, fontFace: FONT,
      color: C.muted,
      align: 'center', valign: 'middle',
    });

    // Small tick mark connecting timestamp to line
    slide.addShape(pres.ShapeType.rect, {
      x: xc - 0.005, y: 2.75, w: 0.01, h: 0.25,
      fill: { color: C.faint },
      line: { type: 'none' },
    });

    // Description below the line (centered, multiline)
    slide.addText(descriptions[i], { margin: 0.079,
      x: xc - 0.85, y: 3.2, w: 1.7, h: 0.7,
      fontSize: 8, lineSpacing: 10, fontFace: FONT,
      color: C.fg,
      align: 'center', valign: 'top',
      wrap: true,
    });
  });

  addFooter(pres, slide, 22);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-22-preview.pptx' });
}

module.exports = { createSlide };
