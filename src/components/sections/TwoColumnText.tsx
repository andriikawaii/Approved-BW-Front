'use client';

type Props = {
  data: {
    title: string;
    left_content: string;
    right_content: string;
  };
};

function isBulletLine(line: string) {
  const trimmed = line.trim();
  return /^(\u2022|\*|-)\s*/.test(trimmed);
}

function normalizeBulletLine(line: string) {
  return line.replace(/^(\s*(\u2022|\*|-)\s*)/, '').trim();
}

function renderContent(text: string) {
  const blocks = text.split('\n\n').filter(Boolean);
  return blocks.map((block, i) => {
    const lines = block.split('\n').filter(Boolean);
    const hasBullets = lines.some(isBulletLine);

    if (hasBullets) {
      return (
        <ul key={i} className="space-y-2 pl-5 text-[15px] leading-relaxed text-[#6B7280] list-disc marker:text-[#C89B5B]">
          {lines.map((line, j) => (
            <li key={j}>{normalizeBulletLine(line)}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i} className="text-[15px] leading-[1.75] text-[#6B7280] md:text-base">
        {block}
      </p>
    );
  });
}

export default function TwoColumnText({ data }: Props) {
  const { title, left_content, right_content } = data;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-[44px] font-semibold text-[#1E2F4A] md:text-[50px]">{title}</h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <div className="space-y-4">{renderContent(left_content)}</div>
          <div className="space-y-4">{renderContent(right_content)}</div>
        </div>
      </div>
    </section>
  );
}
