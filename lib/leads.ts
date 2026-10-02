import type { UtmParams } from "./utm";
import { profile } from "@/data/profile";

export type LeadType =
  | "charla"
  | "taller"
  | "consultoria"
  | "marketing"
  | "diagnostico"
  | "otro";

export type LeadContact = {
  nombre: string;
  empresa?: string;
  cargo?: string;
  email: string;
  whatsapp?: string;
  ciudad?: string;
};

/**
 * Free-form bag for the fields that change per leadType (fecha del evento,
 * numero de participantes, area, presupuesto, etc). Kept loose on purpose:
 * new service types shouldn't require touching the transport layer below.
 */
export type LeadRequirements = Record<string, string | number | boolean | undefined>;

export type LeadPayload = {
  leadType: LeadType;
  source: string;
  campaign?: string;
  contact: LeadContact;
  requirements?: LeadRequirements;
  utm?: UtmParams;
};

export type SubmitLeadResult = {
  ok: boolean;
  error?: string;
};

const LEAD_TYPE_LABELS: Record<LeadType, string> = {
  charla: "Charla / Conferencia",
  taller: "Taller / Capacitación",
  consultoria: "Consultoría de IA",
  marketing: "Proyecto de Marketing / Branding",
  diagnostico: "Diagnóstico IA + Automatización",
  otro: "Otro",
};

/**
 * Single choke point for outbound leads. Forwards to whatever generic
 * webhook is configured (Zapier / Make / n8n / a CRM's native inbound
 * webhook) and/or emails the lead directly via Resend — both are optional
 * and independent, so either, both, or neither can be active without
 * touching call sites.
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!webhookUrl && !resendApiKey) {
    // eslint-disable-next-line no-console
    console.log("[leads] no hay transporte configurado (LEADS_WEBHOOK_URL / RESEND_API_KEY), lead solo en logs:", {
      leadType: payload.leadType,
      source: payload.source,
    });
    return { ok: true };
  }

  const tasks: Promise<SubmitLeadResult>[] = [];
  if (webhookUrl) tasks.push(forwardToWebhook(webhookUrl, payload));
  if (resendApiKey) tasks.push(sendLeadEmail(resendApiKey, payload));

  const results = await Promise.all(tasks);
  const ok = results.some((r) => r.ok);
  const errors = results.filter((r) => !r.ok).map((r) => r.error);

  return ok ? { ok: true } : { ok: false, error: errors.join(" · ") };
}

async function forwardToWebhook(webhookUrl: string, payload: LeadPayload): Promise<SubmitLeadResult> {
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return { ok: false, error: `Webhook respondió ${response.status}` };
    }
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Error desconocido al enviar el webhook",
    };
  }
}

async function sendLeadEmail(apiKey: string, payload: LeadPayload): Promise<SubmitLeadResult> {
  const to = process.env.LEADS_EMAIL_TO || profile.contact.email;
  const from = process.env.LEADS_EMAIL_FROM || "Miguel Jarquín — Sitio <onboarding@resend.dev>";
  const leadLabel = LEAD_TYPE_LABELS[payload.leadType] ?? payload.leadType;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: payload.contact.email,
        subject: `Nuevo lead (${leadLabel}): ${payload.contact.nombre}`,
        html: buildLeadEmailHtml(payload, leadLabel),
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      return { ok: false, error: `Resend respondió ${response.status}: ${body.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Error desconocido al enviar el correo",
    };
  }
}

function prettifyKey(key: string): string {
  const withSpaces = key.replace(/([a-z])([A-Z])/g, "$1 $2");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:4px 12px 4px 0;color:#667;white-space:nowrap;vertical-align:top;"><strong>${escapeHtml(label)}</strong></td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`;
}

function buildLeadEmailHtml(payload: LeadPayload, leadLabel: string): string {
  const { contact, requirements, utm, source, campaign } = payload;

  const contactRows = [
    row("Nombre", contact.nombre),
    contact.empresa ? row("Empresa", contact.empresa) : "",
    contact.cargo ? row("Cargo", contact.cargo) : "",
    row("Email", contact.email),
    contact.whatsapp ? row("WhatsApp", contact.whatsapp) : "",
    contact.ciudad ? row("Ciudad / País", contact.ciudad) : "",
  ]
    .filter(Boolean)
    .join("");

  const requirementRows = Object.entries(requirements ?? {})
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([key, value]) => row(prettifyKey(key), String(value)))
    .join("");

  const utmRows = utm
    ? Object.entries(utm)
        .filter(([, value]) => value)
        .map(([key, value]) => row(key, String(value)))
        .join("")
    : "";

  return `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 560px; color:#111;">
      <p style="font-size:12px; text-transform:uppercase; letter-spacing:0.05em; color:#888; margin-bottom:4px;">
        ${escapeHtml(leadLabel)} · fuente: ${escapeHtml(source)}${campaign ? ` · campaña: ${escapeHtml(campaign)}` : ""}
      </p>
      <h2 style="margin:0 0 16px;">Nuevo lead: ${escapeHtml(contact.nombre)}</h2>
      <table cellpadding="0" cellspacing="0" style="font-size:14px; border-collapse:collapse;">
        ${contactRows}
      </table>
      ${
        requirementRows
          ? `<h3 style="margin:20px 0 8px; font-size:14px;">Detalles de la solicitud</h3>
             <table cellpadding="0" cellspacing="0" style="font-size:14px; border-collapse:collapse;">${requirementRows}</table>`
          : ""
      }
      ${
        utmRows
          ? `<h3 style="margin:20px 0 8px; font-size:13px; color:#888;">Origen (UTM)</h3>
             <table cellpadding="0" cellspacing="0" style="font-size:12px; color:#888; border-collapse:collapse;">${utmRows}</table>`
          : ""
      }
    </div>
  `;
}
