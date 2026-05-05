import { ArrowUpRight } from 'lucide-react';

type Benefit = {
  title: string;
  description: string;
};

type Props = {
  data: {
    headline?: string;
    title?: string;
    benefits?: Benefit[];
    items?: Benefit[];
  };
};

export default function BenefitsGrid({ data }: Props) {
  const title = data.headline || data.title || 'Why Partner With Us';
  const benefits = data.benefits || data.items || [];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-semibold text-[#1E2F4A] md:text-[44px]">{title}</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit, index) => (
            <article
              key={`${benefit.title}-${index}`}
              className="group rounded-2xl border border-[#e6dcc9] bg-[#f9f6ef] p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1E2F4A] text-white">
                <ArrowUpRight className="h-4 w-4" />
              </div>
              <h3 className="text-[22px] font-semibold text-[#1E2F4A]">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5e6f87]">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

