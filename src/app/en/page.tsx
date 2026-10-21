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
export const metadata: Metadata = getHomeMetadata("en");

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
      <StructuredData locale="en" path="/" nodes={[...apartmentNodes("en"), faqPageNode("en", "/", HOME_FAQ.en.items)]} />
      <HomeIntro />
      <Hero locale="en" />
      {/* Ogni sezione sotto la piega in un <Suspense>: stesso HTML, ma React
          la idrata a parte, cedendo il thread tra una sezione e l'altra
          invece di un unico blocco lungo (meno TBT su mobile). */}
      <Suspense><ImmersiveStory locale="en" /></Suspense>
      <Suspense><ApartmentsCarousel locale="en" /></Suspense>
      <Suspense><StructureHighlights locale="en" /></Suspense>
      <Suspense><PriceComparisonSection locale="en" /></Suspense>
      <Suspense><LastMinuteSection struttura="lamora" locale="en" fallbackToOffers /></Suspense>
      <Suspense><RankingSection locale="en" /></Suspense>
      <Suspense><BlogSection locale="en" /></Suspense>
      <Suspense><OutdoorLife locale="en" /></Suspense>
      <Suspense><SustainabilitySection locale="en" /></Suspense>
      <Suspense><TerritorySection locale="en" /></Suspense>
      <Suspense><DistancesSection locale="en" /></Suspense>
      <Suspense><ReviewsSection locale="en" /></Suspense>
      <Suspense><ReviewGate writeReviewUrl={getWriteReviewUrl()} locale="en" /></Suspense>
      <Suspense><LaMoraDaVivere locale="en" /></Suspense>
      <Suspense><VillaTeaser locale="en" /></Suspense>
      <Suspense><LocationMap locale="en" /></Suspense>
      <Suspense><HomeFaq locale="en" /></Suspense>
      <Suspense><FacebookFeed locale="en" /></Suspense>
      <Suspense><NewsletterSection locale="en" /></Suspense>
      <Suspense><CertificationsMarquee locale="en" /></Suspense>
      <PromoPopup locale="en" />
      <SectionProgressDots locale="en" />
      <SectionSnapScroll />
    </>
  );
}
