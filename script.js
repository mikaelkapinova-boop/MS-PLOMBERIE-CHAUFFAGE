const btn = document.getElementById('menu-btn'); const overlay = document.getElementById('menu-overlay');
if(btn){btn.addEventListener('click', ()=>{ overlay.classList.toggle('active'); btn.classList.toggle('open'); });}
if(overlay){overlay.addEventListener('click', e=>{ if(e.target===overlay){ overlay.classList.remove('active'); btn.classList.remove('open'); } });}
// Theme toggle
const toggle=document.getElementById('theme-toggle'); const root=document.documentElement;
function applyTheme(t){root.setAttribute('data-theme',t);localStorage.setItem('theme',t);}
const saved=localStorage.getItem('theme')||'dark';applyTheme(saved);
if(toggle){toggle.addEventListener('click',()=>{applyTheme(root.getAttribute('data-theme')==='dark'?'light':'dark');});}