const pptxgen = require('pptxgenjs');
const { FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
        INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y, COL_GAP,
        addHeader, addFooter, addInsightTitle, addHRule, addVRule } = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(pres, slide);
  addInsightTitle(slide, "Six milestones mark the transformation programme's first eighteen months");

  // ── Vertical timeline events ──────────────────────────────────────────────────
  const CONTENT_START_Y = 1.1;
  const SPACING = 0.6;

  const events = [
    { timestamp: 'Jan 2026', description: 'Transformation office established and staffed',    semantic: 'success' },
    { timestamp: 'Feb 2026', description: 'Baseline operational assessment completed',         semantic: 'info'    },
    { timestamp: 'Apr 2026', description: 'Phase 1 technology deployments go-live',           semantic: 'success' },
    { timestamp: 'Jun 2026', description: 'Mid-programme review — on track against KPIs',    semantic: 'success' },
    { timestamp: 'Sep 2026', description: 'Phase 2 process redesign fully embedded',          semantic: 'info'    },
    { timestamp: 'Dec 2026', description: 'Programme close and value realisation audit',      semantic: 'info'    },
  ];

  // Draw a faint continuous vertical track behind the semantic rules
  slide.addShape(pres.ShapeType.rect, {
    x: 2.12, y: CONTENT_START_Y, w: 0.03, h: (events.length - 1) * SPACING + 0.35,
    fill: { color: C.border },
    line: { type: 'none' },
  });

  events.forEach((evt, i) => {
    const y = CONTENT_START_Y + i * SPACING;

    // Timestamp — right-aligned in col 0.47 → 1.97
    slide.addText(evt.timestamp, { margin: 0.079,
      x: 0.47, y, w: 1.4, h: 0.35,
      fontSize: 8, lineSpacing: 10, fontFace: FONT,
      color: C.muted,
      align: 'right', valign: 'middle',
    });

    // Semantic vertical rule (overpaints the track)
    slide.addShape(pres.ShapeType.rect, {
      x: 2.12, y, w: 0.03, h: 0.35,
      fill: { color: C[evt.semantic] },
      line: { type: 'none' },
    });

    // Small connector tick from timestamp column to rule
    slide.addShape(pres.ShapeType.rect, {
      x: 1.97, y: y + 0.155, w: 0.15, h: 0.01,
      fill: { color: C.faint },
      line: { type: 'none' },
    });

    // Description text
    slide.addText(evt.description, { margin: 0.079,
      x: 2.22, y, w: 6.8, h: 0.35,
      fontSize: 11, lineSpacing: 14, fontFace: FONT,
      color: C.fg,
      valign: 'middle',
    });
  });

  addFooter(pres, slide, 23);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-23-preview.pptx' });
}

module.exports = { createSlide };
