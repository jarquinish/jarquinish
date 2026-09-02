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
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold uppercase leading-tight tracking-tight text-ink sm:text-5xl">
            IA que resuelve
            <br />
            problemas reales.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink/70">
            Te ayudo a identificar dónde la inteligencia artificial puede reducir trabajo manual,
            aumentar productividad, mejorar la experiencia del cliente o generar nuevas
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
        </div>
      </section>

      {/* Enfoque */}
      <section className="border-t border-ink/10 bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold uppercase text-ink">Nuestro enfoque</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {consultingFlow.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold uppercase text-ink/80">
                  {step}
                </span>
                {i < consultingFlow.length - 1 && <span className="text-ink/30">↓</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metodología */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold uppercase text-ink">Metodología</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {consultingMethodology.map((step) => (
              <div key={step.number} className="rounded-2xl border border-ink/10 bg-white p-6">
                <span className="text-3xl font-bold text-accent">{step.number}</span>
                <h3 className="mt-2 text-lg font-bold uppercase text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No implementamos IA por implementar IA */}
      <section className="border-t border-ink/10 bg-ink px-6 py-20 text-paper">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold uppercase leading-tight sm:text-4xl">
            No implementamos IA
            <br />
            por implementar IA.
          </h2>
          <p className="mt-4 text-paper/70">Buscamos:</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {consultingPrinciples.map((principle) => (
              <span
                key={principle}
                className="rounded-full border border-paper/20 px-5 py-2 text-sm font-semibold uppercase"
              >
                {principle}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Áreas y soluciones */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold uppercase text-ink">Ejemplos de soluciones</h2>
          <p className="mt-2 text-sm text-ink/60">
            Cada implementación se valida contra tu proceso y tus datos reales antes de
            recomendarla.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {consultingSolutions.map((solution) => (
              <span key={solution} className="rounded-full border border-ink/10 px-4 py-2 text-sm text-ink/80">
                {solution}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Herramientas */}
      <section className="border-t border-ink/10 bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold uppercase text-ink">Herramientas con las que trabajo</h2>
          <p className="mt-2 text-sm text-ink/60">
            El objetivo nunca es la herramienta en sí, sino el proceso que resuelve.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {toolStack.map((group) => (
              <div key={group.group}>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">{group.group}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-ink/10 px-3 py-1 text-sm text-ink/80">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funnel de diagnóstico */}
      <section id="diagnostico" className="border-t border-ink/10 bg-white px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold uppercase text-ink sm:text-3xl">
            ¿Dónde podría ayudarte la IA?
          </h2>
          <div className="mt-8">
            <ConsultingWizard />
          </div>
        </div>
      </section>

      <div className="border-t border-ink/10 px-6 py-16 text-center">
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
      </div>
    </>
  );
}
