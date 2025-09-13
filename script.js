/* script.js - menu + theme + small helpers */
(function(){
  'use strict';
  const body = document.body;
  const burger = document.getElementById('burger-btn') || document.getElementById('burger') || document.querySelector('.burger');
  const menu = document.getElementById('menu');
  const themeBtn = document.getElementById('theme-btn') || document.getElementById('darkModeToggle') || document.getElementById('theme-toggle');

  // apply default: prefer saved, otherwise default dark as requested
  const saved = localStorage.getItem('ms_theme');
  if(saved === 'light') body.classList.remove('dark-mode'); else body.classList.add('dark-mode');

  // ensure body has class for CSS checks
  function setThemeDark(isDark){
    if(isDark){
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      localStorage.setItem('ms_theme','dark');
    } else {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      localStorage.setItem('ms_theme','light');
    }
  }

  // theme button click
  if(themeBtn){
    themeBtn.addEventListener('click', () => {
      setThemeDark(!body.classList.contains('dark-mode'));
    });
  }

  // accessible menu toggle
  function openMenu(open){
    if(!menu) return;
    if(open){
      menu.classList.add('open');
      menu.setAttribute('aria-hidden','false');
      if(burger){ burger.classList.add('open'); burger.setAttribute('aria-expanded','true'); }
      // trap focus: (simple approach) focus first link
      const first = menu.querySelector('a');
      if(first) first.focus();
    } else {
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden','true');
      if(burger){ burger.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }
      // return focus to burger
      if(burger) burger.focus();
    }
  }

  if(burger){
    burger.addEventListener('click', (e) => {
      const opened = menu && menu.classList.contains('open');
      openMenu(!opened);
    });
  }

  // close menu on link click
  if(menu){
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        openMenu(false);
      });
    });
  }

  // close on ESC
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){ openMenu(false); }
  });

  // small fix: ensure logo link exists and points to index.html already in HTML
  // contact form demo (prevent submit)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('sentMsg');
      if(msg) msg.textContent = 'Votre message a bien été envoyé ✅';
      form.reset();
    });
  }

})();