import Image from "next/image";

/* Su richiesta esplicita: nessun testo sovrapposto (né le frasi a reveal
   progressivo né la label) — resta solo la fotografia di Assisi. Sezione
   d'impatto puramente visivo, non più a scroll-jack: altezza fissa, nessun
   pin, nessuna dipendenza da scroll/parole. id="section-story" mantenuto
   perché referenziato dai dot di navigazione laterali (section-progress-dots.tsx). */
export function ImmersiveStory() {
  return (
    <section id="section-story" className="relative h-[78vh] min-h-[480px] w-full overflow-hidden sm:h-[86vh]">
      <Image
        src="/images/territorio/assisi/assisi con tramonto.jpg"
        alt="Assisi al tramonto, vista dalla campagna umbra intorno ad Agriturismo La Mora"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(8,17,13,.08) 0%, rgba(8,17,13,.28) 100%)" }}
      />
    </section>
  );
}
