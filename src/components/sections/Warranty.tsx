'use client';

import {
  ShieldCheck,
  Hammer,
  Clock,
  CircleCheck
} from 'lucide-react';

type Feature = {
  title: string;
  text: string;
  icon: 'hammer' | 'clock';
};

type WarrantyProps = {
  data: {
    badge: { label: string };
    title: string;
    highlight: string;
    description: string;
    features: Feature[];
    included: string[];
    footer_quote: string;
  };
};

const ICONS = {
  hammer: Hammer,
  clock: Clock
};

export default function Warranty({ data }: WarrantyProps) {
  const {
    badge,
    title,
    highlight,
    description,
    features,
    included,
    footer_quote
  } = data;

  return (
    <section className="relative overflow-hidden bg-[#1A2B45] py-20 text-white">
      {/* PATTERN */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(rgb(198,142,77) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* LEFT */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C68E4D]/30 bg-[#C68E4D]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#C68E4D]">
              <ShieldCheck className="h-4 w-4" />
              {badge.label}
            </div>

            <h2 className="mb-6 font-serif text-4xl font-bold leading-tight md:text-5xl">
              {title.replace(highlight, '')}
              <span className="text-[#C68E4D]"> {highlight}</span>
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-gray-300">
              {description}
            </p>

            <div className="space-y-4">
              {features.map((f, i) => {
                const Icon = ICONS[f.icon];
                return (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C68E4D]/20">
                      <Icon className="h-5 w-5 text-[#C68E4D]" />
                    </div>
                    <div>
                      <h4 className="mb-1 text-xl font-bold">{f.title}</h4>
                      <p className="text-sm text-gray-400">{f.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
            <h3 className="mb-6 text-center font-serif text-2xl font-bold">
              What's Included
            </h3>

            <ul className="flex-grow space-y-5">
              {included.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-200">
                  <CircleCheck className="h-5 w-5 shrink-0 text-[#C68E4D]" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-white/10 pt-8 text-center">
              <p className="text-sm italic text-gray-400">
                “{footer_quote}”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
