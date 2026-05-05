import { createElement } from 'react';
import dynamic from 'next/dynamic';
import type { CMSPage } from '@/types/cms';
import { DefaultPageTemplate } from './DefaultPageTemplate';
import { HomePageTemplate } from './HomePageTemplate';

// Lazy-load all secondary templates so each page only bundles what it renders.
const lazyTemplate = <T extends { page: CMSPage }>(loader: () => Promise<{ [k: string]: React.ComponentType<T> } | { default: React.ComponentType<T> }>, exportName?: string) =>
  dynamic<T>(async () => {
    const mod = await loader();
    return (exportName ? (mod as Record<string, React.ComponentType<T>>)[exportName] : (mod as { default: React.ComponentType<T> }).default) as React.ComponentType<T>;
  });

const AboutPageTemplate = lazyTemplate(() => import('./AboutPageTemplate'), 'AboutPageTemplate');
const AreasWeServeTemplate = lazyTemplate(() => import('./AreasWeServeTemplate'), 'AreasWeServeTemplate');
const BathroomRemodelingPageTemplate = lazyTemplate(() => import('./BathroomRemodelingPageTemplate'), 'BathroomRemodelingPageTemplate');
const CaseStudiesPageTemplate = lazyTemplate(() => import('./CaseStudiesPageTemplate'), 'CaseStudiesPageTemplate');
const CareersPageTemplate = lazyTemplate(() => import('./CareersPageTemplate'), 'CareersPageTemplate');
const CaseStudyDetailPageTemplate = lazyTemplate(() => import('./CaseStudyDetailPageTemplate'), 'CaseStudyDetailPageTemplate');
const ContactPageTemplate = lazyTemplate(() => import('./ContactPageTemplate'), 'ContactPageTemplate');
const CountyPageTemplate = lazyTemplate(() => import('./CountyPageTemplate'), 'CountyPageTemplate');
const FaqPageTemplate = lazyTemplate(() => import('./FaqPageTemplate'), 'FaqPageTemplate');
const FinancingPageTemplate = lazyTemplate(() => import('./FinancingPageTemplate'), 'FinancingPageTemplate');
const InsuranceRestorationPageTemplate = lazyTemplate(() => import('./InsuranceRestorationPageTemplate'), 'InsuranceRestorationPageTemplate');
const KitchenRemodelingCityPageTemplate = lazyTemplate(() => import('./KitchenRemodelingCityPageTemplate'), 'KitchenRemodelingCityPageTemplate');
const KitchenRemodelingPageTemplate = lazyTemplate(() => import('./KitchenRemodelingPageTemplate'), 'KitchenRemodelingPageTemplate');
const PremiumServicePageTemplate = lazyTemplate(() => import('./PremiumServicePageTemplate'), 'PremiumServicePageTemplate');
const PricingPageTemplate = lazyTemplate(() => import('./PricingPageTemplate'), 'PricingPageTemplate');
const PrivacyPolicyPageTemplate = lazyTemplate(() => import('./PrivacyPolicyPageTemplate'), 'PrivacyPolicyPageTemplate');
const ProcessPageTemplate = lazyTemplate(() => import('./ProcessPageTemplate'), 'ProcessPageTemplate');
const ServicePageTemplate = lazyTemplate(() => import('./ServicePageTemplate'), 'ServicePageTemplate');
const ServicesOverviewPageTemplate = lazyTemplate(() => import('./ServicesOverviewPageTemplate'), 'ServicesOverviewPageTemplate');
const TermsPageTemplate = lazyTemplate(() => import('./TermsPageTemplate'), 'TermsPageTemplate');
const TownPageTemplate = lazyTemplate(() => import('./TownPageTemplate'), 'TownPageTemplate');
const CountyHubPageTemplate = lazyTemplate(() => import('./CountyHubPageTemplate'), 'CountyHubPageTemplate');
const PortfolioPageTemplate = lazyTemplate(() => import('./PortfolioPageTemplate'), 'PortfolioPageTemplate');
const ThankYouPageTemplate = lazyTemplate(() => import('./ThankYouPageTemplate'), 'ThankYouPageTemplate');
const ReviewsPageTemplate = lazyTemplate(() => import('./ReviewsPageTemplate'), 'ReviewsPageTemplate');
const SitemapPageTemplate = lazyTemplate(() => import('./SitemapPageTemplate'), 'SitemapPageTemplate');
const WarrantyPageTemplate = lazyTemplate(() => import('./WarrantyPageTemplate'), 'WarrantyPageTemplate');
const TownHubPageTemplate = lazyTemplate(() => import('./TownHubPageTemplate'), 'TownHubPageTemplate');
const GreenwichCTPageTemplate = lazyTemplate(() => import('./GreenwichCTPageTemplate'), 'GreenwichCTPageTemplate');
const WestportCTPageTemplate = lazyTemplate(() => import('./WestportCTPageTemplate'), 'WestportCTPageTemplate');
const OrangeCTPageTemplate = lazyTemplate(() => import('./OrangeCTPageTemplate'), 'OrangeCTPageTemplate');
const NewHavenCTPageTemplate = lazyTemplate(() => import('./NewHavenCTPageTemplate'), 'NewHavenCTPageTemplate');
const HomeownerHubPageTemplate = lazyTemplate(() => import('./HomeownerHubPageTemplate'), 'HomeownerHubPageTemplate');
const MadisonCTPageTemplate = lazyTemplate(() => import('./MadisonCTPageTemplate'), 'MadisonCTPageTemplate');

type TemplateComponent = React.ComponentType<{ page: CMSPage }>;

