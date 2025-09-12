
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  });
  const darkToggle = document.getElementById("dark-mode-toggle");
  darkToggle.addEventListener("click", () => {
    document.body.dataset.theme =
      document.body.dataset.theme === "dark" ? "light" : "dark";
  });
});
