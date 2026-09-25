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
        // "Midnight Intelligence" — paleta de marca personal de Miguel
        ink: "#F3F1EB", // Soft Ivory — texto principal
        paper: "#0A0D0F", // Midnight Black — fondo principal
        carbon: "#12181C", // Carbon — fondo secundario
        surface: "#1C252A", // Graphite — tarjetas y módulos
        deep: "#123E47", // Deep Petrol — identidad / secciones invertidas
        accent: "#22C7D6", // Electric Cyan — acentos tecnológicos, íconos, cifras
        accent2: "#3977F6", // Digital Blue — pareja de gradiente del cyan
        gold: "#B89B6A", // Champagne Bronze — CTA y acentos premium
        muted: "#98A5AA", // Titanium — texto secundario
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
