'use client';

type Props = {
  data: {
    badge: string;
    title: {
      normal: string;
      highlight: string;
    };
    image: string;
    image_alt?: string | null;
    paragraphs: string[];
    quote?: string;
  };
};

export default function StorySplitSection({ data }: Props) {
  const { badge, title, image, paragraphs, quote } = data;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl shadow-[0_18px_40px_rgba(30,47,74,0.2)]">
            <img src={image} alt={data.image_alt || title.normal} className="h-full w-full object-cover" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#C89B5B]">{badge}</span>

            <h2 className="mt-4 text-[36px] font-semibold leading-[1.1] text-[#1E2F4A] md:text-[44px]">
              {title.normal}
              {title.highlight ? (
                <>
                  <br />
                  <span className="text-[#C89B5B]">{title.highlight}</span>
                </>
              ) : null}
            </h2>

            <div className="mt-6 space-y-5 text-base leading-[1.7] text-[#6B7280] md:text-[18px]">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {quote ? (
              <blockquote className="mt-8 border-l-4 border-[#C89B5B] pl-4 text-lg italic text-[#1E2F4A]">
                {quote}
              </blockquote>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
