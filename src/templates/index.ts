import { createElement } from 'react';
import type { CMSPage } from '@/types/cms';

// Server-safe templates (no 'use client') — imported directly so they can SSR
// without a client boundary overhead.
import { DefaultPageTemplate } from './DefaultPageTemplate';
import { CountyPageTemplate } from './CountyPageTemplate';
import { TownPageTemplate } from './TownPageTemplate';
import { ServicePageTemplate } from './ServicePageTemplate';

// All 'use client' templates are loaded via DynamicTemplateRenderer which uses
// next/dynamic under the hood, splitting each template into its own JS chunk.
// This replaces the previous pattern of statically importing every template here,
// which bundled them all into one giant catch-all chunk (~310 KB).
import { DynamicTemplateRenderer } from './DynamicTemplateRenderer';

type TemplateComponent = (props: { page: CMSPage }) => React.JSX.Element;

const TEMPLATE_COMPONENTS: Record<string, TemplateComponent> = {
  default: DefaultPageTemplate,
  county: CountyPageTemplate,
  county_page: CountyPageTemplate,
  town: TownPageTemplate,
  town_page: TownPageTemplate,
  service_town: TownPageTemplate,
  service: ServicePageTemplate,
  service_page: ServicePageTemplate,
  service_global: ServicePageTemplate,
  office: DefaultPageTemplate,
  portfolio: DefaultPageTemplate,
  subcontractors: DefaultPageTemplate,
};

function normalizeTemplateKey(template: string): string {
  return template.trim().toLowerCase().replace(/[\s-]+/g, '_');
}

function normalizePageSlug(slug: string): string {
  return slug.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
}

const TEMPLATE_OVERRIDES_BY_SLUG: Record<string, string> = {
  'fairfield-county/fairfield-ct': 'service_town',
};

/**
 * Routes are resolved in two passes:
 *
 * 1. Slug-specific overrides handled by DynamicTemplateRenderer (client-boundary,
 *    each template in its own chunk).
 * 2. Template-key fallback using the lightweight server-safe components above.
 *
 * The home/about/contact templates are also routed through DynamicTemplateRenderer
 * so their JS is split out rather than landing in the catch-all chunk.
 */
export function renderTemplate(page: CMSPage) {
  const normalizedSlug = normalizePageSlug(page.slug);
  const templateOverride = TEMPLATE_OVERRIDES_BY_SLUG[normalizedSlug];
  const normalizedTemplate = normalizeTemplateKey(
    templateOverride ?? page.template,
  );

  // Pure server templates — skip DynamicTemplateRenderer entirely.
  const serverTemplate = TEMPLATE_COMPONENTS[normalizedTemplate];
  if (serverTemplate) {
    const effectivePage = templateOverride
      ? { ...page, template: templateOverride }
      : page;
    return createElement(serverTemplate, { page: effectivePage });
  }

  // Everything else goes through the dynamic boundary so each template
  // ships in its own split chunk.
  return createElement(DynamicTemplateRenderer, { page });
}
