import { Page } from '../types/page';
import { sectionMap } from '../components/sections';

export const DefaultPageTemplate = ({ page }: { page: Page }) => {
  return (
    <>
      {page.sections.map((section) => {
        const Component = sectionMap[section.type];
        if (!Component) return null;

        return <Component key={section.id} data={section.data} />;
      })}
    </>
  );
};
