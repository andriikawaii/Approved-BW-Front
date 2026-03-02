'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import Container from '@/src/components/ui/Container';
import Button from '@/src/components/ui/Button';
import { usePageData } from '@/src/context/PageDataContext';

const NAV = {
  services: [
    { label: 'Kitchen Remodeling', href: '/kitchen-remodeling/' },
    { label: 'Bathroom Remodeling', href: '/bathroom-remodeling/' },
    { label: 'Basement Finishing', href: '/basement-finishing/' },
    { label: 'Flooring', href: '/flooring/' },
    { label: 'Home Additions', href: '/home-additions/' },
  ],
  areas: [
    { label: 'Fairfield County', href: '/fairfield-county/' },
    { label: 'New Haven County', href: '/new-haven-county/' },
  ],
  main: [
    { label: 'Portfolio', href: '/portfolio/' },
    { label: 'Reviews', href: '/reviews/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],
};

export default function Header() {
  const { phones } = usePageData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

  const phoneItems = phones ?? [];

  return (
    <header className="bg-[#1A2B45] text-white">
      {phoneItems.length > 0 ? (
        <div className="border-b border-white/10">
          <Container>
            <div className="flex flex-wrap justify-end gap-4 py-2 text-sm font-sans">
              {phoneItems.map((phone) => (
                <a
                  key={phone.label}
                  href={`tel:${phone.number.replace(/\D/g, '')}`}
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  <span className="mr-1 text-[#C68E4D] font-bold">{phone.label}:</span>
                  <span className="font-medium">{phone.number}</span>
                </a>
              ))}
            </div>
          </Container>
        </div>
      ) : null}

      <Container>
        <div className="flex h-[74px] items-center justify-between">
          <Link href="/" className="font-serif text-3xl font-bold tracking-tight text-white">
            Built<span className="text-[#C68E4D]">Well</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <div className="group relative">
              <button className="flex items-center gap-1 font-sans text-sm xl:text-base font-medium text-white transition-colors hover:text-[#C68E4D]">
                Services <ChevronDown className="h-4 w-4" />
              </button>
              <div className="invisible absolute left-0 top-full z-30 mt-4 w-72 overflow-hidden rounded shadow-xl border-t-4 border-[#C68E4D] bg-white opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                {NAV.services.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block border-b border-gray-100 px-4 py-2.5 font-sans text-sm font-medium text-[#1A2B45] transition-colors hover:bg-gray-50 hover:text-[#C68E4D]"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/services/"
                  className="block border-t border-gray-100 px-4 py-2.5 font-sans text-sm font-bold text-[#C68E4D] transition-colors hover:bg-gray-50"
                >
                  View All Services
                </Link>
              </div>
            </div>

            <div className="group relative">
              <button className="flex items-center gap-1 font-sans text-sm xl:text-base font-medium text-white transition-colors hover:text-[#C68E4D]">
                Areas We Serve <ChevronDown className="h-4 w-4" />
              </button>
              <div className="invisible absolute left-0 top-full z-30 mt-4 w-64 overflow-hidden rounded shadow-xl border-t-4 border-[#C68E4D] bg-white opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                {NAV.areas.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block border-b border-gray-100 px-4 py-2.5 font-sans text-sm font-medium text-[#1A2B45] transition-colors hover:bg-gray-50 hover:text-[#C68E4D]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {NAV.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-sm xl:text-base font-medium text-white transition-colors hover:text-[#C68E4D]"
              >
                {item.label}
              </Link>
            ))}

            <Button
              href="/free-consultation/"
              variant="primary"
              className="rounded bg-[#C68E4D] px-6 py-5 font-sans text-sm font-bold uppercase tracking-wide shadow-lg hover:bg-[#B07C3C]"
            >
              Schedule a Consultation
            </Button>
          </nav>

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-white"
            aria-label="Open menu"
          >
            <Menu className="h-8 w-8" />
          </button>
        </div>
      </Container>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative ml-auto h-full w-[88%] max-w-sm overflow-y-auto bg-[#1A2B45] px-6 py-6 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="font-serif text-3xl font-bold tracking-tight text-white"
                onClick={() => setMobileOpen(false)}
              >
                Built<span className="text-[#C68E4D]">Well</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-8 space-y-1">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block border-b border-white/10 py-3 font-serif text-xl font-medium text-white transition-colors hover:text-[#C68E4D]"
              >
                Home
              </Link>

              <button
                onClick={() => setServicesOpen((v) => !v)}
                className="flex w-full items-center justify-between border-b border-white/10 py-3 font-serif text-xl font-medium text-white transition-colors hover:text-[#C68E4D]"
              >
                <span>Services</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen ? (
                <div className="space-y-2 pb-2 pl-4">
                  {NAV.services.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1.5 font-sans text-base text-gray-300 transition-colors hover:text-[#C68E4D]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}

              <button
                onClick={() => setAreasOpen((v) => !v)}
                className="flex w-full items-center justify-between border-b border-white/10 py-3 font-serif text-xl font-medium text-white transition-colors hover:text-[#C68E4D]"
              >
                <span>Areas We Serve</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${areasOpen ? 'rotate-180' : ''}`} />
              </button>
              {areasOpen ? (
                <div className="space-y-2 pb-2 pl-4">
                  {NAV.areas.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1.5 font-sans text-base text-gray-300 transition-colors hover:text-[#C68E4D]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}

              {NAV.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block border-b border-white/10 py-3 font-serif text-xl font-medium text-white transition-colors hover:text-[#C68E4D]"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/free-consultation/"
                onClick={() => setMobileOpen(false)}
                className="mt-6 inline-flex w-full items-center justify-center rounded bg-[#C68E4D] px-4 py-6 font-sans text-lg font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-[#B07C3C]"
              >
                Schedule Consultation
              </Link>

              {phoneItems.length > 0 ? (
                <div className="mt-8 space-y-2 font-sans text-sm text-gray-300">
                  {phoneItems.map((phone) => (
                    <div key={phone.label}>
                      <span className="mr-1 font-bold text-[#C68E4D]">{phone.label}:</span>
                      <a href={`tel:${phone.number.replace(/\D/g, '')}`}>{phone.number}</a>
                    </div>
                  ))}
                </div>
              ) : null}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
