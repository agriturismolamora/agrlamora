/* Suono dei fuochi del tema "newyear", sintetizzato con Web Audio: nessun
   file audio, nessuna libreria, nessuna licenza. Sibilo = rumore filtrato
   passa-banda che sale; "boom" = sinusoide grave che scende + rumore
   passa-basso; crepitio = schiocchi brevissimi di rumore passa-alto.

   Regole (CLAUDE.md, articolo Capodanno):
   - l'AudioContext nasce e si sblocca SOLO dentro un gesto dell'utente
     (unlockAudio(), chiamata in modo sincrono dal gestore del click/tasto):
     mai autoplay all'ingresso;
   - volume basso: guadagno finale 0,25, dopo un compressore che tiene i
     picchi sotto 1 anche con più scoppi insieme;
   - nessun loop; nessun suono con la scheda nascosta (il contesto viene
     sospeso);
   - Web Audio assente o bloccato: tutto fallisce in silenzio.
   Nessuno storage: lo stato on/off vive in memoria (fireworks.tsx). */

type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext };

const MASTER_GAIN = 0.25;

let ctx: AudioContext | null = null;
let bus: AudioNode | null = null;
let noise: AudioBuffer | null = null;

function onVisibility() {
  if (!ctx) return;
  if (document.visibilityState === "hidden") ctx.suspend().catch(() => {});
}

/* Da chiamare in modo sincrono dentro un gestore di click/tasto: crea (la
   prima volta) e riattiva il contesto audio. Su iOS un buffer muto
   riprodotto nel gesto sblocca l'uscita. false se Web Audio non c'è. */
export function unlockAudio(): boolean {
  try {
    const AudioContextClass = window.AudioContext ?? (window as WebkitWindow).webkitAudioContext;
    if (!AudioContextClass) return false;
    if (!ctx) {
      ctx = new AudioContextClass();
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -14;
      compressor.knee.value = 6;
      compressor.ratio.value = 12;
      compressor.attack.value = 0.003;
      compressor.release.value = 0.25;
      const master = ctx.createGain();
      master.gain.value = MASTER_GAIN;
      compressor.connect(master);
      master.connect(ctx.destination);
      bus = compressor;
      const length = Math.floor(ctx.sampleRate * 2);
      noise = ctx.createBuffer(1, length, ctx.sampleRate);
      const data = noise.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
      document.addEventListener("visibilitychange", onVisibility);
    }
    if (ctx.state !== "running") ctx.resume().catch(() => {});
    const silent = ctx.createBufferSource();
    silent.buffer = ctx.createBuffer(1, 1, 22050);
    silent.connect(ctx.destination);
    silent.start(0);
    return true;
  } catch {
    return false;
  }
}

/* Ferma subito ogni suono in corso (pausa, suono spento, pagina lasciata). */
export function silenceAudio() {
  ctx?.suspend().catch(() => {});
}

function ready(): AudioContext | null {
  if (!ctx || !bus || !noise || ctx.state !== "running" || document.visibilityState !== "visible") return null;
  return ctx;
}

/* Uscita con panoramica stereo (dove c'è StereoPanner: Safari 14.1+). */
function output(audio: AudioContext, x: number): AudioNode {
  if (typeof audio.createStereoPanner !== "function") return bus!;
  const panner = audio.createStereoPanner();
  panner.pan.value = Math.max(-0.8, Math.min(0.8, (x - 0.5) * 1.4));
  panner.connect(bus!);
  return panner;
}

function noiseSource(audio: AudioContext): AudioBufferSourceNode {
  const source = audio.createBufferSource();
  source.buffer = noise;
  return source;
}

/* Sibilo della salita: dura quanto il volo del razzo. */
export function playLaunch(x: number, flightMs: number, soft = false) {
  try {
    const audio = ready();
    if (!audio) return;
    const t = audio.currentTime;
    const duration = Math.max(0.25, Math.min(1.2, flightMs / 1000));
    const source = noiseSource(audio);
    const filter = audio.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 12;
    filter.frequency.setValueAtTime(900, t);
    filter.frequency.exponentialRampToValueAtTime(2600, t + duration);
    const gain = audio.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(soft ? 0.12 : 0.22, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    source.connect(filter).connect(gain).connect(output(audio, x));
    source.start(t, Math.random() * 1.5, duration + 0.05);
  } catch {
    /* in silenzio */
  }
}

/* Scoppio: boom grave e, subito dopo, il crepitio. */
export function playExplosion(x: number, soft = false) {
  try {
    const audio = ready();
    if (!audio) return;
    const t = audio.currentTime;
    const out = output(audio, x);
    const level = soft ? 0.55 : 1;

    const osc = audio.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.5);
    const boom = audio.createGain();
    boom.gain.setValueAtTime(0.0001, t);
    boom.gain.exponentialRampToValueAtTime(0.9 * level, t + 0.008);
    boom.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
    osc.connect(boom).connect(out);
    osc.start(t);
    osc.stop(t + 1.15);

    const rumble = noiseSource(audio);
    const lowpass = audio.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 600;
    const rumbleGain = audio.createGain();
    rumbleGain.gain.setValueAtTime(0.5 * level, t);
    rumbleGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
    rumble.connect(lowpass).connect(rumbleGain).connect(out);
    rumble.start(t, Math.random() * 1.2, 0.75);

    const crackles = soft ? 8 : 22;
    for (let i = 0; i < crackles; i++) {
      const at = t + 0.08 + Math.random() * 0.9;
      const length = 0.02 + Math.random() * 0.02;
      const pop = noiseSource(audio);
      const highpass = audio.createBiquadFilter();
      highpass.type = "highpass";
      highpass.frequency.value = 2500;
      const popGain = audio.createGain();
      popGain.gain.setValueAtTime(0.0001, at);
      popGain.gain.exponentialRampToValueAtTime((0.08 + Math.random() * 0.14) * level, at + 0.002);
      popGain.gain.exponentialRampToValueAtTime(0.0001, at + length);
      pop.connect(highpass).connect(popGain).connect(out);
      pop.start(at, Math.random() * 1.9, length + 0.01);
    }
  } catch {
    /* in silenzio */
  }
}
