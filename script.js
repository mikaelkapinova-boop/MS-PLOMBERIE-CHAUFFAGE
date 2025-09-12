
// Toggle menu & ensure links close the menu
function toggleMenu(){
  const nav = document.getElementById('nav-links');
  const btn = document.querySelector('.menu-toggle');
  nav.classList.toggle('active');
  btn.textContent = nav.classList.contains('active') ? '✖' : '☰';
}
// Close menu when clicking a link (mobile)
document.addEventListener('click', (e)=>{
  if(e.target.matches('.nav-links a')){
    const nav = document.getElementById('nav-links');
    if(nav.classList.contains('active')){ toggleMenu(); }
  }
});

// Dark mode toggle (persist in localStorage)
function toggleDarkMode(){
  document.body.classList.toggle('dark');
  localStorage.setItem('mspf-dark', document.body.classList.contains('dark') ? '1' : '0');
}
document.addEventListener('DOMContentLoaded', ()=>{
  // init dark mode from storage
  if(localStorage.getItem('mspf-dark') === '1') document.body.classList.add('dark');
  // wire buttons
  const dm = document.querySelectorAll('.dark-mode-toggle'); dm.forEach(b=>b.addEventListener('click', toggleDarkMode));
  const menuBtns = document.querySelectorAll('.menu-toggle'); menuBtns.forEach(b=>b.addEventListener('click', toggleMenu));
  // EmailJS (if available)
  if(typeof emailjs !== 'undefined' && document.getElementById('contact-form')){
    emailjs.init('BswSOWv3nFcCn7lQG');
    document.getElementById('contact-form').addEventListener('submit', function(e){
      e.preventDefault();
      emailjs.send('service_j5g070o','template_10dackj', {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value
      }).then(()=>{ document.getElementById('form-message').innerText = '✅ Message envoyé !'; this.reset(); },
              ()=>{ document.getElementById('form-message').innerText = '❌ Erreur, réessayez.'; });
    });
  }
});
