import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import { BookingModalButton } from "@/components/booking-modal-button";
import { HoverFill } from "@/components/hover-fill";
import choco from "@/components/chocolate-theme.module.css";
import { WHATSAPP_NUMBER } from "@/data/promo";
import type { BlogCtaDistance } from "@/data/blog-ctas";

/* CTA di prenotazione degli articoli del blog, in tre varianti:
   - "intro"    (A) dopo l'intro e "In breve": riga contestuale + Prenota
                    (modale bed-and-breakfast.it) + "Vedi gli appartamenti";
   - "distance" (B) a metà articolo: "Dormi a X km da [luogo]" con la
                    distanza reale (src/data/blog-ctas.ts) + Prenota;
   - "direct"   (C) in chiusura, dopo le FAQ: vantaggi della prenotazione
                    diretta + Prenota + WhatsApp + link alle offerte.
   I vantaggi sono SOLO i fatti del brief (PROJECT-BRIEF.md, Booking engine),
   con le stesse parole di availability-box.tsx: nessun intermediario, -10% da
   7 notti, -10% per chi torna, caparra 25%. Mai lo sconto Eurochocolate qui:
   quello vive solo nel box offerta del suo articolo.
   Server component: markup identico tra SSR e client (BookingModalButton è
   un pulsante normale), pulsanti con flex-wrap e altezza minima fissa, quindi
   niente layout shift né overflow su telefono. Tema "chocolate" solo per
   l'articolo Eurochocolate. */

type Theme = "default" | "chocolate";

const UI: Record<
  Locale,
  {
    book: string;
    apartments: string;
    stayKicker: string;
    stayTitle: (km: string, from: string) => string;
    byCar: (minutes: number) => string;
    directKicker: string;
    benefits: string[];
    offers: string;
    whatsappText: (title: string) => string;
  }
> = {
  it: {
    book: "Prenota",
    apartments: "Vedi gli appartamenti",
    stayKicker: "Dove dormire",
    stayTitle: (km, from) => `Dormi a ${km} km ${from}`,
    byCar: (m) => (m >= 60 ? "Circa un'ora in auto (Google Maps)." : `Circa ${m} minuti in auto (Google Maps).`),
    directKicker: "Prenota direttamente",
    benefits: ["Nessun intermediario: prenoti direttamente con noi", "-10% per soggiorni da 7 notti", "-10% se sei già stato nostro ospite", "Caparra del 25%, saldo all'arrivo"],
    offers: "Tutte le offerte",
    whatsappText: (title) => `Ciao! Ho letto «${title}» sul vostro sito e vorrei informazioni per un soggiorno ad Agriturismo La Mora.`,
  },
  en: {
    book: "Book",
    apartments: "See the apartments",
    stayKicker: "Where to stay",
    stayTitle: (km, from) => `Stay ${km} km ${from}`,
    byCar: (m) => (m >= 60 ? "About an hour by car (Google Maps)." : `About ${m} minutes by car (Google Maps).`),
    directKicker: "Book direct",
    benefits: ["No middleman: you book directly with us", "10% off stays of 7 nights or more", "10% off if you've stayed with us before", "25% deposit, balance on arrival"],
    offers: "All offers",
    whatsappText: (title) => `Hello! I read “${title}” on your website and would like information about a stay at Agriturismo La Mora.`,
  },
  fr: {
    book: "Réserver",
    apartments: "Voir les appartements",
    stayKicker: "Où dormir",
    stayTitle: (km, from) => `Dormez à ${km} km ${from}`,
    byCar: (m) => (m >= 60 ? "Environ une heure en voiture (Google Maps)." : `Environ ${m} minutes en voiture (Google Maps).`),
    directKicker: "Réservez en direct",
    benefits: ["Aucun intermédiaire : vous réservez directement chez nous", "-10 % pour les séjours de 7 nuits ou plus", "-10 % si vous avez déjà séjourné chez nous", "Acompte de 25 %, solde à l'arrivée"],
    offers: "Toutes les offres",
    whatsappText: (title) => `Bonjour ! J'ai lu « ${title} » sur votre site et je voudrais des informations pour un séjour à l'Agriturismo La Mora.`,
  },
  de: {
    book: "Buchen",
    apartments: "Ferienwohnungen ansehen",
    stayKicker: "Übernachten",
    stayTitle: (km, from) => `Übernachten Sie ${km} km ${from} entfernt`,
    byCar: (m) => (m >= 60 ? "Rund eine Stunde mit dem Auto (Google Maps)." : `Rund ${m} Minuten mit dem Auto (Google Maps).`),
    directKicker: "Direkt buchen",
    benefits: ["Kein Vermittler: Sie buchen direkt bei uns", "10 % Rabatt ab 7 Nächten", "10 % Rabatt, wenn Sie schon bei uns waren", "25 % Anzahlung, Restzahlung bei Ankunft"],
    offers: "Alle Angebote",
    whatsappText: (title) => `Hallo! Ich habe „${title}“ auf Ihrer Website gelesen und hätte gern Informationen zu einem Aufenthalt im Agriturismo La Mora.`,
  },
};

const BTN = "group relative inline-flex min-h-[46px] items-center justify-center gap-2.5 overflow-hidden rounded-lg px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em]";

function Arrow() {
  return (
    <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
      →
    </span>
  );
}

