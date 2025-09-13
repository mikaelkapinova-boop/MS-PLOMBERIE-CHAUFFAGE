// script.js - Burger + Mode sombre (Apple style)
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const darkToggle = document.getElementById("dark-mode-toggle");

  // Burger menu avec croix
  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active");
      if (menu.classList.contains("active")) {
        // Ajouter un bouton croix
        if (!document.querySelector(".menu-close")) {
          const closeBtn = document.createElement("button");
          closeBtn.textContent = "✕";
          closeBtn.classList.add("menu-close");
          closeBtn.setAttribute("aria-label", "Fermer le menu");
          menu.appendChild(closeBtn);
          closeBtn.addEventListener("click", () => {
            menu.classList.remove("active");
            closeBtn.remove();
          });
        }
      } else {
        const closeBtn = document.querySelector(".menu-close");
        if (closeBtn) closeBtn.remove();
      }
    });
  }

  // Dark mode 🌙
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

  // Formulaire contact (simulation côté client)
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
