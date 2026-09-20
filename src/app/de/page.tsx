import { HomeIntro } from "@/components/home-intro";
import { Hero } from "@/components/hero";
import { ImmersiveStory } from "@/components/immersive-story";
import { ApartmentsCarousel } from "@/components/apartments-carousel";
import { StructureHighlights } from "@/components/structure-highlights";
import { RankingSection } from "@/components/ranking-section";
import { OutdoorLife } from "@/components/outdoor-life";
import { SustainabilitySection } from "@/components/sustainability-section";
import { TerritorySection } from "@/components/territory-section";
import { ReviewsSection } from "@/components/reviews-section";
import { ReviewGate } from "@/components/review-gate";
import { getWriteReviewUrl } from "@/lib/google-reviews";
import { PriceComparisonSection } from "@/components/price-comparison-section";
import { BlogSection } from "@/components/blog-section";
import { FacebookFeed } from "@/components/facebook-feed";
import { LocationMap } from "@/components/location-map";
import { LaMoraDaVivere } from "@/components/la-mora-da-vivere";
import { VillaTeaser } from "@/components/villa-teaser";
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
      <Hero locale="de" />
      <ImmersiveStory locale="de" />
      <ApartmentsCarousel locale="de" />
      <StructureHighlights locale="de" />
      <PriceComparisonSection locale="de" />
      <RankingSection locale="de" />
      <BlogSection locale="de" />
      <OutdoorLife locale="de" />
      <SustainabilitySection locale="de" />
      <TerritorySection locale="de" />
      <ReviewsSection locale="de" />
      <ReviewGate writeReviewUrl={getWriteReviewUrl()} locale="de" />
      <LaMoraDaVivere locale="de" />
      <VillaTeaser locale="de" />
      <LocationMap locale="de" />
      <FacebookFeed locale="de" />
      <NewsletterSection locale="de" />
      <CertificationsMarquee locale="de" />
      <PromoPopup locale="de" />
      <SectionProgressDots />
      <SectionSnapScroll />
    </>
  );
}
