const test = require('node:test');
const assert = require('node:assert/strict');
const { readFile } = require('./helpers');

const css = () => readFile('css/styles.css');

test('styles.css defines all required tokens on :root', () => {
  const s = css();
  for (const t of ['--bg', '--bg-elevated', '--text', '--text-muted', '--accent', '--accent-contrast', '--border', '--focus',
    '--space-1', '--space-8', '--radius', '--shadow', '--content-max', '--motion-fast', '--motion-base', '--font-body', '--font-heading', '--font-display', '--sheet', '--border-strong']) {
    assert.match(s, new RegExp(`:root\\s*{[^}]*${t}\\s*:`), `${t} missing on :root`);
  }
});

test('styles.css overrides colour tokens for dark theme and for system preference without JS', () => {
  const s = css();
  assert.match(s, /\[data-theme="dark"\]\s*{[^}]*--bg\s*:/);
  assert.match(s, /@media\s*\(prefers-color-scheme:\s*dark\)\s*{\s*:root:not\(\[data-theme="light"\]\)\s*{[^}]*--bg\s*:/);
});

test('styles.css reduced-motion block removes motion but keeps colour feedback; print shows revealed sections', () => {
  const s = css();
  const block = s.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{([\s\S]*?)\n}\n/);
  assert.ok(block, 'reduced-motion media block missing');
  assert.match(block[1], /scroll-behavior:\s*auto/);
  assert.match(block[1], /\.reveal[^{]*{[^}]*(transition:\s*none|opacity:\s*1)/, 'reveal disabled under reduced motion');
  assert.doesNotMatch(block[1], /\*,\s*\*::before,\s*\*::after\s*{[^}]*transition-duration:\s*0s/, 'no blanket transition kill');
  const print = s.match(/@media print\s*{([\s\S]*?)\n}\n/);
  assert.ok(print, 'print block');
  assert.match(print[1], /\.reveal\s*{[^}]*opacity:\s*1/, 'print shows every section');
  assert.match(print[1], /\.panel-green\s*{[^}]*color:\s*#000/, 'panel prints in ink');
  assert.match(print[1], /\.button\s*{[^}]*color:\s*#000/);
  assert.match(s, /\.tabs__list--enhanced ~ \.panel \+ \.panel\s*{[^}]*margin-top:\s*0/, 'selected tab 2 or 3 stays fused to the tab row');
  assert.match(s, /\.glance dt\s*{[^}]*opacity:\s*0\.9/);
  assert.match(s, /\.tab\s*{[^}]*min-height:\s*2\.75rem/, 'tabs are 44px tall');
});

test('styles.css never transitions layout properties', () => {
  const s = css();
  assert.doesNotMatch(s, /transition:[^;]*\b(width|height|top|left|margin|padding)\b/, 'layout property in a transition');
});

test('styles.css styles the essentials', () => {
  const s = css();
  for (const sel of ['.skip-link', '.site-header', '.site-nav__link[aria-current="true"]', '.theme-toggle',
    '.skill-group--primary', '.timeline', '.contact__list', '.print-hint', ':focus-visible']) {
    assert.ok(s.includes(sel), `selector ${sel} missing`);
  }
  assert.match(s, /html\s*{[^}]*scroll-behavior:\s*smooth/);
  assert.match(s, /\.site-header\s*{[^}]*position:\s*sticky/);
});

test('print.css hides chrome, keeps entries together, shows link URLs, sets A4', () => {
  const p = readFile('css/print.css');
  assert.match(p, /@page\s*{[^}]*size:\s*A4/);
  for (const sel of ['.site-header', '.print-hint', '.theme-toggle']) {
    assert.match(p, new RegExp(`${sel.replace('.', '\\.')}[^{]*{[^}]*display:\\s*none`), `${sel} not hidden in print`);
  }
  assert.match(p, /\.cv-entry\s*{[^}]*break-inside:\s*avoid/);
  assert.match(p, /h2,?\s*h3[^{]*{[^}]*break-after:\s*avoid/);
  assert.match(p, /a\[href\^="http"\]::after\s*{[^}]*content:\s*" \(" attr\(href\) "\)"/);
  assert.match(p, /(color|background)[^;]*:\s*(#000|black|#fff|white|none)/);
});

test('mix world: forest accent, alternating section tones, facts card, pill, vertical timeline, reveal', () => {
  const s = css();
  assert.match(s, /--accent:\s*#7a5a00/, 'deep butter for text');
  assert.match(s, /--action:\s*#fff0a6/, 'pastel yellow fill for buttons and the panel');
  assert.match(s, /\.contact-form\s*{/);
  assert.match(s, /--alt:\s*#/);
  assert.match(s, /\.section--alt\s*{[^}]*background:\s*var\(--alt\)/);
  assert.match(s, /\.section\s*{[^}]*grid-template-columns:\s*minmax\(var\(--space-6\), 1fr\) minmax\(0, var\(--content-max\)\) minmax\(var\(--space-6\), 1fr\)/, 'full-bleed sections with centred content');
  assert.match(s, /\.panel-green\s*{[^}]*background:\s*var\(--action\)/, 'the butter becomes a surface');
  assert.match(s, /\.glance\s*{/);
  assert.match(s, /\.hero__text > h1 > \.accent\s*{[^}]*display:\s*block/, 'colour break coincides with the line break');
  assert.doesNotMatch(s.match(/\.about__text\s*{[^}]*}/)[0], /columns:/, 'About is single-column prose');
  assert.doesNotMatch(s, /\.pill\s*{|\.facts-card/);
  assert.match(s, /\.timeline::before\s*{/, 'vertical timeline line');
  assert.match(s, /\.reveal\s*{[^}]*opacity:\s*0/);
  assert.match(s, /\.reveal\.is-visible\s*{[^}]*opacity:\s*1/);
  assert.match(s, /\.accent\s*{[^}]*color:\s*var\(--accent\)/);
  assert.doesNotMatch(s, /\.button--mail/);
});

test('controls use a 3:1 outline token, separators keep the hairline', () => {
  const s = css();
  assert.match(s, /:root\s*{[^}]*--border-strong\s*:/);
  assert.match(s, /\[data-theme="dark"\]\s*{[^}]*--border-strong\s*:/);
  assert.match(s, /\.theme-toggle\s*{[^}]*border:\s*1px solid var\(--border-strong\)/);
  assert.match(s, /\.button--ghost\s*{[^}]*border-color:\s*var\(--border-strong\)/);
  assert.match(s, /\.print-hint\s*{[^}]*margin:[^;]*var\(--space-5\)[^;]*var\(--space-5\)/);
});


test('redesign world: butter ground, sheets lifted by shadow alone, Gabarito display, tabs', () => {
  const s = css();
  assert.match(s, /--font-display:\s*"Gabarito"/);
  assert.match(s, /--shadow:\s*0 \d+px \d+px/, 'sheet shadow carries an offset and blur');
  const sheet = s.match(/\.sheet\s*{[^}]*}/)[0];
  assert.match(sheet, /box-shadow:\s*var\(--shadow\)/);
  assert.doesNotMatch(sheet, /\bborder:/, 'elevation declared once: no hairline under the shadow');
  assert.match(s, /\.tabs__list\s*{[^}]*display:\s*none/, 'tab row hidden without JS');
  assert.match(s, /\.tabs__list--enhanced\s*{[^}]*display:\s*flex/);
  assert.match(s, /\.tab\[aria-selected="true"\]\s*{[^}]*background:\s*var\(--sheet\)/, 'selected folder tab fuses into the sheet');
  assert.match(s, /\.tabs__list\s*{/);
  assert.match(s, /\.tab\[aria-selected="true"\]/);
  assert.match(s, /\.panel\[hidden\]\s*{[^}]*display:\s*none/);
  assert.match(s, /\.skill-group\s*{[^}]*grid-template-columns:\s*19rem/);
  assert.match(s, /\.status\s*{/);
  const narrow = s.match(/@media \(max-width: 900px\)\s*{([\s\S]*?)\n}\n/);
  assert.ok(narrow, 'narrow media block');
  assert.match(narrow[1], /\.hero__inner\s*{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)/);
  assert.match(s.slice(0, 260), /butter/i, 'stylesheet header describes the shipped world');
  assert.doesNotMatch(s, /hero__photo/, 'no photo rules remain');
});

test('skill meta lines sit in the list column and fall back to one column on narrow screens', () => {
  const s = css();
  assert.match(s, /\.skill-group > \.skill-group__meta\s*{[^}]*grid-column:\s*2/);
  const narrow = s.slice(s.indexOf('@media (max-width: 900px)'), s.indexOf('@media (max-width: 640px)'));
  assert.match(narrow, /\.skill-group > \.skill-group__meta\s*{[^}]*grid-column:\s*auto/);
});
