/* Matemática — semanas 1 e 2 (lições 1 a 10). */
(function () {
  const { R, pick, shuf, n: N, rom } = AF;
  const L = (o) => AFA.mat.push(o);
  const G = { g: 1 }; // enunciado em destaque (conta pura)

  /* ---------- 1. ADIÇÃO ---------- */
  L({
    id: 'mat01', titulo: 'Adição', min: 35,
    resumo: 'Somar números de qualquer tamanho, de cabeça e na conta armada.',
    teoria: [
      T.h('O que é somar'),
      T.p('Somar é juntar quantidades. Se você tem 25 balas no carregador e pega mais 17, fica com 25 + 17. Os números que se somam se chamam <strong>parcelas</strong> e o resultado se chama <strong>soma</strong> ou <strong>total</strong>.'),
      T.h('Valor posicional: o segredo de toda conta'),
      T.p('Cada algarismo vale de acordo com a casa em que está. No número 347, o 7 está na casa das unidades e vale 7, o 4 está nas dezenas e vale 40, e o 3 está nas centenas e vale 300.'),
      T.conta('centenas  dezenas  unidades\n    3         4         7\n\n347 = 300 + 40 + 7'),
      T.p('Entender isso resolve metade dos erros: na soma, você junta unidade com unidade, dezena com dezena e centena com centena.'),
      T.h('Jeito 1: somar por partes, de cabeça'),
      T.p('Separa os números em dezenas e unidades, soma cada parte e depois junta.'),
      T.ex('48 + 35', ['Separa: 48 = 40 + 8 e 35 = 30 + 5.', 'Soma as dezenas: 40 + 30 = 70.', 'Soma as unidades: 8 + 5 = 13.', 'Junta tudo: 70 + 13 = 83.'], '83'),
      T.h('Jeito 2: conta armada'),
      T.p('Com números grandes, escreve um embaixo do outro, <strong>alinhando pela direita</strong> (unidade embaixo de unidade), e começa sempre pela casa das unidades.'),
      T.conta('    1 1\n    3 4 7\n  + 5 8 6\n  -------\n    9 3 3'),
      T.ex('347 + 586', ['Unidades: 7 + 6 = 13. O 13 tem 1 dezena e 3 unidades, então escreve o 3 e o 1 sobe pra casa das dezenas. Esse é o famoso "vai um".', 'Dezenas: 4 + 8 + 1 (o que subiu) = 13. Escreve 3 e sobe 1 pras centenas.', 'Centenas: 3 + 5 + 1 (o que subiu) = 9. Escreve 9.'], '933'),
      T.at('O erro mais comum é esquecer de somar o 1 que subiu. Sempre que fizer "vai um", escreve o 1 pequeno em cima da próxima casa.'),
      T.h('Somando três números ou mais'),
      T.p('Funciona igual. Às vezes a soma de uma casa passa de 19, e aí sobem 2. Exemplo: 8 + 9 + 7 = 24, escreve 4 e sobe 2.'),
      T.h('Truques de cálculo mental'),
      T.ul(['<strong>Arredondar e compensar:</strong> 199 + 46 = 200 + 46 − 1 = 245.', '<strong>Somar 9:</strong> soma 10 e tira 1. 57 + 9 = 67 − 1 = 66.', '<strong>A ordem não muda nada:</strong> 8 + 27 = 27 + 8. Começa pelo maior.', '<strong>Procura pares que dão 10:</strong> 6 + 7 + 4 + 3 = (6 + 4) + (7 + 3) = 20.']),
      T.h('Como conferir'),
      T.p('Faz a conta ao contrário: se 347 + 586 = 933, então 933 − 586 tem que dar 347. Na prova, conferir leva 10 segundos e salva questão.'),
      T.resumo(['Alinha pela direita: unidade embaixo de unidade.', 'Começa sempre pelas unidades.', 'Passou de 9? Escreve o último algarismo e sobe o resto.', 'Confere com a conta inversa.']),
    ],
    pratica: [
      { gen: () => { let a = R(11, 48), b = R(11, 48); while (a % 10 + b % 10 > 9) b = R(11, 48); return Q.num(`${a} + ${b}`, a + b, AF.passosSoma(a, b), 'Soma dezena com dezena e unidade com unidade.', G); }, n: 2 },
      { gen: () => { let a = R(15, 89), b = R(15, 89); while (a % 10 + b % 10 < 10) { a = R(15, 89); b = R(15, 89); } return Q.num(`${a} + ${b}`, a + b, AF.passosSoma(a, b), 'As unidades passam de 9: escreve o último algarismo e sobe 1.', G); }, n: 3 },
      { gen: () => { const a = R(120, 689), b = R(110, 399); return Q.num(`${a} + ${b}`, a + b, AF.passosSoma(a, b), 'Unidades, depois dezenas, depois centenas. Não esquece o que sobe.', G); }, n: 3 },
      { gen: () => { const a = R(1050, 4999), b = R(250, 3999); return Q.num(`${N(a)} + ${N(b)}`, a + b, AF.passosSoma(a, b), 'Arma a conta e vai casa por casa.', G); }, n: 1 },
      { gen: () => { const a = R(8, 30) * 100 + R(1, 9) * 10, b = R(5, 25) * 100 + R(1, 9) * 10; return Q.num(`Um avião tinha ${N(a)} litros de combustível e foi abastecido com mais ${N(b)} litros. Com quantos litros ficou?`, a + b, ['"Abastecido com mais" é juntar, então é soma.'].concat(AF.passosSoma(a, b)), 'Juntar quantidades é soma.', { u: 'litros' }); }, n: 1 },
    ],
    desafio: [
      Q.esc('Quanto é 2.345 + 1.678 + 977?', ['4.990', '5.000', '5.100', '4.900'], 1, ['2.345 + 1.678 = 4.023.', '4.023 + 977 = 5.000.', 'Atalho: 977 é quase 1.000. Então 4.023 + 1.000 = 5.023, e tira os 23 que sobraram: 5.000.'], 'Soma os dois primeiros e depois o terceiro.'),
      Q.num('Qual algarismo está faltando no quadradinho? 3□8 + 245 = 603', 5, ['Unidades: 8 + 5 = 13. Escreve 3 (bate com o 3 de 603) e sobe 1.', 'Dezenas: □ + 4 + 1 tem que terminar em 0, que é a dezena de 603. Então □ + 5 = 10, ou seja, □ = 5, e sobe 1.', 'Centenas: 3 + 2 + 1 = 6. Bate.', 'Confere: 358 + 245 = 603.'], 'Faz a conta casa por casa, começando pelas unidades.'),
    ],
  });

  /* ---------- 2. SUBTRAÇÃO ---------- */
  L({
    id: 'mat02', titulo: 'Subtração', min: 35,
    resumo: 'Tirar, achar a diferença e descobrir quanto falta, inclusive com empréstimo.',
    teoria: [
      T.h('O que é subtrair'),
      T.p('Subtrair é tirar uma quantidade de outra, descobrir a diferença entre dois números ou ver quanto falta pra chegar a um valor. Em 50 − 18 = 32, o 50 é de onde se tira, o 18 é o que se tira e o 32 é a <strong>diferença</strong>.'),
      T.h('Conta armada sem empréstimo'),
      T.ex('87 − 35', ['Arma a conta com o número maior em cima, alinhando pela direita.', 'Unidades: 7 − 5 = 2.', 'Dezenas: 8 − 3 = 5.'], '52'),
      T.h('Quando o de cima é menor: o empréstimo'),
      T.p('Em 72 − 38, nas unidades fica 2 − 8, e não dá. Então você pega 1 dezena emprestada da casa da esquerda. Uma dezena são 10 unidades, por isso o 2 vira 12 e o 7 das dezenas vira 6.'),
      T.conta('   6 12\n   7  2\n −  3  8\n  ------\n    3  4'),
      T.ex('72 − 38', ['Unidades: 2 é menor que 8, então pega 1 emprestado das dezenas. O 7 vira 6 e o 2 vira 12.', '12 − 8 = 4.', 'Dezenas: 6 − 3 = 3.'], '34'),
      T.h('Empréstimo com zero no meio'),
      T.p('Esse é o caso que mais derruba gente. Em 1.203 − 487, a unidade (3) é menor que 7, e a dezena é 0, que não tem nada pra emprestar. Então o empréstimo vem de mais longe, da centena.'),
      T.ex('1.203 − 487', ['Unidades: 3 é menor que 7. A dezena é 0, então pega emprestado da centena: o 2 vira 1, a dezena vira 10, empresta 1 pra unidade (fica 9) e o 3 vira 13.', '13 − 7 = 6.', 'Dezenas: 9 − 8 = 1.', 'Centenas: 1 é menor que 4. Pega 1 do milhar: o 1 do milhar vira 0 e a centena vira 11. 11 − 4 = 7.', 'Milhar: ficou 0, então não escreve nada.'], '716'),
      T.at('Nunca inverte a ordem dentro de uma casa. Se em cima é 2 e embaixo é 8, não pode fazer 8 − 2 só porque é mais fácil. Em cima menor que embaixo é sinal de empréstimo.'),
      T.h('De cabeça: dois truques'),
      T.ul(['<strong>Compensar:</strong> 82 − 29 = 82 − 30 + 1 = 53. Tirou 1 a mais, então devolve.', '<strong>Contar pra frente (quanto falta):</strong> 1.000 − 637. De 637 até 640 são 3, de 640 até 700 são 60, de 700 até 1.000 são 300. Total: 3 + 60 + 300 = 363.']),
      T.h('Prova real'),
      T.p('Toda subtração se confere com uma soma: <strong>resultado + o que tirou = número de cima</strong>. Se 72 − 38 = 34, então 34 + 38 tem que dar 72.'),
      T.resumo(['Maior em cima, alinhado pela direita.', 'Em cima menor que embaixo: pega 1 emprestado da casa da esquerda (vira +10).', 'Zero no meio não empresta: o empréstimo vem de mais longe e os zeros viram 9.', 'Confere somando.']),
    ],
    pratica: [
      { gen: () => { const a = R(35, 99); let b = R(11, a - 10); while (b % 10 > a % 10) b = R(11, a - 10); return Q.num(`${a} − ${b}`, a - b, AF.passosSub(a, b), 'Dezena menos dezena, unidade menos unidade.', G); }, n: 2 },
      { gen: () => { let a = R(31, 98), b = R(12, a - 5); let t = 0; while (b % 10 <= a % 10 && t++ < 50) { a = R(31, 98); b = R(12, a - 5); } return Q.num(`${a} − ${b}`, a - b, AF.passosSub(a, b), 'Em cima é menor que embaixo? Pega 1 emprestado da casa da esquerda.', G); }, n: 3 },
      { gen: () => { const a = R(400, 999), b = R(120, a - 60); return Q.num(`${a} − ${b}`, a - b, AF.passosSub(a, b), 'Vai casa por casa. Se precisar, empresta da esquerda.', G); }, n: 2 },
      { gen: () => { const a = pick([100, 200, 300, 500, 1000, 1200, 2000, 1005, 2003, 3004, 4002]); const b = R(Math.floor(a / 4), a - 7); return Q.num(`${N(a)} − ${N(b)}`, a - b, AF.passosSub(a, b), 'Tem zero em cima: o empréstimo vem de mais longe e os zeros do meio viram 9.', G); }, n: 2 },
      { gen: () => { const total = R(12, 40) * 100, gasto = R(3, total / 100 - 2) * 100 + R(1, 9) * 10; return Q.num(`Kauan juntou R$ ${N(total)} pra montar um PC e gastou R$ ${N(gasto)} na placa de vídeo. Quanto dinheiro sobrou?`, total - gasto, ['"Quanto sobrou" é tirar o que gastou do total: subtração.'].concat(AF.passosSub(total, gasto)), 'Sobrou = tinha − gastou.', { u: 'reais' }); }, n: 1 },
    ],
    desafio: [
      Q.num('Quanto falta de 1.784 para chegar a 5.000?', 3216, ['"Quanto falta" é a diferença: 5.000 − 1.784.', 'Contando pra frente: de 1.784 até 1.800 são 16; de 1.800 até 2.000 são 200; de 2.000 até 5.000 são 3.000.', '16 + 200 + 3.000 = 3.216.'], 'Conta pra frente em degraus: até a próxima centena, depois o próximo milhar.'),
      Q.num('Qual algarismo está faltando no quadradinho? 6□2 − 358 = 294', 5, ['Faz a prova real: o número de cima é 294 + 358.', '294 + 358 = 652.', 'Então o número é 652 e o algarismo que falta é 5.'], 'Use a prova real: resultado + o que tirou = número de cima.'),
    ],
  });

  /* ---------- 3. MULTIPLICAÇÃO ---------- */
  L({
    id: 'mat03', titulo: 'Multiplicação', min: 40,
    resumo: 'Tabuada com truques, multiplicação por partes e conta armada.',
    teoria: [
      T.h('O que é multiplicar'),
      T.p('Multiplicar é somar o mesmo número várias vezes. 4 × 3 = 3 + 3 + 3 + 3 = 12. Pensa em 4 caixas com 3 folhas cada: são 12 folhas. Os números multiplicados se chamam <strong>fatores</strong> e o resultado se chama <strong>produto</strong>.'),
      T.h('A tabuada sem decorar no desespero'),
      T.tab(['Tabuada', 'Truque', 'Exemplo'], [
        ['× 2', 'é o dobro', '8 × 2 = 8 + 8 = 16'],
        ['× 4', 'dobro do dobro', '7 × 4: 14, depois 28'],
        ['× 5', 'metade do × 10', '8 × 5: 80 ÷ 2 = 40'],
        ['× 6', '× 5 mais uma vez', '7 × 6 = 35 + 7 = 42'],
        ['× 9', '× 10 menos o número', '7 × 9 = 70 − 7 = 63'],
        ['× 10', 'coloca um zero', '13 × 10 = 130'],
        ['× 11', 'repete o algarismo (até 9)', '7 × 11 = 77'],
      ]),
      T.p('E a ordem não muda o resultado: 7 × 8 = 8 × 7. Isso quer dizer que, sabendo a tabuada do 2 ao 5, metade do resto você já sabe.'),
      T.h('Números maiores: quebra em partes'),
      T.p('Esse é o jeito mais seguro de fazer de cabeça. Separa o número grande pelo valor posicional, multiplica cada parte e soma.'),
      T.ex('36 × 7', ['Quebra o 36 em 30 + 6.', '30 × 7: faz 3 × 7 = 21 e coloca o zero. Dá 210.', '6 × 7 = 42.', 'Soma: 210 + 42 = 252.'], '252'),
      T.h('Conta armada'),
      T.conta('     4\n   3 6\n ×   7\n -----\n 2 5 2'),
      T.p('7 × 6 = 42: escreve 2 e sobe 4. Depois 7 × 3 = 21, mais o 4 que subiu, dá 25. Escreve 25. Resultado: 252.'),
      T.h('Dois algarismos vezes dois algarismos'),
      T.ex('23 × 14', ['Quebra o 14 em 10 + 4.', '23 × 10 = 230.', '23 × 4 = 92.', 'Soma: 230 + 92 = 322.'], '322'),
      T.h('Multiplicar por 10, 100 e 1.000'),
      T.p('Coloca um, dois ou três zeros no final: 45 × 10 = 450, 45 × 100 = 4.500, 45 × 1.000 = 45.000.'),
      T.at('Qualquer número vezes 0 dá 0. Qualquer número vezes 1 dá ele mesmo.'),
      T.resumo(['Multiplicar é somar repetido.', 'Use os truques: ×5 é metade do ×10, ×9 é ×10 menos o número.', 'Número grande? Quebra em partes e soma.', 'A ordem dos fatores não muda o produto.']),
    ],
    pratica: [
      { gen: () => { const a = R(2, 5), b = R(3, 10); return Q.num(`${a} × ${b}`, a * b, AF.passosTab(a, b), 'Soma o número repetido, ou usa o truque da tabuada.', G); }, n: 2 },
      { gen: () => { const a = R(6, 9), b = R(3, 9); return Q.num(`${b} × ${a}`, a * b, AF.passosTab(b, a), '×9 = ×10 menos o número. ×6 = ×5 mais uma vez.', G); }, n: 3 },
      { gen: () => { const a = R(12, 89), b = R(3, 9); return Q.num(`${a} × ${b}`, a * b, AF.passosMult(a, b), `Quebra o ${a} em dezena + unidade.`, G); }, n: 2 },
      { gen: () => { const a = R(3, 99), b = pick([10, 100, 1000]); return Q.num(`${a} × ${N(b)}`, a * b, [`× ${N(b)} é colocar ${String(b).length - 1} zero${b > 10 ? 's' : ''} no final do ${a}.`, `Resultado: ${N(a * b)}.`], 'Conta os zeros.', G); }, n: 1 },
      { gen: () => { const a = R(11, 25), b = R(11, 19); return Q.num(`${a} × ${b}`, a * b, AF.passosMult(a, b), 'Quebra o segundo número em dezena + unidade.', G); }, n: 1 },
      { gen: () => { const c = R(3, 9), p = R(12, 48); return Q.num(`Um lote tem ${c} caixas com ${p} peças cada. Quantas peças ao todo?`, c * p, ['Caixas iguais com a mesma quantidade: é multiplicação.'].concat(AF.passosMult(p, c)), 'Grupos iguais = multiplicação.', { u: 'peças' }); }, n: 1 },
    ],
    desafio: [
      Q.num('Uma esquadrilha tem 4 aviões. Cada avião tem 2 motores e cada motor tem 18 pás. Quantas pás ao todo?', 144, ['Motores: 4 aviões × 2 motores = 8 motores.', 'Pás: 8 motores × 18 pás.', '8 × 18 = 8 × 10 + 8 × 8 = 80 + 64 = 144.'], 'Primeiro descobre quantos motores são.'),
      Q.num('Calcule de cabeça: 25 × 48', 1200, ['Truque: 25 × 4 = 100.', '48 = 4 × 12, então 25 × 48 = 25 × 4 × 12.', '100 × 12 = 1.200.'], '25 × 4 dá 100. Quantas vezes o 4 cabe em 48?'),
    ],
  });

  /* ---------- 4. DIVISÃO ---------- */
  L({
    id: 'mat04', titulo: 'Divisão', min: 40,
    resumo: 'Repartir em partes iguais, divisão com resto e o método da chave.',
    teoria: [
      T.h('O que é dividir'),
      T.p('Dividir é repartir em partes iguais: 12 balas pra 3 pessoas dá 4 pra cada. Também é descobrir quantas vezes um número cabe no outro. Em 12 ÷ 3 = 4, o 12 é o <strong>dividendo</strong>, o 3 é o <strong>divisor</strong> e o 4 é o <strong>quociente</strong>. O que sobra, quando sobra, é o <strong>resto</strong>.'),
      T.h('A tabuada ao contrário'),
      T.p('Toda divisão simples é uma pergunta de tabuada. 56 ÷ 7 é perguntar: "7 vezes quanto dá 56?" A resposta é 8.'),
      T.h('Divisão com resto'),
      T.p('17 ÷ 5: o 5 cabe 3 vezes no 17 (5 × 3 = 15) e sobram 2. Então 17 ÷ 5 = 3, com resto 2. O resto é sempre menor que o divisor. Se sobrar mais que o divisor, é porque ainda cabe mais uma vez.'),
      T.h('Método da chave'),
      T.p('Pra números grandes, divide pedaço por pedaço, da esquerda pra direita.'),
      T.conta(' 8 4 | 3\n−6   +-----\n 2 4 | 2 8\n−2 4\n   0'),
      T.ex('84 ÷ 3', ['Pega o 8: o 3 cabe 2 vezes (2 × 3 = 6). Escreve 2 no resultado. Sobra 8 − 6 = 2.', 'Desce o 4 do lado do 2: fica 24.', '24 ÷ 3 = 8 (8 × 3 = 24). Escreve 8 no resultado. Sobra 0.'], '28'),
      T.ex('156 ÷ 4', ['O 1 sozinho é menor que 4, então pega 15.', '15 ÷ 4 = 3 (3 × 4 = 12). Sobra 3.', 'Desce o 6: fica 36. 36 ÷ 4 = 9. Sobra 0.'], '39'),
      T.h('Zero no meio do resultado'),
      T.ex('612 ÷ 6', ['6 ÷ 6 = 1. Sobra 0.', 'Desce o 1: fica 1. O 1 é menor que 6, então escreve 0 no resultado.', 'Desce o 2: fica 12. 12 ÷ 6 = 2.'], '102'),
      T.at('Quando o número que desceu é menor que o divisor, põe 0 no resultado e desce o próximo. Esquecer esse 0 é o erro mais comum (a pessoa responde 12 em vez de 102).'),
      T.h('Prova real'),
      T.p('<strong>quociente × divisor + resto = dividendo</strong>. Em 17 ÷ 5 = 3 com resto 2: 3 × 5 + 2 = 17. Bateu, tá certo.'),
      T.at('Não existe divisão por zero. Não tem como repartir alguma coisa em 0 partes.', 'Importante'),
      T.resumo(['Divisão é a tabuada ao contrário.', 'O resto é sempre menor que o divisor.', 'Método da chave: da esquerda pra direita, um pedaço por vez.', 'Desceu e não cabe? Põe 0 no resultado.', 'Confere com a prova real.']),
    ],
    pratica: [
      { gen: () => { const b = R(3, 9), q = R(3, 10); return Q.num(`${b * q} ÷ ${b}`, q, [`Pergunta de tabuada: ${b} vezes quanto dá ${b * q}?`, `${b} × ${q} = ${b * q}, então a resposta é ${q}.`], `${b} vezes quanto dá ${b * q}?`, G); }, n: 3 },
      { gen: () => { const b = R(2, 9), q = R(12, 99); return Q.num(`${b * q} ÷ ${b}`, q, AF.passosDiv(b * q, b), 'Método da chave: pega o primeiro pedaço que dá pra dividir.', G); }, n: 3 },
      { gen: () => { const b = R(2, 6), q = pick([102, 103, 104, 105, 106, 107, 108, 201, 204, 205, 301, 302, 306, 401, 405]); return Q.num(`${N(b * q)} ÷ ${b}`, q, AF.passosDiv(b * q, b), 'Cuidado com o zero no meio do resultado.', G); }, n: 1 },
      { gen: () => { const b = R(3, 9), q = R(3, 12), r = R(1, b - 1), a = b * q + r; return Q.num(`Qual é o resto da divisão de ${a} por ${b}?`, r, [`Quantas vezes o ${b} cabe em ${a}? ${b} × ${q} = ${b * q}, e ${b} × ${q + 1} = ${b * (q + 1)} já passa.`, `Então cabe ${q} vezes e sobra ${a} − ${b * q} = ${r}.`, `Prova real: ${q} × ${b} + ${r} = ${a}.`], 'O resto é o que sobra. Ele é menor que o divisor.'); }, n: 1 },
      { gen: () => { const b = R(3, 8), q = R(15, 60), tot = b * q; return Q.num(`Um prêmio de R$ ${N(tot)} vai ser dividido igualmente entre ${b} jogadores de um time. Quanto cada um recebe?`, q, ['Repartir igualmente é divisão.'].concat(AF.passosDiv(tot, b)), 'Repartir em partes iguais = divisão.', { u: 'reais' }); }, n: 1 },
    ],
    desafio: [
      Q.num('Um avião percorre 2.856 km em 4 horas, sempre na mesma velocidade. Quantos km ele percorre por hora?', 714, AF.passosDiv(2856, 4), 'Divide a distância pelo número de horas.', { u: 'km' }),
      Q.num('Divido um número por 7 e dá 23, com resto 5. Que número é esse?', 166, ['Usa a prova real: dividendo = quociente × divisor + resto.', '23 × 7 = 161.', '161 + 5 = 166.'], 'Quociente × divisor + resto = dividendo.'),
    ],
  });

  /* ---------- 5. EXPRESSÕES NUMÉRICAS ---------- */
  const e1 = () => { const a = R(2, 30), b = R(2, 9), c = R(2, 9); return Q.num(`${a} + ${b} × ${c}`, a + b * c, [`Primeiro a multiplicação: ${b} × ${c} = ${b * c}.`, `Depois a soma: ${a} + ${b * c} = ${a + b * c}.`], 'Multiplicação vem antes da soma.', G); };
  const e2 = () => { const c = R(2, 9), k = R(2, 9), b = c * k, a = R(k + 1, 40); return Q.num(`${a} − ${b} ÷ ${c}`, a - k, [`Primeiro a divisão: ${b} ÷ ${c} = ${k}.`, `Depois a subtração: ${a} − ${k} = ${a - k}.`], 'Divisão vem antes da subtração.', G); };
  const e3 = () => { const a = R(2, 15), b = R(2, 15), c = R(2, 6); return Q.num(`(${a} + ${b}) × ${c}`, (a + b) * c, [`Parênteses primeiro: ${a} + ${b} = ${a + b}.`, `Depois: ${a + b} × ${c} = ${(a + b) * c}.`], 'O que está entre parênteses vem primeiro.', G); };
  const e4 = () => { let a, b, c, d; do { a = R(3, 9); b = R(3, 9); c = R(2, 6); d = R(2, 6); } while (a * b <= c * d); return Q.num(`${a} × ${b} − ${c} × ${d}`, a * b - c * d, [`As duas multiplicações primeiro: ${a} × ${b} = ${a * b} e ${c} × ${d} = ${c * d}.`, `Depois: ${a * b} − ${c * d} = ${a * b - c * d}.`], 'Faz as duas multiplicações antes de subtrair.', G); };
  const e5 = () => {
    if (Math.random() < 0.5) { const a = R(15, 40), b = R(3, a - 2), c = R(2, 15); return Q.num(`${a} − ${b} + ${c}`, a - b + c, ['Soma e subtração têm a mesma prioridade: faz na ordem em que aparecem, da esquerda pra direita.', `${a} − ${b} = ${a - b}.`, `${a - b} + ${c} = ${a - b + c}.`], 'Mesma prioridade: da esquerda pra direita.', G); }
    const b = R(2, 6), k = R(2, 8), a = b * k, c = R(2, 5); return Q.num(`${a} ÷ ${b} × ${c}`, k * c, ['Divisão e multiplicação têm a mesma prioridade: faz na ordem em que aparecem.', `${a} ÷ ${b} = ${k}.`, `${k} × ${c} = ${k * c}.`], 'Mesma prioridade: da esquerda pra direita.', G);
  };
  const e6 = () => { const c = R(1, 6), d = R(1, 6), b = R(2, 4), inner = b * (c + d), e = R(1, inner - 1), br = inner - e, a = br + R(1, 30); return Q.num(`${a} − [${b} × (${c} + ${d}) − ${e}]`, a - br, [`Parênteses: ${c} + ${d} = ${c + d}.`, `Dentro dos colchetes, a multiplicação: ${b} × ${c + d} = ${inner}.`, `Ainda nos colchetes: ${inner} − ${e} = ${br}.`, `Por fim: ${a} − ${br} = ${a - br}.`], 'De dentro pra fora: parênteses, depois colchetes.', G); };
  L({
    id: 'mat05', titulo: 'Expressões numéricas', min: 35,
    resumo: 'A ordem certa das operações, com parênteses, colchetes e chaves.',
    teoria: [
      T.h('Por que existe uma ordem'),
      T.p('Quanto é 12 + 8 × 3? Se cada pessoa fizesse numa ordem diferente, daria resultados diferentes (60 ou 36). Por isso existe uma regra que todo mundo segue, e a prova da AFA cobra isso o tempo todo, inclusive dentro de questões maiores.'),
      T.h('A regra'),
      T.ol(['Primeiro o que está dentro de <strong>( ) parênteses</strong>, depois <strong>[ ] colchetes</strong>, depois <strong>{ } chaves</strong>. Sempre de dentro pra fora.', 'Depois as <strong>potências e raízes</strong> (você vai ver em outra lição).', 'Depois <strong>multiplicação e divisão</strong>, na ordem em que aparecem, da esquerda pra direita.', 'Por último, <strong>soma e subtração</strong>, também da esquerda pra direita.']),
      T.ex('12 + 8 × 3', ['Tem soma e multiplicação. A multiplicação vem primeiro: 8 × 3 = 24.', 'Depois a soma: 12 + 24 = 36.'], '36'),
      T.ex('(12 + 8) × 3', ['Agora os parênteses mandam: 12 + 8 = 20.', 'Depois: 20 × 3 = 60.'], '60'),
      T.ex('20 − 12 ÷ 4 × 2', ['Divisão e multiplicação têm a mesma prioridade: faz na ordem em que aparecem. 12 ÷ 4 = 3.', '3 × 2 = 6.', 'Por último a subtração: 20 − 6 = 14.'], '14'),
      T.ex('50 − [3 × (4 + 6) − 5]', ['Parênteses: 4 + 6 = 10.', 'Colchetes: 3 × 10 = 30, depois 30 − 5 = 25.', 'Fora: 50 − 25 = 25.'], '25'),
      T.at('Multiplicação não vem sempre antes da divisão. As duas têm a mesma prioridade: quem aparecer primeiro, da esquerda pra direita, é feita primeiro. Vale o mesmo pra soma e subtração: 10 − 4 + 2 = 8, e não 4.'),
      T.h('Aquela conta que viraliza'),
      T.p('6 ÷ 2 × 3 dá quanto? Pela regra, da esquerda pra direita: 6 ÷ 2 = 3, depois 3 × 3 = <strong>9</strong>. Quem responde 1 fez a multiplicação antes, e errou.'),
      T.resumo(['Parênteses, colchetes e chaves, de dentro pra fora.', 'Multiplicação e divisão antes de soma e subtração.', 'Mesma prioridade: da esquerda pra direita.', 'Faz uma etapa por vez e reescreve a expressão a cada passo.']),
    ],
    pratica: [{ gen: e1, n: 2 }, { gen: e2, n: 1 }, { gen: e3, n: 2 }, { gen: e4, n: 2 }, { gen: e5, n: 1 }, { gen: e6, n: 2 }],
    desafio: [
      Q.num('Calcule: { 2 × [ 15 − (3 + 2) × 2 ] + 4 } ÷ 2', 7, ['Parênteses: 3 + 2 = 5.', 'Colchetes: 5 × 2 = 10, depois 15 − 10 = 5.', 'Chaves: 2 × 5 = 10, depois 10 + 4 = 14.', 'Fora: 14 ÷ 2 = 7.'], 'De dentro pra fora, e dentro de cada um, × antes de −.', G),
      Q.esc('Qual destas expressões vale 20?', ['(4 + 4) × 4', '4 + 4 × 4', '4 × 4 − 4 ÷ 4', '4 + 4 + 4 ÷ 4'], 1, ['(4 + 4) × 4 = 8 × 4 = 32.', '4 + 4 × 4 = 4 + 16 = 20. Essa é a certa.', '4 × 4 − 4 ÷ 4 = 16 − 1 = 15.', '4 + 4 + 4 ÷ 4 = 4 + 4 + 1 = 9.'], 'Calcula cada uma respeitando a ordem.'),
    ],
  });

  /* ---------- 6. NÚMEROS ROMANOS ---------- */
  const lerRom = (x) => { const s = rom(x); const partes = AF.romPartes(s); return [`Separa em pedaços: ${partes.map(([l, v]) => `${l} = ${N(v)}`).join(', ')}.`, `Soma: ${partes.map(([, v]) => N(v)).join(' + ')} = ${N(x)}.`]; };
  const escRom = (x) => { const partes = AF.decompor(x); return [`Separa ${N(x)} pelo valor posicional: ${partes.map(N).join(' + ')}.`, `Escreve cada parte: ${partes.map((v) => `${N(v)} = ${rom(v)}`).join(', ')}.`, `Junta: ${rom(x)}.`]; };
  L({
    id: 'mat06', titulo: 'Números romanos', min: 25,
    resumo: 'Ler e escrever números com I, V, X, L, C, D e M.',
    teoria: [
      T.h('Onde aparecem'),
      T.p('Em séculos (século XXI), capítulos de livro, relógios, nomes de reis e papas (Dom Pedro II) e às vezes em questões de prova. São só sete letras.'),
      T.tab(['Letra', 'I', 'V', 'X', 'L', 'C', 'D', 'M'], [['Vale', '1', '5', '10', '50', '100', '500', '1.000']]),
      T.h('Regra 1: menor ou igual à direita, soma'),
      T.p('VI = 5 + 1 = 6. XII = 10 + 1 + 1 = 12. LX = 50 + 10 = 60. MC = 1.000 + 100 = 1.100.'),
      T.h('Regra 2: menor à esquerda, subtrai'),
      T.p('IV = 5 − 1 = 4. IX = 10 − 1 = 9. XL = 50 − 10 = 40. XC = 90. CD = 400. CM = 900.'),
      T.at('Só podem ficar à esquerda pra subtrair: <strong>I</strong> (antes de V e X), <strong>X</strong> (antes de L e C) e <strong>C</strong> (antes de D e M). Por isso 99 não é IC, é XCIX (90 + 9).'),
      T.h('Regra 3: repetir no máximo 3 vezes'),
      T.p('I, X, C e M podem se repetir até três vezes: III = 3, XXX = 30, CCC = 300. Por isso 4 é IV, e não IIII. V, L e D nunca se repetem.'),
      T.h('Como escrever qualquer número'),
      T.p('Separa o número pelo valor posicional e escreve cada parte.'),
      T.ex('Escrever 2.026', ['Separa: 2.000 + 20 + 6.', '2.000 = MM, 20 = XX, 6 = VI.', 'Junta: MMXXVI.'], 'MMXXVI'),
      T.ex('Ler CMXCIV', ['Separa em pedaços: CM, XC, IV.', 'CM = 900, XC = 90, IV = 4.', 'Soma: 900 + 90 + 4 = 994.'], '994'),
      T.resumo(['I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1.000.', 'Menor à direita soma, menor à esquerda subtrai.', 'Repete no máximo 3 vezes.', 'Pra escrever, separa pelo valor posicional.']),
    ],
    pratica: [
      { gen: () => { const x = R(1, 20); return Q.num(`Quanto vale ${rom(x)}?`, x, lerRom(x), 'Menor antes subtrai, menor depois soma.'); }, n: 3 },
      { gen: () => { const x = R(21, 100); return Q.num(`Quanto vale ${rom(x)}?`, x, lerRom(x), 'Lê em pedaços: dezenas primeiro (X, L, XL, XC), depois as unidades.'); }, n: 2 },
      { gen: () => { const x = R(4, 49); return Q.txt(`Escreva ${x} em números romanos.`, rom(x), escRom(x), 'Separa em dezenas e unidades e escreve cada parte.', { ph: 'Ex.: XIV', up: 1 }); }, n: 3 },
      { gen: () => { const x = pick([R(101, 399), R(400, 999), R(1000, 2030)]); return Q.num(`Quanto vale ${rom(x)}?`, x, lerRom(x), 'C = 100, D = 500, M = 1.000. Separa por blocos.'); }, n: 2 },
    ],
    desafio: [
      Q.num('Quanto é XLIV + XVI? Responda em número.', 60, ['XLIV = XL + IV = 40 + 4 = 44.', 'XVI = 10 + 5 + 1 = 16.', '44 + 16 = 60.'], 'Converte os dois e soma.'),
      Q.txt('Escreva o ano 1999 em números romanos.', 'MCMXCIX', ['1.999 = 1.000 + 900 + 90 + 9.', '1.000 = M, 900 = CM, 90 = XC, 9 = IX.', 'Junta: MCMXCIX.'], 'Separa em 1.000 + 900 + 90 + 9.', { ph: 'Ex.: MMXX', up: 1 }),
    ],
  });

  /* ---------- 7. NÚMEROS INTEIROS ---------- */
  const somaSinais = (x, y) => {
    const r = x + y;
    if ((x < 0) === (y < 0)) return [`Os dois têm o mesmo sinal (${x < 0 ? 'negativos' : 'positivos'}): soma ${Math.abs(x)} + ${Math.abs(y)} = ${Math.abs(x) + Math.abs(y)} e mantém o sinal.`, `Resultado: ${N(r)}.`];
    if (Math.abs(x) === Math.abs(y)) return ['Valores iguais com sinais diferentes se anulam.', 'Resultado: 0.'];
    const ganha = Math.abs(x) > Math.abs(y) ? x : y;
    return [`Sinais diferentes: faz o maior menos o menor, ${Math.max(Math.abs(x), Math.abs(y))} − ${Math.min(Math.abs(x), Math.abs(y))} = ${Math.abs(Math.abs(x) - Math.abs(y))}.`, `Fica o sinal do número "mais forte" (o de maior valor sem sinal), que é o ${N(ganha)}.`, `Resultado: ${N(r)}.`];
  };
  const intSoma = () => {
    let a = R(-15, 15); if (a === 0) a = -7;
    const b = R(1, 15), f = R(0, 3);
    let q, x = a, y, pre = [];
    if (f === 0) { q = `${N(a)} + ${b}`; y = b; }
    if (f === 1) { q = `${N(a)} − ${b}`; y = -b; }
    if (f === 2) { q = `${N(a)} + (${N(-b)})`; y = -b; pre = [`Mais com menos vira menos: ${N(a)} + (${N(-b)}) = ${N(a)} − ${b}.`]; }
    if (f === 3) { q = `${N(a)} − (${N(-b)})`; y = b; pre = [`Menos com menos vira mais: ${N(a)} − (${N(-b)}) = ${N(a)} + ${b}.`]; }
    return Q.num(q, x + y, pre.concat(somaSinais(x, y)), 'Pensa num termômetro: somar sobe, subtrair desce.', { g: 1, neg: 1 });
  };
  const intMult = () => {
    let a = R(2, 9) * pick([-1, 1]), b = R(2, 9) * pick([-1, 1]);
    if (a > 0 && b > 0) a = -a;
    const div = Math.random() < 0.4;
    const regra = (a < 0) === (b < 0) ? 'Sinais iguais: o resultado é positivo.' : 'Sinais diferentes: o resultado é negativo.';
    if (div) { const k = a * b; const rd = (k < 0) === (b < 0) ? 'Sinais iguais: o resultado é positivo.' : 'Sinais diferentes: o resultado é negativo.'; return Q.num(`(${N(k)}) ÷ (${N(b)})`, a, [rd, `Sem os sinais: ${Math.abs(k)} ÷ ${Math.abs(b)} = ${Math.abs(a)}.`, `Resultado: ${N(a)}.`], 'Regra de sinais: iguais dá +, diferentes dá −.', { g: 1, neg: 1 }); }
    return Q.num(`(${N(a)}) × (${N(b)})`, a * b, [regra, `Sem os sinais: ${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(a * b)}.`, `Resultado: ${N(a * b)}.`], 'Regra de sinais: iguais dá +, diferentes dá −.', { g: 1, neg: 1 });
  };
  const intComp = () => {
    const set = new Set();
    while (set.size < 4) set.add(R(-20, 6));
    const o = shuf([...set]);
    const mx = Math.max(...o);
    return Q.esc('Qual destes números é o maior?', o.map(N), o.indexOf(mx), ['Na reta numérica, quanto mais pra direita, maior o número.', 'Entre os negativos, o maior é o que está mais perto do zero: −2 é maior que −10.', `Por isso o maior é ${N(mx)}.`], 'Imagina a reta numérica: quem está mais à direita?');
  };
  const intProb = () => {
    if (Math.random() < 0.5) { const t0 = -R(2, 12), s = R(3, 18); return Q.num(`Às 5h a temperatura era ${N(t0)} °C. Até o meio-dia ela subiu ${s} °C. Qual a temperatura ao meio-dia?`, t0 + s, [`Subir é somar: ${N(t0)} + ${s}.`].concat(somaSinais(t0, s)), 'Subir = somar.', { u: '°C', neg: 1 }); }
    const t0 = R(2, 10), c = R(t0 + 1, t0 + 12); return Q.num(`À noite a temperatura era ${t0} °C e caiu ${c} °C durante a madrugada. Qual a temperatura no fim da madrugada?`, t0 - c, [`Cair é subtrair: ${t0} − ${c}.`, `Passou do zero: ${t0} − ${c} = ${N(t0 - c)}.`], 'Cair = subtrair. Pode passar do zero.', { u: '°C', neg: 1 });
  };
  L({
    id: 'mat07', titulo: 'Números inteiros', min: 40,
    resumo: 'Números negativos, reta numérica e a regra de sinais.',
    teoria: [
      T.h('Pra que servem os negativos'),
      T.p('Eles aparecem em temperatura (−5 °C), saldo bancário no vermelho, andares de garagem (subsolo −1) e altitude abaixo do nível do mar. O conjunto dos números inteiros é ..., −3, −2, −1, 0, 1, 2, 3, ...'),
      T.h('A reta numérica'),
      T.conta('−5  −4  −3  −2  −1   0   1   2   3   4   5\n◄──┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───►'),
      T.p('Quanto mais pra direita, maior. Por isso <strong>−2 é maior que −10</strong>: está mais perto do zero (dever 2 reais é melhor que dever 10). O valor do número sem o sinal se chama <strong>módulo</strong>: o módulo de −7 é 7.'),
      T.h('Somar e subtrair'),
      T.p('Primeiro, transforma tudo em soma de números com sinal. Depois usa uma destas duas regras:'),
      T.tab(['Situação', 'O que fazer', 'Exemplo'], [
        ['Sinais iguais', 'soma os módulos e mantém o sinal', '−4 − 6 = −10'],
        ['Sinais diferentes', 'subtrai os módulos e fica o sinal do maior módulo', '−5 + 8 = 3'],
      ]),
      T.ex('7 − 12', ['É 7 + (−12): sinais diferentes.', '12 − 7 = 5.', 'O 12 é o maior, e ele é negativo, então fica negativo.'], '−5'),
      T.h('Sinais colados: menos com menos'),
      T.tab(['Escrito', 'Vira'], [['+ (+3)', '+ 3'], ['+ (−3)', '− 3'], ['− (+3)', '− 3'], ['− (−3)', '+ 3']]),
      T.p('Exemplo: 3 − (−4) = 3 + 4 = 7. Tirar uma dívida é o mesmo que ganhar.'),
      T.h('Multiplicar e dividir: regra de sinais'),
      T.tab(['Sinais', 'Resultado', 'Exemplo'], [['iguais (+ com + ou − com −)', 'positivo', '(−6) × (−3) = 18'], ['diferentes (+ com −)', 'negativo', '(−20) ÷ 4 = −5']]),
      T.at('A regra de sinais (iguais dá +) é só pra multiplicação e divisão. Na soma, −3 − 5 não dá +8: são duas dívidas, dá −8.'),
      T.resumo(['Na reta, mais à direita é maior. −2 > −10.', 'Soma: sinais iguais soma e mantém; diferentes subtrai e fica o sinal do maior.', 'Menos com menos vira mais: − (−3) = + 3.', 'Multiplicação e divisão: sinais iguais dá +, diferentes dá −.']),
    ],
    pratica: [{ gen: intComp, n: 1 }, { gen: intSoma, n: 4 }, { gen: intMult, n: 3 }, { gen: intProb, n: 2 }],
    desafio: [
      Q.num('Calcule: (−2) × (−3) × (−5) + 40 ÷ (−8)', -35, ['(−2) × (−3) = 6 (sinais iguais).', '6 × (−5) = −30 (sinais diferentes).', '40 ÷ (−8) = −5.', '−30 + (−5) = −30 − 5 = −35.'], 'Faz as multiplicações e a divisão primeiro, uma de cada vez.', { g: 1, neg: 1 }),
      Q.num('A temperatura era −4 °C às 6h e subiu 3 °C por hora. Qual era a temperatura às 11h?', 11, ['De 6h até 11h são 5 horas.', 'Subiu 5 × 3 = 15 °C.', '−4 + 15 = 11.'], 'Primeiro descobre quantas horas se passaram.', { u: '°C', neg: 1 }),
    ],
  });

  /* ---------- 8. MÚLTIPLOS, DIVISORES E PRIMOS ---------- */
  const fatorar = (x) => { const f = []; let n = x, p = 2; while (n > 1) { if (n % p === 0) { f.push(p); n /= p; } else p++; } return f; };
  const potencias = (f) => { const m = {}; f.forEach((p) => (m[p] = (m[p] || 0) + 1)); return m; };
  const escreveFat = (m) => Object.keys(m).map((p) => (m[p] > 1 ? `${p}${AF.sup(m[p])}` : p)).join(' × ');
  const passosFat = (x) => { const f = fatorar(x); let n = x; const linhas = f.map((p) => { const l = `${n} ÷ ${p} = ${n / p}`; n /= p; return l; }); return [`Divide sempre pelo menor primo possível: ${linhas.join('; ')}.`, `Então ${x} = ${f.join(' × ')} = ${escreveFat(potencias(f))}.`]; };
  const PRIMOS = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
  const PARECEM = [21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91, 93, 111, 119, 121];
  const REGRA = { 2: 'é par, ou seja, termina em 0, 2, 4, 6 ou 8', 3: 'tem a soma dos algarismos divisível por 3', 4: 'tem os dois últimos algarismos formando um número divisível por 4', 5: 'termina em 0 ou 5', 9: 'tem a soma dos algarismos divisível por 9', 10: 'termina em 0' };
  L({
    id: 'mat08', titulo: 'Múltiplos, divisores e primos', min: 40,
    resumo: 'Critérios de divisibilidade, números primos e fatoração.',
    teoria: [
      T.h('Múltiplos e divisores'),
      T.p('Os <strong>múltiplos</strong> de um número são os resultados da tabuada dele: múltiplos de 6 são 0, 6, 12, 18, 24... Os <strong>divisores</strong> são os números que dividem ele sem sobrar nada: os divisores de 12 são 1, 2, 3, 4, 6 e 12.'),
      T.p('Uma coisa leva à outra: se 12 é múltiplo de 4, então 4 é divisor de 12.'),
      T.h('Critérios de divisibilidade'),
      T.p('São atalhos pra saber se uma divisão vai dar exata sem fazer a conta.'),
      T.tab(['Divisível por', 'Quando', 'Exemplo'], [
        ['2', 'é par', '348'],
        ['3', 'a soma dos algarismos é divisível por 3', '471: 4 + 7 + 1 = 12'],
        ['4', 'os dois últimos algarismos formam número divisível por 4', '1.316: 16 ÷ 4 = 4'],
        ['5', 'termina em 0 ou 5', '935'],
        ['6', 'é divisível por 2 e por 3 ao mesmo tempo', '582'],
        ['9', 'a soma dos algarismos é divisível por 9', '729: 7 + 2 + 9 = 18'],
        ['10', 'termina em 0', '1.240'],
      ]),
      T.h('Números primos'),
      T.p('Um número é <strong>primo</strong> quando tem exatamente dois divisores: o 1 e ele mesmo. Os primeiros são 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31...'),
      T.at('O 1 não é primo (tem só um divisor). O 2 é o único primo par. E cuidado com os que "parecem" primos: 51 = 3 × 17, 91 = 7 × 13, 57 = 3 × 19.'),
      T.p('Pra testar se um número é primo, tenta dividir por 2, 3, 5, 7, 11... Se nenhuma divisão der exata até chegar perto da raiz quadrada dele, é primo.'),
      T.h('Fatoração em primos'),
      T.p('Todo número que não é primo pode ser escrito como multiplicação de primos. Divide sempre pelo menor primo possível até chegar em 1.'),
      T.conta('60 | 2\n30 | 2\n15 | 3\n 5 | 5\n 1 |\n\n60 = 2 × 2 × 3 × 5 = 2² × 3 × 5'),
      T.resumo(['Múltiplo é a tabuada; divisor divide sem sobrar.', 'Decora os critérios do 2, 3, 5, 9 e 10.', 'Primo tem exatamente dois divisores. O 1 não é primo.', 'Fatoração: divide pelo menor primo até chegar em 1.']),
    ],
    pratica: [
      { gen: () => { const k = pick([2, 3, 4, 5, 9, 10]); const ok = k * R(Math.ceil(100 / k), Math.floor(999 / k)); const s = new Set([ok]); while (s.size < 4) { const x = R(100, 999); if (x % k) s.add(x); } const o = shuf([...s]); const pas = [`Um número é divisível por ${k} quando ${REGRA[k]}.`]; if (k === 3 || k === 9) { const d = [...String(ok)].map(Number); pas.push(`${ok}: ${d.join(' + ')} = ${d.reduce((a, b) => a + b)}, que é divisível por ${k}.`); } if (k === 4) pas.push(`${ok}: os dois últimos algarismos formam ${String(ok).slice(-2)}, que é divisível por 4.`); pas.push(`Confere: ${ok} ÷ ${k} = ${ok / k}.`); return Q.esc(`Qual destes números é divisível por ${k}?`, o.map(String), o.indexOf(ok), pas, `Usa o critério de divisibilidade por ${k}.`); }, n: 3 },
      { gen: () => { const p = pick(PRIMOS); const ds = shuf(PARECEM).slice(0, 3); const o = shuf([p, ...ds]); const mf = (x) => fatorar(x)[0]; return Q.esc('Qual destes números é primo?', o.map(String), o.indexOf(p), [`${p} é primo: só é divisível por 1 e por ele mesmo.`].concat(ds.map((x) => `${x} não é primo, porque ${x} = ${mf(x)} × ${x / mf(x)}.`)), 'Testa dividir por 3 e por 7. Muitos "falsos primos" caem aí.'); }, n: 2 },
      { gen: () => { const x = pick([12, 18, 20, 28, 36, 40, 45, 50, 60, 63, 72, 75, 84, 90, 98, 100, 120, 150, 180]); const m = potencias(fatorar(x)); const ps = Object.keys(m).map(Number); const esc = ps[ps.length - 1]; const valor = esc ** m[esc]; const resto = { ...m }; delete resto[esc]; return Q.num(`Complete a fatoração: ${x} = ${escreveFat(resto)} × ?`, valor, passosFat(x).concat([`O que falta é ${m[esc] > 1 ? `${esc}${AF.sup(m[esc])} = ${valor}` : valor}.`]), 'Divide pelo menor primo até chegar em 1.'); }, n: 2 },
      { gen: () => { const x = pick([6, 8, 10, 12, 14, 15, 16, 18, 20, 21, 24, 28, 30, 36]); const d = AF.divisores(x); return Q.num(`Quantos divisores tem o número ${x}?`, d.length, [`Testa os números de 1 até ${x} e anota os que dividem sem sobrar.`, `Divisores de ${x}: ${d.join(', ')}.`, `São ${d.length} divisores.`], 'Procura os pares: 1 × ?, 2 × ?, 3 × ?...'); }, n: 1 },
      { gen: () => { const k = R(6, 13), M = pick([50, 60, 80, 100, 120]); const r = Math.floor((M - 1) / k) * k; return Q.num(`Qual é o maior múltiplo de ${k} que é menor que ${M}?`, r, [`${M} ÷ ${k} dá ${Math.floor(M / k)}${M % k ? `, com resto ${M % k}` : ' exato'}.`, `${M % k ? `Então o maior múltiplo abaixo de ${M} é ${k} × ${Math.floor(M / k)} = ${r}.` : `Como ${M} é múltiplo de ${k}, o anterior é ${k} × ${M / k - 1} = ${r}.`}`], `Divide ${M} por ${k} e olha o resultado.`); }, n: 1 },
      Q.esc('O número 1 é primo?', ['Sim, porque só é divisível por ele mesmo', 'Não, porque um primo precisa ter exatamente dois divisores', 'Sim, é o menor número primo', 'Só quando é negativo'], 1, ['Primo é quem tem exatamente dois divisores: o 1 e ele mesmo.', 'O 1 tem só um divisor (ele mesmo), então não é primo.', 'O menor primo é o 2.'], 'Lembra da definição: exatamente dois divisores.'),
    ],
    desafio: [
      Q.num('Qual é o menor número de três algarismos que é divisível por 2, por 3 e por 5 ao mesmo tempo?', 120, ['Divisível por 2, 3 e 5 ao mesmo tempo é o mesmo que ser divisível por 2 × 3 × 5 = 30.', 'Múltiplos de 30: 30, 60, 90, 120...', 'O primeiro com três algarismos é 120.'], 'Se é divisível pelos três, é divisível pelo produto deles.'),
      Q.num('Quantos números primos existem entre 20 e 40?', 4, ['Testa os ímpares (pares maiores que 2 não são primos): 21, 23, 25, 27, 29, 31, 33, 35, 37, 39.', '21 = 3 × 7, 25 = 5 × 5, 27 = 3 × 9, 33 = 3 × 11, 35 = 5 × 7, 39 = 3 × 13.', 'Sobram 23, 29, 31 e 37. São 4.'], 'Só testa os ímpares e elimina os divisíveis por 3, 5 e 7.'),
    ],
  });

  /* ---------- 9. MMC E MDC ---------- */
  const mmcPassos = (a, b) => { const t = AF.tabelaMMC([a, b]); const lista = (x) => { const v = []; for (let m = x; m <= t.mmc; m += x) v.push(m); return v.join(', '); }; return { r: t.mmc, p: [`Múltiplos de ${a}: ${lista(a)}...`, `Múltiplos de ${b}: ${lista(b)}...`, `O primeiro que aparece nas duas listas é ${t.mmc}.`, `Pela fatoração simultânea, dá o mesmo:${t.conta}MMC = ${t.fat.join(' × ')} = ${t.mmc}.`] }; };
  const mdcPassos = (a, b) => { const da = AF.divisores(a), db = AF.divisores(b), c = da.filter((x) => db.includes(x)); const r = Math.max(...c); return { r, p: [`Divisores de ${a}: ${da.join(', ')}.`, `Divisores de ${b}: ${db.join(', ')}.`, `Em comum: ${c.join(', ')}.`, `O maior é ${r}.`] }; };
  const PARES_MMC = [[4, 6], [6, 8], [6, 9], [8, 12], [10, 15], [12, 18], [9, 12], [4, 10], [15, 20], [12, 16], [6, 10], [8, 10], [14, 21], [9, 15], [12, 20]];
  const PARES_MDC = [[12, 18], [16, 24], [20, 30], [18, 27], [24, 36], [30, 45], [14, 21], [28, 42], [36, 48], [40, 60], [15, 25], [32, 48]];
  L({
    id: 'mat09', titulo: 'MMC e MDC', min: 40,
    resumo: 'Mínimo múltiplo comum e máximo divisor comum, e como saber qual usar.',
    teoria: [
      T.h('MMC: quando as coisas se encontram de novo'),
      T.p('O <strong>mínimo múltiplo comum</strong> é o menor número que é múltiplo de todos ao mesmo tempo. Ele resolve problemas de coisas que se repetem e se encontram.'),
      T.ex('Dois aviões decolam juntos de uma base. Um volta a cada 12 minutos e o outro a cada 18. Depois de quanto tempo os dois estão juntos na base de novo?', ['Múltiplos de 12: 12, 24, 36, 48...', 'Múltiplos de 18: 18, 36, 54...', 'O primeiro em comum é 36.'], '36 minutos'),
      T.h('Fatoração simultânea'),
      T.p('Com números maiores, listar fica cansativo. Divide os números juntos pelos primos (2, 3, 5...) enquanto pelo menos um deles for divisível. O número que não dá pra dividir só desce igual.'),
      T.conta('12, 18 | 2\n 6,  9 | 2\n 3,  9 | 3\n 1,  3 | 3\n 1,  1 |\n\nMMC = 2 × 2 × 3 × 3 = 36'),
      T.h('MDC: dividir em partes iguais, o maior possível'),
      T.p('O <strong>máximo divisor comum</strong> é o maior número que divide todos sem sobrar.'),
      T.ex('Tenho duas cordas, uma de 24 m e outra de 36 m. Quero cortar em pedaços iguais, do maior tamanho possível, sem sobrar nada. Qual o tamanho de cada pedaço?', ['Divisores de 24: 1, 2, 3, 4, 6, 8, 12, 24.', 'Divisores de 36: 1, 2, 3, 4, 6, 9, 12, 18, 36.', 'Em comum: 1, 2, 3, 4, 6, 12. O maior é 12.'], '12 m (sendo 2 pedaços de uma corda e 3 da outra)'),
      T.h('Como saber qual usar'),
      T.tab(['Se o problema fala de...', 'Usa'], [['encontrar de novo, coincidir, próxima vez juntos', 'MMC'], ['dividir em partes iguais, o maior tamanho possível, sem sobrar', 'MDC']]),
      T.dica('O MMC é sempre maior ou igual ao maior dos números. O MDC é sempre menor ou igual ao menor. Se a sua resposta fugir disso, tem erro.'),
      T.p('Curiosidade que ajuda a conferir: pra dois números, MMC × MDC = um número × o outro. Com 12 e 18: 36 × 6 = 216, e 12 × 18 = 216.'),
      T.resumo(['MMC: menor múltiplo em comum. Problemas de "encontrar de novo".', 'MDC: maior divisor em comum. Problemas de "dividir em partes iguais, o maior possível".', 'MMC pela fatoração simultânea; MDC listando divisores.']),
    ],
    pratica: [
      { gen: () => { const [a, b] = pick(PARES_MMC); const m = mmcPassos(a, b); return Q.num(`Qual é o MMC de ${a} e ${b}?`, m.r, m.p, 'Lista os múltiplos do maior e vê qual é divisível pelo menor.'); }, n: 3 },
      { gen: () => { const [a, b] = pick(PARES_MDC); const m = mdcPassos(a, b); return Q.num(`Qual é o MDC de ${a} e ${b}?`, m.r, m.p, 'Lista os divisores dos dois e pega o maior em comum.'); }, n: 3 },
      { gen: () => { const [a, b] = pick(PARES_MMC); const m = mmcPassos(a, b); const ctx = pick([`Um remédio é tomado a cada ${a} horas e outro a cada ${b} horas. Se a pessoa tomou os dois juntos agora, daqui a quantas horas vai tomar os dois juntos de novo?`, `Dois ônibus saem juntos do terminal. Um sai a cada ${a} minutos e o outro a cada ${b}. Depois de quantos minutos saem juntos de novo?`]); return Q.num(ctx, m.r, ['"Juntos de novo" é MMC.'].concat(m.p), 'Encontrar de novo = MMC.'); }, n: 1 },
      { gen: () => { const [a, b] = pick(PARES_MDC); const m = mdcPassos(a, b); return Q.num(`Uma loja tem ${a} camisetas pretas e ${b} brancas. Quer montar kits iguais, com o maior número possível de kits, todos com a mesma quantidade de cada cor e sem sobrar nada. Quantos kits?`, m.r, ['Dividir em partes iguais, o maior número possível, sem sobrar: MDC.'].concat(m.p), 'Partes iguais sem sobrar = MDC.', { u: 'kits' }); }, n: 1 },
      { pool: [
        Q.esc('Duas luzes piscam juntas: uma a cada 8 segundos e outra a cada 12. Pra saber quando vão piscar juntas de novo, você calcula:', ['O MMC de 8 e 12', 'O MDC de 8 e 12', '8 × 12', '8 + 12'], 0, ['"Juntas de novo" é um encontro: MMC.', 'MMC(8, 12) = 24 segundos.'], 'Encontro = MMC.'),
        Q.esc('Quero cortar duas tábuas de 30 cm e 45 cm em pedaços iguais, do maior tamanho possível, sem sobrar. Você calcula:', ['O MMC de 30 e 45', 'O MDC de 30 e 45', '30 × 45', '45 − 30'], 1, ['Dividir em pedaços iguais, o maior possível: MDC.', 'MDC(30, 45) = 15 cm.'], 'Dividir igual, o maior possível = MDC.'),
      ], n: 1 },
      { gen: () => { const tri = pick([[4, 6, 10], [2, 3, 5], [3, 4, 6], [6, 8, 12], [4, 5, 6], [2, 6, 9]]); const t = AF.tabelaMMC(tri); return Q.num(`Qual é o MMC de ${tri.join(', ')}?`, t.mmc, [`Fatoração simultânea dos três juntos:${t.conta}`, `MMC = ${t.fat.join(' × ')} = ${t.mmc}.`], 'Divide os três juntos pelos primos.'); }, n: 1 },
    ],
    desafio: [
      Q.num('Três luzes piscam a cada 4, 6 e 10 segundos. Elas piscaram juntas agora. Daqui a quantos segundos vão piscar juntas de novo?', 60, ['"Juntas de novo" é MMC de 4, 6 e 10.', 'Fatorando: 4 = 2², 6 = 2 × 3, 10 = 2 × 5.', 'MMC = 2² × 3 × 5 = 60.'], 'MMC dos três números.', { u: 'segundos' }),
      Q.num('Tenho 48 balas de menta e 72 de morango. Quero colocar em pacotes, sem misturar sabores, com a mesma quantidade de balas em todos e a maior quantidade possível por pacote. Quantas balas vão em cada pacote?', 24, ['Mesma quantidade em todos, a maior possível: MDC(48, 72).', 'Divisores de 48: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48.', 'Divisores de 72: 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72.', 'O maior em comum é 24 (dá 2 pacotes de menta e 3 de morango).'], 'Maior quantidade possível, dividindo igual = MDC.', { u: 'balas' }),
    ],
  });

  /* ---------- 10. FRAÇÕES I ---------- */
  const fq = () => { const d = pick([2, 3, 4, 5, 6, 8, 10]), nn = R(1, d - 1), k = R(2, 12), tot = d * k; return Q.num(`Quanto é ${nn}/${d} de ${tot}?`, nn * k, [`Divide o total pelo de baixo: ${tot} ÷ ${d} = ${k}. Isso é 1/${d}.`, `Multiplica pelo de cima: ${k} × ${nn} = ${nn * k}.`], `Divide ${tot} por ${d} e multiplica por ${nn}.`); };
  const fs = () => { let a, b; do { a = R(1, 7); b = R(a + 1, 12); } while (AF.gcd(a, b) !== 1); const k = R(2, 8); return Q.num(`Simplifique ${a * k}/${b * k} até a forma irredutível.`, a / b, [`Procura um número que divide os dois. O maior é o MDC(${a * k}, ${b * k}) = ${k}.`, `${a * k} ÷ ${k} = ${a} e ${b * k} ÷ ${k} = ${b}.`, `Fica ${a}/${b}, que não dá mais pra simplificar.`], 'Divide em cima e embaixo pelo mesmo número.', { fr: 1, irr: 1, rTxt: `${a}/${b}`, ph: 'Ex.: 3/4' }); };
  const fe = () => { const b = R(2, 9); let a = R(1, b - 1); const k = R(2, 6); return Q.num(`Complete a fração equivalente: ${a}/${b} = ?/${b * k}`, a * k, [`O de baixo foi de ${b} pra ${b * k}: foi multiplicado por ${k}.`, `Faz o mesmo em cima: ${a} × ${k} = ${a * k}.`, `${a}/${b} = ${a * k}/${b * k}.`], 'Descobre por quanto o de baixo foi multiplicado.'); };
  const fc = () => { let a, b, c, d; do { b = R(3, 9); d = R(3, 9); a = R(1, b - 1); c = R(1, d - 1); } while (b === d); const m = AF.lcm(b, d); const A = a * (m / b), C = c * (m / d); const o = [`${a}/${b}`, `${c}/${d}`, 'São iguais', 'Não dá pra comparar frações com denominadores diferentes']; const cc = A > C ? 0 : A < C ? 1 : 2; return Q.esc(`Qual fração é maior: ${a}/${b} ou ${c}/${d}?`, o, cc, [`Deixa as duas com o mesmo denominador. MMC(${b}, ${d}) = ${m}.`, `${a}/${b} = ${A}/${m} e ${c}/${d} = ${C}/${m}.`, A === C ? 'Os numeradores são iguais, então as frações são iguais.' : `Com o mesmo denominador, ganha quem tem o maior numerador: ${Math.max(A, C)}.`], 'Coloca as duas com o mesmo denominador.'); };
  const fm = () => { const d = R(2, 9), q = R(1, 5), r = R(1, d - 1), nn = q * d + r; return Q.num(`Quantos inteiros completos cabem em ${nn}/${d}?`, q, [`${nn} ÷ ${d} = ${q}, com resto ${r}.`, `Então ${nn}/${d} = ${q} inteiro${q > 1 ? 's' : ''} e ${r}/${d}.`], `Divide ${nn} por ${d}.`); };
  L({
    id: 'mat10', titulo: 'Frações I', min: 40,
    resumo: 'O que é fração, fração de uma quantidade, equivalência e simplificação.',
    teoria: [
      T.h('O que é uma fração'),
      T.p('Uma pizza cortada em 8 fatias, e você comeu 3: você comeu <strong>3/8</strong> da pizza. O número de baixo (<strong>denominador</strong>) diz em quantas partes iguais o inteiro foi dividido. O de cima (<strong>numerador</strong>) diz quantas partes você pegou.'),
      T.tab(['Fração', 'Lê-se'], [['1/2', 'um meio (metade)'], ['1/3', 'um terço'], ['3/4', 'três quartos'], ['2/5', 'dois quintos'], ['7/10', 'sete décimos'], ['5/12', 'cinco doze avos']]),
      T.h('Fração de uma quantidade'),
      T.p('Pra calcular uma fração de um número, <strong>divide pelo de baixo e multiplica pelo de cima</strong>.'),
      T.ex('3/4 de 20', ['Divide por 4: 20 ÷ 4 = 5. Isso é 1/4.', 'Multiplica por 3: 5 × 3 = 15.'], '15'),
      T.h('Frações equivalentes'),
      T.p('1/2, 2/4 e 4/8 representam a mesma quantidade: metade. Multiplicar ou dividir o de cima e o de baixo pelo mesmo número não muda o valor da fração.'),
      T.conta('1/2 = 2/4 = 4/8 = 8/16\n   ×2   ×2   ×2'),
      T.h('Simplificar'),
      T.p('Simplificar é dividir em cima e embaixo pelo mesmo número até não dar mais. A fração que não dá pra simplificar se chama <strong>irredutível</strong>.'),
      T.ex('Simplificar 18/24', ['Os dois são pares: ÷ 2 dá 9/12.', 'Os dois são divisíveis por 3: ÷ 3 dá 3/4.', 'Não dá mais. Atalho: dividir direto pelo MDC(18, 24) = 6.'], '3/4'),
      T.h('Comparar frações'),
      T.p('Com o mesmo denominador, a maior é a que tem o maior numerador: 5/8 > 3/8. Com denominadores diferentes, transforma em frações equivalentes com o mesmo denominador (use o MMC).'),
      T.ex('Quem é maior: 2/3 ou 3/5?', ['MMC(3, 5) = 15.', '2/3 = 10/15 e 3/5 = 9/15.', '10 > 9, então 2/3 é maior.'], '2/3'),
      T.h('Frações maiores que um inteiro'),
      T.p('Em 7/4 o numerador é maior: são 7 pedaços de quarto. Como 4 quartos formam 1 inteiro, 7/4 = 1 inteiro e 3/4. Pra descobrir, divide 7 por 4: dá 1 e sobra 3.'),
      T.resumo(['Denominador: em quantas partes dividiu. Numerador: quantas pegou.', 'Fração de quantidade: divide pelo de baixo, multiplica pelo de cima.', 'Equivalente: multiplica ou divide os dois pelo mesmo número.', 'Pra comparar, coloca no mesmo denominador.']),
    ],
    pratica: [{ gen: fq, n: 3 }, { gen: fs, n: 3 }, { gen: fe, n: 2 }, { gen: fc, n: 1 }, { gen: fm, n: 1 }],
    desafio: [
      Q.num('O tanque de um avião comporta 360 litros e está com 5/8 da capacidade. Quantos litros faltam pra encher?', 135, ['Se tem 5/8, falta 3/8 pra completar 8/8.', '1/8 de 360 = 360 ÷ 8 = 45.', '3/8 = 45 × 3 = 135 litros.'], 'Quanto falta pra completar o inteiro?', { u: 'litros' }),
      Q.esc('Qual fração é maior: 5/6 ou 7/9?', ['5/6', '7/9', 'São iguais', 'Não dá pra saber'], 0, ['MMC(6, 9) = 18.', '5/6 = 15/18 e 7/9 = 14/18.', '15 > 14, então 5/6 é maior.'], 'Coloca as duas com denominador 18.'),
    ],
  });
})();
