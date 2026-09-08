import Link from "next/link";
import Image from "next/image";
import { ServicesSection } from "@/components/ServicesSection";
import { InlineCTA } from "@/components/InlineCTA";
import { FinalCTA } from "@/components/FinalCTA";
import {
  brands,
  careerTimeline,
  expertiseAreas,
  profile,
  successCases,
  summaryStats,
  teachingInstitutions,
} from "@/data/profile";
import { CartIcon, ChartIcon, MegaphoneIcon, PeopleIcon, TargetIcon } from "@/components/icons";

const EXPERTISE_ICONS: Record<string, typeof TargetIcon> = {
  "Estrategia de marca": TargetIcon,
  "Posicionamiento de marca": ChartIcon,
  "E-commerce y retail": CartIcon,
  "Marketing digital": MegaphoneIcon,
  "Comunicación estratégica": PeopleIcon,
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(255,90,31,0.14), transparent 45%), radial-gradient(circle at 85% 15%, rgba(11,11,12,0.06), transparent 40%), radial-gradient(circle 1.5px, rgba(11,11,12,0.14) 1.5px, transparent 1.5px)",
            backgroundSize: "auto, auto, 28px 28px",
          }}
        />
        <div className="mx-auto grid max-w-5xl items-center gap-12 sm:grid-cols-2">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold uppercase leading-tight tracking-tight text-ink sm:text-6xl">
              Miguel
              <br />
              <span className="text-accent">Jarquín</span>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-lg text-ink/70 sm:mx-0">{profile.title}</p>
            <p className="mx-auto mt-4 max-w-sm text-sm font-semibold uppercase tracking-wide text-ink/50 sm:mx-0">
              {profile.tagline.join(" ")}
            </p>
          </div>

          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/miguel/miguel-jarquin-hero.jpg"
              alt="Miguel Jarquín"
              fill
              priority
              sizes="(min-width: 640px) 384px, 90vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="relative mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-6 text-center sm:grid-cols-4">
          {summaryStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-accent sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-ink/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Speaker */}
      <section id="speaker" className="border-t border-ink/10 px-6 py-20">
        <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-[auto_1fr] sm:items-start">
          <div className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-full sm:mx-0">
            <Image
              src="/miguel/miguel-jarquin-sonriendo.jpg"
              alt="Miguel Jarquín sonriendo"
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold uppercase text-ink sm:text-4xl">Sobre Miguel</h2>

            <p className="mt-6 text-ink/70">{profile.summary}</p>

            <blockquote className="mt-6 text-xl font-medium text-ink sm:text-2xl">
              “{profile.quote}”
            </blockquote>

            <Image
              src="/firma-miguel-jarquin.png"
              alt="Firma de Miguel Jarquín"
              width={964}
              height={916}
              className="mt-4 h-20 w-auto"
            />

            <ul className="mt-6 space-y-2 text-sm text-ink/70">
              {profile.education.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">Docencia</p>
              <div className="mt-3 flex flex-wrap gap-2">
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

            <div className="mt-12">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                Trayectoria profesional
              </p>
              <ol className="mt-4 space-y-4 border-l-2 border-ink/10 pl-5">
                {careerTimeline.map((step) => (
                  <li key={step.period}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                      {step.period}
                    </p>
                    <p className="text-sm font-medium text-ink">{step.role}</p>
                    <p className="text-sm text-ink/60">{step.org}</p>
                  </li>
                ))}
              </ol>
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
            {expertiseAreas.map((area) => {
              const Icon = EXPERTISE_ICONS[area.name];
              return (
                <span
                  key={area.name}
                  className="flex items-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-2 text-sm font-semibold uppercase tracking-wide text-ink/80"
                >
                  {Icon && <Icon className="h-4 w-4 text-accent" />}
                  {area.name}
                </span>
              );
            })}
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
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold uppercase text-ink sm:text-4xl">Casos de éxito</h2>
            <p className="mx-auto mt-4 max-w-2xl text-ink/70">
              Proyectos e implementaciones que he liderado en estrategia, marca y tecnología.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {successCases.map((item) => (
              <div key={item.name} className="rounded-2xl border border-ink/10 bg-white p-6">
                <h3 className="font-bold uppercase text-ink">{item.name}</h3>
                <p className="mt-2 text-sm text-ink/70">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
              Marcas y organizaciones con las que he colaborado
            </p>
            <div className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2">
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
        </div>
      </section>

      <section className="border-t border-ink/10 px-6 py-16 text-center">
        <p className="mx-auto max-w-2xl text-lg font-medium text-ink sm:text-xl">
          “{profile.vision}”
        </p>
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
