"use client";

import { useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { captureUtmContext } from "@/lib/utm";

const Q1_OPTIONS = [
  "Marketing",
  "Ventas",
  "Prospección",
  "CRM",
  "Contenido",
  "Atención al cliente",
  "DATA",
  "Productividad",
  "Otro",
];

const Q2_OPTIONS = [
  "Demasiadas tareas manuales",
  "Poca generación de leads",
  "Baja conversión",
  "Información dispersa",
  "Procesos lentos",
  "Falta de seguimiento",
  "Generación de contenido",
  "Análisis de información",
  "No sabemos cómo utilizar IA",
  "Otro",
];

const Q3_OPTIONS = ["1–5", "6–20", "21–50", "51–200", "200+"];

const Q4_OPTIONS = [
  "Explorando",
  "Ya utilizamos algunas herramientas",
  "Tenemos automatizaciones",
  "Queremos integrar IA a procesos completos",
];

const TOTAL_STEPS = 5;

export function ConsultingWizard() {
  const [step, setStep] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);
  const [answers, setAnswers] = useState({
    quiereMejorar: "",
    principalProblema: "",
    tamanoEquipo: "",
    etapaIA: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function markStarted() {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("form_start", { source: "consultoria_wizard" });
    }
  }

  function selectAndAdvance(key: keyof typeof answers, value: string) {
    markStarted();
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = new FormData(event.currentTarget);

    const payload = {
      leadType: "consultoria" as const,
      source: "consultoria_wizard",
      contact: {
        nombre: String(form.get("nombre") ?? ""),
        empresa: String(form.get("empresa") ?? "") || undefined,
        cargo: String(form.get("cargo") ?? "") || undefined,
        email: String(form.get("email") ?? ""),
        whatsapp: String(form.get("whatsapp") ?? "") || undefined,
      },
      requirements: {
        quiereMejorar: answers.quiereMejorar,
        principalProblema: answers.principalProblema,
        tamanoEquipo: answers.tamanoEquipo,
        etapaIA: answers.etapaIA,
        mensaje: String(form.get("mensaje") ?? ""),
      },
      utm: captureUtmContext(),
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("No se pudo enviar el diagnóstico");
      setStatus("success");
      trackEvent("form_complete", { source: "consultoria_wizard" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-10 text-center">
        <p className="text-lg font-medium text-ink">
          Gracias. Revisaré tu caso para identificar dónde puede tener mayor impacto una
          implementación de IA.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-10">
      <div className="mb-8 flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i + 1 <= step ? "bg-accent" : "bg-ink/10"}`}
          />
        ))}
      </div>

      {step === 1 && (
        <WizardStep question="¿Qué quieres mejorar?" options={Q1_OPTIONS} onSelect={(v) => selectAndAdvance("quiereMejorar", v)} />
      )}

      {step === 2 && (
        <WizardStep
          question="¿Cuál es hoy el principal problema?"
          options={Q2_OPTIONS}
          onSelect={(v) => selectAndAdvance("principalProblema", v)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <WizardStep
          question="¿De qué tamaño es tu equipo?"
          options={Q3_OPTIONS}
          onSelect={(v) => selectAndAdvance("tamanoEquipo", v)}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && (
        <WizardStep
          question="¿En qué etapa están con IA?"
          options={Q4_OPTIONS}
          onSelect={(v) => selectAndAdvance("etapaIA", v)}
          onBack={() => setStep(3)}
        />
      )}

      {step === 5 && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <h3 className="text-lg font-semibold text-ink">Datos de contacto</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="nombre" placeholder="Nombre" required className={inputClass} />
            <input name="empresa" placeholder="Empresa" className={inputClass} />
            <input name="cargo" placeholder="Cargo" className={inputClass} />
            <input type="email" name="email" placeholder="Email" required className={inputClass} />
            <input name="whatsapp" placeholder="Teléfono / WhatsApp" className={inputClass} />
          </div>
          <textarea name="mensaje" placeholder="Mensaje" rows={4} className={inputClass} />

          <label className="flex items-start gap-2 text-xs text-ink/70">
            <input type="checkbox" name="acceptaPrivacidad" required className="mt-0.5" />
            <span>
              Acepto el{" "}
              <a href="/aviso-de-privacidad" target="_blank" className="underline">
                aviso de privacidad
              </a>{" "}
              y el uso de mis datos para dar seguimiento a esta solicitud.
            </span>
          </label>

          {status === "error" && (
            <p className="text-sm text-red-600">No se pudo enviar el formulario. Intenta de nuevo.</p>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="text-sm font-medium text-ink/60 hover:text-ink"
            >
              ← Regresar
            </button>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-lg bg-ink px-6 py-4 text-sm font-semibold uppercase tracking-wide text-paper transition hover:bg-accent disabled:opacity-60"
            >
              {status === "submitting" ? "Enviando..." : "QUIERO MI DIAGNÓSTICO →"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

const inputClass = "w-full rounded-lg border border-ink/20 bg-white px-4 py-3 text-ink";

function WizardStep({
  question,
  options,
  onSelect,
  onBack,
}: {
  question: string;
  options: string[];
  onSelect: (value: string) => void;
  onBack?: () => void;
}) {
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-semibold text-ink">{question}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className="rounded-lg border border-ink/15 bg-paper px-4 py-3 text-left text-sm font-medium text-ink transition hover:border-accent hover:bg-accent/10"
          >
            {option}
          </button>
        ))}
      </div>
      {onBack && (
        <button type="button" onClick={onBack} className="text-sm font-medium text-ink/60 hover:text-ink">
          ← Regresar
        </button>
      )}
    </div>
  );
}
