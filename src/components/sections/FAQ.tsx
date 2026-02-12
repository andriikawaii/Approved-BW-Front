'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/src/components/ui/Accordion';

type FaqItem = {
  q: string;
  a: string;
};

type Props = {
  data: {
    title: string;
    items: FaqItem[];
  };
};

export default function FAQ({ data }: Props) {
  return (
    <section id="faq" className="py-24 bg-[#F9FAFB]">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A2B45]">
            {data.title}
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {data.items.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
