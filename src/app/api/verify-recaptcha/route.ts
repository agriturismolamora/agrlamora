import { NextResponse } from "next/server";

const SCORE_THRESHOLD = 0.5;

/* Verifica server-side del token reCAPTCHA v3: la chiave segreta non deve
   mai raggiungere il browser, per questo la chiamata a Google avviene qui
   e non nel componente client. */
export async function POST(request: Request) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ success: false, error: "not_configured" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const token = body?.token;
  if (!token) {
    return NextResponse.json({ success: false, error: "missing_token" }, { status: 400 });
  }

  const params = new URLSearchParams({ secret, response: token });
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  const data = await res.json();

  const success = Boolean(data.success) && (typeof data.score !== "number" || data.score >= SCORE_THRESHOLD);
  return NextResponse.json({ success });
}
