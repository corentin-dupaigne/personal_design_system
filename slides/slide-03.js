// slide-03.js — AGENDA slide
'use strict';

const pptxgen = require('pptxgenjs');
const {
  FONT, SW, SH, MARGIN, HEADER_H,
  FOOTER_H, FOOTER_Y, FOOTER_LINE_Y,
  INSIGHT_Y, INSIGHT_H, CONTENT_Y, CONTENT_W, CONTENT_H,
  C, PT,
  addHeader, addFooter, addInsightTitle, addHRule,
} = require('./shared.js');

// Agenda items
const ITEMS = [
  'Market Position & Competitive Landscape',
  'Financial Performance & Variance Analysis',
  'Operational Efficiency Metrics',
  'Risk & Compliance Overview',
  'Strategic Initiatives & Roadmap',
];

function createSlide(pres, theme) {
  const slide = pres.addSlide();

  // ── Background ────────────────────────────────────────────────────────────
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: SW, h: SH,
    fill: { color: C.bg },
    line: { type: 'none' },
  });

  // ── Header band ───────────────────────────────────────────────────────────
  addHeader(pres, slide, 'ACME CORPORATION', 'Strategic Performance Review · April 2026');

  // ── Insight title ─────────────────────────────────────────────────────────
  addInsightTitle(slide, 'Five priorities drive this review');

  // ── Agenda rows ───────────────────────────────────────────────────────────
  // We have CONTENT_H inches for 5 rows — calculate even row height
  const ROW_H    = CONTENT_H / 5;          // ~0.79" per row
  const NUM_COL_W = 0.65;                  // width for the number column
  const LBL_X    = MARGIN + NUM_COL_W + 0.1;
  const LBL_W    = CONTENT_W - NUM_COL_W - 0.1;

  ITEMS.forEach((label, i) => {
    const rowY = CONTENT_Y + i * ROW_H;

    // Separator line above each row (first row gets a slightly stronger line)
    const lineColor = i === 0 ? C.borderStrong : C.border;
    addHRule(pres, slide, MARGIN, rowY, CONTENT_W, lineColor);

    // Number: "01" – "05" in accent, large
    slide.addText(String(i + 1).padStart(2, '0'), { margin: 0.079,
      x: MARGIN, y: rowY + 0.06, w: NUM_COL_W, h: ROW_H - 0.06,
      fontSize: PT.statValue,   // 36pt
      fontFace: FONT,
      color: C.accent, bold: true,
      valign: 'middle',
    });

    // Agenda item label
    slide.addText(label, { margin: 0.079,
      x: LBL_X, y: rowY + 0.06, w: LBL_W, h: ROW_H - 0.06,
      fontSize: 13, lineSpacing: 17, fontFace: FONT,
      color: C.fg,
      valign: 'middle',
    });
  });

  // Closing rule after last row
  addHRule(pres, slide, MARGIN, CONTENT_Y + CONTENT_H, CONTENT_W, C.border);

  // ── Footer ────────────────────────────────────────────────────────────────
  addFooter(pres, slide, '03', 'Internal · Source: Internal Analysis');

  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: '2c1f0e',
    secondary: '9a7f5e',
    accent: 'b8882a',
    light: 'f0ead9',
    bg: 'f7f3eb',
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-03-preview.pptx' });
}

module.exports = { createSlide };
