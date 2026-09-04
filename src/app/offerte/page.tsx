import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { LocationMap } from "@/components/location-map";
import { NewsletterSection } from "@/components/newsletter-section";
import { CertificationsMarquee } from "@/components/certifications-marquee";

export const metadata: Metadata = {
  title: "Offerte",
  description:
    "Le condizioni reali riservate a chi prenota direttamente ad Agriturismo La Mora: -10% da 7 notti, -10% per chi torna, -10% con tariffa non rimborsabile.",
  alternates: { canonical: "/offerte/" },
};

const GIFT_CARDS = [
  {
    href: "/offerte/cofanetti-regalo/",
    title: "Cofanetti regalo",
    desc: "Quattro pacchetti pensati per coppie e famiglie, con notti, colazioni e servizi già inclusi.",
    img: "/images/Nuova cartella/Due notti romantiche/due notti romantiche.jpg",
  },
  {
    href: "/offerte/smartbox/",
    title: "Smartbox",
    desc: "Hai già un cofanetto Smartbox? Ecco come registrarlo e prenotare il soggiorno.",
    img: "/images/struttura/immagine di una sala dell agriturismo.webp",
  },
] as const;

function OfferBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-olive-950">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </span>
  );
}

/* Pagina "Offerte": le tre condizioni reali confermate in PROJECT-BRIEF.md
   sezione 2 (7+ notti, cliente di ritorno, tariffa non rimborsabile — tutte
   -10%), presentate come grandi blocchi editoriali invece che come card
   e-commerce. Nessun prezzo/pacchetto inventato: dove esistono altre
   offerte reali (cofanetti regalo, Smartbox), sono richiamate come ponte
   verso le loro pagine già costruite, non ricreate qui. */
