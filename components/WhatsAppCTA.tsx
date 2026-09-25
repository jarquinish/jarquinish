"use client";

import { getWhatsappLink, hasWhatsappNumber, type WhatsappSource } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

type Props = {
  source: WhatsappSource;
  label?: string;
  className?: string;
};

const DEFAULT_LABELS: Record<WhatsappSource, string> = {
  charla: "HABLEMOS POR WHATSAPP →",
  taller: "HABLEMOS POR WHATSAPP →",
  ia: "HABLEMOS POR WHATSAPP →",
  general: "HABLEMOS POR WHATSAPP →",
};

export function WhatsAppCTA({ source, label, className }: Props) {
  const href = getWhatsappLink(source);

  if (!href || !hasWhatsappNumber()) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { source })}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-lg border border-ink/20 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-ink transition hover:border-accent hover:text-accent"
      }
    >
      {label ?? DEFAULT_LABELS[source]}
    </a>
  );
}
