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

  return (
    <section className="relative isolate flex min-h-[92vh] items-center justify-center overflow-hidden bg-[#151E30] pt-16">
      {/* Video background */}
      {hasVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={data.background_poster || undefined}
          className="absolute inset-0 h-[110%] w-full object-cover object-[center_top] opacity-65"
          aria-label="BuiltWell CT team and vehicles at a Connecticut home remodeling project"
        >
          <source src={`${data.background_video}.webm`} type="video/webm" />
          <source src={`${data.background_video}.mp4`} type="video/mp4" />
        </video>
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
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-8 py-10 text-center">
        <div className="mx-auto max-w-[1080px] text-white">
          {/* Eyebrow badge */}
          {data.eyebrow ? (
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#BC9155]/30 bg-[#BC9155]/15 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#BC9155]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#BC9155]" />
              {data.eyebrow}
            </p>
          ) : null}

          {/* Headline */}
          {data.headline ? (
            <h1 className="mb-3 text-[clamp(38px,4.2vw,56px)] font-bold leading-[1.05] tracking-[-0.5px] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.3)]">
              {data.headline.includes('Connecticut') ? (
                <>
                  {data.headline.split('Connecticut')[0]}
                  <span className="text-[#BC9155]">Connecticut</span>
                  {data.headline.split('Connecticut')[1]}
                </>
              ) : (
                data.headline
              )}
            </h1>
          ) : null}

          {/* Tagline */}
          {data.tagline ? (
            <p className="mb-5 font-serif text-[clamp(20px,2.2vw,28px)] italic text-[#BC9155]">
              {data.tagline}
            </p>
          ) : null}

          {/* Subheadline */}
          {data.subheadline ? (
            <p className="mx-auto mb-8 max-w-[680px] text-[15px] leading-relaxed text-white/72">
              {data.subheadline}
            </p>
          ) : null}

          {/* CTA buttons */}
          {(data.cta_primary || data.cta_secondary) ? (
            <div className="flex flex-wrap justify-center gap-4">
              {data.cta_primary ? (
                <Link
                  href={data.cta_primary.url}
                  className="inline-flex min-h-[64px] w-[340px] max-w-full items-center justify-center rounded-lg bg-[#BC9155] px-8 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48]"
                >
                  {data.cta_primary.label}
                  <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : null}
              {data.cta_secondary ? (
                <Link
                  href={data.cta_secondary.url}
                  className="inline-flex min-h-[64px] w-[340px] max-w-full items-center justify-center rounded-lg border border-white/25 px-8 text-base font-medium text-white transition-colors hover:border-[#BC9155] hover:text-[#BC9155]"
                >
                  {data.cta_secondary.label}
                </Link>
              ) : null}
            </div>
          ) : null}

          {/* Supporting line */}
          {data.supporting_line ? (
            <p className="mt-5 text-[17px] italic leading-relaxed text-white/88">
              {data.supporting_line}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
