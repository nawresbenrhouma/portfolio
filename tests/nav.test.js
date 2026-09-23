const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { readHtml } = require('./helpers');

const nav = require(path.resolve(__dirname, '../js/nav.js'));

function fakeLink(id, i) {
  return {
    attrs: { href: `#${id}` },
    offsetLeft: i * 100,
    offsetWidth: 80,
    getAttribute(k) { return this.attrs[k]; },
    setAttribute(k, v) { this.attrs[k] = v; },
    removeAttribute(k) { delete this.attrs[k]; },
  };
}

function fakeDoc(ids, { withNav = true } = {}) {
  const links = ids.map(fakeLink);
  const sections = ids.map((id) => ({ id }));
  const classes = new Set();
  const navEl = withNav ? {
    children: [],
    classList: { add: (c) => classes.add(c), contains: (c) => classes.has(c) },
    appendChild(el) { this.children.push(el); return el; },
  } : null;
  return {
    querySelectorAll(sel) { return sel === 'a.site-nav__link[href^="#"]' ? links : sections; },
    querySelector(sel) { return sel === '.site-nav' ? navEl : null; },
    getElementById(id) { return sections.find((s) => s.id === id) || null; },
    createElement() { return { className: '', style: {}, setAttribute() {} }; },
    _links: links,
    _sections: sections,
    _nav: navEl,
  };
}

class FakeIO {
  constructor(cb, opts) { this.cb = cb; this.opts = opts; this.observed = []; FakeIO.last = this; }
  observe(el) { this.observed.push(el); }
  trigger(entries) { this.cb(entries, this); }
}

test('createSectionObserver observes every linked section', () => {
  const doc = fakeDoc(['about', 'skills', 'contact']);
  nav.createSectionObserver(doc, FakeIO);
  assert.deepEqual(FakeIO.last.observed.map((s) => s.id), ['about', 'skills', 'contact']);
});

test('the most visible intersecting section gets aria-current, others lose it', () => {
  const doc = fakeDoc(['about', 'skills', 'contact']);
  nav.createSectionObserver(doc, FakeIO);
  const [about, skills] = doc._sections;
  FakeIO.last.trigger([
    { target: about, isIntersecting: true, intersectionRatio: 0.2 },
    { target: skills, isIntersecting: true, intersectionRatio: 0.7 },
  ]);
  assert.equal(doc._links[1].getAttribute('aria-current'), 'true');
  assert.equal(doc._links[0].getAttribute('aria-current'), undefined);
  FakeIO.last.trigger([{ target: skills, isIntersecting: false, intersectionRatio: 0 }, { target: about, isIntersecting: true, intersectionRatio: 0.9 }]);
  assert.equal(doc._links[0].getAttribute('aria-current'), 'true');
  assert.equal(doc._links[1].getAttribute('aria-current'), undefined);
});

test('a sliding indicator is added to the nav and follows the active link', () => {
  const doc = fakeDoc(['about', 'skills']);
  nav.createSectionObserver(doc, FakeIO);
  assert.equal(doc._nav.children.length, 1, 'indicator element appended');
  assert.ok(doc._nav.classList.contains('site-nav--has-indicator'));
  const indicator = doc._nav.children[0];
  assert.equal(indicator.className, 'site-nav__indicator');
  FakeIO.last.trigger([{ target: doc._sections[1], isIntersecting: true, intersectionRatio: 0.8 }]);
  assert.equal(indicator.style.transform, 'translateX(100px) scaleX(0.8)', 'transform-only, no width animation');
  assert.equal(indicator.style.width, undefined, 'width is never written from JS');
  FakeIO.last.trigger([{ target: doc._sections[1], isIntersecting: false, intersectionRatio: 0 }]);
  assert.equal(indicator.style.transform, 'scaleX(0)', 'no active section collapses the indicator');
});

test('no IntersectionObserver: returns null and touches nothing', () => {
  const doc = fakeDoc(['about']);
  assert.equal(nav.createSectionObserver(doc, undefined), null);
  assert.equal(doc._links[0].getAttribute('aria-current'), undefined);
  assert.equal(doc._nav.children.length, 0);
});

test('index.html works without JS: every nav link is a plain anchor to an existing section', () => {
  const html = readHtml('index.html');
  const hrefs = [...html.matchAll(/class="site-nav__link" href="#([^"]+)"/g)].map((m) => m[1]);
  assert.ok(hrefs.length >= 7);
  for (const id of hrefs) assert.ok(html.includes(`<section id="${id}"`), `#${id} target missing`);
});
