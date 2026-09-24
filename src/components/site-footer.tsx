"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { withLocale, splitLocaleFromPath } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import { CONSENT_TEXT } from "@/data/consent-text";
import { openCookiePreferences } from "@/lib/consent";
import { RecensioniBadge } from "@/components/recensioni-badge";

const ADDRESS = "Via Fonte Citerna, 7 — 06081 Assisi (PG)";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Agriturismo La Mora, Via Fonte Citerna 7, 06081 Assisi PG");
const PHONE_TEL = "tel:+390758041164";
const PHONE_DISPLAY = "075 8041164";
const WHATSAPP_URL = "https://wa.me/393934363917";
const WHATSAPP_DISPLAY = "WhatsApp 393 4363917";
const EMAIL = "agriturismolamora@gmail.com";
const FACEBOOK_URL = "https://www.facebook.com/p/Agriturismo-la-Mora-di-Assisi-100066662774182/";
const INSTAGRAM_URL = "https://www.instagram.com/paolo.720/";

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

function Icon({ children, fill = false }: { children: ReactNode; fill?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? undefined : "currentColor"}
      strokeWidth={fill ? undefined : 1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const PinIcon = () => (
  <Icon>
    <path d="M12 21s-6.5-5.4-6.5-11a6.5 6.5 0 0 1 13 0c0 5.6-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </Icon>
);
const PhoneIcon = () => (
  <Icon>
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.2 1.1L6.6 10.8Z" />
  </Icon>
);
const MailIcon = () => (
  <Icon>
    <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
    <path d="m4 7 8 6 8-6" />
  </Icon>
);
const WhatsAppIcon = () => (
  <Icon fill>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.4-1.42a9.86 9.86 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.37-.5.07-1.02.1-3.31-.75-2.79-1.04-4.59-3.9-4.73-4.08-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.97-2.3.24-.26.55-.33.73-.33h.53c.17 0 .4-.03.62.48.24.55.8 1.91.87 2.05.07.14.11.3.02.49-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.71 1.18 1.53 1.91 1.05.94 1.94 1.24 2.22 1.38.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.63.77 1.9.91.28.14.46.21.53.33.07.12.07.68-.17 1.36Z" />
  </Icon>
);
const FacebookIcon = () => (
  <Icon fill>
    <path d="M14 9.5V7.8c0-.8.5-1 .9-1H16V4h-2.2C11.6 4 11 5.8 11 7.3v2.2H9v3h2v8h3v-8h2.2l.3-3H14Z" />
  </Icon>
);
const InstagramIcon = () => (
  <Icon>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="16.9" cy="7.1" r="0.6" fill="currentColor" />
  </Icon>
);
const ArrowUpIcon = () => (
  <Icon>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Icon>
);

const HEADING = "text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/45";
const SOCIAL = "flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-gold hover:text-gold";
const CONTACT = "flex items-start gap-3 text-cream/80 transition-colors hover:text-cream";

/* Footer scuro (continua l'olive-950 del pannello mappa sopra). Riordinato
   su richiesta del titolare ("caotico, tutto sembra messo sparso"): tre
   blocchi con un titoletto ciascuno — marchio e social, menu, contatti con
   icone — poi le recensioni e la riga legale. Allineato a sinistra su
   telefono (prima era tutto centrato e impilato), tre colonne da lg in su.
   Nessun credito d'agenzia (vedi PLAN.md).
   "Preferenze cookie": presente in TUTTE le pagine, apre lo stesso
   pannello del banner (vedi cookie-consent-manager.tsx) tramite un evento
   globale. "Torna su": qui dentro perché il pulsante fisso si dissolve
   vicino al footer, come gli altri elementi fissi (back-to-top.tsx). */
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

  function scrollToTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  const logo = (
    <Image src="/images/logo/logo-bianco-agriturismo-la-mora.png" alt="Agriturismo La Mora" width={140} height={105} className="h-auto w-[100px] sm:w-[112px]" />
  );
  const logoLabel = `Agriturismo La Mora — ${t("nav", "torna", locale)}`;

  return (
    <footer id="site-footer" className="bg-olive-950 pb-8 pt-14 text-cream sm:pt-16 lg:pt-20">
      <div className="mx-auto max-w-[1300px] px-6 sm:px-10">
        <div className="grid gap-x-12 gap-y-11 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1.1fr]">
          {/* Marchio + social */}
          <div className="sm:col-span-2 lg:col-span-1">
            {onVillaPage ? (
              <a href={withLocale(locale, "/")} aria-label={logoLabel} className="inline-block">
                {logo}
              </a>
            ) : (
              <Link href={withLocale(locale, "/")} aria-label={logoLabel} className="inline-block">
                {logo}
              </Link>
            )}
            <p className={`mt-7 ${HEADING}`}>{t("nav", "seguici", locale)}</p>
            <div className="mt-3 flex gap-3">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook Agriturismo La Mora" className={SOCIAL}>
                <FacebookIcon />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram Agriturismo La Mora" className={SOCIAL}>
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Menu */}
          <nav aria-label={t("footer", "linkUtili", locale)}>
            <p className={HEADING}>{t("footer", "linkUtili", locale)}</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3.5">
              {nav.map((item) => {
                const targetIsVilla = item.href.includes("/villa-relax-assisi");
                const crossesBoundary = targetIsVilla !== onVillaPage;
                const linkClassName = "font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-cream/75 transition-colors hover:text-cream";
                return (
                  <li key={item.href}>
                    {crossesBoundary ? (
                      <a href={item.href} className={linkClassName}>
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className={linkClassName}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Contatti */}
          <div>
            <p className={HEADING}>{t("nav", "contatti", locale)}</p>
            <address className="mt-4 space-y-3 text-[13px] not-italic leading-[1.5]">
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={CONTACT}>
                <span className="mt-0.5 shrink-0 text-cream/45"><PinIcon /></span>
                <span>{ADDRESS}</span>
              </a>
              <a href={PHONE_TEL} className={CONTACT}>
                <span className="mt-0.5 shrink-0 text-cream/45"><PhoneIcon /></span>
                <span>{PHONE_DISPLAY}</span>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={CONTACT}>
                <span className="mt-0.5 shrink-0 text-cream/45"><WhatsAppIcon /></span>
                <span>{WHATSAPP_DISPLAY}</span>
              </a>
              <a href={`mailto:${EMAIL}`} className={CONTACT}>
                <span className="mt-0.5 shrink-0 text-cream/45"><MailIcon /></span>
                <span className="break-all">{EMAIL}</span>
              </a>
            </address>
          </div>
        </div>

        {/* Badge recensioni: account Villa Relax sulle pagine Villa, La Mora
            ovunque altro (stesso confine onVillaPage dei link qui sopra). */}
        <div className="mt-12 border-t border-cream/10 pt-8">
          <RecensioniBadge struttura={onVillaPage ? "villa" : "lamora"} locale={locale} />
        </div>

        {/* Riga legale */}
        <div className="mt-8 flex flex-col gap-4 border-t border-cream/10 pt-6 text-[11px] leading-[1.6] text-cream/50 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <p>
            AZ. AGR. LA MORA DI MAZZOLI GIUSEPPINA E PAOLO SOC. SEMP. AGRICOLA — P.IVA 03900200548 — CIN IT054001B501006846
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
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
            <button type="button" onClick={scrollToTop} className="inline-flex items-center gap-1.5 text-cream/70 transition-colors hover:text-cream">
              <ArrowUpIcon />
              {t("common", "tornaSu", locale)}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
