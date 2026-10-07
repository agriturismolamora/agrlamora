import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { t } from "@/lib/dictionary";

const WHATSAPP_URL = "https://wa.me/393934363917";

const TEXT: Record<Locale, { eyebrow: string; title: string; body: string; home: string; apartments: string; linksHeading: string; ask: string }> = {
  it: {
    eyebrow: "Errore 404",
    title: "Questa pagina non c'è",
    body: "Il link potrebbe essere vecchio: il sito è stato rinnovato e alcune pagine hanno cambiato indirizzo. Appartamenti, territorio e offerte sono tutti qui.",
    home: "Torna alla home",
    apartments: "Vedi gli appartamenti",
    linksHeading: "Forse cercavi",
    ask: "Per qualsiasi domanda:",
  },
  en: {
    eyebrow: "Error 404",
    title: "This page doesn't exist",
    body: "The link may be out of date: the site has been redesigned and some pages have moved. The apartments, the area and the offers are all here.",
    home: "Back to the home page",
    apartments: "See the apartments",
    linksHeading: "You may be looking for",
    ask: "Any questions?",
  },
  fr: {
    eyebrow: "Erreur 404",
    title: "Cette page n'existe pas",
    body: "Le lien est peut-être ancien : le site a été renouvelé et certaines pages ont changé d'adresse. Les appartements, la région et les offres sont tous ici.",
    home: "Retour à l'accueil",
    apartments: "Voir les appartements",
    linksHeading: "Vous cherchiez peut-être",
    ask: "Une question ?",
  },
  de: {
    eyebrow: "Fehler 404",
    title: "Diese Seite gibt es nicht",
    body: "Der Link ist vielleicht veraltet: Die Website wurde erneuert und einige Seiten haben eine neue Adresse. Ferienwohnungen, Umgebung und Angebote finden Sie alle hier.",
    home: "Zur Startseite",
    apartments: "Ferienwohnungen ansehen",
    linksHeading: "Vielleicht suchen Sie",
    ask: "Fragen?",
  },
};

/* Pagina 404 nelle 4 lingue, dentro il layout della lingua: header, footer
   e credito come ogni altra pagina. La mostrano i not-found.tsx dei root
   layout, sia per notFound() (slug inesistenti di alloggi e blog) sia per
   gli URL che non corrispondono a nessuna pagina ([...rest]/page.tsx).
   Link <a> e non <Link>: la 404 può cadere anche sotto /villa-relax-assisi/
   e attraversare il confine La Mora / Villa richiede una navigazione piena
   (vedi site-footer.tsx). Fascia scura in cima: l'header trasparente resta
   leggibile come sulle pagine con foto. */
export function NotFoundView({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  const links = [
    { label: t("nav", "laMora", locale), href: withLocale(locale, "/chi-siamo/") },
    { label: t("nav", "territorio", locale), href: withLocale(locale, "/territorio/") },
    { label: t("nav", "offerte", locale), href: withLocale(locale, "/offerte/") },
    { label: t("nav", "villaRelax", locale), href: withLocale(locale, "/villa-relax-assisi/") },
    { label: t("nav", "blog", locale), href: withLocale(locale, "/blog/") },
    { label: t("nav", "contatti", locale), href: withLocale(locale, "/#section-map") },
  ];

  return (
    <>
      <section className="bg-olive-950 text-cream">
        <div className="mx-auto max-w-[900px] px-6 pb-20 pt-40 sm:px-10 sm:pb-24 sm:pt-48">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">{text.eyebrow}</p>
          <h1 className="mt-4 font-display text-[clamp(34px,5vw,54px)] font-normal leading-[1.08] [text-wrap:balance]">{text.title}</h1>
          <p className="mt-5 max-w-[580px] text-[15px] leading-[1.7] text-cream/80">{text.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={withLocale(locale, "/")}
              className="inline-flex min-h-[46px] items-center rounded-lg bg-raspberry px-7 font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-cream transition-colors hover:bg-[#8a3844]"
            >
              {text.home}
            </a>
            <a
              href={withLocale(locale, "/alloggi/")}
              className="inline-flex min-h-[46px] items-center rounded-lg border border-cream/40 px-7 font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-cream transition-colors hover:border-cream"
            >
              {text.apartments}
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="not-found-links-heading" className="bg-cream">
        <div className="mx-auto max-w-[900px] px-6 py-16 sm:px-10 sm:py-20">
          <h2 id="not-found-links-heading" className="font-display text-[clamp(24px,3vw,30px)] font-normal text-ink">
            {text.linksHeading}
          </h2>
          <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
            {links.map((link) => (
              <li key={link.href} className="border-b border-ink/10">
                <a href={link.href} className="flex items-center justify-between py-4 font-display text-[20px] text-ink transition-colors hover:text-raspberry">
                  {link.label}
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[14px] leading-[1.7] text-ink-soft">
            {text.ask}{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-raspberry underline underline-offset-4">
              WhatsApp 393 4363917
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
