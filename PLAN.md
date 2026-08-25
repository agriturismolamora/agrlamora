# PLAN.md — Agriturismo La Mora: Header, Homepage, Footer

Istruzioni operative per Claude Code. Obiettivo di questa fase: costruire **Header, Homepage completa e Footer**, con qualità e cura di dettaglio da sito Awwwards, ma con identità, copy e contenuti propri di Agriturismo La Mora (Assisi).

---

## 0. File da analizzare prima di scrivere codice

1. **`10k-websites/`** — leggi TUTTI i file `.md`. Contengono le linee guida per costruire un sito ad alte performance/qualità moderna. Applica questi principi a tutto ciò che costruisci, non solo alla home.
2. **`reference-design/homepage/`** — 10 screenshot che compongono per intero la homepage di lasalaplazahotel.com (Awwwards), in ordine di scroll. Analizzali come sequenza — sono la mappa strutturale della sezione 2 qui sotto.
   ⚠️ Sono un riferimento di **struttura, gerarchia e qualità**, non da clonare testualmente: logo, nome, testi, badge/certificazioni e loghi di terzi appartengono al brand Lasala Plaza e non vanno riprodotti. Palette, tono e soggetti fotografici vanno reinterpretati per La Mora (sezione 1).
3. **`PROJECT-BRIEF.md`** — fonte di verità per i contenuti business (5 appartamenti, prezzi, attività, target, promozioni).
4. **`public/`** — immagini reali già organizzate per sezione. Nessuna immagine stock o placeholder.

---

## 1. Adattamento della direzione estetica

Il riferimento è un hotel di lusso sul mare (palette blu/acqua, atmosfera urbana). La Mora è una struttura di campagna vicino Assisi: la palette va **reinterpretata**, non copiata:

- Palette: verdi oliva/naturali, terracotta/cotto umbro, crema/beige caldo, accenti dorati — evitare blu marini
- Tipografia: mantenere il contrasto elegante serif (titoli) + sans-serif pulito (corpo) osservato nel riferimento, ma con font che comunichino calore rustico-elegante, non minimalismo urbano
- Fotografia: stesso principio di immagini grandi e immersive, ma con soggetti reali de La Mora da `public/` (campagna umbra, piscina, appartamenti, colazione bio, animali, bambini)

---

## 2. Struttura Homepage — mappata 1:1 sul riferimento

Il riferimento è composto da 10 blocchi in sequenza (uno per screenshot). Ogni blocco qui sotto indica cosa mostra il riferimento e il suo equivalente per La Mora.

### Elementi persistenti (presenti in ogni blocco)
- **Header sticky**: trasparente su hero, diventa solido allo scroll. Logo La Mora (brand identity invariata) + nav: `Home · Chi Siamo · Territorio · Alloggi ▾ · Colazione Bio · Attività · Ottavo Centenario San Francesco · Recensioni · Offerte ▾ · Contatti` + selettore lingua IT/EN/FR/DE + menu hamburger mobile. Utility bar superiore con social icon + "Domande? Chiama / Scrivi su WhatsApp" (075 8041164 · 393 4363917 · WhatsApp).
  - Dropdown **Alloggi**: Pesci · Acquario · Sagittario · Gemelli · Bilancia
  - Dropdown **Offerte**: Smartbox · Cofanetti regalo
- **Booking bar sticky in basso**: Arrivo · Partenza · Adulti · Bambini · Cerca disponibilità + pulsante chiamata rapida (il sito attuale ha già questo pattern — qui va solo elevato nello stile, coerente col riferimento)
- ❌ Il tab verticale "W. Honors" (loyalty program) del riferimento **non ha equivalente**: va omesso, non è pertinente a La Mora

### Blocco 1 — Hero (screenshot 1)
Foto/video full-bleed della struttura (piscina o casale nel verde), eyebrow "ASSISI · UMBRIA", logo/nome in evidenza al centro.

### Blocco 2 — Ticker USP + statement editoriale (screenshot 2)
Barra a scorrimento continuo con badge USP in loop (es. "Piscina panoramica" · "Pet friendly" · "Colazione bio inclusa nelle promo" · "Prenoti diretto, risparmi di più"). Sotto: foto full-bleed vista campagna/Assisi, eyebrow "AGRITURISMO AD ASSISI", paragrafo editoriale breve e evocativo — riscritto da zero sui fatti reali (famiglie, relax, piscina, posizione strategica per Assisi/Perugia/Spello), **non i paragrafi del sito attuale**.

