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
  const title = data.title || data.headline || "";
  const steps = data.steps || [];

  const desktopColsClass =
    steps.length >= 5
      ? "lg:grid-cols-5"
      : steps.length === 4
        ? "lg:grid-cols-4"
        : steps.length === 3
          ? "lg:grid-cols-3"
          : steps.length === 2
            ? "lg:grid-cols-2"
            : "lg:grid-cols-1";

  const tabletColsClass = steps.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1";

  return (
    <section className="py-16 md:py-24 bg-[#efefee] border-b border-[#e5dccb]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-[#C89B5B] text-sm md:text-lg font-bold uppercase tracking-widest mb-4 block">
            How We Work
          </span>

          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1E2F4A] uppercase tracking-tight">
            {title || "From First Call to "}
            <span className="text-[#C89B5B]">Finished Project</span>
          </h2>

          {data.subtitle ? (
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-[#6B7280]">
              {data.subtitle}
            </p>
          ) : null}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* horizontal line behind boxes (desktop only) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-[#e5dccb] z-0" />

          <div className={`grid grid-cols-1 ${tabletColsClass} ${desktopColsClass} gap-8 relative z-10`}>
            {steps.map((step, i) => {
              const num = String(step.step_number || i + 1).padStart(2, "0");

              return (
                <div key={i} className="group">
                  {/* number box */}
                  <div className="w-24 h-24 bg-white border-2 border-[#e5dccb] group-hover:border-[#C89B5B] flex items-center justify-center mb-6 mx-auto lg:mx-0 transition-colors duration-300 relative">
                    <span className="font-serif text-3xl font-bold text-[#94A3B8] group-hover:text-[#C89B5B] transition-colors">
                      {num}
                    </span>

                    {/* little dot connector to the right (desktop only) */}
                    <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-4 w-2 h-2 bg-[#e5dccb] rounded-full" />
                  </div>

                  {/* text */}
                  <div className="text-center lg:text-left">
                    <h3 className="font-serif text-xl font-bold text-[#1E2F4A] uppercase tracking-wide mb-3">
                      {step.title}
                    </h3>

                    {step.description ? (
                      <p className="text-sm text-[#6B7280] leading-relaxed">
                        {step.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}