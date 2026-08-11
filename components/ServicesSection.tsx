import { services, type ServiceId } from "@/data/services";
import { ServiceCta } from "./ServiceCta";

const CTA_VARIANT_BY_SERVICE: Record<ServiceId, "charla" | "taller" | "consultoria"> = {
  charlas: "charla",
  talleres: "taller",
  "consultoria-ia": "consultoria",
};

export function ServicesSection() {
  return (
    <section id="servicios" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold uppercase tracking-tight text-ink sm:text-5xl">
            Cómo podemos
            <br />
            trabajar juntos.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink/70">
            Ideas que inspiran.
            <br />
            Talleres que desarrollan capacidades.
            <br />
            Implementaciones que transforman procesos.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="flex flex-col rounded-2xl border border-ink/10 bg-white p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                {service.eyebrow}
              </p>
              <h3 className="mt-4 text-2xl font-bold uppercase leading-tight text-ink">
                {service.headline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">{service.description}</p>

              <ul className="mt-6 flex flex-1 flex-wrap gap-2">
                {service.bullets.slice(0, 6).map((bullet) => (
                  <li
                    key={bullet}
                    className="rounded-full border border-ink/10 px-3 py-1 text-xs text-ink/70"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <ServiceCta
                  variant={CTA_VARIANT_BY_SERVICE[service.id]}
                  href={service.ctaHref}
                  label={service.ctaLabel}
                  placement="services_section"
                  className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-xs font-semibold uppercase tracking-wide text-paper transition hover:bg-accent"
                />
                <p className="mt-3 text-xs text-ink/50">{service.microcopy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
