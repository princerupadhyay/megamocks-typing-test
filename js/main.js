/* =============================================
   MegaMocks — Shared JavaScript Utilities
   ============================================= */

// ---- Theme Toggle ----
function initTheme() {
  const saved = localStorage.getItem('mm_theme') || 'dark';
  if (saved === 'light') document.body.classList.add('light-mode');
  updateThemeBtn();
}

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('mm_theme', isLight ? 'light' : 'dark');
  updateThemeBtn();
}

function updateThemeBtn() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const isLight = document.body.classList.contains('light-mode');
  btn.innerHTML = isLight ? '🌙 Dark' : '☀️ Light';
}

// ---- Mobile Nav ----
function initMobileNav() {
  const ham = document.getElementById('hamburger');
  const mNav = document.getElementById('mobileNav');
  if (!ham || !mNav) return;
  ham.addEventListener('click', () => mNav.classList.toggle('open'));
}

// ---- FAQ Accordion ----
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ---- Scroll To Top ----
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ---- Copy to Clipboard ----
function copyResult(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = '✓ Copied!';
    setTimeout(() => btn.textContent = orig, 2000);
  });
}

// ---- Print result ----
function printResult() { window.print(); }

// ---- Range value display ----
function initRangeDisplays() {
  document.querySelectorAll('input[type="range"]').forEach(range => {
    const valEl = document.getElementById(range.id + '_val');
    if (!valEl) return;
    valEl.textContent = range.value;
    range.addEventListener('input', () => valEl.textContent = range.value);
  });
}

// ---- On DOM ready ----
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initFAQ();
  initScrollTop();
  initRangeDisplays();

  // Theme button click
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
});
