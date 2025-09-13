// script.js - MS Plomberie Chauffage (Thème Apple intact)

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const darkToggle = document.getElementById("dark-mode-toggle");

  // Menu burger Apple
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active");
      menuToggle.setAttribute(
        "aria-expanded",
        menu.classList.contains("active")
      );
    });
  }

  // Dark mode (icône lune)
  if (darkToggle) {
    const applyTheme = (theme) => {
      if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
      }
    };

    // Charger thème initial
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      applyTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      applyTheme("dark");
    }

    darkToggle.addEventListener("click", () => {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      applyTheme(isDark ? "light" : "dark");
    });
  }

  // Formulaire contact
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      formMessage.textContent = "Votre message a bien été envoyé ✅";
      contactForm.reset();
    });
  }
});
