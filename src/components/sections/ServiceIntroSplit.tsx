'use client';

type BulletPoint = {
  text: string;
};

type Props = {
  data: {
    title: string;
    content: string;
    image_main?: string | null;
    bullet_points?: BulletPoint[];
    image_secondary?: string | null;
  };
};

function normalizeParagraphs(content: string) {
  return content
    .split('\n\n')
    .map((block) => block.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);
}

export default function ServiceIntroSplit({ data }: Props) {
  const paragraphs = normalizeParagraphs(data.content || '');
  const mainImage = data.image_main || '/images/services/service-kitchen.jpg';
  const secondaryImage =
    data.image_secondary || '/images/services/living-room-real.jpeg';
  const points = data.bullet_points || [];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* LEFT IMAGE STACK */}
          <div className="relative">
            <div className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={mainImage}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-8 -right-8 w-2/3 aspect-video bg-white p-2 shadow-xl rounded-lg transform rotate-3 hidden md:block">
              <img
                src={secondaryImage}
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A2B45] mb-6">
              {data.title}
            </h2>

            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg text-gray-600 mb-6 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}

            {points.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {points.map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1A2B45]/5 flex items-center justify-center shrink-0">
                      <div className="w-3 h-3 bg-[#C68E4D] rounded-full"></div>
                    </div>
                    <span className="font-medium text-[#1A2B45]">
                      {point.text}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

        </div>
      </div>
    </section>
  );
}