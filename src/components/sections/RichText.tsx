import Link from 'next/link';

type RichTextProps = {
  data: {
    eyebrow?: string;
    title?: string;
    content: string;
    image?: string | null;
    image_alt?: string | null;
    image_position?: 'left' | 'right';
    cta?: { label: string; url: string } | null;
    align?: 'left' | 'center' | 'right';
    variant?: string;
  };
};

export function RichText({ data }: RichTextProps) {
  const paragraphs = data.content.split('\n\n').filter(Boolean);

  return (
    <section className={`${data.variant === 'light' ? 'bg-[#F5F3EF]' : 'bg-white'} py-24`}>
      <div className="mx-auto max-w-4xl px-6">
        {data.eyebrow && (
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.1em] text-[#C89B5B]">
            {data.eyebrow}
          </span>
        )}

        {data.title && (
          <h2 className="mb-7 text-4xl font-semibold text-[#1E2F4A] md:text-[44px]">
            {data.title}
          </h2>
        )}

        <div className={`space-y-5 text-base leading-[1.75] text-[#6B7280] md:text-[18px] ${data.align === 'center' ? 'text-center' : ''}`}>
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {data.cta && (
          <div className={`mt-8 ${data.align === 'center' ? 'text-center' : ''}`}>
            <Link
              href={data.cta.url}
              className="inline-flex items-center justify-center rounded-md bg-[#C89B5B] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#b98747]"
            >
              {data.cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default RichText;
