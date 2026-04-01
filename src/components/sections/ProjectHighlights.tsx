'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  image?: string | null;
  image_alt?: string | null;
  url?: string;
  tag?: string;
  cta_label?: string;
};

type Props = {
  data: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    highlight_text?: string;
    layout?: 'grid' | 'alternating';
    cta?: {
      label: string;
      url: string;
    };
    items: Project[];
  };
};

function renderHighlightedTitle(title: string, highlight?: string) {
  if (!highlight || !title.includes(highlight)) {
    return title;
  }

  const parts = title.split(highlight);

  return (
    <>
      {parts[0]}
      <span className="text-[#C89B5B]">{highlight}</span>
      {parts[1]}
    </>
  );
}

export default function Portfolio({ data }: Props) {
  if (data.layout === 'alternating') {
    return (
      <section className="bg-[#f7f2e8] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
            {data.eyebrow ? (
              <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#BC9155]">
                <span className="h-px w-6 bg-[#BC9155]" />
                {data.eyebrow}
              </span>
            ) : null}
            <h2 className="font-serif text-[clamp(34px,4vw,52px)] font-bold leading-[1.08] tracking-[-0.025em] text-[#1E2F4A]">
              {renderHighlightedTitle(data.title, data.highlight_text)}
            </h2>
            {data.subtitle ? (
              <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.75] text-[#5C677D] md:text-[17px]">
                {data.subtitle}
              </p>
            ) : null}
          </div>

          <div className="space-y-8 md:space-y-12">
            {data.items.map((project, i) => {
              const href = project.url || '#';
              const imageOnRight = i % 2 === 1;
              return (
                <article
                  key={i}
                  className="overflow-hidden rounded-[16px] border border-[#e3d8c4] bg-white shadow-[0_12px_30px_rgba(30,43,67,0.09)]"
                >
                  <div className={`grid gap-0 lg:grid-cols-2 ${imageOnRight ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                    <Link href={href} className="block h-full">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.image_alt || project.title}
                          className="h-[300px] w-full object-cover transition-transform duration-500 hover:scale-[1.02] lg:h-full"
                        />
                      ) : (
                        <div className="flex h-[300px] w-full items-center justify-center bg-[#EDE7DB] text-sm text-[#6B7280] lg:h-full">
                          Image
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-col justify-center px-7 py-8 md:px-10 md:py-11">
                      {project.tag ? (
                        <span className="mb-3 inline-flex w-fit rounded-full border border-[#eadbc0] bg-[#fbf7ef] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a7340]">
                          {project.tag}
                        </span>
                      ) : null}
                      <h3 className="text-[29px] font-semibold leading-[1.15] text-[#1E2F4A] md:text-[34px]">{project.title}</h3>
                      <p className="mt-4 text-[15px] leading-[1.8] text-[#5C677D] md:text-[16px]">{project.description}</p>
                      <div className="mt-7">
                        <Link
                          href={href}
                          className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#BC9155] transition-all hover:gap-3"
                        >
                          <span>{project.cta_label || 'View details'}</span>
                          <ArrowRight className="h-[14px] w-[14px]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {data.cta ? (
            <div className="mt-12 text-center">
              <Link
                href={data.cta.url}
                className="inline-flex min-h-[54px] items-center justify-center rounded-[8px] bg-[#C89B5B] px-8 py-3 text-[14px] font-semibold uppercase tracking-[0.08em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#B98747]"
              >
                {data.cta.label}
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F5F1E9] py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          {data.eyebrow ? (
            <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#BC9155]">
              <span className="h-px w-6 bg-[#BC9155]" />
              {data.eyebrow}
            </span>
          ) : null}

          <h2 className="font-serif text-[clamp(38px,4vw,62px)] font-bold leading-[1.05] tracking-[-0.03em] text-[#1E2F4A]">
            {renderHighlightedTitle(
              data.title,
              data.highlight_text ||
                (data.title.includes('Need') ? 'Need' : undefined)
            )}
          </h2>

          {data.subtitle ? (
            <p className="mx-auto mt-5 max-w-[760px] text-[16px] leading-[1.7] text-[#5C677D] md:text-[17px]">
              {data.subtitle}
            </p>
          ) : null}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {data.items.map((project, i) => {
            const href = project.url || '#';

            return (
              <article
                key={i}
                className="overflow-hidden rounded-[10px] border border-[#E7E0D4] bg-white shadow-[0_8px_24px_rgba(30,43,67,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(30,43,67,0.10)]"
              >
                <Link href={href} className="block">
                  <div className="relative overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.image_alt || project.title}
                        className="h-[220px] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-[220px] w-full items-center justify-center bg-[#EDE7DB] text-sm text-[#6B7280]">
                        Image
                      </div>
                    )}
                  </div>
                </Link>

                <div className="flex min-h-[250px] flex-col px-7 py-8">
                  <h3 className="mb-4 text-[22px] font-bold leading-[1.15] text-[#1E2F4A]">
                    <Link href={href} className="transition-colors hover:text-[#BC9155]">
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-[14px] leading-[1.85] text-[#5C677D]">
                    {project.description}
                  </p>

                  <div className="mt-8">
                    <Link
                      href={href}
                      className="mt-6 inline-flex items-center gap-[6px] text-[14px] font-semibold text-[#BC9155] transition-all hover:gap-[10px]"
                    >
                      <span>{project.cta_label || 'Learn More'}</span>
                      <ArrowRight className="h-[14px] w-[14px]" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {data.cta ? (
          <div className="mt-12 text-center">
            <Link
              href={data.cta.url}
              className="inline-flex min-h-[54px] items-center justify-center rounded-[8px] bg-[#C89B5B] px-8 py-3 text-[14px] font-semibold uppercase tracking-[0.08em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#B98747]"
            >
              {data.cta.label}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
