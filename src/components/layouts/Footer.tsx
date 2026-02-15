'use client';

import Link from 'next/link';
import Container from '@/src/components/ui/Container';
import { usePageData } from '@/src/context/PageDataContext';

const FOOTER_LINKS_A = [
  {
    title: 'Services',
    links: [
      { label: 'Kitchen Remodeling', url: '/kitchen-remodeling/' },
      { label: 'Bathroom Remodeling', url: '/bathroom-remodeling/' },
      { label: 'Basement Finishing', url: '/basement-finishing/' },
      { label: 'Flooring', url: '/flooring/' },
      { label: 'Home Additions', url: '/home-additions/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', url: '/about/' },
      { label: 'Portfolio', url: '/portfolio/' },
      { label: 'Reviews', url: '/reviews/' },
      { label: 'Contact', url: '/contact/' },
    ],
  },
];

const FOOTER_LINKS_B = [
  {
    title: 'Fairfield County Services',
    links: [
      { label: 'Kitchen Remodeling', url: '/fairfield-county/kitchen-remodeling/' },
      { label: 'Bathroom Remodeling', url: '/fairfield-county/bathroom-remodeling/' },
      { label: 'Basement Finishing', url: '/fairfield-county/basement-finishing/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', url: '/about/' },
      { label: 'Portfolio', url: '/portfolio/' },
      { label: 'Reviews', url: '/reviews/' },
      { label: 'Contact', url: '/contact/' },
    ],
  },
];

const FOOTER_LINKS_C = [
  {
    title: 'New Haven County Services',
    links: [
      { label: 'Kitchen Remodeling', url: '/new-haven-county/kitchen-remodeling/' },
      { label: 'Bathroom Remodeling', url: '/new-haven-county/bathroom-remodeling/' },
      { label: 'Basement Finishing', url: '/new-haven-county/basement-finishing/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', url: '/about/' },
      { label: 'Portfolio', url: '/portfolio/' },
      { label: 'Reviews', url: '/reviews/' },
      { label: 'Contact', url: '/contact/' },
    ],
  },
];

const FOOTER_LINKS_D = [
  {
    title: 'Orange Services',
    links: [
      { label: 'Kitchen Remodeling', url: '/orange/kitchen-remodeling/' },
      { label: 'Bathroom Remodeling', url: '/orange/bathroom-remodeling/' },
      { label: 'Basement Finishing', url: '/orange/basement-finishing/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', url: '/about/' },
      { label: 'Portfolio', url: '/portfolio/' },
      { label: 'Reviews', url: '/reviews/' },
      { label: 'Contact', url: '/contact/' },
    ],
  },
];

export default function Footer() {
  const { footerVariant, phones } = usePageData();

  const footerLinks =
    footerVariant === 'B' ? FOOTER_LINKS_B :
    footerVariant === 'C' ? FOOTER_LINKS_C :
    footerVariant === 'D' ? FOOTER_LINKS_D :
    FOOTER_LINKS_A;

  return (
    <footer className="bg-[#1A2B45] text-white" data-variant={footerVariant}>
      <Container>
        <div className="py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="text-2xl font-serif font-semibold">
                Built<span className="text-[#C68E4D]">Well</span>
              </Link>
              <p className="mt-4 text-sm text-white/70">
                Quality home remodeling in Connecticut.
              </p>
            </div>

            {footerLinks.map((col, i) => (
              <div key={i}>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#C68E4D]">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link
                        href={link.url}
                        className="text-sm text-white/70 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#C68E4D]">
                Contact
              </h4>
              <div className="space-y-2 text-sm text-white/70">
                {phones.map((phone) => (
                  <div key={phone.label}>
                    <span>{phone.label}: </span>
                    <a href={`tel:${phone.number.replace(/\D/g, '')}`} className="hover:text-white">
                      {phone.number}
                    </a>
                  </div>
                ))}
                <div>
                  <a href="mailto:info@builtwellct.com" className="hover:text-white">
                    info@builtwellct.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/50">
            {`© ${new Date().getFullYear()} BuiltWell CT. All rights reserved.`}
          </div>
        </div>
      </Container>
    </footer>
  );
}
