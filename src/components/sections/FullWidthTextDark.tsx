'use client';

type Props = {
  data: {
    title: string;
    subtitle?: string;
    alignment?: 'left' | 'center' | 'right';
    background_image?: string | null;
    background_image_alt?: string | null;
  };
};

export default function FullWidthTextDark({ data }: Props) {
  return (
    <section className="relative bg-[#1E2F4A] py-16 px-6 lg:px-16 text-white text-center overflow-hidden">
      {data.background_image ? (
        <>
          <img
            src={data.background_image}
            alt={data.background_image_alt || ''}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[#1E2F4A]/60" />
        </>
      ) : null}
      <div className="relative z-10">
        <h2 className="text-3xl !text-[#C89B5B] font-bold md:text-[36px]">{data.title}</h2>
        {data.subtitle ? (
          <p className="mx-auto mt-4 max-w-3xl text-lg">{data.subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
