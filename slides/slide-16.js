const pptxgen = require('pptxgenjs');
const { FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
        INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y, COL_GAP,
        addHeader, addFooter, addInsightTitle, addStatCard } = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(pres, slide);
  addInsightTitle(slide, 'Three operational metrics all exceeded Q2 targets by a significant margin');

  const cardY = 1.6;
  const cardH = 2.2;

  // Card 1 — P99 API Latency
  addStatCard(pres, slide, 0.47, cardY, 2.82, cardH,
    '47', 'ms', 'P99 API LATENCY', '↓ 31% improvement', 'success');

  // Card 2 — SLO Compliance
  addStatCard(pres, slide, 3.49, cardY, 2.82, cardH,
    '99.4', '%', 'SLO COMPLIANCE · 30D', '↑ 0.6pts vs target', 'success');

  // Card 3 — Engineering Velocity
  addStatCard(pres, slide, 6.51, cardY, 3.02, cardH,
    '4.2', 'x', 'ENGINEERING VELOCITY', '↑ vs baseline', null);

  addFooter(pres, slide, 16);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-16-preview.pptx' });
}
module.exports = { createSlide };
