'use client';

type Project = {
  location: string;
  description: string;
  before_image?: string | null;
  after_image?: string | null;
  testimonial_quote?: string | null;
};

type Props = {
  data: {
    title: string;
    subtitle?: string;
    projects: Project[];
  };
};

const BEFORE_FALLBACKS = [
  '/images/services/interior-carpentry-final.jpeg',
  '/images/services/attic-empty.jpg',
  '/images/services/hero-carousel-1.jpg',
];

const AFTER_FALLBACKS = [
  '/images/services/service-kitchen.jpg',
  '/images/services/remodeling-design.png',
  '/images/services/bathroom-remodel-new.jpg',
];

function getBeforeImage(project: Project, index: number) {
  return project.before_image || BEFORE_FALLBACKS[index % BEFORE_FALLBACKS.length];
}

function getAfterImage(project: Project, index: number) {
  return project.after_image || AFTER_FALLBACKS[index % AFTER_FALLBACKS.length];
}

export default function BeforeAfterGrid({ data }: Props) {
  return (
    <section className="bg-[#F5F3EF] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-[36px]">{data.title}</h2>
          {data.subtitle ? <p className="mt-4 text-[18px] text-[#6B7280]">{data.subtitle}</p> : null}
        </div>

        <div className="mt-12 space-y-12">
          {data.projects.map((project, index) => (
            <div key={`${project.location}-${index}`} className="grid gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <p className="text-xl font-bold">{`Before ${project.location ? `- ${project.location}` : ''}`}</p>
                  <img src={getBeforeImage(project, index)} alt={`Before ${project.location}`} className="mt-3 w-full rounded-lg shadow-md" />
                  <p className="mt-2 text-sm text-[#6B7280]">{project.description}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xl font-bold">{`After ${project.location ? `- ${project.location}` : ''}`}</p>
                  <img src={getAfterImage(project, index)} alt={`After ${project.location}`} className="mt-3 w-full rounded-lg shadow-md" />
                  <p className="mt-2 text-sm text-[#6B7280]">
                    {project.testimonial_quote || project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
