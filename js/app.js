import { storie, pasticciotti } from './storie.js';
const tutte = [...pasticciotti, ...storie];
import { scena, figura } from './scene.js';

const app = document.getElementById('app');
const riduciMovimento = matchMedia('(prefers-reduced-motion: reduce)');

// ---------- piccole utilità ----------
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const leggi = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } };
const scrivi = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

const icone = {
  indietro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  avanti: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  libri: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h4v16H4zM10 4h4v16h-4zM16 5l3.5-1 2.5 15.5-3.5 1z"/></svg>',
  voce: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
  suono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V6l11-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>',
  muto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V6l11-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/><path d="M3 3l18 18"/></svg>',
  stella: '<svg viewBox="-26 -26 52 52" class="stellina" aria-hidden="true"><path d="M0 -24 L7 -9 L23 -7 L11 4 L14 20 L0 12 L-14 20 L-11 4 L-23 -7 L-7 -9Z" fill="currentColor"/></svg>',
  fregio: '<svg viewBox="0 0 46 12" class="fregio" aria-hidden="true"><path d="M2 6 q5.5 -6 11 0 t11 0 t11 0 t9 0" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>'
};

// ---------- libreria ----------
const immagine = (src, alt) => `<img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
const segnapostoArte = n => `<div class="slot"><span>Illustrazione<br>pagina ${n}</span></div>`;
const segnapostoTesto = n => `<div class="slot-testo" aria-label="Testo della pagina ${n} da inserire"><i></i><i></i><i></i><i></i><i style="width:55%"></i><small>Testo pagina ${n} · da inserire</small></div>`;

function copertina(storia, extra = "") {
  const arte = storia.immagine ? immagine(storia.immagine, 'Copertina: ' + storia.titolo) : scena(storia.copertina, 'Copertina: ' + storia.titolo);
  return `<div class="copertina-arte">${arte}</div>
    <div class="dorso"></div>
    <div class="copertina-band"><h2>${esc(storia.titolo)}</h2><span>${esc(storia.sottotitolo)}</span>${extra}</div>`;
}

function scaffale(elenco) {
  return `<div class="ripiano">${elenco.map(s => {
    const segno = leggi('sfoglia:' + s.id, 0);
    const tot = s.pagine.length;
    const nastro = segno >= 2 && segno < tot + 2 ? `<span class="segnalibro">pag. ${segno - 1}</span>` : '';
    return `<a class="libro-scaffale" href="#/libro/${s.id}" style="--colore:${s.colore}" aria-label="${esc(s.titolo)}${nastro ? ', da continuare' : ''}">
      ${nastro}
      <div class="copertina" data-vt="${s.id}">${copertina(s)}</div>
      <div class="titolo-scaffale">${esc(s.titolo)}</div>
      <div class="meta">${s.originale ? 'Leggi la storia' : tot + ' pagine · ' + s.eta}</div>
    </a>`;
  }).join('')}</div>`;
}

function mostraLibreria() {
  document.title = 'I Pasticciotti · Storie illustrate per bambini';
  app.innerHTML = `<div class="libreria">
    <header class="testata">
      <div class="marchio"><img class="logo" src="https://pasticciotti.it/images/logo.png" alt="I Pasticciotti"></div>
      <h1>Storie da sfogliare, <em>pagina dopo pagina</em></h1>
      <p>Le storie illustrate dei Pasticciotti, gratis, da leggere come veri libri: giri le pagine con il dito o con le frecce, e se vuoi te le leggiamo ad alta voce.</p>
    </header>
    <section class="scaffale" aria-labelledby="t-storie">
      <h2 class="titolo-sezione" id="t-storie">Le storie dei Pasticciotti <span>${pasticciotti.length} libri</span></h2>
      ${scaffale(pasticciotti)}
    </section>
    <section class="scaffale" aria-labelledby="t-demo">
      <h2 class="titolo-sezione" id="t-demo">Esempi di lettura completa <span>contenuti dimostrativi</span></h2>
      <p class="nota-sezione">Tre libri di prova, completi di testo e disegni, per provare l'esperienza di lettura: pagine che si girano, lettura ad alta voce, parole evidenziate.</p>
      ${scaffale(storie)}
    </section>
    <footer class="piede">Storie di Francesca Buraschi, illustrazioni di Cecilia Buraschi · Proposta di design</footer>
  </div>`;
}

// ---------- lettore ----------
// Una posizione "logica" vale per entrambe le impaginazioni:
// 0 copertina · 1 frontespizio · 2..N+1 pagine della storia · N+2 fine.
let L = null;

function facce(storia, doppio) {
  const f = [{ t: 'copertina' }];
  if (doppio) {
    f.push({ t: 'risguardo' }, { t: 'frontespizio' });
    storia.pagine.forEach((_, i) => f.push({ t: 'arte', i }, { t: 'testo', i }));
    f.push({ t: 'fine' }, { t: 'retro' });
  } else {
    f.push({ t: 'frontespizio' });
    storia.pagine.forEach((_, i) => f.push({ t: 'unita', i }));
    f.push({ t: 'fine', azioni: true });
  }
  return f;
}

function parole(testo) {
  let pos = 0;
  return testo.split(/(\s+)/).map(p => {
    const html = /^\s+$/.test(p) ? p : `<span class="w" data-c="${pos}">${esc(p)}</span>`;
    pos += p.length;
    return html;
  }).join('');
}

const azioni = `<div class="azioni">
  <button class="pulsante" data-azione="ricomincia">${icone.indietro}<span>Leggi ancora</span></button>
  <button class="pulsante" data-azione="libreria">${icone.libri}<span>Altre storie</span></button>
