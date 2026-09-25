import Link from "next/link";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 px-6 py-12 pb-24 text-sm text-ink/60 md:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Miguel Jarquín</p>
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/charlas" className="hover:text-gold">
            Charlas
          </Link>
          <Link href="/talleres" className="hover:text-gold">
            Talleres
          </Link>
          <Link href="/consultoria-ia" className="hover:text-gold">
            Consultoría de IA
          </Link>
          <Link href="/contacto" className="hover:text-gold">
            Contacto
          </Link>
          <Link href="/aviso-de-privacidad" className="hover:text-gold">
            Aviso de privacidad
          </Link>
        </div>
        <SocialLinks className="flex items-center gap-4 text-ink/60" />
      </div>
    </footer>
  );
}
