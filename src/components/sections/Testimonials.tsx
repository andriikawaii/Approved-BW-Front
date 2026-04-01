'use client';

import Link from 'next/link';
import { Quote } from 'lucide-react';

type Testimonial = {
  name: string;
  location?: string;
  city?: string;
  quote?: string;
  text?: string;
  avatar?: string | null;
  avatar_alt?: string | null;
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

function resolveGridClass(count: number) {
  // Manus: md=2, lg=4
  return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8';
}

const CARD_ROTATIONS = ['rotate-1', 'rotate-[-1]', 'rotate-1', 'rotate-[-1]'];

function initialsFromName(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');
}

export default function Testimonials({ data }: Props) {
  const title = data.title || data.headline || 'What Our Clients Say';
  const subtitle = data.subtitle || data.subheadline || 'Testimonials';

  const items = (data.items || data.testimonials || [])
    .map((item) => ({
      ...item,
      quote: item.quote || item.text || '',
      location: item.location || item.city || '',
    }))
    .filter((i) => Boolean(i.name) && Boolean(i.quote));

  return (
    <section id="reviews" className="py-24 bg-[#1A2B45] text-white relative overflow-hidden">
      {/* dotted overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="font-mono text-[#C68E4D] text-sm uppercase tracking-widest mb-4 block">
            {subtitle}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold !text-white uppercase tracking-tight">
            {title}
          </h2>
        </div>

        <div className={resolveGridClass(items.length)}>
          {items.map((item, i) => (
            <div key={`${item.name}-${i}`} className="relative group">
              {/* red pin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-800 shadow-sm z-20 border border-red-900/50" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/30 z-30 mt-1 ml-1" />

              <article
                className={[
                  "bg-[#F4F1EA] text-[#1A2B45] p-6 pt-8 relative shadow-lg",
                  "hover:rotate-0 transition-transform duration-300 h-full flex flex-col",
                  CARD_ROTATIONS[i % CARD_ROTATIONS.length],
                ].join(' ')}
              >
                {/* paper texture overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none" />

                {/* stamp */}
                <div className="absolute top-4 right-4 font-mono text-[10px] text-gray-500 opacity-60 border border-gray-400 px-1 rotate-[-5deg]">
                  1935
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* header */}
                  <div className="flex items-center gap-4 mb-6 border-b border-gray-300 pb-4 border-dashed">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#1A2B45]/20 sepia-[.5] grayscale-[.3]">
                      {item.avatar ? (
                        <img
                          alt={item.avatar_alt || item.name}
                          className="w-full h-full object-cover"
                          src={item.avatar}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#1A2B45] text-white text-xs font-semibold">
                          {initialsFromName(item.name)}
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="font-serif font-bold text-[#1A2B45] text-sm leading-tight">
                        {item.name}
                      </p>
                      {item.location ? (
                        <p className="font-mono text-[10px] text-gray-600 uppercase tracking-wider mt-0.5">
                          {item.location}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {/* quote icon (ghost) */}
                  <Quote className="w-6 h-6 text-[#1A2B45]/20 mb-2 absolute top-20 right-4" />

                  <p
                    className="font-serif text-sm leading-relaxed text-gray-800 flex-grow text-justify"
                    style={{ fontFeatureSettings: '"liga"' }}
                  >
                    &quot;{item.quote}&quot;
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href={data.cta_url || '/reviews/'}
            className="inline-flex items-center justify-center rounded-md border-2 border-white text-white hover:bg-white hover:text-[#1A2B45] font-bold uppercase tracking-widest px-8 py-6 text-base transition-colors"
          >
            {data.cta_label || 'Read More Reviews'}
          </Link>
        </div>
      </div>
    </section>
  );
}