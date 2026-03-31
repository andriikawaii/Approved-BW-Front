'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  Check,
  CircleCheck,
  DraftingCompass,
  FileText,
  HeartHandshake,
  Home,
  LayoutGrid,
  PaintBucket,
  Shield,
  ShieldCheck,
  Upload,
  SquareStack,
  Star,
  Trees,
  Users,
  Wrench,
  ChevronDown,
} from 'lucide-react';
import type { CMSPage, CMSSection } from '@/types/cms';
import HomeHero from '@/src/components/sections/HomeHero';
import { AreasSection as SharedAreasSection, FinancingStrip as SharedFinancingStrip, LeadFormSection as SharedLeadFormSection } from './template-utils';

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
  extra_towns?: string[];
  towns_expanded?: string[];
  town_links?: TownLink[] | Record<string, string>;
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

type LeadField = NonNullable<LeadFormData['fields']>[number];

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

function highlightTitleHtml(title?: string | null) {
  if (!title) {
    return '';
  }

  const normalized = normalizeTitle(title);
  const mappings = [
    { key: 'why homeowners choose builtwell ct', target: 'BuiltWell CT' },
    { key: 'home remodeling services', target: 'Services' },
    { key: 'our remodeling process', target: 'Process' },
    { key: 'connecticut areas we serve', target: 'We Serve' },
    { key: 'recent remodeling projects', target: 'Projects' },
    { key: 'licensed and insured in connecticut', target: 'Insured' },
    { key: 'tell us about your project', target: 'Project' },
  ];

  const mapping = mappings.find((item) => normalized === item.key);
  if (!mapping || !title.includes(mapping.target)) {
    return title;
  }

  return title.replace(mapping.target, `<span style="color:#BC9155">${mapping.target}</span>`);
}

function fieldByNames(fields: LeadFormData['fields'], names: string[], fallback: LeadField) {
  const normalizedNames = names.map((name) => name.toLowerCase());
  const matched = (fields ?? []).find((field) => normalizedNames.includes(field.name.toLowerCase()));
  return matched || fallback;
}

