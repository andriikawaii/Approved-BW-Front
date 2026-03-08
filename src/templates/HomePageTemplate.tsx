import Link from 'next/link';
import {
  ArrowRight,
  Brush,
  DraftingCompass,
  HeartHandshake,
  Home,
  LayoutGrid,
  PaintBucket,
  ShieldCheck,
  SquareStack,
  TimerReset,
  Trees,
  Wrench,
} from 'lucide-react';
import type { CMSPage, CMSSection } from '@/types/cms';
import HomeHeader from '@/src/components/layouts/HomeHeader';
import HomeFooter from '@/src/components/layouts/HomeFooter';
import HomeHero from '@/src/components/sections/HomeHero';

type PhoneItem = {
  label: string;
  number: string;
};

type HomePageData = CMSPage & {
  phones?: {
    items?: PhoneItem[];
  };
};

type Cta = {
  label: string;
  url: string;
};

type HeroSlide = {
  image?: string;
  alt?: string;
  caption?: string | null;
};

type HeroBadge = {
  label?: string;
  value?: string;
};

type HeroSliderData = {
  headline?: string;
  subheadline?: string;
  cta_primary?: Cta;
  cta_secondary?: Cta;
  slides?: HeroSlide[];
  badges?: HeroBadge[];
};

type TrustItem = {
  icon?: string;
  label?: string;
  text?: string;
  value?: string | null;
};

type TrustBarData = {
  items?: TrustItem[];
};

type RichTextData = {
  title?: string | null;
  headline?: string | null;
  eyebrow?: string | null;
  content?: string | null;
  body?: string | null;
};

type ServiceItem = {
  title?: string;
  summary?: string | null;
  description?: string | null;
  image?: string | null;
  url?: string;
  cta_label?: string;
};

type ServicesGridData = {
  title?: string;
  subtitle?: string | null;
  items?: ServiceItem[];
  services?: ServiceItem[];
};

type ProcessStep = {
  title?: string;
  short?: string;
  description?: string;
};

type ProcessStepsData = {
  title?: string;
  subtitle?: string | null;
  steps?: ProcessStep[];
};

type County = {
  name?: string;
  county_name?: string;
  title?: string;
  url?: string;
  towns?: string[];
  cities?: string[];
};

type AreasServedData = {
  title?: string;
  subtitle?: string | null;
  counties?: County[];
};

type ProjectItem = {
  title?: string;
  description?: string;
  image?: string | null;
  url?: string;
  tag?: string;
};

type ProjectHighlightsData = {
  eyebrow?: string | null;
  title?: string;
  subtitle?: string | null;
  items?: ProjectItem[];
};

type CtaBlockData = {
  title?: string;
  subtitle?: string | null;
  subtext?: string | null;
  button?: Cta;
};

type LegacyBlock = {
  heading: string;
  content: string;
  group?: string;
};

type ParsedLegacyContent = {
  intro: string[];
  blocks: LegacyBlock[];
  trailing: string[];
};

type MergedService = {
  title: string;
  description: string;
  url: string;
  ctaLabel: string;
  image: string | null;
};

type MergedProject = {
  title: string;
  description: string;
  image: string | null;
  url: string;
  tag?: string;
  quote?: string;
};

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function asData<T>(section?: CMSSection | null): T | null {
  if (!section?.data) {
    return null;
  }

  return section.data as T;
}

function firstSection(page: CMSPage, type: string) {
  return page.sections.find((section) => section.is_active && section.type === type);
}

function sectionsByType(page: CMSPage, type: string) {
  return page.sections.filter((section) => section.is_active && section.type === type);
}

