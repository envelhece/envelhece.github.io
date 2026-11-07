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
// card do discord: status, música e jogo via lanyard
const cardDiscord = document.querySelector(".card-discord");

if (cardDiscord) {
  const idDiscord = "1463251166967369934";
  const nomesStatus = { online: "online", idle: "ausente", dnd: "não perturbe", offline: "offline" };
  const lista = cardDiscord.querySelector(".dc-atividades");
  let atividadesAtuais = [];

  function criar(tag, classe, texto) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto) el.textContent = texto;
    return el;
  }

  function relogio(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const seg = String(s % 60).padStart(2, "0");
    return h ? `${h}:${String(m).padStart(2, "0")}:${seg}` : `${m}:${seg}`;
  }

  function imagemAtividade(atividade) {
    const img = atividade.assets && atividade.assets.large_image;
    if (!img) return null;
    if (img.startsWith("mp:external/")) return "https://media.discordapp.net/" + img.slice(3);
    if (img.startsWith("spotify:")) return "https://i.scdn.co/image/" + img.slice(8);
    if (atividade.application_id) return `https://cdn.discordapp.com/app-assets/${atividade.application_id}/${img}.png`;
    return null;
  }

  function linha(rotulo, titulo, sub, capaUrl, tempos) {
    const li = criar("li", "dc-atividade");
    if (capaUrl) {
      const capa = criar("img", "dc-capa");
      capa.src = capaUrl;
      capa.alt = "";
      capa.width = 52;
      capa.height = 52;
      li.append(capa);
    }
    const textos = criar("span", "textos");
    textos.append(criar("span", "dc-rotulo", rotulo), criar("span", "servico", titulo));
    if (sub) textos.append(criar("span", "usuario", sub));
    if (tempos) {
      const tempo = criar("span", "dc-tempo");
      tempo.dataset.inicio = tempos.start || "";
      tempo.dataset.fim = tempos.end || "";
      if (tempos.end) {
        const barra = criar("span", "dc-barra");
        barra.append(criar("span"));
        textos.append(barra);
      }
      textos.append(tempo);
    }
    li.append(textos);
    return li;
  }

  function atualizarTempos() {
    const agora = Date.now();
    for (const tempo of lista.querySelectorAll(".dc-tempo")) {
      const inicio = Number(tempo.dataset.inicio);
      const fim = Number(tempo.dataset.fim);
      if (!inicio) continue;
      if (fim) {
        tempo.textContent = `${relogio(agora - inicio)} / ${relogio(fim - inicio)}`;
        const barra = tempo.parentElement.querySelector(".dc-barra span");
        if (barra) barra.style.width = Math.min(100, ((agora - inicio) / (fim - inicio)) * 100) + "%";
      } else {
        tempo.textContent = `há ${relogio(agora - inicio)}`;
      }
    }
  }

  function mostrar(dados) {
    const usuario = dados.discord_user;
    const status = dados.discord_status || "offline";
    const avatar = cardDiscord.querySelector(".dc-avatar");
    avatar.src = usuario.avatar
      ? `https://cdn.discordapp.com/avatars/${usuario.id}/${usuario.avatar}.${usuario.avatar.startsWith("a_") ? "gif" : "png"}?size=128`
      : "https://cdn.discordapp.com/embed/avatars/0.png";
    cardDiscord.querySelector(".dc-nome").textContent = usuario.global_name || usuario.username;
    cardDiscord.querySelector(".dc-bolinha").className = "dc-bolinha " + status;

    const personalizado = (dados.activities || []).find((a) => a.type === 4);
    cardDiscord.querySelector(".dc-status").textContent =
      (personalizado && personalizado.state) || nomesStatus[status] || status;

    atividadesAtuais = [];
    if (dados.listening_to_spotify && dados.spotify) {
      const s = dados.spotify;
      atividadesAtuais.push(linha("ouvindo spotify", s.song, s.artist.replace(/;/g, ","), s.album_art_url, s.timestamps));
    }
    for (const a of dados.activities || []) {
      if (a.type !== 0) continue;
      atividadesAtuais.push(linha("jogando", a.name, [a.details, a.state].filter(Boolean).join(" · "), imagemAtividade(a), a.timestamps && { start: a.timestamps.start }));
    }
    lista.replaceChildren(...atividadesAtuais);
    atualizarTempos();
    cardDiscord.hidden = false;
  }

  async function buscar() {
    try {
      const resposta = await fetch(`https://api.lanyard.rest/v1/users/${idDiscord}`);
      const json = await resposta.json();
      if (json.success) mostrar(json.data);
    } catch (erro) {
      // sem conexão com a lanyard: o card só não aparece
    }
  }

  buscar();
  setInterval(buscar, 15000);
  setInterval(atualizarTempos, 1000);
}
