/* H A S Royal Cool Service - main.js (plain JavaScript, no libraries)
   Menu, sticky header, Google Ads call-conversion on Call Now taps,
   Web3Forms booking form, area pre-fill, lazy video, scroll reveal. */
(function () {
  'use strict';
  var CONFIG = {
    endpoint: 'https://api.web3forms.com/submit',
    thankYou: 'thank-you.html',
    conversion: { send_to: 'AW-18336661507/VGGbCNzsueUcEIOAzadE' }
  };
  function fire() {
    try { if (typeof window.gtag === 'function') window.gtag('event', 'conversion', CONFIG.conversion); } catch (e) {}
  }
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn();
  }

  ready(function () {
    var i, el;
    /* every Call Now (tel:) tap = Google Ads conversion */
    var tel = document.querySelectorAll('a[href^="tel:"]');
    for (i = 0; i < tel.length; i++) tel[i].addEventListener('click', fire);

    /* sticky header shadow */
    var header = document.querySelector('.site-header');
    if (header) {
      var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 10); };
      window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }

    /* mobile menu */
    var toggle = document.querySelector('.menu-toggle'), menu = document.getElementById('mobileMenu');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
        if (open) menu.setAttribute('hidden', ''); else menu.removeAttribute('hidden');
      });
    }

    /* booking forms */
    var forms = document.querySelectorAll('form.service-form');
    for (i = 0; i < forms.length; i++) setupForm(forms[i]);

    /* ?area=Katra&service=... pre-fills the booking form */
    try {
      var q = new URLSearchParams(location.search), a = q.get('area'), s = q.get('service');
      if (a) { el = document.querySelector('form.service-form input[name="area"]'); if (el) el.value = a; }
      if (s) { el = document.querySelector('form.service-form select[name="service"]'); if (el) el.value = s; }
    } catch (e) {}

    /* scroll reveal (content stays visible if JS or observer is missing) */
    var rv = document.querySelectorAll('.rv');
    if ('IntersectionObserver' in window && rv.length) {
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
      }, { rootMargin: '0px 0px -40px 0px' });
      for (i = 0; i < rv.length; i++) io.observe(rv[i]);
    } else { for (i = 0; i < rv.length; i++) rv[i].classList.add('in'); }

    /* video plays only while visible */
    var vids = document.querySelectorAll('video.lazy-video');
    if (vids.length && 'IntersectionObserver' in window) {
      var vo = new IntersectionObserver(function (en) {
        en.forEach(function (x) {
          if (x.isIntersecting) { var p = x.target.play(); if (p && p.catch) p.catch(function () {}); }
          else x.target.pause();
        });
      }, { threshold: 0.45 });
      for (i = 0; i < vids.length; i++) vo.observe(vids[i]);
    }

    /* instant-open: prefetch a page on hover/touch (http/https only) */
    if (/^https?:$/.test(location.protocol)) {
      var done = {};
      var pf = function (e) {
        var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
        if (!a || a.origin !== location.origin || a.target === '_blank') return;
        var u = a.href.split('#')[0];
        if (u === location.href.split('#')[0] || done[u]) return;
        done[u] = 1;
        var l = document.createElement('link'); l.rel = 'prefetch'; l.href = u; l.as = 'document';
        document.head.appendChild(l);
      };
      document.addEventListener('mouseover', pf, { passive: true });
      document.addEventListener('touchstart', pf, { passive: true });
    }
  });

  function setupForm(form) {
    var btn = form.querySelector('.submit-btn');
    var card = form.closest('.form-card');
    var err = card ? card.querySelector('.form-error') : null;
    var idle = btn ? btn.innerHTML : '';
    function fail(msg) {
      if (err) { err.textContent = msg; err.removeAttribute('hidden'); }
      if (btn) { btn.disabled = false; btn.innerHTML = idle; }
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!btn) return;
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Booking...';
      if (err) err.setAttribute('hidden', '');
      fetch(CONFIG.endpoint, { method: 'POST', body: new FormData(form) })
        .then(function (r) { return r.json().then(function (j) { return { s: r.status, j: j }; }); })
        .then(function (r) {
          if (r.s === 200) { btn.textContent = 'Success!'; window.location.href = CONFIG.thankYou; }
          else fail((r.j && r.j.message) || 'Something went wrong');
        })
        .catch(function () { fail('Something went wrong! Please try again.'); });
    });
  }
})();
