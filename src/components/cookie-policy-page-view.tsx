"use client";

import { Reveal } from "@/components/scroll-reveal";
import { LegalPageLayout } from "@/components/legal-page-layout";
import { PRIVACY_SERVICES, OUTBOUND_LINKS, type ConsentCategory } from "@/data/privacy-services";
import { CONSENT_TEXT } from "@/data/consent-text";
import { openCookiePreferences } from "@/lib/consent";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const PAGE_TITLE: Record<Locale, string> = {
  it: "Cookie Policy",
  en: "Cookie Policy",
  fr: "Politique de Cookies",
  de: "Cookie-Richtlinie",
};

const CATEGORY_ORDER: ConsentCategory[] = ["necessary", "functional", "analytics", "marketing"];

const TABLE_HEAD: Record<Locale, { name: string; provider: string; purpose: string; type: string; duration: string }> = {
  it: { name: "Nome", provider: "Fornitore", purpose: "Finalità", type: "Tipo", duration: "Durata" },
  en: { name: "Name", provider: "Provider", purpose: "Purpose", type: "Type", duration: "Duration" },
  fr: { name: "Nom", provider: "Fournisseur", purpose: "Finalité", type: "Type", duration: "Durée" },
  de: { name: "Name", provider: "Anbieter", purpose: "Zweck", type: "Typ", duration: "Dauer" },
};

const OUTBOUND_HEAD: Record<Locale, string> = {
  it: "Link verso siti di terze parti",
  en: "Links to third-party sites",
  fr: "Liens vers des sites tiers",
  de: "Links zu Websites Dritter",
};

const OUTBOUND_INTRO: Record<Locale, string> = {
  it: "Il sito contiene collegamenti che, se cliccati, ti portano fuori da questo sito verso il sito di un altro fornitore. Non è un contenuto incorporato: nessun dato viene inviato a queste piattaforme finché non scegli tu di cliccare.",
  en: "The site contains links that, if clicked, take you away from this site to another provider’s site. These are not embedded content: no data is sent to these platforms until you choose to click.",
  fr: "Le site contient des liens qui, si vous cliquez dessus, vous font quitter ce site pour celui d’un autre fournisseur. Il ne s’agit pas d’un contenu intégré : aucune donnée n’est envoyée à ces plateformes tant que vous ne cliquez pas.",
  de: "Die Website enthält Links, die Sie beim Anklicken von dieser Website zur Website eines anderen Anbieters führen. Dies sind keine eingebetteten Inhalte: es werden keine Daten an diese Plattformen gesendet, bevor Sie klicken.",
};

const NO_ACTIVE_SERVICES: Record<Locale, string> = {
  it: "Nessun servizio attivo in questa categoria.",
  en: "No active service in this category.",
  fr: "Aucun service actif dans cette catégorie.",
  de: "Kein aktiver Dienst in dieser Kategorie.",
};

const UPDATED_LABEL: Record<Locale, string> = {
  it: "Ultimo aggiornamento: 24 settembre 2026 — versione del consenso: 3",
  en: "Last updated: 24 September 2026 — consent version: 3",
  fr: "Dernière mise à jour : 24 septembre 2026 — version du consentement : 3",
  de: "Zuletzt aktualisiert: 24. September 2026 — Consent-Version: 3",
};

