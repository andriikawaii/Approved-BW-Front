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
import { FreeConsultationPageTemplate } from './FreeConsultationPageTemplate';
import { PortfolioPageTemplate } from './PortfolioPageTemplate';
import { ThankYouPageTemplate } from './ThankYouPageTemplate';
import { ReviewsPageTemplate } from './ReviewsPageTemplate';
import { SitemapPageTemplate } from './SitemapPageTemplate';
import { WarrantyPageTemplate } from './WarrantyPageTemplate';
import { TownHubPageTemplate } from './TownHubPageTemplate';
import { GreenwichCTPageTemplate } from './GreenwichCTPageTemplate';
import { WestportCTPageTemplate } from './WestportCTPageTemplate';

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
  'new-haven-county/new-haven-ct',
]);

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
  if (normalizePageSlug(page.slug) === 'fairfield-county/greenwich-ct') {
    return createElement(GreenwichCTPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'fairfield-county/westport-ct') {
    return createElement(WestportCTPageTemplate, { page });
  }

  if (TOWN_HUB_SLUGS.has(normalizePageSlug(page.slug))) {
    return createElement(TownHubPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'free-consultation') {
    return createElement(FreeConsultationPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'insurance-restoration') {
    return createElement(InsuranceRestorationPageTemplate, { page });
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
  ].includes(normalizePageSlug(page.slug))) {
    return createElement(PremiumServicePageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'bathroom-remodeling') {
    return createElement(BathroomRemodelingPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'kitchen-remodeling') {
    return createElement(KitchenRemodelingPageTemplate, { page });
  }

  if (/^kitchen-remodeling\/[a-z-]+-ct$/.test(normalizePageSlug(page.slug))) {
    return createElement(KitchenRemodelingCityPageTemplate, { page });
  }

  if (/^flooring\/[a-z-]+-ct$/.test(normalizePageSlug(page.slug))) {
    return createElement(KitchenRemodelingCityPageTemplate, { page });
  }

  if (/^bathroom-remodeling\/[a-z-]+-ct$/.test(normalizePageSlug(page.slug))) {
    return createElement(KitchenRemodelingCityPageTemplate, { page });
  }

  if (/^basement-finishing\/[a-z-]+-ct$/.test(normalizePageSlug(page.slug))) {
    return createElement(KitchenRemodelingCityPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'areas-we-serve') {
    return createElement(AreasWeServeTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'case-studies') {
    return createElement(CaseStudiesPageTemplate, { page });
  }

  if (/^case-studies\/[a-z-]+$/.test(normalizePageSlug(page.slug))) {
    return createElement(CaseStudyDetailPageTemplate, { page });
  }

  if (['fairfield-county', 'new-haven-county'].includes(normalizePageSlug(page.slug))) {
    return createElement(CountyHubPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'portfolio') {
    return createElement(PortfolioPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'careers') {
    return createElement(CareersPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'faq') {
    return createElement(FaqPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'financing') {
    return createElement(FinancingPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'pricing') {
    return createElement(PricingPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'services') {
    return createElement(ServicesOverviewPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'process') {
    return createElement(ProcessPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'privacy-policy') {
    return createElement(PrivacyPolicyPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'terms') {
    return createElement(TermsPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'thank_you' || normalizePageSlug(page.slug) === 'thank-you') {
    return createElement(ThankYouPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'reviews') {
    return createElement(ReviewsPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'sitemap') {
    return createElement(SitemapPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'warranty') {
    return createElement(WarrantyPageTemplate, { page });
  }

  const Template = resolveTemplateComponent(page.template);
  return createElement(Template, { page });
}
