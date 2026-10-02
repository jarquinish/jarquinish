"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/diagnostico", label: "Diagnóstico IA" },
  { href: "/charlas", label: "Charlas" },
  { href: "/talleres", label: "Talleres" },
  { href: "/consultoria-ia", label: "Consultoría de IA" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm font-bold uppercase tracking-wide text-ink" onClick={() => setOpen(false)}>
          Miguel Jarquín
        </Link>
        <nav className="hidden gap-8 text-sm font-medium text-ink/70 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-gold">
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="flex h-9 w-9 items-center justify-center text-ink md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.8}>
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink/10 bg-paper px-6 py-4 md:hidden">
          <ul className="flex flex-col divide-y divide-ink/10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium text-ink/80 transition hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
