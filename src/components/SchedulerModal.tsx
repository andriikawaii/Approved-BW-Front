'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

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

const FREE_CONSULTATION_PATH = '/free-consultation/';
const IN_PERSON_SLOTS = ['8:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '12:00 PM - 2:00 PM', '2:00 PM - 4:00 PM'];
const REMOTE_WEEKDAY = ['8:00 AM - 9:00 AM', '9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM', '2:00 PM - 3:00 PM', '3:00 PM - 4:00 PM', '4:00 PM - 5:00 PM', '5:00 PM - 6:00 PM'];
const REMOTE_SAT = ['9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM', '2:00 PM - 3:00 PM'];

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
    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (
        href === FREE_CONSULTATION_PATH ||
        href === FREE_CONSULTATION_PATH.replace(/\/$/, '') ||
        href.endsWith(FREE_CONSULTATION_PATH) ||
        href.endsWith(FREE_CONSULTATION_PATH.replace(/\/$/, ''))
      ) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || (e as MouseEvent).button === 1) return;
        e.preventDefault();
        open();
      }
    }
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [open]);

  return (
    <SchedulerContext.Provider value={{ open, close, isOpen }}>
      {children}
      <SchedulingModal open={isOpen} onClose={close} />
    </SchedulerContext.Provider>
  );
}

/**
 * Same SchedulingModal that powers /free-consultation/ — extracted so the
 * sticky CTA and every Free Estimate / Schedule a Free Consultation link
 * across the site opens it instead of navigating.
 */
