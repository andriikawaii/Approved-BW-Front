'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'bw-cookie-consent';

type Choice = 'accepted' | 'rejected';

export function getCookieConsent(): Choice | null {
  if (typeof window === 'undefined') return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === 'accepted' || v === 'rejected' ? v : null;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getCookieConsent() === null) {
      setVisible(true);
    }
  }, []);

  function record(choice: Choice) {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {}
    setVisible(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bw:cookie-consent', { detail: choice }));
    }
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-[#1E2B43]/10 bg-white shadow-[0_-8px_24px_rgba(30,43,67,0.08)]"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8 md:py-6">
        <p className="max-w-[760px] text-[14px] leading-[1.6] text-[#1E2B43]">
          We use cookies to run this site, remember your preferences, and (if you opt in) understand
          how visitors use the site. You can accept all cookies or reject non-essential ones. See our{' '}
          <Link href="/privacy-policy/" className="font-semibold underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-2 md:flex-nowrap">
          <button
            type="button"
            onClick={() => record('rejected')}
            className="inline-flex h-[40px] items-center rounded-full border border-[#1E2B43]/20 px-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#1E2B43] transition-colors hover:bg-[#1E2B43]/5"
          >
            Reject Non-Essential
          </button>
          <button
            type="button"
            onClick={() => record('accepted')}
            className="inline-flex h-[40px] items-center rounded-full bg-[#1E2B43] px-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-shadow hover:shadow-[0_8px_20px_rgba(30,43,67,0.25)]"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
