'use client';

import Image from 'next/image';

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
            <Image src={panelImage} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
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
            <h3 className="text-center text-3xl font-bold text-[#1E2F4A] md:text-[36px]">
              {data.form_title || 'Schedule Your Free Consultation'}
            </h3>
            <p className="mt-3 text-center text-[16px] text-[#6B7280]">Tell us about your project and we will contact you shortly.</p>

            <form className="mt-6 space-y-4">
              <div>
                <label htmlFor="csf-name" className="sr-only">Full Name</label>
                <input id="csf-name" name="name" type="text" className="min-h-[44px] w-full rounded-md border px-4 py-2 text-base md:text-sm" placeholder="Full Name" />
              </div>
              <div>
                <label htmlFor="csf-email" className="sr-only">Email Address</label>
                <input id="csf-email" name="email" type="email" className="min-h-[44px] w-full rounded-md border px-4 py-2 text-base md:text-sm" placeholder="Email Address" />
              </div>
              <div>
                <label htmlFor="csf-phone" className="sr-only">Phone Number</label>
                <input id="csf-phone" name="phone" type="tel" className="min-h-[44px] w-full rounded-md border px-4 py-2 text-base md:text-sm" placeholder="Phone Number" />
              </div>
              <div>
                <label htmlFor="csf-project" className="sr-only">Project Type</label>
                <input id="csf-project" name="project_type" type="text" className="min-h-[44px] w-full rounded-md border px-4 py-2 text-base md:text-sm" placeholder="Project Type" />
              </div>
              <div>
                <label htmlFor="csf-message" className="sr-only">Tell us about your project</label>
                <textarea id="csf-message" name="message" className="w-full rounded-md border px-4 py-2 text-base md:text-sm" placeholder="Tell us about your project" rows={4} />
              </div>
              <button type="submit" className="mt-6 min-h-[44px] rounded-md bg-[#C89B5B] px-6 py-3 text-white">
                {data.submit_label || 'Book Free Consultation'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
