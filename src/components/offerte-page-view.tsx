import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { LocationMap } from "@/components/location-map";
import { NewsletterSection } from "@/components/newsletter-section";
import { CertificationsMarquee } from "@/components/certifications-marquee";
import { BbitWidgetCard } from "@/components/bbit-widget-card";
import { bbitOfferteUrl } from "@/lib/bbit-widget-urls";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const OFFERS_WIDGET_TEXT: Record<Locale, { label: string; heading: string }> = {
  it: { label: "Offerte in corso", heading: "Le promozioni attive in questo momento" },
  en: { label: "Current offers", heading: "Promotions active right now" },
  fr: { label: "Offres en cours", heading: "Les promotions actives en ce moment" },
  de: { label: "Aktuelle Angebote", heading: "Derzeit aktive Aktionen" },
};

const METADATA_TEXT: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Offerte",
    description: "Le condizioni reali riservate a chi prenota direttamente ad Agriturismo La Mora: -10% da 7 notti, -10% per chi torna, -10% con tariffa non rimborsabile.",
  },
  en: {
    title: "Offers",
    description: "The real conditions reserved for those who book directly with Agriturismo La Mora: -10% from 7 nights, -10% for returning guests, -10% with the non-refundable rate.",
  },
  fr: {
    title: "Offres",
    description: "Les conditions réelles réservées à ceux qui réservent directement chez Agriturismo La Mora : -10% à partir de 7 nuits, -10% pour les hôtes fidèles, -10% avec le tarif non remboursable.",
  },
  de: {
    title: "Angebote",
    description: "Die echten Konditionen für alle, die direkt bei Agriturismo La Mora buchen: -10% ab 7 Nächten, -10% für wiederkehrende Gäste, -10% mit nicht rückerstattbarem Tarif.",
  },
};

export function getOfferteMetadata(locale: Locale) {
  const m = METADATA_TEXT[locale];
  return { title: m.title, description: m.description, alternates: { canonical: withLocale(locale, "/offerte/") } };
}

const GIFT_CARDS: Record<Locale, { href: string; title: string; desc: string; img: string }[]> = {
  it: [
    { href: "/offerte/cofanetti-regalo/", title: "Cofanetti regalo", desc: "Quattro pacchetti pensati per coppie e famiglie, con notti, colazioni e servizi già inclusi.", img: "/images/Nuova cartella/Due notti romantiche/due notti romantiche.jpg" },
    { href: "/offerte/smartbox/", title: "Smartbox", desc: "Hai già un cofanetto Smartbox? Ecco come registrarlo e prenotare il soggiorno.", img: "/images/struttura/immagine di una sala dell agriturismo.webp" },
  ],
  en: [
    { href: "/offerte/cofanetti-regalo/", title: "Gift boxes", desc: "Four packages designed for couples and families, with nights, breakfast and services already included.", img: "/images/Nuova cartella/Due notti romantiche/due notti romantiche.jpg" },
    { href: "/offerte/smartbox/", title: "Smartbox", desc: "Already have a Smartbox voucher? Here's how to register it and book your stay.", img: "/images/struttura/immagine di una sala dell agriturismo.webp" },
  ],
  fr: [
    { href: "/offerte/cofanetti-regalo/", title: "Coffrets cadeaux", desc: "Quatre formules pensées pour les couples et les familles, nuits, petit-déjeuner et services déjà inclus.", img: "/images/Nuova cartella/Due notti romantiche/due notti romantiche.jpg" },
    { href: "/offerte/smartbox/", title: "Smartbox", desc: "Vous avez déjà un coffret Smartbox ? Voici comment l'enregistrer et réserver votre séjour.", img: "/images/struttura/immagine di una sala dell agriturismo.webp" },
  ],
  de: [
    { href: "/offerte/cofanetti-regalo/", title: "Geschenkboxen", desc: "Vier Pakete für Paare und Familien, mit Nächten, Frühstück und Leistungen bereits inbegriffen.", img: "/images/Nuova cartella/Due notti romantiche/due notti romantiche.jpg" },
    { href: "/offerte/smartbox/", title: "Smartbox", desc: "Haben Sie bereits eine Smartbox? So registrieren Sie sie und buchen Ihren Aufenthalt.", img: "/images/struttura/immagine di una sala dell agriturismo.webp" },
  ],
};

