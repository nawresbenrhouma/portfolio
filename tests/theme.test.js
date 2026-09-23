const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const theme = require(path.resolve(__dirname, '../js/theme.js'));

function fakeDoc(initial = 'light') {
  const attrs = { 'data-theme': initial };
  const listeners = {};
  const button = {
    attrs: {},
    hidden: true,
    setAttribute(k, v) { this.attrs[k] = v; },
    addEventListener(type, fn) { listeners[type] = fn; },
    click() { listeners.click && listeners.click(); },
  };
  return {
    documentElement: {
      setAttribute(k, v) { attrs[k] = v; },
      getAttribute(k) { return attrs[k]; },
    },
    querySelector(sel) { return sel === '[data-theme-toggle]' ? button : null; },
    _button: button,
  };
}

const storageOf = (obj) => ({ getItem: (k) => (k in obj ? obj[k] : null), setItem: (k, v) => { obj[k] = v; } });
const throwingStorage = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
const mediaDark = () => ({ matches: true });
const mediaLight = () => ({ matches: false });

test('resolveTheme prefers stored value', () => {
  assert.equal(theme.resolveTheme({ storage: storageOf({ theme: 'dark' }), matchMedia: mediaLight }), 'dark');
});

test('resolveTheme falls back to system preference when nothing stored', () => {
  assert.equal(theme.resolveTheme({ storage: storageOf({}), matchMedia: mediaDark }), 'dark');
  assert.equal(theme.resolveTheme({ storage: storageOf({}), matchMedia: mediaLight }), 'light');
});

test('resolveTheme falls back when storage throws', () => {
  assert.equal(theme.resolveTheme({ storage: throwingStorage, matchMedia: mediaDark }), 'dark');
});

test('resolveTheme ignores garbage stored values', () => {
  assert.equal(theme.resolveTheme({ storage: storageOf({ theme: 'blue' }), matchMedia: mediaLight }), 'light');
});

test('initTheme applies theme, reveals toggle, and toggling flips and persists', () => {
  const store = {};
  const doc = fakeDoc();
  const env = { document: doc, storage: storageOf(store), matchMedia: mediaLight };
  assert.equal(theme.initTheme(env), 'light');
  assert.equal(doc._button.hidden, false);
  assert.equal(doc._button.attrs['aria-pressed'], 'false');
  doc._button.click();
  assert.equal(doc.documentElement.getAttribute('data-theme'), 'dark');
  assert.equal(store.theme, 'dark');
  assert.equal(doc._button.attrs['aria-pressed'], 'true');
  assert.equal(doc._button.attrs['aria-label'], undefined, 'label is static in HTML; only aria-pressed changes');
  doc._button.click();
  assert.equal(doc.documentElement.getAttribute('data-theme'), 'light');
  assert.equal(store.theme, 'light');
});

test('toggle still works for the session when storage throws', () => {
  const doc = fakeDoc();
  theme.initTheme({ document: doc, storage: throwingStorage, matchMedia: mediaLight });
  doc._button.click();
  assert.equal(doc.documentElement.getAttribute('data-theme'), 'dark');
});
