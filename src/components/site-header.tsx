"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { withLocale, splitLocaleFromPath } from "@/lib/i18n";
import { t } from "@/lib/dictionary";

type NavChild = {
  label: string;
  href: string;
  external?: boolean;
};

type NavItem = {
  id: string;
  label: string;
  href: string;
  children: NavChild[];
};

const APARTMENT_WORD: Record<Locale, string> = { it: "Appartamento", en: "Apartment", fr: "Appartement", de: "Wohnung" };

/* Architettura a 5 voci ispirata a Lasala Plaza: ogni voce è un contenitore
   di dropdown, così nuove pagine (es. future esperienze) si aggiungono come
   children senza toccare la struttura dell'header. "Home" non compare più in
   nav: si torna alla home cliccando il grande logo della Hero, o il logo
   piccolo dello sticky header (unico punto in cui compare, vedi sotto).
   Costruita da una funzione (non un array statico) perché label/href
   dipendono dalla lingua corrente — `id` resta stabile tra le lingue per
   poter identificare le voci (es. NAV_LEFT_TABLET) senza dipendere dal
   testo visibile. */
function getNavLeft(locale: Locale): NavItem[] {
  const apt = APARTMENT_WORD[locale];
  return [
    {
      id: "alloggi",
      label: t("nav", "alloggi", locale),
      href: withLocale(locale, "/alloggi/"),
      children: [
        { label: `${apt} Pesci`, href: withLocale(locale, "/alloggi/pesci/") },
        { label: `${apt} Acquario`, href: withLocale(locale, "/alloggi/acquario/") },
        { label: `${apt} Sagittario`, href: withLocale(locale, "/alloggi/sagittario/") },
        { label: `${apt} Gemelli`, href: withLocale(locale, "/alloggi/gemelli/") },
        { label: `${apt} Bilancia`, href: withLocale(locale, "/alloggi/bilancia/") },
      ],
    },
    {
      id: "villa-relax",
      label: t("nav", "villaRelax", locale),
      href: withLocale(locale, "/villa-relax-assisi/"),
      children: [{ label: t("nav", "villaIndipendente", locale), href: withLocale(locale, "/villa-relax-assisi/") }],
    },
    {
      id: "la-mora",
      label: t("nav", "laMora", locale),
      href: withLocale(locale, "/chi-siamo/"),
      children: [
        { label: t("nav", "chiSiamo", locale), href: withLocale(locale, "/chi-siamo/") },
        { label: t("nav", "colazioneBio", locale), href: withLocale(locale, "/agriturismo-con-colazione-inclusa-assisi/") },
      ],
    },
    {
      id: "territorio",
      label: t("nav", "territorio", locale),
      href: withLocale(locale, "/territorio/"),
      children: [
        { label: t("nav", "territorio", locale), href: withLocale(locale, "/territorio/") },
        { label: t("nav", "ottavoCentenario", locale), href: withLocale(locale, "/ottavo-centenario-san-francesco/") },
      ],
    },
    {
      id: "esperienze",
      label: t("nav", "esperienze", locale),
      href: withLocale(locale, "/agriturismo-famiglie-ad-assisi-e-dintorni/"),
      children: [{ label: t("nav", "attivita", locale), href: withLocale(locale, "/agriturismo-famiglie-ad-assisi-e-dintorni/") }],
    },
    {
      id: "offerte",
      label: t("nav", "offerte", locale),
      href: withLocale(locale, "/offerte/"),
      children: [
        { label: t("nav", "cofanettiRegalo", locale), href: withLocale(locale, "/offerte/cofanetti-regalo/") },
        { label: t("nav", "smartbox", locale), href: withLocale(locale, "/offerte/smartbox/") },
      ],
    },
  ];
}

/* Voci mostrate in nav inline solo da 1100px in su; sotto restano comunque
   raggiungibili dal pannello MENU, che elenca sempre tutto. */
const NAV_LEFT_TABLET = new Set(["alloggi", "villa-relax", "territorio", "offerte"]);

function getNavRight(locale: Locale): NavChild[] {
  return [
    { label: t("nav", "recensioni", locale), href: withLocale(locale, "/#section-reviews") },
    { label: t("nav", "contatti", locale), href: withLocale(locale, "/#section-map") },
  ];
}

