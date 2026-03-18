'use client';

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
    <section className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#151E30] pt-16 md:min-h-[92vh]">
      {/* Video background */}
      {hasVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          src={data.background_video}
          poster={data.background_poster || undefined}
          className="absolute inset-0 h-[110%] w-full object-cover object-[center_top] opacity-65"
          aria-label="BuiltWell CT team and vehicles at a Connecticut home remodeling project"
        />
      ) : (
        /* Fallback: slide background images */
        data.slides?.filter((s) => s.image).map((slide, index) => (
          <div
            key={`${slide.image}-${index}`}
            className="absolute inset-0 bg-cover bg-center opacity-[0.18]"
            style={{ backgroundImage: `url(${slide.image})` }}
            aria-hidden="true"
          />
        ))
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,30,48,0.25)_0%,rgba(21,30,48,0.5)_60%,rgba(21,30,48,0.95)_100%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-12 pt-12 text-center md:px-8 md:pb-[60px] md:pt-10">
        <div className="mx-auto max-w-[1080px] text-white">
          {/* Eyebrow badge */}
          {data.eyebrow ? (
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#BC9155]/30 bg-[#BC9155]/15 px-[18px] py-2.5 text-[10px] font-semibold uppercase tracking-[1px] text-[#BC9155] md:mb-6 md:px-6 md:py-3 md:text-[11px] md:tracking-[1.5px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#BC9155]" />
              {data.eyebrow}
            </p>
          ) : null}

          {/* Headline */}
          {data.headline ? (
            <h1 className="mb-3 text-[clamp(28px,7vw,56px)] font-bold leading-[1.1] tracking-[-0.5px] !text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.3)] md:leading-[1.05]">
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
            <p className="mb-4 font-serif text-[clamp(18px,4vw,28px)] italic text-[#BC9155] md:mb-5">
              {renderTagline()}
            </p>
          ) : null}

          {/* Subheadline */}
          {data.subheadline ? (
            <p className="mx-auto mb-7 max-w-[680px] text-[15px] leading-[1.65] text-white/72 md:mb-8 md:leading-[1.5]">
              {data.subheadline}
            </p>
          ) : null}

          {/* CTA buttons */}
          {(data.cta_primary || data.cta_secondary) ? (
            <div className="flex flex-col items-stretch justify-center gap-3 md:flex-row md:flex-wrap md:items-center md:gap-4">
              {data.cta_primary ? (
                <Link
                  href={data.cta_primary.url}
                  className="inline-flex min-h-[52px] w-full max-w-full items-center justify-center rounded-lg bg-[#BC9155] px-6 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48] md:min-h-[64px] md:w-[340px] md:px-8 md:text-base"
                >
                  {data.cta_primary.label}
                  <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : null}
              {data.cta_secondary ? (
                data.cta_secondary.url.startsWith('tel:') ? (
                  <a
                    href={data.cta_secondary.url}
                    className="inline-flex min-h-[52px] w-full max-w-full items-center justify-center rounded-lg border border-white/25 px-6 text-[15px] font-medium text-white transition-colors hover:border-[#BC9155] hover:text-[#BC9155] md:min-h-[64px] md:w-[340px] md:px-8 md:text-base"
                  >
                    {data.cta_secondary.label}
                  </a>
                ) : (
                  <Link
                    href={data.cta_secondary.url}
                    className="inline-flex min-h-[52px] w-full max-w-full items-center justify-center rounded-lg border border-white/25 px-6 text-[15px] font-medium text-white transition-colors hover:border-[#BC9155] hover:text-[#BC9155] md:min-h-[64px] md:w-[340px] md:px-8 md:text-base"
                  >
                    {data.cta_secondary.label}
                  </Link>
                )
              ) : null}
            </div>
          ) : null}

          {/* Supporting line */}
          {data.supporting_line ? (
            <p className="mt-3.5 text-[14px] italic leading-[1.5] text-white/88 md:mt-[18px] md:text-[17px]">
              {data.supporting_line}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
