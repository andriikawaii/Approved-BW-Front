export type SectionType =
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
  | 'service_areas';

export interface PageSection {
  id: number;
  type: SectionType;
  data: Record<string, any>;
}

export interface Page {
  id: number;
  slug: string;
  template: 'default';
  seo?: {
    title: string;
    description: string;
  };
  sections: PageSection[];
}