const INTRO: Record<Locale, string> = {
  it: "Questa pagina spiega, in modo verificabile e senza tecnologie generiche copiate da un modello, quali cookie e tecnologie simili usa realmente questo sito, chi li fornisce, a cosa servono e per quanto tempo restano attivi. Puoi cambiare la tua scelta in qualsiasi momento dal link \"Preferenze cookie\" in fondo ad ogni pagina.",
  en: "This page explains, verifiably and without generic technologies copied from a template, which cookies and similar technologies this site actually uses, who provides them, what they’re for, and how long they stay active. You can change your choice at any time from the \"Cookie preferences\" link at the bottom of every page.",
  fr: "Cette page explique, de manière vérifiable et sans technologies génériques copiées d’un modèle, quels cookies et technologies similaires ce site utilise réellement, qui les fournit, à quoi ils servent et combien de temps ils restent actifs. Vous pouvez modifier votre choix à tout moment via le lien « Préférences cookies » en bas de chaque page.",
  de: "Diese Seite erklärt nachprüfbar und ohne generische, aus einer Vorlage kopierte Technologien, welche Cookies und ähnlichen Technologien diese Website tatsächlich verwendet, wer sie bereitstellt, wofür sie dienen und wie lange sie aktiv bleiben. Sie können Ihre Wahl jederzeit über den Link „Cookie-Einstellungen“ am Ende jeder Seite ändern.",
};

const SECTION_INTRO_BY_CAT: Record<ConsentCategory, Record<Locale, string>> = {
  necessary: {
    it: "Servizi indispensabili al funzionamento del sito o per leggere contenuti pubblici (come le recensioni Google) senza che il tuo browser debba contattare direttamente il fornitore. Non richiedono consenso.",
    en: "Services essential for the site to work, or to read public content (like Google reviews) without your browser having to contact the provider directly. They don’t require consent.",
    fr: "Services indispensables au fonctionnement du site, ou pour lire du contenu public (comme les avis Google) sans que votre navigateur ait à contacter directement le fournisseur. Ils ne nécessitent pas de consentement.",
    de: "Dienste, die für den Betrieb der Website unverzichtbar sind, oder um öffentliche Inhalte (wie Google-Bewertungen) zu lesen, ohne dass Ihr Browser den Anbieter direkt kontaktieren muss. Sie erfordern keine Zustimmung.",
  },
  functional: {
    it: "Abilitano funzionalità aggiuntive, non indispensabili al funzionamento minimo del sito. Attivati solo con il tuo consenso.",
    en: "Enable additional functionality, not essential to the site’s minimum operation. Activated only with your consent.",
    fr: "Activent des fonctionnalités supplémentaires, non indispensables au fonctionnement minimal du site. Activés uniquement avec votre consentement.",
    de: "Ermöglichen zusätzliche Funktionen, die für den minimalen Betrieb der Website nicht unverzichtbar sind. Nur mit Ihrer Zustimmung aktiviert.",
  },
  analytics: {
    it: "Servirebbero a misurare in forma aggregata come viene usato il sito.",
    en: "Would be used to measure aggregated site usage.",
    fr: "Serviraient à mesurer de manière agrégée l’utilisation du site.",
    de: "Würden dazu dienen, die aggregierte Nutzung der Website zu messen.",
  },
  marketing: {
    it: "Servirebbero a mostrare pubblicità mirata o misurare campagne su altre piattaforme.",
    en: "Would be used to show targeted advertising or measure campaigns on other platforms.",
    fr: "Serviraient à afficher de la publicité ciblée ou à mesurer des campagnes sur d’autres plateformes.",
    de: "Würden verwendet, um zielgerichtete Werbung anzuzeigen oder Kampagnen auf anderen Plattformen zu messen.",
  },
};

