import Container from '@/src/components/ui/Container';
import Link from 'next/link';

type ProblemSectionProps = {
  data?: {
    eyebrow?: string;
    title?: string;
    highlight?: string;
    paragraphs?: string[];
    cta_label?: string;
    cta_url?: string;
  };
};

export default function ProblemSection({ data }: ProblemSectionProps) {
  return (
    <section className="w-full bg-white py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-[#C68E4D]">
            {data?.eyebrow ?? 'The Problem We Solve'}
          </span>

          {/* Title */}
          <h2 className="mt-4 font-serif text-3xl font-semibold text-[#1E2B43] md:text-5xl">
            {data?.title ?? 'Tired of Contractors Who'}{' '}
            <span className="text-[#C68E4D]">
              {data?.highlight ?? 'Disappear?'}
            </span>
          </h2>

          {/* Content */}
          <div className="mt-10 space-y-6 text-base leading-relaxed text-[#5F6F8C] md:text-lg">
            {(data?.paragraphs ?? [
              `You've heard the promises before. "We'll start Monday." "Should take two weeks." "I'll call you back."`,
              `Then Monday comes and goes. Two weeks turns into two months. And that callback? Still waiting.`,
              `You're not looking for the cheapest contractor. You're looking for one who actually does what they say. One who shows up. Communicates. Finishes the job. And stands behind their work.`,
              `That's what Built Well CT does. For over 15 years, we've served homeowners across Fairfield and New Haven Counties — not by being the loudest, but by being the most reliable.`,
              `We don't overpromise. We don't disappear. We do the work, we do it right, and we're not done until you are.`,
            ]).map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12">
            <Link
              href={data?.cta_url ?? '/how-we-work'}
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#C68E4D] transition hover:text-[#B07C3C]"
            >
              {data?.cta_label ?? 'See How We Work'}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
