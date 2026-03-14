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
  Star,
  TimerReset,
  Trees,
  Wrench,
} from 'lucide-react';
import type { CMSPage, CMSSection } from '@/types/cms';
import HomeHero from '@/src/components/sections/HomeHero';
import LeadForm from '@/src/components/sections/LeadForm';

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
  eyebrow?: string;
  tagline?: string;
  supporting_line?: string;
  background_video?: string;
  background_poster?: string;
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
  variant?: string;
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
  eyebrow?: string | null;
  steps?: ProcessStep[];
};

type TownLink = {
  name: string;
  url: string;
};

type County = {
  name?: string;
  county_name?: string;
  title?: string;
  url?: string;
  phone?: string;
  image?: string;
  description?: string;
  towns?: string[];
  cities?: string[];
  towns_expanded?: string[];
  town_links?: TownLink[];
};

type AreasServedData = {
  title?: string;
  subtitle?: string | null;
  eyebrow?: string | null;
  counties?: County[];
};

type ProjectItem = {
  title?: string;
  description?: string;
  image?: string | null;
  url?: string;
  tag?: string;
  quote?: string;
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

type LeadFormData = {
  title?: string;
  headline?: string;
  subtitle?: string;
  subheadline?: string;
  title_highlight?: string;
  background_image?: string;
  form_title?: string;
  steps?: Array<{ number?: number; text?: string; title?: string; description?: string }>;
  fields?: Array<{
    name: string;
    label: string;
    type: string;
    required?: boolean;
    options?: Array<string | { label: string; value: string }>;
    placeholder?: string;
  }>;
  submit_label?: string;
  success_message?: string;
  privacy_note?: string;
  consent_text?: string;
  form_placeholder?: boolean;
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
  if (normalized.includes('insurance')) return ShieldCheck;

  return SquareStack;
}

function mergeServices(
  blocks: LegacyBlock[],
  items: ServiceItem[] | undefined,
  group?: string
): MergedService[] {
  const gridItems = items ?? [];

  // If grid items already have summaries/descriptions and images, use them directly
  const hasDirectData = gridItems.some((item) => (item.summary || item.description) && item.image);
  if (hasDirectData) {
    return gridItems.map((item) => ({
      title: item.title || '',
      description: item.summary || item.description || '',
      url: item.url || '#',
      ctaLabel: item.cta_label || 'Learn More',
      image: item.image || getServiceFallbackImage(item.title || ''),
    }));
  }

  // Legacy merge from rich_text blocks
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

function extractLicenseNumber(text: string) {
  const match = text.match(/#\d{6,}/);
  return match?.[0] || '#0668405';
}

/* ════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ════════════════════════════════════════════════════════════════════════ */

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
        <span className="relative mb-4 inline-block pl-5 text-xs font-bold uppercase tracking-[0.18em] text-[#9A7340] before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-2.5 before:-translate-y-1/2 before:bg-[#BC9155]">
          {label}
        </span>
      ) : null}
      {title ? (
        <h2 className={joinClasses('text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.5px]', dark ? 'text-white' : 'text-[#1E2B43]')}>
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className={joinClasses('mx-auto mt-5 max-w-[700px] text-[17px] leading-[1.75]', dark ? 'text-white/60' : 'text-[#5C677D]')}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

function HomeTrustBar({ data }: { data: TrustBarData | null }) {
  const items = data?.items ?? [];
  if (items.length === 0) return null;

  const isStats = data?.variant === 'stats' || items.some((item) => item.value);

  if (isStats) {
    return (
      <section className="border-y border-[#BC9155]/20 bg-[#1E2B43]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 text-center sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={`trust-${index}`}
              className={joinClasses(
                'px-5 py-9 transition-all hover:-translate-y-0.5 hover:bg-[#BC9155]/8',
                index < items.length - 1 && 'border-b border-[#BC9155]/12 sm:border-b-0 lg:border-r'
              )}
            >
              <div className="font-serif text-[42px] font-bold leading-none text-[#BC9155]">
                {item.value}
                {item.icon === 'star' ? (
                  <span className="ml-1 inline-block text-2xl opacity-70">
                    <Star className="inline h-6 w-6 fill-[#BC9155] text-[#BC9155]" />
                  </span>
                ) : null}
              </div>
              <div className="mt-2 text-[13px] font-medium uppercase tracking-[1px] text-white/60">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Fallback: original text-only trust bar
  const textItems = items.map((item) => item.label || item.text || item.value || '').filter(Boolean);
  return (
    <section className="border-y border-[#BC9155]/20 bg-[#1E2B43]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 text-center sm:grid-cols-2 lg:grid-cols-4">
        {textItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className={joinClasses(
              'px-6 py-8 text-sm font-medium uppercase tracking-[0.12em] text-white/62',
              index < textItems.length - 1 && 'border-b border-white/8 sm:border-b-0 lg:border-r lg:border-[#BC9155]/12'
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

function HomeWhySection({
  title,
  description,
  blocks,
  eyebrow,
}: {
  title?: string | null;
  description?: string | null;
  blocks: LegacyBlock[];
  eyebrow?: string | null;
}) {
  if (blocks.length === 0) {
    return null;
  }

  return (
    <section id="why-choose" className="scroll-mt-28 bg-white px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        <HomeSectionHeader
          label={eyebrow || 'Our Commitment'}
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
              <div className="font-serif text-[48px] font-bold leading-none text-[#BC9155]/15">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="mt-5 text-2xl font-bold text-[#1E2B43]">{block.heading}</h3>
              {paragraphList(block.content).map((p, i) => (
                <p key={i} className="mt-3 text-[15px] leading-[1.75] text-[#5C677D]">{p}</p>
              ))}
            </article>
          ))}
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
}: {
  title?: string | null;
  description?: string | null;
  primaryServices: MergedService[];
  secondaryServices: MergedService[];
  primaryLabel?: string | null;
}) {
  if (primaryServices.length === 0 && secondaryServices.length === 0) {
    return null;
  }

  return (
    <section id="services" className="scroll-mt-28 bg-[#F5F1E9] px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        <HomeSectionHeader label={primaryLabel || 'Our Services'} title={title} description={description} />

        {/* Primary services - cards with images */}
        {primaryServices.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {primaryServices.map((service) => (
              <Link
                key={service.title}
                href={service.url}
                className="group overflow-hidden rounded-lg border-b-2 border-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#BC9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]"
              >
                <div className="h-[200px] overflow-hidden">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <div className="px-[22px] py-6">
                  <h3 className="text-lg font-semibold text-[#1E2B43]">{service.title}</h3>
                  <p className="mt-2.5 line-clamp-3 text-sm leading-[1.65] text-[#5C677D]">{service.description}</p>
                  <span className="mt-3.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#BC9155] transition-all group-hover:gap-2.5">
                    {service.ctaLabel}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : null}

        {/* Secondary services - cards with images */}
        {secondaryServices.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {secondaryServices.map((service) => {
              const Icon = serviceIcon(service.title);

              return (
                <Link
                  key={service.title}
                  href={service.url}
                  className="group overflow-hidden rounded-lg border-b-2 border-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#BC9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]"
                >
                  <div className="h-[200px] overflow-hidden">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#1E2B43]/5">
                        <Icon className="h-12 w-12 text-[#BC9155]/40" />
                      </div>
                    )}
                  </div>
                  <div className="px-[22px] py-6">
                    <h3 className="text-lg font-semibold text-[#1E2B43]">{service.title}</h3>
                    <p className="mt-2.5 line-clamp-3 text-sm leading-[1.65] text-[#5C677D]">{service.description}</p>
                    <span className="mt-3.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#BC9155] transition-all group-hover:gap-2.5">
                      {service.ctaLabel}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : null}

        <div className="mt-12 text-center">
          <Link
            href="/services/"
            className="inline-flex items-center gap-2 rounded border-2 border-[#1E2B43] px-8 py-3.5 text-sm font-semibold text-[#1E2B43] transition-colors hover:bg-[#1E2B43] hover:text-white"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
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
    <section id="process" className="scroll-mt-28 overflow-hidden bg-[#1E2B43] px-6 py-24 text-white lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        <HomeSectionHeader
          label={data?.eyebrow || 'Our Process'}
          title={data?.title}
          description={data?.subtitle}
          dark
        />

        <div className="relative grid gap-10 lg:grid-cols-5 lg:gap-0">
          <div className="absolute left-[10%] right-[10%] top-[34px] hidden h-0.5 bg-[#BC9155]/25 lg:block" />
          {steps.map((step, index) => (
            <div key={`${step.title}-${index}`} className="relative px-4 text-center">
              <div className="relative z-10 mx-auto mb-5 flex h-[68px] w-[68px] items-center justify-center rounded-full border-[2.5px] border-[#BC9155] bg-[#BC9155]/42 font-serif text-2xl font-bold text-[#f5e0c0] shadow-[0_0_0_4px_rgba(188,145,85,0.12)]">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-white">{step.title || step.short}</h3>
              {step.description ? (
                <p className="mt-3 text-sm leading-[1.65] text-white/70">{step.description}</p>
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
  eyebrow,
}: {
  title?: string | null;
  description?: string | null;
  counties: County[];
  eyebrow?: string | null;
}) {
  if (counties.length === 0) {
    return null;
  }

  return (
    <section id="areas" className="scroll-mt-28 bg-[#F5F1E9] px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        <HomeSectionHeader label={eyebrow || 'Service Areas'} title={title} description={description} />

        <div className="grid gap-8 lg:grid-cols-2">
          {counties.map((county) => {
            const countyName = county.name || county.county_name || county.title || '';
            const towns = county.towns || county.cities || [];
            const townLinks = county.town_links || [];

            return (
              <article
                key={countyName}
                className="overflow-hidden rounded-lg border-b-2 border-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#BC9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]"
              >
                {county.image ? (
                  <div className="h-[200px] overflow-hidden">
                    <img
                      src={county.image}
                      alt={`${countyName}, Connecticut home remodeling service area`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-serif text-2xl font-bold text-[#1E2B43]">{countyName}</h3>
                  {county.phone ? (
                    <div className="mt-1.5 text-[15px] text-[#5C677D]">
                      Call: <a href={`tel:${county.phone.replace(/\D/g, '')}`} className="font-semibold text-[#BC9155] hover:underline">{county.phone}</a>
                    </div>
                  ) : null}
                  {county.description ? (
                    <p className="mt-3.5 border-b border-[#1E2B43]/6 pb-4.5 text-sm leading-[1.7] text-[#5C677D]">
                      {county.description}
                    </p>
                  ) : null}

                  {/* Town pills */}
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {(townLinks.length > 0 ? townLinks : towns.map((t) => ({ name: t, url: '' }))).map((town) =>
                      typeof town === 'string' ? (
                        <span key={town} className="rounded-full bg-[#F5F1E9] px-2.5 py-[7px] text-center text-[11px] font-semibold text-[#1E2B43] transition-colors hover:bg-[#BC9155]/10 hover:text-[#9A7340]">
                          {town}
                        </span>
                      ) : town.url ? (
                        <Link
                          key={town.name}
                          href={town.url}
                          className="rounded-full bg-[#F5F1E9] px-2.5 py-[7px] text-center text-[11px] font-semibold text-[#1E2B43] transition-colors hover:bg-[#BC9155] hover:text-white"
                        >
                          {town.name}
                        </Link>
                      ) : (
                        <span key={town.name} className="rounded-full bg-[#F5F1E9] px-2.5 py-[7px] text-center text-[11px] font-semibold text-[#1E2B43]">
                          {town.name}
                        </span>
                      )
                    )}
                  </div>

                  {county.url ? (
                    <Link
                      href={county.url}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#BC9155] transition-all hover:gap-2.5"
                    >
                      Learn more about {countyName}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HomeTrustStrip() {
  const trustItems = [
    { label: 'Google Rating 4.9', icon: 'star' },
    { label: 'BBB A+ Accredited', icon: 'shield' },
    { label: 'Trusted on Houzz', icon: 'check' },
    { label: 'CT HIC License #0668405', icon: 'license' },
    { label: 'Verified on Angi & Thumbtack', icon: 'check' },
  ];

  return (
    <div className="border-y border-[#1E2B43]/8 bg-white py-5">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-8 px-6">
        {trustItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm font-medium text-[#5C677D]">
            {item.icon === 'star' ? (
              <Star className="h-5 w-5 fill-[#BC9155] text-[#BC9155]" />
            ) : item.icon === 'shield' ? (
              <ShieldCheck className="h-5 w-5 text-[#BC9155]" />
            ) : (
              <svg className="h-5 w-5 text-[#BC9155]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>
            )}
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeMidCta() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#1E2B43_0%,#151E30_100%)] px-10 py-[72px] text-center">
      <div className="relative z-10">
        <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.3px] text-white">
          Ready to <span className="text-[#BC9155]">Begin</span>?
        </h2>
        <p className="mx-auto mb-7 mt-3.5 max-w-[480px] text-[17px] text-white/65">
          Great remodeling starts with the right team.
        </p>
        <Link
          href="/free-consultation/"
          className="inline-flex min-w-[min(340px,100%)] items-center justify-center rounded-md bg-[#BC9155] px-11 py-[18px] text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48]"
        >
          Schedule a Free Consultation
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        <p className="mt-4 text-[13px] italic text-white/40">
          On-site or remote via Google Meet. No charge, no obligation.
        </p>
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
  projects: ProjectItem[];
}) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="scroll-mt-28 bg-white px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        <HomeSectionHeader
          label="Case Studies"
          title={title}
          description={description}
        />

        <div className="grid gap-7 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex flex-col overflow-hidden rounded-lg border-b-2 border-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#BC9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]"
            >
              <div className="h-[260px] overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title || ''}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                    loading="lazy"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-[#1E2B43]">{project.title}</h3>
                <p className="mt-3 text-sm leading-[1.7] text-[#5C677D]">{project.description}</p>

                {project.quote ? (
                  <div className="mt-auto mb-5 mt-5 rounded-r-md border-l-[3px] border-[#BC9155] bg-[#F5F1E9] px-5 py-[18px]">
                    <p className="text-sm italic leading-snug text-[#1E2B43]">{project.quote}</p>
                    {project.tag ? (
                      <span className="mt-1.5 block text-xs font-semibold text-[#5C677D]">&mdash; {project.tag}</span>
                    ) : null}
                  </div>
                ) : null}

                {project.url ? (
                  <Link
                    href={project.url}
                    className="mt-auto flex w-full items-center justify-center gap-2 rounded bg-[#BC9155] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#a57d48]"
                  >
                    Read case study
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/case-studies/"
            className="inline-flex items-center gap-2 rounded border-2 border-[#1E2B43] px-8 py-3.5 text-sm font-semibold text-[#1E2B43] transition-colors hover:bg-[#1E2B43] hover:text-white"
          >
            See All Case Studies
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
      title: `CT License ${licenseNumber}`,
      copy: 'Issued by the Department of Consumer Protection',
    },
    {
      icon: Brush,
      title: 'General Liability Insurance',
      copy: 'Full coverage on every project we take on',
    },
    {
      icon: TimerReset,
      title: "Workers' Compensation",
      copy: 'Every crew member is covered while on your property',
    },
    {
      icon: Wrench,
      title: 'Licensed Subcontractors',
      copy: 'All specialty trades are licensed and insured',
    },
  ];

  return (
    <section className="overflow-hidden bg-[linear-gradient(135deg,#2D3E33_0%,#1A2D22_100%)] px-6 py-24 text-white lg:px-10">
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          {title ? (
            <>
              <span className="relative mb-4 inline-block pl-5 text-xs font-bold uppercase tracking-[0.18em] text-[#BC9155] before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-2.5 before:-translate-y-1/2 before:bg-[#BC9155]">
                Licensed in Connecticut
              </span>
              <h2 className="text-[clamp(2rem,3.5vw,2.75rem)] font-bold tracking-[-0.5px] text-white">
                {title}
              </h2>
            </>
          ) : null}
          <div className="mt-6 space-y-5 text-base leading-8 text-white/70">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-lg border border-white/15 bg-white/8 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-b-2 hover:border-b-[#BC9155] hover:bg-white/12 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#BC9155]/28 text-[#BC9155]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-[15px] font-semibold text-white">{feature.title}</h3>
                <p className="mt-1.5 text-[13px] leading-[1.55] text-white/65">{feature.copy}</p>
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

/* ════════════════════════════════════════════════════════════════════════
   MAIN TEMPLATE
   ════════════════════════════════════════════════════════════════════════ */

export function HomePageTemplate({ page }: { page: CMSPage }) {
  const homePage = page as HomePageData;
  const phones = homePage.phones?.items?.filter((phone) => phone.label && phone.number) ?? [];

  // ── Extract section data ──
  const hero = asData<HeroSliderData>(firstSection(page, 'hero'));
  const trust = asData<TrustBarData>(firstSection(page, 'trust_bar'));

  // Why Choose
  const whyCopy = asData<RichTextData>(richTextSectionByTitle(page, 'Why Homeowners Choose BuiltWell CT'));
  const parsedWhyCopy = parseLegacyContent(rawRichText(whyCopy));

  // Services
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

  // Process
  const process = asData<ProcessStepsData>(firstSection(page, 'process_steps'));

  // Areas
  const areas = asData<AreasServedData>(firstSection(page, 'areas_served'));

  // Projects
  const projects = asData<ProjectHighlightsData>(firstSection(page, 'project_highlights'));
  const projectItems = projects?.items ?? [];

  // Licensed
  const licensedCopy = asData<RichTextData>(richTextSectionByTitle(page, 'Licensed and Insured in Connecticut'));
  const licensedParagraphs = paragraphList(rawRichText(licensedCopy));

  // CTA
  const cta = asData<CtaBlockData>(firstSection(page, 'cta_block'));

  // Lead Form
  const leadForm = asData<LeadFormData>(firstSection(page, 'lead_form'));

  // ── Derived values ──
  const servicesDescription = primaryServicesGrid?.subtitle || parsedServicesCopy.intro[0] || null;
  const whyDescription = parsedWhyCopy.intro[0] || null;

  return (
    <div className="bg-white text-[#1E2B43]">
      {/* 1. Hero */}
      {hero ? <HomeHero data={hero} /> : null}

      {/* 2. Trust Bar (stats) */}
      <HomeTrustBar data={trust} />

      {/* 3. Why Choose (before services in redesign) */}
      <HomeWhySection
        title={whyCopy?.title}
        eyebrow={whyCopy?.eyebrow}
        description={whyDescription}
        blocks={parsedWhyCopy.blocks}
      />

      {/* 4. Services */}
      <HomeServicesSection
        primaryLabel={primaryServicesGrid?.title}
        title={servicesCopy?.title || 'Home Remodeling Services'}
        description={servicesDescription}
        primaryServices={primaryServices}
        secondaryServices={secondaryServices}
      />

      {/* 5. Process */}
      <HomeProcessSection data={process} />

      {/* 6. Areas */}
      <HomeAreasSection
        title={areas?.title}
        eyebrow={areas?.eyebrow}
        description={areas?.subtitle}
        counties={areas?.counties ?? []}
      />

      {/* 7. Trust Strip */}
      <HomeTrustStrip />

      {/* 8. Mid CTA */}
      <HomeMidCta />

      {/* 9. Projects */}
      <HomeProjectsSection
        title={projects?.title}
        description={projects?.subtitle}
        projects={projectItems}
      />

      {/* 10. Licensed */}
      <HomeLicensedSection
        title={licensedCopy?.title}
        paragraphs={licensedParagraphs}
      />

      {/* 11. Lead Form (if available) or CTA fallback */}
      {leadForm ? (
        <LeadForm data={leadForm} />
      ) : (
        <HomeCtaSection data={cta} phones={phones} />
      )}

    </div>
  );
}
