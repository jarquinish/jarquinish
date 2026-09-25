"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";
import { captureUtmContext } from "@/lib/utm";

export function PageViewTracker({ event }: { event: AnalyticsEvent }) {
  useEffect(() => {
    captureUtmContext();
    trackEvent(event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
