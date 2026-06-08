"use client";

import Image from "next/image";
import { useState } from "react";
import type { MarketingMediaArticle, MarketingMediaPodcast } from "@/types/marketing-page";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type MarketingMediaTabsProps = {
  articles: MarketingMediaArticle[];
  podcasts: MarketingMediaPodcast[];
};

export function MarketingMediaTabs({ articles, podcasts }: MarketingMediaTabsProps) {
  const [tab, setTab] = useState<"articles" | "podcasts">("articles");

  return (
    <section className="pt-6 pb-2" aria-label="Media spotlight">
      <ScrollReveal>
      <div className="mb-6 flex gap-2 border-b border-[#eef0f2]">
        {(["articles", "podcasts"] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`focus-settle px-4 py-2.5 font-display text-sm font-semibold capitalize transition-colors ${
              tab === key
                ? "border-b-2 border-brand-blue text-brand-blue"
                : "text-brand-muted hover:text-brand-navy"
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      </ScrollReveal>

      {tab === "articles" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ScrollReveal key={article.href} delay={index * 60}>
            <a
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className="lift-card focus-settle block rounded-xl border border-[#e8eaed] bg-white p-5"
            >
              {article.logo ? (
                <div className="mb-4 flex h-16 items-center justify-center">
                  <Image
                    src={article.logo}
                    alt=""
                    width={160}
                    height={48}
                    className="max-h-12 w-auto object-contain"
                  />
                </div>
              ) : null}
              <h3 className="font-body text-sm font-medium leading-snug text-brand-navy">
                {article.title}
              </h3>
            </a>
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {podcasts.map((podcast, index) => (
            <ScrollReveal key={podcast.embedUrl} delay={index * 60}>
            <div
              className="lift-card overflow-hidden rounded-xl border border-[#e8eaed] bg-white"
            >
              <div className="aspect-video w-full">
                <iframe
                  src={podcast.embedUrl}
                  title={podcast.title}
                  className="h-full w-full"
                  allowFullScreen
                />
              </div>
              <p className="px-4 py-3 font-body text-sm text-brand-navy">
                {podcast.title}
              </p>
            </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </section>
  );
}
