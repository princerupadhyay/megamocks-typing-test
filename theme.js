/* MegaMocks — Centralized theme + nav helpers. Load this in every page. */

/* ── Theme ── */
function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  // Update every theme button on the page (navbar may be injected later)
  document.querySelectorAll('[data-theme-btn], #themeBtn').forEach(btn => {
    btn.textContent = isDark ? '☀️' : '🌙';
  });
}

function toggleTheme() {
  const current = localStorage.getItem('theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
  // Broadcast to other tabs
  try { localStorage.setItem('_themeSync', next + '_' + Date.now()); } catch (e) { }
}

/* ── Mobile menu ── */
function toggleMenu() {
  document.getElementById('mobileNav')?.classList.toggle('open');
}

function closeMobileNav() {
  document.getElementById('mobileNav')?.classList.remove('open');
}

/* ── Active nav link ── */
function highlightNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href');
    if (href === '/' ? path === '/' : path.startsWith(href)) {
      a.classList.add('active');
    }
  });
}

/* ── Sticky header scroll freeze ──
   Adds .scrolled class to <header> after 10px scroll so pages can style
   the "frozen" state (shadow, slightly reduced height, etc.)             */
function initScrollFreeze() {
  const header = document.querySelector('header');
  if (!header) return;

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 10);
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ── Sync theme across tabs ── */
window.addEventListener('storage', e => {
  if (e.key === '_themeSync' && e.newValue) {
    const theme = e.newValue.split('_')[0];
    applyTheme(theme);
  }
  if (e.key === 'theme') {
    applyTheme(e.newValue || 'light');
  }
});

/* ── Bootstrap on DOM ready ── */
window.addEventListener('DOMContentLoaded', () => {
  applyTheme(localStorage.getItem('theme') || 'light');
});

/* ── Called by pages after navbar HTML is injected via fetch ── */
function initNav() {
  highlightNav();
  applyTheme(localStorage.getItem('theme') || 'light');
  initScrollFreeze();

  // Wire the injected theme button if it uses onclick attribute
  const btn = document.getElementById('themeBtn');
  if (btn && !btn.dataset.wired) {
    btn.addEventListener('click', toggleTheme);
    btn.dataset.wired = '1';
  }
}