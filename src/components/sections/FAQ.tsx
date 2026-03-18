'use client';

import { useId } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/src/components/ui/Accordion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type FaqItem = {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
};

type Props = {
  data: {
    title?: string;
    headline?: string;
    subtitle?: string;
    subheadline?: string;
    items?: FaqItem[];
    faqs?: FaqItem[];
  };
};

export default function FAQ({ data }: Props) {
  const title = data.title || data.headline || 'Frequently Asked Questions';
  const subtitle = data.subtitle || data.subheadline;
  const items = (data.items || data.faqs || []).filter(
    (x) => (x?.question || x?.q) && (x?.answer || x?.a)
  );
  const baseId = useId();

  return (
    <section id="faq" className="bg-[#f8f5ee] py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center md:mb-14">
          <span className="bw-section-label mb-3 block">Help Center</span>
          <h2 className="text-3xl font-semibold text-[#1E2F4A] md:text-4xl">
            {title}
          </h2>

          {subtitle ? (
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#5e6f86] md:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div suppressHydrationWarning>
          <Accordion type="single" collapsible className="w-full rounded-2xl border border-[#e6ddcc] bg-white p-2 shadow-[0_10px_26px_rgba(30,47,74,0.07)]">
            {items.map((item, i) => (
              <AccordionItem key={`${baseId}-${i}`} value={`faq-${i}`} className="border-b border-[#eee4d3] px-2 last:border-b-0">
                <AccordionTrigger
                  className="bg-transparent py-5 text-left text-base font-semibold text-[#1E2F4A] hover:bg-transparent hover:no-underline md:text-lg"
                >
                  {item.question || item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-[#5e6f86] md:text-base">
                  <div className="prose prose-sm max-w-none prose-p:my-2 prose-strong:text-[#1E2F4A] prose-a:text-[#C89B5B] prose-a:no-underline hover:prose-a:underline">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {(item.answer || item.a || '').trim()}
                    </ReactMarkdown>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
