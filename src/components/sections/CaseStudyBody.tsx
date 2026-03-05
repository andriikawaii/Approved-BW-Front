import type { ReactNode } from 'react';

type CaseStudyBlock = {
  heading?: string;
  content?: string;
};

type Props = {
  data: {
    blocks?: CaseStudyBlock[];
  };
};

function isMarkdownTable(paragraph: string): boolean {
  const lines = paragraph
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.length >= 2 && lines.every((line) => line.startsWith('|') && line.endsWith('|'));
}

function parseMarkdownTable(paragraph: string): { headers: string[]; rows: string[][] } | null {
  const lines = paragraph
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return null;
  }

  const rows = lines
    .filter((line, index) => !(index === 1 && /^[|\s:-]+$/.test(line)))
    .map((line) =>
      line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim()),
    )
    .filter((row) => row.length > 0);

  if (rows.length < 1) {
    return null;
  }

  return {
    headers: rows[0],
    rows: rows.slice(1),
  };
}

function isBulletList(paragraph: string): boolean {
  const lines = paragraph
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.length > 0 && lines.every((line) => line.startsWith('- '));
}

function renderParagraph(paragraph: string, key: string): ReactNode {
  if (isMarkdownTable(paragraph)) {
    const table = parseMarkdownTable(paragraph);
    if (!table) {
      return null;
    }

    return (
      <div key={key} className="overflow-x-auto rounded-xl border border-[#e6ddcc] bg-[#fffefb]">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-[#f6f1e7]">
            <tr>
              {table.headers.map((header, index) => (
                <th key={`${key}-header-${index}`} className="border-b border-[#e6ddcc] px-4 py-3 font-semibold text-[#1E2F4A]">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={`${key}-row-${rowIndex}`} className="even:bg-[#fbf8f2]">
                {row.map((cell, cellIndex) => (
                  <td key={`${key}-cell-${rowIndex}-${cellIndex}`} className="border-b border-[#eee4d4] px-4 py-3 text-[#4b5d78]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (isBulletList(paragraph)) {
    const items = paragraph
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.replace(/^- /, '').trim());

    return (
      <ul key={key} className="space-y-3 pl-5 text-[#4b5d78]">
        {items.map((item, index) => (
          <li key={`${key}-item-${index}`} className="list-disc leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p key={key} className="leading-relaxed text-[#4b5d78]">
      {paragraph}
    </p>
  );
}

export default function CaseStudyBody({ data }: Props) {
  const blocks = (data.blocks || []).filter((block) => block.heading || block.content);
  if (blocks.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-14 md:py-16">
      <div className="mx-auto max-w-5xl space-y-10 px-6">
        {blocks.map((block, blockIndex) => {
          const paragraphs = (block.content || '')
            .split(/\n{2,}/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean);

          return (
            <article key={`${block.heading || 'block'}-${blockIndex}`} className="rounded-2xl border border-[#e8decd] bg-[#fcfaf6] p-6 md:p-8">
              {block.heading ? (
                <h2 className="text-2xl font-semibold text-[#1E2F4A] md:text-3xl">{block.heading}</h2>
              ) : null}

              <div className="mt-5 space-y-5 text-[15px] md:text-base">
                {paragraphs.map((paragraph, paragraphIndex) =>
                  renderParagraph(paragraph, `${blockIndex}-${paragraphIndex}`),
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
