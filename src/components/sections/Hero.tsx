interface Props {
  data: {
    headline: string;
    subheadline: string;
    cta_label: string;
    cta_url: string;
  };
}

export const Hero = ({ data }: Props) => (
  <section className="bg-[#1E2B43] text-white py-24">
    <div className="container mx-auto text-center">
      <h1 className="text-5xl font-serif mb-4">{data.headline}</h1>
      <p className="text-xl mb-8">{data.subheadline}</p>
      <a href={data.cta_url} className="bg-[#BC9155] px-8 py-4 inline-block">
        {data.cta_label}
      </a>
    </div>
  </section>
);