function BookButton({ label, tone, theme }: { label: string; tone: "gold" | "raspberry"; theme: Theme }) {
  if (theme === "chocolate") {
    return (
      <BookingModalButton className={`${choco.sheen} ${BTN}`}>
        <span className="relative z-10 inline-flex items-center gap-2.5">
          {label}
          <Arrow />
        </span>
      </BookingModalButton>
    );
  }
  return (
    <BookingModalButton className={`${BTN} ${tone === "raspberry" ? "bg-raspberry text-cream" : "bg-gold text-[#1f180e]"}`}>
      <HoverFill color={tone === "raspberry" ? "#8a3844" : "#8f7330"} />
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {label}
        <Arrow />
      </span>
    </BookingModalButton>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.8l5.1-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.1 1.6 2.5 4 3.5 1.5.6 2.1.7 2.8.6.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1l-.4-.2Z" />
    </svg>
  );
}

function Box({ theme, variant, children }: { theme: Theme; variant: "light" | "panel"; children: ReactNode }) {
  if (theme === "chocolate") {
    return (
      <div className={`${choco.root} ${variant === "panel" ? choco.offer : choco.melted} my-10 rounded-[10px] px-6 py-7 sm:px-8 sm:py-8`}>
        {children}
      </div>
    );
  }
  return (
    <div className={`my-10 rounded-[6px] px-6 py-7 sm:px-8 sm:py-8 ${variant === "panel" ? "border border-ink/10 bg-cream-dim" : "bg-cream-dim"}`}>
      {children}
    </div>
  );
}

type Common = { locale: Locale; theme?: Theme };

export function BlogBookingCta(
  props:
    | (Common & { variant: "intro"; line: string })
    | (Common & { variant: "distance"; distance: BlogCtaDistance })
    | (Common & { variant: "direct"; heading: string; articleTitle: string }),
) {
  const { locale } = props;
  const theme = props.theme ?? "default";
  const ui = UI[locale];
  const isChoco = theme === "chocolate";
  const text = isChoco ? "text-[var(--crema)]" : "text-ink";
  const soft = isChoco ? "text-[var(--crema)]/85" : "text-ink-soft";
  const kicker = `text-[10px] font-semibold uppercase tracking-[0.18em] ${isChoco ? "text-[var(--caramello-chiaro)]" : "text-olive-950"}`;
  const secondary = isChoco
    ? `${choco.ghost} ${BTN}`
    : `${BTN} border border-ink/20 text-ink transition-colors duration-200 hover:border-raspberry hover:text-raspberry`;

  if (props.variant === "intro") {
    return (
      <Box theme={theme} variant="light">
        <p className={`text-center font-display text-[19px] font-normal leading-[1.4] [text-wrap:balance] sm:text-[21px] ${text}`}>{props.line}</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <BookButton label={ui.book} tone="gold" theme={theme} />
          <Link href={withLocale(locale, "/alloggi/")} className={secondary}>
            {ui.apartments}
          </Link>
        </div>
      </Box>
    );
  }

  if (props.variant === "distance") {
    const d = props.distance;
    const km = locale === "en" ? d.km.replace(",", ".") : d.km;
    return (
      <Box theme={theme} variant="panel">
        <div className="sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <span className={kicker}>{ui.stayKicker}</span>
            <p className={`mt-2 font-display text-[21px] font-normal leading-[1.3] [text-wrap:balance] sm:text-[23px] ${text}`}>
              {ui.stayTitle(km, d.from[locale])}
            </p>
            <p className={`mt-2 text-[14px] leading-[1.7] ${soft}`}>
              {ui.byCar(d.minutes)} {d.line[locale]}
            </p>
          </div>
          <div className="mt-5 shrink-0 sm:mt-0">
            <BookButton label={ui.book} tone="gold" theme={theme} />
          </div>
        </div>
      </Box>
    );
  }

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(ui.whatsappText(props.articleTitle))}`;
  return (
    <Box theme={theme} variant="panel">
      <span className={kicker}>{ui.directKicker}</span>
      <p className={`mt-2 font-display text-[21px] font-normal leading-[1.35] [text-wrap:balance] sm:text-[23px] ${text}`}>{props.heading}</p>
      <ul className="mt-4 space-y-2">
        {ui.benefits.map((b) => (
          <li key={b} className={`flex items-start gap-2.5 text-[14.5px] leading-[1.6] ${soft}`}>
            <span
              aria-hidden="true"
              className={`mt-[3px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                isChoco ? "bg-[var(--caramello)] text-[var(--cacao)]" : "bg-olive-950 text-cream"
              }`}
            >
              ✓
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <BookButton label={ui.book} tone="raspberry" theme={theme} />
        <a href={waHref} target="_blank" rel="noopener noreferrer" className={`${secondary} gap-2 normal-case tracking-normal text-[12px]`}>
          <WhatsappIcon />
          {t("common", "scriviciWhatsapp", locale)}
        </a>
      </div>
      <Link
        href={withLocale(locale, "/offerte/")}
        className={`mt-4 inline-block text-[13px] underline underline-offset-4 ${
          isChoco ? "text-[var(--caramello-chiaro)] decoration-[var(--caramello-chiaro)]/40" : "text-raspberry decoration-raspberry/30 hover:decoration-raspberry"
        }`}
      >
        {ui.offers} →
      </Link>
    </Box>
  );
}
