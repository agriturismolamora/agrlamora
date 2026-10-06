import styles from "@/components/chocolate-theme.module.css";

/* Decorazioni del tema cioccolato (vedi chocolate-theme.module.css): solo
   SVG/CSS inline, nessuna immagine o dipendenza. Tutte aria-hidden. */

/* Bordo inferiore di una sezione cacao che "cola" sulla sezione crema
   sotto. Il colore è currentColor (var(--cacao) dal CSS module); altezza
   fissa, preserveAspectRatio none per adattarsi a ogni larghezza. */
export function ChocolateDrip({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`${styles.drip} ${className}`}
    >
      <path
        fill="currentColor"
        d="M0 0h1440v18c-38 0-52 6-60 22-6 12-6 30-18 30s-14-16-16-28c-3-16-14-22-40-22-30 0-44 8-52 18-7 9-9 18-20 18-12 0-14-10-16-18-4-14-22-18-58-18-40 0-60 10-66 28-5 14-8 30-22 30-15 0-16-22-19-38-4-20-24-26-62-26-34 0-52 8-58 20-5 10-7 22-19 22s-14-12-16-22c-3-14-20-20-52-20-36 0-52 10-58 26-5 14-6 30-19 30s-15-18-17-30c-3-18-22-26-60-26s-58 8-64 22c-5 12-6 24-18 24s-14-12-16-22c-3-14-22-22-56-22-38 0-56 12-62 30-5 14-6 32-21 32-14 0-16-24-19-42-3-20-22-28-58-28-34 0-50 8-56 20-5 10-7 20-18 20s-13-10-15-18c-4-14-20-20-52-20-30 0-46 10-52 24-5 12-6 26-18 26s-14-14-16-26c-3-16-18-24-48-24-28 0-42 8-48 18-4 8-6 16-16 16S12 22 0 18z"
      />
    </svg>
  );
}

/* Posizioni/tempi FISSI (niente Math.random al render): stesso HTML sul
   server e sul client, nessun hydration mismatch. */
const PARTICLES = [
  { x: "6%", s: 9, d: 26, delay: -3, c: "#7b4a2e" },
  { x: "14%", s: 6, d: 31, delay: -17, c: "#c98a3e" },
  { x: "23%", s: 11, d: 24, delay: -9, c: "#5a3520" },
  { x: "31%", s: 7, d: 34, delay: -22, c: "#7b4a2e" },
  { x: "42%", s: 8, d: 28, delay: -5, c: "#e2b277" },
  { x: "51%", s: 12, d: 33, delay: -27, c: "#5a3520" },
  { x: "60%", s: 6, d: 25, delay: -12, c: "#c98a3e" },
  { x: "68%", s: 10, d: 30, delay: -1, c: "#7b4a2e" },
  { x: "77%", s: 7, d: 27, delay: -19, c: "#e2b277" },
  { x: "85%", s: 9, d: 35, delay: -8, c: "#5a3520" },
  { x: "93%", s: 6, d: 29, delay: -25, c: "#c98a3e" },
];

export function CocoaParticles({ count = PARTICLES.length }: { count?: number }) {
  return (
    <div aria-hidden="true" className={styles.particles}>
      {PARTICLES.slice(0, count).map((p) => (
        <span
          key={p.x}
          className={styles.particle}
          style={
            {
              "--x": p.x,
              "--s": `${p.s}px`,
              "--d": `${p.d}s`,
              "--delay": `${p.delay}s`,
              "--c": p.c,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
