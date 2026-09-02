import type { Metadata } from "next";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntame sobre tu charla, taller o proyecto de inteligencia artificial y te responderé con una propuesta.",
};

export default function ContactoPage() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold uppercase leading-tight tracking-tight text-ink sm:text-5xl">
            Hablemos
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-ink/70">
            Cuéntame qué necesitas — una charla, un taller, una consultoría de IA o algo distinto —
            y te responderé con disponibilidad y siguientes pasos.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-ink/10 bg-white p-6 sm:p-10">
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
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
