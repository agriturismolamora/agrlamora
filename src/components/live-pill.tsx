/* Pill con il puntino che pulsa piano (.live-dot in globals.css), fermo con
   prefers-reduced-motion. Usata per "In corso" (pagina Offerte in corso) e
   "Novità" (card del ristorante convenzionato su /alloggi/). */
export function LivePill({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 self-start rounded-full bg-cream px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-raspberry ring-1 ring-raspberry/25 ${className}`}>
      <span aria-hidden="true" className="live-dot h-1.5 w-1.5 bg-raspberry" />
      {label}
    </span>
  );
}
