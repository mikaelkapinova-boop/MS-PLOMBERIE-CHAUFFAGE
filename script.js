
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  });

  // Mode sombre (toggle par touche D)
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "d") {
      document.body.dataset.theme =
        document.body.dataset.theme === "dark" ? "light" : "dark";
    }
  });
});
