
// Sélecteurs
const burger = document.querySelector('.burger');
const menuOverlay = document.querySelector('.menu-overlay');
const body = document.body;

// Toggle menu burger
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  menuOverlay.classList.toggle('active');
});

// Fermer menu en cliquant sur un lien
document.querySelectorAll('.menu-overlay a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    menuOverlay.classList.remove('active');
  });
});

// Mode sombre / clair conserve l'état (déjà présent mais on sécurise)
const toggleTheme = document.querySelector('#theme-toggle');
if (toggleTheme) {
  toggleTheme.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  });

  // Charger la préférence sauvegardée
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(savedTheme === 'dark' ? 'dark-mode' : 'light-mode');
  }
}
