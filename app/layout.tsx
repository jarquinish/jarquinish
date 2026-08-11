import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCTA } from "@/components/StickyCTA";

export const metadata: Metadata = {
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
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <StickyCTA />
      </body>
    </html>
  );
}