const TEXT: Record<
  Locale,
  {
    heroLabel: string;
    heroTitle: string;
    introBody: string;
    badgeVantaggio: string;
    badgeOfferta: string;
    o1Heading: string;
    o1StatLabel: string;
    o1Body: string;
    o1Cta: string;
    o1WaMsg: string;
    o2Heading: string;
    o2StatLabel: string;
    o2Body: string;
    o2Cta: string;
    o2WaMsg: string;
    o3Heading: string;
    o3StatLabel: string;
    o3Body: string;
    o3Warning: string;
    o3Cta: string;
    o3WaMsg: string;
    altreLabel: string;
    altreHeading: string;
    diversoHeading: string;
    diversoBody: string;
    diversoCta: string;
    diversoWaMsg: string;
    microItems: { title: string; text: string }[];
    microCta: string;
  }
> = {
  it: {
    heroLabel: "Prenota direttamente · Assisi",
    heroTitle: "Le offerte di La Mora.",
    introBody: "Prenotare direttamente con noi non è solo una questione di prezzo: significa avere accesso alle condizioni che riserviamo a chi sceglie di scriverci senza passare da un intermediario.",
    badgeVantaggio: "Vantaggio diretto",
    badgeOfferta: "Offerta",
    o1Heading: "Più tempo a La Mora.",
    o1StatLabel: "Soggiorno minimo\n7 notti",
    o1Body: "Chi si ferma una settimana o più ha uno sconto diretto del 10% sul totale del soggiorno — nessuna richiesta particolare, si applica automaticamente a partire dalla settima notte.",
    o1Cta: "Verifica disponibilità",
    o1WaMsg: "Ciao! Vorrei verificare la disponibilità per un soggiorno di 7 o più notti.",
    o2Heading: "Bentornati a La Mora.",
    o2StatLabel: "Per chi torna\nda noi",
    o2Body: "Dalla seconda prenotazione diretta in poi, chi è già stato nostro ospite ha un altro 10% di sconto. Basta scriverci ricordando il soggiorno precedente al momento della richiesta.",
    o2Cta: "Torna a La Mora",
    o2WaMsg: "Ciao! Sono già stato vostro ospite e vorrei prenotare di nuovo.",
    o3Heading: "Blocca ora la tua tariffa.",
    o3StatLabel: "Rispetto alla\ntariffa flessibile",
    o3Body: "Chi ha già le idee chiare sulle date può scegliere la tariffa non rimborsabile e risparmiare un altro 10%.",
    o3Warning: "Attenzione: questa tariffa non è rimborsabile in caso di cancellazione.",
    o3Cta: "Scrivici per bloccarla",
    o3WaMsg: "Ciao! Vorrei informazioni sulla tariffa non rimborsabile.",
    altreLabel: "Altre offerte",
    altreHeading: "Un regalo, o un cofanetto già in mano.",
    diversoHeading: "Cerchi qualcosa di diverso?",
    diversoBody: "Scrivici direttamente il tuo soggiorno — date, ospiti, esigenze particolari — e verifichiamo insieme disponibilità e condizioni più adatte a te.",
    diversoCta: "Chiedi informazioni",
    diversoWaMsg: "Ciao! Vorrei chiedere informazioni su un soggiorno a La Mora.",
    microItems: [
      { title: "Contatto diretto", text: "Scrivi a chi gestisce La Mora ogni giorno, non a un call center." },
      { title: "Le offerte del sito", text: "Le condizioni qui sopra valgono solo per chi prenota direttamente con noi." },
      { title: "Nessun intermediario", text: "Niente commissioni nascoste nel prezzo che vedi." },
    ],
    microCta: "Scopri gli appartamenti",
  },
  en: {
    heroLabel: "Book directly · Assisi",
    heroTitle: "La Mora's offers.",
    introBody: "Booking directly with us isn't just about price: it means access to the conditions we reserve for those who choose to write to us without going through a middleman.",
    badgeVantaggio: "Direct benefit",
    badgeOfferta: "Offer",
    o1Heading: "More time at La Mora.",
    o1StatLabel: "Minimum stay\n7 nights",
    o1Body: "Those who stay a week or more get a direct 10% discount on the total stay — no special request needed, it applies automatically from the seventh night.",
    o1Cta: "Check availability",
    o1WaMsg: "Hi! I'd like to check availability for a stay of 7 or more nights.",
    o2Heading: "Welcome back to La Mora.",
    o2StatLabel: "For returning\nguests",
    o2Body: "From the second direct booking onwards, past guests get another 10% discount. Just mention your previous stay when you write to us.",
    o2Cta: "Come back to La Mora",
    o2WaMsg: "Hi! I've already stayed with you and I'd like to book again.",
    o3Heading: "Lock in your rate now.",
    o3StatLabel: "Compared to the\nflexible rate",
    o3Body: "Those who already know their dates can choose the non-refundable rate and save another 10%.",
    o3Warning: "Please note: this rate is non-refundable in case of cancellation.",
    o3Cta: "Write to lock it in",
    o3WaMsg: "Hi! I'd like information about the non-refundable rate.",
    altreLabel: "Other offers",
    altreHeading: "A gift, or a voucher already in hand.",
    diversoHeading: "Looking for something different?",
    diversoBody: "Write to us directly about your stay — dates, guests, special needs — and we'll check together the availability and conditions that suit you best.",
    diversoCta: "Ask for information",
    diversoWaMsg: "Hi! I'd like information about a stay at La Mora.",
    microItems: [
      { title: "Direct contact", text: "Write to the people who run La Mora every day, not a call centre." },
      { title: "The offers on this site", text: "The conditions above only apply to those who book directly with us." },
      { title: "No middleman", text: "No hidden commissions in the price you see." },
    ],
    microCta: "Discover the apartments",
  },
  fr: {
    heroLabel: "Réservez directement · Assise",
    heroTitle: "Les offres de La Mora.",
    introBody: "Réserver directement avec nous n'est pas qu'une question de prix : cela signifie avoir accès aux conditions que nous réservons à ceux qui choisissent de nous écrire sans passer par un intermédiaire.",
    badgeVantaggio: "Avantage direct",
    badgeOfferta: "Offre",
    o1Heading: "Plus de temps à La Mora.",
    o1StatLabel: "Séjour minimum\n7 nuits",
    o1Body: "Ceux qui restent une semaine ou plus bénéficient d'une remise directe de 10% sur le total du séjour — aucune demande particulière, elle s'applique automatiquement à partir de la septième nuit.",
    o1Cta: "Vérifier la disponibilité",
    o1WaMsg: "Bonjour ! Je voudrais vérifier la disponibilité pour un séjour de 7 nuits ou plus.",
    o2Heading: "Bon retour à La Mora.",
    o2StatLabel: "Pour les hôtes\nqui reviennent",
    o2Body: "Dès la deuxième réservation directe, ceux qui ont déjà été nos hôtes bénéficient d'une remise supplémentaire de 10%. Il suffit de mentionner votre séjour précédent au moment de la demande.",
    o2Cta: "Revenir à La Mora",
    o2WaMsg: "Bonjour ! J'ai déjà séjourné chez vous et je souhaiterais réserver à nouveau.",
    o3Heading: "Bloquez votre tarif dès maintenant.",
    o3StatLabel: "Par rapport au\ntarif flexible",
    o3Body: "Ceux qui connaissent déjà leurs dates peuvent choisir le tarif non remboursable et économiser encore 10%.",
    o3Warning: "Attention : ce tarif n'est pas remboursable en cas d'annulation.",
    o3Cta: "Écrivez-nous pour le bloquer",
    o3WaMsg: "Bonjour ! Je voudrais des informations sur le tarif non remboursable.",
    altreLabel: "Autres offres",
    altreHeading: "Un cadeau, ou un coffret déjà en main.",
    diversoHeading: "Vous cherchez autre chose ?",
    diversoBody: "Écrivez-nous directement votre séjour — dates, hôtes, besoins particuliers — et nous vérifions ensemble la disponibilité et les conditions les plus adaptées.",
    diversoCta: "Demander des informations",
    diversoWaMsg: "Bonjour ! Je voudrais des informations sur un séjour à La Mora.",
    microItems: [
      { title: "Contact direct", text: "Écrivez à ceux qui gèrent La Mora chaque jour, pas à un centre d'appels." },
      { title: "Les offres du site", text: "Les conditions ci-dessus ne s'appliquent qu'à une réservation directe avec nous." },
      { title: "Aucun intermédiaire", text: "Aucune commission cachée dans le prix que vous voyez." },
    ],
    microCta: "Découvrir les appartements",
  },
  de: {
    heroLabel: "Direkt buchen · Assisi",
    heroTitle: "Die Angebote von La Mora.",
    introBody: "Direkt bei uns zu buchen ist nicht nur eine Preisfrage: es bedeutet Zugang zu den Konditionen, die wir für alle reservieren, die sich entscheiden, uns ohne Vermittler zu schreiben.",
    badgeVantaggio: "Direkter Vorteil",
    badgeOfferta: "Angebot",
    o1Heading: "Mehr Zeit bei La Mora.",
    o1StatLabel: "Mindestaufenthalt\n7 Nächte",
    o1Body: "Wer eine Woche oder länger bleibt, erhält einen direkten Rabatt von 10% auf den Gesamtaufenthalt — keine besondere Anfrage nötig, er gilt automatisch ab der siebten Nacht.",
    o1Cta: "Verfügbarkeit prüfen",
    o1WaMsg: "Hallo! Ich möchte die Verfügbarkeit für einen Aufenthalt von 7 oder mehr Nächten prüfen.",
    o2Heading: "Willkommen zurück bei La Mora.",
    o2StatLabel: "Für wiederkehrende\nGäste",
    o2Body: "Ab der zweiten Direktbuchung erhalten frühere Gäste weitere 10% Rabatt. Erwähnen Sie einfach Ihren vorherigen Aufenthalt bei der Anfrage.",
    o2Cta: "Zurück zu La Mora",
    o2WaMsg: "Hallo! Ich war bereits Ihr Gast und möchte erneut buchen.",
    o3Heading: "Sichern Sie sich jetzt Ihren Tarif.",
    o3StatLabel: "Im Vergleich zum\nflexiblen Tarif",
    o3Body: "Wer seine Daten bereits kennt, kann den nicht rückerstattbaren Tarif wählen und weitere 10% sparen.",
    o3Warning: "Achtung: dieser Tarif ist im Falle einer Stornierung nicht rückerstattbar.",
    o3Cta: "Schreiben Sie uns zur Sicherung",
    o3WaMsg: "Hallo! Ich hätte gerne Informationen zum nicht rückerstattbaren Tarif.",
    altreLabel: "Weitere Angebote",
    altreHeading: "Ein Geschenk, oder eine Box bereits in der Hand.",
    diversoHeading: "Suchen Sie etwas anderes?",
    diversoBody: "Schreiben Sie uns direkt zu Ihrem Aufenthalt — Daten, Gäste, besondere Bedürfnisse — und wir prüfen gemeinsam die für Sie passende Verfügbarkeit und Konditionen.",
    diversoCta: "Informationen anfordern",
    diversoWaMsg: "Hallo! Ich hätte gerne Informationen zu einem Aufenthalt bei La Mora.",
    microItems: [
      { title: "Direkter Kontakt", text: "Schreiben Sie an die, die La Mora jeden Tag führen, nicht an ein Callcenter." },
      { title: "Die Angebote dieser Seite", text: "Die obigen Konditionen gelten nur bei Direktbuchung bei uns." },
      { title: "Kein Vermittler", text: "Keine versteckten Provisionen im angezeigten Preis." },
    ],
    microCta: "Die Apartments entdecken",
  },
};

