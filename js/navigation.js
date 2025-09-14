// === GESTION DE LA NAVIGATION ===
class NavigationManager {
  constructor() {
    this.menuBtn = document.getElementById('menu-btn');
    this.menuOverlay = document.getElementById('menu-overlay');
    this.navbar = document.querySelector('.navbar');
    this.isMenuOpen = false;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupSmoothScrolling();
    this.setupScrollEffects();
  }

  setupEventListeners() {
    // Menu toggle
    this.menuBtn?.addEventListener('click', () => this.toggleMenu());
    
    // Fermer le menu en cliquant sur un lien
    this.menuOverlay?.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        this.closeMenu();
      }
    });
    
    // Fermer le menu avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    });

    // Navigation au clavier dans le menu
    document.addEventListener('keydown', (e) => {
      if (this.isMenuOpen) {
        this.handleKeyboardNavigation(e);
      }
    });
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isMenuOpen = true;
    this.menuBtn.classList.add('open');
    this.menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus sur le premier lien du menu
    const firstLink = this.menuOverlay.querySelector('a');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 300);
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.menuBtn.classList.remove('open');
    this.menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  handleKeyboardNavigation(e) {
    const menuLinks = this.menuOverlay.querySelectorAll('a');
    const currentFocus = document.activeElement;
    const currentIndex = Array.from(menuLinks).indexOf(currentFocus);
    
    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % menuLinks.length;
        menuLinks[nextIndex].focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = currentIndex <= 0 ? menuLinks.length - 1 : currentIndex - 1;
        menuLinks[prevIndex].focus();
        break;
      case 'Tab':
        // Laisser la navigation Tab naturelle
        break;
    }
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          const offsetTop = target.offsetTop - 60; // Header plus fin
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          this.closeMenu();
        }
      });
    });
  }

  setupScrollEffects() {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Header qui se cache/apparait
      if (scrollY > 100) {
        if (scrollY > lastScrollY && !this.isMenuOpen) {
          // Scroll vers le bas - cacher
          this.navbar.style.transform = 'translateY(-100%)';
        } else {
          // Scroll vers le haut - montrer
          this.navbar.style.transform = 'translateY(0)';
        }
        this.navbar.style.background = 'var(--navbar-bg)';
        this.navbar.style.backdropFilter = 'blur(20px) saturate(180%)';
      } else {
        this.navbar.style.transform = 'translateY(0)';
        this.navbar.style.background = 'var(--navbar-bg)';
      }
      
      lastScrollY = scrollY;
    };

    // Throttle pour optimiser les performances
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }
}

// Initialiser la navigation
document.addEventListener('DOMContentLoaded', () => {
  new NavigationManager();
});
