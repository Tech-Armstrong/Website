"use client";

import { useState } from "react";

type AdminFileUploadProps = {
  section: string;
  accept: string;
  label: string;
  onUploaded: (url: string) => void;
};

export function AdminFileUpload({
  section,
  accept,
  label,
  onUploaded,
}: AdminFileUploadProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setPending(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("section", section);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Upload failed.");
      }

      onUploaded(data.url);
      event.target.value = "";
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-1">
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-blue/30">
        <span>{pending ? "Uploading..." : label}</span>
        <input
          type="file"
          accept={accept}
          disabled={pending}
          onChange={handleChange}
          className="sr-only"
        />
      </label>
      {error ? (
        <p className="font-body text-xs text-brand-accent" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
