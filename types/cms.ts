export type CMSData = Record<string, unknown>;

export type CMSSeo = {
  title: string;
  description: string;
};

export type CMSPhone = {
  label: string;
  number: string;
};

export type CMSPhones = {
  mode?: string;
  items?: CMSPhone[];
};

export type CMSFooter = {
  template?: string;
  address?: Record<string, unknown>;
  hours?: Record<string, unknown>;
  phones?: CMSPhone[];
};

export type CMSBreadcrumb = {
  label: string;
  url?: string;
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
  phones?: CMSPhones;
  footer?: CMSFooter;
  breadcrumbs?: CMSBreadcrumb[];
  schema?: Record<string, unknown>;
  sections: CMSSection[];
};
