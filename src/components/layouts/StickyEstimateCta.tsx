'use client';

import { useScheduler } from '@/src/components/SchedulerModal';

/**
 * Global mobile-only floating "Get a Free Quote" CTA.
 * Sized to leave room for the floating Call Us bubble on the right (~84px).
 * Opens the scheduler modal directly instead of navigating to a page.
 * Auto-hides on pages that already render their own `.gwc-sticky-cta` (see globals.css).
 */
export default function StickyEstimateCta() {
  const { open } = useScheduler();
  return (
    <button
      type="button"
      onClick={open}
      className="bw-sticky-cta md:hidden fixed bottom-[14px] left-[16px] right-[84px] z-40 flex min-h-[52px] items-center justify-center rounded-[12px] bg-[#bc9155] px-4 text-center text-[15px] font-bold text-white shadow-[0_14px_34px_rgba(30,43,67,0.24)] transition-colors hover:bg-[#a57d48]"
    >
      Get a Free Quote
    </button>
  );
}
