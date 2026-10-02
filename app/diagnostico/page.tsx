import type { Metadata } from "next";
import { DiagnosticoExperience } from "@/components/diagnostico/DiagnosticoExperience";
import { PageViewTracker } from "@/components/PageViewTracker";

export const metadata: Metadata = {
  title: "Diagnóstico IA + Automatización",
  description:
    "¿Qué tan preparada está tu empresa para trabajar con IA? Un diagnóstico breve de 3 a 5 minutos para detectar oportunidades reales de inteligencia artificial y automatización.",
  alternates: { canonical: "/diagnostico" },
};

export default function DiagnosticoPage() {
  return (
    <>
      <PageViewTracker event="diagnostico_page_view" />
      <DiagnosticoExperience />
    </>
  );
}
