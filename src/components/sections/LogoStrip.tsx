'use client';

import Link from 'next/link';

type LogoItem = {
  name: string;
  logo?: string | null;
  logo_alt?: string | null;
  url?: string | null;
};

type Props = {
  data: {
    title: string;
    subtitle?: string | null;
    items: LogoItem[];
  };
};

function LogoMark({ item }: { item: LogoItem }) {
  if (item.logo) {
    return <img src={item.logo} alt={item.logo_alt || item.name} className="h-8 w-auto object-contain" />;
  }

  return <span className="text-sm font-medium text-[#6B7280]">{item.name}</span>;
}

export default function LogoStrip({ data }: Props) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl text-center">
        <div className="px-6 lg:px-16">
          <h2 className="text-3xl font-bold md:text-[36px]">{data.title}</h2>
          {data.subtitle ? <p className="mt-3 text-[18px] text-[#6B7280]">{data.subtitle}</p> : null}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-10 px-6 lg:px-16">
          {data.items.map((item, index) => {
            const content = <LogoMark item={item} />;

            if (item.url) {
              return (
                <Link key={`${item.name}-${index}`} href={item.url} className="transition-opacity hover:opacity-90">
                  {content}
                </Link>
              );
            }

            return <div key={`${item.name}-${index}`}>{content}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
