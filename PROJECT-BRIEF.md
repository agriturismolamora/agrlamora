# Agriturismo La Mora — Brief tecnico di progetto
Sintesi operativa del kick-off, organizzata per sviluppo. Brand identity invariata, immagini attuali come placeholder.

---

## 1. Sitemap

- **Home**
- **Sistemazioni** — pagina di elenco + dettaglio per ognuno dei 5 appartamenti:
  - Appartamento Pesci — piano terra
  - Appartamento Acquario — primo piano
  - Appartamento Sagittario — **pet-friendly**, piano terra, giardino privato e gazebo esterno
  - Appartamento Gemelli — **pet-friendly**, piano terra, giardino privato
  - Appartamento Bilancia — primo piano, giardino privato e gazebo privato
  - Dotazioni comuni a tutte le unità (da riportare in ogni scheda): TV satellitare, specchi, porta valigie, biancheria da letto e da bagno, cucina attrezzata, cassaforte, aria condizionata, Wi-Fi, parcheggio gratuito all'interno della struttura, barbecue in comune (incluso) — ultimi due aggiunti su indicazione del titolare il 29/09/2026
  - Servizi della struttura con sezione dedicata in ogni scheda: lavatrice in comune, uso incluso (29/09/2026 — nessuna foto disponibile, nessun altro dettaglio confermato)
