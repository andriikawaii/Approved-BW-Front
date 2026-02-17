'use client';

import { Hammer, MessageCircle, ShieldCheck } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'message-circle': MessageCircle,
  hammer: Hammer,
  'shield-check': ShieldCheck,
};

type CardItem = {
  icon: string;
  title: string;
  description: string;
};

type Props = {
  data: {
    title: string;
    subtitle?: string;
    items: CardItem[];
  };
};

export default function IconCards({ data }: Props) {
  return (
    <section className="bg-[#f3f3f2] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-[44px] font-semibold leading-[1.03] text-[#1E2F4A] md:text-[50px]">{data.title}</h2>
          {data.subtitle ? (
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#4f5f78] md:text-lg">{data.subtitle}</p>
          ) : null}
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {data.items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || MessageCircle;
            return (
              <article key={i} className="rounded-xl border border-[#e1ddd5] bg-[#f7f7f7] p-8">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#efe9df]">
                  <Icon className="h-5 w-5 text-[#C89B5B]" />
                </div>
                <h3 className="text-[24px] font-semibold leading-[1.15] text-[#1E2F4A] md:text-[28px]">{item.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#4f5f78] md:text-base">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
