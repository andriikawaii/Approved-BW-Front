import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

type Office = {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  license?: string;
};

type Props = {
  data: {
    headline?: string;
    title?: string;
    offices?: Office[];
    items?: Office[];
  };
};

export default function OfficeInfoCards({ data }: Props) {
  const title = data.headline || data.title || 'Our Offices';
  const offices = data.offices || data.items || [];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-semibold text-[#1E2F4A] md:text-[44px]">{title}</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {offices.map((office, index) => (
            <article
              key={`${office.name}-${index}`}
              className="rounded-2xl border border-[#e7dece] bg-[#f8f6f1] p-7 shadow-[0_12px_26px_rgba(30,47,74,0.08)]"
            >
              <h3 className="text-2xl font-semibold text-[#1E2F4A]">{office.name}</h3>

              <div className="mt-5 space-y-3 text-sm text-[#5e6f87]">
                {office.address ? (
                  <p className="inline-flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C89B5B]" />
                    <span>{office.address}</span>
                  </p>
                ) : null}

                {office.phone ? (
                  <p className="inline-flex items-start gap-2">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#C89B5B]" />
                    <a href={`tel:${office.phone.replace(/\D/g, '')}`} className="hover:underline">
                      {office.phone}
                    </a>
                  </p>
                ) : null}

                {office.email ? (
                  <p className="inline-flex items-start gap-2">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#C89B5B]" />
                    <a href={`mailto:${office.email}`} className="hover:underline">
                      {office.email}
                    </a>
                  </p>
                ) : null}

                {office.license ? (
                  <p className="inline-flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#C89B5B]" />
                    <span>{office.license}</span>
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

