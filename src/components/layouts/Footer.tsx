'use client';

import Link from 'next/link';
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
            <Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-[#bc9155]">
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
    <footer className="bg-[#151e30] pb-8 pt-16 text-white">
      <div className="mx-auto max-w-[1240px] px-6">
        {/* Top grid */}
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2" aria-label="BuiltWell home">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Built<span className="text-[#bc9155]">Well</span>
              </span>
            </Link>

            <div className="mt-6 space-y-4 text-sm text-white/70">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#bc9155]">
                  Headquarters
                </p>
                <p className="mt-1 text-white/88">Headquartered in Orange, CT</p>
              </div>

              {newHavenPhone ? (
                <a href={`tel:${newHavenPhone.number.replace(/\D/g, '')}`} className="block transition-colors hover:text-[#bc9155]">
                  New Haven County: {newHavenPhone.number}
                </a>
              ) : null}
              {fairfieldPhone ? (
                <a href={`tel:${fairfieldPhone.number.replace(/\D/g, '')}`} className="block transition-colors hover:text-[#bc9155]">
                  Fairfield County: {fairfieldPhone.number}
                </a>
              ) : null}
            </div>

            <div className="mt-6 flex items-center gap-3 text-white/55">
              <a href="https://instagram.com/builtwellct" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#bc9155]" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com/company/builtwellct" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#bc9155]" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://youtube.com/@builtwellct" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#bc9155]" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="https://facebook.com/builtwellct" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#bc9155]" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <FooterColumn title="Services" links={FOOTER_SERVICES} />
          <FooterColumn title="Company" links={FOOTER_COMPANY} />
          <div className="space-y-10">
            <FooterColumn title="Areas We Serve" links={FOOTER_AREAS} />
            <FooterColumn title="Legal" links={FOOTER_LEGAL} />
          </div>
        </div>

        {/* Tagline */}
        <p className="py-8 text-center font-serif text-xl italic text-[#bc9155]">
          The Last Contractor You&apos;ll <span className="text-white">Hire.</span>
        </p>

        {/* Bottom bar */}
        <div className="flex flex-col gap-2 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <span>&copy; {currentYear} BuiltWell CT. All rights reserved.</span>
          <span>CT HIC License #0668405 | Serving Fairfield &amp; New Haven Counties, Connecticut</span>
        </div>
      </div>
    </footer>
  );
}
