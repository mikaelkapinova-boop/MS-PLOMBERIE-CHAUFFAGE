// === ANIMATIONS AU DÉFILEMENT ===
class ScrollAnimations {
  constructor() {
    this.observedElements = new Set();
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupParallaxEffect();
    this.setupScrollProgress();
    this.observeElements();
  }

  setupIntersectionObserver() {
    const options = {
      threshold: [0.1, 0.3, 0.5],
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target, entry.intersectionRatio);
        }
      });
    }, options);
  }

  observeElements() {
    // Observer tous les éléments avec des classes d'animation
    const animatedElements = document.querySelectorAll(`
      .fade-in, 
      .slide-in-left, 
      .slide-in-right, 
      .slide-up,
      .slide-down,
      .scale-in, 
      .rotate-in,
      .bounce-in,
      .service-card,
      .gallery-item,
      .testimonial-card,
      .contact-item,
      .section-title,
      .section-subtitle,
      .stats-item
    `);

    animatedElements.forEach(el => {
      if (!this.observedElements.has(el)) {
        this.observer.observe(el);
        this.observedElements.add(el);
        
        // Ajouter un délai basé sur la position dans la grille
        const parent = el.parentElement;
        const siblings = Array.from(parent.children);
        const index = siblings.indexOf(el);
        el.style.animationDelay = `${index * 0.1}s`;
      }
    });
  }

  animateElement(element, ratio) {
    if (element.classList.contains('animated')) return;
    
    element.classList.add('visible', 'animated');
    
    // Animations spéciales pour certains éléments
    if (element.classList.contains('stats-item')) {
      this.animateCounter(element);
    }
    
    if (element.classList.contains('service-card')) {
      this.animateServiceCard(element);
    }
    
    if (element.classList.contains('gallery-item')) {
      this.animateGalleryItem(element);
    }
    
    // Animation en cascade pour les éléments avec stagger
    if (element.classList.contains('stagger-delay-1')) {
      this.triggerStaggerAnimation(element);
    }
  }

  animateCounter(element) {
    const counter = element.querySelector('.stat-number');
    if (!counter) return;
    
    const target = parseInt(counter.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  }

  animateServiceCard(element) {
    const icon = element.querySelector('.service-icon');
    if (icon) {
      setTimeout(() => {
        icon.style.animation = 'bounce 0.6s ease';
      }, 200);
    }
  }

  animateGalleryItem(element) {
    element.style.transform = 'scale(1.02)';
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 300);
  }

  triggerStaggerAnimation(element) {
    const parent = element.parentElement;
    const staggerElements = parent.querySelectorAll('[class*="stagger-delay-"]');
    
    staggerElements.forEach((el, index) => {
      if (index > 0) {
        setTimeout(() => {
          el.classList.add('visible');
        }, index * 100);
      }
    });
  }

  setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  setupScrollProgress() {
    // Créer la barre de progression du scroll
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: var(--accent);
      z-index: 10001;
      transition: width 0.1s ease;
      box-shadow: 0 0 10px var(--accent);
    `;
    document.body.appendChild(progressBar);
    
    const updateProgress = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / scrollHeight) * 100;
      
      progressBar.style.width = scrolled + '%';
    };
    
    window.addEventListener('scroll', updateProgress);
  }

  // Méthodes publiques pour ajouter des animations dynamiques
  addFadeIn(element, delay = 0) {
    element.classList.add('fade-in');
    element.style.animationDelay = `${delay}s`;
    this.observer.observe(element);
  }

  addSlideIn(element, direction = 'left', delay = 0) {
    element.classList.add(`slide-in-${direction}`);
    element.style.animationDelay = `${delay}s`;
    this.observer.observe(element);
  }

  addBounceIn(element, delay = 0) {
    element.classList.add('bounce-in');
    element.style.animationDelay = `${delay}s`;
    this.observer.observe(element);
  }

  // Animation manuelle pour les éléments spéciaux
  animateOnDemand(element, animationType) {
    element.style.opacity = '0';
    element.style.transform = this.getInitialTransform(animationType);
    
    requestAnimationFrame(() => {
      element.style.transition = 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)';
      element.style.opacity = '1';
      element.style.transform = 'none';
    });
  }

  getInitialTransform(type) {
    const transforms = {
      'slide-up': 'translateY(30px)',
      'slide-down': 'translateY(-30px)',
      'slide-left': 'translateX(-30px)',
      'slide-right': 'translateX(30px)',
      'scale': 'scale(0.8)',
      'rotate': 'rotate(-5deg)',
      'bounce': 'translateY(30px) scale(0.8)'
    };
    
    return transforms[type] || 'translateY(20px)';
  }

  // Réinitialiser les animations pour les éléments dynamiques
  resetAnimations() {
    this.observedElements.clear();
    this.observeElements();
  }

  // Nettoyer les observers
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.observedElements.clear();
  }
}

// Initialiser les animations au scroll
document.addEventListener('DOMContentLoaded', () => {
  window.scrollAnimations = new ScrollAnimations();
});
