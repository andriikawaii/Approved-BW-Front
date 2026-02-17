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
    title: string;
    subtitle?: string;
    items: FaqItem[];
  };
};

export default function FAQ({ data }: Props) {
  return (
    <section id="faq" className="bg-[#F5F3EF] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-semibold text-[#1E2F4A] md:text-[44px]">{data.title}</h2>
          {data.subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#6B7280] md:text-lg">
              {data.subtitle}
            </p>
          )}
        </div>

        <Accordion type="single" collapsible className="mx-auto w-full max-w-[700px]">
          {data.items.map((item, i) => (
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
