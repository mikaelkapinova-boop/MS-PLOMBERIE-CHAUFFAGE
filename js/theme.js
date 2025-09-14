// === GESTION DU THÈME ===
class ThemeManager {
  constructor() {
    this.root = document.documentElement;
    this.themeToggle = document.getElementById('theme-toggle');
    this.init();
  }

  init() {
    // Définir le thème initial
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.root.setAttribute('data-theme', savedTheme);
    
    // Configurer l'event listener
    this.themeToggle?.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme() {
    const currentTheme = this.root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    this.root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Animation de transition
    this.root.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      this.root.style.transition = '';
    }, 300);
  }
}

// Initialiser le gestionnaire de thème
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});
