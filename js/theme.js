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
    }
  }

  // A theme switch replays the hero stack's request pass (skipped when the
  // animations do not exist, e.g. under reduced motion or without the API).
  function replayStack(doc) {
    var nodes = doc.querySelectorAll ? doc.querySelectorAll('.stack__pulse, .stack__top') : [];
    Array.prototype.forEach.call(nodes, function (el) {
      if (typeof el.getAnimations !== 'function') return;
      el.getAnimations().forEach(function (a) {
        a.cancel();
        a.play();
        a.currentTime = 1800; // skip the load delay: start the pass immediately
      });
    });
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
        replayStack(env.document);
      });
    }
    return theme;
  }

  var api = { resolveTheme: resolveTheme, applyTheme: applyTheme, initTheme: initTheme, replayStack: replayStack };

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
