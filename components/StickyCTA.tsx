"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

const PANEL_OPTIONS = [
  { label: "Contratar una charla", href: "/charlas", event: "cta_charla_click" as const },
  { label: "Cotizar un taller", href: "/talleres", event: "cta_taller_click" as const },
  { label: "Consultoría de IA", href: "/consultoria-ia", event: "cta_consultoria_click" as const },
  { label: "Otro proyecto", href: "/contacto", event: undefined },
];

export function StickyCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop: discreet floating button + panel */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        {open && (
          <div className="mb-3 w-64 rounded-xl border border-ink/10 bg-white p-2 shadow-xl">
            {PANEL_OPTIONS.map((option) => (
              <Link
                key={option.href}
                href={option.href}
                onClick={() => {
                  if (option.event) trackEvent(option.event, { placement: "sticky_cta" });
                  setOpen(false);
                }}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-ink transition hover:bg-paper"
              >
                {option.label}
              </Link>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full bg-ink px-5 py-3 text-xs font-semibold uppercase tracking-wide text-paper shadow-lg transition hover:bg-accent"
        >
          {open ? "Cerrar" : "Trabajemos juntos"}
        </button>
      </div>

      {/* Mobile: fixed bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 p-3 backdrop-blur md:hidden">
        <Link
          href="/contacto"
          className="block w-full rounded-lg bg-ink py-3 text-center text-sm font-semibold uppercase tracking-wide text-paper"
        >
          HABLEMOS →
        </Link>
      </div>
    </>
  );
}
