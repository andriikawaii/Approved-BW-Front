'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type ServiceItem = {
  title: string;
  description: string;
  image: string;
  image_alt?: string | null;
  url?: string;
  cta_label?: string;
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
    <section className="bg-[#F5F3EF] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-semibold text-[#1E2F4A] md:text-[44px]">{title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-[#6B7280] md:text-lg">{subtitle}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const href = item.url || cta.url;
            const ctaLabel = item.cta_label || cta.label;

            return (
              <Link
                key={i}
                href={href}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#ece7dc] bg-white shadow-[0_8px_22px_rgba(30,47,74,0.08)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1E2F4A]/10">
                  <Image
                    src={item.image}
                    alt={item.image_alt || item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={i < 2 ? 'eager' : 'lazy'}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[22px] font-semibold text-[#1E2F4A] transition-colors duration-300 group-hover:text-[#C89B5B]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#6B7280]">{item.description}</p>

                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[#C89B5B]">
                    {ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={cta.url}
            className="inline-flex items-center justify-center rounded-md bg-[#C89B5B] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#b98747]"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
