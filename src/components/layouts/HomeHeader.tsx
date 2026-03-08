'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

type PhoneItem = {
  label: string;
  number: string;
};

type HomeHeaderProps = {
  phones: PhoneItem[];
};

const NAV_ITEMS = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why' },
  { label: 'Process', href: '#process' },
  { label: 'Areas', href: '#areas' },
  { label: 'Projects', href: '#projects' },
];

export default function HomeHeader({ phones }: HomeHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-[#BC9155]/20 bg-[rgba(30,43,67,0.98)] shadow-[0_12px_32px_rgba(0,0,0,0.2)]'
            : 'border-[#BC9155]/15 bg-[rgba(30,43,67,0.94)]'
        } backdrop-blur-xl`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-serif text-[1.65rem] font-bold tracking-[-0.03em] text-white">
            Built<span className="text-[#BC9155]">Well</span> CT
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/75 transition-colors hover:text-[#BC9155]"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/free-consultation/"
              className="rounded-sm bg-[#BC9155] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a57d48]"
            >
              Free Consultation
            </Link>
            {phones[0] ? (
              <a
                href={`tel:${phones[0].number.replace(/\D/g, '')}`}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {phones[0].number}
              </a>
            ) : null}
          </nav>

          <button
            type="button"
            className="rounded-sm border border-white/15 p-2 text-white lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-[88%] max-w-sm flex-col bg-[#151E30] px-6 py-6 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="font-serif text-[1.8rem] font-bold tracking-[-0.03em] text-white"
                onClick={() => setMobileOpen(false)}
              >
                Built<span className="text-[#BC9155]">Well</span> CT
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="border-b border-white/10 py-4 font-serif text-xl text-white transition-colors hover:text-[#BC9155]"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/free-consultation/"
                className="mt-6 inline-flex items-center justify-center rounded-sm bg-[#BC9155] px-4 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#a57d48]"
                onClick={() => setMobileOpen(false)}
              >
                Free Consultation
              </Link>
            </nav>

            {phones.length > 0 ? (
              <div className="mt-10 space-y-3 border-t border-white/10 pt-6 text-sm text-white/70">
                {phones.map((phone) => (
                  <a
                    key={`${phone.label}-${phone.number}`}
                    href={`tel:${phone.number.replace(/\D/g, '')}`}
                    className="block transition-colors hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="mr-2 text-[#BC9155]">{phone.label}:</span>
                    {phone.number}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
