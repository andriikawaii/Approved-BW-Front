import { sectionMap } from '@/src/components/sections';
import type { CMSSection } from '@/types/cms';

type SectionRendererContext = 'default' | 'town_hub';

type SectionRendererProps = {
  sections: CMSSection[];
  context?: SectionRendererContext;
};

function asString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return String(value);
  }
  return fallback;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function normalizeLabelKey(value: unknown): string {
  return asString(value).trim().toLowerCase();
}

function inferTownListCounty(items: Array<Record<string, unknown>>): 'fairfield' | 'new_haven' | undefined {
  for (const item of items) {
    const note = asString(item.note ?? item.county).toLowerCase();
    if (note.includes('fairfield')) {
      return 'fairfield';
    }
    if (note.includes('new haven')) {
      return 'new_haven';
    }
  }
  return undefined;
}

function toMarkdownBulletList(lines: string[]): string {
  if (lines.length === 0) {
    return '';
  }
  return lines.map((line) => `- ${line}`).join('\n');
}

function normalizeTownHubSection(
  section: CMSSection,
  neighborhoodLabelSet: Set<string>,
): { renderType: string; renderData: Record<string, unknown> } {
  const data = asRecord(section.data);

  if (section.type === 'hero') {
    return {
      renderType: section.type,
      renderData: {
        ...data,
        town_hub: true,
      },
    };
  }

  if (section.type === 'trust_bar') {
    return {
      renderType: section.type,
      renderData: {
        ...data,
        town_hub: true,
      },
    };
  }

  if (section.type === 'service_overview_with_inline_form') {
    const inlineForm = asRecord(data.inline_form);
    const fields = asArray(inlineForm.fields)
      .map((field) => asRecord(field))
      .filter((field) => asString(field.name) !== '' && asString(field.label) !== '');

    return {
      renderType: section.type,
      renderData: {
        eyebrow: asString(data.eyebrow),
        title: asString(data.heading) || asString(data.title),
        subtitle: asString(data.body) || asString(data.subtitle),
        form_title: asString(inlineForm.title),
        submit_label: asString(inlineForm.submit_label, 'Send Request'),
        fields,
        steps: asArray(data.highlights).map((item, index) => ({
          number: index + 1,
          text: asString(item),
        })),
        town_hub: true,
      },
    };
  }

  if (section.type === 'housing_stock') {
    const highlights = asArray(data.highlights).map((item) => asString(item)).filter(Boolean);
    const highlightMarkdown = toMarkdownBulletList(highlights);
    const body = [asString(data.body), highlightMarkdown].filter(Boolean).join('\n\n');

    return {
      renderType: section.type,
      renderData: {
        eyebrow: asString(data.eyebrow),
        title: asString(data.heading),
        content: body,
        surface: 'white',
        style_variant: 'default',
        town_hub_section: 'housing_stock',
      },
    };
  }

  if (section.type === 'alt_blocks') {
    const blocks = asArray(data.blocks)
      .map((item) => asRecord(item))
      .map((item) => ({
        title: asString(item.title, 'Project Highlight'),
        description: asString(item.description),
        image: asString(item.image),
        url: asString(item.url),
        tag: asString(item.tag),
      }));

    return {
      renderType: section.type,
      renderData: {
        eyebrow: asString(data.eyebrow),
        title: asString(data.heading, 'Recent Transformations'),
        subtitle: asString(data.intro),
        items: blocks,
        layout: 'alternating',
      },
    };
  }

  if (section.type === 'neighborhoods') {
    const items = asArray(data.items).map((item) => asRecord(item));
    const tier1 = items
      .filter((item) => asString(item.url) !== '')
      .map((item) => ({
        label: asString(item.label),
        url: asString(item.url),
      }));

    const tier2 = items
      .filter((item) => asString(item.url) === '')
      .map((item) => asString(item.label))
      .filter(Boolean);

    return {
      renderType: section.type,
      renderData: {
        county: inferTownListCounty(items),
        title: asString(data.heading, 'Neighborhoods We Serve'),
        subtitle: asString(data.intro),
        scope: 'in_town',
        town_hub: true,
        tier1,
        tier2,
      },
    };
  }

  if (section.type === 'permitting') {
    const checklist = asArray(data.checklist).map((item) => asString(item)).filter(Boolean);
    const authority = asRecord(data.authority);
    const authorityName = asString(authority.name);
    const authorityUrl = asString(authority.url);

    const chunks = [asString(data.body)];
    if (checklist.length > 0) {
      chunks.push('### Permit Checklist');
      chunks.push(toMarkdownBulletList(checklist));
    }
    if (authorityName) {
      chunks.push('### Permitting Authority');
      chunks.push(authorityUrl ? `[${authorityName}](${authorityUrl})` : authorityName);
    }

    return {
      renderType: section.type,
      renderData: {
        eyebrow: asString(data.eyebrow),
        title: asString(data.heading, 'Permitting Information'),
        content: chunks.filter(Boolean).join('\n\n'),
        surface: 'light',
        style_variant: 'links',
        town_hub_section: 'permitting',
      },
    };
  }

  if (section.type === 'costs') {
    const rows = asArray(data.table_rows).map((item) => asRecord(item));
    const drivers = asArray(data.what_drives_cost).map((item) => asString(item)).filter(Boolean);
    const costRows = rows
      .map((row) => ({
        service: asString(row.service),
        typical_price: asString(row.typical_price),
        timeline: asString(row.timeline),
        notes: asString(row.notes),
      }))
      .filter((row) => row.service !== '');

    const fallbackChunks = [asString(data.pre_table_text)];
    if (costRows.length > 0) {
      fallbackChunks.push('| Service | Typical Price | Timeline | Notes |');
      fallbackChunks.push('| --- | --- | --- | --- |');
      fallbackChunks.push(
        costRows
          .map((row) => `| ${row.service} | ${row.typical_price || '-'} | ${row.timeline || '-'} | ${row.notes || '-'} |`)
          .join('\n'),
      );
    }
    if (asString(data.post_table_text)) {
      fallbackChunks.push(asString(data.post_table_text));
    }
    if (drivers.length > 0) {
      fallbackChunks.push('### What Drives Cost');
      fallbackChunks.push(toMarkdownBulletList(drivers));
    }

    return {
      renderType: section.type,
      renderData: {
        eyebrow: asString(data.eyebrow),
        title: asString(data.heading, 'Typical Remodeling Costs'),
        pre_table_text: asString(data.pre_table_text),
        table_rows: costRows,
        post_table_text: asString(data.post_table_text),
        what_drives_cost: drivers,
        content: fallbackChunks.filter(Boolean).join('\n\n'),
        surface: 'white',
        style_variant: 'default',
        town_hub_section: 'costs',
      },
    };
  }

  if (section.type === 'services_grid') {
    return {
      renderType: section.type,
      renderData: {
        ...data,
        town_hub: true,
        suppress_default_button: true,
      },
    };
  }

  if (section.type === 'what_to_expect') {
    const steps = asArray(data.items)
      .map((item, index) => {
        const row = asRecord(item);
        return {
          step_number: index + 1,
          title: asString(row.title, `Step ${index + 1}`),
          short: asString(row.title, `Step ${index + 1}`),
          description: asString(row.description),
        };
      })
      .filter((step) => step.title !== '');

    return {
      renderType: section.type,
      renderData: {
        title: asString(data.heading, 'What To Expect'),
        subtitle: asString(data.intro),
        variant: 'light',
        town_hub: true,
        steps,
      },
    };
  }

  if (section.type === 'nearby_areas') {
    const rawItems = asArray(data.items).map((item) => asRecord(item));
    const filteredItems =
      neighborhoodLabelSet.size > 0
        ? rawItems.filter((item) => !neighborhoodLabelSet.has(normalizeLabelKey(item.label)))
        : rawItems;
    const items = filteredItems.length > 0 ? filteredItems : rawItems;
    const tier1 = items
      .filter((item) => asString(item.url) !== '')
      .map((item) => ({
        label: asString(item.label),
        url: asString(item.url),
      }));

    const tier2 = items
      .filter((item) => asString(item.url) === '')
      .map((item) => asString(item.label))
      .filter(Boolean);

    return {
      renderType: section.type,
      renderData: {
        county: inferTownListCounty(items),
        title: asString(data.heading, 'Nearby Areas We Serve'),
        subtitle: asString(data.intro),
        scope: 'around_town',
        town_hub: true,
        tier1,
        tier2,
      },
    };
  }

  if (section.type === 'faq') {
    return {
      renderType: section.type,
      renderData: {
        title: asString(data.heading) || asString(data.title) || 'Frequently Asked Questions',
        subtitle: asString(data.intro),
        town_hub: true,
        items: asArray(data.items).map((item) => {
          const row = asRecord(item);
          return {
            question: asString(row.question),
            answer: asString(row.answer),
          };
        }),
      },
    };
  }

  if (section.type === 'cta') {
    const button = asRecord(data.button);
    return {
      renderType: section.type,
      renderData: {
        title: asString(data.heading) || asString(data.title),
        subtitle: asString(data.body) || asString(data.subtitle),
        subtext: asString(data.subtext),
        button: {
          label: asString(button.label, 'Schedule a Free Consultation'),
          url: asString(button.url, '/free-consultation/'),
        },
        town_hub: true,
      },
    };
  }

  return { renderType: section.type, renderData: data };
}

