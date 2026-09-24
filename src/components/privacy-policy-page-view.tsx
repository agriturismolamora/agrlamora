"use client";

import { LegalPageLayout, type LegalSection } from "@/components/legal-page-layout";
import { openCookiePreferences } from "@/lib/consent";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const PAGE_TITLE: Record<Locale, string> = {
  it: "Privacy Policy",
  en: "Privacy Policy",
  fr: "Politique de Confidentialité",
  de: "Datenschutzerklärung",
};

const UPDATED_LABEL: Record<Locale, string> = {
  it: "Ultimo aggiornamento: 24 settembre 2026",
  en: "Last updated: 24 September 2026",
  fr: "Dernière mise à jour : 24 septembre 2026",
  de: "Zuletzt aktualisiert: 24. September 2026",
};

const LABEL: Record<Locale, string> = { it: "Informativa privacy", en: "Privacy notice", fr: "Politique de confidentialité", de: "Datenschutzhinweis" };

function buildSections(locale: Locale): LegalSection[] {
  const content: Record<Locale, LegalSection[]> = {
    it: [
      {
        heading: "1. Titolare del trattamento",
        body: (
          <p>
            <strong>AZ. AGR. LA MORA DI MAZZOLI GIUSEPPINA E PAOLO SOC. SEMP. AGRICOLA</strong>, P.IVA 03900200548, con sede in Via Fonte
            Citerna 7, 06081 Assisi (PG), Italia. Contatti: <a href="mailto:agriturismolamora@gmail.com">agriturismolamora@gmail.com</a>,
            telefono/WhatsApp <a href="tel:+390758041164">075 8041164</a>.
          </p>
        ),
      },
      {
        heading: "2. Quali dati trattiamo e perché",
        body: (
          <>
            <p>
              <strong>Richieste di prenotazione o informazioni.</strong> Se ci scrivi su WhatsApp (anche tramite il modulo di richiesta
              del sito, che prepara il messaggio senza salvarlo), per email o ci chiami per chiedere disponibilità o informazioni, tratti
              direttamente con noi: il sito non salva questi dati in un proprio database, ti mette
              solo in contatto con noi. Nome, contatti, date del soggiorno ed eventuali richieste particolari (es. esigenze alimentari,
              animali al seguito) vengono trattati manualmente da chi gestisce la struttura per rispondere alla richiesta, organizzare il
              soggiorno e adempiere agli obblighi di legge legati all’ospitalità (es. comunicazioni alla Questura, tassa di soggiorno).
              Base giuridica: esecuzione di misure precontrattuali o contrattuali su tua richiesta (art. 6.1.b GDPR) e, per gli obblighi
              di legge, art. 6.1.c GDPR.
            </p>
            <p>
              <strong>Prenotazione tramite Bed-and-breakfast.it.</strong> I pulsanti &quot;Prenota&quot; aprono un modulo di
              prenotazione fornito da bed-and-breakfast.it (gestito da Studio Scivoletto S.r.l. Unipersonale). Questo modulo si carica
              solo quando lo apri cliccando il relativo pulsante, mai automaticamente. Una volta aperto, sei all&apos;interno del modulo
              di bed-and-breakfast.it: i dati che inserisci lì (nome,
              contatti, eventuale accesso con account terzi) sono trattati da loro secondo la propria informativa privacy, non dalla
              nostra. Dettagli tecnici nella <a href={withLocale(locale, "/cookie-policy/")}>Cookie Policy</a>.
            </p>
            <p>
              <strong>Offerte, last minute e badge recensioni di Bed-and-breakfast.it.</strong> A differenza del modulo sopra, questi contenuti si caricano da soli ad ogni visita della pagina in cui compaiono (senza un click), e il tuo
              browser contatta direttamente bed-and-breakfast.it per mostrarli: per questo restano disattivati finché non dai il consenso
              alla categoria Funzionali nel banner cookie. Base giuridica: consenso (art. 6.1.a GDPR), revocabile in ogni momento.
              Dettagli nella <a href={withLocale(locale, "/cookie-policy/")}>Cookie Policy</a>.
            </p>
            <p>
              <strong>Pagamenti.</strong> Il sito non gestisce pagamenti online: non è integrato alcun sistema di pagamento (carta di
              credito, PayPal o simili). Le modalità di pagamento/caparra vengono concordate direttamente con noi, fuori dal sito.
            </p>
            <p>
              <strong>Modulo newsletter.</strong> Il modulo raccoglie l’indirizzo email che scrivi volontariamente, insieme a un consenso
              esplicito e separato, mai preselezionato. Al momento della pubblicazione di questa informativa, il modulo non è ancora
              collegato a un fornitore di invio email: l’indirizzo digitato non viene salvato né trasmesso a nessun sistema di invio.
              Quando attiveremo un fornitore reale, aggiorneremo questa informativa indicando chi tratterà l’indirizzo, per quanto tempo
              e con quali garanzie. Base giuridica: consenso (art. 6.1.a GDPR), revocabile in ogni momento.
            </p>
            <p>
              <strong>Protezione anti-spam dei moduli (reCAPTCHA).</strong> Usiamo Google reCAPTCHA v3 per proteggere il modulo
              newsletter da invii automatizzati. Si attiva solo se hai dato consenso alla categoria «Funzionali» nel banner cookie, e
              comporta l’invio di dati tecnici del tuo dispositivo a Google. Base giuridica: consenso (art. 6.1.a GDPR). Dettagli nella{" "}
              <a href={withLocale(locale, "/cookie-policy/")}>Cookie Policy</a>.
            </p>
            <p>
              <strong>Recensioni.</strong> Le recensioni Google mostrate sul sito sono pubblicate direttamente su Google dagli utenti,
              secondo le regole di Google stessa: il nostro sito le legge in sola lettura tramite l’API ufficiale di Google, senza
              raccoglierle o gestirle in un proprio archivio.
            </p>
            <p>
              <strong>Assistente virtuale (chatbot).</strong> L’assistente presente sul sito risponde con regole predefinite scritte da
              noi: non è collegato a servizi di intelligenza artificiale esterni, non registra le conversazioni e non invia alcun dato a
              terzi. I suoi unici collegamenti sono link diretti a WhatsApp o Google Maps, che si aprono solo se li clicchi tu.
            </p>
            <p>
              <strong>Dati di navigazione e log tecnici.</strong> Come qualunque sito web, il nostro fornitore di hosting registra
              automaticamente alcuni dati tecnici (indirizzo IP, tipo di browser, pagine visitate, data e ora) per garantire sicurezza e
              corretto funzionamento del servizio. Base giuridica: legittimo interesse a garantire la sicurezza del servizio (art. 6.1.f
              GDPR).
            </p>
            <p>
              <strong>Cookie e tecnologie simili.</strong> Vedi la nostra{" "}
              <a href={withLocale(locale, "/cookie-policy/")}>Cookie Policy</a> dedicata per l’elenco completo, verificato, di cosa usiamo
              davvero.
            </p>
          </>
        ),
      },
      {
        heading: "3. A chi comunichiamo i dati",
        body: (
          <>
            <p>Non vendiamo né cediamo a fini commerciali i dati che ci scrivi. Possono venirne a conoscenza, nei limiti delle rispettive funzioni:</p>
            <ul>
              <li>chi lavora direttamente nella gestione della struttura;</li>
              <li>
                <strong>Vercel Inc.</strong>, fornitore dell&apos;infrastruttura di hosting su cui gira il sito (elabora dati tecnici di
                navigazione come responsabile del trattamento);
              </li>
              <li>
                <strong>Google LLC</strong>, per la funzione anti-spam reCAPTCHA (solo con consenso) e per la lettura delle recensioni
                Google (in sola lettura, senza dati personali di chi visita il sito);
              </li>
              <li>
                <strong>Meta Platforms Ireland Limited</strong> (WhatsApp), se scegli di scriverci tramite WhatsApp: il contenuto dei
                messaggi che invii è soggetto anche all&apos;informativa privacy di WhatsApp stessa, che accetti utilizzando quell&apos;app;
              </li>
              <li>
                <strong>Studio Scivoletto S.r.l. Unipersonale</strong> (bed-and-breakfast.it), se apri il modulo di prenotazione, oppure
                se dai il consenso Funzionali che attiva i widget offerte/last minute/recensioni: i dati che inserisci in quel modulo, o la tua richiesta HTTP quando quei contenuti si caricano, sono trattati da loro
                secondo la propria informativa privacy;
              </li>
              <li>
                <strong>Octorate S.r.l.</strong>, per lo script invisibile del motore di prenotazione Octorate (canale Trivago)
                presente in ogni pagina: il tuo browser ne scarica i file da octorate.com e unpkg.com, esponendo il tuo indirizzo IP;
                nessun cookie viene impostato sul nostro sito;
              </li>
              <li>autorità pubbliche, quando richiesto dalla legge (es. comunicazioni obbligatorie legate all&apos;ospitalità turistica).</li>
            </ul>
          </>
        ),
      },
      {
        heading: "4. Trasferimenti di dati fuori dall’Unione Europea",
        body: (
          <p>
            Google LLC e Vercel Inc. hanno sede negli Stati Uniti e possono trattare dati anche al di fuori dello Spazio Economico
            Europeo. Entrambi dichiarano di adottare garanzie riconosciute per il trasferimento internazionale di dati (come le Clausole
            Contrattuali Standard della Commissione Europea e/o l&apos;adesione all&apos;EU-U.S. Data Privacy Framework). Per i dettagli
            aggiornati, ti invitiamo a consultare le rispettive informative:{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google
            </a>{" "}
            e{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Vercel
            </a>
            .
          </p>
        ),
      },
      {
        heading: "5. Per quanto tempo conserviamo i dati",
        body: (
          <>
            <p>
              I dati legati a una richiesta di prenotazione o soggiorno vengono conservati per il tempo necessario a gestire la
              richiesta e, quando applicabile, per il periodo previsto dagli obblighi fiscali, contabili e di pubblica sicurezza legati
              all&apos;attività ricettiva (la durata esatta di questi obblighi dipende dalla normativa fiscale applicabile e va confermata
              con il commercialista della struttura).
            </p>
            <p>Il cookie di consenso viene conservato per 6 mesi. Gli altri cookie/storage sono elencati con la relativa durata nella Cookie Policy.</p>
          </>
        ),
      },
      {
        heading: "6. I tuoi diritti",
        body: (
          <>
            <p>
              In qualità di interessato, hai diritto di chiederci in qualsiasi momento: accesso ai tuoi dati, rettifica, cancellazione,
              limitazione del trattamento, portabilità dei dati e opposizione al trattamento, oltre alla revoca di un consenso
              precedentemente dato (senza pregiudicare la liceità del trattamento già effettuato). Per esercitare questi diritti, scrivi
              a <a href="mailto:agriturismolamora@gmail.com">agriturismolamora@gmail.com</a>.
            </p>
            <p>
              Per le preferenze sui cookie, puoi anche usare direttamente il pulsante{" "}
              <button type="button" onClick={openCookiePreferences} className="text-raspberry underline underline-offset-2">
                Preferenze cookie
              </button>{" "}
              in fondo ad ogni pagina.
            </p>
            <p>
              Hai inoltre diritto di proporre reclamo al Garante per la protezione dei dati personali (
              <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
                www.garanteprivacy.it
              </a>
              ) se ritieni che il trattamento violi la normativa applicabile.
            </p>
          </>
        ),
      },
      {
        heading: "7. Modifiche a questa informativa",
        body: (
          <p>
            Questa informativa può essere aggiornata per riflettere cambiamenti nel sito, nei servizi utilizzati o nella normativa
            applicabile. La data di ultimo aggiornamento è indicata in cima alla pagina. In caso di modifiche rilevanti alle finalità o ai
            servizi che comportano un nuovo consenso ai cookie, il banner ricomparirà automaticamente.
          </p>
        ),
      },
    ],
    en: [
      {
        heading: "1. Data controller",
        body: (
          <p>
            <strong>AZ. AGR. LA MORA DI MAZZOLI GIUSEPPINA E PAOLO SOC. SEMP. AGRICOLA</strong>, VAT number 03900200548, registered at Via
            Fonte Citerna 7, 06081 Assisi (PG), Italy. Contact: <a href="mailto:agriturismolamora@gmail.com">agriturismolamora@gmail.com</a>,
            phone/WhatsApp <a href="tel:+390758041164">075 8041164</a>.
          </p>
        ),
      },
      {
        heading: "2. What data we process and why",
        body: (
          <>
            <p>
              <strong>Booking or information requests.</strong> If you write to us on WhatsApp (including through the site&apos;s
              request form, which prepares the message without storing it), by email, or call us to ask about availability or
              information, you deal directly with us: the site does not store this data in its own database, it only
              connects you with us. Name, contact details, stay dates, and any special requests (e.g. dietary needs, pets) are handled
              manually by the property’s staff to reply to the request, organise the stay, and comply with hospitality-related legal
              obligations (e.g. reporting to local authorities, tourist tax). Legal basis: performance of pre-contractual or contractual
              measures at your request (Art. 6.1.b GDPR), and, for legal obligations, Art. 6.1.c GDPR.
            </p>
            <p>
              <strong>Booking via Bed-and-breakfast.it.</strong> The &quot;Book now&quot; buttons open a booking form provided by
              bed-and-breakfast.it (operated by Studio Scivoletto S.r.l. Unipersonale). This form loads only when you open it by
              clicking the relevant button, never automatically.
              Once open, you&apos;re inside bed-and-breakfast.it&apos;s own form: the data you enter there (name, contact details, any
              sign-in with a third-party account) is processed by them under their own privacy notice, not ours. Technical details in
              our{" "}
              <a href={withLocale(locale, "/cookie-policy/")}>Cookie Policy</a>.
            </p>
            <p>
              <strong>Offers, last-minute deals, and reviews badge from Bed-and-breakfast.it.</strong> Unlike the form above, this content loads on its own every time you visit the page it appears on (with no click), and your browser
              contacts bed-and-breakfast.it directly to display it: because of this, it stays off until you give consent to the
              Functional category in the cookie banner. Legal basis: consent (Art. 6.1.a GDPR), revocable at any time. Details in our{" "}
              <a href={withLocale(locale, "/cookie-policy/")}>Cookie Policy</a>.
            </p>
            <p>
              <strong>Payments.</strong> The site does not process online payments: no payment system (credit card, PayPal or similar)
              is integrated. Payment/deposit arrangements are agreed directly with us, outside the website.
            </p>
            <p>
              <strong>Newsletter form.</strong> The form collects the email address you voluntarily enter, together with an explicit,
              separate consent that is never pre-checked. As of the publication of this notice, the form is not yet connected to an
              email-sending provider: the address you type is not saved or sent to any sending system. When we activate a real provider,
              we will update this notice to indicate who will process the address, for how long, and with which safeguards. Legal
              basis: consent (Art. 6.1.a GDPR), revocable at any time.
            </p>
            <p>
              <strong>Anti-spam form protection (reCAPTCHA).</strong> We use Google reCAPTCHA v3 to protect the newsletter form from
              automated submissions. It only activates if you’ve given consent to the “Functional” category in the cookie banner, and
              involves sending technical data from your device to Google. Legal basis: consent (Art. 6.1.a GDPR). Details in our{" "}
              <a href={withLocale(locale, "/cookie-policy/")}>Cookie Policy</a>.
            </p>
            <p>
              <strong>Reviews.</strong> The Google reviews shown on the site are published directly on Google by users, under Google’s
              own rules: our site only reads them, read-only, via Google’s official API, without collecting or managing them in our own
              archive.
            </p>
            <p>
              <strong>Virtual assistant (chatbot).</strong> The assistant on the site replies using pre-defined rules that we wrote: it
              is not connected to any external AI service, does not record conversations, and does not send any data to third parties.
              Its only links are direct links to WhatsApp or Google Maps, which only open if you click them.
            </p>
            <p>
              <strong>Browsing data and technical logs.</strong> Like any website, our hosting provider automatically logs some
              technical data (IP address, browser type, pages visited, date and time) to ensure security and correct operation of the
              service. Legal basis: legitimate interest in ensuring service security (Art. 6.1.f GDPR).
            </p>
            <p>
              <strong>Cookies and similar technologies.</strong> See our dedicated{" "}
              <a href={withLocale(locale, "/cookie-policy/")}>Cookie Policy</a> for the full, verified list of what we actually use.
            </p>
          </>
        ),
      },
      {
        heading: "3. Who we share data with",
        body: (
          <>
            <p>We do not sell or share the data you send us for commercial purposes. It may be accessed, within the limits of their respective roles, by:</p>
            <ul>
              <li>people who directly work in running the property;</li>
              <li>
                <strong>Vercel Inc.</strong>, the hosting infrastructure provider the site runs on (processes technical browsing data as
                a data processor);
              </li>
              <li>
                <strong>Google LLC</strong>, for the reCAPTCHA anti-spam function (only with consent) and for reading Google reviews
                (read-only, without personal data of site visitors);
              </li>
              <li>
                <strong>Meta Platforms Ireland Limited</strong> (WhatsApp), if you choose to write to us via WhatsApp: the content of
                the messages you send is also subject to WhatsApp’s own privacy notice, which you accept by using that app;
              </li>
              <li>
                <strong>Studio Scivoletto S.r.l. Unipersonale</strong> (bed-and-breakfast.it), if you open the booking form, or if you
                give Functional consent that activates the offers/last-minute/reviews widgets: the data you enter in that form, or your HTTP request when that content loads, is processed by them under their own privacy
                notice;
              </li>
              <li>
                <strong>Octorate S.r.l.</strong>, for the invisible Octorate booking-engine script (Trivago channel) present on every
                page: your browser downloads its files from octorate.com and unpkg.com, exposing your IP address; no cookies are set on
                our site;
              </li>
              <li>public authorities, when required by law (e.g. mandatory reporting related to tourist accommodation).</li>
            </ul>
          </>
        ),
      },
      {
        heading: "4. International data transfers",
        body: (
          <p>
            Google LLC and Vercel Inc. are based in the United States and may process data outside the European Economic Area. Both
            state that they adopt recognised safeguards for international data transfers (such as the European Commission’s Standard
            Contractual Clauses and/or adherence to the EU-U.S. Data Privacy Framework). For up-to-date details, please refer to their
            respective notices:{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google
            </a>{" "}
            and{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Vercel
            </a>
            .
          </p>
        ),
      },
      {
        heading: "5. How long we keep data",
        body: (
          <>
            <p>
              Data related to a booking or stay request is kept for as long as needed to handle the request and, where applicable, for
              the period required by tax, accounting, and public-security obligations linked to hospitality activity (the exact
              duration of these obligations depends on applicable tax law and should be confirmed with the property’s accountant).
            </p>
            <p>The consent cookie is kept for 6 months. Other cookies/storage are listed with their duration in the Cookie Policy.</p>
          </>
        ),
      },
      {
        heading: "6. Your rights",
        body: (
          <>
            <p>
              As a data subject, you have the right to ask us at any time for: access to your data, rectification, erasure, restriction
              of processing, data portability, and objection to processing, as well as withdrawal of a previously given consent
              (without affecting the lawfulness of processing already carried out). To exercise these rights, write to{" "}
              <a href="mailto:agriturismolamora@gmail.com">agriturismolamora@gmail.com</a>.
            </p>
            <p>
              For cookie preferences, you can also use the{" "}
              <button type="button" onClick={openCookiePreferences} className="text-raspberry underline underline-offset-2">
                Cookie preferences
              </button>{" "}
              button at the bottom of every page.
            </p>
            <p>
              You also have the right to lodge a complaint with the Italian Data Protection Authority (Garante per la protezione dei
              dati personali,{" "}
              <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
                www.garanteprivacy.it
              </a>
              ) if you believe the processing violates applicable law.
            </p>
          </>
        ),
      },
      {
        heading: "7. Changes to this notice",
        body: (
          <p>
            This notice may be updated to reflect changes to the site, the services used, or applicable law. The last-updated date is
            shown at the top of the page. If relevant changes to purposes or services require new cookie consent, the banner will
            reappear automatically.
          </p>
        ),
      },
    ],
    fr: [
      {
        heading: "1. Responsable du traitement",
        body: (
          <p>
            <strong>AZ. AGR. LA MORA DI MAZZOLI GIUSEPPINA E PAOLO SOC. SEMP. AGRICOLA</strong>, TVA 03900200548, siège Via Fonte Citerna
            7, 06081 Assise (PG), Italie. Contact : <a href="mailto:agriturismolamora@gmail.com">agriturismolamora@gmail.com</a>,
            téléphone/WhatsApp <a href="tel:+390758041164">075 8041164</a>.
          </p>
        ),
      },
      {
        heading: "2. Quelles données nous traitons et pourquoi",
        body: (
          <>
            <p>
              <strong>Demandes de réservation ou d’informations.</strong> Si vous nous écrivez sur WhatsApp (y compris via le
              formulaire de demande du site, qui prépare le message sans l’enregistrer), par email ou nous appelez pour demander des
              disponibilités ou des informations, vous traitez directement avec nous : le site ne stocke pas ces
              données dans sa propre base, il ne fait que vous mettre en contact avec nous. Le nom, les coordonnées, les dates du séjour
              et toute demande particulière (par ex. besoins alimentaires, animaux) sont traités manuellement par le personnel de
              l’établissement pour répondre à la demande, organiser le séjour et respecter les obligations légales liées à l’hébergement
              touristique (par ex. déclarations aux autorités, taxe de séjour). Base juridique : exécution de mesures précontractuelles
              ou contractuelles à votre demande (art. 6.1.b RGPD), et, pour les obligations légales, art. 6.1.c RGPD.
            </p>
            <p>
              <strong>Réservation via Bed-and-breakfast.it.</strong> Les boutons « Réserver » ouvrent un formulaire de réservation
              fourni par bed-and-breakfast.it (géré par Studio Scivoletto S.r.l. Unipersonale). Ce formulaire ne se charge que lorsque
              vous l’ouvrez en cliquant sur le bouton correspondant, jamais automatiquement. Une fois ouvert, vous êtes dans le formulaire de
              bed-and-breakfast.it : les données que vous y saisissez (nom, coordonnées, éventuelle connexion avec un compte tiers) sont
              traitées par eux selon leur propre politique de confidentialité, pas la nôtre. Détails techniques dans notre{" "}
              <a href={withLocale(locale, "/cookie-policy/")}>Politique de cookies</a>.
            </p>
            <p>
              <strong>Offres, dernière minute et badge d’avis de Bed-and-breakfast.it.</strong> Contrairement au formulaire
              ci-dessus, ce contenu se charge de lui-même à chaque visite de la page où il apparaît (sans clic), et votre
              navigateur contacte directement bed-and-breakfast.it pour l’afficher : il reste donc désactivé tant que vous n’avez pas
              donné votre consentement à la catégorie Fonctionnels dans la bannière cookies. Base juridique : consentement (art. 6.1.a
              RGPD), révocable à tout moment. Détails dans notre{" "}
              <a href={withLocale(locale, "/cookie-policy/")}>Politique de cookies</a>.
            </p>
            <p>
              <strong>Paiements.</strong> Le site ne gère aucun paiement en ligne : aucun système de paiement (carte de crédit, PayPal
              ou similaire) n’est intégré. Les modalités de paiement/acompte sont convenues directement avec nous, en dehors du site.
            </p>
            <p>
              <strong>Formulaire newsletter.</strong> Le formulaire recueille l’adresse email que vous saisissez volontairement, avec un
              consentement explicite et distinct, jamais précoché. Au moment de la publication de cette politique, le formulaire n’est
              pas encore relié à un fournisseur d’envoi d’emails : l’adresse saisie n’est ni enregistrée ni transmise à aucun système
              d’envoi. Lorsque nous activerons un fournisseur réel, nous mettrons à jour cette politique en indiquant qui traitera
              l’adresse, pendant combien de temps et avec quelles garanties. Base juridique : consentement (art. 6.1.a RGPD), révocable à
              tout moment.
            </p>
            <p>
              <strong>Protection anti-spam des formulaires (reCAPTCHA).</strong> Nous utilisons Google reCAPTCHA v3 pour protéger le
              formulaire newsletter contre les envois automatisés. Il ne s’active que si vous avez donné votre consentement à la
              catégorie « Fonctionnels » dans la bannière cookies, et implique l’envoi de données techniques de votre appareil à Google.
              Base juridique : consentement (art. 6.1.a RGPD). Détails dans notre{" "}
              <a href={withLocale(locale, "/cookie-policy/")}>Politique de cookies</a>.
            </p>
            <p>
              <strong>Avis.</strong> Les avis Google affichés sur le site sont publiés directement sur Google par les utilisateurs, selon
              les règles de Google elle-même : notre site les lit uniquement, en lecture seule, via l’API officielle de Google, sans les
              collecter ni les gérer dans sa propre archive.
            </p>
            <p>
              <strong>Assistant virtuel (chatbot).</strong> L’assistant présent sur le site répond selon des règles prédéfinies que nous
              avons écrites : il n’est relié à aucun service d’intelligence artificielle externe, n’enregistre pas les conversations et
              n’envoie aucune donnée à des tiers. Ses seuls liens sont des liens directs vers WhatsApp ou Google Maps, qui ne s’ouvrent
              que si vous cliquez dessus.
            </p>
            <p>
              <strong>Données de navigation et journaux techniques.</strong> Comme tout site web, notre hébergeur enregistre
              automatiquement certaines données techniques (adresse IP, type de navigateur, pages visitées, date et heure) pour garantir
              la sécurité et le bon fonctionnement du service. Base juridique : intérêt légitime à garantir la sécurité du service (art.
              6.1.f RGPD).
            </p>
            <p>
              <strong>Cookies et technologies similaires.</strong> Voir notre{" "}
              <a href={withLocale(locale, "/cookie-policy/")}>Politique de cookies</a> dédiée pour la liste complète et vérifiée de ce que
              nous utilisons réellement.
            </p>
          </>
        ),
      },
      {
        heading: "3. À qui nous communiquons les données",
        body: (
          <>
            <p>Nous ne vendons ni ne cédons à des fins commerciales les données que vous nous envoyez. Elles peuvent être connues, dans les limites de leurs fonctions respectives, par :</p>
            <ul>
              <li>les personnes travaillant directement à la gestion de l’établissement ;</li>
              <li>
                <strong>Vercel Inc.</strong>, fournisseur de l’infrastructure d’hébergement sur laquelle tourne le site (traite les
                données techniques de navigation en tant que sous-traitant) ;
              </li>
              <li>
                <strong>Google LLC</strong>, pour la fonction anti-spam reCAPTCHA (uniquement avec consentement) et pour la lecture des
                avis Google (en lecture seule, sans données personnelles des visiteurs du site) ;
              </li>
              <li>
                <strong>Meta Platforms Ireland Limited</strong> (WhatsApp), si vous choisissez de nous écrire via WhatsApp : le contenu
                des messages que vous envoyez est également soumis à la propre politique de confidentialité de WhatsApp, que vous
                acceptez en utilisant cette application ;
              </li>
              <li>
                <strong>Studio Scivoletto S.r.l. Unipersonale</strong> (bed-and-breakfast.it), si vous ouvrez le formulaire de
                réservation, ou si vous donnez le consentement Fonctionnels qui active les widgets offres/dernière minute/avis : les
                données que vous saisissez dans ce formulaire, ou votre requête HTTP lorsque ce
                contenu se charge, sont traitées par eux selon leur propre politique de confidentialité ;
              </li>
              <li>
                <strong>Octorate S.r.l.</strong>, pour le script invisible du moteur de réservation Octorate (canal Trivago) présent
                sur chaque page : votre navigateur télécharge ses fichiers depuis octorate.com et unpkg.com, ce qui expose votre adresse
                IP ; aucun cookie n’est déposé sur notre site ;
              </li>
              <li>les autorités publiques, lorsque la loi l’exige (par ex. déclarations obligatoires liées à l’hébergement touristique).</li>
            </ul>
          </>
        ),
      },
      {
        heading: "4. Transferts de données hors de l’Union européenne",
        body: (
          <p>
            Google LLC et Vercel Inc. sont basées aux États-Unis et peuvent traiter des données en dehors de l’Espace économique
            européen. Toutes deux déclarent adopter des garanties reconnues pour les transferts internationaux de données (comme les
            clauses contractuelles types de la Commission européenne et/ou l’adhésion à l’EU-U.S. Data Privacy Framework). Pour des
            détails à jour, veuillez consulter leurs politiques respectives :{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google
            </a>{" "}
            et{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Vercel
            </a>
            .
          </p>
        ),
      },
      {
        heading: "5. Durée de conservation des données",
        body: (
          <>
            <p>
              Les données liées à une demande de réservation ou de séjour sont conservées le temps nécessaire pour traiter la demande
              et, le cas échéant, pendant la période prévue par les obligations fiscales, comptables et de sécurité publique liées à
              l’activité d’hébergement (la durée exacte de ces obligations dépend de la législation fiscale applicable et doit être
              confirmée avec le comptable de l’établissement).
            </p>
            <p>Le cookie de consentement est conservé 6 mois. Les autres cookies/stockages sont listés avec leur durée dans la Politique de cookies.</p>
          </>
        ),
      },
      {
        heading: "6. Vos droits",
        body: (
          <>
            <p>
              En tant que personne concernée, vous avez le droit de nous demander à tout moment : l’accès à vos données, leur
              rectification, leur suppression, la limitation du traitement, la portabilité des données et l’opposition au traitement,
              ainsi que le retrait d’un consentement précédemment donné (sans affecter la licéité du traitement déjà effectué). Pour
              exercer ces droits, écrivez à <a href="mailto:agriturismolamora@gmail.com">agriturismolamora@gmail.com</a>.
            </p>
            <p>
              Pour les préférences cookies, vous pouvez aussi utiliser directement le bouton{" "}
              <button type="button" onClick={openCookiePreferences} className="text-raspberry underline underline-offset-2">
                Préférences cookies
              </button>{" "}
              en bas de chaque page.
            </p>
            <p>
              Vous avez également le droit d’introduire une réclamation auprès de l’autorité italienne de protection des données
              (Garante per la protezione dei dati personali,{" "}
              <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
                www.garanteprivacy.it
              </a>
              ) si vous estimez que le traitement viole la réglementation applicable.
            </p>
          </>
        ),
      },
      {
        heading: "7. Modifications de cette politique",
        body: (
          <p>
            Cette politique peut être mise à jour pour refléter des changements du site, des services utilisés ou de la réglementation
            applicable. La date de dernière mise à jour figure en haut de la page. En cas de changements pertinents des finalités ou des
            services nécessitant un nouveau consentement cookies, la bannière réapparaîtra automatiquement.
          </p>
        ),
      },
    ],
    de: [
      {
        heading: "1. Verantwortlicher",
        body: (
          <p>
            <strong>AZ. AGR. LA MORA DI MAZZOLI GIUSEPPINA E PAOLO SOC. SEMP. AGRICOLA</strong>, USt-IdNr. 03900200548, Sitz Via Fonte
            Citerna 7, 06081 Assisi (PG), Italien. Kontakt: <a href="mailto:agriturismolamora@gmail.com">agriturismolamora@gmail.com</a>,
            Telefon/WhatsApp <a href="tel:+390758041164">075 8041164</a>.
          </p>
        ),
      },
      {
        heading: "2. Welche Daten wir verarbeiten und warum",
        body: (
          <>
            <p>
              <strong>Buchungs- oder Informationsanfragen.</strong> Wenn Sie uns per WhatsApp (auch über das Anfrageformular der
              Website, das die Nachricht vorbereitet, ohne sie zu speichern), E-Mail oder Telefon nach Verfügbarkeit oder Informationen
              fragen, handeln Sie direkt mit uns: die Website speichert diese Daten nicht in einer eigenen Datenbank,
              sie stellt lediglich den Kontakt zu uns her. Name, Kontaktdaten, Aufenthaltsdaten und etwaige besondere Wünsche (z. B.
              Ernährungsbedürfnisse, Haustiere) werden manuell vom Personal der Unterkunft verarbeitet, um die Anfrage zu beantworten,
              den Aufenthalt zu organisieren und gesetzliche Pflichten im Zusammenhang mit der Beherbergung zu erfüllen (z. B. Meldungen
              an Behörden, Kurtaxe). Rechtsgrundlage: Erfüllung vorvertraglicher oder vertraglicher Maßnahmen auf Ihre Anfrage (Art.
              6.1.b DSGVO) und, für gesetzliche Pflichten, Art. 6.1.c DSGVO.
            </p>
            <p>
              <strong>Buchung über Bed-and-breakfast.it.</strong> Die Schaltflächen „Jetzt buchen“ öffnen ein Buchungsformular von
              bed-and-breakfast.it (betrieben von Studio Scivoletto S.r.l. Unipersonale). Dieses Formular wird nur geladen, wenn Sie es
              durch Klick auf die entsprechende Schaltfläche öffnen, niemals automatisch. Einmal geöffnet, befinden Sie sich im Formular von bed-and-breakfast.it: die
              dort eingegebenen Daten (Name, Kontaktdaten, etwaige Anmeldung mit einem Drittanbieter-Konto) werden von diesen gemäß
              deren eigener Datenschutzerklärung verarbeitet, nicht von uns. Technische Details in unserer{" "}
              <a href={withLocale(locale, "/cookie-policy/")}>Cookie-Richtlinie</a>.
            </p>
            <p>
              <strong>Angebote, Last-Minute-Angebote und Bewertungs-Badge von Bed-and-breakfast.it.</strong> Anders als das oben
              genannte Formular lädt sich dieser Inhalt bei jedem Besuch der Seite, auf der er erscheint, von selbst
              (ohne Klick), und Ihr Browser kontaktiert bed-and-breakfast.it direkt, um ihn anzuzeigen: deshalb bleibt er deaktiviert,
              bis Sie im Cookie-Banner der Kategorie Funktional zustimmen. Rechtsgrundlage: Einwilligung (Art. 6.1.a DSGVO), jederzeit
              widerrufbar. Details in unserer <a href={withLocale(locale, "/cookie-policy/")}>Cookie-Richtlinie</a>.
            </p>
            <p>
              <strong>Zahlungen.</strong> Die Website wickelt keine Online-Zahlungen ab: es ist kein Zahlungssystem (Kreditkarte,
              PayPal o. Ä.) integriert. Zahlungs-/Anzahlungsmodalitäten werden direkt mit uns, außerhalb der Website, vereinbart.
            </p>
            <p>
              <strong>Newsletter-Formular.</strong> Das Formular erfasst die von Ihnen freiwillig eingegebene E-Mail-Adresse zusammen
              mit einer ausdrücklichen, separaten und nie vorausgewählten Einwilligung. Zum Zeitpunkt der Veröffentlichung dieses
              Hinweises ist das Formular noch nicht mit einem E-Mail-Versanddienst verbunden: die eingegebene Adresse wird nicht
              gespeichert oder an ein Versandsystem übermittelt. Sobald wir einen echten Anbieter aktivieren, aktualisieren wir diesen
              Hinweis mit Angaben dazu, wer die Adresse verarbeitet, wie lange und mit welchen Garantien. Rechtsgrundlage: Einwilligung
              (Art. 6.1.a DSGVO), jederzeit widerrufbar.
            </p>
            <p>
              <strong>Anti-Spam-Schutz der Formulare (reCAPTCHA).</strong> Wir verwenden Google reCAPTCHA v3, um das Newsletter-Formular
              vor automatisierten Übermittlungen zu schützen. Es wird nur aktiviert, wenn Sie der Kategorie „Funktional“ im Cookie-Banner
              zugestimmt haben, und beinhaltet die Übertragung technischer Gerätedaten an Google. Rechtsgrundlage: Einwilligung (Art.
              6.1.a DSGVO). Details in unserer <a href={withLocale(locale, "/cookie-policy/")}>Cookie-Richtlinie</a>.
            </p>
            <p>
              <strong>Bewertungen.</strong> Die auf der Website gezeigten Google-Bewertungen werden von Nutzern direkt auf Google
              veröffentlicht, gemäß den Regeln von Google selbst: unsere Website liest sie nur lesend über die offizielle Google-API,
              ohne sie zu sammeln oder in einem eigenen Archiv zu verwalten.
            </p>
            <p>
              <strong>Virtueller Assistent (Chatbot).</strong> Der Assistent auf der Website antwortet nach von uns geschriebenen,
              vordefinierten Regeln: er ist mit keinem externen KI-Dienst verbunden, zeichnet keine Gespräche auf und sendet keine Daten
              an Dritte. Seine einzigen Links sind direkte Links zu WhatsApp oder Google Maps, die sich nur öffnen, wenn Sie darauf
              klicken.
            </p>
            <p>
              <strong>Navigationsdaten und technische Protokolle.</strong> Wie jede Website protokolliert unser Hosting-Anbieter
              automatisch einige technische Daten (IP-Adresse, Browsertyp, besuchte Seiten, Datum und Uhrzeit), um Sicherheit und
              ordnungsgemäßen Betrieb des Dienstes zu gewährleisten. Rechtsgrundlage: berechtigtes Interesse an der Gewährleistung der
              Dienstsicherheit (Art. 6.1.f DSGVO).
            </p>
            <p>
              <strong>Cookies und ähnliche Technologien.</strong> Siehe unsere eigene{" "}
              <a href={withLocale(locale, "/cookie-policy/")}>Cookie-Richtlinie</a> für die vollständige, geprüfte Liste dessen, was wir
              tatsächlich verwenden.
            </p>
          </>
        ),
      },
      {
        heading: "3. Wem wir Daten mitteilen",
        body: (
          <>
            <p>Wir verkaufen oder geben die uns geschickten Daten nicht zu kommerziellen Zwecken weiter. Im Rahmen ihrer jeweiligen Funktionen können sie folgenden Stellen bekannt werden:</p>
            <ul>
              <li>Personen, die direkt an der Führung der Unterkunft beteiligt sind;</li>
              <li>
                <strong>Vercel Inc.</strong>, Anbieter der Hosting-Infrastruktur, auf der die Website läuft (verarbeitet technische
                Navigationsdaten als Auftragsverarbeiter);
              </li>
              <li>
                <strong>Google LLC</strong>, für die Anti-Spam-Funktion reCAPTCHA (nur mit Zustimmung) und zum Lesen von
                Google-Bewertungen (nur lesend, ohne personenbezogene Daten der Website-Besucher);
              </li>
              <li>
                <strong>Meta Platforms Ireland Limited</strong> (WhatsApp), falls Sie sich für eine Kontaktaufnahme über WhatsApp
                entscheiden: der Inhalt der von Ihnen gesendeten Nachrichten unterliegt auch der eigenen Datenschutzerklärung von
                WhatsApp, der Sie durch die Nutzung dieser App zustimmen;
              </li>
              <li>
                <strong>Studio Scivoletto S.r.l. Unipersonale</strong> (bed-and-breakfast.it), wenn Sie das Buchungsformular öffnen,
                oder wenn Sie die Funktional-Zustimmung erteilen, die die Widgets Angebote/Last-Minute/Bewertungen aktiviert: die
                Daten, die Sie in dieses Formular eingeben, oder Ihre HTTP-Anfrage beim
                Laden dieser Inhalte, werden von diesen gemäß ihrer eigenen Datenschutzerklärung verarbeitet;
              </li>
              <li>
                <strong>Octorate S.r.l.</strong>, für das unsichtbare Skript der Buchungsmaschine Octorate (Trivago-Kanal) auf jeder
                Seite: Ihr Browser lädt dessen Dateien von octorate.com und unpkg.com, wodurch Ihre IP-Adresse offengelegt wird; auf
                unserer Website werden keine Cookies gesetzt;
              </li>
              <li>Behörden, sofern gesetzlich vorgeschrieben (z. B. Pflichtmeldungen im Zusammenhang mit touristischer Beherbergung).</li>
            </ul>
          </>
        ),
      },
      {
        heading: "4. Datenübermittlungen außerhalb der Europäischen Union",
        body: (
          <p>
            Google LLC und Vercel Inc. haben ihren Sitz in den USA und können Daten auch außerhalb des Europäischen Wirtschaftsraums
            verarbeiten. Beide erklären, anerkannte Garantien für internationale Datenübermittlungen anzuwenden (wie die
            Standardvertragsklauseln der Europäischen Kommission und/oder die Teilnahme am EU-U.S. Data Privacy Framework). Aktuelle
            Details finden Sie in den jeweiligen Erklärungen:{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google
            </a>{" "}
            und{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Vercel
            </a>
            .
          </p>
        ),
      },
      {
        heading: "5. Wie lange wir Daten aufbewahren",
        body: (
          <>
            <p>
              Daten im Zusammenhang mit einer Buchungs- oder Aufenthaltsanfrage werden so lange aufbewahrt, wie es zur Bearbeitung der
              Anfrage erforderlich ist, und gegebenenfalls für den Zeitraum, der durch steuerliche, buchhalterische und
              sicherheitsrechtliche Pflichten im Zusammenhang mit der Beherbergungstätigkeit vorgeschrieben ist (die genaue Dauer dieser
              Pflichten hängt vom anwendbaren Steuerrecht ab und sollte mit dem Steuerberater der Unterkunft bestätigt werden).
            </p>
            <p>Der Consent-Cookie wird 6 Monate lang aufbewahrt. Weitere Cookies/Speicher sind mit ihrer Dauer in der Cookie-Richtlinie aufgeführt.</p>
          </>
        ),
      },
      {
        heading: "6. Ihre Rechte",
        body: (
          <>
            <p>
              Als betroffene Person haben Sie das Recht, jederzeit Folgendes von uns zu verlangen: Zugang zu Ihren Daten, Berichtigung,
              Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen die Verarbeitung sowie den Widerruf
              einer zuvor erteilten Einwilligung (ohne die Rechtmäßigkeit der bereits erfolgten Verarbeitung zu berühren). Zur Ausübung
              dieser Rechte schreiben Sie an <a href="mailto:agriturismolamora@gmail.com">agriturismolamora@gmail.com</a>.
            </p>
            <p>
              Für Cookie-Einstellungen können Sie auch direkt die Schaltfläche{" "}
              <button type="button" onClick={openCookiePreferences} className="text-raspberry underline underline-offset-2">
                Cookie-Einstellungen
              </button>{" "}
              am Ende jeder Seite verwenden.
            </p>
            <p>
              Sie haben außerdem das Recht, sich bei der italienischen Datenschutzbehörde (Garante per la protezione dei dati
              personali,{" "}
              <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
                www.garanteprivacy.it
              </a>
              ) zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung gegen geltendes Recht verstößt.
            </p>
          </>
        ),
      },
      {
        heading: "7. Änderungen dieses Hinweises",
        body: (
          <p>
            Dieser Hinweis kann aktualisiert werden, um Änderungen der Website, der verwendeten Dienste oder des geltenden Rechts
            widerzuspiegeln. Das Datum der letzten Aktualisierung wird oben auf der Seite angezeigt. Bei relevanten Änderungen der Zwecke
            oder Dienste, die eine neue Cookie-Zustimmung erfordern, erscheint das Banner automatisch erneut.
          </p>
        ),
      },
    ],
  };
  return content[locale];
}

export function PrivacyPolicyPageView({ locale }: { locale: Locale }) {
  return (
    <LegalPageLayout
      label={LABEL[locale]}
      title={PAGE_TITLE[locale]}
      updated={UPDATED_LABEL[locale]}
      sections={buildSections(locale)}
    />
  );
}
