'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MessageSquare, Phone } from 'lucide-react';
import { usePageData } from '@/src/context/PageDataContext';

export default function TextUsWidget() {
  const { phones } = usePageData();
  const [open, setOpen] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);

  const fairfieldPhone = phones.find((item) => item.label.toLowerCase().includes('fairfield'));
  const newHavenPhone = phones.find((item) => item.label.toLowerCase().includes('new haven'));

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
      if (!phoneRef.current?.contains(event.target as Node)) {
        setPhoneOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        setPhoneOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  if (!fairfieldPhone && !newHavenPhone) {
    return null;
  }

  return (
    <>
    <div ref={rootRef} className="fixed bottom-4 left-4 z-[70] md:bottom-6 md:left-5">
      {open ? (
        <div
          className="mb-3 w-[268px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[12px] border border-[#dfe3ea] bg-white shadow-[0_18px_48px_rgba(15,25,45,0.24)]"
          aria-hidden={!open}
        >
          <div className="flex flex-col items-center px-5 pb-4 pt-4">
            <img
              src="/logos/builtwell-logo-colored.png"
              alt="BuiltWell"
              style={{ height: '100px', width: 'auto' }}
              className="object-contain"
            />
            <h3 className="mt-2 text-[15px] font-semibold text-[#1E2B43]">Text Us</h3>
            <p className="mt-1 text-center text-[12px] leading-[1.45] text-[#68758d]">
              We reply quickly during business hours.
            </p>
          </div>

          <div className="border-t border-[#e7eaf0] px-4 py-4">
            <div className="space-y-2">
              {fairfieldPhone ? (
                <a
                  href={`sms:${fairfieldPhone.number.replace(/\D/g, '')}`}
                  className="block rounded-[7px] bg-[#f3eee6] px-4 py-3 transition-colors hover:bg-[#ede5d7]"
                >
                  <div className="text-[10px] font-bold uppercase tracking-[1px] text-[#6a7590]">
                    Fairfield County
                  </div>
                  <div className="mt-0.5 text-[14px] font-semibold text-[#2a3957]">
                    {fairfieldPhone.number}
                  </div>
                </a>
              ) : null}

              {newHavenPhone ? (
                <a
                  href={`sms:${newHavenPhone.number.replace(/\D/g, '')}`}
                  className="block rounded-[7px] bg-[#f3eee6] px-4 py-3 transition-colors hover:bg-[#ede5d7]"
                >
                  <div className="text-[10px] font-bold uppercase tracking-[1px] text-[#6a7590]">
                    New Haven County
                  </div>
                  <div className="mt-0.5 text-[14px] font-semibold text-[#2a3957]">
                    {newHavenPhone.number}
                  </div>
                </a>
              ) : null}
            </div>
          </div>

          <div className="border-t border-[#e7eaf0] bg-[#f3f4f7] px-4 py-2.5 text-center text-[11px] text-[#6f7c93]">
            Available Mon-Fri 8am-5pm, Sat 8am-3pm
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Text us"
        aria-expanded={open}
        className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#b88439] text-white shadow-[0_10px_24px_rgba(20,30,50,0.28)] transition-all hover:bg-[#a97731]"
      >
        <MessageSquare className="h-[24px] w-[24px]" strokeWidth={1.9} />
      </button>
    </div>

    {/* Mobile-only Call button — identical visual structure to Text Us widget */}
    <div ref={phoneRef} className="fixed bottom-4 right-4 z-[70] md:hidden">
      {phoneOpen ? (
        <div
          className="mb-3 w-[268px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[12px] border border-[#dfe3ea] bg-white shadow-[0_18px_48px_rgba(15,25,45,0.24)]"
          aria-hidden={!phoneOpen}
        >
          <div className="flex flex-col items-center px-5 pb-4 pt-4">
            <img
              src="/logos/builtwell-logo-colored.png"
              alt="BuiltWell"
              style={{ height: '100px', width: 'auto' }}
              className="object-contain"
            />
            <h3 className="mt-2 text-[15px] font-semibold text-[#1E2B43]">Call Us</h3>
            <p className="mt-1 text-center text-[12px] leading-[1.45] text-[#68758d]">
              Tap to call us anytime.
            </p>
          </div>

          <div className="border-t border-[#e7eaf0] px-4 py-4">
            <div className="space-y-2">
              {fairfieldPhone ? (
                <a
                  href={`tel:${fairfieldPhone.number.replace(/\D/g, '')}`}
                  className="block rounded-[7px] bg-[#f3eee6] px-4 py-3 transition-colors hover:bg-[#ede5d7]"
                >
                  <div className="text-[10px] font-bold uppercase tracking-[1px] text-[#6a7590]">
                    Fairfield County
                  </div>
                  <div className="mt-0.5 text-[14px] font-semibold text-[#2a3957]">
                    {fairfieldPhone.number}
                  </div>
                </a>
              ) : null}

              {newHavenPhone ? (
                <a
                  href={`tel:${newHavenPhone.number.replace(/\D/g, '')}`}
                  className="block rounded-[7px] bg-[#f3eee6] px-4 py-3 transition-colors hover:bg-[#ede5d7]"
                >
                  <div className="text-[10px] font-bold uppercase tracking-[1px] text-[#6a7590]">
                    New Haven County
                  </div>
                  <div className="mt-0.5 text-[14px] font-semibold text-[#2a3957]">
                    {newHavenPhone.number}
                  </div>
                </a>
              ) : null}
            </div>
          </div>

          <div className="border-t border-[#e7eaf0] bg-[#f3f4f7] px-4 py-2.5 text-center text-[11px] text-[#6f7c93]">
            Available Mon-Fri 8am-5pm, Sat 8am-3pm
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setPhoneOpen((current) => !current)}
        aria-label="Call us"
        aria-expanded={phoneOpen}
        className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#b88439] text-white shadow-[0_10px_24px_rgba(20,30,50,0.28)] transition-all hover:bg-[#a97731]"
      >
        <Phone className="h-[24px] w-[24px]" strokeWidth={1.9} />
      </button>
    </div>
    </>
  );
}
