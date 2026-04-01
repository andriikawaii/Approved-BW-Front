'use client';

import { useEffect, useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';

type ProjectItem = {
  image?: string | null;
  image_alt?: string | null;
  title: string;
  location?: string;
  description?: string;
  service_type?: string;
};

type Props = {
  data: {
    headline?: string;
    title?: string;
    projects?: ProjectItem[];
    items?: ProjectItem[];
  };
};

const PLACEHOLDER_GRADIENTS = [
  'from-[#263a5c] to-[#17253d]',
  'from-[#34547f] to-[#20314f]',
  'from-[#4a3d2f] to-[#2f241b]',
  'from-[#1f4d43] to-[#14352e]',
];

export default function ProjectsMasonryGrid({ data }: Props) {
  const [activeFilter, setActiveFilter] = useState('all');
  const title = data.headline || data.title || 'Our Work';
  const projects = data.projects || data.items || [];

  useEffect(() => {
    const onFilterChange = (event: Event) => {
      const nextValue = (event as CustomEvent<string>).detail || 'all';
      setActiveFilter(nextValue);
    };

    window.addEventListener('portfolio-filter-change', onFilterChange as EventListener);
    return () => window.removeEventListener('portfolio-filter-change', onFilterChange as EventListener);
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects;
    }
    return projects.filter((project) => (project.service_type || '').toLowerCase() === activeFilter.toLowerCase());
  }, [activeFilter, projects]);

  return (
    <section className="bg-[#f3f3f2] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-semibold text-[#1E2F4A] md:text-[46px]">{title}</h2>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
            {filteredProjects.map((project, index) => (
              <article
                key={`${project.title}-${index}`}
                className="mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-[#e8e1d3] bg-white shadow-[0_12px_26px_rgba(30,47,74,0.09)]"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.image_alt || project.title}
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className={`relative flex h-56 items-end bg-gradient-to-br ${PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length]} p-5`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.18),transparent_38%)]" />
                    <span className="relative rounded-full bg-white/14 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white">
                      {project.service_type || 'Project'}
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    {project.service_type ? (
                      <span className="rounded-full bg-[#eee7d7] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#1E2F4A]">
                        {project.service_type}
                      </span>
                    ) : null}
                    {project.location ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#f5f6f9] px-2.5 py-1 text-xs text-[#516078]">
                        <MapPin className="h-3.5 w-3.5 text-[#C89B5B]" />
                        {project.location}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-[25px] font-semibold leading-tight text-[#1E2F4A]">{project.title}</h3>
                  {project.description ? (
                    <p className="mt-3 text-sm leading-relaxed text-[#607089]">{project.description}</p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#d8cdb8] bg-white p-10 text-center text-[#607089]">
            No projects match the selected filter.
          </div>
        )}
      </div>
    </section>
  );
}

