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
    <section className="bg-[#F5F5F5] py-24">
  <div className="mx-auto max-w-3xl px-6 text-center">
    {data.eyebrow && (
      <span className="mb-4 block font-mono text-s uppercase tracking-widest text-[#C89B5B]">
        {data.eyebrow}
      </span>
    )}

    {title && (
      <h2 className="mb-8 font-serif text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1E2F4A]">
        {title.split('Disappear?')[0]}
        <span className="text-[#C89B5B]"> Disappear?</span>
      </h2>
    )}

    <div className="space-y-6 text-lg leading-relaxed text-[#5e6f86]">
      {paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className={i === 2 ? 'font-medium text-[#1E2F4A]' : ''}
        >
          {renderInlineMarkdown(paragraph)}
        </p>
      ))}
    </div>

    {data.cta && (
      <div className="mt-12">
        <Link
          href={data.cta.url}
          className="group inline-flex items-center gap-2 font-serif text-xl uppercase tracking-widest text-[#C89B5B] transition-colors hover:text-[#b98747]"
        >
          {data.cta.label}
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    )}
  </div>
</section>
  );
}

export default RichText;

