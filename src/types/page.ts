import type { CMSPage, CMSSection, CMSSeo } from '../../types/cms';

export type Page = CMSPage;
export type PageSection = CMSSection;
export type PageSeo = CMSSeo;

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
