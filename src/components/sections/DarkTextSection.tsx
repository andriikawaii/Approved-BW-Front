'use client';

type Props = {
  data: {
    eyebrow?: string;
    title: string;
    content: string;
  };
};

export default function DarkTextSection({ data }: Props) {
  const { eyebrow, title, content } = data;
  const paragraphs = content.split('\n\n').filter(Boolean);

  return (
    <section className="bg-[#1E2F4A] py-24 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        {eyebrow ? (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.1em] text-[#C89B5B]">{eyebrow}</p>
        ) : null}
        <h2 className="text-[34px] font-semibold text-white md:text-[40px]">{title}</h2>
        <div className="mt-6 space-y-5 text-[15px] leading-[1.8] text-white/80 md:text-base">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
