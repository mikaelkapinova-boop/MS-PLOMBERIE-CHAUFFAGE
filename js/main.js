/**
 * MS PLOMBERIE CHAUFFAGE - Fichier principal
 * Initialise et coordonne tous les modules du site
 */

// === ÉTAT GLOBAL DE L'APPLICATION ===
const AppState = {
  isInitialized: false,
  currentSection: 'home',
  menuOpen: false,
  theme: 'dark',
  isMobile: window.innerWidth <= 768,
  scrollY: 0,
  testimonials: []
};

// === CLASSE PRINCIPALE DE L'APPLICATION ===
class MSPlomberieApp {
  constructor() {
    this.modules = {};
    this.observers = [];
    this.init();
  }

  async init() {
    try {
      // 1. Initialiser la configuration
      await this.loadConfig();
      
      // 2. Initialiser le thème
      this.initTheme();
      
      // 3. Initialiser la navigation avec menu 2 barres
      this.initNavigation();
      
      // 4. Configurer les animations au défilement
      this.initScrollAnimations();
      
      // 5. Initialiser la carte et les témoignages
      this.initMapsAndTestimonials();
      
      // 6. Configurer les formulaires
      this.initForms();
      
      // 7. Initialiser les utilitaires
      this.initUtils();
      
      // 8. Configurer les événements globaux
      this.setupGlobalEvents();
      
      // 9. Gérer les images et erreurs
      this.handleImages();
      
      // 10. Marquer comme initialisé
      AppState.isInitialized = true;
      this.trackEvent('app_initialized');
      
      console.log('✅ MS PLOMBERIE CHAUFFAGE - Application initialisée');
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation:', error);
      this.handleInitError(error);
    }
  }

  // === CHARGEMENT DE LA CONFIGURATION ===
  async loadConfig() {
    // Configuration EmailJS
    if (typeof emailjs !== 'undefined') {
      emailjs.init(CONFIG.emailjs.publicKey);
    }
    
    // Configuration du thème sauvegardé
    const savedTheme = localStorage.getItem('theme') || 'dark';
    AppState.theme = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  // === INITIALISATION DU THÈME ===
  initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  }

  toggleTheme() {
    const newTheme = AppState.theme === 'dark' ? 'light' : 'dark';
    AppState.theme = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this.trackEvent('theme_changed', { theme: newTheme });
  }

