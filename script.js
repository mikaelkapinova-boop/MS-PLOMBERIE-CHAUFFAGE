document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.site-nav').classList.toggle('active');
});

document.querySelector('.theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});
