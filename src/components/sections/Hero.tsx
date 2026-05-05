import Image from 'next/image';
import Link from 'next/link';

interface Props {
  data: {
    eyebrow?: string;
    headline: string;
    highlight?: string;
    subheadline?: string;
    background_image?: string | null;
    background_video?: string | null;
    overlay?: { opacity?: number };
    cta_label?: string;
    cta_url?: string;
    cta_primary?: {
      label: string;
      url: string;
    };
    cta_secondary?: {
      label: string;
      url: string;
    };
    breadcrumbs?: { label: string; url?: string }[];
    layout?: 'left' | 'center';
    town_hub?: boolean;
  };
}

function renderHeadlineWithGold(headline: string) {
  // Match any "Town, Connecticut" or "Town Connecticut" pattern, plus "Services in Connecticut"
  const match = headline.match(/^(.*?)(\b[A-Z][a-zA-Z\s]+,?\s*Connecticut\b)(.*)$/i)
    || headline.match(/^(.*?)(Services in Connecticut)(.*)$/i);
  if (match) {
    return (
      <>
        {match[1]}<span className="text-[#C89B5B]">{match[2]}</span>{match[3]}
      </>
    );
  }
  return headline;
}

export default function Hero({ data }: Props) {
  const isTownHub = Boolean(data.town_hub);
  const backgroundImage = data.background_image || '/images/hero/hero-carousel-final.png';
  const isServicesHero = /services in connecticut/i.test(data.headline || '');
  const isOfficeHero = /\b[A-Z][a-zA-Z\s]+,?\s*Connecticut\b/i.test(data.headline || '') && !isServicesHero;
  const isCentered = isTownHub || isServicesHero || isOfficeHero || data.layout === 'center';
  const overlayOpacity = isTownHub ? 0.52 : isServicesHero ? 0.58 : data.overlay?.opacity ?? 0.62;
  const primaryCta = data.cta_primary || (
    data.cta_label && data.cta_url
      ? { label: data.cta_label, url: data.cta_url }
      : null
  );
  const isPhoneCta = data.cta_secondary?.url?.startsWith('tel:');

  return (
    <section
      className={`relative isolate overflow-hidden bg-[#1E2F4A] text-white ${isCentered ? 'py-0' : 'py-24 md:py-28'} ${
        isTownHub ? 'min-h-[60vh] md:min-h-[64vh]' : isCentered ? 'min-h-[50vh]' : ''
      }`}
    >
      {data.background_video ? (
        <video
          src={data.background_video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className={`object-cover ${isTownHub ? 'object-[center_38%]' : 'object-[center_30%]'}`}
          style={{ opacity: isTownHub ? 0.76 : 0.72 }}
        />
      )}
      <div className="absolute inset-0 bg-[#0f1c30]" style={{ opacity: isCentered ? 0.35 : overlayOpacity }} />
      <div
        className={`absolute inset-0 ${
          isCentered
            ? 'bg-[radial-gradient(ellipse_at_97%_97%,rgba(21,30,48,1)_0%,rgba(21,30,48,0.9)_8%,transparent_30%),radial-gradient(ellipse_at_3%_97%,rgba(21,30,48,0.9)_0%,transparent_25%),linear-gradient(180deg,rgba(21,30,48,0.35)_0%,rgba(21,30,48,0.2)_30%,rgba(21,30,48,0.45)_65%,rgba(21,30,48,0.92)_100%)]'
            : 'bg-gradient-to-r from-[#0f1c30]/90 via-[#0f1c30]/55 to-[#0f1c30]/35'
        }`}
      />

      <div
        className={`relative mx-auto px-6 ${
          isCentered
            ? `flex flex-col items-center justify-center text-center ${
                isTownHub ? 'min-h-[60vh] max-w-[1120px] pt-[112px] pb-16 md:min-h-[64vh] md:pt-[132px] md:pb-20' : 'min-h-[50vh] max-w-[1240px] pt-[120px] pb-12'
              }`
            : 'max-w-7xl text-left'
        }`}
      >
        {isCentered && (isOfficeHero || data.breadcrumbs) ? (
          <ol className="mb-5 flex list-none items-center justify-center gap-0 text-[13px] font-medium text-white/92">
            {data.breadcrumbs ? data.breadcrumbs.map((bc, i) => (
              <li key={i} className={i > 0 ? "before:mx-2.5 before:text-[#C89B5B] before:text-[12px] before:content-['›']" : ''}>
                {bc.url ? <Link href={bc.url} className="text-white/85 hover:text-[#C89B5B] transition-colors">{bc.label}</Link> : <span className="font-semibold text-white">{bc.label}</span>}
              </li>
            )) : isOfficeHero ? (() => {
              const townMatch = (data.headline || '').match(/in\s+([A-Za-z\s]+),?\s*Connecticut/i);
              const townName = townMatch ? townMatch[1].trim() : 'Town';
              return (
                <>
                  <li><Link href="/" className="text-white/85 hover:text-[#C89B5B] transition-colors">Home</Link></li>
                  <li className="before:mx-2.5 before:text-[#C89B5B] before:text-[12px] before:content-['›']"><Link href="/areas-we-serve/" className="text-white/85 hover:text-[#C89B5B] transition-colors">Areas We Serve</Link></li>
                  <li className="before:mx-2.5 before:text-[#C89B5B] before:text-[12px] before:content-['›']"><Link href="/new-haven-county/" className="text-white/85 hover:text-[#C89B5B] transition-colors">New Haven County</Link></li>
                  <li className="before:mx-2.5 before:text-[#C89B5B] before:text-[12px] before:content-['›']"><span className="font-semibold text-white">{townName}</span></li>
                </>
              );
            })() : null}
          </ol>
        ) : isServicesHero ? (
          <ol className="mb-5 flex list-none items-center justify-center text-[12px] font-medium text-white/90">
            <li>Home</li>
            <li className="before:px-2.5 before:text-[#C89B5B] before:content-['›']">Services</li>
          </ol>
        ) : data.eyebrow ? (
          <span className="bw-section-label mb-4 block">{data.eyebrow}</span>
        ) : null}
        <h1
          className={`${
            isCentered
              ? isTownHub
                ? 'max-w-[960px] text-[clamp(44px,4.8vw,66px)] leading-[1.03] tracking-[-0.6px]'
                : 'max-w-[980px] text-[clamp(40px,4.5vw,56px)] leading-[1.08] tracking-[-0.5px]'
              : 'max-w-4xl text-4xl leading-[1.04] md:text-[60px]'
          } font-bold !text-white`}
          style={{ fontFamily: "'Playfair Display', serif", textShadow: isCentered ? '0 2px 20px rgba(0,0,0,0.5)' : undefined }}
        >
          {isCentered ? renderHeadlineWithGold(data.headline) : (
            <>
              {data.headline}
              {data.highlight ? (
                <>
                  <br />
                  <span className="text-[#C89B5B]">{data.highlight}</span>
                </>
              ) : null}
            </>
          )}
        </h1>
        {data.subheadline ? (
          <p
            className={`${
              isCentered
                ? isTownHub
                  ? 'mx-auto mt-6 max-w-[660px] text-[18px] leading-[1.78] text-white/86 md:text-[19px]'
                  : 'mx-auto mt-4 max-w-[560px] text-[17px] leading-[1.7] text-white/82'
                : 'mt-6 max-w-[680px] text-base text-white/85 md:text-lg md:leading-relaxed'
            }`}
            style={isCentered ? { textShadow: '0 1px 8px rgba(0,0,0,0.4)' } : undefined}
          >
            {data.subheadline}
          </p>
        ) : null}
        {primaryCta || data.cta_secondary ? (
          <div className={`mt-8 flex flex-wrap gap-4 ${isCentered ? 'justify-center' : 'flex-col items-start sm:flex-row'} ${isTownHub ? 'mt-10 md:mt-11' : ''}`}>
            {isPhoneCta && data.cta_secondary ? (
              <a href={data.cta_secondary.url} className="flex min-w-[192px] flex-col items-center rounded-xl border border-white/[0.2] border-b-2 border-b-[#C89B5B] bg-[rgba(10,18,35,0.42)] px-7 py-4 text-center text-white backdrop-blur-[12px] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[rgba(10,18,35,0.62)]">
                <span className="text-[11px] uppercase tracking-[1.2px] opacity-70">New Haven County</span>
                <span className="text-lg font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>{data.cta_secondary.label}</span>
              </a>
            ) : null}
            {primaryCta ? (
              isPhoneCta ? (
                <a href={primaryCta.url} className="flex min-w-[192px] flex-col items-center rounded-xl border border-[#C89B5B] border-b-2 border-b-[#a57d48] bg-[#C89B5B] px-7 py-4 text-center text-white transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#d4a95a]">
                  <span className="text-[11px] uppercase tracking-[1.2px] opacity-90">Free Estimate</span>
                  <span className="text-lg font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>{primaryCta.label}</span>
                </a>
              ) : (
                <a href={primaryCta.url} className={`inline-flex items-center justify-center bg-[#C89B5B] text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#b98747] ${isTownHub ? 'rounded-lg px-7 py-3.5 shadow-[0_8px_24px_rgba(188,145,85,0.35)]' : 'rounded-md px-6 py-3'}`}>
                  {primaryCta.label}
                </a>
              )
            ) : null}
            {data.cta_secondary && !isPhoneCta ? (
              <a href={data.cta_secondary.url} className={`inline-flex items-center justify-center border border-white text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10 ${isTownHub ? 'rounded-lg px-7 py-3.5' : 'rounded-md px-6 py-3'}`}>
                {data.cta_secondary.label}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
