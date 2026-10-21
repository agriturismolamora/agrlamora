# CLAUDE.md — Agriturismo La Mora

Regole permanenti per questo progetto. Leggi anche `PROJECT-BRIEF.md` (fatti di business) e `PLAN.md` (istruzioni della fase corrente) — questo file non li sostituisce, li richiama.

## Stack

Next.js + Tailwind, deploy su Vercel, dominio esistente mantenuto. (Se lo stack cambia durante il progetto, aggiorna questa riga.)

## Regole non negoziabili

- **Immagini**: usa solo foto reali da `public/`. Mai immagini stock, placeholder generici o inventate. Se manca una foto per una sezione, segnalalo invece di sostituirla con un placeholder finto.
- **Riferimento di design** (`reference-design/`): è un riferimento di struttura/qualità (sito Lasala Plaza Hotel), non un sorgente da cui copiare testo, logo, palette o badge/certificazioni di terzi. Copy, colori e contenuti sono sempre originali per La Mora.
- **Dati di business** (prezzi, tasse, sconti, politiche di cancellazione, nomi appartamenti): prendili SOLO da `PROJECT-BRIEF.md`. Non inventare né arrotondare numeri.
- **SEO**: mantieni gli slug URL esistenti dove indicato in `PLAN.md`, scrivi meta title/description unici per pagina, mai duplicati.
- **Scope**: costruisci solo quanto indicato nella sezione corrente di `PLAN.md`. Se una funzionalità è elencata in "Fuori scope", non implementarla senza che venga chiesto esplicitamente.

## Infrastruttura congelata

- Niente modifiche a DNS, domini, redirect di dominio, Search Console, remote Git o impostazioni Vercel.
- Canonical sempre su https://www.lamoraassisi.com. I 7 redirect legacy in `next.config.ts` (5 appartamenti, `/recensioni/`, `/contatti/`) restano.
- Nessun segreto nel repo. Un solo numero di telefono: 393 4363917.
- Foto: solo reali o Wikimedia Commons con credito visibile (`src/data/photo-credits.ts`), mai stock o generate.
- Nuovo servizio, cookie o chiave di storage → aggiornare la Cookie Policy (`src/data/privacy-services.ts`) e alzare `CONSENT_VERSION`; altrimenti non alzarla.

## Regole del sito (ottobre 2026)

