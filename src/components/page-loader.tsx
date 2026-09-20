"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/* Stato di attesa minimale per le pagine interne (non la homepage, che
   ha la sua apertura di marca dedicata — vedi home-intro.tsx). Compare
   SOLO se il caricamento supera una soglia realmente percepibile:
   senza questo ritardo, ogni transizione istantanea produrrebbe un
   lampo di loader che si accende e si spegne subito — peggio che non
   mostrare nulla.

   Non ancora collegato a nessuna route: nella fase corrente del
   progetto esiste solo la homepage (le pagine interne sono fuori
   scope, vedi PLAN.md). Pronto all'uso: una futura cartella pagina
   dovrà solo aggiungere un `loading.tsx` che renderizza <PageLoader />
   — la convenzione Suspense di Next.js lo monta esclusivamente durante
   una navigazione verso quella route, mai per la homepage. */
const SHOW_AFTER_MS = 180;

export function PageLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[500] flex items-center justify-center bg-[rgba(28,33,23,0.4)] backdrop-blur-sm"
    >
      <Image
        src="/images/favicon/favicon%20icona%20agriturismo%20la%20mora.png"
        alt=""
        width={64}
        height={64}
        className="h-11 w-11 animate-mora-breathe sm:h-12 sm:w-12"
      />
    </div>
  );
}
