const test = require('node:test');
const assert = require('node:assert/strict');
const { readFile } = require('./helpers');

// WCAG 2.x relative luminance and contrast ratio, computed from the tokens in styles.css.
function lum(hex) {
  const [r, g, b] = hex.replace('#', '').match(/../g).map((h) => parseInt(h, 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

function tokens(block) {
  const css = readFile('css/styles.css');
  const m = css.match(block);
  assert.ok(m, `token block not found: ${block}`);
  const out = {};
  for (const [, k, v] of m[1].matchAll(/--([a-z-]+):\s*(#[0-9a-f]{6})/gi)) out[k] = v.toLowerCase();
  return out;
}

test('light tokens: text and accent pairs meet AA on every surface they sit on', () => {
  const t = tokens(/:root\s*{([\s\S]*?)}/);
  for (const surface of ['bg', 'alt', 'sheet', 'bg-elevated']) {
    assert.ok(ratio(t.text, t[surface]) >= 4.5, `text on ${surface}`);
    assert.ok(ratio(t['text-muted'], t[surface]) >= 4.5, `muted on ${surface}`);
    assert.ok(ratio(t.accent, t[surface]) >= 4.5, `accent text on ${surface}: ${ratio(t.accent, t[surface]).toFixed(2)}`);
    assert.ok(ratio(t['border-strong'], t[surface]) >= 3, `control outline on ${surface}`);
  }
  assert.ok(ratio(t['accent-contrast'], t.action) >= 4.5, 'button label on action');
});

test('dark tokens: text and accent pairs meet AA on every surface they sit on', () => {
  const t = tokens(/\[data-theme="dark"\]\s*{([\s\S]*?)}/);
  for (const surface of ['bg', 'alt', 'sheet', 'bg-elevated']) {
    assert.ok(ratio(t.text, t[surface]) >= 4.5, `text on ${surface}`);
    assert.ok(ratio(t['text-muted'], t[surface]) >= 4.5, `muted on ${surface}`);
    assert.ok(ratio(t.accent, t[surface]) >= 4.5, `accent text on ${surface}`);
    assert.ok(ratio(t['border-strong'], t[surface]) >= 3, `control outline on ${surface}: ${ratio(t['border-strong'], t[surface]).toFixed(2)}`);
  }
  assert.ok(ratio(t['accent-contrast'], t.action) >= 4.5, 'button label on action');
});

test('dark palette is identical in the toggle block and the no-JS system-preference block', () => {
  const css = readFile('css/styles.css');
  const grab = (re) => Object.fromEntries([...css.match(re)[1].matchAll(/--([a-z-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
  const toggle = grab(/\[data-theme="dark"\]\s*{([\s\S]*?)}/);
  const system = grab(/:root:not\(\[data-theme="light"\]\)\s*{([\s\S]*?)}/);
  assert.deepEqual(system, toggle, 'the two dark token blocks drifted apart');
});
