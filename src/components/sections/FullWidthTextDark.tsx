'use client';

type Props = {
  data: {
    title: string;
    subtitle?: string;
    alignment?: 'left' | 'center' | 'right';
  };
};

export default function FullWidthTextDark({ data }: Props) {
  return (
    <section className="bg-[#1E2F4A] py-16 px-6 lg:px-16 text-white text-center">
      <h2 className="text-3xl font-bold md:text-[36px]">{data.title}</h2>
      {data.subtitle ? (
        <p className="mx-auto mt-4 max-w-3xl text-lg">{data.subtitle}</p>
      ) : null}
    </section>
  );
}
