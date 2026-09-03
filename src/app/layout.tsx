import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookingBar } from "@/components/booking-bar";
import { ConciergeChat } from "@/components/concierge-chat";
import { BackToTop } from "@/components/back-to-top";

const JSON_LD = {
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.agriturismoinassisi.it"),
  title: {
    default: "Agriturismo La Mora | Agriturismo con piscina ad Assisi, Umbria",
    template: "%s | Agriturismo La Mora",
  },
  description:
    "Agriturismo La Mora, ad Assisi: 5 appartamenti immersi nel verde umbro, piscina panoramica, colazione bio e attività per famiglie. A 7 km dall'aeroporto di Perugia.",
  icons: {
    icon: "/images/favicon/favicon%20icona%20agriturismo%20la%20mora.png",
    apple: "/images/favicon/favicon%20icona%20agriturismo%20la%20mora.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
        <a href="#main" className="skip-link">
          Vai al contenuto principale
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        {/* Widget di prenotazione persistente: fixed, indipendente dal flusso
            della pagina, resta visibile dalla hero fino in fondo (si dissolve
            in prossimità del footer, vedi booking-bar.tsx). Globale: presente
            su ogni pagina del sito, non solo la home. */}
        <BookingBar />
        <ConciergeChat />
        <BackToTop />
      </body>
    </html>
  );
}