const LANGUAGES: { code: Locale; label: string }[] = [
  { code: "it", label: "IT" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
];

const PHONE_DISPLAY = "075 8041164";
const PHONE_TEL = "tel:+390758041164";
const WHATSAPP_HREF = "https://wa.me/393934363917";
const WHATSAPP_DISPLAY = "393 4363917";
const EMAIL = "agriturismolamora@gmail.com";

/* Soglia oltre la quale si considera "in cima" (Stato A) e soglia minima di
   scroll ignorata per non far lampeggiare l'header a ogni micro-movimento. */
const TOP_THRESHOLD = 40;
const SCROLL_DELTA = 8;

type HeaderMode = "top" | "hidden" | "sticky";

function useHeaderScrollMode(frozen: boolean) {
  const [mode, setMode] = useState<HeaderMode>("top");

  useEffect(() => {
    if (frozen) return;
    let lastY = window.scrollY;
    let ticking = false;

    function update() {
      const y = window.scrollY;
      if (y < TOP_THRESHOLD) {
        setMode("top");
        lastY = y;
      } else {
        const diff = y - lastY;
        if (Math.abs(diff) > SCROLL_DELTA) {
          setMode(diff > 0 ? "hidden" : "sticky");
          lastY = y;
        }
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [frozen]);

  return mode;
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.4-1.42a9.86 9.86 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.37-.5.07-1.02.1-3.31-.75-2.79-1.04-4.59-3.9-4.73-4.08-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.97-2.3.24-.26.55-.33.73-.33h.53c.17 0 .4-.03.62.48.24.55.8 1.91.87 2.05.07.14.11.3.02.49-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.71 1.18 1.53 1.91 1.05.94 1.94 1.24 2.22 1.38.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.63.77 1.9.91.28.14.46.21.53.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 8"
      width="9"
      height="9"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* "MENU" con due trattini sottili, non l'hamburger da app mobile del riferimento. */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span className="flex w-[18px] flex-col items-end gap-[5px]" aria-hidden="true">
      <span
        className={`h-px bg-current transition-all duration-200 ${
          open ? "w-[18px] -rotate-45 translate-y-[3px]" : "w-[18px]"
        }`}
      />
      <span
        className={`h-px bg-current transition-all duration-200 ${
          open ? "w-[18px] rotate-45 -translate-y-[3px]" : "w-[13px]"
        }`}
      />
    </span>
  );
}

function SocialIcon({ kind }: { kind: "facebook" | "instagram" }) {
  if (kind === "facebook") {
    return (
      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
        <path d="M14 9.5V7.8c0-.8.5-1 .9-1H16V4h-2.2C11.6 4 11 5.8 11 7.3v2.2H9v3h2v8h3v-8h2.2l.3-3H14Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.9" cy="7.1" r="1" fill="currentColor" />
    </svg>
  );
}

/* Allineamento del dropdown in funzione della posizione in navbar, per evitare
   che il primo elemento (Alloggi) esca dalla viewport a sinistra e l'ultimo
   a destra — nessun valore hardcoded specifico per "Alloggi": la stessa
   regola si applica a qualunque voce venga aggiunta in futuro. */
type DropdownAlign = "left" | "center" | "right";

function getDropdownAlign(index: number, total: number): DropdownAlign {
  if (index === 0) return "left";
  if (index === total - 1) return "right";
  return "center";
}

const DROPDOWN_ALIGN_CLASS: Record<DropdownAlign, string> = {
  left: "left-0 right-auto translate-x-0",
  center: "left-1/2 right-auto -translate-x-1/2",
  right: "left-auto right-0 translate-x-0",
};

function DesktopDropdown({ item, align, onVillaPage }: { item: NavItem; align: DropdownAlign; onVillaPage: boolean }) {
  // Confine La Mora <-> Villa Relax: due account bed-and-breakfast.it
  // separati, due script del widget camere (rooms-widget-script.tsx) — un
  // link che lo attraversa deve forzare una navigazione piena, vedi
  // rooms-widget-script.tsx per il motivo (document.write dopo il load).
  const crossesBoundary = item.href.includes("/villa-relax-assisi") !== onVillaPage;
  const itemLinkClassName = "flex items-center gap-1.5 py-2 font-display text-[16px] tracking-[0.01em] transition-colors hover:text-gold";
  return (
    <li className="group relative">
      {crossesBoundary ? (
        <a href={item.href} className={itemLinkClassName}>
          {item.label}
          <ChevronIcon open={false} />
        </a>
      ) : (
        <Link href={item.href} className={itemLinkClassName}>
          {item.label}
          <ChevronIcon open={false} />
        </Link>
      )}
      <div
        className={`invisible absolute top-full z-[200] min-w-[250px] max-w-[calc(100vw-32px)] translate-y-1.5 rounded-[3px] border border-cream/10 bg-olive-950/95 p-2 opacity-0 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${DROPDOWN_ALIGN_CLASS[align]}`}
      >
        {item.children.map((child) => (
          <a
            key={child.label}
            href={child.href}
            target={child.external ? "_blank" : undefined}
            rel={child.external ? "noopener noreferrer" : undefined}
            className="block whitespace-nowrap rounded-[2px] px-3 py-2 font-display text-[15px] text-cream/90 transition-colors hover:bg-cream/5 hover:text-gold"
          >
            {child.label}
          </a>
        ))}
      </div>
    </li>
  );
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const mode = useHeaderScrollMode(menuOpen);
  const navLeft = getNavLeft(locale);
  const navRight = getNavRight(locale);
  const pathname = usePathname();
  const { path: bareItalianPath } = splitLocaleFromPath(pathname ?? "/");
  const onVillaPage = bareItalianPath.startsWith("/villa-relax-assisi");

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setLangOpen(false);
      }
    }
    function onClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  // Stato B (sticky): compare mentre si risale la pagina, oppure mentre il
  // pannello MENU è aperto (per non far sparire l'header sotto il pannello).
  const sticky = mode === "sticky" || menuOpen;
  const hidden = mode === "hidden" && !menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] text-cream transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Top utility bar: sempre scura, presente sia in Stato A che B. */}
      <div className="bg-olive-950">
        <div
          className="mx-auto flex max-w-[1600px] items-center justify-between text-[10px]"
          style={{ paddingInline: "clamp(20px, 4vw, 56px)", paddingBlock: "7px" }}
        >
          <div className="hidden items-center gap-3 sm:flex">
            {/* TODO: collegare ai profili social reali di Agriturismo La Mora quando confermati dal titolare */}
            <a href="#" aria-label="Facebook Agriturismo La Mora" className="opacity-75 transition-opacity hover:opacity-100">
              <SocialIcon kind="facebook" />
            </a>
            <a
              href="https://www.instagram.com/paolo.720/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Agriturismo La Mora"
              className="opacity-75 transition-opacity hover:opacity-100"
            >
              <SocialIcon kind="instagram" />
            </a>
          </div>
          <div className="flex w-full items-center justify-end gap-4 font-medium uppercase tracking-[0.04em] sm:w-auto">
            <span className="hidden text-cream/60 md:inline">{t("nav", "domande", locale)}</span>
            {/* Un solo contatto qui, WhatsApp (richiesta esplicita): prima
                c'era anche "Chiama 075 8041164", ma è un fisso — non riceve
                WhatsApp. Il fisso resta nel menu, nel footer, nella sezione
                mappa e nel "chiama invece" della booking bar. */}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-gold"
            >
              <WhatsAppIcon />
              <span className="hidden sm:inline">{t("nav", "scriviWhatsapp", locale)}</span>
              <span>{WHATSAPP_DISPLAY}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Barra principale — Stato A: trasparente, senza logo, sulla hero.
          Stato B: piena, verde scurissimo, compatta, con logo piccolo. */}
      <div
        className={`transition-[background-color,backdrop-filter] duration-300 ease-out ${
          sticky ? "bg-[#1a2922]/97 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between transition-[padding] duration-300 ease-out ${
            sticky ? "py-3" : "py-5"
          }`}
          style={{ paddingInline: "clamp(20px, 4vw, 56px)" }}
        >
          <div className="flex min-w-0 items-center">
            {/* Logo piccolo: SOLO nello stato sticky. Sulla hero il brand è
                rappresentato esclusivamente dal grande logo centrale.
                Il file reale è uno stemma circolare ~4:3 (testo ad arco +
                illustrazione + wordmark), non un logotipo orizzontale: va
                dimensionato sull'altezza per restare leggibile (max-height
                52px) e non sulla larghezza, altrimenti l'immagine dovrebbe
                superare i 90px di altezza e sforare l'header. */}
            {sticky && (
              <>
                {onVillaPage ? (
                  <a
                    href={withLocale(locale, "/")}
                    aria-label={`Agriturismo La Mora — ${t("nav", "torna", locale)}`}
                    className="flex shrink-0 items-center"
                  >
                    <Image
                      src="/images/logo/logo-bianco-agriturismo-la-mora.png"
                      alt="Agriturismo La Mora, Assisi - Perugia (Umbria)"
                      width={140}
                      height={105}
                      className="h-12 w-auto sm:h-[52px]"
                    />
                  </a>
                ) : (
                  <Link
                    href={withLocale(locale, "/")}
                    aria-label={`Agriturismo La Mora — ${t("nav", "torna", locale)}`}
                    className="flex shrink-0 items-center"
                  >
                    <Image
                      src="/images/logo/logo-bianco-agriturismo-la-mora.png"
                      alt="Agriturismo La Mora, Assisi - Perugia (Umbria)"
                      width={140}
                      height={105}
                      className="h-12 w-auto sm:h-[52px]"
                    />
                  </Link>
                )}
                <span
                  aria-hidden="true"
                  className="ml-5 mr-8 hidden h-11 w-px bg-[#f1f1f1]/35 min-[1100px]:block"
                />
              </>
            )}

            <nav aria-label={t("nav", "navigazionePrincipale", locale)} className="hidden min-[1100px]:block">
              <ul className="flex items-center gap-8">
                {navLeft.map((item, i) => (
                  <DesktopDropdown key={item.id} item={item} align={getDropdownAlign(i, navLeft.length)} onVillaPage={onVillaPage} />
                ))}
              </ul>
            </nav>

            {/* Nav compatta per tablet (768–1099px): solo le voci essenziali, il resto va in MENU.
                Range auto-contenuto (md: + max-[1099px]:) per non dipendere dall'ordine con cui
                Tailwind emette i blocchi @media di min-[1100px] e md: nel foglio di stile. */}
            <nav aria-label={t("nav", "navigazionePrincipale", locale)} className="hidden md:max-[1099px]:block">
              <ul className="flex items-center gap-6">
                {navLeft.filter((item) => NAV_LEFT_TABLET.has(item.id)).map((item, i, arr) => (
                  <DesktopDropdown key={item.id} item={item} align={getDropdownAlign(i, arr.length)} onVillaPage={onVillaPage} />
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.04em]">
            <ul className="hidden items-center gap-5 min-[1100px]:flex">
              {navRight.map((item) => (
                <li key={item.label}>
                  {onVillaPage ? (
                    <a href={item.href} className="transition-colors hover:text-gold">
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="transition-colors hover:text-gold">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div ref={langRef} className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                className="flex items-center gap-1 transition-colors hover:text-gold"
              >
                {locale.toUpperCase()}
                <ChevronIcon open={langOpen} />
              </button>
              {langOpen && (
                <ul
                  role="listbox"
                  className="absolute right-0 top-full z-[200] mt-3 w-24 overflow-hidden rounded-[3px] border border-cream/10 bg-olive-950/95 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)] backdrop-blur-md"
                >
                  {LANGUAGES.map((lang) => (
                    <li key={lang.code}>
                      <Link
                        href={withLocale(lang.code, bareItalianPath)}
                        onClick={() => setLangOpen(false)}
                        aria-current={lang.code === locale ? "true" : undefined}
                        className={`block w-full px-3 py-2 text-left font-normal normal-case tracking-normal transition-colors hover:bg-cream/5 hover:text-gold ${
                          lang.code === locale ? "text-gold" : "text-cream/90"
                        }`}
                      >
                        {lang.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="site-menu-panel"
              className="-my-3 flex items-center gap-2 py-3 transition-colors hover:text-gold"
            >
              {t("nav", "menu", locale)}
              <MenuGlyph open={menuOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* Pannello MENU: overlay a schermo intero, editoriale e centrato
          (ispirato a Lasala Plaza) — sostituisce l'accordion mobile con
          un'unica lista piatta, grande, centrata; niente sotto-menu annidati.
          z-index sopra l'header (100), sotto i dropdown di navigazione (200)
          e la modale booking (300). h-dvh invece di h-screen per evitare il
          salto dato dalla barra degli indirizzi mobile. */}
      <div
        id="site-menu-panel"
        className={`fixed inset-0 z-[150] h-dvh overflow-y-auto bg-olive-950 text-cream shadow-2xl transition-[opacity,transform] duration-250 ease-out ${
          menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <div className="mx-auto flex min-h-full w-full max-w-[1600px] flex-col px-6 pb-10 pt-6 sm:px-10">
          <div className="flex items-center justify-between pb-6">
            {onVillaPage ? (
              <a
                href={withLocale(locale, "/")}
                onClick={() => setMenuOpen(false)}
                aria-label={`Agriturismo La Mora — ${t("nav", "torna", locale)}`}
                className="flex items-center"
              >
                <Image
                  src="/images/logo/logo-bianco-agriturismo-la-mora.png"
                  alt="Agriturismo La Mora, Assisi - Perugia (Umbria)"
                  width={148}
                  height={111}
                  className="h-14 w-auto sm:h-16"
                />
              </a>
            ) : (
              <Link
                href={withLocale(locale, "/")}
                onClick={() => setMenuOpen(false)}
                aria-label={`Agriturismo La Mora — ${t("nav", "torna", locale)}`}
                className="flex items-center"
              >
                <Image
                  src="/images/logo/logo-bianco-agriturismo-la-mora.png"
                  alt="Agriturismo La Mora, Assisi - Perugia (Umbria)"
                  width={148}
                  height={111}
                  className="h-14 w-auto sm:h-16"
                />
              </Link>
            )}
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label={t("nav", "chiudi", locale)}
              className="-my-3 flex items-center gap-2 py-3 text-[11px] font-semibold uppercase tracking-[0.04em] transition-colors hover:text-gold"
            >
              {t("nav", "chiudi", locale)}
              <MenuGlyph open={true} />
            </button>
          </div>

          <nav
            aria-label={t("nav", "navigazioneCompleta", locale)}
            className="flex flex-1 flex-col items-center justify-center py-8 text-center"
          >
            <ul className="flex flex-col items-center gap-1 sm:gap-2">
              {[...navLeft, ...navRight].map((item) => {
                const targetIsVilla = item.href.includes("/villa-relax-assisi");
                const crossesBoundary = targetIsVilla !== onVillaPage;
                const itemClassName = "inline-block py-1.5 font-display text-[27px] font-normal leading-tight text-cream transition-colors duration-200 hover:text-gold sm:text-[34px]";
                return (
                  <li key={item.label}>
                    {crossesBoundary ? (
                      <a href={item.href} onClick={() => setMenuOpen(false)} className={itemClassName}>
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} onClick={() => setMenuOpen(false)} className={itemClassName}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-9 flex items-center gap-2 sm:mt-11">
              {LANGUAGES.map((lang) => (
                <Link
                  key={lang.code}
                  href={withLocale(lang.code, bareItalianPath)}
                  onClick={() => setMenuOpen(false)}
                  aria-current={lang.code === locale ? "true" : undefined}
                  className={`rounded-[3px] border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] transition-colors hover:border-gold hover:text-gold ${
                    lang.code === locale ? "border-gold text-gold" : "border-cream/20"
                  }`}
                >
                  {lang.label}
                </Link>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-6 border-t border-cream/10 pt-10 sm:mt-12 sm:pt-12">
              <address className="text-center text-[14px] not-italic leading-[1.8] text-gold/90">
                <p>Via Fonte Citerna, 7 — 06081 Assisi (PG)</p>
                <p>
                  <a href={PHONE_TEL} className="transition-colors hover:text-cream">
                    {PHONE_DISPLAY}
                  </a>
                  {" · "}
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-cream"
                  >
                    WhatsApp
                  </a>
                </p>
                <p>
                  <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-cream">
                    {EMAIL}
                  </a>
                </p>
              </address>

              <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/50">{t("nav", "seguici", locale)}</span>
                <div className="flex items-center gap-3">
                  {/* TODO: collegare ai profili social reali quando confermati dal titolare */}
                  <a
                    href="#"
                    aria-label="Facebook Agriturismo La Mora"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 text-cream/85 transition-colors hover:border-gold hover:text-gold"
                  >
                    <SocialIcon kind="facebook" />
                  </a>
                  <a
                    href="https://www.instagram.com/paolo.720/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Agriturismo La Mora"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 text-cream/85 transition-colors hover:border-gold hover:text-gold"
                  >
                    <SocialIcon kind="instagram" />
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
