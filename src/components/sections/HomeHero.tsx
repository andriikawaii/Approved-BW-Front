'use client';

import Image from 'next/image';
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

type HomeHeroProps = {
  data: {
    headline?: string;
    subheadline?: string;
    eyebrow?: string;
    tagline?: string;
    supporting_line?: string;
    background_video?: string;
    background_poster?: string;
    cta_primary?: Cta;
    cta_secondary?: Cta;
    slides?: HeroSlide[];
    badges?: HeroBadge[];
  };
};

export default function HomeHero({ data }: HomeHeroProps) {
  const hasVideo = !!data.background_video;
  const heroEyebrow = 'SERVING FAIRFIELD & NEW HAVEN COUNTIES';
  const primaryLabel = 'Get Your Free Estimate';
  const renderTagline = () => {
    if (!data.tagline) {
      return null;
    }

    if (data.tagline.includes('Hire')) {
      const [beforeHire, ...afterHire] = data.tagline.split('Hire');

      return (
        <>
          {beforeHire}
          <span className="text-white">Hire</span>
          {afterHire.join('Hire')}
        </>
      );
    }

    return data.tagline;
  };

  return (
    <section className="relative isolate flex min-h-[92vh] items-center justify-center overflow-hidden bg-[#151E30] pt-16">
      {/* Poster image — LCP element, paints immediately */}
      {hasVideo && data.background_poster ? (
        <Image
          src={data.background_poster}
          alt="BuiltWell CT team and vehicles at a Connecticut home remodeling project"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[center_top] opacity-65"
        />
      ) : null}
      {/* Video background — loads in background, replaces poster once ready */}
      {hasVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src={data.background_video}
          poster={data.background_poster || undefined}
          className="absolute inset-0 h-[110%] w-full object-cover object-[center_top] opacity-65"
          aria-label="BuiltWell CT team and vehicles at a Connecticut home remodeling project"
        />
      ) : (
        /* Single primary hero image — LCP candidate, eager load, high priority */
        data.slides?.filter((s) => s.image).slice(0, 1).map((slide, index) => (
          <Image
            key={`${slide.image}-${index}`}
            src={slide.image!}
            alt={slide.alt || 'BuiltWell CT home remodeling in Connecticut'}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover opacity-[0.45]"
          />
        ))
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,30,48,0.25)_0%,rgba(21,30,48,0.5)_60%,rgba(21,30,48,0.95)_100%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-[60px] pt-10 text-center md:px-8">
        <div className="mx-auto max-w-[1080px] text-white">
          {/* Eyebrow badge */}
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#BC9155]/50 bg-[rgba(21,30,48,0.7)] px-[26px] py-3 text-[11px] font-bold uppercase tracking-[1.5px] text-white [backdrop-filter:blur(12px)] [-webkit-backdrop-filter:blur(12px)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#BC9155]" />
              {heroEyebrow}
            </p>

          {/* Headline */}
          {data.headline ? (
            <h1 className="mb-5 text-[clamp(38px,4.2vw,56px)] font-bold leading-[1.05] tracking-[-0.5px] !text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.3)]">
              {data.headline.includes('Connecticut') ? (
                <>
                  {data.headline.split('Connecticut')[0]}
                  <span className="!text-[#BC9155]">Connecticut</span>
                  {data.headline.split('Connecticut')[1]}
                </>
              ) : (
                data.headline
              )}
            </h1>
          ) : null}

          {/* Tagline */}
          {data.tagline ? (
            <p className="mb-8 mt-4 font-serif text-[clamp(20px,2.2vw,28px)] italic text-[#BC9155]">
              {renderTagline()}
            </p>
          ) : null}

          {/* CTA buttons */}
          {(data.cta_primary || data.cta_secondary) ? (
            <div className="mt-3 flex flex-col items-stretch justify-center gap-3 md:flex-row md:flex-wrap md:items-center md:gap-4">
              {data.cta_primary ? (
                <Link
                  href={data.cta_primary.url}
                  className="inline-flex min-h-[64px] w-full max-w-full items-center justify-center rounded-[8px] bg-[#BC9155] px-8 text-[16px] font-semibold text-white transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-[#a57d48] md:w-[340px]"
                >
                  {primaryLabel}
                  <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : null}
              {data.cta_secondary ? (
                data.cta_secondary.url.startsWith('tel:') ? (
                  <a
                    href={data.cta_secondary.url}
                    className="inline-flex min-h-[64px] w-full max-w-full items-center justify-center rounded-[8px] border border-white/25 px-8 text-[16px] font-medium text-white transition-[border-color,color] duration-200 hover:border-[#BC9155] hover:text-[#BC9155] md:w-[340px]"
                  >
                    {data.cta_secondary.label}
                  </a>
                ) : (
                  <Link
                    href={data.cta_secondary.url}
                    className="inline-flex min-h-[64px] w-full max-w-full items-center justify-center rounded-[8px] border border-white/25 px-8 text-[16px] font-medium text-white transition-[border-color,color] duration-200 hover:border-[#BC9155] hover:text-[#BC9155] md:w-[340px]"
                  >
                    {data.cta_secondary.label}
                  </Link>
                )
              ) : null}
            </div>
          ) : null}

          {/* Supporting line */}
          {data.supporting_line ? (
            <p className="mt-[18px] text-[17px] italic leading-[1.5] text-white/88">
              {data.supporting_line}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
