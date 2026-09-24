"use client";

import { useEffect, useState } from "react";

const WHATSAPP_HREF = "https://wa.me/393934363917";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.4-1.42a9.86 9.86 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.37-.5.07-1.02.1-3.31-.75-2.79-1.04-4.59-3.9-4.73-4.08-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.97-2.3.24-.26.55-.33.73-.33h.53c.17 0 .4-.03.62.48.24.55.8 1.91.87 2.05.07.14.11.3.02.49-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.71 1.18 1.53 1.91 1.05.94 1.94 1.24 2.22 1.38.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.63.77 1.9.91.28.14.46.21.53.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

/* Barra di prenotazione fissa in fondo allo schermo, condivisa da La Mora
   (booking-bar.tsx) e Villa Relax (villa-booking-bar.tsx): solo il CTA di
   prenotazione + un pulsante WhatsApp, niente campi date/ospiti (richiesta
   esplicita del titolare — date e ospiti si scelgono direttamente nel
   modale di bed-and-breakfast.it che il CTA apre).
   Mobile: due pulsanti separati; da md in su: un'unica barra compatta.
   `night`: palette notturna solo da md in su, quando la barra passa sopra
   la sezione appartamenti (sfondo midnight) — su mobile resta sempre
   lampone, come prima. */
export function StickyBookingCta({
  label,
  whatsappLabel,
  onBook,
  night = false,
}: {
  label: string;
  whatsappLabel: string;
  onBook: () => void;
  night?: boolean;
}) {
  const [nearFooter, setNearFooter] = useState(false);

  // Vicino al footer la barra fissa coprirebbe indirizzo/contatti/P.IVA:
  // si dissolve con una transizione, senza mai sparire dal DOM.
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), { rootMargin: "0px 0px -15% 0px" });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    // z-[70]: sopra i contenuti di pagina, sotto sticky header (100) e
    // pannello MENU (150). pointer-events-none sulla riga piena, riattivati
    // solo sui pulsanti. bottom = 20px + safe-area-inset-bottom: su iPhone
    // con home indicator resta lontana dalla gesture area.
    <div
      className="pointer-events-none fixed inset-x-0 z-[70] flex justify-center px-4 transition-all duration-500 ease-out sm:px-6"
      style={{
        bottom: "calc(1.25rem + env(safe-area-inset-bottom))",
        ...(nearFooter ? { opacity: 0, transform: "translateY(16px)" } : { opacity: 1, transform: "translateY(0)" }),
      }}
    >
      <div
        className={`flex items-stretch gap-2 md:gap-0 md:overflow-hidden md:rounded-[3px] md:shadow-[0_24px_50px_-24px_rgba(28,33,23,0.55)] ${
          nearFooter ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        <button
          type="button"
          onClick={onBook}
          className={`min-w-[200px] rounded-[3px] bg-raspberry px-7 py-4 font-sans text-[12.5px] font-semibold uppercase tracking-[0.04em] text-cream shadow-[0_18px_36px_-16px_rgba(28,33,23,0.6)] transition-colors duration-500 hover:bg-[#8a3844] md:min-w-[260px] md:rounded-none md:px-12 md:py-5 md:text-[12px] md:tracking-[0.05em] md:shadow-none ${
            night ? "md:bg-[#141a30] md:hover:bg-[#1c2440]" : ""
          }`}
        >
          {label}
        </button>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={whatsappLabel}
          className={`flex w-[52px] shrink-0 items-center justify-center rounded-[3px] bg-raspberry-light text-cream shadow-[0_18px_36px_-16px_rgba(28,33,23,0.6)] transition-colors duration-500 hover:bg-[#ad5864] md:w-[60px] md:rounded-none md:shadow-none ${
            night ? "md:bg-[#1f2742] md:hover:bg-[#28305a]" : ""
          }`}
        >
          <WhatsAppIcon />
        </a>
      </div>
    </div>
  );
}
