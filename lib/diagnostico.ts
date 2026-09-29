/**
 * Motor del "Diagnóstico IA + Automatización": preguntas, pesos internos de
 * scoring y generación del resultado personalizado. Todo el cálculo es
 * determinístico (sin llamadas a un modelo) para que la experiencia sea
 * instantánea y no dependa de infraestructura adicional.
 */

export type Dimension = "ia" | "automatizacion" | "datos" | "personas";

export type Stage = "Explorando" | "Activando" | "Integrando" | "Escalando";

export type QuestionOption = { value: string; label: string };

export type Question = {
  id: keyof Answers;
  kind: "single" | "multi" | "text";
  eyebrow: string;
  title: string;
  helper?: string;
  options?: QuestionOption[];
  maxSelections?: number;
  placeholder?: string;
  microcopy?: string;
  interstitial?: string;
};

export type Answers = {
  rol?: string;
  tiempoPerdido?: string[];
  tareaRepetitiva?: string;
  datos?: string;
  iaUso?: string;
  automatizacionEscenario?: string;
  cuelloBotella?: string;
  prioridad90dias?: string;
};

const opts = (labels: string[]): QuestionOption[] =>
  labels.map((label) => ({ value: label, label }));

export const QUESTIONS: Question[] = [
  {
    id: "rol",
    kind: "single",
    eyebrow: "1 · El contexto",
    title: "Para empezar, ¿qué describe mejor tu realidad?",
    options: opts([
      "Dirijo una empresa",
      "Lidero un área o equipo",
      "Trabajo en marketing o ventas",
      "Estoy en operaciones o procesos",
      "Recursos Humanos / Talento",
      "Tecnología / Innovación",
      "Otra",
    ]),
  },
  {
    id: "tiempoPerdido",
    kind: "multi",
    maxSelections: 2,
    eyebrow: "2 · El tiempo",
    title: "Piensa en tu equipo esta semana. ¿Dónde se está yendo demasiado tiempo?",
    helper: "Elige hasta 2.",
    options: opts([
      "Correos y mensajes",
      "Reportes",
      "Buscar información",
      "Crear presentaciones o documentos",
      "Seguimientos",
      "Capturar información",
      "Analizar datos",
      "Atención a clientes",
      "Reuniones",
      "Procesos administrativos",
      "Crear contenido",
      "Otro",
    ]),
    microcopy: "Aquí probablemente ya existe una oportunidad de automatización.",
  },
  {
    id: "tareaRepetitiva",
    kind: "text",
    eyebrow: "3 · El trabajo repetitivo",
    title: "Si mañana pudieras eliminar una tarea repetitiva de tu equipo, ¿cuál sería?",
    placeholder: "Escribe la tarea con tus palabras…",
  },
  {
    id: "datos",
    kind: "single",
    eyebrow: "4 · La información",
    title: "Tu empresa probablemente tiene muchos datos. La pregunta es: ¿qué hacen con ellos?",
    options: opts([
      "Los usamos para tomar decisiones",
      "Tenemos datos, pero están dispersos",
      "Generamos reportes, pero poco análisis",
      "Dependemos mucho de Excel",
      "Sabemos que tenemos información valiosa, pero no la aprovechamos",
      "No estoy seguro",
    ]),
  },
  {
    id: "iaUso",
    kind: "single",
    eyebrow: "5 · Inteligencia Artificial",
    title: "Cuando alguien de tu equipo necesita usar IA, ¿qué ocurre realmente?",
    options: opts([
      "Cada persona usa sus propias herramientas",
      "Tenemos algunas herramientas autorizadas",
      "Ya existen procesos definidos",
      "Estamos haciendo pruebas",
      "Prácticamente no la usamos",
      "No sabemos qué información puede o no compartirse",
    ]),
  },
  {
    id: "automatizacionEscenario",
    kind: "single",
    eyebrow: "6 · Automatización",
    title: "Un cliente escribe a las 11:47 p. m. ¿Qué ocurre?",
    options: opts([
      "Espera hasta que alguien responda",
      "Recibe una respuesta automática básica",
      "El sistema identifica qué necesita y continúa el proceso",
      "Depende del área",
      "No lo sé",
    ]),
    interstitial:
      "Automatizar no significa quitar personas. Significa decidir dónde realmente necesitas una persona.",
  },
  {
    id: "cuelloBotella",
    kind: "single",
    eyebrow: "7 · El cuello de botella",
    title: "¿Qué frase escuchas más dentro de tu empresa?",
    options: opts([
      "“No me dio tiempo”",
      "“¿Dónde está ese archivo?”",
      "“Hay que darle seguimiento”",
      "“Necesito que alguien haga el reporte”",
      "“Tenemos los datos, pero…”",
      "“Siempre lo hemos hecho así”",
      "“¿Quién tiene esa información?”",
      "“Eso depende de una persona”",
    ]),
  },
  {
    id: "prioridad90dias",
    kind: "single",
    eyebrow: "8 · El potencial",
    title: "Si pudieras mejorar solamente UNA cosa durante los próximos 90 días, ¿cuál tendría mayor impacto?",
    options: opts([
      "Recuperar tiempo del equipo",
      "Vender más",
      "Responder más rápido",
      "Conocer mejor al cliente",
      "Tomar mejores decisiones",
      "Reducir errores",
      "Crear contenido a escala",
      "Automatizar procesos",
      "Capacitar al equipo en IA",
      "Encontrar oportunidades que hoy no vemos",
    ]),
  },
];

