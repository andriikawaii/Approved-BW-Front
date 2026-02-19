type Stat = {
  label: string;
  value: string | number;
};

type Props = {
  data: {
    stats?: Stat[];
    items?: Stat[];
  };
};

export default function StatsBar({ data }: Props) {
  const stats = data.stats || data.items || [];

  if (stats.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#1E2F4A] py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div key={`${item.label}-${index}`} className="relative">
              <p className="text-[36px] font-semibold text-[#C89B5B] md:text-[42px]">{item.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/85">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

