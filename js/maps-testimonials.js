// === GESTION CARTE ET TÉMOIGNAGES ===
class MapsTestimonialsManager {
  constructor() {
    this.testimonials = [];
    this.map = null;
    this.interventionCircle = null;
    this.init();
  }

  init() {
    this.loadGoogleMaps();
    this.setupTestimonialModal();
    this.loadExistingTestimonials();
  }

  loadGoogleMaps() {
    // Configuration de la carte avec point sur Nancy et cercle de 80km
    const initMap = () => {
      const nancy = { lat: 48.6921, lng: 6.1844 };
      
      this.map = new google.maps.Map(document.getElementById('intervention-map'), {
        zoom: 9,
        center: nancy,
        styles: this.getMapStyles(),
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      });

      // Marqueur Nancy
      new google.maps.Marker({
        position: nancy,
        map: this.map,
        title: 'MS Plomberie & Chauffage - Nancy',
        icon: {
          url: 'https://raw.githubusercontent.com/mikaelkapinova-boop/images/main/logo.png',
          scaledSize: new google.maps.Size(40, 40)
        }
      });

      // Cercle de 80km
      this.interventionCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.15,
        map: this.map,
        center: nancy,
        radius: 80000 // 80km en mètres
      });

      // InfoWindow pour Nancy
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 250px;">
            <h4 style="margin: 0 0 10px 0; color: #4CAF50;">MS Plomberie & Chauffage</h4>
            <p style="margin: 0 0 5px 0; font-size: 14px;">15 ans d'expérience</p>
            <p style="margin: 0 0 10px 0; font-size: 14px;">Zone d'intervention : 80km autour de Nancy</p>
            <p style="margin: 0; font-size: 14px;">
              <strong>📞 07 49 24 85 59</strong><br>
              <a href="mailto:ms.plomberie.chauffage.nancy@gmail.fr" style="color: #4CAF50;">✉️ Contact</a>
            </p>
          </div>
        `
      });

      // Ouvrir l'InfoWindow au clic sur le marqueur
      const marker = new google.maps.Marker({
        position: nancy,
        map: this.map,
        title: 'MS Plomberie & Chauffage'
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
    };

    // Charger l'API Google Maps
    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }

  getMapStyles() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
      return [
        {
          "elementType": "geometry",
          "stylers": [{"color": "#212121"}]
        },
        {
          "elementType": "labels.icon",
          "stylers": [{"visibility": "off"}]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#757575"}]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [{"color": "#212121"}]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [{"color": "#757575"}]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{"color": "#484848"}]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{"color": "#000000"}]
        }
      ];
    }
    
    return []; // Style par défaut pour le thème clair
  }

  setupTestimonialModal() {
    // Créer le modal pour ajouter un témoignage
    this.createTestimonialModal();
    
    // Event listeners
    document.addEventListener('click', (e) => {
      if (e.target.matches('.add-testimonial-btn')) {
        this.openTestimonialModal();
      }
      
      if (e.target.matches('.testimonial-modal-close')) {
        this.closeTestimonialModal();
      }
      
      if (e.target.matches('.testimonial-modal-overlay')) {
        this.closeTestimonialModal();
      }
    });
  }

  createTestimonialModal() {
    const modal = document.createElement('div');
    modal.id = 'testimonial-modal';
    modal.className = 'testimonial-modal-overlay';
    modal.innerHTML = `
      <div class="testimonial-modal">
        <div class="testimonial-modal-header">
          <h3>⭐ Laisser un témoignage</h3>
          <button class="testimonial-modal-close" aria-label="Fermer">&times;</button>
        </div>
        
        <form id="testimonial-form" class="testimonial-form">
          <div class="form-group">
            <label for="testimonial-name">Nom complet *</label>
            <input type="text" id="testimonial-name" name="name" required>
          </div>
          
          <div class="form-group">
            <label for="testimonial-email">Email (optionnel)</label>
            <input type="email" id="testimonial-email" name="email">
          </div>
          
          <div class="form-group">
            <label for="testimonial-city">Ville *</label>
            <input type="text" id="testimonial-city" name="city" placeholder="ex: Nancy, Metz..." required>
          </div>
          
