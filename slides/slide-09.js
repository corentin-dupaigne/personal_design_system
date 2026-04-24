const pptxgen = require('pptxgenjs');
const {
  FONT, C, PT, SW, SH, MARGIN, HEADER_H, FOOTER_Y, FOOTER_LINE_Y,
  INSIGHT_Y, INSIGHT_H, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
  COL_GAP, addHeader, addFooter, addInsightTitle, addHRule, addVRule,
} = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();

  // Background
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: SW, h: SH,
    fill: { color: C.bg },
    line: { type: 'none' },
  });

  // Header band
  addHeader(pres, slide, 'ACME CORPORATION', 'Strategic Performance Review \u00b7 April 2026');

  // Insight title
  addInsightTitle(slide, 'Three execution tracks will determine next-year outcomes');

  // Three-column layout
  const colW = (CONTENT_W - 2 * COL_GAP) / 3;   // ~2.89"
  const col1X = CONTENT_X;
  const col2X = col1X + colW + COL_GAP;
  const col3X = col2X + colW + COL_GAP;

  const labelY = CONTENT_Y;
  const labelH = 0.28;
  const ruleY = labelY + labelH + 0.118;
  const bulletsStartY = ruleY + 0.13;
  const bulletSpacing = 0.52;
  const bulletRuleW = 2 / 100;

  const columns = [
    {
      x: col1X,
      label: 'GROWTH',
      bullets: [
        'Expand into 8 new geographic markets',
        'Launch enterprise tier by Q3',
        'Strategic acquisition pipeline active',
      ],
    },
    {
      x: col2X,
      label: 'EFFICIENCY',
      bullets: [
        'Consolidate 3 legacy platforms',
        'Reduce COGS by 12% through automation',
        'Centralize procurement functions',
      ],
    },
    {
      x: col3X,
      label: 'RESILIENCE',
      bullets: [
        'Build 6-month strategic inventory reserves',
        'Diversify supplier base across 3 regions',
        'Deploy redundant infrastructure in 2 regions',
      ],
    },
  ];

  columns.forEach((col, colIdx) => {
    // Section label
    slide.addText(col.label, { margin: 0.079,
      x: col.x, y: labelY, w: colW, h: labelH,
      fontSize: PT.sectionHeader, fontFace: FONT,
      color: C.muted, bold: true,
      charSpacing: 1.2,
      valign: 'middle',
    });

    // Horizontal rule below label
    addHRule(pres, slide, col.x, ruleY, colW, C.border);

    // Bullets
    col.bullets.forEach((text, i) => {
      const y = bulletsStartY + i * bulletSpacing;
      slide.addShape(pres.ShapeType.rect, {
        x: col.x, y, w: bulletRuleW, h: 0.32,
        fill: { color: C.accent },
        line: { type: 'none' },
      });
      slide.addText(text, { margin: 0.079,
        x: col.x + bulletRuleW + 0.1, y, w: colW - bulletRuleW - 0.1, h: 0.32,
        fontSize: PT.body, fontFace: FONT,
        color: C.fg,
        valign: 'middle',
      });
    });

    // Vertical divider to the right of col 1 and col 2
    if (colIdx < 2) {
      const divX = col.x + colW + COL_GAP / 2 - 0.005;
      slide.addShape(pres.ShapeType.rect, {
        x: divX, y: CONTENT_Y, w: 1 / 100, h: CONTENT_H,
        fill: { color: C.border },
        line: { type: 'none' },
      });
    }
  });

  // Footer
  addFooter(pres, slide, '09', 'Internal \u00b7 Source: Internal Analysis');

  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-09-preview.pptx' });
}

module.exports = { createSlide };
