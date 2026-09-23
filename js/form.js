// Contact form via Formspree. On submit we POST JSON to the form's endpoint
// (the <form action>) and show the result inline, so the visitor never leaves
// the page or opens a mail app. Without JavaScript the browser posts the form
// to Formspree normally and lands on Formspree's thank-you page.
(function (root) {
  'use strict';
  var FALLBACK = 'benrhoumanawres7@gmail.com';

  function initForm(doc, env) {
    var formEl = doc.querySelector('.contact-form');
    if (!formEl) return null;
    var note = formEl.querySelector('.contact-form__note');
    var button = formEl.querySelector('button[type="submit"]');

    function say(text, kind) {
      if (!note) return;
      note.textContent = text;
      note.setAttribute('data-kind', kind);
    }

    formEl.addEventListener('submit', function (ev) {
      if (formEl.checkValidity && !formEl.checkValidity()) return undefined;
      ev.preventDefault();
      var f = formEl.elements;
      var value = function (n) { var el = f.namedItem(n); return el ? String(el.value).trim() : ''; };
      var payload = {
        name: value('name'),
        email: value('email'),
        message: value('message'),
        _gotcha: value('_gotcha'),
        _subject: 'Portfolio message from ' + value('name'),
      };
      if (button) { button.disabled = true; }
      say('Sending…', 'pending');
      return env.fetch(formEl.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then(function (res) {
        if (!res.ok) throw new Error('Formspree responded ' + (res.status || 'with an error'));
        say('Thanks, ' + payload.name + '. Your message is in my inbox and I will reply by email.', 'success');
        formEl.reset();
      }).catch(function () {
        say('Sorry, the message could not be sent. Please write to ' + FALLBACK + ' directly.', 'error');
      }).then(function () {
        if (button) { button.disabled = false; }
      });
    });
    return formEl;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initForm: initForm };
  } else {
    initForm(root.document, { fetch: root.fetch.bind(root) });
  }
})(typeof window !== 'undefined' ? window : globalThis);
