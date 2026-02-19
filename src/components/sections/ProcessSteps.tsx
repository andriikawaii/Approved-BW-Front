type Step = {
  title: string;
  short?: string;
  description?: string;
  step_number?: number;
};

type Props = {
  data: {
    title?: string;
    headline?: string;
    subtitle?: string;
    steps?: Step[];
  };
};

export default function ProcessSteps({ data }: Props) {
  const title = data.title || data.headline || '';
  const steps = data.steps || [];
  const desktopColsClass =
    steps.length >= 5
      ? 'lg:grid-cols-5'
      : steps.length === 4
        ? 'lg:grid-cols-4'
        : steps.length === 3
          ? 'lg:grid-cols-3'
          : steps.length === 2
            ? 'lg:grid-cols-2'
            : 'lg:grid-cols-1';
  const tabletColsClass = steps.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1';

  return (
    <section className="bg-[#efefee] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <h2 className="text-4xl font-semibold uppercase text-[#1E2F4A] md:text-[44px]">{title}</h2>
          {data.subtitle ? (
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#6B7280] md:text-lg">{data.subtitle}</p>
          ) : null}
        </div>

        <div className="relative">
          <div className="absolute left-6 right-6 top-6 hidden h-px bg-[#d6cab2] lg:block" />

          <div className={`grid gap-6 ${tabletColsClass} ${desktopColsClass} lg:gap-8`}>
            {steps.map((step, i) => (
              <div key={i} className="relative rounded-xl border border-[#e5dccb] bg-white p-6 shadow-[0_10px_22px_rgba(30,47,74,0.08)]">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center border border-[#C89B5B] bg-white text-[20px] font-semibold text-[#1E2F4A]">
                  {String(step.step_number || i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-4 text-base font-bold uppercase tracking-[0.04em] text-[#1E2F4A]">{step.title}</h3>
                {step.short ? (
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] text-[#C89B5B]">{step.short}</p>
                ) : null}
                {step.description ? (
                  <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{step.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
