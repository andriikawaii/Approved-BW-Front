'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { CMSBreadcrumb, CMSPage } from '@/types/cms';
import {
  FinancingStrip,
  LeadFormSection,
  parts,
  section,
  sections,
} from './template-utils';

type HeroData = {
  headline?: string;
  subheadline?: string;
  background_image?: string | null;
  background_image_alt?: string | null;
  cta_primary?: { label?: string; url?: string };
  cta_secondary?: { label?: string; url?: string };
};

type TrustBarData = {
  variant?: string;
  items?: TrustBarItem[];
};

type TrustBarItem = {
  icon?: string | null;
  label?: string | null;
  value?: string | null;
  url?: string | null;
};

type RichTextData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight_text?: string | null;
  content?: string | null;
  image?: string | null;
  image_alt?: string | null;
  cta?: { label?: string; url?: string };
  anchor_id?: string | null;
  style_variant?: string | null;
};

type FullWidthTextDarkData = {
  title?: string | null;
  subtitle?: string | null;
};

type RichTextImageData = {
  title?: string | null;
  content?: string | null;
  image?: string | null;
  image_alt?: string | null;
  image_position?: 'left' | 'right';
};

type AccordionListData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight_text?: string | null;
  subtitle?: string | null;
  items?: Array<{ title?: string | null; content?: string | null }>;
};

type PricingTableData = {
  title?: string | null;
  subtitle?: string | null;
  columns?: string[] | null;
  rows?: Array<{ label?: string | null; notes?: string | null; price?: string | null }>;
};

type ServicesGridData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight_text?: string | null;
  subtitle?: string | null;
  initial_visible_count?: number | null;
  toggle_label?: string | null;
  toggle_less_label?: string | null;
  items?: Array<{
    title?: string | null;
    summary?: string | null;
    image?: string | null;
    image_alt?: string | null;
    url?: string | null;
    cta_label?: string | null;
    price?: string | null;
    timeline?: string | null;
  }>;
};

type FaqData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight_text?: string | null;
  subtitle?: string | null;
  items?: Array<{ question?: string | null; answer?: string | null }>;
};

type AreaCountyData = {
  name?: string | null;
  image?: string | null;
  image_alt?: string | null;
  url?: string | null;
  phone?: string | null;
  description?: string | null;
  towns?: string[] | null;
  extra_towns?: string[] | null;
  town_links?: Record<string, string> | Array<{ name?: string | null; url?: string | null }> | null;
  cta_label?: string | null;
};

type AreasData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight_text?: string | null;
  subtitle?: string | null;
  counties?: AreaCountyData[];
};
type LeadFormData = Record<string, unknown>;
type CtaBlockData = {
  title?: string | null;
  subtitle?: string | null;
  subtext?: string | null;
  button?: { label?: string | null; url?: string | null };
};

const GREENWICH_HOUSING_BG = '/images/areas/greenwich-ct-skyline.jpg';
const GREENWICH_SERVICES_SUBTITLE =
  'BuiltWell CT provides a full range of remodeling services in Greenwich including kitchen renovation, bathroom remodeling, basement finishing, flooring, home additions, interior painting, carpentry, attic conversions, decks, design, and accessibility modifications, all permitted and backed by CT HIC License #0668405.';
const GREENWICH_COST_INTRO_EXTRA =
  'Several factors push Greenwich costs above statewide averages. Material expectations here start at a level that would represent an upgrade in most other markets. The reference points are Sub-Zero, Wolf, and Waterworks, not builder-grade appliances and stock cabinetry. Permit complexity and multi-department fees add a meaningful amount to every project budget. Custom millwork to match original profiles in pre-war homes adds both material cost and lead time. And any project involving excavation must carry a ledge contingency that can run $20,000 to $80,000 depending on what the rock conditions turn out to be.';
const GREENWICH_KITCHEN_COST_NOTE =
  'Greenwich material expectations start at a level that would represent an upgrade in most other markets. Custom cabinetry commonly runs $50,000 to $70,000 in this market, and the subcontractor network that works at the finish level Greenwich homeowners expect charges accordingly.';
