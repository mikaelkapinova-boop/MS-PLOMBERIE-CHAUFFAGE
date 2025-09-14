// Configuration générale
const CONFIG = {
  // EmailJS
  emailjs: {
    publicKey: 'BswSOWv3nFcCn7lQG',
    serviceId: 'service_j5g070o',
    templateId: 'template_10dackj'
  },
  
  // Coordonnées Nancy
  nancy: {
    lat: 48.6921,
    lng: 6.1844,
    radius: 80000 // 80km en mètres
  },
  
  // URLs des images
  images: {
    base: 'https://raw.githubusercontent.com/mikaelkapinova-boop/MS-PLOMBERIE-CHAUFFAGE/main/images/',
    logo: 'logo.png',
    real1: 'real1.jpg',
    real2: 'real2.jpg',
    real3: 'real3.jpg'
  },
  
  // Témoignages par défaut
  defaultTestimonials: [
    {
      name: 'Marie L.',
      city: 'Nancy',
      rating: 5,
      text: 'Travail impeccable pour la rénovation complète de notre salle de bain. Équipe professionnelle, respect des délais et excellent rapport qualité-prix. Je recommande vivement !',
      date: '2024-03-15'
    },
    {
      name: 'Jean-Claude M.',
      city: 'Metz',
      rating: 5,
      text: 'Installation de notre nouvelle pompe à chaleur réalisée avec professionnalisme. Très bon conseil, équipe compétente et à l\'écoute. Parfait !',
      date: '2024-02-28'
    },
    {
      name: 'Sophie D.',
      city: 'Épinal',
      rating: 5,
      text: 'Intervention rapide pour une fuite urgente. Technicien compétent, travail soigné et prix honnête. Une entreprise de confiance que je recommande.',
      date: '2024-03-02'
    },
    {
      name: 'Pierre R.',
      city: 'Toul',
      rating: 5,
      text: 'Rénovation de ma cuisine avec installation de la plomberie. Travail de qualité, propre et dans les temps. Très satisfait du résultat !',
      date: '2024-01-20'
    }
  ],
  
  // Options d'intersection observer
  observerOptions: {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  },
  
  // Délais d'animation
  animationDelays: {
    cascade: 100, // ms entre chaque élément
    notification: 5000, // ms avant fermeture auto
    scroll: 16 // ms pour le throttle scroll (~60fps)
  },
  
  // Points de rupture responsive
  breakpoints: {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    wide: 1200
  },
  
  // Messages
  messages: {
    formSuccess: '✅ Message envoyé avec succès !',
    formError: '❌ Erreur lors de l\'envoi. Appelez-nous au 07 49 24 85 59',
    testimonialSuccess: '✅ Merci pour votre témoignage !',
    testimonialError: '❌ Erreur lors de l\'envoi de votre témoignage',
    loading: 'Envoi en cours...'
  }
};

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} else {
  window.CONFIG = CONFIG;
}
