const pptxgen = require('pptxgenjs');
const { FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
        INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y, COL_GAP,
        addHeader, addFooter, addInsightTitle } = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(pres, slide);
  addInsightTitle(slide, 'Growth momentum is strengthening while cost ratios continue to improve');

  const chartY = 1.1;
  const chartH = 4.0;
  const labelH = 0.22;

  // ── Left chart — Quarterly Revenue ──────────────────────────────────────────
  slide.addText('QUARTERLY REVENUE ($M)', { margin: 0.079,
    x: 0.47, y: chartY, w: 4.4, h: labelH,
    fontSize: 8, lineSpacing: 10, fontFace: FONT,
    color: C.muted, charSpacing: 0.8,
    valign: 'middle',
  });

  const revenueData = [{
    name: 'Revenue ($M)',
    labels: ['Q3 25', 'Q4 25', 'Q1 26', 'Q2 26'],
    values: [224, 248, 267, 292],
  }];

  slide.addChart(pres.ChartType.bar, revenueData, {
    x: 0.47, y: chartY + labelH, w: 4.4, h: chartH - labelH,
    chartColors: ['b8882a'],
    showLegend: false,
    showTitle: false,
    catAxisLabelFontSize: 8,
    valAxisLabelFontSize: 8,
    catAxisLabelColor: '9a7f5e',
    valAxisLabelColor: '9a7f5e',
    plotAreaBorderColor: 'd9c8a9',
    plotAreaBorderPt: 0,
  });

  // ── Thin vertical divider ────────────────────────────────────────────────────
  slide.addShape(pres.ShapeType.rect, {
    x: 4.99, y: chartY, w: 0.01, h: chartH,
    fill: { color: C.border },
    line: { type: 'none' },
  });

  // ── Right chart — Operating Cost Ratio ──────────────────────────────────────
  slide.addText('OPERATING COST RATIO (%)', { margin: 0.079,
    x: 5.09, y: chartY, w: 4.44, h: labelH,
    fontSize: 8, lineSpacing: 10, fontFace: FONT,
    color: C.muted, charSpacing: 0.8,
    valign: 'middle',
  });

  const costData = [{
    name: 'Operating Cost Ratio (%)',
    labels: ['Q3 25', 'Q4 25', 'Q1 26', 'Q2 26'],
    values: [68, 65, 63, 60],
  }];

  slide.addChart(pres.ChartType.line, costData, {
    x: 5.09, y: chartY + labelH, w: 4.44, h: chartH - labelH,
    chartColors: ['9a7f5e'],
    showLegend: false,
    showTitle: false,
    catAxisLabelFontSize: 8,
    valAxisLabelFontSize: 8,
    catAxisLabelColor: '9a7f5e',
    valAxisLabelColor: '9a7f5e',
    plotAreaBorderColor: 'd9c8a9',
    plotAreaBorderPt: 0,
  });

  addFooter(pres, slide, 20);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-20-preview.pptx' });
}
module.exports = { createSlide };