### Blocco 3 — Alloggi in carosello (screenshot 3)
Eyebrow "I NOSTRI ALLOGGI", H2 evocativo, carte fotografiche "sparse"/inclinate come nel riferimento, una per ciascuno dei 5 appartamenti (Pesci, Acquario, Sagittario, Gemelli, Bilancia), badge "Pet Friendly" su Gemelli e Sagittario, CTA "TUTTI GLI ALLOGGI".

### Blocco 4 — Editoriale split + lista servizi (screenshot 4)
Layout a due colonne: foto grande (piscina/vista) + foto inset più piccola sovrapposta (dettaglio colazione o giardino). Eyebrow originale (da scrivere, es. "LA VITA ALLA MORA"), H2 poetico riscritto, lista righe sottili: Piscina · Colazione Bio · Attività & Territorio. CTA "SCOPRI LA STRUTTURA" → Chi Siamo.

### Blocco 5 — Editoriale scuro / galleria stile Instagram (screenshot 5)
Sfondo scuro (verde oliva scuro), foto "polaroid" sparse (vita in campagna, dettagli cibo, animali, parco giochi), testo centrale evocativo su vivere l'Umbria autenticamente, CTA "SEGUICI SU INSTAGRAM" (**verificare con il titolare se esiste un profilo attivo prima di implementare il link**). Il badge "Live Cam" del riferimento non ha equivalente, va omesso.

### Blocco 6 — Blog/Territorio a ventaglio (screenshot 6)
Eyebrow "DAL BLOG DE LA MORA" (o simile), H2 tagline, CTA "TUTTE LE IDEE" in alto a destra, carte a ventaglio/sovrapposte (stesso stile del blocco 3) con articoli placeholder legati a Basilica di San Francesco, Piazza del Comune, Rocca Maggiore e Minore, Perugia — contenuti reali arriveranno con la produzione dei 20 articoli, per ora placeholder coerenti nel tono.

### Blocco 7 — Territorio full-bleed (screenshot 7)
Il blocco "En Directo / Live Cam" del riferimento non è pertinente (La Mora non ha una webcam): riusa questo stesso schema visivo per il **Territorio**. Foto panoramica vista Assisi, eyebrow "IL TERRITORIO", headline poetica riscritta sui fatti reali (Basilica di San Francesco, Piazza del Comune, Rocca Maggiore e Minore), CTA "SCOPRI IL TERRITORIO" → pagina Territorio.

