
// Toggle menu Apple-style

// Improved menu open/close with animation and body scroll lock
}

// Close menu helper (used by close button)
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



// Menu overlay simple (ouvre/ferme en plein écran)
}




// Menu overlay sombre plein écran
}




// Menu overlay sombre plein écran avec animation slide
}

}



// Toggle burger -> cross animation
}

}



// Toggle burger + menu synchronisés
function toggleMenu() {
  const nav = document.getElementById("nav-links");
  const burger = document.querySelector(".burger");
  if (!nav || !burger) return;
  if (nav.classList.contains("show")) {
    // fermeture
    nav.classList.add("closing");
    document.body.classList.remove("menu-open");
    burger.classList.remove("open");
    setTimeout(() => {
      nav.classList.remove("show", "closing");
    }, 450);
  } else {
    // ouverture
    nav.classList.add("show");
    document.body.classList.add("menu-open");
    burger.classList.add("open");
  }
}

function closeMenu() {
  const nav = document.getElementById("nav-links");
  const burger = document.querySelector(".burger");
  if (!nav || !burger) return;
  if (nav.classList.contains("show")) {
    nav.classList.add("closing");
    document.body.classList.remove("menu-open");
    burger.classList.remove("open");
    setTimeout(() => {
      nav.classList.remove("show", "closing");
    }, 450);
  }
}
