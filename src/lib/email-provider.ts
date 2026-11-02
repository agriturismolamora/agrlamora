/* Servizio di posta per il pulsante "Invia via email" del modulo richieste
   (src/components/richieste-modal.tsx), riconosciuto SOLO dal dominio
   dell'indirizzo che l'utente scrive nel campo Email. Tutto nel browser:
   nessuna chiamata server, nessun lookup DNS/MX, quindi i domini aziendali
   ospitati da Google o Microsoft restano "other" (si apre l'app di posta).
   Funzioni pure: nessun accesso a window/navigator qui dentro. */

export type EmailProvider = "gmail" | "outlook" | "yahoo" | "apple" | "other" | "unknown";

/* Webmail che sanno aprire una bozza già compilata da un link. */
export type Webmail = "gmail" | "outlook" | "yahoo";

const PROVIDER_BY_DOMAIN: Record<string, Exclude<EmailProvider, "other" | "unknown">> = {
  "gmail.com": "gmail",
  "googlemail.com": "gmail",
  "outlook.com": "outlook",
  "outlook.it": "outlook",
  "hotmail.com": "outlook",
  "hotmail.it": "outlook",
  "live.com": "outlook",
  "live.it": "outlook",
  "msn.com": "outlook",
  "yahoo.com": "yahoo",
  "yahoo.it": "yahoo",
  "ymail.com": "yahoo",
  "rocketmail.com": "yahoo",
  "icloud.com": "apple",
  "me.com": "apple",
  "mac.com": "apple",
};

/* Nome del servizio mostrato in pagina ("Si aprirà Gmail nel browser"). */
export const WEBMAIL_NAMES: Record<Webmail, string> = {
  gmail: "Gmail",
  outlook: "Outlook",
  yahoo: "Yahoo Mail",
};

const DOMAIN_PATTERN = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;

/* Dominio normalizzato (minuscolo, dopo l'ultima @, senza punto finale);
   null se l'indirizzo non è valido. */
export function emailDomain(address: string): string | null {
  const value = address.trim().toLowerCase();
  if (/\s/.test(value)) return null;
  const at = value.lastIndexOf("@");
  if (at <= 0) return null;
  const domain = value.slice(at + 1).replace(/\.+$/, "");
  return DOMAIN_PATTERN.test(domain) ? domain : null;
}

export function detectEmailProvider(address: string): EmailProvider {
  const domain = emailDomain(address);
  if (!domain) return "unknown";
  return PROVIDER_BY_DOMAIN[domain] ?? "other";
}

/* Telefono o tablet: lì si apre sempre l'app di posta predefinita
   (mailto), mai uno schema di una singola app (googlegmail://,
   ms-outlook://...), che fallisce in silenzio se l'app non c'è. iPadOS si
   presenta come Mac: un "Mac" con touch è un iPad. */
export function isMobileDevice(nav: { userAgent: string; maxTouchPoints?: number; userAgentData?: { mobile?: boolean } }): boolean {
  if (nav.userAgentData?.mobile) return true;
  if (/iPhone|iPad|iPod|Android|Mobile/i.test(nav.userAgent)) return true;
  return /Macintosh/.test(nav.userAgent) && (nav.maxTouchPoints ?? 0) > 1;
}

export type EmailDraft = { to: string; subject: string; body: string };

/* A capo CRLF nei corpi email (RFC 6068 per mailto; le webmail lo accettano). */
export function toCrlf(value: string): string {
  return value.replace(/\r?\n/g, "\r\n");
}

export function mailtoUrl({ to, subject, body }: EmailDraft): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(toCrlf(body))}`;
}

/* Bozza nel webmail. `account`: indirizzo dell'utente, per Gmail sceglie
   l'account giusto se nel browser ce n'è più d'uno (authuser); normalizzato
   come in emailDomain (spazi, maiuscole, punto finale). */
export function webmailUrl(service: Webmail, { to, subject, body }: EmailDraft, account?: string): string {
  const t = encodeURIComponent(to);
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(toCrlf(body));
  const user = account?.trim().toLowerCase().replace(/\.+$/, "");
  switch (service) {
    case "gmail":
      return `https://mail.google.com/mail/?${user ? `authuser=${encodeURIComponent(user)}&` : ""}view=cm&fs=1&to=${t}&su=${s}&body=${b}`;
    case "outlook":
      return `https://outlook.live.com/mail/0/deeplink/compose?to=${t}&subject=${s}&body=${b}`;
    case "yahoo":
      return `https://compose.mail.yahoo.com/?to=${t}&subject=${s}&body=${b}`;
  }
}
