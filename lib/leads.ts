import type { UtmParams } from "./utm";

export type LeadType =
  | "charla"
  | "taller"
  | "consultoria"
  | "marketing"
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

/**
 * Single choke point for outbound leads. Today it forwards to whatever
 * generic webhook is configured (Zapier / Make / n8n / a CRM's native
 * inbound-webhook endpoint) so no CRM SDK has to be installed up front.
 * Swapping to a native HubSpot/Salesforce/Pipedrive/Brevo integration
 * later means adding an adapter here — call sites never change.
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;

  if (!webhookUrl) {
    // eslint-disable-next-line no-console
    console.log("[leads] LEADS_WEBHOOK_URL not configured, lead logged only:", {
      leadType: payload.leadType,
      source: payload.source,
    });
    return { ok: true };
  }

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
      error: error instanceof Error ? error.message : "Error desconocido al enviar el lead",
    };
  }
}
