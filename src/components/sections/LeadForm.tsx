'use client';

import { useState } from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

type Field = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: Array<string | { label: string; value: string }>;
  placeholder?: string;
};

type Step = {
  number?: number;
  text?: string;
  title?: string;
  description?: string;
};

type Props = {
  data: {
    title?: string;
    headline?: string;
    subtitle?: string;
    subheadline?: string;
    title_highlight?: string;
    background_image?: string;
    form_title?: string;
    steps?: Step[];
    fields?: Field[];
    form_fields?: Field[];
    submit_label?: string;
    success_message?: string;
    privacy_note?: string;
    form_placeholder?: boolean;
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
  const title = data.title || data.headline || 'Tell Us About Your Project';
  const subtitle = data.subtitle || data.subheadline;
  const fields = data.fields || data.form_fields || [];
  const privacyText = data.consent_text || data.privacy_note;
  const successMessage = data.success_message || 'We received your request and our team will contact you shortly.';
  const defaultSteps: Step[] = [
    { number: 1, text: 'We call you within one business day.' },
    { number: 2, text: 'We schedule a home visit and discuss scope.' },
    { number: 3, text: 'You receive a detailed fixed-price proposal.' },
  ];
  const steps = data.steps && data.steps.length > 0 ? data.steps : defaultSteps;

  const { main, accent } = splitTitle(title, data.title_highlight);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const normalizeOptions = (options: Field['options']) =>
    (options || []).map((option) =>
      typeof option === 'string' ? { label: option, value: option } : option,
    );

  return (
    <section id="lead-form" className="relative overflow-hidden bg-[#f4f1ea] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(200,155,91,0.18),transparent_35%)]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[28px] border border-[#e7e0d3] bg-white shadow-[0_20px_48px_rgba(30,47,74,0.15)] lg:grid lg:grid-cols-[0.95fr_1.05fr]">
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
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white/90">
                <ShieldCheck className="h-3.5 w-3.5 text-[#C89B5B]" />
                Free Consultation
              </p>
              <h2 className="text-[38px] font-semibold leading-[1.05] text-white md:text-[44px]">
                {main}
                {accent ? (
                  <>
                    <br />
                    <span className="text-[#C89B5B]">{accent}</span>
                  </>
                ) : null}
              </h2>
              {subtitle ? <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/80">{subtitle}</p> : null}

              {steps.length > 0 ? (
                <div className="mt-8 space-y-4">
                  {steps.map((step, index) => (
                    <div key={`step-${step.number || index + 1}`} className="flex items-start gap-3">
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C89B5B] text-xs font-bold text-white">
                        {step.number || index + 1}
                      </span>
                      <span className="pt-1 text-sm text-white/90">
                        {step.text || step.title}
                        {step.description ? (
                          <span className="block pt-1 text-white/75">{step.description}</span>
                        ) : null}
                      </span>
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
                  {successMessage}
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-[30px] font-semibold text-[#1E2F4A]">{data.form_title || title || 'Schedule Your Free Consultation'}</h3>
                {subtitle ? <p className="mt-3 text-sm text-[#68778f]">{subtitle}</p> : null}
                <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                  {fields.map((field, index) => {
                    const isTextarea = field.type === 'textarea';
                    const isFullRow = isTextarea || field.name === 'address' || field.name === 'message';
                    const wrapperClass = isFullRow ? 'sm:col-span-2' : '';
                    const options = normalizeOptions(field.options);

                    return (
                    <div key={`${field.name}-${index}`} className={wrapperClass}>
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
                          <option value="">{field.placeholder || 'Select...'}</option>
                          {options.map((opt) => (
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
                          placeholder={field.placeholder}
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
                          placeholder={field.placeholder}
                          className="w-full rounded-md border border-[#d9d2c5] bg-white px-3 py-3 text-sm text-[#1E2F4A] outline-none transition-colors focus:border-[#C89B5B]"
                        />
                      )}
                    </div>
                  )})}

                  <div className="sm:col-span-2">
                    {privacyText ? <p className="text-xs leading-relaxed text-[#6B7280]">{privacyText}</p> : null}
                    {data.form_placeholder ? (
                      <p className="mt-2 inline-flex items-center gap-2 rounded-md bg-[#f6f2e9] px-3 py-1.5 text-xs text-[#6b5a3d]">
                        <CheckCircle2 className="h-4 w-4 text-[#C89B5B]" />
                        Form is in placeholder mode.
                      </p>
                    ) : null}
                    <button
                      type="submit"
                      className="mt-4 w-full rounded-md bg-[#C89B5B] px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#b98747]"
                    >
                      {data.submit_label || 'Submit'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
