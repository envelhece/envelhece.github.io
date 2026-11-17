/* Matemática — semanas 3 e 4 (lições 11 a 20). */
(function () {
  const { R, pick, shuf, gcd, lcm, n: N, np: NP, sup: SUP, fr: FR } = AF;
  const L = (o) => AFA.mat.push(o);
  const G = { g: 1 };
  const simpl = (a, b) => (gcd(a, b) > 1 ? [`Simplifica dividindo em cima e embaixo por ${gcd(a, b)}: ${a}/${b} = ${FR(a, b)}.`] : []);
  const FRQ = (a, b) => ({ fr: 1, irr: 1, rTxt: FR(a, b), ph: 'Ex.: 5/6' });

  /* ---------- 11. FRAÇÕES II ---------- */
  const DEN = [2, 3, 4, 5, 6, 8, 10, 12];
  const par = () => { let b, d; do { b = pick(DEN); d = pick(DEN); } while (b === d); return [R(1, b - 1), b, R(1, d - 1), d]; };
  const fSomaMesmo = () => { const d = R(4, 12), a = R(1, d - 2), b = R(1, d - 1 - a); return Q.num(`${a}/${d} + ${b}/${d}`, (a + b) / d, [`Denominadores iguais: soma só os numeradores e repete o denominador.`, `${a} + ${b} = ${a + b}, então fica ${a + b}/${d}.`].concat(simpl(a + b, d)), 'Mesmo denominador: soma só em cima.', Object.assign(FRQ(a + b, d), G)); };
  const fSomaDif = (sub) => () => {
    let [a, b, c, d] = par();
    if (sub && a / b < c / d) [a, b, c, d] = [c, d, a, b];
    if (sub && a / b === c / d) return fSomaMesmo();
    const m = lcm(b, d), A = a * (m / b), C = c * (m / d), S = sub ? A - C : A + C, op = sub ? '−' : '+';
    return Q.num(`${a}/${b} ${op} ${c}/${d}`, S / m, [`Denominadores diferentes: acha o MMC(${b}, ${d}) = ${m}.`, `Transforma: ${a}/${b} = ${A}/${m} (divide ${m} por ${b} e multiplica por ${a}) e ${c}/${d} = ${C}/${m}.`, `Agora ${sub ? 'subtrai' : 'soma'} os de cima: ${A} ${op} ${C} = ${S}. Fica ${S}/${m}.`].concat(simpl(S, m)), 'Primeiro deixa os dois com o mesmo denominador (MMC).', Object.assign(FRQ(S, m), G));
  };
  const fMult = () => { const [a, b, c, d] = par(); return Q.num(`${a}/${b} × ${c}/${d}`, (a * c) / (b * d), [`Multiplicação: em cima vezes em cima, embaixo vezes embaixo.`, `${a} × ${c} = ${a * c} e ${b} × ${d} = ${b * d}. Fica ${a * c}/${b * d}.`].concat(simpl(a * c, b * d)), 'Em cima × em cima, embaixo × embaixo.', Object.assign(FRQ(a * c, b * d), G)); };
  const fDiv = () => { const [a, b, c, d] = par(); return Q.num(`${a}/${b} ÷ ${c}/${d}`, (a * d) / (b * c), [`Divisão: repete a primeira e multiplica pelo inverso da segunda (vira ${d}/${c}).`, `${a}/${b} × ${d}/${c} = ${a * d}/${b * c}.`].concat(simpl(a * d, b * c)), 'Repete a primeira e multiplica pela segunda invertida.', Object.assign(FRQ(a * d, b * c), G)); };
  const fInt = () => { const k = R(1, 4), b = R(2, 9), a = R(1, b - 1); return Q.num(`${k} + ${a}/${b}`, (k * b + a) / b, [`Escreve o ${k} como fração de denominador ${b}: ${k} = ${k * b}/${b}.`, `${k * b}/${b} + ${a}/${b} = ${k * b + a}/${b}.`], `Transforma o ${k} em fração com denominador ${b}.`, Object.assign(FRQ(k * b + a, b), G)); };
  L({
    id: 'mat11', titulo: 'Frações II: operações', min: 40,
    resumo: 'Somar, subtrair, multiplicar e dividir frações.',
    teoria: [
      T.h('Soma e subtração com o mesmo denominador'),
      T.p('Se os pedaços são do mesmo tamanho, é só somar (ou subtrair) os de cima e repetir o de baixo: 2/7 + 3/7 = 5/7. O denominador não se soma: 2/7 + 3/7 não é 5/14.'),
      T.h('Denominadores diferentes: o MMC entra em cena'),
      T.p('Não dá pra somar terços com quartos direto, porque os pedaços têm tamanhos diferentes. Primeiro transforma as duas frações pra um denominador comum, que é o MMC dos denominadores.'),
      T.ex('1/4 + 1/6', ['MMC(4, 6) = 12.', '1/4 = 3/12 (12 ÷ 4 = 3, e 3 × 1 = 3).', '1/6 = 2/12 (12 ÷ 6 = 2, e 2 × 1 = 2).', 'Soma: 3/12 + 2/12 = 5/12.'], '5/12'),
      T.ex('5/6 − 3/8', ['MMC(6, 8) = 24.', '5/6 = 20/24 e 3/8 = 9/24.', '20/24 − 9/24 = 11/24.'], '11/24'),
      T.h('Multiplicação'),
      T.p('É a mais fácil: em cima vezes em cima, embaixo vezes embaixo. 2/3 × 4/5 = 8/15.'),
      T.dica('Dá pra simplificar antes de multiplicar, cortando um número de cima com um de baixo: 3/4 × 8/9 → o 3 corta com o 9 (vira 1 e 3) e o 8 corta com o 4 (vira 2 e 1). Fica 1/1 × 2/3 = 2/3.'),
      T.h('Divisão'),
      T.p('Repete a primeira e multiplica pelo inverso da segunda (vira ela de cabeça pra baixo).'),
      T.ex('3/4 ÷ 2/5', ['Repete 3/4 e inverte 2/5, que vira 5/2.', '3/4 × 5/2 = 15/8.'], '15/8'),
      T.h('Número inteiro com fração'),
      T.p('Escreve o inteiro como fração com o mesmo denominador: 2 + 3/4 = 8/4 + 3/4 = 11/4.'),
      T.at('No fim, sempre simplifica. Na prova as alternativas vêm na forma irredutível.'),
      T.resumo(['Mesmo denominador: soma ou subtrai só em cima.', 'Denominadores diferentes: MMC primeiro.', 'Multiplicação: em cima × em cima, embaixo × embaixo.', 'Divisão: repete a primeira e multiplica pela segunda invertida.', 'Simplifica no final.']),
    ],
    pratica: [{ gen: fSomaMesmo, n: 1 }, { gen: fSomaDif(false), n: 3 }, { gen: fSomaDif(true), n: 2 }, { gen: fMult, n: 2 }, { gen: fDiv, n: 1 }, { gen: fInt, n: 1 }],
    desafio: [
      Q.num('Gastei 1/3 do meu dinheiro num tênis e 1/4 numa camiseta. Que fração do dinheiro sobrou?', 5 / 12, ['Gastei 1/3 + 1/4. MMC(3, 4) = 12: 4/12 + 3/12 = 7/12.', 'O dinheiro todo é 12/12.', 'Sobrou 12/12 − 7/12 = 5/12.'], 'Soma o que gastou e tira do inteiro.', FRQ(5, 12)),
      Q.num('Calcule: (1/2 + 1/3) ÷ 5/6', 1, ['Parênteses: 1/2 + 1/3 = 3/6 + 2/6 = 5/6.', '5/6 ÷ 5/6 = 5/6 × 6/5 = 30/30 = 1.', 'Faz sentido: qualquer número dividido por ele mesmo dá 1.'], 'Resolve os parênteses primeiro.', { fr: 1, irr: 1, rTxt: '1' }),
    ],
  });

  /* ---------- 12. NÚMEROS DECIMAIS ---------- */
  const dSoma = (sub) => () => {
    let A = R(105, 9990), B = R(15, 999);
    if (A % 10 === 0) A += R(1, 9);
    if (sub && B > A) [A, B] = [B, A];
    const a = A / 100, b = B / 100, r = sub ? A - B : A + B, op = sub ? '−' : '+';
    return Q.num(`${N(a)} ${op} ${N(b)}`, r / 100, [`Alinha a vírgula embaixo da vírgula e completa com zeros: ${N(a).padEnd(2)} vira ${(A / 100).toFixed(2).replace('.', ',')} e ${N(b)} vira ${(B / 100).toFixed(2).replace('.', ',')}.`, `${sub ? 'Subtrai' : 'Soma'} como se fossem inteiros: ${A} ${op} ${B} = ${r}.`, `Coloca a vírgula no mesmo lugar (2 casas): ${N(r / 100)}.`], 'Vírgula embaixo de vírgula.', G);
  };
  const dDesl = () => { const x = R(12, 999) / 10; const t = pick([['×', 10], ['×', 100], ['÷', 10], ['÷', 100]]); const r = t[0] === '×' ? +(x * t[1]).toFixed(4) : +(x / t[1]).toFixed(4); const casas = String(t[1]).length - 1; return Q.num(`${N(x)} ${t[0]} ${t[1]}`, r, [`${t[0]} ${t[1]} anda a vírgula ${casas} casa${casas > 1 ? 's' : ''} pra ${t[0] === '×' ? 'direita' : 'esquerda'}${t[0] === '÷' ? ' (completa com zeros se precisar)' : ''}.`, `${N(x)} ${t[0]} ${t[1]} = ${N(r)}.`], '× 10 vai pra direita, ÷ 10 vai pra esquerda.', G); };
  const dMult = () => { const A = R(12, 49), B = R(2, 9); const tipo = Math.random() < 0.5; const a = A / 10, b = tipo ? B : B / 10; const casas = tipo ? 1 : 2; const prod = A * B; return Q.num(`${N(a)} × ${N(b)}`, +(prod / 10 ** casas).toFixed(4), [`Multiplica sem as vírgulas: ${A} × ${B} = ${prod}.`, `Conta as casas depois da vírgula nos dois números: ${casas === 1 ? '1 (só no ' + N(a) + ')' : '1 + 1 = 2'}.`, `Coloca a vírgula com ${casas} casa${casas > 1 ? 's' : ''} no resultado: ${N(+(prod / 10 ** casas).toFixed(4))}.`], 'Multiplica sem vírgula e depois conta as casas.', G); };
  const FRDEC = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 8], [3, 8], [7, 10], [1, 20], [3, 20], [1, 25], [7, 25]];
  const dFrac = () => { const [a, b] = pick(FRDEC); const v = a / b; const pot = [10, 100, 1000].find((p) => p % b === 0); return Q.num(`Escreva ${a}/${b} como número decimal.`, v, [`Transforma o denominador em ${pot}: ${pot} ÷ ${b} = ${pot / b}, então multiplica em cima e embaixo por ${pot / b}.`, `${a}/${b} = ${a * (pot / b)}/${pot}.`, `${a * (pot / b)}/${pot} = ${N(v)}.`], `Ou divide ${a} por ${b}.`, { ph: 'Ex.: 0,25' }); };
  const SETS = [[0.5, 0.45, 0.505, 0.055], [1.2, 1.02, 1.002, 1.12], [0.3, 0.29, 0.31, 0.035], [2.05, 2.5, 2.005, 2.055], [0.7, 0.07, 0.707, 0.077], [3.1, 3.01, 3.11, 3.001]];
  const dComp = () => { const s = shuf(pick(SETS)); const maior = Math.random() < 0.5; const alvo = maior ? Math.max(...s) : Math.min(...s); const casas = Math.max(...s.map((x) => (String(x).split('.')[1] || '').length)); return Q.esc(`Qual destes números é o ${maior ? 'maior' : 'menor'}?`, s.map(N), s.indexOf(alvo), [`Completa todos com zeros pra ficarem com ${casas} casas: ${s.map((x) => x.toFixed(casas).replace('.', ',')).join('; ')}.`, `Agora compara como inteiros. O ${maior ? 'maior' : 'menor'} é ${N(alvo)}.`], 'Completa com zeros pra todos terem o mesmo número de casas.'); };
  L({
    id: 'mat12', titulo: 'Números decimais', min: 40,
    resumo: 'Vírgula, operações com decimais e conversão entre fração e decimal.',
    teoria: [
      T.h('O que vem depois da vírgula'),
      T.p('Dinheiro é o melhor exemplo: R$ 4,75 são 4 reais e 75 centavos. Depois da vírgula vêm os <strong>décimos</strong> (1ª casa), os <strong>centésimos</strong> (2ª casa) e os <strong>milésimos</strong> (3ª casa).'),
      T.tab(['Decimal', 'Fração', 'Lê-se'], [['0,1', '1/10', 'um décimo'], ['0,07', '7/100', 'sete centésimos'], ['0,25', '25/100', 'vinte e cinco centésimos'], ['0,003', '3/1000', 'três milésimos']]),
      T.h('Comparar decimais'),
      T.p('Qual é maior, 0,5 ou 0,45? Completa com zeros pra ficarem com o mesmo número de casas: 0,50 e 0,45. Agora fica fácil: 50 > 45, então 0,5 é maior. Número com mais algarismos não é necessariamente maior.'),
      T.h('Somar e subtrair'),
      T.p('Regra de ouro: <strong>vírgula embaixo de vírgula</strong>. Completa com zeros e faz a conta normal.'),
      T.conta('  12,50\n+  3,75\n-------\n  16,25'),
      T.h('Multiplicar'),
      T.p('Multiplica sem as vírgulas e no final conta quantas casas decimais os dois números tinham juntos.'),
      T.ex('2,5 × 1,2', ['Sem vírgulas: 25 × 12 = 300.', 'Casas decimais: 2,5 tem 1 e 1,2 tem 1. Total: 2.', 'Resultado com 2 casas: 3,00 = 3.'], '3'),
      T.h('Multiplicar e dividir por 10, 100, 1.000'),
      T.p('× 10 anda a vírgula 1 casa pra direita, × 100 anda 2, × 1.000 anda 3. Na divisão, anda pra esquerda: 4,5 × 100 = 450 e 4,5 ÷ 100 = 0,045.'),
      T.h('Fração vira decimal (e vice-versa)'),
      T.p('Divide o de cima pelo de baixo (3 ÷ 4 = 0,75), ou transforma o denominador em 10, 100 ou 1.000: 3/4 = 75/100 = 0,75. No caminho contrário: 0,35 = 35/100 = 7/20.'),
      T.tab(['Fração', '1/2', '1/4', '3/4', '1/5', '1/8', '1/10'], [['Decimal', '0,5', '0,25', '0,75', '0,2', '0,125', '0,1']]),
      T.resumo(['Pra comparar, completa com zeros.', 'Soma e subtração: vírgula embaixo de vírgula.', 'Multiplicação: faz sem vírgula e conta as casas.', '× 10 vai pra direita, ÷ 10 vai pra esquerda.', 'Fração vira decimal dividindo o de cima pelo de baixo.']),
    ],
    pratica: [{ gen: dSoma(false), n: 2 }, { gen: dSoma(true), n: 2 }, { gen: dDesl, n: 2 }, { gen: dMult, n: 2 }, { gen: dFrac, n: 1 }, { gen: dComp, n: 1 }],
    desafio: [
      Q.num('Um litro de combustível custa R$ 6,49. Quanto custam 40 litros?', 259.6, ['6,49 × 40 = 6,49 × 4 × 10.', '6,49 × 4 = 25,96.', '25,96 × 10 = 259,60 (anda a vírgula uma casa).'], 'Multiplica por 4 e depois por 10.', { u: 'reais' }),
      Q.esc('Qual destes números é o menor?', ['0,7', '0,07', '0,707', '0,077'], 1, ['Completando com zeros: 0,700; 0,070; 0,707; 0,077.', 'O menor é 0,070, ou seja, 0,07.'], 'Completa todos com três casas.'),
    ],
  });

  /* ---------- 13. PORCENTAGEM ---------- */
  const PASSO_PCT = { 10: (v) => [`10% é dividir por 10: ${N(v)} ÷ 10 = ${N(v / 10)}.`], 50: (v) => [`50% é a metade: ${N(v)} ÷ 2 = ${N(v / 2)}.`], 25: (v) => [`25% é metade da metade (ou ÷ 4): ${N(v)} ÷ 4 = ${N(v / 4)}.`], 20: (v) => [`10% de ${N(v)} = ${N(v / 10)}.`, `20% é o dobro de 10%: ${N(v / 10)} × 2 = ${N(v / 5)}.`], 5: (v) => [`10% de ${N(v)} = ${N(v / 10)}.`, `5% é a metade de 10%: ${N(v / 10)} ÷ 2 = ${N(v / 20)}.`], 1: (v) => [`1% é dividir por 100: ${N(v)} ÷ 100 = ${N(v / 100)}.`] };
  const pSimples = () => { const p = pick([10, 50, 25, 20, 5, 1]); const v = p === 1 ? R(2, 30) * 100 : R(1, 30) * 20; return Q.num(`Quanto é ${p}% de ${N(v)}?`, (v * p) / 100, PASSO_PCT[p](v), p === 10 ? 'Divide por 10.' : p === 50 ? 'É a metade.' : p === 25 ? 'É a quarta parte.' : p === 20 ? 'Acha 10% e dobra.' : p === 5 ? 'Metade de 10%.' : 'Divide por 100.'); };
  const pCompor = () => { const p = pick([15, 30, 35, 40, 45, 60, 70, 75, 90]); const v = R(1, 20) * 20; const dez = Math.floor(p / 10), cinco = p % 10 === 5; const d = v / 10; const pas = [`Monta com pedaços de 10%: 10% de ${N(v)} = ${N(d)}.`, `${dez} × 10% = ${dez} × ${N(d)} = ${N(dez * d)}.`]; if (cinco) pas.push(`5% é a metade de 10%: ${N(d / 2)}. Soma: ${N(dez * d)} + ${N(d / 2)} = ${N((v * p) / 100)}.`); pas.push(`Outro jeito: ${p}% = ${N(p / 100)}, e ${N(p / 100)} × ${N(v)} = ${N((v * p) / 100)}.`); return Q.num(`Quanto é ${p}% de ${N(v)}?`, (v * p) / 100, pas, 'Quebra em pedaços de 10% e 5%.'); };
  const pAum = (desc) => () => { const v = R(4, 40) * 10, p = pick([10, 20, 25, 30, 50]); const delta = (v * p) / 100, r = desc ? v - delta : v + delta; return Q.num(`Um produto de R$ ${N(v)} teve ${desc ? 'desconto' : 'aumento'} de ${p}%. Qual o novo preço?`, r, [`${p}% de ${N(v)} = ${N(delta)}.`, `${desc ? 'Desconto: tira' : 'Aumento: soma'} ${N(delta)}. ${N(v)} ${desc ? '−' : '+'} ${N(delta)} = ${N(r)}.`, `Atalho: ${desc ? 'pagar ' + (100 - p) + '% do preço' : 'pagar ' + (100 + p) + '% do preço'} é multiplicar por ${N((desc ? 100 - p : 100 + p) / 100)}.`], `Calcula ${p}% e depois ${desc ? 'tira' : 'soma'}.`, { u: 'reais' }); };
  const pQue = () => { let b, p, a; do { b = pick([20, 25, 40, 50, 80, 200, 400, 500]); p = pick([5, 10, 20, 25, 30, 40, 50, 60, 75, 80]); a = (b * p) / 100; } while (!Number.isInteger(a)); return Q.num(`${a} é quantos por cento de ${b}?`, p, [`Monta a fração: ${a}/${b}.`, `Transforma em "algo sobre 100": ${a}/${b} = ${p}/100${b !== 100 ? ` (multiplica em cima e embaixo por ${N(100 / b)})` : ''}.`, `${p}/100 = ${p}%.`], `Faz ${a} ÷ ${b} e multiplica por 100.`, { u: '%' }); };
  L({
    id: 'mat13', titulo: 'Porcentagem', min: 35,
    resumo: 'Calcular porcentagens de cabeça, aumentos, descontos e "quantos por cento".',
    teoria: [
      T.h('Por cento quer dizer "de cada 100"'),
      T.p('25% significa 25 de cada 100, ou seja, a fração 25/100, que é o decimal 0,25. Toda porcentagem pode ser escrita desses três jeitos.'),
      T.h('As porcentagens que você faz de cabeça'),
      T.tab(['Porcentagem', 'Como calcular', '... de 80'], [['10%', 'divide por 10', '8'], ['1%', 'divide por 100', '0,8'], ['50%', 'metade', '40'], ['25%', 'metade da metade', '20'], ['20%', 'dobro de 10%', '16'], ['5%', 'metade de 10%', '4']]),
      T.h('Montando qualquer porcentagem'),
      T.ex('35% de 80', ['10% de 80 = 8.', '30% = 3 × 8 = 24.', '5% = metade de 10% = 4.', '35% = 24 + 4 = 28.'], '28'),
      T.p('Ou do jeito direto: 35% = 0,35 e 0,35 × 80 = 28.'),
      T.h('Aumento e desconto'),
      T.p('Calcula a porcentagem e soma (aumento) ou tira (desconto). Ou usa o atalho: um aumento de 20% é pagar 120% do preço (× 1,20); um desconto de 15% é pagar 85% (× 0,85).'),
      T.ex('Tênis de R$ 250 com 20% de desconto', ['20% de 250: 10% = 25, então 20% = 50.', '250 − 50 = 200.', 'Atalho: 250 × 0,80 = 200.'], 'R$ 200'),
      T.h('"Quantos por cento" é uma fração'),
      T.p('Pra saber quanto 18 é de 24 em porcentagem, monta a fração 18/24, simplifica (3/4) e transforma em centésimos (75/100): 75%. Ou faz 18 ÷ 24 = 0,75 e multiplica por 100.'),
      T.at('Aumento e desconto seguidos não se anulam. Um aumento de 10% seguido de um desconto de 10% não volta ao preço original: R$ 100 vira 110, e 10% de 110 é 11, então fica R$ 99.'),
      T.resumo(['x% = x/100.', '10% divide por 10; 50% é metade; 25% é a quarta parte.', 'Monta porcentagens difíceis com pedaços de 10% e 5%.', 'Aumento de p%: × (1 + p/100). Desconto: × (1 − p/100).', '"Quantos por cento": faz a fração e transforma em /100.']),
    ],
    pratica: [{ gen: pSimples, n: 2 }, { gen: pCompor, n: 2 }, { gen: pAum(false), n: 2 }, { gen: pAum(true), n: 2 }, { gen: pQue, n: 2 }],
    desafio: [
      Q.num('Um tênis de R$ 400 teve aumento de 10% e, um mês depois, desconto de 10%. Qual o preço final?', 396, ['Aumento: 10% de 400 = 40, fica 440.', 'Desconto: 10% de 440 = 44, fica 440 − 44 = 396.', 'Por isso não volta pra 400: o desconto foi calculado sobre um valor maior.'], 'Faz um de cada vez: o desconto é sobre o preço já aumentado.', { u: 'reais' }),
      Q.num('Numa turma, 18 de 24 alunos passaram na prova. Que porcentagem passou?', 75, ['Fração: 18/24 = 3/4.', '3/4 = 75/100 = 75%.'], 'Monta a fração e simplifica.', { u: '%' }),
    ],
  });

  /* ---------- 14. POTENCIAÇÃO ---------- */
  const expande = (b, e) => { if (e === 0) return [`Todo número (diferente de zero) elevado a 0 dá 1.`]; if (e === 1) return [`Todo número elevado a 1 dá ele mesmo: ${NP(b)}.`]; const f = Array(e).fill(NP(b)); let acc = b; const parc = [N(b)]; for (let i = 1; i < e; i++) { acc *= b; parc.push(N(acc)); } return [`${NP(b)}${SUP(e)} é o ${NP(b)} multiplicado por ele mesmo ${e} vezes: ${f.join(' × ')}.`, `Fazendo aos poucos: ${parc.join(' → ')}.`, `Resultado: ${N(b ** e)}.`]; };
  const pCalc = () => { const t = R(0, 2); let b, e; if (t === 0) { b = R(2, 6); e = R(2, 4); } else if (t === 1) { b = 2; e = R(5, 8); } else { b = 10; e = R(2, 6); } return Q.num(`${b}${SUP(e)}`, b ** e, b === 10 ? [`Potência de 10: o expoente diz quantos zeros vêm depois do 1.`, `10${SUP(e)} = 1${'0'.repeat(e)}.`] : expande(b, e), 'Multiplica a base por ela mesma, quantas vezes o expoente mandar.', G); };
  const pNeg = () => { if (Math.random() < 0.35) { const b = R(3, 6); return Q.esc(`Quanto vale −${b}²?`, [N(b * b), N(-b * b), N(2 * b), N(-2 * b)], 1, [`Sem parênteses, o expoente vale só pro ${b}: −${b}² = −(${b} × ${b}).`, `${b} × ${b} = ${b * b}, então −${b}² = ${N(-b * b)}.`, `Seria positivo só se fosse (−${b})² = ${b * b}.`], 'Olha se tem parênteses: o expoente pega o sinal?'); } const b = -R(2, 5), e = R(2, 4); return Q.num(`(${N(b)})${SUP(e)}`, b ** e, expande(b, e).concat([e % 2 === 0 ? 'Base negativa com expoente par dá positivo.' : 'Base negativa com expoente ímpar dá negativo.']), 'Expoente par deixa positivo; ímpar mantém o negativo.', { g: 1, neg: 1 }); };
  const pProp = () => { const a = R(2, 9), m = R(2, 7), n = R(2, 6); const t = R(0, 2); if (t === 0) return Q.num(`${a}${SUP(m)} × ${a}${SUP(n)} = ${a}^?`, m + n, [`Multiplicação de mesma base: repete a base e soma os expoentes.`, `${m} + ${n} = ${m + n}, então dá ${a}${SUP(m + n)}.`], 'Mesma base multiplicando: soma os expoentes.', { ph: 'expoente' }); if (t === 1) { const M = m + n; return Q.num(`${a}${SUP(M)} ÷ ${a}${SUP(n)} = ${a}^?`, m, [`Divisão de mesma base: repete a base e subtrai os expoentes.`, `${M} − ${n} = ${m}, então dá ${a}${SUP(m)}.`], 'Mesma base dividindo: subtrai os expoentes.', { ph: 'expoente' }); } return Q.num(`(${a}${SUP(m)})${SUP(n)} = ${a}^?`, m * n, [`Potência de potência: multiplica os expoentes.`, `${m} × ${n} = ${m * n}, então dá ${a}${SUP(m * n)}.`], 'Potência de potência: multiplica os expoentes.', { ph: 'expoente' }); };
  const pExpr = () => { const a = R(2, 6), b = R(2, 4), c = R(1, 9); return Q.num(`${a}² + ${b}³ − ${c}⁰`, a * a + b ** 3 - 1, [`Potências primeiro: ${a}² = ${a * a}, ${b}³ = ${b ** 3} e ${c}⁰ = 1.`, `${a * a} + ${b ** 3} − 1 = ${a * a + b ** 3 - 1}.`], 'Resolve cada potência e depois faz as contas.', G); };
  L({
    id: 'mat14', titulo: 'Potenciação', min: 40,
    resumo: 'Base, expoente, casos especiais, base negativa e as propriedades.',
    teoria: [
      T.h('O que é potência'),
      T.p('Potência é uma multiplicação repetida do mesmo número. Em 2⁵, o 2 é a <strong>base</strong> e o 5 é o <strong>expoente</strong>: 2⁵ = 2 × 2 × 2 × 2 × 2 = 32. O expoente diz quantas vezes a base aparece.'),
      T.at('2⁵ não é 2 × 5. É o 2 multiplicado cinco vezes. Esse é o erro número 1.'),
      T.p('Expoente 2 se lê "ao quadrado" (5² = 25) e expoente 3 se lê "ao cubo" (2³ = 8).'),
      T.h('Casos especiais'),
      T.tab(['Regra', 'Exemplo'], [['expoente 1: dá a própria base', '7¹ = 7'], ['expoente 0: dá 1 (base diferente de 0)', '9⁰ = 1'], ['base 1: sempre 1', '1¹⁰⁰ = 1'], ['base 0: sempre 0 (expoente positivo)', '0⁵ = 0'], ['base 10: 1 seguido de zeros', '10⁴ = 10.000']]),
      T.h('Base negativa'),
      T.p('(−2)² = (−2) × (−2) = 4, positivo. (−2)³ = (−2) × (−2) × (−2) = −8, negativo. <strong>Expoente par deixa positivo, ímpar mantém o negativo.</strong>'),
      T.at('−2² é diferente de (−2)². Sem parênteses, o expoente vale só pro 2: −2² = −(2 × 2) = −4. Com parênteses, vale pro sinal também: (−2)² = 4. A AFA adora essa pegadinha.'),
      T.h('Propriedades (mesma base)'),
      T.tab(['Operação', 'Regra', 'Exemplo'], [['multiplicação', 'soma os expoentes', '2³ × 2⁴ = 2⁷'], ['divisão', 'subtrai os expoentes', '5⁶ ÷ 5² = 5⁴'], ['potência de potência', 'multiplica os expoentes', '(3²)³ = 3⁶']]),
      T.p('Por que funciona? 2³ × 2⁴ = (2 × 2 × 2) × (2 × 2 × 2 × 2): são sete 2 multiplicados, ou seja, 2⁷.'),
      T.h('Uma prévia: expoente negativo'),
      T.p('2⁻³ = 1/2³ = 1/8. O expoente negativo inverte a base. Você vai usar isso mais pra frente, em notação científica e em física.'),
      T.resumo(['Base elevada ao expoente: multiplica a base por ela mesma.', 'a¹ = a e a⁰ = 1.', 'Base negativa: expoente par dá +, ímpar dá −.', '−a² ≠ (−a)².', 'Mesma base: multiplicando soma, dividindo subtrai, potência de potência multiplica.']),
    ],
    pratica: [{ gen: pCalc, n: 3 }, { gen: pNeg, n: 2 }, { gen: pProp, n: 3 }, { gen: pExpr, n: 2 }],
    desafio: [
      Q.num('Calcule: 2⁰ + 2¹ + 2² + 2³ + 2⁴', 31, ['2⁰ = 1, 2¹ = 2, 2² = 4, 2³ = 8 e 2⁴ = 16.', '1 + 2 + 4 + 8 + 16 = 31.'], 'Calcula cada potência separada.', G),
      Q.num('Quanto vale (−1)¹⁰⁰ + (−1)¹⁰¹?', 0, ['−1 com expoente par dá 1: (−1)¹⁰⁰ = 1.', '−1 com expoente ímpar dá −1: (−1)¹⁰¹ = −1.', '1 + (−1) = 0.'], 'Par ou ímpar?', { g: 1, neg: 1 }),
    ],
  });

  /* ---------- 15. RADICIAÇÃO ---------- */
  const rQuad = () => { const k = R(1, 20); return Q.num(`√${k * k}`, k, [`Qual número vezes ele mesmo dá ${k * k}?`, `${k} × ${k} = ${k * k}, então √${k * k} = ${k}.`], 'Pensa: que número ao quadrado dá esse valor?', G); };
  const rCub = () => { const k = R(1, 6), neg = Math.random() < 0.3; const v = neg ? -(k ** 3) : k ** 3; return Q.num(`∛${N(v)}`, neg ? -k : k, [`Qual número multiplicado por ele mesmo três vezes dá ${N(v)}?`, `${NP(neg ? -k : k)} × ${NP(neg ? -k : k)} × ${NP(neg ? -k : k)} = ${N(v)}.`].concat(neg ? ['Raiz cúbica de negativo existe e dá negativo.'] : []), 'Pensa no cubo: k × k × k.', { g: 1, neg: 1 }); };
  const rEntre = () => { let x; do { x = R(5, 200); } while (Number.isInteger(Math.sqrt(x))); const a = Math.floor(Math.sqrt(x)); const o = [`${a} e ${a + 1}`, `${a - 1} e ${a}`, `${a + 1} e ${a + 2}`, `${Math.max(1, Math.floor(x / 2) - 1)} e ${Math.floor(x / 2)}`]; const uniq = [...new Set(o)]; while (uniq.length < 4) uniq.push(`${a + uniq.length + 1} e ${a + uniq.length + 2}`); return Q.esc(`√${x} está entre quais números inteiros?`, uniq, 0, [`Procura os quadrados perfeitos perto de ${x}: ${a}² = ${a * a} e ${a + 1}² = ${(a + 1) * (a + 1)}.`, `${x} está entre ${a * a} e ${(a + 1) * (a + 1)}.`, `Então √${x} está entre ${a} e ${a + 1}.`], 'Procura os quadrados perfeitos vizinhos.'); };
  const rSimp = () => { const m = pick([2, 3, 5, 6, 7]), k = R(2, 6), x = k * k * m; return Q.num(`Simplifique: √${x} = ?√${m}`, k, [`Procura o maior quadrado perfeito que divide ${x}: é ${k * k}.`, `${x} = ${k * k} × ${m}.`, `√${x} = √${k * k} × √${m} = ${k}√${m}.`], `Separa o ${x} em (quadrado perfeito) × ${m}.`, { ph: 'número da frente' }); };
  const rExpr = () => { const a = R(2, 12), b = R(2, 9); if (Math.random() < 0.5) return Q.num(`√${a * a} + √${b * b}`, a + b, [`√${a * a} = ${a} e √${b * b} = ${b}.`, `${a} + ${b} = ${a + b}.`], 'Resolve cada raiz separada.', G); return Q.num(`√(${a * a} × ${b * b})`, a * b, [`Raiz de um produto é o produto das raízes: √${a * a} × √${b * b}.`, `${a} × ${b} = ${a * b}.`], 'Separa em duas raízes.', G); };
  L({
    id: 'mat15', titulo: 'Radiciação', min: 35,
    resumo: 'Raiz quadrada, raiz cúbica, estimativas e simplificação de raízes.',
    teoria: [
      T.h('A raiz desfaz a potência'),
      T.p('√49 = 7 porque 7² = 49. A raiz quadrada pergunta: "que número ao quadrado dá isso?" A raiz cúbica faz o mesmo com o cubo: ∛27 = 3 porque 3³ = 27.'),
      T.h('Quadrados perfeitos que valem decorar'),
      T.tab(['n', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], [['n²', '1', '4', '9', '16', '25', '36', '49', '64', '81', '100']]),
      T.tab(['n', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'], [['n²', '121', '144', '169', '196', '225', '256', '289', '324', '361', '400']]),
      T.h('Raiz de número negativo'),
      T.p('√(−9) não existe nos números reais, porque nenhum número ao quadrado dá negativo. Já a raiz cúbica de negativo existe: ∛(−8) = −2, porque (−2)³ = −8.'),
      T.h('Raízes que não são exatas'),
      T.p('√50 não é um número inteiro, mas dá pra estimar: 7² = 49 e 8² = 64. Como 50 está entre 49 e 64, √50 está entre 7 e 8 (bem perto de 7, porque 50 está perto de 49).'),
      T.h('Simplificar raízes'),
      T.p('Separa o número em um quadrado perfeito vezes outro número e tira o quadrado perfeito da raiz.'),
      T.ex('√12', ['12 = 4 × 3, e 4 é quadrado perfeito.', '√12 = √4 × √3 = 2√3.'], '2√3'),
      T.ex('√72', ['O maior quadrado perfeito que divide 72 é 36.', '72 = 36 × 2.', '√72 = 6√2.'], '6√2'),
      T.at('√(a + b) não é √a + √b. Por exemplo, √(9 + 16) = √25 = 5, mas √9 + √16 = 3 + 4 = 7. Já na multiplicação pode separar: √(9 × 16) = 3 × 4 = 12.'),
      T.resumo(['√ pergunta "que número ao quadrado dá isso?".', 'Decora os quadrados até 20² = 400.', 'Raiz quadrada de negativo não existe nos reais; a cúbica existe.', 'Estima pelos quadrados perfeitos vizinhos.', 'Simplifica tirando o quadrado perfeito: √12 = 2√3.']),
    ],
    pratica: [{ gen: rQuad, n: 3 }, { gen: rCub, n: 1 }, { gen: rEntre, n: 2 }, { gen: rSimp, n: 2 }, { gen: rExpr, n: 2 }],
    desafio: [
      Q.num('Calcule: √(9 × 16) + ∛125', 17, ['√(9 × 16) = √9 × √16 = 3 × 4 = 12.', '∛125 = 5, porque 5 × 5 × 5 = 125.', '12 + 5 = 17.'], 'Separa a raiz do produto.', G),
      Q.num('Simplificando √48 + √27, o resultado é k√3. Quanto vale k?', 7, ['√48 = √(16 × 3) = 4√3.', '√27 = √(9 × 3) = 3√3.', '4√3 + 3√3 = 7√3 (como somar 4 maçãs com 3 maçãs).'], 'Simplifica cada raiz pra ficar com √3.'),
    ],
  });

  /* ---------- 16. RAZÃO, PROPORÇÃO E REGRA DE TRÊS ---------- */
  const prop = () => { let a, b, c, x; do { a = R(2, 12); c = R(2, 12); x = R(2, 15); b = (x * c) / a; } while (!Number.isInteger(b) || b < 2); return Q.num(`Descubra x: x/${a} = ${b}/${c}`, x, [`Multiplica cruzado: x × ${c} = ${a} × ${b}.`, `${c}x = ${a * b}.`, `x = ${a * b} ÷ ${c} = ${x}.`], 'Multiplica em cruz.'); };
  const r3dir = () => { const t = R(0, 2); let q, r, pas; if (t === 0) { const kpl = R(9, 15), X = R(2, 8); let Z; do { Z = R(3, 12); } while (Z === X); q = `Com ${X} litros de combustível um carro anda ${X * kpl} km. Com ${Z} litros, quantos km ele anda?`; r = Z * kpl; pas = ['Mais combustível, mais km: diretamente proporcional.', `Monta: ${X} L → ${X * kpl} km e ${Z} L → x.`, `Multiplica cruzado: ${X}x = ${Z} × ${X * kpl} = ${Z * X * kpl}.`, `x = ${Z * X * kpl} ÷ ${X} = ${r} km.`]; } else if (t === 1) { const pr = R(25, 60), X = R(2, 6); let Z; do { Z = R(3, 10); } while (Z === X); q = `${X} camisetas custam R$ ${X * pr}. Quanto custam ${Z} camisetas iguais?`; r = Z * pr; pas = ['Mais camisetas, mais caro: diretamente proporcional.', `Preço de uma: ${X * pr} ÷ ${X} = ${pr}.`, `${Z} camisetas: ${Z} × ${pr} = ${r}.`]; } else { const ppm = R(5, 20), Y = R(2, 6); let Z; do { Z = R(3, 15); } while (Z === Y); q = `Uma impressora imprime ${Y * ppm} páginas em ${Y} minutos. Quantas páginas ela imprime em ${Z} minutos?`; r = Z * ppm; pas = ['Mais tempo, mais páginas: diretamente proporcional.', `Por minuto: ${Y * ppm} ÷ ${Y} = ${ppm} páginas.`, `Em ${Z} minutos: ${Z} × ${ppm} = ${r}.`]; } return Q.num(q, r, pas, 'Primeiro decide: as duas grandezas aumentam juntas?'); };
  const r3inv = () => { const t = R(0, 1); let q, r, pas; if (t === 0) { let V1, T1, V2, D; do { V1 = pick([40, 60, 80, 90, 100, 120]); T1 = R(2, 6); D = V1 * T1; V2 = pick([40, 50, 60, 80, 90, 100, 120, 150, 180]); } while (V2 === V1 || D % V2 !== 0); r = D / V2; q = `A ${V1} km/h, uma viagem leva ${T1} horas. A ${V2} km/h, quantas horas leva a mesma viagem?`; pas = ['Mais velocidade, menos tempo: inversamente proporcional.', `Na inversa, multiplica em linha: ${V1} × ${T1} = ${V2} × x.`, `${D} = ${V2}x, então x = ${D} ÷ ${V2} = ${r}.`]; } else { let W1, D1, W2, tot; do { W1 = R(2, 12); D1 = R(3, 20); tot = W1 * D1; W2 = R(2, 15); } while (W2 === W1 || tot % W2 !== 0); r = tot / W2; q = `${W1} pedreiros fazem uma obra em ${D1} dias. Em quantos dias ${W2} pedreiros, no mesmo ritmo, fazem a mesma obra?`; pas = [`${W2 > W1 ? 'Mais' : 'Menos'} pedreiros, ${W2 > W1 ? 'menos' : 'mais'} dias: inversamente proporcional.`, `Multiplica em linha: ${W1} × ${D1} = ${W2} × x.`, `${tot} = ${W2}x, então x = ${r}.`]; } return Q.num(q, r, pas, 'Quando uma grandeza aumenta, a outra diminui? Então é inversa.'); };
  const razao = () => { let a, b; do { a = R(6, 24); b = R(6, 30); } while (a === b || gcd(a, b) === 1); return Q.num(`Numa turma há ${a} meninos e ${b} meninas. Qual é a razão entre o número de meninos e o de meninas, na forma simplificada?`, a / b, [`Razão meninos para meninas: ${a}/${b}.`, `Simplifica por ${gcd(a, b)}: ${FR(a, b)}.`, `Quer dizer: a cada ${FR(a, b).split('/')[0]} meninos, há ${FR(a, b).split('/')[1] || 1} meninas.`], 'Escreve meninos/meninas e simplifica.', FRQ(a, b)); };
  const escala = () => { const s = pick([100000, 200000, 500000]), x = R(2, 12); const km = (x * s) / 100000; return Q.num(`Num mapa na escala 1 : ${N(s)}, uma distância de ${x} cm corresponde a quantos km na realidade?`, km, [`Escala 1 : ${N(s)}: cada 1 cm do mapa vale ${N(s)} cm de verdade.`, `${x} cm × ${N(s)} = ${N(x * s)} cm.`, `1 km = 100.000 cm, então ${N(x * s)} cm = ${N(km)} km.`], 'Multiplica e depois transforma cm em km (÷ 100.000).', { u: 'km' }); };
  L({
    id: 'mat16', titulo: 'Razão, proporção e regra de três', min: 40,
    resumo: 'Comparar grandezas e resolver problemas de proporção, direta e inversa.',
    teoria: [
      T.h('Razão é uma comparação em forma de fração'),
      T.p('Se num time há 3 atacantes pra cada 5 jogadores, a razão é 3/5. Velocidade (km/h), consumo (km/L) e escala de mapa (1 : 100.000) são razões.'),
      T.h('Proporção é uma igualdade entre razões'),
      T.p('2/3 = 4/6 é uma proporção. A propriedade mais útil: <strong>numa proporção, o produto cruzado é igual</strong>. Em a/b = c/d, vale a × d = b × c.'),
      T.ex('x/4 = 15/10', ['Multiplica cruzado: x × 10 = 4 × 15.', '10x = 60.', 'x = 6.'], '6'),
      T.h('Direta ou inversa?'),
      T.p('Antes de qualquer conta, pergunta: <strong>quando uma grandeza aumenta, a outra aumenta ou diminui?</strong>'),
      T.tab(['Tipo', 'Comportamento', 'Exemplos'], [['diretamente proporcional', 'uma aumenta, a outra também', 'litros e km; quantidade e preço'], ['inversamente proporcional', 'uma aumenta, a outra diminui', 'velocidade e tempo; operários e dias']]),
      T.h('Regra de três direta'),
      T.ex('Com 4 litros um carro anda 60 km. Com 10 litros, anda quanto?', ['Mais litros, mais km: direta.', 'Monta: 4 L → 60 km e 10 L → x.', 'Na direta, multiplica cruzado: 4x = 10 × 60 = 600.', 'x = 600 ÷ 4 = 150.'], '150 km'),
      T.h('Regra de três inversa'),
      T.ex('6 pedreiros fazem uma obra em 10 dias. Em quantos dias 12 pedreiros fazem?', ['Mais pedreiros, menos dias: inversa.', 'Na inversa, multiplica em linha (mesma linha): 6 × 10 = 12 × x.', '60 = 12x, então x = 5.'], '5 dias'),
      T.at('Usar a regra direta num problema inverso é o erro clássico. No exemplo acima, a conta errada daria 20 dias: mais gente trabalhando e demorando mais? Não faz sentido. Sempre confere se a resposta tem lógica.'),
      T.resumo(['Razão compara; proporção é igualdade de razões.', 'Produto cruzado: a × d = b × c.', 'Pergunta sempre: direta ou inversa?', 'Direta: multiplica cruzado. Inversa: multiplica em linha.', 'Confere se o resultado faz sentido.']),
    ],
    pratica: [{ gen: prop, n: 2 }, { gen: r3dir, n: 3 }, { gen: r3inv, n: 3 }, { gen: razao, n: 1 }, { gen: escala, n: 1 }],
    desafio: [
      Q.num('Um avião a 600 km/h faz uma viagem em 3 horas. A 900 km/h, em quantas horas faz a mesma viagem?', 2, ['Mais velocidade, menos tempo: inversa.', '600 × 3 = 900 × x.', '1.800 = 900x, então x = 2 horas.'], 'Velocidade e tempo são inversamente proporcionais.', { u: 'horas' }),
      Q.num('Numa receita, 3 xícaras de farinha rendem 24 biscoitos. Quantas xícaras são necessárias para 40 biscoitos?', 5, ['Mais biscoitos, mais farinha: direta.', '3 → 24 e x → 40.', '24x = 3 × 40 = 120, então x = 5.'], 'Mais biscoitos, mais farinha.', { u: 'xícaras' }),
    ],
  });

  /* ---------- 17. EXPRESSÕES ALGÉBRICAS ---------- */
  const vNum = () => { const a = R(2, 9), b = R(-10, 15), x = R(-5, 8); const bs = b < 0 ? `− ${-b}` : `+ ${b}`; return Q.num(`Qual o valor de ${a}x ${bs} quando x = ${N(x)}?`, a * x + b, [`Troca o x por ${NP(x)}: ${a} × ${NP(x)} ${bs}.`, `${a} × ${NP(x)} = ${N(a * x)}.`, `${N(a * x)} ${bs} = ${N(a * x + b)}.`], 'Substitui o x pelo número (use parênteses se for negativo).', { neg: 1 }); };
  const vNum2 = () => { const x = R(-4, 5), b = R(1, 6), c = R(1, 9); return Q.num(`Qual o valor de x² − ${b}x + ${c} para x = ${N(x)}?`, x * x - b * x + c, [`Troca o x por ${NP(x)}: ${NP(x)}² − ${b} × ${NP(x)} + ${c}.`, `${NP(x)}² = ${x * x} e ${b} × ${NP(x)} = ${N(b * x)}.`, `${x * x} − ${NP(b * x)} + ${c} = ${N(x * x - b * x + c)}.`], 'Cuidado com o sinal quando x é negativo.', { neg: 1 }); };
  const semel = () => { const a = R(2, 9), b = R(2, 9), c = R(1, a + b - 1), y1 = R(2, 6), y2 = R(1, y1 - 1); return Q.num(`Simplificando ${a}x + ${y1}y + ${b}x − ${c}x − ${y2}y, fica ?x + ${y1 - y2 === 1 ? '' : y1 - y2}y. Qual é o número que vai no lugar do "?"`, a + b - c, [`Junta só os termos com x: ${a}x + ${b}x − ${c}x = ${a + b - c}x.`, `Junta os termos com y: ${y1}y − ${y2}y = ${y1 - y2 === 1 ? '' : y1 - y2}y.`, `Fica ${a + b - c}x + ${y1 - y2 === 1 ? '' : y1 - y2}y. Termos com x não se juntam com termos com y.`], 'Soma só os coeficientes dos termos com x.'); };
  const distrib = () => { const a = R(2, 9), b = R(1, 9); if (Math.random() < 0.5) return Q.num(`${a}(x + ${b}) = ${a}x + ?`, a * b, [`Distributiva: o ${a} multiplica cada termo de dentro.`, `${a} × x = ${a}x e ${a} × ${b} = ${a * b}.`, `Fica ${a}x + ${a * b}.`], 'Multiplica o número de fora por cada termo de dentro.'); return Q.num(`−${a}(x − ${b}) = −${a}x + ?`, a * b, [`O −${a} multiplica cada termo de dentro, com regra de sinais.`, `−${a} × x = −${a}x.`, `−${a} × (−${b}) = +${a * b} (menos com menos dá mais).`], 'Atenção: menos vezes menos dá mais.'); };
  const LING = [
    Q.esc('Qual expressão representa "o dobro de um número somado com 5"?', ['2(x + 5)', '2x + 5', 'x² + 5', 'x + 10'], 1, ['"O dobro de um número" é 2x.', '"Somado com 5" vem depois: 2x + 5.', '2(x + 5) seria "o dobro da soma de um número com 5".'], 'Primeiro dobra, depois soma.'),
    Q.esc('Qual expressão representa "o triplo da soma de um número com 4"?', ['3x + 4', '3(x + 4)', '3 + x + 4', 'x³ + 4'], 1, ['"A soma de um número com 4" é x + 4.', '"O triplo" dessa soma: 3(x + 4).'], 'O triplo é da soma inteira.'),
    Q.esc('Qual expressão representa "a metade de um número, menos 3"?', ['x/2 − 3', '(x − 3)/2', '2x − 3', '3 − x/2'], 0, ['"A metade de um número" é x/2.', '"Menos 3" vem depois: x/2 − 3.'], 'Primeiro a metade, depois tira 3.'),
    Q.esc('Qual expressão representa "o quadrado de um número mais o próprio número"?', ['2x + x', 'x² + x', 'x² + 2', '(x + x)²'], 1, ['"O quadrado de um número" é x².', '"Mais o próprio número": x² + x.'], 'Quadrado é expoente 2.'),
    Q.esc('Qual expressão representa "a soma de dois números consecutivos"?', ['x + 2x', 'x + (x + 1)', 'x + 1', '2x + 2'], 1, ['Consecutivos são vizinhos: x e x + 1.', 'A soma: x + (x + 1) = 2x + 1.'], 'Consecutivo é o próximo: x + 1.'),
  ];
  L({
    id: 'mat17', titulo: 'Expressões algébricas', min: 35,
    resumo: 'Usar letras no lugar de números, calcular valor numérico e simplificar.',
    teoria: [
      T.h('Letras no lugar de números'),
      T.p('Na álgebra, uma letra (geralmente x) representa um número que você ainda não conhece ou que pode variar. Isso permite traduzir frases em contas.'),
      T.tab(['Frase', 'Expressão'], [['o dobro de um número', '2x'], ['o triplo de um número mais 5', '3x + 5'], ['a metade de um número', 'x/2'], ['o quadrado de um número', 'x²'], ['o consecutivo de um número', 'x + 1'], ['a soma de um número com 7, vezes 2', '2(x + 7)']]),
      T.p('Escrito junto, número e letra estão se multiplicando: 3x = 3 × x.'),
      T.h('Valor numérico'),
      T.p('É trocar a letra por um número e fazer a conta.'),
      T.ex('Valor de 3x + 2 para x = 4', ['Troca x por 4: 3 × 4 + 2.', '12 + 2 = 14.'], '14'),
      T.ex('Valor de x² − 3x para x = −2', ['Troca x por (−2), com parênteses: (−2)² − 3 × (−2).', '(−2)² = 4 e 3 × (−2) = −6.', '4 − (−6) = 4 + 6 = 10.'], '10'),
      T.at('Quando o número for negativo, coloca entre parênteses ao substituir. Sem parênteses, é fácil errar o sinal.'),
      T.h('Termos semelhantes'),
      T.p('Só se juntam termos com a mesma parte de letras: 3x + 5x = 8x (como 3 maçãs + 5 maçãs). Mas 2x + 3y não junta: x e y são coisas diferentes. E x² também é diferente de x.'),
      T.ex('Simplificar 4x + 3y − x + 2y', ['Termos com x: 4x − x = 3x.', 'Termos com y: 3y + 2y = 5y.'], '3x + 5y'),
      T.h('Propriedade distributiva'),
      T.p('O número de fora multiplica cada termo de dentro dos parênteses: 3(x + 4) = 3x + 12. Com sinal negativo, aplica a regra de sinais: −2(x − 5) = −2x + 10.'),
      T.resumo(['Letra representa um número.', 'Valor numérico: troca a letra e calcula (negativo vai entre parênteses).', 'Só junta termos com a mesma letra e o mesmo expoente.', 'Distributiva: o de fora multiplica todos de dentro.']),
    ],
    pratica: [{ gen: vNum, n: 2 }, { gen: vNum2, n: 1 }, { gen: semel, n: 2 }, { gen: distrib, n: 2 }, { pool: LING, n: 3 }],
    desafio: [
      Q.num('Se x = −2, quanto vale x² − 3x + 1?', 11, ['Troca x por (−2): (−2)² − 3 × (−2) + 1.', '(−2)² = 4 e −3 × (−2) = +6.', '4 + 6 + 1 = 11.'], 'Coloca o −2 entre parênteses.', { neg: 1 }),
      Q.num('Simplificando 2(3x − 1) − 3(x − 4), o resultado fica 3x + ?. Que número é esse?', 10, ['Distributiva na primeira parte: 2(3x − 1) = 6x − 2.', 'Na segunda, o −3 multiplica tudo: −3(x − 4) = −3x + 12.', 'Junta: 6x − 3x − 2 + 12 = 3x + 10.'], 'Aplica a distributiva com cuidado no −3.'),
    ],
  });

  /* ---------- 18. EQUAÇÃO DO 1º GRAU ---------- */
  const conf = (txt) => `Confere: ${txt}. Bateu.`;
  const eq1 = () => { const x = R(2, 30), a = R(2, 25); if (Math.random() < 0.5) return Q.num(`x + ${a} = ${x + a}`, x, [`O ${a} está somando no lado do x. Passa ele pro outro lado subtraindo: x = ${x + a} − ${a}.`, `x = ${x}.`, conf(`${x} + ${a} = ${x + a}`)], 'Faz a operação contrária.', G); return Q.num(`x − ${a} = ${x}`, x + a, [`O ${a} está subtraindo. Passa somando: x = ${x} + ${a}.`, `x = ${x + a}.`, conf(`${x + a} − ${a} = ${x}`)], 'Faz a operação contrária.', G); };
  const eq2 = () => { const x = R(2, 15), a = R(2, 9); return Q.num(`${a}x = ${a * x}`, x, [`O ${a} está multiplicando o x. Passa dividindo: x = ${a * x} ÷ ${a}.`, `x = ${x}.`, conf(`${a} × ${x} = ${a * x}`)], 'Quem multiplica passa dividindo.', G); };
  const eq3 = () => { const x = R(-6, 12) || 3, a = R(2, 9), b = R(1, 20), c = a * x + b; return Q.num(`${a}x + ${b} = ${N(c)}`, x, [`Primeiro tira o ${b}: passa subtraindo. ${a}x = ${N(c)} − ${b} = ${N(c - b)}.`, `Agora o ${a} passa dividindo: x = ${N(c - b)} ÷ ${a} = ${N(x)}.`, conf(`${a} × ${NP(x)} + ${b} = ${N(c)}`)], 'Primeiro tira o número que está somando, depois divide.', { g: 1, neg: 1 }); };
  const eq4 = () => { const x = R(1, 10), a = R(3, 9), c = R(1, a - 1), b = R(1, 20), d = (a - c) * x + b; return Q.num(`${a}x + ${b} = ${c === 1 ? '' : c}x + ${d}`, x, [`Letras pra um lado, números pro outro: ${a}x − ${c === 1 ? '' : c}x = ${d} − ${b}.`, `${a - c}x = ${d - b}.`, `x = ${d - b} ÷ ${a - c} = ${x}.`, conf(`${a} × ${x} + ${b} = ${a * x + b} e ${c} × ${x} + ${d} = ${c * x + d}`)], 'Junta os termos com x de um lado e os números do outro.', G); };
  const eq5 = () => { const x = R(1, 9), a = R(2, 6), b = R(1, 8), c = a * (x + b); return Q.num(`${a}(x + ${b}) = ${c}`, x, [`Distributiva: ${a}x + ${a * b} = ${c}.`, `${a}x = ${c} − ${a * b} = ${c - a * b}.`, `x = ${c - a * b} ÷ ${a} = ${x}.`, `Atalho: dava pra dividir tudo por ${a} primeiro: x + ${b} = ${c / a}, então x = ${x}.`], 'Faz a distributiva, ou divide os dois lados pelo número de fora.', G); };
  const eq6 = () => { const a = R(2, 6), k = R(1, 9), b = R(1, 10), x = a * k, c = k + b; return Q.num(`x/${a} + ${b} = ${c}`, x, [`Tira o ${b}: x/${a} = ${c} − ${b} = ${k}.`, `O ${a} está dividindo, então passa multiplicando: x = ${k} × ${a} = ${x}.`, conf(`${x}/${a} + ${b} = ${k} + ${b} = ${c}`)], 'Quem divide passa multiplicando.', G); };
  L({
    id: 'mat18', titulo: 'Equação do 1º grau', min: 40,
    resumo: 'Descobrir o valor do x com a ideia da balança.',
    teoria: [
      T.h('Equação é uma balança'),
      T.p('Uma equação é uma igualdade com um número desconhecido. Em x + 5 = 12, os dois lados "pesam" o mesmo. O objetivo é deixar o x sozinho de um lado, e a regra é uma só: <strong>o que você faz de um lado, faz do outro</strong>, pra balança continuar equilibrada.'),
      T.ex('x + 5 = 12', ['Pra deixar o x sozinho, tira 5 dos dois lados: x + 5 − 5 = 12 − 5.', 'x = 7.'], '7'),
      T.p('Na prática, isso vira o famoso "passa pro outro lado com a operação contrária":'),
      T.tab(['Estava', 'Passa como', 'Exemplo'], [['somando', 'subtraindo', 'x + 5 = 12 → x = 12 − 5'], ['subtraindo', 'somando', 'x − 3 = 8 → x = 8 + 3'], ['multiplicando', 'dividindo', '3x = 21 → x = 21 ÷ 3'], ['dividindo', 'multiplicando', 'x/4 = 6 → x = 6 × 4']]),
      T.h('A ordem: primeiro somas, depois multiplicações'),
      T.ex('2x + 5 = 17', ['Tira o 5 primeiro: 2x = 17 − 5 = 12.', 'Depois divide por 2: x = 12 ÷ 2 = 6.', 'Confere: 2 × 6 + 5 = 17. Bateu.'], '6'),
      T.h('X dos dois lados'),
      T.ex('5x − 3 = 2x + 9', ['Leva os x pra esquerda e os números pra direita: 5x − 2x = 9 + 3.', '3x = 12.', 'x = 4.'], '4'),
      T.h('Com parênteses e frações'),
      T.ex('2(x + 3) = 14', ['Distributiva: 2x + 6 = 14.', '2x = 8, então x = 4.'], '4'),
      T.ex('x/3 + 2 = 5', ['Tira o 2: x/3 = 3.', 'O 3 está dividindo, passa multiplicando: x = 9.'], '9'),
      T.at('Quando um termo passa pro outro lado, o sinal troca. Esquecer de trocar é o erro mais comum. E na hora de dividir, divide o lado inteiro.'),
      T.dica('Sempre confere no final: troca o x pelo valor que achou na equação original. Se os dois lados ficarem iguais, tá certo. Na prova, isso também ajuda a testar as alternativas.'),
      T.resumo(['O que faz de um lado, faz do outro.', 'Passa pro outro lado com a operação contrária.', 'Primeiro tira o que soma e subtrai, depois o que multiplica e divide.', 'X dos dois lados: junta todos os x de um lado só.', 'Confere substituindo.']),
    ],
    pratica: [{ gen: eq1, n: 1 }, { gen: eq2, n: 1 }, { gen: eq3, n: 3 }, { gen: eq4, n: 3 }, { gen: eq5, n: 1 }, { gen: eq6, n: 1 }],
    desafio: [
      Q.num('Resolva: 3(x − 2) + 4 = 2x + 5', 7, ['Distributiva: 3x − 6 + 4 = 2x + 5.', 'Simplifica: 3x − 2 = 2x + 5.', 'Leva os x pra esquerda e os números pra direita: 3x − 2x = 5 + 2.', 'x = 7.'], 'Faz a distributiva e simplifica antes de passar os termos.', G),
      Q.num('Resolva: x/2 + x/3 = 10', 12, ['MMC(2, 3) = 6. Multiplica tudo por 6 pra sumir com as frações.', '6 × x/2 = 3x e 6 × x/3 = 2x. Fica 3x + 2x = 60.', '5x = 60, então x = 12.', 'Confere: 12/2 + 12/3 = 6 + 4 = 10.'], 'Multiplica todos os termos pelo MMC dos denominadores.', G),
    ],
  });

  /* ---------- 19. PROBLEMAS COM EQUAÇÃO ---------- */
  const pDobro = () => { const k = pick([[2, 'O dobro'], [3, 'O triplo'], [4, 'O quádruplo']]), x = R(3, 20), b = R(2, 25), c = k[0] * x + b; return Q.num(`${k[1]} de um número mais ${b} é igual a ${c}. Que número é esse?`, x, [`Chama o número de x. ${k[1]} é ${k[0]}x.`, `Equação: ${k[0]}x + ${b} = ${c}.`, `${k[0]}x = ${c - b}, então x = ${x}.`, `Confere: ${k[0]} × ${x} + ${b} = ${c}.`], `Escreve: ${k[0]}x + ${b} = ${c}.`); };
  const pConsec = () => { const x = R(8, 60); if (Math.random() < 0.5) { const S = 2 * x + 1; return Q.num(`A soma de dois números consecutivos é ${S}. Qual é o maior deles?`, x + 1, ['Consecutivos: x e x + 1.', `Equação: x + (x + 1) = ${S}, ou seja, 2x + 1 = ${S}.`, `2x = ${S - 1}, então x = ${x}.`, `Os números são ${x} e ${x + 1}. O maior é ${x + 1}.`], 'Consecutivos são x e x + 1.'); } const S = 3 * x + 3; return Q.num(`A soma de três números consecutivos é ${S}. Qual é o menor deles?`, x, ['Consecutivos: x, x + 1 e x + 2.', `Equação: 3x + 3 = ${S}.`, `3x = ${S - 3}, então x = ${x}.`, `Os números são ${x}, ${x + 1} e ${x + 2}.`], 'Três consecutivos: x, x + 1, x + 2.'); };
  const pIdade = () => { const k = pick([[2, 'o dobro'], [3, 'o triplo'], [4, 'o quádruplo']]), x = R(5, 16), S = (k[0] + 1) * x; return Q.num(`Pedro tem ${k[1]} da idade de Ana. Juntos, eles têm ${S} anos. Quantos anos tem Ana?`, x, [`Idade de Ana: x. Idade de Pedro: ${k[0]}x.`, `Juntos: x + ${k[0]}x = ${S}, ou seja, ${k[0] + 1}x = ${S}.`, `x = ${S} ÷ ${k[0] + 1} = ${x}. Ana tem ${x} e Pedro tem ${k[0] * x}.`], 'Chama a idade de Ana de x.', { u: 'anos' }); };
  const pCompra = () => { const n = R(2, 5), x = R(25, 90), C = R(8, 25) * 10, T = n * x + C; return Q.num(`Comprei ${n} camisetas iguais e uma calça de R$ ${C}. Gastei R$ ${T} ao todo. Quanto custou cada camiseta?`, x, [`Preço da camiseta: x. As ${n} camisetas custam ${n}x.`, `Equação: ${n}x + ${C} = ${T}.`, `${n}x = ${T - C}, então x = ${x}.`], 'As camisetas mais a calça dão o total.', { u: 'reais' }); };
  const pPerim = () => { const x = R(3, 20), k = R(2, 10), P = 4 * x + 2 * k; return Q.num(`Um retângulo tem perímetro ${P} cm, e o comprimento tem ${k} cm a mais que a largura. Qual é a largura?`, x, [`Largura: x. Comprimento: x + ${k}.`, `Perímetro é a soma dos 4 lados: x + x + (x + ${k}) + (x + ${k}) = ${P}.`, `4x + ${2 * k} = ${P}, então 4x = ${P - 2 * k} e x = ${x}.`], 'Perímetro = soma dos quatro lados.', { u: 'cm' }); };
  const pDiv = () => { const x = R(40, 300), k = R(10, 80), T = 2 * x + k; return Q.num(`R$ ${T} foram divididos entre dois irmãos, e o mais velho recebeu R$ ${k} a mais que o mais novo. Quanto recebeu o mais novo?`, x, [`Mais novo: x. Mais velho: x + ${k}.`, `x + (x + ${k}) = ${T}, ou seja, 2x + ${k} = ${T}.`, `2x = ${T - k}, então x = ${x}.`], 'Chama a parte do mais novo de x.', { u: 'reais' }); };
  const PESC = [
    Q.esc('Qual equação representa: "somando 15 ao triplo de um número, obtém-se 60"?', ['3(x + 15) = 60', '3x + 15 = 60', 'x + 15 = 3 × 60', '15x + 3 = 60'], 1, ['"O triplo de um número" é 3x.', '"Somando 15": 3x + 15.', '"Obtém-se 60": = 60.'], 'Traduz pedaço por pedaço.'),
    Q.esc('Qual equação representa: "a metade de um número, mais 4, dá 10"?', ['(x + 4)/2 = 10', 'x/2 + 4 = 10', '2x + 4 = 10', 'x + 4 = 10/2'], 1, ['"A metade de um número" é x/2.', '"Mais 4, dá 10": x/2 + 4 = 10. A resposta seria x = 12.'], 'Primeiro a metade, depois soma 4.'),
  ];
  L({
    id: 'mat19', titulo: 'Problemas com equação', min: 40,
    resumo: 'Transformar um texto em equação e resolver.',
    teoria: [
      T.h('O método em quatro passos'),
      T.ol(['<strong>Lê e descobre o que não sabe.</strong> Isso vira o x.', '<strong>Traduz o texto pra matemática</strong>, frase por frase.', '<strong>Resolve a equação.</strong>', '<strong>Confere com o enunciado</strong> e vê se a resposta responde exatamente o que foi perguntado.']),
      T.ex('O dobro de um número mais 7 é 31. Que número é esse?', ['O que não sei: o número. Chamo de x.', 'Traduzo: 2x + 7 = 31.', 'Resolvo: 2x = 24, então x = 12.', 'Confiro: 2 × 12 + 7 = 31.'], '12'),
      T.ex('A soma de dois números consecutivos é 45. Quais são?', ['Os números: x e x + 1.', 'x + (x + 1) = 45, então 2x + 1 = 45.', '2x = 44, então x = 22.', 'Os números são 22 e 23.'], '22 e 23'),
      T.ex('Pedro tem o triplo da idade de Ana. Juntos têm 48 anos. Quantos anos tem cada um?', ['Ana: x. Pedro: 3x.', 'x + 3x = 48, então 4x = 48.', 'x = 12. Ana tem 12 e Pedro tem 36.'], 'Ana 12, Pedro 36'),
      T.at('Cuidado com o que a pergunta pede. No exemplo dos consecutivos, se perguntarem o maior, a resposta é 23, e não o x (22). Muita gente acerta a conta e marca a alternativa errada.'),
      T.h('Dicionário de tradução'),
      T.tab(['No texto', 'Na equação'], [['é, dá, resulta, obtém-se', '='], ['a mais que, aumentado de', '+'], ['a menos que, diminuído de', '−'], ['dobro, triplo', '2x, 3x'], ['metade, terça parte', 'x/2, x/3'], ['juntos, ao todo, total', 'soma tudo']]),
      T.resumo(['O que não sabe vira x.', 'Traduz frase por frase.', 'Resolve e confere no enunciado.', 'Responde exatamente o que foi perguntado.']),
    ],
    pratica: [{ gen: pDobro, n: 2 }, { gen: pConsec, n: 2 }, { gen: pIdade, n: 1 }, { gen: pCompra, n: 1 }, { gen: pPerim, n: 1 }, { gen: pDiv, n: 1 }, { pool: PESC, n: 2 }],
    desafio: [
      Q.num('Um pai tem 40 anos e o filho tem 10. Daqui a quantos anos o pai terá o triplo da idade do filho?', 5, ['Daqui a x anos: pai terá 40 + x e filho terá 10 + x.', 'Equação: 40 + x = 3(10 + x).', '40 + x = 30 + 3x, então 10 = 2x e x = 5.', 'Confere: daqui a 5 anos, pai 45 e filho 15. 45 = 3 × 15.'], 'Os dois envelhecem os mesmos x anos.', { u: 'anos' }),
      Q.num('Num estacionamento há carros e motos: são 30 veículos e 100 rodas. Quantas motos há?', 10, ['Motos: x. Carros: 30 − x.', 'Rodas: 2x + 4(30 − x) = 100.', '2x + 120 − 4x = 100, então −2x = −20 e x = 10.', 'Confere: 10 motos (20 rodas) e 20 carros (80 rodas) = 100 rodas.'], 'Se tem x motos, quantos carros tem?', { u: 'motos' }),
    ],
  });

  /* ---------- 20. SISTEMAS DE EQUAÇÕES ---------- */
  const sAdd = () => { const x = R(3, 20), y = R(1, x - 1), s = x + y, d = x - y, pedeX = Math.random() < 0.6; return Q.num(`x + y = ${s} e x − y = ${d}. Quanto vale ${pedeX ? 'x' : 'y'}?`, pedeX ? x : y, ['Soma as duas equações: o +y e o −y se anulam.', `(x + y) + (x − y) = ${s} + ${d}, então 2x = ${s + d}.`, `x = ${x}.`, `Substitui na primeira: ${x} + y = ${s}, então y = ${y}.`], 'Soma as duas equações pra sumir com o y.'); };
  const sSub = () => { const k = R(2, 4), x = R(2, 15), s = (k + 1) * x; return Q.num(`y = ${k}x e x + y = ${s}. Quanto vale y?`, k * x, [`Substitui o y da segunda por ${k}x: x + ${k}x = ${s}.`, `${k + 1}x = ${s}, então x = ${x}.`, `y = ${k} × ${x} = ${k * x}.`], 'Troca o y por ' + k + 'x na outra equação.'); };
  const sGen = () => { const x = R(2, 9), y = R(1, 8), a = R(2, 4), b = R(1, 4), c = a * x + b * y, d = x - y; return Q.num(`${a}x + ${b === 1 ? '' : b}y = ${c} e x − y = ${N(d)}. Quanto vale x?`, x, [`Isola o x na segunda: x = y ${d < 0 ? '− ' + -d : '+ ' + d}.`, `Substitui na primeira: ${a}(y ${d < 0 ? '− ' + -d : '+ ' + d}) + ${b === 1 ? '' : b}y = ${c}.`, `${a}y ${a * d < 0 ? '− ' + -a * d : '+ ' + a * d} + ${b === 1 ? '' : b}y = ${c}, então ${a + b}y = ${c - a * d} e y = ${y}.`, `x = ${y} ${d < 0 ? '− ' + -d : '+ ' + d} = ${x}.`], 'Isola o x na equação mais simples e substitui na outra.'); };
  const sProb = () => { const s = R(8, 25), j = R(4, 12), A = 2 * s + j, B = s + j; return Q.num(`2 sanduíches e 1 suco custam R$ ${A}. 1 sanduíche e 1 suco custam R$ ${B}. Quanto custa um sanduíche?`, s, ['Sanduíche: s. Suco: j.', `2s + j = ${A} e s + j = ${B}.`, `Subtrai a segunda da primeira: (2s + j) − (s + j) = ${A} − ${B}, então s = ${s}.`, `O suco: ${s} + j = ${B}, então j = ${j}.`], 'Compara as duas compras: a diferença entre elas é um sanduíche.', { u: 'reais' }); };
  const sEsc = () => { const x = R(2, 12), y = R(1, x - 1); const op = [[x, y], [y, x], [x + 1, y - 1], [x - 1, y + 1]].filter((v, i, a) => a.findIndex((w) => w[0] === v[0] && w[1] === v[1]) === i); while (op.length < 4) op.push([x + op.length, y]); const o = shuf(op.slice(0, 4)); return Q.esc(`Qual par (x, y) é solução do sistema x + y = ${x + y} e x − y = ${x - y}?`, o.map(([a, b]) => `(${a}, ${b})`), o.findIndex(([a, b]) => a === x && b === y), [`Testa nas duas equações. Precisa servir nas duas ao mesmo tempo.`, `(${x}, ${y}): ${x} + ${y} = ${x + y} e ${x} − ${y} = ${x - y}. Serve nas duas.`, `(${y}, ${x}) serve na soma, mas ${y} − ${x} = ${y - x}, que não é ${x - y}.`], 'Testa cada par nas duas equações.'); };
  L({
    id: 'mat20', titulo: 'Sistemas de equações', min: 45,
    resumo: 'Duas equações, duas incógnitas: métodos da substituição e da adição.',
    teoria: [
      T.h('Quando aparecem duas incógnitas'),
      T.p('"2 sanduíches e 1 suco custam R$ 30; 1 sanduíche e 1 suco custam R$ 20." Tem dois valores desconhecidos, então você precisa de duas equações. Isso é um <strong>sistema</strong>. A solução é o par de valores que serve nas duas ao mesmo tempo.'),
      T.h('Método da adição'),
      T.p('Soma (ou subtrai) as equações de um jeito que uma das letras desapareça.'),
      T.ex('x + y = 10 e x − y = 4', ['Soma as duas: o +y e o −y se anulam. (x + y) + (x − y) = 10 + 4.', '2x = 14, então x = 7.', 'Volta numa delas: 7 + y = 10, então y = 3.'], 'x = 7 e y = 3'),
      T.p('Se nenhuma letra some direto, multiplica uma das equações antes. Em 2x + y = 11 e x + y = 7, é só subtrair a segunda da primeira: x = 4, e então y = 3.'),
      T.h('Método da substituição'),
      T.p('Isola uma letra numa equação e substitui na outra.'),
      T.ex('y = 2x e x + y = 18', ['O y já está isolado: y = 2x.', 'Substitui na segunda: x + 2x = 18, então 3x = 18 e x = 6.', 'y = 2 × 6 = 12.'], 'x = 6 e y = 12'),
      T.h('Problema completo'),
      T.ex('2 sanduíches e 1 suco custam R$ 30. 1 sanduíche e 1 suco custam R$ 20. Quanto custa cada um?', ['Sanduíche: s. Suco: j. Fica 2s + j = 30 e s + j = 20.', 'Subtrai a segunda da primeira: s = 10.', '10 + j = 20, então j = 10.'], 'sanduíche R$ 10 e suco R$ 10'),
      T.dica('Na prova, um caminho rápido é testar as alternativas: o par certo tem que funcionar nas duas equações ao mesmo tempo.'),
      T.resumo(['Duas incógnitas pedem duas equações.', 'Adição: soma ou subtrai pra sumir com uma letra.', 'Substituição: isola uma letra e troca na outra equação.', 'A solução tem que servir nas duas.']),
    ],
    pratica: [{ gen: sAdd, n: 3 }, { gen: sSub, n: 2 }, { gen: sGen, n: 2 }, { gen: sProb, n: 2 }, { gen: sEsc, n: 1 }],
    desafio: [
      Q.num('Sabendo que 2x + 3y = 23 e x − y = 4, quanto vale x × y?', 21, ['Isola x na segunda: x = y + 4.', 'Substitui: 2(y + 4) + 3y = 23, então 2y + 8 + 3y = 23.', '5y = 15, então y = 3. E x = 3 + 4 = 7.', 'x × y = 7 × 3 = 21.'], 'Primeiro acha x e y separados.'),
      Q.num('Num jogo de tiro ao alvo, cada acerto vale +5 pontos e cada erro vale −2. Em 20 tiros, um jogador fez 58 pontos. Quantos tiros ele acertou?', 14, ['Acertos: a. Erros: e. Total de tiros: a + e = 20.', 'Pontos: 5a − 2e = 58.', 'Da primeira, e = 20 − a. Substitui: 5a − 2(20 − a) = 58.', '5a − 40 + 2a = 58, então 7a = 98 e a = 14.', 'Confere: 14 acertos (70 pontos) e 6 erros (−12): 70 − 12 = 58.'], 'Monta uma equação pros tiros e outra pros pontos.', { u: 'acertos' }),
    ],
  });
})();
