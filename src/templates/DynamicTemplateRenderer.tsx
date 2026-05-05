'use client';

/**
 * DynamicTemplateRenderer
 *
 * Houses all next/dynamic imports for heavy 'use client' templates so that
 * each template ships in its own JS chunk instead of one giant catch-all bundle.
 *
 * The slug-matching logic mirrors src/templates/index.ts but runs client-side
 * after the RSC shell has streamed.  SEO-critical content (schema, HTML structure)
 * is still SSR'd because Next.js RSC pre-renders the dynamic() boundary on the
 * server — only the JS payload is deferred on the client.
 */

import dynamic from 'next/dynamic';
import type { CMSPage } from '@/types/cms';

// --- lazy chunks per template ---

const GreenwichCTPageTemplate = dynamic(
  () => import('./GreenwichCTPageTemplate').then((m) => ({ default: m.GreenwichCTPageTemplate })),
);

const WestportCTPageTemplate = dynamic(
  () => import('./WestportCTPageTemplate').then((m) => ({ default: m.WestportCTPageTemplate })),
);

const OrangeCTPageTemplate = dynamic(
  () => import('./OrangeCTPageTemplate').then((m) => ({ default: m.OrangeCTPageTemplate })),
);

const NewHavenCTPageTemplate = dynamic(
  () => import('./NewHavenCTPageTemplate').then((m) => ({ default: m.NewHavenCTPageTemplate })),
);

const MadisonCTPageTemplate = dynamic(
  () => import('./MadisonCTPageTemplate').then((m) => ({ default: m.MadisonCTPageTemplate })),
);

const HomeownerHubPageTemplate = dynamic(
  () => import('./HomeownerHubPageTemplate').then((m) => ({ default: m.HomeownerHubPageTemplate })),
);

const CountyHubPageTemplate = dynamic(
  () => import('./CountyHubPageTemplate').then((m) => ({ default: m.CountyHubPageTemplate })),
);

const TownHubPageTemplate = dynamic(
  () => import('./TownHubPageTemplate').then((m) => ({ default: m.TownHubPageTemplate })),
);

const InsuranceRestorationPageTemplate = dynamic(
  () => import('./InsuranceRestorationPageTemplate').then((m) => ({ default: m.InsuranceRestorationPageTemplate })),
);

const BathroomRemodelingPageTemplate = dynamic(
  () => import('./BathroomRemodelingPageTemplate').then((m) => ({ default: m.BathroomRemodelingPageTemplate })),
);

const KitchenRemodelingPageTemplate = dynamic(
  () => import('./KitchenRemodelingPageTemplate').then((m) => ({ default: m.KitchenRemodelingPageTemplate })),
);

const KitchenRemodelingCityPageTemplate = dynamic(
  () => import('./KitchenRemodelingCityPageTemplate').then((m) => ({ default: m.KitchenRemodelingCityPageTemplate })),
);

const PremiumServicePageTemplate = dynamic(
  () => import('./PremiumServicePageTemplate').then((m) => ({ default: m.PremiumServicePageTemplate })),
);

const AreasWeServeTemplate = dynamic(
  () => import('./AreasWeServeTemplate').then((m) => ({ default: m.AreasWeServeTemplate })),
);

const CaseStudiesPageTemplate = dynamic(
  () => import('./CaseStudiesPageTemplate').then((m) => ({ default: m.CaseStudiesPageTemplate })),
);

const CaseStudyDetailPageTemplate = dynamic(
  () => import('./CaseStudyDetailPageTemplate').then((m) => ({ default: m.CaseStudyDetailPageTemplate })),
);

const PortfolioPageTemplate = dynamic(
  () => import('./PortfolioPageTemplate').then((m) => ({ default: m.PortfolioPageTemplate })),
);

const CareersPageTemplate = dynamic(
  () => import('./CareersPageTemplate').then((m) => ({ default: m.CareersPageTemplate })),
);

const FaqPageTemplate = dynamic(
  () => import('./FaqPageTemplate').then((m) => ({ default: m.FaqPageTemplate })),
);

const FinancingPageTemplate = dynamic(
  () => import('./FinancingPageTemplate').then((m) => ({ default: m.FinancingPageTemplate })),
);

const PricingPageTemplate = dynamic(
  () => import('./PricingPageTemplate').then((m) => ({ default: m.PricingPageTemplate })),
);

const ServicesOverviewPageTemplate = dynamic(
  () => import('./ServicesOverviewPageTemplate').then((m) => ({ default: m.ServicesOverviewPageTemplate })),
);

const ProcessPageTemplate = dynamic(
  () => import('./ProcessPageTemplate').then((m) => ({ default: m.ProcessPageTemplate })),
);

