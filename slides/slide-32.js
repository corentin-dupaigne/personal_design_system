// slide-32.js — RECOMMENDATIONS
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
  addInsightTitle(slide, 'Five actions are required to sustain momentum through the next quarter');

  const CONTENT_Y_START = 1.1;
  const ROW_H = 0.65;
  const ROW_GAP = 0.12;

  const semanticColor = {
    success: C.success,
    info:    C.info,
    warning: C.warning,
    danger:  C.danger,
  };

  const rows = [
    {
      index: '01',
      desc:  'Accelerate cloud migration for core transaction systems',
      owner: 'A. Rodriguez · CTO',
      due:   'Jun 2026',
      sem:   'success',
    },
    {
      index: '02',
      desc:  'Launch partner enablement programme across EMEA region',
      owner: 'S. Kim · Partnerships',
      due:   'Jul 2026',
      sem:   'info',
    },
    {
      index: '03',
      desc:  'Complete workforce capability assessment for digital roles',
      owner: 'M. Okafor · HR',
      due:   'May 2026',
      sem:   'success',
    },
    {
      index: '04',
      desc:  'Renegotiate top 3 supplier contracts before Q3 renewal',
      owner: 'J. Patel · Procurement',
      due:   'Aug 2026',
      sem:   'warning',
    },
    {
      index: '05',
      desc:  'Resolve regulatory compliance gaps identified in audit',
      owner: 'L. Chen · Legal',
      due:   'Apr 2026',
      sem:   'danger',
    },
  ];

  rows.forEach((row, i) => {
    const rowY = CONTENT_Y_START + i * (ROW_H + ROW_GAP);

    // Background rect
    slide.addShape(pres.ShapeType.roundRect, {
      x: MARGIN, y: rowY, w: CONTENT_W, h: ROW_H,
      fill: { color: C.bgSubtle },
      line: { color: C.borderStrong, pt: 1 },
      rectRadius: 0.02,
    });

    // Colored left accent bar
    slide.addShape(pres.ShapeType.rect, {
      x: MARGIN, y: rowY, w: 0.04, h: ROW_H,
      fill: { color: semanticColor[row.sem] },
      line: { type: 'none' },
    });

    // Index number
    slide.addText(row.index, { margin: 0.079,
      x: 0.6, y: rowY, w: 0.35, h: ROW_H,
      fontSize: 13, lineSpacing: 17, fontFace: FONT,
      color: semanticColor[row.sem],
      bold: true, valign: 'middle',
    });

    // Description
    slide.addText(row.desc, { margin: 0.079,
      x: 1.1, y: rowY, w: 5.9, h: ROW_H,
      fontSize: 11, lineSpacing: 14, fontFace: FONT,
      color: C.fg, valign: 'middle',
    });

    // Owner · Due (right-aligned)
    slide.addText(row.owner + '\n' + row.due, { margin: 0.079,
      x: 7.1, y: rowY, w: 2.3, h: ROW_H,
      fontSize: 8, lineSpacing: 10, fontFace: FONT,
      color: C.muted, align: 'right', valign: 'middle',
    });
  });

  addFooter(pres, slide, 32);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-32-preview.pptx' });
}

module.exports = { createSlide };
