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
  const secondaryImage = data.image_secondary || '/images/services/living-room-real.jpeg';
  const points = data.bullet_points || [];

  return (
    <section className="bg-[#F5F3EF] pt-24 pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 px-6 lg:grid-cols-2 lg:px-16">
          <div className="relative space-y-4 pb-20 lg:pb-24">
            <img src={mainImage} alt={data.title} className="w-full rounded-xl shadow-lg" />
            <div className="absolute bottom-0 left-0 w-1/2">
              <img src={secondaryImage} alt="" className="w-full rounded-xl shadow-md" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold md:text-[36px]">{data.title}</h2>

            <div className="mt-4 space-y-4 text-base text-[#6B7280]">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {points.length > 0 ? (
              <ul className="mt-6 list-none space-y-2 text-sm text-[#6B7280]">
                {points.map((point, index) => (
                  <li key={index}>{point.text}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
