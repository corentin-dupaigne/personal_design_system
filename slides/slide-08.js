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
  addInsightTitle(slide, 'Current strengths must be weighed against emerging operational constraints');

  // Column layout
  const colW = (CONTENT_W - COL_GAP) / 2;   // ~4.43"
  const leftX = CONTENT_X;
  const rightX = CONTENT_X + colW + COL_GAP;
  const labelY = CONTENT_Y;
  const labelH = 0.28;
  const ruleY = labelY + labelH + 0.118;
  const bulletsStartY = ruleY + 0.13;
  const bulletSpacing = 0.52;
  const bulletRuleW = 2 / 100;

  // ── Left column: CURRENT STRENGTHS ──────────────────────────────────────────

  // Label
  slide.addText('CURRENT STRENGTHS', { margin: 0.079,
    x: leftX, y: labelY, w: colW, h: labelH,
    fontSize: PT.sectionHeader, fontFace: FONT,
    color: C.muted, bold: true,
    charSpacing: 1.2,
    valign: 'middle',
  });

  // 1pt border line below label
  addHRule(pres, slide, leftX, ruleY, colW, C.border);

  const leftBullets = [
    'Strong brand recognition across key verticals',
    'Established distribution network in 42 markets',
    'Proprietary data platform with 8-year head start',
    '60%+ gross margins in core product lines',
  ];

  leftBullets.forEach((text, i) => {
    const y = bulletsStartY + i * bulletSpacing;
    slide.addShape(pres.ShapeType.rect, {
      x: leftX, y, w: bulletRuleW, h: 0.32,
      fill: { color: C.success },
      line: { type: 'none' },
    });
    slide.addText(text, { margin: 0.079,
      x: leftX + bulletRuleW + 0.1, y, w: colW - bulletRuleW - 0.1, h: 0.32,
      fontSize: PT.body, fontFace: FONT,
      color: C.fg,
      valign: 'middle',
    });
  });

  // ── Center vertical divider ──────────────────────────────────────────────────
  const divX = leftX + colW + COL_GAP / 2 - 0.005;
  slide.addShape(pres.ShapeType.rect, {
    x: divX, y: CONTENT_Y, w: 1 / 100, h: CONTENT_H,
    fill: { color: C.border },
    line: { type: 'none' },
  });

  // ── Right column: OPERATIONAL CONSTRAINTS ────────────────────────────────────

  // Label
  slide.addText('OPERATIONAL CONSTRAINTS', { margin: 0.079,
    x: rightX, y: labelY, w: colW, h: labelH,
    fontSize: PT.sectionHeader, fontFace: FONT,
    color: C.muted, bold: true,
    charSpacing: 1.2,
    valign: 'middle',
  });

  // 1pt border line below label
  addHRule(pres, slide, rightX, ruleY, colW, C.border);

  const rightBullets = [
    'Legacy infrastructure limiting deployment velocity',
    'Talent acquisition costs up 34% year-over-year',
    'Extended procurement cycles slowing integration',
    'Technical debt reducing engineering throughput',
  ];

  rightBullets.forEach((text, i) => {
    const y = bulletsStartY + i * bulletSpacing;
    slide.addShape(pres.ShapeType.rect, {
      x: rightX, y, w: bulletRuleW, h: 0.32,
      fill: { color: C.warning },
      line: { type: 'none' },
    });
    slide.addText(text, { margin: 0.079,
      x: rightX + bulletRuleW + 0.1, y, w: colW - bulletRuleW - 0.1, h: 0.32,
      fontSize: PT.body, fontFace: FONT,
      color: C.fg,
      valign: 'middle',
    });
  });

  // Footer
  addFooter(pres, slide, '08', 'Internal \u00b7 Source: Internal Analysis');

  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-08-preview.pptx' });
}

module.exports = { createSlide };
