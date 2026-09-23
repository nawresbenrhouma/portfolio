// Highlights the nav link of the section currently most visible and slides a
// single indicator under it. Progressive enhancement: without
// IntersectionObserver nothing happens and the anchors keep working as links.
(function (root) {
  'use strict';

  function createSectionObserver(doc, IO, win) {
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
    var navList = doc.querySelector('.site-nav__list');
    var indicator = null;
    var activeLink = null;
    if (navEl) {
      indicator = doc.createElement('span');
      indicator.className = 'site-nav__indicator';
      indicator.setAttribute('aria-hidden', 'true');
      navEl.appendChild(indicator);
      navEl.classList.add('site-nav--has-indicator');
    }

    function moveIndicator(link) {
      activeLink = link;
      if (!indicator) return;
      // The indicator is 100px wide in CSS; only transform animates (no layout).
      if (!link) { indicator.style.transform = 'scaleX(0)'; return; }
      // The list is the horizontal scroll container on narrow screens, so the
      // link's layout offset is corrected by the strip's current scroll.
      var scrolled = navList ? navList.scrollLeft : 0;
      indicator.style.transform = 'translateX(' + (link.offsetLeft - scrolled) + 'px) scaleX(' + (link.offsetWidth / 100) + ')';
    }
    // Scroll and resize fire often; measure once per frame, not per event.
    var framePending = false;
    function reposition() {
      if (framePending) return;
      framePending = true;
      var raf = win && win.requestAnimationFrame ? win.requestAnimationFrame.bind(win) : function (fn) { fn(); };
      raf(function () { framePending = false; moveIndicator(activeLink); });
    }
    if (navList && navList.addEventListener) navList.addEventListener('scroll', reposition, { passive: true });
    if (win && win.addEventListener) win.addEventListener('resize', reposition, { passive: true });

    var ratios = {};
    var observer = new IO(function (entries) {
      entries.forEach(function (entry) {
        ratios[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
      });
      var bestId = null, best = 0;
      Object.keys(ratios).forEach(function (id) {
        if (ratios[id] > best) { best = ratios[id]; bestId = id; }
      });
      // Nothing in the band (page top, before the first section): the first
      // section is current, so the indicator is visible from the first paint.
      if (!bestId && sections.length) bestId = sections[0].id;
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
    createSectionObserver(root.document, root.IntersectionObserver, root);
  }
})(typeof window !== 'undefined' ? window : globalThis);
