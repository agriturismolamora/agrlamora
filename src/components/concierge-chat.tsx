"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useApartmentsSectionActive } from "@/hooks/use-apartments-active";

const HOST_NAME = "Paolo";
const HOST_PHOTO = "/images/villa/paologestoreagriturismolamora.webp";

const PHONE_DISPLAY = "075 8041164";
const WHATSAPP_URL = "https://wa.me/393934363917";
const EMAIL = "agriturismolamora@gmail.com";

type Cta = { label: string; href?: string; action?: "open-booking" };
type ChatMessage = { role: "user" | "bot"; text: string; cta?: Cta };

const GREETING =
  "Ciao! Sono il concierge digitale di Agriturismo La Mora. Rispondo solo a domande sulla struttura: appartamenti, piscina, colazione, animali, ricarica elettrica, territorio e prenotazioni. Come posso aiutarti?";

const QUICK_REPLIES = ["Gli appartamenti", "La piscina", "Animali ammessi", "Come prenoto?"];

/* Motore a regole, non un vero LLM: dimostrativo per la presentazione,
   ma con SOLO fatti reali già verificati nel progetto (stessi dati usati
   in homepage). "Strutturarlo bene" con un modello reale è lavoro futuro,
   esplicitamente rimandato dal cliente. */
const RULES: { keywords: string[]; reply: string; cta?: Cta }[] = [
  {
    keywords: ["appartament", "camera", "stanz", "alloggi", "gemelli", "bilancia", "pesci", "acquario", "sagittario"],
    reply:
      "Abbiamo 5 appartamenti indipendenti: Gemelli, Bilancia, Pesci, Acquario e Sagittario. Gemelli e Sagittario hanno giardino privato recintato e sono pet friendly.",
    cta: { label: "Vedi tutti gli appartamenti", href: "/alloggi/" },
  },
  {
    keywords: ["piscina", "nuoto"],
    reply:
      "La piscina panoramica è di 6×12 metri, aperta dal 1° maggio al 28 settembre dalle 9:00 alle 19:00, con area giochi e campo da calcetto in erba naturale.",
    cta: { label: "Scopri la piscina", href: "/piscina/" },
  },
  {
    keywords: ["colazione", "breakfast"],
    reply:
      "La colazione biologica è servita ogni mattina dalle 8:00 alle 9:30: dolci tipici umbri di alta pasticceria, frutta di stagione, dolce incluso in alcune tariffe e salato su richiesta.",
    cta: { label: "Scopri la colazione bio", href: "/agriturismo-con-colazione-inclusa-assisi/" },
  },
  {
    keywords: ["cane", "cani", "gatt", "animal", "pet"],
    reply:
      "Sì, siamo pet friendly: gli appartamenti Gemelli e Sagittario hanno giardino recintato (25€/soggiorno). Negli altri appartamenti sono ammessi solo animali di piccola taglia abituati a vivere in appartamento.",
  },
  {
    keywords: ["elettric", "ricaric", "kw", "colonnina"],
    reply: "Il parcheggio privato ha una colonnina di ricarica rapida da 22 kW: basta segnalarlo in fase di prenotazione.",
  },
  {
    keywords: ["ebike", "e-bike", "bici", "cavall", "equitazione", "attività", "esperienz"],
    reply:
      "Puoi noleggiare e-bike per esplorare il territorio, fare lezioni di equitazione, e c'è un parco giochi per i più piccoli.",
    cta: { label: "Scopri le esperienze", href: "/agriturismo-famiglie-ad-assisi-e-dintorni/" },
  },
  {
    keywords: ["assisi", "distanza", " km", "dove siamo", "posizione", "territorio", "perugia", "spello", "aeroporto"],
    reply: "Siamo a 5 km da Assisi, 2 km dalla stazione ferroviaria e circa 7 km dall'aeroporto di Perugia Sant'Egidio.",
    cta: { label: "Apri in Google Maps", href: "https://www.google.com/maps/search/?api=1&query=Agriturismo+La+Mora+Via+Fonte+Citerna+7+Assisi" },
  },
  {
    keywords: ["sconto", "diretta", "caparra"],
    reply:
      "Prenotando direttamente hai il 10% di sconto per soggiorni da 7 notti, e un altro 10% se sei già stato nostro ospite. Si versa il 25% come caparra, il saldo si paga all'arrivo.",
    cta: { label: "Vai alla prenotazione", action: "open-booking" },
  },
  {
    keywords: ["prezzo", "costo", "tariffa", "quanto"],
    reply:
      "Il prezzo dipende dalle date e dall'appartamento scelto: la disponibilità e le tariffe reali le trovi nel box di prenotazione qui sotto.",
    cta: { label: "Vai alla prenotazione", action: "open-booking" },
  },
  {
    keywords: ["prenot", "disponibil", "camere libere", "date"],
    reply: "Posso aprirti subito il box di prenotazione, così controlli le date disponibili.",
    cta: { label: "Vai alla prenotazione", action: "open-booking" },
  },
  {
    keywords: ["contatt", "telefono", "email", "mail", "whatsapp", "chiama", "numero"],
    reply: `Puoi raggiungerci al ${PHONE_DISPLAY}, su WhatsApp oppure via email a ${EMAIL}.`,
    cta: { label: "Scrivici su WhatsApp", href: WHATSAPP_URL },
  },
];

