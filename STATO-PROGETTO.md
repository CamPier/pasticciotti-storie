# Pasticciotti – proposta di design "libri da sfogliare"

Aggiornato al 14/10/2026.

## Obiettivo
Proposta di redesign per la sezione storie di https://pasticciotti.it/storie/: ogni storia diventa un
libro illustrato da sfogliare, pensato per bambini.

## Come avviarlo
```
node serve.mjs
```
Poi apri http://localhost:5173. Il server ricarica la pagina da solo quando un file cambia.

## Struttura dei file
| File | Contenuto |
|---|---|
| `index.html` | Pagina principale: carica i font (Fraunces per i titoli, Andika per il testo) e `js/app.js` |
| `css/stile.css` | Tutto lo stile: libreria, scaffale, lettore, animazioni delle scene, segnaposto |
| `js/app.js` | Libreria, lettore, animazione della pagina che si gira, comandi, lettura ad alta voce, suono |
| `js/storie.js` | Dati: `pasticciotti` (14 libri veri) e `storie` (3 libri dimostrativi originali) |
| `js/scene.js` | Disegni SVG originali dei libri dimostrativi |
| `serve.mjs` | Server locale con ricaricamento automatico |

## Cosa è fatto
- **Libreria**
  - Logo dei Pasticciotti in alto.
  - Scaffale "Le storie dei Pasticciotti" con i 14 titoli e le copertine originali, caricate da pasticciotti.it.
  - Scaffale "Esempi di lettura completa" con i 3 libri dimostrativi.
  - Su telefono ogni scaffale scorre in orizzontale con lo swipe e si ferma su un libro alla volta.
  - Un nastrino segna la pagina dove si era rimasti (salvata in localStorage).
- **Lettore**
  - Su schermi larghi il libro si apre a due pagine e parte chiuso sulla copertina.
  - Su telefono si vede una pagina alla volta, con disegno e testo insieme.
  - Le pagine si girano con un'animazione 3D.
  - **Swipe:** trascinando col dito (o col mouse) la pagina segue il movimento. Se la lasci oltre circa un terzo, o con uno scatto veloce, si gira; altrimenti torna indietro.
  - Comandi: frecce a schermo, tasti ← →, tocco sul lato della pagina, trascinamento col dito, pallini per saltare a una pagina, Esc per tornare alla libreria.
  - "Leggimi": lettura ad alta voce in italiano con le parole evidenziate e le pagine che si girano da sole.
  - Fruscio di carta a ogni pagina, che si può spegnere.
  - Con l'opzione di sistema "riduci movimento" le animazioni si disattivano.
- **Libri dei Pasticciotti**
  - Copertina vera, frontespizio con i crediti (storie di Francesca Buraschi, illustrazioni di Cecilia Buraschi).
  - 4 coppie di pagine **segnaposto**: un riquadro "Illustrazione pagina N" e delle righe di testo grigie.
  - Pagina finale con il link "Leggi su pasticciotti.it".
- **Controlli fatti con screenshot:** libreria, copertina, libro aperto e pagine segnaposto su desktop; libreria e lettore su telefono (390px).

## Cosa resta da fare
1. **Inserire i contenuti veri** forniti dalla cliente. In `js/storie.js`, per ogni libro del catalogo `pasticciotti`,
   si sostituisce `segnaposto(4)` con le pagine reali:
   ```js
   pagine: [
     { testo: '…', immagine: 'images/il-lupo-1.png' },
     { testo: '…', immagine: 'images/il-lupo-2.png' }
   ]
   ```
2. **Copiare in locale le immagini originali** (logo e copertine) avute dalla cliente, in una cartella `images/`.
   Oggi sono caricate da pasticciotti.it e serve la connessione internet.
3. Decidere se tenere nel sito finale i 3 libri dimostrativi o toglierli.
4. Da verificare:
   - l'animazione della pagina che si gira, vista dal vivo;
   - la lettura ad alta voce su più browser (la voce italiana dipende dal sistema);
   - i libri dei Pasticciotti su telefono.
5. Facoltativo: pagine "Segnalibri" e "Chi siamo" nello stesso stile, e la pubblicazione online.

## Note
- I testi delle storie dei Pasticciotti non sono riprodotti nel progetto: vanno inseriti dal materiale fornito dalla cliente.
- Le skill "frontend-design", "Impeccable" e "Design Taste Frontend" non erano installate. Il design segue comunque gli stessi principi: aspetto da libro illustrato, carta color crema con grana leggera, pulsanti grandi per i bambini.
