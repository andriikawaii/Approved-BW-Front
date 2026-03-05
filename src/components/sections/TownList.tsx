import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';

type Tier1Town = {
  label: string;
  url: string;
};

type TownListProps = {
  data: {
    county?: 'fairfield' | 'new_haven' | string;
    title?: string;
    tier1?: Tier1Town[];
    tier2?: string[];
  };
};

function countyLabel(county?: string): string {
  if (county === 'new_haven') {
    return 'New Haven County';
  }
  if (county === 'fairfield') {
    return 'Fairfield County';
  }
  return 'Service Area';
}

export default function TownList({ data }: TownListProps) {
  const title = data.title || `Towns We Serve in ${countyLabel(data.county)}`;
  const featured = data.tier1 || [];
  const additional = data.tier2 || [];

  return (
    <section className="bg-[#f8f5ee] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="bw-section-label mb-3 block">Local Coverage</span>
          <h2 className="text-3xl font-semibold text-[#1E2F4A] md:text-4xl">{title}</h2>
        </div>

        {featured.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {featured.map((town) => (
              <Link
                key={`${town.label}-${town.url}`}
                href={town.url}
                className="group rounded-2xl border border-[#e5d8c2] bg-white p-6 shadow-[0_10px_24px_rgba(30,47,74,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(30,47,74,0.12)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C89B5B]">Featured Town</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[#1E2F4A]">{town.label}</h3>
                  </div>
                  <MapPin className="h-5 w-5 text-[#C89B5B]" />
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1E2F4A]">
                  View service page
                  <ArrowRight className="h-4 w-4 text-[#C89B5B] transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        ) : null}

        {additional.length > 0 ? (
          <div className="mt-8 rounded-2xl border border-[#e5d8c2] bg-white p-6 shadow-[0_10px_24px_rgba(30,47,74,0.08)] md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C89B5B]">Additional Towns</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {additional.map((town) => (
                <span
                  key={town}
                  className="rounded-full border border-[#dfd2bb] bg-[#fcfaf6] px-3.5 py-1.5 text-sm font-medium text-[#1E2F4A]"
                >
                  {town}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
