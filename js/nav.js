// Highlights the nav link of the section currently most visible and slides a
// single indicator under it. Progressive enhancement: without
// IntersectionObserver nothing happens and the anchors keep working as links.
(function (root) {
  'use strict';

  function createSectionObserver(doc, IO) {
    if (typeof IO !== 'function') return null;
    var links = Array.prototype.slice.call(doc.querySelectorAll('a.site-nav__link[href^="#"]'));
    var byId = {};
    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = doc.getElementById(id);
      if (section) { byId[id] = link; sections.push(section); }
    });

    var navEl = doc.querySelector('.site-nav');
    var indicator = null;
    if (navEl) {
      indicator = doc.createElement('span');
      indicator.className = 'site-nav__indicator';
      indicator.setAttribute('aria-hidden', 'true');
      navEl.appendChild(indicator);
      navEl.classList.add('site-nav--has-indicator');
    }

    function moveIndicator(link) {
      if (!indicator) return;
      // The indicator is 100px wide in CSS; only transform animates (no layout).
      if (!link) { indicator.style.transform = 'scaleX(0)'; return; }
      indicator.style.transform = 'translateX(' + link.offsetLeft + 'px) scaleX(' + (link.offsetWidth / 100) + ')';
    }

    var ratios = {};
    var observer = new IO(function (entries) {
      entries.forEach(function (entry) {
        ratios[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
      });
      var bestId = null, best = 0;
      Object.keys(ratios).forEach(function (id) {
        if (ratios[id] > best) { best = ratios[id]; bestId = id; }
      });
      links.forEach(function (link) {
        if (bestId && link === byId[bestId]) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
      moveIndicator(bestId ? byId[bestId] : null);
    }, { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });
    sections.forEach(function (s) { observer.observe(s); });
    return observer;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createSectionObserver: createSectionObserver };
  } else {
    createSectionObserver(root.document, root.IntersectionObserver);
  }
})(typeof window !== 'undefined' ? window : globalThis);
