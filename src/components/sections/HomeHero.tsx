'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type HeroSlide = {
  image?: string;
  alt?: string;
  caption?: string | null;
};

type HeroBadge = {
  label?: string;
  value?: string;
};

type Cta = {
  label: string;
  url: string;
};

type PhoneItem = {
  label: string;
  number: string;
};

type HomeHeroProps = {
  data: {
    headline?: string;
    subheadline?: string;
    cta_primary?: Cta;
    cta_secondary?: Cta;
    slides?: HeroSlide[];
    badges?: HeroBadge[];
  };
  phones: PhoneItem[];
};

function splitHeadline(headline?: string): { lead: string; accent: string } {
  const text = (headline ?? '').trim();
  if (!text) {
    return { lead: '', accent: '' };
  }

  if (text.includes(':')) {
    const [lead, ...rest] = text.split(':');
    return {
      lead: lead.trim(),
      accent: rest.join(':').trim(),
    };
  }

  const words = text.split(/\s+/).filter(Boolean);
  if (words.length > 5) {
    return {
      lead: words.slice(0, -3).join(' '),
      accent: words.slice(-3).join(' '),
    };
  }

  return { lead: text, accent: '' };
}

function buildBadgeText(badge?: HeroBadge): string | null {
  if (!badge) {
    return null;
  }

  if (badge.value && badge.label) {
    return `${badge.label} ${badge.value}`;
  }

  return badge.value || badge.label || null;
}

export default function HomeHero({ data, phones }: HomeHeroProps) {
  const slides = data.slides?.filter((slide) => slide.image) ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const { lead, accent } = splitHeadline(data.headline);
  const metaItems = Array.from(
    new Set(
      [
        ...(data.badges ?? []).slice(0, 3).map((badge) => buildBadgeText(badge) || ''),
        ...phones.map((phone) => `${phone.label}: ${phone.number}`),
      ].filter(Boolean)
    )
  );

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current >= slides.length - 1 ? 0 : current + 1));
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  const activeSlide = slides[activeIndex];
  const pillText = buildBadgeText(data.badges?.[0]);

  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#1E2B43_0%,#151E30_100%)] pt-20 text-white">
      {slides.map((slide, index) => (
        <div
          key={`${slide.image}-${index}`}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === activeIndex ? 'opacity-[0.18]' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
          aria-hidden="true"
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,30,48,0.38)_0%,rgba(21,30,48,0.82)_100%)]" />

      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-20 lg:py-24">
        <div className="max-w-2xl">
          {pillText ? (
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#BC9155]/30 bg-[#BC9155]/15 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#BC9155]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#BC9155]" />
              {pillText}
            </div>
          ) : null}

          {(lead || accent) ? (
            <h1 className="text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.06] tracking-[-0.04em] text-white">
              {lead}
              {accent ? (
                <>
                  {lead ? ': ' : ''}
                  <span className="text-[#BC9155]">{accent}</span>
                </>
              ) : null}
            </h1>
          ) : null}

          {data.subheadline ? (
            <p className="mt-6 max-w-xl text-[1.02rem] leading-8 text-white/74 lg:text-[1.08rem]">
              {data.subheadline}
            </p>
          ) : null}

          {(data.cta_primary || data.cta_secondary) ? (
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              {data.cta_primary ? (
                <Link
                  href={data.cta_primary.url}
                  className="inline-flex items-center justify-center rounded-sm bg-[#BC9155] px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48]"
                >
                  {data.cta_primary.label}
                </Link>
              ) : null}
              {data.cta_secondary ? (
                <Link
                  href={data.cta_secondary.url}
                  className="inline-flex items-center justify-center rounded-sm border border-white/25 px-7 py-4 text-sm font-medium text-white transition-colors hover:border-[#BC9155] hover:text-[#BC9155]"
                >
                  {data.cta_secondary.label}
                </Link>
              ) : null}
            </div>
          ) : null}

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/55">
            {metaItems.map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="text-[#BC9155]">+</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.42)]">
            {activeSlide?.image ? (
              <img
                src={activeSlide.image}
                alt={activeSlide.alt || data.headline || 'BuiltWell CT project'}
                className="h-[520px] w-full object-cover"
              />
            ) : (
              <div className="h-[520px] w-full bg-white/10" />
            )}
            <div className="bg-[linear-gradient(180deg,rgba(30,43,67,0.18)_0%,rgba(30,43,67,0.96)_100%)] px-7 py-6">
              {activeSlide?.alt ? (
                <p className="text-sm font-medium text-white">{activeSlide.alt}</p>
              ) : null}
              {activeSlide?.caption ? (
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[#BC9155]">{activeSlide.caption}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {slides.length > 1 ? (
        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 gap-3 lg:flex">
          {slides.map((slide, index) => (
            <button
              key={`${slide.image}-${index}`}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-3 rounded-full transition-all ${
                index === activeIndex ? 'w-8 bg-[#BC9155]' : 'w-3 bg-white/45 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
