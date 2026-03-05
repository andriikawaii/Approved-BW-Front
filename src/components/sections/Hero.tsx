interface Props {
  data: {
    eyebrow?: string;
    headline: string;
    highlight?: string;
    subheadline?: string;
    background_image?: string | null;
    overlay?: { opacity?: number };
    cta_label?: string;
    cta_url?: string;
    cta_primary?: {
      label: string;
      url: string;
    };
    cta_secondary?: {
      label: string;
      url: string;
    };
  };
}

export default function Hero({ data }: Props) {
  const backgroundImage = data.background_image || '/images/hero/hero-carousel-final.png';
  const overlayOpacity = data.overlay?.opacity ?? 0.62;
  const primaryCta = data.cta_primary || (
    data.cta_label && data.cta_url
      ? { label: data.cta_label, url: data.cta_url }
      : null
  );

  return (
    <section className="relative isolate overflow-hidden bg-[#1E2F4A] py-24 text-white md:py-28">
      <img src={backgroundImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#0f1c30]" style={{ opacity: overlayOpacity }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1c30]/90 via-[#0f1c30]/55 to-[#0f1c30]/35" />

      <div className="relative mx-auto max-w-7xl px-6 text-left">
        {data.eyebrow ? (
          <span className="bw-section-label mb-4 block">{data.eyebrow}</span>
        ) : null}
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.04] !text-white md:text-[60px]">
          {data.headline}
          {data.highlight ? (
            <>
              <br />
              <span className="text-[#C89B5B]">{data.highlight}</span>
            </>
          ) : null}
        </h1>
        {data.subheadline ? (
          <p className="mt-6 max-w-[680px] text-base text-white/85 md:text-lg md:leading-relaxed">{data.subheadline}</p>
        ) : null}
        {primaryCta || data.cta_secondary ? (
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            {primaryCta ? (
              <a href={primaryCta.url} className="inline-flex items-center justify-center rounded-md bg-[#C89B5B] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#b98747]">
                {primaryCta.label}
              </a>
            ) : null}
            {data.cta_secondary ? (
              <a href={data.cta_secondary.url} className="inline-flex items-center justify-center rounded-md border border-white px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10">
                {data.cta_secondary.label}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
