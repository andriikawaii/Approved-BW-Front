import { ShieldCheck, Hammer, Clock, CircleCheck } from 'lucide-react';

type Feature = {
  title: string;
  description: string;
};

type Props = {
  data: {
    eyebrow?: string;
    title?: string;
    headline?: string;

    left_paragraph?: string;

    left_features?: Feature[];
    left_column?: Feature[];

    right_title?: string;

    right_bullets?: Array<string | null | undefined>;
    right_column?: Array<string | null | undefined>;

    closing_quote?: string;
  };
};

function renderTitleWithGold(title: string) {
  const needle = 'Solid Warranty';
  const idx = title.indexOf(needle);
  if (idx === -1) return <span className="!text-white">{title}</span>;

  return (
    <span className="!text-white">
      {title.slice(0, idx)}
      <span className="text-[#C68E4D]">{needle}</span>
      {title.slice(idx + needle.length)}
    </span>
  );
}

export default function FeatureListTwoColumn({ data }: Props) {
  const title = (data.title || data.headline || '').trim();
  const leftParagraph = (data.left_paragraph || '').trim();
  const leftFeatures = (data.left_features || data.left_column || []).filter(Boolean);

  const rightTitle = (data.right_title || "What's Included").trim();

  // ✅ garantuj da dobiješ SVE stavke i da nema null/undefined
  const rightBullets = (data.right_bullets || data.right_column || [])
    .map((x) => (typeof x === 'string' ? x.trim() : ''))
    .filter(Boolean);

  const closingQuote = (data.closing_quote || '').trim();

  return (
    <section className="relative overflow-hidden bg-[#1A2B45] py-20 text-white">
      {/* dotted background */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgb(198, 142, 77) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* wrapper */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* LEFT */}
          <div>
            {data.eyebrow ? (
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C68E4D]/30 bg-[#C68E4D]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#C68E4D]">
                <ShieldCheck className="h-4 w-4" />
                <span>{data.eyebrow}</span>
              </div>
            ) : null}

            <h2 className="mb-6 font-serif text-4xl font-bold leading-tight md:text-5xl !text-white">
              {renderTitleWithGold(title)}
            </h2>

            {leftParagraph ? (
              <p className="mb-8 text-lg leading-relaxed text-gray-300">
                {leftParagraph}
              </p>
            ) : null}

            <div className="space-y-4">
              {leftFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C68E4D]/20">
                    {i === 0 ? (
                      <Hammer className="h-5 w-5 text-[#C68E4D]" />
                    ) : (
                      <Clock className="h-5 w-5 text-[#C68E4D]" />
                    )}
                  </div>

                  <div>
                    {/* ✅ OBAVEZNO belo */}
                    <h4 className="mb-1 font-serif text-xl font-bold leading-snug !text-white">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
            {/* ✅ OBAVEZNO belo */}
            <h3 className="mb-6 text-center font-serif text-2xl font-bold !text-white">
              {rightTitle}
            </h3>

            <ul className="flex-grow space-y-5">
              {rightBullets.map((bullet, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-200">
                  <CircleCheck className="h-5 w-5 shrink-0 text-[#C68E4D]" />
                  <span className="font-medium">{bullet}</span>
                </li>
              ))}
            </ul>

            {closingQuote ? (
              <div className="mt-8 border-t border-white/10 pt-8 text-center">
                <p className="text-sm italic text-gray-400">{closingQuote}</p>
              </div>
            ) : null}
          </div>
        </div>

        {/* quick debug (obriši posle): da vidiš da li stiže 7 */}
        {/* <div className="mt-4 text-xs text-white/60">bullets: {rightBullets.length}</div> */}
      </div>
    </section>
  );
}