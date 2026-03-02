'use client';

type Step = {
  number: number;
  text: string;
};

type Props = {
  data: {
    title: string;
    subtitle?: string;
    steps?: Step[];
    form_id?: string;
    background_image?: string | null;
    form_title?: string;
    submit_label?: string;
  };
};

export default function CtaSplitForm({ data }: Props) {
  const panelImage = data.background_image || '/images/hero/hero-carousel-final.png';

  return (
    <section className="bg-[#F5F3EF] pt-16 pb-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-xl bg-[#1E2F4A] text-white">
            <img src={panelImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[#1E2F4A]/80" />

            <div className="relative z-10 p-10">
              <h2 className="text-3xl !text-white font-bold md:text-[36px]">{data.title}</h2>
              {data.subtitle ? <p className="mt-4 text-[16px] text-white/85">{data.subtitle}</p> : null}

              {data.steps && data.steps.length > 0 ? (
                <ol className="mt-8 space-y-4">
                  {data.steps.map((step) => (
                    <li key={step.number} className="flex items-start gap-3">
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C89B5B] text-xs font-bold text-white">
                        {step.number}
                      </span>
                      <span className="pt-1 text-sm">{step.text}</span>
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
          </div>

          <div className="rounded-xl bg-white p-10 shadow-xl">
            <h3 className="text-center text-white text-3xl font-bold md:text-[36px]">
              {data.form_title || 'Schedule Your Free Consultation'}
            </h3>
            <p className="mt-3 text-center text-[16px] text-[#6B7280]">Tell us about your project and we will contact you shortly.</p>

            <form className="mt-6 space-y-4">
              <input className="w-full rounded-md border px-4 py-2" placeholder="Full Name" />
              <input className="w-full rounded-md border px-4 py-2" placeholder="Email Address" />
              <input className="w-full rounded-md border px-4 py-2" placeholder="Phone Number" />
              <input className="w-full rounded-md border px-4 py-2" placeholder="Project Type" />
              <textarea className="w-full rounded-md border px-4 py-2" placeholder="Tell us about your project" rows={4} />
              <button className="mt-6 rounded-md bg-[#C89B5B] px-6 py-3 text-white">
                {data.submit_label || 'Book Free Consultation'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
