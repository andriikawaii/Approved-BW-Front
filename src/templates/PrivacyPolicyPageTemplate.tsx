"use client";

import type { CMSPage } from "@/types/cms";
import { linkNode, media, section, sections } from "./template-utils";

export function PrivacyPolicyPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<any>(page, "hero");
  const blocks = sections<any>(page, "rich_text");

  return (
    <div className="bg-[#f5f1e9] text-[#1e2b43]">
      <section className="relative isolate overflow-hidden bg-[#151e30] px-5 pt-[84px] text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${media(hero?.background_image, "/portfolio/builtwell-team-client-arrival-ct.jpeg")})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,30,48,0.66)_0%,rgba(21,30,48,0.74)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[340px] max-w-[1100px] flex-col items-center justify-center pb-14 text-center">
          <ol className="mb-5 flex list-none items-center text-[12px] font-semibold text-white/92">
            <li>{linkNode("/", "Home", "transition-colors hover:text-[#bc9155]")}</li>
            <li className="before:px-2.5 before:text-[#bc9155] before:content-['›']"><span>Privacy Policy</span></li>
          </ol>
          <h1 className="text-[clamp(40px,5vw,66px)] font-bold tracking-[-0.03em] text-white">{hero?.headline || "Privacy Policy"}</h1>
          {hero?.subheadline ? <p className="mt-5 max-w-[760px] text-[16px] leading-[1.7] text-white/88">{hero.subheadline}</p> : null}
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[860px]">
          {blocks[0]?.legal_updated ? <p className="mb-8 text-[14px] font-semibold uppercase tracking-[0.16em] text-[#bc9155]">{blocks[0].legal_updated}</p> : null}
          <div className="space-y-10">
            {blocks.map((block: any, index: number) => (
              <article key={`${block.title}-${index}`}>
                <h2 className="text-[32px] font-bold tracking-[-0.02em] text-[#1e2b43]">{block.title}</h2>
                {(block.paragraphs || []).map((paragraph: string, pIndex: number) => <p key={pIndex} className="mt-4 text-[15px] leading-[1.92] text-[#4f5b72]">{paragraph.includes('info@buildwellct.com') && !paragraph.startsWith('Email:') ? <>To exercise any of these rights, please contact us by email at <a href="mailto:info@buildwellct.com" className="font-semibold text-[#bc9155] hover:underline">info@buildwellct.com</a>. We will respond to your request within a reasonable timeframe in accordance with applicable law.</> : paragraph.startsWith('Email:') ? <>Email: <a href="mailto:info@buildwellct.com" className="font-semibold text-[#bc9155] hover:underline">info@buildwellct.com</a></> : paragraph.startsWith('Phone:') ? <>Phone: <a href="tel:2034669148" className="font-semibold text-[#bc9155] hover:underline">(203) 466-9148</a></> : paragraph.includes('buildwellct.com/contact/') ? <>You may also reach us through the website contact form at <a href="https://buildwellct.com/contact/" className="font-semibold text-[#bc9155] hover:underline">buildwellct.com/contact/</a>.</> : paragraph}</p>)}
                {(block.bullets || []).length ? <ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-[1.92] text-[#4f5b72]">{(block.bullets || []).map((bullet: string, bulletIndex: number) => <li key={bulletIndex}>{bullet.includes('info@buildwellct.com') ? <>Sending marketing communications about our services, promotions, or updates. You may opt out of marketing communications at any time by contacting us at <a href="mailto:info@buildwellct.com" className="font-semibold text-[#bc9155] hover:underline">info@buildwellct.com</a> or by following the unsubscribe instructions included in any marketing message.</> : bullet}</li>)}</ul> : null}
                {(block.subsections || []).map((subsection: any, subIndex: number) => <div key={`${subsection.title}-${subIndex}`} className="mt-6"><h3 className="text-[22px] font-bold text-[#1e2b43]">{subsection.title}</h3>{(subsection.paragraphs || []).map((paragraph: string, pIndex: number) => <p key={pIndex} className="mt-3 text-[15px] leading-[1.92] text-[#4f5b72]">{paragraph}</p>)}{(subsection.bullets || []).length ? <ul className="mt-3 list-disc space-y-2 pl-6 text-[15px] leading-[1.92] text-[#4f5b72]">{(subsection.bullets || []).map((bullet: string, bulletIndex: number) => <li key={bulletIndex}>{bullet}</li>)}</ul> : null}</div>)}
                {(block.links || []).length ? <div className="mt-4">{(block.links || []).map((item: any, linkIndex: number) => <a key={linkIndex} href={item.url} target="_blank" rel="noreferrer" className="font-semibold text-[#bc9155] hover:underline">{item.label}</a>)}</div> : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