const FALLBACK: ChatMessage = {
  role: "bot",
  text: "Posso rispondere solo a domande su Agriturismo La Mora (appartamenti, piscina, colazione, animali, territorio, prenotazioni dirette). Per tutto il resto, scrivici direttamente.",
  cta: { label: "Scrivici su WhatsApp", href: WHATSAPP_URL },
};

function matchRule(text: string) {
  const lower = text.toLowerCase();
  return RULES.find((r) => r.keywords.some((k) => lower.includes(k)));
}

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path d="M4 12h15.5M13 5.5 20 12l-7 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Widget concierge fisso in basso a destra. bottom-24 su mobile per non
   sovrapporsi al CTA "Verifica disponibilità" della booking bar (centrato
   ma largo su schermi stretti); bottom-6 da sm in su, dove la booking bar
   compatta lascia ampio margine sul lato destro. Stessa logica di
   dissolvenza vicino al footer già usata dalla booking bar. */
export function ConciergeChat() {
  const [open, setOpen] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const inApartments = useApartmentsSectionActive();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), {
      rootMargin: "0px 0px -15% 0px",
    });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open || greeted) return;
    function showGreeting() {
      setMessages([{ role: "bot", text: GREETING }]);
      setGreeted(true);
    }
    showGreeting();
  }, [open, greeted]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function pushUserMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    window.setTimeout(() => {
      const rule = matchRule(trimmed);
      setMessages((m) => [...m, rule ? { role: "bot", text: rule.reply, cta: rule.cta } : FALLBACK]);
    }, 400);
  }

  function handleCtaClick(cta: Cta) {
    if (cta.action === "open-booking") {
      window.dispatchEvent(new Event("la-mora:open-booking"));
      setOpen(false);
    }
  }

  return (
    <div
      className="fixed bottom-24 right-5 z-[75] transition-opacity duration-300 sm:bottom-6 sm:right-6"
      style={nearFooter ? { opacity: 0, pointerEvents: "none" } : undefined}
    >
      {open && (
        <div
          role="complementary"
          aria-label="Concierge virtuale Agriturismo La Mora"
          className="absolute bottom-[68px] right-0 flex h-[min(480px,70dvh)] w-[min(92vw,360px)] flex-col overflow-hidden rounded-[6px] bg-cream shadow-[0_30px_70px_-20px_rgba(28,33,23,0.5)]"
        >
          <div className="flex items-center justify-between bg-olive-950 px-5 py-4 text-cream">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#7cb87c]" aria-hidden="true" />
              <span className="font-display text-[17px]">Concierge La Mora</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Chiudi il concierge"
              className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-cream/10"
            >
              <CloseIcon />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-[10px] px-3.5 py-2.5 text-[13px] leading-[1.55] ${
                    m.role === "user" ? "bg-raspberry text-cream" : "bg-cream-dim text-ink"
                  }`}
                >
                  <p>{m.text}</p>
                  {m.cta && (
                    <button
                      type="button"
                      onClick={() => {
                        if (m.cta!.action) {
                          handleCtaClick(m.cta!);
                        } else if (m.cta!.href) {
                          window.open(m.cta!.href, m.cta!.href.startsWith("http") ? "_blank" : "_self", "noopener,noreferrer");
                        }
                      }}
                      className={`mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] underline underline-offset-4 ${
                        m.role === "user" ? "text-cream" : "text-raspberry"
                      }`}
                    >
                      {m.cta.label} →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-ink/10 px-4 py-2.5">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => pushUserMessage(q)}
                className="rounded-full border border-ink/15 px-2.5 py-1 text-[10.5px] font-medium text-ink-soft transition-colors hover:border-raspberry hover:text-raspberry"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              pushUserMessage(input);
            }}
            className="flex items-center gap-2 border-t border-ink/10 px-3 py-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Scrivi una domanda..."
              aria-label="Scrivi un messaggio al concierge"
              className="min-w-0 flex-1 rounded-[3px] border border-ink/15 bg-white px-3 py-2 text-[13px] text-ink outline-none placeholder:text-ink-soft/60 focus:border-raspberry"
            />
            <button
              type="submit"
              aria-label="Invia"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[3px] bg-raspberry text-cream transition-colors hover:bg-[#8a3844]"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}

      {/* Foto dell'host sopra il pulsante: richiesta esplicita del titolare
          per far capire subito che dietro il concierge virtuale risponde
          davvero lui, non un bot anonimo — pallino verde "online" a
          rinforzare la fiducia. Nascosta a pannello aperto, dove occuperebbe
          lo stesso spazio del pannello chat. */}
      {!open && (
        <div className="mb-2.5 flex justify-end">
          <div
            className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-cream shadow-[0_10px_24px_-10px_rgba(28,33,23,0.6)]"
            title={`${HOST_NAME}, host di Agriturismo La Mora — online ora`}
          >
            <Image src={HOST_PHOTO} alt={`${HOST_NAME}, host di Agriturismo La Mora`} fill sizes="48px" className="object-cover" />
            <span
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-cream bg-[#4caf50]"
            />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Chiudi il concierge virtuale" : `Apri il concierge virtuale — rispondiamo noi, in prima persona`}
        className={`flex h-14 w-14 items-center justify-center rounded-full text-cream shadow-[0_18px_36px_-16px_rgba(28,33,23,0.6)] transition-colors duration-500 ${
          inApartments && !open ? "bg-[#141a30] hover:bg-[#1c2440]" : "bg-raspberry hover:bg-[#8a3844]"
        }`}
      >
        {open ? <CloseIcon /> : <ChatBubbleIcon />}
      </button>
    </div>
  );
}
