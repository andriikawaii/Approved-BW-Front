import type { Page, TemplateType } from '../types/page';
import { DefaultPageTemplate } from './DefaultPageTemplate';

const templateMap: Record<string, React.ComponentType<{ page: Page }>> = {
  home: DefaultPageTemplate,
  service_global: DefaultPageTemplate,
  service_town: DefaultPageTemplate,
  about: DefaultPageTemplate,
  faq: DefaultPageTemplate,
  contact: DefaultPageTemplate,
};

export function renderTemplate(page: Page) {
  const Template = templateMap[page.template] ?? DefaultPageTemplate;
  return <Template page={page} />;
}
