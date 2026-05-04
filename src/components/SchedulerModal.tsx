'use client';

import { createContext, useCallback, useContext, useEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';

type SchedulerContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const SchedulerContext = createContext<SchedulerContextValue | null>(null);

export function useScheduler(): SchedulerContextValue {
  const ctx = useContext(SchedulerContext);
  if (!ctx) {
    return { open: () => {}, close: () => {}, isOpen: false };
  }
  return ctx;
}

const SCHEDULER_URL = process.env.NEXT_PUBLIC_SCHEDULER_URL || '';
const FREE_CONSULTATION_PATH = '/free-consultation/';

export function SchedulerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  // Intentionally NOT intercepting /free-consultation/ link clicks.
  // The full /free-consultation/ page already has a polished, wired-up multi-step
  // form with the proper backend endpoint. Let those links navigate normally.
  // The modal stays available for future use (e.g. iframe-based scheduler) but
  // isnt opened by global link clicks today.

  return (
    <SchedulerContext.Provider value={{ open, close, isOpen }}>
      {children}
      {isOpen ? <SchedulerModal onClose={close} /> : null}
    </SchedulerContext.Provider>
  );
}

function SchedulerModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Schedule a Free Consultation"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-3 py-6 sm:px-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-[640px] overflow-hidden rounded-[16px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.3)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close scheduler"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#1e2b43] shadow-md transition-colors hover:bg-[#f3eee6]"
        >
          <X className="h-5 w-5" strokeWidth={2.2} />
        </button>

        {SCHEDULER_URL ? (
          <iframe
            src={SCHEDULER_URL}
            title="Schedule a Free Consultation"
            className="h-[80vh] w-full border-0"
            allow="payment"
          />
        ) : (
          <SchedulerForm onClose={onClose} />
        )}
      </div>
    </div>
  );
}

const SERVICES = [
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Basement Finishing',
  'Flooring',
  'Home Additions',
  'Interior Painting',
  'Other',
];

const TIMES = ['Morning (8am–12pm)', 'Afternoon (12pm–4pm)', 'Evening (4pm–6pm)', 'Anytime'];

function SchedulerForm({ onClose }: { onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const services = (fd.getAll('services') as string[]).filter(Boolean);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://api.builtwellct.com';
    try {
      const res = await fetch(`${apiBase}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          phone: fd.get('phone'),
          email: fd.get('email'),
          zip: fd.get('zip'),
          services,
          best_time: fd.get('best_time'),
          consultation_type: 'virtual',
          source: 'scheduler_modal',
          message: fd.get('message') || '',
          consent: true,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data && typeof data === 'object' && (data as { message?: string }).message) || `Submission failed (${res.status})`);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit. Please call us.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="px-6 py-12 text-center sm:px-10">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#bc9155]/15 text-[#bc9155]">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="font-serif text-[26px] font-bold text-[#1e2b43]">Got it. We&rsquo;ll be in touch.</h2>
        <p className="mx-auto mt-3 max-w-[420px] text-[15px] leading-[1.65] text-[#5c677d]">
          We received your request and will reach out within one business day with a calendar invite, including the Google Meet link for your virtual consultation.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex items-center justify-center rounded-[10px] bg-[#1e2b43] px-6 py-3 text-[14px] font-bold uppercase tracking-[0.5px] text-white transition-colors hover:bg-[#2c3d5e]"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="max-h-[85vh] overflow-y-auto px-6 pb-7 pt-7 sm:px-10 sm:pt-9 sm:pb-9">
      <div className="mb-5">
        <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#9a7340]">Schedule a Free Consultation</span>
        <h2 className="mt-2 font-serif text-[26px] font-bold leading-[1.15] text-[#1e2b43] sm:text-[30px]">
          Tell us about your project
        </h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-[#5c677d]">
          We respond within one business day with next steps and a Google Meet calendar invite.
        </p>
      </div>

      <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" name="name" required placeholder="Your full name" />
          <Field label="Phone" name="phone" type="tel" required placeholder="(203) 000-0000" />
          <Field label="Email" name="email" type="email" required placeholder="you@email.com" />
          <Field label="Zip Code" name="zip" required placeholder="06477" />
        </div>

        <div>
          <span className="mb-2 block text-[12px] font-semibold text-[#1e2b43]">What do you need? *</span>
          <div className="grid grid-cols-2 gap-2">
            {SERVICES.map((s) => (
              <label key={s} className="flex cursor-pointer items-center gap-2 rounded-[8px] border border-[#e7eaf0] bg-white px-3 py-2 text-[13px] text-[#1e2b43] transition-colors hover:border-[#bc9155] has-[:checked]:border-[#bc9155] has-[:checked]:bg-[#bc9155]/8">
                <input type="checkbox" name="services" value={s} className="h-4 w-4 rounded border-[#cbd2dd] text-[#bc9155] focus:ring-[#bc9155]" />
                {s}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[12px] font-semibold text-[#1e2b43]">
            Best Time to Contact <span className="text-[#bc9155]">*</span>
          </label>
          <select
            name="best_time"
            required
            defaultValue=""
            className="block w-full rounded-[8px] border border-[#cbd2dd] bg-white px-3 py-2.5 text-[14px] text-[#1e2b43] focus:border-[#bc9155] focus:outline-none focus:ring-2 focus:ring-[#bc9155]/30"
          >
            <option value="" disabled>Pick a time</option>
            {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <Field label="Anything else?" name="message" textarea placeholder="Project details, timeline, budget range, or questions" />

        <p className="text-[11px] leading-[1.55] text-[#68758d]">
          By submitting, you agree BuiltWell CT may contact you by phone, text, or email. Reply STOP to opt out. See our Privacy Policy and Terms.
        </p>

        {error ? (
          <div className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>
        ) : null}

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-[10px] bg-[#bc9155] px-6 py-3 text-[14px] font-bold uppercase tracking-[0.5px] text-white transition-colors hover:bg-[#a57d48] disabled:opacity-60"
          >
            {submitting ? 'Sending…' : 'Request Consultation'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label, name, type = 'text', required = false, placeholder, textarea = false,
}: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string; textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-semibold text-[#1e2b43]">
        {label} {required ? <span className="text-[#bc9155]">*</span> : null}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={3}
          className="block w-full rounded-[8px] border border-[#cbd2dd] bg-white px-3 py-2.5 text-[14px] text-[#1e2b43] focus:border-[#bc9155] focus:outline-none focus:ring-2 focus:ring-[#bc9155]/30"
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className="block w-full rounded-[8px] border border-[#cbd2dd] bg-white px-3 py-2.5 text-[14px] text-[#1e2b43] focus:border-[#bc9155] focus:outline-none focus:ring-2 focus:ring-[#bc9155]/30"
        />
      )}
    </label>
  );
}

export function ScheduleButton({
  className,
  children,
  ariaLabel,
}: {
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  const { open } = useScheduler();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );
}
