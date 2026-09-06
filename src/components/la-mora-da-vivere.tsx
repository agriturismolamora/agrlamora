"use client";

import { useEffect, useState, type ComponentType } from "react";
import { Reveal } from "@/components/scroll-reveal";
import type { Locale } from "@/lib/i18n";

/* Sezione interattiva "un highlight alla volta": icone monocromatiche
   lineari (stesso linguaggio delle altre icone del progetto), nessun dot
   locale — l'indicatore globale della homepage (section-progress-dots.tsx)
   si occupa della navigazione tra macro-sezioni. Selezione solo via click
   (niente auto-avanzamento/blocco scroll con la rotella: l'utente sceglie
   liberamente quale icona guardare). Solo fatti reali già verificati
   altrove nel progetto. */
function LandscapeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 18l5.5-7 4 4.5L16 11l5 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M3 9c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 14.5c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CupIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M5 8h11v5a5.5 5.5 0 0 1-5.5 5.5A5.5 5.5 0 0 1 5 13V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 9.5h1.5a2 2 0 0 1 0 4H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 20.5h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FamilyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="9" cy="7" r="2.3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 18c0-2.8 2.2-4.6 5-4.6s5 1.8 5 4.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17.5" cy="9.5" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M14 18c0-2 1.6-3.4 3.5-3.4s3.5 1.4 3.5 3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PawIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="12" cy="15.5" r="3.4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6.5" cy="10" r="1.7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="10" r="1.7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BikeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="5.5" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18.5" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 17 9 9h4l3.5 8M9 9 7.5 6h-2M9 9l3 5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M13 3 5 13.5h5.5L11 21l8-11h-5.5L13 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function HomeKeyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M4 11 12 4l8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v9.5h12V10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="10.5" cy="15" r="1.4" stroke="currentColor" strokeWidth="1.3" />
      <path d="M11.8 15h2.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d="M12 19.5S4 14.8 4 9.3A4 4 0 0 1 12 7a4 4 0 0 1 8 2.3c0 5.5-8 10.2-8 10.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

type Highlight = { Icon: ComponentType; label: string; title: string; description: string };

const ICONS = [LandscapeIcon, WaveIcon, CupIcon, FamilyIcon, PawIcon, BikeIcon, BoltIcon, HomeKeyIcon, HeartIcon];

function getHighlights(locale: Locale): Highlight[] {
  const data: Record<Locale, { label: string; title: string; description: string }[]> = {
    it: [
      { label: "Territorio", title: "Vista su Assisi", description: "La campagna intorno, la Basilica di San Francesco a pochi minuti di auto." },
      { label: "Piscina", title: "Piscina panoramica", description: "Aperta nella bella stagione, immersa nel verde della campagna umbra." },
      { label: "Colazione", title: "Colazione biologica", description: "Biologica ogni mattina, con dolci tipici umbri e prodotti del territorio." },
      { label: "Famiglie", title: "Pensato per le famiglie", description: "Parco giochi, spazi aperti e appartamenti adatti a chi viaggia con bambini." },
      { label: "Pet friendly", title: "Pet friendly", description: "Giardini privati recintati per Gemelli e Sagittario, doccia esterna per i cani." },
      { label: "E-bike", title: "Noleggio e-bike", description: "Per scoprire il territorio in sella, anche in salita, direttamente dalla struttura." },
      { label: "Ricarica EV", title: "Ricarica auto elettriche", description: "Colonnina da 22 kW nel parcheggio privato della struttura." },
      { label: "Appartamenti", title: "5 appartamenti indipendenti", description: "Ognuno con ingresso autonomo, cucina attrezzata e i propri spazi." },
      { label: "Gestione familiare", title: "Gestione familiare", description: "Paolo segue personalmente ogni ospite, da sempre." },
    ],
    en: [
      { label: "Area", title: "A view of Assisi", description: "The countryside all around, the Basilica of St. Francis a few minutes' drive away." },
      { label: "Pool", title: "Panoramic pool", description: "Open during the warm season, surrounded by the green Umbrian countryside." },
      { label: "Breakfast", title: "Organic breakfast", description: "Organic every morning, with fine Umbrian pastries and local produce." },
      { label: "Families", title: "Made for families", description: "Playground, open spaces and apartments suited to travelling with children." },
      { label: "Pet friendly", title: "Pet friendly", description: "Fenced private gardens for Gemelli and Sagittario, outdoor shower for dogs." },
      { label: "E-bike", title: "E-bike rental", description: "Explore the area in the saddle, even uphill, right from the property." },
      { label: "EV charging", title: "Electric car charging", description: "22 kW charging station in the property's private car park." },
      { label: "Apartments", title: "5 independent apartments", description: "Each with its own entrance, equipped kitchen and private spaces." },
      { label: "Family-run", title: "Family-run", description: "Paolo personally looks after every guest, as he always has." },
    ],
    fr: [
      { label: "Territoire", title: "Vue sur Assise", description: "La campagne tout autour, la Basilique Saint-François à quelques minutes en voiture." },
      { label: "Piscine", title: "Piscine panoramique", description: "Ouverte pendant la belle saison, au cœur de la campagne ombrienne." },
      { label: "Petit-déjeuner", title: "Petit-déjeuner biologique", description: "Biologique chaque matin, avec des pâtisseries typiques d'Ombrie et des produits locaux." },
      { label: "Familles", title: "Pensé pour les familles", description: "Aire de jeux, espaces ouverts et appartements adaptés aux voyages avec enfants." },
      { label: "Animaux acceptés", title: "Animaux acceptés", description: "Jardins privés clôturés pour Gemelli et Sagittario, douche extérieure pour les chiens." },
      { label: "E-bike", title: "Location d'e-bikes", description: "Pour explorer le territoire en selle, même en montée, directement depuis la structure." },
      { label: "Recharge électrique", title: "Recharge de voitures électriques", description: "Borne de 22 kW dans le parking privé de la structure." },
      { label: "Appartements", title: "5 appartements indépendants", description: "Chacun avec entrée autonome, cuisine équipée et ses propres espaces." },
      { label: "Gestion familiale", title: "Gestion familiale", description: "Paolo s'occupe personnellement de chaque hôte, depuis toujours." },
    ],
    de: [
      { label: "Umgebung", title: "Blick auf Assisi", description: "Die Landschaft ringsum, die Basilika des Heiligen Franziskus wenige Autominuten entfernt." },
      { label: "Pool", title: "Panorama-Pool", description: "In der warmen Jahreszeit geöffnet, umgeben vom Grün der umbrischen Landschaft." },
      { label: "Frühstück", title: "Bio-Frühstück", description: "Jeden Morgen biologisch, mit feinem umbrischem Gebäck und lokalen Produkten." },
      { label: "Familien", title: "Für Familien gemacht", description: "Spielplatz, offene Flächen und Apartments, die für Reisen mit Kindern geeignet sind." },
      { label: "Haustierfreundlich", title: "Haustierfreundlich", description: "Eingezäunte private Gärten für Gemelli und Sagittario, Außendusche für Hunde." },
      { label: "E-Bike", title: "E-Bike-Verleih", description: "Um die Gegend im Sattel zu erkunden, auch bergauf, direkt ab der Unterkunft." },
      { label: "E-Ladestation", title: "Ladestation für Elektroautos", description: "22-kW-Ladestation auf dem privaten Parkplatz der Unterkunft." },
      { label: "Apartments", title: "5 unabhängige Apartments", description: "Jedes mit eigenem Eingang, ausgestatteter Küche und eigenen Räumen." },
      { label: "Familienbetrieb", title: "Familienbetrieb", description: "Paolo kümmert sich seit jeher persönlich um jeden Gast." },
    ],
  };
  return data[locale].map((d, i) => ({ ...d, Icon: ICONS[i] }));
}

