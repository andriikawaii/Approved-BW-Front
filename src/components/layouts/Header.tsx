'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/src/components/ui/Container';
import Button from '@/src/components/ui/Button';

function Caret() {
  return (
    <span
      className="
        ml-1 inline-block h-1.5 w-1.5
        border-r-2 border-b-2 border-current
        rotate-45
        transition-transform group-hover:rotate-[225deg]
      "
    />
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={[
        'inline-block h-2.5 w-2.5',
        'border-r-2 border-b-2 border-white/80',
        'rotate-45',
        'transition-transform duration-200',
        open ? '-rotate-135' : 'rotate-45',
      ].join(' ')}
    />
  );
}


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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);


  return (
    <header className="bg-[#1A2B45] text-white">
      {/* TOP BAR */}
      <div className="border-b border-white/10">
        <Container>
          <div className="flex flex-col gap-2 py-2 text-xs sm:flex-row sm:justify-end sm:gap-6">
            <a href="tel:+12039199616" className="hover:text-[#C68E4D]">
              <span className="text-white/70">Fairfield County:</span>{' '}
              <span className="font-semibold">(203) 919-9616</span>
            </a>
            <a href="tel:+12034669148" className="hover:text-[#C68E4D]">
              <span className="text-white/70">New Haven County:</span>{' '}
              <span className="font-semibold">(203) 466-9148</span>
            </a>
          </div>
        </Container>
      </div>

      {/* MAIN HEADER */}
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="text-2xl font-serif font-semibold">
            Built<span className="text-[#C68E4D]">Well</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 lg:flex">
            {/* SERVICES DROPDOWN */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium hover:text-[#C68E4D]">
                Services <Caret />
              </button>

              {/* hover bridge */}
              <div className="absolute left-0 top-full h-3 w-full" />

              <div
                className="
                  absolute left-0 top-full z-50 mt-3 w-72
                  rounded-lg overflow-hidden
                  bg-white shadow-xl
                  opacity-0 invisible
                  group-hover:visible group-hover:opacity-100
                  transition
                "
              >
                {/* top gold line */}
                <div className="h-1 bg-[#C68E4D]" />

                <div className="py-2">
                  {NAV.services.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="
                        block px-4 py-2
                        text-[14px] font-medium text-[#1A2B45]
                        transition-colors
                        hover:bg-[#F3F7FB]
                        hover:text-[#C68E4D]
                      "
                    >
                      {item.label}
                    </Link>
                  ))}

                  <div className="mt-1 border-t border-gray-200">
                    <Link
                      href="/services/"
                      className="
                        block px-4 py-2
                        text-[14px] font-medium text-[#C68E4D]
                        hover:bg-[#F3F7FB]
                      "
                    >
                      More Services →
                    </Link>
                  </div>
                </div>
              </div>
            </div>


            {/* AREAS DROPDOWN */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium hover:text-[#C68E4D]">
                Areas We Serve <Caret />
              </button>

              {/* hover bridge */}
              <div className="absolute left-0 top-full h-3 w-full" />

              <div
                className="
                  absolute left-0 top-full z-50 mt-3 w-64
                  rounded-lg overflow-hidden
                  bg-white shadow-xl
                  opacity-0 invisible
                  group-hover:visible group-hover:opacity-100
                  transition
                "
              >
                <div className="h-1 bg-[#C68E4D]" />

                <div className="py-2">
                  {NAV.areas.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="
                        block px-4 py-2
                        text-[14px] font-medium text-[#1A2B45]
                        transition-colors
                        hover:bg-[#F3F7FB]
                        hover:text-[#C68E4D]
                      "
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>


            {NAV.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-[#C68E4D]"
              >
                {item.label}
              </Link>
            ))}

            <Button href="/free-consultation/" variant="primary">
              Schedule a Free Consultation
            </Button>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-xl"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </Container>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          {/* panel */}
          <div className="relative h-full w-full bg-[#1A2B45] px-6 py-6 text-white">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-serif font-semibold">
                Built<span className="text-[#C68E4D]">Well</span>
              </Link>

              <button
                onClick={() => setMobileOpen(false)}
                className="text-3xl"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            {/* NAV */}
            <nav className="mt-10 flex flex-col text-lg">
              {/* HOME */}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="border-b border-white/10 py-4"
              >
                Home
              </Link>

              {/* SERVICES */}
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-between border-b border-white/10 py-4"
              >
                <span>Services</span>
                <Chevron open={servicesOpen} />
              </button>

              {servicesOpen && (
                <div className="space-y-3 bg-[#1A2B45] py-4 pl-4 text-base">
                  {NAV.services.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2"
                    >
                      <span className="text-[#C68E4D]">•</span>
                      {item.label}
                    </Link>
                  ))}

                  <Link
                    href="/services/"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 inline-block text-[#C68E4D]"
                  >
                    More Services →
                  </Link>
                </div>
              )}

              {/* AREAS */}
              <button
                onClick={() => setAreasOpen(!areasOpen)}
                className="flex items-center justify-between border-b border-white/10 py-4"
              >
                <span>Areas We Serve</span>
                <Chevron open={areasOpen} />
              </button>

              {areasOpen && (
                <div className="space-y-3 bg-[#1A2B45] py-4 pl-4 text-base">
                  {NAV.areas.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2"
                    >
                      <span className="text-[#C68E4D]">•</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* MAIN LINKS */}
              {NAV.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-white/10 py-4"
                >
                  {item.label}
                </Link>
              ))}

              {/* SUBCONTRACTORS */}
              <Link
                href="/subcontractors/"
                onClick={() => setMobileOpen(false)}
                className="border-b border-white/10 py-4"
              >
                Subcontractors
              </Link>

              {/* CTA */}
              <Link
                href="/free-consultation/"
                onClick={() => setMobileOpen(false)}
                className="mt-8 rounded bg-[#C68E4D] py-4 text-center font-semibold text-white"
              >
                Get a Free Quote
              </Link>

              {/* CONTACT INFO */}
              <div className="mt-10 space-y-3 text-sm">
                <div>
                  <span className="text-[#C68E4D]">Fairfield County:</span>{' '}
                  <a href="tel:+12039199616">(203) 919-9616</a>
                </div>
                <div>
                  <span className="text-[#C68E4D]">New Haven County:</span>{' '}
                  <a href="tel:+12034669148">(203) 466-9148</a>
                </div>
                <div>
                  <span className="text-[#C68E4D]">Email:</span>{' '}
                  <a href="mailto:info@builtwellct.com">info@builtwellct.com</a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

    </header>
  );
}
