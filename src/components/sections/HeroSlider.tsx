'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
    subheadline?: string;
    cta_primary?: { label: string; url: string };
    cta_secondary?: { label: string; url: string };
    slides?: Slide[];
    badges?: Badge[];
  };
};

export default function HeroSlider({ data }: HeroProps) {
  const { headline, subheadline, cta_primary, cta_secondary } = data;

  const slides: Slide[] = data.slides ?? [];
  const badges: Badge[] = data.badges ?? [];

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
    <section className="relative h-[85svh] min-h-[620px] w-full overflow-hidden md:h-[60vh] md:min-h-[520px]">
      {slides.length > 0 ? (
        slides.map((slide, i) => (
          <div
            key={slide.image}
            role="img"
            aria-label={slide.alt || `Slide ${i + 1}`}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))
      ) : (
        <div className="absolute inset-0 bg-[#1A2B45]" />
      )}

      <div className="relative z-10 flex h-full flex-col items-center justify-start px-4 pt-16 pb-16 text-center text-white md:justify-center md:pt-0 md:pb-0">
        {headline && (
          <h1 className="font-serif text-4xl font-semibold md:text-6xl">
            {headline}
          </h1>
        )}

        {subheadline && (
          <p className="mt-6 max-w-2xl text-base text-white/90 md:text-lg">
            {subheadline}
          </p>
        )}

        {(cta_primary || cta_secondary) && (
          <div className="mt-8 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {cta_primary && (
              <Link
                href={cta_primary.url}
                className="inline-flex h-[60px] w-full items-center justify-center bg-[#B07C3C] px-8 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#C68E4D] sm:w-auto"
              >
                {cta_primary.label}
              </Link>
            )}

            {cta_secondary && (
              <Link
                href={cta_secondary.url}
                className="inline-flex h-[60px] w-full items-center justify-center border border-white/80 px-8 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10 sm:w-auto"
              >
                {cta_secondary.label}
              </Link>
            )}
          </div>
        )}

        {slides[active]?.caption && (
          <p className="absolute bottom-20 left-1/2 z-20 -translate-x-1/2 text-sm text-white/80">
            {slides[active].caption}
          </p>
        )}

        {badges.length > 0 && (
          <div className="mt-8 flex w-full flex-col items-center gap-6 md:hidden">
            {badges.map((badge, i) => (
              <div key={i} className="text-center">
                {badge.value && (
                  <div className="text-xl font-semibold">{badge.value}</div>
                )}
                <div className="text-[11px] uppercase tracking-widest text-white/70">
                  {badge.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 text-white/60 transition hover:text-white md:block"
            aria-label="Previous slide"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={next}
            className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 text-white/60 transition hover:text-white md:block"
            aria-label="Next slide"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {badges.length > 0 && (
        <div className="absolute bottom-16 left-1/2 z-20 hidden w-full -translate-x-1/2 justify-center px-4 md:flex">
          <div className="flex items-center gap-10 text-white">
            {badges.map((badge, i) => (
              <div key={i} className="flex items-center gap-10">
                {i > 0 && <div className="h-10 w-px bg-white/20" />}
                <div className="text-center">
                  {badge.value && (
                    <div className="text-2xl font-semibold">{badge.value}</div>
                  )}
                  <div className="text-[11px] uppercase tracking-widest text-white/70">
                    {badge.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${
                i === active
                  ? 'w-8 bg-[#C68E4D]'
                  : 'w-2 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
