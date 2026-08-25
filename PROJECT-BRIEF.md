# Agriturismo La Mora — Brief tecnico di progetto
Sintesi operativa del kick-off, organizzata per sviluppo. Brand identity invariata, immagini attuali come placeholder.

---

## 1. Sitemap

- **Home**
- **Sistemazioni** — pagina di elenco + dettaglio per ognuno dei 5 appartamenti:
  - Appartamento Pesci
  - Appartamento Acquario
  - Appartamento Sagittario — **pet-friendly**, giardino privato recintato
  - Appartamento Gemelli — **pet-friendly**, giardino privato recintato
  - Appartamento Bilancia
  - Dotazioni comuni a tutte le unità (da riportare in ogni scheda): TV satellitare, specchi, porta valigie, biancheria da letto e da bagno, cucina attrezzata, cassaforte, aria condizionata, Wi-Fi
- **Piscina** — pagina dedicata (nuova)
- **Colazione** — pagina dedicata: bio, dalle 07:00 alle 09:30, dolce inclusa/opzionale 5€ p/giorno, supplemento salata +10€ a persona, offerta variabile in base a stagionalità/prodotti locali (marmellate e dolci fatti in casa, caffè/cappuccino/tea/ginseng su richiesta)
- **Attività & Servizi** — e-bike, equitazione, parco giochi + babysitting, cucina bio (dettaglio sezione 3)
- **Promozioni & Cofanetti regalo** — vedi sezione 4
- **Territorio** — Assisi (Basilica di San Francesco, Piazza del Comune, Rocca Maggiore/Minore), dintorni, Perugia — sostituisce/aggiorna [/territorio/](https://www.agriturismoinassisi.it/territorio/)
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
- 25€/soggiorno
- Dropdown taglia + razza, con blacklist per razze considerate pericolose (sistema segnala "non accettato")
- Nota obbligatoria: guinzaglio all'interno della struttura

**Tassa di soggiorno:** **3€/persona/giorno** (confermato, valore corretto), primi 3 giorni, esenti under 12 — calcolata automaticamente nel riepilogo prenotazione. Il vecchio sito riportava 2€ nei cofanetti regalo: sul nuovo sito va unificato ovunque a 3€.

**Extra selezionabili in fase di booking:**
- E-bike a noleggio (listino in sezione 3)
- Culla: 10€/soggiorno
- Colonnina di ricarica 22kW: checkbox da selezionare **subito** in fase di prenotazione (serve al proprietario per organizzarsi)

---

## 3. Attività & servizi in loco

**E-bike** — contatto diretto Paolo [+39 393 4363917](tel:+393934363917), consegna/ritiro presso la direzione. Accensione luci: tasto + tenuto premuto 5 secondi.

| Durata | Prezzo |
|---|---|
| 1/2 giornata | €15,00 |
| 1 giorno | €25,00 |
| Weekend | €40,00 |
| 7 giorni | €90,00 |

**Equitazione** — passeggiate a cavallo nel maneggio interno, lezioni per adulti e bambini di tutti i livelli, accompagnatori qualificati.

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

## 5. Segmenti target (per copy e struttura contenuti)

- **Famiglie** → collegare a parco giochi bambini + piscina bambini + babysitting
- **Coppie** → cofanetto "Due notti romantiche" come cross-sell
- **Viaggi di lavoro** → valorizzare vicinanza a Umbria Fiere
- **Ospiti con animali** → redirect a Gemelli/Sagittario
- **Mercati esteri prioritari:** Olanda, Belgio, Francia, Regno Unito → valorizzare distanza aeroporto Perugia Sant'Egidio (7 km), possibilità noleggio auto in loco

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
| Recensioni Google "senza uscire dal sito" | 🟡 **Da correggere l'aspettativa** | Google non permette che una recensione venga pubblicata sul profilo Google Business tramite form/API di terze parti: la recensione **deve** essere lasciata dall'utente direttamente su Google (policy anti-fake-review). Soluzione realistica: "review gate" — richiesta interna sul sito, se 4-5 stelle → link diretto al box di recensione Google già pronto (compilazione in overlay/nuova scheda, pochi secondi); se voto basso → feedback raccolto privatamente, non inviato a Google |
| Widget recensioni in evidenza aggiornato in tempo reale | ✅ Fattibile | Lettura in sola lettura via Google Business Profile API, carosello che ruota automaticamente le recensioni 4-5★ più recenti |

---

## 7. Prossimi passi suggeriti

1. **Validare con il titolare** i 3 flag 🔴🟡 rimasti aperti in sezione 6 (channel manager bed-and-breakfast.it, check-in Polizia, meccanismo review-gate Google) prima di includerli nel piano di sviluppo definitivo
2. Definire lo stack per il booking engine (custom da zero → probabile necessità di DB per calendario/tariffe/regole stagionali)
3. Sitemap + wireframe pagine principali
4. Struttura dati tariffe/stagioni/sconti come base per popup di confronto OTA e calcolo automatico prezzo