export default function OffertePage() {
  return (
    <>
      {/* 1. Hero immersiva */}
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
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cream/80">
              Prenota direttamente · Assisi
            </span>
            <h1 className="mt-5 font-display text-[clamp(38px,6.5vw,66px)] font-normal leading-[1.08] text-cream [text-wrap:balance]">
              Le offerte di La Mora.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <span aria-hidden="true" className="mx-auto mt-10 block h-10 w-px bg-cream/40" />
          </Reveal>
        </div>
      </section>

      {/* 2. Intro editoriale */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-[720px] px-6 text-center sm:px-10">
          <Reveal>
            <p className="font-display text-[clamp(22px,3vw,30px)] font-normal leading-[1.5] text-ink [text-wrap:balance]">
              Prenotare direttamente con noi non è solo una questione di prezzo: significa avere accesso alle
              condizioni che riserviamo a chi sceglie di scriverci senza passare da un intermediario.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. Offerta 1 — 7+ notti */}
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
            <OfferBadge>Vantaggio diretto</OfferBadge>
            <h2 className="mt-5 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              Più tempo a La Mora.
            </h2>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-[56px] leading-none text-raspberry">-10%</span>
              <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-ink-soft">
                Soggiorno minimo
                <br />7 notti
              </span>
            </div>
            <p className="mt-6 max-w-[420px] text-[14px] leading-[1.8] text-ink-soft">
              Chi si ferma una settimana o più ha uno sconto diretto del 10% sul totale del soggiorno — nessuna
              richiesta particolare, si applica automaticamente a partire dalla settima notte.
            </p>
            <a
              href="https://wa.me/393934363917?text=Ciao!%20Vorrei%20verificare%20la%20disponibilit%C3%A0%20per%20un%20soggiorno%20di%207%20o%20pi%C3%B9%20notti."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
            >
              <HoverFill color="#8a3844" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Verifica disponibilità
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* 4. Offerta 2 — ospiti di ritorno */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-12 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
          <Reveal className="order-2 sm:order-1">
            <OfferBadge>Vantaggio diretto</OfferBadge>
            <h2 className="mt-5 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              Bentornati a La Mora.
            </h2>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-[56px] leading-none text-raspberry">-10%</span>
              <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-ink-soft">
                Per chi torna
                <br />da noi
              </span>
            </div>
            <p className="mt-6 max-w-[420px] text-[14px] leading-[1.8] text-ink-soft">
              Dalla seconda prenotazione diretta in poi, chi è già stato nostro ospite ha un altro 10% di sconto.
              Basta scriverci ricordando il soggiorno precedente al momento della richiesta.
            </p>
            <a
              href="https://wa.me/393934363917?text=Ciao!%20Sono%20gi%C3%A0%20stato%20vostro%20ospite%20e%20vorrei%20prenotare%20di%20nuovo."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
            >
              <HoverFill color="#8a3844" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Torna a La Mora
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

      {/* 5. Offerta 3 — tariffa non rimborsabile */}
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
            <OfferBadge>Offerta</OfferBadge>
            <h2 className="mt-5 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              Blocca ora la tua tariffa.
            </h2>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-[56px] leading-none text-raspberry">-10%</span>
              <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-ink-soft">
                Rispetto alla
                <br />tariffa flessibile
              </span>
            </div>
            <p className="mt-6 max-w-[420px] text-[14px] leading-[1.8] text-ink-soft">
              Chi ha già le idee chiare sulle date può scegliere la tariffa non rimborsabile e risparmiare un altro
              10%.
            </p>
            <p className="mt-3 max-w-[420px] rounded-[3px] border-l-2 border-gold bg-cream/60 px-4 py-3 text-[13px] font-semibold leading-[1.6] text-ink">
              Attenzione: questa tariffa non è rimborsabile in caso di cancellazione.
            </p>
            <a
              href="https://wa.me/393934363917?text=Ciao!%20Vorrei%20informazioni%20sulla%20tariffa%20non%20rimborsabile."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
            >
              <HoverFill color="#8a3844" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Scrivici per bloccarla
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Ponte verso le altre offerte reali già esistenti (cofanetti regalo, Smartbox) */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Altre offerte</span>
            <h2 className="mt-3 font-display text-[24px] font-normal leading-[1.2] text-ink">
              Un regalo, o un cofanetto già in mano.
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {GIFT_CARDS.map((c, i) => (
              <Reveal key={c.href} delay={i * 80}>
                <Link href={c.href} className="group block">
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

      {/* 6. Non trovi l'offerta giusta? */}
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
              Cerchi qualcosa di diverso?
            </h2>
            <p className="mt-4 text-[14px] leading-[1.75] text-cream/75">
              Scrivici direttamente il tuo soggiorno — date, ospiti, esigenze particolari — e verifichiamo insieme
              disponibilità e condizioni più adatte a te.
            </p>
            <a
              href="https://wa.me/393934363917?text=Ciao!%20Vorrei%20chiedere%20informazioni%20su%20un%20soggiorno%20a%20La%20Mora."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-7 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
            >
              <HoverFill color="#8f7330" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Chiedi informazioni
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* 7. Micro-blocco prenotazione diretta */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[900px] px-6 sm:px-10">
          <Reveal>
            <dl className="grid grid-cols-1 gap-10 border-t border-ink/10 pt-10 text-center sm:grid-cols-3 sm:text-left">
              {[
                { title: "Contatto diretto", text: "Scrivi a chi gestisce La Mora ogni giorno, non a un call center." },
                { title: "Le offerte del sito", text: "Le condizioni qui sopra valgono solo per chi prenota direttamente con noi." },
                { title: "Nessun intermediario", text: "Niente commissioni nascoste nel prezzo che vedi." },
              ].map((item) => (
                <div key={item.title}>
                  <dt className="font-sans text-[12px] font-semibold uppercase tracking-[0.06em] text-ink">{item.title}</dt>
                  <dd className="mt-2 text-[13px] leading-[1.6] text-ink-soft">{item.text}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex justify-center sm:justify-start">
              <Link
                href="/alloggi/"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-terracotta px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
              >
                <HoverFill color="#8f4324" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  Scopri gli appartamenti
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Dove siamo / mappa — stessa sezione della homepage */}
      <LocationMap />

      {/* Newsletter — stessa sezione della homepage */}
      <NewsletterSection />

      {/* Certificazioni — stessa sezione della homepage */}
      <CertificationsMarquee />
    </>
  );
}