  // === INITIALISATION DE LA NAVIGATION (MENU 2 BARRES) ===
  initNavigation() {
    const menuBtn = document.getElementById('menu-btn');
    const menuOverlay = document.getElementById('menu-overlay');
    
    if (menuBtn && menuOverlay) {
      // Clic sur le bouton menu
      menuBtn.addEventListener('click', () => {
        this.toggleMenu();
      });
      
      // Fermer le menu en cliquant sur un lien
      menuOverlay.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          this.closeMenu();
        }
      });
      
      // Navigation fluide
      this.setupSmoothScrolling();
      
      // Navbar au scroll (style Apple)
      this.setupNavbarScroll();
    }
  }

  toggleMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const menuOverlay = document.getElementById('menu-overlay');
    
    AppState.menuOpen = !AppState.menuOpen;
    
    // Animation menu 2 barres vers croix
    menuBtn.classList.toggle('open', AppState.menuOpen);
    menuOverlay.classList.toggle('active', AppState.menuOpen);
    
    // Empêcher le scroll
    document.body.style.overflow = AppState.menuOpen ? 'hidden' : '';
    
    this.trackEvent('menu_toggled', { open: AppState.menuOpen });
  }

  closeMenu() {
    AppState.menuOpen = false;
    document.getElementById('menu-btn')?.classList.remove('open');
    document.getElementById('menu-overlay')?.classList.remove('active');
    document.body.style.overflow = '';
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          const offsetTop = target.offsetTop - 50; // Header fin comme Apple
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          this.closeMenu();
          this.trackEvent('section_navigated', { section: anchor.getAttribute('href') });
        }
      });
    });
  }

  setupNavbarScroll() {
    let lastScrollY = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', this.throttle(() => {
      const currentScrollY = window.scrollY;
      AppState.scrollY = currentScrollY;
      
      if (navbar) {
        // Style Apple - navbar qui disparaît/apparaît
        if (currentScrollY > 100) {
          navbar.classList.add('scrolled');
          
          if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.classList.add('hidden');
          } else {
            navbar.classList.remove('hidden');
          }
        } else {
          navbar.classList.remove('scrolled', 'hidden');
        }
      }
      
      lastScrollY = currentScrollY;
    }, 16));
  }

  // === ANIMATIONS AU DÉFILEMENT ===
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Animations en cascade pour les grilles
          this.triggerStaggeredAnimations(entry.target);
        }
      });
    }, observerOptions);

    // Observer tous les éléments animés
    document.querySelectorAll('.animate-fade-up, .animate-slide-left, .animate-slide-right, .animate-scale').forEach(el => {
      observer.observe(el);
    });

    this.observers.push(observer);
  }

  triggerStaggeredAnimations(element) {
    const staggerElements = element.parentElement?.querySelectorAll('[class*="stagger-"]');
    if (staggerElements) {
      staggerElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animate-in');
        }, index * 100);
      });
    }
  }

  // === CARTE ET TÉMOIGNAGES ===
  initMapsAndTestimonials() {
    this.initMap();
    this.initTestimonialForm();
    this.loadTestimonials();
  }

  initMap() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      // Coordonnées de Nancy
      const nancyLat = 48.6921;
      const nancyLng = 6.1844;
      
      const map = L.map('map').setView([nancyLat, nancyLng], 9);
      
      // Tuiles de la carte
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      
      // Marqueur Nancy
      const nancyMarker = L.marker([nancyLat, nancyLng]).addTo(map)
        .bindPopup('<b>MS PLOMBERIE CHAUFFAGE</b><br>Zone de Nancy');
      
      // Cercle de 80km
      const serviceArea = L.circle([nancyLat, nancyLng], {
        color: '#f44336',
        fillColor: '#f44336',
        fillOpacity: 0.1,
        radius: 80000
      }).addTo(map);
      
      serviceArea.bindPopup('Zone d\'intervention - 80km autour de Nancy');
      
      this.trackEvent('map_initialized');
    }
  }

  initTestimonialForm() {
    const testimonialBtn = document.getElementById('add-testimonial-btn');
    if (testimonialBtn) {
      testimonialBtn.addEventListener('click', () => {
        this.showTestimonialModal();
      });
    }
  }

  showTestimonialModal() {
    const modal = document.createElement('div');
    modal.className = 'testimonial-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Ajouter un témoignage</h3>
          <button class="modal-close">&times;</button>
        </div>
        <form id="testimonial-form">
          <div class="form-group">
            <label for="testimonial-name">Nom *</label>
            <input type="text" id="testimonial-name" required>
          </div>
          <div class="form-group">
            <label for="testimonial-location">Ville</label>
            <input type="text" id="testimonial-location" placeholder="Nancy">
          </div>
          <div class="form-group">
            <label for="testimonial-rating">Note</label>
            <div class="star-rating" id="star-rating">
              <span data-rating="1">⭐</span>
              <span data-rating="2">⭐</span>
              <span data-rating="3">⭐</span>
              <span data-rating="4">⭐</span>
              <span data-rating="5">⭐</span>
            </div>
          </div>
          <div class="form-group">
            <label for="testimonial-text">Votre témoignage *</label>
            <textarea id="testimonial-text" rows="4" required></textarea>
          </div>
          <button type="submit" class="btn">Publier le témoignage</button>
        </form>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Gestion du formulaire
    this.setupTestimonialFormHandlers(modal);
  }

  setupTestimonialFormHandlers(modal) {
    const form = modal.querySelector('#testimonial-form');
    const closeBtn = modal.querySelector('.modal-close');
    const stars = modal.querySelectorAll('.star-rating span');
    let selectedRating = 5;
    
    // Gestion des étoiles
    stars.forEach(star => {
      star.addEventListener('click', (e) => {
        selectedRating = parseInt(e.target.dataset.rating);
        this.updateStarDisplay(stars, selectedRating);
      });
    });
    
    // Fermeture
    closeBtn.addEventListener('click', () => {
      modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    // Soumission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitTestimonial(form, selectedRating, modal);
    });
  }

  updateStarDisplay(stars, rating) {
    stars.forEach((star, index) => {
      star.style.opacity = index < rating ? '1' : '0.3';
    });
  }

  async submitTestimonial(form, rating, modal) {
    const formData = new FormData(form);
    const testimonial = {
      name: formData.get('testimonial-name') || form.querySelector('#testimonial-name').value,
      location: formData.get('testimonial-location') || form.querySelector('#testimonial-location').value || 'Nancy',
      rating: rating,
      text: formData.get('testimonial-text') || form.querySelector('#testimonial-text').value,
      date: new Date().toISOString()
    };
    
    try {
      // Sauvegarder localement (en production, envoyer à un serveur)
      this.saveTestimonial(testimonial);
      this.addTestimonialToDOM(testimonial);
      
      this.showNotification('✅ Témoignage ajouté avec succès !', 'success');
      modal.remove();
      
      this.trackEvent('testimonial_added', { rating: rating });
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout du témoignage:', error);
      this.showNotification('❌ Erreur lors de l\'ajout du témoignage', 'error');
    }
  }

  saveTestimonial(testimonial) {
    const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    testimonials.push(testimonial);
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
    AppState.testimonials = testimonials;
  }

  loadTestimonials() {
    const savedTestimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    AppState.testimonials = savedTestimonials;
    
    savedTestimonials.forEach(testimonial => {
      this.addTestimonialToDOM(testimonial);
    });
  }

  addTestimonialToDOM(testimonial) {
    const testimonialsContainer = document.querySelector('.testimonials');
    if (!testimonialsContainer) return;
    
    const testimonialCard = document.createElement('div');
    testimonialCard.className = 'testimonial-card animate-fade-up';
    testimonialCard.innerHTML = `
      <p class="testimonial-text">"${testimonial.text}"</p>
      <p class="testimonial-author">— ${testimonial.name}, ${testimonial.location}</p>
      <div class="testimonial-rating">${'⭐'.repeat(testimonial.rating)}</div>
    `;
    
    testimonialsContainer.appendChild(testimonialCard);
  }

  // === GESTION DES FORMULAIRES ===
  initForms() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
    }
  }

  async handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // État de chargement
    submitBtn.innerHTML = '<span class="loading"></span>Envoi en cours...';
    submitBtn.disabled = true;
    
    try {
      const formData = new FormData(form);
      const emailData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone') || 'Non renseigné',
        service: formData.get('service') || 'Non spécifié',
        message: formData.get('message'),
        to_name: 'MS PLOMBERIE CHAUFFAGE',
        to_email: 'ms.plomberie.chauffage.nancy@gmail.com'
      };
      
      // Validation
      if (!emailData.name || !emailData.email || !emailData.message) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }
      
      // Envoyer avec EmailJS
      if (typeof emailjs !== 'undefined') {
        const response = await emailjs.send(
          CONFIG.emailjs.serviceId,
          CONFIG.emailjs.templateId,
          emailData
        );
        
        if (response.status === 200) {
          this.showNotification('✅ Message envoyé avec succès !', 'success');
          form.reset();
          this.trackEvent('contact_form_submitted', { service: emailData.service });
        }
      } else {
        throw new Error('EmailJS non disponible');
      }
      
    } catch (error) {
      console.error('Erreur envoi formulaire:', error);
      this.showNotification('❌ Erreur lors de l\'envoi. Appelez-nous au 07 49 24 85 59', 'error');
    } finally {
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1000);
    }
  }

  // === GESTION DES IMAGES ===
  handleImages() {
    // Gestion des erreurs d'images
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', function() {
        console.warn('Erreur de chargement image:', this.src);
        
        // Cacher l'image ou afficher un placeholder
        if (this.classList.contains('logo-img')) {
          this.style.display = 'none';
          const logoText = this.parentElement.querySelector('.logo-text');
          if (logoText) logoText.style.display = 'inline';
        } else {
          const parent = this.closest('.gallery-item');
          if (parent) {
            parent.style.display = 'none';
          }
        }
      });
    });
    
    // Lazy loading
    this.setupLazyLoading();
  }

  setupLazyLoading() {
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
      
      this.observers.push(imageObserver);
    }
  }

  // === UTILITAIRES ===
  initUtils() {
    // Gestion responsive
    window.addEventListener('resize', this.debounce(() => {
      AppState.isMobile = window.innerWidth <= 768;
      this.handleResize();
    }, 250));
    
    // Gestion des erreurs globales
    window.addEventListener('error', (e) => {
      console.error('Erreur JavaScript:', e.error);
      this.trackEvent('javascript_error', { 
        message: e.message,
        filename: e.filename,
        line: e.lineno 
      });
    });
    
    // Gestion des touches
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && AppState.menuOpen) {
        this.closeMenu();
      }
    });
  }

  handleResize() {
    // Fermer le menu sur mobile lors du redimensionnement
    if (!AppState.isMobile && AppState.menuOpen) {
      this.closeMenu();
    }
  }

  // === ÉVÉNEMENTS GLOBAUX ===
  setupGlobalEvents() {
    // Gestion du clic sur l'email
    document.querySelectorAll('a[href*="@"]').forEach(link => {
      if (!link.href.startsWith('mailto:')) {
        const email = link.textContent || link.href;
        link.href = `mailto:${email}`;
      }
    });
    
    // Track des clics importants
    document.addEventListener('click', (e) => {
      if (e.target.matches('[href^="tel:"]')) {
        this.trackEvent('phone_clicked');
      } else if (e.target.matches('[href^="mailto:"]')) {
        this.trackEvent('email_clicked');
      }
    });
  }

  // === NOTIFICATIONS ===
  showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;

    document.body.appendChild(notification);

    // Animation d'entrée
    requestAnimationFrame(() => {
      notification.classList.add('show');
    });

    // Fermeture automatique
    const autoClose = setTimeout(() => {
      this.closeNotification(notification);
    }, 5000);

    // Fermeture manuelle
    notification.querySelector('.notification-close').addEventListener('click', () => {
      clearTimeout(autoClose);
      this.closeNotification(notification);
    });
  }

  closeNotification(notification) {
    notification.classList.add('hide');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }

  // === TRACKING ===
  trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, parameters);
    }
    
    console.log(`📊 Event: ${eventName}`, parameters);
  }

  // === GESTION D'ERREURS ===
  handleInitError(error) {
    console.error('Erreur d\'initialisation critique:', error);
    
    // Afficher un message d'erreur à l'utilisateur
    document.body.insertAdjacentHTML('afterbegin', `
      <div class="init-error">
        <p>⚠️ Erreur de chargement. Veuillez rafraîchir la page.</p>
        <button onclick="window.location.reload()">Rafraîchir</button>
      </div>
    `);
  }

  // === UTILITAIRES DE PERFORMANCE ===
  debounce(func, wait) {
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

  throttle(func, limit) {
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

  // === CLEANUP ===
  destroy() {
    // Nettoyer les observers
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    
    // Réinitialiser l'état
    AppState.isInitialized = false;
    
    console.log('🧹 Application nettoyée');
  }
}

// === INITIALISATION GLOBALE ===
let msApp;

// Initialiser l'application au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  msApp = new MSPlomberieApp();
  
  // Exposer globalement pour le debug en développement
  if (window.location.hostname === 'localhost' || window.location.hostname.includes('github.io')) {
    window.MSApp = msApp;
    window.AppState = AppState;
  }
});

// Service Worker pour le cache (PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // navigator.registerServiceWorker('/sw.js')
    //   .then(registration => console.log('SW registered'))
    //   .catch(error => console.log('SW registration failed'));
  });
}

// Export pour les modules ES6 si nécessaire
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MSPlomberieApp, AppState };
}
