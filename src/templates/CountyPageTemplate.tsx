import SectionRenderer from '@/components/cms/SectionRenderer';
import type { CMSPage, CMSSection } from '@/types/cms';

type CountyPageTemplateProps = {
  page: CMSPage;
};

type CountySectionGroups = {
  mainSections: CMSSection[];
  townLinkSections: CMSSection[];
};

const COUNTY_TOWN_LINK_TYPE_HINTS = [
  'county_town_links',
  'county_towns_links',
  'town_links',
  'internal_town_links',
];

const COUNTY_TOWN_LINK_KEY_HINTS = ['town_links', 'towns_links', 'towns'];

function normalizeValue(value: string): string {
  return value.trim().toLowerCase().replace(/[\s-]+/g, '_');
}

function hasHint(candidate: string, hints: string[]): boolean {
  const normalizedCandidate = normalizeValue(candidate);
  return hints.some((hint) => normalizedCandidate.includes(hint));
}

function hasDataKeyHint(section: CMSSection, keyHints: string[]): boolean {
  return Object.keys(section.data).some((key) => hasHint(key, keyHints));
}

function isCountyTownLinksSection(section: CMSSection): boolean {
  const normalizedType = normalizeValue(section.type);
  const matchesTypeHints = COUNTY_TOWN_LINK_TYPE_HINTS.includes(normalizedType);
  const matchesTypePattern =
    normalizedType.includes('link') && normalizedType.includes('town') && normalizedType.includes('county');
  const matchesDataHints = hasDataKeyHint(section, COUNTY_TOWN_LINK_KEY_HINTS);

  return matchesTypeHints || matchesTypePattern || matchesDataHints;
}

function splitCountySections(sections: CMSSection[]): CountySectionGroups {
  return sections.reduce<CountySectionGroups>(
    (acc, section) => {
      if (isCountyTownLinksSection(section)) {
        acc.townLinkSections.push(section);
      } else {
        acc.mainSections.push(section);
      }

      return acc;
    },
    {
      mainSections: [],
      townLinkSections: [],
    },
  );
}

export function CountyPageTemplate({ page }: CountyPageTemplateProps) {
  const { mainSections, townLinkSections } = splitCountySections(page.sections);

  return (
    <div data-template={page.template}>
      <SectionRenderer sections={mainSections} />
      {townLinkSections.length > 0 ? (
        <div data-template-block="county-town-links">
          <SectionRenderer sections={townLinkSections} />
        </div>
      ) : null}
    </div>
  );
}

