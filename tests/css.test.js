const test = require('node:test');
const assert = require('node:assert/strict');
const { readFile } = require('./helpers');

const css = () => readFile('css/styles.css');

test('styles.css defines all required tokens on :root', () => {
  const s = css();
  for (const t of ['--bg', '--bg-elevated', '--text', '--text-muted', '--accent', '--accent-contrast', '--border', '--focus',
    '--space-1', '--space-8', '--radius', '--shadow', '--content-max', '--motion-fast', '--motion-base', '--font-body', '--font-heading', '--font-display', '--band', '--sheet', '--border-strong']) {
    assert.match(s, new RegExp(`:root\\s*{[^}]*${t}\\s*:`), `${t} missing on :root`);
  }
});

test('styles.css overrides colour tokens for dark theme and for system preference without JS', () => {
  const s = css();
  assert.match(s, /\[data-theme="dark"\]\s*{[^}]*--bg\s*:/);
  assert.match(s, /@media\s*\(prefers-color-scheme:\s*dark\)\s*{\s*:root:not\(\[data-theme="light"\]\)\s*{[^}]*--bg\s*:/);
});

test('styles.css contains a reduced-motion block that disables transitions and smooth scroll', () => {
  const s = css();
  const block = s.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{([\s\S]*?)}\s*}/);
  assert.ok(block, 'reduced-motion media block missing');
  assert.match(block[1], /scroll-behavior:\s*auto/);
  assert.match(block[1], /transition(-duration)?:\s*(none|0s|0ms)/);
});

test('styles.css never transitions layout properties', () => {
  const s = css();
  assert.doesNotMatch(s, /transition:[^;]*\b(width|height|top|left|margin|padding)\b/, 'layout property in a transition');
});

test('styles.css styles the essentials', () => {
  const s = css();
  for (const sel of ['.skip-link', '.site-header', '.site-nav__link[aria-current="true"]', '.theme-toggle',
    '.skill-group--primary', '.timeline', '.note', '.contact__list', '.print-hint', ':focus-visible']) {
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
  assert.match(s, /--accent:\s*#2f6b3a/);
  assert.match(s, /--alt:\s*#/);
  assert.match(s, /\.section--alt\s*{[^}]*background:\s*var\(--alt\)/);
  assert.match(s, /\.section\s*{[^}]*grid-template-columns:\s*minmax\(var\(--space-6\), 1fr\) minmax\(0, var\(--content-max\)\) minmax\(var\(--space-6\), 1fr\)/, 'full-bleed sections with centred content');
  assert.match(s, /\.facts-card\s*{/);
  assert.match(s, /\.pill\s*{/);
  assert.match(s, /\.pill__dot\s*{/);
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
  assert.match(s, /\.note\s*{/);
  assert.match(s, /\.fields\s*{/);
  assert.match(s, /\.skill-group\s*{[^}]*grid-template-columns:\s*19rem/);
  assert.match(s, /\.status\s*{/);
  const narrow = s.match(/@media \(max-width: 900px\)\s*{([\s\S]*?)\n}\n/);
  assert.ok(narrow, 'narrow media block');
  assert.match(narrow[1], /\.hero__inner\s*{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)/);
  assert.doesNotMatch(s, /hero__photo/, 'no photo rules remain');
});
