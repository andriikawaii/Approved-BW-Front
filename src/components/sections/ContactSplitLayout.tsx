'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

type LeftPanel = {
  headline?: string;
  content?: string;
  bullets?: string[];
};

type RightPanel = {
  form_fields?: string[];
  submit_label?: string;
  form_placeholder?: boolean;
};

type Props = {
  data: {
    left?: LeftPanel;
    right?: RightPanel;
  };
};

type FieldConfig = {
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder: string;
  options?: string[];
  fullWidth?: boolean;
};

const FIELD_CONFIG: Record<string, FieldConfig> = {
  name: {
    label: 'Full Name',
    type: 'text',
    placeholder: 'John Smith',
  },
  email: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'name@email.com',
  },
  phone: {
    label: 'Phone Number',
    type: 'tel',
    placeholder: '(203) 555-0100',
  },
  address: {
    label: 'Property Address',
    type: 'text',
    placeholder: 'City, State',
    fullWidth: true,
  },
  project_type: {
    label: 'Project Type',
    type: 'select',
    placeholder: 'Select project type',
    options: ['Kitchen Remodel', 'Bathroom Remodel', 'Basement Finishing', 'Home Addition', 'Other'],
  },
  message: {
    label: 'Project Details',
    type: 'textarea',
    placeholder: 'Tell us about your project goals and timeline...',
    fullWidth: true,
  },
};

function getFieldConfig(fieldName: string): FieldConfig {
  return (
    FIELD_CONFIG[fieldName] || {
      label: fieldName
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase()),
      type: 'text',
      placeholder: '',
    }
  );
}

export default function ContactSplitLayout({ data }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const left = data.left || {};
  const right = data.right || {};
  const fields = right.form_fields && right.form_fields.length > 0
    ? right.form_fields
    : ['name', 'email', 'phone', 'message'];

  const onChange = (fieldName: string, value: string) => {
    setValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-[#f5f3ef] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-2xl border border-[#e6dece] bg-white shadow-[0_18px_40px_rgba(30,47,74,0.12)] lg:grid lg:grid-cols-[1fr_1.05fr]">
          <div className="relative overflow-hidden bg-[#1E2F4A] p-8 text-white md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.18),transparent_36%)]" />
            <div className="relative z-10">
              <h2 className="text-3xl !text-[#C89B5B] font-semibold leading-tight md:text-[40px]">
                {left.headline || 'Why Homeowners Trust BuiltWell'}
              </h2>
              {left.content ? (
                <p className="mt-5 text-base leading-relaxed text-white/85">{left.content}</p>
              ) : null}

              {left.bullets && left.bullets.length > 0 ? (
                <ul className="mt-7 space-y-3">
                  {left.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#C89B5B]" />
                      <span className="text-sm leading-relaxed text-white/88">{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <div className="bg-white p-8 md:p-10">
            {submitted ? (
              <div className="flex min-h-[420px] items-center justify-center text-center">
                <div>
                  <h3 className="text-[34px] font-semibold text-[#1E2F4A]">Message Sent</h3>
                  <p className="mx-auto mt-4 max-w-md text-[#5f6f87]">
                    Thanks for reaching out. Our team will contact you shortly.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-semibold text-[#1E2F4A] md:text-[36px]">Get Your Free Consultation</h3>
                <p className="mt-3 text-sm text-[#63748d]">Tell us about your project and we will follow up quickly.</p>

                <form onSubmit={onSubmit} className="mt-7 grid gap-4 sm:grid-cols-2">
                  {fields.map((fieldName) => {
                    const config = getFieldConfig(fieldName);
                    const wrapperClass = config.fullWidth ? 'sm:col-span-2' : '';

                    return (
                      <div key={fieldName} className={wrapperClass}>
                        <label htmlFor={fieldName} className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#607089]">
                          {config.label}
                        </label>

                        {config.type === 'select' ? (
                          <select
                            id={fieldName}
                            name={fieldName}
                            value={values[fieldName] || ''}
                            onChange={(event) => onChange(fieldName, event.target.value)}
                            className="w-full rounded-md border border-[#d9d0be] bg-white px-3 py-3 text-base text-[#1E2F4A] outline-none transition-colors focus:border-[#C89B5B] md:text-sm"
                            required
                          >
                            <option value="">{config.placeholder}</option>
                            {config.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : config.type === 'textarea' ? (
                          <textarea
                            id={fieldName}
                            name={fieldName}
                            rows={5}
                            value={values[fieldName] || ''}
                            onChange={(event) => onChange(fieldName, event.target.value)}
                            placeholder={config.placeholder}
                            className="w-full rounded-md border border-[#d9d0be] bg-white px-3 py-3 text-base text-[#1E2F4A] outline-none transition-colors focus:border-[#C89B5B] md:text-sm"
                            required
                          />
                        ) : (
                          <input
                            id={fieldName}
                            name={fieldName}
                            type={config.type}
                            value={values[fieldName] || ''}
                            onChange={(event) => onChange(fieldName, event.target.value)}
                            placeholder={config.placeholder}
                            className="w-full rounded-md border border-[#d9d0be] bg-white px-3 py-3 text-base text-[#1E2F4A] outline-none transition-colors focus:border-[#C89B5B] md:text-sm"
                            required
                          />
                        )}
                      </div>
                    );
                  })}

                  <div className="sm:col-span-2">
                    {right.form_placeholder ? (
                      <p className="mb-3 text-xs text-[#74849a]">Demo form placeholder (submission endpoint not connected).</p>
                    ) : null}
                    <button
                      type="submit"
                      className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md bg-[#C89B5B] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#b98747]"
                    >
                      {right.submit_label || 'Send Message'}
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

