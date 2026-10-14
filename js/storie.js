// Le storie della libreria. Ogni pagina ha un testo e una scena disegnata da js/scene.js.
// Per aggiungere una storia basta aggiungere un oggetto a questo elenco.
// Scena: { cielo: 'giorno'|'tramonto'|'notte'|'pioggia', suolo: 'prato'|'mare'|'fondale'|'bosco'|'secco',
//          cose: [[tipo, x, y, scala, extra]] } con x/y in un riquadro 400×300.

export const storie = [
  {
    id: 'riccio-e-la-stella',
    titolo: 'Bruno e la stella caduta',
    sottotitolo: 'Una storia della buonanotte',
    colore: '#2f3e6b',
    carta: '#f6efe1',
    eta: '3–6 anni',
    copertina: { cielo: 'notte', suolo: 'prato', cose: [['luna', 320, 60, 1], ['stelle', 0, 0, 1], ['stella', 200, 110, 1.4], ['riccio', 190, 225, 1.5]] },
    pagine: [
      { testo: 'Nel prato dietro la collina viveva Bruno, un riccio piccolo piccolo con tanti aculei e un nasino sempre curioso.',
        scena: { cielo: 'giorno', suolo: 'prato', cose: [['sole', 330, 60, 1], ['albero', 70, 190, 1.2], ['fiore', 290, 250, 1], ['fiore', 330, 262, .8, '#f2a7c3'], ['riccio', 200, 235, 1.3]] } },
      { testo: 'Ogni sera Bruno si sdraiava sulla pancia e guardava il cielo. «Quanto mi piacerebbe tenere una stella tutta per me!» sospirava.',
        scena: { cielo: 'notte', suolo: 'prato', cose: [['luna', 80, 70, .9], ['stelle', 0, 0, 1], ['riccio', 210, 240, 1.2]] } },
      { testo: 'Una notte, zac! Una stellina scivolò giù dal cielo e cadde tra i trifogli, proprio vicino alla sua tana.',
        scena: { cielo: 'notte', suolo: 'prato', cose: [['stelle', 0, 0, 1], ['scia', 120, 60, 1], ['stella', 255, 230, .9], ['riccio', 150, 238, 1.1]] } },
      { testo: 'La stellina era piccola e tremava. «Mi sono persa» disse con una vocina di campanello. «Lassù i miei fratelli mi aspettano.»',
        scena: { cielo: 'notte', suolo: 'prato', cose: [['stelle', 0, 0, 1], ['stella', 245, 215, 1.3, 'triste'], ['riccio', 150, 238, 1.2]] } },
      { testo: 'Bruno ci pensò. Poteva tenerla con sé, come aveva sempre sognato. Ma la stellina aveva gli occhi lucidi lucidi.',
        scena: { cielo: 'notte', suolo: 'prato', cose: [['luna', 330, 60, .8], ['stella', 260, 200, 1.1, 'triste'], ['riccio', 160, 236, 1.3, 'pensa']] } },
      { testo: '«Ti aiuto io» disse Bruno. Andò a chiamare Gufo Ottavio, che sapeva volare più in alto di tutti gli alberi del bosco.',
        scena: { cielo: 'notte', suolo: 'bosco', cose: [['stelle', 0, 0, 1], ['albero', 300, 185, 1.4], ['gufo', 300, 120, 1], ['riccio', 120, 240, 1.1], ['stella', 175, 228, .7]] } },
      { testo: 'Gufo Ottavio prese la stellina tra le zampe e spiccò il volo, su, su, sempre più su, fino al suo posto nel cielo.',
        scena: { cielo: 'notte', suolo: 'prato', cose: [['stelle', 0, 0, 1], ['gufo', 230, 95, 1.1, 'vola'], ['stella', 230, 135, .6], ['riccio', 110, 245, .9]] } },
      { testo: 'Da quella notte, quando Bruno guarda il cielo, una stella brilla più forte delle altre. È la sua amica, che gli dice: buonanotte, Bruno.',
        scena: { cielo: 'notte', suolo: 'prato', cose: [['luna', 70, 60, .8], ['stelle', 0, 0, 1], ['stella', 300, 70, 1.1], ['riccio', 210, 245, 1.2, 'dorme']] } }
    ]
  },
  {
    id: 'balena-singhiozzo',
    titolo: 'Olga e il singhiozzo',
    sottotitolo: 'Una storia in fondo al mare',
    colore: '#13707a',
    carta: '#eef6f2',
    eta: '3–7 anni',
    copertina: { cielo: 'giorno', suolo: 'mare', cose: [['sole', 70, 55, .9], ['balena', 210, 200, 1.4], ['bolle', 300, 120, 1], ['pesce', 90, 250, .9, '#ff9f43']] },
    pagine: [
      { testo: 'Olga era la balena più grande e più gentile di tutto l\'oceano. Ma un mattino si svegliò con un problema: HIC!',
        scena: { cielo: 'giorno', suolo: 'mare', cose: [['sole', 330, 55, .9], ['balena', 200, 205, 1.3], ['bolle', 300, 140, 1]] } },
      { testo: 'Ogni volta che faceva HIC, dal suo dorso usciva uno spruzzo così alto che le nuvole scappavano via spaventate.',
        scena: { cielo: 'giorno', suolo: 'mare', cose: [['nuvola', 80, 60, .8], ['nuvola', 320, 50, .7], ['spruzzo', 200, 120, 1.2], ['balena', 200, 215, 1.2]] } },
      { testo: 'Arrivò Tito, un pesciolino arancione. «Prova a trattenere il fiato!» Olga ci provò, gonfiò le guance e… HIC!',
        scena: { cielo: 'giorno', suolo: 'fondale', cose: [['alga', 40, 300, 1], ['alga', 360, 300, 1.2], ['balena', 230, 170, 1.1, 'gonfia'], ['pesce', 90, 200, 1.1, '#ff9f43']] } },
      { testo: 'Arrivò Clotilde, la tartaruga saggia. «Bevi un sorso d\'acqua a testa in giù!» Ma in mare è tutta acqua… e HIC!',
        scena: { cielo: 'giorno', suolo: 'fondale', cose: [['alga', 60, 300, 1.1], ['tartaruga', 110, 215, 1], ['balena', 270, 160, 1], ['bolle', 200, 80, 1]] } },
      { testo: 'Tito ebbe un\'idea. Chiamò tutti i pesci della barriera e sussurrò: «Al mio tre, facciamo la sorpresa più grande del mondo».',
        scena: { cielo: 'giorno', suolo: 'fondale', cose: [['corallo', 60, 290, 1], ['corallo', 340, 290, .9, '#f4a259'], ['pesce', 150, 150, .9, '#ff9f43'], ['pesce', 210, 120, .7, '#ffd166'], ['pesce', 250, 175, .7, '#7bdff2'], ['pesce', 190, 200, .6, '#f28482']] } },
      { testo: '«Uno… due… TRE!» Cento pesciolini sbucarono insieme da dietro uno scoglio gridando: «BUUU!»',
        scena: { cielo: 'giorno', suolo: 'fondale', cose: [['scoglio', 110, 260, 1.2], ['pesce', 80, 160, .8, '#ff9f43'], ['pesce', 130, 130, .7, '#ffd166'], ['pesce', 170, 175, .7, '#7bdff2'], ['pesce', 60, 205, .6, '#f28482'], ['balena', 290, 170, .9, 'sorpresa']] } },
      { testo: 'Olga fece un salto così grande che per un attimo volò sopra le onde. Poi tornò giù, SPLASH… e il singhiozzo era sparito!',
        scena: { cielo: 'giorno', suolo: 'mare', cose: [['sole', 340, 50, .8], ['balena', 200, 130, 1.1, 'salta'], ['spruzzo', 110, 225, .7], ['spruzzo', 290, 225, .7]] } },
      { testo: 'Per ringraziare, Olga portò tutti a fare un giro sul suo dorso. E da allora, nel mare, la parola «HIC» fa ridere tutti.',
        scena: { cielo: 'tramonto', suolo: 'mare', cose: [['sole', 200, 180, 1.4], ['balena', 200, 225, 1.2], ['pesce', 170, 180, .5, '#ff9f43'], ['tartaruga', 240, 178, .5]] } }
    ]
  },
  {
    id: 'nuvola-pioggerella',
    titolo: 'Pioggerella, la nuvola timida',
    sottotitolo: 'Una storia di primavera',
    colore: '#6b4fa0',
    carta: '#f4f0f8',
    eta: '4–7 anni',
    copertina: { cielo: 'giorno', suolo: 'prato', cose: [['arcobaleno', 200, 230, 1], ['nuvola', 200, 105, 1.4, 'faccia'], ['fiore', 120, 255, 1], ['fiore', 280, 258, 1, '#f2a7c3']] },
    pagine: [
      { testo: 'Pioggerella era la nuvola più piccola del cielo. Le sue sorelle facevano tuoni e lampi, ma lei era timida e non riusciva a piovere.',
        scena: { cielo: 'giorno', suolo: 'prato', cose: [['nuvola', 90, 70, 1.2, 'grigia'], ['nuvola', 310, 60, 1.3, 'grigia'], ['nuvola', 200, 130, .8, 'faccia']] } },
      { testo: 'Giù in basso c\'era un orto dove la terra era secca e piena di crepe. I fiori avevano la testa bassa e la lumaca Gina non usciva più dal guscio.',
        scena: { cielo: 'giorno', suolo: 'secco', cose: [['sole', 330, 55, 1.1], ['fiore', 120, 250, 1, 'appassito'], ['fiore', 200, 255, .9, 'appassito'], ['lumaca', 290, 255, 1, 'nascosta']] } },
      { testo: '«Aiuto, abbiamo tanta sete!» chiamarono i fiori. Pioggerella li sentì e diventò rossa per l\'emozione.',
        scena: { cielo: 'giorno', suolo: 'secco', cose: [['nuvola', 200, 80, 1.1, 'rossa'], ['fiore', 140, 250, 1, 'appassito'], ['fiore', 260, 250, 1, 'appassito']] } },
      { testo: 'Ci provò con tutte le sue forze: si strizzò, si arrotolò, si gonfiò. Ma uscì soltanto una gocciolina. Plic.',
        scena: { cielo: 'giorno', suolo: 'secco', cose: [['nuvola', 200, 80, 1.1, 'sforzo'], ['goccia', 200, 160, 1], ['fiore', 120, 250, .9, 'appassito'], ['fiore', 290, 252, .9, 'appassito']] } },
      { testo: 'Allora il vento Ventolino le soffiò all\'orecchio: «Non serve essere grandi. Pensa a qualcosa di bello, e lascia andare».',
        scena: { cielo: 'giorno', suolo: 'secco', cose: [['vento', 100, 90, 1], ['nuvola', 250, 85, 1, 'faccia']] } },
      { testo: 'Pioggerella pensò al profumo dei fiori, al canto dei grilli, ai bambini con gli stivali gialli. E piano piano… cominciò a piovere!',
        scena: { cielo: 'pioggia', suolo: 'prato', cose: [['nuvola', 200, 75, 1.3, 'felice'], ['pioggia', 200, 0, 1], ['fiore', 130, 252, 1], ['fiore', 270, 254, 1, '#f2a7c3']] } },
      { testo: 'La terra bevve, i fiori alzarono la testa e Gina la lumaca uscì dal guscio per ballare sotto le gocce.',
        scena: { cielo: 'pioggia', suolo: 'prato', cose: [['pioggia', 200, 0, .6], ['fiore', 100, 250, 1.1], ['fiore', 180, 255, .9, '#f2a7c3'], ['fiore', 330, 252, 1, '#9bd1f5'], ['lumaca', 250, 258, 1.1]] } },
      { testo: 'Quando tornò il sole, nel cielo comparve un arcobaleno. In cima, piccola e fiera, c\'era Pioggerella che sorrideva.',
        scena: { cielo: 'giorno', suolo: 'prato', cose: [['arcobaleno', 200, 240, 1.1], ['nuvola', 200, 90, .9, 'felice'], ['sole', 345, 55, .8], ['fiore', 90, 255, 1], ['fiore', 310, 258, 1, '#f2a7c3'], ['lumaca', 200, 262, .8]] } }
    ]
  }
];

