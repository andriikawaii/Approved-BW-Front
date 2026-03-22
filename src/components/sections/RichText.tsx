import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

type RichTextProps = {
  data: {
    eyebrow?: string;
    title?: string;
    headline?: string;
    content?: string;
    body?: string;
    image?: string | null;
    image_alt?: string | null;
    image_position?: 'left' | 'right';
    cta?: { label: string; url: string } | null;
    align?: 'left' | 'center' | 'right';
    variant?: 'default' | 'light' | 'dark' | string;
    style_variant?: 'default' | 'legal' | 'faq' | 'process' | 'cards' | 'links' | string;
    surface?: 'default' | 'light' | 'dark' | 'white' | string;
    container_width?: 'narrow' | 'default' | 'wide' | string;
    spacing?: 'compact' | 'normal' | 'relaxed' | string;
    anchor_id?: string | null;
    town_hub_section?: 'housing_stock' | 'permitting' | 'costs' | string;
    pre_table_text?: string;
    table_rows?: Array<{
      service?: string;
      typical_price?: string;
      timeline?: string;
      notes?: string;
    }>;
    post_table_text?: string;
    what_drives_cost?: string[];
    _section_index?: number;
  };
};

type ServiceCard = {
  title: string;
  description: string;
  linkLabel?: string;
  linkUrl?: string;
};

type HeadingBlock = {
  heading: string;
  content: string;
};

type ProcessItem = {
  step: string;
  title: string;
  description: string;
};

function joinClasses(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

function parseServiceCard(paragraph: string): ServiceCard | null {
  const match = paragraph.match(/^\*\*(.+?)\*\*\s*[\u2014-]\s*(.+?)(?:\s*\[(.+?)\]\((.+?)\))?\s*$/);
  if (!match) {
    return null;
  }

  const [, title, description, linkLabel, linkUrl] = match;
  return {
    title: title.trim(),
    description: description.trim(),
    linkLabel: linkLabel?.trim(),
    linkUrl: linkUrl?.trim(),
  };
}

function parseHeadingBlocks(rawContent: string): HeadingBlock[] {
  const lines = rawContent.split('\n');
  const blocks: HeadingBlock[] = [];

  let currentHeading: string | null = null;
  let currentBody: string[] = [];

  for (const line of lines) {
    const headingMatch = line.trim().match(/^###\s+(.+)$/);

    if (headingMatch) {
      if (currentHeading) {
        blocks.push({
          heading: currentHeading,
          content: currentBody.join('\n').trim(),
        });
      }

      currentHeading = headingMatch[1].trim();
      currentBody = [];
      continue;
    }

    if (currentHeading) {
      currentBody.push(line);
    }
  }

  if (currentHeading) {
    blocks.push({
      heading: currentHeading,
      content: currentBody.join('\n').trim(),
    });
  }

  return blocks.filter((block) => block.heading !== '');
}

function extractFirstMarkdownLink(text: string): { label: string; url: string } | null {
  const match = text.match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (!match) {
    return null;
  }

  return {
    label: match[1].trim(),
    url: match[2].trim(),
  };
}

function stripMarkdownLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1').replace(/\s+/g, ' ').trim();
}

function parseProcessItems(blocks: HeadingBlock[]): ProcessItem[] {
  return blocks
    .map((block) => {
      const stepMatch = block.heading.match(/^Step\s*(\d+)\s*:\s*(.+)$/i);

      if (stepMatch) {
        return {
          step: stepMatch[1],
          title: stepMatch[2].trim(),
          description: stripMarkdownLinks(block.content),
        };
      }

      const numberedMatch = block.heading.match(/^(\d+)\.\s*(.+)$/);
      if (numberedMatch) {
        return {
          step: numberedMatch[1],
          title: numberedMatch[2].trim(),
          description: stripMarkdownLinks(block.content),
        };
      }

      return null;
    })
    .filter((item): item is ProcessItem => Boolean(item));
}

function renderInlineMarkdown(text: string, isDarkSurface: boolean): ReactNode[] {
  const tokenRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const chunks = text.split(tokenRegex).filter(Boolean);

  return chunks.map((chunk, index) => {
    if (chunk.startsWith('**') && chunk.endsWith('**')) {
      return (
        <strong key={index} className={joinClasses('font-semibold', isDarkSurface ? 'text-white' : 'text-[#1E2F4A]')}>
          {chunk.slice(2, -2)}
        </strong>
      );
    }

    const linkMatch = chunk.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = /^https?:\/\//i.test(href);
      return (
        <Link
          key={index}
          href={href}
          className={joinClasses(
            'font-semibold underline decoration-transparent transition-colors',
            isDarkSurface
              ? 'text-[#D9B786] hover:text-[#e9cda5] hover:decoration-[#D9B786]'
              : 'text-[#C89B5B] hover:decoration-[#C89B5B]',
          )}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {label}
        </Link>
      );
    }

    return <span key={index}>{chunk}</span>;
  });
}

