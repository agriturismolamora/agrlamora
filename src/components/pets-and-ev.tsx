import Image from "next/image";
import { Reveal } from "@/components/scroll-reveal";

/* Striscia compatta a due card affiancate: pet friendly + ricarica elettrica.
   Composizione diversa dalle sezioni vicine (non full-bleed, non split
   editoriale): una coppia simmetrica di card immagine+testo, per due fatti
   reali che meritano un momento proprio ma non un'intera sezione narrativa
   ciascuno. */
export function PetsAndEv() {
  return (
    <section aria-labelledby="pets-ev-heading" className="bg-cream py-20 sm:py-24">
      <h2 id="pets-ev-heading" className="sr-only">
        Animali ammessi e ricarica per auto elettriche
      </h2>
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 px-6 sm:px-10 md:grid-cols-2 md:gap-8">
        <Reveal>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px]">
            <Image
              src="/images/alloggi/appartamento gemelli/area cani appartamento gemelli esterno .jpg"
              alt="Giardino recintato per cani dell'appartamento Gemelli, Agriturismo La Mora"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <span className="mt-6 block text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">
            Pet friendly
          </span>
          <h3 className="mt-2 font-display text-[22px] font-normal leading-[1.25] text-ink">
            I cani restano con voi, non in un box.
          </h3>
          <p className="mt-3 text-[14px] leading-[1.7] text-ink-soft">
            Gli appartamenti Gemelli e Sagittario hanno un giardino privato recintato, pensato apposta per chi
            viaggia con un cane: spazio per correre in sicurezza, senza guinzaglio, con una doccia esterna dedicata
            per pulirlo prima di rientrare.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px]">
            <Image
              src="/images/servizi-extra/ricarica-elettrica/ricarica elettrica macchina.jpg"
              alt="Colonnina di ricarica per auto elettriche nel parcheggio di Agriturismo La Mora"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <span className="mt-6 block text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">
            Mobilità sostenibile
          </span>
          <h3 className="mt-2 font-display text-[22px] font-normal leading-[1.25] text-ink">
            Ricarica l&apos;auto elettrica mentre riposi.
          </h3>
          <p className="mt-3 text-[14px] leading-[1.7] text-ink-soft">
            Il parcheggio privato dispone di una colonnina di ricarica rapida da 22 kW. Segnalacelo in fase di
            prenotazione: ci organizziamo per lasciartela libera al tuo arrivo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
