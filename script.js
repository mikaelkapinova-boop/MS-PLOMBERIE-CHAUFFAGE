
function toggleMenu(){ const nav=document.getElementById("nav-links"); const burger=document.querySelector(".burger"); nav.classList.toggle("show"); burger.classList.toggle("open"); }
function toggleDarkMode(){ document.body.classList.toggle("dark"); }
(function(){ emailjs.init("BswSOWv3nFcCn7lQG"); })();
const contactForm=document.getElementById("contact-form");
if(contactForm){
  contactForm.addEventListener("submit",function(e){
    e.preventDefault();
    emailjs.send("service_j5g070o","template_10dackj",{
      from_name:document.getElementById("name").value,
      from_email:document.getElementById("email").value,
      message:document.getElementById("message").value
    }).then(function(){ document.getElementById("form-message").innerText="✅ Message envoyé avec succès !"; contactForm.reset(); },
             function(){ document.getElementById("form-message").innerText="❌ Erreur lors de l'envoi, réessayez."; });
  });
}
