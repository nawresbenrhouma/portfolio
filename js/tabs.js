// Selected-work tabs. Progressive enhancement: without JavaScript every panel
// is visible and stacked; with it, one panel shows at a time and the tab row
// follows the WAI-ARIA tabs pattern (arrow keys, Home, End).
(function (root) {
  'use strict';

  function initTabs(doc) {
    var list = doc.querySelector('.tabs__list');
    var tabs = Array.prototype.slice.call(doc.querySelectorAll('.tab'));
    var panels = Array.prototype.slice.call(doc.querySelectorAll('.panel'));
    if (!list || !tabs.length) return null;

    // The markup ships without tab semantics: without JavaScript the panels
    // simply stack, and announcing "tabs" that do nothing would mislead.
    list.setAttribute('role', 'tablist');
    list.setAttribute('aria-label', list.getAttribute('data-tablist-label') || 'Tabs');
    list.classList.add('tabs__list--enhanced');
    tabs.forEach(function (tab) {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', tab.getAttribute('data-panel'));
      var panel = doc.getElementById(tab.getAttribute('data-panel'));
      if (panel) {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', tab.getAttribute('id'));
      }
    });

    function panelFor(tab) { return doc.getElementById(tab.getAttribute('aria-controls')); }

    function select(index, focus) {
      tabs.forEach(function (tab, i) {
        var active = i === index;
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
        tab.setAttribute('tabindex', active ? '0' : '-1');
        var panel = panelFor(tab);
        if (panel) panel.hidden = !active;
      });
      if (focus) tabs[index].focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i, false); });
      tab.addEventListener('keydown', function (ev) {
        var next = null;
        if (ev.key === 'ArrowRight') next = (i + 1) % tabs.length;
        else if (ev.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
        else if (ev.key === 'Home') next = 0;
        else if (ev.key === 'End') next = tabs.length - 1;
        if (next === null) return;
        ev.preventDefault();
        select(next, true);
      });
    });
    panels.forEach(function (panel) { panel.setAttribute('tabindex', '0'); });
    select(0, false);
    return { select: select };
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initTabs: initTabs };
  } else {
    initTabs(root.document);
  }
})(typeof window !== 'undefined' ? window : globalThis);
