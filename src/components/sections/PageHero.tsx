'use client';

import Image from 'next/image';

type Props = {
  data: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    background_image?: string | null;
    overlay_opacity?: number;
    alignment?: 'left' | 'center' | 'right';
    compact?: boolean;
  };
};

function sanitizeAboutHeading(input: string) {
  return input
    .replace(/builtwelle/gi, 'BuiltWell')
    .replace(/\s+/g, ' ')
    .trim();
}

function renderHeadingWithGold(heading: string) {
  const match = heading.match(/builtwell/i);
  if (!match || match.index === undefined) {
    return heading;
  }

  const start = match.index;
  const end = start + match[0].length;
  return (
    <>
      {heading.slice(0, start)}
      <span className="text-[#C89B5B]">{heading.slice(start, end)}</span>
      {heading.slice(end)}
    </>
  );
}

export default function PageHero({ data }: Props) {
  const isAboutHero = /about/i.test(data.eyebrow || '') || /about/i.test(data.title || '');
  const isServicesHero =
    /services/i.test(data.title || '') &&
    /connecticut/i.test(data.title || '');
  const heading = isAboutHero
    ? sanitizeAboutHeading((data.title || data.eyebrow || 'About BuiltWell').trim())
    : (data.title || '').trim();
  const alignClass = isAboutHero
    ? 'text-center'
    : data.alignment === 'left'
      ? 'text-left'
      : data.alignment === 'right'
        ? 'text-right'
        : 'text-center';
  const heroImage = data.background_image || '/images/hero/hero-carousel-2.jpg';

  return (
    <section className="relative isolate overflow-hidden bg-[#1E2F4A]">
      <Image src={heroImage} alt="" fill priority fetchPriority="high" sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[#15263f]" style={{ opacity: isServicesHero ? 0.66 : data.overlay_opacity ?? 0.62 }} />
      <div className={`absolute inset-0 ${isServicesHero ? 'bg-gradient-to-b from-[#15263f]/25 via-[#15263f]/48 to-[#15263f]/82' : 'bg-gradient-to-b from-[#15263f]/40 via-[#15263f]/55 to-[#15263f]/75'}`} />

      <div className={`relative z-10 mx-auto px-6 ${isServicesHero ? 'max-w-[980px] py-28 md:py-32' : 'max-w-5xl'} ${alignClass} ${isAboutHero ? 'py-20 md:py-24' : !isServicesHero ? 'py-16 md:py-20' : ''}`}>
        {isServicesHero ? (
          <div className="mb-6 flex items-center justify-center gap-2 text-[12px] font-semibold text-white/90">
            <span>Home</span>
            <span className="text-[#C89B5B]">›</span>
            <span>Services</span>
          </div>
        ) : null}
        <h1 className={`${isAboutHero ? 'text-[52px] leading-[1.04] md:text-[66px]' : isServicesHero ? 'text-[44px] leading-[1.06] tracking-[-0.03em] md:text-[66px]' : 'text-[42px] leading-[1.06] md:text-[52px]'} font-semibold !text-white`}>
          {renderHeadingWithGold(heading)}
        </h1>
        {data.subtitle ? (
          <p className={`${isAboutHero ? 'mx-auto mt-6 max-w-3xl text-base leading-[1.6] md:text-[18px]' : isServicesHero ? 'mx-auto mt-4 max-w-[720px] text-[17px] leading-[1.65]' : 'mx-auto mt-4 max-w-2xl text-base md:text-lg'} text-white/87`}>
            {data.subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
