export type WhatsappSource = "charla" | "taller" | "ia" | "general";

const DEFAULT_MESSAGES: Record<WhatsappSource, string> = {
  charla: "Hola Miguel, me interesa conocer disponibilidad y propuesta para una charla.",
  taller: "Hola Miguel, quiero cotizar un taller para mi equipo.",
  ia: "Hola Miguel, quiero explorar una implementación de IA para mi empresa.",
  general: "Hola Miguel, quiero platicar sobre un proyecto.",
};

/**
 * Builds a wa.me link with a message prefilled according to where the
 * visitor clicked from. The phone number is never hardcoded — it comes
 * from NEXT_PUBLIC_WHATSAPP_NUMBER so it can be rotated without a deploy.
 */
export function getWhatsappLink(source: WhatsappSource = "general", customMessage?: string): string | null {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) return null;

  const message = customMessage ?? DEFAULT_MESSAGES[source];
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function hasWhatsappNumber(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
}
