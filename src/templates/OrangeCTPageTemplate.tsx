'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import type { CMSBreadcrumb, CMSPage } from '@/types/cms';
import {
  AreasSection as SharedAreasSection,
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

type OfficeInfoData = {
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
  address?: string | null;
  business_hours?: string[] | null;
  phone_label?: string | null;
  phone?: string | null;
  phone_secondary_label?: string | null;
  phone_secondary?: string | null;
  email?: string | null;
  directions_url?: string | null;
  map_embed_url?: string | null;
  note?: string | null;
  note_label?: string | null;
  note_url?: string | null;
};

const ORANGE_HOUSING_BG = '/images/areas/orange-ct-split-level.jpg';

function FadeUp({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14 }
    );

    observer.observe(node);
    return () => observer.disconnect();
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

export function OrangeCTPageTemplate({ page }: { page: CMSPage }) {
  const [servicesOpen, setServicesOpen] = useState(false);

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
  const office = section<OfficeInfoData>(page, 'office_info');

  const intro = richTexts.find((item) => item.anchor_id === 'orange-intro');
  const permits = richTexts.find((item) => item.anchor_id === 'orange-permits');
  const costsIntro = richTexts.find((item) => item.anchor_id === 'orange-costs-intro');
  const costDrivers = richTexts.find((item) => item.anchor_id === 'orange-cost-drivers');
  const expect = richTexts.find((item) => item.anchor_id === 'orange-expect');
  const financing = richTexts.find((item) => item.style_variant === 'financing_strip');

  const phone = page.phones?.items?.find((item) => /new haven/i.test(item.label || ''))?.number || office?.phone || '(203) 466-9148';
  const fairfieldPhone = page.phones?.items?.find((item) => /fairfield/i.test(item.label || ''))?.number || office?.phone_secondary || '(203) 919-9616';
  const breadcrumbs: CMSBreadcrumb[] = [
    { label: 'Home', url: '/' },
    { label: 'Areas We Serve', url: '/areas-we-serve/' },
    { label: 'New Haven County', url: '/new-haven-county/' },
    { label: 'Orange, CT', url: '/new-haven-county/orange-ct/' },
  ];
  const heroBg = hero?.background_image || '/portfolio/builtwell-team-office-exterior-ct.jpg';
  const visibleCount = Math.max(1, servicesGrid?.initial_visible_count || 6);
  const serviceItems = servicesGrid?.items || [];
  const visibleServices = servicesOpen ? serviceItems : serviceItems.slice(0, visibleCount);
  const hasMoreServices = serviceItems.length > visibleCount;
  const permitContent = parseH3Content(permits?.content);
  const expectContent = parseH3Content(expect?.content);
  const introParagraphs = splitParagraphs(intro?.content);
  const introBeforeImage = introParagraphs.slice(0, 2);
  const introAfterImage = introParagraphs.slice(2);
  const topTrust = trustBars[0];
  const bottomTrust = trustBars[1];
  const topTrustItems = (topTrust?.items || []).slice(0, 4).map((item) =>
    (item?.icon || '').toLowerCase() === 'shield'
      ? { ...item, value: '' }
      : item
  );
  const bottomTrustItems = (bottomTrust?.items || [])
    .filter((item) => !/bbb/i.test(`${item?.label || ''} ${item?.value || ''}`))
    .map((item) =>
      /angi/i.test(`${item?.label || ''} ${item?.value || ''}`)
        ? { ...item, label: 'Verified on', value: 'Angi' }
        : item
    )
    .slice(0, 4);
  const costsIntroParagraphs = splitParagraphs(costsIntro?.content);
  const servicesSubtitle = servicesGrid?.subtitle || '';
  const officeHours = (office?.business_hours || []).filter(Boolean) as string[];

  return (
    <div data-orange-page>
      <main id="main">
        <section className="gwc-hero">
          <div className="gwc-hero-bg" aria-hidden="true" style={{ backgroundImage: `url('${heroBg}')` }} />
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
                <TitleWithAccent title={hero?.headline} accent="Orange, CT" />
              </h1>
              {hero?.subheadline ? <p className="gwc-hero-subtitle">{hero.subheadline}</p> : null}
              <div className="gwc-hero-actions">
                <ActionLink href={hero?.cta_primary?.url} className="gwc-btn gwc-btn-primary">
                  {hero?.cta_primary?.label || 'Get Your Free Estimate'}
                </ActionLink>
                <ActionLink href={hero?.cta_secondary?.url} className="gwc-btn gwc-btn-secondary">
                  {hero?.cta_secondary?.label || `Call ${phone}`}
                </ActionLink>
                <ActionLink href={`tel:${fairfieldPhone.replace(/\D/g, '')}`} className="gwc-btn gwc-btn-secondary">
                  Fairfield: {fairfieldPhone}
                </ActionLink>
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
                {introBeforeImage.map((paragraph, index) => (
                  <p key={`intro-${index}`} className="gwc-body gwc-center-body">
                    {renderInlineLinks(paragraph)}
                  </p>
                ))}
              </FadeUp>

              {intro?.image ? (
                <FadeUp delay={80}>
                  <div className="gwc-intro-image-shell">
                    <img src={intro.image} alt={intro.image_alt || intro.title || 'Orange CT neighborhood'} />
                  </div>
                </FadeUp>
              ) : null}

              <FadeUp delay={120}>
                {introAfterImage.map((paragraph, index) => (
                  <p key={`intro-after-${index}`} className="gwc-body gwc-center-body">
                    {renderInlineLinks(paragraph)}
                  </p>
                ))}
              </FadeUp>
            </div>
          </section>
        ) : null}

        {housing ? (
          <section className="gwc-dark-band">
            <div className="gwc-dark-band-image" aria-hidden="true" style={{ backgroundImage: `url('${ORANGE_HOUSING_BG}')` }} />
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
                      {block.image ? <img src={block.image} alt={block.image_alt || block.title || 'Orange remodeling'} /> : null}
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

              {pricingTables.map((table, index) => (
                <FadeUp key={`${table.title}-${index}`} delay={index * 35}>
                  <div className="gwc-cost-block">
                    <h3 className="gwc-cost-title">{table.title}</h3>
                    {table.title === 'Basement Finishing Costs in Orange, CT' ||
                    table.title === 'Flooring Costs in Orange, CT' ||
                    table.title === 'Home Additions Costs in Orange, CT' ||
                    table.title === 'Interior Carpentry Costs in Orange, CT' ? (
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
                    {table.subtitle &&
                    table.title !== 'Basement Finishing Costs in Orange, CT' &&
                    table.title !== 'Flooring Costs in Orange, CT' &&
                    table.title !== 'Home Additions Costs in Orange, CT' &&
                    table.title !== 'Interior Carpentry Costs in Orange, CT' ? (
                      <p className="gwc-cost-note">{table.subtitle}</p>
                    ) : null}
                  </div>
                </FadeUp>
              ))}

              {costDrivers ? (
                <FadeUp delay={80}>
                  <div className="gwc-driver-copy">
                    <h3>{costDrivers.title}</h3>
                    {splitParagraphs(costDrivers.content).map((paragraph, index) => (
                      <p key={`driver-${index}`}>{renderInlineLinks(paragraph)}</p>
                    ))}
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
                        {item.image ? <img src={item.image} alt={item.image_alt || item.title || 'Orange remodeling service'} /> : null}
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
                  <TitleWithAccent title={midCta.title} accent="Orange" />
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
                {expectContent.intro.map((paragraph, index) => (
                  <p key={`expect-${index}`} className="gwc-body">
                    {renderInlineLinks(paragraph)}
                  </p>
                ))}
                {expectContent.blocks.length ? (
                  <div className="gwc-prose-flow">
                    {expectContent.blocks.map((block, index) => (
                      <div key={`${block.title}-${index}`} className="gwc-prose-block">
                        <h3>{block.title}</h3>
                        {block.paragraphs.map((paragraph, paragraphIndex) => (
                          <p key={`${block.title}-${paragraphIndex}`}>{renderInlineLinks(paragraph)}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : null}
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

        {areas ? <SharedAreasSection data={areas} /> : null}

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
        {leadForm ? <LeadFormSection page={page} data={leadForm} accent="Consultation" phones={{ fairfield: fairfieldPhone, newHaven: phone }} /> : null}
        {office ? (
          <section className="gwc-office">
            <div className="gwc-container">
              <FadeUp>
                <div className="gwc-section-header">
                  <SectionLabel text={office.eyebrow} dark />
                  <h2 className="gwc-h2 gwc-h2-light">
                    <TitleWithAccent title={office.title} accent="Headquarters" />
                  </h2>
                </div>
              </FadeUp>
              <div className="gwc-office-grid">
                <FadeUp>
                  <div className="gwc-office-details">
                    <div className="gwc-office-item">
                      <h3>Address</h3>
                      <p>{office.address}</p>
                    </div>
                    {officeHours.length ? (
                      <div className="gwc-office-item">
                        <h3>Business Hours</h3>
                        <div className="gwc-office-hours">
                          {officeHours.map((row, index) => {
                            const [day, ...rest] = row.split(':');
                            return (
                              <div key={`${row}-${index}`} className="gwc-office-hour-row">
                                <span>{day}</span>
                                <span>{rest.join(':').trim()}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                    {(office.phone || office.phone_secondary) ? (
                      <div className="gwc-office-item">
                        <h3>Phone</h3>
                        {office.phone ? (
                          <p>
                            {office.phone_label ? `${office.phone_label}: ` : ''}
                            <a href={`tel:${String(office.phone).replace(/\D/g, '')}`}>{office.phone}</a>
                          </p>
                        ) : null}
                        {office.phone_secondary ? (
                          <p>
                            {office.phone_secondary_label ? `${office.phone_secondary_label}: ` : ''}
                            <a href={`tel:${String(office.phone_secondary).replace(/\D/g, '')}`}>{office.phone_secondary}</a>
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                    {office.email ? (
                      <div className="gwc-office-item">
                        <h3>Email</h3>
                        <p><a href={`mailto:${office.email}`}>{office.email}</a></p>
                      </div>
                    ) : null}
                  </div>
                </FadeUp>
                <FadeUp delay={70}>
                  <div className="gwc-office-map">
                    {office.map_embed_url ? (
                      <iframe
                        src={office.map_embed_url}
                        title={office.title || 'Orange office map'}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    ) : null}
                  </div>
                </FadeUp>
              </div>
              {office.note ? (
                <FadeUp delay={100}>
                  <p className="gwc-office-note">
                    {office.note_label && office.note_url ? (
                      <>
                        <strong><Link href={office.note_url}>{office.note_label}:</Link></strong>{' '}
                      </>
                    ) : office.note_label ? (
                      <><strong>{office.note_label}:</strong>{' '}</>
                    ) : null}
                    {office.note}
                  </p>
                </FadeUp>
              ) : null}
            </div>
          </section>
        ) : null}
        {financing ? <FinancingStrip data={financing} /> : null}

        <div className="gwc-sticky-cta">
          <ActionLink href="#contact" className="gwc-sticky-cta-btn">
            Get Your Free Estimate
          </ActionLink>
        </div>
      </main>

      <style jsx global>{`
        [data-orange-page] {
          --gwc-gold: #bc9155;
          --gwc-gold-dark: #9a7340;
          --gwc-navy: #1e2b43;
          --gwc-ink: #151e30;
          --gwc-muted: #5c677d;
          --gwc-cream: #f5f1e9;
          --gwc-gold-light: rgba(188, 145, 85, 0.1);
          background: #fff;
          color: var(--gwc-navy);
        }
        [data-orange-page] .gwc-container { max-width: 1240px; margin: 0 auto; padding: 0 40px; }
        [data-orange-page] .gwc-narrow { max-width: 920px; }
        [data-orange-page] .gwc-h2 {
          margin: 0 0 20px;
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(28px, 3.5vw, 44px);
          line-height: 1.14;
          letter-spacing: -0.02em;
          color: var(--gwc-navy);
        }
        [data-orange-page] .gwc-h2-light { color: #fff; }
        [data-orange-page] .gwc-gold { color: var(--gwc-gold); }
        [data-orange-page] .gwc-body {
          margin: 0 0 18px;
          font-size: 16px;
          line-height: 1.85;
          color: var(--gwc-muted);
        }
        [data-orange-page] .gwc-center { text-align: center; }
        [data-orange-page] .gwc-center-body { text-align: center; max-width: 760px; margin-left: auto; margin-right: auto; }
        [data-orange-page] .gwc-section-header { text-align: center; margin-bottom: 28px; }
        [data-orange-page] .gwc-section-subtitle {
          max-width: 820px;
          margin: 0 auto;
          font-size: 17px;
          line-height: 1.75;
          color: var(--gwc-muted);
        }
        [data-orange-page] .gwc-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gwc-gold-dark);
        }
        [data-orange-page] .gwc-label-dark { color: #d1ad73; }
        [data-orange-page] .gwc-label-line { width: 20px; height: 2px; background: var(--gwc-gold); }
        [data-orange-page] .gwc-label-dark .gwc-label-line { background: #d1ad73; }
        [data-orange-page] .gwc-inline-link { color: var(--gwc-gold); font-weight: 600; text-decoration: none; transition: color .2s ease; }
        [data-orange-page] .gwc-inline-link:hover { color: var(--gwc-gold-dark); }
        [data-orange-page] .gwc-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          padding: 16px 32px;
          border-radius: 4px;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: transform .2s ease, background .2s ease, box-shadow .2s ease, border-color .2s ease;
        }
        [data-orange-page] .gwc-btn:hover { transform: translateY(-1px); }
        [data-orange-page] .gwc-btn-primary { background: var(--gwc-gold); color: #fff; box-shadow: 0 8px 20px rgba(188,145,85,.22); }
        [data-orange-page] .gwc-btn-primary:hover { background: #a57d48; box-shadow: 0 12px 26px rgba(188,145,85,.28); }
        [data-orange-page] .gwc-btn-secondary {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,.25);
          font-weight: 500;
        }
        [data-orange-page] .gwc-btn-secondary:hover { border-color: var(--gwc-gold); color: var(--gwc-gold); }
        [data-orange-page] .gwc-hero {
          position: relative;
          overflow: hidden;
          min-height: 40vh;
          padding: 120px 0 36px;
          background: var(--gwc-ink);
          color: #fff;
        }
        [data-orange-page] .gwc-hero-bg,
        [data-orange-page] .gwc-hero-overlay { position: absolute; inset: 0; }
        [data-orange-page] .gwc-hero-bg { background-size: cover; background-position: center 28%; opacity: 0.72; }
        [data-orange-page] .gwc-hero-overlay {
          background:
            radial-gradient(ellipse at 97% 97%, rgba(21,30,48,1) 0%, rgba(21,30,48,.9) 8%, transparent 30%),
            radial-gradient(ellipse at 3% 97%, rgba(21,30,48,.9) 0%, transparent 25%),
            linear-gradient(180deg, rgba(21,30,48,.35) 0%, rgba(21,30,48,.2) 30%, rgba(21,30,48,.45) 65%, rgba(21,30,48,.92) 100%);
        }
        [data-orange-page] .gwc-hero-inner { position: relative; max-width: 980px; text-align: center; }
        [data-orange-page] .gwc-breadcrumbs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0;
          margin: 0 0 20px;
          padding: 0;
          list-style: none;
          font-size: 13px;
          color: rgba(255,255,255,.9);
        }
        [data-orange-page] .gwc-breadcrumbs li { display: inline-flex; align-items: center; }
        [data-orange-page] .gwc-breadcrumbs li + li::before { content: ">"; color: var(--gwc-gold); margin: 0 10px; }
        [data-orange-page] .gwc-breadcrumbs a { color: rgba(255,255,255,.82); text-decoration: none; transition: color .2s ease; }
        [data-orange-page] .gwc-breadcrumbs a:hover { color: var(--gwc-gold); }
        [data-orange-page] .gwc-breadcrumb-current { color: #fff; font-weight: 600; }
        [data-orange-page] .gwc-hero-title {
          margin: 0 0 12px;
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(40px, 4.5vw, 56px);
          line-height: 1.08;
          letter-spacing: -0.03em;
        }
        [data-orange-page] .gwc-hero-subtitle {
          max-width: 760px;
          margin: 0 auto;
          font-size: 17px;
          line-height: 1.75;
          color: rgba(255,255,255,.88);
        }
        [data-orange-page] .gwc-hero-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
          margin-top: 28px;
        }
        [data-orange-page] .gwc-hero-actions .gwc-btn {
          min-height: 52px;
          padding: 14px 32px;
          border-radius: 8px;
        }
        [data-orange-page] .gwc-hero-actions .gwc-btn-secondary {
          background: rgba(10,18,35,.42);
          border: 1px solid rgba(255,255,255,.22);
          color: #fff;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          letter-spacing: 0.3px;
          transition: background .3s, border-color .3s, transform .3s, box-shadow .3s, color .3s;
        }
        [data-orange-page] .gwc-hero-actions .gwc-btn-secondary:hover {
          background: rgba(10,18,35,.62);
          border-color: rgba(255,255,255,.35);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,.3);
        }
        [data-orange-page] .gwc-hero-actions .gwc-btn-primary:hover {
          background: #d4a95a;
          border-color: #d4a95a;
          box-shadow: 0 8px 24px rgba(188,145,85,.4);
        }
        [data-orange-page] .gwc-top-trust {
          border-top: 1px solid rgba(188,145,85,.2);
          border-bottom: 1px solid rgba(188,145,85,.2);
          background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%);
        }
        [data-orange-page] .gwc-top-trust-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
        [data-orange-page] .gwc-top-trust-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 18px;
          text-align: center;
          color: inherit;
          text-decoration: none;
          border-right: 1px solid rgba(188,145,85,.12);
          transition: transform .2s ease, background .2s ease;
        }
        [data-orange-page] .gwc-top-trust-item:last-child { border-right: 0; }
        [data-orange-page] .gwc-top-trust-item:hover { background: rgba(188,145,85,.06); transform: translateY(-2px); }
        [data-orange-page] .gwc-top-trust-value {
          display: flex;
          min-height: 42px;
          align-items: center;
          justify-content: center;
          font-family: "Playfair Display", Georgia, serif;
          font-size: 42px;
          font-weight: 700;
          line-height: 1;
          color: var(--gwc-gold);
        }
        [data-orange-page] .gwc-top-trust-value svg { width: 28px; height: 28px; }
        [data-orange-page] .gwc-top-trust-label {
          margin-top: 8px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,.72);
        }
        [data-orange-page] .gwc-intro { padding: 82px 0 36px; }
        [data-orange-page] .gwc-intro-image-shell {
          overflow: hidden;
          margin: 30px auto 34px;
          border-radius: 14px;
          box-shadow: 0 18px 48px rgba(30,43,67,.14);
        }
        [data-orange-page] .gwc-intro-image-shell img {
          display: block;
          width: 100%;
          height: auto;
          min-height: 320px;
          object-fit: cover;
        }
        [data-orange-page] .gwc-inline-cta {
          margin-top: 36px;
          padding: 28px;
          border: 1px solid rgba(188,145,85,.15);
          border-radius: 10px;
          background: rgba(188,145,85,.06);
          text-align: center;
        }
        [data-orange-page] .gwc-inline-title { margin: 0 0 8px; font-size: 17px; font-weight: 600; color: var(--gwc-navy); }
        [data-orange-page] .gwc-inline-sub,
        [data-orange-page] .gwc-inline-note { margin: 0; color: var(--gwc-muted); }
        [data-orange-page] .gwc-inline-sub { font-size: 14px; }
        [data-orange-page] .gwc-inline-note { margin-top: 12px; font-size: 13px; }
        [data-orange-page] .gwc-inline-btn { margin-top: 18px; }
        [data-orange-page] .gwc-dark-band {
          position: relative;
          overflow: hidden;
          padding: 74px 0;
          background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%);
        }
        [data-orange-page] .gwc-dark-band-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center 40%;
          opacity: .3;
        }
        [data-orange-page] .gwc-dark-band-pattern {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(21,30,48,.5) 0%, rgba(21,30,48,.4) 50%, rgba(21,30,48,.7) 100%);
        }
        [data-orange-page] .gwc-dark-band-inner { position: relative; text-align: center; }
        [data-orange-page] .gwc-body-light { color: rgba(255,255,255,.75); }
        [data-orange-page] .gwc-alt-section { padding: 80px 0; background: #fff; }
        [data-orange-page] .gwc-alt-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          margin-top: 32px;
        }
        [data-orange-page] .gwc-alt-reverse .gwc-alt-image { order: 2; }
        [data-orange-page] .gwc-alt-reverse .gwc-alt-copy { order: 1; }
        [data-orange-page] .gwc-alt-image {
          overflow: hidden;
          border-radius: 10px;
          box-shadow: 0 12px 40px rgba(30,43,67,.12);
        }
        [data-orange-page] .gwc-alt-image img { width: 100%; height: 100%; min-height: 360px; object-fit: cover; transition: transform .5s ease; }
        [data-orange-page] .gwc-alt-block:hover .gwc-alt-image img { transform: scale(1.03); }
        [data-orange-page] .gwc-alt-copy h3,
        [data-orange-page] .gwc-cost-title,
        [data-orange-page] .gwc-driver-copy h3,
        [data-orange-page] .gwc-prose-block h3 {
          margin: 0 0 14px;
          font-family: "Playfair Display", Georgia, serif;
          font-size: 24px;
          line-height: 1.18;
          color: var(--gwc-navy);
        }
        [data-orange-page] .gwc-alt-copy p,
        [data-orange-page] .gwc-driver-copy p,
        [data-orange-page] .gwc-prose-block p { margin: 0 0 16px; font-size: 15px; line-height: 1.85; color: var(--gwc-muted); }
        [data-orange-page] .gwc-neighborhoods { background: #fff; padding: 82px 0; }
        [data-orange-page] .gwc-costs { background: #fff; padding: 82px 0; }
        [data-orange-page] .gwc-faq { background: #fff; border-top: 1px solid rgba(30,43,67,.08); padding: 82px 0; }
        [data-orange-page] .gwc-prose-section { padding: 82px 0; }
        [data-orange-page] .gwc-prose-cream { background: var(--gwc-cream); }
        [data-orange-page] .gwc-prose-white { background: #fff; }
        [data-orange-page] .gwc-neighborhood-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }
        [data-orange-page] .gwc-accordion-card,
        [data-orange-page] .gwc-faq-item {
          background: #fff;
          border: 1px solid rgba(30,43,67,.08);
          border-radius: 10px;
        }
        [data-orange-page] .gwc-accordion-card { overflow: hidden; transition: border-color .24s ease, box-shadow .24s ease; }
        [data-orange-page] .gwc-accordion-card:hover { border-color: rgba(188,145,85,.32); box-shadow: 0 12px 26px rgba(30,43,67,.08); }
        [data-orange-page] .gwc-accordion-card[open] { border-color: rgba(188,145,85,.4); }
        [data-orange-page] .gwc-accordion-card summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          cursor: pointer;
          list-style: none;
          padding: 24px 28px;
          transition: background .2s ease;
        }
        [data-orange-page] .gwc-accordion-card summary:hover { background: rgba(188,145,85,.04); }
        [data-orange-page] .gwc-accordion-card summary::-webkit-details-marker { display: none; }
        [data-orange-page] .gwc-accordion-card h3 { margin: 0; font-family: "Playfair Display", Georgia, serif; font-size: 20px; color: var(--gwc-navy); }
        [data-orange-page] .gwc-accordion-icon,
        [data-orange-page] .gwc-faq-symbol {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--gwc-gold);
          font-size: 24px;
          font-weight: 700;
          line-height: 1;
        }
        [data-orange-page] .gwc-accordion-icon::before,
        [data-orange-page] .gwc-faq-symbol::before { content: "+"; }
        [data-orange-page] .gwc-accordion-card[open] .gwc-accordion-icon::before,
        [data-orange-page] .gwc-faq-item[open] .gwc-faq-symbol::before { content: "-"; }
        [data-orange-page] .gwc-accordion-body { padding: 0 28px 24px; }
        [data-orange-page] .gwc-accordion-body p { margin: 0 0 14px; font-size: 15px; line-height: 1.8; color: var(--gwc-muted); }
        [data-orange-page] .gwc-prose-flow { margin-top: 12px; }
        [data-orange-page] .gwc-prose-block + .gwc-prose-block { margin-top: 28px; }
        [data-orange-page] .gwc-prose-block h3 { font-size: 22px; }
        [data-orange-page] .gwc-prose-block p { font-size: 16px; }
        [data-orange-page] .gwc-cost-block { margin-top: 26px; }
        [data-orange-page] .gwc-cost-title { font-size: 22px; margin-bottom: 16px; }
        [data-orange-page] .gwc-table-wrap {
          overflow-x: auto;
          margin-bottom: 32px;
          border: 1px solid rgba(30,43,67,.08);
          border-radius: 8px;
          background: #fff;
        }
        [data-orange-page] .gwc-table {
          width: 100%;
          min-width: 640px;
          border-collapse: collapse;
          table-layout: fixed;
        }
        [data-orange-page] .gwc-table thead th:first-child,
        [data-orange-page] .gwc-table tbody td:first-child { width: 18%; }
        [data-orange-page] .gwc-table thead th:nth-child(2),
        [data-orange-page] .gwc-table tbody td:nth-child(2) { width: 52%; }
        [data-orange-page] .gwc-table thead th:last-child,
        [data-orange-page] .gwc-table tbody td:last-child { width: 30%; text-align: right; }
        [data-orange-page] .gwc-table thead th {
          background: #1e2b43;
          color: #fff;
          padding: 14px 18px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
        }
        [data-orange-page] .gwc-table tbody tr:nth-child(even) { background: rgba(30,43,67,.02); }
        [data-orange-page] .gwc-table tbody tr:hover { background: rgba(188,145,85,.06); }
        [data-orange-page] .gwc-table td {
          padding: 16px 24px;
          font-size: 15px;
          line-height: 1.72;
          color: var(--gwc-muted);
          vertical-align: top;
        }
        [data-orange-page] .gwc-table .gwc-price {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--gwc-gold-dark);
          white-space: nowrap;
        }
        [data-orange-page] .gwc-cost-note { margin: 14px 0 0; font-size: 14px; line-height: 1.75; color: var(--gwc-muted); }
        [data-orange-page] .gwc-cost-note-before { margin: 0 0 16px; }
        [data-orange-page] .gwc-driver-copy { margin-top: 6px; }
        [data-orange-page] .gwc-driver-copy h3 { font-size: 22px; }
        [data-orange-page] .gwc-driver-copy p { font-size: 16px; }
        [data-orange-page] .gwc-services { padding: 82px 0; background: var(--gwc-cream); }
        [data-orange-page] .gwc-services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 32px;
        }
        [data-orange-page] .gwc-service-card {
          display: flex;
          height: 100%;
          flex-direction: column;
          overflow: hidden;
          border-radius: 8px;
          border-bottom: 2px solid transparent;
          background: #fff;
          box-shadow: 0 2px 12px rgba(30,43,67,.06), 0 1px 3px rgba(30,43,67,.04);
          text-decoration: none;
          transition: all .35s cubic-bezier(.4, 0, .2, 1);
        }
        [data-orange-page] .gwc-service-card:hover {
          transform: translateY(-4px);
          border-bottom-color: var(--gwc-gold);
          box-shadow: 0 12px 28px rgba(30,43,67,.1), 0 28px 56px rgba(30,43,67,.12);
        }
        [data-orange-page] .gwc-service-image { height: 180px; overflow: hidden; }
        [data-orange-page] .gwc-service-image img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s; }
        [data-orange-page] .gwc-service-card:hover .gwc-service-image img { transform: scale(1.05); }
        [data-orange-page] .gwc-service-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          padding: 28px 28px 32px;
          text-align: center;
        }
        [data-orange-page] .gwc-service-body h3 {
          margin: 0 0 12px;
          font-family: "Playfair Display", Georgia, serif;
          font-size: 22px;
          line-height: 1.18;
          color: var(--gwc-navy);
          transition: color .25s ease;
        }
        [data-orange-page] .gwc-service-card:hover .gwc-service-body h3 { color: var(--gwc-gold); }
        [data-orange-page] .gwc-service-body p { margin: 0 0 20px; font-size: 15px; line-height: 1.7; color: var(--gwc-muted); }
        [data-orange-page] .gwc-service-meta { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: auto; }
        [data-orange-page] .gwc-service-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(188,145,85,.1);
          color: var(--gwc-gold-dark);
          font-size: 12px;
          font-weight: 700;
        }
        [data-orange-page] .gwc-service-badge svg { width: 14px; height: 14px; }
        [data-orange-page] .gwc-service-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
          font-size: 14px;
          font-weight: 700;
          color: var(--gwc-gold);
          transition: color .25s ease, gap .25s ease;
        }
        [data-orange-page] .gwc-service-card:hover .gwc-service-link { gap: 10px; }
        [data-orange-page] .gwc-service-link svg { width: 14px; height: 14px; }
        [data-orange-page] .gwc-toggle-wrap { margin-top: 30px; text-align: center; }
        [data-orange-page] .gwc-toggle {
          padding: 12px 22px;
          border: 1px solid var(--gwc-gold);
          border-radius: 6px;
          background: transparent;
          color: var(--gwc-gold);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: color .2s ease, background .2s ease, border-color .2s ease;
        }
        [data-orange-page] .gwc-toggle:hover { color: var(--gwc-gold-dark); background: rgba(188,145,85,.08); border-color: var(--gwc-gold-dark); }
        [data-orange-page] .gwc-mid-cta {
          position: relative;
          overflow: hidden;
          padding: 64px 0;
          background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%);
        }
        [data-orange-page] .gwc-mid-cta-bg {
          position: absolute;
          inset: 0;
          background: url('/portfolio/builtwell-contractor-client-consultation-ct.jpeg') center 15% / cover no-repeat;
          opacity: .22;
        }
        [data-orange-page] .gwc-mid-cta-inner { position: relative; text-align: center; color: #fff; }
        [data-orange-page] .gwc-mid-cta-inner h2 {
          margin: 0 0 12px;
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(28px, 3.5vw, 40px);
          line-height: 1.12;
        }
        [data-orange-page] .gwc-mid-cta-inner p { max-width: 700px; margin: 0 auto 28px; font-size: 16px; line-height: 1.75; color: rgba(255,255,255,.78); }
        [data-orange-page] .gwc-mid-cta-subtext { display: block; margin-top: 14px; font-size: 14px; font-style: italic; color: rgba(255,255,255,.56); }
        [data-orange-page] .gwc-faq-list { display: grid; gap: 16px; }
        [data-orange-page] .gwc-faq-item { overflow: hidden; transition: border-color .2s ease, box-shadow .2s ease; }
        [data-orange-page] .gwc-faq-item[open] { border-color: rgba(188,145,85,.4); box-shadow: 0 12px 24px rgba(30,43,67,.06); }
        [data-orange-page] .gwc-faq-item summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 20px 24px;
          cursor: pointer;
          list-style: none;
          transition: background .2s ease;
        }
        [data-orange-page] .gwc-faq-item summary:hover { background: rgba(188,145,85,.04); }
        [data-orange-page] .gwc-faq-item summary::-webkit-details-marker { display: none; }
        [data-orange-page] .gwc-faq-item summary span:first-child { font-size: 16px; font-weight: 600; color: var(--gwc-navy); }
        [data-orange-page] .gwc-faq-item p { margin: 0; padding: 0 24px 20px; font-size: 15px; line-height: 1.8; color: var(--gwc-muted); }
        [data-orange-page] .gwc-nearby { background: var(--gwc-cream); padding: 82px 0; }
        [data-orange-page] .gwc-area-shell { max-width: 820px; margin: 0 auto; }
        [data-orange-page] .gwc-area-card {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border-radius: 12px;
          background: #fff;
          border: none;
          border-bottom: 3px solid transparent;
          box-shadow: 0 2px 12px rgba(30,43,67,.06), 0 1px 3px rgba(30,43,67,.04);
          transition: all .35s cubic-bezier(.4,0,.2,1);
        }
        [data-orange-page] .gwc-area-card:hover {
          transform: translateY(-6px);
          border-bottom-color: var(--gwc-gold);
          box-shadow: 0 16px 40px rgba(30,43,67,.1), 0 32px 64px rgba(30,43,67,.08);
        }
        [data-orange-page] .gwc-area-image { position: relative; height: 220px; overflow: hidden; }
        [data-orange-page] .gwc-area-image::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 80px;
          background: linear-gradient(to top, rgba(30,43,67,.4), transparent);
          pointer-events: none;
        }
        [data-orange-page] .gwc-area-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .5s ease;
        }
        [data-orange-page] .gwc-area-card:hover .gwc-area-image img { transform: scale(1.05); }
        [data-orange-page] .gwc-area-body { padding: 28px; text-align: center; }
        [data-orange-page] .gwc-area-body h3 {
          margin: 0 0 6px;
          font-family: "Playfair Display", Georgia, serif;
          font-size: 24px;
          color: var(--gwc-navy);
        }
        [data-orange-page] .gwc-area-phone { margin: 0 0 12px; font-size: 14px; color: var(--gwc-muted); }
        [data-orange-page] .gwc-area-phone a { color: var(--gwc-gold); font-weight: 600; text-decoration: none; }
        [data-orange-page] .gwc-area-phone a:hover { text-decoration: underline; }
        [data-orange-page] .gwc-area-description {
          margin: 0 0 18px;
          font-size: 14px;
          line-height: 1.7;
          color: var(--gwc-muted);
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(30,43,67,.06);
        }
        [data-orange-page] .gwc-area-towns {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 16px;
        }
        [data-orange-page] .gwc-area-towns > .gwc-area-town:nth-child(9) { display: none; }
        [data-orange-page] .gwc-area-town {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 10px;
          border-radius: 999px;
          border: 0;
          background: var(--gwc-cream);
          color: var(--gwc-navy);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .2px;
          white-space: nowrap;
          text-decoration: none;
          transition: border-color .2s ease, color .2s ease, background .2s ease;
        }
        [data-orange-page] .gwc-area-town:hover { color: var(--gwc-gold-dark); background: var(--gwc-cream); }
        [data-orange-page] .gwc-area-town.is-current {
          background: var(--gwc-cream);
          color: var(--gwc-navy);
        }
        [data-orange-page] .gwc-area-town.is-static { cursor: default; }
        [data-orange-page] a.gwc-area-town { cursor: pointer; }
        [data-orange-page] .gwc-area-town.has-fill-hover:hover { background: var(--gwc-gold-light); color: var(--gwc-gold-dark); }
        [data-orange-page] a.gwc-area-town.has-fill-hover:hover { background: var(--gwc-gold-light); color: var(--gwc-gold-dark); }
        [data-orange-page] .gwc-area-town.has-text-hover:hover { background: var(--gwc-cream); color: var(--gwc-gold-dark); }
        [data-orange-page] a.gwc-area-town.has-text-hover:hover { background: var(--gwc-cream); color: var(--gwc-gold-dark); }
        [data-orange-page] .gwc-area-extra {
          display: none;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          grid-column: 1 / -1;
        }
        [data-orange-page] .gwc-area-extra.is-open { display: grid; }
        [data-orange-page] .gwc-area-toggle {
          border: 0;
          background: none;
          color: var(--gwc-gold);
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          grid-column: 1 / -1;
          justify-self: center;
          min-height: 44px;
        }
        [data-orange-page] .gwc-area-toggle:hover { color: var(--gwc-gold-dark); }
        [data-orange-page] .gwc-area-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
          color: var(--gwc-gold);
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: gap .3s ease;
        }
        [data-orange-page] .gwc-area-link:hover { gap: 10px; }
        [data-orange-page] .gwc-area-link svg { width: 14px; height: 14px; }
        [data-orange-page] .gwc-bottom-trust {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%);
          padding: 40px 0;
        }
        [data-orange-page] .gwc-bottom-trust::before {
          content: "";
          position: absolute;
          inset: 0;
          background: url('/hero/builtwell-job-site-aerial-hero-ct.jpg') center/cover no-repeat;
          opacity: .12;
        }
        [data-orange-page] .gwc-bottom-trust-inner {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }
        [data-orange-page] .gwc-bottom-trust-fragment { display: contents; }
        [data-orange-page] .gwc-bottom-trust-item {
          display: flex;
          min-width: 180px;
          flex: 1 1 180px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 24px;
          text-align: center;
          color: rgba(255,255,255,.9);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-decoration: none;
          transition: color .2s ease, transform .2s ease;
        }
        [data-orange-page] .gwc-bottom-trust-item:hover { color: var(--gwc-gold); transform: translateY(-2px); }
        [data-orange-page] .gwc-bottom-trust-icon {
          color: var(--gwc-gold);
          display: inline-flex;
        }
        [data-orange-page] .gwc-bottom-trust-icon svg { width: 22px; height: 22px; }
        [data-orange-page] .gwc-bottom-trust-divider {
          width: 1px;
          height: 40px;
          background: rgba(255,255,255,.1);
        }
        [data-orange-page] .gwc-office {
          padding: 82px 0;
          background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%);
          color: #fff;
        }
        [data-orange-page] .gwc-office-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
          gap: 34px;
          align-items: start;
        }
        [data-orange-page] .gwc-office-details {
          display: grid;
          gap: 18px;
        }
        [data-orange-page] .gwc-office-item {
          padding: 24px 26px;
          border: 1px solid rgba(188,145,85,.18);
          border-radius: 12px;
          background: rgba(255,255,255,.04);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
        }
        [data-orange-page] .gwc-office-item h3 {
          margin: 0 0 12px;
          font-family: "Playfair Display", Georgia, serif;
          font-size: 23px;
          line-height: 1.18;
          color: #fff;
        }
        [data-orange-page] .gwc-office-item p {
          margin: 0 0 10px;
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255,255,255,.82);
        }
        [data-orange-page] .gwc-office-item p:last-child { margin-bottom: 0; }
        [data-orange-page] .gwc-office-item a {
          color: #d8b47a;
          font-weight: 600;
          text-decoration: none;
          transition: color .2s ease;
        }
        [data-orange-page] .gwc-office-item a:hover { color: #f0cf95; }
        [data-orange-page] .gwc-office-hours {
          display: grid;
          gap: 10px;
        }
        [data-orange-page] .gwc-office-hour-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255,255,255,.08);
          font-size: 14px;
          color: rgba(255,255,255,.84);
        }
        [data-orange-page] .gwc-office-hour-row:last-child {
          padding-bottom: 0;
          border-bottom: 0;
        }
        [data-orange-page] .gwc-office-hour-row span:first-child {
          font-weight: 600;
          color: #fff;
        }
        [data-orange-page] .gwc-office-map {
          overflow: hidden;
          min-height: 100%;
          border: 1px solid rgba(188,145,85,.18);
          border-radius: 12px;
          background: rgba(255,255,255,.04);
          box-shadow: 0 18px 40px rgba(0,0,0,.22);
        }
        [data-orange-page] .gwc-office-map iframe {
          display: block;
          width: 100%;
          min-height: 100%;
          height: 100%;
          border: 0;
          aspect-ratio: 1.18 / 1;
        }
        [data-orange-page] .gwc-office-note {
          max-width: 980px;
          margin: 28px auto 0;
          font-size: 15px;
          line-height: 1.8;
          text-align: center;
          color: rgba(255,255,255,.78);
        }
        [data-orange-page] .gwc-office-note strong { color: #fff; }
        [data-orange-page] .gwc-office-note a {
          color: #d8b47a;
          text-decoration: none;
        }
        [data-orange-page] .gwc-office-note a:hover { color: #f0cf95; }
        [data-orange-page] .gwc-sticky-cta { display: none; }
        @media (max-width: 1024px) {
          [data-orange-page] .gwc-alt-block,
          [data-orange-page] .gwc-neighborhood-grid,
          [data-orange-page] .gwc-services-grid { grid-template-columns: 1fr 1fr; }
          [data-orange-page] .gwc-area-towns,
          [data-orange-page] .gwc-area-extra { grid-template-columns: repeat(3, 1fr); }
          [data-orange-page] .gwc-area-towns > .gwc-area-town:nth-child(9) { display: inline-flex; }
          [data-orange-page] .gwc-office-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          [data-orange-page] .gwc-container { padding: 0 20px; }
          [data-orange-page] .gwc-hero { min-height: auto; padding: 94px 0 36px; }
          [data-orange-page] .gwc-hero-title { font-size: clamp(30px, 7vw, 42px); }
          [data-orange-page] .gwc-hero-subtitle { font-size: 15px; line-height: 1.72; }
          [data-orange-page] .gwc-hero-actions { flex-direction: column; align-items: stretch; }
          [data-orange-page] .gwc-top-trust-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          [data-orange-page] .gwc-top-trust-item { padding: 24px 16px; background: rgba(188,145,85,.08); }
          [data-orange-page] .gwc-top-trust-item:nth-child(odd) { border-right: 1px solid rgba(188,145,85,.12); }
          [data-orange-page] .gwc-top-trust-item:nth-child(-n+2) { border-bottom: 1px solid rgba(188,145,85,.12); }
          [data-orange-page] .gwc-top-trust-value { font-size: 32px; }
          [data-orange-page] .gwc-intro,
          [data-orange-page] .gwc-neighborhoods,
          [data-orange-page] .gwc-prose-section,
          [data-orange-page] .gwc-costs,
          [data-orange-page] .gwc-services,
          [data-orange-page] .gwc-faq,
          [data-orange-page] .gwc-nearby { padding: 54px 0; }
          [data-orange-page] .gwc-dark-band,
          [data-orange-page] .gwc-mid-cta { padding: 54px 0; }
          [data-orange-page] .gwc-alt-section { padding: 54px 0; }
          [data-orange-page] .gwc-alt-block,
          [data-orange-page] .gwc-neighborhood-grid,
          [data-orange-page] .gwc-services-grid { grid-template-columns: 1fr; }
          [data-orange-page] .gwc-alt-reverse .gwc-alt-image,
          [data-orange-page] .gwc-alt-reverse .gwc-alt-copy { order: initial; }
          [data-orange-page] .gwc-alt-image img { min-height: 240px; }
          [data-orange-page] .gwc-intro-image-shell {
            margin: 24px auto 28px;
            border-radius: 12px;
          }
          [data-orange-page] .gwc-intro-image-shell img { min-height: 220px; }
          [data-orange-page] .gwc-area-body { padding: 22px; }
          [data-orange-page] .gwc-area-towns,
          [data-orange-page] .gwc-area-extra { grid-template-columns: repeat(2, 1fr); gap: 6px; }
          [data-orange-page] .gwc-area-town {
            min-height: 44px;
            padding: 8px 6px;
            font-size: 10px;
          }
          [data-orange-page] .gwc-table { min-width: 480px; }
          [data-orange-page] .gwc-table thead th { padding: 12px 14px; font-size: 11px; }
          [data-orange-page] .gwc-table td { padding: 12px 14px; font-size: 13px; }
          [data-orange-page] .gwc-service-image { height: 200px; }
          [data-orange-page] .gwc-bottom-trust { padding: 32px 0; }
          [data-orange-page] .gwc-bottom-trust-divider { display: none; }
          [data-orange-page] .gwc-bottom-trust-item { min-width: 140px; padding: 16px 12px; flex-basis: 50%; }
          [data-orange-page] .gwc-office { padding: 54px 0; }
          [data-orange-page] .gwc-office-item { padding: 20px; }
          [data-orange-page] .gwc-office-item h3 { font-size: 21px; }
          [data-orange-page] .gwc-office-hour-row {
            flex-direction: column;
            gap: 4px;
            align-items: flex-start;
          }
          [data-orange-page] .gwc-sticky-cta {
            display: block;
            position: fixed;
            left: 16px;
            right: 16px;
            bottom: 14px;
            z-index: 40;
          }
          [data-orange-page] .gwc-sticky-cta-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 52px;
            border-radius: 12px;
            background: var(--gwc-gold);
            color: #fff;
            font-size: 15px;
            font-weight: 700;
            text-decoration: none;
            box-shadow: 0 14px 34px rgba(30,43,67,.24);
          }
        }
      `}</style>
    </div>
  );
}




