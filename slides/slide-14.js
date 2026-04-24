const pptxgen = require('pptxgenjs');
const {
  FONT, C, PT, SW, SH, MARGIN, HEADER_H, FOOTER_Y, FOOTER_LINE_Y,
  INSIGHT_Y, INSIGHT_H, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
  COL_GAP, addHeader, addFooter, addInsightTitle, addHRule, addVRule, addStatCard,
} = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };

  addHeader(pres, slide);
  addInsightTitle(slide, 'A single metric defines our platform health this quarter');

  // ── Centered stat card ────────────────────────────────────────────────────
  const cardX = 3.0;
  const cardY = 1.6;
  const cardW = 4.0;
  const cardH = 2.2;

  addStatCard(
    pres, slide,
    cardX, cardY, cardW, cardH,
    '99.97',              // value
    '%',                  // unit
    'PLATFORM UPTIME · 30 DAYS', // label
    '↑ 0.04% vs previous period', // delta (↑ → success color)
    null                  // semantic — use fg for value
  );

  addFooter(pres, slide, 14);
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
  pres.writeFile({ fileName: './output/slide-14-preview.pptx' });
}

module.exports = { createSlide };
