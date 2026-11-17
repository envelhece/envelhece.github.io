/* 1º ano do fundamental — todas as matérias. */
window.CURSO = window.CURSO || [];
(function () {
  const { R, pick, shuf } = AF;
  const L = (o) => CURSO.push(o);
  const bol = (k) => Array(k).fill('●').join(' ');
  const EXT = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove', 'vinte'];

  /* ---------------- MATEMÁTICA ---------------- */
  L({
    id: 'a1-mat-1', ano: 1, materia: 'mat', titulo: 'Números de 0 a 20', min: 15,
    resumo: 'Contar, ler e escrever os números até 20.',
    teoria: [
      T.h('Contar é dar um número pra cada coisa'),
      T.p('Quando você conta, aponta cada objeto uma vez e fala um número: um, dois, três... O último número falado é a quantidade.'),
      T.conta('● ● ● ● ●   →  5 (cinco)'),
      T.h('A sequência até 20'),
      T.p('0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20.'),
      T.p('O número que vem <strong>depois</strong> é sempre 1 a mais (depois do 7 vem o 8). O que vem <strong>antes</strong> é 1 a menos (antes do 7 vem o 6).'),
      T.tab(['Número', 'Por extenso'], [['11', 'onze'], ['12', 'doze'], ['13', 'treze'], ['14', 'catorze ou quatorze'], ['15', 'quinze'], ['16', 'dezesseis'], ['17', 'dezessete'], ['18', 'dezoito'], ['19', 'dezenove'], ['20', 'vinte']]),
      T.resumo(['Conta cada objeto uma vez só.', 'Depois = 1 a mais. Antes = 1 a menos.', 'De 11 a 19 os nomes são especiais: onze, doze, treze...']),
    ],
    pratica: [
      { gen: () => { const k = R(3, 12); return Q.num(`Quantas bolinhas tem aqui?  ${bol(k)}`, k, [`Conta apontando uma por uma: ${Array.from({ length: k }, (_, i) => i + 1).join(', ')}.`, `O último número é ${k}.`], 'Aponta cada bolinha e conta em voz alta.'); }, n: 2 },
      { gen: () => { const k = R(0, 19); return Q.num(`Que número vem depois do ${k}?`, k + 1, [`Depois é 1 a mais: ${k} + 1 = ${k + 1}.`], 'Depois = 1 a mais.'); }, n: 2 },
      { gen: () => { const k = R(1, 20); return Q.num(`Que número vem antes do ${k}?`, k - 1, [`Antes é 1 a menos: ${k} − 1 = ${k - 1}.`], 'Antes = 1 a menos.'); }, n: 2 },
      { gen: () => { const k = R(11, 20); const o = shuf([...new Set([EXT[k], EXT[k - 1], EXT[Math.min(20, k + 1)], EXT[k - 10]])]); return Q.esc(`Como se escreve o número ${k} por extenso?`, o, o.indexOf(EXT[k]), [`${k} se escreve "${EXT[k]}".`], 'Lembra da tabela da explicação.'); }, n: 2 },
    ],
  });

  L({
    id: 'a1-mat-2', ano: 1, materia: 'mat', titulo: 'Maior, menor e igual', min: 15,
    resumo: 'Comparar números e quantidades.',
    teoria: [
      T.h('Quem tem mais?'),
      T.p('O número maior representa a quantidade maior. Na sequência dos números, quem vem <strong>depois</strong> é maior: 9 vem depois do 6, então 9 é maior que 6.'),
      T.conta('● ● ● ● ● ● ● ● ●   9\n● ● ● ● ● ●         6\n\n9 é maior que 6     →   9 > 6\n6 é menor que 9     →   6 < 9'),
      T.p('Os sinais <strong>&gt;</strong> (maior) e <strong>&lt;</strong> (menor) são como uma boca aberta: a parte aberta sempre fica virada pro número maior.'),
      T.p('Quando as quantidades são iguais, usa o sinal <strong>=</strong>.'),
      T.resumo(['Quem vem depois na sequência é maior.', '> quer dizer maior, < quer dizer menor.', 'A "boca" do sinal abre pro maior.']),
    ],
    pratica: [
      { gen: () => { let a = R(0, 20), b = R(0, 20); while (a === b) b = R(0, 20); const o = [String(a), String(b), 'São iguais', 'Não dá pra saber']; return Q.esc(`Qual número é maior: ${a} ou ${b}?`, o, a > b ? 0 : 1, [`${Math.max(a, b)} vem depois de ${Math.min(a, b)} na sequência, então ${Math.max(a, b)} é maior.`], 'Quem vem depois na sequência é maior.'); }, n: 3 },
      { gen: () => { const s = new Set(); while (s.size < 4) s.add(R(0, 20)); const o = shuf([...s]); const m = Math.min(...o); return Q.esc('Qual é o menor número?', o.map(String), o.indexOf(m), [`O menor é o que vem primeiro na sequência: ${m}.`], 'Quem vem primeiro na sequência é menor.'); }, n: 2 },
      { gen: () => { let a = R(1, 20), b = R(1, 20); if (Math.random() < 0.2) b = a; const c = a > b ? 0 : a < b ? 1 : 2; return Q.esc(`Qual sinal completa: ${a} __ ${b}`, ['>', '<', '='], c, [c === 2 ? 'Os números são iguais: usa =.' : `${a} é ${c === 0 ? 'maior' : 'menor'} que ${b}, então o sinal é ${c === 0 ? '>' : '<'}. A boca abre pro maior.`], 'A boca do sinal abre pro número maior.'); }, n: 3 },
    ],
  });

  const somaVis = (a, b) => [`Junta as bolinhas: ${bol(a)}  +  ${bol(b)}`, `Conta tudo: dá ${a + b}.`, `Dica: começa do ${Math.max(a, b)} e conta mais ${Math.min(a, b)} nos dedos.`];
  L({
    id: 'a1-mat-3', ano: 1, materia: 'mat', titulo: 'Somar até 10', min: 15,
    resumo: 'Juntar quantidades pequenas.',
    teoria: [
      T.h('Somar é juntar'),
      T.p('Se você tem 3 figurinhas e ganha mais 2, fica com 3 + 2 = 5. O sinal <strong>+</strong> se lê "mais" e o <strong>=</strong> se lê "igual".'),
      T.conta('● ● ●  +  ● ●  =  ● ● ● ● ●\n  3    +   2   =      5'),
      T.h('Truque: começa pelo maior'),
      T.p('Em 2 + 6, começa do 6 e conta mais 2: sete, oito. Resposta: 8. É bem mais rápido do que contar tudo desde o 1.'),
      T.h('Somas que dão 10'),
      T.p('Vale a pena saber de cor: 1 + 9, 2 + 8, 3 + 7, 4 + 6 e 5 + 5. Todas dão 10.'),
      T.resumo(['+ é juntar.', 'Começa pelo maior e conta o resto.', 'Decora os pares que dão 10.']),
    ],
    pratica: [{ gen: () => { const a = R(1, 6), b = R(1, 10 - a); return Q.num(`${a} + ${b}`, a + b, somaVis(a, b), 'Começa pelo maior e conta o resto nos dedos.', { g: 1 }); }, n: 6 }, { gen: () => { const a = R(1, 9); return Q.num(`Quanto falta pro ${a} chegar a 10?`, 10 - a, [`${a} + ${10 - a} = 10.`, `Os pares que dão 10: 1 e 9, 2 e 8, 3 e 7, 4 e 6, 5 e 5.`], 'Lembra dos pares que dão 10.'); }, n: 2 }],
  });

  L({
    id: 'a1-mat-4', ano: 1, materia: 'mat', titulo: 'Subtrair até 10', min: 15,
    resumo: 'Tirar uma quantidade de outra.',
    teoria: [
      T.h('Subtrair é tirar'),
      T.p('Se você tem 7 balas e come 3, sobram 7 − 3 = 4. O sinal <strong>−</strong> se lê "menos".'),
      T.conta('● ● ● ● ● ● ●   tira 3   →   ● ● ● ●\n      7         −   3     =       4'),
      T.h('Truque: contar pra trás'),
      T.p('Em 9 − 2, começa do 9 e conta pra trás 2 vezes: oito, sete. Resposta: 7.'),
      T.p('E a subtração desfaz a soma: se 4 + 3 = 7, então 7 − 3 = 4.'),
      T.resumo(['− é tirar.', 'Conta pra trás a partir do número maior.', 'A subtração desfaz a soma.']),
    ],
    pratica: [{ gen: () => { const a = R(3, 10), b = R(1, a - 1); return Q.num(`${a} − ${b}`, a - b, [`Começa do ${a} e conta pra trás ${b}: ${Array.from({ length: b }, (_, i) => a - i - 1).join(', ')}.`, `Sobra ${a - b}.`], 'Conta pra trás.', { g: 1 }); }, n: 6 }, { gen: () => { const a = R(5, 10), b = R(1, a - 1); return Q.num(`Kauan tinha ${a} figurinhas e deu ${b} pro amigo. Com quantas ficou?`, a - b, ['Deu = tirou. É subtração.', `${a} − ${b} = ${a - b}.`], 'Dar alguma coisa = tirar.'); }, n: 2 }],
  });

  L({
    id: 'a1-mat-5', ano: 1, materia: 'mat', titulo: 'Formas geométricas', min: 15,
    resumo: 'Círculo, quadrado, triângulo e retângulo.',
    teoria: [
      T.h('As quatro formas básicas'),
      T.tab(['Forma', 'Lados', 'Exemplo do dia a dia'], [['Círculo', 'nenhum (é redondo)', 'moeda, roda, relógio de parede'], ['Triângulo', '3 lados', 'placa de "dê a preferência", fatia de pizza'], ['Quadrado', '4 lados iguais', 'tecla do teclado, azulejo'], ['Retângulo', '4 lados (2 compridos e 2 curtos)', 'porta, celular, livro']]),
      T.p('Os cantos onde os lados se encontram se chamam <strong>vértices</strong>. O triângulo tem 3 vértices, o quadrado e o retângulo têm 4, e o círculo não tem nenhum.'),
      T.resumo(['Triângulo: 3 lados.', 'Quadrado: 4 lados iguais.', 'Retângulo: 4 lados, dois compridos e dois curtos.', 'Círculo: redondo, sem lados.']),
    ],
    pratica: [{ pool: [
      Q.esc('Qual forma tem 3 lados?', ['Círculo', 'Triângulo', 'Quadrado', 'Retângulo'], 1, ['O triângulo tem 3 lados (tri = três).'], 'Tri quer dizer três.'),
      Q.esc('Qual forma tem 4 lados todos do mesmo tamanho?', ['Retângulo', 'Triângulo', 'Quadrado', 'Círculo'], 2, ['O quadrado tem 4 lados iguais. O retângulo também tem 4, mas dois são mais compridos.'], 'Todos iguais.'),
      Q.esc('Qual forma não tem lados?', ['Quadrado', 'Círculo', 'Triângulo', 'Retângulo'], 1, ['O círculo é redondo, não tem lados nem cantos.'], 'É redondo.'),
      Q.esc('Uma porta tem forma de:', ['Círculo', 'Triângulo', 'Retângulo', 'Quadrado'], 2, ['A porta tem 4 lados: dois compridos (altura) e dois curtos (largura). É um retângulo.'], 'Dois lados compridos e dois curtos.'),
      Q.esc('Uma moeda tem forma de:', ['Círculo', 'Quadrado', 'Retângulo', 'Triângulo'], 0, ['A moeda é redonda: é um círculo.'], 'É redonda.'),
      Q.num('Quantos vértices (cantos) tem um triângulo?', 3, ['O triângulo tem 3 lados e 3 cantos.'], 'Conta os cantos.'),
      Q.num('Quantos lados tem um retângulo?', 4, ['O retângulo tem 4 lados: 2 compridos e 2 curtos.'], 'Pensa numa porta.'),
      Q.esc('Qual destes objetos tem forma de triângulo?', ['Relógio de parede', 'Fatia de pizza', 'Celular', 'Azulejo'], 1, ['A fatia de pizza tem 3 lados (dois retos e uma borda).'], 'Procura o que tem 3 pontas.'),
    ], n: 8 }],
  });

  /* ---------------- PORTUGUÊS ---------------- */
  const ALF = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  L({
    id: 'a1-port-1', ano: 1, materia: 'port', titulo: 'O alfabeto', min: 15,
    resumo: 'As 26 letras e a ordem alfabética.',
    teoria: [
      T.h('As letras'),
      T.p('O nosso alfabeto tem <strong>26 letras</strong>:'),
      T.conta('A B C D E F G H I J K L M\nN O P Q R S T U V W X Y Z'),
      T.p('As letras K, W e Y aparecem em nomes estrangeiros e abreviações: Kauan, Wi-Fi, km.'),
      T.h('Ordem alfabética'),
      T.p('É a ordem das letras de A a Z. Ela é usada em dicionários, listas de chamada e contatos do celular. Pra colocar palavras em ordem, olha a primeira letra. Se for igual, olha a segunda.'),
      T.ex('Ordenar: bola, avião, casa, barco', ['Primeira letra: a (avião), b (bola, barco), c (casa).', 'Bola e barco começam com b: olha a segunda letra. "a" de barco vem antes de "o" de bola.', 'Ordem: avião, barco, bola, casa.'], 'avião, barco, bola, casa'),
      T.resumo(['São 26 letras.', 'Ordem alfabética: de A a Z.', 'Se a primeira letra é igual, compara a segunda.']),
    ],
    pratica: [
      Q.num('Quantas letras tem o nosso alfabeto?', 26, ['De A até Z são 26 letras.'], 'Conta as letras da explicação.'),
      { gen: () => { const i = R(0, 24); return Q.txt(`Que letra vem depois do ${ALF[i]}?`, ALF[i + 1], [`A ordem é ...${ALF.slice(Math.max(0, i - 2), i + 3).join(', ')}...`, `Depois do ${ALF[i]} vem o ${ALF[i + 1]}.`], 'Recita o alfabeto até chegar nessa letra.', { ph: 'Uma letra', up: 1 }); }, n: 3 },
      { gen: () => { const i = R(1, 25); return Q.txt(`Que letra vem antes do ${ALF[i]}?`, ALF[i - 1], [`Antes do ${ALF[i]} vem o ${ALF[i - 1]}.`], 'Recita o alfabeto.', { ph: 'Uma letra', up: 1 }); }, n: 2 },
      { pool: [
        Q.esc('Qual palavra vem primeiro na ordem alfabética?', ['dado', 'casa', 'escola', 'fogo'], 1, ['Compara as primeiras letras: c, d, e, f. O c vem primeiro.'], 'Olha só a primeira letra.'),
        Q.esc('Qual palavra vem primeiro na ordem alfabética?', ['bola', 'barco', 'bico', 'bule'], 1, ['Todas começam com b. Compara a segunda letra: a (barco), i (bico), o (bola), u (bule).', 'O "a" vem primeiro: barco.'], 'Primeira letra igual? Olha a segunda.'),
        Q.esc('Qual palavra vem por último na ordem alfabética?', ['zebra', 'xícara', 'vaca', 'uva'], 0, ['Z é a última letra do alfabeto.'], 'Qual letra é a última?'),
      ], n: 2 },
    ],
  });

  const VOG = 'aeiou';
  const PAL = ['casa', 'bola', 'avião', 'escola', 'menino', 'janela', 'carro', 'pato', 'uva', 'sapato', 'telefone', 'girafa'];
  L({
    id: 'a1-port-2', ano: 1, materia: 'port', titulo: 'Vogais e consoantes', min: 15,
    resumo: 'As 5 vogais e as outras 21 letras.',
    teoria: [
      T.h('Vogais'),
      T.p('São 5 letras: <strong>A, E, I, O, U</strong>. Toda sílaba em português tem pelo menos uma vogal.'),
      T.h('Consoantes'),
      T.p('São as outras 21 letras: B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z. Elas quase sempre aparecem junto de uma vogal: ba, ca, da...'),
      T.ex('Na palavra CASA', ['C: consoante. A: vogal. S: consoante. A: vogal.', 'São 2 vogais e 2 consoantes.'], '2 vogais e 2 consoantes'),
      T.at('Letras com acento continuam sendo vogais: o Ã de avião e o É de café são vogais.'),
      T.resumo(['Vogais: a, e, i, o, u.', 'As outras 21 são consoantes.', 'Letra com acento também é vogal.']),
    ],
    pratica: [
      { gen: () => { const p = pick(PAL); const sem = p.normalize('NFD').replace(/[̀-ͯ]/g, ''); const v = [...sem].filter((c) => VOG.includes(c)).length; return Q.num(`Quantas vogais tem a palavra "${p.toUpperCase()}"?`, v, [`Letra por letra: ${[...p.toUpperCase()].map((c, i) => `${c} (${VOG.includes(sem[i]) ? 'vogal' : 'consoante'})`).join(', ')}.`, `São ${v} vogais.`], 'As vogais são A, E, I, O, U.'); }, n: 3 },
      { gen: () => { const v = pick(VOG.toUpperCase().split('')); const cs = shuf('BCDFGLMNPRST'.split('')).slice(0, 3); const o = shuf([v, ...cs]); return Q.esc('Qual destas letras é uma vogal?', o, o.indexOf(v), [`${v} é vogal. As vogais são A, E, I, O, U.`], 'São só 5 vogais.'); }, n: 2 },
      { gen: () => { const p = pick(PAL); const sem = p.normalize('NFD').replace(/[̀-ͯ]/g, ''); const c = [...sem].filter((x) => !VOG.includes(x)).length; return Q.num(`Quantas consoantes tem a palavra "${p.toUpperCase()}"?`, c, [`Tira as vogais e conta o resto: ${[...p.toUpperCase()].filter((_, i) => !VOG.includes(sem[i])).join(', ')}.`, `São ${c} consoantes.`], 'Consoante é toda letra que não é vogal.'); }, n: 2 },
      Q.num('Quantas vogais existem no alfabeto?', 5, ['A, E, I, O, U: são 5.'], 'Fala elas em voz alta.'),
    ],
  });

  const SIL = [['bola', 'bo-la'], ['casa', 'ca-sa'], ['sapato', 'sa-pa-to'], ['janela', 'ja-ne-la'], ['telefone', 'te-le-fo-ne'], ['pé', 'pé'], ['macaco', 'ma-ca-co'], ['borboleta', 'bor-bo-le-ta'], ['sol', 'sol'], ['escola', 'es-co-la'], ['avião', 'a-vi-ão'], ['computador', 'com-pu-ta-dor']];
  L({
    id: 'a1-port-3', ano: 1, materia: 'port', titulo: 'Sílabas', min: 15,
    resumo: 'Separar e contar sílabas.',
    teoria: [
      T.h('O que é sílaba'),
      T.p('Sílaba é cada pedacinho de som que a gente fala de uma vez. Um truque: fala a palavra devagar batendo palmas. Cada palma é uma sílaba.'),
      T.tab(['Palavra', 'Separada', 'Sílabas'], [['sol', 'sol', '1'], ['bola', 'bo-la', '2'], ['sapato', 'sa-pa-to', '3'], ['borboleta', 'bor-bo-le-ta', '4']]),
      T.at('Toda sílaba tem pelo menos uma vogal. Se você separou e ficou um pedaço sem vogal, a separação está errada.'),
      T.resumo(['Sílaba = pedaço de som falado de uma vez.', 'Bate palma pra contar.', 'Toda sílaba tem vogal.']),
    ],
    pratica: [
      { gen: () => { const [p, s] = pick(SIL); const n = s.split('-').length; return Q.num(`Quantas sílabas tem a palavra "${p}"?`, n, [`Separando: ${s}.`, `São ${n} sílaba${n > 1 ? 's' : ''}.`], 'Fala devagar batendo palmas.'); }, n: 4 },
      { gen: () => { const [p, s] = pick(SIL.filter(([, x]) => x.includes('-'))); const parts = s.split('-'); const errada1 = parts.join('').split('').join('-'); const errada2 = parts.length > 2 ? [parts[0] + parts[1], ...parts.slice(2)].join('-') : p.slice(0, 1) + '-' + p.slice(1); const errada3 = p.slice(0, -1) + '-' + p.slice(-1); const o = shuf([...new Set([s, errada1, errada2, errada3])]); return Q.esc(`Qual é a separação certa de "${p}"?`, o, o.indexOf(s), [`Fala devagar: ${s}.`, 'Confere: cada pedaço tem uma vogal.'], 'Cada pedaço precisa ter uma vogal.'); }, n: 3 },
      Q.esc('Uma palavra com 3 sílabas é chamada de:', ['monossílaba', 'dissílaba', 'trissílaba', 'polissílaba'], 2, ['Mono = 1, di = 2, tri = 3, poli = 4 ou mais.', 'Então 3 sílabas é trissílaba.'], 'Tri = três.'),
    ],
  });

  L({
    id: 'a1-port-4', ano: 1, materia: 'port', titulo: 'Letra maiúscula', min: 15,
    resumo: 'Quando usar a letra grande.',
    teoria: [
      T.h('Onde se usa letra maiúscula'),
      T.ul(['<strong>No começo de toda frase:</strong> O avião decolou.', '<strong>Em nomes de pessoas:</strong> Kauan, Maria, Pedro.', '<strong>Em nomes de lugares:</strong> São Paulo, Brasil, Rio Tietê.', '<strong>Em nomes de animais de estimação e marcas:</strong> Rex, Nike.']),
      T.p('O resto das palavras fica em letra minúscula: cachorro, cidade, menino.'),
      T.ex('Corrigir: "ontem o pedro foi pra são paulo."', ['"ontem" começa a frase: Ontem.', '"pedro" é nome de pessoa: Pedro.', '"são paulo" é nome de lugar: São Paulo.'], 'Ontem o Pedro foi pra São Paulo.'),
      T.resumo(['Maiúscula no começo da frase.', 'Maiúscula em nomes de pessoas, lugares e marcas.', 'O resto, minúscula.']),
    ],
    pratica: [{ pool: [
      Q.esc('Qual frase está escrita certo?', ['o gato dormiu.', 'O gato dormiu.', 'O Gato Dormiu.', 'o Gato dormiu.'], 1, ['A frase começa com maiúscula (O).', '"gato" não é nome próprio, fica minúsculo.'], 'Maiúscula só no começo, aqui.'),
      Q.esc('Qual palavra deve começar com letra maiúscula?', ['cidade', 'brasil', 'menino', 'cachorro'], 1, ['Brasil é nome de país, então é Brasil, com maiúscula.'], 'Procura o nome de um lugar.'),
      Q.esc('Qual frase está escrita certo?', ['Eu moro em são paulo.', 'eu moro em São Paulo.', 'Eu moro em São Paulo.', 'Eu Moro Em São Paulo.'], 2, ['"Eu" começa a frase: maiúscula.', '"São Paulo" é nome de cidade: maiúscula.'], 'Começo da frase e nome de lugar.'),
      Q.esc('Qual destas palavras é um nome próprio?', ['menina', 'Ana', 'escola', 'carro'], 1, ['Ana é nome de pessoa: nome próprio, com maiúscula.'], 'Nome de pessoa.'),
      Q.esc('Qual frase está escrita certo?', ['Meu cachorro se chama rex.', 'meu cachorro se chama Rex.', 'Meu cachorro se chama Rex.', 'Meu Cachorro se chama Rex.'], 2, ['Começo da frase: Meu.', 'Nome do cachorro: Rex.', '"cachorro" é palavra comum: minúscula.'], 'Nome do animal leva maiúscula.'),
      Q.esc('Qual palavra NÃO precisa de letra maiúscula?', ['Kauan', 'Brasil', 'janela', 'Recife'], 2, ['"janela" é uma palavra comum, não é nome de pessoa nem de lugar.'], 'Procura a palavra comum.'),
      Q.esc('Qual frase está escrita certo?', ['ontem choveu muito.', 'Ontem Choveu Muito.', 'Ontem choveu muito.', 'ontem Choveu muito.'], 2, ['Só "Ontem" leva maiúscula, por ser o começo da frase.'], 'Só o começo.'),
    ], n: 7 }],
  });

  L({
    id: 'a1-port-5', ano: 1, materia: 'port', titulo: 'Frases e pontuação básica', min: 15,
    resumo: 'Ponto final, ponto de interrogação e ponto de exclamação.',
    teoria: [
      T.h('O que é frase'),
      T.p('Frase é um conjunto de palavras que faz sentido. Ela começa com letra maiúscula e termina com um sinal de pontuação.'),
      T.tab(['Sinal', 'Quando usar', 'Exemplo'], [['. ponto final', 'pra contar ou afirmar alguma coisa', 'Hoje está calor.'], ['? interrogação', 'pra perguntar', 'Que horas são?'], ['! exclamação', 'pra mostrar emoção: surpresa, alegria, susto', 'Que gol lindo!']]),
      T.resumo(['Frase começa com maiúscula.', 'Afirmou? Ponto final.', 'Perguntou? Interrogação.', 'Emoção? Exclamação.']),
    ],
    pratica: [{ pool: [
      Q.esc('Qual sinal completa a frase: "Você vai à escola amanhã__"', ['.', '?', '!'], 1, ['É uma pergunta, então usa o ponto de interrogação.'], 'É pergunta?'),
      Q.esc('Qual sinal completa a frase: "O céu está azul__"', ['.', '?', '!'], 0, ['A frase está só contando uma coisa: ponto final.'], 'Só está contando algo.'),
      Q.esc('Qual sinal completa a frase: "Nossa, que susto__"', ['.', '?', '!'], 2, ['"Nossa, que susto" mostra emoção: ponto de exclamação.'], 'Tem emoção?'),
      Q.esc('Qual destas é uma frase completa e bem escrita?', ['o menino correu', 'O menino correu.', 'menino correu o.', 'O menino correu'], 1, ['Começa com maiúscula, faz sentido e termina com ponto.'], 'Maiúscula no começo e ponto no fim.'),
      Q.esc('Qual sinal completa: "Onde você mora__"', ['.', '?', '!'], 1, ['"Onde" indica pergunta: interrogação.'], 'Palavras como onde, quando e quem costumam indicar pergunta.'),
      Q.esc('Qual sinal completa: "Que dia lindo__"', ['.', '?', '!'], 2, ['Mostra alegria: exclamação.'], 'É uma emoção.'),
      Q.esc('Qual sinal completa: "Eu gosto de jogar bola__"', ['.', '?', '!'], 0, ['Afirma uma coisa: ponto final.'], 'Está afirmando.'),
      Q.esc('Qual sinal completa: "Quantos anos você tem__"', ['.', '?', '!'], 1, ['É pergunta: interrogação.'], 'Começa com "quantos".'),
    ], n: 8 }],
  });

  /* ---------------- CIÊNCIAS ---------------- */
  L({
    id: 'a1-cie-1', ano: 1, materia: 'cie', titulo: 'O corpo humano', min: 15,
    resumo: 'As partes do corpo e pra que servem.',
    teoria: [
      T.h('As três partes principais'),
      T.tab(['Parte', 'O que tem'], [['Cabeça', 'olhos, nariz, boca, orelhas, cabelo. Dentro dela fica o cérebro.'], ['Tronco', 'peito, barriga, costas. Dentro ficam o coração, os pulmões e o estômago.'], ['Membros', 'braços e mãos (membros superiores), pernas e pés (membros inferiores).']]),
      T.p('O <strong>cérebro</strong> comanda o corpo inteiro. O <strong>coração</strong> bombeia o sangue. Os <strong>pulmões</strong> servem pra respirar. O <strong>estômago</strong> ajuda a digerir a comida. Os <strong>ossos</strong> formam o esqueleto, que sustenta o corpo, e os <strong>músculos</strong> fazem ele se mexer.'),
      T.resumo(['Cabeça, tronco e membros.', 'Cérebro comanda, coração bombeia sangue, pulmão respira.', 'Ossos sustentam, músculos movimentam.']),
    ],
    pratica: [{ pool: [
      Q.esc('Qual órgão comanda o corpo inteiro?', ['Coração', 'Cérebro', 'Estômago', 'Pulmão'], 1, ['O cérebro fica na cabeça e comanda tudo: movimentos, pensamentos, memória.'], 'Fica dentro da cabeça.'),
      Q.esc('Qual órgão bombeia o sangue?', ['Pulmão', 'Estômago', 'Coração', 'Cérebro'], 2, ['O coração é um músculo que bate e empurra o sangue pelo corpo.'], 'Ele bate.'),
      Q.esc('Os pulmões servem pra:', ['digerir a comida', 'respirar', 'pensar', 'ver'], 1, ['Os pulmões puxam o ar pra dentro do corpo e soltam o ar usado.'], 'Pensa no ar.'),
      Q.esc('Braços e pernas são chamados de:', ['tronco', 'membros', 'órgãos', 'cabeça'], 1, ['Braços são membros superiores e pernas são membros inferiores.'], 'Superiores e inferiores.'),
      Q.esc('O que sustenta o corpo e forma o esqueleto?', ['Os músculos', 'Os ossos', 'A pele', 'O sangue'], 1, ['Os ossos são duros e formam o esqueleto, que sustenta o corpo.'], 'São duros.'),
      Q.esc('Em qual parte do corpo ficam o coração e os pulmões?', ['Cabeça', 'Tronco', 'Membros', 'Pés'], 1, ['O coração e os pulmões ficam dentro do tronco, protegidos pelas costelas.'], 'Fica no peito.'),
      Q.esc('O que faz o corpo se mexer?', ['Os músculos', 'Os cabelos', 'As unhas', 'O estômago'], 0, ['Os músculos puxam os ossos e fazem o corpo se mexer.'], 'É o que a academia treina.'),
    ], n: 7 }],
  });

  L({
    id: 'a1-cie-2', ano: 1, materia: 'cie', titulo: 'Os cinco sentidos', min: 15,
    resumo: 'Visão, audição, olfato, paladar e tato.',
    teoria: [
      T.h('Como a gente percebe o mundo'),
      T.tab(['Sentido', 'Órgão', 'Serve pra'], [['Visão', 'olhos', 'ver cores, formas e movimentos'], ['Audição', 'orelhas', 'ouvir sons'], ['Olfato', 'nariz', 'sentir cheiros'], ['Paladar', 'língua', 'sentir sabores: doce, salgado, azedo, amargo'], ['Tato', 'pele', 'sentir quente, frio, liso, áspero, dor']]),
      T.p('Os sentidos mandam as informações pro cérebro, e é ele que entende o que você está vendo, ouvindo ou sentindo.'),
      T.resumo(['Olho: visão. Orelha: audição. Nariz: olfato. Língua: paladar. Pele: tato.', 'O cérebro interpreta tudo.']),
    ],
    pratica: [{ pool: [
      Q.esc('Com qual sentido você sente o cheiro do bolo?', ['Visão', 'Olfato', 'Tato', 'Audição'], 1, ['Cheiro é com o nariz: olfato.'], 'Cheiro = nariz.'),
      Q.esc('Qual órgão é responsável pelo paladar?', ['Língua', 'Nariz', 'Pele', 'Olhos'], 0, ['O paladar é o sentido dos sabores, e fica na língua.'], 'Sabor.'),
      Q.esc('Sentir que a panela está quente é o sentido do:', ['olfato', 'paladar', 'tato', 'audição'], 2, ['Quente e frio a gente sente pela pele: tato.'], 'É pela pele.'),
      Q.esc('Ouvir música usa qual sentido?', ['Audição', 'Visão', 'Tato', 'Olfato'], 0, ['Som é com as orelhas: audição.'], 'Som.'),
      Q.esc('Qual sentido usa os olhos?', ['Tato', 'Visão', 'Paladar', 'Olfato'], 1, ['Os olhos são o órgão da visão.'], 'Ver.'),
      Q.num('Quantos são os sentidos principais do corpo?', 5, ['Visão, audição, olfato, paladar e tato: 5.'], 'O nome da lição já diz.'),
      Q.esc('Quem entende as informações que os sentidos mandam?', ['O coração', 'O cérebro', 'O estômago', 'Os pulmões'], 1, ['Os sentidos captam, e o cérebro interpreta.'], 'Quem comanda o corpo.'),
    ], n: 7 }],
  });

  L({
    id: 'a1-cie-3', ano: 1, materia: 'cie', titulo: 'Higiene e saúde', min: 15,
    resumo: 'Cuidados que mantêm o corpo saudável.',
    teoria: [
      T.h('Hábitos que protegem a saúde'),
      T.ul(['<strong>Lavar as mãos</strong> com água e sabão antes de comer e depois de usar o banheiro. Isso tira os micróbios que causam doenças.', '<strong>Escovar os dentes</strong> depois das refeições e antes de dormir, pra evitar cárie.', '<strong>Tomar banho</strong> todo dia.', '<strong>Beber água</strong> várias vezes ao dia.', '<strong>Comer bem:</strong> frutas, verduras, legumes, arroz e feijão. Doce e fritura só de vez em quando.', '<strong>Dormir bem</strong> e <strong>se exercitar</strong>.']),
      T.p('<strong>Micróbios</strong> são seres tão pequenos que não dá pra ver a olho nu. Alguns causam doenças, e a higiene ajuda a se livrar deles.'),
      T.resumo(['Mão lavada com água e sabão.', 'Dente escovado depois de comer.', 'Água, comida saudável, sono e exercício.']),
    ],
    pratica: [{ pool: [
      Q.esc('Quando devemos lavar as mãos?', ['Só quando estão sujas de terra', 'Antes de comer e depois de usar o banheiro', 'Só uma vez por semana', 'Nunca'], 1, ['Os micróbios não aparecem a olho nu, então as mãos podem estar contaminadas mesmo parecendo limpas.'], 'Antes de comer...'),
      Q.esc('Escovar os dentes ajuda a evitar:', ['gripe', 'cárie', 'febre', 'dor nas pernas'], 1, ['Restos de comida nos dentes viram cárie. Escovar remove esses restos.'], 'É um problema nos dentes.'),
      Q.esc('Qual destes é um alimento saudável pra comer todo dia?', ['Refrigerante', 'Salgadinho', 'Fruta', 'Bala'], 2, ['Frutas têm vitaminas. Os outros têm muito açúcar, sal ou gordura.'], 'Vem da natureza.'),
      Q.esc('Micróbios são:', ['bichos grandes', 'seres muito pequenos que não dá pra ver a olho nu', 'tipos de comida', 'partes do corpo'], 1, ['São tão pequenos que só se vê com microscópio.'], 'São bem pequenos.'),
      Q.esc('Pra lavar bem as mãos, usamos:', ['só água', 'água e sabão', 'só papel', 'álcool na comida'], 1, ['O sabão é que tira a gordura e os micróbios. Só água não basta.'], 'Falta alguma coisa além da água.'),
      Q.esc('Qual hábito NÃO é saudável?', ['Beber água', 'Dormir bem', 'Ficar a noite toda acordado no celular', 'Comer verduras'], 2, ['Dormir pouco deixa o corpo cansado e atrapalha a memória.'], 'Qual atrapalha o sono?'),
    ], n: 6 }],
  });

  L({
    id: 'a1-cie-4', ano: 1, materia: 'cie', titulo: 'Os animais', min: 15,
    resumo: 'Como os animais são, onde vivem e o que comem.',
    teoria: [
      T.h('O corpo dos animais'),
      T.tab(['Cobertura do corpo', 'Exemplos'], [['pelos', 'cachorro, gato, leão, cavalo'], ['penas', 'galinha, papagaio, pinguim'], ['escamas', 'peixes, cobras, jacarés'], ['pele lisa e úmida', 'sapo, rã']]),
      T.h('Onde vivem'),
      T.p('Alguns vivem na <strong>terra</strong> (leão, formiga), outros na <strong>água</strong> (peixe, baleia) e outros nos dois (sapo, jacaré). Muitos voam (aves, morcegos, insetos).'),
      T.h('O que comem'),
      T.ul(['<strong>Herbívoros:</strong> comem plantas (vaca, coelho, girafa).', '<strong>Carnívoros:</strong> comem outros animais (leão, tubarão, onça).', '<strong>Onívoros:</strong> comem de tudo (ser humano, porco, urso).']),
      T.resumo(['Pelos, penas, escamas ou pele lisa.', 'Terra, água ou os dois.', 'Herbívoro come planta, carnívoro come carne, onívoro come tudo.']),
    ],
    pratica: [{ pool: [
      Q.esc('Qual animal tem o corpo coberto de penas?', ['Gato', 'Papagaio', 'Peixe', 'Sapo'], 1, ['As aves têm penas: papagaio, galinha, pinguim.'], 'É uma ave.'),
      Q.esc('Um animal que come só plantas é:', ['carnívoro', 'herbívoro', 'onívoro', 'aquático'], 1, ['Herbívoro vem de "erva": come plantas.'], 'Erva = planta.'),
      Q.esc('O leão é:', ['herbívoro', 'carnívoro', 'onívoro', 'aquático'], 1, ['O leão caça outros animais pra comer: carnívoro.'], 'Ele caça.'),
      Q.esc('Qual animal tem escamas?', ['Cachorro', 'Galinha', 'Peixe', 'Cavalo'], 2, ['Peixes, cobras e jacarés têm escamas.'], 'Vive na água.'),
      Q.esc('O ser humano é:', ['herbívoro', 'carnívoro', 'onívoro', 'nenhum'], 2, ['A gente come plantas e carne: onívoro.'], 'Come de tudo.'),
      Q.esc('Qual animal vive na terra e na água?', ['Sapo', 'Baleia', 'Leão', 'Galinha'], 0, ['O sapo nasce na água (girino) e vive também na terra.'], 'Começa a vida como girino.'),
      Q.esc('Qual animal tem pelos?', ['Cobra', 'Gato', 'Pinguim', 'Tubarão'], 1, ['Gato, cachorro, leão e cavalo têm pelos.'], 'Animal de estimação comum.'),
    ], n: 7 }],
  });

  /* ---------------- HISTÓRIA ---------------- */
  L({
    id: 'a1-his-1', ano: 1, materia: 'his', titulo: 'Eu e minha história', min: 15,
    resumo: 'Nome, documentos e a história de cada pessoa.',
    teoria: [
      T.h('Todo mundo tem uma história'),
      T.p('A história de uma pessoa começa no dia em que ela nasce. Fotos, objetos guardados, documentos e lembranças da família ajudam a contar essa história. Esses registros se chamam <strong>fontes históricas</strong>.'),
      T.h('Nome e sobrenome'),
      T.p('O <strong>nome</strong> é o que identifica você (Kauan). O <strong>sobrenome</strong> geralmente vem da família, da mãe e do pai, e mostra de onde você vem.'),
      T.h('Documentos'),
      T.p('O primeiro documento é a <strong>certidão de nascimento</strong>: ela registra o nome, a data e o lugar em que a pessoa nasceu e o nome dos pais. Depois vêm o RG (carteira de identidade) e o CPF.'),
      T.resumo(['Fotos, objetos e documentos são fontes históricas.', 'Sobrenome vem da família.', 'Primeiro documento: certidão de nascimento.']),
    ],
    pratica: [{ pool: [
      Q.esc('Qual é o primeiro documento de uma pessoa?', ['RG', 'Certidão de nascimento', 'CPF', 'Carteira de motorista'], 1, ['A certidão de nascimento é feita logo depois que a pessoa nasce.'], 'É feito quando a pessoa nasce.'),
      Q.esc('O sobrenome geralmente vem:', ['dos amigos', 'da família', 'da escola', 'do bairro'], 1, ['O sobrenome é herdado da mãe e do pai.'], 'É herdado.'),
      Q.esc('Uma foto antiga da família é um exemplo de:', ['fonte histórica', 'brinquedo', 'documento de identidade', 'mapa'], 0, ['Fotos, cartas e objetos antigos ajudam a contar a história: são fontes históricas.'], 'Ajuda a contar o passado.'),
      Q.esc('O que a certidão de nascimento registra?', ['O time de futebol da pessoa', 'Nome, data e lugar de nascimento e o nome dos pais', 'As notas da escola', 'O endereço do trabalho'], 1, ['Ela registra os dados do nascimento.'], 'Dados de quando a pessoa nasceu.'),
      Q.esc('A história de uma pessoa começa:', ['quando ela entra na escola', 'quando ela nasce', 'quando ela faz 18 anos', 'quando ela começa a trabalhar'], 1, ['A história começa no nascimento.'], 'Bem no começo da vida.'),
    ], n: 5 }],
  });

  L({
    id: 'a1-his-2', ano: 1, materia: 'his', titulo: 'A família', min: 15,
    resumo: 'Os tipos de família e os parentes.',
    teoria: [
      T.h('Famílias são diferentes'),
      T.p('Existem muitos tipos de família: com mãe e pai, só com a mãe, só com o pai, com avós, com tios, com pais adotivos, com irmãos ou sem. O que forma uma família é o cuidado e a convivência.'),
      T.h('Os parentes'),
      T.tab(['Parente', 'Quem é'], [['avós', 'os pais da sua mãe ou do seu pai'], ['tios', 'os irmãos da sua mãe ou do seu pai'], ['primos', 'os filhos dos seus tios'], ['sobrinhos', 'os filhos dos seus irmãos']]),
      T.p('A <strong>árvore genealógica</strong> é um desenho que mostra os parentes de uma pessoa, geração por geração.'),
      T.resumo(['Existem muitos tipos de família.', 'Avós: pais dos pais. Tios: irmãos dos pais. Primos: filhos dos tios.', 'Árvore genealógica mostra os parentes.']),
    ],
    pratica: [{ pool: [
      Q.esc('Os pais do seu pai são seus:', ['tios', 'avós', 'primos', 'irmãos'], 1, ['Os pais dos seus pais são seus avós.'], 'Uma geração acima dos pais.'),
      Q.esc('Os filhos dos seus tios são seus:', ['irmãos', 'sobrinhos', 'primos', 'avós'], 2, ['Filhos dos tios são primos.'], 'Pensa nas festas de família.'),
      Q.esc('O irmão da sua mãe é seu:', ['avô', 'primo', 'tio', 'sobrinho'], 2, ['Irmãos dos seus pais são seus tios.'], 'Irmão da mãe.'),
      Q.esc('O desenho que mostra os parentes de uma pessoa se chama:', ['mapa', 'árvore genealógica', 'calendário', 'certidão'], 1, ['A árvore genealógica mostra as gerações da família.'], 'Tem nome de planta.'),
      Q.esc('O que forma uma família?', ['Só ter mãe e pai', 'O cuidado e a convivência', 'Morar na mesma cidade', 'Ter o mesmo time'], 1, ['Famílias podem ser de vários jeitos. O que importa é o cuidado.'], 'Existem vários tipos.'),
    ], n: 5 }],
  });

  const DIAS_S = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  L({
    id: 'a1-his-3', ano: 1, materia: 'his', titulo: 'O tempo e o calendário', min: 15,
    resumo: 'Ontem, hoje e amanhã, dias da semana e meses.',
    teoria: [
      T.h('Passado, presente e futuro'),
      T.p('<strong>Ontem</strong> é o dia que já passou (passado). <strong>Hoje</strong> é o dia de agora (presente). <strong>Amanhã</strong> é o dia que ainda vai chegar (futuro).'),
      T.h('A semana'),
      T.p('Uma semana tem <strong>7 dias</strong>: domingo, segunda-feira, terça-feira, quarta-feira, quinta-feira, sexta-feira e sábado.'),
      T.h('O ano'),
      T.p('Um ano tem <strong>12 meses</strong>: janeiro, fevereiro, março, abril, maio, junho, julho, agosto, setembro, outubro, novembro e dezembro. E tem 365 dias (366 no ano bissexto).'),
      T.resumo(['Ontem: passado. Hoje: presente. Amanhã: futuro.', 'Semana: 7 dias.', 'Ano: 12 meses e 365 dias.']),
    ],
    pratica: [
      Q.num('Quantos dias tem uma semana?', 7, ['Domingo, segunda, terça, quarta, quinta, sexta e sábado: 7.'], 'Conta nos dedos.'),
      Q.num('Quantos meses tem um ano?', 12, ['De janeiro a dezembro são 12 meses.'], 'Recita os meses.'),
      { gen: () => { const i = R(0, 6); const r = DIAS_S[(i + 1) % 7]; const o = shuf([r, DIAS_S[(i + 2) % 7], DIAS_S[(i + 6) % 7], DIAS_S[(i + 3) % 7]]); return Q.esc(`Se hoje é ${DIAS_S[i]}, amanhã será:`, o, o.indexOf(r), [`Depois de ${DIAS_S[i]} vem ${r}.`], 'Amanhã é o dia seguinte.'); }, n: 2 },
      { gen: () => { const i = R(0, 11); const r = MESES[(i + 1) % 12]; const o = shuf([r, MESES[(i + 2) % 12], MESES[(i + 11) % 12], MESES[(i + 5) % 12]]); return Q.esc(`Que mês vem depois de ${MESES[i]}?`, o, o.indexOf(r), [`A ordem é ${MESES[i]}, ${r}...`], 'Recita os meses na ordem.'); }, n: 2 },
      Q.esc('"Ontem" fica no:', ['passado', 'presente', 'futuro'], 0, ['Ontem já passou: passado.'], 'Já aconteceu?'),
    ],
  });

  /* ---------------- GEOGRAFIA ---------------- */
  L({
    id: 'a1-geo-1', ano: 1, materia: 'geo', titulo: 'Os lugares onde vivemos', min: 15,
    resumo: 'Casa, escola, rua e bairro.',
    teoria: [
      T.h('Lugares de vivência'),
      T.p('São os lugares que fazem parte do seu dia a dia: a <strong>casa</strong> onde você mora, a <strong>rua</strong>, o <strong>bairro</strong>, a escola, a praça, o mercado.'),
      T.p('Esses lugares se encaixam um dentro do outro, como caixinhas:'),
      T.conta('casa  →  rua  →  bairro  →  cidade  →  estado  →  país'),
      T.p('Exemplo: uma casa fica numa rua, a rua fica num bairro, o bairro fica na cidade de São Paulo, que fica no estado de São Paulo, que fica no Brasil.'),
      T.h('Endereço'),
      T.p('O <strong>endereço</strong> diz exatamente onde um lugar fica: nome da rua, número, bairro, cidade, estado e CEP.'),
      T.resumo(['Lugares de vivência: casa, rua, bairro, escola.', 'Casa < rua < bairro < cidade < estado < país.', 'Endereço: rua, número, bairro, cidade, estado e CEP.']),
    ],
    pratica: [{ pool: [
      Q.esc('Qual é o maior destes lugares?', ['Rua', 'Bairro', 'Cidade', 'Casa'], 2, ['A cidade é formada por vários bairros, e cada bairro tem várias ruas.'], 'Qual contém todos os outros?'),
      Q.esc('Qual é a ordem do menor pro maior?', ['bairro, casa, cidade', 'casa, bairro, cidade', 'cidade, bairro, casa', 'casa, cidade, bairro'], 1, ['Casa fica no bairro, que fica na cidade.'], 'Começa pela casa.'),
      Q.esc('O que o endereço informa?', ['O nome dos vizinhos', 'Onde um lugar fica', 'O horário de dormir', 'A cor da casa'], 1, ['Endereço mostra a localização: rua, número, bairro, cidade.'], 'Serve pra achar o lugar.'),
      Q.esc('São Paulo é a capital de qual estado?', ['Rio de Janeiro', 'Minas Gerais', 'São Paulo', 'Paraná'], 2, ['A cidade de São Paulo é a capital do estado de São Paulo.'], 'Tem o mesmo nome.'),
      Q.esc('Qual destes é um lugar de vivência do dia a dia?', ['A Lua', 'A escola', 'O fundo do mar', 'Outro país'], 1, ['Lugar de vivência é onde a gente frequenta no dia a dia.'], 'Onde você vai sempre.'),
      Q.esc('O Brasil é:', ['uma cidade', 'um bairro', 'um país', 'uma rua'], 2, ['O Brasil é um país, formado por 26 estados e o Distrito Federal.'], 'É o maior da lista casa-rua-bairro-cidade-estado...'),
    ], n: 6 }],
  });

  L({
    id: 'a1-geo-2', ano: 1, materia: 'geo', titulo: 'Direita, esquerda e posições', min: 15,
    resumo: 'Se localizar no espaço.',
    teoria: [
      T.h('Lados do corpo'),
      T.p('A maioria das pessoas escreve com a mão <strong>direita</strong>. O outro lado é a <strong>esquerda</strong>. Truque: abre as mãos com a palma pra baixo e os polegares pra dentro. O dedo indicador e o polegar da mão esquerda formam um <strong>L</strong>, de Left (esquerda em inglês).'),
      T.h('Posições'),
      T.tab(['Posição', 'Exemplo'], [['em cima / embaixo', 'o abajur está em cima da mesa'], ['na frente / atrás', 'o carro está na frente da casa'], ['dentro / fora', 'o lápis está dentro do estojo'], ['perto / longe', 'a padaria fica perto; o aeroporto, longe'], ['entre', 'a letra B está entre o A e o C']]),
      T.at('Quando uma pessoa está de frente pra você, a direita dela fica do lado da sua esquerda.'),
      T.resumo(['Direita e esquerda.', 'Em cima, embaixo, na frente, atrás, dentro, fora, entre.', 'De frente pra alguém, os lados se invertem.']),
    ],
    pratica: [{ pool: [
      Q.esc('Na sequência A, B, C, qual letra está entre o A e o C?', ['A', 'B', 'C', 'D'], 1, ['O B fica no meio do A e do C.'], 'Fica no meio.'),
      Q.esc('Se você está de frente pra uma pessoa e ela levanta a mão direita, a mão dela fica do lado da sua:', ['direita', 'esquerda', 'frente', 'nenhum'], 1, ['De frente, os lados se invertem: a direita dela fica do lado da sua esquerda.'], 'Os lados se invertem.'),
      Q.esc('"O gato está debaixo da mesa." O gato está:', ['em cima da mesa', 'embaixo da mesa', 'dentro da mesa', 'longe da mesa'], 1, ['Debaixo = embaixo.'], 'Debaixo.'),
      Q.esc('Qual é o contrário de "dentro"?', ['Perto', 'Fora', 'Atrás', 'Em cima'], 1, ['Dentro e fora são opostos.'], 'Oposto.'),
      Q.esc('Qual é o contrário de "perto"?', ['Longe', 'Embaixo', 'Dentro', 'Direita'], 0, ['Perto e longe são opostos.'], 'Oposto.'),
      Q.esc('O truque da letra L ajuda a lembrar qual mão?', ['A direita', 'A esquerda', 'As duas', 'Nenhuma'], 1, ['L de Left, que é esquerda em inglês.'], 'Left.'),
    ], n: 6 }],
  });

  L({
    id: 'a1-geo-3', ano: 1, materia: 'geo', titulo: 'Paisagens', min: 15,
    resumo: 'Paisagem natural e paisagem modificada.',
    teoria: [
      T.h('O que é paisagem'),
      T.p('Paisagem é tudo o que a gente vê num lugar: rios, morros, árvores, prédios, ruas, pessoas.'),
      T.tab(['Tipo', 'Como é', 'Exemplos'], [['Natural', 'quase sem mudança feita pelo ser humano', 'floresta, praia deserta, montanha'], ['Modificada (ou humanizada)', 'transformada pelo ser humano', 'cidade, plantação, estrada, ponte']]),
      T.p('São Paulo é um bom exemplo de paisagem muito modificada: antes era coberta por mata, e hoje tem prédios, avenidas e rios canalizados, como o Tietê e o Pinheiros.'),
      T.p('As paisagens mudam com o tempo: por causa da natureza (chuva, vento) e, principalmente, por causa das pessoas.'),
      T.resumo(['Paisagem é tudo o que se vê num lugar.', 'Natural: sem ação humana. Modificada: transformada pelas pessoas.', 'Paisagens mudam com o tempo.']),
    ],
    pratica: [{ pool: [
      Q.esc('Uma floresta sem construções é uma paisagem:', ['natural', 'modificada', 'urbana', 'industrial'], 0, ['Sem ação humana: natural.'], 'Tem ação humana?'),
      Q.esc('Uma cidade com prédios e ruas é uma paisagem:', ['natural', 'modificada', 'selvagem', 'deserta'], 1, ['Prédios e ruas foram feitos pelas pessoas: paisagem modificada.'], 'Quem construiu os prédios?'),
      Q.esc('Qual destes é um elemento construído pelo ser humano?', ['Rio', 'Montanha', 'Ponte', 'Árvore'], 2, ['A ponte foi construída pelas pessoas.'], 'Alguém construiu.'),
      Q.esc('Paisagem é:', ['só o que tem na natureza', 'tudo o que a gente vê num lugar', 'só o que tem na cidade', 'um tipo de mapa'], 1, ['Paisagem inclui elementos naturais e construídos.'], 'Tudo que se vê.'),
      Q.esc('Uma plantação de cana é uma paisagem:', ['natural', 'modificada', 'deserta', 'marinha'], 1, ['A plantação foi feita pelas pessoas: modificada.'], 'Alguém plantou.'),
      Q.esc('As paisagens:', ['nunca mudam', 'mudam com o tempo', 'só mudam no inverno', 'só existem na cidade'], 1, ['A natureza e as pessoas transformam as paisagens.'], 'Pensa em como São Paulo era antes.'),
    ], n: 6 }],
  });

  /* ---------------- INGLÊS ---------------- */
  L({
    id: 'a1-ing-1', ano: 1, materia: 'ing', titulo: 'Greetings: cumprimentos', min: 15,
    resumo: 'Hello, good morning, how are you.',
    teoria: [
      T.h('Pra cumprimentar'),
      T.tab(['Inglês', 'Português'], [['Hello / Hi', 'Olá / Oi'], ['Good morning', 'Bom dia'], ['Good afternoon', 'Boa tarde'], ['Good evening', 'Boa noite (ao chegar)'], ['Good night', 'Boa noite (ao ir dormir ou se despedir)'], ['Goodbye / Bye', 'Tchau'], ['See you later', 'Até mais']]),
      T.h('Conversando'),
      T.tab(['Inglês', 'Português'], [['How are you?', 'Como você está?'], ["I'm fine, thank you.", 'Estou bem, obrigado.'], ["What's your name?", 'Qual é o seu nome?'], ['My name is Kauan.', 'Meu nome é Kauan.'], ['Nice to meet you.', 'Prazer em te conhecer.'], ['Please / Thank you', 'Por favor / Obrigado']]),
      T.resumo(['Hello = olá. Goodbye = tchau.', 'Good morning, good afternoon, good evening.', 'How are you? I am fine.']),
    ],
    pratica: [{ pool: [
      Q.esc('"Good morning" quer dizer:', ['Boa noite', 'Bom dia', 'Boa tarde', 'Tchau'], 1, ['Morning = manhã. Good morning = bom dia.'], 'Morning é a manhã.'),
      Q.esc('Como se diz "obrigado" em inglês?', ['Please', 'Sorry', 'Thank you', 'Hello'], 2, ['Thank you = obrigado. Please = por favor. Sorry = desculpa.'], 'Thank...'),
      Q.esc('"What\'s your name?" quer dizer:', ['Como você está?', 'Qual é o seu nome?', 'Onde você mora?', 'Quantos anos você tem?'], 1, ['Name = nome.'], 'Name = nome.'),
      Q.esc('Pra se despedir, você diz:', ['Hello', 'Goodbye', 'Good morning', 'Please'], 1, ['Goodbye (ou Bye) = tchau.'], 'Tchau.'),
      Q.esc('Qual a resposta pra "How are you?"', ['My name is Ana.', "I'm fine, thank you.", 'Good night.', 'Nice.'], 1, ['"How are you?" pergunta como você está. Resposta: "I\'m fine" (estou bem).'], 'Ela pergunta como você está.'),
      Q.esc('"Good night" se usa:', ['quando acorda', 'pra ir dormir ou se despedir à noite', 'no almoço', 'pra pedir algo'], 1, ['Good night é pra despedida à noite. Pra chegar à noite, é good evening.'], 'É de despedida.'),
    ], n: 6 }],
  });

  const CORES = [['red', 'vermelho'], ['blue', 'azul'], ['yellow', 'amarelo'], ['green', 'verde'], ['black', 'preto'], ['white', 'branco'], ['orange', 'laranja'], ['purple', 'roxo'], ['pink', 'rosa'], ['brown', 'marrom'], ['gray', 'cinza']];
  L({
    id: 'a1-ing-2', ano: 1, materia: 'ing', titulo: 'Colors: as cores', min: 15,
    resumo: 'As cores em inglês.',
    teoria: [T.h('As cores'), T.tab(['Inglês', 'Português'], CORES.map(([a, b]) => [a, b])), T.p('Em inglês, a cor vem <strong>antes</strong> da coisa: <em>a black car</em> = um carro preto.'), T.resumo(['Black = preto, white = branco, red = vermelho, blue = azul.', 'A cor vem antes: a black car.'])],
    pratica: [
      { gen: () => { const [en, pt] = pick(CORES); const o = shuf([pt, ...shuf(CORES.filter((c) => c[1] !== pt)).slice(0, 3).map((c) => c[1])]); return Q.esc(`"${en}" quer dizer:`, o, o.indexOf(pt), [`${en} = ${pt}.`], 'Lembra da tabela.'); }, n: 4 },
      { gen: () => { const [en, pt] = pick(CORES); return Q.txt(`Como se diz "${pt}" em inglês?`, en, [`${pt} = ${en}.`], 'Lembra da tabela de cores.', { ph: 'em inglês' }); }, n: 3 },
      Q.esc('Como se diz "um carro preto" em inglês?', ['a car black', 'a black car', 'black a car', 'car a black'], 1, ['Em inglês, a cor vem antes da coisa: a black car.'], 'A cor vem antes.'),
    ],
  });

  const NUM_EN = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  L({
    id: 'a1-ing-3', ano: 1, materia: 'ing', titulo: 'Numbers: números de 0 a 10', min: 15,
    resumo: 'Contar em inglês.',
    teoria: [T.h('Os números'), T.tab(['Número', 'Inglês'], NUM_EN.map((w, i) => [String(i), w])), T.p('Dica de pronúncia: <em>three</em> se fala com a língua entre os dentes (som de "th"). <em>Eight</em> se fala "eit".'), T.resumo(['one, two, three, four, five, six, seven, eight, nine, ten.'])],
    pratica: [
      { gen: () => { const k = R(0, 10); return Q.num(`Qual número é "${NUM_EN[k]}"?`, k, [`${NUM_EN[k]} = ${k}.`], 'Conta em inglês desde o one.'); }, n: 4 },
      { gen: () => { const k = R(0, 10); return Q.txt(`Escreva o número ${k} em inglês.`, NUM_EN[k], [`${k} = ${NUM_EN[k]}.`], 'Lembra da tabela.', { ph: 'em inglês' }); }, n: 3 },
      { gen: () => { const a = R(1, 5), b = R(1, 5); return Q.txt(`Quanto é ${NUM_EN[a]} + ${NUM_EN[b]}? Responda em inglês.`, NUM_EN[a + b], [`${NUM_EN[a]} = ${a} e ${NUM_EN[b]} = ${b}.`, `${a} + ${b} = ${a + b} = ${NUM_EN[a + b]}.`], 'Traduz, soma e traduz de volta.', { ph: 'em inglês' }); }, n: 1 },
    ],
  });

  /* ---------------- ARTE ---------------- */
  L({
    id: 'a1-art-1', ano: 1, materia: 'art', titulo: 'Cores primárias e secundárias', min: 15,
    resumo: 'Como as cores se misturam.',
    teoria: [
      T.h('Cores primárias'),
      T.p('Na pintura com tinta, as cores primárias são <strong>vermelho, amarelo e azul</strong>. Elas não podem ser feitas misturando outras cores.'),
      T.h('Cores secundárias'),
      T.tab(['Mistura', 'Resultado'], [['azul + amarelo', 'verde'], ['vermelho + amarelo', 'laranja'], ['vermelho + azul', 'roxo (violeta)']]),
      T.h('Cores quentes e frias'),
      T.p('<strong>Quentes</strong> lembram fogo e sol: vermelho, laranja, amarelo. <strong>Frias</strong> lembram água e gelo: azul, verde, roxo. Preto, branco e cinza são chamadas de <strong>neutras</strong>.'),
      T.resumo(['Primárias: vermelho, amarelo, azul.', 'Azul + amarelo = verde. Vermelho + amarelo = laranja. Vermelho + azul = roxo.', 'Quentes, frias e neutras.']),
    ],
    pratica: [{ pool: [
      Q.esc('Azul misturado com amarelo dá:', ['laranja', 'roxo', 'verde', 'marrom'], 2, ['Azul + amarelo = verde.'], 'Pensa na grama.'),
      Q.esc('Vermelho misturado com amarelo dá:', ['verde', 'laranja', 'roxo', 'rosa'], 1, ['Vermelho + amarelo = laranja.'], 'Pensa no fogo.'),
      Q.esc('Vermelho misturado com azul dá:', ['roxo', 'verde', 'laranja', 'amarelo'], 0, ['Vermelho + azul = roxo (violeta).'], 'Cor da uva.'),
      Q.esc('Qual destas é uma cor primária?', ['Verde', 'Laranja', 'Azul', 'Roxo'], 2, ['As primárias são vermelho, amarelo e azul.'], 'Não dá pra fazer misturando.'),
      Q.esc('Qual destas é uma cor fria?', ['Vermelho', 'Azul', 'Laranja', 'Amarelo'], 1, ['Azul lembra água: cor fria.'], 'Lembra água.'),
      Q.esc('Preto, branco e cinza são cores:', ['quentes', 'frias', 'neutras', 'primárias'], 2, ['São as cores neutras.'], 'Nem quentes nem frias.'),
      Q.num('Quantas são as cores primárias na pintura?', 3, ['Vermelho, amarelo e azul: 3.'], 'Conta: vermelho, amarelo...'),
    ], n: 7 }],
  });
})();
