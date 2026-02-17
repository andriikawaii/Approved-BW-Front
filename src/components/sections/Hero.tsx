interface Props {
  data: {
    headline: string;
    highlight?: string;
    subheadline: string;
    cta_label: string;
    cta_url: string;
  };
}

export default function Hero({ data }: Props) {
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
        <p className="mx-auto mt-6 max-w-[600px] text-base text-white/85 md:text-lg md:leading-relaxed">{data.subheadline}</p>
        <a href={data.cta_url} className="mt-10 inline-flex items-center justify-center rounded-md bg-[#C89B5B] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#b98747]">
          {data.cta_label}
        </a>
      </div>
    </section>
  );
}
