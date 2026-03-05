type Props = {
  data: {
    title?: string;
    subtitle?: string | null;
    cover_image?: string | null;
    cover_alt?: string | null;
  };
};

export default function CaseStudyHeader({ data }: Props) {
  const title = data.title || 'Case Study';
  const subtitle = data.subtitle;

  return (
    <section className="relative overflow-hidden bg-[#1E2F4A] py-20 md:py-24">
      {data.cover_image ? (
        <div className="absolute inset-0">
          <img
            src={data.cover_image}
            alt={data.cover_alt || title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1E2F4A]/70" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,155,91,0.22),transparent_45%)]" />
      )}

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-4xl">
          <p className="bw-section-label">Case Study</p>
          <h1 className="mt-4 text-3xl font-bold !text-white md:text-5xl md:leading-tight">{title}</h1>
          {subtitle ? (
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
