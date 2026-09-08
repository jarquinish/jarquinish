import type { Metadata } from "next";
import {
  consultingFlow,
  consultingMethodology,
  consultingPrinciples,
  consultingSolutions,
} from "@/data/services";
import { ServiceCta } from "@/components/ServiceCta";
import { ConsultingWizard } from "@/components/ConsultingWizard";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { PageViewTracker } from "@/components/PageViewTracker";
import { toolStack } from "@/data/profile";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

export const metadata: Metadata = {
  title: "Consultoría de Inteligencia Artificial",
  description:
    "Identificamos, diseñamos e implementamos oportunidades reales de inteligencia artificial en marketing, ventas, CRM y experiencia de cliente.",
};

export default function ConsultoriaIAPage() {
  return (
    <>
      <PageViewTracker event="consulting_page_view" />

      {/* Hero */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-center gap-12 sm:grid-cols-2">
          <Reveal className="text-center sm:text-left">
            <h1 className="text-3xl font-bold uppercase leading-tight tracking-tight text-ink sm:text-5xl">
              IA que resuelve
              <br />
              problemas reales.
            </h1>
            <p className="mx-auto mt-6 max-w-md text-lg text-ink/70 sm:mx-0">
              Te ayudo a identificar dónde la inteligencia artificial puede reducir trabajo
              manual, aumentar productividad, mejorar la experiencia del cliente o generar nuevas
              oportunidades de negocio.
            </p>
            <div className="mt-8">
              <ServiceCta
                variant="consultoria"
                href="#diagnostico"
                label="ANALICEMOS TU CASO →"
                placement="consultoria_hero"
              />
            </div>
          </Reveal>

          <Reveal delay={0.15} scale={0.96} className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl shadow-xl">
            <ParallaxImage
              src="/stock/ia-robot-dalle.jpg"
              alt="Ilustración de inteligencia artificial"
              sizes="(min-width: 640px) 384px, 90vw"
              className="h-full w-full"
              strength={25}
            />
          </Reveal>
        </div>
        <p className="mt-2 text-center text-xs text-ink/40">Ilustración generada con IA (DALL·E)</p>
      </section>

      {/* Enfoque */}
      <section className="border-t border-ink/10 bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="text-2xl font-bold uppercase text-ink">Nuestro enfoque</h2>
          </Reveal>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {consultingFlow.map((step, i) => (
              <Reveal key={step} delay={i * 0.05}>
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold uppercase text-ink/80 transition hover:-translate-y-0.5 hover:shadow-md">
                    {step}
                  </span>
                  {i < consultingFlow.length - 1 && <span className="text-ink/30">↓</span>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Metodología */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="text-center text-2xl font-bold uppercase text-ink">Metodología</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {consultingMethodology.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.08} className="h-full">
                <div className="h-full rounded-2xl border border-ink/10 bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <span className="text-3xl font-bold text-accent">{step.number}</span>
                  <h3 className="mt-2 text-lg font-bold uppercase text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink/70">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* No implementamos IA por implementar IA */}
      <section className="border-t border-ink/10 bg-ink px-6 py-20 text-paper">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-2xl font-bold uppercase leading-tight sm:text-4xl">
              No implementamos IA
              <br />
              por implementar IA.
            </h2>
            <p className="mt-4 text-paper/70">Buscamos:</p>
          </Reveal>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {consultingPrinciples.map((principle, i) => (
              <Reveal key={principle} delay={i * 0.06}>
                <span className="rounded-full border border-paper/20 px-5 py-2 text-sm font-semibold uppercase transition hover:-translate-y-0.5 hover:bg-paper/10">
                  {principle}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Áreas y soluciones */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="text-2xl font-bold uppercase text-ink">Ejemplos de soluciones</h2>
            <p className="mt-2 text-sm text-ink/60">
              Cada implementación se valida contra tu proceso y tus datos reales antes de
              recomendarla.
            </p>
          </Reveal>
          <div className="mt-6 flex flex-wrap gap-2">
            {consultingSolutions.map((solution, i) => (
              <Reveal key={solution} delay={i * 0.03}>
                <span className="rounded-full border border-ink/10 px-4 py-2 text-sm text-ink/80 transition hover:-translate-y-0.5 hover:shadow-md">
                  {solution}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Herramientas */}
      <section className="border-t border-ink/10 bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="text-2xl font-bold uppercase text-ink">Herramientas con las que trabajo</h2>
            <p className="mt-2 text-sm text-ink/60">
              El objetivo nunca es la herramienta en sí, sino el proceso que resuelve.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {toolStack.map((group, i) => (
              <Reveal key={group.group} delay={i * 0.08}>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">{group.group}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-ink/10 px-3 py-1 text-sm text-ink/80">
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Funnel de diagnóstico */}
      <section id="diagnostico" className="border-t border-ink/10 bg-white px-6 py-20">
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold uppercase text-ink sm:text-3xl">
            ¿Dónde podría ayudarte la IA?
          </h2>
          <div className="mt-8">
            <ConsultingWizard />
          </div>
        </Reveal>
      </section>

      <Reveal className="border-t border-ink/10 px-6 py-16 text-center">
        <p className="text-lg text-ink/70">¿Prefieres platicarlo directamente?</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <ServiceCta
            variant="consultoria"
            href="/contacto"
            label="CUÉNTAME QUÉ QUIERES AUTOMATIZAR →"
            placement="consultoria_bottom"
            className="inline-flex items-center gap-2 rounded-lg border border-ink/20 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-ink transition hover:border-accent hover:text-accent"
          />
          <WhatsAppCTA source="ia" />
        </div>
      </Reveal>
    </>
  );
}