function normalizeAnchorId(anchor: string | null | undefined): string | undefined {
  if (!anchor) {
    return undefined;
  }

  const normalized = anchor.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

  return normalized || undefined;
}

function normalizeLegacyMarkdownContent(content: string): string {
  const normalizedLines = content.split('\n').map((line) => {
    const trimmed = line.trim();

    if (trimmed === '') {
      return '';
    }

    if (/^SECTION:\s*/i.test(trimmed)) {
      return '';
    }

    if (/^H2:\s*/i.test(trimmed)) {
      return `## ${trimmed.replace(/^H2:\s*/i, '').trim()}`;
    }

    if (/^H3:\s*/i.test(trimmed)) {
      return `### ${trimmed.replace(/^H3:\s*/i, '').trim()}`;
    }

    if (/^H4:\s*/i.test(trimmed)) {
      return `#### ${trimmed.replace(/^H4:\s*/i, '').trim()}`;
    }

    if (/^[•●]\s+/.test(trimmed)) {
      return `- ${trimmed.replace(/^[•●]\s+/, '').trim()}`;
    }

    if (/^â€¢\s+/.test(trimmed)) {
      return `- ${trimmed.replace(/^â€¢\s+/, '').trim()}`;
    }

    return line;
  });

  return normalizedLines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function buildMarkdownComponents(isDarkSurface: boolean): Components {
  const headingClass = isDarkSurface ? 'text-white' : 'text-[#1E2F4A]';
  const bodyClass = isDarkSurface ? 'text-white/85' : 'text-[#5e6f86]';
  const borderClass = isDarkSurface ? 'border-white/20' : 'border-[#e6ddcc]';

  return {
    h2: ({ children }) => <h2 className={joinClasses('mt-8 text-2xl font-semibold md:text-3xl', headingClass)}>{children}</h2>,
    h3: ({ children }) => <h3 className={joinClasses('mt-7 text-xl font-semibold md:text-2xl', headingClass)}>{children}</h3>,
    h4: ({ children }) => <h4 className={joinClasses('mt-6 text-lg font-semibold md:text-xl', headingClass)}>{children}</h4>,
    p: ({ children }) => <p className={joinClasses('text-base leading-relaxed md:text-lg', bodyClass)}>{children}</p>,
    ul: ({ children }) => <ul className={joinClasses('space-y-3 pl-5 text-base leading-relaxed md:text-lg', bodyClass)}>{children}</ul>,
    ol: ({ children }) => <ol className={joinClasses('space-y-3 pl-5 text-base leading-relaxed md:text-lg', bodyClass)}>{children}</ol>,
    li: ({ children }) => <li className="list-disc">{children}</li>,
    strong: ({ children }) => <strong className={joinClasses('font-semibold', headingClass)}>{children}</strong>,
    a: ({ href, children }) => {
      const safeHref = typeof href === 'string' && href.trim() !== '' ? href : '#';
      const isExternal = /^https?:\/\//i.test(safeHref);
      return (
        <a
          href={safeHref}
          className={joinClasses(
            'font-semibold underline decoration-transparent transition-colors',
            isDarkSurface
              ? 'text-[#D9B786] hover:text-[#e9cda5] hover:decoration-[#D9B786]'
              : 'text-[#C89B5B] hover:decoration-[#C89B5B]',
          )}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
    table: ({ children }) => (
      <div className={joinClasses('overflow-x-auto rounded-xl border', borderClass)}>
        <table className="min-w-full border-collapse text-left text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className={isDarkSurface ? 'bg-white/10' : 'bg-[#f6f1e7]'}>{children}</thead>,
    th: ({ children }) => <th className={joinClasses('border-b px-4 py-3 font-semibold', borderClass, headingClass)}>{children}</th>,
    td: ({ children }) => <td className={joinClasses('border-b px-4 py-3', borderClass, bodyClass)}>{children}</td>,
  };
}

export function RichText({ data }: RichTextProps) {
  const title = data.title || data.headline;
  const rawContent = normalizeLegacyMarkdownContent((data.content || data.body || '').trim());

  const explicitStyleVariant =
    data.style_variant === 'legal' ||
    data.style_variant === 'faq' ||
    data.style_variant === 'process' ||
    data.style_variant === 'cards' ||
    data.style_variant === 'links'
      ? data.style_variant
      : 'default';

  const inferredStyleVariant =
    /^###\s*Step\s+\d+/im.test(rawContent)
      ? 'process'
      : /^###\s*.+\?/im.test(rawContent)
        ? 'faq'
        : (rawContent.match(/\[[^\]]+\]\([^)]+\)/g)?.length ?? 0) >= 4
          ? 'links'
          : 'default';

  const styleVariant = explicitStyleVariant !== 'default' ? explicitStyleVariant : inferredStyleVariant;

  const sectionIndex = typeof data._section_index === 'number' ? data._section_index : null;
  const autoSurface = sectionIndex !== null ? (sectionIndex % 2 === 0 ? 'light' : 'white') : 'default';

  const surface =
    data.surface === 'light' || data.surface === 'dark' || data.surface === 'white'
      ? data.surface
      : data.variant === 'dark'
        ? 'dark'
        : data.variant === 'light'
          ? 'light'
          : autoSurface;

  const containerWidth = data.container_width === 'narrow' || data.container_width === 'wide' ? data.container_width : 'default';
  const spacing = data.spacing === 'compact' || data.spacing === 'relaxed' ? data.spacing : 'normal';
  const anchorId = normalizeAnchorId(data.anchor_id);

  const alignClass = data.align === 'center' ? 'text-center' : data.align === 'right' ? 'text-right' : 'text-left';
  const isDarkSurface = surface === 'dark';
  const townHubSection = typeof data.town_hub_section === 'string' ? data.town_hub_section : '';

  const sectionClass =
    surface === 'dark'
      ? 'bg-[#1E2F4A] text-white'
      : surface === 'white'
        ? 'bg-white'
        : surface === 'light'
          ? 'bg-[#f8f5ee]'
          : 'bg-[#F5F3EF]';

  const spacingClass = spacing === 'compact' ? 'py-12 md:py-14' : spacing === 'relaxed' ? 'py-20 md:py-24' : 'py-16 md:py-20';
  const containerClass = containerWidth === 'narrow' ? 'max-w-3xl' : containerWidth === 'wide' ? 'max-w-6xl' : 'max-w-5xl';
  const headingClass = isDarkSurface ? '!text-white' : 'text-[#1E2F4A]';
  const bodyClass = isDarkSurface ? 'text-white/85' : 'text-[#5e6f86]';
  const isTownHubCosts = townHubSection === 'costs';
  const contentPanelClass = joinClasses(
    'rounded-2xl border p-6 md:p-8',
    isDarkSurface ? 'border-white/20 bg-white/5' : 'border-[#e6ddcc] bg-white shadow-[0_10px_25px_rgba(30,47,74,0.07)]',
    townHubSection === 'costs' ? 'border-[#d9c7a8] bg-[#fffaf0] shadow-[0_14px_32px_rgba(30,47,74,0.10)]' : '',
    townHubSection === 'permitting' ? 'bg-[#fbf8f1]' : '',
  );

  const normalizedTitle = (title || '').trim().toLowerCase();
  const showTitle = normalizedTitle !== '' && normalizedTitle !== 'intro';

  const paragraphs = rawContent
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const cards = paragraphs
    .map(parseServiceCard)
    .filter((card): card is ServiceCard => Boolean(card));

  const headingBlocks = parseHeadingBlocks(rawContent);
  const processItems = parseProcessItems(headingBlocks);
  const faqItems = headingBlocks.filter((block) => block.heading.includes('?') && block.content.trim() !== '');

  const shouldRenderProcess = styleVariant === 'process' && processItems.length >= 3;
  const shouldRenderFaq = styleVariant === 'faq' && faqItems.length >= 3;
  const shouldRenderHeadingCards =
    (styleVariant === 'links' || styleVariant === 'default') &&
    headingBlocks.length >= 3 &&
    !shouldRenderProcess &&
    !shouldRenderFaq;

  const shouldRenderAsCards =
    !shouldRenderProcess &&
    !shouldRenderFaq &&
    !shouldRenderHeadingCards &&
    (styleVariant === 'cards' ? cards.length > 0 : cards.length > 1 && cards.length === paragraphs.length);

  const markdownComponents = buildMarkdownComponents(isDarkSurface);
  const costRows = Array.isArray(data.table_rows) ? data.table_rows.filter((row) => row?.service) : [];
  const costDrivers = Array.isArray(data.what_drives_cost) ? data.what_drives_cost.filter(Boolean) : [];

  return (
    <section
      id={anchorId}
      data-richtext-style={styleVariant}
      data-richtext-surface={surface}
      className={joinClasses('bw-richtext', `bw-richtext--${styleVariant}`, townHubSection ? `bw-town-richtext--${townHubSection}` : '', sectionClass, spacingClass)}
    >
      <div className={joinClasses('mx-auto px-6', containerClass)}>
        <div className={alignClass}>
          {data.eyebrow ? <span className="bw-section-label mb-3 block">{data.eyebrow}</span> : null}
          {showTitle ? <h2 className={joinClasses('text-3xl font-semibold md:text-4xl', headingClass)}>{title}</h2> : null}
        </div>

        {isTownHubCosts ? (
          <div className={showTitle ? 'mt-8' : 'mt-0'}>
            <div className={joinClasses(contentPanelClass, 'p-0 md:p-0 overflow-hidden')}>
              <div className="px-6 pt-6 md:px-8 md:pt-8">
                {data.pre_table_text ? (
                  <p className={joinClasses('text-[16px] leading-[1.8] md:text-[17px]', bodyClass)}>{data.pre_table_text}</p>
                ) : null}
              </div>

              {costRows.length > 0 ? (
                <div className="mt-6 overflow-x-auto px-4 pb-2 md:px-6">
                  <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-xl border border-[#e6d7bc] bg-white text-left">
                    <thead>
                      <tr className="bg-[#f0e3cc] text-[#1E2F4A]">
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] md:text-sm">Service</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] md:text-sm">Typical Price</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] md:text-sm">Timeline</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] md:text-sm">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costRows.map((row, index) => (
                        <tr key={`${row.service}-${index}`} className="odd:bg-[#fffdf8] even:bg-white">
                          <td className="border-t border-[#eee1c9] px-4 py-3 text-sm font-semibold text-[#1E2F4A] md:text-[15px]">{row.service}</td>
                          <td className="border-t border-[#eee1c9] px-4 py-3 text-sm text-[#4f5f74] md:text-[15px]">{row.typical_price || '-'}</td>
                          <td className="border-t border-[#eee1c9] px-4 py-3 text-sm text-[#4f5f74] md:text-[15px]">{row.timeline || '-'}</td>
                          <td className="border-t border-[#eee1c9] px-4 py-3 text-sm text-[#4f5f74] md:text-[15px]">{row.notes || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {(data.post_table_text || costDrivers.length > 0) ? (
                <div className="px-6 pb-6 pt-6 md:px-8 md:pb-8">
                  {data.post_table_text ? (
                    <p className={joinClasses('text-[15px] leading-[1.8] md:text-[16px]', bodyClass)}>{data.post_table_text}</p>
                  ) : null}
                  {costDrivers.length > 0 ? (
                    <div className="mt-5 rounded-xl border border-[#eadcc3] bg-[#fdf8ed] p-4 md:p-5">
                      <h3 className="text-base font-semibold text-[#9b7644] md:text-lg">What Drives Cost</h3>
                      <ul className="mt-3 space-y-2">
                        {costDrivers.map((driver, index) => (
                          <li key={`${driver}-${index}`} className="flex items-start gap-2 text-sm leading-relaxed text-[#55677f] md:text-[15px]">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#c69a62]" />
                            <span>{driver}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ) : shouldRenderProcess ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {processItems.map((item, index) => (
              <article
                key={`${item.step}-${item.title}-${index}`}
                className={joinClasses(
                  'rounded-xl border p-5',
                  isDarkSurface ? 'border-white/20 bg-white/10' : 'border-[#dfd2bb] bg-white shadow-[0_8px_22px_rgba(30,47,74,0.07)]',
                )}
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#C89B5B]">Step {item.step}</p>
                <h3 className={joinClasses('mt-2 text-lg font-semibold leading-tight', headingClass)}>{item.title}</h3>
                <p className={joinClasses('mt-3 text-sm leading-relaxed', bodyClass)}>{item.description}</p>
              </article>
            ))}
          </div>
        ) : shouldRenderFaq ? (
          <div className={showTitle ? 'mt-7' : 'mt-0'}>
            <div className={contentPanelClass}>
              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <details
                    key={`${item.heading}-${index}`}
                    className={joinClasses(
                      'group rounded-lg border p-4',
                      isDarkSurface ? 'border-white/20 bg-white/5' : 'border-[#e6ddcc] bg-[#fcfaf6]',
                    )}
                    open={index === 0}
                  >
                    <summary className={joinClasses('cursor-pointer list-none pr-6 text-base font-semibold', headingClass)}>
                      {item.heading}
                    </summary>
                    <div className={joinClasses('mt-3 text-sm leading-relaxed md:text-base', bodyClass)}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                        {item.content}
                      </ReactMarkdown>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        ) : shouldRenderHeadingCards ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {headingBlocks.map((block, index) => {
              const link = extractFirstMarkdownLink(block.content);
              const preview = stripMarkdownLinks(block.content).slice(0, 240);

              return (
                <article
                  key={`${block.heading}-${index}`}
                  className={joinClasses(
                    'rounded-xl border p-5',
                    isDarkSurface ? 'border-white/20 bg-white/10' : 'border-[#e6ddcc] bg-white shadow-[0_8px_22px_rgba(30,47,74,0.07)]',
                  )}
                >
                  <h3 className={joinClasses('text-xl font-semibold', headingClass)}>{block.heading}</h3>
                  <p className={joinClasses('mt-3 text-sm leading-relaxed md:text-base', bodyClass)}>{preview}</p>
                  {link ? (
                    <Link
                      href={link.url}
                      className={joinClasses(
                        'mt-4 inline-flex items-center gap-2 text-sm font-semibold',
                        isDarkSurface ? 'text-[#D9B786] hover:text-[#e9cda5]' : 'text-[#C89B5B] hover:text-[#b98747]',
                      )}
                    >
                      {link.label || 'View project'}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : null}
                </article>
              );
            })}
          </div>
        ) : shouldRenderAsCards ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {cards.map((card, index) => (
              <article
                key={`${card.title}-${index}`}
                className={joinClasses(
                  'rounded-xl border p-5 shadow-[0_8px_22px_rgba(30,47,74,0.07)]',
                  isDarkSurface ? 'border-white/20 bg-white/10' : 'border-[#e6ddcc] bg-white',
                )}
              >
                <h3 className={joinClasses('text-xl font-semibold', headingClass)}>{card.title}</h3>
                <p className={joinClasses('mt-2', bodyClass)}>{renderInlineMarkdown(card.description, isDarkSurface)}</p>
                {card.linkUrl && card.linkLabel ? (
                  <Link
                    href={card.linkUrl}
                    className={joinClasses(
                      'mt-4 inline-flex items-center gap-2 text-sm font-semibold',
                      isDarkSurface ? 'text-[#D9B786] hover:text-[#e9cda5]' : 'text-[#C89B5B] hover:text-[#b98747]',
                    )}
                  >
                    {card.linkLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className={showTitle ? 'mt-7' : 'mt-0'}>
            <div className={contentPanelClass}>
              <div className={joinClasses('bw-richtext-content space-y-5', bodyClass)}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {rawContent}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        {data.cta?.label && data.cta?.url ? (
          <div className={`mt-10 ${alignClass}`}>
            <Link
              href={data.cta.url}
              className={joinClasses(
                'inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors',
                isDarkSurface ? 'bg-[#C89B5B] text-white hover:bg-[#b98747]' : 'bg-[#1E2F4A] text-white hover:bg-[#243a5c]',
              )}
            >
              {data.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default RichText;
