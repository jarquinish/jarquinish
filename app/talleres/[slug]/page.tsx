import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { talleres } from "@/data/talleres";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return talleres.map((taller) => ({ slug: taller.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const taller = talleres.find((t) => t.slug === params.slug);
  if (!taller) return {};
  return {
    title: taller.nombre,
    description: taller.objetivo,
  };
}

export default function TallerDetailPage({ params }: Props) {
  const taller = talleres.find((t) => t.slug === params.slug);
  if (!taller) notFound();

  return (
    <>
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Link href="/talleres" className="text-sm font-medium text-ink/60 hover:text-ink">
            ← Todos los talleres
          </Link>
          <h1 className="mt-4 text-3xl font-bold uppercase leading-tight text-ink sm:text-4xl">
            {taller.nombre}
          </h1>
          <p className="mt-4 text-lg text-ink/70">{taller.objetivo}</p>

          <dl className="mt-8 grid gap-4 rounded-2xl border border-ink/10 bg-white p-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase text-ink/50">Duración</dt>
              <dd className="mt-1 text-ink">{taller.duracion}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-ink/50">Modalidad</dt>
              <dd className="mt-1 text-ink">{taller.modalidad}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase text-ink/50">Audiencia</dt>
              <dd className="mt-1 text-ink">{taller.audiencia}</dd>
            </div>
          </dl>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-ink">Resultados esperados</h2>
            <ul className="mt-3 space-y-2">
              {taller.resultados.map((resultado) => (
                <li key={resultado} className="flex gap-2 text-ink/80">
                  <span className="text-accent">→</span>
                  {resultado}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-white px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold uppercase text-ink">Cotiza este taller</h2>
          <div className="mt-8">
            <ServiceLeadForm
              source={`taller_detail_${taller.slug}`}
              defaultLeadType="taller"
              lockLeadType
              title=""
            />
          </div>
          <div className="mt-6 text-center">
            <WhatsAppCTA source="taller" />
          </div>
        </div>
      </section>
    </>
  );
}
