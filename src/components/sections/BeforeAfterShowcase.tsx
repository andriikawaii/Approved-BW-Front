'use client';

type Props = {
  data: {
    section_label?: string;
    headline: string;
    description?: string;
    before_image?: string | null;
    before_image_alt?: string | null;
    after_image?: string | null;
    after_image_alt?: string | null;
  };
};

export default function BeforeAfterShowcase({ data }: Props) {
  const beforeImage = data.before_image || '/images/services/attic-empty.jpg';
  const afterImage = data.after_image || '/images/services/bathroom-remodel-new.jpg';

  return (
    <section className="bg-[#F5F3EF] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          {data.section_label ? (
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#C89B5B]">{data.section_label}</p>
          ) : null}
          <h2 className="mt-3 text-3xl font-bold text-[#1E2F4A] md:text-[36px]">{data.headline}</h2>
          {data.description ? (
            <p className="mt-4 text-base leading-relaxed text-[#6B7280]">{data.description}</p>
          ) : null}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <article>
            <p className="text-xl font-bold text-[#1E2F4A]">Before</p>
            <img
              src={beforeImage}
              alt={data.before_image_alt || "Before bathroom remodel"}
              className="mt-3 w-full rounded-lg border border-[#e6ded1] object-cover shadow-md"
            />
            <p className="mt-2 text-sm text-[#5c677d]">Before condition</p>
          </article>

          <article>
            <p className="text-xl font-bold text-[#1E2F4A]">After</p>
            <img
              src={afterImage}
              alt={data.after_image_alt || "After bathroom remodel"}
              className="mt-3 w-full rounded-lg border border-[#e6ded1] object-cover shadow-md"
            />
            <p className="mt-2 text-sm text-[#5c677d]">Completed result</p>
          </article>
        </div>
      </div>
    </section>
  );
}
