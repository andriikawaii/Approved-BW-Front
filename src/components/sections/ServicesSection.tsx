'use client';

import Link from 'next/link';

type ServiceItem = {
  title: string;
  description: string;
  image: string;
};

type ServicesSectionProps = {
  data: {
    title: string;
    subtitle: string;
    cta: {
      label: string;
      url: string;
    };
    items: ServiceItem[];
  };
};

export default function ServicesSection({ data }: ServicesSectionProps) {
  const { title, subtitle, items, cta } = data;

  return (
    <section className="bg-[#F9FAFB] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl text-[#1E2F45] md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            {subtitle}
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-[0_6px_18px_rgba(15,31,51,0.08)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[0_22px_45px_rgba(15,31,51,0.16)]">
              {/* IMAGE */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1A2B4533]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* overlay remove on hover */}
                <div className="absolute inset-0 bg-[#1A2B4533] transition-opacity duration-300 group-hover:opacity-0" />
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-2xl text-[#1E2F45] transition-colors duration-300 group-hover:text-[#C68E4D]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>

                {/* CTA */}
                <Link
                  href={cta.url}
                  className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold uppercase tracking-wide text-[#C68E4D] transition-colors duration-300 hover:text -[#1A2B45]"
                >
                  Book Consultation
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-20 text-center">
        <Link
            href={cta.url}
            className="inline-flex h-[60px] items-center justify-center bg-[#C68E4D] px-10 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#1A2B45] cursor-pointer"
            >
            {cta.label}
        </Link>
        </div>
      </div>
    </section>
  );
}