// ---------- Catalogo de I Pasticciotti (proposta di design) ----------
// Copertine caricate direttamente da pasticciotti.it. Le pagine interne sono segnaposto:
// per ogni storia andranno inseriti testo e immagine di ogni pagina, es. { testo: '…', immagine: 'images/…png' }.
const SITO = 'https://pasticciotti.it';
const colori = ['#c8423b', '#2f6f9f', '#5b8c3a', '#8a4fa0', '#d9822b', '#2b7a78', '#b5446e'];
const segnaposto = n => Array.from({ length: n }, () => ({ segnaposto: true }));

export const pasticciotti = [
  ['spaventapasseri-innamorato', 'I Pasticciotti e lo Spaventapasseri innamorato', '128_spaventapasseri.png'],
  ['vanno-al-mare', 'I Pasticciotti vanno al mare', '98_vanno-al-mare.png'],
  ['albero-di-gelso', "I Pasticciotti e l'albero di gelso", '121_gelso.png'],
  ['festa-di-carnevale', 'I Pasticciotti e la festa di Carnevale', '49_festa-di-carnevale.png'],
  ['gara-dolci-freddi', 'I Pasticciotti e la «Gara dei dolci freddi»', '102_gara-dolci-freddi.png'],
  ['invasione-dei-topi', "I Pasticciotti e l'invasione dei topi", '104_invasione-topi.png'],
  ['notte-di-halloween', 'I Pasticciotti e la notte di Halloween', '115_notte-di-halloween.png'],
  ['strega-del-bosco', 'I Pasticciotti e la Strega del Bosco', '93_strega-del-bosco.png'],
  ['drago-sputafuoco', 'I Pasticciotti e il Drago Sputafuoco', '83_drago-sputafuoco.png'],
  ['vanno-in-convento', 'I Pasticciotti vanno in convento', '75_vanno-in-convento.png'],
  ['uova-di-cioccolato', 'I Pasticciotti e le uova di cioccolato', '61_uova-di-cioccolato.png'],
  ['il-lupo', 'I Pasticciotti e il Lupo', '40b_il-lupo.png'],
  ['dolci-di-babbo-natale', 'I Pasticciotti e i dolci di Babbo Natale', '14_dolci-babbo-natale.png'],
  ['torta-del-re', 'I Pasticciotti e la torta del Re', '05b_torta-del-re.png']
].map(([id, titolo, img], i) => ({
  id, titolo,
  sottotitolo: 'Storia di Francesca Buraschi · illustrazioni di Cecilia Buraschi',
  originale: `${SITO}/${id}/`,
  immagine: `${SITO}/images/storie/${img}`,
  colore: colori[i % colori.length],
  carta: '#fbf6ea',
  eta: '3–8 anni',
  pagine: segnaposto(4)
}));
