interface Props {
  data: {
    headline: string;
    highlight?: string;
    subheadline?: string;
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
  const primaryCta = data.cta_primary || (
    data.cta_label && data.cta_url
      ? { label: data.cta_label, url: data.cta_url }
      : null
  );

  return (
    <section className="bg-[#1E2F4A] py-24 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="text-5xl font-semibold leading-[1.04] text-white md:text-[64px]">
          {data.headline}
          {data.highlight ? (
            <>
              <br />
              <span className="text-[#C89B5B]">{data.highlight}</span>
            </>
          ) : null}
        </h1>
        {data.subheadline ? (
          <p className="mx-auto mt-6 max-w-[600px] text-base text-white/85 md:text-lg md:leading-relaxed">{data.subheadline}</p>
        ) : null}
        {primaryCta || data.cta_secondary ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
