const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

// Mode sombre
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
});

// Menu burger
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('active');
});
