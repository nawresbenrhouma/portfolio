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
  const listListeners = {};
  const list = { scrollLeft: 0, addEventListener(type, fn) { listListeners[type] = fn; }, _fire(type) { listListeners[type] && listListeners[type](); } };
  const navEl = withNav ? {
    children: [],
    classList: { add: (c) => classes.add(c), contains: (c) => classes.has(c) },
    appendChild(el) { this.children.push(el); return el; },
  } : null;
  return {
    querySelectorAll(sel) { return sel === 'a.site-nav__link[href^="#"]' ? links : sections; },
    querySelector(sel) { return sel === '.site-nav' ? navEl : sel === '.site-nav__list' ? list : null; },
    getElementById(id) { return sections.find((s) => s.id === id) || null; },
    createElement() { return { className: '', style: {}, setAttribute() {} }; },
    _links: links,
    _sections: sections,
    _nav: navEl,
    _list: list,
  };
}

function fakeWin() {
  const listeners = {};
  const frames = [];
  return {
    addEventListener(type, fn) { listeners[type] = fn; },
    requestAnimationFrame(fn) { frames.push(fn); return frames.length; },
    _fire(type) { listeners[type] && listeners[type](); },
    _flush() { const f = frames.splice(0); f.forEach((fn) => fn()); },
    _pending: () => frames.length,
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
  assert.equal(doc._links[0].getAttribute('aria-current'), 'true', 'nothing in the band: the first section is current');
  assert.equal(indicator.style.transform, 'translateX(0px) scaleX(0.8)');
});

test('on load with no section in the band, the first section is current', () => {
  const doc = fakeDoc(['about', 'skills']);
  nav.createSectionObserver(doc, FakeIO);
  FakeIO.last.trigger([
    { target: doc._sections[0], isIntersecting: false, intersectionRatio: 0 },
    { target: doc._sections[1], isIntersecting: false, intersectionRatio: 0 },
  ]);
  assert.equal(doc._links[0].getAttribute('aria-current'), 'true');
});

test('indicator subtracts the nav strip scroll offset and follows scroll and resize', () => {
  const doc = fakeDoc(['about', 'skills']);
  const win = fakeWin();
  nav.createSectionObserver(doc, FakeIO, win);
  const indicator = doc._nav.children[0];
  FakeIO.last.trigger([{ target: doc._sections[1], isIntersecting: true, intersectionRatio: 0.8 }]);
  assert.equal(indicator.style.transform, 'translateX(100px) scaleX(0.8)');
  doc._list.scrollLeft = 40;
  doc._list._fire('scroll');
  doc._list._fire('scroll');
  assert.equal(win._pending(), 1, 'layout reads are batched into one animation frame');
  win._flush();
  assert.equal(indicator.style.transform, 'translateX(60px) scaleX(0.8)', 'scrolled strip: indicator moves with the links');
  doc._links[1].offsetLeft = 130;
  win._fire('resize');
  win._flush();
  assert.equal(indicator.style.transform, 'translateX(90px) scaleX(0.8)', 'resize re-measures the active link');
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
  assert.deepEqual(hrefs, ['about', 'work', 'skills', 'experience', 'education', 'contact']);
  for (const id of hrefs) assert.ok(html.includes(`<section id="${id}"`), `#${id} target missing`);
});
