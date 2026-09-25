export type Taller = {
  slug: string;
  nombre: string;
  objetivo: string;
  duracion: string;
  modalidad: string;
  audiencia: string;
  resultados: string[];
};

export const talleres: Taller[] = [
  {
    slug: "workshop-ejecutivo-ia",
    nombre: "Workshop ejecutivo de IA",
    objetivo: "Dar a líderes y directivos un criterio claro para decidir dónde y cómo invertir en IA.",
    duracion: "3–4 horas",
    modalidad: "Presencial o virtual",
    audiencia: "Directores, gerentes y equipos de liderazgo",
    resultados: [
      "Mapa de oportunidades de IA para el negocio",
      "Criterios para priorizar iniciativas",
      "Lenguaje común entre negocio y tecnología",
    ],
  },
  {
    slug: "ia-para-equipos-comerciales",
    nombre: "IA para equipos comerciales",
    objetivo: "Incorporar IA generativa y automatización al proceso de prospección y venta.",
    duracion: "1 día",
    modalidad: "Presencial o virtual",
    audiencia: "Equipos de ventas y gerentes comerciales",
    resultados: [
      "Prompts listos para prospección y seguimiento",
      "Flujo de trabajo con asistentes de IA",
      "Mejora en tiempos de respuesta a leads",
    ],
  },
  {
    slug: "ia-para-marketing",
    nombre: "IA para marketing",
    objetivo: "Aplicar IA a la creación de contenido, campañas y análisis de resultados.",
    duracion: "1 día",
    modalidad: "Presencial o virtual",
    audiencia: "Equipos de marketing y contenido",
    resultados: [
      "Sistema de generación de contenido con IA",
      "Plantillas de prompts por canal",
      "Criterios de medición data-driven",
    ],
  },
  {
    slug: "ia-para-inmobiliarios",
    nombre: "IA para inmobiliarios",
    objetivo: "Aplicar IA a prospección, presentación de propiedades y seguimiento de clientes.",
    duracion: "1 día",
    modalidad: "Presencial o virtual",
    audiencia: "Asesores y equipos comerciales inmobiliarios",
    resultados: [
      "Guiones y prompts para atención de leads",
      "Contenido asistido por IA para propiedades",
      "Proceso de seguimiento más consistente",
    ],
  },
  {
    slug: "ia-para-asesores-financieros",
    nombre: "IA para asesores financieros",
    objetivo: "Usar IA para investigación, comunicación con clientes y generación de contenido educativo.",
    duracion: "1 día",
    modalidad: "Presencial o virtual",
    audiencia: "Asesores y equipos de servicios financieros",
    resultados: [
      "Investigación de mercado asistida por IA",
      "Contenido y comunicación personalizada",
      "Ahorro de tiempo en tareas repetitivas",
    ],
  },
  {
    slug: "marca-personal-mas-ia",
    nombre: "Marca Personal + IA",
    objetivo: "Construir y comunicar una marca personal sólida usando herramientas de IA.",
    duracion: "1 día",
    modalidad: "Presencial o virtual",
    audiencia: "Líderes, asesores y equipos comerciales",
    resultados: [
      "Narrativa de marca personal definida",
      "Plan de contenido asistido por IA",
      "Rutina de publicación sostenible",
    ],
  },
  {
    slug: "laboratorio-de-prompts",
    nombre: "Laboratorio de prompts",
    objetivo: "Dominar la escritura de prompts efectivos para tareas del día a día.",
    duracion: "Medio día",
    modalidad: "Presencial o virtual",
    audiencia: "Cualquier equipo que use herramientas de IA generativa",
    resultados: [
      "Biblioteca de prompts propia",
      "Método para iterar y mejorar resultados",
      "Casos de uso aplicados al puesto de cada participante",
    ],
  },
  {
    slug: "automatizacion-de-procesos",
    nombre: "Automatización de procesos",
    objetivo: "Identificar y automatizar tareas manuales repetitivas dentro del equipo.",
    duracion: "1 día",
    modalidad: "Presencial o virtual",
    audiencia: "Equipos operativos, marketing y ventas",
    resultados: [
      "Mapa de procesos candidatos a automatizar",
      "Primeras automatizaciones funcionando",
      "Criterios para escalar a más procesos",
    ],
  },
  {
    slug: "ia-para-generacion-de-contenidos",
    nombre: "IA aplicada a generación de contenidos",
    objetivo: "Producir contenido de forma consistente y escalable con apoyo de IA.",
    duracion: "Medio día",
    modalidad: "Presencial o virtual",
    audiencia: "Equipos de contenido, social media y marketing",
    resultados: [
      "Flujo de producción de contenido con IA",
      "Plantillas reutilizables por formato",
      "Reducción de tiempo de producción",
    ],
  },
  {
    slug: "ia-para-ventas-y-prospeccion",
    nombre: "IA aplicada a ventas y prospección",
    objetivo: "Usar IA para investigar prospectos, personalizar el acercamiento y dar seguimiento.",
    duracion: "1 día",
    modalidad: "Presencial o virtual",
    audiencia: "Equipos de ventas y desarrollo de negocio",
    resultados: [
      "Proceso de prospección asistido por IA",
      "Mensajes personalizados a escala",
      "Mejor tasa de respuesta en primer contacto",
    ],
  },
];
