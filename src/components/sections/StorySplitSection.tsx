'use client';

import { ShieldCheck } from 'lucide-react';

type Props = {
  data: {
    badge: string;
    title: {
      normal: string;
      highlight: string;
    };
    image: string;
    paragraphs: string[];
    quote?: string;
  };
};

export default function StorySplitSection({ data }: Props) {
  const { badge, title, image, paragraphs, quote } = data;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* IMAGE */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl shadow-xl">
              <img
                src={image}
                alt={title.normal}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div>
            {/* BADGE */}
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F3E6D6] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#C68E4D]">
                <ShieldCheck className="h-4 w-4" />
                {badge}
            </span>

            {/* TITLE */}
            <h2 className="mt-6 font-serif text-4xl text-[#1E2F45] md:text-5xl">
              {title.normal}{' '}
              <span className="text-[#C68E4D]">{title.highlight}</span>
            </h2>

            {/* TEXT */}
            <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-600">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* QUOTE */}
            {quote && (
              <div className="mt-8 border-l-4 border-[#C68E4D] pl-6 text-lg italic text-[#1E2F45]">
                “{quote}”
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
