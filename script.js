const themeToggle = document.getElementById('theme-toggle');
const menuBtn = document.getElementById('menu-btn');
const menuOverlay = document.getElementById('menu-overlay');
const root = document.documentElement;

// Thème sombre par défaut
if (!localStorage.getItem('theme')) {
  root.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
} else {
  root.setAttribute('data-theme', localStorage.getItem('theme'));
}

// Toggle thème
themeToggle.addEventListener('click', () => {
  let current = root.getAttribute('data-theme');
  let next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Menu burger
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  menuOverlay.classList.toggle('active');
});

// Fermer le menu en cliquant sur un lien
menuOverlay.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    menuBtn.classList.remove('open');
    menuOverlay.classList.remove('active');
  }
});

// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
