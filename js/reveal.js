// One authored motion: sections fade up as they enter. Progressive enhancement:
// without IntersectionObserver, or with reduced motion, nothing is ever hidden.
(function (root) {
  'use strict';

  function initReveal(doc, IO, reducedMotionQuery) {
    if (typeof IO !== 'function') return null;
    if (reducedMotionQuery && reducedMotionQuery.matches) return null;
    var targets = Array.prototype.slice.call(doc.querySelectorAll('[data-reveal]'));
    if (!targets.length) return null;
    targets.forEach(function (el) { el.classList.add('reveal'); });
    var observer = new IO(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { observer.observe(el); });
    return observer;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initReveal: initReveal };
  } else {
    initReveal(root.document, root.IntersectionObserver, root.matchMedia ? root.matchMedia('(prefers-reduced-motion: reduce)') : null);
  }
})(typeof window !== 'undefined' ? window : globalThis);
