const pptxgen = require('pptxgenjs');
const { FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
        INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y, COL_GAP,
        addHeader, addFooter, addInsightTitle } = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(pres, slide);
  addInsightTitle(slide, 'Q2 performance by business unit shows consistent improvement across all lines');

  // Table layout
  const tableX = 0.47;
  const tableY = 1.1;
  const colWidths = [2.5, 2.2, 2.2, 2.16];
  const headerH = 0.42;
  const dataH = 0.82;

  const headers = ['BUSINESS UNIT', 'REVENUE ($M)', 'GROWTH YOY', 'STATUS'];
  const rows = [
    { cols: ['North America Enterprise', '$284.2', '+22%', 'On Track'], fill: C.bgSubtle, status: 'success' },
    { cols: ['EMEA Commercial',          '$198.7', '+15%', 'On Track'], fill: C.bg,       status: 'success' },
    { cols: ['Asia Pacific',             '$142.1', '+31%', 'Ahead'],    fill: C.bgSubtle, status: 'success' },
    { cols: ['Global SMB',               '$89.4',  '+8%',  'At Risk'],  fill: C.bg,       status: 'warning' },
  ];

  // --- Header row ---
  let colX = tableX;
  headers.forEach((h, i) => {
    slide.addShape(pres.ShapeType.rect, {
      x: colX, y: tableY, w: colWidths[i], h: headerH,
      fill: { color: C.fg },
      line: { type: 'none' },
    });
    slide.addText(h, { margin: 0.079,
      x: colX + 0.12, y: tableY, w: colWidths[i] - 0.24, h: headerH,
      fontSize: 8, lineSpacing: 10, fontFace: FONT,
      color: C.bg, bold: true,
      charSpacing: 0.8,
      valign: 'middle',
    });
    colX += colWidths[i];
  });

  // --- Data rows ---
  rows.forEach((row, ri) => {
    const rowY = tableY + headerH + ri * dataH;
    colX = tableX;

    row.cols.forEach((cell, ci) => {
      // Cell background
      slide.addShape(pres.ShapeType.rect, {
        x: colX, y: rowY, w: colWidths[ci], h: dataH,
        fill: { color: row.fill },
        line: { type: 'none' },
      });

      // Determine text color for STATUS column
      let textColor = C.fg;
      if (ci === 3) {
        textColor = row.status === 'warning' ? C.warning : C.success;
      }

      slide.addText(cell, { margin: 0.079,
        x: colX + 0.12, y: rowY, w: colWidths[ci] - 0.24, h: dataH,
        fontSize: 11, lineSpacing: 14, fontFace: FONT,
        color: textColor,
        bold: ci === 3,
        valign: 'middle',
      });

      colX += colWidths[ci];
    });

    // Thin separator line between rows
    if (ri < rows.length - 1) {
      slide.addShape(pres.ShapeType.rect, {
        x: tableX, y: rowY + dataH - 0.005, w: colWidths.reduce((a, b) => a + b, 0), h: 0.01,
        fill: { color: C.border },
        line: { type: 'none' },
      });
    }
  });

  // Thin border around entire table
  slide.addShape(pres.ShapeType.rect, {
    x: tableX,
    y: tableY,
    w: colWidths.reduce((a, b) => a + b, 0),
    h: headerH + rows.length * dataH,
    fill: { type: 'none' },
    line: { color: C.border, pt: 0.75 },
  });

  addFooter(pres, slide, 18);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-18-preview.pptx' });
}
module.exports = { createSlide };
