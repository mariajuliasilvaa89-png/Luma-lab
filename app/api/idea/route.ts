import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

  if (!webhookUrl || !secret) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  let body: { idea?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const idea = (body.idea ?? "").toString().trim();
  if (!idea || idea.length > 1000) {
    return NextResponse.json({ ok: false, error: "invalid_idea" }, { status: 400 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea, secret, source: "home" })
    });

    const data = await response.json();
    if (!data.ok) {
      return NextResponse.json({ ok: false, error: data.error ?? "webhook_error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "network_error" }, { status: 502 });
  }
}
