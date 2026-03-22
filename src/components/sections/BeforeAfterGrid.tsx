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
    <section className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {data.subtitle && (
            <span className="text-[#C68E4D] font-bold uppercase tracking-widest text-sm mb-2 block">
              {data.subtitle}
            </span>
          )}
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A2B45]">
            {data.title}
          </h2>
        </div>

        {/* PROJECTS */}
        <div className="space-y-24">
          {data.projects.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={`${project.location}-${index}`}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                
                {/* TEXT SIDE */}
                <div className={`space-y-8 ${isReversed ? 'order-2 md:order-1' : ''}`}>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#1A2B45] mb-3">
                      Before
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#1A2B45] mb-3">
                      After
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {project.testimonial_quote || project.description}
                    </p>
                  </div>

                  {project.testimonial_quote && (
                    <blockquote className="border-l-4 border-[#C68E4D] pl-6 italic text-gray-600 my-8">
                      “{project.testimonial_quote}”
                      <footer className="text-[#1A2B45] font-bold not-italic mt-2">
                        — {project.location}
                      </footer>
                    </blockquote>
                  )}
                </div>

                {/* IMAGE SIDE */}
                <div
                  className={`relative group h-full min-h-[280px] sm:min-h-[360px] ${
                    isReversed ? 'order-1 md:order-2' : ''
                  }`}
                >
                  <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
                    
                    {/* BEFORE */}
                    <figure className="relative h-full">
                      <span className="absolute top-4 left-4 bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded z-10 tracking-wider">
                        BEFORE
                      </span>
                      <img
                        src={getBeforeImage(project, index)}
                        alt={`Before ${project.location}`}
                        className="h-full min-h-[220px] w-full rounded-lg object-cover shadow-md"
                      />
                      <figcaption className="mt-2 text-[12px] font-medium text-[#5b6780]">
                        Before: {project.location}
                      </figcaption>
                    </figure>

                    {/* AFTER */}
                    <figure className="relative h-full">
                      <span className="absolute top-4 left-4 bg-[#C68E4D] text-white text-xs font-bold px-3 py-1.5 rounded z-10 tracking-wider">
                        AFTER
                      </span>
                      <img
                        src={getAfterImage(project, index)}
                        alt={`After ${project.location}`}
                        className="h-full min-h-[220px] w-full rounded-lg object-cover shadow-md"
                      />
                      <figcaption className="mt-2 text-[12px] font-medium text-[#5b6780]">
                        After: {project.location}
                      </figcaption>
                    </figure>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
