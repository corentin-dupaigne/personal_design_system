const pptxgen = require('pptxgenjs');
const {
  FONT, C, PT, SW, SH, MARGIN, HEADER_H, FOOTER_Y, FOOTER_LINE_Y,
  INSIGHT_Y, INSIGHT_H, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
  COL_GAP, addHeader, addFooter, addInsightTitle, addHRule, addVRule, addStatCard,
} = require('./shared.js');

const BULLETS = [
  'Capital allocation shifted toward automation in 2024',
  'Platform consolidation completed across 12 business units',
  'Cross-functional operating model launched in H2 2025',
  'Workforce upskilling program reached 4,200 employees',
];

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };

  addHeader(pres, slide);
  addInsightTitle(slide, 'Three structural investments underpin this year\'s performance gains');

  // ── Left content column ───────────────────────────────────────────────────
  const colX = 0.47;
  const colW = 4.43;
  const labelY = 1.1;

  // Section label "CONTEXT"
  slide.addText('CONTEXT', { margin: 0.079,
    x: colX, y: labelY, w: colW, h: 0.25,
    fontSize: PT.sectionHeader, fontFace: FONT,
    color: C.muted, bold: true, charSpacing: 1.2,
    valign: 'middle',
  });

  // 1pt rule below label  (labelY=1.1, h=0.25 → bottom=1.35; gap 0.118)
  slide.addShape(pres.ShapeType.rect, {
    x: colX, y: 1.468, w: colW, h: 0.01,
    fill: { color: C.border },
    line: { type: 'none' },
  });

  // Bullets with 2pt left accent rule  (rule bottom=1.478; gap 0.118)
  const bulletStartY = 1.596;
  const bulletH = 0.52;
  const bulletGap = 0.118;
  const ruleW = 2 / 72;
  const textIndent = 0.12;

  BULLETS.forEach((text, i) => {
    const by = bulletStartY + i * (bulletH + bulletGap);

    slide.addShape(pres.ShapeType.rect, {
      x: colX, y: by, w: ruleW, h: bulletH,
      fill: { color: C.borderStrong },
      line: { type: 'none' },
    });

    slide.addText(text, { margin: 0.079,
      x: colX + textIndent, y: by, w: colW - textIndent, h: bulletH,
      fontSize: PT.body, fontFace: FONT,
      color: C.fg, valign: 'middle',
    });
  });

  // ── Right image placeholder ───────────────────────────────────────────────
  const imgX = 5.1;
  const imgY = 1.1;
  const imgW = 4.43;
  const imgH = 4.0;

  slide.addShape(pres.ShapeType.rect, {
    x: imgX, y: imgY, w: imgW, h: imgH,
    fill: { color: C.bgSurface },
    line: { color: C.border, pt: 1 },
  });

  slide.addText('[ IMAGE PLACEHOLDER ]', { margin: 0.079,
    x: imgX, y: imgY + imgH / 2 - 0.35, w: imgW, h: 0.3,
    fontSize: 9, lineSpacing: 12, fontFace: FONT,
    color: C.muted, align: 'center', valign: 'middle',
  });

  slide.addText('Photo or diagram', { margin: 0.079,
    x: imgX, y: imgY + imgH / 2 + 0.05, w: imgW, h: 0.25,
    fontSize: 8, lineSpacing: 10, fontFace: FONT,
    color: C.faint, align: 'center', valign: 'middle',
  });

  addFooter(pres, slide, 13);
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
  pres.writeFile({ fileName: './output/slide-13-preview.pptx' });
}

module.exports = { createSlide };
