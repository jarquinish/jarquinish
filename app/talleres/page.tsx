import type { Metadata } from "next";
import Link from "next/link";
import { talleres } from "@/data/talleres";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Talleres y capacitaciones",
  description:
    "Talleres prácticos de inteligencia artificial, marketing y automatización para equipos comerciales, marketing, inmobiliarios y asesores financieros.",
};

export default function TalleresPage() {
  return (
    <>
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold uppercase leading-tight tracking-tight text-ink sm:text-5xl">
            Menos teoría.
            <br />
            Más hacer.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-ink/70">
            Talleres prácticos para convertir conceptos de inteligencia artificial, marketing y
            automatización en habilidades aplicables desde el primer día.
          </p>
        </div>
      </section>

      <section className="border-t border-ink/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {talleres.map((taller) => (
              <Link
                key={taller.slug}
                href={`/talleres/${taller.slug}`}
                className="flex flex-col rounded-2xl border border-ink/10 bg-white p-6 transition hover:border-accent"
              >
                <h3 className="text-lg font-bold text-ink">{taller.nombre}</h3>
                <p className="mt-2 text-sm text-ink/70">{taller.objetivo}</p>
                <dl className="mt-4 space-y-1 text-xs text-ink/60">
                  <div className="flex justify-between gap-2">
                    <dt className="font-medium">Duración</dt>
                    <dd>{taller.duracion}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="font-medium">Modalidad</dt>
                    <dd>{taller.modalidad}</dd>
                  </div>
                  <div className="flex justify-between gap-2 text-right">
                    <dt className="font-medium">Audiencia</dt>
                    <dd>{taller.audiencia}</dd>
                  </div>
                </dl>
                <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">
                  Ver detalle →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="cotizar" className="border-t border-ink/10 bg-white px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold uppercase text-ink">Cotiza un taller</h2>
          <p className="mt-2 text-center text-ink/60">
            Diseñamos el formato de acuerdo con tu equipo y tus objetivos.
          </p>
          <div className="mt-8">
            <ServiceLeadForm source="talleres_page" defaultLeadType="taller" lockLeadType title="" />
          </div>
          <div className="mt-6 text-center">
            <WhatsAppCTA source="taller" />
          </div>
        </div>
      </section>
    </>
  );
}
