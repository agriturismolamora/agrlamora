"use client";

import type { ReactNode } from "react";
import { PROMOS, getPromoStatus, type PromoId } from "@/data/promo";
import { useNow } from "@/hooks/use-now";
import type { Locale } from "@/lib/i18n";

/* Testo che esiste solo per una promo a tempo (righe di "In breve" e del
   box "Dormi a La Mora" nell'articolo, card di /offerte/): finché la promo
   non è conclusa mostra il testo dato, dopo la scadenza "Offerta conclusa"
   (o `ended`, se passato). Prima del mount è il testo originale, come
   nell'HTML statico (vedi src/hooks/use-now.ts). */
export function PromoLine({ promoId, locale, ended, children }: { promoId: PromoId; locale: Locale; ended?: ReactNode; children?: ReactNode }) {
  const now = useNow();
  const promo = PROMOS[promoId];
  if (now !== null && getPromoStatus(promo, now) === "expired") return <>{ended ?? promo.text[locale].ended}</>;
  return <>{children}</>;
}
