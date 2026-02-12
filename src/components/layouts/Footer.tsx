'use client';

import Link from 'next/link';
import Container from '@/src/components/ui/Container';
import { usePageData } from '@/src/context/PageDataContext';

export default function Footer() {
  const { footer, phones } = usePageData();

  if (!footer || Object.keys(footer).length === 0) return null;

  const phoneItems = phones?.items ?? [];

  return (
    <footer className="bg-[#1A2B45] text-white">
      <Container>
        <div className="py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <Link href="/" className="text-2xl font-serif font-semibold">
                Built<span className="text-[#C68E4D]">Well</span>
              </Link>
              {footer.tagline && (
                <p className="mt-4 text-sm text-white/70">{footer.tagline}</p>
              )}
            </div>

            {/* Links */}
            {footer.columns?.map((col: any, i: number) => (
              <div key={i}>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#C68E4D]">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links?.map((link: any, j: number) => (
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

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#C68E4D]">
                Contact
              </h4>
              <div className="space-y-2 text-sm text-white/70">
                {phoneItems.map((phone) => (
                  <div key={phone.label}>
                    <span>{phone.label}: </span>
                    <a href={`tel:${phone.number.replace(/\D/g, '')}`} className="hover:text-white">
                      {phone.number}
                    </a>
                  </div>
                ))}
                {footer.email && (
                  <div>
                    <a href={`mailto:${footer.email}`} className="hover:text-white">
                      {footer.email}
                    </a>
                  </div>
                )}
                {footer.address && <p>{footer.address}</p>}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/50">
            {footer.copyright ?? `© ${new Date().getFullYear()} BuiltWell CT. All rights reserved.`}
          </div>
        </div>
      </Container>
    </footer>
  );
}
