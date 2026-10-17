const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.DivSobreNos, .DivNossosDiferenciais, .DivNiveisDeEnsino, .DivMetodologia, .NossaEstrutura, .DivContato').forEach((el) => observer.observe(el));
const slides = document.querySelector('.slides');

document.querySelector('.seta.direita').addEventListener('click', () => {
  slides.scrollBy({ left: slides.clientWidth, behavior: 'smooth' });
});

document.querySelector('.seta.esquerda').addEventListener('click', () => {
  slides.scrollBy({ left: -slides.clientWidth, behavior: 'smooth' });
});

setInterval(() => {
  const chegouNoFim = slides.scrollLeft + slides.clientWidth >= slides.scrollWidth - 5;
  if (chegouNoFim) {
    slides.scrollTo({ left: 0, behavior: 'smooth' });   // volta pro início
  } else {
    slides.scrollBy({ left: slides.clientWidth, behavior: 'smooth' });
  }
}, 4000);


const dialogImagem = document.getElementById('dialogImagem');
const imagemAmpliada = dialogImagem.querySelector('img');

document.querySelectorAll('.slide img').forEach((img) => {
  img.addEventListener('click', () => {
    imagemAmpliada.src = img.src;     // pega a foto que foi clicada
    imagemAmpliada.alt = img.alt;
    dialogImagem.showModal();
  });
});

dialogImagem.querySelector('.fechar').addEventListener('click', () => dialogImagem.close());

// fecha ao clicar no fundo escuro
dialogImagem.addEventListener('click', (e) => {
  if (e.target === dialogImagem) dialogImagem.close();
});

document.querySelectorAll('.TextoZap').forEach((el) => {
  el.addEventListener('click', async () => {
    const textoOriginal = el.textContent;
    try {
      await navigator.clipboard.writeText(textoOriginal.trim());
      el.textContent = 'Copiado!';
      setTimeout(() => (el.textContent = textoOriginal), 1500);
    } catch (erro) {
      console.error('Não foi possível copiar', erro);
    }
  });
});

document.querySelectorAll('.TextoZap, .TextoMaps').forEach((el) => {
  el.addEventListener('click', async () => {
    const htmlOriginal = el.innerHTML;                              // guarda com o <br>
    const textoParaCopiar = el.textContent.replace(/\s+/g, ' ').trim(); // uma linha só, sem espaços duplicados

    try {
      await navigator.clipboard.writeText(textoParaCopiar);
      el.textContent = 'Copiado!';
      setTimeout(() => (el.innerHTML = htmlOriginal), 1500);        // volta com a quebra de linha
    } catch (erro) {
      console.error('Não foi possível copiar', erro);
    }
  });
});

document.getElementById("formWhats").addEventListener("submit", function (e) {
    e.preventDefault(); // impede o formulário de recarregar a página

    const numero = "5531983783050";
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    const texto =
      `Olá! Meu nome é ${nome}.\n` +
      `E-mail: ${email}\n\n` +
      `${mensagem}`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  });