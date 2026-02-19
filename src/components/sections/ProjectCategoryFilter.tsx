'use client';

import { useEffect, useMemo, useState } from 'react';

type FilterOption = {
  label: string;
  value: string;
};

type Props = {
  data: {
    headline?: string;
    title?: string;
    filters?: FilterOption[];
  };
};

const DEFAULT_FILTERS: FilterOption[] = [{ label: 'All', value: 'all' }];

export default function ProjectCategoryFilter({ data }: Props) {
  const filters = useMemo(
    () => (data.filters && data.filters.length > 0 ? data.filters : DEFAULT_FILTERS),
    [data.filters],
  );
  const [activeFilter, setActiveFilter] = useState(filters[0]?.value || 'all');
  const title = data.headline || data.title || 'Browse Projects';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('portfolio-filter-change', { detail: activeFilter }));
  }, [activeFilter]);

  return (
    <section className="bg-[#f7f4ed] py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-7 text-center">
          <h2 className="text-3xl font-semibold text-[#1E2F4A] md:text-[38px]">{title}</h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {filters.map((filter) => {
            const isActive = filter.value === activeFilter;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1E2F4A] text-white shadow-[0_6px_18px_rgba(30,47,74,0.2)]'
                    : 'border border-[#d9cfbb] bg-white text-[#1E2F4A] hover:border-[#C89B5B] hover:text-[#C89B5B]'
                }`}
                aria-pressed={isActive}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

