import type { Metadata } from "next";
import Image from "next/image";
import { charlasAudiencias, charlasFaq, charlasFormatos, charlasTemas } from "@/data/services";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { PageViewTracker } from "@/components/PageViewTracker";

const galleryPhotos = [
  { src: "/charlas/charla-03-presentando-ia.jpg", alt: "Miguel Jarquín presentando sobre Inteligencia Artificial" },
  { src: "/charlas/charla-05-presentando.jpg", alt: "Miguel Jarquín presentando en conferencia de SOC Asesores" },
  { src: "/charlas/charla-07-auditorio-masivo.jpg", alt: "Miguel Jarquín en escenario ante auditorio masivo" },
  { src: "/charlas/charla-01-auditorio.jpg", alt: "Auditorio durante una charla de Miguel Jarquín" },
  { src: "/charlas/charla-04-evento-inmobiliario.jpg", alt: "Charla de Miguel Jarquín en evento del sector inmobiliario" },
  { src: "/charlas/charla-02-selfie-audiencia.jpg", alt: "Miguel Jarquín con la audiencia después de una charla" },
];

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
      <section className="relative overflow-hidden px-6 py-28 sm:py-40">
        <Image
          src="/charlas/charla-07-auditorio-masivo.jpg"
          alt="Miguel Jarquín presentando ante un auditorio masivo"
          fill
          priority
          className="object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 bg-ink/75" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold uppercase leading-tight tracking-tight text-paper sm:text-5xl">
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
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold uppercase text-ink">Experiencia como speaker</h2>
          <p className="mt-4 text-ink/70">
            He compartido estos temas en empresas, asociaciones y foros de industria, ante
            audiencias de decenas a miles de personas. Escríbeme para conocer referencias y
            eventos recientes según el tipo de audiencia que buscas.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {galleryPhotos.map((photo) => (
              <div key={photo.src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
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
