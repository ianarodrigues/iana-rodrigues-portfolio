const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const themeLabel  = document.getElementById('theme-label');

function aplicarTemaClaro() {
  document.documentElement.classList.add('light');
  themeIcon.textContent  = '🌙';
  themeLabel.textContent = 'Escuro';
  localStorage.setItem('tema', 'light');
}

function aplicarTemaEscuro() {
  document.documentElement.classList.remove('light');
  themeIcon.textContent  = '☀️';
  themeLabel.textContent = 'Claro';
  localStorage.setItem('tema', 'dark');
}

const temaSalvo = localStorage.getItem('tema') || 'dark';
if (temaSalvo === 'light') aplicarTemaClaro();

themeToggle.addEventListener('click', () => {
  const eClaro = document.documentElement.classList.contains('light');
  eClaro ? aplicarTemaEscuro() : aplicarTemaClaro();
});
