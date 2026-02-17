'use client';

import { useState } from 'react';

type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  data: {
    title: string;
    items: FaqItem[];
  };
};

export default function ServiceFaqAccordion({ data }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#F5F3EF] py-20">
      <div className="mx-auto max-w-7xl">
        <div className="px-6 text-center lg:px-16">
          <h2 className="text-3xl font-bold md:text-[36px]">{data.title}</h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl px-6 lg:px-0">
          {data.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={`${item.question}-${index}`} className="border-b">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between py-4 text-left"
                >
                  <span className="font-semibold text-[#1E2F4A]">{item.question}</span>
                  <span className="text-lg text-[#1E2F4A]">{isOpen ? '-' : '+'}</span>
                </button>

                {isOpen ? (
                  <p className="pb-4 text-sm leading-relaxed text-[#6B7280]">{item.answer}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
