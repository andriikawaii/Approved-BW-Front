'use client';

import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';

type Props = {
  data: {
    title: string;
    subtitle?: string;
    address: string;
    phone: string;
    email: string;
    office_image?: string | null;
    office_image_alt?: string | null;
    directions_url?: string;
  };
};

export default function OfficeInfo({ data }: Props) {
  const { title, subtitle, address, phone, email, office_image, directions_url } = data;
  const imageSrc = office_image || '/images/hero/hero-carousel-final.png';

  return (
    <section className="bg-[#f3f3f2] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="text-[40px] font-semibold text-[#1E2F4A] md:text-[46px]">{title}</h2>
            {subtitle ? <p className="mt-3 text-[15px] text-[#4f5f78] md:text-base">{subtitle}</p> : null}

            <div className="mt-6 space-y-4 rounded-lg border border-[#e4ddcf] bg-white p-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C89B5B]" />
                <span className="text-sm text-[#4f5f78]">{address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#C89B5B]" />
                <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-sm text-[#4f5f78] hover:underline">
                  {phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#C89B5B]" />
                <a href={`mailto:${email}`} className="text-sm text-[#4f5f78] hover:underline">
                  {email}
                </a>
              </div>
              {directions_url ? (
                <a
                  href={directions_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C89B5B] hover:underline"
                >
                  Get Directions <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
          </div>

          <div>
            <img
              src={imageSrc}
              alt={data.office_image_alt || title}
              className="w-full rounded-lg border border-[#e4ddcf] object-cover shadow-[0_10px_24px_rgba(30,47,74,0.1)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
