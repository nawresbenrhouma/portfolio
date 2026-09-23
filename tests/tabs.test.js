const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const tabs = require(path.resolve(__dirname, '../js/tabs.js'));

function el(attrs = {}) {
  const listeners = {};
  return {
    attrs: { ...attrs }, hidden: false, focused: false, style: {}, offsetLeft: attrs.offsetLeft || 0, offsetWidth: 80,
    getAttribute(k) { return k in this.attrs ? this.attrs[k] : null; },
    setAttribute(k, v) { this.attrs[k] = String(v); },
    addEventListener(t, fn) { listeners[t] = fn; },
    fire(t, ev = {}) { listeners[t] && listeners[t]({ preventDefault() {}, ...ev }); },
    focus() { this.focused = true; },
  };
}

function fakeDoc() {
  const ids = ['techem', 'copilot', 'consommi'];
  const buttons = ids.map((id, i) => el({ id: `tab-${id}`, 'data-panel': `panel-${id}`, offsetLeft: i * 100 }));
  const panels = ids.map((id) => el({ id: `panel-${id}` }));
  const list = { attrs: { 'data-tablist-label': 'Selected work' }, children: [], appendChild(x) { this.children.push(x); }, classList: { add() {} },
    getAttribute(k) { return this.attrs[k] || null; }, setAttribute(k, v) { this.attrs[k] = String(v); } };
  return {
    querySelector(sel) { return sel === '.tabs__list' ? list : null; },
    querySelectorAll(sel) { return sel === '.tab' ? buttons : sel === '.panel' ? panels : []; },
    getElementById(id) { return [...buttons, ...panels].find((x) => x.attrs.id === id) || null; },
    createElement() { return { className: '', style: {}, setAttribute() {} }; },
    _buttons: buttons, _panels: panels, _list: list,
  };
}

test('initTabs adds the ARIA tab roles that the markup deliberately omits', () => {
  const doc = fakeDoc();
  tabs.initTabs(doc);
  assert.equal(doc._list.getAttribute('role'), 'tablist');
  assert.equal(doc._list.getAttribute('aria-label'), 'Selected work');
  assert.equal(doc._buttons[1].getAttribute('role'), 'tab');
  assert.equal(doc._buttons[1].getAttribute('aria-controls'), 'panel-copilot');
  assert.equal(doc._panels[1].getAttribute('role'), 'tabpanel');
  assert.equal(doc._panels[1].getAttribute('aria-labelledby'), 'tab-copilot');
});

test('initTabs selects the first tab and hides the other panels', () => {
  const doc = fakeDoc();
  tabs.initTabs(doc);
  assert.equal(doc._buttons[0].getAttribute('aria-selected'), 'true');
  assert.equal(doc._buttons[1].getAttribute('aria-selected'), 'false');
  assert.equal(doc._buttons[0].getAttribute('tabindex'), '0');
  assert.equal(doc._buttons[1].getAttribute('tabindex'), '-1');
  assert.deepEqual(doc._panels.map((p) => p.hidden), [false, true, true]);
});

test('clicking a tab shows its panel', () => {
  const doc = fakeDoc();
  tabs.initTabs(doc);
  doc._buttons[2].fire('click');
  assert.deepEqual(doc._panels.map((p) => p.hidden), [true, true, false]);
  assert.equal(doc._buttons[2].getAttribute('aria-selected'), 'true');
  assert.equal(doc._list.children.length, 0, 'folder tabs need no sliding indicator');
});

test('arrow keys move between tabs and wrap; Home/End jump', () => {
  const doc = fakeDoc();
  tabs.initTabs(doc);
  doc._buttons[0].fire('keydown', { key: 'ArrowRight' });
  assert.equal(doc._buttons[1].getAttribute('aria-selected'), 'true');
  assert.ok(doc._buttons[1].focused);
  doc._buttons[1].fire('keydown', { key: 'ArrowLeft' });
  doc._buttons[0].fire('keydown', { key: 'ArrowLeft' });
  assert.equal(doc._buttons[2].getAttribute('aria-selected'), 'true', 'wraps to the last tab');
  doc._buttons[2].fire('keydown', { key: 'Home' });
  assert.equal(doc._buttons[0].getAttribute('aria-selected'), 'true');
  doc._buttons[0].fire('keydown', { key: 'End' });
  assert.equal(doc._buttons[2].getAttribute('aria-selected'), 'true');
});

test('no tabs on the page: initTabs is a no-op', () => {
  const doc = { querySelector() { return null; }, querySelectorAll() { return []; } };
  assert.equal(tabs.initTabs(doc), null);
});
