import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";

export const metadata: Metadata = {
  title: "Smartbox",
  description: "Hai un cofanetto Smartbox valido per Agriturismo La Mora? Ecco come registrarlo e prenotare il tuo soggiorno.",
  alternates: { canonical: "/offerte/smartbox/" },
};

const SMARTBOX_URL = "https://myaccount.smartbox.com/it/voucher/register/";

const STEPS = [
  {
    n: "01",
    title: "Registra il voucher",
    detail: "Sul portale ufficiale Smartbox, con il codice riportato sul tuo cofanetto.",
  },
  {
    n: "02",
    title: "Scrivici",
    detail: "Contattaci su WhatsApp o telefono per verificare la disponibilità per le date che preferisci.",
  },
  {
    n: "03",
    title: "Conferma il soggiorno",
    detail: "Concordiamo insieme l'appartamento e i dettagli dell'arrivo.",
  },
] as const;

/* Pagina volutamente onesta: l'unico dato verificato in progetto sul
   rapporto con Smartbox è il link di registrazione voucher, gestito
   interamente da loro (PROJECT-BRIEF.md sezione 4/6) — nessuna
   integrazione lato nostro. I 3 passaggi sotto non sono un processo
   inventato: sono esattamente i due fatti reali (registrazione su
   Smartbox + contatto diretto con noi) scomposti in modo leggibile,
   senza aggiungere nulla di non verificato. */
export default function SmartboxPage() {
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
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/75">Offerte</span>
          <h1 className="mt-3 font-display text-[clamp(28px,4vw,42px)] font-normal leading-[1.15] text-cream [text-wrap:balance]">
            Hai un cofanetto Smartbox?
          </h1>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[640px] px-6 text-center sm:px-10">
          <Reveal>
            <p className="text-[15px] leading-[1.8] text-ink-soft">
              Se il tuo cofanetto Smartbox include un soggiorno ad Agriturismo La Mora, la registrazione del voucher
              avviene direttamente sul portale ufficiale Smartbox — non gestiamo noi il processo di registrazione o
              l&apos;emissione del voucher, che restano interamente affidati a loro.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto max-w-[900px] px-6 sm:px-10">
          <Reveal>
            <span className="mx-auto block text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">
              Come funziona
            </span>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {STEPS.map((step, i) => (
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
              Pronto a registrare il tuo voucher?
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
                  Registra il voucher su Smartbox
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
              <a
                href="https://wa.me/393934363917?text=Ciao!%20Ho%20un%20cofanetto%20Smartbox%2C%20come%20procedo%20per%20prenotare%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold uppercase tracking-[0.06em] text-cream/70 underline decoration-cream/30 underline-offset-4 hover:text-cream"
              >
                Scrivici su WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