export function OffertePageView({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  const giftCards = GIFT_CARDS[locale];

  return (
    <>
      <section className="relative flex h-[86vh] min-h-[560px] items-end overflow-hidden">
        <Image
          src="/images/home/esterno agriturismo la mora carretto e agriturismo.webp"
          alt="Ingresso di Agriturismo La Mora"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.05) 0%, rgba(20,14,7,.35) 60%, rgba(20,14,7,.78) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[900px] px-6 pb-16 text-center sm:px-10 sm:pb-20">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cream/80">{text.heroLabel}</span>
            <h1 className="mt-5 font-display text-[clamp(38px,6.5vw,66px)] font-normal leading-[1.08] text-cream [text-wrap:balance]">
              {text.heroTitle}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <span aria-hidden="true" className="mx-auto mt-10 block h-10 w-px bg-cream/40" />
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-[720px] px-6 text-center sm:px-10">
          <Reveal>
            <p className="font-display text-[clamp(22px,3vw,30px)] font-normal leading-[1.5] text-ink [text-wrap:balance]">
              {text.introBody}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-12 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src="/images/piscina/piscina vista sedie e piscina.jpg"
                alt="Sedie a bordo piscina di Agriturismo La Mora"
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-olive-950">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
              {text.badgeVantaggio}
            </span>
            <h2 className="mt-5 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.o1Heading}
            </h2>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-[56px] leading-none text-raspberry">-10%</span>
              <span className="whitespace-pre-line text-[13px] font-semibold uppercase tracking-[0.06em] text-ink-soft">
                {text.o1StatLabel}
              </span>
            </div>
            <p className="mt-6 max-w-[420px] text-[14px] leading-[1.8] text-ink-soft">{text.o1Body}</p>
            <a
              href={`https://wa.me/393934363917?text=${encodeURIComponent(text.o1WaMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
            >
              <HoverFill color="#8a3844" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                {text.o1Cta}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-12 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
          <Reveal className="order-2 sm:order-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-olive-950">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
              {text.badgeVantaggio}
            </span>
            <h2 className="mt-5 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.o2Heading}
            </h2>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-[56px] leading-none text-raspberry">-10%</span>
              <span className="whitespace-pre-line text-[13px] font-semibold uppercase tracking-[0.06em] text-ink-soft">
                {text.o2StatLabel}
              </span>
            </div>
            <p className="mt-6 max-w-[420px] text-[14px] leading-[1.8] text-ink-soft">{text.o2Body}</p>
            <a
              href={`https://wa.me/393934363917?text=${encodeURIComponent(text.o2WaMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
            >
              <HoverFill color="#8a3844" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                {text.o2Cta}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={100} className="order-1 sm:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src="/images/struttura/foto dell esterno della struttura.webp"
                alt="Esterno di Agriturismo La Mora"
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-12 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src="/images/struttura/immagine cucina arredata.jpeg"
                alt="Cucina arredata di uno degli appartamenti di Agriturismo La Mora"
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-olive-950">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
              {text.badgeOfferta}
            </span>
            <h2 className="mt-5 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.o3Heading}
            </h2>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-[56px] leading-none text-raspberry">-10%</span>
              <span className="whitespace-pre-line text-[13px] font-semibold uppercase tracking-[0.06em] text-ink-soft">
                {text.o3StatLabel}
              </span>
            </div>
            <p className="mt-6 max-w-[420px] text-[14px] leading-[1.8] text-ink-soft">{text.o3Body}</p>
            <p className="mt-3 max-w-[420px] rounded-[3px] border-l-2 border-gold bg-cream/60 px-4 py-3 text-[13px] font-semibold leading-[1.6] text-ink">
              {text.o3Warning}
            </p>
            <a
              href={`https://wa.me/393934363917?text=${encodeURIComponent(text.o3WaMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
            >
              <HoverFill color="#8a3844" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                {text.o3Cta}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.altreLabel}</span>
            <h2 className="mt-3 font-display text-[24px] font-normal leading-[1.2] text-ink">{text.altreHeading}</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {giftCards.map((c, i) => (
              <Reveal key={c.href} delay={i * 80}>
                <Link href={withLocale(locale, c.href)} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[3px]">
                    <Image
                      src={c.img}
                      alt={c.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 500px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-[20px] font-normal text-ink">{c.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-ink-soft">{c.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex h-[64vh] min-h-[440px] items-center justify-center overflow-hidden">
        <Image
          src="/images/territorio/assisi/assisi con tramonto.jpg"
          alt="Assisi al tramonto vista dalla campagna umbra"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />
        <div className="relative z-[1] mx-auto max-w-[520px] px-6 text-center sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(26px,3.4vw,36px)] font-normal leading-[1.3] text-cream [text-wrap:balance]">
              {text.diversoHeading}
            </h2>
            <p className="mt-4 text-[14px] leading-[1.75] text-cream/75">{text.diversoBody}</p>
            <a
              href={`https://wa.me/393934363917?text=${encodeURIComponent(text.diversoWaMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-7 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
            >
              <HoverFill color="#8f7330" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                {text.diversoCta}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[900px] px-6 sm:px-10">
          <Reveal>
            <dl className="grid grid-cols-1 gap-10 border-t border-ink/10 pt-10 text-center sm:grid-cols-3 sm:text-left">
              {text.microItems.map((item) => (
                <div key={item.title}>
                  <dt className="font-sans text-[12px] font-semibold uppercase tracking-[0.06em] text-ink">{item.title}</dt>
                  <dd className="mt-2 text-[13px] leading-[1.6] text-ink-soft">{item.text}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex justify-center sm:justify-start">
              <Link
                href={withLocale(locale, "/alloggi/")}
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-terracotta px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
              >
                <HoverFill color="#8f4324" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  {text.microCta}
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto max-w-[680px] px-6 sm:px-10">
          <BbitWidgetCard
            label={OFFERS_WIDGET_TEXT[locale].label}
            heading={OFFERS_WIDGET_TEXT[locale].heading}
            scriptSrc={bbitOfferteUrl("lamora")}
            minHeight={120}
            locale={locale}
          />
        </div>
      </section>

      <LocationMap locale={locale} />
      <NewsletterSection locale={locale} />
      <CertificationsMarquee locale={locale} />
    </>
  );
}
