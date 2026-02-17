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
    <header className="bg-[#1E2F4A] text-white">
      {phoneItems.length > 0 ? (
        <div className="border-b border-white/12">
          <Container>
            <div className="flex flex-wrap justify-end gap-4 py-2 text-xs">
              {phoneItems.map((phone) => (
                <a
                  key={phone.label}
                  href={`tel:${phone.number.replace(/\D/g, '')}`}
                  className="text-white/80 transition-colors hover:text-[#C89B5B]"
                >
                  <span className="uppercase tracking-[0.08em] text-white/60">{phone.label}:</span> {phone.number}
                </a>
              ))}
            </div>
          </Container>
        </div>
      ) : null}

      <Container>
        <div className="flex h-[74px] items-center justify-between">
          <Link href="/" className="text-2xl font-semibold text-white">
            Built<span className="text-[#C89B5B]">Well</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-medium text-white/90 transition-colors hover:text-[#C89B5B]">
                Services <ChevronDown className="h-4 w-4" />
              </button>
              <div className="invisible absolute left-0 top-full z-30 mt-4 w-72 overflow-hidden rounded-lg border border-[#e6dece] bg-white opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                {NAV.services.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block border-b border-[#f2ecdf] px-4 py-2.5 text-sm font-medium text-[#1E2F4A] transition-colors hover:bg-[#f8f5ef] hover:text-[#C89B5B]"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/services/"
                  className="block px-4 py-2.5 text-sm font-semibold text-[#C89B5B] transition-colors hover:bg-[#f8f5ef]"
                >
                  View All Services
                </Link>
              </div>
            </div>

            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-medium text-white/90 transition-colors hover:text-[#C89B5B]">
                Areas We Serve <ChevronDown className="h-4 w-4" />
              </button>
              <div className="invisible absolute left-0 top-full z-30 mt-4 w-64 overflow-hidden rounded-lg border border-[#e6dece] bg-white opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                {NAV.areas.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block border-b border-[#f2ecdf] px-4 py-2.5 text-sm font-medium text-[#1E2F4A] transition-colors hover:bg-[#f8f5ef] hover:text-[#C89B5B]"
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
                className="text-sm font-medium text-white/90 transition-colors hover:text-[#C89B5B]"
              >
                {item.label}
              </Link>
            ))}

            <Button href="/free-consultation/" variant="primary">
              Schedule a Consultation
            </Button>
          </nav>

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </Container>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative ml-auto h-full w-[88%] max-w-sm overflow-y-auto bg-[#1E2F4A] px-6 py-6 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-semibold text-white" onClick={() => setMobileOpen(false)}>
                Built<span className="text-[#C89B5B]">Well</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-8 space-y-1">
              <Link href="/" onClick={() => setMobileOpen(false)} className="block border-b border-white/10 py-3">
                Home
              </Link>

              <button
                onClick={() => setServicesOpen((v) => !v)}
                className="flex w-full items-center justify-between border-b border-white/10 py-3"
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
                      className="block py-1.5 text-sm text-white/85"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}

              <button
                onClick={() => setAreasOpen((v) => !v)}
                className="flex w-full items-center justify-between border-b border-white/10 py-3"
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
                      className="block py-1.5 text-sm text-white/85"
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
                  className="block border-b border-white/10 py-3"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/free-consultation/"
                onClick={() => setMobileOpen(false)}
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-[#C89B5B] px-4 py-3 text-sm font-semibold text-white"
              >
                Schedule Consultation
              </Link>

              {phoneItems.length > 0 ? (
                <div className="mt-8 space-y-2 text-sm text-white/80">
                  {phoneItems.map((phone) => (
                    <div key={phone.label}>
                      <span className="text-[#C89B5B]">{phone.label}:</span>{' '}
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
