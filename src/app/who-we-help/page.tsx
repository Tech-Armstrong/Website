import type { Metadata } from "next";
import { WhoWeHelpSection } from "@/components/who-we-help/WhoWeHelpSection";
import { Footer } from "@/components/layout/Footer";
import { InnerPageBanner } from "@/components/layout/InnerPageBanner";
import { whoWeHelpPageBanner } from "@/data/who-we-help";
import { SITE_NAME } from "@/lib/site/config";

export const metadata: Metadata = {
  title: `Who We Help | ${SITE_NAME}`,
  description:
    "Explore how Armstrong Capital supports beginning investors, women investors, HNIs, NRIs, pre-retirees, and professionals in career transition.",
  alternates: { canonical: "/who-we-help" },
};

export default function WhoWeHelpPage() {
  return (
    <>
      <InnerPageBanner
        title={whoWeHelpPageBanner.title}
        backgroundImage={whoWeHelpPageBanner.backgroundImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: whoWeHelpPageBanner.title },
        ]}
      />

      <main id="main-content" className="px-4 py-12 lg:py-16">
        <div className="site-container">
          <WhoWeHelpSection />
        </div>
      </main>

      <Footer />
    </>
  );
}
