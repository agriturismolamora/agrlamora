/* Icone condivise tra la sezione recensioni (server) e il carousel
   (client): componenti puramente presentazionali, nessuna interattività,
   nessun bisogno di "use client". */
export function GoogleMark({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

/* Marchio Tripadvisor (i due "occhi" a cerchio + testo), stesso principio
   di GoogleMark: usato SOLO come attribuzione della piattaforma accanto a
   un link reale verso la vera pagina TripAdvisor della struttura — mai come
   sigillo/certificazione auto-costruita che implichi un riconoscimento
   ufficiale mai rilasciato. Colore uguale al verde ufficiale del brand
   (#00AF87), forma semplificata ma riconoscibile. */
export function TripadvisorMark({ size = 26 }: { size?: number }) {
  /* viewBox largo 195 (non 130): il testo "tripadvisor" a fontSize 16
     inizia a x=64 ed è largo ~124 unità, quindi arriva fino a x≈188 — con
     un viewBox di soli 130 restava tagliato a metà dall'overflow:hidden
     di default degli <svg>, invisibile a dimensioni piccole ma evidente
     alla dimensione usata in reviews-section.tsx (size=85). */
  const h = size * (34 / 195);
  return (
    <svg viewBox="0 0 195 34" width={size} height={h} aria-hidden="true">
      <circle cx="18" cy="19" r="13" fill="none" stroke="#00AF87" strokeWidth="2.4" />
      <circle cx="18" cy="19" r="4.2" fill="#00AF87" />
      <circle cx="47" cy="19" r="13" fill="none" stroke="#00AF87" strokeWidth="2.4" />
      <circle cx="47" cy="19" r="4.2" fill="#00AF87" />
      <path d="M14 6.5C19 3 27 3 32 6.5" fill="none" stroke="#00AF87" strokeWidth="2.4" strokeLinecap="round" />
      <text x="64" y="25" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="16" fill="#00AF87">
        tripadvisor
      </text>
    </svg>
  );
}

export function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`Valutazione ${rating} su 5 stelle`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.74 1-5.8-4.21-4.1 5.82-.85L10 1.5Z"
            fill={i <= Math.round(rating) ? "#E0A93C" : "none"}
            stroke="#E0A93C"
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}
