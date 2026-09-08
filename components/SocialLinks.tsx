"use client";

import { profile } from "@/data/profile";
import { getWhatsappLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { LinkedInIcon, TikTokIcon, WhatsAppIcon } from "./icons";

type Props = {
  className?: string;
  iconClassName?: string;
};

export function SocialLinks({ className, iconClassName = "h-5 w-5" }: Props) {
  const whatsappHref = getWhatsappLink("general");

  return (
    <div className={className ?? "flex items-center gap-4"}>
      {whatsappHref && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hablemos por WhatsApp"
          onClick={() => trackEvent("whatsapp_click", { source: "social_links" })}
          className="transition hover:text-accent"
        >
          <WhatsAppIcon className={iconClassName} />
        </a>
      )}
      <a
        href={profile.contact.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn de Miguel Jarquín"
        className="transition hover:text-accent"
      >
        <LinkedInIcon className={iconClassName} />
      </a>
      <a
        href={profile.contact.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok de Miguel Jarquín"
        className="transition hover:text-accent"
      >
        <TikTokIcon className={iconClassName} />
      </a>
    </div>
  );
}
