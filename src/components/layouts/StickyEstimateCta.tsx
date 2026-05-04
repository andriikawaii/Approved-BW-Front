'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { usePageData } from '@/src/context/PageDataContext';

/**
 * Mobile-only sticky bottom bar. Two equal-width buttons:
 *  • Left: "Free Estimate" — navigates to /free-consultation/ (the working page form)
 *  • Right: "Call Now"     — opens a small popover with county phone numbers,
 *                            or directly dials the only available number.
 * Auto-hides on town-template pages that ship their own `.gwc-sticky-cta`.
 */
export default function StickyEstimateCta() {
  const { phones } = usePageData();
  const [callOpen, setCallOpen] = useState(false);
  const callRef = useRef<HTMLDivElement | null>(null);

  const fairfieldPhone = phones.find((item) => item.label.toLowerCase().includes('fairfield'));
  const newHavenPhone = phones.find((item) => item.label.toLowerCase().includes('new haven'));
  const phoneList = [fairfieldPhone, newHavenPhone].filter(Boolean) as { label: string; number: string }[];

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!callRef.current?.contains(event.target as Node)) {
        setCallOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setCallOpen(false);
    }
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleCallClick = () => {
    if (phoneList.length === 0) return;
    if (phoneList.length === 1) {
      window.location.href = `tel:${phoneList[0].number.replace(/\D/g, '')}`;
      return;
    }
    setCallOpen((current) => !current);
  };

  return (
    <div ref={callRef} className="bw-sticky-cta md:hidden fixed inset-x-3 bottom-3 z-40">
      {callOpen ? (
        <div
          className="absolute bottom-[64px] right-0 w-[260px] max-w-[calc(100vw-24px)] overflow-hidden rounded-[12px] border border-[#dfe3ea] bg-white shadow-[0_18px_48px_rgba(15,25,45,0.24)]"
          aria-hidden={!callOpen}
        >
          <div className="flex flex-col items-center px-5 pb-3 pt-4">
            <h3 className="text-[14px] font-semibold text-[#1E2B43]">Call Us</h3>
            <p className="mt-0.5 text-center text-[11px] leading-[1.4] text-[#68758d]">
              Mon–Fri 8am–5pm · Sat 8am–3pm
            </p>
          </div>
          <div className="border-t border-[#e7eaf0] px-3 py-3">
            <div className="space-y-2">
              {phoneList.map((p) => (
                <a
                  key={p.label}
                  href={`tel:${p.number.replace(/\D/g, '')}`}
                  className="block rounded-[7px] bg-[#f3eee6] px-3 py-2 transition-colors hover:bg-[#ede5d7]"
                >
                  <div className="text-[10px] font-bold uppercase tracking-[1px] text-[#6a7590]">
                    {p.label}
                  </div>
                  <div className="mt-0.5 text-[14px] font-semibold text-[#2a3957]">
                    {p.number}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-2.5 rounded-[14px] bg-white/85 p-1.5 shadow-[0_18px_44px_rgba(15,25,45,0.22)] backdrop-blur-md">
        <Link
          href="/free-consultation/"
          className="flex h-[50px] items-center justify-center rounded-[10px] bg-[#1E2B43] px-3 text-[14px] font-bold uppercase tracking-[0.4px] text-white transition-colors hover:bg-[#2a3957]"
        >
          Free Estimate
        </Link>
        <button
          type="button"
          onClick={handleCallClick}
          aria-expanded={callOpen}
          className="flex h-[50px] items-center justify-center gap-2 rounded-[10px] border border-[#bc9155] bg-[#bc9155] px-3 text-[14px] font-bold uppercase tracking-[0.4px] text-white transition-colors hover:bg-[#a57d48]"
        >
          <Phone className="h-[16px] w-[16px]" strokeWidth={2.4} />
          Call Now
        </button>
      </div>
    </div>
  );
}
