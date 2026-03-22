'use client';

import { useState } from 'react';

type FormField = {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  options?: string[];
};

type Props = {
  data: {
    headline?: string;
    title?: string;
    description?: string;
    form_fields?: FormField[];
    submit_label?: string;
    form_placeholder?: boolean;
  };
};

export default function ApplicationFormSection({ data }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const fields = data.form_fields || [];

  const onChange = (fieldName: string, value: string) => {
    setValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-[#f3f3f2] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-semibold text-[#1E2F4A] md:text-[44px]">
            {data.headline || data.title || 'Apply to Work With Us'}
          </h2>
          {data.description ? <p className="mx-auto mt-4 max-w-3xl text-base text-[#5f6f87] md:text-lg">{data.description}</p> : null}
        </div>

        <div className="mx-auto max-w-5xl rounded-2xl border border-[#e2d7c2] bg-white p-7 shadow-[0_16px_32px_rgba(30,47,74,0.1)] md:p-9">
          {submitted ? (
            <div className="py-16 text-center">
              <h3 className="text-3xl font-semibold text-[#1E2F4A]">Application Submitted</h3>
              <p className="mx-auto mt-4 max-w-xl text-[#607089]">
                Thanks for applying. Our operations team will review your information and follow up.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => {
                const isFullWidth = field.type === 'file';
                const wrapperClass = isFullWidth ? 'sm:col-span-2' : '';
                const fieldLabel = field.label || field.name;

                if (field.type === 'select') {
                  return (
                    <div key={field.name} className={wrapperClass}>
                      <label htmlFor={field.name} className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#607089]">
                        {fieldLabel}
                        {field.required ? <span className="text-[#b33f3f]"> *</span> : null}
                      </label>
                      <select
                        id={field.name}
                        name={field.name}
                        value={values[field.name] || ''}
                        onChange={(event) => onChange(field.name, event.target.value)}
                        required={field.required}
                        className="w-full rounded-md border border-[#d9d0be] bg-white px-3 py-3 text-base text-[#1E2F4A] outline-none transition-colors focus:border-[#C89B5B] md:text-sm"
                      >
                        <option value="">Select...</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }

                if (field.type === 'file') {
                  return (
                    <div key={field.name} className={wrapperClass}>
                      <label htmlFor={field.name} className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#607089]">
                        {fieldLabel}
                        {field.required ? <span className="text-[#b33f3f]"> *</span> : null}
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type="file"
                        required={field.required}
                        className="w-full rounded-md border border-[#d9d0be] bg-white px-3 py-2.5 text-base text-[#1E2F4A] outline-none transition-colors focus:border-[#C89B5B] md:text-sm"
                      />
                    </div>
                  );
                }

                return (
                  <div key={field.name} className={wrapperClass}>
                    <label htmlFor={field.name} className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#607089]">
                      {fieldLabel}
                      {field.required ? <span className="text-[#b33f3f]"> *</span> : null}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type || 'text'}
                      value={values[field.name] || ''}
                      onChange={(event) => onChange(field.name, event.target.value)}
                      required={field.required}
                      className="w-full rounded-md border border-[#d9d0be] bg-white px-3 py-3 text-base text-[#1E2F4A] outline-none transition-colors focus:border-[#C89B5B] md:text-sm"
                    />
                  </div>
                );
              })}

              <div className="sm:col-span-2">
                {data.form_placeholder ? (
                  <p className="mb-3 text-xs text-[#74849a]">Demo form placeholder (submission endpoint not connected).</p>
                ) : null}
                <button
                  type="submit"
                  className="w-full min-h-[44px] rounded-md bg-[#1E2F4A] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#253e61]"
                >
                  {data.submit_label || 'Submit Application'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

