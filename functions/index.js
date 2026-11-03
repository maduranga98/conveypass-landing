const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

const LIMITS = { name: 100, email: 150, company: 120, phone: 30, date: 10, time: 40, sites: 20, message: 1000 };
const REQUIRED = ["name", "email", "company", "date", "time", "sites"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.book = onRequest({ region: "us-central1", maxInstances: 5, cors: false }, async (req, res) => {
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

  try {
    await db.collection("bookings").add({
      ...clean,
      status: "new",
      createdAt: FieldValue.serverTimestamp(),
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("booking write failed", err);
    return res.status(500).json({ error: "server_error" });
  }
});
