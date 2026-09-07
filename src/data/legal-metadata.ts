import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

/* Metadata delle pagine legali isolata in un modulo SENZA "use client":
   privacy-policy-page-view.tsx e cookie-policy-page-view.tsx sono
   componenti client (usano il pulsante "Preferenze cookie"), quindi
   qualunque funzione esportata da quei file diventerebbe anch'essa
   "client-only" e non richiamabile da generateMetadata/export const
   metadata nei wrapper di pagina (che girano lato server). */

const PRIVACY_TEXT: Record<Locale, { title: string; description: string }> = {
  it: { title: "Privacy Policy", description: "Informativa sulla privacy di Agriturismo La Mora: titolare del trattamento, dati raccolti, finalità, basi giuridiche, conservazione e diritti dell'interessato." },
  en: { title: "Privacy Policy", description: "Agriturismo La Mora's privacy notice: data controller, data collected, purposes, legal bases, retention, and your rights." },
  fr: { title: "Politique de Confidentialité", description: "Politique de confidentialité d'Agriturismo La Mora : responsable du traitement, données collectées, finalités, bases juridiques, conservation et vos droits." },
  de: { title: "Datenschutzerklärung", description: "Datenschutzerklärung von Agriturismo La Mora: Verantwortlicher, erhobene Daten, Zwecke, Rechtsgrundlagen, Speicherdauer und Ihre Rechte." },
};

export function getPrivacyPolicyMetadata(locale: Locale) {
  const m = PRIVACY_TEXT[locale];
  return { title: m.title, description: m.description, alternates: { canonical: withLocale(locale, "/privacy/") } };
}

const COOKIE_POLICY_TEXT: Record<Locale, { title: string; description: string }> = {
  it: { title: "Cookie Policy", description: "Cookie Policy di Agriturismo La Mora: quali cookie e tecnologie simili usiamo, perché, chi li fornisce e come gestire le tue preferenze." },
  en: { title: "Cookie Policy", description: "Cookie Policy of Agriturismo La Mora: which cookies and similar technologies we use, why, who provides them, and how to manage your preferences." },
  fr: { title: "Politique de Cookies", description: "Politique de cookies d'Agriturismo La Mora : quels cookies et technologies similaires nous utilisons, pourquoi, qui les fournit et comment gérer vos préférences." },
  de: { title: "Cookie-Richtlinie", description: "Cookie-Richtlinie von Agriturismo La Mora: welche Cookies und ähnliche Technologien wir verwenden, warum, wer sie bereitstellt und wie Sie Ihre Einstellungen verwalten." },
};

export function getCookiePolicyMetadata(locale: Locale) {
  const m = COOKIE_POLICY_TEXT[locale];
  return { title: m.title, description: m.description, alternates: { canonical: withLocale(locale, "/cookie-policy/") } };
}

const TERMS_TEXT: Record<Locale, { title: string; description: string }> = {
  it: { title: "Termini e Condizioni", description: "Termini e condizioni d'uso del sito di Agriturismo La Mora: utilizzo del sito, prenotazioni, cancellazioni, responsabilità e legge applicabile." },
  en: { title: "Terms and Conditions", description: "Terms and conditions of use of the Agriturismo La Mora website: site usage, bookings, cancellations, liability, and applicable law." },
  fr: { title: "Conditions Générales", description: "Conditions générales d'utilisation du site d'Agriturismo La Mora : utilisation du site, réservations, annulations, responsabilité et droit applicable." },
  de: { title: "Allgemeine Geschäftsbedingungen", description: "Nutzungsbedingungen der Website von Agriturismo La Mora: Nutzung der Website, Buchungen, Stornierungen, Haftung und anwendbares Recht." },
};

export function getTermsMetadata(locale: Locale) {
  const m = TERMS_TEXT[locale];
  return { title: m.title, description: m.description, alternates: { canonical: withLocale(locale, "/termini-e-condizioni/") } };
}
