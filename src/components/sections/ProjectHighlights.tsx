'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  image?: string | null;
  url: string;
  tag?: string;
};

type Props = {
  data: {
    title: string;
    subtitle?: string;
    cta?: {
      label: string;
      url: string;
    };
    items: Project[];
  };
};

export default function Portfolio({ data }: Props) {
  return (
    <section id="work" className="bg-[#F5F3EF] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <span className="mb-4 block font-mono text-sm uppercase tracking-widest text-[#C89B5B]">
            Recent Projects
          </span>

          <h2 className="text-4xl font-semibold uppercase text-[#1E2F4A] md:text-[44px]">
            {data.title}
          </h2>

          {data.subtitle ? (
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#6B7280] md:text-lg">
              {data.subtitle}
            </p>
          ) : null}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {data.items.map((project, i) => (
            <Link
              key={i}
              href={project.url}
              className="group overflow-hidden rounded-xl border border-[#ece6d9] bg-white shadow-[0_8px_24px_rgba(30,47,74,0.08)] transition-shadow hover:shadow-[0_14px_34px_rgba(30,47,74,0.12)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1E2F4A]/10">
                {project.image ? (
                  <>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-[#1E2F4A]/0 transition-colors duration-300 group-hover:bg-[#1E2F4A]/15" />
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-[#6B7280]">
                    Project Image
                  </div>
                )}
              </div>

              <div className="p-6">
                {project.tag ? (
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-full bg-[#efe8da] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#1E2F4A]">
                      {project.tag}
                    </span>
                  </div>
                ) : (
                  <div className="mb-3" />
                )}

                <h3 className="text-[28px] font-semibold text-[#1E2F4A] transition-colors duration-300 group-hover:text-[#C89B5B]">
                  {project.title}
                </h3>

                <p className="mt-3 text-[15px] leading-relaxed text-[#6B7280]">
                  {project.description}
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#C89B5B]">
                  View Project
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {data.cta ? (
          <div className="mt-10 text-center">
            <Link
              href={data.cta.url}
              className="inline-flex h-[60px] min-w-[280px] items-center justify-center rounded-md bg-[#C89B5B] px-8 py-4 text-base font-bold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-[#b98747]"
            >
              {data.cta.label}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}