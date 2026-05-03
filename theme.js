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

/* ── Fixed navbar freeze ──
   Switches the header to position:fixed after any scroll, and adds a
   spacer element so page content doesn't jump under it.                 */
function initScrollFreeze() {
  const header = document.querySelector('header');
  if (!header) return;

  // Create a spacer that holds the header's reserved space
  let spacer = document.getElementById('_navSpacer');
  if (!spacer) {
    spacer = document.createElement('div');
    spacer.id = '_navSpacer';
    spacer.style.cssText = 'display:none;flex-shrink:0;';
    header.parentElement.insertBefore(spacer, header);
  }

  function applyFixed() {
    const h = header.offsetHeight;
    // Lock it fixed
    header.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
      z-index: 9999 !important;
    `;
    // Spacer fills the gap
    spacer.style.cssText = `display:block;height:${h}px;flex-shrink:0;`;
  }

  let ticking = false;
  let fixed = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY > 4;
        if (scrolled && !fixed) {
          fixed = true;
          applyFixed();
        }
        header.style.boxShadow = scrolled ? '0 4px 24px rgba(0,0,0,0.09)' : '';
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { if (fixed) applyFixed(); });
  onScroll();
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