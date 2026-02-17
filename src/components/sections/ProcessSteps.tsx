type Step = {
  title: string;
  short: string;
  description: string;
};

type Props = {
  data: {
    title: string;
    subtitle?: string;
    steps: Step[];
  };
};

export default function ProcessSteps({ data }: Props) {
  return (
    <section className="bg-[#efefee] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <h2 className="text-4xl font-semibold uppercase text-[#1E2F4A] md:text-[44px]">{data.title}</h2>
          {data.subtitle ? (
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#6B7280] md:text-lg">{data.subtitle}</p>
          ) : null}
        </div>

        <div className="relative">
          <div className="absolute left-6 right-6 top-6 hidden h-px bg-[#d6cab2] lg:block" />

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {data.steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center border border-[#C89B5B] bg-white text-[20px] font-semibold text-[#1E2F4A]">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-4 text-base font-bold uppercase tracking-[0.04em] text-[#1E2F4A]">{step.title}</h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] text-[#C89B5B]">{step.short}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
