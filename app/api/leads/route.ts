import { NextResponse } from "next/server";
import { submitLead, type LeadPayload } from "@/lib/leads";

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  if (!payload?.leadType || !payload?.contact?.nombre || !payload?.contact?.email) {
    return NextResponse.json({ ok: false, error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const result = await submitLead(payload);

  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
