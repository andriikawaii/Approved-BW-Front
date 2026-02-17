import SectionRenderer from '@/components/cms/SectionRenderer';
import type { CMSPage, CMSSection } from '@/types/cms';

type ServicePageTemplateProps = {
  page: CMSPage;
};

type ServiceSectionGroups = {
  mainSections: CMSSection[];
  relatedLinkSections: CMSSection[];
};

const SERVICE_RELATED_LINK_TYPE_HINTS = [
  'service_related_links',
  'services_related_links',
  'related_service_links',
  'related_services_links',
  'internal_service_links',
];

const SERVICE_RELATED_LINK_KEY_HINTS = [
  'service_links',
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

function isServiceRelatedLinksSection(section: CMSSection): boolean {
  const normalizedType = normalizeValue(section.type);
  const matchesTypeHints = SERVICE_RELATED_LINK_TYPE_HINTS.includes(normalizedType);
  const matchesTypePattern =
    normalizedType.includes('link') &&
    (normalizedType.includes('service') || normalizedType.includes('related') || normalizedType.includes('internal'));
  const matchesDataHints = hasDataKeyHint(section, SERVICE_RELATED_LINK_KEY_HINTS);

  return matchesTypeHints || matchesTypePattern || matchesDataHints;
}

function splitServiceSections(sections: CMSSection[]): ServiceSectionGroups {
  return sections.reduce<ServiceSectionGroups>(
    (acc, section) => {
      if (isServiceRelatedLinksSection(section)) {
        acc.relatedLinkSections.push(section);
      } else {
        acc.mainSections.push(section);
      }

      return acc;
    },
    {
      mainSections: [],
      relatedLinkSections: [],
    },
  );
}

export function ServicePageTemplate({ page }: ServicePageTemplateProps) {
  const { mainSections, relatedLinkSections } = splitServiceSections(page.sections);

  return (
    <div data-template={page.template}>
      <SectionRenderer sections={mainSections} />
      {relatedLinkSections.length > 0 ? (
        <div data-template-block="services-related-links">
          <SectionRenderer sections={relatedLinkSections} />
        </div>
      ) : null}
    </div>
  );
}

