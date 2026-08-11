import Link from "next/link";
import { ServicesSection } from "@/components/ServicesSection";
import { InlineCTA } from "@/components/InlineCTA";
import { FinalCTA } from "@/components/FinalCTA";
import { brands, expertiseAreas, profile, teachingInstitutions } from "@/data/profile";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold uppercase leading-tight tracking-tight text-ink sm:text-6xl">
            Miguel
            <br />
            <span className="text-accent">Jarquín</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink/70">{profile.title}</p>
          <p className="mx-auto mt-4 max-w-xl text-sm font-semibold uppercase tracking-wide text-ink/50">
            {profile.tagline.join(" ")}
          </p>
        </div>
      </section>

      {/* Speaker */}
      <section id="speaker" className="border-t border-ink/10 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold uppercase text-ink sm:text-4xl">
            Sobre Miguel
          </h2>

          <blockquote className="mx-auto mt-8 max-w-2xl text-center text-xl font-medium text-ink sm:text-2xl">
            “{profile.quote}”
          </blockquote>

          <ul className="mx-auto mt-8 max-w-2xl space-y-2 text-center text-sm text-ink/70">
            {profile.education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="mt-12">
            <p className="text-center text-xs font-semibold uppercase tracking-wide text-ink/50">
              Docencia
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {teachingInstitutions.map((institution) => (
                <span
                  key={institution}
                  className="rounded-full border border-ink/15 px-4 py-1.5 text-sm text-ink/80"
                >
                  {institution}
                </span>
              ))}
            </div>
          </div>
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
          <h2 className="text-2xl font-bold uppercase text-ink sm:text-4xl">Análisis de DATA</h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">{profile.dataStatement}</p>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            Aplico esa misma disciplina de datos para ayudar a empresas a identificar dónde la
            inteligencia artificial puede reducir trabajo manual, mejorar la experiencia del
            cliente y generar nuevas oportunidades de negocio.
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
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
            {expertiseAreas.map((area) => (
              <span
                key={area.name}
                className="rounded-full border border-ink/15 bg-white px-5 py-2 text-sm font-semibold uppercase tracking-wide text-ink/80"
              >
                {area.name}
              </span>
            ))}
          </div>
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
          <h2 className="text-2xl font-bold uppercase text-ink sm:text-4xl">
            Experiencia en marcas líderes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            Marcas y organizaciones con las que he trabajado en estrategia, posicionamiento y
            comunicación.
          </p>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
            {brands.map((brand) => (
              <span
                key={brand}
                className="rounded-full border border-ink/10 px-4 py-1.5 text-sm text-ink/70"
              >
                {brand}
              </span>
            ))}
          </div>
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
