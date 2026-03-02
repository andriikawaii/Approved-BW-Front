'use client';

import Link from 'next/link';
import Container from '@/src/components/ui/Container';
import { usePageData } from '@/src/context/PageDataContext';
import { Phone, Mail, ShieldCheck, Facebook, Instagram, Linkedin } from 'lucide-react';

const COMPANY_LINKS = [
  { label: 'About', url: '/about/' },
  { label: 'Process', url: '/process/' },
  { label: 'Reviews', url: '/reviews/' },
  { label: 'Careers', url: '/careers/' },
  { label: 'Contact', url: '/contact/' },
];

const SERVICE_LINKS = {
  A: [
    { label: 'Kitchen Remodeling', url: '/kitchen-remodeling/' },
    { label: 'Bathroom Remodeling', url: '/bathroom-remodeling/' },
    { label: 'Basement Finishing', url: '/basement-finishing/' },
    { label: 'Flooring', url: '/flooring/' },
    { label: 'All Services', url: '/services/' },
  ],
  B: [
    { label: 'Kitchen Remodeling', url: '/fairfield-county/kitchen-remodeling/' },
    { label: 'Bathroom Remodeling', url: '/fairfield-county/bathroom-remodeling/' },
    { label: 'Basement Finishing', url: '/fairfield-county/basement-finishing/' },
    { label: 'All Services', url: '/services/' },
  ],
  C: [
    { label: 'Kitchen Remodeling', url: '/new-haven-county/kitchen-remodeling/' },
    { label: 'Bathroom Remodeling', url: '/new-haven-county/bathroom-remodeling/' },
    { label: 'Basement Finishing', url: '/new-haven-county/basement-finishing/' },
    { label: 'All Services', url: '/services/' },
  ],
  D: [
    { label: 'Kitchen Remodeling', url: '/orange/kitchen-remodeling/' },
    { label: 'Bathroom Remodeling', url: '/orange/bathroom-remodeling/' },
    { label: 'Basement Finishing', url: '/orange/basement-finishing/' },
    { label: 'All Services', url: '/services/' },
  ],
} as const;

const AREA_LINKS = [
  { label: 'Fairfield County', url: '/fairfield-county/' },
  { label: 'New Haven County', url: '/new-haven-county/' },
];

const RESOURCE_LINKS = [
  { label: 'Homeowner Hub', url: '/homeowner-hub/' },
  { label: 'FAQ', url: '/faq/' },
  { label: 'Financing', url: '/financing/' },
  { label: 'Warranty', url: '/warranty/' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', url: '/privacy-policy/' },
  { label: 'Terms', url: '/terms/' },
  { label: 'Sitemap', url: '/sitemap/' },
];

function Column({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; url: string }>;
}) {
  return (
    <div>
      {/* OVO je ključ: belo + serif + border-left gold */}
      <h4 className="font-serif text-xl font-bold mb-6 !text-white border-l-2 border-[#C68E4D] pl-3">
        {title}
      </h4>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.url}>
            <Link
              href={link.url}
              className="text-gray-400 hover:text-[#C68E4D] transition-colors text-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

type FooterProps = {
  currentYear: number;
};

export default function Footer({ currentYear }: FooterProps) {
  const { footerVariant, phones } = usePageData();
  const serviceLinks = SERVICE_LINKS[footerVariant];

  const fairfield = phones?.find((p) => p.label?.toLowerCase().includes('fairfield'));
  const newHaven = phones?.find((p) => p.label?.toLowerCase().includes('new haven'));
  const primaryPhone = phones?.[0];

  return (
    <footer className="bg-[#1A2B45] text-white pt-20 pb-10 border-t-4 border-[#C68E4D]" data-variant={footerVariant}>
      <Container>
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          <Column title="Company" links={COMPANY_LINKS} />
          <Column title="Services" links={serviceLinks} />
          <Column title="Service Areas" links={AREA_LINKS} />
          <Column title="Resources" links={RESOURCE_LINKS} />
          <Column title="Legal" links={LEGAL_LINKS} />
        </div>

        {/* MID CONTACT STRIP */}
        <div className="border-t border-gray-800 pt-10 pb-10 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Call us */}
            <div className="flex items-start gap-4">
              <div className="bg-[#C68E4D]/10 p-3 rounded-full">
                <Phone className="w-6 h-6 text-[#C68E4D]" />
              </div>
              <div>
                <h5 className="!text-white font-bold mb-1">Call Us</h5>
                <div className="flex flex-col gap-1">
                  {fairfield?.number ? (
                    <a
                      href={`tel:${fairfield.number.replace(/\D/g, '')}`}
                      className="text-gray-400 hover:text-white text-sm transition-colors block"
                    >
                      Fairfield County: {fairfield.number}
                    </a>
                  ) : null}
                  {newHaven?.number ? (
                    <a
                      href={`tel:${newHaven.number.replace(/\D/g, '')}`}
                      className="text-gray-400 hover:text-white text-sm transition-colors block"
                    >
                      New Haven County: {newHaven.number}
                    </a>
                  ) : !fairfield?.number && primaryPhone?.number ? (
                    <a
                      href={`tel:${primaryPhone.number.replace(/\D/g, '')}`}
                      className="text-gray-400 hover:text-white text-sm transition-colors block"
                    >
                      {primaryPhone.label}: {primaryPhone.number}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Email us */}
            <div className="flex items-start gap-4">
              <div className="bg-[#C68E4D]/10 p-3 rounded-full">
                <Mail className="w-6 h-6 text-[#C68E4D]" />
              </div>
              <div>
                <h5 className="!text-white font-bold mb-1">Email Us</h5>
                <a
                  href="mailto:info@builtwellct.com"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  info@builtwellct.com
                </a>
              </div>
            </div>

            {/* Licensed */}
            <div className="flex items-start gap-4">
              <div className="bg-[#C68E4D]/10 p-3 rounded-full">
                <ShieldCheck className="w-6 h-6 text-[#C68E4D]" />
              </div>
              <div>
                <h5 className="!text-white font-bold mb-1">Licensed &amp; Insured</h5>
                <p className="text-gray-400 text-sm">CT HIC.0652847</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="h-px bg-gray-800 w-full mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-sans">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p>© {currentYear} BuiltWell CT. All rights reserved.</p>
            <span className="hidden md:inline text-gray-700">|</span>
            <p>The Last Contractor You&apos;ll Hire</p>
          </div>

          <div className="flex gap-4">
            <a href="#" className="hover:text-[#C68E4D] transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-[#C68E4D] transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-[#C68E4D] transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}