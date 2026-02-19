'use client';

import Link from 'next/link';
import Container from '@/src/components/ui/Container';
import { usePageData } from '@/src/context/PageDataContext';

const SERVICE_LINKS = {
  A: [
    { label: 'Kitchen Remodeling', url: '/kitchen-remodeling/' },
    { label: 'Bathroom Remodeling', url: '/bathroom-remodeling/' },
    { label: 'Basement Finishing', url: '/basement-finishing/' },
    { label: 'Flooring', url: '/flooring/' },
    { label: 'Home Additions', url: '/home-additions/' },
  ],
  B: [
    { label: 'Kitchen Remodeling', url: '/fairfield-county/kitchen-remodeling/' },
    { label: 'Bathroom Remodeling', url: '/fairfield-county/bathroom-remodeling/' },
    { label: 'Basement Finishing', url: '/fairfield-county/basement-finishing/' },
  ],
  C: [
    { label: 'Kitchen Remodeling', url: '/new-haven-county/kitchen-remodeling/' },
    { label: 'Bathroom Remodeling', url: '/new-haven-county/bathroom-remodeling/' },
    { label: 'Basement Finishing', url: '/new-haven-county/basement-finishing/' },
  ],
  D: [
    { label: 'Kitchen Remodeling', url: '/orange/kitchen-remodeling/' },
    { label: 'Bathroom Remodeling', url: '/orange/bathroom-remodeling/' },
    { label: 'Basement Finishing', url: '/orange/basement-finishing/' },
  ],
} as const;

const AREA_LINKS = [
  { label: 'Fairfield County', url: '/fairfield-county/' },
  { label: 'New Haven County', url: '/new-haven-county/' },
  { label: 'Orange', url: '/orange/' },
];

const RESOURCE_LINKS = [
  { label: 'Blog', url: '/blog/' },
  { label: 'FAQ', url: '/faq/' },
  { label: 'Free Consultation', url: '/free-consultation/' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', url: '/privacy-policy/' },
  { label: 'Terms of Service', url: '/terms/' },
  { label: 'Licensing', url: '/licensing/' },
];

function Column({ title, links }: { title: string; links: ReadonlyArray<{ label: string; url: string }> }) {
  return (
    <div>
      <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-[#C89B5B]">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.url}>
            <Link href={link.url} className="text-sm text-white/70 transition-colors hover:text-[#C89B5B]">
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

  return (
    <footer className="bg-[#1E2F4A] text-white" data-variant={footerVariant}>
      <Container>
        <div className="py-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div>
              <Link href="/" className="text-2xl font-semibold text-white">
                Built<span className="text-[#C89B5B]">Well</span>
              </Link>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Quality remodeling across Fairfield and New Haven counties.
              </p>
              <div className="mt-4 space-y-1.5 text-sm text-white/75">
                {phones.map((phone) => (
                  <div key={phone.label}>
                    <span className="text-white/50">{phone.label}:</span>{' '}
                    <a href={`tel:${phone.number.replace(/\D/g, '')}`} className="hover:text-[#C89B5B]">
                      {phone.number}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <Column title="Services" links={serviceLinks} />
            <Column title="Service Areas" links={AREA_LINKS} />
            <Column title="Resources" links={RESOURCE_LINKS} />
            <Column title="Legal" links={LEGAL_LINKS} />
          </div>

          <div className="mt-10 border-t border-white/12 pt-6 text-xs text-white/60 sm:flex sm:items-center sm:justify-between">
            <p>Copyright {currentYear} BuiltWell CT. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">CT HIC License #HIC.0654321</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
