import type { MetadataRoute } from "next";
import { talleres } from "@/data/talleres";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://migueljarquin.com").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/diagnostico", priority: 0.9 },
    { path: "/charlas", priority: 0.8 },
    { path: "/talleres", priority: 0.8 },
    { path: "/consultoria-ia", priority: 0.8 },
    { path: "/contacto", priority: 0.6 },
    { path: "/aviso-de-privacidad", priority: 0.2 },
  ].map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    priority: route.priority,
  }));

  const tallerRoutes = talleres.map((taller) => ({
    url: `${SITE_URL}/talleres/${taller.slug}`,
    lastModified: new Date(),
    priority: 0.6,
  }));

  return [...staticRoutes, ...tallerRoutes];
}
