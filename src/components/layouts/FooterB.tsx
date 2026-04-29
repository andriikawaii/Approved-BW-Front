'use client';

import Link from 'next/link';
import type { PhoneItem } from '@/lib/phones';

const SUPPORT_EMAIL = 'info@buildwellct.com';
const FAIRFIELD_FALLBACK = '(203) 919-9616';

const SERVICES_LINKS = [
  { label: 'Kitchens', href: '/kitchen-remodeling/' },
  { label: 'Bathrooms', href: '/bathroom-remodeling/' },
  { label: 'Basements', href: '/basement-finishing/' },
  { label: 'Flooring', href: '/flooring/' },
  { label: 'Additions', href: '/home-additions/' },
];

const COMPANY_LINKS = [
  { label: 'About', href: '/about/' },
  { label: 'Our Process', href: '/process/' },
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'Case Studies', href: '/case-studies/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Contact', href: '/contact/' },
];

const RESOURCE_LINKS = [
  { label: 'Pricing', href: '/pricing/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Careers', href: '/careers/' },
  { label: 'Homeowner Hub', href: '/homeowner-hub/' },
  { label: 'Areas We Serve', href: '/areas-we-serve/' },
];

function toTelHref(phone: string) {
  return `tel:${phone.replace(/\D/g, '')}`;
}

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export default function FooterB({
  currentYear,
  phones,
}: {
  currentYear: number;
  phones: PhoneItem[];
}) {
  const fairfieldPhone = formatPhone(phones.find((item) => item.label.toLowerCase().includes('fairfield'))?.number || FAIRFIELD_FALLBACK);

  return (
    <footer className="footer-a">
      <div className="footer-a-inner">
        <div className="footer-a-grid">
          <div className="footer-a-brand">
            <Link href="/" className="footer-a-logo" aria-label="BuiltWell CT Home">
              <img
                src="/logos/builtwell-logo-footer-gold.png"
                alt="BuiltWell CT"
                width={150}
                height={38}
              />
            </Link>

            <p className="footer-a-mobile-tagline">
              The Last Contractor You&apos;ll <span>Hire.</span>
            </p>

            <div className="footer-a-brand-details">
              <div className="footer-a-row">
                <span className="footer-a-row-icon" aria-hidden="true"><PhoneIcon /></span>
                <div className="footer-a-row-text">
                  <a href={toTelHref(fairfieldPhone)} className="footer-a-primary-phone">{fairfieldPhone}</a>
                  <div className="footer-a-serving">
                    Serving Greenwich, Westport, Darien,
                    <br />
                    New Canaan, Stamford, Norwalk &amp; more
                  </div>
                </div>
              </div>

              <div className="footer-a-row">
                <span className="footer-a-row-icon" aria-hidden="true"><MailIcon /></span>
                <div className="footer-a-row-text">
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="footer-a-email footer-a-email-b">{SUPPORT_EMAIL}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-a-col">
            <h4>Services</h4>
            <ul>
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-a-link">{link.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/services/" className="footer-a-link footer-a-link-accent">View All Services</Link>
              </li>
            </ul>
          </div>

          <div className="footer-a-col">
            <h4>Company</h4>
            <ul>
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-a-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-a-col">
            <h4>Resources</h4>
            <ul>
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-a-link">{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="footer-a-social-row">
              <a href="https://instagram.com/builtwellct" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </a>
              <a href="https://linkedin.com/company/builtwellct" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
              </a>
              <a href="https://youtube.com/@builtwellct" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <YoutubeIcon />
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=BuiltWell+CT,+206A+Boston+Post+Road,+Orange,+CT+06477" aria-label="Google Business Profile" target="_blank" rel="noopener noreferrer">
                <GoogleIcon />
              </a>
            </div>
          </div>
        </div>

        <p className="footer-a-tagline">
          The Last Contractor You&apos;ll <span>Hire.</span>
        </p>

        <div className="footer-a-bottom">
          <span>&copy; {currentYear} BuiltWell CT.</span>
          <span className="footer-a-hic">CT HIC #0668405 | Fully Bonded and Insured</span>
          <span className="footer-a-legal">
            <Link href="/privacy-policy/">Privacy Policy</Link>
            <span className="footer-a-sep">|</span>
            <Link href="/terms/">Terms</Link>
            <span className="footer-a-sep">|</span>
            <Link href="/warranty/">Warranty</Link>
            <span className="footer-a-sep">|</span>
            <Link href="/financing/">Financing</Link>
          </span>
        </div>
      </div>

      <style jsx>{`
        .footer-a {
          background: #1e2b43;
          color: rgba(255, 255, 255, 0.78);
        }
        .footer-a-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 48px 32px 24px;
        }
        .footer-a-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          align-items: stretch;
          gap: 40px;
        }
        .footer-a-brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-left: 0;
        }
        .footer-a-logo {
          display: block;
          align-self: flex-start;
          line-height: 0;
          margin-bottom: 0;
          margin-left: -26px;
        }
        .footer-a-brand-details {
          margin-top: 18px;
          margin-left: 18px;
        }
        /* Default (desktop): rows are transparent, icons + mobile tagline hidden — preserves original layout */
        .footer-a-row {
          display: block;
        }
        .footer-a-row-icon {
          display: none;
        }
        .footer-a-row-text {
          display: block;
        }
        .footer-a-mobile-tagline {
          display: none;
        }
        .footer-a-logo img {
          width: 150px;
          height: auto;
          display: block;
        }
        .footer-a-brand a:not(.footer-a-logo) {
          color: rgba(255, 255, 255, 0.85);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          display: block;
          margin-bottom: 1px;
          transition: color 0.2s;
        }
        .footer-a-primary-phone {
          margin-bottom: 4px !important;
        }
        .footer-a-serving {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.45);
          margin-bottom: 14px;
          line-height: 1.6;
        }
        .footer-a-brand a:not(.footer-a-logo):hover {
          color: #ffffff;
        }
        .footer-a-county {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.45);
          margin-bottom: 8px;
        }
        .footer-a-county-last {
          margin-bottom: 10px;
        }
        .footer-a-email {
          color: rgba(255, 255, 255, 0.65) !important;
          font-size: 13px !important;
          margin-bottom: 10px !important;
        }
        .footer-a-email-b {
          margin-bottom: 20px !important;
        }
        .footer-a-address {
          font-size: 13px !important;
          color: rgba(255, 255, 255, 0.5) !important;
          line-height: 1.5;
        }
        .footer-a-col h4 {
          font-family: var(--font-inter), sans-serif;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: #ffffff;
          margin: 0 0 16px;
        }
        .footer-a-col ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .footer-a-col li {
          margin: 0;
        }
        .footer-a-col :global(a.footer-a-link) {
          font-family: var(--font-inter), sans-serif;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: 0;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-a-col :global(a.footer-a-link:visited) {
          color: rgba(255, 255, 255, 0.7);
        }
        .footer-a-col :global(a.footer-a-link:hover) {
          color: #ffffff;
        }
        .footer-a-col :global(a.footer-a-link.footer-a-link-accent) {
          color: #bc9155;
          font-weight: 600;
        }
        .footer-a-col :global(a.footer-a-link.footer-a-link-accent:visited) {
          color: #bc9155;
        }
        .footer-a-col :global(a.footer-a-link.footer-a-link-accent:hover) {
          color: #c8a46a;
        }
        .footer-a-social-row {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-top: 20px;
        }
        .footer-a-social-row a {
          color: #bc9155;
          transition: opacity 0.2s;
          text-decoration: none;
        }
        .footer-a-social-row a:hover {
          opacity: 0.78;
        }
        .footer-a-tagline {
          font-family: var(--font-playfair), serif;
          font-style: italic;
          color: #bc9155;
          font-size: 29px;
          line-height: 1.4;
          margin: 36px 0 0;
          text-align: center;
        }
        .footer-a-tagline span {
          color: #ffffff;
        }
        .footer-a-bottom {
          margin-top: 40px;
          padding-top: 22px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.35);
        }
        .footer-a-hic {
          color: rgba(255, 255, 255, 0.35);
          font-size: 11px;
        }
        .footer-a-legal {
          color: rgba(255, 255, 255, 0.35);
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          line-height: 1.1;
        }
        .footer-a-legal :global(a) {
          color: rgba(255, 255, 255, 0.45);
          text-decoration: none;
          font-size: 13px;
          font-weight: 400;
          line-height: 1;
          transition: color 0.2s;
        }
        .footer-a-sep {
          margin: 0 8px;
          color: rgba(255, 255, 255, 0.45);
        }
        .footer-a-legal :global(a:hover) {
          color: #ffffff;
        }

        @media (max-width: 1024px) {
          .footer-a-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 28px !important;
          }
          .footer-a-brand {
            grid-column: 1 / -1;
            align-items: flex-start !important;
            text-align: left;
            padding-left: 0 !important;
            padding-bottom: 28px;
            margin-bottom: 8px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
          .footer-a-logo {
            margin-left: -26px !important;
            margin-bottom: 0 !important;
          }
          .footer-a-brand a[href^='tel:'] {
            font-size: 15px !important;
            font-weight: 600 !important;
          }
          .footer-a-serving {
            font-size: 11px;
            margin-bottom: 14px;
          }
          .footer-a-col {
            text-align: center;
          }
          .footer-a-col ul {
            align-items: center;
          }
          .footer-a-col h4 {
            font-size: 12px;
          }
          .footer-a-social-row {
            justify-content: center !important;
          }
          .footer-a-tagline {
            font-size: 24px;
          }
        }

        @media (max-width: 768px) {
          .footer-a-inner {
            padding: 44px 24px 36px;
          }
          .footer-a-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          /* Brand block: centered logo, no border on mobile (the card carries weight) */
          .footer-a-brand {
            align-items: center !important;
            text-align: center;
            padding-left: 0 !important;
            padding-bottom: 0;
            margin-bottom: 0;
            border-bottom: none;
          }
          .footer-a-logo {
            margin-left: 0 !important;
            margin-bottom: 0 !important;
            align-self: center !important;
          }
          .footer-a-logo img {
            width: 152px !important;
          }
          /* Mobile tagline — surfaced under logo, anchors the brand */
          .footer-a-mobile-tagline {
            display: block !important;
            margin: 14px 0 0 !important;
            font-family: var(--font-playfair), serif;
            font-style: italic;
            font-size: 18px;
            line-height: 1.35;
            letter-spacing: -0.005em;
            color: #bc9155;
            text-align: center;
          }
          .footer-a-mobile-tagline span {
            color: #ffffff;
          }
          /* Brand details = stack of 3 standalone widget boxes (TextUsWidget style) */
          .footer-a-brand-details {
            margin-top: 20px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            width: 100%;
            max-width: 320px;
            background: none;
            border: none;
            border-radius: 0;
            padding: 0;
            box-shadow: none;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          /* Rows = clean centered stack, no box — hairline dividers between rows */
          .footer-a-row {
            display: block !important;
            padding: 0;
            background: none;
            border: none;
            border-radius: 0;
            text-align: center !important;
            transition: none;
          }
          .footer-a-row + .footer-a-row {
            margin-top: 14px;
            padding-top: 14px;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }
          /* Hide icon tiles — TextUsWidget doesn't have them */
          .footer-a-row-icon {
            display: none !important;
          }
          .footer-a-row-text {
            min-width: 0;
            line-height: 1.3;
          }
          /* Phone rows: county label ABOVE phone number, matching TextUsWidget order */
          .footer-a-row:nth-of-type(1) .footer-a-row-text,
          .footer-a-row:nth-of-type(2) .footer-a-row-text {
            display: flex;
            flex-direction: column-reverse;
          }
          /* Phone number — TextUsWidget proportions, slightly smaller */
          .footer-a-brand a[href^='tel:'] {
            font-size: 15px !important;
            font-weight: 600 !important;
            color: #ffffff !important;
            display: block !important;
            min-height: 0;
            background: transparent;
            border: none;
            border-radius: 0;
            padding: 0;
            margin-bottom: 0 !important;
            letter-spacing: -0.005em;
            line-height: 1.25 !important;
          }
          /* County label — gold accent, uppercase tracking, centered */
          .footer-a-county {
            display: block !important;
            font-size: 10px !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            letter-spacing: 1.2px !important;
            color: #bc9155 !important;
            margin-top: 0 !important;
            margin-bottom: 3px !important;
            text-align: center !important;
            line-height: 1.2 !important;
          }
          .footer-a-county-last {
            margin-bottom: 3px !important;
          }
          /* Email + address — compact box */
          .footer-a-email {
            font-size: 13px !important;
            font-weight: 600 !important;
            color: #ffffff !important;
            min-height: 0;
            display: block !important;
            margin-bottom: 2px !important;
            line-height: 1.3 !important;
          }
          .footer-a-address {
            font-size: 11px !important;
            color: rgba(255, 255, 255, 0.5) !important;
            text-align: center !important;
            line-height: 1.45 !important;
            min-height: 0;
            display: block !important;
          }
          /* Link columns: centered + tight, separated from contact widgets by a thin divider above first col */
          .footer-a-col {
            text-align: center !important;
            padding: 0 !important;
            border-top: none !important;
            width: 100%;
            max-width: 320px;
            justify-self: center !important;
            margin-top: 22px;
          }
          .footer-a-col:first-of-type {
            margin-top: 28px;
            padding-top: 22px;
            border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
          }
          .footer-a-col h4 {
            margin: 0 auto 14px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.8px;
            color: #ffffff;
            text-align: center;
            position: relative;
            padding-bottom: 10px;
          }
          .footer-a-col h4::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 28px;
            height: 2px;
            background: #bc9155;
            border-radius: 1px;
          }
          .footer-a-col ul {
            align-items: center !important;
            gap: 0 !important;
          }
          .footer-a-col :global(a.footer-a-link) {
            font-size: 14px;
            min-height: 0;
            padding: 5px 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          .footer-a-social-row {
            justify-content: center !important;
            gap: 14px !important;
            margin-top: 28px !important;
            padding-top: 24px;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
          }
          .footer-a-social-row a {
            min-height: 40px !important;
            min-width: 40px !important;
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 10px;
          }
          .footer-a-social-row :global(svg) {
            width: 18px !important;
            height: 18px !important;
          }
          /* Hide the bottom tagline on mobile — it's surfaced under the logo via .footer-a-mobile-tagline */
          .footer-a-tagline {
            display: none !important;
          }
          .footer-a-bottom {
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            text-align: center;
            gap: 10px !important;
            margin-top: 24px;
            padding-top: 22px;
            font-size: 12px;
            line-height: 1.6;
          }
          .footer-a-sep {
            margin: 0 7px;
          }
        }
      `}</style>
    </footer>
  );
}
