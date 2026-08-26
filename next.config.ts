import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  agentRules: false, // CLAUDE.md è il file di regole del progetto, non va toccato da Next.js
  devIndicators: false, // il badge "N" è overlay di sviluppo di Next, non sparisce in produzione da solo
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