          <div class="form-group">
            <label for="testimonial-rating">Note *</label>
            <div class="rating-input">
              <input type="radio" id="star5" name="rating" value="5">
              <label for="star5" class="star">⭐</label>
              <input type="radio" id="star4" name="rating" value="4">
              <label for="star4" class="star">⭐</label>
              <input type="radio" id="star3" name="rating" value="3">
              <label for="star3" class="star">⭐</label>
              <input type="radio" id="star2" name="rating" value="2">
              <label for="star2" class="star">⭐</label>
              <input type="radio" id="star1" name="rating" value="1">
              <label for="star1" class="star">⭐</label>
            </div>
          </div>
          
          <div class="form-group">
            <label for="testimonial-text">Votre témoignage *</label>
            <textarea id="testimonial-text" name="testimonial" rows="4" 
              placeholder="Partagez votre expérience avec MS Plomberie & Chauffage..." required></textarea>
          </div>
          
          <div class="form-group">
            <label for="testimonial-service">Type de service (optionnel)</label>
            <select id="testimonial-service" name="service">
              <option value="">Sélectionnez un service</option>
              <option value="plomberie">Plomberie</option>
              <option value="chauffage">Chauffage</option>
              <option value="ventilation">Ventilation</option>
              <option value="salle-de-bain">Salle de bain</option>
              <option value="depannage">Dépannage</option>
            </select>
          </div>
          
          <div class="testimonial-notice">
            <p>📝 <strong>Information :</strong> Votre témoignage sera examiné avant publication. Nous nous réservons le droit de modérer les contenus.</p>
          </div>
          
          <button type="submit" class="btn-testimonial">
            📤 Envoyer mon témoignage
          </button>
        </form>
      </div>
    `;
    
    // Styles du modal
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(5px);
      z-index: 10000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
      overflow-y: auto;
    `;
    
    document.body.appendChild(modal);
    
