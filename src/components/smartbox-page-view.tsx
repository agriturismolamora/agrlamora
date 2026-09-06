import Image from "next/image";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const METADATA_TEXT: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Smartbox",
    description: "Hai un cofanetto Smartbox valido per Agriturismo La Mora? Ecco come registrarlo e prenotare il tuo soggiorno.",
  },
  en: {
    title: "Smartbox",
    description: "Do you have a Smartbox voucher valid for Agriturismo La Mora? Here's how to register it and book your stay.",
  },
  fr: {
    title: "Smartbox",
    description: "Vous avez un coffret Smartbox valable pour Agriturismo La Mora ? Voici comment l'enregistrer et réserver votre séjour.",
  },
  de: {
    title: "Smartbox",
    description: "Haben Sie eine für Agriturismo La Mora gültige Smartbox? So registrieren Sie sie und buchen Ihren Aufenthalt.",
  },
};

export function getSmartboxMetadata(locale: Locale) {
  const m = METADATA_TEXT[locale];
  return { title: m.title, description: m.description, alternates: { canonical: withLocale(locale, "/offerte/smartbox/") } };
}

const SMARTBOX_URL = "https://myaccount.smartbox.com/it/voucher/register/";

const TEXT: Record<
  Locale,
  {
    label: string;
    heroTitle: string;
    intro: string;
    comeFunziona: string;
    steps: { n: string; title: string; detail: string }[];
    ctaHeading: string;
    ctaRegistra: string;
    ctaWhatsapp: string;
    waMsg: string;
  }
> = {
  it: {
    label: "Offerte",
    heroTitle: "Hai un cofanetto Smartbox?",
    intro: "Se il tuo cofanetto Smartbox include un soggiorno ad Agriturismo La Mora, la registrazione del voucher avviene direttamente sul portale ufficiale Smartbox — non gestiamo noi il processo di registrazione o l'emissione del voucher, che restano interamente affidati a loro.",
    comeFunziona: "Come funziona",
    steps: [
      { n: "01", title: "Registra il voucher", detail: "Sul portale ufficiale Smartbox, con il codice riportato sul tuo cofanetto." },
      { n: "02", title: "Scrivici", detail: "Contattaci su WhatsApp o telefono per verificare la disponibilità per le date che preferisci." },
      { n: "03", title: "Conferma il soggiorno", detail: "Concordiamo insieme l'appartamento e i dettagli dell'arrivo." },
    ],
    ctaHeading: "Pronto a registrare il tuo voucher?",
    ctaRegistra: "Registra il voucher su Smartbox",
    ctaWhatsapp: "Scrivici su WhatsApp",
    waMsg: "Ciao! Ho un cofanetto Smartbox, come procedo per prenotare?",
  },
  en: {
    label: "Offers",
    heroTitle: "Do you have a Smartbox voucher?",
    intro: "If your Smartbox voucher includes a stay at Agriturismo La Mora, the voucher registration takes place directly on the official Smartbox portal — we do not handle the registration process or voucher issuance, which remain entirely their responsibility.",
    comeFunziona: "How it works",
    steps: [
      { n: "01", title: "Register the voucher", detail: "On the official Smartbox portal, with the code printed on your voucher." },
      { n: "02", title: "Write to us", detail: "Contact us on WhatsApp or by phone to check availability for your preferred dates." },
      { n: "03", title: "Confirm the stay", detail: "We'll agree together on the apartment and the arrival details." },
    ],
    ctaHeading: "Ready to register your voucher?",
    ctaRegistra: "Register your voucher on Smartbox",
    ctaWhatsapp: "Write to us on WhatsApp",
    waMsg: "Hi! I have a Smartbox voucher, how do I proceed with booking?",
  },
  fr: {
    label: "Offres",
    heroTitle: "Vous avez un coffret Smartbox ?",
    intro: "Si votre coffret Smartbox inclut un séjour à Agriturismo La Mora, l'enregistrement du voucher se fait directement sur le portail officiel Smartbox — nous ne gérons pas le processus d'enregistrement ni l'émission du voucher, qui restent entièrement de leur ressort.",
    comeFunziona: "Comment ça marche",
    steps: [
      { n: "01", title: "Enregistrez le voucher", detail: "Sur le portail officiel Smartbox, avec le code indiqué sur votre coffret." },
      { n: "02", title: "Écrivez-nous", detail: "Contactez-nous sur WhatsApp ou par téléphone pour vérifier la disponibilité aux dates de votre choix." },
      { n: "03", title: "Confirmez le séjour", detail: "Nous convenons ensemble de l'appartement et des détails de l'arrivée." },
    ],
    ctaHeading: "Prêt à enregistrer votre voucher ?",
    ctaRegistra: "Enregistrer le voucher sur Smartbox",
    ctaWhatsapp: "Écrivez-nous sur WhatsApp",
    waMsg: "Bonjour ! J'ai un coffret Smartbox, comment dois-je procéder pour réserver ?",
  },
  de: {
    label: "Angebote",
    heroTitle: "Haben Sie eine Smartbox?",
    intro: "Wenn Ihre Smartbox einen Aufenthalt bei Agriturismo La Mora umfasst, erfolgt die Registrierung des Gutscheins direkt auf dem offiziellen Smartbox-Portal — wir übernehmen weder den Registrierungsprozess noch die Ausstellung des Gutscheins, die vollständig in deren Verantwortung liegen.",
    comeFunziona: "So funktioniert es",
    steps: [
      { n: "01", title: "Gutschein registrieren", detail: "Auf dem offiziellen Smartbox-Portal, mit dem auf Ihrer Box angegebenen Code." },
      { n: "02", title: "Schreiben Sie uns", detail: "Kontaktieren Sie uns per WhatsApp oder Telefon, um die Verfügbarkeit für Ihre bevorzugten Termine zu prüfen." },
      { n: "03", title: "Aufenthalt bestätigen", detail: "Wir vereinbaren gemeinsam das Apartment und die Ankunftsdetails." },
    ],
    ctaHeading: "Bereit, Ihren Gutschein zu registrieren?",
    ctaRegistra: "Gutschein bei Smartbox registrieren",
    ctaWhatsapp: "Schreiben Sie uns auf WhatsApp",
    waMsg: "Hallo! Ich habe eine Smartbox, wie gehe ich für die Buchung vor?",
  },
};

