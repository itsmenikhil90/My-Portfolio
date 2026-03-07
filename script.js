/* ════════════════════════════════════════
   DARK BOLD MINIMAL PORTFOLIO
   script.js
   ════════════════════════════════════════ */

'use strict';

/* ── MOBILE NAV ── */
const burger  = document.getElementById('burger');
const mobNav  = document.getElementById('mob-nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobNav.classList.toggle('open');
});

mobNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobNav.classList.remove('open');
  });
});

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    // stagger siblings
    const parent = entry.target.parentElement;
    const siblings = [...parent.querySelectorAll('.reveal:not(.visible)')];
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('visible'), idx * 90);
    ro.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

revealEls.forEach(el => ro.observe(el));

/* ── NUMBER COUNTER ── */
function countUp(el, target, duration = 1800, suffix = '+') {
  const start = performance.now();
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  function frame(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(easeOut(p) * target) + suffix;
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(frame);
}

/* ── HERO COUNTERS ── */
// ⬇ Change 50, 30, 5 to your real stats
const c1 = document.getElementById('c1');
const c2 = document.getElementById('c2');
const c3 = document.getElementById('c3');

const heroObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    setTimeout(() => countUp(c1,1), 200);
    setTimeout(() => countUp(c2,0), 350);
    setTimeout(() => countUp(c3, 1, 1200), 500);
    heroObs.disconnect();
  }
}, { threshold: 0.3 });
if (c1) heroObs.observe(c1);

/* ── SKILL BARS + PCT LABELS ── */
const skillFills = document.querySelectorAll('.skill-fill');
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const pct = entry.target.getAttribute('data-pct');
    const card = entry.target.closest('.skill-card');
    const label = card?.querySelector('.skill-pct');

    setTimeout(() => {
      entry.target.style.width = pct + '%';
    }, 150);

    if (label) {
      const end = parseInt(pct);
      const start = performance.now();
      const dur = 1400;
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        label.textContent = Math.round(ease * end) + '%';
        if (p < 1) requestAnimationFrame(tick);
        else label.textContent = end + '%';
      }
      requestAnimationFrame(tick);
    }

    skillObs.unobserve(entry.target);
  });
}, { threshold: 0.5 });

skillFills.forEach(b => skillObs.observe(b));

/* ── CONTACT FORM ── */
const form      = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText   = document.getElementById('btn-text');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const original = btnText.textContent;
    btnText.textContent = 'Sending…';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';

    // ← Replace this timeout with your real API call / Formspree
    setTimeout(() => {
      btnText.textContent = 'Sent ✓';
      submitBtn.style.background = '#4ade80';
      submitBtn.style.opacity = '1';

      setTimeout(() => {
        btnText.textContent = original;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        form.reset();
      }, 3000);
    }, 1200);
  });
}

