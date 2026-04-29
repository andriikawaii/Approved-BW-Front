import Link from 'next/link';

/**
 * Global mobile-only floating "Get Your Free Estimate" CTA.
 * Sized to fit between the floating Text Us (left) and Call Us (right) buttons.
 * Auto-hides on pages that already render their own `.gwc-sticky-cta` (see globals.css).
 */
export default function StickyEstimateCta() {
  return (
    <Link
      href="/free-consultation/"
      className="bw-sticky-cta md:hidden fixed bottom-[14px] left-[96px] right-[96px] z-40 flex min-h-[52px] items-center justify-center rounded-[12px] bg-[#bc9155] px-3 text-center text-[14px] font-bold text-white shadow-[0_14px_34px_rgba(30,43,67,0.24)] transition-colors hover:bg-[#a57d48]"
    >
      Get Your Free Estimate
    </Link>
  );
}
