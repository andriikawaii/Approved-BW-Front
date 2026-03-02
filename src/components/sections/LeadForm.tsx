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
  const inputClass =
    'w-full min-w-0 border bg-secondary border-border rounded-none h-12 px-3 py-2 text-sm text-[#1E2F4A] shadow-xs outline-none transition-[color,box-shadow] focus:border-accent focus-visible:ring-[3px] focus-visible:ring-ring/50';
  const textareaClass =
    'w-full border bg-secondary border-border rounded-none min-h-[80px] px-3 py-2 text-sm text-[#1E2F4A] shadow-xs outline-none transition-[color,box-shadow] focus:border-accent focus-visible:ring-[3px] focus-visible:ring-ring/50';
  const selectClass = inputClass;

  return (
    <section id="lead-form" className="py-24 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
          {/* LEFT */}
          <div
            className="relative lg:w-1/2 min-h-[400px] lg:min-h-full"
            style={{
              backgroundImage: data.background_image ? `url(${data.background_image})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#1A2B45',
            }}
          >
            <div className="absolute inset-0 bg-[#1A2B45]/70" />

            <div className="absolute inset-0 flex flex-col justify-start pt-16 px-12 lg:px-16">
              <div className="max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="text-[#C68E4D] font-bold uppercase tracking-widest text-sm mb-4 block">
                  Start Your Project
                </span>

                <h2 className="font-serif text-4xl md:text-5xl font-bold !text-white mb-6 leading-tight">
                  {main}
                  {accent ? (
                    <>
                      <br />
                      <span className="text-[#C68E4D]">{accent}</span>
                    </>
                  ) : null}
                </h2>

                {subtitle ? (
                  <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                    {subtitle}
                  </p>
                ) : null}

                <div className="space-y-8 hidden md:block mt-12">
                  {steps.slice(0, 3).map((step, index) => (
                    <div key={`step-${step.number || index + 1}`} className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-full bg-[#C68E4D] flex items-center justify-center text-white font-bold shrink-0 text-xl shadow-lg">
                        {step.number || index + 1}
                      </div>
                      <span className="text-white font-bold text-xl tracking-wide">
                        {step.text || step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:w-1/2 bg-white p-6 md:p-10 lg:p-12 flex flex-col justify-start pt-6 lg:pt-8">
            <div className="w-full max-w-md mx-auto">
              {submitted ? (
                <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#1A2B45] mb-2">
                    Thank You
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {successMessage}
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 text-center">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A2B45] mb-2">
                      {data.form_title || 'Schedule Your Free Consultation'}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Select a time that works for you. We&apos;ll confirm shortly.
                    </p>
                  </div>

                  <div className="bg-white p-6 md:p-8 h-full flex flex-col justify-center">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {fields.map((field, index) => {
                        const isTextarea = field.type === 'textarea';
                        const options = normalizeOptions(field.options);

                        const isFile = field.type === 'file';

                        return (
                          <div key={`${field.name}-${index}`} className="space-y-2">
                            <label
                              htmlFor={field.name}
                              className="block text-xs font-bold text-muted-foreground uppercase tracking-wide"
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
                                  className="flex items-center justify-center w-full h-12 px-4 bg-secondary border border-border hover:border-accent cursor-pointer transition-colors text-muted-foreground font-medium text-sm rounded-none"
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

                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="w-full md:w-auto md:min-w-[320px] 
                                    bg-[#C68E4D] 
                                    text-white 
                                    uppercase 
                                    tracking-[0.15em] 
                                    font-semibold 
                                    text-sm md:text-base 
                                    py-5 px-8 
                                    rounded-none 
                                    transition-colors duration-300 
                                    hover:bg-[#d29a5d]"
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