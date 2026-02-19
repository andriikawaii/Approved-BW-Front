import Link from 'next/link';

type Props = {
  data: {
    title?: string;
    headline?: string;
    subtitle?: string;
    subheadline?: string;
    cta?: {
      label: string;
      url: string;
    } | null;
  };
};

export default function CtaLightSection({ data }: Props) {
  const title = data.headline || data.title || 'Ready to Connect?';
  const subtitle = data.subheadline || data.subtitle;

  return (
    <section className="bg-[#f7f4ed] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-[#e3d8c3] bg-white p-10 text-center shadow-[0_14px_30px_rgba(30,47,74,0.1)] md:p-12">
          <h2 className="text-3xl font-semibold text-[#1E2F4A] md:text-[42px]">{title}</h2>
          {subtitle ? (
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#5f6f87] md:text-lg">{subtitle}</p>
          ) : null}

          {data.cta ? (
            <Link
              href={data.cta.url}
              className="mt-8 inline-flex items-center justify-center rounded-md bg-[#1E2F4A] px-7 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#253e61]"
            >
              {data.cta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

