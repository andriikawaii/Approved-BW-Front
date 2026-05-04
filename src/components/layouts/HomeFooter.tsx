import Link from 'next/link';
import { Mail } from 'lucide-react';

type PhoneItem = {
  label: string;
  number: string;
};

type HomeFooterProps = {
  phones: PhoneItem[];
};

const SUPPORT_EMAIL = 'info@builtwellct.com';

const SERVICE_LINKS = [
  { label: 'Kitchen Remodeling', href: '/kitchen-remodeling/' },
  { label: 'Bathroom Remodeling', href: '/bathroom-remodeling/' },
  { label: 'Basement Finishing', href: '/basement-finishing/' },
  { label: 'Home Additions', href: '/home-additions/' },
  { label: 'Flooring Installation', href: '/flooring/' },
  { label: 'All Services', href: '/services/' },
];

const COMPANY_LINKS = [
  { label: 'About', href: '/about/' },
  { label: 'Process', href: '/process/' },
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'Case Studies', href: '/case-studies/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Contact', href: '/contact/' },
];

const AREA_LINKS = [
  { label: 'Fairfield County', href: '/fairfield-county/' },
  { label: 'New Haven County', href: '/new-haven-county/' },
  { label: 'Service Areas', href: '/areas-we-serve/' },
];

const LEGAL_LINKS = [
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
      <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-[44px] items-center text-sm text-white/55 transition-colors hover:text-[#BC9155]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HomeFooter({ phones }: HomeFooterProps) {
  const year = new Date().getUTCFullYear();

  return (
    <footer className="bg-[#1E2B43] px-6 pb-0 pt-20 text-white/70">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/8 pb-16 lg:grid-cols-[1.45fr_1fr_1fr_1fr]">
          <div>
            <h3 className="text-[1.75rem] font-bold text-white">
              Built<span className="text-[#BC9155]">Well</span> CT
            </h3>
            <p className="mt-3 font-serif text-[0.98rem] italic text-[#BC9155]">
              The Last Contractor You&apos;ll Hire.
            </p>
            <p className="mt-5 text-sm leading-7">CT Home Improvement Contractor License #0668405</p>
            <p className="text-sm leading-7">Headquartered in Orange, CT</p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-[8px] border border-[#bc9155]/40 bg-[#bc9155]/10 px-3.5 text-[15px] font-semibold text-white transition-colors hover:text-[#BC9155]"
            >
              <Mail className="h-4 w-4 text-[#BC9155]" />
              {SUPPORT_EMAIL}
            </a>
            {phones.length > 0 ? (
              <div className="mt-5 space-y-2 text-sm">
                {phones.map((phone) => (
                  <a
                    key={`${phone.label}-${phone.number}`}
                    href={`tel:${phone.number.replace(/\D/g, '')}`}
                    className="block transition-colors hover:text-[#BC9155]"
                  >
                    <span className="mr-2 text-[#BC9155]">{phone.label}:</span>
                    {phone.number}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <FooterColumn title="Services" links={SERVICE_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <div className="space-y-10">
            <FooterColumn title="Areas We Serve" links={AREA_LINKS} />
            <FooterColumn title="Legal" links={LEGAL_LINKS} />
          </div>
        </div>

        <div className="flex flex-col gap-3 py-8 text-xs text-white/38 lg:flex-row lg:items-center lg:justify-between">
          <span>&copy; {year} BuiltWell CT. All rights reserved.</span>
          <span>Serving Fairfield County and New Haven County, Connecticut.</span>
        </div>
      </div>
    </footer>
  );
}
