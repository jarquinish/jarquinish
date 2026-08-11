export type ServiceId = "charlas" | "talleres" | "consultoria-ia";

export type ServiceCard = {
  id: ServiceId;
  eyebrow: string;
  headline: string[];
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  microcopy: string;
};

export const services: ServiceCard[] = [
  {
    id: "charlas",
    eyebrow: "Servicio 01 — Charlas y conferencias",
    headline: ["IDEAS QUE MUEVEN", "PERSONAS Y NEGOCIOS."],
    description:
      "Conferencias diseñadas para equipos, empresas, asociaciones, universidades y eventos que buscan entender cómo la inteligencia artificial, el marketing, la marca y la tecnología están cambiando la forma de vender, comunicar y construir negocios.",
    bullets: [
      "Inteligencia Artificial para potenciar ventas",
      "IA aplicada al Marketing",
      "IA aplicada al sector inmobiliario",
      "Marca Personal + Inteligencia Artificial",
      "Marketing y construcción de marca",
      "DATA Driven Marketing",
      "El futuro del marketing",
      "Inteligencia Artificial para equipos comerciales",
      "Automatización y nuevas formas de trabajar",
      "Customer Experience",
      "Innovación y transformación digital",
    ],
    ctaLabel: "CONTRATA UNA CHARLA →",
    ctaHref: "/charlas",
    microcopy: "Cuéntame sobre tu evento, audiencia y objetivo.",
  },
  {
    id: "talleres",
    eyebrow: "Servicio 02 — Talleres",
    headline: ["DE ENTENDER LA IA", "A SABER UTILIZARLA."],
    description:
      "Talleres prácticos para convertir conceptos de inteligencia artificial, marketing y automatización en habilidades aplicables desde el primer día.",
    bullets: [
      "Workshops ejecutivos",
      "Talleres para equipos comerciales",
      "Talleres para marketing",
      "Talleres para inmobiliarios",
      "Talleres para asesores financieros",
      "Talleres de Marca Personal + IA",
      "Laboratorios de prompts",
      "Automatización de procesos",
      "IA aplicada a generación de contenidos",
      "IA aplicada a ventas y prospección",
    ],
    ctaLabel: "COTIZA UN TALLER →",
    ctaHref: "/talleres",
    microcopy: "Diseñamos el formato de acuerdo con tu equipo y tus objetivos.",
  },
  {
    id: "consultoria-ia",
    eyebrow: "Servicio 03 — Consultoría de IA",
    headline: ["NO NECESITAS MÁS", "HERRAMIENTAS.", "NECESITAS SABER", "CUÁLES IMPLEMENTAR."],
    description:
      "Consultoría para identificar, diseñar e implementar oportunidades reales de inteligencia artificial dentro de marketing, ventas, comunicación, CRM y experiencia de cliente.",
    bullets: [
      "Marketing",
      "Ventas",
      "CRM",
      "Generación de leads",
      "Automatización",
      "Atención al cliente",
      "Contenido",
      "Social Media",
      "Investigación",
      "Análisis de DATA",
      "Reporting",
      "Inteligencia comercial",
      "Personalización",
      "Productividad de equipos",
    ],
    ctaLabel: "COTIZA UNA CONSULTORÍA DE IA →",
    ctaHref: "/consultoria-ia",
    microcopy: "No afirmamos dominio de plataformas específicas sin haberlo validado contigo.",
  },
];

export const consultingFlow = [
  "PROBLEMA DE NEGOCIO",
  "PROCESO",
  "DATA",
  "HERRAMIENTA",
  "AUTOMATIZACIÓN",
  "IMPLEMENTACIÓN",
  "MEDICIÓN",
];

export const consultingSolutions = [
  "IA generativa",
  "Agentes de IA",
  "Automatizaciones",
  "Chatbots",
  "Integración con CRM",
  "Workflows",
  "Generación de contenido",
  "Research automatizado",
  "Dashboards",
  "Lead scoring",
  "Asistentes internos",
  "Bases de conocimiento",
  "Procesamiento de documentos",
  "Análisis de clientes",
];

export const consultingMethodology = [
  {
    number: "01",
    title: "DIAGNÓSTICO",
    description: "Identificamos procesos, dolores y oportunidades.",
  },
  {
    number: "02",
    title: "PRIORIZACIÓN",
    description: "Evaluamos impacto, complejidad y viabilidad.",
  },
  {
    number: "03",
    title: "DISEÑO",
    description: "Construimos el workflow y seleccionamos herramientas.",
  },
  {
    number: "04",
    title: "IMPLEMENTACIÓN",
    description: "Integramos soluciones y automatizaciones.",
  },
  {
    number: "05",
    title: "ADOPCIÓN",
    description: "Capacitamos al equipo.",
  },
  {
    number: "06",
    title: "MEDICIÓN",
    description: "Evaluamos impacto y optimizamos.",
  },
];

export const consultingPrinciples = [
  "MENOS FRICCIÓN",
  "MÁS VELOCIDAD",
  "MEJOR INFORMACIÓN",
  "MÁS CONVERSIÓN",
  "MEJOR EXPERIENCIA",
];

export const charlasTemas = [
  "Inteligencia Artificial para potenciar ventas",
  "IA aplicada al Marketing",
  "IA aplicada al sector inmobiliario",
  "Marca Personal + Inteligencia Artificial",
  "Marketing y construcción de marca",
  "DATA Driven Marketing",
  "El futuro del marketing",
  "Inteligencia Artificial para equipos comerciales",
  "Automatización y nuevas formas de trabajar",
  "Customer Experience",
  "Innovación y transformación digital",
];

export const charlasAudiencias = [
  "Equipos comerciales y de ventas",
  "Equipos de marketing",
  "Empresas y corporativos",
  "Asociaciones e industria inmobiliaria",
  "Universidades y estudiantes",
  "Organizadores de eventos y congresos",
];

export const charlasFormatos = [
  "Keynote (30–60 min)",
  "Panel o conversación moderada",
  "Charla + sesión de preguntas",
  "Charla + taller complementario",
  "Formato presencial o virtual",
];

export const charlasFaq = [
  {
    question: "¿En qué ciudades o países puedes dar charlas?",
    answer:
      "Trabajo tanto en formato presencial como virtual. Para eventos presenciales, cuéntame la ciudad y fecha para revisar disponibilidad y logística.",
  },
  {
    question: "¿Adaptas el contenido a mi industria o audiencia?",
    answer:
      "Sí. Cada charla se ajusta según la industria, el nivel de la audiencia y el objetivo del evento, manteniendo la esencia del tema elegido.",
  },
  {
    question: "¿Cuánto dura una charla?",
    answer:
      "El formato más común es de 30 a 60 minutos, pero puede ajustarse según la agenda del evento.",
  },
  {
    question: "¿Cómo empezamos?",
    answer:
      "Completa el formulario de contratación con la información de tu evento y te responderé con disponibilidad y propuesta.",
  },
];
