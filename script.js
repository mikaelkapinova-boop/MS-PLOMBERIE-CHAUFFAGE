document.addEventListener('DOMContentLoaded', () => {
  const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  };
  setVh();
  window.addEventListener('resize', setVh);

  const burger = document.getElementById('burger-btn');
  const nav = document.getElementById('nav-links');
  const closeBtn = document.getElementById('close-btn');
  const main = document.getElementById('main-content');
  const footer = document.getElementById('site-footer');

  let lastScrollY = 0;
  const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  function openMenu() {
    lastScrollY = window.scrollY || window.pageYOffset;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lastScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';

    nav.classList.add('show');
    nav.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');

    main.setAttribute('aria-hidden', 'true');
    footer.setAttribute('aria-hidden', 'true');

    closeBtn.focus();
    document.addEventListener('keydown', handleKeyDown);
  }

  function closeMenu() {
    nav.classList.remove('show');
    nav.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');

    main.removeAttribute('aria-hidden');
    footer.removeAttribute('aria-hidden');

    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, lastScrollY);

    burger.focus();
    document.removeEventListener('keydown', handleKeyDown);
  }

  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });
  closeBtn.addEventListener('click', closeMenu);
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
    if (e.key === 'Tab') {
      const focusable = Array.from(nav.querySelectorAll(focusableSelector));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!nav.classList.contains('show')) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && nav.classList.contains('show')) {
      closeMenu();
    }
  });
});
