export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page?: string;
  referrer?: string;
};

const UTM_STORAGE_KEY = "jj_utm_context";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/**
 * Captures UTM params + landing page + referrer on first touch and persists
 * them for the session, so a lead submitted several pages later still
 * carries the campaign that brought the visitor in.
 */
export function captureUtmContext(): UtmParams {
  if (typeof window === "undefined") return {};

  const existing = readUtmContext();
  const params = new URLSearchParams(window.location.search);
  const hasNewUtm = UTM_KEYS.some((key) => params.has(key));

  if (!hasNewUtm && existing) {
    return existing;
  }

  const context: UtmParams = {
    ...existing,
    landing_page: existing?.landing_page ?? window.location.pathname,
    referrer: existing?.referrer ?? document.referrer ?? undefined,
  };

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) context[key] = value;
  }

  try {
    window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(context));
  } catch {
    // sessionStorage unavailable (privacy mode, etc.) — degrade silently.
  }

  return context;
}

export function readUtmContext(): UtmParams | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : null;
  } catch {
    return null;
  }
}
