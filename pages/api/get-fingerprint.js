// pages/api/device-fingerprint.js
import crypto from "crypto";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // IP từ header hoặc socket
  const ip =
    req.headers["x-forwarded-for"] || req.connection?.remoteAddress || "";

  // Lấy data client gửi (Flutter hoặc web)
  const { lang, tz, screen, platform, osVersion, deviceModel } = req.body || {};

  // Ghép object để hash
  const obj = {
    lang: (lang || "").toLowerCase(),
    tz: tz || "UTC",
    ip: ip,
    platform: platform,
  };

  const raw = JSON.stringify(obj);
  console.log("raw:", raw);
  const fingerprint = crypto.createHash("sha256").update(raw).digest("hex");
  console.log("fingerprint:", fingerprint);
  res.status(200).json({
    fingerprint,
    raw: obj, // gửi kèm để debug
  });
}
