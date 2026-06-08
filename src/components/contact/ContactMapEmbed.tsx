"use client";

import { useState } from "react";

type ContactMapEmbedProps = {
  src: string;
  title: string;
};

export function ContactMapEmbed({ src, title }: ContactMapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[#eef0f2]">
      {!loaded ? (
        <div
          className="absolute inset-0 animate-pulse bg-brand-surface"
          aria-hidden
        />
      ) : null}
      <iframe
        src={src}
        title={title}
        className={`h-full w-full transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
