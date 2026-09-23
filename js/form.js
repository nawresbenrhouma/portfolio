// Contact form. Safari refuses a POSTed mailto: form, so on submit we compose
// a mailto: URL with subject and body and open it. Without JavaScript the
// form falls back to a GET to the same address, which mail apps read as
// ?body=…, so the message still arrives prefilled.
(function (root) {
  'use strict';

  function buildMailto(to, fields) {
    var subject = 'Portfolio message from ' + fields.name;
    var body = fields.message + '\n\nFrom: ' + fields.name + ' <' + fields.email + '>';
    return 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  function initForm(doc, env) {
    var formEl = doc.querySelector('.contact-form');
    if (!formEl) return null;
    var to = formEl.dataset.to;
    formEl.addEventListener('submit', function (ev) {
      if (formEl.checkValidity && !formEl.checkValidity()) return;
      ev.preventDefault();
      var f = formEl.elements;
      var href = buildMailto(to, {
        name: f.namedItem('name').value.trim(),
        email: f.namedItem('email').value.trim(),
        message: f.namedItem('body').value.trim(),
      });
      env.navigate(href);
      var note = formEl.querySelector('.contact-form__note');
      if (note) note.textContent = 'Your email app should now be open with the message ready to send. If nothing happened, write to ' + to + ' directly.';
    });
    return formEl;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { buildMailto: buildMailto, initForm: initForm };
  } else {
    initForm(root.document, { navigate: function (href) { root.location.href = href; } });
  }
})(typeof window !== 'undefined' ? window : globalThis);
