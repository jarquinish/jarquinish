"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import type { LeadRequirements, LeadType } from "@/lib/leads";
import { trackEvent } from "@/lib/analytics";
import { captureUtmContext } from "@/lib/utm";

type LeadTypeOption = {
  value: LeadType;
  label: string;
};

const LEAD_TYPE_OPTIONS: LeadTypeOption[] = [
  { value: "charla", label: "Charla / Conferencia" },
  { value: "taller", label: "Taller / Capacitación" },
  { value: "consultoria", label: "Consultoría de IA" },
  { value: "marketing", label: "Proyecto de Marketing / Branding" },
  { value: "otro", label: "Otro" },
];

type Props = {
  source: string;
  defaultLeadType?: LeadType;
  campaign?: string;
  lockLeadType?: boolean;
  title?: string;
};

export function ServiceLeadForm({
  source,
  defaultLeadType,
  campaign,
  lockLeadType = false,
  title = "Solicita información",
}: Props) {
  const [leadType, setLeadType] = useState<LeadType | "">(defaultLeadType ?? "");
  const [hasStarted, setHasStarted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const requirementFields = useMemo(() => getRequirementFields(leadType), [leadType]);

  function markStarted() {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("form_start", { source });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!leadType) return;

    setStatus("submitting");
    setErrorMessage(null);

    const form = new FormData(event.currentTarget);
    const requirements: LeadRequirements = {};
    for (const field of requirementFields) {
      const value = form.get(field.name);
      if (value) requirements[field.name] = String(value);
    }

    const payload = {
      leadType,
      source,
      campaign,
      contact: {
        nombre: String(form.get("nombre") ?? ""),
        empresa: String(form.get("empresa") ?? "") || undefined,
        cargo: String(form.get("cargo") ?? "") || undefined,
        email: String(form.get("email") ?? ""),
        whatsapp: String(form.get("whatsapp") ?? "") || undefined,
        ciudad: String(form.get("ciudad") ?? "") || undefined,
      },
      requirements,
      utm: captureUtmContext(),
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("No se pudo enviar la información");

      setStatus("success");
      trackEvent("form_complete", { source, lead_type: leadType });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Ocurrió un error inesperado");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center">
        <p className="text-lg font-medium text-ink">
          Gracias. Revisaré tu información y te responderé lo antes posible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocus={markStarted} className="space-y-6">
      {title && <h3 className="text-xl font-semibold text-ink">{title}</h3>}

      <Field label="¿Qué necesitas?" required>
        <select
          name="leadType"
          required
          disabled={lockLeadType}
          value={leadType}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setLeadType(e.target.value as LeadType)}
          className="w-full rounded-lg border border-ink/20 bg-white px-4 py-3 text-ink disabled:opacity-70"
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          {LEAD_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" required>
          <input name="nombre" required className={inputClass} />
        </Field>
        <Field label="Empresa">
          <input name="empresa" className={inputClass} />
        </Field>
        <Field label="Cargo">
          <input name="cargo" className={inputClass} />
        </Field>
        <Field label="Email" required>
          <input type="email" name="email" required className={inputClass} />
        </Field>
        <Field label="WhatsApp">
          <input name="whatsapp" className={inputClass} />
        </Field>
        <Field label="Ciudad / País">
          <input name="ciudad" className={inputClass} />
        </Field>
      </div>

      {requirementFields.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {requirementFields.map((field) => (
            <Field key={field.name} label={field.label} className={field.fullWidth ? "sm:col-span-2" : undefined}>
              {field.type === "select" ? (
                <select name={field.name} className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea name={field.name} rows={3} className={inputClass} />
              ) : (
                <input type={field.type ?? "text"} name={field.name} className={inputClass} />
              )}
            </Field>
          ))}
        </div>
      )}

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
        <p className="text-sm text-red-600">{errorMessage ?? "No se pudo enviar el formulario. Intenta de nuevo."}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || !leadType}
        className="w-full rounded-lg bg-ink px-6 py-4 text-sm font-semibold uppercase tracking-wide text-paper transition hover:bg-accent disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Enviando..." : "SOLICITAR INFORMACIÓN →"}
      </button>
    </form>
  );
}

const inputClass = "w-full rounded-lg border border-ink/20 bg-white px-4 py-3 text-ink";

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block text-sm ${className ?? ""}`}>
      <span className="mb-1.5 block font-medium text-ink/80">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {children}
    </label>
  );
}

type RequirementField = {
  name: string;
  label: string;
  type?: "text" | "date" | "number" | "select" | "textarea";
  options?: string[];
  fullWidth?: boolean;
};

function getRequirementFields(leadType: LeadType | ""): RequirementField[] {
  switch (leadType) {
    case "charla":
      return [
        { name: "fechaEvento", label: "Fecha del evento", type: "date" },
        { name: "ciudadEvento", label: "Ciudad" },
        { name: "asistentes", label: "Número aproximado de asistentes", type: "number" },
        { name: "tipoAudiencia", label: "Tipo de audiencia" },
        { name: "temaInteres", label: "Tema de interés" },
        { name: "duracionEsperada", label: "Duración esperada" },
        {
          name: "modalidad",
          label: "Presencial / virtual",
          type: "select",
          options: ["Presencial", "Virtual", "Aún no sé"],
        },
      ];
    case "taller":
      return [
        { name: "participantes", label: "Número de participantes", type: "number" },
        { name: "objetivo", label: "Objetivo", type: "textarea", fullWidth: true },
        { name: "tema", label: "Tema" },
        { name: "duracion", label: "Duración" },
        {
          name: "modalidad",
          label: "Presencial / virtual",
          type: "select",
          options: ["Presencial", "Virtual", "Aún no sé"],
        },
      ];
    case "consultoria":
      return [
        { name: "area", label: "Área" },
        { name: "problema", label: "Problema", type: "textarea", fullWidth: true },
        { name: "equipo", label: "Tamaño del equipo" },
        { name: "tecnologiasActuales", label: "Tecnologías actuales" },
        { name: "objetivo", label: "Objetivo", type: "textarea", fullWidth: true },
        { name: "presupuesto", label: "Presupuesto aproximado (opcional)" },
      ];
    default:
      return [{ name: "mensaje", label: "Mensaje", type: "textarea", fullWidth: true }];
  }
}
