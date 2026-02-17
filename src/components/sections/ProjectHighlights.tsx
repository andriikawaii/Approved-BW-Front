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

export default function ProjectHighlights({ data }: Props) {
  return (
    <section className="bg-[#F5F3EF] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-semibold uppercase text-[#1E2F4A] md:text-[44px]">{data.title}</h2>
          {data.subtitle ? <p className="mx-auto mt-4 max-w-2xl text-base text-[#6B7280] md:text-lg">{data.subtitle}</p> : null}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {data.items.map((project, i) => (
            <Link
              key={i}
              href={project.url}
              className="group overflow-hidden rounded-xl border border-[#ece6d9] bg-white shadow-[0_8px_24px_rgba(30,47,74,0.08)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1E2F4A]/10">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-[#6B7280]">Project Image</div>
                )}
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-center gap-3">
                  {project.tag ? (
                    <span className="rounded-full bg-[#efe8da] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#1E2F4A]">
                      {project.tag}
                    </span>
                  ) : null}
                </div>

                <h3 className="text-[28px] font-semibold text-[#1E2F4A] transition-colors duration-300 group-hover:text-[#C89B5B]">
                  {project.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#6B7280]">{project.description}</p>

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
              className="inline-flex items-center justify-center rounded-md bg-[#C89B5B] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#b98747]"
            >
              {data.cta.label}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
