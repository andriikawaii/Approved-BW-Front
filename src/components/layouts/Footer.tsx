'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePageData } from '@/src/context/PageDataContext';
import FooterA from './FooterA';
import FooterB from './FooterB';
import FooterC from './FooterC';
import FooterD from './FooterD';

const SUPPORT_EMAIL = 'info@buildwellct.com';

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const FOOTER_SERVICES = [
  { label: 'Kitchens', href: '/kitchen-remodeling/' },
  { label: 'Bathrooms', href: '/bathroom-remodeling/' },
  { label: 'Basements', href: '/basement-finishing/' },
  { label: 'Flooring', href: '/flooring/' },
  { label: 'Additions', href: '/home-additions/' },
  { label: 'Painting', href: '/interior-painting/' },
  { label: 'Carpentry', href: '/interior-carpentry/' },
];

const FOOTER_COMPANY = [
  { label: 'About', href: '/about/' },
  { label: 'Our Process', href: '/process/' },
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'Case Studies', href: '/case-studies/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Careers', href: '/careers/' },
];

const FOOTER_RESOURCES = [
  { label: 'Free Consultation', href: '/free-consultation/' },
  { label: 'Homeowner Hub', href: '/homeowner-hub/' },
  { label: 'Areas We Serve', href: '/areas-we-serve/' },
  { label: 'Financing', href: '/financing/' },
];

const FOOTER_LEGAL = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms', href: '/terms/' },
  { label: 'Warranty', href: '/warranty/' },
];

function FooterColumn({
  title,
  links,
  allLink,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
  allLink?: { label: string; href: string };
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">{title}</h4>
      <ul className="mt-4 space-y-0">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex py-[7px] text-[14px] text-white/[0.78] transition-colors hover:text-[#bc9155]"
            >
              {link.label}
            </Link>
          </li>
        ))}
        {allLink && (
          <li>
            <Link
              href={allLink.href}
              className="inline-flex py-[7px] text-[14px] font-semibold text-white transition-colors hover:text-[#bc9155]"
            >
              {allLink.label}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default function Footer({ currentYear }: { currentYear: number }) {
  const { phones, footerVariant } = usePageData();
  const phoneItems = phones ?? [];

  if (footerVariant === 'A') {
    return <FooterA currentYear={currentYear} phones={phoneItems} />;
  }

  if (footerVariant === 'B') {
    return <FooterB currentYear={currentYear} phones={phoneItems} />;
  }

  if (footerVariant === 'C') {
    return <FooterC currentYear={currentYear} phones={phoneItems} />;
  }

  if (footerVariant === 'D') {
    return <FooterD currentYear={currentYear} phones={phoneItems} />;
  }

  const fairfieldPhone = phoneItems.find((p) => p.label.toLowerCase().includes('fairfield'));
  const newHavenPhone = phoneItems.find((p) => p.label.toLowerCase().includes('new haven'));

  return (
    <footer className="bg-[#1E2B43] pb-7 pt-14 text-white">
      <div className="mx-auto max-w-[1240px] px-6">
        {/* Top grid */}
        <div className="grid gap-12 pb-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="BuiltWell CT Home">
              <Image
                src="/logos/builtwell-logo-footer-gold.png"
                alt="BuiltWell CT licensed Connecticut home remodeling contractor"
                width={158}
                height={40}
                className="h-auto w-[150px]"
              />
            </Link>

            <div style={{ paddingLeft: 0, marginTop: 16 }}>
              <p className="mb-5 max-w-[280px] text-sm leading-[1.7] text-white/75">
                Professional home remodeling across Fairfield and New Haven Counties, Connecticut.
              </p>

              <div className="mb-5 flex flex-col gap-2">
                {fairfieldPhone && (
                  <a
                    href={`tel:${fairfieldPhone.number.replace(/\D/g, '')}`}
                    className="inline-flex items-center gap-2 text-[15px] font-semibold text-white transition-colors hover:text-[#bc9155]"
                  >
                    <PhoneIcon />
                    Fairfield County: {fairfieldPhone.number}
                  </a>
                )}
                {newHavenPhone && (
                  <a
                    href={`tel:${newHavenPhone.number.replace(/\D/g, '')}`}
                    className="inline-flex items-center gap-2 text-[15px] font-semibold text-white transition-colors hover:text-[#bc9155]"
                  >
                    <PhoneIcon />
                    New Haven County: {newHavenPhone.number}
                  </a>
                )}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="inline-flex items-center gap-2 text-[13px] text-white/70 transition-colors hover:text-[#bc9155]"
                >
                  <MailIcon />
                  {SUPPORT_EMAIL}
                </a>
              </div>

              <div className="text-xs leading-[1.6] text-white/45">
                <div>CT HIC License #0668405</div>
                <div>Fully Bonded and Insured</div>
              </div>
            </div>
          </div>

          {/* Services */}
          <FooterColumn
            title="Services"
            links={FOOTER_SERVICES}
            allLink={{ label: 'All Services \u2192', href: '/services/' }}
          />

          {/* Company */}
          <FooterColumn title="Company" links={FOOTER_COMPANY} />

          {/* Resources + Legal */}
          <div>
            <FooterColumn title="Resources" links={FOOTER_RESOURCES} />
            <div className="mt-8">
              <FooterColumn title="Legal" links={FOOTER_LEGAL} />
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="py-7 text-center font-serif text-[clamp(24px,2.1vw,38px)] italic text-[#bc9155]">
          The Last Contractor You&apos;ll <span className="text-white">Hire.</span>
        </p>

        {/* Bottom bar */}
        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <span>&copy; {currentYear} Legacy of Clean LLC d/b/a BuiltWell CT. All rights reserved.</span>
          <span>
            Serving Fairfield &amp; New Haven Counties, CT
            {newHavenPhone ? ` | ${newHavenPhone.number}` : ''}
            {fairfieldPhone ? ` | ${fairfieldPhone.number}` : ''}
            {' '}| CT HIC #0668405
          </span>
        </div>
      </div>
    </footer>
  );
}
