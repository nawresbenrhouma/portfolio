const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const reveal = require(path.resolve(__dirname, '../js/reveal.js'));

function el() { const c = new Set(); return { classList: { add: (x) => c.add(x), contains: (x) => c.has(x) } }; }
class FakeIO {
  constructor(cb, opts) { this.cb = cb; this.opts = opts; this.observed = []; this.unobserved = []; FakeIO.last = this; }
  observe(x) { this.observed.push(x); }
  unobserve(x) { this.unobserved.push(x); }
  trigger(entries) { this.cb(entries, this); }
}

test('initReveal marks targets and reveals them once when they intersect', () => {
  const a = el(), b = el();
  const doc = { querySelectorAll: (sel) => (sel === '[data-reveal]' ? [a, b] : []) };
  reveal.initReveal(doc, FakeIO, { matches: false });
  assert.ok(a.classList.contains('reveal') && b.classList.contains('reveal'));
  FakeIO.last.trigger([{ target: a, isIntersecting: true }, { target: b, isIntersecting: false }]);
  assert.ok(a.classList.contains('is-visible'));
  assert.ok(!b.classList.contains('is-visible'));
  assert.deepEqual(FakeIO.last.unobserved, [a], 'revealed once, then unobserved');
});

test('no IntersectionObserver or reduced motion: nothing is hidden', () => {
  const a = el();
  const doc = { querySelectorAll: () => [a] };
  assert.equal(reveal.initReveal(doc, undefined, { matches: false }), null);
  assert.ok(!a.classList.contains('reveal'));
  assert.equal(reveal.initReveal(doc, FakeIO, { matches: true }), null, 'prefers-reduced-motion skips the effect');
  assert.ok(!a.classList.contains('reveal'));
});
