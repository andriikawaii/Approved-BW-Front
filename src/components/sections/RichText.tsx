import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

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
    variant?: string;
  };
};

type ServiceCard = {
  title: string;
  description: string;
  linkLabel?: string;
  linkUrl?: string;
};

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

function renderInlineMarkdown(text: string): ReactNode[] {
  const tokenRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const chunks = text.split(tokenRegex).filter(Boolean);

  return chunks.map((chunk, index) => {
    if (chunk.startsWith('**') && chunk.endsWith('**')) {
      return <strong key={index} className="font-semibold text-[#1E2F4A]">{chunk.slice(2, -2)}</strong>;
    }

    const linkMatch = chunk.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = /^https?:\/\//i.test(href);
      return (
        <Link
          key={index}
          href={href}
          className="font-semibold text-[#C89B5B] underline decoration-transparent transition-colors hover:decoration-[#C89B5B]"
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

export function RichText({ data }: RichTextProps) {
  const title = data.title || data.headline;
  const rawContent = data.content || data.body || '';
  const paragraphs = rawContent
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const cards = paragraphs
    .map(parseServiceCard)
    .filter((card): card is ServiceCard => Boolean(card));
  const shouldRenderAsCards = cards.length > 1 && cards.length === paragraphs.length;
  const alignClass = data.align === 'center' ? 'text-center' : data.align === 'right' ? 'text-right' : 'text-left';

  return (
    <section className={`${data.variant === 'light' ? 'bg-[#F5F3EF]' : 'bg-white'} py-24`}>
      <div className="mx-auto max-w-6xl px-6">
        {data.eyebrow && (
          <span className={`mb-3 block text-xs font-bold uppercase tracking-[0.1em] text-[#C89B5B] ${alignClass}`}>
            {data.eyebrow}
          </span>
        )}

        {title && (
          <h2 className={`mb-7 text-4xl font-semibold text-[#1E2F4A] md:text-[44px] ${alignClass}`}>
            {title}
          </h2>
        )}

        {shouldRenderAsCards ? (
          <div className="grid gap-6 md:grid-cols-2">
            {cards.map((card, i) => (
              <article
                key={`${card.title}-${i}`}
                className="group rounded-xl border border-[#e8decb] bg-[#f9f7f2] p-6 shadow-[0_10px_26px_rgba(30,47,74,0.08)] transition-shadow duration-300 hover:shadow-[0_16px_34px_rgba(30,47,74,0.14)]"
              >
                <h3 className="text-[24px] font-semibold text-[#1E2F4A]">{card.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#5e6f86]">{card.description}</p>
                {card.linkUrl && card.linkLabel ? (
                  <Link
                    href={card.linkUrl}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#C89B5B]"
                  >
                    {card.linkLabel}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className={`space-y-5 text-base leading-[1.8] text-[#5e6f86] md:text-[18px] ${alignClass}`}>
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{renderInlineMarkdown(paragraph)}</p>
            ))}
          </div>
        )}

        {data.cta && (
          <div className={`mt-8 ${alignClass}`}>
            <Link
              href={data.cta.url}
              className="inline-flex items-center justify-center rounded-md bg-[#C89B5B] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#b98747]"
            >
              {data.cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default RichText;

