const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const form = require(path.resolve(__dirname, '../js/form.js'));

function fakeForm(values, endpoint = 'https://formspree.io/f/abcd1234') {
  let submitHandler = null;
  const note = { textContent: '', attrs: {}, setAttribute(k, v) { this.attrs[k] = v; }, classList: { add() {}, remove() {} } };
  const button = { disabled: false, textContent: 'Send message' };
  const el = {
    action: endpoint,
    dataset: {},
    addEventListener(t, fn) { if (t === 'submit') submitHandler = fn; },
    querySelector(sel) { return sel === '.contact-form__note' ? note : sel === 'button[type="submit"]' ? button : null; },
    elements: { namedItem: (n) => (n in values ? { value: values[n] } : null) },
    checkValidity: () => true,
    reset() { this.wasReset = true; },
    _submit(ev = { preventDefault() { this.prevented = true; } }) { return submitHandler(ev); },
    _note: note, _button: button,
  };
  return el;
}

test('submit posts JSON to the Formspree endpoint and shows a success note', async () => {
  const values = { name: 'Ada', email: 'ada@example.com', message: 'Hello', _gotcha: '' };
  const f = fakeForm(values);
  let call = null;
  const fetch = async (url, opts) => { call = { url, opts }; return { ok: true, json: async () => ({ ok: true }) }; };
  form.initForm({ querySelector: (s) => (s === '.contact-form' ? f : null) }, { fetch });
  const ev = { preventDefault() { this.prevented = true; } };
  await f._submit(ev);
  assert.ok(ev.prevented, 'no navigation');
  assert.equal(call.url, 'https://formspree.io/f/abcd1234');
  assert.equal(call.opts.method, 'POST');
  assert.equal(call.opts.headers.Accept, 'application/json');
  assert.equal(call.opts.headers['Content-Type'], 'application/json');
  assert.deepEqual(JSON.parse(call.opts.body), { name: 'Ada', email: 'ada@example.com', message: 'Hello', _gotcha: '', _subject: 'Portfolio message from Ada' });
  assert.match(f._note.textContent, /Thanks, Ada/);
  assert.ok(f.wasReset, 'form cleared after success');
  assert.equal(f._button.disabled, false, 'button re-enabled');
});

test('a failed post shows an error with the fallback address and keeps the input', async () => {
  const f = fakeForm({ name: 'Ada', email: 'ada@example.com', message: 'Hello', _gotcha: '' });
  const fetch = async () => ({ ok: false, json: async () => ({ errors: [{ message: 'Form not found' }] }) });
  form.initForm({ querySelector: (s) => (s === '.contact-form' ? f : null) }, { fetch });
  await f._submit();
  assert.match(f._note.textContent, /could not be sent/i);
  assert.match(f._note.textContent, /benrhoumanawres7@gmail\.com/);
  assert.ok(!f.wasReset);
});

test('a network failure is reported the same way', async () => {
  const f = fakeForm({ name: 'Ada', email: 'ada@example.com', message: 'Hello', _gotcha: '' });
  form.initForm({ querySelector: (s) => (s === '.contact-form' ? f : null) }, { fetch: async () => { throw new Error('offline'); } });
  await f._submit();
  assert.match(f._note.textContent, /could not be sent/i);
});

test('no form on the page: initForm is a no-op', () => {
  assert.equal(form.initForm({ querySelector: () => null }, { fetch() {} }), null);
});
