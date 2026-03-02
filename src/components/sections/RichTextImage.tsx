import { ShieldCheck } from 'lucide-react';

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
  <section className="py-24 bg-white overflow-hidden">
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* IMAGE */}
        <div className={`relative ${imageOnLeft ? 'lg:order-1 order-2' : 'lg:order-2 order-2'}`}>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            
            {/* overlay */}
            <div className="absolute inset-0 bg-[#1A2B45]/10 mix-blend-multiply z-10"></div>

            {data.image ? (
              <img
                src={data.image}
                alt={data.image_alt || data.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center bg-[#1E2F4A]/10">
                <span className="text-lg text-[#1E2F4A]/30">
                  {data.image_alt || 'Image coming soon'}
                </span>
              </div>
            )}
          </div>

          {/* decorative squares */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#C68E4D] rounded-lg -z-10"></div>
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#1A2B45] rounded-lg -z-10"></div>

        </div>

        {/* CONTENT */}
        <div className={imageOnLeft ? 'lg:order-2 order-1' : 'lg:order-1 order-1'}>

          {/* SHIELD BADGE */}
          {data.eyebrow && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C68E4D]/10 text-[#C68E4D] font-bold text-sm uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>{data.eyebrow}</span>
            </div>
          )}

          {/* TITLE */}
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A2B45] mb-8 leading-tight">
            {(() => {
              const words = (data.title || '').trim().split(' ');
              if (words.length === 0) return null;

              const last = words.pop(); // Discipline
              const rest = words.join(' ');

              return (
                <>
                  {rest}
                  {rest ? ' ' : ''}
                  <span className="text-[#C68E4D]">{last}</span>
                </>
              );
            })()}
          </h2>

          {/* PARAGRAPHS */}
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* QUOTE */}
          {data.quote_text && (
            <div className="font-serif text-xl text-[#1A2B45] italic pt-6 border-l-4 border-[#C68E4D] pl-6 mt-6">
              {data.quote_text}
            </div>
          )}

        </div>

      </div>
    </div>
  </section>
);
}
