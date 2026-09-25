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
    scrolled: false, scrollIntoView() { this.scrolled = true; },
  };
}

function fakeDoc(links = []) {
  const ids = ['techem', 'copilot', 'consommi'];
  const buttons = ids.map((id, i) => el({ id: `tab-${id}`, 'data-panel': `panel-${id}`, offsetLeft: i * 100 }));
  const panels = ids.map((id) => el({ id: `panel-${id}` }));
  const list = { attrs: { 'data-tablist-label': 'Selected work' }, children: [], appendChild(x) { this.children.push(x); }, classList: { add() {} },
    getAttribute(k) { return this.attrs[k] || null; }, setAttribute(k, v) { this.attrs[k] = String(v); } };
  return {
    querySelector(sel) { return sel === '.tabs__list' ? list : null; },
    querySelectorAll(sel) { return sel === '.tab' ? buttons : sel === '.panel' ? panels : sel === 'a[href^="#panel-"]' ? links : []; },
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

function fakeWin(hash = '') {
  const listeners = {};
  return { location: { hash }, addEventListener(t, fn) { listeners[t] = fn; }, _fire(t) { listeners[t] && listeners[t](); } };
}

test('loading with a #panel- hash selects that tab and scrolls to it', () => {
  const doc = fakeDoc();
  tabs.initTabs(doc, fakeWin('#panel-copilot'));
  assert.deepEqual(doc._panels.map((p) => p.hidden), [true, false, true]);
  assert.ok(doc._panels[1].scrolled);
});

test('an unrelated or unknown hash keeps the first tab and does not scroll', () => {
  for (const hash of ['#about', '#panel-nope', '']) {
    const doc = fakeDoc();
    tabs.initTabs(doc, fakeWin(hash));
    assert.deepEqual(doc._panels.map((p) => p.hidden), [false, true, true], hash);
    assert.ok(doc._panels.every((p) => !p.scrolled), hash);
  }
});

test('hashchange to a panel selects it (back/forward navigation)', () => {
  const doc = fakeDoc();
  const win = fakeWin('');
  tabs.initTabs(doc, win);
  win.location.hash = '#panel-consommi';
  win._fire('hashchange');
  assert.equal(doc._buttons[2].getAttribute('aria-selected'), 'true');
  assert.ok(doc._panels[2].scrolled);
});

test('a link to a panel shows it on click, even when the hash is already set', () => {
  const link = el({ href: '#panel-copilot' });
  const doc = fakeDoc([link]);
  tabs.initTabs(doc, fakeWin('#panel-copilot'));
  doc._buttons[0].fire('click');
  assert.equal(doc._panels[1].hidden, true, 'user switched away manually');
  link.fire('click');
  assert.equal(doc._panels[1].hidden, false, 'same-hash click still shows the panel');
});

test('showPanel returns false for an unknown panel id', () => {
  const api = tabs.initTabs(fakeDoc());
  assert.equal(api.showPanel('panel-nope', false), false);
  assert.equal(api.showPanel('panel-copilot', false), true);
});

test('with a window, a panel link click takes over the jump: scrolls the panel into view and records the hash', () => {
  const link = el({ href: '#panel-copilot' });
  const doc = fakeDoc([link]);
  const win = fakeWin('');
  const pushed = [];
  win.history = { pushState(state, title, url) { pushed.push(url); } };
  tabs.initTabs(doc, win);
  let prevented = false;
  link.fire('click', { preventDefault() { prevented = true; } });
  assert.ok(prevented, 'native jump cancelled');
  assert.equal(doc._panels[1].hidden, false);
  assert.ok(doc._panels[1].scrolled, 'scrolled by script, honouring scroll-margin');
  assert.deepEqual(pushed, ['#panel-copilot']);
});

test('without history.pushState, a panel link click keeps the native jump', () => {
  const link = el({ href: '#panel-copilot' });
  const doc = fakeDoc([link]);
  tabs.initTabs(doc, fakeWin(''));
  let prevented = false;
  link.fire('click', { preventDefault() { prevented = true; } });
  assert.equal(prevented, false);
  assert.equal(doc._panels[1].hidden, false);
});
