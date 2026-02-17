import Link from 'next/link';

type CallToActionProps = {
  data: {
    title: string;
    subtitle?: string;
    button_label: string;
    button_url: string;
  };
};

export const CallToAction = ({ data }: CallToActionProps) => (
  <section className="bg-[#1E2F4A] py-24">
    <div className="mx-auto max-w-7xl px-6 text-center">
      <h2 className="text-4xl font-semibold text-white md:text-[44px]">
        {data.title}
      </h2>

      {data.subtitle && (
        <p className="mx-auto mt-5 max-w-2xl text-base text-white/85 md:text-lg md:leading-relaxed">
          {data.subtitle}
        </p>
      )}

      <Link
        href={data.button_url}
        className="mt-9 inline-flex items-center justify-center rounded-md bg-[#C89B5B] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#b98747]"
      >
        {data.button_label}
      </Link>
    </div>
  </section>
);
