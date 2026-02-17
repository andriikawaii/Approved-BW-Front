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
    <section className="bg-[#F5F3EF] py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center px-6 lg:px-16">
          <h2 className="text-3xl font-bold md:text-[36px]">{data.title}</h2>
        </div>

        <div className="grid gap-8 px-6 text-center lg:grid-cols-5 lg:px-16">
          {data.steps.map((step) => (
            <div key={step.step_number} className="rounded-lg bg-white py-6 px-4 shadow-lg">
              <div className="text-xl font-bold">{String(step.step_number).padStart(2, '0')}</div>
              <div className="mt-2 font-semibold">{step.title}</div>
              <p className="mt-2 text-sm text-[#6B7280]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
