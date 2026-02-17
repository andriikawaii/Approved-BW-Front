'use client';

import { useState } from 'react';

type Field = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: { label: string; value: string }[];
};

type Step = {
  number: number;
  text: string;
};

type Props = {
  data: {
    title: string;
    subtitle?: string;
    title_highlight?: string;
    background_image?: string;
    form_title?: string;
    steps?: Step[];
    fields: Field[];
    submit_label?: string;
    consent_text?: string;
  };
};

function splitTitle(title: string, highlight?: string) {
  if (!title) {
    return { main: '', accent: '' };
  }
  if (highlight && title.includes(highlight)) {
    return { main: title.replace(highlight, '').trim(), accent: highlight };
  }
  if (!highlight && title.includes('\n')) {
    const [first, ...rest] = title.split('\n').map((part) => part.trim()).filter(Boolean);
    return { main: first || title, accent: rest.join(' ') };
  }
  if (!highlight && title.includes(',')) {
    const [first, ...rest] = title.split(',').map((part) => part.trim()).filter(Boolean);
    return { main: first || title, accent: rest.join(', ') };
  }
  return { main: title, accent: highlight || '' };
}

export default function LeadForm({ data }: Props) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const { main, accent } = splitTitle(data.title, data.title_highlight);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="lead-form" className="bg-[#F5F3EF] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-2xl border border-[#e7e0d3] bg-white shadow-[0_16px_40px_rgba(30,47,74,0.14)] lg:grid lg:grid-cols-[1fr_1.08fr]">
          <div
            className="relative min-h-[460px] p-8 text-white md:p-10"
            style={{
              backgroundImage: data.background_image ? `url(${data.background_image})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#1E2F4A',
            }}
          >
            <div className="absolute inset-0 bg-[#1E2F4A]/72" />
            <div className="relative z-10">
              <h2 className="text-[38px] font-semibold leading-[1.05] text-white md:text-[44px]">
                {main}
                {accent ? (
                  <>
                    <br />
                    <span className="text-[#C89B5B]">{accent}</span>
                  </>
                ) : null}
              </h2>
              {data.subtitle ? <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/80">{data.subtitle}</p> : null}

              {data.steps && data.steps.length > 0 ? (
                <div className="mt-8 space-y-4">
                  {data.steps.map((step) => (
                    <div key={step.number} className="flex items-start gap-3">
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C89B5B] text-xs font-bold text-white">
                        {step.number}
                      </span>
                      <span className="pt-1 text-sm text-white/90">{step.text}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="bg-white p-8 md:p-10">
            {submitted ? (
              <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
                <h3 className="text-[34px] font-semibold text-[#1E2F4A]">Thank You</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-[#6B7280]">
                  We received your request and our team will contact you shortly.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-[30px] font-semibold text-[#1E2F4A]">{data.form_title || 'Schedule Your Free Consultation'}</h3>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {data.fields.map((field) => (
                    <div key={field.name}>
                      <label htmlFor={field.name} className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
                        {field.label}
                        {field.required ? <span className="text-[#b33f3f]"> *</span> : null}
                      </label>

                      {field.type === 'select' ? (
                        <select
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          className="w-full rounded-md border border-[#d9d2c5] bg-white px-3 py-3 text-sm text-[#1E2F4A] outline-none transition-colors focus:border-[#C89B5B]"
                        >
                          <option value="">Select...</option>
                          {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          rows={4}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          className="w-full rounded-md border border-[#d9d2c5] bg-white px-3 py-3 text-sm text-[#1E2F4A] outline-none transition-colors focus:border-[#C89B5B]"
                        />
                      ) : (
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          className="w-full rounded-md border border-[#d9d2c5] bg-white px-3 py-3 text-sm text-[#1E2F4A] outline-none transition-colors focus:border-[#C89B5B]"
                        />
                      )}
                    </div>
                  ))}

                  {data.consent_text ? <p className="text-xs leading-relaxed text-[#6B7280]">{data.consent_text}</p> : null}

                  <button
                    type="submit"
                    className="w-full rounded-md bg-[#C89B5B] px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#b98747]"
                  >
                    {data.submit_label || 'Submit'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
