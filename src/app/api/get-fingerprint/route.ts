import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lang, tz, screen, platform, osVersion, deviceModel } = body || {};

    // IP từ header
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "";

    // Ghép object để hash
    const obj = {
      lang: (lang || "").split("-")[0].toLowerCase(),
      tz: tz || "UTC",
      ip: ip,
      platform: platform,
    };

    const raw = JSON.stringify(obj);
    const fingerprint = crypto.createHash("sha256").update(raw).digest("hex");
    
    return NextResponse.json({
      fingerprint,
      raw: obj, // gửi kèm để debug
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
