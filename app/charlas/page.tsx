import type { Metadata } from "next";
import { charlasAudiencias, charlasFaq, charlasFormatos, charlasTemas } from "@/data/services";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { PageViewTracker } from "@/components/PageViewTracker";

export const metadata: Metadata = {
  title: "Charlas y conferencias",
  description:
    "Charlas y conferencias sobre inteligencia artificial, marketing y marca personal para empresas, asociaciones, universidades y eventos.",
};

export default function CharlasPage() {
  return (
    <>
      <PageViewTracker event="speaker_page_view" />

      {/* Hero */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold uppercase leading-tight tracking-tight text-ink sm:text-5xl">
            Charlas para entender
            <br />
            lo que viene
            <br />y saber qué hacer con ello.
          </h1>
        </div>
      </section>

      {/* Temas */}
      <section className="border-t border-ink/10 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold uppercase text-ink">Temáticas posibles</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {charlasTemas.map((tema) => (
              <li key={tema} className="rounded-lg border border-ink/10 bg-white px-4 py-3 text-sm text-ink/80">
                {tema}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Audiencias */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold uppercase text-ink">Audiencias</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {charlasAudiencias.map((audiencia) => (
              <span key={audiencia} className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/80">
                {audiencia}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Formatos */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold uppercase text-ink">Formatos</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {charlasFormatos.map((formato) => (
              <li key={formato} className="rounded-lg border border-ink/10 bg-white px-4 py-3 text-sm text-ink/80">
                {formato}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Experiencia como speaker / eventos */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold uppercase text-ink">Experiencia como speaker</h2>
          <p className="mt-4 text-ink/70">
            He compartido estos temas en empresas, asociaciones y foros de industria. Escríbeme
            para conocer referencias y eventos recientes según el tipo de audiencia que buscas.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink/10 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold uppercase text-ink">Preguntas frecuentes</h2>
          <div className="mt-6 space-y-6">
            {charlasFaq.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-ink">{item.question}</h3>
                <p className="mt-1 text-sm text-ink/70">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA contratación */}
      <section id="contratar" className="border-t border-ink/10 bg-white px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold uppercase text-ink">Contrata una charla</h2>
          <p className="mt-2 text-center text-ink/60">
            Cuéntame sobre tu evento, audiencia y objetivo.
          </p>
          <div className="mt-8">
            <ServiceLeadForm source="charlas_page" defaultLeadType="charla" lockLeadType title="" />
          </div>
          <div className="mt-6 text-center">
            <WhatsAppCTA source="charla" />
          </div>
        </div>
      </section>
    </>
  );
}
