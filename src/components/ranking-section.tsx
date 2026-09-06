import { getGoogleReviews } from "@/lib/google-reviews";
import { RankingHero } from "@/components/ranking-hero";
import type { Locale } from "@/lib/i18n";

type Quote = { name: string; text: string };

/* Estratto breve di ogni recensione Google reale (mai testo inventato) per
   la striscia a scorrimento continuo sotto il badge — stesso sfondo
   chiaro di RankingHero, nessuna cucitura visiva tra le due. Stesso
   meccanismo .animate-marquee già in produzione su
   BenefitMarquee/CertificationsMarquee, qui applicato a citazioni vere
   invece che a loghi. Taglio SEMPRE al bordo parola più vicino ai 100
   caratteri (mai per frase: un punto dopo un'abbreviazione tipo "S." per
   "Santa Maria" tagliava a metà nome proprio, sembrando un refuso invece
   che una citazione vera). Se le recensioni non sono configurate (nessuna
   API key), niente striscia: mai un fallback con frasi finte. */
function excerptQuote(text: string): string {
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= 100) return clean;
  const cut = clean.slice(0, 100);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

function ReviewMarquee({ quotes }: { quotes: Quote[] }) {
  const loop = [...quotes, ...quotes];
  return (
    <div className="overflow-hidden border-t border-ink/10 bg-cream-dim py-7">
      <div className="flex w-max animate-marquee items-center">
        {loop.map((q, i) => (
          <div key={i} className="flex shrink-0 items-center gap-3 px-8">
            <span className="font-display text-[17px] italic leading-none text-ink">&ldquo;{q.text}&rdquo;</span>
            <span className="text-[10px] uppercase tracking-[0.1em] text-raspberry">— {q.name}</span>
            <span aria-hidden="true" className="ml-5 h-1 w-1 rounded-full bg-ink/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export async function RankingSection({ locale }: { locale: Locale }) {
  const data = await getGoogleReviews();
  const quotes: Quote[] = data.reviews
    .filter((r) => r.text && r.text.trim().length > 0)
    .slice(0, 5)
    .map((r) => ({ name: r.authorName.split(" ")[0], text: excerptQuote(r.text) }));

  return (
    <>
      <RankingHero locale={locale} />
      {/* Le citazioni sono recensioni Google reali, sempre nella lingua in
          cui sono state scritte: non tradotte, per non alterare mai un
          testo scritto davvero da un ospite. */}
      {quotes.length > 0 && <ReviewMarquee quotes={quotes} />}
    </>
  );
}
