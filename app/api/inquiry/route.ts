import { NextResponse } from "next/server";
import { site } from "@/data/site";

export const runtime = "nodejs";

/**
 * Inquiry delivery. Receives the contact form, emails the office through
 * Resend, and sends the visitor a short acknowledgement.
 *
 * Environment (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY   required — from resend.com
 *   INQUIRY_TO       optional — where inquiries land; defaults to the site email
 *   INQUIRY_FROM     optional — sender, e.g. "HAIDER ALI <inquiries@officeofali.com>"
 *                    (the domain must be verified in Resend; the default
 *                    onboarding@resend.dev sender only delivers to the
 *                    Resend account owner's address)
 */
type Payload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  inquiryType: string;
  timing?: string;
  message: string;
  regarding?: string;
  company_website?: string;
};

const esc = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Send through Resend, retrying briefly when its rate limit answers 429. */
async function send(key: string, body: Record<string, unknown>, attempt = 0): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (res.ok) return;
  if (res.status === 429 && attempt < 3) {
    await wait(700 * (attempt + 1));
    return send(key, body, attempt + 1);
  }
  throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill it, people never see it. Pretend success.
  if (data.company_website) return NextResponse.json({ ok: true });

  const name = (data.name ?? "").trim().slice(0, 200);
  const email = (data.email ?? "").trim().slice(0, 200);
  const message = (data.message ?? "").trim().slice(0, 5000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    return NextResponse.json({ error: "Please include your name, a valid email and a message." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "not-configured" }, { status: 503 });
  }
  const to = process.env.INQUIRY_TO ?? site.contact.email;
  const from = process.env.INQUIRY_FROM ?? `${site.wordmark} <onboarding@resend.dev>`;

  const rows: [string, string | undefined][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", data.phone?.trim()],
    ["Company", data.company?.trim()],
    ["Inquiry", data.inquiryType],
    ["Regarding", data.regarding?.trim()],
    ["Timing", data.timing?.trim()],
  ];
  const present = rows.filter(([, v]) => v);
  const subject = `${data.inquiryType || "Inquiry"}${data.regarding ? ` — ${data.regarding}` : ""} — ${name}`;

  const text = [...present.map(([k, v]) => `${k}: ${v}`), "", message].join("\n");
  const html = `
    <div style="font-family:Inter,Helvetica,Arial,sans-serif;color:#171715;max-width:560px">
      <p style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#7c756b;margin:0 0 20px">New inquiry · ${esc(site.wordmark)}</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${present
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px 8px 0;color:#7c756b;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 0;border-bottom:1px solid #d9d3c8">${esc(v as string)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="font-size:15px;line-height:1.7;white-space:pre-wrap;margin:24px 0 0">${esc(message)}</p>
      <p style="font-size:12px;color:#7c756b;margin:32px 0 0">Reply to this email to answer ${esc(name)} directly.</p>
    </div>`;

  const fallbackFrom = `${site.wordmark} <onboarding@resend.dev>`;
  let sender = from;
  try {
    await send(key, { from, to: [to], reply_to: email, subject, text, html });
  } catch (err) {
    // A custom INQUIRY_FROM on a domain Resend has not verified yet is refused.
    // Never lose the inquiry over that: retry with the default sender.
    if (from !== fallbackFrom) {
      console.warn("[inquiry] custom sender refused, retrying with default:", err instanceof Error ? err.message : err);
      try {
        await send(key, { from: fallbackFrom, to: [to], reply_to: email, subject, text, html });
        sender = fallbackFrom;
      } catch (err2) {
        console.error("[inquiry] delivery failed:", err2);
        return NextResponse.json({ error: "delivery-failed" }, { status: 502 });
      }
    } else {
      console.error("[inquiry] delivery failed:", err);
      return NextResponse.json({ error: "delivery-failed" }, { status: 502 });
    }
  }

  // Acknowledgement to the visitor. Best effort: a failure here never fails
  // the inquiry itself. Spaced from the first send for Resend's rate limit.
  let ack: "sent" | "failed" = "failed";
  let ackReason = "";
  await wait(600);
  try {
    const first = name.split(/\s+/)[0];
    const about = data.regarding?.trim() ? ` about ${data.regarding.trim()}` : "";
    await send(key, {
      from: sender,
      to: [email],
      subject: `Thank you, ${first} — ${site.wordmark}`,
      text: `Dear ${first},\n\nThank you for your inquiry${about}. It has reached us and will be answered personally, usually within one business day.\n\nIf it is time-sensitive, call ${site.contact.phone}.\n\n${site.name}\n${site.descriptor}\n${site.region}\n${site.url}`,
      html: `
        <div style="font-family:Inter,Helvetica,Arial,sans-serif;color:#171715;max-width:560px;line-height:1.7;font-size:15px">
          <p style="font-size:11px;letter-spacing:.32em;text-transform:uppercase;margin:0 0 28px">${esc(site.wordmark)}</p>
          <p>Dear ${esc(first)},</p>
          <p>Thank you for your inquiry${esc(about)}. It has reached us and will be answered personally, usually within one business day.</p>
          <p>If it is time-sensitive, call <a href="${site.contact.phoneHref}" style="color:#171715">${esc(site.contact.phone)}</a>.</p>
          <p style="margin-top:32px;color:#7c756b;font-size:13px">${esc(site.name)}<br>${esc(site.descriptor)}<br>${esc(site.region)}<br><a href="${site.url}" style="color:#7c756b">${esc(site.url.replace(/^https?:\/\//, ""))}</a></p>
        </div>`,
    });
    ack = "sent";
  } catch (err) {
    ackReason = err instanceof Error ? err.message : String(err);
    console.warn("[inquiry] acknowledgement not sent:", ackReason);
  }

  // `ack` and `sender` are diagnostics: they say whether the visitor's
  // confirmation went out, and whether it came from the firm's own address
  // or the fallback. The inquiry itself has already been delivered either way.
  return NextResponse.json({
    ok: true,
    ack,
    sender: sender === fallbackFrom ? "fallback" : "domain",
    ...(ack === "failed" ? { ackReason: ackReason.slice(0, 200) } : {}),
  });
}
