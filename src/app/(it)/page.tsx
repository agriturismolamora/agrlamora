import { HomeIntro } from "@/components/home-intro";
import { Hero } from "@/components/hero";
import { ImmersiveStory } from "@/components/immersive-story";
import { ApartmentsCarousel } from "@/components/apartments-carousel";
import { StructureHighlights } from "@/components/structure-highlights";
import { RankingSection } from "@/components/ranking-section";
import { OutdoorLife } from "@/components/outdoor-life";
import { SustainabilitySection } from "@/components/sustainability-section";
import { TerritorySection } from "@/components/territory-section";
import { DistancesSection } from "@/components/distances-section";
import { ReviewsSection } from "@/components/reviews-section";
import { ReviewGate } from "@/components/review-gate";
import { getWriteReviewUrl } from "@/lib/google-reviews";
import { PriceComparisonSection } from "@/components/price-comparison-section";
import { BlogSection } from "@/components/blog-section";
import { FacebookFeed } from "@/components/facebook-feed";
import { LocationMap } from "@/components/location-map";
import { LaMoraDaVivere } from "@/components/la-mora-da-vivere";
import { VillaTeaser } from "@/components/villa-teaser";
import { LastMinuteSection } from "@/components/last-minute-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { CertificationsMarquee } from "@/components/certifications-marquee";
import { PromoPopup } from "@/components/promo-popup";
import { SectionProgressDots } from "@/components/section-progress-dots";
import { SectionSnapScroll } from "@/components/section-snap-scroll";
import { getHomeMetadata } from "@/data/home-metadata";
import type { Metadata } from "next";
import { HomeFaq } from "@/components/home-faq";
import { StructuredData } from "@/components/structured-data";
import { apartmentNodes, faqPageNode } from "@/lib/structured-data";
import { HOME_FAQ } from "@/data/home-faq";

/* Canonical, hreflang, Open Graph e Twitter della home (src/data/home-metadata.ts):
   qui e non nel layout, che li farebbe ereditare a tutte le pagine. */
export const metadata: Metadata = getHomeMetadata("it");

/* Header/footer/booking bar/chatbot/back-to-top vivono in layout.tsx (globali su
   tutte le pagine). Il JSON-LD è qui (StructuredData): appartamenti e FAQ
   della home, oltre a sito e struttura presenti su ogni pagina.
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
      <StructuredData locale="it" path="/" nodes={[...apartmentNodes("it"), faqPageNode("it", "/", HOME_FAQ.it.items)]} />
      <HomeIntro />
      <Hero locale="it" />
      <ImmersiveStory locale="it" />
      <ApartmentsCarousel locale="it" />
      <StructureHighlights locale="it" />
      <PriceComparisonSection locale="it" />
      <LastMinuteSection struttura="lamora" locale="it" fallbackToOffers />
      <RankingSection locale="it" />
      <BlogSection locale="it" />
      <OutdoorLife locale="it" />
      <SustainabilitySection locale="it" />
      <TerritorySection locale="it" />
      <DistancesSection locale="it" />
      <ReviewsSection locale="it" />
      <ReviewGate writeReviewUrl={getWriteReviewUrl()} locale="it" />
      <LaMoraDaVivere locale="it" />
      <VillaTeaser locale="it" />
      <LocationMap locale="it" />
      <HomeFaq locale="it" />
      <FacebookFeed locale="it" />
      <NewsletterSection locale="it" />
      <CertificationsMarquee locale="it" />
      <PromoPopup locale="it" />
      <SectionProgressDots locale="it" />
      <SectionSnapScroll />
    </>
  );
}
