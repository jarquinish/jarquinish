import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCTA } from "@/components/StickyCTA";
import { Analytics } from "@/components/Analytics";
import { profile } from "@/data/profile";

const SITE_NAME = "Miguel Jarquín";
const SITE_DESCRIPTION =
  "Charlas, talleres y consultoría de inteligencia artificial aplicada a marketing, ventas y experiencia de cliente.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${SITE_NAME} — Charlas, talleres y consultoría de IA`,
    template: "%s | Miguel Jarquín",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Charlas, talleres y consultoría de IA`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Charlas, talleres y consultoría de IA`,
    description: SITE_DESCRIPTION,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: profile.summary,
  email: `mailto:${profile.contact.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.contact.location,
  },
  sameAs: [profile.contact.linkedin, profile.contact.tiktok].filter(Boolean),
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://migueljarquin.com",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Analytics />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <StickyCTA />
      </body>
    </html>
  );
}
