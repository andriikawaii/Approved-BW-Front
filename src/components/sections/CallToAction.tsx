import Link from 'next/link';

type CallToActionProps = {
  data: {
    title?: string;
    headline?: string;
    subtitle?: string;
    subheadline?: string;
    button_label?: string;
    button_url?: string;
    cta?: {
      label: string;
      url: string;
    };
  };
};

export const CallToAction = ({ data }: CallToActionProps) => {
  const title = data.title || data.headline || '';
  const subtitle = data.subtitle || data.subheadline;
  const buttonLabel = data.button_label || data.cta?.label;
  const buttonUrl = data.button_url || data.cta?.url;

  return (
    <section className="bg-[#1E2F4A] py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-4xl font-semibold text-white md:text-[44px]">
          {title}
        </h2>

        {subtitle ? (
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/85 md:text-lg md:leading-relaxed">
            {subtitle}
          </p>
        ) : null}

        {buttonUrl && buttonLabel ? (
          <Link
            href={buttonUrl}
            className="mt-9 inline-flex items-center justify-center rounded-md bg-[#C89B5B] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#b98747]"
          >
            {buttonLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
};
