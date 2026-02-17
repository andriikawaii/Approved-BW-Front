'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock3, ShieldCheck, Star } from 'lucide-react';

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
            role="img"
            aria-label={slide.alt || `Slide ${i + 1}`}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/65" />
          </div>
        ))
      ) : (
        <div className="absolute inset-0 bg-[#1E2F4A] bg-cover bg-center" style={{ backgroundImage: `url(${data.background_image || ''})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/65" />
        </div>
      )}

      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center text-white sm:min-h-[680px] md:min-h-[620px]">
        {(lineOne || lineTwo) && (
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.03] text-white md:text-[64px]">
            {lineOne}
            {lineTwo ? (
              <>
                <br />
                <span className="text-[#C89B5B]">{lineTwo}</span>
              </>
            ) : null}
          </h1>
        )}

        {subheadline && (
          <p className="mt-7 max-w-[600px] text-base leading-relaxed text-white/88 md:text-lg">
            {subheadline}
          </p>
        )}

        {(cta_primary || cta_secondary) && (
          <div className="mt-10 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {cta_primary && (
              <Link
                href={cta_primary.url}
                className="inline-flex items-center justify-center rounded-md bg-[#C89B5B] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#b98747]"
              >
                {cta_primary.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            )}

            {cta_secondary && (
              <Link
                href={cta_secondary.url}
                className="inline-flex items-center justify-center rounded-md border border-white px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
              >
                {cta_secondary.label}
              </Link>
            )}
          </div>
        )}

        {badges.length > 0 && (
          <div className="mt-10 w-full max-w-2xl rounded-md border border-white/20 bg-white/10 px-6 py-5 backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-5 text-center sm:grid-cols-3">
              {badges.slice(0, 3).map((badge, i) => {
                const Icon = getBadgeIcon(badge.label);
                return (
                  <div key={i} className="relative flex flex-col items-center justify-center">
                    {i > 0 ? (
                      <div className="absolute -left-2 hidden h-8 w-px bg-white/20 sm:block" />
                    ) : null}
                    <Icon className="mb-2 h-4 w-4 text-[#C89B5B]" />
                    {badge.value ? (
                      <div className="text-sm font-semibold text-white">{badge.value}</div>
                    ) : null}
                    <div className="text-[11px] uppercase tracking-[0.1em] text-white/75">
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
            className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/35 bg-black/15 p-2 text-white/70 transition hover:text-white md:block"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={next}
            className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/35 bg-black/15 p-2 text-white/70 transition hover:text-white md:block"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      ) : null}

      {slides.length > 1 ? (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${
                i === active ? 'w-8 bg-[#C89B5B]' : 'w-2 bg-white/55 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