// ---------------------------------------------------------------------------
// Clasificación de la tarea repetitiva (pregunta 3, texto libre)
// ---------------------------------------------------------------------------

export type TaskClassification = "automatizable" | "asistible" | "humana" | "hibrida";

const AUTOMATIZABLE_HINTS = [
  "reporte", "captur", "copiar", "pegar", "excel", "correo", "agend", "programa",
  "recordatorio", "seguimiento", "factura", "cotiza", "actualiza", "subir", "descarga",
  "llenar", "formulario", "repetitiv", "checklist", "captura",
];
const ASISTIBLE_HINTS = [
  "redact", "escrib", "respond", "analiz", "resum", "traduc", "buscar", "investiga",
  "presentaci", "contenido", "propuesta", "correo",
];
const HUMANA_HINTS = [
  "negocia", "vend", "convence", "decid", "contrat", "despe", "relaci", "cliente dif",
  "conflicto", "estrategia", "reunión importante", "confianza",
];

export function classifyTarea(text: string): TaskClassification {
  const t = text.toLowerCase();
  const score = (hints: string[]) => hints.reduce((n, h) => (t.includes(h) ? n + 1 : n), 0);
  const a = score(AUTOMATIZABLE_HINTS);
  const b = score(ASISTIBLE_HINTS);
  const h = score(HUMANA_HINTS);

  if (a === 0 && b === 0 && h === 0) return "hibrida";
  if (a > 0 && (b > 0 || h > 0)) return "hibrida";
  if (a >= b && a >= h) return "automatizable";
  if (h > b) return "humana";
  return "asistible";
}

// ---------------------------------------------------------------------------
// Pesos de scoring
// ---------------------------------------------------------------------------

type Delta = Partial<Record<Dimension, number>>;

const BASELINE = 50;

const Q2_WEIGHTS: Record<string, Delta> = {
  "Correos y mensajes": { personas: -6, automatizacion: -4 },
  "Reportes": { datos: -6, automatizacion: -6 },
  "Buscar información": { datos: -8 },
  "Crear presentaciones o documentos": { automatizacion: -6 },
  "Seguimientos": { personas: -4, automatizacion: -6 },
  "Capturar información": { datos: -6, automatizacion: -6 },
  "Analizar datos": { datos: -8 },
  "Atención a clientes": { personas: -6, ia: -2 },
  "Reuniones": { personas: -6 },
  "Procesos administrativos": { automatizacion: -8 },
  "Crear contenido": { ia: -4, automatizacion: -4 },
  "Otro": { automatizacion: -3 },
};

const Q4_DATOS_WEIGHTS: Record<string, Delta> = {
  "Los usamos para tomar decisiones": { datos: 30 },
  "Tenemos datos, pero están dispersos": { datos: -10 },
  "Generamos reportes, pero poco análisis": { datos: -5 },
  "Dependemos mucho de Excel": { datos: -15 },
  "Sabemos que tenemos información valiosa, pero no la aprovechamos": { datos: -15 },
  "No estoy seguro": { datos: -20 },
};

