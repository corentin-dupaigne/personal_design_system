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
  addInsightTitle(slide, 'Two headline metrics confirm we are ahead of annual plan');

  const cardY = 1.6;
  const cardH = 2.2;

  // ── Card 1: Annual Recurring Revenue ─────────────────────────────────────
  addStatCard(
    pres, slide,
    0.47, cardY, 4.3, cardH,
    '$2.4',                    // value
    'B',                       // unit
    'ANNUAL RECURRING REVENUE', // label
    '↑ 18% year-over-year',    // delta
    null                       // semantic — fg for value
  );

  // ── Card 2: Net Revenue Retention ─────────────────────────────────────────
  addStatCard(
    pres, slide,
    5.0, cardY, 4.53, cardH,
    '134',                     // value
    '%',                       // unit
    'NET REVENUE RETENTION',   // label
    '↑ 6pts vs prior year',    // delta
    'success'                  // semantic — success green for value
  );

  addFooter(pres, slide, 15);
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
  pres.writeFile({ fileName: './output/slide-15-preview.pptx' });
}

module.exports = { createSlide };
