import { BadgeCheck } from 'lucide-react';

type Requirement = {
  title: string;
  description: string;
};

type Props = {
  data: {
    headline?: string;
    title?: string;
    description?: string;
    requirements?: Requirement[];
    items?: Requirement[];
  };
};

export default function RequirementsSection({ data }: Props) {
  const title = data.headline || data.title || 'What We Require';
  const requirements = data.requirements || data.items || [];

  return (
    <section className="bg-[#f4f2ed] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-4xl font-semibold text-[#1E2F4A] md:text-[44px]">{title}</h2>
          {data.description ? <p className="mt-4 text-base text-[#5f6f87] md:text-lg">{data.description}</p> : null}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {requirements.map((requirement, index) => (
            <article
              key={`${requirement.title}-${index}`}
              className="rounded-xl border border-[#e2d8c6] bg-white p-6 shadow-[0_10px_24px_rgba(30,47,74,0.08)]"
            >
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#efe7d8]">
                <BadgeCheck className="h-5 w-5 text-[#C89B5B]" />
              </div>
              <h3 className="text-[22px] font-semibold text-[#1E2F4A]">{requirement.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#607089]">{requirement.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