const GREENWICH_COST_DRIVERS_TEXT =
  'Greenwich permit fees run $13.26 per $1,000 of renovation budget with separate electrical and plumbing fees of $12 per $1,000 each, plus a 5% surcharge on pre-1940 homes. Multi-department sign-offs from Zoning, Health, the Fire Marshal, and DPW add review time. FAR limits constrain buildable square footage. Ledge rock in Back Country and Mid-Country creates excavation contingencies of $20,000 to $80,000 that less experienced contractors either miss or do not disclose. And the subcontractor network that works at the finish level Greenwich homeowners expect charges accordingly.';

let sharedObserver: IntersectionObserver | null = null;
const fadeUpCallbacks = new WeakMap<Element, () => void>();

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = fadeUpCallbacks.get(entry.target);
            if (cb) {
              cb();
              sharedObserver?.unobserve(entry.target);
              fadeUpCallbacks.delete(entry.target);
            }
          }
        }
      },
      { threshold: 0.14 }
    );
  }
  return sharedObserver;
}

function FadeUp({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    fadeUpCallbacks.set(node, () => setVisible(true));
    const observer = getSharedObserver();
    observer.observe(node);

    return () => {
      observer.unobserve(node);
      fadeUpCallbacks.delete(node);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(26px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ text, dark = false }: { text?: string | null; dark?: boolean }) {
  if (!text) return null;
  return (
    <span className={`gwc-label${dark ? ' gwc-label-dark' : ''}`}>
      <span className="gwc-label-line" />
      {text}
    </span>
  );
}

function ActionLink({
  href,
  className,
  children,
}: {
  href?: string | null;
  className?: string;
  children: ReactNode;
}) {
  const url = (href || '').trim();
  if (!url) return <span className={className}>{children}</span>;
  if (url.startsWith('http') || url.startsWith('tel:')) {
    return (
      <a
        href={url}
        className={className}
        target={url.startsWith('http') ? '_blank' : undefined}
        rel={url.startsWith('http') ? 'noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={url} className={className}>
      {children}
    </Link>
  );
}

function renderInlineLinks(text?: string | null): ReactNode[] {
  const source = (text || '').trim();
  if (!source) return [];

  const output: ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(source)) !== null) {
    const [full, labelText, href] = match;
    if (match.index > lastIndex) {
      output.push(source.slice(lastIndex, match.index));
    }
    output.push(
      <ActionLink key={`link-${key += 1}`} href={href} className="gwc-inline-link">
        {labelText}
      </ActionLink>
    );
    lastIndex = match.index + full.length;
  }

  if (lastIndex < source.length) {
    output.push(source.slice(lastIndex));
  }

  return output.length > 0 ? output : [source];
}

function splitParagraphs(text?: string | null) {
  return (text || '')
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function parseH3Content(text?: string | null) {
  const source = (text || '').trim();
  if (!source) return { intro: [], blocks: [] as Array<{ title: string; paragraphs: string[] }> };

  const items = source.split(/\n\s*\n(?=H3:\s*)/);
  const intro = splitParagraphs(items.shift() || '');
  const blocks = items
    .map((chunk) => chunk.replace(/^H3:\s*/i, ''))
    .map((chunk) => {
      const paragraphs = splitParagraphs(chunk);
      const [title, ...rest] = paragraphs;
      return title ? { title, paragraphs: rest } : null;
    })
    .filter(Boolean) as Array<{ title: string; paragraphs: string[] }>;

  return { intro, blocks };
}

function TitleWithAccent({ title, accent }: { title?: string | null; accent?: string | null }) {
  const titleParts = parts(title, accent);
  return (
    <>
      {titleParts.before}
      {titleParts.accent ? <span className="gwc-gold">{titleParts.accent}</span> : null}
      {titleParts.after}
    </>
  );
}

function ShieldMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function TrustStripIcon({ icon }: { icon?: string | null }) {
  const kind = (icon || '').toLowerCase();

  if (kind === 'star') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" stroke="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }

  if (kind === 'license' || kind === 'card' || kind === 'credit-card') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M8 2v4M16 2v4M3 10h18" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function MetaIcon({ type }: { type: 'price' | 'time' }) {
  if (type === 'price') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function resolveTownUrl(county: AreaCountyData | undefined, town: string) {
  const links = county?.town_links;
  if (!links) return '';
  if (Array.isArray(links)) {
    return links.find((entry) => entry?.name?.toLowerCase() === town.toLowerCase())?.url || '';
  }
  return links[town] || '';
}

export function GreenwichCTPageTemplate({ page }: { page: CMSPage }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [nearbyOpen, setNearbyOpen] = useState(true);

  const hero = section<HeroData>(page, 'hero');
  const trustBars = sections<TrustBarData>(page, 'trust_bar');
  const richTexts = sections<RichTextData>(page, 'rich_text');
  const housing = section<FullWidthTextDarkData>(page, 'full_width_text_dark');
  const imageTextBlocks = sections<RichTextImageData>(page, 'rich_text_image');
  const neighborhoods = section<AccordionListData>(page, 'accordion_list');
  const pricingTables = sections<PricingTableData>(page, 'pricing_table');
  const servicesGrid = section<ServicesGridData>(page, 'services_grid');
  const faq = section<FaqData>(page, 'faq_list');
  const areas = section<AreasData>(page, 'areas_served');
  const leadForm = section<LeadFormData>(page, 'lead_form');
  const midCta = section<CtaBlockData>(page, 'cta_block');

  const intro = richTexts.find((item) => item.anchor_id === 'greenwich-intro');
  const permits = richTexts.find((item) => item.anchor_id === 'greenwich-permits');
  const costsIntro = richTexts.find((item) => item.anchor_id === 'greenwich-costs-intro');
  const costDrivers = richTexts.find((item) => item.anchor_id === 'greenwich-cost-drivers');
  const expect = richTexts.find((item) => item.anchor_id === 'greenwich-expect');
  const financing = richTexts.find((item) => item.style_variant === 'financing_strip');

  const phone = page.phones?.items?.find((item) => /fairfield/i.test(item.label || ''))?.number || '(203) 919-9616';
  const breadcrumbs: CMSBreadcrumb[] = [
    { label: 'Home', url: '/' },
    { label: 'Areas We Serve', url: '/areas-we-serve/' },
    { label: 'Fairfield County', url: '/fairfield-county/' },
    { label: 'Greenwich, CT', url: '/fairfield-county/greenwich-ct/' },
  ];
  const heroBg = hero?.background_image || '/images/areas/greenwich-ct-avenue.jpg';
  const visibleCount = Math.max(1, servicesGrid?.initial_visible_count || 6);
  const serviceItems = servicesGrid?.items || [];
  const visibleServices = servicesOpen ? serviceItems : serviceItems.slice(0, visibleCount);
  const hasMoreServices = serviceItems.length > visibleCount;
  const permitContent = parseH3Content(permits?.content);
  const topTrust = trustBars[0];
  const bottomTrust = trustBars[1];
  const topTrustItems = (topTrust?.items || []).slice(0, 4).map((item) =>
    (item?.icon || '').toLowerCase() === 'shield'
      ? { ...item, value: '' }
      : item
  );
  const bottomTrustItems = (bottomTrust?.items || [])
    .filter((item) => !/bbb/i.test(`${item?.label || ''} ${item?.value || ''}`))
    .filter((item) => !/angi/i.test(`${item?.label || ''} ${item?.value || ''}`))
    .slice(0, 4);
  const county = areas?.counties?.[0];
  const areaTitle = parts(areas?.title, areas?.highlight_text);
  const featuredTowns = (county?.towns || []).filter(Boolean) as string[];
  const extraTowns = (county?.extra_towns || []).filter(Boolean) as string[];
  const costsIntroParagraphs = [
    ...splitParagraphs(costsIntro?.content),
    GREENWICH_COST_INTRO_EXTRA,
  ];
  const normalizedPricingTables = pricingTables.map((table) => {
    if (table.title === 'Additional Service Costs in Greenwich, CT') {
      const rows = [...(table.rows || [])];
      const hasInsurance = rows.some((row) => (row.label || '').toLowerCase().includes('insurance'));
      if (!hasInsurance) {
        rows.push({
          label: 'Insurance Reconstruction',
          notes: 'Fire, water, storm damage rebuilds with carrier coordination',
          price: '$25,000 - $250,000+',
        });
      }
      return { ...table, rows };
    }
    return table;
  });
  const servicesSubtitle = GREENWICH_SERVICES_SUBTITLE;

  return (
    <div data-gwc-page>
      <main id="main">
        <section className="gwc-hero">
          <Image src={heroBg} alt="" fill priority fetchPriority="high" sizes="100vw" className="object-cover object-[center_28%] opacity-[0.72]" style={{ zIndex: 0 }} />
          <div className="gwc-hero-overlay" />
          <div className="gwc-container gwc-hero-inner">
            {breadcrumbs.length > 0 ? (
              <ol className="gwc-breadcrumbs" aria-label="Breadcrumb">
                {breadcrumbs.map((crumb, index) => (
                  <li key={`${crumb.label}-${index}`}>
                    {crumb.url && index < breadcrumbs.length - 1 ? (
                      <Link href={crumb.url}>{crumb.label}</Link>
                    ) : (
                      <span className="gwc-breadcrumb-current">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            ) : null}

            <FadeUp>
              <h1 className="gwc-hero-title">
                <TitleWithAccent title={hero?.headline} accent="Greenwich, CT" />
              </h1>
              {hero?.subheadline ? <p className="gwc-hero-subtitle">{hero.subheadline}</p> : null}
              <div className="mt-8 flex flex-col items-center gap-[14px] sm:flex-row sm:justify-center">
                <a href="#contact" className="w-[280px] rounded-[8px] border border-[#BC9155] bg-[#BC9155] px-8 py-[14px] text-center text-[15px] font-semibold text-white transition-[background,border-color,transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:border-[#D4A95A] hover:bg-[#D4A95A] hover:shadow-[0_8px_24px_rgba(188,145,85,0.4)]">
                  Get Your Free Estimate
                </a>
                <a href="tel:2039199616" className="w-[280px] rounded-[8px] border border-white/[0.22] bg-[rgba(10,18,35,0.42)] px-8 py-[14px] text-center backdrop-blur-[12px] transition-[background,border-color,transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:border-white/[0.35] hover:bg-[rgba(10,18,35,0.62)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
                  <span className="text-[15px] font-semibold tracking-[0.1px] text-white">Fairfield: (203) 919-9616</span>
                </a>
              </div>
            </FadeUp>
          </div>
        </section>

        {topTrustItems.length ? (
          <section className="gwc-top-trust">
            <div className="gwc-container">
              <div className="gwc-top-trust-grid">
                {topTrustItems.map((item, index) => {
                  const content = (
                    <>
                      <div className="gwc-top-trust-value">
                        {item.value ? item.value : <ShieldMark />}
                      </div>
                      <div className="gwc-top-trust-label">{String(item.label || '').replace('&', 'and')}</div>
                    </>
                  );

                  return item.url ? (
                    <a
                      key={`${item.label || 'trust'}-${index}`}
                      href={item.url}
                      className="gwc-top-trust-item"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={`${item.label || 'trust'}-${index}`} className="gwc-top-trust-item">
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        {intro ? (
          <section className="gwc-intro">
            <div className="gwc-container gwc-narrow">
              <FadeUp>
                <div className="gwc-section-header gwc-center">
                  <SectionLabel text={intro.eyebrow} />
                  <h2 className="gwc-h2">
                    <TitleWithAccent title={intro.title} accent={intro.highlight_text} />
                  </h2>
                </div>
                {splitParagraphs(intro.content).map((paragraph, index) => (
                  <p key={`intro-${index}`} className="gwc-body gwc-center-body">
                    {renderInlineLinks(paragraph)}
                  </p>
                ))}
              </FadeUp>

              <FadeUp delay={80}>
                <div className="gwc-inline-cta">
                  <p className="gwc-inline-title">Ready to discuss your Greenwich renovation?</p>
                  <p className="gwc-inline-sub">In-home visit or remote via Google Meet or Zoom. No obligation.</p>
                  <ActionLink href={intro.cta?.url || '#contact'} className="gwc-btn gwc-btn-primary gwc-inline-btn">
                    {intro.cta?.label || 'Get Your Free Estimate'}
                  </ActionLink>
                  <p className="gwc-inline-note">
                    Or call Fairfield County:{' '}
                    <a href={`tel:${phone.replace(/\D/g, '')}`} className="gwc-inline-link">
                      {phone}
                    </a>
                  </p>
                </div>
              </FadeUp>
            </div>
          </section>
        ) : null}

        {housing ? (
          <section className="gwc-dark-band">
            <Image src={GREENWICH_HOUSING_BG} alt="" fill sizes="100vw" className="object-cover object-[center_40%] opacity-30" style={{ zIndex: 0 }} />
            <div className="gwc-dark-band-pattern" />
            <div className="gwc-container gwc-narrow gwc-dark-band-inner">
              <FadeUp>
                <SectionLabel text="Housing Stock" dark />
                <h2 className="gwc-h2 gwc-h2-light">
                  <TitleWithAccent title={housing.title} accent="They Require" />
                </h2>
                {housing.subtitle ? <p className="gwc-body gwc-body-light gwc-center-body">{housing.subtitle}</p> : null}
              </FadeUp>
            </div>
          </section>
        ) : null}

        {imageTextBlocks.length > 0 ? (
          <section className="gwc-alt-section">
            <div className="gwc-container">
              {imageTextBlocks.map((block, index) => (
                <FadeUp key={`${block.title}-${index}`} delay={index * 50}>
                  <div className={`gwc-alt-block${block.image_position === 'right' ? ' gwc-alt-reverse' : ''}`}>
                    <div className="gwc-alt-image">
                      {block.image ? <img src={block.image} alt={block.image_alt || block.title || 'Greenwich remodeling'} /> : null}
                    </div>
                    <div className="gwc-alt-copy">
                      <h3>{block.title}</h3>
                      {splitParagraphs(block.content).map((paragraph, paragraphIndex) => (
                        <p key={`${block.title}-${paragraphIndex}`}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </section>
        ) : null}

        {neighborhoods?.items?.length ? (
          <section className="gwc-neighborhoods">
            <div className="gwc-container">
              <FadeUp>
                <div className="gwc-section-header">
                  <SectionLabel text={neighborhoods.eyebrow} />
                  <h2 className="gwc-h2">
                    <TitleWithAccent title={neighborhoods.title} accent={neighborhoods.highlight_text} />
                  </h2>
                  {neighborhoods.subtitle ? <p className="gwc-section-subtitle">{neighborhoods.subtitle}</p> : null}
                </div>
              </FadeUp>
              <div className="gwc-neighborhood-grid">
                {neighborhoods.items.map((item, index) => (
                  <FadeUp key={`${item.title}-${index}`} delay={index * 35}>
                    <details className="gwc-accordion-card">
                      <summary>
                        <h3>{item.title}</h3>
                        <span className="gwc-accordion-icon" aria-hidden="true" />
                      </summary>
                      <div className="gwc-accordion-body">
                        {splitParagraphs(item.content).map((paragraph, paragraphIndex) => (
                          <p key={`${item.title}-${paragraphIndex}`}>{paragraph}</p>
                        ))}
                      </div>
                    </details>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {permits ? (
          <section className="gwc-prose-section gwc-prose-cream">
            <div className="gwc-container gwc-narrow">
              <FadeUp>
                <div className="gwc-section-header">
                  <SectionLabel text={permits.eyebrow} />
                  <h2 className="gwc-h2">
                    <TitleWithAccent title={permits.title} accent={permits.highlight_text} />
                  </h2>
                </div>
                {permitContent.intro.map((paragraph, index) => (
                  <p key={`permit-intro-${index}`} className="gwc-body">
                    {renderInlineLinks(paragraph)}
                  </p>
                ))}
                <div className="gwc-prose-flow">
                  {permitContent.blocks.map((block, index) => (
                    <div key={`${block.title}-${index}`} className="gwc-prose-block">
                      <h3>{block.title}</h3>
                      {block.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={`${block.title}-${paragraphIndex}`}>{renderInlineLinks(paragraph)}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </section>
        ) : null}

        {(costsIntro || pricingTables.length > 0) ? (
          <section className="gwc-costs">
            <div className="gwc-container">
              {costsIntro ? (
                <FadeUp>
                  <div className="gwc-section-header">
                    <SectionLabel text={costsIntro.eyebrow} />
                    <h2 className="gwc-h2">
                      <TitleWithAccent title={costsIntro.title} accent={costsIntro.highlight_text} />
                    </h2>
                  </div>
                  {costsIntroParagraphs.map((paragraph, index) => (
                    <p key={`cost-intro-${index}`} className="gwc-body">
                      {paragraph}
                    </p>
                  ))}
                </FadeUp>
              ) : null}

              {normalizedPricingTables.map((table, index) => (
                <FadeUp key={`${table.title}-${index}`} delay={index * 35}>
                  <div className="gwc-cost-block">
                    <h3 className="gwc-cost-title">{table.title}</h3>
                    {table.title === 'Basement Finishing Costs in Greenwich, CT' ||
                    table.title === 'Flooring Costs in Greenwich, CT' ||
                    table.title === 'Home Additions Costs in Greenwich, CT' ||
                    table.title === 'Interior Carpentry Costs in Greenwich, CT' ? (
                      <p className="gwc-cost-note gwc-cost-note-before">{table.subtitle}</p>
                    ) : null}
                    <div className="gwc-table-wrap">
                      <table className="gwc-table">
                        <thead>
                          <tr>
                            {(table.columns || []).map((column, columnIndex) => (
                              <th key={`${column}-${columnIndex}`}>{column}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(table.rows || []).map((row, rowIndex) => (
                            <tr key={`${row.label}-${rowIndex}`}>
                              <td>{row.label}</td>
                              <td>{row.notes}</td>
                              <td className="gwc-price">{row.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {table.title === 'Kitchen Remodeling Costs in Greenwich, CT' ? (
                      <p className="gwc-cost-note">{GREENWICH_KITCHEN_COST_NOTE}</p>
                    ) : null}
                    {table.subtitle &&
                    table.title !== 'Basement Finishing Costs in Greenwich, CT' &&
                    table.title !== 'Flooring Costs in Greenwich, CT' &&
                    table.title !== 'Home Additions Costs in Greenwich, CT' &&
                    table.title !== 'Interior Carpentry Costs in Greenwich, CT' ? (
                      <p className="gwc-cost-note">{table.subtitle}</p>
                    ) : null}
                  </div>
                </FadeUp>
              ))}

              {costDrivers ? (
                <FadeUp delay={80}>
                  <div className="gwc-driver-copy">
                    <h3>{costDrivers.title}</h3>
                    <p>{GREENWICH_COST_DRIVERS_TEXT}</p>
                  </div>
                </FadeUp>
              ) : null}
            </div>
          </section>
        ) : null}

        {servicesGrid ? (
          <section className="gwc-services">
            <div className="gwc-container">
              <FadeUp>
                <div className="gwc-section-header">
                  <SectionLabel text={servicesGrid.eyebrow} />
                  <h2 className="gwc-h2">
                    <TitleWithAccent title={servicesGrid.title} accent={servicesGrid.highlight_text} />
                  </h2>
                  <p className="gwc-section-subtitle">{servicesSubtitle}</p>
                </div>
              </FadeUp>

              <div className="gwc-services-grid">
                {visibleServices.map((item, index) => (
                  <FadeUp key={`${item.title}-${index}`} delay={index * 30}>
                    <ActionLink href={item.url} className="gwc-service-card">
                      <div className="gwc-service-image">
                        {item.image ? <img src={item.image} alt={item.image_alt || item.title || 'Greenwich remodeling service'} /> : null}
                      </div>
                      <div className="gwc-service-body">
                        <h3>{item.title}</h3>
                        <p>{item.summary}</p>
                        <div className="gwc-service-meta">
                          {item.price ? (
                            <span className="gwc-service-badge">
                              <MetaIcon type="price" />
                              {item.price}
                            </span>
                          ) : null}
                          {item.timeline ? (
                            <span className="gwc-service-badge">
                              <MetaIcon type="time" />
                              {item.timeline}
                            </span>
                          ) : null}
                        </div>
                        <span className="gwc-service-link">
                          {item.cta_label || 'Get Started'}
                          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </ActionLink>
                  </FadeUp>
                ))}
              </div>

              {hasMoreServices ? (
                <div className="gwc-toggle-wrap">
                  <button type="button" className="gwc-toggle" onClick={() => setServicesOpen((current) => !current)}>
                    {servicesOpen ? servicesGrid.toggle_less_label || 'Show Less' : servicesGrid.toggle_label || 'Show More'}
                  </button>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {midCta ? (
          <section className="gwc-mid-cta">
            <div className="gwc-mid-cta-bg" />
            <div className="gwc-container gwc-mid-cta-inner">
              <FadeUp>
                <h2>
                  <TitleWithAccent title={midCta.title} accent="Greenwich" />
                </h2>
                {midCta.subtitle ? <p>{midCta.subtitle}</p> : null}
                <ActionLink href={midCta.button?.url} className="gwc-btn gwc-btn-primary">
                  {midCta.button?.label || 'Get Your Free Estimate'}
                </ActionLink>
                {midCta.subtext ? <span className="gwc-mid-cta-subtext">{midCta.subtext}</span> : null}
              </FadeUp>
            </div>
          </section>
        ) : null}

        {expect ? (
          <section className="gwc-prose-section gwc-prose-white">
            <div className="gwc-container gwc-narrow">
              <FadeUp>
                <div className="gwc-section-header">
                  <SectionLabel text={expect.eyebrow} />
                  <h2 className="gwc-h2">
                    <TitleWithAccent title={expect.title} accent={expect.highlight_text} />
                  </h2>
                </div>
                {splitParagraphs(expect.content).map((paragraph, index) => (
                  <p key={`expect-${index}`} className="gwc-body">
                    {renderInlineLinks(paragraph)}
                  </p>
                ))}
              </FadeUp>
            </div>
          </section>
        ) : null}

        {faq?.items?.length ? (
          <section className="gwc-faq">
            <div className="gwc-container gwc-narrow">
              <FadeUp>
                <div className="gwc-section-header">
                  <SectionLabel text={faq.eyebrow} />
                  <h2 className="gwc-h2">
                    <TitleWithAccent title={faq.title} accent={faq.highlight_text} />
                  </h2>
                  {faq.subtitle ? <p className="gwc-section-subtitle">{faq.subtitle}</p> : null}
                </div>
              </FadeUp>
              <div className="gwc-faq-list">
                {faq.items.map((item, index) => (
                  <FadeUp key={`${item.question}-${index}`} delay={index * 25}>
                    <details className="gwc-faq-item">
                      <summary>
                        <span>{item.question}</span>
                        <span className="gwc-faq-symbol" aria-hidden="true" />
                      </summary>
                      <p>{item.answer}</p>
                    </details>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {county ? (
          <section className="gwc-nearby">
            <div className="gwc-container">
              <FadeUp>
                <div className="gwc-section-header">
                  <SectionLabel text={areas?.eyebrow} />
                  <h2 className="gwc-h2">
                    {areaTitle.before}
                    {areaTitle.accent ? <span className="gwc-gold">{areaTitle.accent}</span> : null}
                    {areaTitle.after}
                  </h2>
                  {areas?.subtitle ? <p className="gwc-section-subtitle">{areas.subtitle}</p> : null}
                </div>
              </FadeUp>

              <FadeUp delay={60}>
                <div className="gwc-area-shell">
                  <article className="gwc-area-card">
                    <div className="gwc-area-image">
                      <img
                        src={county.image || '/images/areas/fairfield-county.jpg'}
                        alt={county.image_alt || county.name || 'Fairfield County homes served by BuiltWell CT'}
                      />
                    </div>
                    <div className="gwc-area-body">
                      <h3>{county.name}</h3>
                      {county.phone ? (
                        <p className="gwc-area-phone">
                          Call{' '}
                          <a href={`tel:${String(county.phone).replace(/\D/g, '')}`}>
                            Fairfield: {county.phone}
                          </a>
                        </p>
                      ) : null}
                      {county.description ? <p className="gwc-area-description">{county.description}</p> : null}
                      <div className="gwc-area-towns">
                        {featuredTowns.map((town, townIndex) => {
                          const href = resolveTownUrl(county, town);
                          const isCurrent = town.toLowerCase() === 'greenwich';
                          const hoverClass = townIndex < 8 ? ' has-fill-hover' : ' has-text-hover';
                          return href && !isCurrent ? (
                            <Link key={town} href={href} className={`gwc-area-town${hoverClass}`}>
                              {town}
                            </Link>
                          ) : (
                            <span
                              key={town}
                              className={`gwc-area-town${isCurrent ? ' is-current' : ' is-static'}${hoverClass}`}
                            >
                              {town}
                            </span>
                          );
                        })}
                        <div className={`gwc-area-extra${nearbyOpen ? ' is-open' : ''}`}>
                          {extraTowns.map((town) => {
                            const href = resolveTownUrl(county, town);
                            return href ? (
                              <Link key={town} href={href} className="gwc-area-town has-text-hover">
                                {town}
                              </Link>
                            ) : (
                              <span key={town} className="gwc-area-town is-static has-text-hover">
                                {town}
                              </span>
                            );
                          })}
                        </div>
                        {extraTowns.length ? (
                          <button
                            type="button"
                            className="gwc-area-toggle"
                            aria-expanded={nearbyOpen}
                            onClick={() => setNearbyOpen((current) => !current)}
                          >
                            {nearbyOpen ? 'Show Less -' : 'See All Towns +'}
                          </button>
                        ) : null}
                      </div>
                      <Link href={county.url || '/fairfield-county/'} className="gwc-area-link">
                        <span>{county.cta_label || `Learn more about ${county.name}`}</span>
                        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                </div>
              </FadeUp>
            </div>
          </section>
        ) : null}

        {bottomTrustItems.length ? (
          <section className="gwc-bottom-trust" role="region" aria-label="Trust indicators">
            <div className="gwc-container">
              <div className="gwc-bottom-trust-inner">
                {bottomTrustItems.map((item, index) => (
                  <div key={`${item.label || 'strip'}-${index}`} className="gwc-bottom-trust-fragment">
                    <ActionLink href={item.url} className="gwc-bottom-trust-item">
                      <span className="gwc-bottom-trust-icon">
                        <TrustStripIcon icon={item.icon} />
                      </span>
                      <span>{[item.label, item.value].filter(Boolean).join(' ')}</span>
                    </ActionLink>
                    {index < bottomTrustItems.length - 1 ? <span className="gwc-bottom-trust-divider" aria-hidden="true" /> : null}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}
        {leadForm ? <LeadFormSection page={page} data={leadForm} accent="Consultation" /> : null}
        {financing ? <FinancingStrip data={financing} /> : null}

        <div className="gwc-sticky-cta">
          <ActionLink href="#contact" className="gwc-sticky-cta-btn">
            Get Your Free Estimate
          </ActionLink>
        </div>
      </main>

      
    </div>
  );
}