const TEMPLATE_COMPONENTS: Record<string, TemplateComponent> = {
  default: DefaultPageTemplate,
  home: HomePageTemplate,
  about: AboutPageTemplate,
  contact: ContactPageTemplate,
  faq: FaqPageTemplate,
  portfolio: DefaultPageTemplate,
  subcontractors: DefaultPageTemplate,
  service: ServicePageTemplate,
  service_page: ServicePageTemplate,
  service_global: ServicePageTemplate,
  county: CountyPageTemplate,
  county_page: CountyPageTemplate,
  town: TownPageTemplate,
  town_page: TownPageTemplate,
  service_town: TownPageTemplate,
  office: DefaultPageTemplate,
};

function normalizeTemplateKey(template: string): string {
  return template.trim().toLowerCase().replace(/[\s-]+/g, '_');
}

function normalizePageSlug(slug: string): string {
  return slug.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
}

const TOWN_HUB_SLUGS = new Set([
  'new-haven-county/madison-ct',
]);

const TEMPLATE_OVERRIDES_BY_SLUG: Record<string, string> = {
  'fairfield-county/fairfield-ct': 'service_town',
};

function resolveTemplateComponent(template: string): TemplateComponent {
  const normalizedTemplate = normalizeTemplateKey(template);
  const mappedTemplate = TEMPLATE_COMPONENTS[normalizedTemplate];

  if (mappedTemplate) {
    return mappedTemplate;
  }

  if (normalizedTemplate.includes('service') && normalizedTemplate.includes('town')) {
    return TownPageTemplate;
  }

  if (normalizedTemplate.includes('town')) {
    return TownPageTemplate;
  }

  if (normalizedTemplate.includes('county')) {
    return CountyPageTemplate;
  }

  if (normalizedTemplate.includes('service')) {
    return ServicePageTemplate;
  }

  return DefaultPageTemplate;
}

export function renderTemplate(page: CMSPage) {
  const normalizedSlug = normalizePageSlug(page.slug);
  const templateOverride = TEMPLATE_OVERRIDES_BY_SLUG[normalizedSlug];
  const effectivePage = templateOverride ? { ...page, template: templateOverride } : page;

  if (normalizedSlug === 'fairfield-county/greenwich-ct') {
    return createElement(GreenwichCTPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'fairfield-county/westport-ct') {
    return createElement(WestportCTPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'new-haven-county/orange-ct') {
    return createElement(OrangeCTPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'new-haven-county/new-haven-ct') {
    return createElement(NewHavenCTPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'new-haven-county/madison-ct') {
    return createElement(MadisonCTPageTemplate, { page: effectivePage });
  }

  if (TOWN_HUB_SLUGS.has(normalizedSlug)) {
    return createElement(TownHubPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'homeowner-hub') {
    return createElement(HomeownerHubPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'insurance-restoration') {
    return createElement(InsuranceRestorationPageTemplate, { page: effectivePage });
  }

  if ([
    'attic-conversions',
    'basement-finishing',
    'comfort-accessibility-remodeling',
    'decks-porches',
    'flooring',
    'home-additions',
    'interior-carpentry',
    'interior-painting',
    'remodeling-design-planning',
  ].includes(normalizedSlug)) {
    return createElement(PremiumServicePageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'bathroom-remodeling') {
    return createElement(BathroomRemodelingPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'kitchen-remodeling') {
    return createElement(KitchenRemodelingPageTemplate, { page: effectivePage });
  }

  if (/^kitchen-remodeling\/[a-z-]+-ct$/.test(normalizedSlug)) {
    return createElement(KitchenRemodelingCityPageTemplate, { page: effectivePage });
  }

  if (/^flooring\/[a-z-]+-ct$/.test(normalizedSlug)) {
    return createElement(KitchenRemodelingCityPageTemplate, { page: effectivePage });
  }

  if (/^bathroom-remodeling\/[a-z-]+-ct$/.test(normalizedSlug)) {
    return createElement(KitchenRemodelingCityPageTemplate, { page: effectivePage });
  }

  if (/^basement-finishing\/[a-z-]+-ct$/.test(normalizedSlug)) {
    return createElement(KitchenRemodelingCityPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'areas-we-serve') {
    return createElement(AreasWeServeTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'case-studies') {
    return createElement(CaseStudiesPageTemplate, { page: effectivePage });
  }

  if (/^case-studies\/[a-z-]+$/.test(normalizedSlug)) {
    return createElement(CaseStudyDetailPageTemplate, { page: effectivePage });
  }

  if (['fairfield-county', 'new-haven-county'].includes(normalizedSlug)) {
    return createElement(CountyHubPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'portfolio') {
    return createElement(PortfolioPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'careers') {
    return createElement(CareersPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'faq') {
    return createElement(FaqPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'financing') {
    return createElement(FinancingPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'pricing') {
    return createElement(PricingPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'services') {
    return createElement(ServicesOverviewPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'process') {
    return createElement(ProcessPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'privacy-policy') {
    return createElement(PrivacyPolicyPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'terms') {
    return createElement(TermsPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'thank_you' || normalizedSlug === 'thank-you') {
    return createElement(ThankYouPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'reviews') {
    return createElement(ReviewsPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'sitemap') {
    return createElement(SitemapPageTemplate, { page: effectivePage });
  }

  if (normalizedSlug === 'warranty') {
    return createElement(WarrantyPageTemplate, { page: effectivePage });
  }

  const Template = resolveTemplateComponent(effectivePage.template);
  return createElement(Template, { page: effectivePage });
}
