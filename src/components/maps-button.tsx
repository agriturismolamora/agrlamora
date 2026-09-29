import type { Locale } from "@/lib/i18n";
import type { PlaceInfo } from "@/data/places";

const LABEL: Record<Locale, string> = {
  it: "Apri su Google Maps",
  en: "Open in Google Maps",
  fr: "Ouvrir dans Google Maps",
  de: "In Google Maps öffnen",
};

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
      <path
        d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/* Pulsante "Apri su Google Maps" per un luogo di data/places.ts: link
   esterno con l'URL esatto fornito dal titolare (place_id), mai costruito
   da una ricerca testuale. `tone` segue lo sfondo della sezione. */
export function MapsButton({
  place,
  locale,
  tone = "light",
  showName = false,
  className = "",
}: {
  place: PlaceInfo;
  locale: Locale;
  tone?: "light" | "dark";
  showName?: boolean;
  className?: string;
}) {
  const colors =
    tone === "dark"
      ? "border-cream/25 text-cream hover:border-cream"
      : "border-ink/15 text-ink hover:border-raspberry hover:text-raspberry";
  const label = showName ? `${place.name[locale]} · Maps` : LABEL[locale];
  return (
    <a
      href={place.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${LABEL[locale]}: ${place.name[locale]}`}
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] transition-colors duration-200 ${colors} ${className}`}
    >
      <PinIcon />
      {label}
    </a>
  );
}
