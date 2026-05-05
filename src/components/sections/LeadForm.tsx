'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

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
    eyebrow?: string;
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
    town_hub?: boolean;
  };
};

function splitTitle(title: string, highlight?: string) {
  if (!title) return { main: '', accent: '' };

  if (highlight && title.includes(highlight)) {
    return { main: title.replace(highlight, '').trim(), accent: highlight };
  }

  if (!highlight && title.includes('\n')) {
    const [first, ...rest] = title
      .split('\n')
      .map((part) => part.trim())
      .filter(Boolean);
    return { main: first || title, accent: rest.join(' ') };
  }

  if (!highlight && title.includes(',')) {
    const [first, ...rest] = title
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean);
    return { main: first || title, accent: rest.join(', ') };
  }

  return { main: title, accent: highlight || '' };
}

export default function LeadForm({ data }: Props) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const isTownHub = Boolean(data.town_hub);

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
    (options || []).map((option) => (typeof option === 'string' ? { label: option, value: option } : option));

  // Manus-like control classes
  const inputClass = isTownHub
    ? 'h-[46px] w-full min-w-0 rounded-xl border border-[#e0d2bb] bg-white px-3.5 py-2.5 text-[15px] text-[#1E2F4A] shadow-sm outline-none transition-[border-color,box-shadow] focus:border-[#c89b5b] focus-visible:ring-[3px] focus-visible:ring-[#c89b5b]/25'
    : 'w-full min-w-0 border bg-secondary border-border rounded-none h-12 px-3 py-2 text-base text-[#1E2F4A] shadow-xs outline-none transition-[color,box-shadow] focus:border-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm';
  const textareaClass = isTownHub
    ? 'w-full min-h-[120px] rounded-xl border border-[#e0d2bb] bg-white px-3.5 py-2.5 text-[15px] text-[#1E2F4A] shadow-sm outline-none transition-[border-color,box-shadow] focus:border-[#c89b5b] focus-visible:ring-[3px] focus-visible:ring-[#c89b5b]/25'
    : 'w-full border bg-secondary border-border rounded-none min-h-[80px] px-3 py-2 text-base text-[#1E2F4A] shadow-xs outline-none transition-[color,box-shadow] focus:border-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm';
  const selectClass = inputClass;

  return (
    <section id="lead-form" className={isTownHub ? 'bg-[#f6f1e6] py-22 md:py-26' : 'py-24 bg-gray-50'}>
      <div className={isTownHub ? 'container mx-auto max-w-6xl px-6' : 'container max-w-6xl mx-auto px-4'}>
        <div className={isTownHub ? 'flex min-h-[640px] flex-col overflow-hidden rounded-[22px] border border-[#e2d4bd] bg-white shadow-[0_24px_58px_rgba(30,47,74,0.16)] lg:min-h-[680px] lg:flex-row lg:items-stretch' : 'bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]'}>
          {/* LEFT */}
          <div
            className={isTownHub ? 'relative min-h-[420px] lg:w-1/2 lg:min-h-[680px] bg-[#1A2B45]' : 'relative lg:w-1/2 min-h-[400px] lg:min-h-full bg-[#1A2B45]'}
          >
            {data.background_image ? (
              <Image src={data.background_image} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            ) : null}
            <div className={isTownHub ? 'absolute inset-0 bg-[#1A2B45]/76' : 'absolute inset-0 bg-[#1A2B45]/70'} />

            <div className={`absolute inset-0 flex flex-col ${isTownHub ? 'px-8 pt-14 pb-8 md:px-12 lg:px-14 lg:pt-16 lg:pb-10' : 'justify-start pt-16 px-12 lg:px-16'}`}>
              <div className={`${isTownHub ? 'max-w-lg' : 'max-w-md'} animate-in fade-in slide-in-from-bottom-4 duration-700`}>
                <span className={`${isTownHub ? 'mb-5 text-[11px] tracking-[0.2em]' : 'text-sm'} text-[#C68E4D] font-bold uppercase tracking-widest block`}>
                  {data.eyebrow || 'Start Your Project'}
                </span>

                <h2 className={`${isTownHub ? 'text-[clamp(34px,3.8vw,52px)] leading-[1.08]' : 'text-4xl md:text-5xl'} font-serif font-bold !text-white mb-6`}>
                  {main}
                  {accent ? (
                    <>
                      <br />
                      <span className="text-[#C68E4D]">{accent}</span>
                    </>
                  ) : null}
                </h2>

                {subtitle ? (
                  <p className={`${isTownHub ? 'mb-9 max-w-[520px] text-[17px] leading-[1.8] text-white/86' : 'text-lg text-gray-200 mb-8 leading-relaxed'}`}>
                    {subtitle}
                  </p>
                ) : null}

                <div className={`${isTownHub ? 'mt-9 grid gap-3 sm:grid-cols-1' : 'space-y-8 hidden md:block mt-12'} ${isTownHub ? '' : ''}`}>
                  {steps.slice(0, 3).map((step, index) => (
                    <div key={`step-${step.number || index + 1}`} className={isTownHub ? 'flex items-start gap-3.5 rounded-xl border border-white/16 bg-white/10 px-4 py-3 backdrop-blur-[3px]' : 'flex items-center gap-6'}>
                      <div className={isTownHub ? 'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c68e4d] text-sm font-bold text-white shadow-md' : 'w-12 h-12 rounded-full bg-[#C68E4D] flex items-center justify-center text-white font-bold shrink-0 text-xl shadow-lg'}>
                        {step.number || index + 1}
                      </div>
                      <span className={isTownHub ? 'pt-0.5 text-[14px] font-semibold leading-relaxed text-white/92 md:text-[15px]' : 'text-white font-bold text-xl tracking-wide'}>
                        {step.text || step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className={isTownHub ? 'flex flex-col justify-start bg-[#fffdf8] p-6 pt-6 md:p-10 lg:w-1/2 lg:min-h-[680px] lg:p-12 lg:pt-8' : 'lg:w-1/2 bg-white p-6 md:p-10 lg:p-12 flex flex-col justify-start pt-6 lg:pt-8'}>
            <div className={isTownHub ? 'mx-auto flex h-full w-full max-w-[520px] flex-col' : 'w-full max-w-md mx-auto'}>
              {submitted ? (
                <div className={isTownHub ? 'flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-[#eadcc4] bg-white px-6 py-8 text-center shadow-[0_12px_28px_rgba(30,47,74,0.08)]' : 'flex h-full min-h-[380px] flex-col items-center justify-center text-center'}>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#1A2B45] mb-2">
                    Thank You
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {successMessage}
                  </p>
                </div>
              ) : (
                <>
                  <div className={isTownHub ? 'mb-7 text-left' : 'mb-6 text-center'}>
                    <h2 className={`${isTownHub ? 'text-[30px] leading-[1.15] md:text-[36px]' : 'text-3xl md:text-4xl'} font-serif font-bold text-[#1A2B45] mb-2`}>
                      {data.form_title || 'Schedule Your Free Consultation'}
                    </h2>
                    <p className={`${isTownHub ? 'text-[14px] leading-relaxed text-[#5f6f82]' : 'text-gray-500 text-sm'}`}>
                      Select a time that works for you. We&apos;ll confirm shortly.
                    </p>
                  </div>

                  <div className={isTownHub ? 'relative flex min-h-0 flex-1 flex-col rounded-2xl border border-[#eadcc4] bg-white px-5 pt-5 pb-7 shadow-[0_12px_28px_rgba(30,47,74,0.08)] md:px-6 md:pt-6 md:pb-8' : 'bg-white p-6 md:p-8 h-full flex flex-col justify-center'}>
                    {isTownHub ? <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#c89b5b]/0 via-[#c89b5b]/65 to-[#c89b5b]/0" /> : null}
                    <form onSubmit={handleSubmit} className={isTownHub ? 'flex h-full flex-col space-y-[18px]' : 'space-y-4'}>
                      {fields.map((field, index) => {
                        const isTextarea = field.type === 'textarea';
                        const options = normalizeOptions(field.options);

                        const isFile = field.type === 'file';

                        return (
                          <div key={`${field.name}-${index}`} className={isTownHub ? 'space-y-1.5' : 'space-y-2'}>
                            <label
                              htmlFor={field.name}
                              className={isTownHub ? 'block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#66778f]' : 'block text-xs font-bold text-muted-foreground uppercase tracking-wide'}
                            >
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
                                className={selectClass}
                              >
                                <option value="">{field.placeholder || 'Select...'}</option>
                                {options.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            ) : isTextarea ? (
                              <textarea
                                id={field.name}
                                name={field.name}
                                required={field.required}
                                rows={4}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                placeholder={field.placeholder}
                                className={textareaClass}
                              />
                            ) : isFile ? (
                              <div className="relative">
                                <input
                                  id={field.name}
                                  name={field.name}
                                  type="file"
                                  multiple
                                  accept="image/*"
                                  className="hidden"
                                />
                                <label
                                  htmlFor={field.name}
                                  className={isTownHub ? 'flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border border-[#dfd1bb] bg-[#f9f4ea] px-4 text-sm font-medium text-[#5f6f82] transition-colors hover:border-[#c89b5b]' : 'flex items-center justify-center w-full h-12 px-4 bg-secondary border border-border hover:border-accent cursor-pointer transition-colors text-muted-foreground font-medium text-sm rounded-none'}
                                >
                                  <span className="font-bold text-primary mr-2">Choose Files</span>
                                  <span className="opacity-50">Click to upload images</span>
                                </label>
                              </div>
                            ) : (
                              <input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                required={field.required}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                placeholder={field.placeholder}
                                className={inputClass}
                              />
                            )}
                          </div>
                        );
                      })}

                      {isTownHub ? (
                        <div className="mt-auto space-y-4 pt-3">
                          <div className="flex justify-center">
                            <button
                              type="submit"
                              className="w-full rounded-lg bg-[#C68E4D] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_22px_rgba(188,145,85,0.32)] transition-colors duration-300 hover:bg-[#d29a5d] md:min-w-[280px]"
                            >
                              {data.submit_label || 'Book Free Consultation'}
                            </button>
                          </div>

                          {privacyText ? (
                            <p className="mt-5 text-center text-[10px] uppercase tracking-wide text-muted-foreground">
                              {privacyText}
                            </p>
                          ) : null}

                          {data.form_placeholder ? (
                            <p className="mt-2 inline-flex items-center gap-2 rounded-md bg-[#f6f2e9] px-3 py-1.5 text-xs text-[#6b5a3d]">
                              <CheckCircle2 className="h-4 w-4 text-[#C89B5B]" />
                              Form is in placeholder mode.
                            </p>
                          ) : null}
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-center">
                            <button
                              type="submit"
                              className="w-full md:w-auto md:min-w-[320px] bg-[#C68E4D] text-white uppercase tracking-[0.15em] font-semibold text-sm md:text-base min-h-[44px] py-5 px-8 rounded-none transition-colors duration-300 hover:bg-[#d29a5d]"
                            >
                              {data.submit_label || 'Book Free Consultation'}
                            </button>
                          </div>

                          {privacyText ? (
                            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-wide mt-4">
                              {privacyText}
                            </p>
                          ) : null}

                          {data.form_placeholder ? (
                            <p className="mt-2 inline-flex items-center gap-2 rounded-md bg-[#f6f2e9] px-3 py-1.5 text-xs text-[#6b5a3d]">
                              <CheckCircle2 className="h-4 w-4 text-[#C89B5B]" />
                              Form is in placeholder mode.
                            </p>
                          ) : null}
                        </>
                      )}
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
