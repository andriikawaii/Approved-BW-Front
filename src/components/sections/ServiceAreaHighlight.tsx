'use client';

type Props = {
  data: {
    headline: string;
    description?: string;
  };
};

export default function ServiceAreaHighlight({ data }: Props) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-0">
        <h2 className="text-3xl font-bold text-[#1E2F4A] md:text-[36px]">{data.headline}</h2>
        {data.description ? (
          <p className="mt-4 text-base leading-relaxed text-[#6B7280]">{data.description}</p>
        ) : null}
      </div>
    </section>
  );
}
