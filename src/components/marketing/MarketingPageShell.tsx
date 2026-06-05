import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { Footer } from "@/components/layout/Footer";

type MarketingPageShellProps = {
  title: string;
  sidebar?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
};

export function MarketingPageShell({
  title,
  sidebar,
  fullWidth = false,
  children,
}: MarketingPageShellProps) {
  return (
    <>
      <main id="main-content" className="pb-10 pt-28 lg:pb-12 lg:pt-32">
        <div className="site-container px-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: title },
            ]}
          />

          <header className="sr-only">
            <h1>{title}</h1>
          </header>

          {fullWidth || !sidebar ? (
            <div className="min-w-0">{children}</div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-8">
              <div className="min-w-0">{children}</div>
              {sidebar}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
