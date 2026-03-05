import { sectionMap } from '@/src/components/sections';
import type { CMSSection } from '@/types/cms';

type SectionRendererProps = {
  sections: CMSSection[];
};

export default function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections.map((section, index) => {
        if (!section.is_active) {
          return null;
        }

        const Component = sectionMap[section.type];

        if (!Component) {
          return null;
        }

        const sectionData = section.data as Record<string, unknown>;
        const sectionVariant =
          typeof sectionData?.style_variant === 'string'
            ? sectionData.style_variant
            : typeof sectionData?.variant === 'string'
              ? sectionData.variant
              : undefined;

        const componentData =
          section.type === 'rich_text' || section.type === 'local_context'
            ? ({ ...(sectionData ?? {}), _section_index: index } as Record<string, unknown>)
            : section.data;

        return (
          <div
            key={section.id}
            data-section-id={section.id}
            data-section-type={section.type}
            data-section-index={index}
            data-section-variant={sectionVariant}
          >
            <Component data={componentData as never} />
          </div>
        );
      })}
    </>
  );
}
