"use client";

import type { MarketingHero } from "@/types/marketing-page";
import { AdminFileUpload } from "./AdminFileUpload";

type AdminHeroEditorProps = {
  hero: MarketingHero;
  uploadSection: string;
  onChange: (hero: MarketingHero) => void;
};

export function AdminHeroEditor({
  hero,
  uploadSection,
  onChange,
}: AdminHeroEditorProps) {
  return (
    <section className="rounded-2xl border border-brand-blue/10 bg-white p-5">
      <h2 className="font-display text-lg font-semibold text-brand-navy">Hero</h2>
      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-1 block font-body text-sm font-medium text-brand-navy">
            Title
          </label>
          <input
            value={hero.title}
            onChange={(event) =>
              onChange({ ...hero, title: event.target.value })
            }
            className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
          />
        </div>
        <div>
          <label className="mb-1 block font-body text-sm font-medium text-brand-navy">
            Paragraphs (one per line)
          </label>
          <textarea
            value={hero.paragraphs.join("\n")}
            onChange={(event) =>
              onChange({
                ...hero,
                paragraphs: event.target.value
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean),
              })
            }
            rows={4}
            className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
          />
        </div>
        <div>
          <label className="mb-1 block font-body text-sm font-medium text-brand-navy">
            Hero image URL
          </label>
          <input
            value={hero.image ?? ""}
            onChange={(event) =>
              onChange({ ...hero, image: event.target.value || undefined })
            }
            className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
          />
          <div className="mt-2">
            <AdminFileUpload
              section={uploadSection}
              accept="image/jpeg,image/png,image/webp"
              label="Upload hero image"
              onUploaded={(url) => onChange({ ...hero, image: url })}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
