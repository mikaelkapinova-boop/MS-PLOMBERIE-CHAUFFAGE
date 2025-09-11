function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('show');
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    document.querySelector('.darkmode-toggle').textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'light');
    document.querySelector('.darkmode-toggle').textContent = '🌙';
  }
}

window.onload = function() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark');
    document.querySelector('.darkmode-toggle').textContent = '☀️';
  }
};
