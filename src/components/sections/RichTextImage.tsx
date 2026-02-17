type Props = {
  data: {
    eyebrow?: string;
    title: string;
    content: string;
    image?: string | null;
    image_alt?: string;
    image_position?: 'left' | 'right';
    quote_text?: string;
  };
};

export default function RichTextImage({ data }: Props) {
  const paragraphs = data.content.split('\n\n').filter(Boolean);
  const imageOnLeft = data.image_position === 'left';

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className={`relative ${imageOnLeft ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="overflow-hidden rounded-xl shadow-[0_18px_40px_rgba(30,47,74,0.2)]">
              {data.image ? (
                <img
                  src={data.image}
                  alt={data.image_alt || data.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-[#1E2F4A]/10">
                  <span className="text-lg text-[#1E2F4A]/30">{data.image_alt || 'Image coming soon'}</span>
                </div>
              )}
            </div>
          </div>

          <div className={imageOnLeft ? 'lg:order-2' : 'lg:order-1'}>
            {data.eyebrow && (
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.1em] text-[#C89B5B]">
                {data.eyebrow}
              </span>
            )}

            <h2 className="mt-2 text-[36px] font-semibold leading-[1.1] text-[#1E2F4A] md:text-[44px]">
              {data.title}
            </h2>

            <div className="mt-6 space-y-5 text-base leading-[1.7] text-[#6B7280] md:text-[18px]">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {data.quote_text && (
              <div className="mt-8 border-l-4 border-[#C89B5B] pl-4 text-lg italic text-[#1E2F4A]">
                {data.quote_text}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
