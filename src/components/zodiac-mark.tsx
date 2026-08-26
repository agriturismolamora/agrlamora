import type { ReactNode } from "react";

/* Simboli zodiacali disegnati come line-art originali (non emoji Unicode,
   non glifi astrologici standard copiati): stroke sottile e monocromatico,
   pensati per restare leggibili a 24–34px senza sembrare kitsch. */
export type ZodiacKey = "pesci" | "acquario" | "sagittario" | "gemelli" | "bilancia";

const PATHS: Record<ZodiacKey, ReactNode> = {
  pesci: (
    <>
      <path d="M11 7c-5 3-5 15 0 18" />
      <path d="M21 7c5 3 5 15 0 18" />
      <path d="M5 16h22" />
    </>
  ),
  acquario: (
    <>
      <path d="M4 12c2.5-2.5 5-2.5 7.5 0s5 2.5 7.5 0 5-2.5 7.5 0" />
      <path d="M4 20c2.5-2.5 5-2.5 7.5 0s5 2.5 7.5 0 5-2.5 7.5 0" />
    </>
  ),
  sagittario: (
    <>
      <path d="M6 26 25 7" />
      <path d="M16 7h9v9" />
      <path d="M11 19l5-5" />
    </>
  ),
  gemelli: (
    <>
      <path d="M6 7h20" />
      <path d="M6 25h20" />
      <path d="M11 7v18" />
      <path d="M21 7v18" />
    </>
  ),
  bilancia: (
    <>
      <path d="M6 10h20" />
      <path d="M4 20c2.5-6 21.5-6 24 0" />
      <path d="M8 26h16" />
    </>
  ),
};

const LABELS: Record<ZodiacKey, string> = {
  pesci: "Simbolo Pesci",
  acquario: "Simbolo Acquario",
  sagittario: "Simbolo Sagittario",
  gemelli: "Simbolo Gemelli",
  bilancia: "Simbolo Bilancia",
};

export function ZodiacMark({ sign, className }: { sign: ZodiacKey; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label={LABELS[sign]}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[sign]}
    </svg>
  );
}
