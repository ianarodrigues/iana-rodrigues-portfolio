/* =====================================================
  1. MENU HAMBÚRGUER
   Abre/fecha o menu de navegação em dispositivos móveis
===================================================== */
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  /* Abre ou fecha o menu */
  const estaAberto = navLinks.classList.toggle('aberto');

  /* Alterna o ícone do menu → X */
  menuToggle.classList.toggle('open');

  /* Atualiza o estado do menu */
  menuToggle.setAttribute('aria-expanded', estaAberto);
});

/* Fecha o menu ao clicar em qualquer link */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('aberto');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', false);
  });
});

/* =====================================================
   3. LINK ATIVO NO MENU
   Detecta qual seção está visível e destaca o link
   correspondente no menu de navegação
===================================================== */
const sections = document.querySelectorAll('section[id]');
const navItens = document.querySelectorAll('.nav-link');

function atualizarLinkAtivo() {
  /* Considera a altura do menu fixo*/
  const scrollPos = window.scrollY + 100;

  sections.forEach(sec => {
    const topo = sec.offsetTop;
    const altura = sec.offsetHeight;

    /* Verifica qual seção está visível */
    if (scrollPos >= topo && scrollPos < topo + altura) {
      navItens.forEach(l => l.classList.remove('active'));
      const linkAtivo = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (linkAtivo) linkAtivo.classList.add('active');
    }
  });
}

/* Atualiza o menu durante a rolagem */
window.addEventListener('scroll', atualizarLinkAtivo);

atualizarLinkAtivo();

/* =====================================================
   4. ALTERNÂNCIA DE TEMA CLARO / ESCURO
   Alterna a classe .light no elemento <html>
   e salva a preferência no localStorage
===================================================== */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeLabel = document.getElementById('theme-label');

/* Aplica o tema claro ao <html> e atualiza o botão */
function aplicarTemaClaro() {
  document.documentElement.classList.add('light');
  themeIcon.textContent = '🌙';
  themeLabel.textContent = 'Escuro';
  localStorage.setItem('tema', 'light');
}

/* Aplica o tema escuro ao <html> e atualiza o botão */
function aplicarTemaEscuro() {
  document.documentElement.classList.remove('light');
  themeIcon.textContent = '☀️';
  themeLabel.textContent = 'Claro';
  localStorage.setItem('tema', 'dark');
}

/* Carrega o tema salvo */
const temaSalvo = localStorage.getItem('tema') || 'dark';
if (temaSalvo === 'light') aplicarTemaClaro();

/* Troca entre tema claro e escuro */
themeToggle.addEventListener('click', () => {
  const eClaro = document.documentElement.classList.contains('light');
  eClaro ? aplicarTemaEscuro() : aplicarTemaClaro();
});

/* =====================================================
   5. SCROLL REVEAL — ANIMAÇÃO DE ENTRADA
   Usa IntersectionObserver para detectar quando
   elementos com classe .reveal entram na tela
   e adiciona .visivel para disparar a transição CSS
===================================================== */
const elementosReveal = document.querySelectorAll('.reveal');

const observadorReveal = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      /* Exibe o elemento com animação */
      entrada.target.classList.add('visivel');
    }
  });
}, { threshold: 0.12 }); /* Ativa quando 12% do elemento está visível */

elementosReveal.forEach(el => observadorReveal.observe(el));

/* =====================================================
   6. ANIMAÇÃO DAS BARRAS DE IDIOMA
   Anima as barras de progresso de idioma quando
   elas entram na área visível da tela
===================================================== */
const barrasIdioma = document.querySelectorAll('.idioma-barra');

const observadorBarras = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      /* Define a largura da barra */
      const larguraAlvo = entrada.target.dataset.width;
      entrada.target.style.width = larguraAlvo;

      /* Executa apenas uma vez*/
      observadorBarras.unobserve(entrada.target);
    }
  });
}, { threshold: 0.5 }); /* Ativa quando 50% da barra está visível */

barrasIdioma.forEach(barra => observadorBarras.observe(barra));

/* =====================================================
   7. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
   Valida os campos antes do envio:
   - Nome: não pode estar vazio
   - E-mail: deve ter formato válido (user@dominio.com)
   - Mensagem: não pode estar vazia
   Após validação bem-sucedida, exibe modal de confirmação
===================================================== */
const form = document.getElementById('contact-form');
const modalOverlay = document.getElementById('modal-overlay');
const modalFecharBtn = document.getElementById('modal-fechar-btn');

/* Campos do formulário */
const campoNome = document.getElementById('nome');
const campoEmail = document.getElementById('email');
const campoMensagem = document.getElementById('mensagem');

/* Mensagens de erro */
const erroNome = document.getElementById('nome-erro');
const erroEmail = document.getElementById('email-erro');
const erroMensagem = document.getElementById('mensagem-erro');

/* Remove o estado de erro enquanto o usuário digita */
[campoNome, campoEmail, campoMensagem].forEach(campo => {
  campo.addEventListener('input', () => limparErro(campo));
});

/* Mostra o erro no campo */
function mostrarErro(campo, erroEl) {
  campo.classList.add('erro');
  erroEl.classList.add('visivel');
}

/* Remove o erro do campo */
function limparErro(campo) {
  campo.classList.remove('erro');
  /* Busca a mensagem de erro associada ao campo */
  const erroId = campo.getAttribute('aria-describedby');
  if (erroId) {
    const erroEl = document.getElementById(erroId);
    if (erroEl) erroEl.classList.remove('visivel');
  }
}

/* Verifica se o e-mail é válido */
function emailValido(email) {
  /* Padrão: exemplo@exemplo.exemplo — sem espaços, com @ e ponto */
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

/* Intercepta o envio do formulário */
form.addEventListener('submit', (e) => {
  /* Impede o envio padrão do formulário */
  e.preventDefault();

  let formValido = true;

  /* Valida o campo Nome */
  if (campoNome.value.trim() === '') {
    mostrarErro(campoNome, erroNome);
    formValido = false;
  }

  /* Valida o campo E-mail (vazio ou formato inválido) */
  if (campoEmail.value.trim() === '' || !emailValido(campoEmail.value)) {
    mostrarErro(campoEmail, erroEmail);
    formValido = false;
  }

  /* Valida o campo Mensagem */
  if (campoMensagem.value.trim() === '') {
    mostrarErro(campoMensagem, erroMensagem);
    formValido = false;
  }

  /* Se estiver tudo certo, mostra a confirmação */
  if (formValido) {
    form.reset(); /* Limpa todos os campos */
    abrirModal();
  }
});

/* =====================================================
   8. MODAL DE CONFIRMAÇÃO
   Controla a exibição e fechamento do modal
===================================================== */
function abrirModal() {
  modalOverlay.classList.add('visivel');
  /* Move o foco para o botão de fechar */
  modalFecharBtn.focus();
}

function fecharModal() {
  modalOverlay.classList.remove('visivel');
}

/* Fecha ao clicar no botão "Fechar" */
modalFecharBtn.addEventListener('click', fecharModal);

/* Fecha ao clicar fora da caixa do modal */
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) fecharModal();
});

/* Fecha ao pressionar ESC */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('visivel')) {
    fecharModal();
  }
});

/* =====================================================
   9. ANO ATUAL NO RODAPÉ
   Insere o ano atual automaticamente no rodapé
===================================================== */
document.getElementById('ano-atual').textContent = new Date().getFullYear();