function normalizeFieldOptions(options: LeadField['options']) {
  return (options ?? []).map((option) => (
    typeof option === 'string' ? { label: option, value: option } : option
  ));
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

  const isWhyChooseTitle = normalizeTitle(title) === 'why homeowners choose builtwell ct';

  return (
    <div className={joinClasses('home-fade-up mx-auto mb-9 text-center md:mb-12 lg:mb-16', isWhyChooseTitle ? 'max-w-5xl' : 'max-w-3xl')}>
      {label ? (
        <span className="relative mb-4 inline-block pl-5 text-[11px] font-bold uppercase tracking-[1px] text-[#9A7340] before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-2.5 before:-translate-y-1/2 before:bg-[#BC9155] md:text-[13px] md:tracking-[1.5px]">
          {label}
        </span>
      ) : null}
      {title ? (
        <h2
          className={joinClasses('text-[clamp(1.75rem,6vw,3rem)] font-bold tracking-[-0.5px]', isWhyChooseTitle && 'md:whitespace-nowrap', dark ? 'text-white' : 'text-[#1E2B43]')}
          dangerouslySetInnerHTML={{
            __html: highlightTitleHtml(title),
          }}
        />
      ) : null}
      {description ? (
        <p className={joinClasses('mx-auto mt-5 max-w-[700px] text-[15px] leading-[1.7] md:text-[17px] md:leading-[1.75]', dark ? 'text-white/60' : 'text-[#5C677D]')}>
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
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 text-center lg:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={`trust-${index}`}
              className={joinClasses(
                'group cursor-default bg-[#BC9155]/[0.08] px-4 py-6 transition-all duration-300 md:bg-transparent md:px-5 md:py-9 md:hover:-translate-y-[3px] md:hover:bg-[#BC9155]/8',
                index % 2 === 0 && 'border-r border-[#BC9155]/12 lg:border-r',
                index < 2 && 'border-b border-[#BC9155]/12 lg:border-b-0',
                index < items.length - 1 ? 'lg:border-r lg:border-[#BC9155]/12' : 'lg:border-r-0'
              )}
            >
              <div className="font-serif text-[32px] font-bold leading-none text-[#BC9155] transition-all duration-300 md:text-[42px] md:group-hover:text-[#d4a95a] md:group-hover:[text-shadow:0_0_20px_rgba(188,145,85,0.3)]">
                {item.value}
                {item.icon === 'star' ? (
                  <span className="ml-1 inline-block text-base opacity-70 md:text-2xl">
                    <Star className="inline h-4 w-4 fill-[#BC9155] text-[#BC9155] md:h-6 md:w-6" />
                  </span>
                ) : null}
              </div>
              <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.8px] text-white/85 transition-colors duration-300 md:mt-2 md:text-[13px] md:tracking-[1px] md:text-white/60 md:group-hover:text-white/85">
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
    <section id="why-choose" className="scroll-mt-28 bg-white px-5 py-[52px] md:px-8 md:py-20 lg:px-10 lg:py-[100px]">
      <div className="mx-auto max-w-[1280px]">
        <HomeSectionHeader
          label={eyebrow || 'Our Commitment'}
          title={title}
          description={description}
        />

        <div className="home-fade-up grid gap-4 md:gap-6 lg:grid-cols-3 lg:gap-10">
          {blocks.map((block, index) => (
            <article
              key={`${block.heading}-${index}`}
              className="relative overflow-hidden rounded-lg border border-[#1E2B43]/4 bg-[#F5F1E9] px-6 py-8 md:px-9 md:py-11"
            >
              <div className="absolute inset-x-0 top-0 h-[3px] bg-[#BC9155]" />
              <div className="mb-3.5 font-serif text-[40px] font-bold leading-none text-[#BC9155]/15 md:mb-5 md:text-[48px]">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="mb-3 text-[20px] font-bold text-[#1E2B43] md:mb-4 md:text-2xl">{block.heading}</h3>
              {paragraphList(block.content).map((p, i) => (
                <p key={i} className="mb-3 text-[14px] leading-[1.7] text-[#5C677D] last:mb-0 md:text-[15px] md:leading-[1.75]">{p}</p>
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
  const allServices = [...primaryServices, ...secondaryServices].slice(0, 6);

  if (allServices.length === 0) {
    return null;
  }

  return (
    <section id="services" className="scroll-mt-28 bg-[#F5F1E9] px-5 py-[52px] md:px-8 md:py-20 lg:px-10 lg:py-[100px]">
      <div className="mx-auto max-w-[1280px]">
        <HomeSectionHeader label={primaryLabel || 'Our Services'} title={title} description={description} />

        <div className="home-fade-up grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {allServices.map((service) => {
            const Icon = serviceIcon(service.title);

            return (
              <Link
                key={service.title}
                href={service.url}
                className="group overflow-hidden rounded-[8px] border-b-2 border-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-300 md:hover:-translate-y-[6px] md:hover:border-[#BC9155] md:hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]"
              >
                <div className="relative h-[180px] overflow-hidden md:h-[200px]">
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
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(188,145,85,0.12)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="px-[18px] py-5 text-center md:px-[22px] md:py-6">
                  <h3 className="font-sans text-[17px] font-semibold text-[#1E2B43] transition-colors duration-300 group-hover:text-[#BC9155] md:text-[18px]">
                    {service.title}
                  </h3>
                  <div className="mx-auto mb-[14px] mt-[10px] h-0.5 w-10 bg-[#BC9155]" />
                  <p className="line-clamp-3 text-[13px] leading-[1.65] text-[#5C677D] md:text-[14px]">
                    {service.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="home-fade-up mt-8 text-center md:mt-12">
          <Link
            href="/services/"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded border-2 border-[#1E2B43] px-8 py-3.5 text-sm font-semibold tracking-[0.3px] text-[#1E2B43] transition-colors hover:bg-[#1E2B43] hover:text-white md:min-h-0 md:w-auto"
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
  const fallbackSteps: ProcessStep[] = [
    {
      title: 'Consultation',
      description:
        'We visit your home or connect via Google Meet or Zoom at no charge and with no obligation, so we can understand the scope before we put anything in writing.',
    },
    {
      title: 'Planning',
      description:
        "You receive a written proposal with a clear breakdown of exactly what's included, the full project timeline, and the cost. No vague ranges, no surprises later.",
    },
    {
      title: 'Selections',
      description:
        'We guide you through every material choice and communicate lead times upfront, so nothing delays construction once the schedule is set.',
    },
    {
      title: 'Build',
      description:
        'Construction begins on the agreed start date. Crews show up on time, daily updates are sent, and the job site is cleaned every evening.',
    },
    {
      title: 'Walkthrough',
      description:
        "When the work is finished, we walk through the project together. Nothing is signed off until you're satisfied with every detail.",
    },
  ];
  const steps = (data?.steps && data.steps.length > 0 ? data.steps : fallbackSteps).slice(0, 5);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  if (steps.length === 0) {
    return null;
  }

  return (
    <section id="process" className="home-process scroll-mt-28 px-5 py-[52px] text-white md:px-8 md:py-20 lg:px-10 lg:py-[100px]">
      <div className="home-process-bg" aria-hidden="true" />
      <div className="home-process-inner">
        <div className="home-fade-up home-process-header">
          <span className="home-process-label">{data?.eyebrow || 'Our Process'}</span>
          <h2
            dangerouslySetInnerHTML={{
              __html: highlightTitleHtml(data?.title || 'Our Remodeling Process'),
            }}
          />
          <p>
            {data?.subtitle ||
              "We follow the same five-step process on every project, whether it's a single bathroom or a whole-home renovation. It keeps projects on schedule and keeps you informed at every stage."}
          </p>
        </div>

        <div className="home-fade-up home-process-timeline">
          {steps.map((step, index) => (
            <button
              type="button"
              key={`${step.title || step.short || 'step'}-${index}`}
              onClick={() => setActiveStep((current) => (current === index ? null : index))}
              className={joinClasses('home-process-step', activeStep === index && 'is-active')}
              aria-expanded={activeStep === index}
            >
              <div className="home-process-step-num">{index + 1}</div>
              <h3>{step.title || step.short || `Step ${index + 1}`}</h3>
              <p>{step.description || fallbackSteps[index]?.description || ''}</p>
            </button>
          ))}
        </div>
        <p className="home-process-hint">Click any step to learn more</p>
      </div>
      <style jsx>{`
        .home-process {
          position: relative;
          overflow: hidden;
          color: #fff;
        }
        .home-process-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(10, 18, 34, 0.9) 0%, rgba(30, 43, 67, 0.85) 100%);
          z-index: 0;
        }
        .home-process-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
        }
        .home-process-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .home-process-label {
          display: inline-block;
          font-size: 13px;
          font-weight: 700;
          color: #9a7340;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 16px;
          position: relative;
          padding-left: 20px;
        }
        .home-process-label::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 2px;
          background: #bc9155;
        }
        .home-process-header h2 {
          font-size: clamp(32px, 3.5vw, 48px);
          margin-bottom: 20px;
          letter-spacing: -0.5px;
          color: #fff;
          font-weight: 700;
        }
        .home-process-header p {
          font-size: 17px;
          color: rgba(255, 255, 255, 0.6);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.75;
        }
        .home-process-timeline {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 0;
          position: relative;
        }
        .home-process-timeline::before {
          content: '';
          position: absolute;
          top: 34px;
          left: 10%;
          right: 10%;
          height: 2px;
          background: rgba(188, 145, 85, 0.25);
        }
        .home-process-step {
          text-align: center;
          padding: 16px 16px 20px;
          position: relative;
          cursor: pointer;
          border-radius: 8px;
          transition: background 0.3s;
          border: 0;
          background: transparent;
          color: inherit;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          outline: none;
        }
        .home-process-step:focus,
        .home-process-step:focus-visible {
          outline: none;
          box-shadow: none;
        }
        .home-process-step.is-active {
          background: rgba(188, 145, 85, 0.14);
          z-index: 2;
          position: relative;
        }
        .home-process-step-num {
          width: 68px;
          height: 68px;
          border-radius: 9999px;
          background: rgba(188, 145, 85, 0.42);
          border: 2.5px solid #bc9155;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: -8px auto 20px;
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: #f5e0c0;
          position: relative;
          z-index: 2;
          box-shadow: 0 0 0 4px rgba(188, 145, 85, 0.12);
          flex-shrink: 0;
        }
        .home-process-step h3 {
          font-size: 18px;
          margin: 0 0 12px;
          color: #fff;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          line-height: 1.25;
          text-align: center;
        }
        .home-process-step p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.65;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          margin: 0;
          transition: max-height 0.4s ease, opacity 0.35s ease, margin-top 0.35s ease;
          text-align: center;
        }
        .home-process-step.is-active p {
          max-height: 200px;
          opacity: 1;
          margin-top: 8px;
        }
        .home-process-hint {
          text-align: center;
          margin-top: 28px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
        }
        @media (max-width: 1024px) {
          .home-process-timeline {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 24px;
            max-width: 700px;
            margin: 0 auto;
          }
          .home-process-timeline::before {
            display: none;
          }
          .home-process-step {
            padding: 16px 8px;
            gap: 0;
          }
          .home-process-step-num {
            margin: 0 0 10px;
          }
          .home-process-step h3 {
            text-align: center;
            font-size: 15px;
            margin: 0;
          }
          .home-process-step p {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .home-process-header {
            margin-bottom: 36px;
          }
          .home-process-header h2 {
            font-size: 24px;
            margin-bottom: 14px;
          }
          .home-process-header p {
            font-size: 15px;
            line-height: 1.7;
          }
          .home-process-timeline {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 20px;
            max-width: 600px;
          }
          .home-process-step {
            padding: 14px 8px;
          }
          .home-process-step-num {
            width: 48px;
            height: 48px;
            font-size: 17px;
            margin: 0 0 8px;
          }
          .home-process-step h3 {
            font-size: 14px;
            margin-bottom: 0;
          }
          .home-process-hint {
            display: none;
          }
        }
        @media (max-width: 480px) {
          .home-process-header {
            margin-bottom: 32px;
          }
          .home-process-header h2 {
            font-size: 26px;
          }
          .home-process-header p {
            font-size: 14px;
          }
          .home-process-timeline {
            gap: 16px !important;
            max-width: 360px;
          }
          .home-process-step {
            padding: 12px 6px;
          }
          .home-process-step-num {
            width: 44px;
            height: 44px;
            font-size: 16px;
            margin: 0 0 8px;
          }
          .home-process-step h3 {
            font-size: 12px;
            line-height: 1.3;
          }
        }
      `}</style>
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
  const [expandedCounties, setExpandedCounties] = useState<Record<string, boolean>>({});

  if (counties.length === 0) {
    return null;
  }

  return (
    <section id="areas" className="scroll-mt-28 bg-[#F5F1E9] px-5 pb-[52px] pt-[52px] md:px-8 md:pb-20 md:pt-[72px] lg:px-10 lg:pb-[100px]">
      <div className="mx-auto max-w-[1280px]">
        <HomeSectionHeader label={eyebrow || 'Service Areas'} title={title} description={description} />

        <div className="home-fade-up grid gap-4 md:gap-8 lg:grid-cols-2">
          {counties.map((county) => {
            const countyName = county.name || county.county_name || county.title || '';
            const featuredTowns = county.towns || county.cities || [];
            const extraTowns = county.extra_towns || county.towns_expanded || [];
            const townLinks = county.town_links || [];

            const resolveTownUrl = (town: string) => {
              if (Array.isArray(townLinks)) {
                return townLinks.find((link) => normalizeTitle(link.name) === normalizeTitle(town))?.url || '';
              }

              return townLinks[town] || '';
            };

            const visibleTowns =
              featuredTowns.length > 0
                ? featuredTowns
                : Array.isArray(townLinks)
                  ? townLinks.slice(0, 8).map((item) => item.name)
                  : [];
            const hiddenTowns =
              extraTowns.length > 0
                ? extraTowns
                : Array.isArray(townLinks) && featuredTowns.length === 0
                  ? townLinks.slice(8).map((item) => item.name)
                  : [];
            const isExpanded = expandedCounties[countyName] ?? false;

            return (
              <article
                key={countyName}
                className="group overflow-hidden rounded-lg border-b-2 border-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-300 md:hover:-translate-y-[4px] md:hover:border-[#BC9155] md:hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]"
              >
                {county.image ? (
                  <div className="relative h-[180px] overflow-hidden md:h-[200px]">
                    <img
                      src={county.image}
                      alt={county.image_alt || `${countyName}, Connecticut home remodeling service area`}
                      className={joinClasses(
                        'h-full w-full object-cover transition-transform duration-500 md:group-hover:scale-105',
                        normalizeTitle(countyName) === 'new haven county' && 'object-[center_15%]'
                      )}
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-[60px] bg-[linear-gradient(to_top,#ffffff,transparent)]" />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col px-5 pb-6 pt-5 text-center md:px-7 md:pb-8 md:pt-7">
                  <h3 className="font-serif text-[22px] font-bold text-[#1E2B43] md:text-2xl">{countyName}</h3>
                  {county.phone ? (
                    <div className="mb-3.5 mt-1.5 text-[15px] text-[#5C677D]">
                      Call: <a href={`tel:${county.phone.replace(/\D/g, '')}`} className="font-semibold text-[#BC9155] hover:underline">{county.phone}</a>
                    </div>
                  ) : null}
                  {county.description ? (
                    <p className="mb-[18px] border-b border-[#1E2B43]/6 pb-[18px] text-[14px] leading-[1.7] text-[#5C677D]">
                      {county.description}
                    </p>
                  ) : null}

                  <div className="mb-4 grid grid-cols-3 gap-2 md:grid-cols-4">
                    {visibleTowns.map((town) =>
                      resolveTownUrl(town) ? (
                        <Link
                          key={town}
                          href={resolveTownUrl(town)}
                          className="rounded-full bg-[#F5F1E9] px-2.5 py-[7px] text-center text-[11px] font-semibold tracking-[0.2px] whitespace-nowrap text-[#1E2B43] transition-colors hover:bg-[#BC9155] hover:text-white md:px-2.5"
                        >
                          {town}
                        </Link>
                      ) : (
                        <span key={town} className="rounded-full bg-[#F5F1E9] px-2.5 py-[7px] text-center text-[11px] font-semibold tracking-[0.2px] whitespace-nowrap text-[#1E2B43] transition-colors hover:bg-[#BC9155]/10 hover:text-[#9A7340]">
                          {town}
                        </span>
                      )
                    )}
                    {isExpanded ? hiddenTowns.map((town) => (
                      resolveTownUrl(town) ? (
                        <Link
                          key={town}
                          href={resolveTownUrl(town)}
                          className="rounded-full bg-[#F5F1E9] px-2.5 py-[7px] text-center text-[11px] font-semibold tracking-[0.2px] whitespace-nowrap text-[#1E2B43] transition-colors hover:text-[#9A7340]"
                        >
                          {town}
                        </Link>
                      ) : (
                        <span key={town} className="rounded-full bg-[#F5F1E9] px-2.5 py-[7px] text-center text-[11px] font-semibold tracking-[0.2px] whitespace-nowrap text-[#1E2B43] transition-colors hover:text-[#9A7340]">
                          {town}
                        </span>
                      )
                    )) : null}
                    {hiddenTowns.length > 0 ? (
                      <button
                        type="button"
                        className="col-span-full mt-1 bg-transparent px-0 py-1 text-center text-[13px] font-semibold text-[#BC9155] transition-colors hover:text-[#9A7340]"
                        onClick={() =>
                          setExpandedCounties((current) => ({
                            ...current,
                            [countyName]: !current[countyName],
                          }))
                        }
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? 'Show Less -' : 'See All Towns +'}
                      </button>
                    ) : null}
                  </div>

                  {county.url ? (
                    <Link
                      href={county.url}
                      className="mt-auto inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-[#BC9155] transition-all hover:gap-2.5"
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
    {
      label: 'Google Rating 4.9',
      icon: 'star',
      href: 'https://www.google.com/maps/search/?api=1&query=BuiltWell+CT,+206A+Boston+Post+Road,+Orange,+CT+06477',
      external: true,
    },
    { label: 'Trusted on Houzz', icon: 'check', href: '#houzz' },
    {
      label: 'CT HIC License #0668405',
      icon: 'license',
      href: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
      external: true,
    },
    { label: 'Verified on Angi', icon: 'check', href: 'https://www.angi.com', external: true },
  ];

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1E2B43_0%,#151E30_100%)] px-5 py-10 md:px-8 md:py-14 lg:px-10">
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "url('/hero/builtwell-job-site-aerial-hero-ct.jpg')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        aria-hidden="true"
      />
      <div className="home-fade-up relative z-10 mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-0">
        {trustItems.map((item, index) => (
          <div key={item.label} className="contents">
            <a
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="flex min-w-[50%] flex-1 flex-col items-center gap-2.5 px-3 py-4 text-center text-[11px] font-semibold tracking-[0.4px] whitespace-nowrap text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#BC9155] md:min-w-[180px] md:px-8 md:py-5 md:text-[13px]"
            >
              {item.icon === 'star' ? (
                <Star className="h-[18px] w-[18px] fill-[#BC9155] text-[#BC9155] [filter:drop-shadow(0_2px_4px_rgba(188,145,85,0.3))] md:h-[22px] md:w-[22px]" />
              ) : item.icon === 'license' ? (
                <CalendarDays className="h-[18px] w-[18px] text-[#BC9155] [filter:drop-shadow(0_2px_4px_rgba(188,145,85,0.3))] md:h-[22px] md:w-[22px]" />
              ) : (
                <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-current text-[#BC9155] [filter:drop-shadow(0_2px_4px_rgba(188,145,85,0.3))] md:h-[22px] md:w-[22px]">
                  <Check className="h-3 w-3 md:h-3.5 md:w-3.5" />
                </div>
              )}
              {item.label}
            </a>
            {index < trustItems.length - 1 ? (
              <div className="hidden h-10 w-px shrink-0 bg-white/10 lg:block" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}


function HomeMidCta() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#1E2B43_0%,#151E30_100%)] px-5 py-[52px] text-center md:px-10 md:py-[72px]">
      <div
        className="absolute inset-0 bg-cover bg-[center_40%] opacity-25"
        style={{ backgroundImage: "url('/hero/builtwell-team-van-consultation-hero-ct.jpg')" }}
        aria-hidden="true"
      />
      <div className="home-fade-up relative z-10">
        <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.3px] !text-white">
          Ready to <span className="text-[#BC9155]">Begin</span>?
        </h2>
        <p className="mx-auto mb-6 mt-3.5 max-w-[480px] text-[16px] text-white/65 md:mb-7 md:text-[17px]">
          Great remodeling starts with the right team.
        </p>
        <Link
          href="/free-consultation/"
          className="inline-flex min-h-[52px] w-full items-center justify-center rounded-lg bg-[#BC9155] px-6 py-4 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48] md:min-h-0 md:min-w-[min(340px,100%)] md:w-auto md:rounded-md md:px-11 md:py-[18px]"
        >
          Get Your Free Estimate
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

  const projectsDescription = (description || "").trim() || "Here's a look at three projects we've completed recently. You can read the full write-ups in our case studies.";
  const caseStudiesPhrase = "case studies";
  const phraseIndex = projectsDescription.toLowerCase().indexOf(caseStudiesPhrase);
  const getCaseStudyCtaLabel = (project: ProjectItem) => {
    const key = `${project.url || ''} ${project.title || ''}`.toLowerCase();
    if (key.includes('new-canaan')) return 'Read the New Canaan kitchen remodel case study';
    if (key.includes('darien')) return 'Read the Darien basement finishing case study';
    if (key.includes('westport')) return 'Read the Westport bathroom remodel case study';
    return 'Read case study';
  };

  return (
    <section id="projects" className="scroll-mt-28 bg-white px-5 py-[52px] md:px-8 md:py-20 lg:px-10 lg:py-[100px]">
      <div className="mx-auto max-w-[1280px]">
        <HomeSectionHeader
          label="Case Studies"
          title={title}
        />
        <div className="home-fade-up mx-auto -mt-10 mb-9 max-w-3xl text-center md:mb-12 lg:mb-16">
          <p className="mx-auto max-w-[700px] text-[15px] leading-[1.7] text-[#5C677D] md:text-[17px] md:leading-[1.75]">
            {phraseIndex >= 0 ? (
              <>
                {projectsDescription.slice(0, phraseIndex)}
                <Link href="/case-studies/" className="font-semibold text-[#BC9155] transition-colors hover:text-[#a57d48]">
                  {projectsDescription.slice(phraseIndex, phraseIndex + caseStudiesPhrase.length)}
                </Link>
                {projectsDescription.slice(phraseIndex + caseStudiesPhrase.length)}
              </>
            ) : (
              <>
                {projectsDescription}{" "}
                <Link href="/case-studies/" className="font-semibold text-[#BC9155] transition-colors hover:text-[#a57d48]">
                  case studies
                </Link>
                .
              </>
            )}
          </p>
        </div>

        <div className="home-fade-up grid gap-4 md:gap-7 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col overflow-hidden rounded-lg border-b-2 border-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-300 md:hover:-translate-y-1 md:hover:border-[#BC9155] md:hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]"
            >
              <div className="h-[200px] overflow-hidden md:h-[260px]">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title || ''}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col px-6 py-6 md:px-7 md:py-7">
                <h3 className="text-center text-[18px] font-bold text-[#1E2B43] md:text-[20px]">{project.title}</h3>
                <p className="mt-3 text-center text-[13px] leading-[1.7] text-[#5C677D] md:text-[14px]">{project.description}</p>

                {project.quote ? (
                  <div className="mb-6 mt-6 rounded-r-md border-l-[3px] border-[#BC9155] bg-[#F5F1E9] px-4 py-[14px] md:px-5 md:py-[18px]">
                    <p className="text-center text-[13px] italic leading-[1.55] text-[#1E2B43] md:text-[14px]">{project.quote}</p>
                    {project.tag ? (
                      <span className="mt-2 block text-center text-[12px] font-semibold text-[#5C677D] md:text-[13px]">
                        &mdash; {project.tag}
                      </span>
                    ) : null}
                  </div>
                ) : null}

                {project.url ? (
                  <Link
                    href={project.url}
                    className="mt-auto flex min-h-[56px] w-full items-center justify-center rounded bg-[#BC9155] px-5 py-3.5 text-center text-[14px] font-semibold leading-[1.3] text-white transition-colors hover:bg-[#a57d48]"
                  >
                    {getCaseStudyCtaLabel(project)}
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="home-fade-up mt-8 text-center md:mt-12">
          <Link
            href="/case-studies/"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded border-2 border-[#1E2B43] px-8 py-3.5 text-sm font-semibold tracking-[0.3px] text-[#1E2B43] transition-colors hover:bg-[#1E2B43] hover:text-white md:min-h-0 md:w-auto"
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
      icon: Shield,
      title: `CT License ${licenseNumber}`,
      copy: 'Issued by the Department of Consumer Protection',
    },
    {
      icon: CircleCheck,
      title: 'General Liability Insurance',
      copy: 'Full coverage on every project we take on',
    },
    {
      icon: Users,
      title: "Workers' Compensation",
      copy: 'Every crew member is covered while on your property',
    },
    {
      icon: FileText,
      title: 'Licensed Subcontractors',
      copy: 'All specialty trades are licensed and insured',
    },
  ];

  return (
    <section className="relative overflow-hidden px-5 py-[52px] text-white md:px-8 md:py-20 lg:px-10 lg:py-[100px]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.15]"
        style={{ backgroundImage: "url('/hero/builtwell-job-site-aerial-hero-ct.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#1E2B43_0%,#151E30_100%)]" />
      <div className="home-fade-up relative z-10 mx-auto grid max-w-[1280px] gap-8 md:gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          {title ? (
            <>
              <span className="mb-4 block text-center text-[11px] font-bold uppercase tracking-[1.5px] text-[#BC9155] md:text-[13px]">
                Licensed in Connecticut
              </span>
              <h2
                className="text-center text-[clamp(2rem,3.5vw,2.75rem)] font-bold tracking-[-0.5px] text-white"
                dangerouslySetInnerHTML={{
                  __html: highlightTitleHtml(title),
                }}
              />
            </>
          ) : null}
          <div className="mt-6 space-y-5 text-[15px] leading-[1.8] text-white/70 md:text-[16px] md:leading-[1.8]">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 md:gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-lg border border-white/15 border-b-2 border-b-transparent bg-white/8 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-[3px] hover:border-b-[#BC9155] hover:bg-white/12 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] md:p-7"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#BC9155]/28 text-[#BC9155]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-sans text-[15px] font-semibold text-white">{feature.title}</h3>
                <p className="mt-1.5 text-[12px] leading-[1.55] text-white/65 md:text-[13px]">{feature.copy}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HomeLeadFormSection({ data }: { data: LeadFormData }) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const fields = data.fields || [];
  const title = data.title || data.headline || 'Tell Us About Your Project';
  const subtitle =
    data.subtitle ||
    data.subheadline ||
    "Fill out the form and we'll get back to you within one business day with next steps. No obligation, no pressure.";
  const formNote = data.privacy_note || data.consent_text || 'We respond within 24 hours. No spam, no obligation.';

  const nameField = fieldByNames(fields, ['name', 'full_name'], {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    placeholder: 'Your full name',
  });
  const phoneField = fieldByNames(fields, ['phone', 'phone_number'], {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    required: true,
    placeholder: '(203) 000-0000',
  });
  const emailField = fieldByNames(fields, ['email'], {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'you@email.com',
  });
  const zipField = fieldByNames(fields, ['zip', 'zip_code', 'zipcode'], {
    name: 'zip',
    label: 'Zip Code',
    type: 'text',
    required: true,
    placeholder: '06477',
  });
  const servicesField = fieldByNames(fields, ['services', 'services_needed', 'service'], {
    name: 'services',
    label: 'Services Needed',
    type: 'select',
    required: true,
    options: [
      'Kitchen Remodeling',
      'Bathroom Remodeling',
      'Basement Finishing',
      'Flooring Installation',
      'Home Additions',
      'Interior Painting',
      'Interior Carpentry',
      'Attic Conversions',
      'Decks & Porches',
      'Design & Planning',
      'Comfort & Accessibility',
      'Other',
    ],
  });
  const bestTimeField = fieldByNames(fields, ['best_time', 'bestTime', 'time'], {
    name: 'best_time',
    label: 'Best Time to Contact',
    type: 'select',
    required: true,
    options: [
      'Morning (8am - 12pm)',
      'Afternoon (12pm - 4pm)',
      'Evening (4pm - 6pm)',
      'Anytime',
    ],
  });
  const contactMethodField = fieldByNames(fields, ['contact_method', 'preferred_contact_method'], {
    name: 'contact_method',
    label: 'Preferred Contact Method',
    type: 'radio',
    required: true,
    options: ['Call', 'Text', 'Email'],
  });
  const messageField = fieldByNames(fields, ['message', 'project_details', 'details'], {
    name: 'message',
    label: 'Tell Us About Your Project',
    type: 'textarea',
    placeholder: 'Describe your project, any specific needs, or questions you have...',
  });
  const fileField = fieldByNames(fields, ['files', 'photos', 'attachments'], {
    name: 'files',
    label: 'Upload Photos',
    type: 'file',
  });

  const servicesOptions = normalizeFieldOptions(servicesField.options);
  const contactOptions = normalizeFieldOptions(contactMethodField.options).length > 0
    ? normalizeFieldOptions(contactMethodField.options)
    : normalizeFieldOptions(['Call', 'Text', 'Email']);
  const bestTimeOptions = normalizeFieldOptions(bestTimeField.options);

  const handleChange = (name: string, value: string) => {
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const toggleService = (value: string) => {
    setSelectedServices((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const servicesLabel = selectedServices.length === 0
    ? 'Select services'
    : selectedServices.length <= 2
      ? selectedServices.join(', ')
      : `${selectedServices.length} services selected`;

  if (submitted) {
    return (
      <section id="contact" className="scroll-mt-28 bg-[#F5F1E9] px-5 py-[52px] md:px-8 md:py-16 lg:px-10 lg:py-[72px]">
        <div className="mx-auto max-w-[1200px] rounded-[10px] border border-[#1E2B43]/8 bg-white px-6 py-16 text-center shadow-[0_16px_48px_rgba(30,43,67,0.1),0_4px_12px_rgba(30,43,67,0.04)]">
          <h2 className="font-serif text-[clamp(1.875rem,4vw,2.625rem)] font-bold text-[#1E2B43]">Thank You</h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-[1.7] text-[#5C677D]">
            {data.success_message || "We received your request and we'll get back to you within one business day."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="scroll-mt-28 bg-[#F5F1E9] px-5 py-[48px] md:px-8 md:py-[64px] lg:px-10 lg:pb-[72px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="home-fade-up mb-8 text-center">
          <span className="relative mb-4 inline-block pl-5 text-[11px] font-bold uppercase tracking-[1px] text-[#9A7340] before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-2.5 before:-translate-y-1/2 before:bg-[#BC9155] md:text-[13px] md:tracking-[1.5px]">
            GET IN TOUCH
          </span>
          <h2
            className="text-[clamp(1.875rem,5vw,2.625rem)] font-bold tracking-[-0.5px] text-[#1E2B43]"
            dangerouslySetInnerHTML={{ __html: highlightTitleHtml(title) }}
          />
          <p className="mx-auto mt-2 max-w-[600px] text-[15px] leading-[1.7] text-[#5C677D] md:text-[16px]">
            {subtitle}
          </p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
          <div className="home-fade-up flex h-full flex-col">
            <div className="flex h-full flex-1 flex-col gap-3">
              <div className="relative min-h-[220px] overflow-hidden rounded-[8px] shadow-[0_12px_24px_-18px_rgba(30,43,67,0.6)] md:min-h-[250px] lg:min-h-0 lg:flex-1">
                <img
                  src={data.background_image || '/team/builtwell-owner-handshake-client-ct-02.jpg'}
                  alt="BuiltWell consultation arrival"
                  className="h-full w-full object-cover [object-position:center_30%]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60px] bg-[linear-gradient(to_top,rgba(245,241,233,1)_0%,rgba(245,241,233,0.6)_40%,transparent_100%)]" />
              </div>
              <div className="relative min-h-[220px] overflow-hidden rounded-[8px] shadow-[0_12px_24px_-18px_rgba(30,43,67,0.6)] md:min-h-[250px] lg:min-h-0 lg:flex-1">
                <img
                  src="/portfolio/builtwell-job-site-aerial-ct.jpg"
                  alt="BuiltWell CT job site with two vans at a Connecticut home renovation"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60px] bg-[linear-gradient(to_top,rgba(245,241,233,1)_0%,rgba(245,241,233,0.6)_40%,transparent_100%)]" />
              </div>
            </div>
          </div>

          <div className="home-fade-up flex h-full flex-col rounded-[10px] border border-[#1E2B43]/8 bg-white px-4 py-6 shadow-[0_16px_48px_rgba(30,43,67,0.1),0_4px_12px_rgba(30,43,67,0.04)] md:px-[36px] md:py-8">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-1 flex-col"
              aria-label="Request a free consultation"
            >
              <div className="grid gap-4 md:grid-cols-2">
                {[nameField, phoneField, emailField, zipField].map((field) => (
                  <div key={field.name} className="mb-0">
                    <label htmlFor={field.name} className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.5px] text-[#1E2B43] md:text-[13px]">
                      {field.label}
                      {field.required ? ' *' : ''}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      value={formData[field.name] || ''}
                      onChange={(event) => handleChange(field.name, event.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-[6px] border border-[#1E2B43]/15 bg-white px-[14px] py-3 text-[15px] text-[#1E2B43] outline-none transition-colors focus:border-[#BC9155]"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.5px] text-[#1E2B43] md:text-[13px]">
                    {servicesField.label}
                    {servicesField.required ? ' *' : ''}
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-[4px] border border-[#1E2B43]/15 bg-white px-[14px] py-[13px] text-left text-[15px] text-[#1E2B43]"
                      aria-expanded={isServicesOpen}
                      onClick={() => setIsServicesOpen((current) => !current)}
                    >
                      <span className={joinClasses('truncate', selectedServices.length === 0 ? 'text-[#5C677D]' : 'font-medium text-[#1E2B43]')}>
                        {servicesLabel}
                      </span>
                      <ChevronDown className={joinClasses('h-4 w-4 text-[#5C677D] transition-transform', isServicesOpen && 'rotate-180')} />
                    </button>
                    {isServicesOpen ? (
                      <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 max-h-60 overflow-y-auto rounded-md border border-[#1E2B43]/15 bg-white py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                        {servicesOptions.map((option) => (
                          <label
                            key={option.value}
                            className="flex cursor-pointer items-center gap-2.5 px-[14px] py-2 text-sm text-[#1E2B43] transition-colors hover:bg-[#BC9155]/6"
                          >
                            <input
                              type="checkbox"
                              checked={selectedServices.includes(option.value)}
                              onChange={() => toggleService(option.value)}
                              className="home-multi-checkbox h-[18px] w-[18px] cursor-pointer rounded-[3px] border-2 border-[#1E2B43]/25 bg-white"
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label htmlFor={bestTimeField.name} className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.5px] text-[#1E2B43] md:text-[13px]">
                    {bestTimeField.label}
                    {bestTimeField.required ? ' *' : ''}
                  </label>
                  <select
                    id={bestTimeField.name}
                    name={bestTimeField.name}
                    required={bestTimeField.required}
                    value={formData[bestTimeField.name] || ''}
                    onChange={(event) => handleChange(bestTimeField.name, event.target.value)}
                    className="w-full appearance-none rounded-[6px] border border-[#1E2B43]/15 bg-white bg-[right_16px_center] bg-no-repeat px-[14px] py-3 pr-10 text-[15px] text-[#1E2B43] outline-none transition-colors focus:border-[#BC9155]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235C677D' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")` }}
                  >
                    <option value="">Select a time</option>
                    {bestTimeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              <fieldset className="mt-4 m-0 border-0 p-0">
                <legend className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.5px] text-[#1E2B43] md:text-[13px]">
                  {contactMethodField.label}
                  {contactMethodField.required ? ' *' : ''}
                </legend>
                <div className="flex flex-wrap gap-2.5">
                  {contactOptions.map((option) => {
                    const checked = (formData[contactMethodField.name] || contactOptions[0]?.value || 'Call') === option.value;

                    return (
                      <label
                        key={option.value}
                        className={joinClasses(
                          'inline-flex min-w-[84px] cursor-pointer items-center justify-center rounded-md border px-5 py-3 text-[13px] font-medium transition-colors',
                          checked ? 'border-[#BC9155] bg-[#BC9155]/[0.06] text-[#BC9155]' : 'border-[#1E2B43]/18 bg-white text-[#1E2B43] hover:border-[#BC9155]'
                        )}
                      >
                        <input
                          type="radio"
                          name={contactMethodField.name}
                          value={option.value}
                          checked={checked}
                          onChange={(event) => handleChange(contactMethodField.name, event.target.value)}
                          className="sr-only"
                        />
                        <span>{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-4">
                <label htmlFor={messageField.name} className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.5px] text-[#1E2B43] md:text-[13px]">
                  {messageField.label}
                </label>
                <textarea
                  id={messageField.name}
                  name={messageField.name}
                  rows={4}
                  value={formData[messageField.name] || ''}
                  onChange={(event) => handleChange(messageField.name, event.target.value)}
                  placeholder={messageField.placeholder}
                  className="min-h-[240px] w-full resize-y rounded-[6px] border border-[#1E2B43]/15 bg-white px-[14px] py-3 text-[15px] leading-[1.6] text-[#1E2B43] outline-none transition-colors focus:border-[#BC9155] md:min-h-[290px]"
                />
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <input
                    id={fileField.name}
                    name={fileField.name}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/heic,.heic"
                    className="hidden"
                    onChange={(event) => {
                      const files = Array.from(event.target.files || []).map((file) => file.name);
                      setSelectedFiles(files);
                    }}
                  />
                  <label
                    htmlFor={fileField.name}
                    className="flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#1E2B43]/15 bg-white px-5 py-3.5 text-[15px] font-semibold tracking-[0.3px] text-[#1E2B43] transition-colors hover:border-[#BC9155]"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Photos
                  </label>
                  {selectedFiles.length > 0 ? (
                    <p className="mt-1.5 text-xs text-[#5C677D]">{selectedFiles.join(', ')}</p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="min-h-[52px] rounded-lg bg-[#BC9155] px-5 py-3.5 text-[15px] font-semibold tracking-[0.3px] text-white transition-all hover:-translate-y-px hover:bg-[#a57d48] hover:shadow-[0_4px_12px_rgba(188,145,85,0.3)]"
                >
                  {data.submit_label || 'Get Your Free Estimate'}
                </button>
              </div>

              <p className="mt-4 text-center text-[13px] italic text-[#5C677D]">{formNote}</p>
            </form>
          </div>
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
    <section id="contact" className="scroll-mt-28 bg-[#F5F1E9] px-5 pb-[52px] pt-12 text-center md:px-8 md:pb-[72px] md:pt-16">
      <div className="mx-auto max-w-5xl">
        <span className="relative mb-4 inline-block pl-5 text-[11px] font-bold uppercase tracking-[1px] text-[#9A7340] before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-2.5 before:-translate-y-1/2 before:bg-[#BC9155] md:text-[13px] md:tracking-[1.5px]">
          GET IN TOUCH
        </span>
        {data?.title ? (
          <h2
            className="text-[clamp(1.875rem,5vw,3rem)] font-bold tracking-[-0.03em] text-[#1E2B43]"
            dangerouslySetInnerHTML={{ __html: highlightTitleHtml(data.title) }}
          />
        ) : null}
        {data?.subtext || data?.subtitle ? (
          <p className="mx-auto mt-4 max-w-[600px] text-[15px] leading-[1.7] text-[#5C677D] md:mt-5 md:text-[16px]">
            {data.subtext || data.subtitle}
          </p>
        ) : null}
        {button ? (
          <div className="mt-8 md:mt-9">
            <Link
              href={button.url}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#BC9155] px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#a57d48] md:min-h-0 md:w-auto md:rounded-sm"
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
  const hero = asData<HeroSliderData>(firstSection(page, 'hero') ?? firstSection(page, 'hero_slider'));
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

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.home-fade-up'));
    if (!nodes.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page-template bg-white text-[#1E2B43]">
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
      <SharedAreasSection data={areas} />

      {/* 7. Mid CTA */}
      <HomeMidCta />

      {/* 8. Projects */}
      <HomeProjectsSection
        title={projects?.title}
        description={projects?.subtitle}
        projects={projectItems}
      />

      {/* 9. Licensed */}
      <HomeLicensedSection
        title={licensedCopy?.title}
        paragraphs={licensedParagraphs}
      />

      {/* 10. Lead Form (if available) or CTA fallback */}
      {leadForm ? (
        <SharedLeadFormSection page={page} data={leadForm} accent={leadForm?.title_highlight || "Consultation"} />
      ) : (
        <HomeCtaSection data={cta} phones={phones} />
      )}

      {/* 11. Trust + Financing strip */}
      <HomeTrustStrip />
      <SharedFinancingStrip data={{ title: "Flexible Financing Available", content: "Get approved in about 60 seconds and start your project today.", cta: { url: "https://www.greensky.com", label: "Check Financing Options" } }} />
      <style jsx global>{`
        .home-fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .home-fade-up.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .home-multi-checkbox {
          -webkit-appearance: none;
          appearance: none;
          margin: 0;
          min-width: 18px;
          min-height: 18px;
          padding: 0;
          position: relative;
          flex-shrink: 0;
        }
        .home-multi-checkbox:checked {
          background: #bc9155;
          border-color: #bc9155;
        }
        .home-multi-checkbox:checked::after {
          content: '';
          position: absolute;
          left: 5px;
          top: 2px;
          width: 5px;
          height: 9px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        .home-page-template .bw-area-card {
          border-radius: 12px;
          border-bottom-width: 3px;
        }
        .home-page-template .bw-area-card-img {
          box-shadow: inset 0 -18px 28px -16px rgba(255, 255, 255, 0.75);
        }
        .home-page-template .bw-area-card-img::after {
          height: 96px;
          background: linear-gradient(
            to top,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.9) 26%,
            rgba(255, 255, 255, 0.58) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          filter: blur(2.8px);
          transform: translateY(10px);
        }
        .home-page-template .bw-area-card-img::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          height: 44px;
          background: radial-gradient(120% 100% at 50% 100%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.38) 55%, transparent 100%);
          pointer-events: none;
          z-index: 2;
        }
        .home-page-template .bw-cta-img-wrap::after {
          content: '';
          position: absolute;
          width: 100%;
          left: 0;
          right: auto;
          bottom: 0;
          height: 60px;
          background: linear-gradient(
            to top,
            rgba(245, 241, 233, 1) 0%,
            rgba(245, 241, 233, 0.6) 40%,
            rgba(245, 241, 233, 0) 100%
          );
          pointer-events: none;
          z-index: 2;
        }
        @media (prefers-reduced-motion: reduce) {
          .home-fade-up {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