    // Ajouter les styles CSS
    this.addTestimonialModalStyles();
  }

  addTestimonialModalStyles() {
    const styles = `
      <style>
      .testimonial-modal {
        background: var(--card-bg);
        border-radius: 15px;
        border: 1px solid var(--border);
        backdrop-filter: blur(10px);
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
      }
      
      .testimonial-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid var(--border);
      }
      
      .testimonial-modal-header h3 {
        margin: 0;
        color: var(--accent);
        font-size: 1.3rem;
      }
      
      .testimonial-modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-secondary);
        padding: 5px;
        border-radius: 5px;
        transition: all 0.3s ease;
      }
      
      .testimonial-modal-close:hover {
        background: var(--border);
        color: var(--text);
      }
      
      .testimonial-form {
        padding: 1.5rem;
      }
      
      .testimonial-form .form-group {
        margin-bottom: 1rem;
      }
      
      .testimonial-form label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--text);
      }
      
      .testimonial-form input,
      .testimonial-form textarea,
      .testimonial-form select {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: var(--bg);
        color: var(--text);
        font-size: 0.9rem;
        transition: all 0.3s ease;
      }
      
      .testimonial-form input:focus,
      .testimonial-form textarea:focus,
      .testimonial-form select:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
      }
      
      .rating-input {
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        gap: 0.2rem;
      }
      
      .rating-input input[type="radio"] {
        display: none;
      }
      
      .rating-input .star {
        font-size: 1.8rem;
        cursor: pointer;
        color: #ddd;
        transition: color 0.2s ease;
        width: auto;
        padding: 0;
        border: none;
        background: none;
      }
      
      .rating-input input[type="radio"]:checked ~ .star,
      .rating-input .star:hover,
      .rating-input .star:hover ~ .star {
        color: #ffd700;
      }
      
      .testimonial-notice {
        background: rgba(76, 175, 80, 0.1);
        padding: 1rem;
        border-radius: 8px;
        border-left: 4px solid var(--accent);
        margin: 1rem 0;
      }
      
      .testimonial-notice p {
        margin: 0;
        font-size: 0.85rem;
        color: var(--text-secondary);
      }
      
      .btn-testimonial {
        background: var(--accent);
        color: white;
        border: none;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 100%;
      }
      
      .btn-testimonial:hover {
        background: var(--accent-hover);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
      }
      
      .btn-testimonial:disabled {
        background: #ccc;
        cursor: not-allowed;
        transform: none;
      }
      
      .add-testimonial-btn {
        background: var(--accent);
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
        margin-top: 1rem;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .add-testimonial-btn:hover {
        background: var(--accent-hover);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
      }
      
      @media (max-width: 768px) {
        .testimonial-modal {
          margin: 10px;
          max-height: calc(100vh - 20px);
        }
        
        .testimonial-form {
          padding: 1rem;
        }
      }
      </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
  }

  openTestimonialModal() {
    const modal = document.getElementById('testimonial-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Focus sur le premier champ
      const firstField = modal.querySelector('input');
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
      
      // Réinitialiser le formulaire
      const form = modal.querySelector('#testimonial-form');
      if (form) {
        form.reset();
      }
    }
  }

  loadExistingTestimonials() {
    // Témoignages existants avec possibilité d'en ajouter d'autres
    this.testimonials = [
      {
        name: "Marie L.",
        city: "Nancy",
        rating: 5,
        text: "Travail impeccable pour la rénovation complète de notre salle de bain. Équipe professionnelle, respect des délais et excellent rapport qualité-prix. Je recommande vivement !",
        service: "Salle de bain",
        date: "2024-01-15"
      },
      {
        name: "Jean-Claude M.",
        city: "Metz",
        rating: 5,
        text: "Installation de notre nouvelle pompe à chaleur réalisée avec professionnalisme. Très bon conseil, équipe compétente et à l'écoute. Parfait !",
        service: "Chauffage",
        date: "2024-01-10"
      },
      {
        name: "Sophie D.",
        city: "Épinal",
        rating: 5,
        text: "Intervention rapide pour une fuite urgente. Technicien compétent, travail soigné et prix honnête. Une entreprise de confiance que je recommande.",
        service: "Dépannage",
        date: "2024-01-05"
      }
    ];
    
    this.displayTestimonials();
  }

  displayTestimonials() {
    const container = document.querySelector('.testimonials');
    if (!container) return;
    
    // Ajouter le bouton pour ajouter un témoignage
    const addButton = document.createElement('div');
    addButton.className = 'add-testimonial-container';
    addButton.innerHTML = `
      <button class="add-testimonial-btn">
        ⭐ Laisser un témoignage
      </button>
    `;
    
    // Insérer le bouton avant le container des témoignages
    container.parentNode.insertBefore(addButton, container);
    
    // Afficher les témoignages existants
    container.innerHTML = '';
    
    this.testimonials.forEach(testimonial => {
      const testimonialCard = document.createElement('div');
      testimonialCard.className = 'testimonial-card slide-in-left';
      
      const stars = '⭐'.repeat(testimonial.rating);
      
      testimonialCard.innerHTML = `
        <p class="testimonial-text">"${testimonial.text}"</p>
        <p class="testimonial-author">— ${testimonial.name}, ${testimonial.city}</p>
        <div class="testimonial-rating">${stars}</div>
        ${testimonial.service ? `<div class="testimonial-service">Service: ${testimonial.service}</div>` : ''}
      `;
      
      container.appendChild(testimonialCard);
    });
  }

  addTestimonial(testimonialData) {
    // Ajouter le nouveau témoignage à la liste
    const newTestimonial = {
      ...testimonialData,
      date: new Date().toISOString().split('T')[0]
    };
    
    this.testimonials.unshift(newTestimonial);
    
    // Rafraîchir l'affichage
    this.displayTestimonials();
    
    // Réinitialiser les animations
    if (window.scrollAnimations) {
      window.scrollAnimations.resetAnimations();
    }
  }
}

// Initialiser le gestionnaire de carte et témoignages
document.addEventListener('DOMContentLoaded', () => {
  window.mapsTestimonialsManager = new MapsTestimonialsManager();
});
