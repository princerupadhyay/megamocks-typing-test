/* MegaMocks — shared theme + nav helpers. Load this in every page. */

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = localStorage.getItem('theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
}

function toggleMenu() {
  document.getElementById('mobileNav')?.classList.toggle('open');
}

function closeMobileNav() {
  document.getElementById('mobileNav')?.classList.remove('open');
}

/* Highlight current nav link based on pathname */
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

window.addEventListener('DOMContentLoaded', () => {
  applyTheme(localStorage.getItem('theme') || 'light');
});

/* Called by pages after navbar is injected */
function initNav() {
  highlightNav();
  applyTheme(localStorage.getItem('theme') || 'light');
}
