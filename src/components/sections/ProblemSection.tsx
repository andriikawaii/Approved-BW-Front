import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '@/src/components/ui/Container';

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
  const heading = (data.title || '').trim();
  const highlight = (data.highlight || '').trim();

  return (
    <section className="w-full bg-[#F5F3EF] py-24 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="block text-xs font-bold uppercase tracking-[0.1em] text-[#C89B5B]">
            {data.eyebrow}
          </span>

          <h2 className="mt-6 text-[40px] font-semibold uppercase leading-[1.04] text-[#1E2F4A] md:text-[44px]">
            {heading}
            {highlight ? (
              <>
                <br />
                <span className="text-[#C89B5B]">{highlight}</span>
              </>
            ) : null}
          </h2>

          <div className="mx-auto mt-8 max-w-[700px] space-y-5 text-base leading-[1.8] text-[#6B7280] md:text-lg">
            {data.paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href={data.cta_url}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#C89B5B] transition duration-300 hover:underline"
            >
              {data.cta_label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
