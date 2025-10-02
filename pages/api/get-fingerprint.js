// pages/api/device-fingerprint.js
import crypto from "crypto";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // IP từ header hoặc socket
  const ip =
    req.headers["x-forwarded-for"] || req.connection?.remoteAddress || "";
  const { lang, tz, screen, platform, osVersion, deviceModel } = req.body || {};

  // Ghép object để hash
  const obj = {
    lang: (lang || "").split("-")[0].toLowerCase(),
    tz: tz || "UTC",
    ip: ip,
    platform: platform,
  };

  const raw = JSON.stringify(obj);
  const fingerprint = crypto.createHash("sha256").update(raw).digest("hex");
  res.status(200).json({
    fingerprint,
    raw: obj, // gửi kèm để debug
  });
}
