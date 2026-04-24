// shared.js — design token constants and helper functions for all slide files

const FONT = 'IBM Plex Mono';

// Slide canvas
const SW = 10;       // slide width inches
const SH = 5.625;    // slide height inches

// Spacing constants
const GAP  = 0.118;  // 0.3 cm minimum element gap
const IPAD = 0.079;  // 0.2 cm internal text padding

// Safe zone & layout zones
const MARGIN   = 0.47;  // 1.2cm safe zone margin
const HEADER_H = 0.39;  // 1.0cm header band
const FOOTER_H = 0.28;  // 0.7cm footer band
const FOOTER_Y = SH - FOOTER_H - 0.05;  // footer top y (unchanged)
const FOOTER_LINE_Y = FOOTER_Y - 0.04;  // thin border line above footer (unchanged)
const INSIGHT_Y = HEADER_H + GAP;       // 0.508" — insight zone start (gap from header)
const INSIGHT_H = 0.472;                // 1.2cm insight title height
const CONTENT_X = MARGIN;              // content left edge
const CONTENT_Y = INSIGHT_Y + INSIGHT_H + GAP; // 1.098" — below insight title
const CONTENT_W = SW - 2 * MARGIN;    // ~9.06"
const CONTENT_H = FOOTER_LINE_Y - CONTENT_Y - GAP; // ~4.039"
const COL_GAP   = 0.2;                 // 0.5cm column gutter

// Colors — exact hex from design system (no #)
const C = {
  bg:          'f7f3eb',
  bgSubtle:    'f0ead9',
  bgSurface:   'ede6d6',
  bgOverlay:   'e6dcc8',
  fg:          '2c1f0e',
  muted:       '9a7f5e',
  faint:       'c4a882',
  accent:      'b8882a',
  border:      'd9c8a9',
  borderStrong:'c4a882',
  success:     '3a6b3a',
  warning:     'b8882a',
  danger:      '8b2e2e',
  info:        '2e5c8b',
};

// Type scale (points)
const PT = {
  insightTitle: 22,
  sectionHeader: 13,
  body: 11,
  statValue: 36,
  statUnit: 18,
  statLabel: 8,
  caption: 8,
  footer: 7,
  headerBrand: 7,
};

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Add the dark header band (used on content slides) */
function addHeader(pres, slide, brandName, deckMeta) {
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: SW, h: HEADER_H,
    fill: { color: C.fg },
    line: { type: 'none' },
  });
  slide.addText(brandName || 'ACME CORPORATION', {
    x: MARGIN, y: 0, w: 4, h: HEADER_H,
    fontSize: PT.headerBrand, fontFace: FONT,
    color: C.bg, bold: true,
    charSpacing: 1.5,
    valign: 'middle',
    margin: IPAD,
    lineSpacing: Math.round(PT.headerBrand * 1.3),
  });
  slide.addText(deckMeta || 'Strategic Overview · Q2 2026', {
    x: SW - 4 - MARGIN, y: 0, w: 4, h: HEADER_H,
    fontSize: PT.headerBrand, fontFace: FONT,
    color: C.muted,
    align: 'right', valign: 'middle',
    margin: IPAD,
    lineSpacing: Math.round(PT.headerBrand * 1.3),
  });
}

/** Add footer band with separator line */
function addFooter(pres, slide, slideNum, footerLeft) {
  // Separator line
  slide.addShape(pres.ShapeType.rect, {
    x: MARGIN, y: FOOTER_LINE_Y, w: CONTENT_W, h: 0.01,
    fill: { color: C.border },
    line: { type: 'none' },
  });
  slide.addText(footerLeft || 'Internal · Source: Internal Analysis', {
    x: MARGIN, y: FOOTER_Y, w: 6, h: FOOTER_H,
    fontSize: PT.footer, fontFace: FONT,
    color: C.muted, valign: 'middle',
    margin: IPAD,
    lineSpacing: Math.round(PT.footer * 1.3),
  });
  slide.addText(String(slideNum).padStart(2, '0'), {
    x: SW - MARGIN - 1, y: FOOTER_Y, w: 1, h: FOOTER_H,
    fontSize: PT.footer, fontFace: FONT,
    color: C.muted, align: 'right', valign: 'middle',
    margin: IPAD,
    lineSpacing: Math.round(PT.footer * 1.3),
  });
}

