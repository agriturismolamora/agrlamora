import ny from "@/components/newyear-theme.module.css";

/* Decorazioni del tema "newyear" (vedi newyear-theme.module.css): solo
   SVG/CSS inline, nessuna immagine o dipendenza. Tutte aria-hidden.
   Posizioni FISSE (niente Math.random al render): stesso HTML sul server
   e sul client. */

const STARS = [
  { x: 4, y: 12, s: 2, d: 5.2, delay: -1.1 },
  { x: 9, y: 34, s: 1.5, d: 6.8, delay: -4.2 },
  { x: 14, y: 8, s: 1.5, d: 4.6, delay: -2.5 },
  { x: 19, y: 22, s: 2.5, d: 7.4, delay: -0.4 },
  { x: 26, y: 5, s: 1.5, d: 5.9, delay: -3.3 },
  { x: 31, y: 28, s: 2, d: 6.3, delay: -5.1 },
  { x: 37, y: 14, s: 1.5, d: 4.9, delay: -1.8 },
  { x: 43, y: 3, s: 2, d: 7.1, delay: -2.9 },
  { x: 48, y: 24, s: 1.5, d: 5.5, delay: -4.7 },
  { x: 54, y: 10, s: 2.5, d: 6.6, delay: -0.9 },
  { x: 60, y: 31, s: 1.5, d: 5.1, delay: -3.8 },
  { x: 66, y: 6, s: 2, d: 7.8, delay: -2.2 },
  { x: 71, y: 19, s: 1.5, d: 4.8, delay: -5.6 },
  { x: 77, y: 9, s: 2, d: 6.1, delay: -1.4 },
  { x: 82, y: 27, s: 1.5, d: 5.7, delay: -3.1 },
  { x: 88, y: 4, s: 2.5, d: 6.9, delay: -0.2 },
  { x: 93, y: 17, s: 1.5, d: 5.3, delay: -4.4 },
  { x: 97, y: 33, s: 2, d: 7.2, delay: -2.7 },
  { x: 22, y: 44, s: 1.5, d: 6.4, delay: -1.6 },
  { x: 58, y: 47, s: 1.5, d: 5.8, delay: -3.5 },
  { x: 85, y: 42, s: 2, d: 6.7, delay: -0.7 },
];

/* Cielo stellato. `twinkle`: le stelle brillano piano con il keyframe
   condiviso star-twinkle (globals.css, lo stesso del carousel
   Appartamenti); senza, o con prefers-reduced-motion, restano ferme. */
export function StarField({ className, twinkle = false }: { className: string; twinkle?: boolean }) {
  return (
    <div aria-hidden="true" className={className}>
      {STARS.map((star) => (
        <span
          key={`${star.x}-${star.y}`}
          className={ny.star}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.s,
            height: star.s,
            opacity: twinkle ? undefined : 0.75,
            animation: twinkle ? `star-twinkle ${star.d}s ease-in-out ${star.delay}s infinite` : undefined,
          }}
        />
      ))}
    </div>
  );
}

/* Fuochi statici (solo con "Pausa animazioni", al posto del canvas):
   raggi e scintille in oro e champagne nella parte alta della sezione. */
const BURSTS = [
  { cx: 230, cy: 120, r: 78, color: "#e3c278" },
  { cx: 610, cy: 78, r: 96, color: "#f1dfb4" },
  { cx: 980, cy: 136, r: 70, color: "#f4a9b8" },
];

function rays(cx: number, cy: number, r: number) {
  return Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    const round = (n: number) => Math.round(n * 10) / 10;
    return {
      x1: round(cx + Math.cos(a) * r * 0.3),
      y1: round(cy + Math.sin(a) * r * 0.3),
      x2: round(cx + Math.cos(a) * r),
      y2: round(cy + Math.sin(a) * r),
    };
  });
}

export function StaticFireworks() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMin meet" className={ny.staticBursts}>
      {BURSTS.map((b) => (
        <g key={b.cx} stroke={b.color} fill={b.color} strokeLinecap="round" opacity="0.85">
          {rays(b.cx, b.cy, b.r).map((ray, i) => (
            <g key={i}>
              <line x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2} strokeWidth="2" />
              <circle cx={ray.x2} cy={ray.y2} r="2.6" stroke="none" />
            </g>
          ))}
          <circle cx={b.cx} cy={b.cy} r="4" stroke="none" />
        </g>
      ))}
    </svg>
  );
}

/* Orizzonte di colline tra il cielo e il corpo dell'articolo, come il
   gocciolamento del tema cioccolato: altezza fissa, preserveAspectRatio
   none per adattarsi a ogni larghezza, colore currentColor. */
export function NightHorizon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 1440 72" preserveAspectRatio="none" className={ny.horizon}>
      <path
        fill="currentColor"
        d="M0 0h1440v30c-60 10-118 26-190 26-86 0-122-30-214-30-96 0-142 38-246 38-98 0-138-32-232-32-88 0-128 22-206 22-74 0-112-26-192-26-70 0-112 16-160 24z"
      />
    </svg>
  );
}
