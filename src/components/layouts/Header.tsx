'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ConsultationModal from './ConsultationModal';

const NAV_LINKS = [
  { label: 'Services', href: '/services/' },
  { label: 'Areas We Serve', href: '/areas-we-serve/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[1000] border-b border-[rgba(30,43,67,0.08)] bg-[rgba(255,255,255,0.98)] backdrop-blur-[12px] transition-[box-shadow] duration-300 ${
          scrolled ? 'shadow-[0_2px_16px_rgba(30,43,67,0.1)]' : 'shadow-[0_1px_8px_rgba(30,43,67,0.06)]'
        }`}
      >
        <div className="relative mx-auto flex h-16 max-w-[1240px] items-center justify-between px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="BuiltWell home"
          >
            <Image
              src="/logos/builtwell-logo-colored.png"
              alt="BuiltWell CT home remodeling contractor logo"
              width={158}
              height={40}
              className="block h-auto w-[150px]"
              priority
            />
          </Link>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex">
            <nav className="flex items-center gap-9" aria-label="Main navigation">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.8px] text-[#1A2B45] transition-colors duration-200 hover:text-[#C68E4D]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setConsultationOpen(true)}
              className="hidden whitespace-nowrap rounded-[6px] bg-[#BC9155] px-[22px] py-[10px] text-[12px] font-semibold uppercase tracking-[0.5px] text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#a57d48] lg:inline-flex"
            >
              Get Your Free Estimate
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] border-0 bg-transparent p-1 lg:hidden"
            >
              <span className="block h-[2px] w-6 rounded-[2px] bg-[#1A2B45]" />
              <span className="block h-[2px] w-6 rounded-[2px] bg-[#1A2B45]" />
              <span className="block h-[2px] w-6 rounded-[2px] bg-[#1A2B45]" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[1050] lg:hidden">
          <div
            className="absolute inset-0 bg-[rgba(30,43,67,0.98)]"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative flex h-full flex-col items-center justify-center gap-7 px-6 text-center">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-[20px] font-medium uppercase tracking-[2px] text-[rgba(255,255,255,0.85)] transition-colors duration-200 hover:text-[#C68E4D]"
              >
                {item.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setConsultationOpen(true);
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-[4px] bg-[#BC9155] px-8 py-4 text-[15px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#a57d48]"
            >
              Get Your Free Estimate
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center"
          >
            <span className="absolute block h-[2px] w-6 rotate-45 rounded-[2px] bg-white" />
            <span className="absolute block h-[2px] w-6 -rotate-45 rounded-[2px] bg-white" />
          </button>
        </div>
      ) : null}

      <ConsultationModal
        open={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </>
  );
}
