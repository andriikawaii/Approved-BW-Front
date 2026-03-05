'use client';

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
      <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#15263f]" style={{ opacity: data.overlay_opacity ?? 0.62 }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#15263f]/40 via-[#15263f]/55 to-[#15263f]/75" />

      <div className={`relative z-10 mx-auto max-w-5xl px-6 ${alignClass} ${isAboutHero ? 'py-20 md:py-24' : 'py-16 md:py-20'}`}>
        <h1 className={`${isAboutHero ? 'text-[52px] leading-[1.04] md:text-[66px]' : 'text-[42px] leading-[1.06] md:text-[52px]'} font-semibold !text-white`}>
          {renderHeadingWithGold(heading)}
        </h1>
        {data.subtitle ? (
          <p className={`${isAboutHero ? 'mx-auto mt-6 max-w-3xl text-base leading-[1.6] md:text-[18px]' : 'mx-auto mt-4 max-w-2xl text-base md:text-lg'} text-white/87`}>
            {data.subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
