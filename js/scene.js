// Disegna le scene delle storie come SVG (riquadro 400×300), in stile illustrazione a pennarello.

const INK = '#3b2a1a';
const ln = `stroke="${INK}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"`;
let uid = 0;

// numeri pseudo-casuali ripetibili, così una scena è sempre identica
function rng(seed) {
  let s = seed;
  return () => (s = (s * 9301 + 49297) % 233280) / 233280;
}

const occhio = (x, y, r = 3.2) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/><circle cx="${x + r * .35}" cy="${y - r * .35}" r="${r * .32}" fill="#fff"/>`;
const chiuso = (x, y, w = 5) => `<path d="M${x - w} ${y} q${w} ${w * .9} ${w * 2} 0" fill="none" ${ln}/>`;
const guance = (x1, x2, y, c = '#f4978e') => `<ellipse cx="${x1}" cy="${y}" rx="5" ry="3" fill="${c}" opacity=".7"/><ellipse cx="${x2}" cy="${y}" rx="5" ry="3" fill="${c}" opacity=".7"/>`;

const cieli = {
  giorno: ['#a8dcf0', '#eef8fb'],
  tramonto: ['#f2a65a', '#fbe3c8'],
  notte: ['#1c2650', '#3d4c86'],
  pioggia: ['#9fb0c4', '#dde3ea']
};

function suolo(tipo, notte) {
  const scuro = notte ? .55 : 1;
  switch (tipo) {
    case 'mare':
      return `<rect x="0" y="175" width="400" height="125" fill="#3aa6b9"/>
        <path d="M0 175 q25 -10 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 V190 H0z" fill="#5cc6d0"/>
        <path d="M30 230 q15 -6 30 0 M250 260 q15 -6 30 0 M140 280 q15 -6 30 0" fill="none" stroke="#e6f7f7" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>`;
    case 'fondale':
      return `<path d="M0 270 q100 -22 200 -6 t200 -4 V300 H0z" fill="#f1d9a7" ${ln}/>
        <circle cx="70" cy="285" r="3" fill="#d9b779"/><circle cx="260" cy="288" r="2.5" fill="#d9b779"/><circle cx="330" cy="280" r="3" fill="#d9b779"/>`;
    case 'bosco':
      return `<path d="M0 205 q80 -30 170 -8 t230 -10 V300 H0z" fill="${notte ? '#2c5a46' : '#5a9e6f'}"/>
        <path d="M0 232 q120 -28 230 -6 t170 0 V300 H0z" fill="${notte ? '#3b7356' : '#79b884'}" ${ln}/>`;
    case 'secco':
      return `<path d="M0 225 q110 -26 220 -8 t180 -2 V300 H0z" fill="#d9a066" ${ln}/>
        <path d="M60 255 l15 10 l-6 12 M210 250 l-12 14 l10 10 l-8 9 M320 262 l14 6 l2 14" fill="none" stroke="#9c6a3c" stroke-width="2" stroke-linecap="round"/>`;
    default:
      return `<path d="M0 222 q100 -30 210 -10 t190 -6 V300 H0z" fill="${notte ? '#3f7a52' : '#8cc97a'}" opacity="${scuro < 1 ? 1 : 1}"/>
        <path d="M0 245 q130 -24 250 -4 t150 -2 V300 H0z" fill="${notte ? '#4d8d5e' : '#a6d98b'}" ${ln}/>
        <path d="M40 270 l4 -9 l4 9 M300 275 l4 -9 l4 9 M170 285 l4 -9 l4 9" fill="none" stroke="${notte ? '#2f6141' : '#5f9c4e'}" stroke-width="2" stroke-linecap="round"/>`;
  }
}

const cose = {
  sole: () => {
    let raggi = '';
    for (let i = 0; i < 10; i++) {
      const a = i * Math.PI / 5;
      raggi += `<line x1="${Math.cos(a) * 36}" y1="${Math.sin(a) * 36}" x2="${Math.cos(a) * 48}" y2="${Math.sin(a) * 48}" ${ln} stroke="#f0a202"/>`;
    }
    return `<g class="gira">${raggi}</g><circle r="28" fill="#ffd25a" ${ln}/>${chiuso(-10, -3, 4)}${chiuso(4, -3, 4)}<path d="M-8 8 q8 7 16 0" fill="none" ${ln}/>`;
  },
  luna: () => {
    const id = 'l' + uid++;
    return `<defs><mask id="${id}"><rect x="-40" y="-40" width="80" height="80" fill="#fff"/><circle cx="14" cy="-10" r="26" fill="#000"/></mask></defs>
      <circle r="30" fill="#fff3c4" mask="url(#${id})"/><circle r="30" fill="none" mask="url(#${id})" ${ln} stroke="#e8cf7a"/>
      ${chiuso(-18, 0, 3)}<path d="M-20 12 q4 3 8 0" fill="none" ${ln}/>`;
  },
  stelle: () => {
    const r = rng(7);
    let s = '';
    for (let i = 0; i < 28; i++) {
      const x = r() * 400, y = r() * 170, k = .5 + r();
      s += `<circle class="brilla" style="animation-delay:${(r() * 3).toFixed(2)}s" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.1 * k).toFixed(2)}" fill="#fff6d6"/>`;
    }
    return s;
  },
  stella: (umore) => {
    let p = '';
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 11 : 25;
      p += `${i ? 'L' : 'M'}${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`;
    }
    const bocca = umore === 'triste' ? '<path d="M-5 9 q5 -5 10 0" fill="none" ' + ln + '/><path d="M8 2 q2 5 0 7 q-2 -2 0 -7z" fill="#7cc6f2"/>' : '<path d="M-5 5 q5 6 10 0" fill="none" ' + ln + '/>';
    return `<circle r="40" fill="#ffd94a" opacity=".12" class="alone"/><circle r="31" fill="#ffd94a" opacity=".16"/><path d="${p}Z" fill="#ffd94a" ${ln}/>${occhio(-6, -1, 2.4)}${occhio(6, -1, 2.4)}${bocca}`;
  },
  scia: () => `<path d="M-90 -30 Q40 -10 125 160" fill="none" stroke="#fff3b0" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/>`,
  riccio: (umore) => {
    let spine = 'M-34 6';
    for (let i = 0; i <= 12; i++) {
      const a = Math.PI + i * Math.PI / 12, r = i % 2 ? 30 : 42;
      spine += ` L${(Math.cos(a) * r * 1.05 + 4).toFixed(1)} ${(Math.sin(a) * r + 6).toFixed(1)}`;
    }
    const occhi = umore === 'dorme' ? chiuso(-30, -10, 4) : occhio(-30, -11, 3.4);
    const extra = umore === 'pensa' ? `<circle cx="-50" cy="-42" r="4" fill="#fff" ${ln}/><circle cx="-60" cy="-58" r="6" fill="#fff" ${ln}/><ellipse cx="-78" cy="-86" rx="22" ry="15" fill="#fff" ${ln}/><path d="M-78 -94 l2.5 5 l5.5 .6 l-4 3.8 l1 5.4 l-5 -2.6 l-5 2.6 l1 -5.4 l-4 -3.8 l5.5 -.6z" fill="#ffd94a"/>` : '';
    const zzz = umore === 'dorme' ? `<text x="-20" y="-50" font-family="Fraunces, serif" font-size="16" fill="#fff6d6" class="zzz">z z z</text>` : '';
    return `<ellipse cx="0" cy="8" rx="38" ry="5" fill="#000" opacity=".12"/>
      <path d="${spine} Z" fill="#7a5233" ${ln}/>
      <path d="M-18 6 q-22 2 -32 -12 q-4 -10 6 -14 q18 -6 30 10z" fill="#e9c9a0" ${ln}/>
      <circle cx="-49" cy="-14" r="4" fill="${INK}"/>${occhi}${guance(-36, -36, -2)}
      <path d="M-14 6 v6 M10 6 v6" ${ln}/>${extra}${zzz}`;
  },
  gufo: (modo) => {
    const ali = modo === 'vola'
      ? `<path d="M-20 -6 q-40 -24 -52 4 q22 -6 34 14z" fill="#9c6b45" ${ln}/><path d="M20 -6 q40 -24 52 4 q-22 -6 -34 14z" fill="#9c6b45" ${ln}/>`
      : `<path d="M-24 -4 q-8 16 2 28" fill="#9c6b45" ${ln}/><path d="M24 -4 q8 16 -2 28" fill="#9c6b45" ${ln}/>`;
    return `${ali}<ellipse cx="0" cy="0" rx="26" ry="32" fill="#b07d52" ${ln}/>
      <path d="M-22 -24 l-4 -16 l14 10 M22 -24 l4 -16 l-14 10" fill="#b07d52" ${ln}/>
      <ellipse cx="0" cy="10" rx="15" ry="17" fill="#ecd3ad"/>
      <circle cx="-10" cy="-10" r="10" fill="#fff" ${ln}/><circle cx="10" cy="-10" r="10" fill="#fff" ${ln}/>
      ${occhio(-9, -9, 4.2)}${occhio(11, -9, 4.2)}<path d="M-4 0 l4 7 l4 -7z" fill="#f0a202" ${ln}/>
      <path d="M-8 32 v5 M-4 32 v5 M4 32 v5 M8 32 v5" ${ln} stroke="#f0a202"/>`;
  },
  albero: () => `<path d="M-9 0 q4 -40 0 -80 h18 q-4 40 0 80z" fill="#8a5a3b" ${ln}/>
    <path d="M-50 -80 q-14 -36 18 -48 q8 -32 40 -24 q32 -12 42 22 q30 14 10 46 q-10 22 -56 18 q-44 6 -54 -14z" fill="#6fb36a" ${ln}/>
    <circle cx="-20" cy="-110" r="5" fill="#e85d5d"/><circle cx="18" cy="-96" r="5" fill="#e85d5d"/><circle cx="2" cy="-130" r="5" fill="#e85d5d"/>`,
  fiore: (x) => {
    if (x === 'appassito') {
      return `<path d="M0 0 q-2 -30 10 -42" fill="none" ${ln} stroke="#8a9a5b"/>
        <g transform="translate(14 -36) rotate(110)">${petali('#c9b38f', 9)}</g><path d="M-2 -14 q-12 -4 -14 4 q8 4 14 -4z" fill="#a7b06a" ${ln}/>`;
    }
    return `<path d="M0 0 v-42" ${ln} stroke="#4e8a3e"/><path d="M0 -16 q14 -10 18 0 q-10 6 -18 0z" fill="#79b884" ${ln}/>
      <g transform="translate(0 -50)" class="dondola">${petali(x || '#ffb4a2', 10)}</g>`;
  },
  balena: (umore) => {
    const occhi = umore === 'gonfia' ? chiuso(-52, -18, 5) : occhio(-52, -18, 4.2);
    let bocca = '<path d="M-82 4 q24 14 54 6" fill="none" ' + ln + '/>';
    if (umore === 'sorpresa') bocca = `<ellipse cx="-66" cy="8" rx="7" ry="9" fill="#5a2e36" ${ln}/>`;
    const gonfie = umore === 'gonfia' ? `<circle cx="-62" cy="-2" r="14" fill="#9bd3ea" ${ln}/>` : guance(-44, -44, -4);
    const rot = umore === 'salta' ? 'rotate(-14)' : '';
    return `<g transform="${rot}"><path d="M-88 0 q0 -52 70 -54 q70 -2 94 34 q12 -24 36 -30 q-4 26 -18 40 q16 14 18 36 q-28 -6 -40 -22 q-30 30 -100 26 q-60 -2 -60 -30z" fill="#5b8fc9" ${ln}/>
      <path d="M-84 8 q30 34 110 18" fill="#cde4f2" ${ln}/><path d="M-60 20 v8 M-40 24 v9 M-20 26 v9 M0 26 v8" stroke="#8fb5d6" stroke-width="2" stroke-linecap="round"/>
      ${gonfie}${occhi}${bocca}<path d="M-6 -6 q14 18 -4 30" fill="none" ${ln}/></g>`;
  },
  bolle: () => [[0, 0, 7], [14, -22, 5], [-6, -40, 4], [10, -58, 6]].map(([x, y, r], i) => `<circle class="sale" style="animation-delay:${i * .4}s" cx="${x}" cy="${y}" r="${r}" fill="#fff" fill-opacity=".35" stroke="#fff" stroke-width="2"/>`).join(''),
  pesce: (c = '#ff9f43') => `<path d="M14 0 l18 -14 v28z" fill="${c}" ${ln}/><ellipse rx="22" ry="15" fill="${c}" ${ln}/>
    <path d="M-2 -14 q8 -10 14 2" fill="${c}" ${ln}/>${occhio(-10, -3, 3)}<path d="M-20 5 q4 3 7 0" fill="none" ${ln}/><path d="M2 -8 q4 8 0 16" fill="none" ${ln} stroke-width="2"/>`,
  spruzzo: () => `<g class="zampilla"><path d="M0 40 q-4 -40 -28 -56 M0 40 q0 -50 0 -70 M0 40 q4 -40 28 -56" fill="none" stroke="#7fd0e0" stroke-width="7" stroke-linecap="round"/>
    <circle cx="-30" cy="-22" r="5" fill="#bfeaf1"/><circle cx="0" cy="-36" r="6" fill="#bfeaf1"/><circle cx="30" cy="-22" r="5" fill="#bfeaf1"/></g>`,
  nuvola: (tipo) => {
    const fill = tipo === 'grigia' ? '#c3cad6' : tipo === 'rossa' ? '#ffe1e1' : '#fff';
    const corpo = `<path d="M-46 14 q-22 0 -20 -18 q2 -16 20 -16 q4 -24 30 -24 q20 -18 42 0 q26 -4 30 20 q20 4 16 24 q-2 14 -20 14z" fill="${fill}" ${ln}/>`;
    if (tipo === 'grigia' || !tipo) return corpo;
    let viso = `${occhio(-12, -2, 3)}${occhio(12, -2, 3)}<path d="M-5 7 q5 5 10 0" fill="none" ${ln}/>`;
    if (tipo === 'rossa') viso = `${occhio(-12, -2, 3)}${occhio(12, -2, 3)}${guance(-22, 22, 6, '#f26b6b')}<path d="M-4 8 q4 -3 8 0" fill="none" ${ln}/>`;
    if (tipo === 'sforzo') viso = `<path d="M-17 -5 l7 3 l-7 3 M17 -5 l-7 3 l7 3" fill="none" ${ln}/><path d="M-6 8 h12" ${ln}/>${guance(-24, 24, 6)}`;
    if (tipo === 'felice') viso = `${chiuso(-12, -2, 4)}${chiuso(12, -2, 4)}${guance(-22, 22, 6)}<path d="M-7 5 q7 9 14 0" fill="#e66" ${ln}/>`;
    if (tipo === 'faccia') viso += guance(-22, 22, 6);
    return `<g class="galleggia">${corpo}${viso}</g>`;
  },
  tartaruga: () => `<ellipse cx="0" cy="4" rx="30" ry="4" fill="#000" opacity=".1"/>
    <path d="M-24 0 q-8 6 -4 10 M18 0 q8 6 4 10" fill="#86c17c" ${ln}/>
    <path d="M30 -6 q16 -14 24 -4 q4 10 -12 12z" fill="#86c17c" ${ln}/>${occhio(44, -8, 2.6)}
    <path d="M-30 0 q2 -36 32 -36 q30 0 32 36z" fill="#5c9c58" ${ln}/>
    <path d="M-14 -4 l6 -14 h16 l6 14 M-8 -18 l-8 -10 M14 -18 l8 -10" fill="none" stroke="#3f7a43" stroke-width="2.2" stroke-linecap="round"/>`,
  alga: () => `<path class="ondeggia" d="M0 0 q-14 -30 0 -60 q14 -30 0 -70 M14 0 q10 -30 -2 -54 q-10 -24 4 -48" fill="none" stroke="#3c9a6b" stroke-width="7" stroke-linecap="round"/>`,
  corallo: (c = '#ef767a') => `<path d="M0 0 v-40 m0 10 l-18 -22 v-14 m18 26 l16 -20 v-18 m-34 22 l-10 -10" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round"/>`,
  scoglio: () => `<path d="M-60 10 q-6 -50 30 -66 q30 -16 56 6 q30 14 34 60z" fill="#8d8f9e" ${ln}/><path d="M-24 -30 q10 -8 22 -2" fill="none" stroke="#b6b8c4" stroke-width="3" stroke-linecap="round"/>`,
  lumaca: (tipo) => {
    const guscio = `<circle cx="4" cy="-18" r="18" fill="#e9a35a" ${ln}/><path d="M4 -18 m0 -3 a3 3 0 1 1 -3 4 a7 7 0 1 1 9 6 a12 12 0 1 1 -16 -10" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>`;
    if (tipo === 'nascosta') return guscio;
    return `<path d="M-34 0 q-4 -16 6 -22 l-2 -12 m8 10 l4 -12 q2 20 0 24 h40 q8 0 10 6 q-30 8 -66 6z" fill="#cfe0a2" ${ln}/>
      <circle cx="-30" cy="-36" r="2.6" fill="${INK}"/><circle cx="-18" cy="-36" r="2.6" fill="${INK}"/><path d="M-30 -12 q4 4 8 0" fill="none" ${ln}/>${guscio}`;
  },
  goccia: () => `<path class="cade" d="M0 -14 q12 16 8 24 q-4 8 -8 8 q-4 0 -8 -8 q-4 -8 8 -24z" fill="#7cc6f2" ${ln}/>`,
  vento: () => `<g class="soffia"><path d="M-60 -10 h70 q18 0 16 -14 q-2 -12 -14 -8 M-70 10 h90 q20 0 20 14 q0 12 -14 10 M-50 30 h46" fill="none" stroke="#7fa7c9" stroke-width="5" stroke-linecap="round"/></g>
    <circle cx="-80" cy="0" r="16" fill="#e7f2fb" ${ln}/>${chiuso(-86, -2, 3)}<ellipse cx="-74" cy="6" rx="4" ry="5" fill="${INK}"/>`,
  pioggia: (k = 1) => {
    const r = rng(3);
    let s = '';
    const n = Math.round(46 * k);
    for (let i = 0; i < n; i++) {
      const x = -180 + r() * 360, y = 110 + r() * 150;
      s += `<line class="piove" style="animation-delay:${(r() * 1.2).toFixed(2)}s" x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x - 3).toFixed(1)}" y2="${(y + 12).toFixed(1)}" stroke="#5aa9e6" stroke-width="2.6" stroke-linecap="round"/>`;
    }
    return s;
  },
  arcobaleno: () => ['#e85d5d', '#f4a259', '#f6d55c', '#79b884', '#5aa9e6', '#8f6bc4'].map((c, i) => `<path d="M${-170 + i * 12} 0 a${170 - i * 12} ${150 - i * 12} 0 0 1 ${340 - i * 24} 0" fill="none" stroke="${c}" stroke-width="12"/>`).join('')
};

