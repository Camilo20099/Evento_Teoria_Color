/* ==========================================
   MODA SOSTENIBLE — Scripts
   Autor: Juan Camilo Hurtado Sánchez
   ========================================== */

(function () {
  'use strict';

  /* ── PROGRESS BAR ── */
  function initProgress() {
    const bar = document.getElementById('progress-bar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const pct = (window.scrollY / max) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    });
  }

  /* ── NAV SHRINK ── */
  function initNav() {
    const nav = document.querySelector('.nav-top');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* ── HAMBURGER / MOBILE MENU ── */
  function initHamburger() {
    const btn  = document.getElementById('hamburger-btn');
    const menu = document.getElementById('mobile-menu');
    const close = document.getElementById('mobile-close');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => menu.classList.add('open'));
    if (close) close.addEventListener('click', () => menu.classList.remove('open'));
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => menu.classList.remove('open'));
    });
  }

  /* ── SCROLL REVEAL ── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
  }

  /* ── COUNTER ANIMATION ── */
  function animateCounter(el, target, suffix, duration) {
    const start = performance.now();
    const isDecimal = String(target).includes('.');
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
      if (suffix) el.dataset.suffix = suffix;
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix, 1600);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));
  }

  /* ── IMPACT CARDS ACCORDION ── */
  function initImpactCards() {
    const cards = document.querySelectorAll('.impact-card');
    if (!cards.length) return;
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const isActive = card.classList.contains('active');
        cards.forEach(c => c.classList.remove('active'));
        if (!isActive) card.classList.add('active');
      });
    });
    if (cards[0]) cards[0].classList.add('active');
  }

  /* ── FABRIC CARD TILT (subtle parallax on hover) ── */
  function initTilt() {
    const cards = document.querySelectorAll('.fabric-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ── SMOOTH SECTION HIGHLIGHT IN NAV ── */
  function initActiveSections() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !links.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('active-link'));
          const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
          if (active) active.classList.add('active-link');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => obs.observe(s));
  }

  /* ── SCORE DOTS ── */
  function initScoreDots() {
    document.querySelectorAll('.brand-card').forEach(card => {
      const score = parseInt(card.dataset.score || '0', 10);
      const dots  = card.querySelectorAll('.score-dot');
      dots.forEach((dot, i) => {
        if (i < score) dot.classList.add('filled');
      });
    });
  }

  /* ── FILTER BRANDS ── */
  function initFilter() {
    const btns  = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.brand-card');
    if (!btns.length) return;
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active-filter'));
        btn.classList.add('active-filter');
        const filter = btn.dataset.filter;
        cards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.style.opacity    = match ? '1' : '0.3';
          card.style.transform  = match ? '' : 'scale(0.97)';
          card.style.pointerEvents = match ? '' : 'none';
        });
      });
    });
  }

  /* ── READING TIME ── */
  function initReadingTime() {
    const el = document.getElementById('reading-time');
    if (!el) return;
    const words = document.body.innerText.split(/\s+/).length;
    const mins  = Math.max(1, Math.round(words / 200));
    el.textContent = mins + ' min de lectura';
  }

  /* ── INIT ALL ── */
  document.addEventListener('DOMContentLoaded', () => {
    initProgress();
    initNav();
    initHamburger();
    initReveal();
    initCounters();
    initImpactCards();
    initTilt();
    initActiveSections();
    initScoreDots();
    initFilter();
    initReadingTime();
  });

})();
