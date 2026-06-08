import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type MarketingPageShellProps = {
  title: string;
  sidebar?: ReactNode;
  fullWidth?: boolean;
  compact?: boolean;
  children: ReactNode;
};

export function MarketingPageShell({
  title,
  sidebar,
  fullWidth = false,
  compact = false,
  children,
}: MarketingPageShellProps) {
  return (
    <>
      <main
        id="main-content"
        className={
          compact
            ? "pb-8 pt-28 lg:pb-10 lg:pt-32"
            : "pb-10 pt-28 lg:pb-12 lg:pt-32"
        }
      >
        <div className="site-container px-4">
          <ScrollReveal>
          <Breadcrumbs
            className={compact ? "mb-4" : "mb-8"}
            items={[
              { label: "Home", href: "/" },
              { label: title },
            ]}
          />
          </ScrollReveal>

          <header className="sr-only">
            <h1>{title}</h1>
          </header>

          {fullWidth || !sidebar ? (
            <div className="min-w-0">{children}</div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-8">
              <div className="min-w-0">{children}</div>
              <ScrollReveal direction="right" delay={100}>
                {sidebar}
              </ScrollReveal>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
