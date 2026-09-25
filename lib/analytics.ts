/**
 * Thin analytics abstraction. Swap the `dispatch` implementation for
 * GA4 / Meta Pixel / server-side tracking without touching call sites.
 * Never pass personal data (name, email, phone) as event params here —
 * only booleans, counts, and non-identifying labels.
 */
export type AnalyticsEvent =
  | "cta_charla_click"
  | "cta_taller_click"
  | "cta_consultoria_click"
  | "whatsapp_click"
  | "form_start"
  | "form_complete"
  | "speaker_page_view"
  | "consulting_page_view";

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") return;

  const safePayload = sanitizePayload(payload);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...safePayload });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, safePayload);
  }

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug(`[analytics] ${event}`, safePayload);
  }
}

const PII_KEYS = ["email", "phone", "whatsapp", "name", "nombre", "telefono", "mensaje", "message"];

function sanitizePayload(payload: AnalyticsPayload): AnalyticsPayload {
  const clean: AnalyticsPayload = {};
  for (const [key, value] of Object.entries(payload)) {
    if (PII_KEYS.includes(key.toLowerCase())) continue;
    clean[key] = value;
  }
  return clean;
}
