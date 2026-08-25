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

## Modo di lavorare

- Prima di scrivere codice per una richiesta ampia, riassumi in poche righe cosa hai capito e aspetta conferma.
- Lavora a incrementi piccoli e revisionabili (un componente/sezione alla volta), non tutto in un unico output.
- Se qualcosa in `PROJECT-BRIEF.md` o `PLAN.md` è ambiguo o mancante, chiedi invece di assumere.
