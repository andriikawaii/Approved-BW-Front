'use client';

import Image from 'next/image';

type Step = {
  number: number;
  text: string;
};

type SelectOption = {
  label: string;
  value: string;
};

type Field = {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  options?: SelectOption[];
};

type Props = {
  data: {
    headline: string;
    steps?: Step[];
    fields?: Field[];
    submit_label?: string;
  };
};

export default function ConsultationCtaSplit({ data }: Props) {
  const fields = data.fields || [];
  const submitLabel = data.submit_label || 'Book Free Consultation';

  return (
    <section className="bg-[#F5F3EF] pt-16 pb-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-xl bg-[#1E2F4A] text-white">
            <Image src="/images/hero/hero-carousel-final.png" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-[#1E2F4A]/80" />

            <div className="relative z-10 p-10">
              <h2 className="text-3xl font-bold leading-tight md:text-[36px]">{data.headline}</h2>

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
            <h3 className="text-center text-3xl font-bold text-[#1E2F4A] md:text-[36px]">Schedule Your Free Consultation</h3>
            <p className="mt-3 text-center text-[16px] text-[#6B7280]">Tell us about your project and we will contact you shortly.</p>

            <form className="mt-6 space-y-4">
              {fields.map((field) => {
                const fieldId = `ccs-${field.name}`;

                if (field.type === 'textarea') {
                  return (
                    <div key={field.name}>
                      <label htmlFor={fieldId} className="mb-1 block text-xs font-semibold uppercase tracking-[0.06em] text-[#6B7280]">
                        {field.label}
                      </label>
                      <textarea
                        id={fieldId}
                        name={field.name}
                        required={field.required}
                        placeholder={field.label}
                        rows={4}
                        className="w-full rounded-md border px-4 py-2"
                      />
                    </div>
                  );
                }

                if (field.type === 'select') {
                  return (
                    <div key={field.name}>
                      <label htmlFor={fieldId} className="mb-1 block text-xs font-semibold uppercase tracking-[0.06em] text-[#6B7280]">
                        {field.label}
                      </label>
                      <select id={fieldId} name={field.name} required={field.required} className="w-full rounded-md border px-4 py-2">
                        <option value="">Select...</option>
                        {(field.options || []).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }

                return (
                  <div key={field.name}>
                    <label htmlFor={fieldId} className="mb-1 block text-xs font-semibold uppercase tracking-[0.06em] text-[#6B7280]">
                      {field.label}
                    </label>
                    <input
                      id={fieldId}
                      name={field.name}
                      type={field.type || 'text'}
                      required={field.required}
                      placeholder={field.label}
                      className="w-full rounded-md border px-4 py-2"
                    />
                  </div>
                );
              })}

              <button className="mt-6 rounded-md bg-[#C89B5B] px-6 py-3 text-white transition-opacity hover:opacity-90">
                {submitLabel}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
