type MetaItem = {
  label?: string;
  value?: string;
};

type Props = {
  data: {
    items?: MetaItem[];
  };
};

export default function CaseStudyMeta({ data }: Props) {
  const items = (data.items || []).filter((item) => item?.label && item?.value);
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F5F3EF] py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl border border-[#e7decd] bg-white p-6 shadow-[0_12px_28px_rgba(30,47,74,0.06)] md:p-8">
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className="rounded-xl border border-[#eee4d4] bg-[#fcfbf8] px-4 py-3"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[#C89B5B]">{item.label}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#1E2F4A]">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
