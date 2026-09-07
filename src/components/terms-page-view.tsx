import { LegalPageLayout, type LegalSection } from "@/components/legal-page-layout";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const PAGE_TITLE: Record<Locale, string> = {
  it: "Termini e Condizioni",
  en: "Terms and Conditions",
  fr: "Conditions Générales",
  de: "Allgemeine Geschäftsbedingungen",
};

const UPDATED_LABEL: Record<Locale, string> = {
  it: "Ultimo aggiornamento: 7 settembre 2026",
  en: "Last updated: 7 September 2026",
  fr: "Dernière mise à jour : 7 septembre 2026",
  de: "Zuletzt aktualisiert: 7. September 2026",
};

const LABEL: Record<Locale, string> = { it: "Condizioni d’uso", en: "Terms of use", fr: "Conditions d’utilisation", de: "Nutzungsbedingungen" };

function buildSections(locale: Locale): LegalSection[] {
  const content: Record<Locale, LegalSection[]> = {
    it: [
      {
        heading: "1. Chi gestisce questo sito",
        body: (
          <p>
            Il sito agriturismoinassisi.it è gestito da <strong>AZ. AGR. LA MORA DI MAZZOLI GIUSEPPINA E PAOLO SOC. SEMP. AGRICOLA</strong>,
            P.IVA 03900200548, Via Fonte Citerna 7, 06081 Assisi (PG) — di seguito «La Mora» o «noi». Usando questo sito, accetti le
            condizioni descritte qui sotto.
          </p>
        ),
      },
      {
        heading: "2. Come funziona il sito",
        body: (
          <p>
            Il sito ha finalità informativa e di contatto: presenta gli appartamenti, i servizi e le condizioni di soggiorno, ma non
            include un motore di prenotazione online né un sistema di pagamento integrato. Ogni richiesta di disponibilità o
            prenotazione avviene tramite contatto diretto (WhatsApp, telefono o email): la prenotazione si considera confermata solo
            dopo una conferma esplicita da parte nostra, non con l&apos;invio di un modulo sul sito.
          </p>
        ),
      },
      {
        heading: "3. Prenotazione, caparra e cancellazione",
        body: (
          <>
            <p>
              Le condizioni economiche (caparra, saldo, tariffe) e le politiche di cancellazione sono indicate nelle pagine dei singoli
              appartamenti e confermate direttamente da noi al momento della richiesta. In generale: caparra del 25% alla prenotazione,
              saldo all&apos;arrivo; sconto del 10% per soggiorni da 7 notti e per chi ha già soggiornato da noi in precedenza.
            </p>
            <p>
              Il preavviso richiesto per cancellare senza penale varia in base alla stagione (indicativamente 7 giorni in bassa
              stagione, 14 in media stagione, 21 in alta stagione — luglio e agosto): i termini esatti applicabili alla tua
              prenotazione ti vengono confermati da noi al momento della conferma. In caso di mancato arrivo senza preavviso, in bassa
              stagione si perde la sola caparra; in media e alta stagione è dovuto l&apos;intero importo del soggiorno.
            </p>
          </>
        ),
      },
      {
        heading: "4. Pagamenti",
        body: (
          <p>
            Il sito non elabora pagamenti online. Le modalità di pagamento della caparra e del saldo vengono concordate direttamente
            con noi al momento della conferma della prenotazione.
          </p>
        ),
      },
      {
        heading: "5. Animali al seguito",
        body: (
          <p>
            Gli appartamenti Gemelli e Sagittario, entrambi con giardino privato recintato, accettano animali al costo di 25€ a
            soggiorno (guinzaglio obbligatorio negli spazi comuni). Negli appartamenti Pesci, Acquario e Bilancia sono ammessi solo
            animali di piccola taglia, previo accordo diretto con noi, allo stesso costo.
          </p>
        ),
      },
      {
        heading: "6. Uso del sito e proprietà dei contenuti",
        body: (
          <p>
            Testi, fotografie e marchio «Agriturismo La Mora» presenti sul sito sono di nostra proprietà o utilizzati con relativa
            autorizzazione, e non possono essere riprodotti senza il nostro consenso scritto. Ti impegni a usare il sito in modo lecito
            e a non tentare di comprometterne la sicurezza o il funzionamento.
          </p>
        ),
      },
      {
        heading: "7. Link e contenuti di terze parti",
        body: (
          <p>
            Il sito contiene collegamenti a piattaforme di terze parti (Google Maps, WhatsApp, TripAdvisor, Facebook, Smartbox): non
            siamo responsabili dei contenuti o delle pratiche di questi siti esterni, che restano regolati dalle loro rispettive
            condizioni e informative privacy.
          </p>
        ),
      },
      {
        heading: "8. Limitazione di responsabilità",
        body: (
          <p>
            Ci impegniamo a mantenere le informazioni sul sito accurate e aggiornate, ma non garantiamo l&apos;assenza totale di errori
            o l&apos;ininterrotta disponibilità del sito. Le informazioni sulle tariffe di confronto con altre piattaforme, quando
            presenti, sono rilevate in un momento specifico indicato in pagina e possono variare nel tempo.
          </p>
        ),
      },
      {
        heading: "9. Legge applicabile e contatti",
        body: (
          <p>
            Queste condizioni sono regolate dalla legge italiana. Per qualsiasi domanda, scrivi a{" "}
            <a href="mailto:agriturismolamora@gmail.com">agriturismolamora@gmail.com</a> o consulta la nostra{" "}
            <a href={withLocale(locale, "/privacy/")}>Privacy Policy</a> e la{" "}
            <a href={withLocale(locale, "/cookie-policy/")}>Cookie Policy</a>.
          </p>
        ),
      },
    ],
    en: [
      {
        heading: "1. Who runs this site",
        body: (
          <p>
            The website agriturismoinassisi.it is run by <strong>AZ. AGR. LA MORA DI MAZZOLI GIUSEPPINA E PAOLO SOC. SEMP. AGRICOLA</strong>,
            VAT number 03900200548, Via Fonte Citerna 7, 06081 Assisi (PG) — hereinafter “La Mora” or “we”. By using this site, you
            accept the terms described below.
          </p>
        ),
      },
      {
        heading: "2. How the site works",
        body: (
          <p>
            The site is informational and contact-oriented: it presents the apartments, services, and stay conditions, but does not
            include an online booking engine or an integrated payment system. Every availability or booking request happens through
            direct contact (WhatsApp, phone, or email): a booking is only considered confirmed after our explicit confirmation, not by
            submitting a form on the site.
          </p>
        ),
      },
      {
        heading: "3. Booking, deposit, and cancellation",
        body: (
          <>
            <p>
              Financial conditions (deposit, balance, rates) and cancellation policies are shown on each apartment’s page and confirmed
              directly by us when you make a request. In general: 25% deposit on booking, balance on arrival; 10% discount for stays of
              7 nights or more and for guests who have stayed with us before.
            </p>
            <p>
              The notice required to cancel without penalty varies by season (roughly 7 days in low season, 14 in mid season, 21 in
              high season — July and August): the exact terms applicable to your booking are confirmed by us at the time of
              confirmation. In case of no-show without notice, only the deposit is lost in low season; in mid and high season the full
              stay amount is due.
            </p>
          </>
        ),
      },
      {
        heading: "4. Payments",
        body: (
          <p>
            The site does not process online payments. Payment arrangements for the deposit and balance are agreed directly with us
            when the booking is confirmed.
          </p>
        ),
      },
      {
        heading: "5. Pets",
        body: (
          <p>
            The Gemelli and Sagittario apartments, both with a private fenced garden, accept pets for €25 per stay (leash required in
            common areas). In the Pesci, Acquario, and Bilancia apartments, only small pets are allowed, subject to direct agreement
            with us, at the same cost.
          </p>
        ),
      },
      {
        heading: "6. Site use and content ownership",
        body: (
          <p>
            Text, photographs, and the “Agriturismo La Mora” trademark on the site are our property or used with proper authorisation,
            and may not be reproduced without our written consent. You agree to use the site lawfully and not to attempt to compromise
            its security or operation.
          </p>
        ),
      },
      {
        heading: "7. Third-party links and content",
        body: (
          <p>
            The site contains links to third-party platforms (Google Maps, WhatsApp, TripAdvisor, Facebook, Smartbox): we are not
            responsible for the content or practices of these external sites, which remain governed by their own terms and privacy
            notices.
          </p>
        ),
      },
      {
        heading: "8. Limitation of liability",
        body: (
          <p>
            We work to keep the information on the site accurate and up to date, but we do not guarantee it is entirely free of errors
            or that the site is continuously available. Rate-comparison information with other platforms, where shown, is captured at
            a specific point in time indicated on the page and may change.
          </p>
        ),
      },
      {
        heading: "9. Applicable law and contact",
        body: (
          <p>
            These terms are governed by Italian law. For any question, write to{" "}
            <a href="mailto:agriturismolamora@gmail.com">agriturismolamora@gmail.com</a> or see our{" "}
            <a href={withLocale(locale, "/privacy/")}>Privacy Policy</a> and{" "}
            <a href={withLocale(locale, "/cookie-policy/")}>Cookie Policy</a>.
          </p>
        ),
      },
    ],
    fr: [
      {
        heading: "1. Qui gère ce site",
        body: (
          <p>
            Le site agriturismoinassisi.it est géré par <strong>AZ. AGR. LA MORA DI MAZZOLI GIUSEPPINA E PAOLO SOC. SEMP. AGRICOLA</strong>,
            TVA 03900200548, Via Fonte Citerna 7, 06081 Assise (PG) — ci-après « La Mora » ou « nous ». En utilisant ce site, vous
            acceptez les conditions décrites ci-dessous.
          </p>
        ),
      },
      {
        heading: "2. Comment fonctionne le site",
        body: (
          <p>
            Le site a une finalité informative et de contact : il présente les appartements, les services et les conditions de séjour,
            mais n’inclut ni moteur de réservation en ligne ni système de paiement intégré. Toute demande de disponibilité ou de
            réservation se fait par contact direct (WhatsApp, téléphone ou email) : la réservation n’est considérée confirmée qu’après
            une confirmation explicite de notre part, et non par l’envoi d’un formulaire sur le site.
          </p>
        ),
      },
      {
        heading: "3. Réservation, acompte et annulation",
        body: (
          <>
            <p>
              Les conditions financières (acompte, solde, tarifs) et les politiques d’annulation sont indiquées sur les pages de chaque
              appartement et confirmées directement par nous lors de votre demande. En général : acompte de 25% à la réservation, solde
              à l’arrivée ; remise de 10% pour les séjours de 7 nuits ou plus et pour les hôtes ayant déjà séjourné chez nous.
            </p>
            <p>
              Le préavis requis pour annuler sans pénalité varie selon la saison (environ 7 jours en basse saison, 14 en moyenne
              saison, 21 en haute saison — juillet et août) : les conditions exactes applicables à votre réservation vous sont
              confirmées par nous au moment de la confirmation. En cas de non-présentation sans préavis, seul l’acompte est perdu en
              basse saison ; en moyenne et haute saison, le montant total du séjour est dû.
            </p>
          </>
        ),
      },
      {
        heading: "4. Paiements",
        body: (
          <p>
            Le site ne traite aucun paiement en ligne. Les modalités de paiement de l’acompte et du solde sont convenues directement
            avec nous lors de la confirmation de la réservation.
          </p>
        ),
      },
      {
        heading: "5. Animaux",
        body: (
          <p>
            Les appartements Gemelli et Sagittario, tous deux avec jardin privé clôturé, acceptent les animaux pour 25€ par séjour
            (laisse obligatoire dans les espaces communs). Dans les appartements Pesci, Acquario et Bilancia, seuls les petits animaux
            sont admis, sous réserve d’accord direct avec nous, au même tarif.
          </p>
        ),
      },
      {
        heading: "6. Utilisation du site et propriété des contenus",
        body: (
          <p>
            Les textes, photographies et la marque « Agriturismo La Mora » présents sur le site sont notre propriété ou utilisés avec
            l’autorisation appropriée, et ne peuvent être reproduits sans notre consentement écrit. Vous vous engagez à utiliser le site
            de manière licite et à ne pas tenter de compromettre sa sécurité ou son fonctionnement.
          </p>
        ),
      },
      {
        heading: "7. Liens et contenus de tiers",
        body: (
          <p>
            Le site contient des liens vers des plateformes tierces (Google Maps, WhatsApp, TripAdvisor, Facebook, Smartbox) : nous ne
            sommes pas responsables du contenu ou des pratiques de ces sites externes, qui restent régis par leurs propres conditions et
            politiques de confidentialité.
          </p>
        ),
      },
      {
        heading: "8. Limitation de responsabilité",
        body: (
          <p>
            Nous nous efforçons de maintenir les informations du site exactes et à jour, mais nous ne garantissons pas l’absence totale
            d’erreurs ni la disponibilité ininterrompue du site. Les informations de comparaison tarifaire avec d’autres plateformes,
            lorsqu’elles sont présentes, sont relevées à un moment précis indiqué sur la page et peuvent varier.
          </p>
        ),
      },
      {
        heading: "9. Droit applicable et contact",
        body: (
          <p>
            Ces conditions sont régies par le droit italien. Pour toute question, écrivez à{" "}
            <a href="mailto:agriturismolamora@gmail.com">agriturismolamora@gmail.com</a> ou consultez notre{" "}
            <a href={withLocale(locale, "/privacy/")}>Politique de confidentialité</a> et notre{" "}
            <a href={withLocale(locale, "/cookie-policy/")}>Politique de cookies</a>.
          </p>
        ),
      },
    ],
    de: [
      {
        heading: "1. Wer diese Website betreibt",
        body: (
          <p>
            Die Website agriturismoinassisi.it wird betrieben von <strong>AZ. AGR. LA MORA DI MAZZOLI GIUSEPPINA E PAOLO SOC. SEMP.
            AGRICOLA</strong>, USt-IdNr. 03900200548, Via Fonte Citerna 7, 06081 Assisi (PG) — im Folgenden „La Mora“ oder „wir“. Mit der
            Nutzung dieser Website akzeptieren Sie die unten beschriebenen Bedingungen.
          </p>
        ),
      },
      {
        heading: "2. Wie die Website funktioniert",
        body: (
          <p>
            Die Website dient der Information und Kontaktaufnahme: sie stellt die Apartments, Leistungen und Aufenthaltsbedingungen
            vor, enthält jedoch keine Online-Buchungsmaschine oder ein integriertes Zahlungssystem. Jede Verfügbarkeits- oder
            Buchungsanfrage erfolgt über direkten Kontakt (WhatsApp, Telefon oder E-Mail): eine Buchung gilt erst nach unserer
            ausdrücklichen Bestätigung als bestätigt, nicht durch das Absenden eines Formulars auf der Website.
          </p>
        ),
      },
      {
        heading: "3. Buchung, Anzahlung und Stornierung",
        body: (
          <>
            <p>
              Die finanziellen Bedingungen (Anzahlung, Restbetrag, Tarife) und Stornierungsbedingungen sind auf den Seiten der einzelnen
              Apartments angegeben und werden bei Ihrer Anfrage direkt von uns bestätigt. Im Allgemeinen: 25% Anzahlung bei Buchung,
              Restzahlung bei Ankunft; 10% Rabatt für Aufenthalte ab 7 Nächten und für Gäste, die bereits bei uns waren.
            </p>
            <p>
              Die für eine kostenlose Stornierung erforderliche Frist variiert je nach Saison (etwa 7 Tage in der Nebensaison, 14 in der
              Zwischensaison, 21 in der Hauptsaison — Juli und August): die genauen, für Ihre Buchung geltenden Bedingungen werden Ihnen
              bei der Bestätigung von uns mitgeteilt. Bei Nichterscheinen ohne Vorankündigung entfällt in der Nebensaison nur die
              Anzahlung; in der Zwischen- und Hauptsaison ist der volle Aufenthaltsbetrag fällig.
            </p>
          </>
        ),
      },
      {
        heading: "4. Zahlungen",
        body: (
          <p>
            Die Website wickelt keine Online-Zahlungen ab. Die Zahlungsmodalitäten für Anzahlung und Restbetrag werden bei der
            Buchungsbestätigung direkt mit uns vereinbart.
          </p>
        ),
      },
      {
        heading: "5. Haustiere",
        body: (
          <p>
            Die Apartments Gemelli und Sagittario, beide mit eigenem eingezäuntem Garten, akzeptieren Haustiere für 25€ pro Aufenthalt
            (Leinenpflicht in Gemeinschaftsbereichen). In den Apartments Pesci, Acquario und Bilancia sind nur kleine Haustiere erlaubt,
            nach direkter Absprache mit uns, zu denselben Kosten.
          </p>
        ),
      },
      {
        heading: "6. Nutzung der Website und Eigentum an Inhalten",
        body: (
          <p>
            Texte, Fotografien und die Marke „Agriturismo La Mora“ auf der Website sind unser Eigentum oder werden mit entsprechender
            Genehmigung verwendet und dürfen ohne unsere schriftliche Zustimmung nicht vervielfältigt werden. Sie verpflichten sich, die
            Website rechtmäßig zu nutzen und nicht zu versuchen, deren Sicherheit oder Funktion zu beeinträchtigen.
          </p>
        ),
      },
      {
        heading: "7. Links und Inhalte Dritter",
        body: (
          <p>
            Die Website enthält Links zu Plattformen Dritter (Google Maps, WhatsApp, TripAdvisor, Facebook, Smartbox): wir sind nicht
            verantwortlich für Inhalte oder Praktiken dieser externen Websites, die weiterhin ihren eigenen Bedingungen und
            Datenschutzhinweisen unterliegen.
          </p>
        ),
      },
      {
        heading: "8. Haftungsbeschränkung",
        body: (
          <p>
            Wir bemühen uns, die Informationen auf der Website korrekt und aktuell zu halten, garantieren jedoch nicht deren völlige
            Fehlerfreiheit oder die unterbrechungsfreie Verfügbarkeit der Website. Preisvergleichsinformationen mit anderen Plattformen,
            sofern vorhanden, werden zu einem bestimmten, auf der Seite angegebenen Zeitpunkt erfasst und können sich ändern.
          </p>
        ),
      },
      {
        heading: "9. Anwendbares Recht und Kontakt",
        body: (
          <p>
            Diese Bedingungen unterliegen italienischem Recht. Bei Fragen schreiben Sie an{" "}
            <a href="mailto:agriturismolamora@gmail.com">agriturismolamora@gmail.com</a> oder lesen Sie unsere{" "}
            <a href={withLocale(locale, "/privacy/")}>Datenschutzerklärung</a> und unsere{" "}
            <a href={withLocale(locale, "/cookie-policy/")}>Cookie-Richtlinie</a>.
          </p>
        ),
      },
    ],
  };
  return content[locale];
}

export function TermsPageView({ locale }: { locale: Locale }) {
  return (
    <LegalPageLayout label={LABEL[locale]} title={PAGE_TITLE[locale]} updated={UPDATED_LABEL[locale]} sections={buildSections(locale)} />
  );
}
