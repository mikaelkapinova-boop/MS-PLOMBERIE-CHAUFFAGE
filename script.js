
function toggleDarkMode(){ document.body.classList.toggle('dark'); }
function toggleMenu(){
  const nav = document.getElementById('nav-links');
  nav.classList.toggle('active');
  const btn = document.querySelector('.menu-toggle');
  btn.textContent = nav.classList.contains('active') ? '✖' : '☰';
}

document.addEventListener("DOMContentLoaded", ()=>{
  if(typeof emailjs !== "undefined"){
    emailjs.init("BswSOWv3nFcCn7lQG");
    const form = document.getElementById("contact-form");
    if(form){
      form.addEventListener("submit", e=>{
        e.preventDefault();
        emailjs.send("service_j5g070o","template_10dackj",{
          from_name:document.getElementById("name").value,
          from_email:document.getElementById("email").value,
          message:document.getElementById("message").value
        }).then(()=>{document.getElementById("form-message").innerText="✅ Message envoyé avec succès !"; form.reset();},
                ()=>{document.getElementById("form-message").innerText="❌ Erreur lors de l'envoi.";});
      });
    }
  }
});
