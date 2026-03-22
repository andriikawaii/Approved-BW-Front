import Link from 'next/link';

type CallToActionProps = {
  data: {
    title?: string;
    headline?: string;
    subtitle?: string;
    subheadline?: string;
    subtext?: string;
    button_label?: string;
    button_url?: string;
    button?: {
      label?: string;
      url?: string;
    };
    cta?: {
      label: string;
      url: string;
    };
    town_hub?: boolean;
  };
};

export const CallToAction = ({ data }: CallToActionProps) => {
  const title = data.title || data.headline || '';
  const subtitle = data.subtitle || data.subheadline;
  const buttonLabel = data.button_label || data.button?.label || data.cta?.label;
  const buttonUrl = data.button_url || data.button?.url || data.cta?.url;
  const isTownHub = Boolean(data.town_hub);

  return (
    <section className={isTownHub ? 'bg-[#f6f1e6] py-20 md:py-24' : 'bg-[#f5f3ef] py-16 md:py-20'}>
      <div className="mx-auto max-w-6xl px-6">
        <div className={isTownHub ? 'relative overflow-hidden rounded-3xl border border-[#d8c7a9] bg-[linear-gradient(135deg,#1E2F4A_0%,#243a5c_100%)] px-7 py-11 text-center shadow-[0_18px_44px_rgba(30,47,74,0.30)] md:px-12 md:py-14' : 'overflow-hidden rounded-3xl border border-[#d8c7a9] bg-[#1E2F4A] px-7 py-10 text-center shadow-[0_14px_34px_rgba(30,47,74,0.22)] md:px-10 md:py-12'}>
          {isTownHub ? <div className="pointer-events-none absolute -left-10 -top-14 h-52 w-52 rounded-full bg-[#c89b5b]/15 blur-2xl" /> : null}
          {isTownHub ? <div className="pointer-events-none absolute -bottom-16 -right-8 h-52 w-52 rounded-full bg-white/10 blur-2xl" /> : null}
          <span className="bw-section-label mb-3 block">Next Step</span>
          <h2 className={isTownHub ? 'text-[32px] font-semibold !text-white md:text-[46px]' : 'text-3xl font-semibold !text-white md:text-[42px]'}>
          {title}
          </h2>

          {subtitle ? (
            <p className="mx-auto mt-5 max-w-3xl text-base text-white/85 md:text-lg md:leading-relaxed">
              {subtitle}
            </p>
          ) : null}

          {buttonUrl && buttonLabel ? (
            <div className="mt-9">
              <Link
                href={buttonUrl}
                className={isTownHub ? 'inline-flex items-center justify-center rounded-lg bg-[#C89B5B] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_10px_24px_rgba(188,145,85,0.35)] transition-colors duration-300 hover:bg-[#b98747]' : 'inline-flex items-center justify-center rounded-md bg-[#C89B5B] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#b98747]'}
              >
                {buttonLabel}
              </Link>
              {data.subtext ? (
                <p className="mt-3 text-sm text-white/75">{data.subtext}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