const ReviewsPageTemplate = dynamic(
  () => import('./ReviewsPageTemplate').then((m) => ({ default: m.ReviewsPageTemplate })),
);

const SitemapPageTemplate = dynamic(
  () => import('./SitemapPageTemplate').then((m) => ({ default: m.SitemapPageTemplate })),
);

const WarrantyPageTemplate = dynamic(
  () => import('./WarrantyPageTemplate').then((m) => ({ default: m.WarrantyPageTemplate })),
);

const PrivacyPolicyPageTemplate = dynamic(
  () => import('./PrivacyPolicyPageTemplate').then((m) => ({ default: m.PrivacyPolicyPageTemplate })),
);

const TermsPageTemplate = dynamic(
  () => import('./TermsPageTemplate').then((m) => ({ default: m.TermsPageTemplate })),
);

const ThankYouPageTemplate = dynamic(
  () => import('./ThankYouPageTemplate').then((m) => ({ default: m.ThankYouPageTemplate })),
);

// --- slug helpers ---

const TOWN_HUB_SLUGS = new Set([
  'new-haven-county/madison-ct',
]);

const TEMPLATE_OVERRIDES_BY_SLUG: Record<string, string> = {
  'fairfield-county/fairfield-ct': 'service_town',
};

const PREMIUM_SERVICE_SLUGS = new Set([
  'attic-conversions',
  'basement-finishing',
  'comfort-accessibility-remodeling',
  'decks-porches',
  'flooring',
  'home-additions',
  'interior-carpentry',
  'interior-painting',
  'remodeling-design-planning',
]);

function normalizeSlug(slug: string) {
  return slug.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
}

interface Props {
  page: CMSPage;
}

export function DynamicTemplateRenderer({ page }: Props) {
  const rawSlug = normalizeSlug(page.slug);
  const templateOverride = TEMPLATE_OVERRIDES_BY_SLUG[rawSlug];
  const effectivePage = templateOverride ? { ...page, template: templateOverride } : page;

  if (rawSlug === 'fairfield-county/greenwich-ct') {
    return <GreenwichCTPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'fairfield-county/westport-ct') {
    return <WestportCTPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'new-haven-county/orange-ct') {
    return <OrangeCTPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'new-haven-county/new-haven-ct') {
    return <NewHavenCTPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'new-haven-county/madison-ct') {
    return <MadisonCTPageTemplate page={effectivePage} />;
  }
  if (TOWN_HUB_SLUGS.has(rawSlug)) {
    return <TownHubPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'homeowner-hub') {
    return <HomeownerHubPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'insurance-restoration') {
    return <InsuranceRestorationPageTemplate page={effectivePage} />;
  }
  if (PREMIUM_SERVICE_SLUGS.has(rawSlug)) {
    return <PremiumServicePageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'bathroom-remodeling') {
    return <BathroomRemodelingPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'kitchen-remodeling') {
    return <KitchenRemodelingPageTemplate page={effectivePage} />;
  }
  if (
    /^kitchen-remodeling\/[a-z-]+-ct$/.test(rawSlug) ||
    /^flooring\/[a-z-]+-ct$/.test(rawSlug) ||
    /^bathroom-remodeling\/[a-z-]+-ct$/.test(rawSlug) ||
    /^basement-finishing\/[a-z-]+-ct$/.test(rawSlug)
  ) {
    return <KitchenRemodelingCityPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'areas-we-serve') {
    return <AreasWeServeTemplate page={effectivePage} />;
  }
  if (rawSlug === 'case-studies') {
    return <CaseStudiesPageTemplate page={effectivePage} />;
  }
  if (/^case-studies\/[a-z-]+$/.test(rawSlug)) {
    return <CaseStudyDetailPageTemplate page={effectivePage} />;
  }
  if (['fairfield-county', 'new-haven-county'].includes(rawSlug)) {
    return <CountyHubPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'portfolio') {
    return <PortfolioPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'careers') {
    return <CareersPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'faq') {
    return <FaqPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'financing') {
    return <FinancingPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'pricing') {
    return <PricingPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'services') {
    return <ServicesOverviewPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'process') {
    return <ProcessPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'privacy-policy') {
    return <PrivacyPolicyPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'terms') {
    return <TermsPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'thank_you' || rawSlug === 'thank-you') {
    return <ThankYouPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'reviews') {
    return <ReviewsPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'sitemap') {
    return <SitemapPageTemplate page={effectivePage} />;
  }
  if (rawSlug === 'warranty') {
    return <WarrantyPageTemplate page={effectivePage} />;
  }

  // Fallback — these are the simple server-safe templates; keep them here as
  // a safety net but they should normally be handled by renderTemplate in
  // index.ts before we ever reach DynamicTemplateRenderer.
  return null;
}
