'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { CMSPage } from '@/types/cms';

// â"€â"€â"€ helpers â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

type HeroData = {
  title?: string | null;
  headline?: string | null;
  subtitle?: string | null;
  subheadline?: string | null;
  background_image?: string | null;
  cta_primary?: { label?: string; url?: string } | null;
};

type ConsultationCardsSplitData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight_text?: string | null;
  subtitle?: string | null;
  cards?: Array<{
    title?: string | null;
    description?: string | null;
    image?: string | null;
    image_alt?: string | null;
  }>;
};

const getSection = <T,>(page: CMSPage, type: string): T | undefined =>
  page.sections.find((s) => s.is_active && s.type === type)?.data as T | undefined;

// â"€â"€â"€ static data â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

const STEPS = [
  {
    num: 1,
    title: 'Contact Us',
    body: 'Call, text, or fill out our form. Tell us what you are working on and where you are located.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="28" height="28" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    num: 2,
    title: 'We Schedule',
    body: 'You choose: on-site visit or video call via Google Meet or Zoom. Both are equally available.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="28" height="28" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    num: 3,
    title: 'We Assess',
    body: 'We discuss your goals, assess the space, check existing conditions, and answer every question.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="28" height="28" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    num: 4,
    title: 'Written Estimate',
    body: 'A detailed written estimate covering scope, materials, timeline, and cost. Delivered within 3 to 5 business days.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="28" height="28" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    num: 5,
    title: 'Your Decision',
    body: 'Review the estimate. Move forward or take your time. No pressure. The estimate is yours to keep.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="28" height="28" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

const FAIRFIELD_TOWNS_PRIMARY = ['Greenwich', 'Stamford', 'Norwalk', 'Westport', 'Darien', 'New Canaan', 'Fairfield', 'Ridgefield', 'Trumbull'];
const FAIRFIELD_TOWNS_MORE = ['Bethel', 'Bridgeport', 'Brookfield', 'Danbury', 'Easton', 'Monroe', 'New Fairfield', 'Newtown', 'Redding', 'Shelton', 'Sherman', 'Stratford', 'Weston', 'Wilton'];
const FAIRFIELD_TOWN_LINKS: Record<string, string> = {
  Greenwich: '/fairfield-county/greenwich-ct/', Westport: '/fairfield-county/westport-ct/', Trumbull: '/fairfield-county/',
};
const NEW_HAVEN_TOWNS_PRIMARY = ['Orange', 'New Haven', 'Hamden', 'Branford', 'Guilford', 'Madison', 'Woodbridge', 'Milford', 'Cheshire'];
const NEW_HAVEN_TOWNS_MORE = ['Ansonia', 'Beacon Falls', 'Bethany', 'Derby', 'East Haven', 'Meriden', 'Middlebury', 'Naugatuck', 'North Branford', 'North Haven', 'Oxford', 'Prospect', 'Seymour', 'Southbury', 'Wallingford', 'Waterbury', 'West Haven', 'Wolcott'];
const NEW_HAVEN_TOWN_LINKS: Record<string, string> = {
  Orange: '/new-haven-county/orange-ct/', 'New Haven': '/new-haven-county/new-haven-ct/', Madison: '/new-haven-county/madison-ct/',
};

const SERVICES = [
  'Kitchen Remodeling', 'Bathroom Remodeling', 'Basement Finishing', 'Flooring Installation',
  'Home Additions', 'Interior Painting', 'Interior Carpentry', 'Attic Conversions',
  'Decks & Porches', 'Design & Planning', 'Comfort & Accessibility', 'Other',
];

const IN_PERSON_SLOTS = ['8:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '12:00 PM - 2:00 PM', '2:00 PM - 4:00 PM'];
const REMOTE_WEEKDAY = ['8:00 AM - 9:00 AM', '9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM', '2:00 PM - 3:00 PM', '3:00 PM - 4:00 PM', '4:00 PM - 5:00 PM', '5:00 PM - 6:00 PM'];
const REMOTE_SAT = ['9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM', '2:00 PM - 3:00 PM'];

const RELATED = [
  { href: '/kitchen-remodeling/', img: '/services/kitchen-remodeling-ct.jpg', alt: 'Kitchen remodeling by BuiltWell CT in Connecticut', title: 'Kitchen Remodeling', body: 'Full-service kitchen renovations from cabinet and countertop updates to complete gut remodels with layout changes throughout Connecticut.' },
  { href: '/bathroom-remodeling/', img: '/services/bathroom-remodeling-ct.jpg', alt: 'Bathroom remodeling by BuiltWell CT in Connecticut', title: 'Bathroom Remodeling', body: 'Complete bathroom renovations including tile, vanities, showers, tubs, and plumbing upgrades throughout Connecticut.' },
  { href: '/basement-finishing/', img: '/services/basement-finishing-ct.jpg', alt: 'Basement finishing by BuiltWell CT in Connecticut', title: 'Basement Finishing', body: 'Transform your unfinished basement into functional living space with framing, insulation, electrical, flooring, and full finish work.' },
];

// â"€â"€â"€ sub-components â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#9A7340', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 16, position: 'relative', paddingLeft: 20 }}>
      <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 10, height: 2, background: '#BC9155', display: 'inline-block' }} />
      {children}
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function TownPill({ town, href, secondary }: { town: string; href?: string; secondary?: boolean }) {
  const base = { fontSize: 11, fontWeight: 600, color: '#1E2B43', background: '#F5F1E9', padding: '7px 10px', borderRadius: 50, textAlign: 'center' as const, letterSpacing: '0.2px', whiteSpace: 'nowrap' as const, transition: 'all 0.2s', textDecoration: 'none', display: 'block' };
  if (href) return <Link href={href} style={base} className={secondary ? 'area-town-link-secondary' : 'area-town-link'}>{town}</Link>;
  return <span style={base} className={secondary ? 'area-town-secondary' : undefined}>{town}</span>;
}

function AreaCard({ county, phone, phoneLabel, img, alt, desc, primaryTowns, moreTowns, townLinks, countyHref, showTop }: {
  county: string; phone: string; phoneLabel?: string; img: string; alt: string; desc: string;
  primaryTowns: string[]; moreTowns: string[]; townLinks: Record<string, string>;
  countyHref: string; showTop?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const tel = phone.replace(/\D/g, '');
  const visiblePrimaryTowns = primaryTowns.slice(0, 8);
  const hiddenPrimaryTowns = primaryTowns.slice(8);
  const extraTowns = [...hiddenPrimaryTowns, ...moreTowns];
  return (
    <div className="area-card-hover" style={{ borderRadius: 12, background: '#fff', borderBottom: '3px solid transparent', boxShadow: '0 2px 12px rgba(30,43,67,0.06)', transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)', display: 'flex', flexDirection: 'column', overflow: 'hidden', alignSelf: 'start', height: 'fit-content' }}>
      <div style={{ width: '100%', height: 220, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, rgba(30,43,67,0.4), transparent)', zIndex: 1, pointerEvents: 'none' }} />
        <img src={img} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: showTop ? 'top' : 'center', transition: 'transform 0.5s' }} className="area-card-img-inner" loading="lazy" decoding="async" />
      </div>
      <div style={{ padding: '28px 28px 32px', display: 'flex', flexDirection: 'column', flex: 1, textAlign: 'center' }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 6, color: '#1E2B43' }}>{county}</h3>
        <p style={{ fontSize: 15, color: '#5C677D', marginBottom: 14 }}>
          Call: <a href={`tel:${tel}`} style={{ color: '#BC9155', fontWeight: 600, textDecoration: 'none' }}>{phoneLabel || phone}</a>
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5C677D', marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid rgba(30,43,67,0.06)' }}>{desc}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
          {visiblePrimaryTowns.map((t) => <TownPill key={t} town={t} href={townLinks[t]} />)}
          {expanded && extraTowns.map((t) => <TownPill key={t} town={t} href={townLinks[t]} secondary />)}
          {extraTowns.length > 0 && (
            <button onClick={() => setExpanded(!expanded)} style={{ background: 'none', border: 'none', color: '#BC9155', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '4px 0', gridColumn: '1 / -1', textAlign: 'center', marginTop: 4, transition: 'color 0.2s' }}>
              {expanded ? 'Show Less -' : 'See All Towns +'}
            </button>
          )}
        </div>
        <Link href={countyHref} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#BC9155', textDecoration: 'none', marginTop: 4, transition: 'gap 0.3s' }} className="area-link-hover">
          Learn more about {county} <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}

