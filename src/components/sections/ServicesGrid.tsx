import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type ServiceItem = {
  title?: string;
  summary?: string;
  description?: string;
  image?: string | null;
  url?: string;
  cta_label?: string;
  price?: string;
  timeline?: string;
};

type Props = {
  data: {
    title?: string;
    headline?: string;
    subtitle?: string;
    subheadline?: string;
    cta?: {
      label: string;
      url: string;
    };
    items?: ServiceItem[];
    services?: ServiceItem[];
  };
};

export default function ServicesGrid({ data }: Props) {
  const title = data.title || data.headline || '';
  const subtitle = data.subtitle || data.subheadline;
  const items = (data.items || data.services || []).filter(Boolean);
  const cta = data.cta;
  const isServicesOverview = /our services/i.test(title);

  return (
  <section className="bg-[#F5F1E9] py-24 md:py-28">
    <div className="mx-auto max-w-[1240px] px-6">
      
      {/* HEADER */}
      <div className="mx-auto mb-20 max-w-3xl text-center">
        {isServicesOverview ? (
          <div className="mb-5 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#BC9155]">
            <span className="h-px w-4 bg-[#BC9155]" />
            What We Do
          </div>
        ) : null}
        <h2 className="font-serif text-[42px] font-bold leading-[1.08] tracking-[-0.025em] text-[#1E2F4A] md:text-[56px]">
          {isServicesOverview ? (
            <>
              Our <span className="text-[#C89B5B]">Services</span>
            </>
          ) : (
            title
          )}
        </h2>

        {subtitle && (
          <p className="mx-auto mt-6 max-w-[620px] text-[17px] leading-[1.7] text-[#5E6F86]">
            {subtitle}
          </p>
        )}
      </div>

      {/* GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.url || cta?.url || '#'}
            className="group flex flex-col overflow-hidden rounded-[8px] border-b-2 border-b-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-b-[#C89B5B] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]"
          >
            {/* IMAGE */}
            <div className="relative h-[280px] overflow-hidden">
              {item.image ? (
                <>
                  <img
                    src={item.image}
                    alt={item.title || 'Service'}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </>
              ) : (
                <div className="flex h-full items-center justify-center bg-[#1E2F4A]/10">
                  <span className="text-[#1E2F4A]/40">{item.title}</span>
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="flex flex-1 flex-col px-7 pb-8 pt-7">
              <h3 className="mb-3 font-serif text-[22px] font-bold leading-[1.2] text-[#1E2F4A] transition-colors duration-300 group-hover:text-[#C89B5B]">
                <span>{item.title}</span>
              </h3>

              <p className="mb-5 flex-1 text-[15px] leading-[1.7] text-[#5C677D]">
                {item.summary || item.description}
              </p>

              {'price' in item || 'timeline' in item ? (
                <div className="mb-5 flex flex-wrap gap-3">
                  {'price' in item && item.price ? <span className="inline-flex items-center rounded-full bg-[#BC91551A] px-3.5 py-1.5 text-[12px] font-semibold text-[#9A7340]">{item.price}</span> : null}
                  {'timeline' in item && item.timeline ? <span className="inline-flex items-center rounded-full bg-[#BC91551A] px-3.5 py-1.5 text-[12px] font-semibold text-[#9A7340]">{item.timeline}</span> : null}
                </div>
              ) : null}

              <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#C89B5B] transition-all group-hover:gap-2.5">
                {item.cta_label || 'Learn More'}
                <ArrowRight className="h-[14px] w-[14px]" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20 text-center">
        <button
          type="button"
          className="inline-flex min-w-[280px] items-center justify-center rounded-[8px] bg-[#C89B5B] px-10 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-md transition-all duration-300 hover:bg-[#B98747] hover:shadow-lg"
        >
          Book a Free Consultation
        </button>
      </div>

      {/* BOTTOM CTA */}
      {cta && (
        <div className="mt-20 text-center">
          <Link
            href={cta.url}
            className="inline-flex items-center justify-center rounded-md bg-[#C89B5B] px-10 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#B98747] hover:shadow-lg"
          >
            {cta.label}
          </Link>
        </div>
      )}
    </div>
  </section>
);
}
