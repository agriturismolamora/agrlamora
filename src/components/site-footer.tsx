"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { withLocale, splitLocaleFromPath } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import { CONSENT_TEXT } from "@/data/consent-text";
import { openCookiePreferences } from "@/lib/consent";
import { RecensioniBadge } from "@/components/recensioni-badge";

const PHONE_TEL = "tel:+390758041164";
const PHONE_DISPLAY = "075 8041164";
const WHATSAPP_URL = "https://wa.me/393934363917";
const EMAIL = "agriturismolamora@gmail.com";

function getNav(locale: Locale) {
  return [
    { label: t("nav", "alloggi", locale), href: withLocale(locale, "/alloggi/") },
    { label: t("nav", "villaRelax", locale), href: withLocale(locale, "/villa-relax-assisi/") },
    { label: t("nav", "chiSiamo", locale), href: withLocale(locale, "/chi-siamo/") },
    { label: t("nav", "territorio", locale), href: withLocale(locale, "/territorio/") },
    { label: t("nav", "blog", locale), href: withLocale(locale, "/blog/") },
    { label: t("nav", "offerte", locale), href: withLocale(locale, "/offerte/") },
    { label: t("nav", "recensioni", locale), href: withLocale(locale, "/#section-reviews") },
    { label: t("nav", "contatti", locale), href: withLocale(locale, "/#section-map") },
  ];
}

/* Footer minimale e scuro (continua l'olive-950 del pannello mappa sopra,
   nessuna cucitura visiva). Nessun credito d'agenzia: il vecchio "Sito
   web realizzato da PRISMI S.p.a." va rimosso, sostituto da decidere col
   titolare (vedi PLAN.md).
   "Preferenze cookie": presente in TUTTE le pagine come richiesto, apre lo
   stesso pannello di personalizzazione del banner (vedi
   cookie-consent-manager.tsx) tramite un evento globale — il footer non ha
   bisogno di sapere nulla sullo stato del consenso, solo di segnalare
   "aprimi". */
export function SiteFooter({ locale }: { locale: Locale }) {
  const nav = getNav(locale);
  const consentText = CONSENT_TEXT[locale];
  // Confine La Mora <-> Villa Relax: due account bed-and-breakfast.it
  // separati, due script del widget camere (rooms-widget-script.tsx). Un
  // link che attraversa questo confine deve forzare una navigazione piena
  // (<a>, non <Link>), altrimenti lo script si smonta/rimonta a pagina
  // già caricata e document.write() cancella la pagina.
  const pathname = usePathname();
  const { path: barePath } = splitLocaleFromPath(pathname ?? "/");
  const onVillaPage = barePath.startsWith("/villa-relax-assisi");
  return (
    <footer id="site-footer" className="bg-olive-950 pb-8 pt-16 text-cream sm:pb-10 sm:pt-20">
      <div className="mx-auto max-w-[1300px] px-6 sm:px-10">
        {/* Su mobile centrato e con la navigazione in griglia 2 colonne
            invece del flex-wrap a righe irregolari di prima (richiesta
            esplicita: ridisegnato, non semplicemente compresso in colonna). */}
        <div className="flex flex-col items-center gap-10 border-b border-cream/10 pb-10 text-center sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:text-left">
          {onVillaPage ? (
            <a href={withLocale(locale, "/")} aria-label={`Agriturismo La Mora — ${t("nav", "torna", locale)}`} className="shrink-0">
              <Image
                src="/images/logo/logo-bianco-agriturismo-la-mora.png"
                alt="Agriturismo La Mora"
                width={140}
                height={105}
                className="h-auto w-[110px]"
              />
            </a>
          ) : (
            <Link href={withLocale(locale, "/")} aria-label={`Agriturismo La Mora — ${t("nav", "torna", locale)}`} className="shrink-0">
              <Image
                src="/images/logo/logo-bianco-agriturismo-la-mora.png"
                alt="Agriturismo La Mora"
                width={140}
                height={105}
                className="h-auto w-[110px]"
              />
            </Link>
          )}

          <nav
            aria-label={t("footer", "linkUtili", locale)}
            className="grid grid-cols-2 gap-x-8 gap-y-3.5 sm:flex sm:flex-wrap sm:gap-x-7 sm:gap-y-3"
          >
            {nav.map((item) => {
              const targetIsVilla = item.href.includes("/villa-relax-assisi");
              const crossesBoundary = targetIsVilla !== onVillaPage;
              const linkClassName = "font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-cream/75 transition-colors hover:text-cream";
              return crossesBoundary ? (
                <a key={item.href} href={item.href} className={linkClassName}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} className={linkClassName}>
                  {item.label}
                </Link>
              );
            })}
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

        {/* pl-[72px] su mobile: il pulsante "torna su" (back-to-top.tsx) è
            fixed bottom-24 left-5, largo 44px — proprio nell'angolo dove
            altrimenti finiva la prima riga del testo P.IVA, parzialmente
            coperta. Da sm in su il pulsante è più in basso/più a sinistra
            (bottom-6 left-6) e questa riga è un flex-row con testo più
            corto relativo alla larghezza, nessun bisogno di margine. */}
        <div className="mt-8 flex flex-col gap-4 pl-[72px] text-[11px] text-cream/50 sm:flex-row sm:items-center sm:justify-between sm:pl-0">
          <p className="leading-[1.6]">
            AZ. AGR. LA MORA DI MAZZOLI GIUSEPPINA E PAOLO SOC. SEMP. AGRICOLA — P.IVA 03900200548 — CIN
            IT054001B501006846
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href={withLocale(locale, "/privacy/")} className="hover:text-cream/80">
              {t("footer", "privacy", locale)}
            </Link>
            <Link href={withLocale(locale, "/cookie-policy/")} className="hover:text-cream/80">
              {t("footer", "cookie", locale)}
            </Link>
            <button type="button" onClick={openCookiePreferences} className="underline decoration-cream/30 underline-offset-4 hover:text-cream/80">
              {consentText.footerLink}
            </button>
            <span>© {new Date().getFullYear()} Agriturismo La Mora</span>
          </div>
        </div>

        {/* Badge recensioni in basso a destra, su ogni pagina: account
            Villa Relax sulle pagine Villa, La Mora ovunque altro (stesso
            confine onVillaPage dei link qui sopra). A destra anche su
            mobile: resta lontano dal pulsante "torna su" in basso a
            sinistra (vedi nota pl-[72px] sopra). */}
        <div className="mt-8 flex justify-end">
          <RecensioniBadge struttura={onVillaPage ? "villa" : "lamora"} locale={locale} />
        </div>
      </div>
    </footer>
  );
}
