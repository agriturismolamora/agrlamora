"use client";

import { useEffect, useState } from "react";
import { CONSENT_TEXT } from "@/data/consent-text";
import { getAllServicesByCategory, type ConsentCategory } from "@/data/privacy-services";
import type { ConsentCategories } from "@/lib/consent";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import Link from "next/link";

const CATEGORY_ORDER: ConsentCategory[] = ["necessary", "functional", "analytics", "marketing"];

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      aria-hidden="true"
      style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 200ms ease" }}
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Toggle({ checked, onChange, disabled, label }: { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-200 ${
        checked ? "border-raspberry bg-raspberry" : "border-ink/25 bg-ink/10"
      } ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-[3px] h-[16px] w-[16px] rounded-full bg-cream shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-[22px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}

export function CookiePreferencesModal({
  locale,
  open,
  onClose,
  initialCategories,
  onSave,
  onAcceptAll,
  onRejectAll,
  showGpcNotice,
}: {
  locale: Locale;
  open: boolean;
  onClose: () => void;
  initialCategories: ConsentCategories;
  onSave: (categories: ConsentCategories) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  showGpcNotice: boolean;
}) {
  const text = CONSENT_TEXT[locale];
  // Inizializzato una sola volta dal valore corrente: il chiamante monta
  // una nuova istanza (via key) ad ogni apertura, così il draft riparte
  // sempre allineato al consenso attuale senza sincronizzarlo via effetto.
  const [draft, setDraft] = useState<ConsentCategories>(initialCategories);
  const [expanded, setExpanded] = useState<ConsentCategory | null>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center overflow-y-auto p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-prefs-heading"
    >
      <div onClick={onClose} aria-hidden="true" className="absolute inset-0 bg-ink/60" />
      <div className="relative my-auto flex w-full max-w-[640px] flex-col overflow-hidden rounded-[8px] bg-cream shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 sm:px-8">
          <h2 id="cookie-prefs-heading" className="font-display text-[22px] font-normal text-ink">
            {text.modal.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={text.modal.close}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-6 sm:px-8">
          <p className="text-[13px] leading-[1.7] text-ink-soft">{text.modal.intro}</p>

          {showGpcNotice && (
            <p className="mt-4 rounded-[4px] border-l-2 border-gold bg-cream-dim px-4 py-3 text-[12px] leading-[1.6] text-ink">
              {text.modal.gpcNotice}
            </p>
          )}

          <div className="mt-6 flex flex-col divide-y divide-ink/10 border-t border-ink/10">
            {CATEGORY_ORDER.map((cat) => {
              const catText = text.categories[cat];
              const services = getAllServicesByCategory(cat);
              const isNecessary = cat === "necessary";
              const isExpanded = expanded === cat;
              return (
                <div key={cat} className="py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-sans text-[13px] font-semibold uppercase tracking-[0.04em] text-ink">{catText.label}</h3>
                      <p className="mt-1.5 max-w-[420px] text-[13px] leading-[1.6] text-ink-soft">{catText.description}</p>
                    </div>
                    {isNecessary ? (
                      <span className="shrink-0 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-soft">
                        {text.modal.alwaysActive}
                      </span>
                    ) : (
                      <Toggle
                        checked={draft[cat]}
                        onChange={(v) => setDraft((d) => ({ ...d, [cat]: v }))}
                        label={catText.label}
                      />
                    )}
                  </div>

                  {services.length > 0 && (
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => setExpanded(isExpanded ? null : cat)}
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-raspberry"
                      >
                        {text.modal.detailsToggle}
                        <ChevronIcon open={isExpanded} />
                      </button>
                      {isExpanded && (
                        <ul className="mt-3 space-y-3">
                          {services.map((s) => (
                            <li key={s.id} className="rounded-[4px] bg-cream-dim px-4 py-3">
                              <p className="text-[12px] font-semibold text-ink">
                                {s.name}
                                {!s.active && (
                                  <span className="ml-2 rounded-full bg-ink/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-soft">
                                    {locale === "it" ? "non attivo" : locale === "fr" ? "inactif" : locale === "de" ? "inaktiv" : "inactive"}
                                  </span>
                                )}
                              </p>
                              <p className="mt-1 text-[11px] text-ink-soft">
                                {text.modal.provider}: {s.provider}
                              </p>
                              <p className="mt-0.5 text-[11px] text-ink-soft">
                                {text.modal.purpose}: {s.purpose[locale]}
                              </p>
                              {s.storage.length > 0 && (
                                <p className="mt-0.5 text-[11px] text-ink-soft">
                                  {text.modal.duration}: {s.storage.map((st) => `${st.name} (${st.duration})`).join(", ")}
                                </p>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                  {services.length === 0 && !isNecessary && (
                    <p className="mt-2 text-[11px] italic text-ink-soft/70">{text.modal.noServicesToday}</p>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-[12px] text-ink-soft">
            <Link href={withLocale(locale, "/privacy/")} className="underline underline-offset-2 hover:text-raspberry">
              {text.banner.privacyLink}
            </Link>
            {" · "}
            <Link href={withLocale(locale, "/cookie-policy/")} className="underline underline-offset-2 hover:text-raspberry">
              {text.banner.cookieLink}
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-2.5 border-t border-ink/10 px-6 py-5 sm:flex-row sm:px-8">
          <button
            type="button"
            onClick={onRejectAll}
            className="flex-1 rounded-[4px] border border-ink/20 px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-ink transition-colors hover:border-ink/40"
          >
            {text.modal.rejectAll}
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="flex-1 rounded-[4px] border border-ink/20 px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-ink transition-colors hover:border-ink/40"
          >
            {text.modal.acceptAll}
          </button>
          <button
            type="button"
            onClick={() => onSave(draft)}
            className="flex-1 rounded-[4px] bg-raspberry px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors hover:bg-[#8a3844]"
          >
            {text.modal.savePreferences}
          </button>
        </div>
      </div>
    </div>
  );
}
