import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Mago de Medianoche" — paleta de marca personal de Miguel
        ink: "#F2EBDD", // Marfil — texto principal / superficies claras
        paper: "#17233D", // Azul Tinta — fondo principal
        deep: "#0D1526", // Fondo oscuro — hero y secciones profundas
        surface: "#1F2D4A", // Secciones — tarjetas y paneles sobre el fondo
        accent: "#C8644A", // Terracota — acento de texto/íconos, legible sobre fondo oscuro
        accent2: "#702E3E", // Borgoña — relleno sólido de botones (con texto marfil)
        electric: "#4169E1", // Azul Eléctrico — interacción / hover
        graphite: "#28282A", // Grafito — superficie alterna
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
