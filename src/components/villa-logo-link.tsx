"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { VILLA_LOGO_ALT, VILLA_LOGO_WHITE } from "@/data/villa";

/* Logo Villa Relax (scritte bianche) per header sticky, pannello MENU e
   footer delle pagine Villa, al posto di quello di La Mora. Porta alla
   pagina Villa, cioè a quella già aperta (è una pagina sola per lingua):
   il clic torna in cima senza ricaricarla. L'href resta per chi apre il
   link in una nuova scheda o senza JavaScript. */
export function VillaLogoLink({
  href,
  width,
  height,
  className,
  imgClassName,
  onNavigate,
}: {
  href: string;
  /* Dimensioni di visualizzazione più grandi (per il srcset 1x/2x). */
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  /* Es. chiudere il pannello MENU prima di tornare su. */
  onNavigate?: () => void;
}) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onNavigate?.();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      <Image src={VILLA_LOGO_WHITE.src} alt={VILLA_LOGO_ALT} width={width} height={height} className={imgClassName} />
    </a>
  );
}