### Blocco 8 — Mappa + contatti rapidi (screenshot 8)
Layout a due colonne: mappa (embed Google Maps reale, non serve l'illustrazione disegnata del riferimento) + pannello con nome struttura, indirizzo reale (Via Fonte Citerna, 7 — 06081 Assisi PG), bottone "APRI SU GOOGLE MAPS", email (agriturismolamora@gmail.com), telefono (075 8041164 / 393 4363917), bottone "SCRIVICI SU WHATSAPP", icone social.

### Blocco 9 — Newsletter + badge fiducia + footer (screenshot 9)
Newsletter signup (solo UI per ora). Striscia badge fiducia: sostituire i badge turistici baschi del riferimento con equivalenti reali — **badge recensioni Google reali** ("Buono · 45 recensioni Google" con stelline), eventuali certificazioni bio/sostenibilità (da confermare col titolare), badge "Pet Friendly". Footer scuro: logo, colonne nav (stessa gerarchia del menu), copyright con ragione sociale reale (AZ. AGR. LA MORA DI MAZZOLI GIUSEPPINA E PAOLO SOC. SEMP. AGRICOLA, P.IVA 03900200548 — **verificare che sia ancora corretta**), link legali (Privacy – Cookie – Sitemap).
⚠️ Il vecchio footer riporta "Sito web realizzato ed ottimizzato da PRISMI S.p.a." — va rimosso; da decidere con il titolare se inserire un credito MG Solutions al suo posto.

### Blocco 10 — Popup promozionale all'apertura (screenshot 10 / popup)
Modal all'apertura della homepage: foto reale + testo promo con CTA. Candidato naturale per La Mora: **promo Ottavo Centenario di San Francesco** (colazione bio inclusa prenotando diretto) oppure un cofanetto regalo in evidenza. Chiudibile con X.
⚠️ **Nota tecnica/SEO**: i popup interstiziali a tutto schermo su mobile all'apertura pagina sono penalizzati da Google (Core Web Vitals / intrusive interstitials). Va implementato con delay (es. dopo 4-5 secondi o su scroll), facilmente chiudibile, e mostrato una sola volta per sessione (`sessionStorage`) — non bloccante al primo istante, specialmente su mobile.

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

**Cucina bio e prodotti locali** — colazione biologica con marmellate fatte in casa, frutta di stagione, olio EVO; enfasi su sostenibilità e km0 (contenuto da riusare anche nella pagina Colazione Bio).

---

## 4. Promozioni & Cofanetti regalo

**Promo Ottavo Centenario di San Francesco** — colazione bio inclusa per chi prenota direttamente dal sito ufficiale. Contenuto permanente, pagina dedicata in nav, candidato per il popup (blocco 10).

**Smartbox** — redirect esterno verso [https://myaccount.smartbox.com/it/voucher/register/](https://myaccount.smartbox.com/it/voucher/register/), sottovoce di Offerte.

**Cofanetti regalo** — sottovoce di Offerte. "Bilocale" è un nome generico di tipologia (non un'unità specifica tra le 5 nominate): l'assegnazione avviene dinamicamente su una delle unità di quel tipo disponibili.

| Nome | Persone | Incluso | Prezzo | Extra da pagare a parte |
|---|---|---|---|---|
| Due notti in fuga | 2 | 2 notti Bilocale + 2 colazioni all'italiana | €139,90 | Pulizia finale €25 + tassa soggiorno €3/persona/giorno |
| Tre giorni in famiglia | 4 | 2 notti Bilocale + 2 colazioni all'italiana | €189,90 | Pulizia finale €25 + tassa soggiorno €3/persona/giorno |
| 4 giorni fuori dal mondo | 2 | 3 notti Bilocale + 3 colazioni all'italiana | €189,90 | Pulizia finale €25 + tassa soggiorno €3/persona/giorno |
| Due notti romantiche | 2 | 2 notti Bilocale + 2 colazioni + drink di benvenuto | €159,90 | Pulizia finale €25 + tassa soggiorno €3/persona/giorno |

---

## 5. Segmenti target (per copy e struttura contenuti)

- **Famiglie** → parco giochi bambini + piscina + babysitting
- **Coppie** → cofanetto "Due notti romantiche" come cross-sell
- **Viaggi di lavoro** → vicinanza a Umbria Fiere
- **Ospiti con animali** → redirect a Gemelli/Sagittario
- **Mercati esteri prioritari:** Olanda, Belgio, Francia, Regno Unito → distanza aeroporto Perugia Sant'Egidio (7 km), noleggio auto in loco

---

## 6. Requisiti SEO & GEO (non negoziabili)

- HTML semantico, heading gerarchici corretti
- **Continuità SEO del dominio**: il sito attuale usa già gli slug `/chi-siamo/`, `/territorio/`, `/alloggi/`, `/agriturismo-con-colazione-inclusa-assisi/` (Colazione Bio), `/agriturismo-famiglie-ad-assisi-e-dintorni/` (Attività), `/ottavo-centenario-san-francesco/`, `/recensioni/`, `/offerte/`, `/contatti/`. Dove lo slug nuovo coincide concettualmente, **mantenerlo identico**; dove cambia, predisporre redirect 301 dal vecchio al nuovo. Il dominio resta lo stesso: preservare l'URL equity accumulata è un requisito esplicito del progetto.
- Meta title/description ottimizzati per pagina (keyword geografiche: "agriturismo Assisi", "agriturismo con piscina vicino Assisi", "b&b Assisi con colazione bio" — variare per pagina, mai duplicati)
- Dati strutturati Schema.org: `LodgingBusiness`, poi `Review` e `FAQPage` dove pertinente
- Copy scritto per essere estraibile da motori di ricerca AI-based (GEO): frasi factual e autocontenute, liste puntate con dati concreti (distanze, prezzi, orari)
- Alt text descrittivo e keyword-coerente su ogni immagine reale
- Performance: immagini ottimizzate/lazy-loaded, animazioni leggere via CSS dove possibile, popup non bloccante (vedi Blocco 10)

---

## 7. Fuori scope in questa fase

- Booking engine funzionante (solo CTA/placeholder visivo)
- Pagine di dettaglio (Alloggi singoli, Territorio, Colazione Bio, Attività, Recensioni, Offerte, Contatti) — una alla volta, in fasi successive
- Integrazioni terze parti (Stripe, PayPal, Google Reviews live, bed-and-breakfast.it, Alloggiati Web)

---

## 8. Deliverable atteso da questa fase

Header + Homepage completa (10 blocchi come da sezione 2) + Footer, responsive, copy reali e ottimizzati SEO/GEO, immagini reali da `public/`, qualità visiva ispirata (non copiata) al riferimento Awwwards, popup promozionale non intrusivo, pronti per essere estesi con le pagine interne nelle fasi successive.
