/* Base do conteúdo: utilitários, blocos de teoria e construtores de questões. */
window.AFA = { mat: [], port: [], fis: [], ing: [], red: [] };

(function () {
  const AF = (window.AF = {});

  AF.R = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  AF.pick = (a) => a[Math.floor(Math.random() * a.length)];
  AF.shuf = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  AF.gcd = (a, b) => {
    a = Math.abs(a); b = Math.abs(b);
    while (b) [a, b] = [b, a % b];
    return a;
  };
  AF.lcm = (a, b) => (a / AF.gcd(a, b)) * b;
  AF.cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  // Formata número no padrão brasileiro: 1.234,5 e sinal de menos tipográfico.
  AF.n = (x) => {
    if (typeof x !== 'number') return x;
    const neg = x < 0;
    x = Math.abs(x);
    let s = Number.isInteger(x) ? String(x) : String(+x.toFixed(4));
    let [i, d] = s.split('.');
    if (i.length > 3) i = i.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (neg ? '−' : '') + i + (d ? ',' + d : '');
  };
  // Número inteiro com parênteses se for negativo: (−3)
  AF.np = (x) => (x < 0 ? `(${AF.n(x)})` : AF.n(x));
  AF.sup = (k) => String(k).split('').map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+c] || (c === '-' ? '⁻' : c)).join('');
  AF.fr = (a, b) => {
    const g = AF.gcd(a, b) || 1;
    a /= g; b /= g;
    if (b < 0) { a = -a; b = -b; }
    return b === 1 ? AF.n(a) : `${a < 0 ? '−' : ''}${Math.abs(a)}/${b}`;
  };

  const CASAS = ['unidades', 'dezenas', 'centenas', 'unidades de milhar', 'dezenas de milhar', 'centenas de milhar'];
  const DE = ['das unidades', 'das dezenas', 'das centenas', 'das unidades de milhar', 'das dezenas de milhar', 'das centenas de milhar'];

  // Passo a passo da conta armada de adição.
  AF.passosSoma = (a, b) => {
    const A = [...String(a)].reverse().map(Number);
    const B = [...String(b)].reverse().map(Number);
    const L = Math.max(A.length, B.length);
    const p = [`Arma a conta: ${AF.n(a)} em cima e ${AF.n(b)} embaixo, unidade embaixo de unidade.`];
    let vai = 0;
    for (let i = 0; i < L; i++) {
      const tem = [];
      if (i < A.length) tem.push(A[i]);
      if (i < B.length) tem.push(B[i]);
      const s = tem.reduce((x, y) => x + y, 0) + vai;
      let t = `${AF.cap(CASAS[i])}: ${tem.join(' + ')}${vai ? ` + ${vai} (que subiu)` : ''} = ${s}`;
      if (s > 9 && i < L - 1) {
        t += `. Escreve ${s % 10} e sobe ${Math.floor(s / 10)} pra próxima casa.`;
        vai = Math.floor(s / 10);
      } else if (s > 9) {
        t += `. É a última casa, então escreve ${s} inteiro.`;
        vai = 0;
      } else {
        t += `. Escreve ${s}.`;
        vai = 0;
      }
      p.push(t);
    }
    p.push(`Resultado: ${AF.n(a + b)}.`);
    return p;
  };

  // Passo a passo da subtração com empréstimo (a >= b >= 0).
  AF.passosSub = (a, b) => {
    const A = [...String(a)].reverse().map(Number);
    const O = A.slice();
    const B = [...String(b)].reverse().map(Number);
    const p = [`Arma a conta: ${AF.n(a)} em cima e ${AF.n(b)} embaixo, alinhados pela direita.`];
    for (let i = 0; i < A.length; i++) {
      const y = B[i] || 0;
      const nome = AF.cap(CASAS[i]);
      const mudou = A[i] !== O[i] ? ` (lembra que o ${O[i]} virou ${A[i]} no empréstimo)` : '';
      const atual = A[i];
      if (atual < y) {
        let j = i + 1;
        while (A[j] === 0) j++;
        const ant = A[j];
        if (j === i + 1) {
          A[j] -= 1;
          A[i] += 10;
          p.push(`${nome}${mudou}: ${atual} é menor que ${y}, então pega 1 emprestado ${DE[j]} (o ${ant} vira ${A[j]}) e o ${atual} vira ${A[i]}. Agora ${A[i]} − ${y} = ${A[i] - y}.`);
        } else {
          A[j] -= 1;
          for (let k = j - 1; k > i; k--) A[k] = 9;
          A[i] += 10;
          const meio = j - i > 2 ? 'os zeros do meio viram 9' : 'o 0 do meio vira 9';
          p.push(`${nome}${mudou}: ${atual} é menor que ${y}. A casa do lado é 0 e não tem o que emprestar, então o empréstimo vem ${DE[j]}: o ${ant} vira ${A[j]}, ${meio} e o ${atual} vira ${A[i]}. Agora ${A[i]} − ${y} = ${A[i] - y}.`);
        }
      } else if (i < B.length) {
        p.push(`${nome}${mudou}: ${atual} − ${y} = ${atual - y}.`);
      } else if (!(i === A.length - 1 && atual === 0)) {
        p.push(`${nome}${mudou}: não tem nada embaixo, então só desce o ${atual}.`);
      }
    }
    p.push(`Resultado: ${AF.n(a - b)}. Confere somando: ${AF.n(a - b)} + ${AF.n(b)} = ${AF.n(a)}.`);
    return p;
  };

  // Separa um número em partes pelo valor posicional: 347 -> [300, 40, 7]
  AF.decompor = (x) => {
    const s = String(x);
    return [...s].map((d, i) => +d * 10 ** (s.length - 1 - i)).filter((v) => v > 0);
  };

  // Explicação da tabuada com truques.
  AF.passosTab = (a, b) => {
    const r = a * b;
    const p = [];
    if (a === 9 || b === 9) {
      const o = a === 9 ? b : a;
      p.push(`Truque do 9: ${o} × 9 = ${o} × 10 − ${o} = ${o * 10} − ${o} = ${r}.`);
    } else if (a === 5 || b === 5) {
      const o = a === 5 ? b : a;
      p.push(`Truque do 5: ${o} × 5 é a metade de ${o} × 10. ${o * 10} ÷ 2 = ${r}.`);
    } else if (a === 4 || b === 4) {
      const o = a === 4 ? b : a;
      p.push(`Truque do 4: é o dobro do dobro. ${o} × 2 = ${o * 2}, e ${o * 2} × 2 = ${r}.`);
    } else if (a === 2 || b === 2) {
      const o = a === 2 ? b : a;
      p.push(`×2 é o dobro: ${o} + ${o} = ${r}.`);
    }
    const menor = Math.min(a, b), maior = Math.max(a, b);
    if (menor <= 6) p.push(`Multiplicar é somar repetido: ${Array(menor).fill(maior).join(' + ')} = ${r}.`);
    else p.push(`Dá pra quebrar: ${maior} × ${menor} = ${maior} × 5 + ${maior} × ${menor - 5} = ${maior * 5} + ${maior * (menor - 5)} = ${r}.`);
    return p;
  };

  // Multiplicação por decomposição.
  AF.passosMult = (a, b) => {
    if (a < 10 && b < 10) return AF.passosTab(a, b);
    if (b >= 10 && a < 10) [a, b] = [b, a];
    if (b < 10) {
      const partes = AF.decompor(a);
      if (partes.length === 1) {
        const base = partes[0] / 10 ** (String(partes[0]).length - 1);
        const zeros = String(partes[0]).length - 1;
        return [`${AF.n(a)} × ${b}: faz ${base} × ${b} = ${base * b} e coloca ${zeros === 1 ? 'um zero' : zeros + ' zeros'} no final.`, `Resultado: ${AF.n(a * b)}.`];
      }
      const p = [`Quebra o ${AF.n(a)} em partes: ${partes.map(AF.n).join(' + ')}.`];
      partes.forEach((x) => p.push(`${AF.n(x)} × ${b} = ${AF.n(x * b)}`));
      p.push(`Soma tudo: ${partes.map((x) => AF.n(x * b)).join(' + ')} = ${AF.n(a * b)}.`);
      return p;
    }
    const bd = Math.floor(b / 10) * 10, bu = b % 10;
    const p = [`Quebra o ${b} em ${bd}${bu ? ' + ' + bu : ''}.`, `${a} × ${bd} = ${AF.n(a * bd)} (faz ${a} × ${bd / 10} = ${a * (bd / 10)} e coloca um zero).`];
    if (bu) p.push(`${a} × ${bu} = ${a * bu}.`);
    p.push(`Soma: ${AF.n(a * bd)}${bu ? ' + ' + a * bu : ''} = ${AF.n(a * b)}.`);
    return p;
  };

  // Divisão pelo método da chave, passo a passo.
  AF.passosDiv = (a, b) => {
    const ds = [...String(a)].map(Number);
    const p = [];
    let r = 0, q = '', inicio = true;
    for (let i = 0; i < ds.length; i++) {
      const cur = r * 10 + ds[i];
      if (inicio && cur < b && i < ds.length - 1) { r = cur; continue; }
      const qd = Math.floor(cur / b), sob = cur - qd * b;
      if (inicio) {
        const nota = cur !== ds[i] ? ` (só o primeiro algarismo não dá pra dividir por ${b}, então pega mais um)` : '';
        p.push(`Começa pela esquerda: pega o ${cur}${nota}. ${cur} ÷ ${b} = ${qd}, porque ${qd} × ${b} = ${qd * b}. Sobra ${sob}.`);
        inicio = false;
      } else {
        p.push(`Desce o ${ds[i]}: fica ${cur}. ${qd ? `${cur} ÷ ${b} = ${qd}, porque ${qd} × ${b} = ${qd * b}` : `${cur} é menor que ${b}, então põe 0 no resultado`}. Sobra ${sob}.`);
      }
      q += String(qd);
      r = sob;
    }
    const Q = Number(q);
    p.push(`Resultado: ${AF.n(a)} ÷ ${b} = ${AF.n(Q)}${r ? `, com resto ${r}` : ''}. Prova real: ${AF.n(Q)} × ${b}${r ? ` + ${r}` : ''} = ${AF.n(a)}.`);
    return p;
  };

  // Fatoração simultânea (MMC) com tabela.
  AF.tabelaMMC = (nums) => {
    let arr = nums.slice();
    const linhas = [], fat = [];
    let pr = 2;
    while (arr.some((x) => x > 1)) {
      if (arr.some((x) => x % pr === 0)) {
        linhas.push(`${arr.join(', ').padEnd(14)}| ${pr}`);
        fat.push(pr);
        arr = arr.map((x) => (x % pr === 0 ? x / pr : x));
      } else pr++;
    }
    linhas.push(`${arr.join(', ').padEnd(14)}|`);
    return { conta: `<pre class="conta mini">${linhas.join('\n')}</pre>`, fat, mmc: fat.reduce((x, y) => x * y, 1) };
  };
  AF.divisores = (x) => {
    const d = [];
    for (let i = 1; i <= x; i++) if (x % i === 0) d.push(i);
    return d;
  };
  AF.primo = (x) => x > 1 && AF.divisores(x).length === 2;

  // Números romanos
  const ROM = [['M', 1000], ['CM', 900], ['D', 500], ['CD', 400], ['C', 100], ['XC', 90], ['L', 50], ['XL', 40], ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]];
  AF.rom = (x) => {
    let s = '';
    for (const [l, v] of ROM) while (x >= v) { s += l; x -= v; }
    return s;
  };
  AF.romPartes = (s) => {
    const partes = [];
    let i = 0;
    while (i < s.length) {
      const dois = ROM.find(([l]) => l.length === 2 && s.substr(i, 2) === l);
      if (dois) { partes.push(dois); i += 2; }
      else { partes.push(ROM.find(([l]) => l === s[i])); i++; }
    }
    return partes;
  };
})();