export function SchedulingModal({ open, onClose, initialType = 'in-person' }: { open: boolean; onClose: () => void; initialType?: 'in-person' | 'remote' }) {
  const [type, setType] = useState<'in-person' | 'remote'>(initialType);
  const [county, setCounty] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const dayOfWeek = date ? new Date(date + 'T12:00:00').getDay() : null;
  const isSat = dayOfWeek === 6;

  const slots = type === 'in-person' ? (isSat ? [] : IN_PERSON_SLOTS) : (isSat ? REMOTE_SAT : REMOTE_WEEKDAY);

  const handleDateChange = (v: string) => {
    const d = new Date(v + 'T12:00:00').getDay();
    if (d === 0) { alert('We are closed on Sundays. Please select a weekday or Saturday.'); return; }
    setDate(v);
    setSlot(null);
    if (d === 6 && type === 'in-person') setType('remote');
  };

  const handleConfirm = async () => {
    if (!name || !phone || !email || !zip || !date || !slot) { alert('Please fill in all fields and select a time slot.'); return; }
    if (type === 'in-person' && !county) { alert('Please select your county.'); return; }

    setSubmitting(true);

    const consultationType = type === 'in-person' ? 'in_person' : 'virtual';
    const countyLabel = county === 'fairfield' ? 'Fairfield County' : 'New Haven County';
    const summary = `${type === 'in-person' ? `In-Person Visit in ${countyLabel}` : 'Google Meet (virtual)'}\nPreferred date: ${date}\nPreferred time: ${slot}`;

    try {
      const response = await fetch('/api/leads/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          zip,
          town: type === 'in-person' ? countyLabel : undefined,
          consultation_type: consultationType,
          message: summary,
          source_page: 'Scheduler Modal',
          source_page_path: typeof window !== 'undefined' ? window.location.pathname : '/',
          hp: '',
        }),
      });
      const data: unknown = await response.json().catch(() => ({}));
      if (!response.ok) {
        const result = data as { error?: string; message?: string; errors?: Record<string, string[]> } | null;
        const firstValidationError = result?.errors ? Object.values(result.errors)[0] : null;
        const errorMessage = Array.isArray(firstValidationError)
          ? firstValidationError[0]
          : result?.error || result?.message || 'Submission failed. Please try again or call us.';
        alert(errorMessage);
        setSubmitting(false);
        return;
      }
    } catch {
      alert('Network error. Please try again or call us.');
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    onClose();
    if (typeof window !== 'undefined') {
      window.location.href = '/thank-you/';
    }
  };

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(21,30,48,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', padding: 12 }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: '#fff', borderRadius: 12, width: '100%', maxWidth: 640, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
        <div style={{ background: '#1E2B43', padding: '24px 24px', color: '#fff', borderRadius: '12px 12px 0 0', textAlign: 'center', position: 'relative' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 4 }}>Schedule a <span style={{ color: '#BC9155' }}>Free Consultation</span></h3>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0 }}>No charge, no obligation. Pick a time that works for you.</p>
          <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 10, right: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 26, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: 22 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 22 }}>
            {(['in-person', 'remote'] as const).map((t) => (
              <div key={t} onClick={() => { if (t === 'in-person' && isSat) return; setType(t); }}
                style={{ padding: 14, borderRadius: 8, border: `2px solid ${type === t ? '#BC9155' : 'rgba(30,43,67,0.1)'}`, background: type === t ? 'rgba(188,145,85,0.1)' : '#fff', textAlign: 'center', cursor: t === 'in-person' && isSat ? 'not-allowed' : 'pointer', transition: 'all 0.2s', opacity: t === 'in-person' && isSat ? 0.4 : 1 }}>
                {t === 'in-person'
                  ? <><div style={{ marginBottom: 6, color: '#BC9155', display: 'flex', justifyContent: 'center' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg></div><h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, marginBottom: 2 }}>In-Person Visit</h4><p style={{ fontSize: 11, color: '#5C677D', margin: 0 }}>We come to your home<br />Mon-Fri, 8am-4pm</p></>
                  : <><div style={{ marginBottom: 6, color: '#BC9155', display: 'flex', justifyContent: 'center' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg></div><h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Google Meet</h4><p style={{ fontSize: 11, color: '#5C677D', margin: 0 }}>Video call from anywhere<br />Mon-Sat</p></>
                }
              </div>
            ))}
          </div>
          {type === 'in-person' && (
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1E2B43', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Which county?</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {['fairfield', 'new-haven'].map((c) => (
                  <div key={c} onClick={() => setCounty(c)} style={{ padding: 12, borderRadius: 6, border: `1px solid ${county === c ? '#BC9155' : 'rgba(30,43,67,0.12)'}`, background: county === c ? '#BC9155' : '#fff', color: county === c ? '#fff' : '#1E2B43', textAlign: 'center', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.2s' }}>
                    {c === 'fairfield' ? 'Fairfield County' : 'New Haven County'}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1E2B43', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Select a Date</label>
            <input type="date" min={minDate} value={date} onChange={(e) => handleDateChange(e.target.value)} style={{ width: '100%', padding: '12px 14px', border: '1px solid rgba(30,43,67,0.15)', borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1E2B43', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1E2B43', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Available Times</label>
            {type === 'in-person' && isSat ? (
              <p style={{ textAlign: 'center', color: '#5C677D', fontSize: 13, padding: '12px 0' }}>In-person visits are not available on Saturdays. Please select a weekday or choose Google Meet.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {slots.map((s) => (
                  <div key={s} onClick={() => setSlot(s)} style={{ padding: 12, borderRadius: 6, border: `1px solid ${slot === s ? '#BC9155' : 'rgba(30,43,67,0.12)'}`, background: slot === s ? '#BC9155' : '#fff', color: slot === s ? '#fff' : '#1E2B43', textAlign: 'center', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.2s' }}>
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1E2B43', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Name</label>
              <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '11px 12px', border: '1px solid rgba(30,43,67,0.15)', borderRadius: 6, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1E2B43', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1E2B43', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone Number</label>
              <input type="tel" placeholder="(203) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '11px 12px', border: '1px solid rgba(30,43,67,0.15)', borderRadius: 6, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1E2B43', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1E2B43', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</label>
              <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '11px 12px', border: '1px solid rgba(30,43,67,0.15)', borderRadius: 6, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1E2B43', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1E2B43', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Zip Code</label>
              <input type="text" placeholder="06477" value={zip} onChange={(e) => setZip(e.target.value)} style={{ width: '100%', padding: '11px 12px', border: '1px solid rgba(30,43,67,0.15)', borderRadius: 6, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1E2B43', boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={handleConfirm} disabled={submitting} style={{ width: '100%', padding: 14, background: '#BC9155', color: '#fff', border: 'none', borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 600, cursor: submitting ? 'wait' : 'pointer', opacity: submitting ? 0.7 : 1, transition: 'background 0.2s' }}>
            {submitting ? 'Sending…' : 'Confirm Consultation'}
          </button>
          <p style={{ fontSize: 12, color: '#5C677D', textAlign: 'center', marginTop: 14, fontStyle: 'italic' }}>We&apos;ll send a confirmation to your email within 24 hours.</p>
        </div>
      </div>
    </div>
  );
}
