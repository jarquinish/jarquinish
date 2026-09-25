import type { Metadata } from "next";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { SocialLinks } from "@/components/SocialLinks";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntame sobre tu charla, taller o proyecto de inteligencia artificial y te responderé con una propuesta.",
};

export default function ContactoPage() {
  return (
    <>
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-center gap-12 sm:grid-cols-2">
          <Reveal className="text-center sm:text-left">
            <h1 className="text-3xl font-bold uppercase leading-tight tracking-tight text-ink sm:text-5xl">
              Hablemos
            </h1>
            <p className="mx-auto mt-6 max-w-md text-ink/70 sm:mx-0">
              Cuéntame qué necesitas — una charla, un taller, una consultoría de IA o algo
              distinto — y te responderé con disponibilidad y siguientes pasos.
            </p>
          </Reveal>

          <Reveal delay={0.15} scale={0.96} className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl shadow-xl">
            <ParallaxImage
              src="/stock/digital-marketing-freepik.jpg"
              alt="Estrategia de marketing digital"
              sizes="(min-width: 640px) 448px, 90vw"
              className="h-full w-full"
              strength={25}
            />
          </Reveal>
        </div>
        <p className="mt-2 text-center text-xs text-ink/40 sm:text-right">Imagen: Freepik</p>
      </section>

      <section className="px-6 pb-20 sm:pb-28">
        <Reveal className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-10">
            <ServiceLeadForm source="contacto_page" />
          </div>

          <div className="mt-8 flex justify-center">
            <WhatsAppCTA source="general" />
          </div>

          <div className="mt-12 flex flex-col items-center gap-2 border-t border-ink/10 pt-8 text-center text-sm text-ink/60">
            <p>O escríbeme directamente:</p>
            <a href={`mailto:${profile.contact.email}`} className="font-medium text-ink hover:text-accent">
              {profile.contact.email}
            </a>
            <p>{profile.contact.phone}</p>
            <p>{profile.contact.location}</p>
            <SocialLinks className="mt-2 flex items-center gap-5 text-ink/70" iconClassName="h-5 w-5" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
