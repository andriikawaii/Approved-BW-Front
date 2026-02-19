import { CalendarDays, MapPin, Sparkles } from 'lucide-react';

type ProjectDetails = {
  duration?: string;
  location?: string;
  service_type?: string;
};

type Props = {
  data: {
    image?: string | null;
    outcome?: string;
    headline?: string;
    solution?: string;
    challenge?: string;
    project_details?: ProjectDetails;
  };
};

export default function CaseStudyHighlight({ data }: Props) {
  const details = data.project_details || {};

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-semibold text-[#1E2F4A] md:text-[46px]">
            {data.headline || 'Featured Project'}
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="overflow-hidden rounded-2xl border border-[#e7decd] bg-[#1E2F4A] p-8 text-white shadow-[0_16px_34px_rgba(30,47,74,0.2)] md:p-10">
            {data.challenge ? (
              <div className="mb-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#C89B5B]">Challenge</p>
                <p className="text-[15px] leading-relaxed text-white/88">{data.challenge}</p>
              </div>
            ) : null}

            {data.solution ? (
              <div className="mb-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#C89B5B]">Solution</p>
                <p className="text-[15px] leading-relaxed text-white/88">{data.solution}</p>
              </div>
            ) : null}

            {data.outcome ? (
              <div className="rounded-xl border border-white/20 bg-white/8 p-5">
                <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#C89B5B]">
                  <Sparkles className="h-4 w-4" />
                  Outcome
                </p>
                <p className="text-[15px] leading-relaxed text-white">{data.outcome}</p>
              </div>
            ) : null}
          </div>

          <aside className="overflow-hidden rounded-2xl border border-[#e7decd] bg-[#f7f4ed] shadow-[0_12px_30px_rgba(30,47,74,0.09)]">
            {data.image ? (
              <img src={data.image} alt={data.headline || 'Featured project'} className="h-60 w-full object-cover" />
            ) : (
              <div className="relative h-60 bg-gradient-to-br from-[#445f86] to-[#263850]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_45%)]" />
              </div>
            )}

            <div className="space-y-4 p-6">
              <h3 className="text-xl font-semibold text-[#1E2F4A]">Project Details</h3>

              {details.location ? (
                <p className="inline-flex items-center gap-2 text-sm text-[#5f6f87]">
                  <MapPin className="h-4 w-4 text-[#C89B5B]" />
                  {details.location}
                </p>
              ) : null}

              {details.duration ? (
                <p className="inline-flex items-center gap-2 text-sm text-[#5f6f87]">
                  <CalendarDays className="h-4 w-4 text-[#C89B5B]" />
                  {details.duration}
                </p>
              ) : null}

              {details.service_type ? (
                <p className="rounded-lg border border-[#e2d8c5] bg-white px-3 py-2 text-sm font-medium text-[#1E2F4A]">
                  {details.service_type}
                </p>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

