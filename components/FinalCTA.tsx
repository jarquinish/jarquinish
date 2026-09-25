import { ServiceCta } from "./ServiceCta";
import { Reveal } from "./motion/Reveal";

const PATHS = [
  {
    variant: "charla" as const,
    title: "CHARLA",
    description: "Inspira a tu audiencia.",
    label: "CONTRATA UNA CHARLA →",
    href: "/charlas",
  },
  {
    variant: "taller" as const,
    title: "TALLER",
    description: "Desarrolla nuevas capacidades en tu equipo.",
    label: "COTIZA UN TALLER →",
    href: "/talleres",
  },
  {
    variant: "consultoria" as const,
    title: "IA",
    description: "Transforma un proceso de tu negocio.",
    label: "HABLEMOS DE IA →",
    href: "/consultoria-ia",
  },
];

export function FinalCTA() {
  return (
    <section className="bg-ink px-6 py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
            Las buenas ideas
            <br />
            cambian conversaciones.
            <br />
            <span className="text-accent">Las buenas implementaciones</span>
            <br />
            <span className="text-accent">cambian negocios.</span>
          </h2>
          <p className="mt-8 text-xl text-paper/80">¿Qué quieres construir?</p>
        </Reveal>

        <div className="mt-14 grid gap-6 text-left sm:grid-cols-3">
          {PATHS.map((path, i) => (
            <Reveal key={path.title} delay={i * 0.1} className="h-full">
              <div className="h-full rounded-2xl border border-paper/15 p-8 transition duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:bg-white/5">
                <h3 className="text-2xl font-bold uppercase">{path.title}</h3>
                <p className="mt-2 text-paper/70">{path.description}</p>
                <div className="mt-6">
                  <ServiceCta
                    variant={path.variant}
                    href={path.href}
                    label={path.label}
                    placement="final_cta"
                    className="inline-flex items-center gap-2 rounded-lg bg-paper px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-accent hover:text-paper"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 border-t border-paper/15 pt-10" delay={0.15}>
          <p className="text-lg text-paper/80">O simplemente tienes una buena idea.</p>
          <a
            href="/contacto"
            className="mt-4 inline-block text-sm font-semibold uppercase tracking-wide text-accent underline-offset-4 hover:underline"
          >
            CUÉNTAMELA →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
