import Link from "next/link";

type AdminSaveBarProps = {
  isDirty: boolean;
  pending: boolean;
  onSave: () => void;
  previewHref: string;
  message?: string | null;
  error?: string | null;
};

export function AdminSaveBar({
  isDirty,
  pending,
  onSave,
  previewHref,
  message,
  error,
}: AdminSaveBarProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-blue/10 bg-white/95 px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:px-6"
      role="region"
      aria-label="Save controls"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1">
          {isDirty ? (
            <p className="font-body text-sm font-medium text-brand-accent">
              Unsaved changes — save to publish on the public site.
            </p>
          ) : (
            <p className="font-body text-sm text-brand-muted">
              All changes saved.
            </p>
          )}
          {message ? (
            <p className="font-body text-sm text-brand-navy">
              {message}{" "}
              <Link
                href={previewHref}
                target="_blank"
                className="font-medium underline focus-settle"
              >
                View on site
              </Link>
            </p>
          ) : null}
          {error ? (
            <p className="font-body text-sm text-brand-accent" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Link
            href={previewHref}
            target="_blank"
            className="rounded-lg border border-brand-blue/20 px-4 py-2.5 font-body text-sm text-brand-navy focus-settle hover:bg-brand-surface"
          >
            Preview
          </Link>
          <button
            type="button"
            onClick={onSave}
            disabled={pending || !isDirty}
            className="rounded-lg bg-brand-navy px-4 py-2.5 font-body text-sm font-medium text-white focus-settle disabled:opacity-50"
          >
            {pending ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
