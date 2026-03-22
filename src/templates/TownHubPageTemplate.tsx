import SectionRenderer from '@/components/cms/SectionRenderer';
import type { CMSPage } from '@/types/cms';

type TownHubPageTemplateProps = {
  page: CMSPage;
};

export function TownHubPageTemplate({ page }: TownHubPageTemplateProps) {
  return (
    <div data-template={page.template} data-town-hub-slug={page.slug} className="bw-town-hub town-hub-page">
      <SectionRenderer sections={page.sections} context="town_hub" />
    </div>
  );
}
