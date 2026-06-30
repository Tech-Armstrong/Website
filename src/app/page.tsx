import type { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSection";
import { AwardsSection } from "@/components/home/AwardsSection";
import { Hero } from "@/components/home/Hero";
import { MediaSpotlightsSection } from "@/components/home/MediaSpotlightsSection";
import { OurOfferingsSection } from "@/components/home/OurOfferingsSection";
import { StatsSection } from "@/components/home/StatsSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { Footer } from "@/components/layout/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site/config";

export const metadata: Metadata = {
  title: `${SITE_NAME} and Financial services Pvt Ltd`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} and Financial services Pvt Ltd`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <StatsSection />
      <AboutSection />
      <OurOfferingsSection />
      <WhyChooseSection />
      <MediaSpotlightsSection />
      <AwardsSection />
      <Footer />
    </main>
  );
}
