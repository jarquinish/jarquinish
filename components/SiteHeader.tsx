import Link from "next/link";

const NAV_LINKS = [
  { href: "/charlas", label: "Charlas" },
  { href: "/talleres", label: "Talleres" },
  { href: "/consultoria-ia", label: "Consultoría de IA" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm font-bold uppercase tracking-wide text-ink">
          Miguel Jarquín
        </Link>
        <nav className="hidden gap-8 text-sm font-medium text-ink/70 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
