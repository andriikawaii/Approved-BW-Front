'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Home, Monitor, MessageSquare, X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
};

type PathMode = 'schedule' | 'question' | null;
type ScheduleType = 'in_person' | 'remote';
type SubmitMode = 'schedule' | 'question' | null;
type ErrorMap = Record<string, string>;

const IN_PERSON_SLOTS = ['8:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '12:00 PM - 2:00 PM', '2:00 PM - 4:00 PM'];
const REMOTE_WEEKDAY_SLOTS = [
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
const REMOTE_SATURDAY_SLOTS = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '1:00 PM - 2:00 PM',
  '2:00 PM - 3:00 PM',
];

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getTomorrowIsoDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return toIsoDate(tomorrow);
}

function getDay(isoDate: string) {
  if (!isoDate) return null;
  return new Date(`${isoDate}T12:00:00`).getDay();
}

function cls(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function DayPicker({
  value,
  onChange,
  disableSaturday,
  hasError,
}: {
  value: string;
  onChange: (iso: string) => void;
  disableSaturday: boolean;
  hasError: boolean;
}) {
  const today = startOfDay(new Date());
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + 1);

  const initial = value ? new Date(`${value}T12:00:00`) : minDate;
  const [viewMonth, setViewMonth] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));

  const firstOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  // Monday-first grid: shift Sunday(0) to position 6
  const jsDow = firstOfMonth.getDay();
  const startOffset = jsDow === 0 ? 6 : jsDow - 1;

  const cells: Array<{ iso: string; day: number; jsDow: number; isPast: boolean; isSunday: boolean; isSaturday: boolean; isSelected: boolean } | null> = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
    const iso = toIsoDate(d);
    const dow = d.getDay();
    cells.push({
      iso,
      day,
      jsDow: dow,
      isPast: d < minDate,
      isSunday: dow === 0,
      isSaturday: dow === 6,
      isSelected: iso === value,
    });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const canGoBack = (() => {
    const first = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const previous = new Date(first.getFullYear(), first.getMonth() - 1, 1);
    const monthEnd = new Date(first.getFullYear(), first.getMonth(), 0);
    return monthEnd >= minDate;
  })();
  void canGoBack;
  const previousMonthEnd = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 0);
  const allowPrev = previousMonthEnd >= minDate;

  return (
    <div
      className={cls(
        'rounded-[10px] border bg-white p-3',
        hasError ? 'border-red-500' : 'border-[#1e2b4326]',
      )}
    >
      <div className="mb-2 flex items-center justify-between px-1">
        <button
          type="button"
          disabled={!allowPrev}
          onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
          aria-label="Previous month"
          className={cls(
            'flex h-8 w-8 items-center justify-center rounded-full text-[18px] leading-none transition-colors',
            allowPrev ? 'text-[#1e2b43] hover:bg-[#bc91551a]' : 'cursor-not-allowed text-[#1e2b4340]',
          )}
        >
          ‹
        </button>
        <div className="text-[14px] font-semibold text-[#1e2b43]">
          {MONTH_NAMES[viewMonth.getMonth()]} {viewMonth.getFullYear()}
        </div>
        <button
          type="button"
          onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
          aria-label="Next month"
          className="flex h-8 w-8 items-center justify-center rounded-full text-[18px] leading-none text-[#1e2b43] transition-colors hover:bg-[#bc91551a]"
        >
          ›
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-[0.05em] text-[#5c677d]">
        {DAY_LABELS.map((d, i) => (
          <div key={i} className="py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, idx) => {
          if (!cell) return <div key={idx} className="h-9" />;
          const blocked = cell.isPast || cell.isSunday || (cell.isSaturday && disableSaturday);
          return (
            <button
              key={idx}
              type="button"
              disabled={blocked}
              onClick={() => !blocked && onChange(cell.iso)}
              className={cls(
                'h-9 rounded-[6px] text-[13px] font-medium transition-[background-color,color]',
                cell.isSelected
                  ? 'bg-[#bc9155] text-white shadow-[0_2px_8px_rgba(188,145,85,0.4)]'
                  : blocked
                    ? 'cursor-not-allowed bg-[#f5f1e9]/40 text-[#1e2b4333] line-through decoration-[#1e2b4322]'
                    : 'bg-white text-[#1e2b43] hover:bg-[#bc91551a] hover:text-[#bc9155]',
              )}
            >
              {cell.day}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-[11px] leading-[1.45] text-[#5c677d]">
        {disableSaturday
          ? 'In-person visits Mon-Fri. Sundays closed.'
          : 'Google Meet Mon-Sat. Sundays closed.'}
      </p>
    </div>
  );
}

export default function ConsultationModal({ open, onClose }: Props) {
  const [pathMode, setPathMode] = useState<PathMode>(null);
  const [wizardStep, setWizardStep] = useState(1);
  const [scheduleType, setScheduleType] = useState<ScheduleType>('in_person');
  const [date, setDate] = useState(getTomorrowIsoDate());
  const [selectedSlot, setSelectedSlot] = useState('');
  const [scheduleName, setScheduleName] = useState('');
  const [schedulePhone, setSchedulePhone] = useState('');
  const [scheduleEmail, setScheduleEmail] = useState('');
  const [scheduleZip, setScheduleZip] = useState('');
  const [scheduleAddress, setScheduleAddress] = useState('');
  const [scheduleConsent, setScheduleConsent] = useState(false);

  const [questionName, setQuestionName] = useState('');
  const [questionPhone, setQuestionPhone] = useState('');
  const [questionEmail, setQuestionEmail] = useState('');
  const [questionZip, setQuestionZip] = useState('');
  const [questionContact, setQuestionContact] = useState<'phone' | 'text' | 'email'>('phone');
  const [questionMessage, setQuestionMessage] = useState('');
  const [questionConsent, setQuestionConsent] = useState(false);

  const [errors, setErrors] = useState<ErrorMap>({});
  const [submittedMode, setSubmittedMode] = useState<SubmitMode>(null);

  const day = useMemo(() => getDay(date), [date]);
  const isSaturday = day === 6;
  const isSunday = day === 0;

  const availableSlots = useMemo(() => {
    if (isSunday) return [];
    if (scheduleType === 'in_person') {
      return isSaturday ? [] : IN_PERSON_SLOTS;
    }
    return isSaturday ? REMOTE_SATURDAY_SLOTS : REMOTE_WEEKDAY_SLOTS;
  }, [isSaturday, isSunday, scheduleType]);

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
      setErrors({});
      setSubmittedMode(null);
      setPathMode(null);
      setWizardStep(1);
      setDate(getTomorrowIsoDate());
      setScheduleType('in_person');
      setSelectedSlot('');
    }
  }, [open]);

  useEffect(() => {
    if (isSaturday && scheduleType === 'in_person') {
      setScheduleType('remote');
    }
  }, [isSaturday, scheduleType]);

  useEffect(() => {
    if (selectedSlot && !availableSlots.includes(selectedSlot)) {
      setSelectedSlot('');
    }
  }, [availableSlots, selectedSlot]);

  if (!open) return null;

  function clearErrors() {
    setErrors({});
  }

  function addError(field: string, message: string) {
    setErrors((current) => ({ ...current, [field]: message }));
  }

  function validateStep2() {
    clearErrors();
    let valid = true;
    if (!date) {
      addError('date', 'Select a date.');
      valid = false;
    }
    if (isSunday) {
      addError('date', 'We are closed on Sundays. Please select another day.');
      valid = false;
    }
    if (!selectedSlot) {
      addError('slot', 'Select a time slot.');
      valid = false;
    }
    if (scheduleType === 'in_person' && !scheduleAddress.trim()) {
      addError('address', 'Address is required for in-person consultation.');
      valid = false;
    }
    return valid;
  }

  function validateScheduleSubmit() {
    clearErrors();
    let valid = true;
    if (!scheduleName.trim()) {
      addError('scheduleName', 'Name is required.');
      valid = false;
    }
    if (!schedulePhone.trim()) {
      addError('schedulePhone', 'Phone is required.');
      valid = false;
    }
    if (!scheduleEmail.trim()) {
      addError('scheduleEmail', 'Email is required.');
      valid = false;
    }
    if (!scheduleZip.trim()) {
      addError('scheduleZip', 'Zip code is required.');
      valid = false;
    }
    if (!scheduleConsent) {
      addError('scheduleConsent', 'You must accept consent to continue.');
      valid = false;
    }
    return valid;
  }

  function validateQuestionSubmit() {
    clearErrors();
    let valid = true;
    if (!questionName.trim()) {
      addError('questionName', 'Name is required.');
      valid = false;
    }
    if (!questionPhone.trim() && !questionEmail.trim()) {
      addError('questionPhone', 'Provide phone or email.');
      addError('questionEmail', 'Provide phone or email.');
      valid = false;
    }
    if (!questionMessage.trim()) {
      addError('questionMessage', 'Question is required.');
      valid = false;
    }
    if (!questionConsent) {
      addError('questionConsent', 'You must accept consent to continue.');
      valid = false;
    }
    return valid;
  }

  async function postLead(payload: Record<string, unknown>): Promise<boolean> {
    try {
      const res = await fetch('/api/leads/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...payload,
          source_page: 'Consultation Modal',
          source_page_path: typeof window !== 'undefined' ? window.location.pathname : '/',
          hp: '',
        }),
      });
      const data: unknown = await res.json().catch(() => ({}));
      if (!res.ok) {
        const result = data as { error?: string; message?: string; errors?: Record<string, string[]> } | null;
        const firstValidationError = result?.errors ? Object.values(result.errors)[0] : null;
        const errorMessage = Array.isArray(firstValidationError)
          ? firstValidationError[0]
          : result?.error || result?.message || 'Submission failed. Please try again or call us.';
        addError('submit', errorMessage);
        return false;
      }
      return true;
    } catch {
      addError('submit', 'Network error. Please try again or call us.');
      return false;
    }
  }

  async function submitSchedule() {
    if (!validateScheduleSubmit()) return;
    const consultationType = scheduleType === 'in_person' ? 'in_person' : 'virtual';
    const summary = `${consultationType === 'in_person' ? 'In-Person Visit' : 'Google Meet (virtual)'}\nPreferred date: ${date}\nPreferred time: ${selectedSlot}${scheduleType === 'in_person' && scheduleAddress ? `\nAddress: ${scheduleAddress}` : ''}`;
    const ok = await postLead({
      name: scheduleName,
      email: scheduleEmail,
      phone: schedulePhone,
      zip: scheduleZip,
      property_address: scheduleType === 'in_person' ? scheduleAddress : undefined,
      consultation_type: consultationType,
      message: summary,
    });
    if (ok) setSubmittedMode('schedule');
  }

  async function submitQuestion() {
    if (!validateQuestionSubmit()) return;
    const ok = await postLead({
      name: questionName,
      email: questionEmail,
      phone: questionPhone || undefined,
      zip: questionZip || undefined,
      consultation_type: 'question',
      contact_method: questionContact,
      message: questionMessage,
    });
    if (ok) setSubmittedMode('question');
  }

  return (
    <div
      className="fixed inset-0 z-[1600] flex items-center justify-center bg-[#151e30]/70 px-4 py-5 backdrop-blur-[4px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="max-h-[90vh] w-[92%] max-w-[640px] overflow-y-auto rounded-[12px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
        <div className="relative rounded-t-[12px] bg-[#1e2b43] px-8 py-7 text-center text-white">
          <h3 className="text-[24px] font-bold">Get Your <span className="text-[#bc9155]">Free Estimate</span></h3>
          <p className="mt-1 text-[14px] text-white/65">Schedule a consultation or just send us a question.</p>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 rounded p-1 text-white/60 transition-colors hover:text-white"
            aria-label="Close consultation modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-8">
          {submittedMode ? (
            <div className="py-7 text-center">
              <h4 className="text-[28px] font-bold text-[#1e2b43]">Thank You</h4>
              <p className="mx-auto mt-3 max-w-[420px] text-[15px] leading-7 text-[#5c677d]">
                {submittedMode === 'schedule'
                  ? 'Your consultation request has been received. We will confirm by email within 24 hours.'
                  : 'Your question has been sent. We will reply within 24 hours.'}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-7 inline-flex min-h-[50px] items-center justify-center rounded-[6px] bg-[#bc9155] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#a57d48]"
              >
                Close
              </button>
            </div>
          ) : pathMode === null ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  clearErrors();
                  setPathMode('schedule');
                  setWizardStep(1);
                }}
                className="group rounded-[10px] border-2 border-[#1e2b431a] bg-white p-6 text-center transition-[transform,border-color,background-color] duration-200 hover:-translate-y-[2px] hover:border-[#bc9155] hover:bg-[#bc91550a]"
              >
                <CalendarDays className="mx-auto mb-3 h-8 w-8 text-[#bc9155]" />
                <h4 className="text-[16px] font-semibold text-[#1e2b43]">Schedule a Consultation</h4>
                <p className="mt-1 text-[12px] leading-[1.5] text-[#5c677d]">In-person or Google Meet. No charge, no obligation.</p>
              </button>
              <button
                type="button"
                onClick={() => {
                  clearErrors();
                  setPathMode('question');
                }}
                className="group rounded-[10px] border-2 border-[#1e2b431a] bg-white p-6 text-center transition-[transform,border-color,background-color] duration-200 hover:-translate-y-[2px] hover:border-[#bc9155] hover:bg-[#bc91550a]"
              >
                <MessageSquare className="mx-auto mb-3 h-8 w-8 text-[#bc9155]" />
                <h4 className="text-[16px] font-semibold text-[#1e2b43]">Just Have a Question</h4>
                <p className="mt-1 text-[12px] leading-[1.5] text-[#5c677d]">Send us a quick message, we&rsquo;ll reply within one business day.</p>
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  clearErrors();
                  setPathMode(null);
                  setWizardStep(1);
                }}
                className="mb-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#5c677d] transition-colors hover:text-[#bc9155]"
              >
                <span aria-hidden="true">&lt;</span> Back
              </button>

              {pathMode === 'schedule' ? (
                <>
                  {wizardStep === 1 ? (
                    <>
                      <div className="mb-7 grid gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => {
                            setScheduleType('in_person');
                            clearErrors();
                          }}
                          className={cls(
                            'rounded-[8px] border-2 p-4 text-center transition-[border-color,background-color] duration-200',
                            scheduleType === 'in_person'
                              ? 'border-[#bc9155] bg-[#bc915510]'
                              : 'border-[#1e2b431a] bg-white hover:border-[#bc9155]',
                          )}
                        >
                          <Home className="mx-auto mb-2 h-7 w-7 text-[#bc9155]" />
                          <h4 className="text-[15px] font-semibold text-[#1e2b43]">In-Person Visit</h4>
                          <p className="mt-1 text-[12px] text-[#5c677d]">
                            We come to your home
                            <br />
                            Mon-Fri, 8am - 4pm
                            <br />
                            2-hour windows
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setScheduleType('remote');
                            clearErrors();
                          }}
                          className={cls(
                            'rounded-[8px] border-2 p-4 text-center transition-[border-color,background-color] duration-200',
                            scheduleType === 'remote'
                              ? 'border-[#bc9155] bg-[#bc915510]'
                              : 'border-[#1e2b431a] bg-white hover:border-[#bc9155]',
                          )}
                        >
                          <Monitor className="mx-auto mb-2 h-7 w-7 text-[#bc9155]" />
                          <h4 className="text-[15px] font-semibold text-[#1e2b43]">Google Meet</h4>
                          <p className="mt-1 text-[12px] text-[#5c677d]">
                            Video call from anywhere
                            <br />
                            Mon-Fri 8am-6pm, Sat 9am-3pm
                            <br />
                            1-hour windows
                          </p>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          clearErrors();
                          setWizardStep(2);
                        }}
                        className="w-full rounded-[6px] bg-[#bc9155] px-6 py-[14px] text-[15px] font-semibold text-white transition-colors hover:bg-[#a57d48]"
                      >
                        Next - Pick a Date
                      </button>
                    </>
                  ) : null}

                  {wizardStep === 2 ? (
                    <>
                      {scheduleType === 'in_person' ? (
                        <div className="mb-4">
                          <label htmlFor="cm-schedule-address" className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1e2b43]">
                            Property Address
                          </label>
                          <input
                            id="cm-schedule-address"
                            type="text"
                            value={scheduleAddress}
                            onChange={(event) => setScheduleAddress(event.target.value)}
                            placeholder="123 Main St, Orange, CT 06477"
                            className={cls(
                              'h-[48px] w-full rounded-[6px] border px-4 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]',
                              errors.address ? 'border-red-500' : 'border-[#1e2b4326]',
                            )}
                          />
                          {errors.address ? <p className="mt-1 text-[11px] text-red-600">{errors.address}</p> : null}
                        </div>
                      ) : null}

                      <div className="mb-6">
                        <label className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1e2b43]">
                          Select a Date
                        </label>
                        <DayPicker
                          value={date}
                          onChange={(value) => {
                            setDate(value);
                            setSelectedSlot('');
                            clearErrors();
                          }}
                          disableSaturday={scheduleType === 'in_person'}
                          hasError={!!errors.date}
                        />
                        {errors.date ? <p className="mt-1 text-[11px] text-red-600">{errors.date}</p> : null}
                      </div>

                      <div className="mb-6">
                        <label className="mb-3 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1e2b43]">
                          Available Times
                        </label>
                        {isSunday ? (
                          <div className="rounded-[6px] border border-[#1e2b4320] px-4 py-4 text-center text-[14px] text-[#5c677d]">
                            We are closed on Sundays. Please select a weekday or Saturday.
                          </div>
                        ) : availableSlots.length === 0 ? (
                          <div className="rounded-[6px] border border-[#1e2b4320] px-4 py-4 text-center text-[14px] text-[#5c677d]">
                            In-person visits are not available on Saturdays. Switch to Google Meet.
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {availableSlots.map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => {
                                  setSelectedSlot(slot);
                                  clearErrors();
                                }}
                                className={cls(
                                  'rounded-[6px] border px-4 py-[14px] text-center text-[14px] font-medium transition-[border-color,background-color,color]',
                                  selectedSlot === slot
                                    ? 'border-[#bc9155] bg-[#bc9155] text-white'
                                    : 'border-[#1e2b431f] bg-white text-[#1e2b43] hover:border-[#bc9155] hover:bg-[#bc915510]',
                                )}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        )}
                        {errors.slot ? <p className="mt-1 text-[11px] text-red-600">{errors.slot}</p> : null}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            clearErrors();
                            setWizardStep(1);
                          }}
                          className="rounded-[6px] border border-[#1e2b4326] bg-white px-6 py-[14px] text-[15px] font-semibold text-[#1e2b43] transition-colors hover:border-[#bc9155] hover:text-[#bc9155]"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!validateStep2()) return;
                            setWizardStep(3);
                          }}
                          className="rounded-[6px] bg-[#bc9155] px-6 py-[14px] text-[15px] font-semibold text-white transition-colors hover:bg-[#a57d48]"
                        >
                          Next - Your Details
                        </button>
                      </div>
                    </>
                  ) : null}

                  {wizardStep === 3 ? (
                    <>
                      <div className="mb-3 grid gap-3 sm:grid-cols-2">
                        <div>
                          <label htmlFor="cm-schedule-name" className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1e2b43]">Your Name</label>
                          <input
                            id="cm-schedule-name"
                            type="text"
                            value={scheduleName}
                            onChange={(event) => setScheduleName(event.target.value)}
                            placeholder="Full name"
                            className={cls(
                              'h-[48px] w-full rounded-[6px] border px-4 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]',
                              errors.scheduleName ? 'border-red-500' : 'border-[#1e2b4326]',
                            )}
                          />
                          {errors.scheduleName ? <p className="mt-1 text-[11px] text-red-600">{errors.scheduleName}</p> : null}
                        </div>
                        <div>
                          <label htmlFor="cm-schedule-phone" className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1e2b43]">Phone Number</label>
                          <input
                            id="cm-schedule-phone"
                            type="tel"
                            value={schedulePhone}
                            onChange={(event) => setSchedulePhone(event.target.value)}
                            placeholder="(203) 000-0000"
                            className={cls(
                              'h-[48px] w-full rounded-[6px] border px-4 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]',
                              errors.schedulePhone ? 'border-red-500' : 'border-[#1e2b4326]',
                            )}
                          />
                          {errors.schedulePhone ? <p className="mt-1 text-[11px] text-red-600">{errors.schedulePhone}</p> : null}
                        </div>
                      </div>

                      <div className="mb-4 grid gap-3 sm:grid-cols-2">
                        <div>
                          <label htmlFor="cm-schedule-email" className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1e2b43]">Email</label>
                          <input
                            id="cm-schedule-email"
                            type="email"
                            value={scheduleEmail}
                            onChange={(event) => setScheduleEmail(event.target.value)}
                            placeholder="you@email.com"
                            className={cls(
                              'h-[48px] w-full rounded-[6px] border px-4 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]',
                              errors.scheduleEmail ? 'border-red-500' : 'border-[#1e2b4326]',
                            )}
                          />
                          {errors.scheduleEmail ? <p className="mt-1 text-[11px] text-red-600">{errors.scheduleEmail}</p> : null}
                        </div>
                        <div>
                          <label htmlFor="cm-schedule-zip" className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1e2b43]">Zip Code</label>
                          <input
                            id="cm-schedule-zip"
                            type="text"
                            value={scheduleZip}
                            onChange={(event) => setScheduleZip(event.target.value)}
                            placeholder="06477"
                            className={cls(
                              'h-[48px] w-full rounded-[6px] border px-4 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]',
                              errors.scheduleZip ? 'border-red-500' : 'border-[#1e2b4326]',
                            )}
                          />
                          {errors.scheduleZip ? <p className="mt-1 text-[11px] text-red-600">{errors.scheduleZip}</p> : null}
                        </div>
                      </div>

                      <div className={cls('mb-3 rounded-[6px] p-1', errors.scheduleConsent ? 'outline outline-2 outline-red-500' : '')}>
                        <label className="flex cursor-pointer items-start gap-2 text-[11px] leading-[1.4] text-[#6b7280]">
                          <input
                            type="checkbox"
                            checked={scheduleConsent}
                            onChange={(event) => setScheduleConsent(event.target.checked)}
                            className="mt-[2px] min-w-[14px] accent-[#BC9155]"
                          />
                          <span>
                            I agree to the <a href="/privacy-policy/" className="text-[#BC9155] underline">Privacy Policy</a> and{' '}
                            <a href="/terms/" className="text-[#BC9155] underline">Terms of Service</a>. I consent to receive calls, texts (SMS), and emails from BuiltWell CT, including automated messages. Msg and data rates may apply. Reply STOP to opt out.
                          </span>
                        </label>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            clearErrors();
                            setWizardStep(2);
                          }}
                          className="rounded-[6px] border border-[#1e2b4326] bg-white px-6 py-[14px] text-[15px] font-semibold text-[#1e2b43] transition-colors hover:border-[#bc9155] hover:text-[#bc9155]"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={submitSchedule}
                          className="rounded-[6px] bg-[#bc9155] px-6 py-[14px] text-[15px] font-semibold text-white transition-colors hover:bg-[#a57d48]"
                        >
                          Confirm Consultation
                        </button>
                      </div>
                      <p className="mt-3 text-center text-[14px] italic text-[#73829a]">We&apos;ll confirm by email within 24 hours.</p>
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label htmlFor="cm-question-name" className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1e2b43]">Your Name</label>
                    <input
                      id="cm-question-name"
                      type="text"
                      value={questionName}
                      onChange={(event) => setQuestionName(event.target.value)}
                      placeholder="Full name"
                      className={cls(
                        'h-[48px] w-full rounded-[6px] border px-4 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]',
                        errors.questionName ? 'border-red-500' : 'border-[#1e2b4326]',
                      )}
                    />
                    {errors.questionName ? <p className="mt-1 text-[11px] text-red-600">{errors.questionName}</p> : null}
                  </div>

                  <div className="mb-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cm-question-phone" className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1e2b43]">Phone</label>
                      <input
                        id="cm-question-phone"
                        type="tel"
                        value={questionPhone}
                        onChange={(event) => setQuestionPhone(event.target.value)}
                        placeholder="(203) 000-0000"
                        className={cls(
                          'h-[48px] w-full rounded-[6px] border px-4 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]',
                          errors.questionPhone ? 'border-red-500' : 'border-[#1e2b4326]',
                        )}
                      />
                      {errors.questionPhone ? <p className="mt-1 text-[11px] text-red-600">{errors.questionPhone}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="cm-question-email" className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1e2b43]">Email</label>
                      <input
                        id="cm-question-email"
                        type="email"
                        value={questionEmail}
                        onChange={(event) => setQuestionEmail(event.target.value)}
                        placeholder="you@email.com"
                        className={cls(
                          'h-[48px] w-full rounded-[6px] border px-4 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]',
                          errors.questionEmail ? 'border-red-500' : 'border-[#1e2b4326]',
                        )}
                      />
                      {errors.questionEmail ? <p className="mt-1 text-[11px] text-red-600">{errors.questionEmail}</p> : null}
                    </div>
                  </div>

                  <div className="mb-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cm-question-zip" className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1e2b43]">Zip Code</label>
                      <input
                        id="cm-question-zip"
                        type="text"
                        value={questionZip}
                        onChange={(event) => setQuestionZip(event.target.value)}
                        placeholder="06477"
                        className="h-[48px] w-full rounded-[6px] border border-[#1e2b4326] px-4 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]"
                      />
                    </div>
                    <div>
                      <label htmlFor="cm-question-contact" className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1e2b43]">Preferred Contact</label>
                      <select
                        id="cm-question-contact"
                        value={questionContact}
                        onChange={(event) => setQuestionContact(event.target.value as 'phone' | 'text' | 'email')}
                        className="h-[48px] w-full cursor-pointer rounded-[6px] border border-[#1e2b4326] px-4 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]"
                      >
                        <option value="phone">Phone Call</option>
                        <option value="text">Text Message</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="cm-question-message" className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1e2b43]">Your Question</label>
                    <textarea
                      id="cm-question-message"
                      value={questionMessage}
                      onChange={(event) => setQuestionMessage(event.target.value)}
                      placeholder="Tell us about your project, ask about pricing, timelines, or anything else..."
                      className={cls(
                        'min-h-[120px] w-full resize-y rounded-[6px] border px-4 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]',
                        errors.questionMessage ? 'border-red-500' : 'border-[#1e2b4326]',
                      )}
                    />
                    {errors.questionMessage ? <p className="mt-1 text-[11px] text-red-600">{errors.questionMessage}</p> : null}
                  </div>

                  <div className={cls('mb-3 rounded-[6px] p-1', errors.questionConsent ? 'outline outline-2 outline-red-500' : '')}>
                    <label className="flex cursor-pointer items-start gap-2 text-[11px] leading-[1.4] text-[#6b7280]">
                      <input
                        type="checkbox"
                        checked={questionConsent}
                        onChange={(event) => setQuestionConsent(event.target.checked)}
                        className="mt-[2px] min-w-[14px] accent-[#BC9155]"
                      />
                      <span>
                        I agree to the <a href="/privacy-policy/" className="text-[#BC9155] underline">Privacy Policy</a> and{' '}
                        <a href="/terms/" className="text-[#BC9155] underline">Terms of Service</a>. I consent to receive calls, texts (SMS), and emails from BuiltWell CT, including automated messages. Msg and data rates may apply. Reply STOP to opt out.
                      </span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={submitQuestion}
                    className="w-full rounded-[6px] bg-[#bc9155] px-6 py-[14px] text-[15px] font-semibold text-white transition-colors hover:bg-[#a57d48]"
                  >
                    Send Your Question
                  </button>
                  <p className="mt-3 text-center text-[14px] italic text-[#73829a]">We reply within 24 hours.</p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
