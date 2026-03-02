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
  const items = (data.items || data.faqs || []).filter(
    (x) => (x?.question || x?.q) && (x?.answer || x?.a)
  );

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            {title}
          </h2>

          {subtitle ? (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          ) : null}
        </div>

        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b last:border-b-0">
              <AccordionTrigger
                className="text-left text-lg font-medium py-4 hover:underline hover:bg-transparent !bg-transparent"
              >
                {item.question || item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                {item.answer || item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}