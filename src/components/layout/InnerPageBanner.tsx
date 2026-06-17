import Image from "next/image";
import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type InnerPageBannerProps = {
  title: string;
  backgroundImage: string;
  breadcrumbs: BreadcrumbItem[];
};

export function InnerPageBanner({
  title,
  backgroundImage,
  breadcrumbs,
}: InnerPageBannerProps) {
  return (
    <section
      className="relative min-h-[280px] w-full overflow-hidden lg:min-h-[320px]"
      aria-labelledby="inner-page-banner-heading"
    >
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="hero-overlay absolute inset-0" aria-hidden />

      <div className="relative z-[1] flex min-h-[280px] flex-col items-center justify-center px-4 pt-[calc(var(--site-header-offset)+2rem)] lg:min-h-[320px]">
        <h1
          id="inner-page-banner-heading"
          className="font-display text-4xl font-semibold uppercase tracking-wide text-white lg:text-5xl"
        >
          {title}
        </h1>
      </div>

      <nav
        aria-label="Breadcrumb"
        className="absolute bottom-6 left-4 z-[1] sm:left-6 lg:left-[max(1rem,calc((100vw-var(--container-max))/2+1rem))]"
      >
        <ol className="flex flex-wrap items-center gap-2 font-body text-sm text-white/85">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li
                key={`${item.label}-${index}`}
                className="flex items-center gap-2"
              >
                {index > 0 && (
                  <span aria-hidden="true" className="text-white/50">
                    /
                  </span>
                )}
                {isLast || !item.href ? (
                  <span
                    className={isLast ? "font-medium text-white" : undefined}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </section>
  );
}