export default function SectionRenderer({ sections, context = 'default' }: SectionRendererProps) {
  const neighborhoodLabelSet = new Set(
    sections
      .filter((section) => section.is_active && section.type === 'neighborhoods')
      .flatMap((section) => asArray(asRecord(section.data).items))
      .map((item) => normalizeLabelKey(asRecord(item).label))
      .filter((label) => label !== ''),
  );

  return (
    <>
      {sections.map((section, index) => {
        if (!section.is_active) {
          return null;
        }

        const normalized =
          context === 'town_hub'
            ? normalizeTownHubSection(section, neighborhoodLabelSet)
            : {
                renderType: section.type,
                renderData: section.data as Record<string, unknown>,
              };
        const Component = sectionMap[normalized.renderType];

        if (!Component) {
          return null;
        }

        const sectionData = normalized.renderData as Record<string, unknown>;
        const sectionVariant =
          typeof sectionData?.style_variant === 'string'
            ? sectionData.style_variant
            : typeof sectionData?.variant === 'string'
              ? sectionData.variant
              : undefined;

        const componentData =
          normalized.renderType === 'rich_text' || normalized.renderType === 'local_context'
            ? ({ ...(sectionData ?? {}), _section_index: index } as Record<string, unknown>)
            : sectionData;

        const sectionTypeClass = section.type.replace(/_/g, '-');
        const wrapperClass =
          context === 'town_hub' ? `bw-town-hub-section bw-town-hub-section--${sectionTypeClass}` : undefined;

        return (
          <div
            key={section.id}
            className={wrapperClass}
            data-section-id={section.id}
            data-section-type={section.type}
            data-section-index={index}
            data-section-variant={sectionVariant}
            data-town-hub-section={context === 'town_hub' ? 'true' : undefined}
          >
            <Component data={componentData as never} />
          </div>
        );
      })}
    </>
  );
}
