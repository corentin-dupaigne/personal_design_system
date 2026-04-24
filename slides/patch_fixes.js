'use strict';
// patch_fixes.js — adds margin: 0.079 and lineSpacing to all addText calls
// in individual slide files. Run from the slides/ directory.

const fs   = require('fs');
const path = require('path');

const IPAD = 0.079;

const files = fs.readdirSync(__dirname)
  .filter(f => /^slide-\d+\.js$/.test(f))
  .map(f => path.join(__dirname, f));

for (const fp of files) {
  let code = fs.readFileSync(fp, 'utf8');

  // ── Pass 1: add lineSpacing: N after every "fontSize: N," ──────────────────
  // Skip if lineSpacing already follows on the same line
  code = code.replace(
    /fontSize:\s*(\d+),(?!\s*lineSpacing)/g,
    (_, n) => `fontSize: ${n}, lineSpacing: ${Math.round(parseInt(n, 10) * 1.3)},`
  );

  // ── Pass 2: add margin: IPAD as first property of every addText options obj ─
  // In this codebase every addText options object starts with "x:" as the
  // first property. We insert margin: IPAD before "x:" inside those blocks.
  // The pattern we match: a { followed by optional whitespace/newline then x:
  // that is immediately preceded by the closing of the text/array argument
  // (i.e. a comma that ends the addText first arg).
  //
  // We use a two-step approach:
  //  a) Find each .addText( call position.
  //  b) Walk forward past the first argument to find the options { brace.
  //  c) If the options object has no margin: yet, inject it.

  const addTextRe = /\.addText\(/g;
  const chunks = [];
  let last = 0;
  let m;

  while ((m = addTextRe.exec(code)) !== null) {
    const callAt = m.index;

    // Walk from the character after the opening ( to find the start of the
    // options object — it's the { that comes after the first argument.
    let pos    = callAt + m[0].length;
    let depth  = 0;       // bracket depth
    let inStr  = false;
    let sCh    = '';
    let esc    = false;
    let optAt  = -1;

    while (pos < code.length) {
      const ch = code[pos];

      if (esc) { esc = false; pos++; continue; }
      if (inStr) {
        if (ch === '\\') { esc = true; }
        else if (ch === sCh) { inStr = false; }
        pos++; continue;
      }

      if (ch === '"' || ch === "'" || ch === '`') { inStr = true; sCh = ch; }
      else if (ch === '[' || ch === '(') { depth++; }
      else if (ch === ']' || ch === ')') {
        if (depth === 0) break; // past closing ) of addText — no options
        depth--;
      } else if (ch === ',' && depth === 0) {
        // End of first argument — now scan for the opening {
        let j = pos + 1;
        while (j < code.length && /\s/.test(code[j])) j++;
        if (code[j] === '{') { optAt = j; }
        break;
      }
      pos++;
    }

    if (optAt === -1) continue;

    // Check whether this options object already declares margin:
    // Scan a reasonable window (300 chars) to find the matching }
    const window = code.slice(optAt, optAt + 300);
    if (/\bmargin\s*:/.test(window)) continue;

    // Inject "margin: IPAD," right after the opening {
    chunks.push(code.slice(last, optAt + 1)); // up to and including {
    chunks.push(` margin: ${IPAD},`);
    last = optAt + 1;
  }

  chunks.push(code.slice(last));
  code = chunks.join('');

  fs.writeFileSync(fp, code, 'utf8');
  console.log('patched', path.basename(fp));
}

console.log('Done.');
