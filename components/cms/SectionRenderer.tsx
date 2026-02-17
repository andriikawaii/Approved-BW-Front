import { sectionMap } from '@/src/components/sections';
import type { CMSSection } from '@/types/cms';

type SectionRendererProps = {
  sections: CMSSection[];
};

export default function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        if (!section.is_active) {
          return null;
        }

        const Component = sectionMap[section.type];

        if (!Component) {
          return null;
        }

        return <Component key={section.id} data={section.data as any} />;
      })}
    </>
  );
}
