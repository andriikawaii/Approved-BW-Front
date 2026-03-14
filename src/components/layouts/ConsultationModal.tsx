'use client';

import { useEffect, useState } from 'react';
import { CalendarDays, Home, Monitor, X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const TIME_SLOTS = ['8:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '12:00 PM - 2:00 PM', '2:00 PM - 4:00 PM'];
const TODAY = new Date().toISOString().slice(0, 10);

function cls(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export default function ConsultationModal({ open, onClose }: Props) {
  const [visitType, setVisitType] = useState<'in_person' | 'google_meet'>('in_person');
  const [county, setCounty] = useState<'fairfield' | 'new_haven'>('fairfield');
  const [date, setDate] = useState(TODAY);
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 12:00 PM');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#151E30]/70 px-4 py-8 backdrop-blur-[2px]">
      <button type="button" aria-label="Close consultation modal" className="absolute inset-0" onClick={onClose} />

      <div className="relative z-[1] w-full max-w-[640px] overflow-hidden rounded-[18px] bg-white shadow-[0_28px_70px_rgba(0,0,0,0.38)]">
        <div className="relative bg-[#1E2F4A] px-8 pb-7 pt-8 text-center text-white">
          <button
            type="button"
            aria-label="Close consultation modal"
            onClick={onClose}
            className="absolute right-6 top-5 text-white/80 transition-colors hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="font-serif text-[42px] font-bold leading-none tracking-[-0.03em]">
            Schedule a <span className="text-[#C89B5B]">Free Consultation</span>
          </h2>
          <p className="mt-3 text-[15px] text-white/82">No charge, no obligation. Pick a time that works for you.</p>
        </div>

        <div className="bg-white px-8 pb-8 pt-8">
          {submitted ? (
            <div className="py-10 text-center">
              <h3 className="font-serif text-4xl font-bold text-[#1E2F4A]">Request Received</h3>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-[#61718a]">
                We&apos;ll send a confirmation to your email within 24 hours.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 inline-flex min-h-[50px] items-center justify-center rounded-[6px] bg-[#C89B5B] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#b17f42]"
              >
                Close
              </button>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-6"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setVisitType('in_person')}
                  className={cls(
                    'rounded-[10px] border px-5 py-5 text-center transition-colors',
                    visitType === 'in_person' ? 'border-[#C89B5B] bg-[#f8f3eb]' : 'border-[#d7deea] bg-white',
                  )}
                >
                  <Home className="mx-auto h-7 w-7 text-[#C89B5B]" />
                  <div className="mt-4 text-[14px] font-semibold text-[#1E2F4A]">In-Person Visit</div>
                  <div className="mt-2 text-[13px] leading-6 text-[#66768f]">
                    We come to your home
                    <br />
                    Mon-Fri, 8am - 4pm
                    <br />
                    2-hour windows
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setVisitType('google_meet')}
                  className={cls(
                    'rounded-[10px] border px-5 py-5 text-center transition-colors',
                    visitType === 'google_meet' ? 'border-[#C89B5B] bg-[#f8f3eb]' : 'border-[#d7deea] bg-white',
                  )}
                >
                  <Monitor className="mx-auto h-7 w-7 text-[#C89B5B]" />
                  <div className="mt-4 text-[14px] font-semibold text-[#1E2F4A]">Google Meet</div>
                  <div className="mt-2 text-[13px] leading-6 text-[#66768f]">
                    Video call from anywhere
                    <br />
                    Mon-Fri 8am-6pm, Sat 9am-3pm
                    <br />
                    1-hour windows
                  </div>
                </button>
              </div>

              <div>
                <div className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1E2F4A]">Which County?</div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setCounty('fairfield')}
                    className={cls(
                      'min-h-[52px] rounded-[6px] border px-4 text-sm font-semibold transition-colors',
                      county === 'fairfield' ? 'border-[#C89B5B] bg-[#f8f3eb] text-[#1E2F4A]' : 'border-[#d7deea] text-[#1E2F4A]',
                    )}
                  >
                    Fairfield County
                  </button>
                  <button
                    type="button"
                    onClick={() => setCounty('new_haven')}
                    className={cls(
                      'min-h-[52px] rounded-[6px] border px-4 text-sm font-semibold transition-colors',
                      county === 'new_haven' ? 'border-[#C89B5B] bg-[#f8f3eb] text-[#1E2F4A]' : 'border-[#d7deea] text-[#1E2F4A]',
                    )}
                  >
                    New Haven County
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1E2F4A]">
                  Select a Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={TODAY}
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    className="h-[52px] w-full rounded-[6px] border border-[#d7deea] px-4 pr-11 text-[15px] text-[#1E2F4A] outline-none transition-colors focus:border-[#C89B5B]"
                  />
                  <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1E2F4A]" />
                </div>
              </div>

              <div>
                <div className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1E2F4A]">Available Times</div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={cls(
                        'min-h-[54px] rounded-[6px] border px-4 text-sm font-semibold transition-colors',
                        timeSlot === slot ? 'border-[#C89B5B] bg-[#f8f3eb] text-[#1E2F4A]' : 'border-[#d7deea] text-[#1E2F4A]',
                      )}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1E2F4A]">Your Name</label>
                  <input type="text" required placeholder="Full name" className="h-[48px] w-full rounded-[6px] border border-[#d7deea] px-4 text-[15px] text-[#1E2F4A] outline-none transition-colors focus:border-[#C89B5B]" />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1E2F4A]">Phone Number</label>
                  <input type="tel" required placeholder="(203) 000-0000" className="h-[48px] w-full rounded-[6px] border border-[#d7deea] px-4 text-[15px] text-[#1E2F4A] outline-none transition-colors focus:border-[#C89B5B]" />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1E2F4A]">Email</label>
                  <input type="email" required placeholder="you@email.com" className="h-[48px] w-full rounded-[6px] border border-[#d7deea] px-4 text-[15px] text-[#1E2F4A] outline-none transition-colors focus:border-[#C89B5B]" />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1E2F4A]">Zip Code</label>
                  <input type="text" required placeholder="06477" className="h-[48px] w-full rounded-[6px] border border-[#d7deea] px-4 text-[15px] text-[#1E2F4A] outline-none transition-colors focus:border-[#C89B5B]" />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[6px] bg-[#C89B5B] px-6 text-base font-semibold text-white transition-colors hover:bg-[#b17f42]"
              >
                Confirm Consultation
              </button>

              <p className="text-center text-[14px] italic text-[#73829a]">We&apos;ll send a confirmation to your email within 24 hours.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
