import { RankingHero } from "@/components/ranking-hero";
import type { Locale } from "@/lib/i18n";

/* La striscia di citazioni Google a scorrimento automatico (ReviewMarquee)
   che viveva qui sotto RankingHero è stata rimossa su richiesta esplicita
   del titolare: "eliminare completamente il carosello delle recensioni"
   subito sotto "Riconoscimenti". RankingHero chiude già con il proprio
   padding (py-24/28), quindi la sezione successiva (BlogSection) segue
   senza vuoti né cuciture anomale. */
export async function RankingSection({ locale }: { locale: Locale }) {
  return <RankingHero locale={locale} />;
}
