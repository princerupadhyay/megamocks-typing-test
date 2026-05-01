function applyTheme(theme) {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark", isDark);

  const icon = document.getElementById("themeIcon");
  const label = document.getElementById("themeLabel");

  if (icon && label) {
    icon.textContent = isDark ? "☀️" : "🌙";
    label.textContent = isDark ? "Light" : "Dark";
  }
}

function toggleTheme() {
  const current = localStorage.getItem("theme") || "light";
  const newTheme = current === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
}

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
});