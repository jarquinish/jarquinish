"use client";

import Link from "next/link";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

type ServiceCtaVariant = "charla" | "taller" | "consultoria";

const EVENT_BY_VARIANT: Record<ServiceCtaVariant, AnalyticsEvent> = {
  charla: "cta_charla_click",
  taller: "cta_taller_click",
  consultoria: "cta_consultoria_click",
};

type Props = {
  variant: ServiceCtaVariant;
  href: string;
  label: string;
  placement: string;
  className?: string;
};

export function ServiceCta({ variant, href, label, placement, className }: Props) {
  return (
    <Link
      href={href}
      onClick={() => trackEvent(EVENT_BY_VARIANT[variant], { placement })}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-4 text-sm font-semibold uppercase tracking-wide text-paper transition hover:bg-accent"
      }
    >
      {label}
    </Link>
  );
}
