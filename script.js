const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {navLinks.classList.toggle("active");});

const toggle = document.getElementById("darkModeToggle");
const body = document.body;

// Charger préférence utilisateur
if(localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
  toggle.checked = false;
} else {
  body.classList.add("dark-mode");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  }
});
