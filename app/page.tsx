import Link from "next/link";
import { ServicesSection } from "@/components/ServicesSection";
import { InlineCTA } from "@/components/InlineCTA";
import { FinalCTA } from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold uppercase leading-tight tracking-tight text-ink sm:text-6xl">
            Miguel Jarquín
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink/70">
            Marketing, marca personal e inteligencia artificial aplicada a negocios reales.
          </p>
        </div>
      </section>

      {/* Speaker */}
      <section id="speaker" className="border-t border-ink/10 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold uppercase text-ink sm:text-4xl">Speaker</h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            Conferencista sobre inteligencia artificial, marketing y construcción de marca para
            empresas, asociaciones y eventos.
          </p>
        </div>
      </section>
      <InlineCTA
        variant="charla"
        href="/charlas"
        label="CONTRATA UNA CHARLA →"
        placement="after_speaker"
        heading="¿Buscas inspirar a tu audiencia con un tema de IA, marketing o marca?"
      />

      {/* IA */}
      <section id="ia" className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold uppercase text-ink sm:text-4xl">
            Inteligencia Artificial
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            Ayudo a empresas a identificar dónde la IA puede reducir trabajo manual, mejorar la
            experiencia del cliente y generar nuevas oportunidades de negocio.
          </p>
        </div>
      </section>
      <InlineCTA
        variant="consultoria"
        href="/consultoria-ia"
        label="HABLEMOS DE TU PROYECTO DE IA →"
        placement="after_ia_section"
        heading="¿Tienes un proceso que podría automatizarse con IA?"
      />

      {/* Expertise */}
      <section id="expertise" className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold uppercase text-ink sm:text-4xl">Expertise</h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            Marketing, marca, ventas y tecnología, aplicados de forma práctica en talleres para
            equipos.
          </p>
        </div>
      </section>
      <InlineCTA
        variant="taller"
        href="/talleres"
        label="COTIZA UN TALLER →"
        placement="after_expertise"
        heading="¿Quieres que tu equipo desarrolle habilidades prácticas de IA?"
      />

      <ServicesSection />

      {/* Projects */}
      <section id="projects" className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold uppercase text-ink sm:text-4xl">Proyectos</h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            Marcas, campañas e implementaciones en las que he trabajado.
          </p>
        </div>
      </section>
      <div className="border-y border-ink/10 bg-paper px-6 py-12 text-center sm:py-16">
        <p className="mx-auto max-w-2xl text-xl font-medium text-ink sm:text-2xl">
          ¿Tienes un proyecto en mente?
        </p>
        <div className="mt-6">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-4 text-sm font-semibold uppercase tracking-wide text-paper transition hover:bg-accent"
          >
            QUIERO TRABAJAR CONTIGO →
          </Link>
        </div>
      </div>

      <FinalCTA />
    </>
  );
}
