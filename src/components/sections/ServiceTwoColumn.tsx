'use client';

import { CheckCircle2 } from 'lucide-react';

type BulletPoint = string | { text?: string | null };

type Props = {
  data: {
    section_label?: string;
    headline: string;
    description: string;
    bullet_points?: BulletPoint[];
    image?: string | null;
    image_alt?: string;
  };
};

function normalizeParagraphs(content: string) {
  return content
    .split('\n\n')
    .map((block) => block.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);
}

function normalizeBullets(points?: BulletPoint[]) {
  return (points || [])
    .map((point) => (typeof point === 'string' ? point : point?.text || ''))
    .map((text) => text.trim())
    .filter(Boolean);
}

export default function ServiceTwoColumn({ data }: Props) {
  const paragraphs = normalizeParagraphs(data.description || '');
  const bullets = normalizeBullets(data.bullet_points);
  const imageSrc = data.image || '/images/services/bathroom-remodel-new.jpg';

  return (
    <section className="bg-[#F5F3EF] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-[#e6ded1] bg-white shadow-[0_12px_24px_rgba(30,47,74,0.1)]">
            <img
              src={imageSrc}
              alt={data.image_alt || data.headline}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            {data.section_label ? (
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#C89B5B]">{data.section_label}</p>
            ) : null}

            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#1E2F4A] md:text-[36px]">
              {data.headline}
            </h2>

            <div className="mt-4 space-y-4 text-base leading-relaxed text-[#6B7280]">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {bullets.length > 0 ? (
              <ul className="mt-6 space-y-2">
                {bullets.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-[#6B7280]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C89B5B]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