- **Piscina** — pagina dedicata: aperta dal 1° maggio al 28 settembre, orario giornaliero 09:00–19:00; nelle ore più calde viene azionata anche una fontana idromassaggio
- **Colazione** — pagina dedicata: bio, dalle 08:00 alle 09:30, dolce inclusa/opzionale 5€ p/giorno, supplemento salata +10€ a persona, supplemento senza glutine +5€ (quindi 10€ se richiesta anche la dolce), offerta variabile in base a stagionalità/prodotti locali (dolci tipici umbri di alta pasticceria — non più fatti in casa —, frutta di stagione, caffè/cappuccino/tea/ginseng su richiesta)
- **Villa Relax** — pagina dedicata: villa indipendente, stessa proprietà/P.IVA di Agriturismo La Mora ma immobile e indirizzo distinti (Via Di Bassano, 19 — Assisi PG), gestita dallo stesso host (Paolo). NON è uno dei 5 appartamenti. Fino a 16 ospiti su 6 camere da letto (bagno/doccia privati ciascuna), prenotabile per intero o in due porzioni (6 e 10 persone). Piscina privata, giardino, gazebo, barbecue, campo da calcetto in erba, ping pong, **colonnina di ricarica elettrica da 7 kW** (confermata dal titolare il 13/10/2026; quella di La Mora è da 22 kW, vedi sezione 2), culla su richiesta a 15 € a soggiorno (confermata il 21/10/2026). Booking bar dedicata, separata da quella degli appartamenti. Dati verificati navigando il sito reale https://www.villaassisi.it/it/ il 5 settembre 2026 (dettagli completi in src/data/villa.ts) — non un confronto in tempo reale, non va fatto scraping automatico e continuo.
- **Guida di benvenuto** — creata dal titolare (PDF). NON un link Drive scaricabile dal sito (rimosso su richiesta): il pulsante "Richiedi la guida su WhatsApp", ben visibile in alto su ogni pagina appartamento e nella sezione "Gli appartamenti" della home, apre la chat WhatsApp dell'agriturismo, dove la guida è già pronta (link in src/data/apartments.ts, BROCHURE_WHATSAPP_URL)
- **Attività & Servizi** — e-bike, cavalli dell'azienda agricola (solo da vedere, vedi nota sezione 3), parco giochi + babysitting, cucina bio (dettaglio sezione 3)
- **Promozioni & Cofanetti regalo** — vedi sezione 4
- **Territorio** — Assisi (Basilica di San Francesco, Piazza del Comune, Rocca Maggiore/Minore), dintorni, Perugia — sostituisce/aggiorna [/territorio/](https://www.agriturismoinassisi.it/territorio/). Piazza del Comune, Rocca Maggiore e Rocca Minore: nessuna foto della struttura disponibile per questi 3 luoghi, quindi foto reali e specifiche del luogo con licenza libera (pubblico dominio / CC BY / CC BY-SA) da Wikimedia Commons, con relativo credito fotografico visibile in pagina — mai foto stock generiche
- **Blog/editoriale** — max 20 articoli iniziali, alimentato dalla pagina Territorio (contenuti turistici + posizionamento SEO/GEO)
- **Prenota ora** — booking engine
- **Recensioni** — widget dinamico + link a pagina dedicata
- **Contatti**
- Tutto in **IT / EN / FR / DE**, con lingua proposta in base a provenienza utente (geolocalizzazione IP o browser lang — da decidere in fase tecnica)

Cartelle immagini per tutti i 5 appartamenti già pronte in `public/images/sistemazioni/`.

---

## 2. Booking engine (sviluppato da zero)

**Flusso richiesta prezzo:**
- Utente inserisce date → sistema calcola prezzo → popup di confronto con OTA (Booking, Airbnb, Trivago) che evidenzia il vantaggio della prenotazione diretta (niente commissioni, sconti esclusivi, ecc.)

**Sconti:**
- Soggiorno minimo 7 notti → **-10%**
- Cliente di ritorno (dalla 2ª prenotazione) → **-10%**
- Tariffa non rimborsabile → **-10%** rispetto alla rimborsabile

**Pagamento:**
- Caparra **25%** al momento della prenotazione — bonifico bancario, carta di credito (Stripe), PayPal (incl. pagamento a 3 rate)
- Saldo all'arrivo
- Due tariffe: rimborsabile / non rimborsabile

**Politiche di cancellazione:**
| Stagione | Preavviso disdetta | No-show |
|---|---|---|
| Bassa | 7 giorni | Perde la caparra |
| Media | 14 giorni | Paga l'intero importo |
| Alta (lug–ago) | 21 giorni | Paga l'intero importo |

**Conferma:** unificare in un unico flusso richiesta/conferma immediata (dettaglio da definire: conferma immediata se disponibilità certa, altrimenti richiesta con risposta manuale).

**Minimi notti:**
- Bassa stagione: 2 notti
- Media stagione: 3–4 notti
- Alta stagione: settimanale, arrivo sabato–sabato (eccezioni via contatto telefonico/WhatsApp → checkbox dedicata nel form "contattami per date diverse")

**Form di prenotazione:**
- Dropdown età bambini + numero adulti
- Checkbox presenza animali → se selezionata, redirect automatico alle sole unità pet-friendly (**confermato: solo Gemelli e Sagittario**)

**Animali:**
- 25€/soggiorno, in Gemelli e Sagittario (gli unici due con giardino privato). Su indicazione del titolare (ottobre 2026) il giardino NON va descritto come "recintato" in nessun testo.
- Dropdown taglia + razza, con blacklist per razze considerate pericolose (sistema segnala "non accettato")
- Nota obbligatoria: guinzaglio all'interno della struttura
- Negli altri tre appartamenti (Pesci, Acquario, Bilancia): ammessi solo animali di piccola taglia, previo accordo diretto col proprietario, sempre a 25€/soggiorno (confermato dal titolare)

**Tassa di soggiorno:** **3€/persona/giorno** (confermato, valore corretto), primi 3 giorni, esenti under 12 — calcolata automaticamente nel riepilogo prenotazione. Il vecchio sito riportava 2€ nei cofanetti regalo: sul nuovo sito va unificato ovunque a 3€.

**Extra selezionabili in fase di booking:**
- E-bike a noleggio (listino in sezione 3)
- Culla: 15 € a soggiorno (aggiornato dal titolare a ottobre 2026; prima 10 €), **anche a Villa Relax** (confermato il 21/10/2026). Nessun seggiolone da dichiarare.
- Colonnina di ricarica 22kW (La Mora; quella di Villa Relax è da 7 kW): checkbox da selezionare **subito** in fase di prenotazione (serve al proprietario per organizzarsi)

---

## 3. Attività & servizi in loco

**E-bike** — contatto diretto Paolo [+39 393 4363917](tel:+393934363917), consegna/ritiro presso la direzione. Accensione luci: tasto + tenuto premuto 5 secondi.

| Durata | Prezzo |
|---|---|
| 1/2 giornata | €15,00 |
| 1 giorno | €25,00 |
| Weekend | €40,00 |
| 7 giorni | €90,00 |

**Cavalli** — fanno parte dell'azienda agricola, gli ospiti possono vederli e avvicinarli. ⚠️ **Corretto qui il 20/09/2026**: la versione precedente di questa riga parlava di "passeggiate a cavallo nel maneggio interno, lezioni per adulti e bambini" — informazione risultata in contraddizione con quanto già pubblicato nel sito (pagina Attività, FAQ), che dichiara esplicitamente che **non vengono organizzate lezioni di equitazione né passeggiate a cavallo**. Non essendo chiaro quale delle due versioni rispecchi la situazione reale, il sito non è stato modificato: se l'agriturismo offre davvero questo servizio, va segnalato per aggiungerlo (non è presente da nessuna parte sul sito oggi).

**Family** — parco giochi (altalene, scivoli, giostre) + servizio di babysitting su richiesta.

**Cucina bio e prodotti locali** — colazione biologica con marmellate fatte in casa, frutta di stagione, olio EVO; enfasi su sostenibilità e km0 (contenuto da riusare anche nella pagina Colazione).

---

## 4. Promozioni & Cofanetti regalo

**Promo Ottavo Centenario di San Francesco** — colazione bio inclusa per chi prenota direttamente dal sito ufficiale. **Contenuto permanente** (non a tempo), landing page dedicata da ricreare (attuale: [/agriturismo-con-colazione-inclusa-assisi/](https://www.agriturismoinassisi.it/agriturismo-con-colazione-inclusa-assisi/)).

**Smartbox** — redirect esterno verso [https://myaccount.smartbox.com/it/voucher/register/](https://myaccount.smartbox.com/it/voucher/register/) (registrazione voucher, gestita interamente da Smartbox, nessuna integrazione lato nostro oltre al link).

**Cofanetti regalo** — "Bilocale" è un nome generico di tipologia (non un'unità specifica tra le 5 nominate): l'assegnazione avviene dinamicamente su una delle unità di quel tipo disponibili.

| Nome | Persone | Incluso | Prezzo | Extra da pagare a parte |
|---|---|---|---|---|
| Due notti in fuga | 2 | 2 notti Bilocale + 2 colazioni all'italiana | €139,90 | Pulizia finale €25 + tassa soggiorno €3/persona/giorno |
| Tre giorni in famiglia | 4 | 2 notti Bilocale + 2 colazioni all'italiana | €189,90 | Pulizia finale €25 + tassa soggiorno €3/persona/giorno |
| 4 giorni fuori dal mondo | 2 | 3 notti Bilocale + 3 colazioni all'italiana | €189,90 | Pulizia finale €25 + tassa soggiorno €3/persona/giorno |
| Due notti romantiche | 2 | 2 notti Bilocale + 2 colazioni + drink di benvenuto | €159,90 | Pulizia finale €25 + tassa soggiorno €3/persona/giorno |

---

## 4-ter. Famiglie, animali e piscina — fatti confermati dal titolare (ottobre 2026)

Pagine sul sito: `/vacanza-con-animali/` e `/vacanza-in-famiglia/` (dati in `src/data/hubs.ts`).

- **Supplemento animali**: 25 € a soggiorno. Appartamenti pet friendly: solo Gemelli e Sagittario (negli altri, piccola taglia previo accordo, vedi sezione 2). Il modulo richieste ha taglia e tipo di animale. **Non dichiarare "giardini recintati".**
- **Culla**: 15 € a soggiorno (sostituisce i 10 € precedenti), su richiesta, **anche a Villa Relax** (21/10/2026: `src/data/villa.ts`, pagina Villa, JSON-LD, chat). **Non menzionare i seggioloni.**
- **Riduzioni bambini** (gestite nella sezione sconti di bed-and-breakfast.it): 0–2 anni gratis; da 3 a 8 anni non compiuti 50%; da 8 a 11 anni non compiuti 30%. Il titolare non ha detto su quale voce si applicano: sul sito solo "riduzioni per i bambini" con le fasce e l'invito a indicare le età in prenotazione, senza dire che il motore le applica da solo. Da chiarire: confine a 8 anni (un bambino di 2 anni e mezzo? e chi ha esattamente 8 anni ricade nella fascia 30%?) e base di applicazione.
- **Parco giochi**: sempre libero, sotto la supervisione degli adulti.
- **Piscina**: cuffia obbligatoria per i bambini fino a 16 anni, scritta come regola della struttura (interpretazione "regola della piscina" da confermare).
- **Menù bambini** al Ristorante Carfagna: 15 € (3–10 anni), vedi sezione 4-bis.

## 4-bis. Ristorante convenzionato — Ristorante Carfagna (Assisi)

Confermato dal titolare (ottobre 2026). Ristorante **indipendente** (gestito da L'Arte del Gusto s.r.l.), convenzionato con La Mora. Pagina sul sito: `/ristorante-convenzionato/` (dati in `src/data/ristorante-carfagna.ts`).

| Proposta | Prezzo | Dettaglio |
|---|---|---|
| Menù bambini (3–10 anni) | 15 € | Da concordare in base alle esigenze dei bambini |
| Menù del giorno | 25 € a persona | Scelta dal menù del giorno; bevande, caffè e dolce della casa inclusi |
| Menù dalla carta | 35 € a persona | Dalla carta: 1 antipasto (escluso l'antipasto Carfagna), 1 primo (escluso il tartufo), 1 secondo, 1 contorno, 1 dolce; bevande e caffè inclusi |

- **Nessuno sconto sul menù alla carta** (politica aziendale del ristorante): non va mai menzionato, né sul sito né nei PDF.
- Per usare la convenzione basta mostrare il PDF (`public/downloads/la-mora-convenzione-ristorante-carfagna-<lingua>.pdf`) o la pagina del sito: il ristorante conosce già le condizioni. Il ristorante pubblicherà il PDF sulla sua pagina Facebook.
- Indirizzo e sito verificati sulla pagina ufficiale https://www.lartedelgustosrl.com/carfagna-assisi/ (21/10/2026): Via Campiglione 1, 06081 Assisi (PG). Facebook: https://www.facebook.com/ristorantecarfagna/ — album "Assisi dal Ristorante Carfagna": https://www.facebook.com/ristorantecarfagna/albums/775284610395634/
- Distanza da La Mora: 7,0 km, circa 12 min in auto (Google Maps, 21/10/2026, primo percorso senza strade a traffico limitato).
- Foto: fornite dal ristorante tramite il titolare, **senza filigrana La Mora**, con credito "Foto: Ristorante Carfagna".

## 4-quater. Articolo "Capodanno ad Assisi" — da aggiornare ogni anno

Pagina: `/blog/capodanno-assisi-2027/` (testo in `src/data/blog-posts.ts`, `CAPODANNO_POST`; date del conto alla rovescia, ultima verifica e fonti in `src/data/capodanno.ts`). **Ogni anno**: nuovo anno nello slug e nel titolo, programma aggiornato dal Comune, `dateModified` / ultima verifica.

Verificato il 21/10/2026 (programma 2026/27 non ancora pubblicato, quindi sul sito sempre con l'anno):
- 31/12/2025, Piazza del Comune: Antonio Ballarano Band e DJ set, 22:00–03:00 (visit-assisi.it, tuttoggi.info).
- Ordinanze anti-botti 2024 e 2025 nel centro storico (2025: dalle 20 del 31/12 alle 8 dell'1/1, anche divieto di vetro e lattine; tra i motivi la tranquillità degli animali).
- Basilica di San Francesco: Messa con Te Deum il 31/12 alle 17 nella Basilica inferiore (2024, 2025); veglia di Capodanno del Centro Francescano Giovani alle 23 (2024).
- Porziuncola, 31/12/2025: 18:00 incontro giovani, 19:15 Vespri e Te Deum, 23:30 Messa di fine anno; 1/1/2026 Messa solenne 11:30 (assisiofm.it).
- Presepe vivente di Petrignano 2025/26: anche l'1/1, 17:15–19:30 (provincia.perugia.it). Armenzano: date solo di edizioni passate.
- **Non confermati, quindi non citati**: fuochi d'artificio sulla Rocca Maggiore, radio locale al concerto, concerti gospel, "cammini" dei giovani.

**Pacchetto Capodanno La Mora** (confermato dal titolare il 21/10/2026, dati in `src/data/promo.ts`, `CAPODANNO_PACKAGE_2027`):
- 4 notti con colazione inclusa. **Per 2 persone 450 €; per 3 persone 500 €; per 4 persone 550 €.**
- Date esatte, appartamenti inclusi e altre condizioni: **non indicati** (costanti `dates` e `apartments` a `null`, mai mostrate). Sul sito: "4 notti per Capodanno" e "Date e disponibilità: chiedi a Paolo".
- **Non ancora nel motore di prenotazione** (lo crea il titolare): `inMotore: false` → CTA WhatsApp "Chiedi il pacchetto a Paolo". Quando è nel motore: `inMotore: true` e la CTA diventa da sola "Prenota" (BookingModalButton).
- Visibilità sul sito: da subito fino a fine giornata del **02/01/2027** (ora italiana) — valore predefinito, **da confermare** col titolare. Tiene accesa l'etichetta "Offerte in corso!" nell'header; nessun popup in home; nessun JSON-LD Offer.

**Menù di Capodanno del Ristorante Carfagna**: il ristorante ne preparerà uno, **non ancora ricevuto** (21/10/2026). Non pubblicare nulla, nemmeno "in arrivo": slot `CARFAGNA_CAPODANNO_MENU = null` in `src/data/ristorante-carfagna.ts`.

## 5. Segmenti target (per copy e struttura contenuti)

- **Famiglie** → collegare a parco giochi bambini + piscina bambini + babysitting
- **Coppie** → cofanetto "Due notti romantiche" come cross-sell
- **Viaggi di lavoro** → valorizzare vicinanza a Umbria Fiere
- **Ospiti con animali** → redirect a Gemelli/Sagittario
- **Mercati esteri prioritari:** Olanda, Belgio, Francia, Regno Unito → valorizzare distanza aeroporto Perugia Sant'Egidio (11,4 km su strada, 11 min in auto — Google Maps, 29/09/2026; prima indicato 7 km, allineato al dato Google il 29/09/2026), possibilità noleggio auto in loco

---

## 6. Integrazioni terze parti — stato e note di fattibilità

| Integrazione | Fattibilità | Note |
|---|---|---|
| Stripe (carta di credito) | ✅ Standard | Nessun problema |
| PayPal + pagamento a 3 rate | ⚠️ Da verificare | "PayPal Pay in 3" è gestito interamente da PayPal lato utente finale (eleggibilità dipende da importo/paese del cliente che prenota, non controllabile da noi) |
| Bonifico bancario | ✅ Gestibile | Conferma manuale da parte del titolare dopo verifica accredito |
| Smartbox | ✅ Semplice | Solo link esterno verso il portale voucher Smartbox |
| Sync prezzi in tempo reale con bed-and-breakfast.it | 🔴 **Da validare prima di promettere** | Il portale non espone (a quanto risulta) una API pubblica aperta per sync bidirezionale. Questo tipo di sincronizzazione si ottiene di norma tramite un **Channel Manager** (es. Octorate, Smoobu, Beds24, RoomCloud) collegato sia al sito che ai portali. Va verificato se bed-and-breakfast.it supporta un channel manager, e se sì quale — è un servizio terzo, probabilmente a pagamento, **non incluso nel preventivo attuale** |
| Check-in online + invio automatico Polizia (Alloggiati Web) | 🔴 **Da validare prima di promettere** | Il portale Alloggiati Web del Ministero dell'Interno non ha API pubblica per invio da siti terzi: l'invio delle schedine è riservato al gestore con le sue credenziali, o a PMS certificati. Realizzabile: un form di check-in online che raccoglie i dati ospite (documento, ecc.) e li prepara/invia al titolare o al suo eventuale PMS — non l'invio diretto automatico alla Questura dal nostro sito |
| Recensioni Google "senza uscire dal sito" | ✅ **Implementato come "review gate"** | Google non permette che una recensione venga pubblicata sul profilo Business tramite form/API di terze parti (policy anti-fake-review): impossibile come richiesto letteralmente. Soluzione realistica costruita (`src/components/review-gate.tsx`, in home dopo le recensioni): l'ospite vota 1-5 stelle sul sito; 4-5★ apre la vera pagina "Scrivi una recensione" di Google (URL reale costruito con GOOGLE_PLACE_ID, non un form nostro); sotto le 4★ il feedback resta privato, inviato via WhatsApp diretto al titolare invece che a Google |
| Widget recensioni in evidenza aggiornato in tempo reale | ✅ Fattibile | Lettura in sola lettura via Google Business Profile API, carosello che ruota automaticamente le recensioni 4-5★ più recenti |

---

## 7. Privacy, cookie e consenso (implementato 7 settembre 2026)

Sistema di consenso proprietario (nessuna CMP esterna a pagamento), costruito dopo un audit tecnico reale del progetto — non un banner grafico che non blocca nulla. Fonte di verità: `src/data/privacy-services.ts`.

| Elemento | Stato | Note |
|---|---|---|
| Servizi di terze parti realmente presenti | ✅ Verificato nel codice | Solo Google reCAPTCHA v3 (client, categoria Funzionali) e Google Places API/Facebook Graph API (solo server-to-server, nessun cookie). Zero Google Analytics/GTM/Meta Pixel in tutto il progetto |
| Banner cookie a 3 pulsanti di pari peso | ✅ Implementato | `src/components/cookie-banner.tsx` — Accetta tutti / Rifiuta non essenziali / Personalizza, stesso stile per tutti e tre |
| Blocco reale pre-consenso | ✅ Implementato | Lo script reCAPTCHA non viene iniettato nel DOM finché non c'è consenso "Funzionali" (`newsletter-section.tsx`); prima non parte nessuna richiesta a Google |
| Cookie di consenso first-party | ✅ Implementato | `lamora_consent`, 6 mesi, versionato (`CONSENT_VERSION` in `src/lib/consent.ts`) — bump manuale ad ogni modifica reale di policy/servizi |
| Global Privacy Control (GPC) | ✅ Implementato | Se il browser lo invia, si applica in automatico la scelta restrittiva, per tutti i visitatori indipendentemente dal Paese |
| "Preferenze cookie" nel footer | ✅ Implementato | Presente su ogni pagina (footer globale in `root-shell.tsx`), riapre il pannello di personalizzazione in qualsiasi momento |
| Privacy Policy / Cookie Policy / Termini e Condizioni | ✅ Create ex novo | Prima erano link `href="#"` non funzionanti (vedi PLAN.md sezione footer) — pagine reali su `/privacy/`, `/cookie-policy/`, `/termini-e-condizioni/`, in tutte e 4 le lingue |
| **P.IVA 03900200548** | ⚠️ **Da riconfermare col titolare** | Riportata identica a quella già presente nel footer del sito (mai stata modificata), ma PLAN.md la segnalava già come "da verificare" prima di questo lavoro — non risolto qui, solo ereditato |
| Durata di conservazione fiscale/contabile dei dati di prenotazione | ⚠️ **Da confermare col commercialista** | La Privacy Policy usa una formula generica ("per il tempo previsto dagli obblighi di legge") invece di un numero di anni non verificabile da codice |
| Validazione legale complessiva | ⚠️ **Mai dichiarata "100% conforme"** | Le pagine legali sono tecnicamente accurate rispetto al codice reale, ma restano un documento operativo: revisione di un legale/commercialista raccomandata prima di considerarle definitive |

## 8. Prossimi passi suggeriti

1. **Validare con il titolare** i 3 flag 🔴🟡 rimasti aperti in sezione 6 (channel manager bed-and-breakfast.it, check-in Polizia, meccanismo review-gate Google) prima di includerli nel piano di sviluppo definitivo
2. Definire lo stack per il booking engine (custom da zero → probabile necessità di DB per calendario/tariffe/regole stagionali)
3. Sitemap + wireframe pagine principali
4. Struttura dati tariffe/stagioni/sconti come base per popup di confronto OTA e calcolo automatico prezzo
5. **Far rivedere le pagine Privacy/Cookie/Termini (sezione 7) a un legale o commercialista** prima di considerarle definitive — soprattutto i punti segnalati ⚠️
