const tela = document.querySelector(".fundo");
const pincel = tela && tela.getContext("2d");
// com "reduzir movimento" ligado, as estrelas ficam paradas e sem cometa
const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (pincel) {
  // menos estrelas no celular pra não pesar
  const quantidade = window.innerWidth < 720 ? 90 : 220;
  const direcao = { x: -0.88, y: 0.48 };
  const alcance = 420;
  const cauda = 90;
  let largura = 0;
  let altura = 0;
  let cometa = null;
  let proximoCometa = 5000;

  const estrelas = Array.from({ length: quantidade }, () => ({
    x: Math.random(),
    y: Math.random(),
    raio: 0.4 + Math.random(),
    brilho: 0.25 + Math.random() * 0.6,
    velocidade: 0.5 + Math.random() * 1.5,
    fase: Math.random() * Math.PI * 2,
    azul: Math.random() < 0.04,
  }));

  function ajustarTamanho() {
    // acima de 2x só gasta bateria e não muda nada visualmente
    const escala = Math.min(window.devicePixelRatio || 1, 2);
    largura = window.innerWidth;
    altura = window.innerHeight;
    tela.width = largura * escala;
    tela.height = altura * escala;
    pincel.setTransform(escala, 0, 0, escala, 0, 0);
  }

  function desenharCometa(tempo) {
    const progresso = (tempo - cometa.inicio) / 900;
    if (progresso >= 1) {
      cometa = null;
      return;
    }
    const x = cometa.x + direcao.x * alcance * progresso;
    const y = cometa.y + direcao.y * alcance * progresso;
    const rastro = pincel.createLinearGradient(x, y, x - direcao.x * cauda, y - direcao.y * cauda);
    rastro.addColorStop(0, "rgba(255, 255, 255, 0.9)");
    rastro.addColorStop(1, "rgba(255, 255, 255, 0)");
    pincel.globalAlpha = Math.sin(progresso * Math.PI);
    pincel.strokeStyle = rastro;
    pincel.lineWidth = 1.2;
    pincel.beginPath();
    pincel.moveTo(x, y);
    pincel.lineTo(x - direcao.x * cauda, y - direcao.y * cauda);
    pincel.stroke();
  }

  function desenhar(tempo) {
    pincel.clearRect(0, 0, largura, altura);
    for (const estrela of estrelas) {
      const pisca = reduzMovimento ? 1 : 0.6 + 0.4 * Math.sin((tempo / 1000) * estrela.velocidade + estrela.fase);
      pincel.globalAlpha = estrela.brilho * pisca;
      pincel.fillStyle = estrela.azul ? "#7fa6e0" : "#ffffff";
      pincel.beginPath();
      pincel.arc(estrela.x * largura, estrela.y * altura, estrela.raio, 0, Math.PI * 2);
      pincel.fill();
    }

    if (!reduzMovimento && !cometa && tempo > proximoCometa) {
      cometa = { x: largura * (0.4 + Math.random() * 0.6), y: altura * Math.random() * 0.4, inicio: tempo };
      proximoCometa = tempo + 7000 + Math.random() * 8000;
    }
    if (cometa) desenharCometa(tempo);
  }

  function quadro(tempo) {
    desenhar(tempo);
    requestAnimationFrame(quadro);
  }

  ajustarTamanho();
  window.addEventListener("resize", () => {
    ajustarTamanho();
    if (reduzMovimento) desenhar(0);
  });

  if (reduzMovimento) {
    desenhar(0);
  } else {
    requestAnimationFrame(quadro);
  }
}