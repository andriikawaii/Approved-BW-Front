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

export default function CtaDarkBand({ data }: Props) {
  const title = data.headline || data.title || 'Ready to Get Started?';
  const subtitle = data.subheadline || data.subtitle;

  return (
    <section className="bg-[#142238] py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#1E2F4A_0%,#16253b_60%,#0f1a2b_100%)] p-10 text-center shadow-[0_16px_35px_rgba(0,0,0,0.25)] md:p-12">
          <h2 className="text-3xl font-semibold leading-tight text-white md:text-[42px]">{title}</h2>
          {subtitle ? (
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 md:text-lg">{subtitle}</p>
          ) : null}

          {data.cta ? (
            <Link
              href={data.cta.url}
              className="mt-8 inline-flex items-center justify-center rounded-md bg-[#C89B5B] px-7 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#b98747]"
            >
              {data.cta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

