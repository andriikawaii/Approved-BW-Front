'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
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

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <svg className="h-8 w-8 text-[#C68E4D]" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 2L4 14h4v14h16V14h4L16 2zm-4 24V15h8v11h-8z" />
          </svg>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#1A2B45]">
            Built<span className="text-[#C68E4D]">Well</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-wide text-[#1A2B45] transition-colors hover:text-[#C68E4D]"
            >
              {item.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setConsultationOpen(true)}
            className="rounded bg-[#C68E4D] px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#B07C3C]"
          >
            Free Consultation
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-[#1A2B45] lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-7 w-7" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative ml-auto h-full w-[88%] max-w-sm overflow-y-auto bg-white px-6 py-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="font-serif text-2xl font-bold tracking-tight text-[#1A2B45]"
                onClick={() => setMobileOpen(false)}
              >
                Built<span className="text-[#C68E4D]">Well</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6 text-[#1A2B45]" />
              </button>
            </div>

            <nav className="mt-8 space-y-1">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block border-b border-gray-100 py-3 text-lg font-semibold uppercase tracking-wide text-[#1A2B45] transition-colors hover:text-[#C68E4D]"
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
                className="mt-6 inline-flex w-full items-center justify-center rounded bg-[#C68E4D] px-4 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#B07C3C]"
              >
                Free Consultation
              </button>
            </nav>
          </div>
        </div>
      ) : null}

      <ConsultationModal open={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </header>
  );
}
