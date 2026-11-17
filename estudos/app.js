/* Caderno — motor do site: trilhas por matéria, lições, provas e imagem do resultado. */
(function () {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const app = $('#app');
  const NOTA_MIN = 6;
  const ICON = {
    chave: '<svg viewBox="0 0 24 24"><circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.7 12.3 20 3M16 7l2.5 2.5M18.5 4.5 21 7"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="m5 12 4 4 10-10"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    seta: '<svg viewBox="0 0 24 24"><path d="M15 18 9 12l6-6"/></svg>',
  };

  /* ---------- montar o curso ---------- */
  const TODAS = [];
  (window.CURSO || []).forEach((l) => TODAS.push(l));
  const ordemMat = Object.keys(MAPA_MAT);
  (AFA.mat || []).forEach((l) => { if (MAPA_MAT[l.id]) { l.materia = 'mat'; l.ano = MAPA_MAT[l.id]; l.ordemExtra = 100 + ordemMat.indexOf(l.id); TODAS.push(l); } });
  TODAS.forEach((l, i) => { l.pos = l.ordemExtra != null ? l.ordemExtra : i; });
  const LICAO = {};
  TODAS.forEach((l) => (LICAO[l.id] = l));
  const TRILHA = {};
  Object.keys(MATERIAS).forEach((m) => { TRILHA[m] = TODAS.filter((l) => l.materia === m).sort((a, b) => a.ano - b.ano || a.pos - b.pos); });
  const nomeAno = (n) => (ANOS.find((a) => a.n === n) || {}).nome || n + 'º ano';

  /* ---------- estado salvo ---------- */
  const KEY = 'caderno-v1';
  let S = { notas: {}, erros: [], provas: [], stats: { q: 0, a: 0 }, xp: 0, dias: {} };
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) {}
  const salvar = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const META = 50;
  const chaveDia = (d) => { d = d || new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };
  const xpHoje = () => S.dias[chaveDia()] || 0;
  const nivel = () => Math.floor((S.xp || 0) / 300) + 1;
  const sequencia = () => { let n = 0; const d = new Date(); if (!S.dias[chaveDia(d)]) d.setDate(d.getDate() - 1); while (S.dias[chaveDia(d)]) { n++; d.setDate(d.getDate() - 1); } return n; };
  function ganharXP(v) { S.xp = (S.xp || 0) + v; S.dias[chaveDia()] = xpHoje() + v; }
  function flutuar(txt) { const e = document.createElement('div'); e.className = 'xpfloat'; e.textContent = txt; document.body.appendChild(e); setTimeout(() => e.remove(), 1000); }
  function confete() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = document.createElement('canvas'); c.id = 'confete'; c.width = innerWidth; c.height = innerHeight; document.body.appendChild(c);
    const ctx = c.getContext('2d'), cores = ['#3ddc84', '#9be15d', '#ffffff', '#ffd23d', '#7fb6ff'];
    const ps = Array.from({ length: 140 }, () => ({ x: innerWidth / 2, y: innerHeight * 0.35, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 14 - 4, s: Math.random() * 6 + 4, r: Math.random() * 6, c: cores[Math.floor(Math.random() * cores.length)] }));
    let t = 0; (function f() { ctx.clearRect(0, 0, c.width, c.height); ps.forEach((p) => { p.x += p.vx; p.y += p.vy; p.vy += 0.35; p.r += 0.1; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore(); }); if (++t < 110) requestAnimationFrame(f); else c.remove(); })();
  }
  const ICO_FOGO = '<svg viewBox="0 0 24 24"><path d="M12 3c1 3 4 4.5 4 9a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 0-8z"/></svg>';
  const ICO_RAIO = '<svg viewBox="0 0 24 24"><path d="M13 3 5 13h6l-1 8 8-10h-6l1-8z"/></svg>';
  const ICO_NIVEL = '<svg viewBox="0 0 24 24"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/></svg>';
  const stats = () => `<div class="topo-stats"><span class="pill fogo">${ICO_FOGO}${sequencia()} dia${sequencia() === 1 ? '' : 's'}</span><span class="pill raio">${ICO_RAIO}${S.xp || 0} XP</span><span class="pill nivel">${ICO_NIVEL}Nível ${nivel()}</span></div>`;
  const nota = (id) => (S.notas[id] ? S.notas[id].melhor : null);
  const passou = (id) => (nota(id) ?? -1) >= NOTA_MIN;
  const liberada = (id) => { const l = LICAO[id]; const t = TRILHA[l.materia]; const i = t.indexOf(l); return i <= 0 || passou(t[i - 1].id); };
  const proxima = (m) => TRILHA[m].find((l) => !passou(l.id));
  const fmtNota = (x) => x.toFixed(1).replace('.', ',');
  const hojeTxt = () => new Date().toLocaleDateString('pt-BR');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const plain = (s) => String(s).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');

  function toast(msg) {
    const t = $('#toast');
    t.innerHTML = msg;
    t.classList.add('on');
    clearTimeout(toast.h);
    toast.h = setTimeout(() => t.classList.remove('on'), 3200);
  }

  /* ---------- questões ---------- */
  function montar(spec) {
    const out = [];
    for (const it of spec || []) {
      if (it.gen) {
        const vistos = new Set();
        let k = 0, tent = 0;
        while (k < it.n && tent < 60) { tent++; const q = it.gen(); if (vistos.has(q.q) && tent < 40) continue; vistos.add(q.q); out.push(q); k++; }
      } else if (it.pool) AF.shuf(it.pool).slice(0, it.n).forEach((q) => out.push(q));
      else out.push(it);
    }
    return out.map(preparar);
  }
  function preparar(q) {
    q = Object.assign({}, q);
    q.res = Array.isArray(q.res) ? q.res : q.res ? [q.res] : [];
    if (q.t === 'esc') {
      const mix = AF.shuf(q.o.map((t, i) => [t, i === q.c]));
      q.o = mix.map((v) => v[0]);
      q.c = mix.findIndex((v) => v[1]);
    }
    return q;
  }
  function lerNumero(s) {
    s = String(s).trim().replace(/\s/g, '').replace(/[−–]/g, '-').replace(/[^\d,./-]/g, '');
    if (!s) return NaN;
    if (s.includes('/')) { const [a, b] = s.split('/'); const A = lerNumero(a), B = lerNumero(b); return B ? A / B : NaN; }
    if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
    else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
    return Number(s);
  }
  const normTxt = (s) => String(s).trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.!?]+$/, '');
  function corrigir(q, resp) {
    if (q.t === 'esc') return resp === q.c;
    if (q.t === 'txt') return q.r.some((r) => normTxt(r) === normTxt(resp));
    if (q.t === 'num') {
      const v = lerNumero(resp);
      if (isNaN(v) || Math.abs(v - q.r) > 1e-9 * Math.max(1, Math.abs(q.r))) return false;
      if (q.irr) {
        const s = String(resp).trim().replace(/[−–]/g, '-');
        if (s.includes('/')) { const [a, b] = s.split('/').map((x) => Math.abs(lerNumero(x))); if (AF.gcd(a, b) !== 1 || b === 1) return false; }
      }
      return true;
    }
    return true;
  }
  const respCerta = (q) => (q.t === 'esc' ? q.o[q.c] : q.t === 'txt' ? q.r[0] : q.rTxt || AF.n(+(+q.r).toFixed(6)));
  const respDada = (q, r) => (r === null || r === undefined || r === '' ? 'não respondeu' : q.t === 'esc' ? q.o[r] : String(r));

  /* ---------- sessão de questões (lição, prova ou treino) ---------- */
  let SES = null;
  function iniciarSessao(cfg) {
    SES = Object.assign({ i: 0, itens: [], acertos: 0, combo: 0, xp: 0 }, cfg);
    if (!SES.qs.length) { toast('Não tem questões pra montar essa atividade ainda.'); return; }
    mostrarQuestao();
  }
  function mostrarQuestao() {
    const q = SES.qs[SES.i];
    SES.resp = null; SES.feito = false;
    const tot = SES.qs.length;
    let corpo = '';
    if (q.t === 'esc') {
      corpo = `<div class="opcoes" role="group">${q.o.map((t, i) => `<button class="opcao" data-i="${i}" aria-pressed="false"><span class="letra">${'ABCDE'[i]}</span><span>${esc(t)}</span></button>`).join('')}</div>`;
    } else {
      const mode = q.t === 'num' && !q.fr && !q.neg ? 'decimal' : 'text';
      corpo = `<div class="campo"><input id="resp" autocomplete="off" autocorrect="off" autocapitalize="${q.up ? 'characters' : 'off'}" spellcheck="false" inputmode="${mode}" placeholder="${esc(q.ph || 'Sua resposta')}">${q.neg ? '<button class="sinal" id="sinal" type="button" aria-label="Colocar ou tirar o sinal de menos">±</button>' : ''}${q.u ? `<span class="unid">${esc(q.u)}</span>` : ''}</div>`;
    }
    app.innerHTML = `<div class="sessao">
      <div class="topo"><button class="fechar" id="sair" aria-label="Sair">${ICON.x}</button><div class="barra"><i style="width:${(SES.i / tot) * 100}%"></i></div>${SES.combo >= 2 ? `<span class="combo">${SES.combo} seguidas</span>` : ""}<span class="qnum">${SES.i + 1} de ${tot}</span></div>
      <p class="rotulo">${esc(SES.rotulo || '')}${q.de ? ` · ${esc(q.de)}` : ''}</p>
      <h2 class="enunciado${q.g ? ' g' : ''}">${esc(q.q)}</h2>
      ${corpo}
      <div class="acoes" id="acoes"><button class="btn" id="verificar" disabled>Verificar</button><button class="btn-sec" id="naosei">Não sei</button>${q.dica && !SES.semDica ? '<button class="link" id="dica">Ver dica</button>' : ''}</div>
      <div id="dicabox"></div><div id="fb"></div></div>`;
    $('#sair').onclick = () => { SES = null; history.back(); };
    const inp = $('#resp');
    if (inp) {
      inp.focus();
      inp.oninput = () => { $('#verificar').disabled = !inp.value.trim(); };
      if ($('#sinal')) $('#sinal').onclick = () => { inp.value = inp.value.startsWith('-') || inp.value.startsWith('−') ? inp.value.slice(1) : '−' + inp.value; inp.focus(); inp.oninput(); };
    } else {
      app.querySelectorAll('.opcao').forEach((b) => (b.onclick = () => escolher(+b.dataset.i)));
    }
    $('#verificar').onclick = () => verificar(inp ? inp.value : SES.resp);
    $('#naosei').onclick = () => verificar(null, true);
    if ($('#dica')) $('#dica').onclick = () => { $('#dicabox').innerHTML = `<div class="dica-box">${esc(q.dica)}</div>`; $('#dica').remove(); };
  }
  function escolher(i) {
    if (SES.feito) return;
    SES.resp = i;
    app.querySelectorAll('.opcao').forEach((b) => b.setAttribute('aria-pressed', +b.dataset.i === i ? 'true' : 'false'));
    $('#verificar').disabled = false;
  }
  function verificar(resp, naoSei) {
    if (SES.feito) return;
    const q = SES.qs[SES.i];
    if (!naoSei && (resp === null || resp === '')) return;
    SES.feito = true;
    const ok = !naoSei && corrigir(q, resp);
    if (ok) { SES.acertos++; SES.combo++; const g = 10 + Math.min(SES.combo - 1, 5) * 2; SES.xp += g; ganharXP(g); flutuar('+' + g + ' XP'); } else SES.combo = 0;
    SES.itens.push({ q, resp: naoSei ? null : resp, ok });
    if (q.t === 'esc') app.querySelectorAll('.opcao').forEach((b) => { const i = +b.dataset.i; b.disabled = true; if (i === q.c) b.classList.add('certa'); else if (i === resp) b.classList.add('errada'); });
    const inp = $('#resp'); if (inp) inp.disabled = true;
    $('#acoes').innerHTML = '';
    const passos = q.res.length ? `<ol class="passos">${q.res.map((p) => `<li>${p}</li>`).join('')}</ol>` : '';
    const ultimo = SES.i === SES.qs.length - 1;
    $('#fb').innerHTML = `<div class="feedback ${ok ? 'certo' : 'errado'}">
      <p class="tit">${ok ? (SES.combo >= 3 ? `Certo! ${SES.combo} seguidas.` : AF.pick(['Certo!', 'Boa!', 'Isso aí!', 'Mandou bem!'])) : naoSei ? 'Sem problema, olha como resolve.' : 'Não foi dessa vez.'}${ok ? '' : ` Resposta certa: ${esc(respCerta(q))}`}</p>
      ${passos ? (ok ? `<details><summary>Ver como resolver</summary>${passos}</details>` : `<p class="rotulo" style="margin-top:14px">Como resolver</p>${passos}`) : ''}
      <div class="acoes"><button class="btn" id="cont">${ultimo ? 'Ver resultado' : 'Continuar'}</button></div></div>`;
    $('#cont').focus(); const fbx = $('#fb .feedback'); fbx.classList.add(ok ? 'pop' : 'shake');
    $('#cont').onclick = () => { SES.i++; if (SES.i >= SES.qs.length) SES.fim(SES); else mostrarQuestao(); };
  }
  document.addEventListener('keydown', (e) => {
    if (!SES || !document.querySelector('.sessao')) return;
    if (e.key === 'Enter') {
      const c = $('#cont'); if (c) { e.preventDefault(); c.click(); return; }
      const v = $('#verificar'); if (v && !v.disabled) { e.preventDefault(); v.click(); }
      return;
    }
    if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
    const q = SES.qs[SES.i];
    if (q && q.t === 'esc' && !SES.feito) {
      const k = e.key.toLowerCase(), i = '1234'.includes(k) ? +k - 1 : 'abcd'.indexOf(k);
      if (i >= 0 && i < q.o.length) escolher(i);
    }
  });

  /* ---------- relatório e imagem ---------- */
  function registrarErros(itens, origem) {
    itens.filter((x) => !x.ok).forEach((x) => S.erros.unshift({ data: hojeTxt(), de: origem, q: x.q, sua: respDada(x.q, x.resp) }));
    S.erros = S.erros.slice(0, 150);
  }
  function relatorio(titulo, notaV, itens) {
    const err = itens.filter((x) => !x.ok);
    let s = `${titulo}\nData: ${hojeTxt()}\nNota: ${fmtNota(notaV)} (${itens.length - err.length} de ${itens.length} certas)\n`;
    s += `\nCertas:\n${itens.filter((x) => x.ok).map((x, i) => `${i + 1}. ${plain(x.q.q)}`).join('\n') || '- nenhuma'}\n`;
    s += `\nErradas:\n${err.map((x, i) => `${i + 1}. ${plain(x.q.q)}\n   Respondi: ${respDada(x.q, x.resp)}\n   Certo: ${respCerta(x.q)}`).join('\n') || '- nenhuma'}\n`;
    s += err.length ? '\nExplique por que errei cada uma, passo a passo e de um jeito simples, e me passe 3 exercícios parecidos pra treinar (sem as respostas).' : '\nAcertei tudo. Me passe 5 exercícios um pouco mais difíceis desse conteúdo (sem as respostas).';
    return s;
  }
  function copiar(txt, botao) {
    const ok = () => { const o = botao.textContent; botao.textContent = 'Copiado'; setTimeout(() => (botao.textContent = o), 2200); };
    const manual = () => { const t = document.createElement('textarea'); t.className = 'copia'; t.value = txt; t.readOnly = true; botao.parentNode.after(t); t.select(); toast('Selecione o texto abaixo e copie.'); };
    try { navigator.clipboard.writeText(txt).then(ok, manual); } catch (e) { manual(); }
  }
  function quebrar(ctx, txt, larg) {
    const palavras = String(txt).split(' '); const linhas = []; let l = '';
    palavras.forEach((p) => { const t = l ? l + ' ' + p : p; if (ctx.measureText(t).width > larg && l) { linhas.push(l); l = p; } else l = t; });
    if (l) linhas.push(l);
    return linhas;
  }
  function gerarPNG(titulo, notaV, itens) {
    const W = 1080, M = 72, larg = W - M * 2;
    const c = document.createElement('canvas'), ctx = c.getContext('2d');
    const fonte = (peso, tam) => `${peso} ${tam}px Archivo, Arial, sans-serif`;
    ctx.font = fonte(500, 30);
    const blocos = itens.map((x, i) => {
      ctx.font = fonte(600, 30);
      const q = quebrar(ctx, `${i + 1}. ${plain(x.q.q)}`, larg - 60);
      ctx.font = fonte(400, 26);
      const r = x.ok ? [`Sua resposta: ${respDada(x.q, x.resp)}`] : [`Sua resposta: ${respDada(x.q, x.resp)}`, `Certo: ${respCerta(x.q)}`];
      const rl = r.flatMap((t) => quebrar(ctx, t, larg - 60));
      return { x, q, rl, h: q.length * 40 + rl.length * 34 + 34 };
    });
    const H = 420 + blocos.reduce((a, b) => a + b.h, 0) + 90;
    c.width = W; c.height = H;
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#8e8e8e'; ctx.font = fonte(500, 28); ctx.fillText(`Caderno · ${hojeTxt()}`, M, M + 10);
    ctx.fillStyle = '#fff'; ctx.font = fonte(800, 56);
    quebrar(ctx, titulo, larg).forEach((t, i) => ctx.fillText(t, M, M + 84 + i * 62));
    ctx.font = fonte(800, 150); ctx.fillText(fmtNota(notaV), M, M + 300);
    const ac = itens.filter((x) => x.ok).length;
    ctx.fillStyle = '#bdbdbd'; ctx.font = fonte(500, 32); ctx.fillText(`${ac} certa${ac === 1 ? "" : "s"} · ${itens.length - ac} errada${itens.length - ac === 1 ? "" : "s"}`, M + 360, M + 290);
    let y = 440;
    ctx.strokeStyle = '#232323'; ctx.lineWidth = 2;
    blocos.forEach((b) => {
      ctx.beginPath(); ctx.moveTo(M, y - 30); ctx.lineTo(W - M, y - 30); ctx.stroke();
      ctx.fillStyle = b.x.ok ? '#6cc08b' : '#e8726a'; ctx.font = fonte(800, 34); ctx.fillText(b.x.ok ? '✓' : '✗', M, y + 4);
      ctx.fillStyle = '#fff'; ctx.font = fonte(600, 30);
      b.q.forEach((t, i) => ctx.fillText(t, M + 52, y + 4 + i * 40));
      let yy = y + 4 + b.q.length * 40;
      ctx.font = fonte(400, 26);
      b.rl.forEach((t) => { ctx.fillStyle = t.startsWith('Certo') ? '#6cc08b' : b.x.ok ? '#bdbdbd' : '#e8726a'; ctx.fillText(t, M + 52, yy); yy += 34; });
      y += b.h;
    });
    return c.toDataURL('image/png');
  }

  /* ---------- telas ---------- */
  function linhaLicao(l, opts = {}) {
    const n = nota(l.id), lib = liberada(l.id);
    let est;
    if (n != null && n >= NOTA_MIN) est = `<span class="estado ok">${ICON.check} Nota ${fmtNota(n)}</span>`;
    else if (n != null) est = `<span class="estado baixa">Nota ${fmtNota(n)} · refazer</span>`;
    else if (lib) est = '<span class="estado">Começar</span>';
    else est = `<span class="estado trava">${ICON.chave}</span>`;
    const sub = opts.sub || `${MATERIAS[l.materia]}, ${nomeAno(l.ano)} · ${l.min} min`;
    return `<button class="item${lib ? '' : ' trancado'}" data-l="${l.id}"><span class="item-txt"><strong>${esc(l.titulo)}</strong><span>${esc(sub)}</span></span><span class="lider"></span>${est}</button>`;
  }
  function ligarLinhas() {
    app.querySelectorAll('[data-l]').forEach((b) => (b.onclick = () => {
      const l = LICAO[b.dataset.l];
      if (!liberada(l.id)) { const t = TRILHA[l.materia]; const ant = t[t.indexOf(l) - 1]; toast(`${ICON.chave} Essa abre quando você tirar 6 em "${esc(ant.titulo)}".`); return; }
      location.hash = '#licao/' + l.id;
    }));
  }

  function telaInicio() {
    const prox = Object.keys(MATERIAS).map(proxima).filter(Boolean);
    const alvo = prox.slice().sort((x, y) => x.ano - y.ano || TRILHA[x.materia].indexOf(x) - TRILHA[y.materia].indexOf(y))[0];
    const hoje = xpHoje(), pct = Math.min(100, (hoje / META) * 100);
    const feitas = TODAS.filter((l) => passou(l.id)).length;
    app.innerHTML = `
      ${stats()}
      ${alvo ? `<div class="hero"><p class="k">Próxima lição · ${MATERIAS[alvo.materia]}, ${nomeAno(alvo.ano)}</p><h2>${esc(alvo.titulo)}</h2><p>${esc(alvo.resumo || '')} · ${alvo.min} min</p><button class="btn" id="continuar">Continuar</button></div>` : '<div class="vazio">Você terminou todas as lições disponíveis. Novas chegam em breve.</div>'}
      <div class="meta"><div class="meta-top">Meta de hoje <span>${hoje} / ${META} XP</span></div><div class="meta-bar"><i style="width:0"></i></div>${hoje >= META ? '<p class="desc" style="margin-top:8px;color:#9be15d">Meta batida! Cada lição a mais conta pro seu nível.</p>' : ''}</div>
      <h2 class="secao">Outras matérias</h2>
      <p class="desc">${feitas} de ${TODAS.length} lições concluídas.</p>
      <div class="lista">${prox.filter((l) => l !== alvo).map((l) => linhaLicao(l)).join('')}</div>
      <div class="acoes" style="margin-top:30px"><a class="btn-sec" href="#provas">Fazer uma prova</a><a class="btn-sec" href="#erros">Treinar erros (${S.erros.length})</a></div>`;
    requestAnimationFrame(() => { const b = app.querySelector('.meta-bar i'); if (b) b.style.width = pct + '%'; });
    if (alvo) $('#continuar').onclick = () => (location.hash = '#licao/' + alvo.id);
    ligarLinhas();
  }

  function telaAnos(n) {
    const ano = +n || (Object.keys(MATERIAS).map(proxima).filter(Boolean).reduce((m, l) => Math.min(m, l.ano), 99) % 99) || 1;
    const doAno = TODAS.filter((l) => l.ano === ano);
    const completo = (a) => { const ls = TODAS.filter((l) => l.ano === a); return ls.length && ls.every((l) => passou(l.id)); };
    const plano = PROGRAMA[ano] || {};
    const mats = Object.keys(MATERIAS).filter((m) => doAno.some((l) => l.materia === m) || plano[m]);
    const info = ANOS.find((a) => a.n === ano);
    app.innerHTML = `
      <h1 class="titulo">${info.nome}</h1>
      <p class="sub">${info.etapa}. ${doAno.length ? `${doAno.filter((l) => passou(l.id)).length} de ${doAno.length} lições concluídas.` : 'As lições deste ano ainda estão sendo escritas.'}</p>
      <div class="anos-nav">${ANOS.map((a) => `<button class="chip${completo(a.n) ? ' feito' : ''}" data-ano="${a.n}" aria-pressed="${a.n === ano}">${a.nome}${a.n >= 10 ? ' EM' : ''}</button>`).join('')}</div>
      ${mats.map((m) => {
        const ls = doAno.filter((l) => l.materia === m).sort((a, b) => a.pos - b.pos);
        const emBreve = (plano[m] || []).map((t) => `<div class="item trancado"><span class="item-txt"><strong>${esc(t)}</strong><span>Em breve</span></span><span class="lider"></span><span class="estado trava">em breve</span></div>`).join('');
        return `<div class="materia-bloco"><h3>${MATERIAS[m]} <span>${ls.length ? `${ls.filter((l) => passou(l.id)).length}/${ls.length}` : ''}</span></h3><div class="lista">${ls.map((l) => linhaLicao(l, { sub: `${l.min} min · ${l.resumo}` })).join('')}${emBreve}</div></div>`;
      }).join('')}`;
    app.querySelectorAll('[data-ano]').forEach((b) => (b.onclick = () => (location.hash = '#anos/' + b.dataset.ano)));
    ligarLinhas();
  }

  function cartoesTeoria(blocos) {
    const cards = []; let cur = [];
    (blocos || []).forEach((b) => { if (b.startsWith('<h2>') && cur.length) { cards.push(cur); cur = []; } cur.push(b); });
    if (cur.length) cards.push(cur);
    return cards.map((c) => c.join(''));
  }
  function telaLicao(id) {
    const l = LICAO[id];
    if (!l) { location.hash = '#inicio'; return; }
    if (!liberada(id)) { toast(`${ICON.chave} Essa lição ainda está trancada.`); location.hash = '#anos/' + l.ano; return; }
    const cards = cartoesTeoria(l.teoria);
    let k = 0;
    const comecar = () => iniciarSessao({ qs: montar(l.pratica), rotulo: `${MATERIAS[l.materia]} · ${l.titulo}`, fim: (s) => fimLicao(l, s) });
    const desenhar = () => {
      const ultimo = k === cards.length - 1;
      app.innerHTML = `<div class="licao">
        <div class="topo"><button class="fechar" id="sair" aria-label="Sair">${ICON.x}</button><div class="barra"><i style="width:${((k + 1) / cards.length) * 100}%"></i></div><span class="qnum">${k + 1} de ${cards.length}</span></div>
        ${k === 0 ? `<p class="meta">${MATERIAS[l.materia]}, ${nomeAno(l.ano)} · ${l.min} min</p><h1>${esc(l.titulo)}</h1>` : ''}
        <div class="teoria cartao pop">${cards[k]}</div>
        <div class="acoes">${k > 0 ? '<button class="btn-sec" id="ant">Voltar</button>' : ''}<button class="btn" id="prox">${ultimo ? 'Começar exercícios' : 'Entendi, próximo'}</button>${nota(id) != null && !ultimo ? '<button class="link" id="pular">Pular pros exercícios</button>' : ''}</div>
      </div>`;
      $('#sair').onclick = () => history.back();
      $('#prox').onclick = () => { if (ultimo) comecar(); else { k++; ganharXP(2); salvar(); flutuar('+2 XP'); desenhar(); window.scrollTo(0, 0); } };
      if ($('#ant')) $('#ant').onclick = () => { k--; desenhar(); };
      if ($('#pular')) $('#pular').onclick = comecar;
      $('#prox').focus();
    };
    desenhar();
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !SES && document.querySelector('.licao #prox')) { e.preventDefault(); $('#prox').click(); } });
  function fimLicao(l, s) {
    const notaV = (s.acertos / s.qs.length) * 10;
    const ant = S.notas[l.id];
    S.notas[l.id] = { melhor: Math.max(ant ? ant.melhor : 0, notaV), ultima: notaV, tent: (ant ? ant.tent : 0) + 1, data: hojeTxt() };
    S.stats.q += s.qs.length; S.stats.a += s.acertos;
    if (notaV >= NOTA_MIN) { ganharXP(20); s.xp += 20; }
    registrarErros(s.itens, `${MATERIAS[l.materia]} · ${l.titulo}`);
    salvar();
    const t = TRILHA[l.materia]; const prox = t[t.indexOf(l) + 1];
    const titulo = `${MATERIAS[l.materia]}, ${nomeAno(l.ano)}: ${l.titulo}`;
    telaResultado({ titulo, notaV, itens: s.itens, msgExtra: notaV >= NOTA_MIN ? (prox ? `Lição concluída. Liberou: ${prox.titulo}.` : 'Lição concluída.') : `Pra concluir, precisa de ${NOTA_MIN}. Revê a explicação e tenta de novo.`, refazer: () => (location.hash = '#licao/' + l.id + '/' + Date.now()), prox: notaV >= NOTA_MIN && prox ? prox : null, png: false, xp: s.xp });
  }

  function telaResultado(o) {
    SES = null;
    const err = o.itens.filter((x) => !x.ok);
    const rel = relatorio(o.titulo, o.notaV, o.itens);
    app.innerHTML = `<div class="sessao">
      <p class="meta">${esc(o.titulo)}</p>
      <div class="nota" style="margin-top:12px">${fmtNota(o.notaV)}</div>
      <p class="sub">${o.itens.length - err.length} de ${o.itens.length} certas. ${esc(o.msgExtra || '')}</p>${o.xp ? `<div class="ganhos"><span class="pill raio">${ICO_RAIO}+${o.xp} XP</span><span class="pill fogo">${ICO_FOGO}${sequencia()} dia${sequencia() === 1 ? '' : 's'} seguidos</span><span class="pill nivel">${ICO_NIVEL}Nível ${nivel()}</span></div>` : ''}
      <div class="acoes">${o.prox ? `<button class="btn" id="prox">Próxima lição</button>` : `<a class="btn" href="#inicio">Voltar pro início</a>`}<button class="btn-sec" id="refazer">${o.png ? 'Fazer outra prova' : 'Refazer'}</button><button class="btn-sec" id="copiar">Copiar relatório</button></div>
      ${o.png ? `<h2 class="secao">Imagem da prova</h2><p class="desc">Baixa a imagem e me manda. No iPhone, toca e segura na imagem pra salvar.</p><img class="img-prova" id="img" alt="Resultado da prova"><div class="acoes"><a class="btn" id="baixar" download="prova-${Date.now()}.png">Baixar PNG</a></div>` : ''}
      ${err.length ? `<h2 class="secao">O que você errou</h2>${err.map((x) => `<div class="erro-card"><b>${esc(plain(x.q.q))}</b><div class="s">Sua resposta: ${esc(respDada(x.q, x.resp))}</div><div class="c">Resposta certa: ${esc(respCerta(x.q))}</div>${x.q.res.length ? `<ol class="passos">${x.q.res.map((p) => `<li>${p}</li>`).join('')}</ol>` : ''}</div>`).join('')}` : ''}
    </div>`;
    if (o.prox) $('#prox').onclick = () => (location.hash = '#licao/' + o.prox.id);
    $('#refazer').onclick = o.refazer;
    $('#copiar').onclick = (e) => copiar(rel, e.currentTarget);
    if (o.png) { const url = gerarPNG(o.titulo, o.notaV, o.itens); $('#img').src = url; $('#baixar').href = url; }
    if (o.notaV >= NOTA_MIN) setTimeout(confete, 150);
    window.scrollTo(0, 0);
  }

  /* ---------- provas ---------- */
  function questoesDaProva(licoes, total) {
    let pool = [];
    licoes.forEach((l) => { const qs = AF.shuf(montar(l.pratica).concat(montar(l.desafio || []))); qs.slice(0, 3).forEach((q) => { q.de = `${MATERIAS[l.materia]}: ${l.titulo}`; pool.push(q); }); });
    pool = AF.shuf(pool);
    const porLicao = {}; const out = [];
    for (const q of pool) { if (out.length >= total) break; const k = q.de; if ((porLicao[k] || 0) >= Math.ceil(total / licoes.length) + 1) continue; porLicao[k] = (porLicao[k] || 0) + 1; out.push(q); }
    return out;
  }
  function telaProvas() {
    const feitas = TODAS.filter((l) => passou(l.id));
    const anosComConteudo = ANOS.filter((a) => TODAS.some((l) => l.ano === a.n));
    app.innerHTML = `
      <h1 class="titulo">Provas</h1>
      <p class="sub">As questões são sorteadas entre as lições que você já concluiu, e os números mudam toda vez. No fim, sai uma imagem PNG com a nota, as certas e as erradas pra você me mandar.</p>
      <h2 class="secao">Prova rápida</h2>
      <p class="desc">15 questões misturando tudo o que você já estudou. Libera com 3 lições concluídas.</p>
      <div class="acoes"><button class="btn" id="rapida" ${feitas.length < 3 ? 'disabled' : ''}>Fazer prova rápida</button>${feitas.length < 3 ? `<span class="desc">${feitas.length} de 3 lições</span>` : ''}</div>
      <h2 class="secao">Prova do ano</h2>
      <p class="desc">20 questões de todas as matérias do ano. Libera quando você conclui todas as lições daquele ano.</p>
      <div class="lista">${anosComConteudo.map((a) => { const ls = TODAS.filter((l) => l.ano === a.n); const ok = ls.filter((l) => passou(l.id)).length; const lib = ok === ls.length; const ult = S.provas.filter((p) => p.ano === a.n).map((p) => p.nota); return `<button class="item${lib ? '' : ' trancado'}" data-prova="${a.n}"><span class="item-txt"><strong>Prova do ${a.nome}</strong><span>${ok} de ${ls.length} lições concluídas</span></span><span class="lider"></span>${lib ? `<span class="estado${ult.length ? ' ok' : ''}">${ult.length ? `Melhor: ${fmtNota(Math.max(...ult))}` : 'Fazer'}</span>` : `<span class="estado trava">${ICON.chave}</span>`}</button>`; }).join('')}</div>
      <h2 class="secao">Histórico</h2>
      ${S.provas.length ? `<div class="numeros">${S.provas.slice(0, 12).map((p) => `<div><span>${esc(p.titulo)}<br><small style="color:var(--cinza)">${p.data}</small></span><span class="lider"></span><b>${fmtNota(p.nota)}</b></div>`).join('')}</div>` : '<div class="vazio">Nenhuma prova feita ainda.</div>'}`;
    if (feitas.length >= 3) $('#rapida').onclick = () => fazerProva(feitas, 15, 'Prova rápida', null);
    app.querySelectorAll('[data-prova]').forEach((b) => (b.onclick = () => {
      const n = +b.dataset.prova, ls = TODAS.filter((l) => l.ano === n);
      if (!ls.every((l) => passou(l.id))) { toast(`${ICON.chave} Conclua todas as lições do ${nomeAno(n)} pra liberar a prova.`); return; }
      fazerProva(ls, 20, `Prova do ${nomeAno(n)}`, n);
    }));
  }
  function fazerProva(licoes, total, titulo, ano) {
    location.hash = '#prova';
    const qs = questoesDaProva(licoes, total);
    setTimeout(() => iniciarSessao({ qs, rotulo: titulo, semDica: true, fim: (s) => {
      const notaV = (s.acertos / s.qs.length) * 10;
      S.provas.unshift({ titulo, ano, nota: notaV, data: hojeTxt() }); S.provas = S.provas.slice(0, 60);
      S.stats.q += s.qs.length; S.stats.a += s.acertos;
      registrarErros(s.itens, titulo);
      salvar();
      telaResultado({ titulo, notaV, itens: s.itens, msgExtra: notaV >= 7 ? 'Mandou bem.' : notaV >= 5 ? 'Bom caminho. Revê os erros.' : 'Revê as lições dos erros e tenta de novo.', refazer: () => fazerProva(licoes, total, titulo, ano), png: true });
    } }), 0);
  }

  /* ---------- erros ---------- */
  function telaErros() {
    const E = S.erros;
    app.innerHTML = `
      <h1 class="titulo">Caderno de erros</h1>
      <p class="sub">Tudo o que você errou fica aqui. Treinar os erros sorteia até 10 deles, e o que você acertar sai da lista.</p>
      <div class="acoes"><button class="btn" id="treinar" ${E.length ? '' : 'disabled'}>Treinar meus erros (${E.length})</button>${E.length ? '<button class="btn-sec" id="limpar">Limpar lista</button>' : ''}</div>
      ${E.length ? E.slice(0, 60).map((e) => `<div class="erro-card"><p class="m">${esc(e.data)} · ${esc(e.de)}</p><b>${esc(plain(e.q.q))}</b><div class="s">Sua resposta: ${esc(e.sua)}</div><div class="c">Resposta certa: ${esc(respCerta(e.q))}</div>${(e.q.res || []).length ? `<details><summary>Ver como resolver</summary><ol class="passos">${e.q.res.map((p) => `<li>${p}</li>`).join('')}</ol></details>` : ''}</div>`).join('') : '<div class="vazio">Nenhum erro guardado. Os erros das lições e provas aparecem aqui.</div>'}`;
    if (E.length) {
      $('#treinar').onclick = () => {
        const sel = AF.shuf(E.map((e, i) => [e, i])).slice(0, 10);
        location.hash = '#treino';
        setTimeout(() => iniciarSessao({ qs: sel.map(([e]) => preparar(e.q)), rotulo: 'Treino de erros', fim: (s) => {
          const resolvidas = new Set(s.itens.map((x, i) => (x.ok ? sel[i][0] : null)).filter(Boolean));
          S.erros = S.erros.filter((e) => !resolvidas.has(e));
          S.stats.q += s.qs.length; S.stats.a += s.acertos; salvar();
          telaResultado({ titulo: 'Treino de erros', notaV: (s.acertos / s.qs.length) * 10, itens: s.itens, msgExtra: `${resolvidas.size} saíram da lista de erros.`, refazer: () => (location.hash = '#erros'), png: false });
        } }), 0);
      };
      $('#limpar').onclick = (e) => { if (e.currentTarget.dataset.ok) { S.erros = []; salvar(); telaErros(); } else { e.currentTarget.dataset.ok = 1; e.currentTarget.textContent = 'Toque de novo pra confirmar'; } };
    }
  }

  /* ---------- ajustes ---------- */
  function telaAjustes() {
    app.innerHTML = `
      <h1 class="titulo">Ajustes</h1>
      <p class="sub">O progresso fica salvo neste navegador. Pra continuar em outro aparelho (do PC pro iPhone, por exemplo), copia o código de backup aqui e cola no outro.</p>
      <h2 class="secao">Backup</h2>
      <div class="acoes"><button class="btn" id="exp">Copiar código de backup</button></div>
      <textarea class="copia" id="imp" placeholder="Cole aqui o código de backup do outro aparelho"></textarea>
      <div class="acoes"><button class="btn-sec" id="rest">Restaurar backup</button></div>
      <h2 class="secao">Recomeçar</h2>
      <p class="desc">Apaga notas, erros e provas deste navegador.</p>
      <div class="acoes"><button class="btn-sec" id="zerar">Apagar todo o progresso</button></div>`;
    $('#exp').onclick = (e) => copiar(btoa(unescape(encodeURIComponent(JSON.stringify(S)))), e.currentTarget);
    $('#rest').onclick = () => { try { const d = JSON.parse(decodeURIComponent(escape(atob($('#imp').value.trim())))); if (!d.notas) throw 0; S = Object.assign({ notas: {}, erros: [], provas: [], stats: { q: 0, a: 0 } }, d); salvar(); toast('Backup restaurado.'); location.hash = '#inicio'; } catch (e) { toast('Esse código não é um backup válido. Copia de novo no outro aparelho.'); } };
    $('#zerar').onclick = (e) => { if (e.currentTarget.dataset.ok) { S = { notas: {}, erros: [], provas: [], stats: { q: 0, a: 0 } }; salvar(); toast('Progresso apagado.'); location.hash = '#inicio'; } else { e.currentTarget.dataset.ok = 1; e.currentTarget.textContent = 'Toque de novo pra confirmar'; } };
  }

  /* ---------- rotas ---------- */
  function rota() {
    const [p, a] = (location.hash.slice(1) || 'inicio').split('/');
    document.querySelectorAll('#nav a').forEach((x) => (x.getAttribute('data-r') === p || (p === 'licao' && x.dataset.r === 'anos') ? x.setAttribute('aria-current', 'page') : x.removeAttribute('aria-current')));
    if ((p === 'prova' || p === 'treino') && SES) return;
    if (p !== 'prova' && p !== 'treino') SES = null;
    window.scrollTo(0, 0);
    if (p === 'anos') telaAnos(a);
    else if (p === 'licao') telaLicao(a);
    else if (p === 'provas' || p === 'prova') telaProvas();
    else if (p === 'erros' || p === 'treino') telaErros();
    else if (p === 'ajustes') telaAjustes();
    else telaInicio();
  }
  window.addEventListener('hashchange', rota);
  rota();
})();
