import type { ReactNode } from "react";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "@/app/globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookingBar } from "@/components/booking-bar";
import { ConciergeChat } from "@/components/concierge-chat";
import { BackToTop } from "@/components/back-to-top";
import { CookieConsentManager } from "@/components/cookie-consent-manager";
import type { Locale } from "@/lib/i18n";

const JSON_LD_BASE = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Agriturismo La Mora",
  image: "https://www.agriturismoinassisi.it/images/piscina/piscina%20agriturismo%20la%20mora.webp",
  url: "https://www.agriturismoinassisi.it",
  telephone: "+39 075 8041164",
  email: "agriturismolamora@gmail.com",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Fonte Citerna, 7",
    addressLocality: "Assisi",
    addressRegion: "PG",
    postalCode: "06081",
    addressCountry: "IT",
  },
};

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SKIP_LINK: Record<Locale, string> = {
  it: "Vai al contenuto principale",
  en: "Skip to main content",
  fr: "Aller au contenu principal",
  de: "Zum Hauptinhalt springen",
};

/* Shell condiviso da tutti e 4 i root layout (uno per lingua — vedi
   src/app/(it)/layout.tsx, src/app/en/layout.tsx, ecc.): ciascuno di quei
   file È un root layout Next.js a sé (nessun layout.tsx comune sopra di
   loro), per poter dichiarare <html lang="..."> corretto per la propria
   lingua — l'unico modo per avere più root layout nell'App Router. Questo
   componente evita di duplicare 4 volte il markup/i font/il JSON-LD. */
export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const jsonLd = { ...JSON_LD_BASE, inLanguage: locale };
  return (
    <html lang={locale} className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="skip-link">
          {SKIP_LINK[locale]}
        </a>
        <SiteHeader locale={locale} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter locale={locale} />
        {/* Widget di prenotazione persistente: fixed, indipendente dal flusso
            della pagina, resta visibile dalla hero fino in fondo (si dissolve
            in prossimità del footer, vedi booking-bar.tsx). Globale: presente
            su ogni pagina del sito, non solo la home. */}
        <BookingBar locale={locale} />
        <ConciergeChat locale={locale} />
        <BackToTop locale={locale} />
        <CookieConsentManager locale={locale} />
      </body>
    </html>
  );
}
