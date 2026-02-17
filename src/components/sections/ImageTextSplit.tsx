'use client';

import { BookOpen } from 'lucide-react';

type Props = {
  data: {
    eyebrow?: string;
    title: string;
    content: string;
    image?: string | null;
    image_alt?: string;
    image_position?: 'left' | 'right' | 'top';
    layout?: 'split' | 'stacked';
    quote?: string | null;
  };
};

function resolveFallbackImage(isStacked: boolean, imagePosition: string | undefined) {
  if (isStacked) {
    return '/images/hero/hero-carousel-2.jpg';
  }

  if (imagePosition === 'right') {
    return '/images/hero/hero-carousel-4.png';
  }

  return '/images/hero/hero-carousel-final.png';
}

function stripOuterQuotes(text: string) {
  return text.replace(/^[\"'\u201C\u201D]+|[\"'\u201C\u201D]+$/g, '').trim();
}

export default function ImageTextSplit({ data }: Props) {
  const paragraphs = data.content.split('\n\n').filter(Boolean);
  const autoStacked = Boolean(data.quote && data.image_position !== 'right');
  const isStacked = data.layout === 'stacked' || data.image_position === 'top' || autoStacked;
  const imagePosition = data.image_position || 'left';
  const imageSrc = data.image || resolveFallbackImage(isStacked, imagePosition);
  const displayQuote = data.quote ? stripOuterQuotes(data.quote) : '';

  if (isStacked) {
    return (
      <section className="bg-[#f3f3f2] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-5xl text-center">
            <img
              src={imageSrc}
              alt={data.image_alt || data.title}
              className="mx-auto w-full rounded-lg border border-[#e5dfd2] object-cover shadow-[0_16px_40px_rgba(30,47,74,0.16)]"
            />

            {data.eyebrow ? (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#efe8dc] px-4 py-1.5 text-sm font-semibold text-[#C89B5B]">
                <BookOpen className="h-3.5 w-3.5" />
                {data.eyebrow}
              </div>
            ) : null}

            <h2 className="mt-5 text-[42px] font-semibold leading-[1.06] text-[#1E2F4A] md:text-[48px]">
              {data.title}
            </h2>

            <div className="mx-auto mt-5 max-w-3xl space-y-4 text-base leading-[1.75] text-[#4f5f78] md:text-[17px]">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {displayQuote ? (
              <blockquote className="mx-auto mt-8 max-w-2xl border-l-4 border-[#C89B5B] pl-4 text-left text-lg italic text-[#1E2F4A]">
                {displayQuote}
              </blockquote>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  const imageOnRight = imagePosition === 'right';

  return (
    <section className="bg-[#f3f3f2] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className={imageOnRight ? '' : 'order-2'}>
            {data.eyebrow ? (
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.1em] text-[#C89B5B]">{data.eyebrow}</p>
            ) : null}

            <h2 className="text-[40px] font-semibold leading-[1.06] text-[#1E2F4A] md:text-[46px]">
              {data.title}
            </h2>

            <div className="mt-5 space-y-4 text-base leading-[1.75] text-[#4f5f78] md:text-[17px]">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {displayQuote ? (
              <blockquote className="mt-7 border-l-4 border-[#C89B5B] pl-4 text-lg italic text-[#1E2F4A]">
                {displayQuote}
              </blockquote>
            ) : null}
          </div>

          <div className={imageOnRight ? '' : 'order-1'}>
            <img
              src={imageSrc}
              alt={data.image_alt || data.title}
              className="w-full rounded-lg border border-[#e5dfd2] object-cover shadow-[0_14px_30px_rgba(30,47,74,0.14)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
