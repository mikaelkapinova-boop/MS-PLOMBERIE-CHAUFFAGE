// === GESTION DES FORMULAIRES ===
class FormManager {
  constructor() {
    this.contactForm = document.getElementById('contact-form');
    this.testimonialForm = document.getElementById('testimonial-form');
    this.init();
  }

  init() {
    // Initialiser EmailJS
    emailjs.init(CONFIG.emailjs.publicKey);
    
    // Configurer les event listeners
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Formulaire de contact
    this.contactForm?.addEventListener('submit', (e) => this.handleContactForm(e));
    
    // Formulaire de témoignage
    this.testimonialForm?.addEventListener('submit', (e) => this.handleTestimonialForm(e));
    
    // Validation en temps réel
    this.setupRealTimeValidation();
  }

  async handleContactForm(e) {
    e.preventDefault();
    
    const submitBtn = this.contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // État de chargement
    submitBtn.innerHTML = '<span class="loading"></span>Envoi en cours...';
    submitBtn.disabled = true;
    
    try {
      // Préparer les données
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value || 'Non renseigné',
        service: document.getElementById('service').value || 'Non spécifié',
        message: document.getElementById('message').value,
        to_name: 'MS Plomberie & Chauffage',
        to_email: 'ms.plomberie.chauffage.nancy@gmail.fr'
      };
      
      // Validation côté client
      if (!this.validateContactForm(formData)) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }
      
      // Envoyer avec EmailJS
      const response = await emailjs.send(
        CONFIG.emailjs.serviceId,
        CONFIG.emailjs.templateId,
        formData
      );
      
      if (response.status === 200) {
        // Succès
        this.showNotification('✅ Message envoyé avec succès ! Nous vous répondrons sous 24h.', 'success');
        this.contactForm.reset();
        
        // Animation de succès
        submitBtn.style.background = '#4CAF50';
        setTimeout(() => {
          submitBtn.style.background = '';
        }, 2000);
      }
      
    } catch (error) {
      console.error('Erreur EmailJS:', error);
      this.showNotification('❌ Erreur lors de l\'envoi. Appelez-nous au 07 49 24 85 59', 'error');
    } finally {
      // Restaurer le bouton
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1000);
    }
  }

  async handleTestimonialForm(e) {
    e.preventDefault();
    
    const submitBtn = this.testimonialForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span class="loading"></span>Envoi en cours...';
    submitBtn.disabled = true;
    
    try {
      const formData = {
        client_name: document.getElementById('testimonial-name').value,
        client_email: document.getElementById('testimonial-email').value,
        client_city: document.getElementById('testimonial-city').value,
        client_rating: document.getElementById('testimonial-rating').value,
        testimonial_text: document.getElementById('testimonial-text').value,
        to_name: 'MS Plomberie & Chauffage',
        to_email: 'ms.plomberie.chauffage.nancy@gmail.fr'
      };
      
      // Validation
      if (!this.validateTestimonialForm(formData)) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }
      
      // Envoyer le témoignage
      const response = await emailjs.send(
        CONFIG.emailjs.serviceId,
        CONFIG.emailjs.testimonialTemplateId,
        formData
      );
      
      if (response.status === 200) {
        this.showNotification('⭐ Témoignage envoyé ! Merci pour votre retour.', 'success');
        this.testimonialForm.reset();
        this.closeTestimonialModal();
      }
      
    } catch (error) {
      console.error('Erreur témoignage:', error);
      this.showNotification('❌ Erreur lors de l\'envoi du témoignage.', 'error');
    } finally {
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1000);
    }
  }

  validateContactForm(data) {
    const { name, email, message } = data;
    
    if (!name || name.trim().length < 2) {
      this.showFieldError('name', 'Nom requis (minimum 2 caractères)');
      return false;
    }
    
    if (!email || !this.isValidEmail(email)) {
      this.showFieldError('email', 'Email valide requis');
      return false;
    }
    
    if (!message || message.trim().length < 10) {
      this.showFieldError('message', 'Message requis (minimum 10 caractères)');
      return false;
    }
    
    return true;
  }

  validateTestimonialForm(data) {
    const { client_name, client_city, testimonial_text, client_rating } = data;
    
    if (!client_name || client_name.trim().length < 2) {
      this.showFieldError('testimonial-name', 'Nom requis');
      return false;
    }
    
    if (!client_city || client_city.trim().length < 2) {
      this.showFieldError('testimonial-city', 'Ville requise');
      return false;
    }
    
    if (!testimonial_text || testimonial_text.trim().length < 20) {
      this.showFieldError('testimonial-text', 'Témoignage trop court (minimum 20 caractères)');
      return false;
    }
    
    if (!client_rating) {
      this.showFieldError('testimonial-rating', 'Note requise');
      return false;
    }
    
    return true;
  }

  setupRealTimeValidation() {
    // Validation email en temps réel
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.value && !this.isValidEmail(input.value)) {
          this.showFieldError(input.id, 'Format email invalide');
        } else {
          this.clearFieldError(input.id);
        }
      });
    });

    // Validation téléphone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        // Formatage automatique du numéro de téléphone
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
          value = value.replace(/(\d{2})(?=\d)/g, '$1 ');
        }
        e.target.value = value;
      });
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    // Supprimer l'erreur existante
    this.clearFieldError(fieldId);
    
    // Ajouter la classe d'erreur
    field.classList.add('error');
    
    // Créer le message d'erreur
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#f44336';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '0.5rem';
    
    field.parentNode.appendChild(errorDiv);
  }

  clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    field.classList.remove('error');
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  openTestimonialModal() {
    const modal = document.getElementById('testimonial-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Focus sur le premier champ
      const firstField = modal.querySelector('input, textarea');
      if (firstField) {
        setTimeout(() => firstField.focus(), 100);
      }
    }
  }

  closeTestimonialModal() {
    const modal = document.getElementById('testimonial-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  showNotification(message, type = 'info') {
    // Supprimer toute notification existante
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;

    // Styles pour la notification
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      z-index: 10000;
      max-width: 400px;
      animation: slideInRight 0.3s ease forwards;
      transform: translateX(100%);
      opacity: 0;
    `;

    document.body.appendChild(notification);

    // Fermeture automatique après 5 secondes
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
    notification.style.animation = 'slideOutRight 0.3s ease forwards';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }
}

// Initialiser le gestionnaire de formulaires
document.addEventListener('DOMContentLoaded', () => {
  window.formManager = new FormManager();
});
