'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Cta = {
  url: string;
  label: string;
};

type Props = {
  data: {
    title: string;
    subtitle?: string;
    primary_cta?: Cta | null;
    secondary_cta?: Cta | null;
    background_image?: string | null;
  };
};

function CtaLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const isExternal = href.startsWith('tel:') || href.startsWith('http://') || href.startsWith('https://');

  if (isExternal) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function splitTitleForAccent(title: string) {
  const text = title.trim();
  const accentMatch =
    text.match(/\bRenovations?\b/i) ||
    text.match(/\bRemodeling\b/i);

  if (accentMatch && accentMatch.index !== undefined) {
    const start = accentMatch.index;
    const end = start + accentMatch[0].length;
    return {
      before: text.slice(0, start),
      accent: text.slice(start, end),
      after: text.slice(end),
    };
  }

  const words = text.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    return {
      before: `${words[0]} `,
      accent: words[1],
      after: words.length > 2 ? ` ${words.slice(2).join(' ')}` : '',
    };
  }

  return {
    before: text,
    accent: '',
    after: '',
  };
}

export default function ServiceHero({ data }: Props) {
  const heroImage = data.background_image || '/images/hero/hero-carousel-2.jpg';
  const titleParts = splitTitleForAccent(data.title);

  return (
    <section className="relative w-full overflow-hidden h-[440px] sm:h-[470px] md:h-[560px] lg:h-[600px]">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 mx-auto h-full max-w-6xl px-6">
        <div className="flex h-full items-center">
          <div className="w-full max-w-[560px] text-left">
            <h1 className="font-serif text-[44px] font-bold leading-[1.05] text-white sm:text-[52px] md:text-[60px] lg:text-[64px]">
              {titleParts.before}
              {titleParts.accent ? (
                <span className="text-[#C89B5B]">{titleParts.accent}</span>
              ) : null}
              {titleParts.after}
            </h1>

            {data.subtitle ? (
              <p className="mt-5 max-w-[520px] text-base leading-[1.65] text-white sm:text-lg">
                {data.subtitle}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {data.primary_cta ? (
                <CtaLink
                  href={data.primary_cta.url}
                  className="inline-flex h-12 items-center justify-center rounded-md bg-[#C89B5B] px-6 text-xs font-bold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-90"
                >
                  {data.primary_cta.label}
                </CtaLink>
              ) : null}

              {data.secondary_cta ? (
                <CtaLink
                  href={data.secondary_cta.url}
                  className="inline-flex h-12 items-center justify-center rounded-md border border-white bg-black/15 px-6 text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-[#1E2F4A]"
                >
                  {data.secondary_cta.label}
                </CtaLink>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
