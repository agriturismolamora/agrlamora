import { HomeIntro } from "@/components/home-intro";
import { Hero } from "@/components/hero";
import { BenefitMarquee } from "@/components/benefit-marquee";
import { ImmersiveStory } from "@/components/immersive-story";
import { ApartmentsCarousel } from "@/components/apartments-carousel";
import { StructureHighlights } from "@/components/structure-highlights";
import { RankingSection } from "@/components/ranking-section";
import { OutdoorLife } from "@/components/outdoor-life";
import { TerritorySection } from "@/components/territory-section";
import { ReviewsSection } from "@/components/reviews-section";
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
   delle sezioni di QUESTA pagina. */
export default function Home() {
  return (
    <>
      <HomeIntro />
      <Hero />
      <BenefitMarquee />
      <ImmersiveStory />
      <ApartmentsCarousel />
      <StructureHighlights />
      <PriceComparisonSection />
      <RankingSection />
      <FacebookFeed />
      <BlogSection />
      <OutdoorLife />
      <TerritorySection />
      <ReviewsSection />
      <LaMoraDaVivere />
      <LocationMap />
      <NewsletterSection />
      <CertificationsMarquee />
      <PromoPopup />
      <SectionProgressDots />
      <SectionSnapScroll />
    </>
  );
}
