/* ============================
   NIKHIL DEEPAK PATEL — PORTFOLIO
   Premium Interactions
============================= */

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.style.overflow = '';
  }, 2000);
});
document.body.style.overflow = 'hidden';

// ===== CUSTOM CURSOR =====
const cursorOuter = document.getElementById('cursorOuter');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let outerX = 0, outerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
  cursorDot.classList.add('active');
  cursorOuter.classList.add('active');
});

// Smooth outer cursor
function animateCursor() {
  outerX += (mouseX - outerX) * 0.12;
  outerY += (mouseY - outerY) * 0.12;
  cursorOuter.style.left = outerX + 'px';
  cursorOuter.style.top = outerY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effects
document.querySelectorAll('a, button, .project-item:not(.coming)').forEach(el => {
  el.addEventListener('mouseenter', () => cursorOuter.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorOuter.classList.remove('hovered'));
});

// ===== NAVBAR SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal-fade');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger children in same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal-fade:not(.visible)')];
      const delay = siblings.indexOf(entry.target) * 100;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// Section titles split reveal
document.querySelectorAll('.section-title, .contact-title').forEach(el => {
  const html = el.innerHTML;
  el.innerHTML = `<span class="reveal-title-inner">${html}</span>`;
  
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      el.classList.add('visible');
      obs.unobserve(el);
    }
  }, { threshold: 0.2 });
  obs.observe(el);
});

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const width = target.style.width;
      target.style.width = '0';
      setTimeout(() => { target.style.width = width; }, 200);
      skillObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });
skillBars.forEach(bar => skillObserver.observe(bar));

// ===== NUMBER COUNTER =====
function animateCount(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start).toLocaleString();
    if (start >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCount(el, parseInt(el.dataset.count));
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ===== PROJECT HOVER EFFECT =====
document.querySelectorAll('.project-item:not(.coming)').forEach(item => {
  item.addEventListener('mouseenter', () => {
    document.querySelectorAll('.project-item:not(.coming)').forEach(other => {
      if (other !== item) other.style.opacity = '0.35';
    });
  });
  item.addEventListener('mouseleave', () => {
    document.querySelectorAll('.project-item:not(.coming)').forEach(other => {
      other.style.opacity = '';
    });
  });
});

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

console.log('%c✦ Nikhil Deepak Patel — Portfolio', 'font-family:Georgia,serif; font-size:14px; color:#c9a84c; background:#1a1714; padding:12px 20px; border-radius:4px;');