- **Ordine della navbar**, uguale in nav desktop, pannello MENU e footer: La Mora, Alloggi, Territorio, Esperienze, Offerte, Recensioni, Contatti, Villa Relax — Villa Relax sempre ULTIMA. Nel dropdown Offerte "Offerte in corso" viene prima di "Cofanetti regalo". Nuove larghezze dell'header vanno verificate in tutte e 4 le lingue (il tedesco è il più lungo).
- **Colonnina di ricarica**: Villa Relax 7 kW, La Mora 22 kW. Mai attribuire alla Villa i 22 kW (dato Villa in `src/data/villa.ts`, `VILLA_EV_CHARGER_KW`).
- **Promo a tempo** (`src/data/promo.ts`): lo stato si legge solo da `getPromoStatus()` / `getActivePromos()`, calcolato nel browser dopo il mount (`useNow()`). Scadute, spariscono da sole: niente popup (il popup della home esiste solo con una promo attiva, nessun popup di ripiego), niente etichetta "Offerte in corso!" nell'header, "Offerta conclusa" dove restano citate, e passano tra le concluse in `/offerte/offerte-in-corso/`. Mai date o condizioni non confermate: le costanti a `null` restano nascoste.
- **Pulsanti di prenotazione**: tutti passano da `BookingModalButton`, che applica lo stile condiviso `.booking-sheen` (riflesso animato, `globals.css`). Non duplicare l'effetto altrove; scegliere `sheen="soft" | "strong" | "tint"` in base alla palette perché il contrasto del testo resti AA. Mai applicarlo a pulsanti che non prenotano (WhatsApp, richieste, mappe). Con `prefers-reduced-motion` nessuna animazione.
- **Ristorante convenzionato (Carfagna)**: condizioni solo da `PROJECT-BRIEF.md` (sezione 4-bis) e `src/data/ristorante-carfagna.ts`; **mai** uno sconto sul menù alla carta. Se cambiano, rigenerare i PDF con `npm run pdf:carfagna`. **Ristorante di terzi: foto senza filigrana La Mora + credito visibile** ("Foto: Ristorante Carfagna", `WatermarkedImage mark="none"`); solo link a Facebook/Maps, nessun embed.
- **Famiglie e animali** (brief, sezione 4-ter): supplemento animali 25 € a soggiorno, pet friendly solo Gemelli e Sagittario; culla 15 € a soggiorno; niente seggioloni; mai "giardino recintato"; riduzioni bambini (0–2 gratis, 3–8 non compiuti -50%, 8–11 non compiuti -30%) senza dire su quale voce si applicano né che il motore le calcola da solo. Gli hub `/vacanza-con-animali/` e `/vacanza-in-famiglia/` elencano da soli gli articoli con `topics` "pets" / "family".
- **Articolo Capodanno: aggiornare ogni anno (data, programma, dateModified)**: date del conto alla rovescia, data dell'ultima verifica e fonti in `src/data/capodanno.ts`; testo in `CAPODANNO_POST` (`src/data/blog-posts.ts`), con slug e titolo dell'anno nuovo. Il programma si scrive sempre con l'anno di riferimento ("nel 2025…") finché il Comune non pubblica quello nuovo, con il riquadro "programma ufficiale" e la data di "ultima verifica".
- **Temi grafici del blog** (`BlogPost.theme`): "chocolate" (Eurochocolate) e "newyear" (Capodanno) cambiano solo colori e decorazioni, mai la struttura. Animazioni mai dietro al testo (card opache), canvas caricati dopo il load (con rete di sicurezza a 4 s, solo API presenti anche su Safari/iOS).
- **Fuochi della pagina Capodanno** (`fireworks.tsx`, `fireworks-engine.ts`): con `prefers-reduced-motion` NON si spengono ma passano alla modalità "morbida" (lenti e piccoli, al massimo un lancio ogni ~2,8 s, nessun lampo, mai più di 3 variazioni di luminosità al secondo); il pulsante "Pausa animazioni" (aria-pressed) ferma tutto e mostra i fuochi statici. Era la causa dei "fuochi che non partono" sull'iPhone con "Riduci movimento".
- **Suono** (`fireworks-sound.ts`): solo sintetizzato con Web Audio (niente file, librerie o licenze), solo dopo un gesto dell'utente (click o tasto, mai lo scroll), **mai autoplay**; guadagno finale ≤ 0,25, nessun loop, silenzio a scheda nascosta, nessun suono automatico con `prefers-reduced-motion` (solo dai pulsanti espliciti). Interruttore "Suono" con stato solo in memoria: nessuno storage, quindi nessun aggiornamento della Cookie Policy. Se Web Audio manca, tutto fallisce in silenzio (iPhone con interruttore silenzioso: nessun suono).
- **Pacchetto Capodanno** (`CAPODANNO_PACKAGE_2027` in `src/data/promo.ts`, `kind: "package"`): prezzi esattamente come nel brief, date e appartamenti `null`. **Promemoria: quando il titolare lo crea nel motore, passare `inMotore` a `true`** (la CTA diventa da sola BookingModalButton). Visibile fino al **02/01/2027** (`endsAt`, da confermare); niente popup in home (il popup è solo per le promo `kind: "discount"`), nessun JSON-LD Offer.
- **Menù Capodanno Carfagna: da pubblicare quando arriva** (`CARFAGNA_CAPODANNO_MENU`, oggi `null` in `src/data/ristorante-carfagna.ts`). Finché è `null` non si scrive nulla, nemmeno "in arrivo".
- **Culla**: 15 € a soggiorno sia a La Mora sia a Villa Relax (`getVillaCot()` in `src/data/villa.ts`).
- **Blog, cluster animali e famiglie** (`src/data/blog-posts-cluster.ts`): ogni articolo ha "Ultima verifica: <data>" (campo `disclaimer`) e nel commento le fonti ufficiali e i fatti tolti. Aggiornando orari o prezzi, aggiornare anche la data.
- **Prestazioni della home (mobile)**: mai importare `src/data/blog-posts.ts` (o altri dati grandi) in un componente `"use client"`: il testo di tutti gli articoli finirebbe nel JavaScript della pagina; i componenti client ricevono solo i campi che mostrano (es. `blog-section.tsx` server → `blog-section-view.tsx` client). Il sipario d'apertura (`home-intro.module.css`) resta solo CSS, senza timer in JavaScript. Le sezioni della home sotto la piega stanno in un `<Suspense>` ciascuna (hydration a pezzi). Poster della hero in WebP.
- **Widget esterni che scrivono nel DOM prima dell'hydration** (es. Octorate): il loro contenitore non deve avere figli gestiti da React (`dangerouslySetInnerHTML` vuoto + `suppressHydrationWarning`), altrimenti su Safari l'hydration fallisce e la pagina viene ricostruita nel browser.

## Modo di lavorare

- Prima di scrivere codice per una richiesta ampia, riassumi in poche righe cosa hai capito e aspetta conferma.
- Lavora a incrementi piccoli e revisionabili (un componente/sezione alla volta), non tutto in un unico output.
- Se qualcosa in `PROJECT-BRIEF.md` o `PLAN.md` è ambiguo o mancante, chiedi invece di assumere.
