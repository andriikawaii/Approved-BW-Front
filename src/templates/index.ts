import { createElement } from 'react';
import type { CMSPage } from '@/types/cms';
import { AboutPageTemplate } from './AboutPageTemplate';
import { AreasWeServeTemplate } from './AreasWeServeTemplate';
import { BathroomRemodelingPageTemplate } from './BathroomRemodelingPageTemplate';
import { CaseStudiesPageTemplate } from './CaseStudiesPageTemplate';
import { CareersPageTemplate } from './CareersPageTemplate';
import { CaseStudyDetailPageTemplate } from './CaseStudyDetailPageTemplate';
import { ContactPageTemplate } from './ContactPageTemplate';
import { CountyPageTemplate } from './CountyPageTemplate';
import { DefaultPageTemplate } from './DefaultPageTemplate';
import { FaqPageTemplate } from './FaqPageTemplate';
import { FinancingPageTemplate } from './FinancingPageTemplate';
import { HomePageTemplate } from './HomePageTemplate';
import { InsuranceRestorationPageTemplate } from './InsuranceRestorationPageTemplate';
import { KitchenRemodelingCityPageTemplate } from './KitchenRemodelingCityPageTemplate';
import { KitchenRemodelingPageTemplate } from './KitchenRemodelingPageTemplate';
import { PremiumServicePageTemplate } from './PremiumServicePageTemplate';
import { PricingPageTemplate } from './PricingPageTemplate';
import { PrivacyPolicyPageTemplate } from './PrivacyPolicyPageTemplate';
import { ProcessPageTemplate } from './ProcessPageTemplate';
import { ServicePageTemplate } from './ServicePageTemplate';
import { ServicesOverviewPageTemplate } from './ServicesOverviewPageTemplate';
import { TermsPageTemplate } from './TermsPageTemplate';
import { TownPageTemplate } from './TownPageTemplate';
import { CountyHubPageTemplate } from './CountyHubPageTemplate';
import { PortfolioPageTemplate } from './PortfolioPageTemplate';
import { ThankYouPageTemplate } from './ThankYouPageTemplate';
import { ReviewsPageTemplate } from './ReviewsPageTemplate';
import { SitemapPageTemplate } from './SitemapPageTemplate';
import { WarrantyPageTemplate } from './WarrantyPageTemplate';
import { TownHubPageTemplate } from './TownHubPageTemplate';
import { GreenwichCTPageTemplate } from './GreenwichCTPageTemplate';
import { WestportCTPageTemplate } from './WestportCTPageTemplate';
import { OrangeCTPageTemplate } from './OrangeCTPageTemplate';
import { NewHavenCTPageTemplate } from './NewHavenCTPageTemplate';
import { HomeownerHubPageTemplate } from './HomeownerHubPageTemplate';
import { MadisonCTPageTemplate } from './MadisonCTPageTemplate';

type TemplateComponent = (props: { page: CMSPage }) => React.JSX.Element;

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
