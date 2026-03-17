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
  const isServicesHero = /services in connecticut/i.test(data.headline || '');
  const overlayOpacity = isServicesHero ? 0.58 : data.overlay?.opacity ?? 0.62;
  const primaryCta = data.cta_primary || (
    data.cta_label && data.cta_url
      ? { label: data.cta_label, url: data.cta_url }
      : null
  );

  return (
    <section className={`relative isolate overflow-hidden bg-[#1E2F4A] text-white ${isServicesHero ? 'min-h-[470px] py-0' : 'py-24 md:py-28'}`}>
      <img src={backgroundImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#0f1c30]" style={{ opacity: overlayOpacity }} />
      <div className={`absolute inset-0 ${isServicesHero ? 'bg-[linear-gradient(180deg,rgba(15,28,48,0.28)_0%,rgba(15,28,48,0.42)_35%,rgba(15,28,48,0.82)_100%)]' : 'bg-gradient-to-r from-[#0f1c30]/90 via-[#0f1c30]/55 to-[#0f1c30]/35'}`} />

      <div className={`relative mx-auto px-6 ${isServicesHero ? 'flex min-h-[470px] max-w-[1240px] flex-col items-center justify-center text-center' : 'max-w-7xl text-left'}`}>
        {isServicesHero ? (
          <ol className="mb-5 flex list-none items-center justify-center text-[12px] font-medium text-white/90">
            <li>Home</li>
            <li className="before:px-2.5 before:text-[#C89B5B] before:content-['›']">Services</li>
          </ol>
        ) : data.eyebrow ? (
          <span className="bw-section-label mb-4 block">{data.eyebrow}</span>
        ) : null}
        <h1 className={`${isServicesHero ? 'max-w-[980px] text-[44px] leading-[1.06] tracking-[-0.03em] md:text-[60px]' : 'max-w-4xl text-4xl leading-[1.04] md:text-[60px]'} font-semibold !text-white`}>
          {isServicesHero ? (
            <>
              Home Remodeling <span className="text-[#C89B5B]">Services in Connecticut</span>
            </>
          ) : (
            data.headline
          )}
          {data.highlight ? (
            <>
              <br />
              <span className="text-[#C89B5B]">{data.highlight}</span>
            </>
          ) : null}
        </h1>
        {data.subheadline ? (
          <p className={`${isServicesHero ? 'mt-4 max-w-[700px] text-[17px] leading-[1.68] text-white/87' : 'mt-6 max-w-[680px] text-base text-white/85 md:text-lg md:leading-relaxed'}`}>{data.subheadline}</p>
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
