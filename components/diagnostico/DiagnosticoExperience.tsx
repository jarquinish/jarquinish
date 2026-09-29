"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  QUESTIONS,
  buildDiagnosticoResult,
  classifyTareaRemote,
  DIMENSION_LABELS,
  DIMENSION_DESCRIPTIONS,
  type Answers,
  type Dimension,
  type DiagnosticoResult,
  type Question,
  type TaskClassification,
} from "@/lib/diagnostico";
import type { LeadRequirements } from "@/lib/leads";
import { ProgressRing } from "./ProgressRing";
import { trackEvent } from "@/lib/analytics";
import { captureUtmContext } from "@/lib/utm";

type Phase = "intro" | "question" | "interstitial" | "loading" | "result";

const fadeVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
};

export function DiagnosticoExperience() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [interstitialText, setInterstitialText] = useState("");
  const [result, setResult] = useState<DiagnosticoResult | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const classificationPromiseRef = useRef<Promise<TaskClassification> | null>(null);

  const totalSteps = QUESTIONS.length;
  const question = QUESTIONS[stepIndex];

  function start() {
    trackEvent("diagnostico_start");
    setPhase("question");
  }

  async function finish(updatedAnswers: Answers) {
    setPhase("loading");

    const clasificacion = classificationPromiseRef.current
      ? await classificationPromiseRef.current
      : undefined;

    const finalResult = buildDiagnosticoResult(updatedAnswers, clasificacion);
    setResult(finalResult);
    trackEvent("diagnostico_complete", {
      ia_stage: finalResult.stages.ia,
      automatizacion_stage: finalResult.stages.automatizacion,
      datos_stage: finalResult.stages.datos,
      personas_stage: finalResult.stages.personas,
      intervencion: finalResult.intervencion,
    });
    setPhase("result");
  }

  function advance(updatedAnswers: Answers) {
    if (stepIndex + 1 >= totalSteps) {
      void finish(updatedAnswers);
    } else {
      setStepIndex((i) => i + 1);
      setPhase("question");
    }
  }

  function handleAnswer(value: string | string[]) {
    const updated: Answers = { ...answers, [question.id]: value } as Answers;
    setAnswers(updated);
    trackEvent("diagnostico_step", { step: String(question.id) });

    if (question.id === "tareaRepetitiva" && typeof value === "string") {
      classificationPromiseRef.current = classifyTareaRemote(value);
    }

    const delay = question.kind === "single" ? 300 : 0;
    window.setTimeout(() => {
      if (question.interstitial) {
        setInterstitialText(question.interstitial);
        setPhase("interstitial");
      } else {
        advance(updated);
      }
    }, delay);
  }

  function scrollToForm(cta: "primary" | "secondary") {
    trackEvent("diagnostico_cta_click", { cta });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      {phase === "question" && (
        <div className="mb-10 h-1 w-full overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-gold transition-all duration-500"
            style={{ width: `${(stepIndex / totalSteps) * 100}%` }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div key="intro" {...fadeVariants} transition={{ duration: 0.4 }}>
            <IntroScreen onStart={start} />
          </motion.div>
        )}

        {phase === "question" && (
          <motion.div key={`q-${question.id}`} {...fadeVariants} transition={{ duration: 0.35 }}>
            <QuestionScreen
              question={question}
              initialValue={answers[question.id]}
              onAnswer={handleAnswer}
              onBack={stepIndex > 0 ? () => setStepIndex((i) => i - 1) : undefined}
            />
          </motion.div>
        )}

        {phase === "interstitial" && (
          <motion.div key="interstitial" {...fadeVariants} transition={{ duration: 0.4 }}>
            <InterstitialScreen text={interstitialText} onContinue={() => advance(answers)} />
          </motion.div>
        )}

        {phase === "loading" && (
          <motion.div key="loading" {...fadeVariants} transition={{ duration: 0.3 }}>
            <LoadingScreen />
          </motion.div>
        )}

        {phase === "result" && result && (
          <motion.div key="result" {...fadeVariants} transition={{ duration: 0.5 }}>
            <ResultScreen result={result} answers={answers} onCta={scrollToForm} formRef={formRef} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Apertura
// ---------------------------------------------------------------------------

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold leading-snug text-ink sm:text-4xl">
        Antes de hablar de IA, hablemos de cómo trabaja tu empresa.
      </h1>
      <p className="mx-auto mt-6 max-w-lg text-ink/70">
        En unos minutos vamos a detectar dónde la tecnología podría ayudarte a ganar tiempo, tomar
        mejores decisiones o hacer cosas que hoy simplemente no estás haciendo.
      </p>
      <p className="mx-auto mt-4 max-w-lg font-medium text-ink">
        No necesitas saber de IA. Necesitas conocer tu negocio.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wide text-paper transition hover:opacity-90"
      >
        Comenzar diagnóstico →
      </button>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink/40">
        3–5 minutos · Sin tecnicismos
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pregunta
// ---------------------------------------------------------------------------

function QuestionScreen({
  question,
  initialValue,
  onAnswer,
  onBack,
}: {
  question: Question;
  initialValue: string | string[] | undefined;
  onAnswer: (value: string | string[]) => void;
  onBack?: () => void;
}) {
  const [selected, setSelected] = useState<string[]>(
    question.kind === "multi" && Array.isArray(initialValue) ? initialValue : []
  );
  const [singleValue, setSingleValue] = useState<string | undefined>(
    question.kind === "single" && typeof initialValue === "string" ? initialValue : undefined
  );
  const [text, setText] = useState<string>(
    question.kind === "text" && typeof initialValue === "string" ? initialValue : ""
  );
  const [showMicrocopy, setShowMicrocopy] = useState(false);

  function toggleMulti(value: string) {
    setSelected((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      if (question.maxSelections && prev.length >= question.maxSelections) return prev;
      return [...prev, value];
    });
    setShowMicrocopy(true);
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">{question.eyebrow}</p>
      <h2 className="mt-3 text-2xl font-bold leading-snug text-ink sm:text-3xl">{question.title}</h2>
      {question.helper && <p className="mt-2 text-sm text-ink/50">{question.helper}</p>}

      <div className="mt-8 space-y-4">
        {question.kind === "text" ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={question.placeholder}
            rows={3}
            autoFocus
            className="w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-ink placeholder:text-ink/30 focus:border-gold focus:outline-none"
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {question.options?.map((option) => {
              const isSelected =
                question.kind === "multi" ? selected.includes(option.value) : singleValue === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    if (question.kind === "multi") {
                      toggleMulti(option.value);
                    } else {
                      setSingleValue(option.value);
                      onAnswer(option.value);
                    }
                  }}
                  className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                    isSelected
                      ? "border-gold bg-gold/10 text-ink"
                      : "border-ink/15 bg-surface text-ink/80 hover:-translate-y-0.5 hover:border-gold/50"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}

        {question.kind === "multi" && showMicrocopy && question.microcopy && (
          <p className="text-sm italic text-ink/50">{question.microcopy}</p>
        )}

        {question.kind !== "single" && (
          <button
            type="button"
            disabled={question.kind === "multi" ? selected.length === 0 : text.trim().length < 2}
            onClick={() => onAnswer(question.kind === "multi" ? selected : text.trim())}
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition hover:opacity-90 disabled:opacity-40"
          >
            Continuar →
          </button>
        )}
      </div>

      {onBack && (
        <button type="button" onClick={onBack} className="mt-10 text-sm font-medium text-ink/50 hover:text-ink">
          ← Regresar
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cargando
// ---------------------------------------------------------------------------

function LoadingScreen() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink/15 border-t-gold" />
      <p className="text-sm font-medium text-ink/60">Analizando tus respuestas…</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Interstitial
// ---------------------------------------------------------------------------

function InterstitialScreen({ text, onContinue }: { text: string; onContinue: () => void }) {
  return (
    <div className="py-8 text-center">
      <p className="mx-auto max-w-md text-xl font-medium text-ink sm:text-2xl">{text}</p>
      <button
        type="button"
        onClick={onContinue}
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ink transition hover:border-gold hover:text-gold"
      >
        Continuar →
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Resultado
// ---------------------------------------------------------------------------

const DIMENSION_ORDER: Dimension[] = ["ia", "automatizacion", "datos", "personas"];

function ResultScreen({
  result,
  answers,
  onCta,
  formRef,
}: {
  result: DiagnosticoResult;
  answers: Answers;
  onCta: (cta: "primary" | "secondary") => void;
  formRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div>
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-gold">Tu resultado</p>
      <h2 className="mt-3 text-center text-2xl font-bold uppercase text-ink sm:text-3xl">
        Tu mapa de oportunidad
      </h2>

      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {DIMENSION_ORDER.map((dim, i) => (
          <ProgressRing
            key={dim}
            value={result.scores[dim]}
            label={DIMENSION_LABELS[dim]}
            description={DIMENSION_DESCRIPTIONS[dim]}
            stage={result.stages[dim]}
            delay={i * 0.15}
          />
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-xl text-center text-xl font-medium text-ink sm:text-2xl">
        “{result.insight}”
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        <OportunidadCard title="Podrías automatizar" text={result.oportunidades.automatizar} />
        <OportunidadCard title="Podrías potenciar con IA" text={result.oportunidades.potenciar} />
        <OportunidadCard title="No deberías automatizar" text={result.oportunidades.noAutomatizar} />
      </div>

      <div className="mt-12 rounded-2xl border border-gold/30 bg-gold/10 p-6 text-center">
        <p className="text-sm text-ink/70">Si trabajáramos juntos, empezaría por aquí:</p>
        <p className="mt-2 text-lg font-bold uppercase text-ink">{result.intervencion}</p>
      </div>

      <div className="mt-14 text-center">
        <p className="text-lg font-medium text-ink">
          Tu diagnóstico encontró oportunidades. Ahora podemos llevarlas a tu realidad.
        </p>
        <p className="mt-2 text-ink/60">
          Diseñemos una sesión con casos, procesos y retos reales de tu empresa.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => onCta("primary")}
            className="rounded-full bg-gold px-6 py-4 text-sm font-semibold uppercase tracking-wide text-paper transition hover:opacity-90"
          >
            Quiero llevar esto a mi empresa →
          </button>
          <button
            type="button"
            onClick={() => onCta("secondary")}
            className="rounded-full border border-ink/25 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-ink transition hover:border-gold hover:text-gold"
          >
            Recibir mi diagnóstico
          </button>
        </div>
      </div>

      <div ref={formRef} className="mt-16 scroll-mt-10 rounded-2xl border border-ink/10 bg-surface p-6 sm:p-10">
        <DiagnosticoLeadForm result={result} answers={answers} />
      </div>
    </div>
  );
}

function OportunidadCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-surface p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">{title}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink/80">{text}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Captura de lead
// ---------------------------------------------------------------------------

function DiagnosticoLeadForm({ result, answers }: { result: DiagnosticoResult; answers: Answers }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function markStarted() {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("form_start", { source: "diagnostico_page" });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = new FormData(event.currentTarget);
    const requirements: LeadRequirements = {
      colaboradores: String(form.get("colaboradores") ?? "") || undefined,
      problemaPrioritario: String(form.get("problema") ?? "") || undefined,
      rol: answers.rol,
      tiempoPerdido: (answers.tiempoPerdido ?? []).join(", ") || undefined,
      tareaRepetitiva: answers.tareaRepetitiva,
      datos: answers.datos,
      iaUso: answers.iaUso,
      automatizacionEscenario: answers.automatizacionEscenario,
      cuelloBotella: answers.cuelloBotella,
      prioridad90dias: answers.prioridad90dias,
      scoreIA: result.scores.ia,
      scoreAutomatizacion: result.scores.automatizacion,
      scoreDatos: result.scores.datos,
      scorePersonas: result.scores.personas,
      etapaIA: result.stages.ia,
      etapaAutomatizacion: result.stages.automatizacion,
      etapaDatos: result.stages.datos,
      etapaPersonas: result.stages.personas,
      insight: result.insight,
      oportunidadAutomatizar: result.oportunidades.automatizar,
      oportunidadPotenciar: result.oportunidades.potenciar,
      oportunidadNoAutomatizar: result.oportunidades.noAutomatizar,
      intervencionRecomendada: result.intervencion,
    };

    const payload = {
      leadType: "diagnostico" as const,
      source: "diagnostico_page",
      contact: {
        nombre: String(form.get("nombre") ?? ""),
        empresa: String(form.get("empresa") ?? "") || undefined,
        cargo: String(form.get("cargo") ?? "") || undefined,
        email: String(form.get("email") ?? ""),
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
      if (!response.ok) throw new Error("No se pudo enviar el diagnóstico");
      setStatus("success");
      trackEvent("form_complete", { source: "diagnostico_page" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-center text-lg font-medium text-ink">
        Gracias. Revisaré tu diagnóstico y te contactaré con los siguientes pasos.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocus={markStarted} className="space-y-5">
      <h3 className="text-lg font-semibold text-ink">Recibe tu diagnóstico completo</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="nombre" placeholder="Nombre" required className={inputClass} />
        <input name="empresa" placeholder="Empresa" className={inputClass} />
        <input name="cargo" placeholder="Cargo" className={inputClass} />
        <input type="email" name="email" placeholder="Email" required className={inputClass} />
        <input name="colaboradores" placeholder="N.º aprox. de colaboradores" className={inputClass} />
      </div>
      <textarea
        name="problema"
        placeholder="¿Qué problema te gustaría resolver primero? (opcional)"
        rows={3}
        className={inputClass}
      />

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
        <p className="text-sm text-red-400">No se pudo enviar el formulario. Intenta de nuevo.</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-gold px-6 py-4 text-sm font-semibold uppercase tracking-wide text-paper transition hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Enviando..." : "Enviar →"}
      </button>
    </form>
  );
}

const inputClass = "w-full rounded-lg border border-ink/20 bg-paper px-4 py-3 text-ink";