function petali(c, r) {
  let p = '';
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3;
    p += `<circle cx="${(Math.cos(a) * r).toFixed(1)}" cy="${(Math.sin(a) * r).toFixed(1)}" r="${r * .75}" fill="${c}" ${ln}/>`;
  }
  return p + `<circle r="${r * .6}" fill="#ffd25a" ${ln}/>`;
}

// un singolo personaggio, per icone e decorazioni
export function figura(tipo, extra, viewBox = '-60 -50 120 70') {
  return `<svg viewBox="${viewBox}" aria-hidden="true">${cose[tipo](extra)}</svg>`;
}

export function scena(s, etichetta = '') {
  const id = 'c' + uid++;
  const sottacqua = s.suolo === 'fondale';
  const [alto, basso] = sottacqua ? ['#2b8fa3', '#7fd0d8'] : cieli[s.cielo] || cieli.giorno;
  const notte = s.cielo === 'notte';
  // le cose sopra la linea del mare vanno disegnate prima dell'acqua? No: le disegniamo tutte sopra, in ordine.
  const disegni = s.cose.map(([tipo, x, y, k = 1, extra]) =>
    `<g transform="translate(${x} ${y}) scale(${k})">${cose[tipo] ? cose[tipo](extra) : ''}</g>`).join('');
  return `<svg viewBox="0 0 400 300" role="img" aria-label="${etichetta}" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${alto}"/><stop offset="1" stop-color="${basso}"/></linearGradient></defs>
    <rect width="400" height="300" fill="url(#${id})"/>
    ${sottacqua ? '<path d="M40 0 l40 300 M150 0 l20 300 M290 0 l-30 300" stroke="#fff" stroke-opacity=".08" stroke-width="30"/>' : ''}
    ${suolo(s.suolo, notte)}${disegni}</svg>`;
}
