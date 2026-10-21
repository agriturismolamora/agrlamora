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
import { Suspense } from "react";
import { HomeFaq } from "@/components/home-faq";
import { StructuredData } from "@/components/structured-data";
import { apartmentNodes, faqPageNode } from "@/lib/structured-data";
import { HOME_FAQ } from "@/data/home-faq";

/* Canonical, hreflang, Open Graph e Twitter della home (src/data/home-metadata.ts):
   qui e non nel layout, che li farebbe ereditare a tutte le pagine. */
export const metadata: Metadata = getHomeMetadata("de");

/* Header/footer/booking bar/chatbot/back-to-top vivono in layout.tsx (globali su
   tutte le pagine). Il JSON-LD è qui (StructuredData): appartamenti e FAQ
   della home, oltre a sito e struttura presenti su ogni pagina.
   Restano qui solo gli elementi esclusivi della home: il sipario d'apertura
   (HomeIntro), il popup promozionale, e i due controlli di navigazione
   scroll-driven (dots laterali, snap a sezioni) che dipendono dagli id
   delle sezioni di QUESTA pagina.

   BenefitMarquee (striscia di testo che scorreva con sconti/servizi) è
   stata rimossa su richiesta esplicita: i due sconti diretti (7+ notti,
   clienti di ritorno) stanno nel confronto prezzi qui sotto e nella pagina
   Offerte. Il PromoPopup compare solo mentre c'è una promo a tempo attiva
   (src/data/promo.ts). */
export default function Home() {
  return (
    <>
      <StructuredData locale="de" path="/" nodes={[...apartmentNodes("de"), faqPageNode("de", "/", HOME_FAQ.de.items)]} />
      <HomeIntro />
      <Hero locale="de" />
      {/* Ogni sezione sotto la piega in un <Suspense>: stesso HTML, ma React
          la idrata a parte, cedendo il thread tra una sezione e l'altra
          invece di un unico blocco lungo (meno TBT su mobile). */}
      <Suspense><ImmersiveStory locale="de" /></Suspense>
      <Suspense><ApartmentsCarousel locale="de" /></Suspense>
      <Suspense><StructureHighlights locale="de" /></Suspense>
      <Suspense><PriceComparisonSection locale="de" /></Suspense>
      <Suspense><LastMinuteSection struttura="lamora" locale="de" fallbackToOffers /></Suspense>
      <Suspense><RankingSection locale="de" /></Suspense>
      <Suspense><BlogSection locale="de" /></Suspense>
      <Suspense><OutdoorLife locale="de" /></Suspense>
      <Suspense><SustainabilitySection locale="de" /></Suspense>
      <Suspense><TerritorySection locale="de" /></Suspense>
      <Suspense><DistancesSection locale="de" /></Suspense>
      <Suspense><ReviewsSection locale="de" /></Suspense>
      <Suspense><ReviewGate writeReviewUrl={getWriteReviewUrl()} locale="de" /></Suspense>
      <Suspense><LaMoraDaVivere locale="de" /></Suspense>
      <Suspense><VillaTeaser locale="de" /></Suspense>
      <Suspense><LocationMap locale="de" /></Suspense>
      <Suspense><HomeFaq locale="de" /></Suspense>
      <Suspense><FacebookFeed locale="de" /></Suspense>
      <Suspense><NewsletterSection locale="de" /></Suspense>
      <Suspense><CertificationsMarquee locale="de" /></Suspense>
      <PromoPopup locale="de" />
      <SectionProgressDots locale="de" />
      <SectionSnapScroll />
    </>
  );
}
