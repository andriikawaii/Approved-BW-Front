'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/src/components/ui/Accordion';
import { faqItems } from '@/src/data/faq';

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-[#F9FAFB]">
      <div className="mx-auto max-w-4xl px-6">
        {/* HEADER */}
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A2B45]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Answers to common questions about home remodeling and our process.
          </p>
        </div>

        {/* ACCORDION */}
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, i) => (
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