const Q5_IA_WEIGHTS: Record<string, Delta> = {
  "Cada persona usa sus propias herramientas": { ia: 5, personas: -5 },
  "Tenemos algunas herramientas autorizadas": { ia: 15, personas: 5 },
  "Ya existen procesos definidos": { ia: 30, personas: 15 },
  "Estamos haciendo pruebas": { ia: 5 },
  "Prácticamente no la usamos": { ia: -25 },
  "No sabemos qué información puede o no compartirse": { ia: -10, personas: -15 },
};

const Q6_AUTOMATIZACION_WEIGHTS: Record<string, Delta> = {
  "Espera hasta que alguien responda": { automatizacion: -20 },
  "Recibe una respuesta automática básica": { automatizacion: 5 },
  "El sistema identifica qué necesita y continúa el proceso": { automatizacion: 30 },
  "Depende del área": { automatizacion: -10 },
  "No lo sé": { automatizacion: -15 },
};

const Q7_CUELLO_WEIGHTS: Record<string, Delta> = {
  "“No me dio tiempo”": { personas: -10 },
  "“¿Dónde está ese archivo?”": { datos: -15 },
  "“Hay que darle seguimiento”": { automatizacion: -10 },
  "“Necesito que alguien haga el reporte”": { datos: -10, automatizacion: -10 },
  "“Tenemos los datos, pero…”": { datos: -15 },
  "“Siempre lo hemos hecho así”": { personas: -20 },
  "“¿Quién tiene esa información?”": { datos: -15, personas: -10 },
  "“Eso depende de una persona”": { automatizacion: -15, personas: -10 },
};

const TAREA_WEIGHTS: Record<TaskClassification, Delta> = {
  automatizable: { automatizacion: -3 },
  hibrida: { automatizacion: -2 },
  asistible: { ia: 3 },
  humana: {},
};

function applyDelta(scores: Record<Dimension, number>, delta?: Delta) {
  if (!delta) return;
  for (const [dim, value] of Object.entries(delta) as [Dimension, number][]) {
    scores[dim] += value;
  }
}

function clamp(value: number) {
  return Math.max(5, Math.min(95, Math.round(value)));
}

export function computeScores(answers: Answers): Record<Dimension, number> {
  const scores: Record<Dimension, number> = {
    ia: BASELINE,
    automatizacion: BASELINE,
    datos: BASELINE,
    personas: BASELINE,
  };

  for (const tema of answers.tiempoPerdido ?? []) {
    applyDelta(scores, Q2_WEIGHTS[tema]);
  }
  if (answers.tareaRepetitiva) {
    applyDelta(scores, TAREA_WEIGHTS[classifyTarea(answers.tareaRepetitiva)]);
  }
  if (answers.datos) applyDelta(scores, Q4_DATOS_WEIGHTS[answers.datos]);
  if (answers.iaUso) applyDelta(scores, Q5_IA_WEIGHTS[answers.iaUso]);
  if (answers.automatizacionEscenario) {
    applyDelta(scores, Q6_AUTOMATIZACION_WEIGHTS[answers.automatizacionEscenario]);
  }
  if (answers.cuelloBotella) applyDelta(scores, Q7_CUELLO_WEIGHTS[answers.cuelloBotella]);

  return {
    ia: clamp(scores.ia),
    automatizacion: clamp(scores.automatizacion),
    datos: clamp(scores.datos),
    personas: clamp(scores.personas),
  };
}

export function stageFor(score: number): Stage {
  if (score < 30) return "Explorando";
  if (score < 55) return "Activando";
  if (score < 80) return "Integrando";
  return "Escalando";
}

export const DIMENSION_LABELS: Record<Dimension, string> = {
  ia: "IA",
  automatizacion: "Automatización",
  datos: "Datos",
  personas: "Personas",
};

export const DIMENSION_DESCRIPTIONS: Record<Dimension, string> = {
  ia: "Nivel de aprovechamiento actual",
  automatizacion: "Potencial de procesos automatizables",
  datos: "Capacidad para convertir información en decisiones",
  personas: "Nivel de adopción y preparación del equipo",
};

// ---------------------------------------------------------------------------
// Copys personalizados del resultado
// ---------------------------------------------------------------------------

