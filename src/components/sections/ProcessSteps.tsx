'use client';

import { useState } from 'react';

type Step = {
  title: string;
  short?: string;
  description?: string;
  step_number?: number;
};

type Props = {
  data: {
    title?: string;
    headline?: string;
    subtitle?: string;
    steps?: Step[];
    variant?: 'light' | 'dark';
    background_image?: string;
  };
};

export default function ProcessSteps({ data }: Props) {
  const title = data.title || data.headline || "";
  const steps = data.steps || [];
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const desktopColsClass =
    steps.length >= 5
      ? "lg:grid-cols-5"
      : steps.length === 4
        ? "lg:grid-cols-4"
        : steps.length === 3
          ? "lg:grid-cols-3"
          : steps.length === 2
            ? "lg:grid-cols-2"
            : "lg:grid-cols-1";

  const tabletColsClass = steps.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1";

  // Detect "our process" or "remodeling process" to use dark variant
  const isDark = data.variant === 'dark' || /process/i.test(title);

  if (isDark) {
    return (
      <section className="relative overflow-hidden py-24 md:py-28 text-white isolate">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${data.background_image || '/images/team/builtwell-team-contractors-ct-05.png'})`,
          }}
        />
        <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(135deg, rgba(10,18,34,0.90) 0%, rgba(30,43,67,0.85) 100%)' }} />

        <div className="relative z-10 mx-auto max-w-[1240px] px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.5px] text-[#C89B5B]">
              <span className="h-[2px] w-[10px] bg-[#C89B5B]" />
              Our Process
            </div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold text-white tracking-[-0.5px]">
              Our <span className="text-[#C89B5B]">Remodeling Process</span>
            </h2>
            {data.subtitle ? (
              <p className="mx-auto mt-5 max-w-[700px] text-[17px] leading-[1.75] text-white/60">
                {data.subtitle}
              </p>
            ) : null}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Horizontal line (desktop) */}
            <div className="hidden lg:block absolute top-[34px] left-[10%] right-[10%] h-[2px] bg-[rgba(188,145,85,0.25)]" />

            <div className={`grid grid-cols-1 ${tabletColsClass} ${desktopColsClass} gap-0 relative z-10`}>
              {steps.map((step, i) => {
                const isActive = activeStep === i;
                return (
                  <button
                    key={i}
                    type="button"
                    className={`group text-center px-4 py-4 rounded-lg transition-colors duration-300 cursor-pointer ${isActive ? 'bg-[rgba(188,145,85,0.14)]' : 'hover:bg-[rgba(188,145,85,0.1)]'}`}
                    onClick={() => setActiveStep(isActive ? null : i)}
                    aria-expanded={isActive}
                  >
                    <div className="w-[68px] h-[68px] rounded-full bg-[rgba(188,145,85,0.42)] border-[2.5px] border-[#C89B5B] flex items-center justify-center mx-auto -mt-2 mb-5 relative z-[2]"
                      style={{ boxShadow: '0 0 0 4px rgba(188,145,85,0.12)' }}>
                      <span className="font-serif text-2xl font-bold text-[#f5e0c0]">{i + 1}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white mb-3">{step.title}</h3>
                    <div className={`text-sm text-white/70 leading-[1.65] transition-all duration-400 overflow-hidden ${isActive ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p>{step.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-center mt-7 text-[13px] text-white/40">Click any step to learn more</p>
          </div>
        </div>
      </section>
    );
  }

  // Light variant (original)
  return (
    <section className="py-16 md:py-24 bg-[#efefee] border-b border-[#e5dccb]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="font-mono text-[#C89B5B] text-sm md:text-lg font-bold uppercase tracking-widest mb-4 block">
            How We Work
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1E2F4A] uppercase tracking-tight">
            {title || "From First Call to "}
            <span className="text-[#C89B5B]">Finished Project</span>
          </h2>
          {data.subtitle ? (
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-[#6B7280]">
              {data.subtitle}
            </p>
          ) : null}
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-[#e5dccb] z-0" />
          <div className={`grid grid-cols-1 ${tabletColsClass} ${desktopColsClass} gap-8 relative z-10`}>
            {steps.map((step, i) => {
              const num = String(step.step_number || i + 1).padStart(2, "0");
              return (
                <div key={i} className="group">
                  <div className="w-24 h-24 bg-white border-2 border-[#e5dccb] group-hover:border-[#C89B5B] flex items-center justify-center mb-6 mx-auto lg:mx-0 transition-colors duration-300 relative">
                    <span className="font-serif text-3xl font-bold text-[#94A3B8] group-hover:text-[#C89B5B] transition-colors">
                      {num}
                    </span>
                    <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-4 w-2 h-2 bg-[#e5dccb] rounded-full" />
                  </div>
                  <div className="text-center lg:text-left">
                    <h3 className="font-serif text-xl font-bold text-[#1E2F4A] uppercase tracking-wide mb-3">
                      {step.title}
                    </h3>
                    {step.description ? (
                      <p className="text-sm text-[#6B7280] leading-relaxed">
                        {step.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
