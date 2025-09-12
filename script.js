(function(){
  emailjs.init("BswSOWv3nFcCn7lQG");
})();

const form = document.getElementById("contact-form");
const btn = document.getElementById("submit-btn");
const btnText = document.getElementById("btn-text");
const btnLoader = document.getElementById("btn-loader");
const messageBox = document.getElementById("form-message");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  btnText.style.display = "none";
  btnLoader.style.display = "inline-block";

  emailjs.sendForm("service_j5g070o", "template_10dackj", this)
    .then(() => {
      btnText.style.display = "inline";
      btnLoader.style.display = "none";
      form.reset();
      messageBox.style.color = "green";
      messageBox.innerText = "✅ Votre message a bien été envoyé !";
    }, (err) => {
      btnText.style.display = "inline";
      btnLoader.style.display = "none";
      messageBox.style.color = "red";
      messageBox.innerText = "❌ Une erreur est survenue, veuillez réessayer.";
    });
});
