export default function RootLoading() {
  return (
    <div className="min-h-[50vh] px-4 pt-28">
      <div className="site-container space-y-6">
        <div className="animate-pulse rounded-md bg-brand-surface h-8 w-64" />
        <div className="animate-pulse rounded-md bg-brand-surface h-4 w-full max-w-2xl" />
        <div className="animate-pulse rounded-md bg-brand-surface h-4 w-3/4 max-w-xl" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="animate-pulse rounded-xl bg-brand-surface h-40" />
          <div className="animate-pulse rounded-xl bg-brand-surface h-40" />
        </div>
      </div>
    </div>
  );
}
