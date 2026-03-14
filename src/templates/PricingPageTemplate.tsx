"use client";

import type { CMSPage } from "@/types/cms";
import { AreasSection, FinancingStrip, HeroTrustBar, LeadFormSection, cls, label, linkNode, media, parts, section, sections } from "./template-utils";

export function PricingPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<any>(page, "hero");
  const trust = sections<any>(page, "trust_bar")[0];
  const rich = sections<any>(page, "rich_text");
  const intro = rich[0];
  const factors = rich[1];
  const local = rich[2];
  const insurance = rich[3];
  const areas = section<any>(page, "areas_served");
  const logos = section<any>(page, "logo_strip");
  const lead = section<any>(page, "lead_form");
  const pricing = section<any>(page, "services_grid");
  const financing = rich.find((item) => item.style_variant === "financing_strip");
  const heroParts = parts(hero?.headline, "Connecticut");

  return (
    <div className="bg-[#f5f1e9] text-[#1e2b43]">
      <section className="relative isolate overflow-hidden bg-[#151e30] px-5 pt-[84px] text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${media(hero?.background_image, "/services/kitchen-remodeling-ct.jpg")})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,30,48,0.48)_0%,rgba(21,30,48,0.34)_28%,rgba(21,30,48,0.72)_72%,rgba(21,30,48,0.94)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-[1240px] flex-col items-center justify-center pb-14 text-center">
          <ol className="mb-5 flex list-none items-center text-[12px] font-semibold text-white/92">
            <li>{linkNode("/", "Home", "transition-colors hover:text-[#bc9155]")}</li>
            <li className="before:px-2.5 before:text-[#bc9155] before:content-['›']"><span>Pricing</span></li>
          </ol>
          <h1 className="max-w-[900px] text-[clamp(40px,5vw,70px)] font-bold leading-[0.98] tracking-[-0.03em] text-white">{heroParts.before}{heroParts.accent ? <span className="text-[#bc9155]">{heroParts.accent}</span> : null}{heroParts.after}</h1>
          {hero?.subheadline ? <p className="mt-6 max-w-[760px] text-[16px] leading-[1.65] text-white/90">{hero.subheadline}</p> : null}
          <div className="mt-8 flex flex-wrap items-stretch justify-center gap-4">
            {(hero?.badges || []).map((badge: any, index: number) => {
              const isPrimary = !!badge.is_primary;
              return <div key={`${badge.label || "badge"}-${index}`}>{linkNode(badge.url || "#", <div className={cls("min-w-[184px] rounded-[8px] border px-6 py-4 text-left shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition-all hover:-translate-y-0.5", isPrimary ? "border-[#bc9155] bg-[#bc9155] text-white" : "border-white/12 bg-[#273148de] text-white")}><div className={cls("text-[11px] font-semibold uppercase tracking-[0.16em]", isPrimary ? "text-white/84" : "text-white/68")}>{badge.label}</div>{badge.value ? <div className="mt-1.5 text-[17px] font-bold">{badge.value}</div> : null}</div>)}</div>;
            })}
          </div>
        </div>
      </section>

      <HeroTrustBar items={trust?.items} />

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[760px] text-center">
          {label(intro?.eyebrow)}
          <h2 className="text-[clamp(34px,3.8vw,50px)] font-bold tracking-[-0.02em]">{intro?.title}</h2>
          {(intro?.content || "").split("\n\n").filter(Boolean).map((paragraph: string, index: number) => <p key={index} className="mt-4 text-[15px] leading-[1.85] text-[#5c677d]">{paragraph}</p>)}
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center">
            {label(pricing?.eyebrow || "Pricing")}
            <h2 className="text-[clamp(34px,3.8vw,50px)] font-bold tracking-[-0.02em]">{pricing?.title}</h2>
            {pricing?.subtitle ? <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.8] text-[#5c677d]">{pricing.subtitle}</p> : null}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {(pricing?.items || []).map((item: any, index: number) => (
              <article key={`${item.title || "pricing"}-${index}`} className="rounded-[14px] border border-[#e4dac9] bg-white p-7 shadow-[0_18px_34px_rgba(30,43,67,0.06)]">
                <h3 className="text-[26px] font-bold">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.75] text-[#5c677d]">{item.summary}</p>
                <div className="mt-6 space-y-3">
                  {(item.tiers || []).map((tier: any, tierIndex: number) => <div key={`${item.title}-tier-${tierIndex}`} className="flex items-center justify-between rounded-[8px] border border-[#efe6d7] bg-[#fcfaf7] px-4 py-3 text-[14px]"><span className="font-semibold text-[#1e2b43]">{tier.label}</span><span className="font-semibold text-[#bc9155]">{tier.price}</span></div>)}
                </div>
                {item.url ? linkNode(item.url, <><span>{item.cta_label || "View Full Details"}</span><span>→</span></>, "mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#bc9155] transition-all hover:gap-3") : null}
              </article>
            ))}
            {pricing?.cta_card ? <article className="flex flex-col items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#1e2b43_0%,#151e30_100%)] p-8 text-center text-white shadow-[0_20px_38px_rgba(30,43,67,0.16)]"><h3 className="text-[28px] font-bold">{pricing.cta_card.title}</h3><p className="mt-3 max-w-[420px] text-[15px] leading-[1.8] text-white/72">{pricing.cta_card.body}</p><div className="mt-6 flex w-full max-w-[320px] flex-col gap-3">{pricing.cta_card.url ? linkNode(pricing.cta_card.url, pricing.cta_card.label, "flex min-h-[48px] items-center justify-center rounded-[8px] bg-[#bc9155] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#a57d48]") : null}{pricing.cta_card.secondary_url ? linkNode(pricing.cta_card.secondary_url, pricing.cta_card.subtext, "flex min-h-[48px] items-center justify-center rounded-[8px] border border-[#bc9155] px-5 text-[15px] font-semibold text-[#bc9155] transition-colors hover:bg-[#bc9155] hover:text-white") : null}</div></article> : null}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center">
            {label(factors?.eyebrow || "Cost Factors")}
            <h2 className="text-[clamp(34px,3.8vw,50px)] font-bold tracking-[-0.02em]">{factors?.title}</h2>
            {factors?.content ? <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.8] text-[#5c677d]">{factors.content}</p> : null}
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {(factors?.cards || []).map((card: any, index: number) => <article key={`${card.title}-${index}`} className="rounded-[12px] border border-[#e5dac8] bg-[#f8f4ed] p-7"><h3 className="text-[24px] font-bold">{card.title}</h3><p className="mt-3 text-[14px] leading-[1.8] text-[#5c677d]">{card.description}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[760px] text-center">
          {label(local?.eyebrow || "Local Context")}
          <h2 className="text-[clamp(34px,3.8vw,50px)] font-bold tracking-[-0.02em]">{local?.title}</h2>
          {(local?.content || "").split("\n\n").filter(Boolean).map((paragraph: string, index: number) => <p key={index} className="mt-4 text-[15px] leading-[1.85] text-[#5c677d]">{paragraph}</p>)}
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[860px] text-center">
          {label(insurance?.eyebrow || "Insurance Work")}
          <h2 className="text-[clamp(34px,3.8vw,50px)] font-bold tracking-[-0.02em]">{insurance?.title}</h2>
          {(insurance?.content || "").split("\n\n").filter(Boolean).map((paragraph: string, index: number) => <p key={index} className="mt-4 text-[15px] leading-[1.85] text-[#5c677d]">{paragraph}</p>)}
          <div className="mt-8 flex flex-wrap justify-center gap-3">{(insurance?.chips || []).map((chip: string, index: number) => <span key={`${chip}-${index}`} className="rounded-full border border-[#e4dac9] bg-[#f5f1e9] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#1e2b43]">{chip}</span>)}</div>
          {insurance?.note ? <p className="mt-5 text-[13px] italic text-[#5c677d]">{insurance.note}</p> : null}
        </div>
      </section>

      <AreasSection data={areas} />

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1200px] text-center">
          {label("Trusted Brands")}
          <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{logos?.title || "Materials We Stand Behind"}</h2>
          {logos?.subtitle ? <p className="mx-auto mt-3 max-w-[720px] text-[15px] leading-[1.8] text-[#5c677d]">{logos.subtitle}</p> : null}
          <div className="mt-10 grid grid-cols-2 items-center gap-8 md:grid-cols-3 lg:grid-cols-6">
            {(logos?.items || []).map((item: any, index: number) => <div key={`${item.name || "logo"}-${index}`} className="flex min-h-[72px] items-center justify-center rounded-[10px] border border-[#eee6d7] bg-[#fcfaf7] px-6 py-4"><img src={media(item.logo)} alt={item.name} className="max-h-8 w-auto object-contain opacity-90" /></div>)}
          </div>
        </div>
      </section>

      <LeadFormSection page={page} data={lead} accent="Project" />
      <FinancingStrip data={financing} />
    </div>
  );
}