</div>`;

function arteDi(p, n) {
  if (p.immagine) return immagine(p.immagine, 'Illustrazione della pagina ' + n);
  if (p.scena) return scena(p.scena, 'Illustrazione della pagina ' + n);
  return segnapostoArte(n);
}
const testoDi = (p, n) => p.testo ? `<p>${parole(p.testo)}</p>` : segnapostoTesto(n);

const originale = s => s.originale ? `<a class="pulsante" href="${s.originale}" target="_blank" rel="noopener">Leggi su pasticciotti.it ↗</a>` : '';

function faccia(f) {
  const s = L.storia;
  if (!f) return '';
  switch (f.t) {
    case 'copertina': return `<div class="copertina-libro">${copertina(s, '<span class="apri" aria-hidden="true">Apri il libro →</span>')}</div>`;
    case 'risguardo': return '<div class="risguardo"></div>';
    case 'frontespizio': return `<div class="frontespizio">${icone.stella}<h2>${esc(s.titolo)}</h2><p>${esc(s.sottotitolo)}</p></div>`;
    case 'arte': return `<div class="arte">${arteDi(s.pagine[f.i], f.i + 1)}</div>`;
    case 'testo': return `<div class="testo-pagina">${icone.fregio}${testoDi(s.pagine[f.i], f.i + 1)}</div><div class="numero">${f.i + 1}</div>`;
    case 'unita': return `<div class="unita"><div class="arte">${arteDi(s.pagine[f.i], f.i + 1)}</div><div class="testo-pagina">${testoDi(s.pagine[f.i], f.i + 1)}</div></div><div class="numero">${f.i + 1}</div>`;
    case 'fine': return `<div class="finale">${icone.stella}<h2>Fine</h2>${f.azioni ? azioni + originale(s) : '<p>e vissero tutti felici e contenti</p>'}</div>`;
    case 'retro': return `<div class="finale"><h2 class="piccolo">Ti è piaciuta?</h2><p>Puoi rileggerla o sceglierne un'altra.</p>${azioni}${originale(s)}</div>`;
  }
}

// che cosa si vede in una posizione
function vista(pos) {
  if (!L.doppio) return { solo: L.facce[pos] };
  return { sx: pos === 0 ? null : L.facce[2 * pos - 1], dx: L.facce[2 * pos] || null };
}

function impostaPagina(el, f) {
  el.innerHTML = faccia(f);
  el.classList.toggle('vuota', !f);
}

function apriLibro(id) {
  const storia = tutte.find(s => s.id === id);
  if (!storia) return (location.hash = '#/');
  document.title = storia.titolo + ' · I Pasticciotti';
  const salvato = leggi('sfoglia:' + id, 0);
  L = { storia, pos: salvato > storia.pagine.length + 1 ? 0 : salvato, max: storia.pagine.length + 2, occupato: false, ascolta: false, turno: 0 };

  app.innerHTML = `<div class="lettore" style="--colore:${storia.colore};--carta-libro:${storia.carta}">
    <header class="barra">
      <a class="pulsante" href="#/" aria-label="Torna alla libreria">${icone.libri}<span class="etichetta">Libreria</span></a>
      <div class="titolo-barra">${esc(storia.titolo)}</div>
      ${'speechSynthesis' in window ? `<button class="pulsante" data-azione="ascolta" aria-pressed="false">${icone.voce}<span class="etichetta">Leggimi</span></button>` : ''}
      <button class="pulsante icona" data-azione="suono" aria-label="Suono delle pagine" aria-pressed="${!leggi('sfoglia:muto', false)}">${leggi('sfoglia:muto', false) ? icone.muto : icone.suono}</button>
    </header>
    <div class="palco">
      <button class="freccia prec" data-azione="prec" aria-label="Pagina precedente">${icone.indietro}</button>
      <div class="libro" data-vt="${id}"></div>
      <button class="freccia succ" data-azione="succ" aria-label="Pagina successiva">${icone.avanti}</button>
    </div>
    <footer class="fondo">
      <div class="puntini" role="group" aria-label="Pagine"></div>
      <span class="suggerimento">usa le frecce ← → della tastiera</span>
    </footer>
  </div>`;
  impagina();
}

