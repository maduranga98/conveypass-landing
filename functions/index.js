const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret, defineString } = require("firebase-functions/params");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const nodemailer = require("nodemailer");

initializeApp();
const db = getFirestore();

// Set once with: firebase functions:secrets:set SMTP_USER / SMTP_PASS
const SMTP_USER = defineSecret("SMTP_USER");
const SMTP_PASS = defineSecret("SMTP_PASS");
const SMTP_HOST = defineString("SMTP_HOST", { default: "smtp.gmail.com" });
const SMTP_PORT = defineString("SMTP_PORT", { default: "465" });
const NOTIFY_TO = defineString("NOTIFY_TO", { default: "info@lumoraventures.com" });

const LIMITS = { name: 100, email: 150, company: 120, phone: 30, date: 10, time: 40, sites: 20, message: 1000 };
const REQUIRED = ["name", "email", "company", "date", "time", "sites"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LABELS = {
  name: "Name", email: "Email", company: "Company", phone: "Phone",
  date: "Preferred date", time: "Preferred time", sites: "Sites", message: "Message",
};

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

async function sendNotification(clean) {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST.value(),
    port: Number(SMTP_PORT.value()),
    secure: Number(SMTP_PORT.value()) === 465,
    auth: { user: SMTP_USER.value(), pass: SMTP_PASS.value() },
  });
  const rows = Object.keys(LABELS).filter((k) => clean[k]);
  await transporter.sendMail({
    from: `"ConvoyPass website" <${SMTP_USER.value()}>`,
    to: NOTIFY_TO.value(),
    replyTo: `"${clean.name.replace(/["\r\n]/g, "")}" <${clean.email}>`,
    subject: `New demo request: ${clean.company}`.replace(/[\r\n]+/g, " "),
    text: rows.map((k) => `${LABELS[k]}: ${clean[k]}`).join("\n"),
    html:
      `<h2 style="font-family:sans-serif">New demo request</h2>` +
      `<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">` +
      rows
        .map(
          (k) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#666;vertical-align:top">${LABELS[k]}</td>` +
            `<td style="padding:4px 0;white-space:pre-wrap">${esc(clean[k])}</td></tr>`
        )
        .join("") +
      `</table>`,
  });
}

exports.book = onRequest(
  { region: "us-central1", maxInstances: 5, cors: false, secrets: [SMTP_USER, SMTP_PASS] },
  async (req, res) => {
    if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

    const body = typeof req.body === "object" && req.body ? req.body : {};

    // Honeypot: bots fill this in. Pretend success.
    if (body.website) return res.status(200).json({ ok: true });

    const clean = {};
    for (const [key, max] of Object.entries(LIMITS)) {
      clean[key] = String(body[key] ?? "").trim().slice(0, max);
    }
    for (const key of REQUIRED) {
      if (!clean[key]) return res.status(400).json({ error: "missing_" + key });
    }
    if (!EMAIL.test(clean.email)) return res.status(400).json({ error: "invalid_email" });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(clean.date)) return res.status(400).json({ error: "invalid_date" });

    // Save and email in parallel; succeed if at least one worked so no lead is lost.
    const [saved, mailed] = await Promise.allSettled([
      db.collection("bookings").add({ ...clean, status: "new", createdAt: FieldValue.serverTimestamp() }),
      sendNotification(clean),
    ]);
    if (saved.status === "rejected") console.error("booking write failed", saved.reason);
    if (mailed.status === "rejected") console.error("booking email failed", mailed.reason);

    if (saved.status === "rejected" && mailed.status === "rejected") {
      return res.status(500).json({ error: "server_error" });
    }
    return res.status(200).json({ ok: true });
  }
);
