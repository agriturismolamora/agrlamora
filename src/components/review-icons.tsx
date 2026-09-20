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

/* Marchio Tripadvisor: usato SOLO come attribuzione della piattaforma
   accanto a un link reale verso la vera pagina TripAdvisor della
   struttura — mai come sigillo/certificazione auto-costruita che implichi
   un riconoscimento ufficiale mai rilasciato. La silhouette del gufetto
   (il path sotto) è la riproduzione fedele del logo ufficiale TripAdvisor,
   non una ricostruzione approssimativa a occhio — path e colore ufficiale
   (#34E0A1) presi da tripadvisor.mediaroom.com/logo-guidelines. */
export function TripadvisorMark({ size = 26 }: { size?: number }) {
  /* viewBox largo 172 (non 130): il testo "Tripadvisor" a fontSize 16
     inizia a x=36 ed è largo ~124 unità, quindi arriva fino a x≈160 — con
     un viewBox più stretto restava tagliato a metà dall'overflow:hidden
     di default degli <svg>, invisibile a dimensioni piccole ma evidente
     alla dimensione usata in reviews-section.tsx (size=85). */
  const h = size * (34 / 172);
  return (
    <svg viewBox="0 0 172 34" width={size} height={h} aria-hidden="true">
      <g transform="translate(3, 5)">
        <path
          fill="#34E0A1"
          d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z"
        />
      </g>
      <text x="36" y="25" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="16" fill="#34E0A1">
        Tripadvisor
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
