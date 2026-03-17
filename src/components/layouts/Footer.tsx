'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Linkedin, Youtube, Facebook } from 'lucide-react';
import { usePageData } from '@/src/context/PageDataContext';

const FOOTER_SERVICES = [
  { label: 'Additions', href: '/home-additions/' },
  { label: 'Basements', href: '/basement-finishing/' },
  { label: 'Bathrooms', href: '/bathroom-remodeling/' },
  { label: 'Flooring', href: '/flooring/' },
  { label: 'Interior Carpentry', href: '/interior-carpentry/' },
  { label: 'Kitchens', href: '/kitchen-remodeling/' },
];

const FOOTER_COMPANY = [
  { label: 'About Us', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Our Process', href: '/process/' },
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Reviews', href: '/reviews/' },
];

const FOOTER_AREAS = [
  { label: 'Fairfield County', href: '/fairfield-county/' },
  { label: 'New Haven County', href: '/new-haven-county/' },
  { label: 'See All Areas', href: '/areas-we-serve/' },
];

const FOOTER_LEGAL = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms of Service', href: '/terms/' },
  { label: 'Warranty', href: '/warranty/' },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">{title}</h4>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`text-sm transition-colors hover:text-[#bc9155] ${
                link.label.includes('See All') ? 'font-semibold text-white' : 'text-white/78'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ currentYear }: { currentYear: number }) {
  const { phones } = usePageData();
  const phoneItems = phones ?? [];
  const fairfieldPhone = phoneItems.find((p) => p.label.toLowerCase().includes('fairfield'));
  const newHavenPhone = phoneItems.find((p) => p.label.toLowerCase().includes('new haven'));

  return (
    <footer className="bg-[#1E2B43] pb-7 pt-14 text-white">
      <div className="mx-auto max-w-[1240px] px-6">
        {/* Top grid */}
        <div className="grid gap-12 pb-12 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="BuiltWell home">
              <Image
                src="/logos/builtwell-logo-footer-gold.png"
                alt="BuiltWell"
                width={160}
                height={42}
                className="h-auto w-[150px]"
              />
            </Link>

            <div className="mt-4 space-y-2.5 text-sm text-white/88">
              <div>
                <p className="text-[16px] font-semibold leading-tight text-white">
                  Headquarters
                </p>
                <p className="mt-1 leading-[1.45] text-white/88">206A Boston Post Road<br />Orange, CT 06477</p>
              </div>

              {newHavenPhone ? (
                <a href={`tel:${newHavenPhone.number.replace(/\D/g, '')}`} className="block text-[15px] leading-tight transition-colors hover:text-[#bc9155]">
                  {newHavenPhone.number}
                </a>
              ) : null}
              {fairfieldPhone ? (
                <div className="pt-1.5">
                  <p className="text-[16px] font-semibold leading-tight text-white">Fairfield County</p>
                  <a href={`tel:${fairfieldPhone.number.replace(/\D/g, '')}`} className="mt-1 block text-[15px] leading-tight transition-colors hover:text-[#bc9155]">
                    {fairfieldPhone.number}
                  </a>
                </div>
              ) : null}
            </div>

            <div className="mt-10 flex items-center gap-3 text-white/55">
              <a href="https://instagram.com/builtwellct" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-[#bc9155] hover:text-[#bc9155]" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com/company/builtwellct" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-[#bc9155] hover:text-[#bc9155]" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://youtube.com/@builtwellct" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-[#bc9155] hover:text-[#bc9155]" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="https://facebook.com/builtwellct" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-[#bc9155] hover:text-[#bc9155]" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <FooterColumn
            title="Services"
            links={[...FOOTER_SERVICES, { label: 'See All Services →', href: '/services/' }]}
          />
          <FooterColumn title="Company" links={FOOTER_COMPANY} />
          <div className="space-y-10">
            <FooterColumn title="Areas We Serve" links={FOOTER_AREAS} />
            <FooterColumn title="Legal" links={FOOTER_LEGAL} />
          </div>
        </div>

        {/* Tagline */}
        <p className="py-7 text-center font-serif text-[clamp(24px,2.1vw,38px)] italic text-[#bc9155]">
          The Last Contractor You&apos;ll <span className="text-white">Hire.</span>
        </p>

        {/* Bottom bar */}
        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <span>&copy; {currentYear} Legacy of Clean LLC d/b/a BuiltWell CT. All rights reserved.</span>
          <span>CT HIC License #0668405 | Serving Fairfield &amp; New Haven Counties, Connecticut</span>
        </div>
      </div>
    </footer>
  );
}