export function CookiePolicyPageView({ locale }: { locale: Locale }) {
  const consentText = CONSENT_TEXT[locale];
  const head = TABLE_HEAD[locale];

  const sections = CATEGORY_ORDER.map((cat) => {
    const services = PRIVACY_SERVICES.filter((s) => s.category === cat);
    const catText = consentText.categories[cat];
    return {
      heading: catText.label,
      body: (
        <>
          <p>{SECTION_INTRO_BY_CAT[cat][locale]}</p>
          {services.length === 0 ? (
            <p className="italic text-ink-soft/70">{NO_ACTIVE_SERVICES[locale]}</p>
          ) : (
            <div className="mt-2 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left text-[13px]">
                <thead>
                  <tr className="border-b border-ink/15 text-[10px] font-semibold uppercase tracking-[0.05em] text-ink">
                    <th className="py-2 pr-3">{head.name}</th>
                    <th className="py-2 pr-3">{head.provider}</th>
                    <th className="py-2 pr-3">{head.purpose}</th>
                    <th className="py-2 pr-3">{head.type}</th>
                    <th className="py-2">{head.duration}</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s.id} className="border-b border-ink/10 align-top">
                      <td className="py-2.5 pr-3 font-semibold text-ink">
                        {s.name}
                        {!s.active && (
                          <span className="mt-1 block text-[10px] font-normal normal-case text-ink-soft/70">
                            {locale === "it" ? "non attivo oggi" : locale === "fr" ? "inactif aujourd’hui" : locale === "de" ? "derzeit inaktiv" : "inactive today"}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 pr-3">{s.provider}</td>
                      <td className="py-2.5 pr-3">{s.purpose[locale]}</td>
                      <td className="py-2.5 pr-3">{s.thirdParty ? (locale === "it" ? "Terza parte" : locale === "fr" ? "Tiers" : locale === "de" ? "Dritte" : "Third-party") : (locale === "it" ? "Prima parte" : locale === "fr" ? "Propriétaire" : locale === "de" ? "Erste Partei" : "First-party")}</td>
                      <td className="py-2.5">
                        {s.storage.length === 0
                          ? locale === "it"
                            ? "Nessun cookie/storage nel tuo browser"
                            : locale === "fr"
                              ? "Aucun cookie/stockage sur votre navigateur"
                              : locale === "de"
                                ? "Kein Cookie/Speicher in Ihrem Browser"
                                : "No cookie/storage in your browser"
                          : s.storage.map((st) => `${st.name}: ${st.duration}`).join("; ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ),
    };
  });

  sections.push({
    heading: OUTBOUND_HEAD[locale],
    body: (
      <>
        <p>{OUTBOUND_INTRO[locale]}</p>
        <ul>
          {OUTBOUND_LINKS.map((l) => (
            <li key={l.name}>
              <strong>{l.name}</strong> ({l.provider}) — {l.purpose}
            </li>
          ))}
        </ul>
      </>
    ),
  });

  const manageBody: Record<Locale, string> = {
    it: "Puoi modificare o revocare il tuo consenso in qualsiasi momento cliccando su \"Preferenze cookie\" in fondo a questa e ad ogni altra pagina del sito. La revoca dei cookie Funzionali blocca immediatamente lo script corrispondente e cancella, dove tecnicamente possibile, i dati che avevamo salvato noi in prima persona. I cookie eventualmente già impostati direttamente dal fornitore terzo (es. Google) sul proprio dominio non possono essere cancellati da remoto da un altro sito, per via delle normali restrizioni di sicurezza del browser: scadranno secondo la politica di conservazione del fornitore, oppure puoi cancellarli tu manualmente dalle impostazioni del tuo browser.",
    en: "You can change or revoke your consent at any time by clicking \"Cookie preferences\" at the bottom of this and every other page of the site. Revoking Functional cookies immediately blocks the corresponding script and deletes, where technically possible, the data we had saved ourselves. Cookies already set directly by the third-party provider (e.g. Google) on its own domain cannot be remotely deleted by another site, due to normal browser security restrictions: they will expire according to the provider’s retention policy, or you can delete them yourself from your browser settings.",
    fr: "Vous pouvez modifier ou révoquer votre consentement à tout moment en cliquant sur « Préférences cookies » en bas de cette page et de toutes les autres. La révocation des cookies Fonctionnels bloque immédiatement le script correspondant et supprime, lorsque cela est techniquement possible, les données que nous avions nous-mêmes enregistrées. Les cookies déjà déposés directement par le fournisseur tiers (par ex. Google) sur son propre domaine ne peuvent pas être supprimés à distance par un autre site, en raison des restrictions de sécurité habituelles des navigateurs : ils expireront selon la politique de conservation du fournisseur, ou vous pouvez les supprimer vous-même depuis les paramètres de votre navigateur.",
    de: "Sie können Ihre Zustimmung jederzeit ändern oder widerrufen, indem Sie unten auf dieser und jeder anderen Seite der Website auf „Cookie-Einstellungen“ klicken. Der Widerruf funktionaler Cookies blockiert sofort das entsprechende Skript und löscht, soweit technisch möglich, die von uns selbst gespeicherten Daten. Cookies, die bereits direkt vom Drittanbieter (z. B. Google) auf dessen eigener Domain gesetzt wurden, können aus Sicherheitsgründen des Browsers nicht von einer anderen Website aus der Ferne gelöscht werden: sie laufen gemäß der Aufbewahrungsrichtlinie des Anbieters ab, oder Sie können sie selbst über Ihre Browsereinstellungen löschen.",
  };

  sections.push({
    heading: locale === "it" ? "Come gestire le tue preferenze" : locale === "fr" ? "Comment gérer vos préférences" : locale === "de" ? "Verwaltung Ihrer Einstellungen" : "How to manage your preferences",
    body: <p>{manageBody[locale]}</p>,
  });

  const gpcBody: Record<Locale, string> = {
    it: "Se il tuo browser invia il segnale Global Privacy Control (GPC), lo rispettiamo automaticamente come richiesta di disattivare le tecnologie non necessarie, indipendentemente dal Paese da cui visiti il sito.",
    en: "If your browser sends the Global Privacy Control (GPC) signal, we automatically honour it as a request to turn off non-essential technologies, regardless of the country you’re visiting from.",
    fr: "Si votre navigateur envoie le signal Global Privacy Control (GPC), nous le respectons automatiquement comme une demande de désactivation des technologies non essentielles, quel que soit le pays depuis lequel vous consultez le site.",
    de: "Wenn Ihr Browser das Global Privacy Control (GPC)-Signal sendet, respektieren wir dies automatisch als Aufforderung, nicht notwendige Technologien zu deaktivieren, unabhängig vom Land, aus dem Sie die Website besuchen.",
  };
  sections.push({
    heading: "Global Privacy Control",
    body: <p>{gpcBody[locale]}</p>,
  });

  const contactBody: Record<Locale, string> = {
    it: "Per qualsiasi domanda su questa pagina o sul trattamento dei tuoi dati, scrivi a agriturismolamora@gmail.com. Vedi anche la nostra Privacy Policy.",
    en: "For any question about this page or the processing of your data, write to agriturismolamora@gmail.com. See also our Privacy Policy.",
    fr: "Pour toute question sur cette page ou sur le traitement de vos données, écrivez à agriturismolamora@gmail.com. Voir aussi notre Politique de confidentialité.",
    de: "Bei Fragen zu dieser Seite oder zur Verarbeitung Ihrer Daten schreiben Sie an agriturismolamora@gmail.com. Siehe auch unsere Datenschutzerklärung.",
  };
  sections.push({
    heading: locale === "it" ? "Contatti" : locale === "fr" ? "Contact" : locale === "de" ? "Kontakt" : "Contact",
    body: (
      <p>
        {contactBody[locale]}{" "}
        <a href={withLocale(locale, "/privacy/")}>{consentText.banner.privacyLink}</a>.
      </p>
    ),
  });

  return (
    <>
      <LegalPageLayout
        label={locale === "it" ? "Informativa cookie" : locale === "fr" ? "Information cookies" : locale === "de" ? "Cookie-Hinweis" : "Cookie notice"}
        title={PAGE_TITLE[locale]}
        updated={UPDATED_LABEL[locale]}
        intro={<p>{INTRO[locale]}</p>}
        sections={sections}
      />
      <Reveal>
        <div className="mx-auto max-w-[760px] px-6 pb-16 sm:px-10">
          <button
            type="button"
            onClick={openCookiePreferences}
            className="rounded-[4px] border border-ink/25 px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-ink transition-colors hover:border-ink/50"
          >
            {consentText.footerLink}
          </button>
        </div>
      </Reveal>
    </>
  );
}
