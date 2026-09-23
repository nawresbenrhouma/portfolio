// Theme toggle. Progressive enhancement: the inline <head> script already
// applied the stored/system theme before paint; this file wires the button.
(function (root) {
  'use strict';
  var KEY = 'theme';

  function readStored(storage) {
    try { return storage.getItem(KEY); } catch (e) { return null; }
  }
  function writeStored(storage, value) {
    try { storage.setItem(KEY, value); } catch (e) { /* storage unavailable: session-only */ }
  }
  function systemTheme(matchMedia) {
    try { return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; } catch (e) { return 'light'; }
  }

  function resolveTheme(env) {
    var stored = readStored(env.storage);
    return stored === 'dark' || stored === 'light' ? stored : systemTheme(env.matchMedia);
  }

  function applyTheme(doc, theme) {
    doc.documentElement.setAttribute('data-theme', theme);
    var button = doc.querySelector('[data-theme-toggle]');
    if (button) {
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  function initTheme(env) {
    var theme = resolveTheme(env);
    applyTheme(env.document, theme);
    var button = env.document.querySelector('[data-theme-toggle]');
    if (button) {
      button.hidden = false;
      button.addEventListener('click', function () {
        var next = env.document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        writeStored(env.storage, next);
        applyTheme(env.document, next);
      });
    }
    return theme;
  }

  var api = { resolveTheme: resolveTheme, applyTheme: applyTheme, initTheme: initTheme };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    root.PortfolioTheme = api;
    var storage = null;
    try { storage = root.localStorage; } catch (e) { storage = null; }
    initTheme({
      document: root.document,
      storage: storage,
      matchMedia: root.matchMedia ? root.matchMedia.bind(root) : function () { return { matches: false }; },
    });
  }
})(typeof window !== 'undefined' ? window : globalThis);
