/* =============================================
   MegaMocks — main.js
   Utility functions used by tool pages.
   Header/footer/theme/nav are handled by components.js
   ============================================= */

// ---- Copy to Clipboard ----
function copyResult(text, btn) {
  navigator.clipboard.writeText(text).then(function () {
    var orig = btn.textContent;
    btn.textContent = '✓ Copied!';
    setTimeout(function () { btn.textContent = orig; }, 2000);
  });
}

// ---- Print result ----
function printResult() { window.print(); }
