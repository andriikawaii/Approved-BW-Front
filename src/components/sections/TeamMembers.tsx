'use client';

type Member = {
  name: string;
  position: string;
  image?: string | null;
  image_alt?: string | null;
  bio: string;
};

type Props = {
  data: {
    title: string;
    subtitle?: string;
    members: Member[];
  };
};

function fallbackMemberImage(index: number) {
  if (index === 0) {
    return '/images/hero/hero-carousel-2.jpg';
  }
  if (index === 1) {
    return '/images/founder-sprinter.png';
  }
  return '/images/hero/hero-carousel-final.png';
}

export default function TeamMembers({ data }: Props) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-[44px] font-semibold text-[#1E2F4A] md:text-[50px]">{data.title}</h2>
          {data.subtitle ? <p className="mt-3 text-base text-[#4f5f78] md:text-lg">{data.subtitle}</p> : null}
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {data.members.map((member, i) => (
            <article
              key={i}
              className="overflow-hidden rounded-lg border border-[#e6ded1] bg-white shadow-[0_12px_26px_rgba(30,47,74,0.1)]"
            >
              <img
                src={member.image || fallbackMemberImage(i)}
                alt={member.image_alt || member.name}
                className="h-72 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-[28px] font-semibold text-[#1E2F4A]">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.08em] text-[#C89B5B]">{member.position}</p>
                <p className="mt-4 text-sm leading-relaxed text-[#4f5f78]">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
