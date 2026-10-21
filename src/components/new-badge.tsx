"use client";

import { LivePill } from "@/components/live-pill";
import { useNow } from "@/hooks/use-now";

/* Pillola "Novità" che si spegne da sola dopo `until` (data ISO con fuso).
   Calcolo nel browser dopo il mount (useNow): sul server e durante
   l'hydration è visibile. Va messa in posizione assoluta: comparire o
   sparire non sposta nulla. */
export function NewBadge({ until, label, className = "" }: { until: string; label: string; className?: string }) {
  const now = useNow();
  if (now !== null && now > Date.parse(until)) return null;
  return <LivePill label={label} className={className} />;
}
