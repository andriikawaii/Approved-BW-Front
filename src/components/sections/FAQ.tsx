'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/src/components/ui/Accordion';

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
  const items = data.items || data.faqs || [];

  return (
    <section id="faq" className="bg-[#F5F3EF] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-semibold text-[#1E2F4A] md:text-[44px]">{title}</h2>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#6B7280] md:text-lg">
              {subtitle}
            </p>
          )}
        </div>

        <Accordion type="single" collapsible className="mx-auto w-full max-w-[700px]">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{item.question || item.q}</AccordionTrigger>
              <AccordionContent>{item.answer || item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
