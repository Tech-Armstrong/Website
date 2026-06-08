import { BookAppointmentSection } from "@/components/contact/BookAppointmentSection";
import { ContactInfoCards } from "@/components/contact/ContactInfoCards";
import { ContactPageIntro } from "@/components/contact/ContactPageIntro";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { MarketingPage } from "@/lib/pages/content";
import type { MarketingPageConfig } from "@/types/marketing-page";
import { MarketingCareerSections } from "./MarketingCareerSections";
import { MarketingFaqAccordion } from "./MarketingFaqAccordion";
import { MarketingFeatures } from "./MarketingFeatures";
import { MarketingHero } from "./MarketingHero";
import { MarketingMediaTabs } from "./MarketingMediaTabs";
import { MarketingPageShell } from "./MarketingPageShell";
import { MarketingPlanGrid } from "./MarketingPlanGrid";
import { MarketingQuote } from "./MarketingQuote";
import { MarketingTeamGrid } from "./MarketingTeamGrid";
import { AboutSidebar } from "./sidebars/AboutSidebar";
import { KnowledgeSidebar } from "./sidebars/KnowledgeSidebar";
import { SegmentSidebar } from "./sidebars/SegmentSidebar";
import { ServiceSidebar } from "./sidebars/ServiceSidebar";

type MarketingPageRendererProps = {
  page: MarketingPage;
  config: MarketingPageConfig;
};

function renderSidebar(config: MarketingPageConfig) {
  if (config.fullWidth || config.category === "career" || config.category === "contact") {
    return undefined;
  }

  switch (config.category) {
    case "segment":
      return <SegmentSidebar activeSlug={config.slug} />;
    case "service":
      return <ServiceSidebar activeSlug={config.slug} />;
    case "about":
      return <AboutSidebar activeSlug={config.slug} />;
    case "knowledge":
      return config.slug === "faqs" ? undefined : (
        <KnowledgeSidebar activeSlug={config.slug} />
      );
    default:
      return undefined;
  }
}

export function MarketingPageRenderer({
  page,
  config,
}: MarketingPageRendererProps) {
  const headingId = `${config.slug}-hero-heading`;
  const sidebar = renderSidebar(config);
  const isContact = config.category === "contact";
  const useFullWidthTeamBlock =
    Boolean(sidebar && config.team && config.team.length > 0);

  const fullWidthSections = useFullWidthTeamBlock ? (
    <>
      <MarketingTeamGrid members={config.team!} />
      {config.quote ? <MarketingQuote quote={config.quote} /> : null}
    </>
  ) : undefined;

  return (
    <MarketingPageShell
      title={page.title}
      sidebar={sidebar}
      fullWidth={config.fullWidth && !sidebar}
      fullWidthSections={fullWidthSections}
      compact={isContact}
    >
      {isContact ? (
        <div className="mx-auto max-w-[960px] space-y-8">
          <ContactPageIntro />
          <ContactInfoCards />
          {config.showContactForm ? (
            <ScrollReveal delay={180}>
              <BookAppointmentSection showDescription />
            </ScrollReveal>
          ) : null}
        </div>
      ) : (
        <>
          {config.hero ? (
            <MarketingHero hero={config.hero} headingId={headingId} />
          ) : null}

          {config.careerSections ? (
            <MarketingCareerSections
              sections={config.careerSections}
              cta={config.careerCta}
            />
          ) : null}

          {config.features && config.features.items.length > 0 ? (
            <MarketingFeatures
              features={config.features}
              headingId={`${config.slug}-features-heading`}
            />
          ) : null}

          {config.plans && config.plans.length > 0 ? (
            <MarketingPlanGrid plans={config.plans} />
          ) : null}

          {!useFullWidthTeamBlock && config.team && config.team.length > 0 ? (
            <MarketingTeamGrid members={config.team} />
          ) : null}

          {config.faqs && config.faqs.length > 0 ? (
            <MarketingFaqAccordion faqs={config.faqs} />
          ) : null}

          {config.mediaArticles || config.mediaPodcasts ? (
            <MarketingMediaTabs
              articles={config.mediaArticles ?? []}
              podcasts={config.mediaPodcasts ?? []}
            />
          ) : null}

          {config.quote && !useFullWidthTeamBlock ? (
            <MarketingQuote quote={config.quote} />
          ) : null}

          {config.showContactForm ? (
            <ScrollReveal>
              <BookAppointmentSection className="border-t border-[#eef0f2] pt-8" />
            </ScrollReveal>
          ) : null}
        </>
      )}
    </MarketingPageShell>
  );
}
