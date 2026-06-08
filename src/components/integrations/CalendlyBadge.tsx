"use client";

import Script from "next/script";
import { calendlyBadge } from "@/data/calendly";

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (options: typeof calendlyBadge) => void;
    };
  }
}

export function CalendlyBadge() {
  return (
    <Script
      src="https://assets.calendly.com/assets/external/widget.js"
      strategy="lazyOnload"
      onLoad={() => {
        window.Calendly?.initBadgeWidget(calendlyBadge);
      }}
    />
  );
}
