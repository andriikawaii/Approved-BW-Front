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
    subtitle?: string;
    scope?: 'in_town' | 'around_town' | string;
    town_hub?: boolean;
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
  const isTownHub = Boolean(data.town_hub);

  if (!isTownHub) {
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
                  className="group rounded-2xl border border-[#e5d8c2] bg-white p-6 shadow-[0_10px_24px_rgba(30,47,74,0.08)] transition-transform duration-300 hover:-translate-y-0.5"
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

  const scope = data.scope === 'around_town' ? 'around_town' : 'in_town';
  const isAroundTown = scope === 'around_town';
  const title = data.title || (isAroundTown ? `Nearby Areas Around ${countyLabel(data.county)}` : 'Neighborhoods We Serve');
  const featured = data.tier1 || [];
  const additional = data.tier2 || [];

  return (
    <section className={isAroundTown ? 'bg-[#f3ede2] py-16 md:py-20' : 'bg-[#fbf8f1] py-16 md:py-20'}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className={isAroundTown ? 'mb-3 block text-xs font-semibold uppercase tracking-[0.14em] text-[#b98747]' : 'bw-section-label mb-3 block'}>
            {isAroundTown ? 'Regional Coverage' : 'Neighborhood Coverage'}
          </span>
          <h2 className={isAroundTown ? 'text-3xl font-semibold text-[#1E2F4A] md:text-4xl' : 'text-3xl font-semibold text-[#1E2F4A] md:text-4xl'}>
            {title}
          </h2>
          {data.subtitle ? (
            <p className={isAroundTown ? 'mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#5e6f86] md:text-lg' : 'mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#5e6f86] md:text-lg'}>
              {data.subtitle}
            </p>
          ) : null}
        </div>

        {featured.length > 0 ? (
          <div className={isAroundTown ? 'mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3' : 'mt-10 grid gap-5 md:grid-cols-2'}>
            {featured.map((town) => (
              <Link
                key={`${town.label}-${town.url}`}
                href={town.url}
                className={
                  isAroundTown
                    ? 'group rounded-2xl border border-[#e5d8c2] bg-white p-5 shadow-[0_8px_20px_rgba(30,47,74,0.07)] transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#c89b5b]'
                    : 'group rounded-2xl border border-[#e5d8c2] bg-white p-6 shadow-[0_10px_24px_rgba(30,47,74,0.08)] transition-transform duration-300 hover:-translate-y-0.5'
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={isAroundTown ? 'text-xs font-semibold uppercase tracking-[0.14em] text-[#b98747]' : 'text-xs font-semibold uppercase tracking-[0.14em] text-[#C89B5B]'}>
                      {isAroundTown ? 'Nearby Town' : 'Neighborhood'}
                    </p>
                    <h3 className={isAroundTown ? 'mt-2 text-[25px] font-semibold text-[#1E2F4A]' : 'mt-2 text-2xl font-semibold text-[#1E2F4A]'}>
                      {town.label}
                    </h3>
                  </div>
                  <MapPin className={isAroundTown ? 'h-5 w-5 text-[#b98747]' : 'h-5 w-5 text-[#C89B5B]'} />
                </div>
                <span className={isAroundTown ? 'mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1E2F4A]' : 'mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1E2F4A]'}>
                  View service page
                  <ArrowRight className={isAroundTown ? 'h-4 w-4 text-[#b98747] transition-transform duration-300 group-hover:translate-x-0.5' : 'h-4 w-4 text-[#C89B5B] transition-transform duration-300 group-hover:translate-x-0.5'} />
                </span>
              </Link>
            ))}
          </div>
        ) : null}

        {additional.length > 0 ? (
          <div className={isAroundTown ? 'mt-7 rounded-2xl border border-[#e3d4bb] bg-[#fbf7ef] p-5 shadow-[0_8px_20px_rgba(30,47,74,0.06)] md:p-6' : 'mt-8 rounded-2xl border border-[#e5d8c2] bg-white p-6 shadow-[0_10px_24px_rgba(30,47,74,0.08)] md:p-7'}>
            <p className={isAroundTown ? 'text-xs font-semibold uppercase tracking-[0.14em] text-[#b98747]' : 'text-xs font-semibold uppercase tracking-[0.14em] text-[#C89B5B]'}>
              {isAroundTown ? 'Additional Nearby Areas' : 'Additional Neighborhoods'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {additional.map((town) => (
                <span
                  key={town}
                  className={
                    isAroundTown
                      ? 'rounded-full border border-[#dcc9aa] bg-white px-3 py-1.5 text-sm font-medium text-[#5f6f82]'
                      : 'rounded-full border border-[#dfd2bb] bg-[#fcfaf6] px-3.5 py-1.5 text-sm font-medium text-[#1E2F4A]'
                  }
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
