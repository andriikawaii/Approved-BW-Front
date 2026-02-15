import type { Page } from '../types/page';
import { sectionMap } from '../components/sections';

export function DefaultPageTemplate({ page }: { page: Page }) {
  return (
    <>
      {page.sections
        .filter((section) => section.is_active)
        .map((section) => {
          const Component = sectionMap[section.type as keyof typeof sectionMap];
          if (!Component) return null;

          return <Component key={section.id} data={section.data} />;
        })}
    </>
  );
}