/* Blocos de teoria (viram HTML). */
window.T = {
  h: (s) => `<h2>${s}</h2>`,
  h3: (s) => `<h3 class="sub">${s}</h3>`,
  p: (s) => `<p>${s}</p>`,
  ul: (a) => `<ul>${a.map((x) => `<li>${x}</li>`).join('')}</ul>`,
  ol: (a) => `<ol>${a.map((x) => `<li>${x}</li>`).join('')}</ol>`,
  conta: (s) => `<pre class="conta">${s}</pre>`,
  ex: (prob, passos, resp, titulo) =>
    `<div class="exemplo"><p class="ex-tit">${titulo || 'Exemplo resolvido'}</p><p class="prob">${prob}</p><ol>${passos.map((x) => `<li>${x}</li>`).join('')}</ol>${resp ? `<p class="resp">Resposta: ${resp}</p>` : ''}</div>`,
  at: (s, t) => `<div class="atencao"><b>${t || 'Atenção'}</b><div>${s}</div></div>`,
  dica: (s) => T.at(s, 'Dica'),
  tab: (head, rows) =>
    `<div class="tab-wrap"><table class="tab"><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows
      .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`)
      .join('')}</tbody></table></div>`,
  resumo: (a) => `<div class="resumo-box"><p class="ex-tit">Resumo da lição</p><ul>${a.map((x) => `<li>${x}</li>`).join('')}</ul></div>`,
  texto: (s) => `<div class="texto-ing">${s}</div>`,
};

/* Construtores de questões.
   num: resposta numérica. esc: múltipla escolha. txt: resposta escrita curta. escrita: produção de texto (não vale nota). */
window.Q = {
  num: (q, r, res, dica, extra) => Object.assign({ t: 'num', q, r, res, dica }, extra || {}),
  esc: (q, o, c, res, dica, extra) => Object.assign({ t: 'esc', q, o, c, res, dica }, extra || {}),
  txt: (q, r, res, dica, extra) => Object.assign({ t: 'txt', q, r: Array.isArray(r) ? r : [r], res, dica }, extra || {}),
  escrita: (q, dicas, min) => ({ t: 'escrita', q, dicas, min: min || 0 }),
};
