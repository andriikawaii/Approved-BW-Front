'use client';

import { Star } from 'lucide-react';

type Testimonial = {
  name: string;
  city?: string;
  text: string;
  rating?: number;
};

type Props = {
  data: {
    title: string;
    testimonials: Testimonial[];
  };
};

export default function TestimonialSliderSmall({ data }: Props) {
  return (
    <section className="bg-[#F5F3EF] py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 px-6 text-center lg:px-16">
          <h2 className="text-3xl font-bold md:text-[36px]">{data.title}</h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 px-6 lg:flex-nowrap lg:px-16">
          {data.testimonials.slice(0, 3).map((item, index) => (
            <div key={`${item.name}-${index}`} className="relative w-80 rounded-lg bg-white p-5 shadow-xl">
              <div className="absolute -top-3 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-red-500" />
              <div className="mb-3 flex gap-1 text-[#C89B5B]">
                {Array.from({ length: item.rating || 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-[#6B7280]">&ldquo;{item.text}&rdquo;</p>
              <div className="mt-4 border-t pt-3">
                <p className="text-sm font-semibold text-[#1E2F4A]">{item.name}</p>
                {item.city ? <p className="text-xs text-[#6B7280]">{item.city}</p> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
