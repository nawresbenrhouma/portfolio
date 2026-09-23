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

    var indicator = doc.createElement('span');
    indicator.className = 'tabs__indicator';
    indicator.setAttribute('aria-hidden', 'true');
    list.appendChild(indicator);
    list.classList.add('tabs__list--enhanced');

    function panelFor(tab) { return doc.getElementById(tab.getAttribute('aria-controls')); }

    function select(index, focus) {
      tabs.forEach(function (tab, i) {
        var active = i === index;
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
        tab.setAttribute('tabindex', active ? '0' : '-1');
        var panel = panelFor(tab);
        if (panel) panel.hidden = !active;
      });
      var tab = tabs[index];
      indicator.style.transform = 'translateX(' + tab.offsetLeft + 'px) scaleX(' + (tab.offsetWidth / 100) + ')';
      if (focus) tab.focus();
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
    if (root.addEventListener) {
      root.addEventListener('resize', function () {
        var current = root.document.querySelector('.tab[aria-selected="true"]');
        if (current) current.click();
      }, { passive: true });
    }
  }
})(typeof window !== 'undefined' ? window : globalThis);
