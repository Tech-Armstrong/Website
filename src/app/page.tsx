import type { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSection";
import { Hero } from "@/components/home/Hero";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { MediaSpotlightsSection } from "@/components/home/MediaSpotlightsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { BookAppointmentSection } from "@/components/contact/BookAppointmentSection";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
      <ServicesSection />
      <WhyChooseSection />
      <MediaSpotlightsSection />
      <TestimonialsSection />
      <section className="border-t border-[#eef0f2] bg-white py-12 lg:py-16">
        <div className="site-container px-4">
          <ScrollReveal>
            <BookAppointmentSection />
          </ScrollReveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}
