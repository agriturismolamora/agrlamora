import type { ReactNode } from "react";

/* Effetto "trattenimento": la sezione resta agganciata in cima al viewport
   durante un tratto di scroll extra prima di lasciare spazio a quella
   successiva. Stesso meccanismo (outer più alto + sticky interno) già in
   produzione su apartments-carousel.tsx e instagram-gallery.tsx — qui
   applicato a un blocco di contenuto normale: puro CSS, nessun listener di
   scroll, nessuna dipendenza dalla posizione. Il contenuto interno (i suoi
   <Reveal>) resta del tutto indipendente da questo wrapper — mai una
   funzione continua dello scroll, solo un reveal-once. Solo desktop
   (>=1024px, stesso breakpoint della galleria Instagram): su mobile lo
   scroll resta quello normale, senza spazio extra.

   Va usato solo su sezioni il cui contenuto reale è più basso di una
   schermata (misurato in browser, non stimato): forzarlo su contenuto già
   più alto del viewport (Territorio, Piscina) è la causa esatta dei bug
   "immagine che appare/sparisce" risolti in precedenza — quelle due
   sezioni restano volutamente fuori da questo pattern. */
export function PinnedHold({ children }: { children: ReactNode }) {
  return <div className="lg:sticky lg:top-0 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center">{children}</div>;
}
