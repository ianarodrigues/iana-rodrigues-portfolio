const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

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
const themeIcon = document.getElementById('theme-icon');
const themeLabel = document.getElementById('theme-label');

function aplicarTemaClaro() {
  document.documentElement.classList.add('light');
  themeIcon.textContent = '🌙';
  themeLabel.textContent = 'Escuro';
  localStorage.setItem('tema', 'light');
}

function aplicarTemaEscuro() {
  document.documentElement.classList.remove('light');
  themeIcon.textContent = '☀️';
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

const form = document.getElementById('contact-form');
const modalOverlay = document.getElementById('modal-overlay');
const modalFecharBtn = document.getElementById('modal-fechar-btn');

const campoNome = document.getElementById('nome');
const campoEmail = document.getElementById('email');
const campoMensagem = document.getElementById('mensagem');

const erroNome = document.getElementById('nome-erro');
const erroEmail = document.getElementById('email-erro');
const erroMensagem = document.getElementById('mensagem-erro');

[campoNome, campoEmail, campoMensagem].forEach(campo => {
  campo.addEventListener('input', () => limparErro(campo));
});

function mostrarErro(campo, erroEl) {
  campo.classList.add('erro');
  erroEl.classList.add('visivel');
}

function limparErro(campo) {
  campo.classList.remove('erro');
  const erroId = campo.getAttribute('aria-describedby');
  if (erroId) {
    const erroEl = document.getElementById(erroId);
    if (erroEl) erroEl.classList.remove('visivel');
  }
}

function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let formValido = true;

  if (campoNome.value.trim() === '') {
    mostrarErro(campoNome, erroNome);
    formValido = false;
  }

  if (campoEmail.value.trim() === '' || !emailValido(campoEmail.value)) {
    mostrarErro(campoEmail, erroEmail);
    formValido = false;
  }

  if (campoMensagem.value.trim() === '') {
    mostrarErro(campoMensagem, erroMensagem);
    formValido = false;
  }

  if (formValido) {
    form.reset();
    abrirModal();
  }
});

function abrirModal() {
  modalOverlay.classList.add('visivel');
  modalFecharBtn.focus();
}

function fecharModal() {
  modalOverlay.classList.remove('visivel');
}

modalFecharBtn.addEventListener('click', fecharModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) fecharModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('visivel')) {
    fecharModal();
  }
});

document.getElementById('ano-atual').textContent = new Date().getFullYear();