'use client';

type Props = {
  data: {
    title: string;
    content: string;
    counties?: string[];
  };
};

export default function ServiceAreaText({ data }: Props) {
  return (
    <section className="bg-[#F5F3EF] py-16">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-0">
        <h2 className="text-3xl font-bold md:text-[36px]">{data.title}</h2>
        <p className="mt-4 text-[16px] text-[#6B7280]">{data.content}</p>

        {data.counties && data.counties.length > 0 ? (
          <div className="py-8 text-sm uppercase tracking-[0.08em] text-[#6B7280]">
            {data.counties.map((county, index) => (
              <span key={county}>
                {county}
                {index < data.counties!.length - 1 ? (
                  <span className="px-2 text-[#C89B5B]">|</span>
                ) : null}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
