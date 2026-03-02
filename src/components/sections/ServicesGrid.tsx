import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type ServiceItem = {
  title?: string;
  summary?: string;
  description?: string;
  image?: string | null;
  url?: string;
  cta_label?: string;
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

  return (
  <section className="bg-[#F5F3EF] py-24">
    <div className="mx-auto max-w-7xl px-6">
      
      {/* HEADER */}
      <div className="mb-20 text-center max-w-3xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1E2F4A] tracking-tight">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-6 text-lg leading-relaxed text-[#5E6F86]">
            {subtitle}
          </p>
        )}
      </div>

      {/* GRID */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.url || cta?.url || '#'}
            className="group flex flex-col overflow-hidden rounded-xl border border-[#E8DECB] bg-white shadow-[0_10px_26px_rgba(30,47,74,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(30,47,74,0.15)]"
          >
            {/* IMAGE */}
            <div className="relative h-64 overflow-hidden">
              {item.image ? (
                <>
                  <div className="absolute inset-0 bg-[#1E2F4A]/20 transition-opacity duration-300 group-hover:opacity-0 z-10"></div>
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
            <div className="flex flex-1 flex-col p-8">
              <h3 className="font-serif text-2xl font-bold text-[#1E2F4A] mb-4 transition-colors duration-300 group-hover:text-[#C89B5B]">
                {item.title}
              </h3>

              <p className="text-[16px] leading-relaxed text-[#5E6F86] flex-1">
                {item.summary || item.description}
              </p>

              <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#C89B5B] transition-colors group-hover:text-[#1E2F4A]">
                {item.cta_label || 'Book Consultation'}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20 text-center">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-[#C89B5B] px-10 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#B98747] hover:shadow-lg min-w-[280px]"
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
