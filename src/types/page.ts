import type { CMSPage, CMSSection, CMSSeo } from '../../types/cms';

export type Page = CMSPage;
export type PageSection = CMSSection;
export type PageSeo = CMSSeo;

export type SectionType =
  | 'hero'
  | 'hero_slider'
  | 'service_hero'
  | 'hero_service_location'
  | 'service_two_column'
  | 'before_after_showcase'
  | 'service_area_highlight'
  | 'consultation_cta_split'
  | 'service_intro_split'
  | 'service_process'
  | 'full_width_text_dark'
  | 'before_after_grid'
  | 'testimonial_slider_small'
  | 'logo_strip'
  | 'service_area_text'
  | 'faq_accordion'
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
