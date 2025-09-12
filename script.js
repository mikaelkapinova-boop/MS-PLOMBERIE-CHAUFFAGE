
// Menu burger
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".nav-menu");
if(menuToggle){
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// Dark mode
const darkToggle = document.getElementById("dark-mode-toggle");
if(darkToggle){
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
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
