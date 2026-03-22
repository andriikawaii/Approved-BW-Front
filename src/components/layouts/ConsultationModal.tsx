'use client';

import { useEffect, useState } from 'react';
import { CalendarDays, X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const IN_PERSON_SLOTS = ['8:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '12:00 PM - 2:00 PM', '2:00 PM - 4:00 PM'];
const REMOTE_SLOTS = [
  '8:00 AM - 9:00 AM',
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '1:00 PM - 2:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
  '5:00 PM - 6:00 PM',
];
const TODAY = new Date().toISOString().slice(0, 10);

function cls(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export default function ConsultationModal({ open, onClose }: Props) {
  const [visitType, setVisitType] = useState<'in_person' | 'google_meet'>('google_meet');
  const [county, setCounty] = useState<'fairfield' | 'new_haven'>('fairfield');
  const [date, setDate] = useState(TODAY);
  const [timeSlot, setTimeSlot] = useState('9:00 AM - 10:00 AM');
  const [submitted, setSubmitted] = useState(false);
  const availableSlots = visitType === 'google_meet' ? REMOTE_SLOTS : IN_PERSON_SLOTS;

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
    <div className="fixed inset-0 z-[1600] flex items-start justify-center overflow-y-auto bg-[#151E30]/72 px-4 py-5 backdrop-blur-[3px] md:items-center md:py-8">
      <button
        type="button"
        aria-label="Close consultation modal"
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative z-[1] my-auto max-h-[calc(100vh-24px)] w-full max-w-[640px] overflow-y-auto rounded-[12px] bg-white shadow-[0_28px_70px_rgba(0,0,0,0.38)] md:max-h-[90vh]">
        <div className="relative bg-[#1E2F4A] px-8 pb-5 pt-6 text-center text-white">
          <button
            type="button"
            aria-label="Close consultation modal"
            onClick={onClose}
            className="absolute right-5 top-4 flex h-11 w-11 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="font-serif text-[30px] font-bold leading-none tracking-[-0.02em]">
            Schedule a <span className="text-[#C89B5B]">Free Consultation</span>
          </h2>
          <p className="mt-2 text-[14px] text-white/82">No charge, no obligation. Pick a time that works for you.</p>
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
                  onClick={() => {
                    setVisitType('in_person');
                    setTimeSlot((current) =>
                      IN_PERSON_SLOTS.includes(current) ? current : IN_PERSON_SLOTS[0],
                    );
                  }}
                  className={cls(
                    'rounded-[10px] border px-5 py-5 text-center transition-[border-color,background-color,box-shadow] duration-200',
                    visitType === 'in_person'
                      ? 'border-[#C89B5B] bg-[#f8f3eb]'
                      : 'border-[#d7deea] bg-white hover:border-[#C89B5B] hover:bg-[#f8f3eb]',
                  )}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    className="mx-auto text-[#C89B5B]"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
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
                  onClick={() => {
                    setVisitType('google_meet');
                    setTimeSlot((current) =>
                      REMOTE_SLOTS.includes(current) ? current : REMOTE_SLOTS[1],
                    );
                  }}
                  className={cls(
                    'rounded-[10px] border px-5 py-5 text-center transition-[border-color,background-color,box-shadow] duration-200',
                    visitType === 'google_meet'
                      ? 'border-[#C89B5B] bg-[#f8f3eb]'
                      : 'border-[#d7deea] bg-white hover:border-[#C89B5B] hover:bg-[#f8f3eb]',
                  )}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    className="mx-auto text-[#C89B5B]"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
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

              {visitType === 'in_person' ? (
                <div>
                  <div className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1E2F4A]">Which County?</div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setCounty('fairfield')}
                      className={cls(
                        'min-h-[52px] rounded-[6px] border px-4 text-sm font-semibold transition-[border-color,background-color,color] duration-200',
                        county === 'fairfield'
                          ? 'border-[#C89B5B] bg-[#f8f3eb] text-[#1E2F4A]'
                          : 'border-[#d7deea] bg-white text-[#1E2F4A] hover:border-[#C89B5B] hover:bg-[#f8f3eb]',
                      )}
                    >
                      Fairfield County
                    </button>
                    <button
                      type="button"
                      onClick={() => setCounty('new_haven')}
                      className={cls(
                        'min-h-[52px] rounded-[6px] border px-4 text-sm font-semibold transition-[border-color,background-color,color] duration-200',
                        county === 'new_haven'
                          ? 'border-[#C89B5B] bg-[#f8f3eb] text-[#1E2F4A]'
                          : 'border-[#d7deea] bg-white text-[#1E2F4A] hover:border-[#C89B5B] hover:bg-[#f8f3eb]',
                      )}
                    >
                      New Haven County
                    </button>
                  </div>
                </div>
              ) : null}

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
                    className="h-[52px] w-full rounded-[6px] border border-[#d7deea] px-4 pr-11 text-[15px] text-[#1E2F4A] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#C89B5B] focus:ring-0"
                  />
                  <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1E2F4A]" />
                </div>
              </div>

              <div>
                <div className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1E2F4A]">Available Times</div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={cls(
                        'min-h-[54px] rounded-[6px] border px-4 text-sm font-semibold transition-[border-color,background-color,color,box-shadow] duration-200',
                        timeSlot === slot
                          ? 'border-[#C89B5B] bg-[#C89B5B] text-white'
                          : 'border-[#d7deea] bg-white text-[#1E2F4A] hover:border-[#C89B5B]',
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
                  <input type="text" required placeholder="Full name" className="h-[48px] w-full rounded-[6px] border border-[#d7deea] px-4 text-[15px] text-[#1E2F4A] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#C89B5B] focus:ring-0" />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1E2F4A]">Phone Number</label>
                  <input type="tel" required placeholder="(203) 000-0000" className="h-[48px] w-full rounded-[6px] border border-[#d7deea] px-4 text-[15px] text-[#1E2F4A] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#C89B5B] focus:ring-0" />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1E2F4A]">Email</label>
                  <input type="email" required placeholder="you@email.com" className="h-[48px] w-full rounded-[6px] border border-[#d7deea] px-4 text-[15px] text-[#1E2F4A] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#C89B5B] focus:ring-0" />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1E2F4A]">Zip Code</label>
                  <input type="text" required placeholder="06477" className="h-[48px] w-full rounded-[6px] border border-[#d7deea] px-4 text-[15px] text-[#1E2F4A] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#C89B5B] focus:ring-0" />
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
