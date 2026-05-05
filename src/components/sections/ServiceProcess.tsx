'use client';

type ProcessStep = {
  title: string;
  description: string;
  step_number: number;
};

type Props = {
  data: {
    title: string;
    steps: ProcessStep[];
  };
};

export default function ServiceProcess({ data }: Props) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A2B45]">
            {data.title}
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {data.steps.map((step) => (
            <div
              key={step.step_number}
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transition-none flex flex-col h-full group"
            >
              {/* STEP LABEL */}
              <span className="text-[#C68E4D] font-bold text-sm tracking-[0.2em] mb-6 block">
                STEP {String(step.step_number).padStart(2, '0')}
              </span>

              {/* TITLE */}
              <h3 className="font-serif text-2xl font-bold text-[#1A2B45] mb-4 group-hover:text-[#C68E4D] transition-colors">
                {step.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-[15px] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}