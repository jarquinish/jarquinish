import Link from "next/link";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 px-6 py-12 pb-24 text-sm text-ink/60 md:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Miguel Jarquín</p>
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/charlas" className="hover:text-ink">
            Charlas
          </Link>
          <Link href="/talleres" className="hover:text-ink">
            Talleres
          </Link>
          <Link href="/consultoria-ia" className="hover:text-ink">
            Consultoría de IA
          </Link>
          <Link href="/contacto" className="hover:text-ink">
            Contacto
          </Link>
          <Link href="/aviso-de-privacidad" className="hover:text-ink">
            Aviso de privacidad
          </Link>
        </div>
        <SocialLinks className="flex items-center gap-4 text-ink/60" />
      </div>
    </footer>
  );
}
