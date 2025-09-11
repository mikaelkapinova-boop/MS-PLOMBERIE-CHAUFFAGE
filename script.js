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