// â"€â"€â"€ scheduling modal â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

function SchedulingModal({ open, onClose, initialType = 'in-person' }: { open: boolean; onClose: () => void; initialType?: 'in-person' | 'remote' }) {
  const [type, setType] = useState<'in-person' | 'remote'>(initialType);
  const [county, setCounty] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');

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

  const handleConfirm = () => {
    if (!name || !phone || !email || !zip || !date || !slot) { alert('Please fill in all fields and select a time slot.'); return; }
    if (type === 'in-person' && !county) { alert('Please select your county.'); return; }
    alert(`Thank you! Your consultation request has been submitted.\n\n${type === 'in-person' ? 'In-Person Visit in ' + (county === 'fairfield' ? 'Fairfield County' : 'New Haven County') : 'Google Meet'}\n${date} at ${slot}\n\nWe'll confirm by email within 24 hours.`);
    onClose();
  };

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(21,30,48,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: '#fff', borderRadius: 12, width: '90%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
        {/* header */}
        <div style={{ background: '#1E2B43', padding: '28px 32px', color: '#fff', borderRadius: '12px 12px 0 0', textAlign: 'center', position: 'relative' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 4 }}>Schedule a <span style={{ color: '#BC9155' }}>Free Consultation</span></h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: 0 }}>No charge, no obligation. Pick a time that works for you.</p>
          <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 24, lineHeight: 1 }}>×</button>
        </div>
        {/* body */}
        <div style={{ padding: 32 }}>
          {/* type tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
            {(['in-person', 'remote'] as const).map((t) => (
              <div key={t} onClick={() => { if (t === 'in-person' && isSat) return; setType(t); }}
                style={{ padding: 16, borderRadius: 8, border: `2px solid ${type === t ? '#BC9155' : 'rgba(30,43,67,0.1)'}`, background: type === t ? 'rgba(188,145,85,0.1)' : '#fff', textAlign: 'center', cursor: t === 'in-person' && isSat ? 'not-allowed' : 'pointer', transition: 'all 0.2s', opacity: t === 'in-person' && isSat ? 0.4 : 1 }}>
                {t === 'in-person'
                  ? <><div style={{ marginBottom: 8, color: '#BC9155', display: 'flex', justifyContent: 'center' }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg></div><h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 600, marginBottom: 4 }}>In-Person Visit</h4><p style={{ fontSize: 12, color: '#5C677D', margin: 0 }}>We come to your home<br />Mon-Fri, 8am-4pm</p></>
                  : <><div style={{ marginBottom: 8, color: '#BC9155', display: 'flex', justifyContent: 'center' }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg></div><h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Google Meet</h4><p style={{ fontSize: 12, color: '#5C677D', margin: 0 }}>Video call from anywhere<br />Mon-Sat</p></>
                }
              </div>
            ))}
          </div>
          {/* county (in-person only) */}
          {type === 'in-person' && (
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1E2B43', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Which county?</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {['fairfield', 'new-haven'].map((c) => (
                  <div key={c} onClick={() => setCounty(c)} style={{ padding: 14, borderRadius: 6, border: `1px solid ${county === c ? '#BC9155' : 'rgba(30,43,67,0.12)'}`, background: county === c ? '#BC9155' : '#fff', color: county === c ? '#fff' : '#1E2B43', textAlign: 'center', cursor: 'pointer', fontSize: 14, fontWeight: 500, transition: 'all 0.2s' }}>
                    {c === 'fairfield' ? 'Fairfield County' : 'New Haven County'}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* date */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1E2B43', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Select a Date</label>
            <input type="date" min={minDate} value={date} onChange={(e) => handleDateChange(e.target.value)} style={{ width: '100%', padding: '14px 16px', border: '1px solid rgba(30,43,67,0.15)', borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#1E2B43', boxSizing: 'border-box' }} />
          </div>
          {/* slots */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1E2B43', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Available Times</label>
            {type === 'in-person' && isSat ? (
              <p style={{ textAlign: 'center', color: '#5C677D', fontSize: 14, padding: '16px 0' }}>In-person visits are not available on Saturdays. Please select a weekday or choose Google Meet.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {slots.map((s) => (
                  <div key={s} onClick={() => setSlot(s)} style={{ padding: 14, borderRadius: 6, border: `1px solid ${slot === s ? '#BC9155' : 'rgba(30,43,67,0.12)'}`, background: slot === s ? '#BC9155' : '#fff', color: slot === s ? '#fff' : '#1E2B43', textAlign: 'center', cursor: 'pointer', fontSize: 14, fontWeight: 500, transition: 'all 0.2s' }}>
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* contact */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 12 }}>
            {[{ ph: 'Full name', st: name, fn: setName }, { ph: '(203) 000-0000', st: phone, fn: setPhone }].map(({ ph, st, fn }, i) => (
              <div key={i}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1E2B43', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{i === 0 ? 'Your Name' : 'Phone Number'}</label>
                <input type={i === 1 ? 'tel' : 'text'} placeholder={ph} value={st} onChange={(e) => fn(e.target.value)} style={{ width: '100%', padding: '12px 14px', border: '1px solid rgba(30,43,67,0.15)', borderRadius: 6, fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#1E2B43', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            {[{ ph: 'you@email.com', st: email, fn: setEmail, tp: 'email' }, { ph: '06477', st: zip, fn: setZip, tp: 'text' }].map(({ ph, st, fn, tp }, i) => (
              <div key={i}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1E2B43', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{i === 0 ? 'Email' : 'Zip Code'}</label>
                <input type={tp} placeholder={ph} value={st} onChange={(e) => fn(e.target.value)} style={{ width: '100%', padding: '12px 14px', border: '1px solid rgba(30,43,67,0.15)', borderRadius: 6, fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#1E2B43', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <button onClick={handleConfirm} style={{ width: '100%', padding: 16, background: '#BC9155', color: '#fff', border: 'none', borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = '#a57d48'; }} onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = '#BC9155'; }}>
            Confirm Consultation
          </button>
          <p style={{ fontSize: 13, color: '#5C677D', textAlign: 'center', marginTop: 16, fontStyle: 'italic' }}>We&apos;ll send a confirmation to your email within 24 hours.</p>
        </div>
      </div>
    </div>
  );
}

// â"€â"€â"€ lead form section â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

function LeadFormSection() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [contactMethod, setContactMethod] = useState<'call' | 'text' | 'email'>('call');
  const [bestTime, setBestTime] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formVals, setFormVals] = useState({ name: '', phone: '', email: '', zip: '' });

  const toggleService = (s: string) => setSelectedServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      window.alert('Please accept the Privacy Policy and Terms before submitting.');
      return;
    }
    setSubmitted(true);
  };

  const servicesLabel = selectedServices.length === 0 ? 'Select services' : selectedServices.length <= 2 ? selectedServices.join(', ') : `${selectedServices.length} services selected`;

  const inputStyle: React.CSSProperties = { width: '100%', padding: '12px 14px', border: '1px solid rgba(30,43,67,0.15)', borderRadius: 6, fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#1E2B43', background: '#fff', transition: 'border-color 0.2s', boxSizing: 'border-box', appearance: 'none', WebkitAppearance: 'none' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 600, color: '#1E2B43', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' };

  if (submitted) {
    return (
      <div style={{ background: '#fff', borderRadius: 10, padding: '48px 36px', textAlign: 'center', border: '1px solid rgba(30,43,67,0.08)', boxShadow: '0 16px 48px rgba(30,43,67,0.1)' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(188,145,85,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#1E2B43', marginBottom: 12 }}>Request Received</h3>
        <p style={{ fontSize: 16, color: '#5C677D', lineHeight: 1.7 }}>We received your consultation request and will respond within one business day.</p>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', borderRadius: 10, padding: '32px 36px', border: '1px solid rgba(30,43,67,0.08)', boxShadow: '0 16px 48px rgba(30,43,67,0.1), 0 4px 12px rgba(30,43,67,0.04)' }}>
      <form onSubmit={handleSubmit}>
        {/* row 1: name, phone, email, zip */}
        <div className="fc-form-row" style={{ marginBottom: 0 }}>
          {(['name', 'phone', 'email', 'zip'] as const).map((field) => (
            <div key={field} style={{ marginBottom: 16 }}>
              <label style={labelStyle}>{field === 'name' ? 'Name *' : field === 'phone' ? 'Phone *' : field === 'email' ? 'Email *' : 'Zip Code *'}</label>
              <input
                type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : field === 'zip' ? 'text' : 'text'}
                placeholder={field === 'name' ? 'Your full name' : field === 'phone' ? '(203) 000-0000' : field === 'email' ? 'you@email.com' : '06477'}
                required
                maxLength={field === 'zip' ? 5 : undefined}
                pattern={field === 'zip' ? '[0-9]{5}' : undefined}
                value={formVals[field]}
                onChange={(e) => setFormVals((p) => ({ ...p, [field]: e.target.value }))}
                style={inputStyle}
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#BC9155'; }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(30,43,67,0.15)'; }}
              />
            </div>
          ))}
        </div>
        {/* row 2: services, best time, contact method */}
        <div className="fc-form-row" style={{ marginBottom: 16 }}>
          {/* multi-select services */}
          <div style={{ marginBottom: 0 }}>
            <label style={labelStyle}>Services Needed *</label>
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)} style={{ width: '100%', padding: '13px 14px', background: '#fff', border: '1px solid rgba(30,43,67,0.15)', borderRadius: 4, fontSize: 15, color: selectedServices.length > 0 ? '#1E2B43' : '#5C677D', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontWeight: selectedServices.length > 0 ? 500 : 400 }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{servicesLabel}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {dropdownOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: '#fff', border: '1px solid rgba(30,43,67,0.15)', borderRadius: 6, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 20, maxHeight: 240, overflowY: 'auto', padding: '6px 0' }}>
                  {SERVICES.map((svc) => (
                    <label key={svc} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', fontSize: 14, color: '#1E2B43', cursor: 'pointer', transition: 'background 0.15s', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }} onMouseEnter={(e) => { (e.currentTarget as HTMLLabelElement).style.background = 'rgba(188,145,85,0.06)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLLabelElement).style.background = 'transparent'; }}>
                      <input type="checkbox" checked={selectedServices.includes(svc)} onChange={() => toggleService(svc)} style={{ width: 18, height: 18, accentColor: '#BC9155', cursor: 'pointer', flexShrink: 0 }} />
                      {svc}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* best time */}
          <div style={{ marginBottom: 0 }}>
            <label style={labelStyle}>Best Time to Contact *</label>
            <div style={{ position: 'relative' }}>
              <select required value={bestTime} onChange={(e) => setBestTime(e.target.value)} style={{ ...inputStyle, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235C677D' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', paddingRight: 40 }}
                onFocus={(e) => { (e.target as HTMLSelectElement).style.borderColor = '#BC9155'; }}
                onBlur={(e) => { (e.target as HTMLSelectElement).style.borderColor = 'rgba(30,43,67,0.15)'; }}>
                <option value="" disabled>Select a time</option>
                <option value="Morning (8am - 12pm)">Morning (8am - 12pm)</option>
                <option value="Afternoon (12pm - 4pm)">Afternoon (12pm - 4pm)</option>
                <option value="Evening (4pm - 6pm)">Evening (4pm - 6pm)</option>
                <option value="Anytime">Anytime</option>
              </select>
            </div>
          </div>
          {/* contact method */}
          <div style={{ gridColumn: '1 / -1', marginBottom: 0 }}>
            <label style={labelStyle}>Preferred Contact Method *</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['call', 'text', 'email'] as const).map((m) => (
                <label key={m} onClick={() => setContactMethod(m)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: '12px 14px', borderRadius: 6, border: `2px solid ${contactMethod === m ? '#BC9155' : 'rgba(30,43,67,0.12)'}`, background: contactMethod === m ? 'rgba(188,145,85,0.06)' : '#fff', transition: 'all 0.2s', flex: 1, textAlign: 'center', textTransform: 'none', letterSpacing: 0, color: '#1E2B43' }}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* message */}
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Tell Us About Your Project</label>
          <textarea placeholder="Tell us about your project - what rooms, what changes, any timeline or budget considerations..." rows={4} value={message} onChange={(e) => setMessage(e.target.value)} style={{ ...inputStyle, resize: 'vertical', minHeight: 120, lineHeight: 1.6 }}
            onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = '#BC9155'; }}
            onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(30,43,67,0.15)'; }} />
        </div>
        <div style={{ marginTop: 10, marginBottom: 8 }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 12, lineHeight: 1.5, color: '#6b7280', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              style={{ marginTop: 3, accentColor: '#C9A96E', minWidth: 16 }}
            />
            <span>
              I agree to the <Link href="/privacy-policy/" style={{ color: '#C9A96E', textDecoration: 'underline' }}>Privacy Policy</Link> and <Link href="/terms/" style={{ color: '#C9A96E', textDecoration: 'underline' }}>Terms of Service</Link>. I consent to receive calls, texts (SMS), and emails from BuiltWell CT, including automated messages. Msg & data rates may apply. Reply STOP to opt out.
            </span>
          </label>
        </div>
        <button type="submit" style={{ width: '100%', minHeight: 52, marginTop: 8, padding: '14px 20px', background: '#BC9155', color: '#fff', border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s', letterSpacing: '0.3px' }} onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#a57d48'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(188,145,85,0.3)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#BC9155'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'; }}>
          Schedule Consultation
        </button>
        <p style={{ fontSize: 13, color: '#5C677D', textAlign: 'center', marginTop: 16, fontStyle: 'italic' }}>We respond within 24 hours. No spam, no obligation.</p>
      </form>
    </div>
  );
}

// â"€â"€â"€ fade-up animation â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

function FadeUp({ children, delay = 0, stretch }: { children: React.ReactNode; delay?: number; stretch?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`, ...(stretch ? { height: '100%', display: 'flex', flexDirection: 'column' as const } : {}) }}>
      {children}
    </div>
  );
}

// â"€â"€â"€ main template â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

export function FreeConsultationPageTemplate({ page }: { page: CMSPage }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'in-person' | 'remote'>('in-person');

  const heroData = (getSection<HeroData>(page, 'hero') || getSection<HeroData>(page, 'service_hero') || getSection<HeroData>(page, 'page_hero'));
  const cardsData = getSection<ConsultationCardsSplitData>(page, 'consultation_cards_split');

  const heroTitle = heroData?.title || heroData?.headline || 'Schedule a Free Consultation';
  const heroSubtitle = heroData?.subtitle || heroData?.subheadline || 'Free, no obligation. We make sure your project starts right.';
  const heroBg = heroData?.background_image || '/portfolio/builtwell-contractor-handshake-arrival-ct-optimized.jpg';

  const fallbackConsultationCards = [
    {
      title: 'On-Site Consultation',
      description:
        'We visit your home, walk the space, measure, and assess existing conditions including plumbing, electrical, subfloor, and moisture levels. On-site consultations are best for projects involving structural changes, layout modifications, or when accurate measurements are critical to the estimate. Available Monday through Friday.',
      image: '/hero/builtwell-team-approaching-home-hero-ct.jpg',
      image_alt: 'BuiltWell CT team approaching Connecticut home for free on-site remodeling consultation',
    },
    {
      title: 'Remote Consultation',
      description:
        'Meet via Google Meet or Zoom from anywhere. Share photos, walk us through the space on camera, and discuss your goals. Remote consultations are effective for kitchen, bathroom, flooring, and finish-level projects where you want to start the conversation before committing to an on-site visit. Available Monday through Saturday.',
      image: '/services/remote-video-consultation-ct.jpg',
      image_alt: 'Remote video consultation with BuiltWell CT contractor via Google Meet or Zoom for Connecticut remodeling',
    },
  ];

  const consultationEyebrow = cardsData?.eyebrow || 'Your Choice';
  const consultationTitle = cardsData?.title || 'On-Site vs. Remote Consultations';
  const consultationSubtitle =
    cardsData?.subtitle ||
    'BuiltWell CT offers both in-person home visits and remote video consultations via Google Meet or Zoom, with on-site visits recommended for projects involving structural, plumbing, or layout changes.';
  const consultationHighlight =
    cardsData?.highlight_text && consultationTitle.includes(cardsData.highlight_text)
      ? cardsData.highlight_text
      : consultationTitle.includes('Consultations')
      ? 'Consultations'
      : '';
  const consultationCards =
    cardsData?.cards && cardsData.cards.length === 2
      ? cardsData.cards.map((card, index) => ({
          title: card.title || fallbackConsultationCards[index].title,
          description: card.description || fallbackConsultationCards[index].description,
          image: card.image || fallbackConsultationCards[index].image,
          image_alt: card.image_alt || fallbackConsultationCards[index].image_alt,
        }))
      : fallbackConsultationCards;
  const consultationTitleIndex = consultationHighlight ? consultationTitle.indexOf(consultationHighlight) : -1;
  const consultationTitleBefore = consultationTitleIndex >= 0 ? consultationTitle.slice(0, consultationTitleIndex) : consultationTitle;
  const consultationTitleAfter =
    consultationTitleIndex >= 0 ? consultationTitle.slice(consultationTitleIndex + consultationHighlight.length) : '';

  // Split title on "Consultation" for gold accent
  const accentWord = 'Consultation';
  const titleIdx = heroTitle.indexOf(accentWord);
  const titleBefore = titleIdx >= 0 ? heroTitle.slice(0, titleIdx) : heroTitle;
  const titleAfter = titleIdx >= 0 ? heroTitle.slice(titleIdx + accentWord.length) : '';
  const hasAccent = titleIdx >= 0;

  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .fade-up-inner { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
        .area-card-hover:hover {
          transform: translateY(-6px);
          border-bottom-color: #BC9155 !important;
          box-shadow: 0 16px 40px rgba(30,43,67,0.1), 0 32px 64px rgba(30,43,67,0.08) !important;
        }
        .area-card-hover:hover .area-card-img-inner { transform: scale(1.05); }
        .area-town-link:hover { background: #BC9155 !important; color: #fff !important; }
        .area-town-link-secondary:hover { color: #BC9155 !important; }
        .area-town-secondary:hover { color: #BC9155 !important; cursor: default; }
        .area-link-hover:hover { gap: 10px !important; }
        .related-card-hover:hover {
          transform: translateY(-4px);
          border-bottom-color: #BC9155 !important;
          box-shadow: 0 12px 28px rgba(30,43,67,0.1), 0 28px 56px rgba(30,43,67,0.12) !important;
        }
        .related-card-hover:hover .related-card-img { transform: scale(1.05); }
        .related-link-hover:hover { gap: 10px !important; }
        .trust-number {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 42px;
        }
        .trust-item-hover {
          transition: background 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .trust-item-hover:hover {
          background: rgba(188,145,85,0.08) !important;
          transform: translateY(-3px) !important;
          box-shadow: inset 0 0 0 1px rgba(188,145,85,0.16);
        }
        .trust-item-hover:hover .trust-number {
          color: #d4a95a !important;
          text-shadow: 0 0 20px rgba(188,145,85,0.3);
        }
        .trust-item-hover:hover .trust-label { color: rgba(255,255,255,0.85) !important; }
        .trust-strip-item-hover:hover { color: #BC9155 !important; transform: translateY(-2px) !important; }
        .trust-strip-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.1); flex-shrink: 0; }
        .cta-img-wrap::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle at bottom right, rgba(30,43,67,1) 0%, rgba(30,43,67,0.9) 25%, rgba(30,43,67,0.5) 50%, transparent 75%);
          pointer-events: none;
          border-radius: 0 0 8px 0;
        }
        .financing-strip-cta:hover {
          background: #a57d48 !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(188,145,85,0.3) !important;
        }
        .hero-cta-btn:hover { background: rgba(10,18,35,0.62) !important; transform: translateY(-2px) !important; box-shadow: 0 8px 24px rgba(0,0,0,0.3) !important; }
        .hero-cta-primary:hover { background: #d4a95a !important; box-shadow: 0 8px 24px rgba(188,145,85,0.4) !important; }
        .steps-timeline { display: flex; gap: 0; position: relative; max-width: 1100px; margin: 0 auto; }
        .step-item { flex: 1; text-align: center; padding: 0 20px; position: relative; }
        .step-item::before { content: ''; position: absolute; top: 8px; left: 0; right: 0; height: 2px; background: rgba(188,145,85,0.25); z-index: 0; }
        .step-item:first-child::before { left: 50%; }
        .step-item:last-child::before { right: 50%; }
        .step-dot { width: 18px; height: 18px; border-radius: 50%; background: #BC9155; margin: 0 auto 20px; position: relative; z-index: 1; box-shadow: 0 0 0 4px rgba(188,145,85,0.15); }
        .step-item h3 { font-size: 16px; font-family: Inter, sans-serif; font-weight: 700; color: #1E2B43; margin-bottom: 8px; }
        .step-item p { font-size: 13px; color: #5C677D; line-height: 1.6; }
        .fc-form-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .fc-form-bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 8px; }
        @media (max-width: 768px) {
          .two-col-grid { grid-template-columns: 1fr !important; }
          .three-col-grid { grid-template-columns: 1fr !important; }
          .four-col-trust { grid-template-columns: repeat(2, 1fr) !important; }
          .trust-strip-inner-grid { flex-wrap: wrap !important; }
          .trust-strip-item-hover { min-width: 33.33% !important; }
          .trust-strip-divider { display: none !important; }
          .hero-ctas-wrap { flex-direction: column !important; align-items: center !important; }
          .hero-cta-btn { width: 100%; max-width: 300px; min-height: 44px; justify-content: center; }
          .steps-timeline { flex-direction: column; gap: 32px; align-items: flex-start; padding-left: 32px; }
          .step-item { text-align: left; padding: 0; flex: 1 1 auto; }
          .step-item p { display: none !important; }
          .step-item::before { top: 0; bottom: 0; left: -24px; right: auto; width: 2px; height: auto; }
          .step-item:first-child::before { top: 8px; left: -24px; }
          .step-item:last-child::before { bottom: auto; height: 8px; left: -24px; }
          .step-dot { position: absolute; left: -32px; top: 0; margin: 0; }
          .fc-form-row, .fc-form-bottom-row { grid-template-columns: 1fr !important; }
          .cta-img-wrap + .cta-img-wrap { display: none !important; }
        }
        @media (max-width: 1024px) {
          .steps-timeline { flex-wrap: wrap; }
          .step-item { flex: 0 0 33.333%; padding: 12px; }
          .cta-body-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* â"€â"€ HERO â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
      <section style={{ background: '#151E30', padding: '0 40px 48px', paddingTop: 120, color: '#fff', position: 'relative', overflow: 'hidden', minHeight: '50vh', display: 'flex', alignItems: 'stretch', isolation: 'isolate' }}>
        <img src={heroBg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.72, zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 97% 97%, rgba(21,30,48,1) 0%, rgba(21,30,48,0.9) 8%, transparent 30%), radial-gradient(ellipse at 3% 97%, rgba(21,30,48,0.9) 0%, transparent 25%), linear-gradient(180deg, rgba(21,30,48,0.35) 0%, rgba(21,30,48,0.2) 30%, rgba(21,30,48,0.45) 65%, rgba(21,30,48,0.92) 100%)', zIndex: 1 }} />
        <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
          {/* breadcrumb */}
          <ol style={{ display: 'flex', alignItems: 'center', gap: 0, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.92)', marginBottom: 20, padding: 0, listStyle: 'none', textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}>
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Home</Link></li>
            <li style={{ display: 'flex', alignItems: 'center' }}><span style={{ color: '#BC9155', margin: '0 10px', fontSize: 12 }}>&gt;</span><span style={{ color: '#fff', fontWeight: 600 }}>Free Consultation</span></li>
          </ol>
          {/* h1 */}
          <h1 style={{ fontSize: 'clamp(40px, 4.5vw, 56px)', lineHeight: 1.08, marginBottom: 12, letterSpacing: '-0.5px', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
            {hasAccent ? <>{titleBefore}<span style={{ color: '#BC9155' }}>{accentWord}</span>{titleAfter}</> : heroTitle}
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, maxWidth: 520, margin: '16px auto 0', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>{heroSubtitle}</p>
          {/* ctas */}
          <div className="mt-8 flex flex-col items-center gap-[14px] sm:flex-row sm:justify-center">
            <a href="#contact" className="w-[280px] rounded-[8px] border border-[#BC9155] bg-[#BC9155] px-8 py-[14px] text-center text-[15px] font-semibold text-white transition-[background,border-color,transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:border-[#D4A95A] hover:bg-[#D4A95A] hover:shadow-[0_8px_24px_rgba(188,145,85,0.4)]">
              Get Your Free Estimate
            </a>
            <a href="tel:2039199616" className="w-[280px] rounded-[8px] border border-white/[0.22] bg-[rgba(10,18,35,0.42)] px-8 py-[14px] text-center backdrop-blur-[12px] transition-[background,border-color,transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:border-white/[0.35] hover:bg-[rgba(10,18,35,0.62)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
              <span className="text-[15px] font-semibold tracking-[0.1px] text-white">Fairfield: (203) 919-9616</span>
            </a>
            <a href="tel:2034669148" className="w-[280px] rounded-[8px] border border-white/[0.22] bg-[rgba(10,18,35,0.42)] px-8 py-[14px] text-center backdrop-blur-[12px] transition-[background,border-color,transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:border-white/[0.35] hover:bg-[rgba(10,18,35,0.62)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
              <span className="text-[15px] font-semibold tracking-[0.1px] text-white">New Haven: (203) 466-9148</span>
            </a>
          </div>
        </div>
      </section>

      {/* â"€â"€ TRUST BAR â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
      <section style={{ background: 'linear-gradient(135deg, #1E2B43 0%, #151E30 100%)', borderTop: '1px solid rgba(188,145,85,0.2)', borderBottom: '1px solid rgba(188,145,85,0.2)' }}>
        <div className="four-col-trust" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center' }}>
          <div className="trust-item-hover" style={{ padding: '36px 20px', borderRight: '1px solid rgba(188,145,85,0.12)', cursor: 'default' }}>
            <div className="trust-number" style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: '#BC9155', lineHeight: 1, transition: 'color 0.3s' }}>15+</div>
            <div className="trust-label" style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 8, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 500, transition: 'color 0.3s' }}>Years of Experience</div>
          </div>
          <div className="trust-item-hover" style={{ padding: '36px 20px', borderRight: '1px solid rgba(188,145,85,0.12)', cursor: 'default' }}>
            <div className="trust-number" style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: '#BC9155', lineHeight: 1, transition: 'color 0.3s' }}>100+</div>
            <div className="trust-label" style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 8, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 500, transition: 'color 0.3s' }}>Completed Projects</div>
          </div>
          <a href="https://www.google.com/maps/search/?api=1&query=BuiltWell+CT,+206A+Boston+Post+Road,+Orange,+CT+06477" target="_blank" rel="noopener noreferrer" className="trust-item-hover" style={{ padding: '36px 20px', borderRight: '1px solid rgba(188,145,85,0.12)', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
            <div className="trust-number" style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: '#BC9155', lineHeight: 1, transition: 'color 0.3s' }}>4.9</div>
            <div className="trust-label" style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 8, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 500, transition: 'color 0.3s' }}>Google Rating</div>
          </a>
          <div className="trust-item-hover" style={{ padding: '36px 20px', cursor: 'default' }}>
            <div className="trust-number" style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: '#BC9155', lineHeight: 1, transition: 'color 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            </div>
            <div className="trust-label" style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 8, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 500, transition: 'color 0.3s' }}>Fully Bonded & Insured</div>
          </div>
        </div>
      </section>

      {/* â"€â"€ HOW THE CONSULTATION WORKS â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
      <section style={{ background: '#fff', padding: '80px 40px', borderBottom: '1px solid rgba(30,43,67,0.06)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <SectionLabel>The Process</SectionLabel>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: 20, letterSpacing: '-0.5px', maxWidth: 780, marginLeft: 'auto', marginRight: 'auto', color: '#1E2B43' }}>
                How the Consultation <span style={{ color: '#BC9155' }}>Works</span>
              </h2>
              <p style={{ fontSize: 17, color: '#5C677D', maxWidth: 700, margin: '0 auto', lineHeight: 1.75 }}>
                A BuiltWell consultation is a free in-person home visit or video call via Google Meet or Zoom where we assess your space, discuss your goals, and answer every question before any work is scoped or priced.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* â"€â"€ 5 CONSULTATION STEPS â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
      <section style={{ background: '#F5F1E9', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <FadeUp>
            <div className="steps-timeline">
              {STEPS.map((step) => (
                <div key={step.num} className="step-item">
                  <div className="step-dot" />
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* WHAT TO EXPECT FROM YOUR ESTIMATE */}
      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <FadeUp>
            <div className="mb-12 text-center">
              <SectionLabel>Your Estimate</SectionLabel>
              <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px] text-[#1E2B43]">
                What to Expect From Your <span className="text-[#BC9155]">Estimate</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[720px] text-[17px] leading-[1.75] text-[#5C677D]">
                Every BuiltWell estimate includes an itemized scope of work, material specifications, construction timeline with lead times, and a fixed total cost with no hidden fees or vague line items.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>, title: "Itemized Scope", desc: "What is included and what is explicitly excluded, written in plain terms. No ambiguity." },
                { icon: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>, title: "Material Specs", desc: "The specific products, categories, and grades included. You know exactly what you are getting." },
                { icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>, title: "Timeline", desc: "Start date, construction duration, and any lead times. A realistic schedule you can plan around." },
                { icon: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>, title: "Fixed Total Cost", desc: "The full project cost including all permits, labor, and materials. No surprise invoices." },
              ].map((item, i) => (
                <article key={i} className="group relative overflow-hidden rounded-[14px] border border-[#1e2b430a] bg-[#f5f1e9] p-7 text-center transition-all duration-[400ms] hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(30,43,67,0.12)]">
                  <div className="absolute left-0 top-0 h-full w-[4px] bg-[#BC9155] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#BC9155]/10 transition-all duration-300 group-hover:bg-[#BC9155]/20">
                    <svg className="h-6 w-6 text-[#BC9155]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.icon}</svg>
                  </div>
                  <h3 className="mb-2 font-serif text-[20px] font-bold text-[#1E2B43]">{item.title}</h3>
                  <p className="text-[14px] leading-[1.75] text-[#5C677D]">{item.desc}</p>
                </article>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="mx-auto mt-10 max-w-[700px] text-center text-[16px] leading-[1.85] text-[#5C677D]">
              The estimate is fixed. If something changes during the project, we discuss it first and document it in a written change order. You do not get a surprise invoice. Learn more about how we work on our{" "}
              <Link href="/process/" className="font-semibold text-[#BC9155] transition-colors hover:text-[#9A7340]">process page</Link>.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* â"€â"€ ON-SITE VS REMOTE â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
      <section style={{ background: '#F5F1E9', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <SectionLabel>{consultationEyebrow}</SectionLabel>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: 20, letterSpacing: '-0.5px', maxWidth: 780, marginLeft: 'auto', marginRight: 'auto', color: '#1E2B43' }}>
                {consultationTitleBefore}
                {consultationTitleIndex >= 0 ? <span style={{ color: '#BC9155' }}>{consultationHighlight}</span> : null}
                {consultationTitleAfter}
              </h2>
              <p style={{ fontSize: 17, color: '#5C677D', maxWidth: 700, margin: '0 auto', lineHeight: 1.75 }}>
                {consultationSubtitle}
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <div className="two-col-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, maxWidth: 1240, margin: '0 auto' }}>
              {consultationCards.map((card, index) => (
                <div
                  key={`${card.title}-${index}`}
                  onClick={() => {
                    setModalType('in-person');
                    setModalOpen(true);
                  }}
                  className="area-card-hover"
                  style={{
                    borderRadius: 12,
                    background: '#fff',
                    borderBottom: '3px solid transparent',
                    boxShadow: '0 2px 12px rgba(30,43,67,0.06)',
                    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ width: '100%', height: 220, overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, rgba(30,43,67,0.4), transparent)', zIndex: 1, pointerEvents: 'none' }} />
                    <img
                      src={card.image || fallbackConsultationCards[index].image}
                      alt={card.image_alt || card.title || `Consultation card ${index + 1}`}
                      className="area-card-img-inner"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div style={{ padding: '28px 28px 32px' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 6, color: '#1E2B43' }}>
                      {card.title}
                    </h3>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5C677D' }}>
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* â"€â"€ SERVICE AREAS â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
      {/* SERVICE AREAS */}
      <section style={{ background: '#fff', padding: '100px 40px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <SectionLabel>Where We Work</SectionLabel>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: 20, letterSpacing: '-0.5px', maxWidth: 780, marginLeft: 'auto', marginRight: 'auto', color: '#1E2B43' }}>
                Serving Homeowners Across <span style={{ color: '#BC9155' }}>Two Counties</span>
              </h2>
              <p style={{ fontSize: 17, color: '#5C677D', maxWidth: 700, margin: '0 auto', lineHeight: 1.75 }}>
                Free consultations are available throughout Fairfield and New Haven Counties, with dedicated teams serving both regions.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <div className="two-col-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
              <AreaCard
                county="Fairfield County"
                phone="(203) 919-9616"
                phoneLabel="Fairfield: (203) 919-9616"
                img="/images/areas/fairfield-county.jpg"
                alt="Fairfield County, Connecticut - home remodeling service area for BuiltWell CT"
                desc="Serving all of Fairfield County with dedicated local crews. From Greenwich estates to Ridgefield colonials, we know the housing stock and building departments across the county."
                primaryTowns={FAIRFIELD_TOWNS_PRIMARY}
                moreTowns={FAIRFIELD_TOWNS_MORE}
                townLinks={FAIRFIELD_TOWN_LINKS}
                countyHref="/fairfield-county/"
              />
              <AreaCard
                county="New Haven County"
                phone="(203) 466-9148"
                phoneLabel="New Haven: (203) 466-9148"
                img="/images/areas/new-haven-county.jpg"
                alt="New Haven County, Connecticut - home remodeling service area for BuiltWell CT"
                desc="Served from our Orange, CT office. We cover every town in New Haven County from coastal Branford and Madison to inland Woodbridge and Cheshire - delivering expert remodeling across the region."
                primaryTowns={NEW_HAVEN_TOWNS_PRIMARY}
                moreTowns={NEW_HAVEN_TOWNS_MORE}
                townLinks={NEW_HAVEN_TOWN_LINKS}
                countyHref="/new-haven-county/"
                showTop
              />
            </div>
          </FadeUp>
          <FadeUp delay={160}>
            <p style={{ textAlign: 'center', fontSize: 14, color: '#5C677D', marginTop: 32 }}>
              Not sure if we serve your area? <Link href="/contact/" style={{ color: '#BC9155', fontWeight: 600, textDecoration: 'underline' }}>Contact our Connecticut remodeling team</Link> and we&apos;ll let you know.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div style={{ background: 'linear-gradient(135deg, #1E2B43 0%, #151E30 100%)', padding: '56px 40px', position: 'relative', overflow: 'hidden' }} role="region" aria-label="Trust indicators">
        <div style={{ position: 'absolute', inset: 0, background: "url('/hero/builtwell-job-site-aerial-hero-ct.jpg') center/cover no-repeat", opacity: 0.12 }} />
        <div className="trust-strip-inner-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <a href="https://www.google.com/search?q=builtwell+ct+reviews" target="_blank" rel="noopener noreferrer" className="trust-strip-item-hover" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.4px', whiteSpace: 'nowrap', textDecoration: 'none', transition: 'all 0.3s', padding: '20px 32px', flex: 1, minWidth: 180, textAlign: 'center' }}>
            <span style={{ color: '#BC9155', filter: 'drop-shadow(0 2px 4px rgba(188,145,85,0.3))' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#BC9155" stroke="none" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            </span>
            Google Rating 4.9
          </a>
          <div className="trust-strip-divider" />
          <a href="https://www.houzz.com/professionals/general-contractors/builtwell-ct" target="_blank" rel="noopener noreferrer" className="trust-strip-item-hover" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.4px', whiteSpace: 'nowrap', textDecoration: 'none', transition: 'all 0.3s', padding: '20px 32px', flex: 1, minWidth: 180, textAlign: 'center' }}>
            <span style={{ color: '#BC9155', filter: 'drop-shadow(0 2px 4px rgba(188,145,85,0.3))' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>
            </span>
            Trusted on Houzz
          </a>
          <div className="trust-strip-divider" />
          <a href="https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx" target="_blank" rel="noopener noreferrer" className="trust-strip-item-hover" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.4px', whiteSpace: 'nowrap', textDecoration: 'none', transition: 'all 0.3s', padding: '20px 32px', flex: 1, minWidth: 180, textAlign: 'center' }}>
            <span style={{ color: '#BC9155', filter: 'drop-shadow(0 2px 4px rgba(188,145,85,0.3))' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M8 2v4M16 2v4M3 10h18" /></svg>
            </span>
            CT HIC License #0668405
          </a>
          <div className="trust-strip-divider" />
          <a href="https://www.angi.com/companylist/us/ct/orange/builtwell-ct-reviews-" target="_blank" rel="noopener noreferrer" className="trust-strip-item-hover" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.4px', whiteSpace: 'nowrap', textDecoration: 'none', transition: 'all 0.3s', padding: '20px 32px', flex: 1, minWidth: 180, textAlign: 'center' }}>
            <span style={{ color: '#BC9155', filter: 'drop-shadow(0 2px 4px rgba(188,145,85,0.3))' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>
            </span>
            Verified on Angi
          </a>
        </div>
      </div>

      {/* CTA SECTION WITH LEAD FORM */}
      <section id="contact" style={{ background: '#F5F1E9', padding: '64px 40px 72px', borderTop: '1px solid rgba(30,43,67,0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeUp>
            <div style={{ marginBottom: 32, textAlign: 'center' }}>
              <SectionLabel>Get Started</SectionLabel>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 3vw, 42px)', marginBottom: 8, color: '#1E2B43' }}>
                Schedule Your Free <span style={{ color: '#BC9155' }}>Consultation</span>
              </h2>
              <p style={{ fontSize: 16, color: '#5C677D', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
                On-site or remote (Google Meet or Zoom). We respond within one business day.
              </p>
            </div>
          </FadeUp>
          <div className="cta-body-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 32, alignItems: 'stretch' }}>
            <FadeUp>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
                <div className="cta-img-wrap" style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', minHeight: 260, flex: 1 }}>
                  <img src="/team/builtwell-owner-handshake-client-ct-02.jpg" alt="BuiltWell CT owner meeting with a Connecticut homeowner for a remodeling consultation" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div className="cta-img-wrap" style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', minHeight: 260, flex: 1 }}>
                  <img src="/portfolio/builtwell-job-site-aerial-ct.jpg" alt="BuiltWell CT owner meeting homeowner for a free consultation" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={80}>
              <LeadFormSection />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* FINANCING STRIP */}
      <div style={{ background: '#fff', padding: '56px 40px', borderTop: '1px solid rgba(30,43,67,0.08)' }} role="region" aria-label="Financing options">
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <span style={{ fontWeight: 700, fontSize: 24, letterSpacing: '-0.3px' }}>
              <span style={{ color: '#6BBF4E' }}>Green</span><span style={{ color: '#1E2B43' }}>Sky</span>
            </span>
            <p style={{ fontSize: 16, color: '#5C677D', lineHeight: 1.6 }}><strong style={{ color: '#1E2B43' }}>Flexible Financing Available.</strong> Get approved in about 60 seconds and start your project today.</p>
          </div>
          <a href="https://www.greensky.com" target="_blank" rel="noopener noreferrer" className="financing-strip-cta" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, minWidth: 280, minHeight: 52, padding: '14px 32px', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, background: '#BC9155', color: '#fff', letterSpacing: '0.3px', whiteSpace: 'nowrap', textDecoration: 'none', transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s', border: 'none' }}>
            Check Financing Options <ArrowIcon />
          </a>
        </div>
      </div>
      {/* â"€â"€ RELATED SERVICES â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
      <section style={{ background: '#F5F1E9', padding: '100px 40px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <SectionLabel>Our Services</SectionLabel>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: 20, letterSpacing: '-0.5px', maxWidth: 780, marginLeft: 'auto', marginRight: 'auto', color: '#1E2B43' }}>
                Our Most Popular <span style={{ color: '#BC9155' }}>Services</span>
              </h2>
              <p style={{ fontSize: 17, color: '#5C677D', maxWidth: 700, margin: '0 auto', lineHeight: 1.75 }}>
                Schedule a free consultation for any of our remodeling services.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <div className="three-col-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
              {RELATED.map((item) => (
                <div key={item.href} className="related-card-hover" style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', borderBottom: '2px solid transparent', boxShadow: '0 2px 12px rgba(30,43,67,0.06)', transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: '100%', height: 220, overflow: 'hidden', flexShrink: 0 }}>
                    <img src={item.img} alt={item.alt} className="related-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', display: 'block' }} loading="lazy" decoding="async" />
                  </div>
                  <div style={{ padding: '28px 28px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 12, color: '#1E2B43' }}>
                      <Link href={item.href} style={{ color: 'inherit', textDecoration: 'none' }}>{item.title}</Link>
                    </h3>
                    <p style={{ fontSize: 15, color: '#5C677D', lineHeight: 1.7, marginBottom: 20, flex: 1 }}>{item.body}</p>
                    <Link href={item.href} className="related-link-hover" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#BC9155', textDecoration: 'none', transition: 'gap 0.3s' }}>
                      Learn More <ArrowIcon />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* â"€â"€ SCHEDULING MODAL â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
      <SchedulingModal key={`${modalOpen}-${modalType}`} open={modalOpen} initialType={modalType} onClose={() => setModalOpen(false)} />
    </>
  );
}
