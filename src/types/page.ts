export type SectionType =
  | 'hero'
  | 'hero_slider'
  | 'rich_text'
  | 'call_to_action'
  | 'trust_bar'
  | 'problem'
  | 'services'
  | 'stats_counter'
  | 'story_split'
  | 'warranty'
  | 'faq'
  | 'service_areas'
  | (string & {});

export type TemplateType =
  | 'home'
  | 'service_global'
  | 'service_town'
  | 'about'
  | 'faq'
  | 'contact'
  | (string & {});

export interface PageSection {
  id: number;
  type: SectionType;
  data: Record<string, any>;
  is_active: boolean;
}

export interface Breadcrumb {
  label: string;
  url: string;
}

export interface PageBreadcrumbs {
  items: Breadcrumb[];
  schema: Record<string, any>;
}

export interface PageSeo {
  title: string;
  description: string;
  canonical: string | null;
  schemas: Record<string, any>[];
}

export interface PhoneItem {
  label: string;
  number: string;
}

export interface PagePhones {
  mode: string;
  items: PhoneItem[];
}

export interface PageFooter {
  template?: string;
  tagline?: string;
  columns?: { title: string; links: { label: string; url: string }[] }[];
  email?: string;
  address?: string;
  copyright?: string;
  [key: string]: any;
}

export interface Page {
  id: number;
  slug: string;
  template: TemplateType;
  phones: PagePhones;
  footer: PageFooter;
  breadcrumbs: PageBreadcrumbs;
  seo: PageSeo;
  sections: PageSection[];
}