export function SmartboxPageView({ locale }: { locale: Locale }) {
  const text = TEXT[locale];

  return (
    <>
      <section className="relative flex h-[46vh] min-h-[340px] items-end overflow-hidden">
        <Image
          src="/images/home/foto della piscina agriturismo la mora.webp"
          alt="Agriturismo La Mora, la struttura che ti aspetta con il tuo cofanetto Smartbox"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.1) 0%, rgba(20,14,7,.72) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[640px] px-6 pb-10 text-center sm:px-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/75">{text.label}</span>
          <h1 className="mt-3 font-display text-[clamp(28px,4vw,42px)] font-normal leading-[1.15] text-cream [text-wrap:balance]">
            {text.heroTitle}
          </h1>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[640px] px-6 text-center sm:px-10">
          <Reveal>
            <p className="text-[15px] leading-[1.8] text-ink-soft">{text.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto max-w-[900px] px-6 sm:px-10">
          <Reveal>
            <span className="mx-auto block text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">
              {text.comeFunziona}
            </span>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {text.steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 80}>
                <div className="text-center sm:text-left">
                  <span className="font-display text-4xl text-gold">{step.n}</span>
                  <h2 className="mt-3 font-sans text-[13px] font-semibold uppercase tracking-[0.06em] text-ink">
                    {step.title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-[1.7] text-ink-soft">{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1f180e] py-16 text-center sm:py-20">
        <div className="mx-auto max-w-[480px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-cream [text-wrap:balance]">
              {text.ctaHeading}
            </h2>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={SMARTBOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
              >
                <HoverFill color="#8f7330" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  {text.ctaRegistra}
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
              <a
                href={`https://wa.me/393934363917?text=${encodeURIComponent(text.waMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold uppercase tracking-[0.06em] text-cream/70 underline decoration-cream/30 underline-offset-4 hover:text-cream"
              >
                {text.ctaWhatsapp}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
