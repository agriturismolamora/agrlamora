import Image from "next/image";
import Link from "next/link";

const PHONE_TEL = "tel:+390758041164";
const PHONE_DISPLAY = "075 8041164";
const WHATSAPP_URL = "https://wa.me/393934363917";
const EMAIL = "agriturismolamora@gmail.com";

const NAV = [
  { label: "Alloggi", href: "/alloggi/" },
  { label: "Chi siamo", href: "/chi-siamo/" },
  { label: "Territorio", href: "/territorio/" },
  { label: "Offerte", href: "/offerte/" },
  { label: "Recensioni", href: "/#section-reviews" },
  { label: "Contatti", href: "/#section-map" },
] as const;

/* Footer minimale e scuro (continua l'olive-950 del pannello mappa sopra,
   nessuna cucitura visiva). Privacy/Cookie/Sitemap in href="#": pagine non
   ancora esistenti, stessa convenzione già usata per i social nell'header
   (mai un link reale finto). Nessun credito d'agenzia: il vecchio "Sito
   web realizzato da PRISMI S.p.a." va rimosso, sostituto da decidere col
   titolare (vedi PLAN.md). */
export function SiteFooter() {
  return (
    <footer id="site-footer" className="bg-olive-950 pb-8 pt-16 text-cream sm:pb-10 sm:pt-20">
      <div className="mx-auto max-w-[1300px] px-6 sm:px-10">
        <div className="flex flex-col gap-10 border-b border-cream/10 pb-10 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <Link href="/" aria-label="Agriturismo La Mora — torna alla home" className="shrink-0">
            <Image
              src="/images/logo/logo-bianco-agriturismo-la-mora.png"
              alt="Agriturismo La Mora"
              width={140}
              height={105}
              className="h-auto w-[110px]"
            />
          </Link>

          <nav aria-label="Link utili" className="flex flex-wrap gap-x-7 gap-y-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-cream/75 transition-colors hover:text-cream"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <address className="space-y-1.5 text-[13px] not-italic leading-[1.6] text-cream/75">
            <p>Via Fonte Citerna, 7 — 06081 Assisi (PG)</p>
            <p>
              <a href={PHONE_TEL} className="hover:text-cream">
                {PHONE_DISPLAY}
              </a>
              {" · "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                WhatsApp
              </a>
            </p>
            <p>
              <a href={`mailto:${EMAIL}`} className="hover:text-cream">
                {EMAIL}
              </a>
            </p>
          </address>
        </div>

        <div className="mt-8 flex flex-col gap-4 text-[11px] text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p className="leading-[1.6]">
            AZ. AGR. LA MORA DI MAZZOLI GIUSEPPINA E PAOLO SOC. SEMP. AGRICOLA — P.IVA 03900200548 — CIN
            IT054001B501006846
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="#" className="hover:text-cream/80">
              Privacy
            </a>
            <a href="#" className="hover:text-cream/80">
              Cookie
            </a>
            <span>© {new Date().getFullYear()} Agriturismo La Mora</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
