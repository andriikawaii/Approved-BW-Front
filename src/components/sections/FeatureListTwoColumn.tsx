import { Check } from 'lucide-react';

type Feature = {
  title: string;
  description: string;
};

type Bullet = string | Feature;

type Props = {
  data: {
    eyebrow?: string;
    title?: string;
    headline?: string;
    left_features?: Feature[];
    left_column?: Feature[];
    right_bullets?: string[];
    right_column?: Feature[];
    closing_quote?: string;
  };
};

export default function FeatureListTwoColumn({ data }: Props) {
  const title = data.title || data.headline || '';
  const leftFeatures = data.left_features || data.left_column || [];
  const rightBullets: Bullet[] = data.right_bullets || data.right_column || [];

  return (
    <section className="bg-[#F5F3EF] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          {data.eyebrow ? (
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.1em] text-[#C89B5B]">{data.eyebrow}</span>
          ) : null}
          <h2 className="text-4xl font-semibold text-[#1E2F4A] md:text-[44px]">{title}</h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            {leftFeatures.map((feature, i) => (
              <div key={i} className="rounded-xl border border-[#ece6d9] bg-white p-6 shadow-[0_8px_22px_rgba(30,47,74,0.08)]">
                <h3 className="text-[24px] font-semibold text-[#1E2F4A]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-[#1E2F4A] p-8 text-white shadow-[0_14px_35px_rgba(0,0,0,0.25)]">
            <ul className="space-y-4">
              {rightBullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#C89B5B]" />
                  {typeof bullet === 'string' ? (
                    <span className="text-base text-white/90">{bullet}</span>
                  ) : (
                    <div>
                      <p className="text-base font-semibold text-white">{bullet.title}</p>
                      <p className="mt-1 text-sm text-white/80">{bullet.description}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {data.closing_quote ? (
          <div className="mt-12 text-center">
            <blockquote className="text-2xl italic text-[#1E2F4A]">{data.closing_quote}</blockquote>
          </div>
        ) : null}
      </div>
    </section>
  );
}
