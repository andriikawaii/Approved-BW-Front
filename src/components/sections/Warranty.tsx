'use client';

import { CircleCheck, Clock3, Hammer, ShieldCheck } from 'lucide-react';

type Feature = {
  title: string;
  text: string;
  icon?: 'hammer' | 'clock' | 'shield';
};

type WarrantyProps = {
  data: {
    badge: { label: string };
    title: string;
    highlight: string;
    description: string;
    features: Feature[];
    included_title?: string;
    included: string[];
    footer_quote: string;
  };
};

const ICONS = {
  hammer: Hammer,
  clock: Clock3,
  shield: ShieldCheck,
};

function renderHighlightedTitle(title: string, highlight: string) {
  if (!highlight) {
    return title;
  }

  const idx = title.indexOf(highlight);
  if (idx === -1) {
    return (
      <>
        {title}
        <span className="text-[#C89B5B]"> {highlight}</span>
      </>
    );
  }

  return (
    <>
      {title.slice(0, idx)}
      <span className="text-[#C89B5B]">{highlight}</span>
      {title.slice(idx + highlight.length)}
    </>
  );
}

export default function Warranty({ data }: WarrantyProps) {
  const {
    badge,
    title,
    highlight,
    description,
    features,
    included_title,
    included,
    footer_quote,
  } = data;

  return (
    <section className="relative overflow-hidden bg-[#1E2F4A] py-24 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(200,155,91,0.22) 0.7px, transparent 0.7px)',
            backgroundSize: '18px 18px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.1em] text-[#C89B5B]">
              {badge.label}
            </span>

            <h2 className="mt-4 text-[36px] font-semibold leading-[1.1] text-white md:text-[44px]">
              {renderHighlightedTitle(title, highlight)}
            </h2>

            <p className="mt-6 text-base leading-[1.75] text-white/80 md:text-[18px]">{description}</p>

            <div className="mt-8 space-y-4">
              {features.map((f, i) => {
                const Icon = ICONS[f.icon || 'shield'];
                return (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C89B5B]/15">
                      <Icon className="h-4 w-4 text-[#C89B5B]" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white">{f.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/70">{f.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#243a59] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:p-8">
            <h3 className="text-center text-[28px] font-semibold text-white">
              {included_title || "What's Included"}
            </h3>

            <ul className="mt-6 space-y-3">
              {included.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/90">
                  <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#C89B5B]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 border-t border-white/12 pt-5 text-sm italic text-white/60">
              &ldquo;{footer_quote}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
