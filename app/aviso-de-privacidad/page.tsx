import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: "Aviso de privacidad para los datos que se recopilan a través de este sitio.",
};

export default function AvisoDePrivacidadPage() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold uppercase tracking-tight text-ink">
          Aviso de privacidad
        </h1>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/80">
          <p>
            Miguel Jarquín, en cumplimiento con la Ley Federal de Protección de Datos Personales en
            Posesión de los Particulares, informa que los datos personales que proporciones a
            través de los formularios de este sitio (nombre, empresa, cargo, correo electrónico,
            teléfono/WhatsApp, ciudad y demás información relacionada con tu solicitud) serán
            utilizados únicamente para:
          </p>

          <ul className="list-disc space-y-2 pl-5">
            <li>Dar seguimiento a tu solicitud de charla, taller, consultoría de IA u otro proyecto.</li>
            <li>Contactarte para brindar información, disponibilidad y propuestas.</li>
            <li>Elaborar estadísticas internas sobre el interés en los distintos servicios ofrecidos.</li>
          </ul>

          <p>
            Tus datos no se venden ni se comparten con terceros ajenos a la operación de este sitio.
            Cuando se configure una integración con un CRM o herramienta de automatización (por
            ejemplo, para dar seguimiento comercial), tus datos se transferirán únicamente a esa
            herramienta con el fin exclusivo de gestionar tu solicitud.
          </p>

          <p>
            Puedes ejercer tus derechos de Acceso, Rectificación, Cancelación u Oposición (derechos
            ARCO), así como revocar tu consentimiento, escribiendo a{" "}
            <a href="mailto:mjarquin@socasesores.com.mx" className="underline">
              mjarquin@socasesores.com.mx
            </a>
            .
          </p>

          <p>
            Este aviso puede sufrir modificaciones. Cualquier cambio será publicado en esta misma
            página.
          </p>
        </div>
      </div>
    </section>
  );
}
