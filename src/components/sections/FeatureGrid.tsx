'use client';

import {
  Award,
  FileText,
  Hammer,
  Lock,
  MessageCircle,
  Shield,
  ShieldCheck,
  Users,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'file-text': FileText,
  shield: Shield,
  'shield-check': ShieldCheck,
  lock: Lock,
  users: Users,
  'message-circle': MessageCircle,
  award: Award,
  hammer: Hammer,
};

type GridItem = {
  icon: string;
  title: string;
  description: string;
};

type Props = {
  data: {
    title: string;
    subtitle?: string;
    items: GridItem[];
  };
};

export default function FeatureGrid({ data }: Props) {
  const { title, subtitle, items } = data;

  return (
    <section className="bg-[#f3f3f2] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-[44px] font-semibold text-[#1E2F4A] md:text-[50px]">{title}</h2>
          {subtitle ? <p className="mx-auto mt-3 max-w-3xl text-[15px] text-[#4f5f78] md:text-base">{subtitle}</p> : null}
        </div>

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <article key={i} className="rounded-lg border border-[#e8e1d4] bg-white p-5 shadow-[0_8px_18px_rgba(30,47,74,0.06)]">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#C89B5B]/12">
                  {Icon ? <Icon className="h-4 w-4 text-[#C89B5B]" /> : null}
                </div>
                <h3 className="text-[18px] font-semibold text-[#1E2F4A]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4f5f78]">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
