export type CMSData = Record<string, unknown>;

export type CMSSeo = {
  title: string;
  description: string;
};

export type CMSSection = {
  id: number;
  type: string;
  data: CMSData;
  is_active: boolean;
};

export type CMSPage = {
  id: number;
  slug: string;
  template: string;
  seo: CMSSeo;
  sections: CMSSection[];
};
