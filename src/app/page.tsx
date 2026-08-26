import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { BookingBar } from "@/components/booking-bar";
import { BenefitMarquee } from "@/components/benefit-marquee";
import { ImmersiveStory } from "@/components/immersive-story";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <BenefitMarquee />
        <ImmersiveStory />
        {/* Blocchi 4-9 in arrivo nei prossimi incrementi. Padding di sicurezza
            perché la booking bar fixed non copra il contenuto finale. */}
        <div className="h-[40vh] bg-cream pb-28" />
      </main>
      {/* Widget di prenotazione persistente: fixed, indipendente dal flusso
          della pagina, resta visibile dalla hero fino in fondo. */}
      <BookingBar />
    </>
  );
}
