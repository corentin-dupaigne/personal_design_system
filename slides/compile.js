// compile.js — assembles all 40 slide modules into one master deck
const pptxgen = require('pptxgenjs');

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'Design System';
pres.title = 'Enterprise Presentation Master Deck';
pres.subject = 'Master slide kit — all layout types';

const theme = {
  primary:   '2c1f0e',   // --fg
  secondary: '9a7f5e',   // --muted
  accent:    'b8882a',   // --accent
  light:     'f0ead9',   // --bg-subtle
  bg:        'f7f3eb',   // --bg
};

for (let i = 1; i <= 40; i++) {
  const num = String(i).padStart(2, '0');
  try {
    const mod = require(`./slide-${num}.js`);
    mod.createSlide(pres, theme);
    console.log(`✓ slide-${num}`);
  } catch (err) {
    console.error(`✗ slide-${num}: ${err.message}`);
    process.exit(1);
  }
}

pres.writeFile({ fileName: './output/master-deck.pptx' })
  .then(() => console.log('\n✓ master-deck.pptx written to ./output/'))
  .catch(err => { console.error('Write failed:', err); process.exit(1); });
