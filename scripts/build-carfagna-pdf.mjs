/* Genera i PDF della convenzione con il Ristorante Carfagna, uno per
   lingua, in public/downloads/:
     la-mora-convenzione-ristorante-carfagna-<it|en|fr|de>.pdf
   Uso: npm run pdf:carfagna  (va rilanciato solo se cambiano testi o dati;
   i PDF sono committati, il sito non esegue questo script).

   Testi e cifre arrivano da src/data/ristorante-carfagna.ts, gli stessi
   della pagina /ristorante-convenzionato/ (Node 22.6+ carica il .ts
   togliendo i tipi). Il PDF deve reggersi da solo, perché lo pubblica anche
   il ristorante su Facebook: A4, una pagina, logo La Mora, le tre proposte,
   la frase da mostrare al ristorante, QR verso la pagina nella stessa
   lingua (URL canonico www) e contatti di La Mora. MAI sconti sulla carta.

   Font standard PDF (Helvetica/Times, codifica WinAnsi): coprono accenti,
   ß, «», „“ ed € delle 4 lingue senza incorporare file di font. */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { PDFDocument, PDFName, PDFString, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import sharp from "sharp";
import { CARFAGNA, CARFAGNA_OFFERS, CARFAGNA_PAGE_PATH, CARFAGNA_PDF_TITLE, CARFAGNA_SHOW_TEXT } from "../src/data/ristorante-carfagna.ts";
import { LOCALES, withLocale } from "../src/lib/i18n.ts";

const SITE_URL = "https://www.lamoraassisi.com";
const LA_MORA = { name: "Agriturismo La Mora", address: "Via Fonte Citerna, 7 — 06081 Assisi (PG)", site: "www.lamoraassisi.com", phone: "393 4363917" };

/* Palette del sito (globals.css). */
const hex = (h) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const C = { ink: hex("#241f17"), inkSoft: hex("#5c5344"), raspberry: hex("#9f414f"), gold: hex("#b6923c"), cream: hex("#f8f2e7"), creamDim: hex("#efe6d4"), olive: hex("#1c2117") };

const UI = {
  it: { scan: "Inquadra il codice per aprire la pagina della convenzione:", footer: "Il Ristorante Carfagna è un ristorante indipendente convenzionato con Agriturismo La Mora.", restaurant: "Il ristorante" },
  en: { scan: "Scan the code to open the agreement page:", footer: "Ristorante Carfagna is an independent restaurant with an agreement with Agriturismo La Mora.", restaurant: "The restaurant" },
  fr: { scan: "Scannez le code pour ouvrir la page de la convention :", footer: "Le Ristorante Carfagna est un restaurant indépendant partenaire de l'Agriturismo La Mora.", restaurant: "Le restaurant" },
  de: { scan: "Code scannen, um die Seite der Vereinbarung zu öffnen:", footer: "Das Ristorante Carfagna ist ein unabhängiges Partnerrestaurant des Agriturismo La Mora.", restaurant: "Das Restaurant" },
};

/* A capo per parole entro `maxWidth` punti. */
function wrap(text, font, size, maxWidth) {
  const lines = [];
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= maxWidth || !line) line = next;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function buildPdf(locale, logoPng) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const sans = await doc.embedFont(StandardFonts.Helvetica);
  const sansBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const serif = await doc.embedFont(StandardFonts.TimesRoman);
  const serifItalic = await doc.embedFont(StandardFonts.TimesRomanItalic);
  const M = 48;
  const contentW = width - M * 2;

  const pageUrl = `${SITE_URL}${withLocale(locale, CARFAGNA_PAGE_PATH)}`;
  doc.setTitle(`${CARFAGNA_PDF_TITLE[locale].title} — ${CARFAGNA_PDF_TITLE[locale].subtitle}`);
  doc.setAuthor(LA_MORA.name);
  doc.setSubject(pageUrl);
  doc.setLanguage(locale);
  doc.setCreator("Agriturismo La Mora");
  doc.setProducer("pdf-lib");

  // Logo La Mora (versione per fondo chiaro), titolo e sottotitolo su una
  // fascia crema alta quanto il blocco (il titolo può andare su due righe).
  const logo = await doc.embedPng(logoPng);
  const logoW = 118;
  const logoH = (logo.height / logo.width) * logoW;
  const title = CARFAGNA_PDF_TITLE[locale];
  const titleLines = wrap(title.title, serif, 25, contentW);
  const bandBottom = height - 40 - logoH - 34 - titleLines.length * 29 - 22;
  page.drawRectangle({ x: 0, y: bandBottom, width, height: height - bandBottom, color: C.cream });
  page.drawRectangle({ x: 20, y: 20, width: width - 40, height: height - 40, borderColor: C.gold, borderWidth: 0.8 });
  page.drawImage(logo, { x: (width - logoW) / 2, y: height - 40 - logoH, width: logoW, height: logoH });

  let y = height - 40 - logoH - 34;
  for (const line of titleLines) {
    page.drawText(line, { x: (width - serif.widthOfTextAtSize(line, 25)) / 2, y, size: 25, font: serif, color: C.ink });
    y -= 29;
  }
  const sub = `— ${title.subtitle}`;
  page.drawText(sub, { x: (width - serifItalic.widthOfTextAtSize(sub, 18)) / 2, y: y - 2, size: 18, font: serifItalic, color: C.raspberry });
  y = bandBottom - 26;

  // Le tre proposte: riquadri con prezzo a sinistra.
  const priceColW = 96;
  for (const offer of CARFAGNA_OFFERS) {
    const o = offer.text[locale];
    const textX = M + 20 + priceColW;
    const textW = contentW - 40 - priceColW;
    const detailLines = wrap(o.detail, sans, 10.5, textW);
    const boxH = 22 + 18 + 15 + detailLines.length * 14.5 + 14;
    const top = y;
    page.drawRectangle({ x: M, y: top - boxH, width: contentW, height: boxH, color: C.creamDim });
    page.drawRectangle({ x: M, y: top - boxH, width: 3, height: boxH, color: C.raspberry });
    // Prezzo
    page.drawText(o.price, { x: M + 20, y: top - 22 - 24, size: 30, font: serif, color: C.raspberry });
    // Titolo, destinatari, dettaglio
    let ty = top - 22 - 4;
    page.drawText(o.title, { x: textX, y: ty, size: 15, font: sansBold, color: C.ink });
    ty -= 17;
    page.drawText(o.who.toUpperCase(), { x: textX, y: ty, size: 8.5, font: sansBold, color: C.inkSoft });
    ty -= 18;
    for (const line of detailLines) {
      page.drawText(line, { x: textX, y: ty, size: 10.5, font: sans, color: C.ink });
      ty -= 14.5;
    }
    y = top - boxH - 12;
  }

  // Frase da mostrare al ristorante.
  y -= 6;
  const show = CARFAGNA_SHOW_TEXT[locale].pdf;
  const showLines = wrap(show, sansBold, 12, contentW - 32);
  const showH = showLines.length * 16 + 22;
  page.drawRectangle({ x: M, y: y - showH, width: contentW, height: showH, borderColor: C.gold, borderWidth: 1.2, color: rgb(1, 1, 1) });
  let sy = y - 16 - 4;
  for (const line of showLines) {
    page.drawText(line, { x: (width - sansBold.widthOfTextAtSize(line, 12)) / 2, y: sy, size: 12, font: sansBold, color: C.ink });
    sy -= 16;
  }
  y = y - showH - 22;

  // QR code vettoriale verso la pagina della convenzione (stessa lingua).
  const qr = QRCode.create(pageUrl, { errorCorrectionLevel: "M" });
  const n = qr.modules.size;
  const qrSize = 112;
  const quiet = 4;
  const cell = qrSize / (n + quiet * 2);
  const qrX = M;
  const qrTop = y;
  page.drawRectangle({ x: qrX, y: qrTop - qrSize, width: qrSize, height: qrSize, color: rgb(1, 1, 1) });
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (qr.modules.get(r, c)) {
        page.drawRectangle({ x: qrX + (c + quiet) * cell, y: qrTop - (r + quiet + 1) * cell, width: cell + 0.05, height: cell + 0.05, color: C.olive });
      }
    }
  }

  // Accanto al QR: invito, URL, ristorante, contatti La Mora.
  const infoX = qrX + qrSize + 22;
  const infoW = width - M - infoX;
  let iy = qrTop - 12;
  for (const line of wrap(UI[locale].scan, sans, 10, infoW)) {
    page.drawText(line, { x: infoX, y: iy, size: 10, font: sans, color: C.inkSoft });
    iy -= 13;
  }
  const urlShown = pageUrl.replace("https://", "");
  const urlY = iy - 1;
  page.drawText(urlShown, { x: infoX, y: urlY, size: 10, font: sansBold, color: C.raspberry });
  iy -= 24;
  page.drawText(`${UI[locale].restaurant}${locale === "fr" ? " : " : ": "}${CARFAGNA.name}`, { x: infoX, y: iy, size: 10, font: sansBold, color: C.ink });
  iy -= 13;
  page.drawText(CARFAGNA.addressDisplay, { x: infoX, y: iy, size: 10, font: sans, color: C.ink });
  iy -= 22;
  page.drawText(LA_MORA.name, { x: infoX, y: iy, size: 10, font: sansBold, color: C.ink });
  iy -= 13;
  page.drawText(LA_MORA.address, { x: infoX, y: iy, size: 10, font: sans, color: C.ink });
  iy -= 13;
  page.drawText(`${LA_MORA.site} · ${LA_MORA.phone}`, { x: infoX, y: iy, size: 10, font: sans, color: C.ink });

  // Nota in fondo.
  const foot = UI[locale].footer;
  page.drawText(foot, { x: (width - sans.widthOfTextAtSize(foot, 8.5)) / 2, y: 36, size: 8.5, font: sans, color: C.inkSoft });

  // QR e URL cliccabili per chi apre il PDF a schermo: pdf-lib non ha
  // un'API per i link, annotazioni URI scritte a mano.
  const link = (x1, y1, x2, y2) =>
    doc.context.register(
      doc.context.obj({ Type: "Annot", Subtype: "Link", Rect: [x1, y1, x2, y2], Border: [0, 0, 0], A: { Type: "Action", S: "URI", URI: PDFString.of(pageUrl) } }),
    );
  page.node.set(
    PDFName.of("Annots"),
    doc.context.obj([link(qrX, qrTop - qrSize, qrX + qrSize, qrTop), link(infoX, urlY - 3, infoX + sansBold.widthOfTextAtSize(urlShown, 10), urlY + 10)]),
  );

  return doc.save();
}

const logoSrc = await readFile(new URL("../public/images/logo/logo agriturismo la mora.png", import.meta.url));
const logoPng = await sharp(logoSrc).resize({ width: 700 }).png({ compressionLevel: 9, palette: true }).toBuffer();
const outDir = new URL("../public/downloads/", import.meta.url);
await mkdir(outDir, { recursive: true });
for (const locale of LOCALES) {
  const bytes = await buildPdf(locale, logoPng);
  const file = new URL(`la-mora-convenzione-ristorante-carfagna-${locale}.pdf`, outDir);
  await writeFile(file, bytes);
  console.log(`${locale}: ${file.pathname.split("/").pop()} (${Math.round(bytes.length / 1024)} KB)`);
}
