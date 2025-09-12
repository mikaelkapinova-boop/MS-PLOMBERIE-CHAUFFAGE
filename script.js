// Menu burger et smooth scroll
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a[href^='#']");
  for (let link of links) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  }
});



// === Added: menu toggle code (keeps existing smooth-scroll) ===
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var btn = document.getElementById('menu-toggle');
    var nav = document.querySelector('.nav-links');
    if(btn && nav){
      btn.addEventListener('click', function(){
        nav.classList.toggle('show');
      });
      // close menu when clicking a link (mobile)
      nav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ nav.classList.remove('show'); }); });
    }
  });
})();
