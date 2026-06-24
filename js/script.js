const menuToggle = document.getElementById('menu-toggle');
const navLinks   = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  const estaAberto = navLinks.classList.toggle('aberto');

  menuToggle.classList.toggle('open');

  menuToggle.setAttribute('aria-expanded', estaAberto);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('aberto');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', false);
  });
});

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

const elementosReveal = document.querySelectorAll('.reveal');

const observadorReveal = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
    }
  });
}, { threshold: 0.12 });

elementosReveal.forEach(el => observadorReveal.observe(el));

const barrasIdioma = document.querySelectorAll('.idioma-barra');

const observadorBarras = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      const larguraAlvo = entrada.target.dataset.width;
      entrada.target.style.width = larguraAlvo;

      observadorBarras.unobserve(entrada.target);
    }
  });
}, { threshold: 0.5 }); 

barrasIdioma.forEach(barra => observadorBarras.observe(barra));
