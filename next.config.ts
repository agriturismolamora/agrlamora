import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  agentRules: false, // CLAUDE.md è il file di regole del progetto, non va toccato da Next.js
  devIndicators: false, // il badge "N" è overlay di sviluppo di Next, non sparisce in produzione da solo
  // Tutti gli slug del progetto (nav, PLAN.md, href interni) usano la barra
  // finale (es. "/chi-siamo/"): senza questa opzione Next.js la rimuove con
  // un redirect 308 su OGNI link interno — un hop in più su ogni click,
  // dannoso per SEO/performance. Allineato al formato già in uso ovunque.
  trailingSlash: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Next 16 limita di default la qualità a [75]: i quality={90}/{92} già
    // usati nel codice (blog-section.tsx, apartments-carousel.tsx) senza
    // questa dichiarazione non venivano onorati — causa reale delle
    // immagini "sfocate" segnalate nel blog, non solo un problema di
    // sorgente. Elenco chiuso, non un range: solo i valori realmente usati.
    qualities: [75, 90, 92],
    remotePatterns: [
      // Foto profilo reali dei recensori, servite da Google (Places API).
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      // Foto reali della Pagina Facebook (Graph API) — sottodomini variabili
      // tipo scontent-xxx.fbcdn.net, da cui il wildcard.
      { protocol: "https", hostname: "*.fbcdn.net" },
    ],
  },
};

export default nextConfig;