/** Add the insight title row — height constrained to 1.2cm (INSIGHT_H).
 *  Reduces to 18pt if the title is longer than 50 chars. */
function addInsightTitle(slide, text) {
  const fontSize = text.length > 50 ? 18 : PT.insightTitle;
  slide.addText(text, {
    x: CONTENT_X, y: INSIGHT_Y, w: CONTENT_W, h: INSIGHT_H,
    fontSize, fontFace: FONT,
    color: C.fg, bold: true,
    valign: 'middle',
    margin: IPAD,
    lineSpacing: Math.round(fontSize * 1.3),
  });
}

/** Add a section-header label (uppercase, muted) */
function addSectionLabel(slide, text, x, y, w, h) {
  slide.addText(text.toUpperCase(), {
    x, y, w, h: h || 0.25,
    fontSize: PT.sectionHeader, fontFace: FONT,
    color: C.muted, bold: true,
    charSpacing: 1.2,
    valign: 'middle',
    margin: IPAD,
    lineSpacing: Math.round(PT.sectionHeader * 1.3),
  });
}

/** Thin horizontal rule */
function addHRule(pres, slide, x, y, w, color) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h: 0.01,
    fill: { color: color || C.border },
    line: { type: 'none' },
  });
}

/** Vertical rule */
function addVRule(pres, slide, x, y, h, color, thickness) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w: (thickness || 3) / 100, h,
    fill: { color: color || C.accent },
    line: { type: 'none' },
  });
}

/** Stat card — value and unit rendered inline on the same line.
 *  Unit is 18pt in C.muted, value is 36pt in semantic/fg color.
 *  All internal gaps ≥ GAP (0.3cm). */
function addStatCard(pres, slide, x, y, w, h, value, unit, label, delta, semantic) {
  const fillColor = C.bgSubtle;
  const valColor  = semantic ? C[semantic] || C.fg : C.fg;

  // Card background
  slide.addShape(pres.ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: fillColor },
    line: { color: C.border, pt: 0.75 },
    rectRadius: 0.03,
  });

  const innerX = x + 0.15;
  const innerW = w - 0.30;

  // ── Value + unit inline ─────────────────────────────────────────────────────
  const valueY = y + 0.12;  // 0.12" = 0.3cm gap from card top ✓
  const valueH = 0.60;
  const richText = [
    { text: value, options: { fontSize: PT.statValue, color: valColor, bold: true } },
    ...(unit ? [{ text: ' ' + unit, options: { fontSize: PT.statUnit, color: C.muted } }] : []),
  ];
  slide.addText(richText, {
    x: innerX, y: valueY, w: innerW, h: valueH,
    fontFace: FONT, valign: 'middle',
    margin: IPAD,
    lineSpacing: Math.round(PT.statValue * 1.3),
  });

  // ── Label ───────────────────────────────────────────────────────────────────
  const labelY = valueY + valueH + GAP;  // gap ≥ 0.3cm from value bottom ✓
  const labelH = 0.25;
  slide.addText(label.toUpperCase(), {
    x: innerX, y: labelY, w: innerW, h: labelH,
    fontSize: PT.statLabel, fontFace: FONT,
    color: C.muted, charSpacing: 0.8,
    valign: 'middle',
    margin: IPAD,
    lineSpacing: Math.round(PT.statLabel * 1.3),
  });

  // ── Delta (optional) ────────────────────────────────────────────────────────
  if (delta) {
    const deltaColor = delta.startsWith('↑') ? C.success : C.danger;
    const deltaY = labelY + labelH + GAP;  // gap ≥ 0.3cm from label bottom ✓
    slide.addText(delta, {
      x: innerX, y: deltaY, w: innerW, h: 0.20,
      fontSize: PT.caption, fontFace: FONT,
      color: deltaColor, valign: 'middle',
      margin: IPAD,
      lineSpacing: Math.round(PT.caption * 1.3),
    });
  }
}

module.exports = {
  FONT, SW, SH, MARGIN, HEADER_H, FOOTER_H, FOOTER_Y, FOOTER_LINE_Y,
  INSIGHT_Y, INSIGHT_H, CONTENT_X, CONTENT_Y, CONTENT_W, CONTENT_H, COL_GAP,
  GAP, IPAD,
  C, PT,
  addHeader, addFooter, addInsightTitle, addSectionLabel,
  addHRule, addVRule, addStatCard,
};
