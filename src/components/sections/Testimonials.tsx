'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';

type Testimonial = {
  name: string;
  location?: string;
  city?: string;
  quote?: string;
  text?: string;
  avatar?: string | null;
  rating?: number;
};

type Props = {
  data: {
    title?: string;
    headline?: string;
    subtitle?: string;
    subheadline?: string;
    cta_label?: string;
    cta_url?: string;
    items?: Testimonial[];
    testimonials?: Testimonial[];
  };
};

const CARD_ROTATIONS = ['rotate-[-1deg]', 'rotate-[1deg]', 'rotate-[-0.7deg]', 'rotate-[0.7deg]'];

function initialsFromName(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function resolveGridClass(count: number) {
  if (count >= 4) return 'sm:grid-cols-2 xl:grid-cols-4';
  if (count === 3) return 'sm:grid-cols-2 lg:grid-cols-3';
  if (count === 2) return 'sm:grid-cols-2';
  return 'grid-cols-1';
}

export default function Testimonials({ data }: Props) {
  const title = data.title || data.headline || '';
  const subtitle = data.subtitle || data.subheadline;
  const normalizedItems = (data.items || data.testimonials || [])
    .map((item) => ({
      ...item,
      quote: item.quote || item.text || '',
      location: item.location || item.city,
    }))
    .filter((item) => Boolean(item.name) && Boolean(item.quote));
  const gridClass = resolveGridClass(normalizedItems.length);

  return (
    <section className="bg-[#1E2F4A] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-semibold text-white md:text-[44px]">{title}</h2>
          {subtitle ? <p className="mx-auto mt-4 max-w-2xl text-base text-white/75 md:text-lg">{subtitle}</p> : null}
        </div>

        <div className={`grid gap-6 ${gridClass}`}>
          {normalizedItems.map((item, i) => (
            <article
              key={`${item.name}-${i}`}
              className={`relative border border-[#efe7d7] bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.2)] ${CARD_ROTATIONS[i % CARD_ROTATIONS.length]}`}
            >
              <span className="absolute -top-2.5 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-[#d83e3e]" />

              <div className="mb-3 flex items-center gap-1 text-[#C89B5B]">
                {Array.from({ length: item.rating || 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <p className="text-[15px] italic leading-relaxed text-[#334155]">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="mt-5 flex items-center gap-3 border-t border-[#ede7dc] pt-4">
                {item.avatar ? (
                  <img src={item.avatar} alt={item.name} className="h-9 w-9 rounded-full object-cover" />
                ) : (
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1E2F4A] text-xs font-semibold text-white">
                    {initialsFromName(item.name)}
                  </span>
                )}
                <div>
                  <p className="text-sm font-semibold text-[#1E2F4A]">{item.name}</p>
                  {item.location ? <p className="text-xs text-[#6B7280]">{item.location}</p> : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={data.cta_url || '/reviews/'}
            className="inline-flex items-center justify-center rounded-md border border-white px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#C89B5B] hover:text-white hover:border-[#C89B5B]"
          >
            {data.cta_label || 'Read More Reviews'}
          </Link>
        </div>
      </div>
    </section>
  );
}
