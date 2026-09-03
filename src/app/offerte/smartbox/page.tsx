import type { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";

export const metadata: Metadata = {
  title: "Smartbox",
  description: "Hai un cofanetto Smartbox valido per Agriturismo La Mora? Ecco come registrarlo e prenotare il tuo soggiorno.",
  alternates: { canonical: "/offerte/smartbox/" },
};

const SMARTBOX_URL = "https://myaccount.smartbox.com/it/voucher/register/";

/* Pagina volutamente semplice: l'unico dato verificato in progetto sul
   rapporto con Smartbox è il link di registrazione voucher, gestito
   interamente da loro (PROJECT-BRIEF.md sezione 4/6) — nessuna
   integrazione lato nostro. Non si inventano box specifici, sconti o
   condizioni non confermate. */
export default function SmartboxPage() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-[640px] px-6 text-center sm:px-10">
        <Reveal>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Offerte</span>
          <h1 className="mx-auto mt-5 max-w-[480px] font-display text-[clamp(30px,4.4vw,44px)] font-normal leading-[1.15] text-ink [text-wrap:balance]">
            Hai un cofanetto Smartbox?
          </h1>
          <p className="mx-auto mt-6 max-w-[480px] text-[15px] leading-[1.8] text-ink-soft">
            Se il tuo cofanetto Smartbox include un soggiorno ad Agriturismo La Mora, la registrazione del voucher
            avviene direttamente sul portale ufficiale Smartbox — non gestiamo noi il processo di registrazione o
            l&apos;emissione del voucher.
          </p>
          <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-[1.8] text-ink-soft">
            Una volta registrato, scrivici per verificare la disponibilità e concordare le date del soggiorno.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
              className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-soft underline decoration-ink-soft/30 underline-offset-4 hover:text-raspberry"
            >
              Scrivici su WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
