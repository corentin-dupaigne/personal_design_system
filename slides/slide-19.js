const pptxgen = require('pptxgenjs');
const { FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
        INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y, COL_GAP,
        addHeader, addFooter, addInsightTitle } = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(pres, slide);
  addInsightTitle(slide, 'Revenue has grown consistently quarter-over-quarter for seven consecutive periods');

  const chartData = [{
    name: 'Revenue ($M)',
    labels: ['Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026'],
    values: [182, 198, 215, 224, 248, 267, 292],
  }];

  slide.addChart(pres.ChartType.bar, chartData, {
    x: 0.47, y: 1.1, w: 9.06, h: 4.0,
    chartColors: ['b8882a'],
    showLegend: false,
    showTitle: false,
    valAxisLabelFontSize: 8,
    catAxisLabelFontSize: 8,
    valAxisLabelColor: '9a7f5e',
    catAxisLabelColor: '9a7f5e',
    plotAreaBorderColor: 'd9c8a9',
    plotAreaBorderPt: 0,
  });

  addFooter(pres, slide, 19);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-19-preview.pptx' });
}
module.exports = { createSlide };
