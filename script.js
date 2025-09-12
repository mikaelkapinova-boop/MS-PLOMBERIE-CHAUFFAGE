
// Toggle menu Apple-style

// Improved menu open/close with animation and body scroll lock
function toggleMenu() {
  const nav = document.getElementById("nav-links");
  const burger = document.querySelector(".burger");
  if (!nav) return;
  if (nav.classList.contains("show")) {
    // close menu (play closing animation)
    nav.classList.add("closing");
    nav.classList.remove("show");
    burger.classList.remove("open");
    document.body.classList.remove("menu-open");
    // remove closing class after animation ends (450ms)
    setTimeout(() => nav.classList.remove("closing"), 500);
  } else {
    nav.classList.remove("closing");
    nav.classList.add("show");
    burger.classList.add("open");
    document.body.classList.add("menu-open");
  }
}

// Close menu helper (used by close button)
function closeMenu() {
  const nav = document.getElementById("nav-links");
  const burger = document.querySelector(".burger");
  if (!nav) return;
  if (nav.classList.contains("show")) {
    nav.classList.add("closing");
    nav.classList.remove("show");
    burger.classList.remove("open");
    document.body.classList.remove("menu-open");
    setTimeout(() => nav.classList.remove("closing"), 500);
  }
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// EmailJS Contact Form
(function(){
  emailjs.init("BswSOWv3nFcCn7lQG");
})();

const contactForm = document.getElementById("contact-form");
if(contactForm){
  contactForm.addEventListener("submit", function(e){
    e.preventDefault();
    emailjs.send("service_j5g070o","template_10dackj", {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      message: document.getElementById("message").value
    }).then(function(response) {
        document.getElementById("form-message").innerText = "✅ Message envoyé avec succès !";
        contactForm.reset();
    }, function(error) {
        document.getElementById("form-message").innerText = "❌ Erreur lors de l'envoi, réessayez.";
    });
  });
}


// Fermer menu avec croix
function closeMenu() {
  const nav = document.getElementById("nav-links");
  const burger = document.querySelector(".burger");
  nav.classList.remove("show");
  burger.classList.remove("open");
}
