const pptxgen = require('pptxgenjs');
const { FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
        INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y, COL_GAP,
        addHeader, addFooter, addInsightTitle, addStatCard } = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(pres, slide);
  addInsightTitle(slide, 'Four KPIs confirm the transformation program is delivering on plan');

  const cardY = 1.6;
  const cardH = 2.1;
  const cardW = 2.07;

  // Card 1 — Cost Savings YTD
  addStatCard(pres, slide, 0.47, cardY, cardW, cardH,
    '$840', 'M', 'COST SAVINGS YTD', '↑ 12% vs plan', null);

  // Card 2 — Employee Engagement
  addStatCard(pres, slide, 2.69, cardY, cardW, cardH,
    '94', '%', 'EMPLOYEE ENGAGEMENT', '↑ 8pts year-over-year', 'success');

  // Card 3 — Active Customers
  addStatCard(pres, slide, 4.91, cardY, cardW, cardH,
    '3.2', 'M', 'ACTIVE CUSTOMERS', '↑ 340K new this year', null);

  // Card 4 — Operating Margin
  addStatCard(pres, slide, 7.13, cardY, cardW, cardH,
    '28', '%', 'OPERATING MARGIN', '↑ 4pts vs prior year', 'success');

  addFooter(pres, slide, 17);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-17-preview.pptx' });
}
module.exports = { createSlide };
