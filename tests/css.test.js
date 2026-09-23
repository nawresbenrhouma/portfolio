const test = require('node:test');
const assert = require('node:assert/strict');
const { readFile } = require('./helpers');

const css = () => readFile('css/styles.css');

test('styles.css defines all required tokens on :root', () => {
  const s = css();
  for (const t of ['--bg', '--bg-elevated', '--text', '--text-muted', '--accent', '--accent-contrast', '--border', '--focus',
    '--space-1', '--space-8', '--radius', '--shadow', '--content-max', '--motion-fast', '--motion-base', '--font-body', '--font-heading']) {
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

test('styles.css styles the essentials', () => {
  const s = css();
  for (const sel of ['.skip-link', '.site-header', '.site-nav__link[aria-current="true"]', '.theme-toggle', '.hero__photo',
    '.skill-group--primary', '.timeline', '.card', '.contact__list', '.print-hint', ':focus-visible']) {
    assert.ok(s.includes(sel), `selector ${sel} missing`);
  }
  assert.match(s, /html\s*{[^}]*scroll-behavior:\s*smooth/);
  assert.match(s, /\.site-header\s*{[^}]*position:\s*sticky/);
});
