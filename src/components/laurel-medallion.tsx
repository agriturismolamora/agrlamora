/* Medaglia a corona d'alloro, disegno originale (mai un logo/badge di
   terzi): sostituisce l'immagine del "certificato" che usava il marchio
   Tripadvisor — un problema di brand mai realmente accettato dal
   progetto (vedi note precedenti). Le foglie sono generate via loop
   trigonometrico invece che disegnate a mano, per una corona simmetrica
   e pulita a qualunque dimensione. Il numero al centro resta l'unico
   contenuto testuale reale (font-display, come il resto del sito). */
export function LaurelMedallion({ size = 200, className = "" }: { size?: number; className?: string }) {
  const r = 100;
  const cx = 110;
  const cy = 100;
  const leaves = [];
  const count = 8;
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const leafSize = 9 + t * 6;
    // ramo sinistro
    leaves.push(
      <ellipse
        key={`l-${i}`}
        cx={cx - r * 0.82 + t * r * 0.42}
        cy={cy + r * 0.62 - t * r * 0.78}
        rx={leafSize}
        ry={leafSize * 0.4}
        fill="currentColor"
        opacity={0.5 + t * 0.4}
        transform={`rotate(${-40 - t * 55} ${cx - r * 0.82 + t * r * 0.42} ${cy + r * 0.62 - t * r * 0.78})`}
      />
    );
    // ramo destro (specchiato)
    leaves.push(
      <ellipse
        key={`r-${i}`}
        cx={cx + r * 0.82 - t * r * 0.42}
        cy={cy + r * 0.62 - t * r * 0.78}
        rx={leafSize}
        ry={leafSize * 0.4}
        fill="currentColor"
        opacity={0.5 + t * 0.4}
        transform={`rotate(${40 + t * 55} ${cx + r * 0.82 - t * r * 0.42} ${cy + r * 0.62 - t * r * 0.78})`}
      />
    );
  }

  return (
    <svg viewBox="0 0 220 210" width={size} height={size * (210 / 220)} className={className} aria-hidden="true">
      {leaves}
      <circle cx={cx} cy={cy - 8} r={62} fill="none" stroke="currentColor" strokeWidth={1.4} opacity={0.55} />
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontSize={54}
        fontWeight={500}
        fill="currentColor"
      >
        N.1
      </text>
    </svg>
  );
}
