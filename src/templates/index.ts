import { createElement } from 'react';
import type { CMSPage } from '@/types/cms';
import { CountyPageTemplate } from './CountyPageTemplate';
import { DefaultPageTemplate } from './DefaultPageTemplate';
import { ServicePageTemplate } from './ServicePageTemplate';
import { TownPageTemplate } from './TownPageTemplate';

type TemplateComponent = (props: { page: CMSPage }) => React.JSX.Element;

const TEMPLATE_COMPONENTS: Record<string, TemplateComponent> = {
  default: DefaultPageTemplate,
  home: DefaultPageTemplate,
  about: DefaultPageTemplate,
  faq: DefaultPageTemplate,
  contact: DefaultPageTemplate,
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
  const Template = resolveTemplateComponent(page.template);
  return createElement(Template, { page });
}
