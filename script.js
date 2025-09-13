
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
const toggleDark = document.getElementById('dark-mode-toggle');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
});

document.querySelectorAll('#menu a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('active');
    });
});

toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