function impagina() {
  const libro = app.querySelector('.libro');
  if (!libro) return;
  L.doppio = innerWidth >= 820 && innerWidth / innerHeight > 1.05;
  L.facce = facce(L.storia, L.doppio);
  libro.classList.toggle('singolo', !L.doppio);
  libro.innerHTML = L.doppio ? '<div class="pagina sx"></div><div class="pagina dx"></div>' : '<div class="pagina dx"></div>';
  disegna();
  const puntini = app.querySelector('.puntini');
  puntini.innerHTML = Array.from({ length: L.max + 1 }, (_, i) =>
    `<button data-vai="${i}" aria-label="${i === 0 ? 'Copertina' : i === L.max ? 'Fine' : i === 1 ? 'Inizio' : 'Pagina ' + (i - 1)}"></button>`).join('');
  aggiornaControlli();
}

function disegna() {
  const libro = app.querySelector('.libro');
  const v = vista(L.pos);
  if (L.doppio) {
    impostaPagina(libro.querySelector('.sx'), v.sx);
    impostaPagina(libro.querySelector('.dx'), v.dx);
  } else {
    impostaPagina(libro.querySelector('.dx'), v.solo);
  }
  libro.classList.toggle('chiuso', L.pos === 0);
}

function aggiornaControlli() {
  app.querySelector('.prec').disabled = L.pos === 0;
  app.querySelector('.succ').disabled = L.pos === L.max;
  app.querySelectorAll('.puntini button').forEach((b, i) => b.setAttribute('aria-current', i === L.pos));
  const libro = app.querySelector('.libro');
  const r = libro.getBoundingClientRect();
  app.querySelector('.palco').style.setProperty('--meta-libro', (L.doppio ? r.width : r.width) / 2 + 'px');
  scrivi('sfoglia:' + L.storia.id, L.pos);
}

function nuovaPagina(lato, f) {
  const d = document.createElement('div');
  d.className = lato;
  d.innerHTML = faccia(f);
  return d;
}

