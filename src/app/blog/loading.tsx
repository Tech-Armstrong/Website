function SkeletonBar({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-brand-surface ${className ?? ""}`}
      aria-hidden
    />
  );
}

function BlogCardSkeleton() {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white">
      <SkeletonBar className="aspect-[16/10] w-full rounded-none" />
      <div className="flex flex-1 flex-col p-6">
        <SkeletonBar className="mb-3 h-4 w-40" />
        <SkeletonBar className="mb-3 h-6 w-full" />
        <SkeletonBar className="mb-2 h-4 w-full" />
        <SkeletonBar className="mb-5 h-4 w-[85%]" />
        <SkeletonBar className="h-4 w-28" />
      </div>
    </article>
  );
}

export default function BlogLoading() {
  return (
    <main id="main-content" className="px-4 pb-12 pt-28 lg:pb-16 lg:pt-32">
      <div className="mx-auto max-w-[1200px]">
        <SkeletonBar className="mb-6 h-4 w-48" />
        <SkeletonBar className="mb-4 h-10 w-32" />
        <SkeletonBar className="mb-12 h-5 w-full max-w-xl" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
