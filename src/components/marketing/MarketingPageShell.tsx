import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type MarketingPageShellProps = {
  title: string;
  sidebar?: ReactNode;
  fullWidth?: boolean;
  /** Renders below the main+sidebar grid at full container width */
  fullWidthSections?: ReactNode;
  compact?: boolean;
  narrow?: boolean;
  children: ReactNode;
};

export function MarketingPageShell({
  title,
  sidebar,
  fullWidth = false,
  fullWidthSections,
  compact = false,
  narrow = false,
  children,
}: MarketingPageShellProps) {
  return (
    <>
      <main
        id="main-content"
        className={
          compact
            ? "pb-6 pt-28 lg:pb-10 lg:pt-32"
            : "pb-8 pt-28 lg:pb-10 lg:pt-32"
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

          {fullWidth || !sidebar ? (
            <>
              <div className={`min-w-0 ${narrow ? "mx-auto max-w-4xl" : ""}`}>
                {children}
              </div>
              {fullWidthSections ? (
                <div className={`min-w-0 ${narrow ? "mx-auto max-w-4xl" : ""}`}>
                  {fullWidthSections}
                </div>
              ) : null}
            </>
          ) : (
            <>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-8">
                <div className="min-w-0">{children}</div>
                <ScrollReveal direction="right" delay={100}>
                  {sidebar}
                </ScrollReveal>
              </div>
              {fullWidthSections ? (
                <div className="mt-8 min-w-0">{fullWidthSections}</div>
              ) : null}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
