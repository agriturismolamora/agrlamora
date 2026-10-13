"use client";

import { useSyncExternalStore } from "react";

/* Ora del browser per ciò che dipende dalla data (promo a tempo, vedi
   src/data/promo.ts). Il sito è statico: sul server e durante l'hydration
   vale null (stesso HTML su server e client, nessun errore di hydration),
   subito dopo l'ora reale. Arrotondata al minuto e aggiornata ogni minuto:
   una promo che scade a pagina aperta sparisce da sola. */
const MINUTE = 60_000;

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, MINUTE);
  return () => window.clearInterval(id);
}

const getSnapshot = () => Math.floor(Date.now() / MINUTE) * MINUTE;
const getServerSnapshot = () => null;

export function useNow(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
