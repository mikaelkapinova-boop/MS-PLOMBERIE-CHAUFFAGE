// === FONCTIONS UTILITAIRES ===

// Débounce pour optimiser les performances
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle pour le scroll
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Gestion des erreurs d'images
function handleImageErrors() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      console.warn('Image failed to load:', this.src);
      
      // Cacher l'image et son conteneur parent si c'est un gallery-item
      this.style.display = 'none';
      const parent = this.closest('.gallery-item');
      if (parent) {
        parent.style.display = 'none';
      }
    });
    
    // Lazy loading pour les images
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
  });
}

// Lazy loading pour les images
function setupLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Préchargement des ressources critiques
function preloadCriticalResources() {
  const criticalImages = [
    'https://raw.githubusercontent.com/mikaelkapinova-boop/images/main/logo.png',
    'https://raw.githubusercontent.com/mikaelkapinova-boop/images/main/real1.jpg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Validation email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Formatage du numéro de téléphone français
function formatPhoneNumber(phone) {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(?=\d)/g, '$1 ');
  }
  return phone;
}

// Détection du type d'appareil
function getDeviceType() {
  const width = window.innerWidth;
  if (width <= 480) return 'mobile';
  if (width <= 768) return 'tablet';
  return 'desktop';
}

// Smooth scroll vers un élément
function smoothScrollTo(target, offset = 70) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;
  
  const offsetTop = element.offsetTop - offset;
  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth'
  });
}

// Générer un ID unique
function generateUniqueId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Analytics et tracking
function trackEvent(eventName, parameters = {}) {
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters);
  }
  
  // Facebook Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', eventName, parameters);
  }
  
  console.log(`Event tracked: ${eventName}`, parameters);
}

// Gestion du localStorage avec fallback
function safeLocalStorage() {
  try {
    return window.localStorage;
  } catch (e) {
    // Fallback pour les navigateurs en mode privé
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {}
    };
  }
}

// Détection des capacités du navigateur
function getBrowserCapabilities() {
  return {
    webp: (() => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
    })(),
    avif: (() => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/avif').indexOf('image/avif') === 5;
    })(),
    intersectionObserver: 'IntersectionObserver' in window,
    serviceWorker: 'serviceWorker' in navigator,
    webGL: (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      } catch (e) {
        return false;
      }
    })()
  };
}

// Optimisation des performances
function optimizePerformance() {
  // Précharger les ressources critiques
  preloadCriticalResources();
  
  // Configurer le lazy loading
  setupLazyLoading();
  
  // Optimiser les images en fonction des capacités du navigateur
  const capabilities = getBrowserCapabilities();
  if (capabilities.webp) {
    document.documentElement.classList.add('webp-support');
  }
  
  // Déférer les scripts non critiques
  deferNonCriticalScripts();
}

// Déférer les scripts non critiques
function deferNonCriticalScripts() {
  const scripts = [
    'https://www.googletagmanager.com/gtag/js',
    'https://connect.facebook.net/en_US/fbevents.js'
  ];
  
  window.addEventListener('load', () => {
    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    });
  });
}

// Gestion des erreurs globales
function setupErrorHandling() {
  window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    
    // En production, envoyer à un service de monitoring
    if (window.location.hostname !== 'localhost') {
      trackEvent('javascript_error', {
        error_message: e.message,
        error_filename: e.filename,
        error_lineno: e.lineno
      });
    }
  });
  
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    
    trackEvent('promise_rejection', {
      error_message: e.reason?.message || 'Unknown promise rejection'
    });
  });
}

// Accessibilité améliorée
function enhanceAccessibility() {
  // Focus visible pour la navigation au clavier
  let isKeyboardUser = false;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      isKeyboardUser = true;
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    isKeyboardUser = false;
    document.body.classList.remove('keyboard-navigation');
  });
  
  // Skip links
  addSkipLinks();
  
  // ARIA labels dynamiques
  updateAriaLabels();
}

// Ajouter des liens de navigation rapide
function addSkipLinks() {
  const skipLinks = document.createElement('div');
  skipLinks.className = 'skip-links';
  skipLinks.innerHTML = `
    <a href="#main" class="skip-link">Aller au contenu principal</a>
    <a href="#services" class="skip-link">Aller aux services</a>
    <a href="#contact" class="skip-link">Aller au contact</a>
  `;
  
  document.body.insertBefore(skipLinks, document.body.firstChild);
}

// Mettre à jour les labels ARIA
function updateAriaLabels() {
  // Ajouter des labels aux éléments interactifs
  document.querySelectorAll('button:not([aria-label])').forEach(btn => {
    const text = btn.textContent || btn.innerHTML;
    if (!text.includes('<')) {
      btn.setAttribute('aria-label', text);
    }
  });
  
  // Labels pour les liens externes
  document.querySelectorAll('a[href^="http"]:not([aria-label])').forEach(link => {
    link.setAttribute('aria-label', `${link.textContent} (lien externe)`);
  });
}

// Gestion du mode hors ligne
function setupOfflineSupport() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered:', registration);
        })
        .catch(error => {
          console.log('SW registration failed:', error);
        });
    });
  }
  
  // Indicateur de connexion
  window.addEventListener('online', () => {
    showConnectionStatus('Connexion rétablie', 'success');
  });
  
  window.addEventListener('offline', () => {
    showConnectionStatus('Mode hors ligne', 'warning');
  });
}

// Afficher le statut de connexion
function showConnectionStatus(message, type) {
  const notification = document.createElement('div');
  notification.className = `connection-status connection-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    font-weight: 600;
    z-index: 10000;
    background: ${type === 'success' ? '#4CAF50' : '#ff9800'};
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Initialisation des utilitaires
function initUtils() {
  handleImageErrors();
  optimizePerformance();
  setupErrorHandling();
  enhanceAccessibility();
  setupOfflineSupport();
}

// Auto-initialisation
document.addEventListener('DOMContentLoaded', initUtils);

// Export des fonctions pour utilisation globale
window.MSPlomberieUtils = {
  debounce,
  throttle,
  isValidEmail,
  formatPhoneNumber,
  getDeviceType,
  smoothScrollTo,
  generateUniqueId,
  trackEvent,
  safeLocalStorage,
  getBrowserCapabilities
};
