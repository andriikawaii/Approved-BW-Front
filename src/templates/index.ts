import { createElement } from 'react';
import type { CMSPage } from '@/types/cms';
import { AboutPageTemplate } from './AboutPageTemplate';
import { AreasWeServeTemplate } from './AreasWeServeTemplate';
import { BathroomRemodelingPageTemplate } from './BathroomRemodelingPageTemplate';
import { CaseStudiesPageTemplate } from './CaseStudiesPageTemplate';
import { ContactPageTemplate } from './ContactPageTemplate';
import { CountyPageTemplate } from './CountyPageTemplate';
import { DefaultPageTemplate } from './DefaultPageTemplate';
import { FaqPageTemplate } from './FaqPageTemplate';
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
};

function normalizeTemplateKey(template: string): string {
  return template.trim().toLowerCase().replace(/[\s-]+/g, '_');
}

function normalizePageSlug(slug: string): string {
  return slug.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
}

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

  if (['kitchen-remodeling/stamford-ct', 'kitchen-remodeling/new-haven-ct'].includes(normalizePageSlug(page.slug))) {
    return createElement(KitchenRemodelingCityPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'areas-we-serve') {
    return createElement(AreasWeServeTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'case-studies') {
    return createElement(CaseStudiesPageTemplate, { page });
  }

  if (['fairfield-county', 'new-haven-county'].includes(normalizePageSlug(page.slug))) {
    return createElement(CountyHubPageTemplate, { page });
  }

  if (normalizePageSlug(page.slug) === 'faq') {
    return createElement(FaqPageTemplate, { page });
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

  const Template = resolveTemplateComponent(page.template);
  return createElement(Template, { page });
}
