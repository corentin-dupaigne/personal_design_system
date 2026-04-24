// slide-33.js — NEXT_STEPS
const pptxgen = require('pptxgenjs');
const {
  FONT, C, PT, SW, SH, MARGIN, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H,
  INSIGHT_Y, INSIGHT_H, FOOTER_Y, FOOTER_LINE_Y,
  addHeader, addFooter, addInsightTitle, addHRule,
} = require('./shared.js');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addHeader(pres, slide);
  addInsightTitle(slide, 'Three immediate actions set the conditions for successful execution');

  const cardY = 1.2;
  const cardH = 3.8;
  const cardW = 2.82;
  const xPos  = [0.47, 3.49, 6.51];

  const cards = [
    {
      num:      '01',
      title:    'Establish Governance',
      desc:     'Stand up cross-functional steering committee with clear decision rights and escalation paths',
      owner:    'CEO + CFO',
      timeline: 'By 30 April 2026',
    },
    {
      num:      '02',
      title:    'Secure Resources',
      desc:     'Confirm capital allocation and headcount approvals needed for Phase 1 programme workstreams',
      owner:    'CFO + HR',
      timeline: 'By 15 May 2026',
    },
    {
      num:      '03',
      title:    'Align Stakeholders',
      desc:     'Brief board, leadership team, and key external partners on transformation plan and success metrics',
      owner:    'CEO + Comms',
      timeline: 'By 31 May 2026',
    },
  ];

  cards.forEach((card, i) => {
    const cx = xPos[i];

    // Card background
    slide.addShape(pres.ShapeType.roundRect, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: C.bgSubtle },
      line: { color: C.border, pt: 1 },
      rectRadius: 0.04,
    });

    // Large number
    slide.addText(card.num, { margin: 0.079,
      x: cx + 0.18, y: cardY + 0.15, w: 2.4, h: 0.7,
      fontSize: 36, lineSpacing: 47, fontFace: FONT,
      color: C.accent, bold: true,
    });

    // Step title
    slide.addText(card.title, { margin: 0.079,
      x: cx + 0.18, y: cardY + 0.85, w: 2.4, h: 0.35,
      fontSize: 13, lineSpacing: 17, fontFace: FONT,
      color: C.fg, bold: true,
    });

    // Description
    slide.addText(card.desc, { margin: 0.079,
      x: cx + 0.18, y: cardY + 1.25, w: 2.4, h: 1.2,
      fontSize: 9, lineSpacing: 12, fontFace: FONT,
      color: C.muted,
    });

    // Horizontal rule
    addHRule(pres, slide, cx + 0.18, cardY + 2.55, 2.4, C.border);

    // Owner label
    slide.addText('OWNER', { margin: 0.079,
      x: cx + 0.18, y: cardY + 2.7, w: 2.4, h: 0.22,
      fontSize: 8, lineSpacing: 10, fontFace: FONT,
      color: C.muted, charSpacing: 1.2,
    });

    // Owner value
    slide.addText(card.owner, { margin: 0.079,
      x: cx + 0.18, y: cardY + 2.95, w: 2.4, h: 0.25,
      fontSize: 9, lineSpacing: 12, fontFace: FONT,
      color: C.fg,
    });

    // Timeline label
    slide.addText('TIMELINE', { margin: 0.079,
      x: cx + 0.18, y: cardY + 3.2, w: 2.4, h: 0.22,
      fontSize: 8, lineSpacing: 10, fontFace: FONT,
      color: C.muted, charSpacing: 1.2,
    });

    // Timeline value
    slide.addText(card.timeline, { margin: 0.079,
      x: cx + 0.18, y: cardY + 3.43, w: 2.4, h: 0.25,
      fontSize: 9, lineSpacing: 12, fontFace: FONT,
      color: C.fg,
    });
  });

  addFooter(pres, slide, 33);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: '2c1f0e', secondary: '9a7f5e', accent: 'b8882a', light: 'f0ead9', bg: 'f7f3eb' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: './output/slide-33-preview.pptx' });
}

module.exports = { createSlide };
