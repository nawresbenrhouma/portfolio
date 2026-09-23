const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const form = require(path.resolve(__dirname, '../js/form.js'));

test('buildMailto composes subject and body from the fields', () => {
  const url = form.buildMailto('benrhoumanawres7@gmail.com', { name: 'Ada Lovelace', email: 'ada@example.com', message: 'Hello,\nare you free?' });
  const u = new URL(url);
  assert.equal(u.protocol, 'mailto:');
  assert.equal(u.pathname, 'benrhoumanawres7@gmail.com');
  assert.equal(u.searchParams.get('subject'), 'Portfolio message from Ada Lovelace');
  assert.equal(u.searchParams.get('body'), 'Hello,\nare you free?\n\nFrom: Ada Lovelace <ada@example.com>');
});

test('initForm intercepts submit, opens the mailto and shows a confirmation', () => {
  let submitHandler = null; let navigated = null;
  const values = { name: 'Ada', email: 'ada@example.com', body: 'Hi' };
  const note = { textContent: '' };
  const formEl = {
    dataset: { to: 'benrhoumanawres7@gmail.com' },
    addEventListener(t, fn) { if (t === 'submit') submitHandler = fn; },
    querySelector(sel) { return sel === '.contact-form__note' ? note : null; },
    elements: { namedItem: (n) => ({ value: values[n] }) },
    checkValidity: () => true,
  };
  const doc = { querySelector: (sel) => (sel === '.contact-form' ? formEl : null) };
  form.initForm(doc, { navigate: (href) => { navigated = href; } });
  let prevented = false;
  submitHandler({ preventDefault() { prevented = true; } });
  assert.ok(prevented);
  assert.match(navigated, /^mailto:benrhoumanawres7@gmail\.com\?subject=/);
  assert.match(note.textContent, /email app/i);
});

test('no form on the page: initForm is a no-op', () => {
  assert.equal(form.initForm({ querySelector: () => null }, { navigate() {} }), null);
});
