import { HomeIntro } from "@/components/home-intro";
import { Hero } from "@/components/hero";
import { ImmersiveStory } from "@/components/immersive-story";
import { ApartmentsCarousel } from "@/components/apartments-carousel";
import { StructureHighlights } from "@/components/structure-highlights";
import { RankingSection } from "@/components/ranking-section";
import { OutdoorLife } from "@/components/outdoor-life";
import { EvChargingSection } from "@/components/ev-charging-section";
import { TerritorySection } from "@/components/territory-section";
import { ReviewsSection } from "@/components/reviews-section";
import { ReviewGate } from "@/components/review-gate";
import { getWriteReviewUrl } from "@/lib/google-reviews";
import { PriceComparisonSection } from "@/components/price-comparison-section";
import { BlogSection } from "@/components/blog-section";
import { FacebookFeed } from "@/components/facebook-feed";
import { LocationMap } from "@/components/location-map";
import { LaMoraDaVivere } from "@/components/la-mora-da-vivere";
import { NewsletterSection } from "@/components/newsletter-section";
import { CertificationsMarquee } from "@/components/certifications-marquee";
import { PromoPopup } from "@/components/promo-popup";
import { SectionProgressDots } from "@/components/section-progress-dots";
import { SectionSnapScroll } from "@/components/section-snap-scroll";

/* Header/footer/booking bar/chatbot/back-to-top e il JSON-LD LodgingBusiness
   vivono ora in layout.tsx (globali su tutte le pagine, non solo qui).
   Restano qui solo gli elementi esclusivi della home: il sipario d'apertura
   (HomeIntro), il popup promozionale, e i due controlli di navigazione
   scroll-driven (dots laterali, snap a sezioni) che dipendono dagli id
   delle sezioni di QUESTA pagina.

   BenefitMarquee (striscia di testo che scorreva con sconti/servizi) è
   stata rimossa su richiesta esplicita: i due sconti diretti (7+ notti,
   clienti di ritorno) vivono ora nel PromoPopup, mostrato appena si apre
   il sito, invece che in una striscia sempre in scorrimento. */
export default function Home() {
  return (
    <>
      <HomeIntro />
      <Hero locale="en" />
      <ImmersiveStory />
      <ApartmentsCarousel locale="en" />
      <StructureHighlights locale="en" />
      <PriceComparisonSection locale="en" />
      <RankingSection locale="en" />
      <BlogSection locale="en" />
      <OutdoorLife locale="en" />
      <EvChargingSection locale="en" />
      <TerritorySection locale="en" />
      <ReviewsSection locale="en" />
      <ReviewGate writeReviewUrl={getWriteReviewUrl()} locale="en" />
      <LaMoraDaVivere locale="en" />
      <LocationMap locale="en" />
      <FacebookFeed locale="en" />
      <NewsletterSection locale="en" />
      <CertificationsMarquee locale="en" />
      <PromoPopup locale="en" />
      <SectionProgressDots />
      <SectionSnapScroll />
    </>
  );
}
