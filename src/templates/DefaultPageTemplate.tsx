import SectionRenderer from '@/components/cms/SectionRenderer';
import type { CMSPage } from '@/types/cms';

type DefaultPageTemplateProps = {
  page: CMSPage;
};

export function DefaultPageTemplate({ page }: DefaultPageTemplateProps) {
  return (
    <div data-template={page.template}>
      <SectionRenderer sections={page.sections} />
    </div>
  );
}
