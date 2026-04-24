// slide-35.js — ACTION_ITEMS
const pptxgen = require('pptxgenjs');
const {
  FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
  INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y,
  addHeader, addFooter, addInsightTitle,
} = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(pres, slide);
  addInsightTitle(slide, 'Four outstanding actions require owner confirmation before end of week');

  const CONTENT_Y_START = 1.1;
  const ROW_H   = 0.72;
  const ROW_GAP = 0.18;

  const actions = [
    {
      text:        'Confirm revised budget allocation with Finance committee',
      owner:       'J. Martinez',
      status:      'PENDING',
      badgeFill:   C.bgSurface,
      badgeBorder: C.border,
      badgeText:   C.muted,
    },
    {
      text:        'Distribute updated programme charter to all workstream leads',
      owner:       'A. Chen',
      status:      'IN PROGRESS',
      badgeFill:   'e8eff7',
      badgeBorder: C.info,
      badgeText:   C.info,
    },
    {
      text:        'Sign off vendor selection for cloud infrastructure partner',
      owner:       'R. Patel',
      status:      'OVERDUE',
      badgeFill:   'f5eded',
      badgeBorder: C.danger,
      badgeText:   C.danger,
    },
    {
      text:        'Schedule board briefing on transformation progress',
      owner:       'L. Kim',
      status:      'DONE',
      badgeFill:   'edf3ed',
      badgeBorder: C.success,
      badgeText:   C.success,
    },
  ];

  actions.forEach((action, i) => {
    const rowY = CONTENT_Y_START + i * (ROW_H + ROW_GAP);

    // Row background
    slide.addShape(pres.ShapeType.roundRect, {
      x: MARGIN, y: rowY, w: CONTENT_W, h: ROW_H,
      fill: { color: C.bgSubtle },
      line: { color: C.border, pt: 1 },
      rectRadius: 0.02,
    });

    // Checkbox placeholder
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.65, y: rowY + 0.22, w: 0.28, h: 0.28,
      fill: { type: 'none' },
      line: { color: C.fg, pt: 1 },
      rectRadius: 0.02,
    });

    // Action text
    slide.addText(action.text, { margin: 0.079,
      x: 1.1, y: rowY + 0.08, w: 5.4, h: 0.56,
      fontSize: 11, lineSpacing: 14, fontFace: FONT,
      color: C.fg, valign: 'middle',
    });

    // Owner
    slide.addText(action.owner, { margin: 0.079,
      x: 6.6, y: rowY + 0.08, w: 1.5, h: 0.56,
      fontSize: 8, lineSpacing: 10, fontFace: FONT,
      color: C.muted, align: 'center', valign: 'middle',
    });

    // Status badge background
    slide.addShape(pres.ShapeType.roundRect, {
      x: 8.25, y: rowY + 0.18, w: 1.1, h: 0.36,
      fill: { color: action.badgeFill },
      line: { color: action.badgeBorder, pt: 1 },
      rectRadius: 0.15,
    });

    // Status badge text
    slide.addText(action.status, { margin: 0.079,
      x: 8.25, y: rowY + 0.18, w: 1.1, h: 0.36,
      fontSize: 7, lineSpacing: 9, fontFace: FONT,
      color: action.badgeText, bold: true,
      align: 'center', valign: 'middle',
      charSpacing: 0.5,
    });
  });

  addFooter(pres, slide, 35);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-35-preview.pptx' });
}

module.exports = { createSlide };