// Prepara il giro di pagina: pagine sotto e foglio che ruota, con l'animazione in pausa.
// Serve sia ai pulsanti (animazione intera) sia al trascinamento col dito (animazione guidata).
function preparaGiro(nuovo, easing) {
  const avanti = nuovo > L.pos;
  const libro = app.querySelector('.libro');
  const ora = vista(L.pos), poi = vista(nuovo);
  const foglio = document.createElement('div');
  let fotogrammi, durata = 820;

  if (L.doppio) {
    const sx = libro.querySelector('.sx'), dx = libro.querySelector('.dx');
    if (avanti) {
      foglio.className = 'foglio dx';
      foglio.append(nuovaPagina('fronte', ora.dx), nuovaPagina('retro', poi.sx));
      impostaPagina(dx, poi.dx);
      fotogrammi = [{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(-180deg)' }];
    } else {
      foglio.className = 'foglio sx';
      foglio.append(nuovaPagina('fronte', ora.sx), nuovaPagina('retro', poi.dx));
      impostaPagina(sx, poi.sx);
      fotogrammi = [{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(180deg)' }];
    }
    libro.classList.toggle('chiuso', nuovo === 0);
  } else {
    const pag = libro.querySelector('.dx');
    foglio.className = 'foglio';
    durata = 620;
    if (avanti) {
      foglio.append(nuovaPagina('fronte', ora.solo));
      impostaPagina(pag, poi.solo);
      fotogrammi = [{ transform: 'rotateY(0deg)', opacity: 1 }, { transform: 'rotateY(-80deg)', opacity: 1, offset: .7 }, { transform: 'rotateY(-110deg)', opacity: 0 }];
    } else {
      foglio.append(nuovaPagina('fronte', poi.solo));
      fotogrammi = [{ transform: 'rotateY(-110deg)', opacity: 0 }, { transform: 'rotateY(-80deg)', opacity: 1, offset: .3 }, { transform: 'rotateY(0deg)', opacity: 1 }];
    }
  }
  foglio.insertAdjacentHTML('beforeend', '<div class="luce"></div>');
  libro.append(foglio);
  const animazioni = [
    foglio.animate(fotogrammi, { duration: durata, easing, fill: 'both' }),
    foglio.querySelector('.luce').animate([{ opacity: 0 }, { opacity: .9 }, { opacity: 0 }], { duration: durata, easing: 'ease-in-out', fill: 'both' })
  ];
  animazioni.forEach(a => a.pause());
  return {
    durata,
    // avanzamento da 0 a 1, guidato dal dito
    a(t) { animazioni.forEach(x => (x.currentTime = Math.max(0, Math.min(1, t)) * durata)); },
    async completa() {
      animazioni.forEach(x => { x.playbackRate = 1; x.play(); });
      await animazioni[0].finished.catch(() => {});
      L.pos = nuovo; disegna(); foglio.remove();
      L.occupato = false; aggiornaControlli(); dopoGiro();
    },
    async annulla() {
      animazioni.forEach(x => { x.playbackRate = -1.6; x.play(); });
      await animazioni[0].finished.catch(() => {});
      disegna(); foglio.remove();
      L.occupato = false;
    }
  };
}

async function vai(nuovo, { anima = true } = {}) {
  if (!L || L.occupato || nuovo < 0 || nuovo > L.max || nuovo === L.pos) return;
  if (!anima || riduciMovimento.matches || Math.abs(nuovo - L.pos) > 1) {
    L.pos = nuovo; disegna(); aggiornaControlli(); dopoGiro(); return;
  }
  L.occupato = true;
  fruscio();
  await preparaGiro(nuovo, 'cubic-bezier(.45,.05,.3,1)').completa();
}

// ---------- suono di pagina (sintetizzato, niente file) ----------
let audio;
function fruscio() {
  if (leggi('sfoglia:muto', false)) return;
  try {
    audio ??= new AudioContext();
    const n = audio.sampleRate * .45, buf = audio.createBuffer(1, n, audio.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2) * (0.6 + 0.4 * Math.sin(i / n * Math.PI));
    const src = audio.createBufferSource(), filtro = audio.createBiquadFilter(), g = audio.createGain();
    src.buffer = buf; filtro.type = 'bandpass'; filtro.frequency.value = 2400; filtro.Q.value = .7; g.gain.value = .22;
    src.connect(filtro).connect(g).connect(audio.destination); src.start();
  } catch {}
}

// ---------- lettura ad alta voce ----------
function testoDa(pos) {
  const s = L.storia;
  if (pos === 0) return s.titolo;
  if (pos === 1) return s.titolo + '. ' + s.sottotitolo + '.';
  if (pos === L.max) return 'Fine.';
  return s.pagine[pos - 2].testo || '';
}

function voceItaliana() {
  const v = speechSynthesis.getVoices();
  return v.find(x => x.lang === 'it-IT' && /google|natural|online/i.test(x.name)) || v.find(x => x.lang.startsWith('it'));
}

function parla() {
  speechSynthesis.cancel();
  const turno = ++L.turno;
  const testo = testoDa(L.pos);
  if (!testo) { setTimeout(() => turno === L.turno && L.ascolta && (L.pos < L.max ? vai(L.pos + 1) : impostaAscolto(false)), 1500); return; }
  const u = new SpeechSynthesisUtterance(testo);
  u.lang = 'it-IT'; u.rate = .9; u.pitch = 1.08;
  const voce = voceItaliana(); if (voce) u.voice = voce;
  const parole = [...app.querySelectorAll('.libro > .pagina .w')];
  u.onboundary = e => {
    if (turno !== L.turno) return;
    let w = null;
    for (const p of parole) if (+p.dataset.c <= e.charIndex) w = p;
    parole.forEach(p => p.classList.toggle('ora', p === w));
  };
  u.onend = () => {
    if (turno !== L.turno || !L.ascolta) return;
    parole.forEach(p => p.classList.remove('ora'));
    if (L.pos < L.max) setTimeout(() => turno === L.turno && L.ascolta && vai(L.pos + 1), 900);
    else impostaAscolto(false);
  };
  speechSynthesis.speak(u);
}

function impostaAscolto(on) {
  L.ascolta = on;
  L.turno++;
  const b = app.querySelector('[data-azione="ascolta"]');
  if (b) b.setAttribute('aria-pressed', on);
  if (on) parla(); else speechSynthesis.cancel();
}

function dopoGiro() { if (L.ascolta) parla(); }

// ---------- eventi ----------
app.addEventListener('click', e => {
  const az = e.target.closest('[data-azione]')?.dataset.azione;
  const salto = e.target.closest('[data-vai]');
  if (az === 'prec') return vai(L.pos - 1);
  if (az === 'succ') return vai(L.pos + 1);
  if (az === 'ricomincia') return vai(0, { anima: false });
  if (az === 'libreria') return (location.hash = '#/');
  if (az === 'ascolta') return impostaAscolto(!L.ascolta);
  if (az === 'suono') {
    const muto = !leggi('sfoglia:muto', false);
    scrivi('sfoglia:muto', muto);
    const b = e.target.closest('button');
    b.setAttribute('aria-pressed', !muto); b.innerHTML = muto ? icone.muto : icone.suono;
    return;
  }
  if (salto) return vai(+salto.dataset.vai);
  // tocco sulle pagine: destra avanti, sinistra indietro
  const libro = e.target.closest('.libro');
  if (libro && !trascinato && !e.target.closest('a, button')) {
    const r = libro.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    vai(L.pos + (L.pos === 0 || x > (L.doppio ? .5 : .35) ? 1 : -1));
  }
});

// ---------- trascinamento: la pagina segue il dito ----------
let tocco = null, trascinato = false;
app.addEventListener('pointerdown', e => {
  const libro = e.target.closest('.libro');
  if (!libro || !L || L.occupato || e.target.closest('a, button') || (e.pointerType === 'mouse' && e.button !== 0)) return;
  tocco = { x0: e.clientX, y0: e.clientY, t0: performance.now(), id: e.pointerId, libro, giro: null, verso: 0, ultimoX: e.clientX, ultimoT: performance.now(), vx: 0 };
});
app.addEventListener('pointermove', e => {
  if (!tocco || e.pointerId !== tocco.id) return;
  const dx = e.clientX - tocco.x0, dy = e.clientY - tocco.y0;
  const ora = performance.now();
  tocco.vx = (e.clientX - tocco.ultimoX) / Math.max(1, ora - tocco.ultimoT);
  tocco.ultimoX = e.clientX; tocco.ultimoT = ora;
  if (!tocco.giro) {
    if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy)) return;
    const verso = dx < 0 ? 1 : -1;
    const nuovo = L.pos + verso;
    if (nuovo < 0 || nuovo > L.max || L.occupato || riduciMovimento.matches) { tocco = null; return; }
    L.occupato = true;
    tocco.verso = verso;
    tocco.giro = preparaGiro(nuovo, 'linear');
    try { tocco.libro.setPointerCapture(e.pointerId); } catch {}
    fruscio();
  }
  const corsa = tocco.libro.getBoundingClientRect().width * (L.doppio ? .7 : .75);
  tocco.giro.a((-dx * tocco.verso) / corsa);
});
async function fineTocco(e) {
  if (!tocco || e.pointerId !== tocco.id) return;
  const t = tocco; tocco = null;
  if (!t.giro) return;
  trascinato = true; setTimeout(() => (trascinato = false), 60);
  const corsa = t.libro.getBoundingClientRect().width * (L.doppio ? .7 : .75);
  const avanzamento = (-(e.clientX - t.x0) * t.verso) / corsa;
  const slancio = -t.vx * t.verso; // px/ms nella direzione del giro
  if (e.type !== 'pointercancel' && (avanzamento > .33 || slancio > .45)) await t.giro.completa();
  else await t.giro.annulla();
}
app.addEventListener('pointerup', fineTocco);
app.addEventListener('pointercancel', fineTocco);

addEventListener('keydown', e => {
  if (!app.querySelector('.lettore')) return;
  if (['ArrowRight', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.target.closest('button'))) { e.preventDefault(); vai(L.pos + 1); }
  if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); vai(L.pos - 1); }
  if (e.key === 'Home') vai(0, { anima: false });
  if (e.key === 'Escape') location.hash = '#/';
});

let doppioPrima;
addEventListener('resize', () => {
  if (!app.querySelector('.lettore')) return;
  const doppio = innerWidth >= 820 && innerWidth / innerHeight > 1.05;
  if (doppio !== doppioPrima) { doppioPrima = doppio; impagina(); } else aggiornaControlli();
});

// ---------- percorso ----------
function percorso() {
  if (L?.ascolta) impostaAscolto(false);
  const m = location.hash.match(/^#\/libro\/([\w-]+)/);
  const cambia = () => {
    if (m) { apriLibro(m[1]); doppioPrima = L?.doppio; } else { L = null; mostraLibreria(); }
    scrollTo(0, 0);
  };
  if (document.startViewTransition && !riduciMovimento.matches) document.startViewTransition(cambia); else cambia();
}
addEventListener('hashchange', percorso);
window.speechSynthesis?.getVoices();
percorso();
