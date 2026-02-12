import Container from '@/src/components/ui/Container';
import Link from 'next/link';

type Props = {
  data: {
    eyebrow: string;
    title: string;
    highlight: string;
    paragraphs: string[];
    cta_label: string;
    cta_url: string;
  };
};

export default function ProblemSection({ data }: Props) {
  return (
    <section className="w-full bg-white py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-[#C68E4D]">
            {data.eyebrow}
          </span>

          <h2 className="mt-4 font-serif text-3xl font-semibold text-[#1E2B43] md:text-5xl">
            {data.title}{' '}
            <span className="text-[#C68E4D]">{data.highlight}</span>
          </h2>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-[#5F6F8C] md:text-lg">
            {data.paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href={data.cta_url}
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#C68E4D] transition hover:text-[#B07C3C]"
            >
              {data.cta_label}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
