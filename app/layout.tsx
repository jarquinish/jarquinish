import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCTA } from "@/components/StickyCTA";
import { Analytics } from "@/components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Miguel Jarquín — Charlas, talleres y consultoría de IA",
    template: "%s | Miguel Jarquín",
  },
  description:
    "Charlas, talleres y consultoría de inteligencia artificial aplicada a marketing, ventas y experiencia de cliente.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-body">
        <Analytics />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <StickyCTA />
      </body>
    </html>
  );
}