const NO_AUTOMATIZAR_POR_ROL: Record<string, string> = {
  "Dirijo una empresa":
    "La visión y las decisiones de fondo del negocio siguen siendo tuyas: la IA te da mejores datos, no decide por ti.",
  "Lidero un área o equipo":
    "El desarrollo y la motivación de tu equipo dependen de ti; ninguna herramienta reemplaza esa cercanía.",
  "Trabajo en marketing o ventas":
    "La negociación y la confianza con el cliente siguen siendo terreno humano.",
  "Estoy en operaciones o procesos":
    "El criterio para resolver excepciones sigue necesitando a alguien con experiencia.",
  "Recursos Humanos / Talento":
    "Las conversaciones difíciles y las decisiones sobre personas deben seguir siendo humanas.",
  "Tecnología / Innovación":
    "Decidir qué problema resolver primero sigue siendo una decisión estratégica, no técnica.",
  "Otra":
    "El criterio y la relación con las personas siguen siendo terreno humano; ahí la IA acompaña, no reemplaza.",
};

const FALLBACK_AUTOMATIZAR: Record<string, string> = {
  "Correos y mensajes": "Clasificar y dar primera respuesta a los correos y mensajes que se repiten.",
  "Reportes": "Armar los reportes recurrentes a partir de la información que ya generas.",
  "Buscar información": "Reunir y ordenar la información que hoy tu equipo busca manualmente.",
  "Crear presentaciones o documentos": "Generar primeras versiones de presentaciones y documentos desde una plantilla.",
  "Seguimientos": "Dar seguimiento automático a pendientes antes de que alguien tenga que acordarse.",
  "Capturar información": "Capturar información desde su origen, sin pasar por captura manual.",
  "Analizar datos": "Preparar un primer análisis de tus datos antes de que una persona lo revise.",
  "Atención a clientes": "Responder las preguntas frecuentes de tus clientes en el primer contacto.",
  "Reuniones": "Convertir minutas y acuerdos de reunión en tareas de seguimiento.",
  "Procesos administrativos": "Automatizar los pasos administrativos que hoy dependen de pasar información de un lado a otro.",
  "Crear contenido": "Generar primeras versiones de contenido que tu equipo solo tenga que ajustar.",
  "Otro": "El proceso repetitivo que describiste tiene buen potencial para automatizarse.",
};

const FALLBACK_POTENCIAR: Record<string, string> = {
  "Recuperar tiempo del equipo": "Usar IA para preparar el primer borrador del trabajo de tu equipo, no para reemplazarlo.",
  "Vender más": "Usar IA para identificar a qué prospectos darles seguimiento primero.",
  "Responder más rápido": "Usar IA para dar una primera respuesta inmediata mientras una persona resuelve lo importante.",
  "Conocer mejor al cliente": "Usar IA para encontrar patrones en lo que tus clientes ya te están diciendo.",
  "Tomar mejores decisiones": "Usar IA para convertir tus datos dispersos en una recomendación clara.",
  "Reducir errores": "Usar IA para revisar y validar el trabajo antes de que llegue a una persona.",
  "Crear contenido a escala": "Usar IA para producir más contenido sin multiplicar el equipo.",
  "Automatizar procesos": "Usar IA para decidir qué parte del proceso automatizar primero.",
  "Capacitar al equipo en IA": "Usar IA como copiloto diario de tu equipo, no como un proyecto aparte.",
  "Encontrar oportunidades que hoy no vemos": "Usar IA para revisar tu operación completa y encontrar lo que no ves desde dentro.",
};

function buildOportunidadAutomatizar(answers: Answers, clasificacion: TaskClassification): string {
  if (answers.tareaRepetitiva && (clasificacion === "automatizable" || clasificacion === "hibrida")) {
    return `Lo que describiste — "${answers.tareaRepetitiva.trim()}" — es un buen primer candidato: es repetitivo, sigue reglas claras y hoy depende de una persona para ejecutarse.`;
  }
  const primerTema = answers.tiempoPerdido?.[0];
  if (primerTema && FALLBACK_AUTOMATIZAR[primerTema]) return FALLBACK_AUTOMATIZAR[primerTema];
  return "Hay procesos recurrentes en tu operación que hoy dependen de una persona y podrían ejecutarse solos.";
}

