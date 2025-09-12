
// Clean script.js - top-level functions, no nested functions, explicit event listeners

// EmailJS init (if you use EmailJS)
(function(){
  if (window.emailjs && typeof emailjs.init === 'function') {
    try { emailjs.init('BswSOWv3nFcCn7lQG'); } catch(e){ /* ignore */ }
  }
})();

// Toggle menu (open/close) with synchronized burger -> cross animation
function toggleMenu() {
  const nav = document.getElementById('nav-links');
  const burger = document.querySelector('.burger');
  if (!nav) return;
  if (nav.classList.contains('show')) {
    // closing animation
    nav.classList.add('closing');
    burger && burger.classList.remove('open');
    document.body.classList.remove('menu-open');
    // remove classes after animation ends (450ms)
    setTimeout(() => nav.classList.remove('show','closing'), 470);
  } else {
    nav.classList.remove('closing');
    nav.classList.add('show');
    burger && burger.classList.add('open');
    document.body.classList.add('menu-open');
  }
}

function closeMenu() {
  const nav = document.getElementById('nav-links');
  const burger = document.querySelector('.burger');
  if (!nav) return;
  if (nav.classList.contains('show')) {
    nav.classList.add('closing');
    burger && burger.classList.remove('open');
    document.body.classList.remove('menu-open');
    setTimeout(() => nav.classList.remove('show','closing'), 470);
  }
}

// DOM ready setup
document.addEventListener('DOMContentLoaded', function(){
  // wire burger button
  const burger = document.querySelector('.burger');
  if (burger) burger.addEventListener('click', toggleMenu);

  // wire close button inside nav
  const closeBtn = document.querySelector('.close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // close menu when clicking any nav link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Contact form (EmailJS) submission handling - keep safe checks
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name') ? document.getElementById('name').value : '';
      const email = document.getElementById('email') ? document.getElementById('email').value : '';
      const message = document.getElementById('message') ? document.getElementById('message').value : '';
      // If EmailJS available, send; otherwise just show a success message for demo
      const formMessage = document.getElementById('form-message');
      if (window.emailjs && typeof emailjs.send === 'function') {
        emailjs.send('service_j5g070o','template_10dackj', {
          from_name: name,
          from_email: email,
          message: message
        }).then(function(response) {
          if (formMessage) formMessage.innerText = '✅ Message envoyé avec succès !';
          contactForm.reset();
        }, function(error) {
          if (formMessage) formMessage.innerText = '❌ Erreur lors de l\'envoi, réessayez.';
        });
      } else {
        if (formMessage) formMessage.innerText = '✅ (demo) message prêt — EmailJS non chargé.';
        contactForm.reset();
      }
    });
  }
});
