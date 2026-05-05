'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock3, ShieldCheck, Star } from 'lucide-react';

type Slide = {
  image: string;
  alt?: string;
  caption?: string;
};

type Badge = {
  label: string;
  value?: string;
};

type HeroProps = {
  data: {
    headline?: string;
    headline_highlight?: string;
    highlight?: string;
    subheadline?: string;
    cta_primary?: { label: string; url: string };
    cta_secondary?: { label: string; url: string };
    slides?: Slide[];
    badges?: Badge[];
    background_image?: string;
  };
};

function resolveHeadlineLines(
  headline?: string,
  explicitHighlight?: string
): { lineOne: string; lineTwo: string } {
  const text = (headline ?? '').replace(/\r/g, '').trim();
  const highlight = (explicitHighlight ?? '').trim();

  if (!text) {
    return { lineOne: '', lineTwo: '' };
  }

  if (highlight) {
    if (text.includes(highlight)) {
      const lineOne = text.replace(highlight, '').replace(/\s+/g, ' ').trim();
      return { lineOne, lineTwo: highlight };
    }
    return { lineOne: text, lineTwo: highlight };
  }

  if (text.includes('\n')) {
    const [first, ...rest] = text.split('\n').map((part) => part.trim()).filter(Boolean);
    return { lineOne: first ?? text, lineTwo: rest.join(' ') };
  }

  if (text.includes('|')) {
    const [first, ...rest] = text.split('|').map((part) => part.trim()).filter(Boolean);
    return { lineOne: first ?? text, lineTwo: rest.join(' ') };
  }

  const words = text.split(/\s+/).filter(Boolean);
  if (words.length > 4) {
    const splitPoint = Math.max(words.length - 2, 1);
    return {
      lineOne: words.slice(0, splitPoint).join(' '),
      lineTwo: words.slice(splitPoint).join(' '),
    };
  }

  return { lineOne: text, lineTwo: '' };
}

function getBadgeIcon(label: string) {
  const normalized = label.toLowerCase();
  if (normalized.includes('rating') || normalized.includes('google') || normalized.includes('star')) {
    return Star;
  }
  if (normalized.includes('bbb') || normalized.includes('licensed') || normalized.includes('license')) {
    return ShieldCheck;
  }
  return Clock3;
}

export default function HeroSlider({ data }: HeroProps) {
  const { headline, subheadline, cta_primary, cta_secondary } = data;

  const slides: Slide[] = data.slides ?? [];
  const badges: Badge[] = data.badges ?? [];
  const { lineOne, lineTwo } = resolveHeadlineLines(
    headline,
    data.headline_highlight || data.highlight
  );

  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((i) => (i === 0 ? Math.max(slides.length - 1, 0) : i - 1));
  const next = () =>
    setActive((i) => (i >= slides.length - 1 ? 0 : i + 1));

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i >= slides.length - 1 ? 0 : i + 1));
    }, 7000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative isolate w-full overflow-hidden">
      {slides.length > 0 ? (
        slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image src={slide.image} alt={slide.alt || ''} fill sizes="100vw" className="object-cover object-top" priority={i === 0} fetchPriority={i === 0 ? 'high' : 'auto'} />
            <div className="absolute inset-0 bg-[#1A2B45]/40" />
          </div>
        ))
      ) : (
        <div className="absolute inset-0 bg-[#1A2B45]">
          {data.background_image ? <Image src={data.background_image} alt="" fill sizes="100vw" className="object-cover object-top" priority fetchPriority="high" /> : null}
          <div className="absolute inset-0 bg-[#1A2B45]/40" />
        </div>
      )}

      <div className="relative z-10 mx-auto flex min-h-[600px] max-w-7xl flex-col items-center justify-center px-6 pb-12 pt-20 text-center text-white">
        {(lineOne || lineTwo) && (
          <h1 className="max-w-5xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            {lineOne}
            {lineTwo ? (
              <>
                <br />
                <span className="text-[#C68E4D]">{lineTwo}</span>
              </>
            ) : null}
          </h1>
        )}

        {subheadline && (
          <p className="mx-auto mt-6 max-w-2xl font-sans text-xl font-light leading-relaxed text-gray-100">
            {subheadline}
          </p>
        )}

        {(cta_primary || cta_secondary) && (
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
            {cta_primary && (
              <Link
                href={cta_primary.url}
                className="inline-flex h-[60px] min-w-[280px] items-center justify-center rounded-md bg-[#C68E4D] px-8 py-4 font-sans text-base font-bold uppercase tracking-wider text-white shadow-md transition-[background-color] hover:bg-[#B07C3C]"
              >
                {cta_primary.label}
              </Link>
            )}

            {cta_secondary && (
              <Link
                href={cta_secondary.url}
                className="inline-flex h-[60px] min-w-[280px] items-center justify-center whitespace-nowrap rounded-md border-2 border-white/20 px-8 py-4 font-sans text-sm font-bold uppercase tracking-wider text-white transition-[background-color] hover:bg-white/10 md:text-base"
              >
                {cta_secondary.label}
              </Link>
            )}
          </div>
        )}

        {badges.length > 0 && (
          <div className="pt-12 text-white opacity-90">
            <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
              {badges.slice(0, 3).map((badge, i) => {
                const Icon = getBadgeIcon(badge.label);
                return (
                  <div key={i} className="relative flex flex-col items-center justify-center gap-1">
                    {i > 0 ? (
                      <div className="absolute -left-6 hidden h-8 w-px bg-white/30 md:block" />
                    ) : null}
                    
                    {badge.value ? (
                      <div className="font-sans text-3xl font-bold tracking-tight text-white">{badge.value}</div>
                    ) : null}
                    <div className="font-sans text-xs font-bold uppercase tracking-widest text-white/80">
                      {badge.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {slides[active]?.caption ? (
          <p className="mt-5 text-sm text-white/75">{slides[active].caption}</p>
        ) : null}
      </div>

      {slides.length > 1 ? (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 p-2 text-white/50 transition-colors hover:text-white md:block"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="h-10 w-10">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 p-2 text-white/50 transition-colors hover:text-white md:block"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="h-10 w-10">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      ) : null}

      {slides.length > 1 ? (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-opacity duration-300 ${
                i === active ? 'h-3 w-8 bg-[#C68E4D] opacity-100' : 'h-3 w-3 bg-white/50 opacity-60 hover:opacity-100 hover:bg-white'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
