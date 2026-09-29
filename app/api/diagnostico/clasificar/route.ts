import { NextResponse } from "next/server";
import { classifyTarea, VALID_CLASSIFICATIONS, type TaskClassification } from "@/lib/diagnostico";

const SYSTEM_PROMPT = `Clasificas una tarea repetitiva que describe el dueño o líder de una empresa, en EXACTAMENTE una de estas 4 categorías. Responde solo con la palabra de la categoría, en minúsculas, sin explicación ni puntuación.

automatizable: es mecánica, sigue reglas claras y no requiere juicio (capturar datos, generar reportes, agendar, copiar/mover información, dar seguimiento a pendientes).
asistible: requiere redactar, analizar, resumir o crear algo donde la IA puede preparar un primer borrador, pero una persona debe revisar y decidir.
humana: requiere negociación, relación de confianza, decisión estratégica, empatía o criterio que no debería automatizarse.
hibrida: combina partes mecánicas con partes que requieren criterio humano.`;

export async function POST(request: Request) {
  let tarea: unknown;
  try {
    const body = await request.json();
    tarea = body?.tarea;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (typeof tarea !== "string" || tarea.trim().length < 2) {
    return NextResponse.json({ error: "Falta 'tarea'" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ classification: classifyTarea(tarea), source: "heuristic" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 20,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: tarea.slice(0, 500) }],
      }),
      signal: AbortSignal.timeout(6000),
    });

    if (!response.ok) throw new Error(`Anthropic respondió ${response.status}`);

    const data = await response.json();
    const text = (data?.content ?? [])
      .filter((block: { type: string }) => block.type === "text")
      .map((block: { text: string }) => block.text)
      .join("")
      .trim()
      .toLowerCase();

    const classification = VALID_CLASSIFICATIONS.find((c) => text.includes(c));
    if (!classification) throw new Error("Respuesta de IA no reconocida");

    return NextResponse.json({ classification: classification as TaskClassification, source: "ai" });
  } catch {
    return NextResponse.json({ classification: classifyTarea(tarea), source: "heuristic-fallback" });
  }
}
