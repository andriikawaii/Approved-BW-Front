import SectionRenderer from '@/components/cms/SectionRenderer';
import type { CMSPage, CMSSection } from '@/types/cms';

type TownPageTemplateProps = {
  page: CMSPage;
};

type TownSectionGroups = {
  countyTownSections: CMSSection[];
  seoSections: CMSSection[];
  serviceTownLinkSections: CMSSection[];
};

const SEO_TYPE_HINTS = ['seo', 'meta', 'schema', 'json_ld', 'jsonld'];
const SEO_KEY_HINTS = ['seo', 'meta', 'schema', 'json_ld', 'jsonld'];

const SERVICE_TOWN_LINK_TYPE_HINTS = [
  'service_town_links',
  'service_towns_links',
  'town_service_links',
  'services_by_town_links',
  'internal_service_town_links',
];

const SERVICE_TOWN_LINK_KEY_HINTS = [
  'service_town_links',
  'town_service_links',
  'services_links',
  'related_links',
  'internal_links',
];

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

function isSeoSection(section: CMSSection): boolean {
  const normalizedType = normalizeValue(section.type);
  const matchesTypeHints = SEO_TYPE_HINTS.some((hint) => normalizedType.includes(hint));
  const matchesDataHints = hasDataKeyHint(section, SEO_KEY_HINTS);

  return matchesTypeHints || matchesDataHints;
}

function isServiceTownLinksSection(section: CMSSection): boolean {
  const normalizedType = normalizeValue(section.type);
  const matchesTypeHints = SERVICE_TOWN_LINK_TYPE_HINTS.includes(normalizedType);
  const matchesTypePattern =
    normalizedType.includes('link') && normalizedType.includes('service') && normalizedType.includes('town');
  const matchesDataHints = hasDataKeyHint(section, SERVICE_TOWN_LINK_KEY_HINTS);

  return matchesTypeHints || matchesTypePattern || matchesDataHints;
}

function splitTownSections(sections: CMSSection[]): TownSectionGroups {
  return sections.reduce<TownSectionGroups>(
    (acc, section) => {
      if (isSeoSection(section)) {
        acc.seoSections.push(section);
      } else if (isServiceTownLinksSection(section)) {
        acc.serviceTownLinkSections.push(section);
      } else {
        acc.countyTownSections.push(section);
      }

      return acc;
    },
    {
      countyTownSections: [],
      seoSections: [],
      serviceTownLinkSections: [],
    },
  );
}

export function TownPageTemplate({ page }: TownPageTemplateProps) {
  const { countyTownSections, seoSections, serviceTownLinkSections } = splitTownSections(page.sections);

  return (
    <div data-template={page.template}>
      <div data-template-block="county-town-content">
        <SectionRenderer sections={countyTownSections} />
      </div>
      {seoSections.length > 0 ? (
        <div data-template-block="seo-sections">
          <SectionRenderer sections={seoSections} />
        </div>
      ) : null}
      {serviceTownLinkSections.length > 0 ? (
        <div data-template-block="service-town-links">
          <SectionRenderer sections={serviceTownLinkSections} />
        </div>
      ) : null}
    </div>
  );
}