function buildOportunidadPotenciar(answers: Answers, clasificacion: TaskClassification): string {
  if (answers.tareaRepetitiva && clasificacion === "asistible") {
    return `Tareas como "${answers.tareaRepetitiva.trim()}" no se automatizan del todo, pero la IA puede preparar el primer borrador para que tu equipo solo decida y ajuste.`;
  }
  if (answers.prioridad90dias && FALLBACK_POTENCIAR[answers.prioridad90dias]) {
    return FALLBACK_POTENCIAR[answers.prioridad90dias];
  }
  return "Usar IA como copiloto de tu equipo, para preparar el trabajo antes de que una persona lo revise.";
}

function buildInsight(scores: Record<Dimension, number>): string {
  if (scores.datos - scores.automatizacion > 15) {
    return "Tienes datos. Lo que falta es convertirlos en decisiones y acciones.";
  }
  if (scores.ia >= 50 && scores.personas < 45) {
    return "La IA ya entró a tu organización. El siguiente reto es pasar del uso individual a una estrategia compartida.";
  }
  const min = Math.min(scores.ia, scores.automatizacion, scores.datos, scores.personas);
  if (scores.automatizacion === min && scores.automatizacion <= 40) {
    return "Tu equipo está utilizando tiempo humano en tareas que una máquina podría preparar antes de que una persona intervenga.";
  }
  return "Tu mayor oportunidad no parece estar en comprar más tecnología, sino en conectar mejor la que ya tienes.";
}

const INTERVENCIONES = [
  "Taller de IA aplicada",
  "Taller de automatización estratégica",
  "Laboratorio práctico por área",
  "Workshop para líderes",
  "Mapeo de procesos y oportunidades",
  "Estrategia de adopción de IA",
  "Conferencia + práctica",
  "Programa personalizado",
] as const;

function buildIntervencion(
  scores: Record<Dimension, number>,
  answers: Answers
): (typeof INTERVENCIONES)[number] {
  if (answers.prioridad90dias === "Capacitar al equipo en IA") return "Taller de IA aplicada";
  if (answers.rol === "Dirijo una empresa") return "Workshop para líderes";

  const entries = Object.entries(scores) as [Dimension, number][];
  const [lowestDim] = entries.sort((a, b) => a[1] - b[1])[0];

  if (lowestDim === "datos") return "Mapeo de procesos y oportunidades";
  if (lowestDim === "automatizacion") return "Taller de automatización estratégica";
  if (answers.iaUso === "No sabemos qué información puede o no compartirse") return "Estrategia de adopción de IA";
  if (answers.rol === "Tecnología / Innovación") return "Laboratorio práctico por área";

  const avg = entries.reduce((sum, [, v]) => sum + v, 0) / entries.length;
  if (avg >= 70) return "Programa personalizado";

  return "Conferencia + práctica";
}

export type DiagnosticoResult = {
  scores: Record<Dimension, number>;
  stages: Record<Dimension, Stage>;
  insight: string;
  oportunidades: {
    automatizar: string;
    potenciar: string;
    noAutomatizar: string;
  };
  intervencion: (typeof INTERVENCIONES)[number];
  clasificacionTarea: TaskClassification;
};

export function buildDiagnosticoResult(answers: Answers): DiagnosticoResult {
  const scores = computeScores(answers);
  const stages = {
    ia: stageFor(scores.ia),
    automatizacion: stageFor(scores.automatizacion),
    datos: stageFor(scores.datos),
    personas: stageFor(scores.personas),
  };
  const clasificacionTarea = answers.tareaRepetitiva ? classifyTarea(answers.tareaRepetitiva) : "hibrida";

  return {
    scores,
    stages,
    insight: buildInsight(scores),
    oportunidades: {
      automatizar: buildOportunidadAutomatizar(answers, clasificacionTarea),
      potenciar: buildOportunidadPotenciar(answers, clasificacionTarea),
      noAutomatizar: NO_AUTOMATIZAR_POR_ROL[answers.rol ?? "Otra"] ?? NO_AUTOMATIZAR_POR_ROL["Otra"],
    },
    intervencion: buildIntervencion(scores, answers),
    clasificacionTarea,
  };
}
