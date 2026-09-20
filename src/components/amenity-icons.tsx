/* Icone line-art minimali per la griglia "Caratteristiche e servizi" delle
   pagine appartamento: stesso linguaggio (stroke 1.5, monocromatico
   currentColor) delle icone già presenti in apartments-carousel.tsx. Una
   sola icona per dotazione reale, niente emoji, niente set generico. */
import type { SVGProps } from "react";

function Base(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true" {...props} />;
}

export function TvIcon() {
  return (
    <Base>
      <rect x="3" y="4.5" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 20h6M12 16.5V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Base>
  );
}

export function KitchenIcon() {
  return (
    <Base>
      <circle cx="8" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Base>
  );
}

export function AcIcon() {
  return (
    <Base>
      <path
        d="M12 3v18M12 3l-3 2.5M12 3l3 2.5M4.5 8.25l15 7.5M4.5 8.25l3.6.4M4.5 8.25l1.6-3.3M19.5 15.75l-15-7.5M19.5 15.75l-3.6-.4M19.5 15.75l-1.6 3.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Base>
  );
}

export function SafeIcon() {
  return (
    <Base>
      <rect x="4" y="4" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 12v-1.8M16.5 7.5v2M16.5 16.5v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Base>
  );
}

export function WifiIcon() {
  return (
    <Base>
      <path d="M4 9.5c4.5-4 11.5-4 16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 13c3-2.5 7-2.5 10 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.2 16.5c1.1-.9 2.5-.9 3.6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="19.3" r="1" fill="currentColor" />
    </Base>
  );
}

export function LinensIcon() {
  return (
    <Base>
      <path d="M4 8.5h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 8.5 12 4l8 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </Base>
  );
}

export function MirrorIcon() {
  return (
    <Base>
      <rect x="6" y="3.5" width="12" height="17" rx="6" stroke="currentColor" strokeWidth="1.5" />
    </Base>
  );
}

export function GardenIcon() {
  return (
    <Base>
      <path
        d="M12 20c0-6.5 5-8.5 8-9-1 4.5-3 8-8 9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 20c0-7-5-9.5-8-10 1 5 3 9 8 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 20v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Base>
  );
}

export function PawIcon() {
  return (
    <Base>
      <circle cx="7" cy="9" r="1.6" fill="currentColor" />
      <circle cx="12" cy="6.5" r="1.6" fill="currentColor" />
      <circle cx="17" cy="9" r="1.6" fill="currentColor" />
      <path
        d="M12 12c-3 0-5.5 2-5.5 4.3 0 1.7 1.5 2.7 3 2.2.9-.3 1.7-.3 2.5 0 1.5.5 3-.5 3-2.2C15.5 14 13 12 12 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </Base>
  );
}

export function GazeboIcon() {
  return (
    <Base>
      <path d="M4 10 12 4l8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 10h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 10v9M12 10v9M18 10v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Base>
  );
}

export function FloorIcon() {
  return (
    <Base>
      <path d="M4 20V9.5L12 4l8 5.5V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 14.5h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Base>
  );
}

/* Guinzaglio: anello del collare + linea curva fino all'impugnatura, stesso
   linguaggio lineare delle altre icone (nessun cane disegnato, per non
   confondersi con PawIcon). */
export function LeashIcon() {
  return (
    <Base>
      <circle cx="6.5" cy="17.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.3 16.2c2-3 5-6.5 6.7-8.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16.5" cy="6" r="2.3" stroke="currentColor" strokeWidth="1.5" />
    </Base>
  );
}

export const AMENITY_ICON_BY_LABEL: Record<string, () => React.JSX.Element> = {
  // Italiano
  "TV con canali satellitari": TvIcon,
  "Cucina attrezzata": KitchenIcon,
  "Aria condizionata": AcIcon,
  Cassaforte: SafeIcon,
  "Wi-Fi gratuito": WifiIcon,
  "Biancheria da letto e da bagno": LinensIcon,
  "Specchi e porta valigie": MirrorIcon,
  "Giardino privato recintato": GardenIcon,
  "Giardino privato": GardenIcon,
  "Pet friendly (25€/soggiorno)": PawIcon,
  "Animali piccola taglia, previo accordo (25€)": PawIcon,
  "Gazebo esterno": GazeboIcon,
  "Gazebo privato": GazeboIcon,
  "Piano terra": FloorIcon,
  "Primo piano": FloorIcon,
  "Guinzaglio obbligatorio negli spazi comuni": LeashIcon,
  // English
  "Satellite TV": TvIcon,
  "Equipped kitchen": KitchenIcon,
  "Air conditioning": AcIcon,
  Safe: SafeIcon,
  "Free Wi-Fi": WifiIcon,
  "Bed and bath linen": LinensIcon,
  "Mirrors and luggage rack": MirrorIcon,
  "Fenced private garden": GardenIcon,
  "Private garden": GardenIcon,
  "Pet friendly (€25/stay)": PawIcon,
  "Small pets, subject to agreement (€25)": PawIcon,
  "Outdoor gazebo": GazeboIcon,
  "Private gazebo": GazeboIcon,
  "Ground floor": FloorIcon,
  "First floor": FloorIcon,
  "Leash required in common areas": LeashIcon,
  // Français
  "TV satellite": TvIcon,
  "Cuisine équipée": KitchenIcon,
  Climatisation: AcIcon,
  "Coffre-fort": SafeIcon,
  "Wi-Fi gratuit": WifiIcon,
  "Linge de lit et de bain": LinensIcon,
  "Miroirs et porte-bagages": MirrorIcon,
  "Jardin privé clôturé": GardenIcon,
  "Jardin privé": GardenIcon,
  "Animaux acceptés (25€/séjour)": PawIcon,
  "Petits animaux, sous accord préalable (25€)": PawIcon,
  "Gazebo extérieur": GazeboIcon,
  "Gazebo privé": GazeboIcon,
  "Rez-de-chaussée": FloorIcon,
  "Premier étage": FloorIcon,
  "Laisse obligatoire dans les espaces communs": LeashIcon,
  // Deutsch
  "Sat-TV": TvIcon,
  "Ausgestattete Küche": KitchenIcon,
  Klimaanlage: AcIcon,
  "Kostenloses WLAN": WifiIcon,
  "Bett- und Badwäsche": LinensIcon,
  "Spiegel und Gepäckablage": MirrorIcon,
  "Eingezäunter privater Garten": GardenIcon,
  "Privater Garten": GardenIcon,
  "Haustierfreundlich (25€/Aufenthalt)": PawIcon,
  "Kleine Haustiere nach Absprache (25€)": PawIcon,
  "Pavillon im Freien": GazeboIcon,
  "Privater Pavillon": GazeboIcon,
  Erdgeschoss: FloorIcon,
  "Erster Stock": FloorIcon,
  "Leinenpflicht in Gemeinschaftsbereichen": LeashIcon,
};
