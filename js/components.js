/* =============================================
   MegaMocks — Shared Header & Footer Components
   Injected via JS so changes propagate everywhere
   ============================================= */

(function () {

  /* ---- Detect root path relative to current page ---- */
  function getRoot() {
    const depth = location.pathname.split('/').filter(Boolean).length;
    // If served from file:// or single-level path, go up appropriately
    if (location.protocol === 'file:') {
      // Count how many folders deep we are from megamocks/
      const parts = location.pathname.split('/');
      const idx = parts.lastIndexOf('megamocks');
      const levelsDeep = parts.length - idx - 2; // -2: folder + filename
      return levelsDeep <= 0 ? './' : '../'.repeat(levelsDeep);
    }
    // For HTTP hosting detect by path segments
    const path = location.pathname;
    if (path.match(/\/(tools|pages|blog)\//)) return '../';
    return './';
  }

  const R = getRoot();

  /* =============================================
     SHARED HEADER HTML
     ============================================= */
  function buildHeader() {
    return `
<header>
  <nav>
    <a href="${R}index.html" class="logo">Mega<span>Mocks</span></a>
    <ul class="nav-links">
      <li><a href="${R}index.html">Home</a></li>
      <li><a href="${R}tools/">All Tools</a></li>
      <li><a href="${R}blog/">Blog</a></li>
      <li><a href="${R}about.html">About Us</a></li>
      <li><a href="${R}contact.html">Contact Us</a></li>
      <li><a href="${R}sitemap.html">Sitemap</a></li>
    </ul>
    <div class="nav-right">
      <button class="theme-toggle" id="themeToggle">☀️ Light</button>
      <div class="hamburger" id="hamburger">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>
  <div class="mobile-nav" id="mobileNav">
    <a href="${R}index.html">Home</a>
    <a href="${R}tools/">All Tools</a>
    <a href="${R}blog/">Blog</a>
    <a href="${R}about.html">About Us</a>
    <a href="${R}contact.html">Contact Us</a>
    <a href="${R}sitemap.html">Sitemap</a>
  </div>
</header>`;
  }

  /* =============================================
     SHARED FOOTER HTML
     ============================================= */
  function buildFooter() {
    return `
<footer>
  <div class="container">
    <div class="footer-grid">

      <div class="footer-brand">
        <a href="${R}index.html" class="logo">Mega<span>Mocks</span></a>
        <p>Simple, free study tools for students who want to study smarter and stress less. No login needed. No cost. Ever.</p>
      </div>

      <div class="footer-col">
        <h4>Study Tools</h4>
        <ul>
          <li><a href="${R}tools/false-confidence-detector.html">False Confidence Detector</a></li>
          <li><a href="${R}tools/revision-gap-finder.html">Revision Gap Finder</a></li>
          <li><a href="${R}tools/exam-readiness-index.html">Exam Readiness Index</a></li>
          <li><a href="${R}tools/notes-completeness-checker.html">Notes Completeness Checker</a></li>
          <li><a href="${R}tools/study-load-balance-checker.html">Study Load Balance Checker</a></li>
          <li><a href="${R}tools/">All Tools →</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>More Tools</h4>
        <ul>
          <li><a href="${R}tools/weak-topic-recovery-planner.html">Weak Topic Recovery Planner</a></li>
          <li><a href="${R}tools/pyq-coverage-tracker.html">PYQ Coverage Tracker</a></li>
          <li><a href="${R}tools/time-leakage-finder.html">Time Leakage Finder</a></li>
          <li><a href="${R}tools/daily-study-target-validator.html">Daily Study Target Validator</a></li>
          <li><a href="${R}tools/question-attempt-order-planner.html">Question Attempt Order Planner</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Blog</h4>
        <ul>
          <li><a href="${R}blog/false-confidence-in-studying.html">What Is False Confidence?</a></li>
          <li><a href="${R}blog/how-to-find-revision-gaps.html">How to Find Revision Gaps</a></li>
          <li><a href="${R}blog/exam-readiness-guide.html">Exam Readiness Guide</a></li>
          <li><a href="${R}blog/how-to-balance-study-load.html">How to Balance Study Load</a></li>
          <li><a href="${R}blog/">All Posts →</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Info</h4>
        <ul>
          <li><a href="${R}about.html">About</a></li>
          <li><a href="${R}contact.html">Contact</a></li>
          <li><a href="${R}privacy-policy.html">Privacy Policy</a></li>
          <li><a href="${R}disclaimer.html">Disclaimer</a></li>
          <li><a href="${R}terms.html">Terms &amp; Conditions</a></li>
          <li><a href="${R}sitemap.html">Sitemap</a></li>
        </ul>
      </div>

    </div>

    <div class="footer-bottom">
      <p>© 2025 MegaMocks — Free study tools for every student. No login. No cost. Made with care.</p>
    </div>
  </div>
</footer>
<button id="scrollTop" aria-label="Scroll to top">↑</button>`;
  }

  /* =============================================
     INJECT ON DOM READY
     ============================================= */
  document.addEventListener('DOMContentLoaded', function () {

    // --- Inject header ---
    const headerPlaceholder = document.getElementById('site-header');
    if (headerPlaceholder) {
      headerPlaceholder.outerHTML = buildHeader();
    }

    // --- Inject footer ---
    const footerPlaceholder = document.getElementById('site-footer');
    if (footerPlaceholder) {
      footerPlaceholder.outerHTML = buildFooter();
    }

    // --- Re-run main.js inits that depend on injected elements ---
    // Theme
    const saved = localStorage.getItem('mm_theme') || 'dark';
    if (saved === 'light') document.body.classList.add('light-mode');
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      themeBtn.innerHTML = document.body.classList.contains('light-mode') ? '🌙 Dark' : '☀️ Light';
      themeBtn.addEventListener('click', function () {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('mm_theme', isLight ? 'light' : 'dark');
        themeBtn.innerHTML = isLight ? '🌙 Dark' : '☀️ Light';
      });
    }

    // Mobile nav
    const ham = document.getElementById('hamburger');
    const mNav = document.getElementById('mobileNav');
    if (ham && mNav) {
      ham.addEventListener('click', function () {
        mNav.classList.toggle('open');
        // Animate hamburger to X
        ham.classList.toggle('active');
      });
      // Close when a nav link is tapped
      mNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mNav.classList.remove('open');
          ham.classList.remove('active');
        });
      });
      // Close when tapping outside
      document.addEventListener('click', function (e) {
        if (!ham.contains(e.target) && !mNav.contains(e.target)) {
          mNav.classList.remove('open');
          ham.classList.remove('active');
        }
      });
    }

    // Scroll to top
    const scrollBtn = document.getElementById('scrollTop');
    if (scrollBtn) {
      window.addEventListener('scroll', function () {
        scrollBtn.classList.toggle('show', window.scrollY > 400);
      });
      scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
        if (!isOpen) item.classList.add('open');
      });
    });

    // Range value displays
    document.querySelectorAll('input[type="range"]').forEach(function (range) {
      const valEl = document.getElementById(range.id + '_val');
      if (!valEl) return;
      valEl.textContent = range.value;
      range.addEventListener('input', function () { valEl.textContent = range.value; });
    });

  });

})();
