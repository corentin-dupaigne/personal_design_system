const pptxgen = require('pptxgenjs');
const { FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
        INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y, COL_GAP,
        addHeader, addFooter, addInsightTitle, addHRule, addVRule } = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(pres, slide);
  addInsightTitle(slide, 'The growth inflection in Q3 2025 correlates directly with platform modernisation');

  // ── Left: Line chart ─────────────────────────────────────────────────────────
  const chartLabels = ['Q1 24','Q2 24','Q3 24','Q4 24','Q1 25','Q2 25','Q3 25','Q4 25','Q1 26','Q2 26'];
  const chartValues = [145, 152, 148, 159, 171, 180, 210, 235, 267, 292];

  slide.addChart(pres.ChartType.line, [
    {
      name: 'ARR Index',
      labels: chartLabels,
      values: chartValues,
    },
  ], {
    x: 0.47, y: 1.1, w: 5.8, h: 4.0,
    chartColors: ['b8882a'],
    showLegend: false,
    showTitle: false,
    catAxisLabelFontSize: 8,
    valAxisLabelFontSize: 8,
    catAxisLabelFontFace: FONT,
    valAxisLabelFontFace: FONT,
    catAxisLabelColor: C.muted,
    valAxisLabelColor: C.muted,
    lineDataSymbol: 'none',
    lineSize: 2,
    chartColorsOpacity: 100,
    plotAreaBorderColor: C.border,
    valAxisLineColor: C.border,
    catAxisLineColor: C.border,
    valGridLine: { color: C.border, style: 'solid', size: 0.5 },
    catGridLine: { style: 'none' },
  });

  // ── Thin vertical divider ─────────────────────────────────────────────────────
  addVRule(pres, slide, 6.35, 1.1, 4.0, C.border, 1);

  // ── Right: annotation column ──────────────────────────────────────────────────
  const annX = 6.5;
  const annW = 3.0;

  // "KEY INFLECTIONS" label
  slide.addText('KEY INFLECTIONS', { margin: 0.079,
    x: annX, y: 1.1, w: annW, h: 0.25,
    fontSize: 13, lineSpacing: 17, fontFace: FONT,
    color: C.muted, bold: true,
    charSpacing: 1.2,
    valign: 'middle',
  });

  // 1pt rule below label
  addHRule(pres, slide, annX, 1.38, annW, C.border);

  // Annotation items
  const annotations = [
    { y: 1.5,  text: 'Q3 2025: Platform migration completed' },
    { y: 2.2,  text: 'Q1 2026: New enterprise tier launched' },
    { y: 2.9,  text: 'Q2 2026: International expansion begins' },
  ];

  annotations.forEach(({ y, text }) => {
    // 2pt left accent rule
    addVRule(pres, slide, annX, y, 0.35, C.accent, 2);
    // Annotation text
    slide.addText(text, { margin: 0.079,
      x: annX + 0.1, y, w: annW - 0.1, h: 0.55,
      fontSize: 9, lineSpacing: 12, fontFace: FONT,
      color: C.fg,
      valign: 'top',
      wrap: true,
    });
  });

  addFooter(pres, slide, 21);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-21-preview.pptx' });
}

module.exports = { createSlide };
