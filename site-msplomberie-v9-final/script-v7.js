
document.addEventListener('DOMContentLoaded', function(){
  const slides = document.querySelector('.slides');
  const imgs = document.querySelectorAll('.slides img');
  const dots = document.querySelectorAll('.dot');
  let idx = 0;
  function go(i){
    idx = (i + imgs.length) % imgs.length;
    slides.style.transform = 'translateX(' + (-idx * 100) + '%)';
    dots.forEach((d,di)=> d.classList.toggle('active', di===idx));
  }
  let t = setInterval(()=> go(idx+1), 3500);
  dots.forEach((d,i)=> d.addEventListener('click', ()=> { go(i); clearInterval(t); t=setInterval(()=> go(idx+1),3500); }));
  const obs = new IntersectionObserver((entries)=>{ entries.forEach(en=>{ if(en.isIntersecting) en.target.classList.add('visible'); }); }, {threshold:0.15});
  document.querySelectorAll('.card, .gallery img, .hero').forEach(el=>{ el.classList.add('will-fade'); obs.observe(el); });
});