function normalizeTitle(value?: string | null) {
  return (value ?? '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function rawRichText(data?: RichTextData | null) {
  return (data?.content || data?.body || '').replace(/\r/g, '').trim();
}

function richTextSectionByTitle(page: CMSPage, titleMatch: string) {
  return page.sections.find((section) => {
    if (!section.is_active || section.type !== 'rich_text') {
      return false;
    }

    const data = section.data as RichTextData;
    return normalizeTitle(data.title || data.headline) === normalizeTitle(titleMatch);
  });
}

function cleanParagraphs(lines: string[]) {
  return lines
    .join('\n')
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function parseLegacyContent(rawContent: string): ParsedLegacyContent {
  const lines = rawContent.split('\n');
  const introLines: string[] = [];
  const trailingLines: string[] = [];
  const blocks: LegacyBlock[] = [];
  let currentGroup: string | undefined;
  let currentHeading: string | null = null;
  let currentLines: string[] = [];
  let startedBlocks = false;

  const pushBlock = () => {
    if (!currentHeading) {
      return;
    }

    blocks.push({
      heading: currentHeading.trim(),
      content: currentLines.join('\n').trim(),
      group: currentGroup,
    });
    currentHeading = null;
    currentLines = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (/^H3:\s*/i.test(trimmed)) {
      startedBlocks = true;
      pushBlock();
      currentHeading = trimmed.replace(/^H3:\s*/i, '').trim();
      continue;
    }

    if (/^###\s+/.test(trimmed)) {
      startedBlocks = true;
      pushBlock();
      currentHeading = trimmed.replace(/^###\s+/, '').trim();
      continue;
    }

    const groupMatch = trimmed.match(/^---\s*(.+?)\s*---$/);
    if (groupMatch) {
      if (currentHeading) {
        pushBlock();
      }
      currentGroup = groupMatch[1].trim();
      continue;
    }

    if (!startedBlocks) {
      introLines.push(line);
      continue;
    }

    if (!currentHeading) {
      trailingLines.push(line);
      continue;
    }

    currentLines.push(line);
  }

  pushBlock();

  return {
    intro: cleanParagraphs(introLines),
    blocks,
    trailing: cleanParagraphs(trailingLines),
  };
}

function stripMarkdownLinks(text: string) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1').replace(/\s+/g, ' ').trim();
}

function paragraphList(text: string) {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => stripMarkdownLinks(paragraph.trim()))
    .filter(Boolean);
}

function findItemByTitle<T extends { title?: string | null }>(items: T[] | undefined, title: string) {
  const target = normalizeTitle(title);
  return (items ?? []).find((item) => normalizeTitle(item.title) === target);
}

function getServiceFallbackImage(title: string) {
  const normalized = normalizeTitle(title);

  if (normalized.includes('kitchen')) return '/images/services/service-kitchen.jpg';
  if (normalized.includes('bathroom')) return '/images/services/bathroom-remodel-new.jpg';
  if (normalized.includes('basement')) return '/images/services/basement-finish-real.jpeg';
  if (normalized.includes('addition')) return '/images/services/living-room-real.jpeg';
  if (normalized.includes('flooring')) return '/images/services/service-flooring.png';
  if (normalized.includes('painting')) return '/images/services/interior-painting-new.jpg';
  if (normalized.includes('carpentry')) return '/images/services/interior-carpentry-final.jpeg';
  if (normalized.includes('attic')) return '/images/services/attic-empty.jpg';
  if (normalized.includes('deck')) return '/images/services/deck-real.jpg';
  if (normalized.includes('design')) return '/images/services/remodeling-design.png';
  if (normalized.includes('comfort') || normalized.includes('accessibility')) {
    return '/images/services/comfort-accessibility.jpg';
  }

  return '/images/hero/hero-carousel-final.png';
}

function serviceIcon(title: string) {
  const normalized = normalizeTitle(title);

  if (normalized.includes('flooring')) return LayoutGrid;
  if (normalized.includes('painting')) return PaintBucket;
  if (normalized.includes('carpentry')) return Wrench;
  if (normalized.includes('attic')) return Home;
  if (normalized.includes('deck')) return Trees;
  if (normalized.includes('design')) return DraftingCompass;
  if (normalized.includes('comfort') || normalized.includes('accessibility')) return HeartHandshake;

  return SquareStack;
}

function quoteFromParagraphs(paragraphs: string[]) {
  const quoteParagraph = paragraphs.find((paragraph) => /^"/.test(paragraph));
  if (!quoteParagraph) {
    return undefined;
  }

  return quoteParagraph.replace(/\s*-\s*[^-"]+$/, '').trim();
}

function mergeServices(
  blocks: LegacyBlock[],
  items: ServiceItem[] | undefined,
  group?: string
): MergedService[] {
  const gridItems = items ?? [];
  const relevantBlocks = group
    ? blocks.filter((block) => normalizeTitle(block.group) === normalizeTitle(group))
    : blocks;

  return relevantBlocks.reduce<MergedService[]>((services, block) => {
      const matchedItem = findItemByTitle(gridItems, block.heading);
      const paragraphs = paragraphList(block.content);
      const description = paragraphs.find((paragraph) => !/^learn more/i.test(paragraph)) || matchedItem?.summary || matchedItem?.description || '';

      if (!matchedItem?.url && !description) {
        return services;
      }

      services.push({
        title: matchedItem?.title || block.heading,
        description,
        url: matchedItem?.url || '#',
        ctaLabel: matchedItem?.cta_label || 'Learn More',
        image: matchedItem?.image || getServiceFallbackImage(matchedItem?.title || block.heading),
      });

      return services;
    }, []);
}

function mergeProjects(blocks: LegacyBlock[], items: ProjectItem[] | undefined): MergedProject[] {
  return (items ?? []).reduce<MergedProject[]>((projects, item) => {
      const matchedBlock = blocks.find((block) => normalizeTitle(block.heading) === normalizeTitle(item.title));
      const paragraphs = matchedBlock ? paragraphList(matchedBlock.content) : [];
      const description =
        paragraphs.find((paragraph) => !/^"/.test(paragraph) && !/^read /i.test(paragraph) && !/^see all /i.test(paragraph)) ||
        item.description ||
        '';

      if (!item.title || !item.url) {
        return projects;
      }

      projects.push({
        title: item.title || '',
        description,
        image: item.image || '/images/hero/hero-carousel-final.png',
        url: item.url || '#',
        tag: item.tag,
        quote: quoteFromParagraphs(paragraphs),
      });

      return projects;
    }, []);
}

function parseHeroMeta(paragraphs: string[]) {
  const primary = paragraphs[0] || '';
  const secondaryLines = (paragraphs[1] || '')
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean);

  return { primary, secondaryLines };
}

function getCountyName(county: County) {
  return county.name || county.county_name || county.title || '';
}

function getCountyTowns(county: County) {
  return county.towns || county.cities || [];
}

function countyDescription(blocks: LegacyBlock[], countyName: string, fallback: string[]) {
  const matched = blocks.find((block) => normalizeTitle(block.heading) === normalizeTitle(countyName));
  const paragraphs = matched ? paragraphList(matched.content) : [];
  return paragraphs[0] || fallback.join(', ');
}

function extractLicenseNumber(text: string) {
  const match = text.match(/#\d{6,}/);
  return match?.[0] || '#0668405';
}

function HomeSectionHeader({
  label,
  title,
  description,
  dark = false,
}: {
  label?: string | null;
  title?: string | null;
  description?: string | null;
  dark?: boolean;
}) {
  if (!label && !title && !description) {
    return null;
  }

  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">
      {label ? (
        <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-[#BC9155]">
          {label}
        </span>
      ) : null}
      {title ? (
        <h2 className={joinClasses('text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em]', dark ? 'text-white' : 'text-[#1E2B43]')}>
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className={joinClasses('mx-auto mt-5 text-[1.02rem] leading-8', dark ? 'text-white/62' : 'text-[#5C677D]')}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

function HomeTrustBar({ data }: { data: TrustBarData | null }) {
  const items =
    data?.items?.length
      ? data.items.map((item) => item.label || item.text || item.value || '').filter(Boolean)
      : [];

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-[#BC9155]/20 bg-[#1E2B43]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 text-center sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className={joinClasses(
              'px-6 py-8 text-sm font-medium uppercase tracking-[0.12em] text-white/62',
              index < items.length - 1 && 'border-b border-white/8 sm:border-b-0 lg:border-r lg:border-[#BC9155]/12'
            )}
          >
            <div className="mb-2 flex items-center justify-center text-[#BC9155]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function HomeIntro({ section }: { section: RichTextData | null }) {
  const parsed = parseLegacyContent(rawRichText(section));
  const { primary, secondaryLines } = parseHeroMeta(parsed.intro);

  if (!primary && secondaryLines.length === 0) {
    return null;
  }

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 rounded-lg border border-[#e6dccb] bg-[#FCFAF6] p-8 shadow-[0_18px_40px_rgba(30,43,67,0.06)] lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
          <div>
            <p className="text-[1.12rem] leading-9 text-[#36465f]">{primary}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {secondaryLines.map((line, index) => (
              <div
                key={`${line}-${index}`}
                className="rounded-md border border-[#eadfcf] bg-white px-5 py-4 text-sm leading-7 text-[#5C677D]"
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeServicesSection({
  title,
  description,
  primaryServices,
  secondaryServices,
  primaryLabel,
  secondaryLabel,
  ctaLabel,
}: {
  title?: string | null;
  description?: string | null;
  primaryServices: MergedService[];
  secondaryServices: MergedService[];
  primaryLabel?: string | null;
  secondaryLabel?: string | null;
  ctaLabel?: string;
}) {
  if (primaryServices.length === 0 && secondaryServices.length === 0) {
    return null;
  }

  return (
    <section id="services" className="scroll-mt-28 bg-[#F5F1E9] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <HomeSectionHeader label={primaryLabel} title={title} description={description} />

        {primaryServices.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {primaryServices.map((service) => (
              <Link
                key={service.title}
                href={service.url}
                className="group overflow-hidden rounded-md border border-[#1E2B43]/6 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(30,43,67,0.12)]"
              >
                <div className="h-48 overflow-hidden bg-[#1E2B43]/5">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#1E2B43]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5C677D]">{service.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#BC9155] transition-all group-hover:gap-3">
                    {service.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : null}

        {secondaryServices.length > 0 ? (
          <div className="mt-10">
            <div className="mb-6 border-b border-[#1E2B43]/8 pb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#5C677D]">
              {secondaryLabel || 'Secondary Services'}
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {secondaryServices.map((service) => {
                const Icon = serviceIcon(service.title);

                return (
                  <Link
                    key={service.title}
                    href={service.url}
                    className="group rounded-md border border-[#1E2B43]/6 bg-white p-6 transition-all duration-300 hover:border-[#BC9155] hover:shadow-[0_10px_28px_rgba(30,43,67,0.08)]"
                  >
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#BC9155]/12 text-[#BC9155]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1E2B43]">{service.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#5C677D]">{service.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="mt-12 text-center">
          <Link
            href="/services/"
            className="inline-flex items-center gap-2 rounded-sm border-2 border-[#1E2B43] px-7 py-3.5 text-sm font-semibold text-[#1E2B43] transition-colors hover:bg-[#1E2B43] hover:text-white"
          >
            {ctaLabel || 'View all our services.'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function HomeWhySection({
  title,
  description,
  blocks,
}: {
  title?: string | null;
  description?: string | null;
  blocks: LegacyBlock[];
}) {
  if (blocks.length === 0) {
    return null;
  }

  return (
    <section id="why" className="scroll-mt-28 bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <HomeSectionHeader
          title={title}
          description={description}
        />

        <div className="grid gap-10 lg:grid-cols-3">
          {blocks.map((block, index) => (
            <article
              key={`${block.heading}-${index}`}
              className="relative overflow-hidden rounded-lg border border-[#1E2B43]/4 bg-[#F5F1E9] px-9 py-10"
            >
              <div className="absolute inset-x-0 top-0 h-[3px] bg-[#BC9155]" />
              <div className="text-[3rem] font-bold leading-none text-[#BC9155]/15">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="mt-5 text-[1.7rem] font-bold text-[#1E2B43]">{block.heading}</h3>
              <p className="mt-4 text-[0.98rem] leading-8 text-[#5C677D]">
                {paragraphList(block.content).join(' ')}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeProcessSection({ data }: { data: ProcessStepsData | null }) {
  const steps = data?.steps ?? [];

  if (steps.length === 0) {
    return null;
  }

  return (
    <section id="process" className="scroll-mt-28 bg-[#1E2B43] px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <HomeSectionHeader
          title={data?.title}
          description={data?.subtitle}
          dark
        />

        <div className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
          <div className="absolute left-[10%] right-[10%] top-[34px] hidden h-px bg-[#BC9155]/25 lg:block" />
          {steps.map((step, index) => (
            <div key={`${step.title}-${index}`} className="relative text-center">
              <div className="relative z-10 mx-auto mb-6 flex h-[68px] w-[68px] items-center justify-center rounded-full border-2 border-[#BC9155] bg-[#BC9155]/12 text-2xl font-bold text-[#BC9155]">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-white">{step.title || step.short}</h3>
              {step.description ? (
                <p className="mt-3 text-sm leading-7 text-white/56">{step.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeAreasSection({
  title,
  description,
  counties,
  blocks,
}: {
  title?: string | null;
  description?: string | null;
  counties: County[];
  blocks: LegacyBlock[];
}) {
  if (counties.length === 0) {
    return null;
  }

  return (
    <section id="areas" className="scroll-mt-28 bg-[#F5F1E9] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <HomeSectionHeader label="Where We Work" title={title} description={description} />

        <div className="grid gap-8 lg:grid-cols-2">
          {counties.map((county) => {
            const countyName = getCountyName(county);
            const towns = getCountyTowns(county);

            return (
              <article
                key={countyName}
                className="rounded-lg border border-[#1E2B43]/6 bg-white px-8 py-10"
              >
                <h3 className="text-[1.85rem] font-bold text-[#1E2B43]">{countyName}</h3>
                <p className="mt-4 text-[0.98rem] leading-8 text-[#5C677D]">
                  {countyDescription(blocks, countyName, towns)}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {towns.map((town) => (
                    <span
                      key={`${countyName}-${town}`}
                      className="rounded-full bg-[#F5F1E9] px-3.5 py-1.5 text-sm font-medium text-[#1E2B43]"
                    >
                      {town}
                    </span>
                  ))}
                </div>
                {county.url ? (
                  <Link
                    href={county.url}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#BC9155] transition-all hover:gap-3"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/service-areas/"
            className="inline-flex items-center gap-2 rounded-sm border-2 border-[#1E2B43] px-7 py-3.5 text-sm font-semibold text-[#1E2B43] transition-colors hover:bg-[#1E2B43] hover:text-white"
          >
            See all areas we serve.
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function HomeProjectsSection({
  title,
  description,
  projects,
}: {
  title?: string | null;
  description?: string | null;
  projects: MergedProject[];
}) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="scroll-mt-28 bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <HomeSectionHeader
          label="Recent Projects"
          title={title}
          description={description}
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.url}
              className="group overflow-hidden rounded-lg border border-[#1E2B43]/6 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(30,43,67,0.12)]"
            >
              <div className="h-64 overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>
              <div className="p-6">
                <h3 className="text-[1.45rem] font-bold text-[#1E2B43]">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5C677D]">{project.description}</p>

                {project.quote ? (
                  <div className="mt-5 rounded-r-md border-l-[3px] border-[#BC9155] bg-[#F5F1E9] px-4 py-4">
                    <p className="text-sm italic text-[#1E2B43]">{project.quote}</p>
                    {project.tag ? (
                      <span className="mt-1 block text-xs font-semibold text-[#5C677D]">{project.tag}</span>
                    ) : null}
                  </div>
                ) : null}

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#BC9155]">
                  Read case study
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/case-studies/"
            className="inline-flex items-center gap-2 rounded-sm border-2 border-[#1E2B43] px-7 py-3.5 text-sm font-semibold text-[#1E2B43] transition-colors hover:bg-[#1E2B43] hover:text-white"
          >
            See all case studies.
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function HomeLicensedSection({
  title,
  paragraphs,
}: {
  title?: string | null;
  paragraphs: string[];
}) {
  if (!title && paragraphs.length === 0) {
    return null;
  }

  const bodyText = paragraphs.join(' ');
  const licenseNumber = extractLicenseNumber(bodyText);
  const features = [
    {
      icon: ShieldCheck,
      title: 'CT HIC License',
      copy: licenseNumber,
    },
    {
      icon: Brush,
      title: 'General Liability',
      copy: 'Coverage on every project',
    },
    {
      icon: TimerReset,
      title: "Workers' Comp",
      copy: 'Coverage on every project',
    },
    {
      icon: Wrench,
      title: 'Licensed Subs',
      copy: 'Licensed, insured subcontractors',
    },
  ];

  return (
    <section className="bg-[linear-gradient(135deg,#2D3E33_0%,#1A2D22_100%)] px-6 py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div>
          {title ? (
            <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-bold tracking-[-0.03em] text-white">
              {title}
            </h2>
          ) : null}
          <div className="mt-6 space-y-5 text-[1rem] leading-8 text-white/72">
            {paragraphs.map((paragraph, index) => (
              <p key={`${paragraph}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-lg border border-white/8 bg-white/6 p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#BC9155]/15 text-[#BC9155]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/55">{feature.copy}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HomeCtaSection({
  data,
  phones,
}: {
  data: CtaBlockData | null;
  phones: PhoneItem[];
}) {
  const button = data?.button;

  if (!data?.title && !button) {
    return null;
  }

  return (
    <section id="contact" className="scroll-mt-28 bg-[#F5F1E9] px-6 py-24 text-center">
      <div className="mx-auto max-w-5xl">
        {data?.title ? (
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[#1E2B43]">
            {data.title}
          </h2>
        ) : null}
        {data?.subtext || data?.subtitle ? (
          <p className="mx-auto mt-5 max-w-3xl text-[1.02rem] leading-8 text-[#5C677D]">
            {data.subtext || data.subtitle}
          </p>
        ) : null}
        {button ? (
          <div className="mt-9">
            <Link
              href={button.url}
              className="inline-flex items-center gap-2 rounded-sm bg-[#BC9155] px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#a57d48]"
            >
              {button.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : null}

        {phones.length > 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-16">
            {phones.map((phone) => (
              <div key={`${phone.label}-${phone.number}`} className="flex flex-col items-center gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5C677D]">
                  {phone.label}
                </span>
                <a
                  href={`tel:${phone.number.replace(/\D/g, '')}`}
                  className="font-serif text-[1.45rem] font-bold text-[#1E2B43] transition-colors hover:text-[#BC9155]"
                >
                  {phone.number}
                </a>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function HomePageTemplate({ page }: { page: CMSPage }) {
  const homePage = page as HomePageData;
  const phones = homePage.phones?.items?.filter((phone) => phone.label && phone.number) ?? [];

  const hero = asData<HeroSliderData>(firstSection(page, 'hero_slider'));
  const trust = asData<TrustBarData>(firstSection(page, 'trust_bar'));
  const intro = asData<RichTextData>(richTextSectionByTitle(page, 'Hero Intro'));

  const serviceSections = sectionsByType(page, 'services_grid');
  const primaryServicesGrid = asData<ServicesGridData>(serviceSections[0]);
  const secondaryServicesGrid = asData<ServicesGridData>(serviceSections[1]);
  const servicesCopy = asData<RichTextData>(richTextSectionByTitle(page, 'What We Do'));
  const parsedServicesCopy = parseLegacyContent(rawRichText(servicesCopy));
  const primaryServices = mergeServices(
    parsedServicesCopy.blocks,
    primaryServicesGrid?.items || primaryServicesGrid?.services,
    'PRIMARY SERVICES'
  );
  const secondaryServices = mergeServices(
    parsedServicesCopy.blocks,
    secondaryServicesGrid?.items || secondaryServicesGrid?.services,
    'SECONDARY SERVICES'
  );

  const whyCopy = asData<RichTextData>(richTextSectionByTitle(page, 'Why Homeowners Choose BuiltWell CT'));
  const parsedWhyCopy = parseLegacyContent(rawRichText(whyCopy));

  const process = asData<ProcessStepsData>(firstSection(page, 'process_steps'));

  const areasCopy = asData<RichTextData>(richTextSectionByTitle(page, 'Where We Work'));
  const parsedAreasCopy = parseLegacyContent(rawRichText(areasCopy));
  const areas = asData<AreasServedData>(firstSection(page, 'areas_served'));

  const projectsCopy = asData<RichTextData>(richTextSectionByTitle(page, 'Recent Projects'));
  const parsedProjectsCopy = parseLegacyContent(rawRichText(projectsCopy));
  const projects = asData<ProjectHighlightsData>(firstSection(page, 'project_highlights'));
  const mergedProjects = mergeProjects(parsedProjectsCopy.blocks, projects?.items);

  const licensedCopy = asData<RichTextData>(richTextSectionByTitle(page, 'Licensed and Insured in Connecticut'));
  const licensedParagraphs = paragraphList(rawRichText(licensedCopy));

  const cta = asData<CtaBlockData>(firstSection(page, 'cta_block'));

  const servicesDescription = parsedServicesCopy.intro[0] || primaryServicesGrid?.subtitle || null;
  const servicesTrailingCta = parsedServicesCopy.trailing.find((item) => /view all/i.test(item));
  const whyDescription = parsedWhyCopy.intro[0] || null;
  const areasDescription = areas?.subtitle || parsedAreasCopy.intro[0] || null;
  const projectsDescription = parsedProjectsCopy.intro[0] || projects?.subtitle || null;

  return (
    <div className="bg-white text-[#1E2B43]">
      <HomeHeader phones={phones} />
      {hero ? <HomeHero data={hero} phones={phones} /> : null}
      <HomeTrustBar data={trust} />
      <HomeIntro section={intro} />
      <HomeServicesSection
        primaryLabel={primaryServicesGrid?.title}
        secondaryLabel={secondaryServicesGrid?.title}
        title={servicesCopy?.title || primaryServicesGrid?.title}
        description={servicesDescription}
        primaryServices={primaryServices}
        secondaryServices={secondaryServices}
        ctaLabel={servicesTrailingCta}
      />
      <HomeWhySection
        title={whyCopy?.title}
        description={whyDescription}
        blocks={parsedWhyCopy.blocks}
      />
      <HomeProcessSection data={process} />
      <HomeAreasSection
        title={areas?.title || areasCopy?.title}
        description={areasDescription}
        counties={areas?.counties ?? []}
        blocks={parsedAreasCopy.blocks}
      />
      <HomeProjectsSection
        title={projects?.title || projectsCopy?.title}
        description={projectsDescription}
        projects={mergedProjects}
      />
      <HomeLicensedSection
        title={licensedCopy?.title}
        paragraphs={licensedParagraphs}
      />
      <HomeCtaSection data={cta} phones={phones} />
      <HomeFooter phones={phones} />
    </div>
  );
}
