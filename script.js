const themeToggle = document.getElementById('theme-toggle');
const menuBtn = document.getElementById('menu-btn');
const root = document.documentElement;

// Thème sombre par défaut
if (!localStorage.getItem('theme')) {
  root.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
} else {
  root.setAttribute('data-theme', localStorage.getItem('theme'));
}

themeToggle.addEventListener('click', () => {
  let current = root.getAttribute('data-theme');
  let next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
});
