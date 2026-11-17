/* 2º ano do fundamental — Matemática e Português. */
window.CURSO = window.CURSO || [];
(function () {
  const { R, pick, shuf, n: N } = AF;
  const L = (o) => CURSO.push(o);

  /* ---------------- MATEMÁTICA ---------------- */
  L({
    id: 'a2-mat-1', ano: 2, materia: 'mat', titulo: 'Números até 100: dezenas e unidades', min: 20,
    resumo: 'Entender que 47 é 4 dezenas e 7 unidades.',
    teoria: [
      T.h('Agrupando de 10 em 10'),
      T.p('Quando a gente tem muita coisa pra contar, agrupa de 10 em 10. Cada grupo de 10 se chama <strong>dezena</strong>. O que sobra, sem formar grupo, são as <strong>unidades</strong>.'),
      T.conta('[●●●●●●●●●●] [●●●●●●●●●●] [●●●●●●●●●●] [●●●●●●●●●●]  ● ● ● ● ● ● ●\n    10            10            10            10          7\n\n4 dezenas e 7 unidades = 47'),
      T.p('No número 47, o 4 está na casa das dezenas (vale 40) e o 7 na casa das unidades (vale 7). Por isso 47 = 40 + 7.'),
      T.tab(['Dezenas', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'], [['Nome', 'dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa', 'cem']]),
      T.resumo(['10 unidades = 1 dezena.', 'Em 47: 4 dezenas (40) e 7 unidades.', '10 dezenas = 100 (cem).']),
    ],
    pratica: [
      { gen: () => { const d = R(1, 9), u = R(0, 9); return Q.num(`Quantas dezenas tem o número ${d * 10 + u}?`, d, [`${d * 10 + u} = ${d * 10} + ${u}.`, `${d * 10} são ${d} grupos de 10, ou seja, ${d} dezenas.`], 'O algarismo da esquerda mostra as dezenas.'); }, n: 2 },
      { gen: () => { const d = R(1, 9), u = R(1, 9); return Q.num(`Que número tem ${d} dezenas e ${u} unidades?`, d * 10 + u, [`${d} dezenas = ${d * 10}.`, `${d * 10} + ${u} = ${d * 10 + u}.`], 'Dezenas na frente, unidades atrás.'); }, n: 2 },
      { gen: () => { const d = R(1, 9), u = R(1, 9), x = d * 10 + u; return Q.num(`No número ${x}, quanto vale o algarismo ${d}?`, d * 10, [`O ${d} está na casa das dezenas.`, `${d} dezenas valem ${d * 10}.`], 'Olha em que casa ele está.'); }, n: 2 },
      { gen: () => { const x = R(10, 98); return Q.num(`Que número vem depois do ${x}?`, x + 1, [`${x} + 1 = ${x + 1}.`].concat(x % 10 === 9 ? ['Quando a unidade passa de 9, completa mais uma dezena.'] : []), 'Depois = 1 a mais.'); }, n: 2 },
    ],
  });

  L({
    id: 'a2-mat-2', ano: 2, materia: 'mat', titulo: 'Somar e subtrair até 100', min: 20,
    resumo: 'Contas com dezenas e unidades, sem reagrupar.',
    teoria: [
      T.h('Dezena com dezena, unidade com unidade'),
      T.p('Como 34 = 30 + 4 e 25 = 20 + 5, dá pra somar separado: 30 + 20 = 50 e 4 + 5 = 9. Resultado: 59.'),
      T.conta('  3 4\n+ 2 5\n-----\n  5 9'),
      T.p('Na subtração é igual: 68 − 23. Unidades: 8 − 3 = 5. Dezenas: 6 − 2 = 4. Resultado: 45.'),
      T.p('Somar ou tirar 10 é fácil: só muda o algarismo das dezenas. 37 + 10 = 47, e 37 − 10 = 27.'),
      T.dica('Nesta lição as contas não precisam de "vai um" nem de empréstimo. Isso vem no 3º ano.'),
      T.resumo(['Soma dezena com dezena e unidade com unidade.', 'Começa pelas unidades.', '+10 e −10 mexem só nas dezenas.']),
    ],
    pratica: [
      { gen: () => { let a = R(11, 60), b = R(11, 38); while (a % 10 + b % 10 > 9 || a + b > 99) { a = R(11, 60); b = R(11, 38); } return Q.num(`${a} + ${b}`, a + b, AF.passosSoma(a, b), 'Unidade com unidade, dezena com dezena.', { g: 1 }); }, n: 3 },
      { gen: () => { const a = R(35, 99); let b = R(11, a - 10); while (b % 10 > a % 10) b = R(11, a - 10); return Q.num(`${a} − ${b}`, a - b, AF.passosSub(a, b), 'Unidade menos unidade, dezena menos dezena.', { g: 1 }); }, n: 3 },
      { gen: () => { const a = R(12, 89), s = pick([10, 20, 30]), mais = Math.random() < 0.5 || a - s < 1; return Q.num(`${a} ${mais ? '+' : '−'} ${s}`, mais ? a + s : a - s, [`${mais ? 'Somar' : 'Tirar'} ${s} é ${mais ? 'aumentar' : 'diminuir'} ${s / 10} dezena${s > 10 ? 's' : ''}. As unidades não mudam.`, `${a} ${mais ? '+' : '−'} ${s} = ${mais ? a + s : a - s}.`], 'Só o algarismo das dezenas muda.', { g: 1 }); }, n: 2 },
    ],
  });

  L({
    id: 'a2-mat-3', ano: 2, materia: 'mat', titulo: 'Dinheiro: o real', min: 20,
    resumo: 'Moedas, notas e troco.',
    teoria: [
      T.h('O dinheiro do Brasil'),
      T.p('A moeda do Brasil é o <strong>real</strong> (R$). Um real tem 100 centavos.'),
      T.tab(['Moedas', 'Notas'], [['5, 10, 25 e 50 centavos', 'R$ 2, R$ 5, R$ 10'], ['R$ 1', 'R$ 20, R$ 50, R$ 100, R$ 200']]),
      T.h('Juntando dinheiro'),
      T.p('Duas notas de R$ 10 e uma de R$ 5 dão R$ 25. Duas moedas de 50 centavos dão R$ 1.'),
      T.h('Troco'),
      T.p('Troco é o que sobra quando você paga com mais do que o preço. Pra calcular: <strong>o que você deu − o preço</strong>. Pagou R$ 20 num lanche de R$ 13: troco de 20 − 13 = R$ 7.'),
      T.resumo(['R$ 1 = 100 centavos.', 'Pra juntar valores, soma.', 'Troco = o que deu − o preço.']),
    ],
    pratica: [
      { gen: () => { const n10 = R(1, 4), n5 = R(0, 3), n2 = R(0, 4); const tot = n10 * 10 + n5 * 5 + n2 * 2; const p = [n10 && `${n10} nota${n10 > 1 ? 's' : ''} de R$ 10`, n5 && `${n5} nota${n5 > 1 ? 's' : ''} de R$ 5`, n2 && `${n2} nota${n2 > 1 ? 's' : ''} de R$ 2`].filter(Boolean); return Q.num(`Quanto dinheiro dá: ${p.join(', ')}?`, tot, [`R$ 10: ${n10} × 10 = ${n10 * 10}.`, n5 ? `R$ 5: ${n5} × 5 = ${n5 * 5}.` : 'Sem notas de R$ 5.', n2 ? `R$ 2: ${n2} × 2 = ${n2 * 2}.` : 'Sem notas de R$ 2.', `Total: R$ ${tot}.`], 'Conta cada tipo de nota e soma tudo.', { u: 'reais' }); }, n: 3 },
      { gen: () => { const pago = pick([10, 20, 50]), preco = R(Math.ceil(pago / 3), pago - 1); return Q.num(`Paguei com uma nota de R$ ${pago} uma coisa que custa R$ ${preco}. Quanto recebo de troco?`, pago - preco, [`Troco = o que dei − o preço.`, `${pago} − ${preco} = ${pago - preco}.`], 'Troco = o que deu − o preço.', { u: 'reais' }); }, n: 3 },
      Q.num('Quantos centavos tem R$ 1?', 100, ['Um real tem 100 centavos.'], 'É o mesmo que 4 moedas de 25.'),
      Q.num('Quantas moedas de 50 centavos são necessárias pra formar R$ 1?', 2, ['50 + 50 = 100 centavos = R$ 1.'], 'Metade de 100.'),
    ],
  });

  const HORA = (h, m) => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  L({
    id: 'a2-mat-4', ano: 2, materia: 'mat', titulo: 'Horas e tempo', min: 20,
    resumo: 'Ler as horas e calcular quanto tempo passou.',
    teoria: [
      T.h('As medidas de tempo'),
      T.tab(['Medida', 'Equivale a'], [['1 minuto', '60 segundos'], ['1 hora', '60 minutos'], ['meia hora', '30 minutos'], ['1 dia', '24 horas']]),
      T.h('Relógio digital'),
      T.p('Em 14:30, o número antes dos dois pontos é a hora e o de depois são os minutos. 14:30 é "duas e meia da tarde", porque 14 − 12 = 2.'),
      T.p('Depois do meio-dia (12:00), as horas continuam contando: 13 é 1 da tarde, 15 é 3 da tarde, 20 é 8 da noite.'),
      T.h('Quanto tempo passou'),
      T.ex('Começou às 9:00 e terminou às 11:30. Quanto tempo durou?', ['De 9:00 até 11:00 são 2 horas.', 'De 11:00 até 11:30 são 30 minutos.', 'Total: 2 horas e meia.'], '2 horas e 30 minutos'),
      T.resumo(['1 hora = 60 minutos. Meia hora = 30 minutos.', 'Um dia tem 24 horas.', 'Depois do meio-dia: tira 12 pra saber "quantas da tarde".']),
    ],
    pratica: [
      Q.num('Quantos minutos tem uma hora?', 60, ['1 hora = 60 minutos.'], 'Pensa no relógio.'),
      Q.num('Quantas horas tem um dia?', 24, ['Um dia completo tem 24 horas.'], 'Inclui o dia e a noite.'),
      { gen: () => { const h = R(13, 22); return Q.num(`No relógio digital está ${HORA(h, 0)}. São quantas horas "da tarde ou da noite"?`, h - 12, [`Depois do meio-dia, tira 12: ${h} − 12 = ${h - 12}.`, `${HORA(h, 0)} = ${h - 12} horas da ${h < 18 ? 'tarde' : 'noite'}.`], 'Tira 12.'); }, n: 2 },
      { gen: () => { const h1 = R(7, 15), dh = R(1, 4); return Q.num(`Um filme começou às ${HORA(h1, 0)} e terminou às ${HORA(h1 + dh, 0)}. Quantas horas ele durou?`, dh, [`De ${h1} até ${h1 + dh}: ${h1 + dh} − ${h1} = ${dh}.`], 'Faz hora final − hora inicial.', { u: 'horas' }); }, n: 2 },
      { gen: () => { const h = R(1, 3); return Q.num(`Quantos minutos tem em ${h} hora${h > 1 ? 's' : ''} e meia?`, h * 60 + 30, [`${h} hora${h > 1 ? 's' : ''} = ${h} × 60 = ${h * 60} minutos.`, `Meia hora = 30 minutos.`, `${h * 60} + 30 = ${h * 60 + 30}.`], '1 hora = 60 minutos e meia hora = 30.', { u: 'minutos' }); }, n: 2 },
    ],
  });

  L({
    id: 'a2-mat-5', ano: 2, materia: 'mat', titulo: 'Medidas: comprimento, massa e capacidade', min: 20,
    resumo: 'Metro, centímetro, quilo, grama e litro.',
    teoria: [
      T.h('Pra que serve medir'),
      T.tab(['O que mede', 'Unidades', 'Exemplo'], [['comprimento (tamanho)', 'centímetro (cm), metro (m), quilômetro (km)', 'uma régua tem 30 cm'], ['massa ("peso")', 'grama (g), quilograma (kg)', 'um pacote de arroz tem 5 kg'], ['capacidade (líquidos)', 'mililitro (mL), litro (L)', 'uma garrafa de 2 L']]),
      T.h('As trocas mais usadas'),
      T.tab(['Medida', 'Equivale a'], [['1 metro', '100 centímetros'], ['1 quilômetro', '1.000 metros'], ['1 quilograma', '1.000 gramas'], ['1 litro', '1.000 mililitros']]),
      T.p('Repara no padrão: "quilo" quer dizer 1.000. Quilômetro = 1.000 metros, quilograma = 1.000 gramas.'),
      T.resumo(['Comprimento: cm, m, km.', 'Massa: g, kg.', 'Capacidade: mL, L.', '1 m = 100 cm. Quilo = 1.000.']),
    ],
    pratica: [
      { pool: [
        Q.esc('Pra medir o comprimento de uma mesa, usamos:', ['litros', 'quilos', 'metros ou centímetros', 'horas'], 2, ['Tamanho é comprimento: metro ou centímetro.'], 'É tamanho.'),
        Q.esc('Pra medir a água de uma garrafa, usamos:', ['metros', 'litros', 'quilos', 'graus'], 1, ['Líquido se mede em litros ou mililitros.'], 'É líquido.'),
        Q.esc('Pra medir quanto pesa um saco de arroz, usamos:', ['quilogramas', 'litros', 'metros', 'minutos'], 0, ['Massa se mede em quilogramas ou gramas.'], 'É peso.'),
      ], n: 3 },
      { gen: () => { const m = R(1, 9); return Q.num(`Quantos centímetros tem ${m} metro${m > 1 ? 's' : ''}?`, m * 100, [`1 metro = 100 cm.`, `${m} × 100 = ${m * 100} cm.`], '1 m = 100 cm.', { u: 'cm' }); }, n: 2 },
      { gen: () => { const k = R(1, 5); return Q.num(`Quantos gramas tem ${k} quilo${k > 1 ? 's' : ''}?`, k * 1000, [`1 kg = 1.000 g.`, `${k} × 1.000 = ${N(k * 1000)} g.`], 'Quilo = 1.000.', { u: 'gramas' }); }, n: 1 },
      { gen: () => { const l = R(1, 3); return Q.num(`Quantos mililitros tem ${l} litro${l > 1 ? 's' : ''}?`, l * 1000, [`1 L = 1.000 mL.`, `${l} × 1.000 = ${N(l * 1000)} mL.`], '1 L = 1.000 mL.', { u: 'mL' }); }, n: 1 },
    ],
  });

  L({
    id: 'a2-mat-6', ano: 2, materia: 'mat', titulo: 'Dobro, triplo e metade', min: 20,
    resumo: 'Multiplicar por 2 e por 3, e dividir por 2.',
    teoria: [
      T.h('Dobro e triplo'),
      T.p('O <strong>dobro</strong> é 2 vezes o número: o dobro de 8 é 8 + 8 = 16. O <strong>triplo</strong> é 3 vezes: o triplo de 5 é 5 + 5 + 5 = 15.'),
      T.h('Metade'),
      T.p('A <strong>metade</strong> é dividir em 2 partes iguais: a metade de 14 é 7, porque 7 + 7 = 14. A metade desfaz o dobro.'),
      T.dica('Pra achar a metade de um número maior, divide as dezenas e as unidades: metade de 46 → metade de 40 é 20 e metade de 6 é 3. Resultado: 23.'),
      T.resumo(['Dobro = × 2. Triplo = × 3.', 'Metade = ÷ 2.', 'Metade desfaz o dobro.']),
    ],
    pratica: [
      { gen: () => { const x = R(3, 25); return Q.num(`Qual é o dobro de ${x}?`, 2 * x, [`Dobro é somar o número com ele mesmo: ${x} + ${x} = ${2 * x}.`], 'Soma o número com ele mesmo.'); }, n: 3 },
      { gen: () => { const x = R(2, 12); return Q.num(`Qual é o triplo de ${x}?`, 3 * x, [`Triplo é 3 vezes: ${x} + ${x} + ${x} = ${3 * x}.`], 'Soma três vezes.'); }, n: 2 },
      { gen: () => { const x = R(2, 49) * 2; const d = Math.floor(x / 20) * 10, u = x - d; return Q.num(`Qual é a metade de ${x}?`, x / 2, [d && u ? `Separa: ${x} = ${d} + ${u}.` : `${x} dividido em 2 partes iguais.`, d && u ? `Metade de ${d} é ${d / 2} e metade de ${u} é ${u / 2}.` : '', `Metade de ${x} = ${x / 2}. Confere: ${x / 2} + ${x / 2} = ${x}.`].filter(Boolean), 'Que número somado com ele mesmo dá esse valor?'); }, n: 3 },
    ],
  });

  /* ---------------- PORTUGUÊS ---------------- */
  L({
    id: 'a2-port-1', ano: 2, materia: 'port', titulo: 'LH, NH e CH', min: 20,
    resumo: 'Os dígrafos: duas letras com um som só.',
    teoria: [
      T.h('Duas letras, um som'),
      T.p('Algumas duplas de letras formam um som só. Elas se chamam <strong>dígrafos</strong>.'),
      T.tab(['Dígrafo', 'Exemplos'], [['LH', 'palha, olho, filho, trabalho'], ['NH', 'ninho, banho, sonho, galinha'], ['CH', 'chuva, chave, bicho, mochila'], ['RR e SS', 'carro, terra, pássaro, osso'], ['QU e GU (sem som do U)', 'queijo, máquina, guerra, guitarra']]),
      T.at('Cuidado com as palavras parecidas: <strong>mola</strong> e <strong>molha</strong>, <strong>sono</strong> e <strong>sonho</strong>, <strong>cara</strong> e <strong>carra</strong> (esta última não existe). Uma letra muda tudo.'),
      T.p('Na separação de sílabas, LH, NH, CH, QU e GU ficam juntos (fi-lho, ni-nho, chu-va), mas RR e SS se separam (car-ro, pás-sa-ro).'),
      T.resumo(['Dígrafo: duas letras com um som.', 'LH, NH e CH não se separam.', 'RR e SS se separam na divisão silábica.']),
    ],
    pratica: [{ pool: [
      Q.txt('Complete com LH ou NH: "o pássaro fez um ni__o"', 'ninho', ['Ninho se escreve com NH: ni-nho.'], 'É a casa do passarinho.', { ph: 'as letras ou a palavra inteira' }),
      Q.txt('Complete com LH ou NH: "a gali__a botou um ovo"', 'galinha', ['Galinha se escreve com NH: ga-li-nha.'], 'A ave que bota ovo.', { ph: 'as letras ou a palavra inteira' }),
      Q.txt('Complete com LH ou NH: "eu tomei ba__o"', 'banho', ['Banho se escreve com NH.'], 'Com água e sabão.', { ph: 'as letras ou a palavra inteira' }),
      Q.txt('Complete com LH ou NH: "ele é filho do meu tio, ou seja, é o fi__o do meu tio"', 'filho', ['Filho se escreve com LH: fi-lho.'], 'Filho.', { ph: 'as letras ou a palavra inteira' }),
      Q.txt('Complete com CH ou X depois de "mo": "a mo__ila da escola"', 'mochila', ['Mochila se escreve com CH: mo-chi-la.'], 'Você carrega nas costas.', { ph: 'as letras ou a palavra inteira' }),
      Q.esc('Qual é a separação certa de "carro"?', ['ca-rro', 'car-ro', 'c-arro', 'carr-o'], 1, ['RR se separa: car-ro.'], 'RR e SS se separam.'),
      Q.esc('Qual é a separação certa de "filho"?', ['fil-ho', 'fi-lho', 'f-ilho', 'filh-o'], 1, ['LH não se separa: fi-lho.'], 'LH fica junto.'),
      Q.esc('Quantas letras e quantos sons tem o "ch" de chuva?', ['2 letras e 2 sons', '2 letras e 1 som', '1 letra e 1 som', '3 letras e 1 som'], 1, ['CH são duas letras que juntas fazem um som só: é um dígrafo.'], 'Dígrafo.'),
    ], n: 8 }],
  });

  L({
    id: 'a2-port-2', ano: 2, materia: 'port', titulo: 'Masculino e feminino', min: 20,
    resumo: 'O gênero das palavras.',
    teoria: [
      T.h('Gênero'),
      T.p('As palavras podem ser <strong>masculinas</strong> (usam "o" ou "um": o menino) ou <strong>femininas</strong> (usam "a" ou "uma": a menina).'),
      T.h('Como formar o feminino'),
      T.tab(['Regra', 'Exemplos'], [['troca o -o por -a', 'menino → menina, gato → gata'], ['acrescenta -a', 'professor → professora, freguês → freguesa'], ['-ão vira -ã, -oa ou -ona', 'irmão → irmã, leão → leoa, campeão → campeã'], ['palavra diferente', 'homem → mulher, pai → mãe, boi → vaca, cavalo → égua']]),
      T.p('Algumas palavras servem pros dois e só o artigo muda: o estudante / a estudante, o atleta / a atleta.'),
      T.resumo(['Masculino: o, um. Feminino: a, uma.', 'Geralmente troca -o por -a.', 'Algumas mudam totalmente: pai e mãe, boi e vaca.']),
    ],
    pratica: [{ pool: [
      Q.txt('Qual é o feminino de "menino"?', 'menina', ['Troca o -o por -a: menina.'], 'Troca a letra final.', { ph: 'uma palavra' }),
      Q.txt('Qual é o feminino de "professor"?', 'professora', ['Acrescenta -a: professora.'], 'Acrescenta uma letra.', { ph: 'uma palavra' }),
      Q.txt('Qual é o feminino de "pai"?', 'mãe', ['É uma palavra totalmente diferente: mãe.'], 'Muda tudo.', { ph: 'uma palavra' }),
      Q.txt('Qual é o feminino de "irmão"?', 'irmã', ['-ão vira -ã: irmã.'], 'Tira o "o" do final.', { ph: 'uma palavra' }),
      Q.txt('Qual é o feminino de "leão"?', 'leoa', ['Leão vira leoa.'], 'Termina em -oa.', { ph: 'uma palavra' }),
      Q.txt('Qual é o feminino de "homem"?', 'mulher', ['Homem e mulher são palavras diferentes.'], 'Muda tudo.', { ph: 'uma palavra' }),
      Q.esc('Qual destas palavras é feminina?', ['o carro', 'a mesa', 'o livro', 'um sapato'], 1, ['"A mesa" usa o artigo "a": feminino.'], 'Olha o artigo.'),
      Q.txt('Qual é o feminino de "boi"?', 'vaca', ['Boi e vaca são palavras diferentes.'], 'É o animal que dá leite.', { ph: 'uma palavra' }),
    ], n: 8 }],
  });

  L({
    id: 'a2-port-3', ano: 2, materia: 'port', titulo: 'Singular e plural', min: 20,
    resumo: 'Um ou mais de um.',
    teoria: [
      T.h('Número das palavras'),
      T.p('<strong>Singular</strong> é quando fala de um só (o carro). <strong>Plural</strong> é quando fala de mais de um (os carros).'),
      T.tab(['Terminação', 'Regra', 'Exemplos'], [['vogal', 'acrescenta -s', 'casa → casas, pé → pés'], ['-r, -z, -s (com acento)', 'acrescenta -es', 'flor → flores, luz → luzes, país → países'], ['-m', 'troca por -ns', 'homem → homens, jardim → jardins'], ['-l', 'troca por -is', 'animal → animais, papel → papéis'], ['-ão', '-ões, -ães ou -ãos', 'avião → aviões, pão → pães, mão → mãos']]),
      T.at('Quando a palavra vai pro plural, as que acompanham também vão: <strong>o carro azul</strong> → <strong>os carros azuis</strong>.'),
      T.resumo(['Singular: um. Plural: mais de um.', 'Geralmente acrescenta -s.', '-m vira -ns; -l vira -is; -r e -z ganham -es.']),
    ],
    pratica: [{ pool: [
      Q.txt('Qual é o plural de "flor"?', 'flores', ['Termina em -r: acrescenta -es. Flores.'], 'Termina em r.', { ph: 'uma palavra' }),
      Q.txt('Qual é o plural de "animal"?', 'animais', ['Termina em -l: troca por -is. Animais.'], 'Termina em l.', { ph: 'uma palavra' }),
      Q.txt('Qual é o plural de "homem"?', 'homens', ['Termina em -m: troca por -ns. Homens.'], 'Termina em m.', { ph: 'uma palavra' }),
      Q.txt('Qual é o plural de "avião"?', 'aviões', ['Avião → aviões.'], 'Termina em -ões.', { ph: 'uma palavra' }),
      Q.txt('Qual é o plural de "pão"?', 'pães', ['Pão → pães.'], 'Termina em -ães.', { ph: 'uma palavra' }),
      Q.txt('Qual é o plural de "luz"?', 'luzes', ['Termina em -z: acrescenta -es. Luzes.'], 'Termina em z.', { ph: 'uma palavra' }),
      Q.esc('Qual é o plural de "o carro azul"?', ['os carro azul', 'os carros azul', 'os carros azuis', 'o carros azuis'], 2, ['Todas as palavras vão pro plural: os carros azuis.', 'Azul termina em -l: azuis.'], 'Tudo vai pro plural.'),
      Q.txt('Qual é o plural de "mão"?', 'mãos', ['Mão → mãos.'], 'Você tem duas.', { ph: 'uma palavra' }),
    ], n: 8 }],
  });

  L({
    id: 'a2-port-4', ano: 2, materia: 'port', titulo: 'Sinônimos e antônimos', min: 20,
    resumo: 'Palavras de sentido parecido e de sentido oposto.',
    teoria: [
      T.h('Sinônimos: sentido parecido'),
      T.p('Bonito e lindo. Feliz e alegre. Começar e iniciar. Usar sinônimos evita repetir a mesma palavra várias vezes num texto.'),
      T.h('Antônimos: sentido oposto'),
      T.p('Alto e baixo. Quente e frio. Abrir e fechar. Rápido e devagar.'),
      T.tab(['Palavra', 'Sinônimo', 'Antônimo'], [['grande', 'enorme', 'pequeno'], ['feliz', 'alegre', 'triste'], ['rápido', 'veloz', 'lento'], ['começar', 'iniciar', 'terminar'], ['difícil', 'complicado', 'fácil']]),
      T.resumo(['Sinônimo: mesmo sentido.', 'Antônimo: sentido contrário.']),
    ],
    pratica: [{ pool: [
      Q.esc('Qual é o antônimo de "alto"?', ['grande', 'baixo', 'comprido', 'forte'], 1, ['Alto e baixo têm sentidos opostos.'], 'O contrário.'),
      Q.esc('Qual é o sinônimo de "feliz"?', ['triste', 'alegre', 'bravo', 'cansado'], 1, ['Feliz e alegre têm o mesmo sentido.'], 'Mesmo sentido.'),
      Q.esc('Qual é o antônimo de "quente"?', ['morno', 'frio', 'calor', 'fogo'], 1, ['Quente e frio são opostos.'], 'O contrário.'),
      Q.esc('Qual é o sinônimo de "rápido"?', ['lento', 'veloz', 'parado', 'pesado'], 1, ['Rápido e veloz querem dizer a mesma coisa.'], 'Mesmo sentido.'),
      Q.esc('Qual é o antônimo de "abrir"?', ['entrar', 'fechar', 'sair', 'puxar'], 1, ['Abrir e fechar são opostos.'], 'O contrário.'),
      Q.esc('Qual é o sinônimo de "começar"?', ['terminar', 'iniciar', 'parar', 'acabar'], 1, ['Começar e iniciar têm o mesmo sentido.'], 'Mesmo sentido.'),
      Q.esc('Qual é o antônimo de "difícil"?', ['complicado', 'fácil', 'chato', 'grande'], 1, ['Difícil e fácil são opostos.'], 'O contrário.'),
      Q.esc('"Bonito" e "lindo" são:', ['antônimos', 'sinônimos', 'plurais', 'femininos'], 1, ['Têm o mesmo sentido: sinônimos.'], 'Mesmo sentido.'),
    ], n: 8 }],
  });
})();