const SECTION_TEXT: Record<Locale, { label: string; heading1: string; heading2: string; ariaSection: string; ariaTabs: string }> = {
  it: { label: "La Mora da vivere", heading1: "Il piacere è", heading2: "nei dettagli.", ariaSection: "La Mora da vivere", ariaTabs: "Highlight di Agriturismo La Mora" },
  en: { label: "Living La Mora", heading1: "The pleasure is", heading2: "in the details.", ariaSection: "Living La Mora", ariaTabs: "Highlights of Agriturismo La Mora" },
  fr: { label: "Vivre La Mora", heading1: "Le plaisir est", heading2: "dans les détails.", ariaSection: "Vivre La Mora", ariaTabs: "Points forts d'Agriturismo La Mora" },
  de: { label: "La Mora erleben", heading1: "Der Genuss liegt", heading2: "im Detail.", ariaSection: "La Mora erleben", ariaTabs: "Highlights von Agriturismo La Mora" },
};

export function LaMoraDaVivere({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const HIGHLIGHTS = getHighlights(locale);
  const sectionText = SECTION_TEXT[locale];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    function onChange() {
      setReducedMotion(mq.matches);
    }
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const current = HIGHLIGHTS[active];

  return (
    <section
      id="section-vivere"
      aria-label={sectionText.ariaSection}
      className="relative bg-olive-950 text-cream lg:min-h-[140vh]"
    >
      <div className="flex min-h-[100svh] flex-col items-center justify-center py-20 sm:py-24 lg:sticky lg:top-0">
        <Reveal className="relative z-[2] mx-auto max-w-[820px] px-6 text-center sm:px-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/55">{sectionText.label}</span>
          <h2 className="mt-6 font-display text-[clamp(30px,4.4vw,58px)] font-normal leading-[1.1] [text-wrap:balance]">
            <span className="text-cream">{sectionText.heading1}</span> <span className="italic text-cream/40">{sectionText.heading2}</span>
          </h2>
        </Reveal>

        <div
          role="tablist"
          aria-label={sectionText.ariaTabs}
          className="relative z-[2] mt-12 flex max-w-[720px] flex-wrap items-center justify-center gap-2.5 px-6 sm:mt-14 sm:gap-3"
        >
          {HIGHLIGHTS.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={item.label}
                onClick={() => setActive(i)}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border transition-all duration-300 sm:h-14 sm:w-14 ${
                  isActive
                    ? "border-gold text-gold shadow-[0_0_0_1px_rgba(182,146,60,0.4),0_0_20px_rgba(182,146,60,0.3)]"
                    : "border-cream/15 text-cream/40 hover:border-cream/35 hover:text-cream/70"
                }`}
              >
                <item.Icon />
              </button>
            );
          })}
        </div>

        <div
          key={current.label}
          role="tabpanel"
          aria-live="polite"
          className={`relative z-[2] mt-12 max-w-[560px] px-6 text-center sm:mt-14 ${reducedMotion ? "" : "animate-panel-fade"}`}
        >
          <h3 className="font-display text-[26px] font-normal uppercase leading-[1.2] text-cream sm:text-[30px]">
            {current.title}
          </h3>
          <p className="mt-3 text-[14px] leading-[1.7] text-cream/70">{current.description}</p>
        </div>
      </div>
    </section>
  );
}
