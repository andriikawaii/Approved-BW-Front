"use client";

import { useState } from "react";
import type { CMSPage } from "@/types/cms";
import { AreasSection, DarkTrustStrip, FinancingStrip, HeroTrustBar, LeadFormSection, cls, label, linkNode, media, parts, section, sections } from "./template-utils";

export function ProcessPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<any>(page, "hero");
  const trustBars = sections<any>(page, "trust_bar");
  const rich = sections<any>(page, "rich_text");
  const intro = rich[0];
  const values = rich[1];
  const process = section<any>(page, "process_steps");
  const areas = section<any>(page, "areas_served");
  const faq = section<any>(page, "faq_list");
  const lead = section<any>(page, "lead_form");
  const related = section<any>(page, "services_grid");
  const financing = rich.find((item) => item.style_variant === "financing_strip");
  const heroParts = parts(hero?.headline, "Connecticut");
  const [openSteps, setOpenSteps] = useState<Record<number, boolean>>({});
  const [showAllFaq, setShowAllFaq] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-[#f5f1e9] text-[#1e2b43]">
      <section className="relative isolate overflow-hidden bg-[#151e30] px-5 pt-[84px] text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${media(hero?.background_image, "/portfolio/builtwell-team-client-arrival-ct.jpeg")})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,30,48,0.52)_0%,rgba(21,30,48,0.36)_28%,rgba(21,30,48,0.72)_72%,rgba(21,30,48,0.94)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-[1240px] flex-col items-center justify-center pb-14 text-center">
          <ol className="mb-5 flex list-none items-center text-[12px] font-semibold text-white/92">
            <li>{linkNode("/", "Home", "transition-colors hover:text-[#bc9155]")}</li>
            <li className="before:px-2.5 before:text-[#bc9155] before:content-['›']"><span>Our Process</span></li>
          </ol>
          <h1 className="max-w-[960px] text-[clamp(40px,5vw,70px)] font-bold leading-[0.98] tracking-[-0.03em] text-white">{heroParts.before}{heroParts.accent ? <span className="text-[#bc9155]">{heroParts.accent}</span> : null}{heroParts.after}</h1>
          {hero?.subheadline ? <p className="mt-6 max-w-[840px] text-[16px] leading-[1.65] text-white/90">{hero.subheadline}</p> : null}
          <div className="mt-8 flex flex-wrap items-stretch justify-center gap-4">
            {(hero?.badges || []).map((badge: any, index: number) => {
              const isPrimary = !!badge.is_primary;
              return <div key={`${badge.label || "badge"}-${index}`}>{linkNode(badge.url || "#", <div className={cls("min-w-[184px] rounded-[8px] border px-6 py-4 text-left shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition-all hover:-translate-y-0.5", isPrimary ? "border-[#bc9155] bg-[#bc9155] text-white" : "border-white/12 bg-[#273148de] text-white")}><div className={cls("text-[11px] font-semibold uppercase tracking-[0.16em]", isPrimary ? "text-white/84" : "text-white/68")}>{badge.label}</div>{badge.value ? <div className="mt-1.5 text-[17px] font-bold">{badge.value}</div> : null}</div>)}</div>;
            })}
          </div>
        </div>
      </section>

      <HeroTrustBar items={trustBars[0]?.items} />

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[760px] text-center">
          {label(intro?.eyebrow || "How We Work")}
          <h2 className="text-[clamp(34px,3.8vw,50px)] font-bold tracking-[-0.02em]">{intro?.title}</h2>
          {(intro?.content || "").split("\n\n").filter(Boolean).map((paragraph: string, index: number) => <p key={index} className="mt-4 text-[15px] leading-[1.85] text-[#5c677d]">{paragraph}</p>)}
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center">
            {label(process?.eyebrow || "The 5-Step Framework")}
            <h2 className="text-[clamp(34px,3.8vw,50px)] font-bold tracking-[-0.02em]">{process?.title}</h2>
            {process?.subtitle ? <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.8] text-[#5c677d]">{process.subtitle}</p> : null}
          </div>
          <div className="space-y-12">
            {(process?.steps || []).map((item: any, index: number) => {
              const open = !!openSteps[index];
              return (
                <div key={`${item.title}-${index}`} className="grid gap-8 lg:grid-cols-[1fr_1.02fr]">
                  <div className="overflow-hidden rounded-[14px] shadow-[0_18px_38px_rgba(30,43,67,0.08)]"><img src={media(item.image, "/portfolio/builtwell-team-client-arrival-ct.jpeg")} alt={item.title} className="h-[300px] w-full object-cover" /></div>
                  <div className="rounded-[14px] bg-white p-8 shadow-[0_18px_38px_rgba(30,43,67,0.08)]">
                    <p className="text-[20px] font-bold leading-[1.35] text-[#1e2b43]">{`Step ${index + 1}: ${item.title}. ${item.short}`}</p>
                    <p className="mt-4 text-[15px] leading-[1.85] text-[#5c677d]">{item.summary || item.description}</p>
                    {open ? <div className="mt-4 space-y-4">{(item.more || []).map((paragraph: string, moreIndex: number) => <p key={moreIndex} className="text-[15px] leading-[1.85] text-[#5c677d]">{paragraph}</p>)}</div> : null}
                    <button type="button" onClick={() => setOpenSteps((current) => ({ ...current, [index]: !current[index] }))} className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#bc9155]">{open ? "Read Less" : "Read More"}<span>{open ? "−" : "+"}</span></button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#1a2438_0%,#1e2b43_50%,#151e30_100%)] px-5 py-20 text-white md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center">
            {label(values?.eyebrow || "Why BuiltWell", true)}
            <h2 className="text-[clamp(34px,3.8vw,50px)] font-bold tracking-[-0.02em]">{parts(values?.title, values?.highlight_text).before}<span className="text-[#bc9155]">{parts(values?.title, values?.highlight_text).accent}</span>{parts(values?.title, values?.highlight_text).after}</h2>
            {values?.content ? <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.8] text-white/72">{values.content}</p> : null}
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {(values?.cards || []).map((card: any, index: number) => <article key={`${card.title}-${index}`} className="rounded-[12px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"><h3 className="text-[22px] font-bold">{card.title}</h3><p className="mt-3 text-[14px] leading-[1.8] text-white/70">{card.description}</p></article>)}
          </div>
        </div>
      </section>

      <AreasSection data={areas} />

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1040px]">
          <div className="mb-10 text-center">
            {label("FAQ")}
            <h2 className="text-[clamp(34px,3.8vw,50px)] font-bold tracking-[-0.02em]">{faq?.title}</h2>
            {faq?.subtitle ? <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.8] text-[#5c677d]">{faq.subtitle}</p> : null}
          </div>
          <div className="overflow-hidden rounded-[12px] border border-[#e2d7c6] bg-white shadow-[0_16px_36px_rgba(30,43,67,0.06)]">
            {(showAllFaq ? faq?.items || [] : (faq?.items || []).slice(0, 5)).map((item: any, index: number) => <div key={`${item.question}-${index}`} className="border-t border-[#eee6d7] first:border-t-0"><button type="button" onClick={() => setOpenFaq((current) => current === index ? null : index)} className="flex w-full items-center justify-between px-6 py-5 text-left text-[18px] font-semibold text-[#1e2b43]"><span>{item.question}</span><span>{openFaq === index ? "−" : "+"}</span></button>{openFaq === index ? <div className="px-6 pb-6 text-[15px] leading-[1.8] text-[#5c677d]">{item.answer}</div> : null}</div>)}
          </div>
          {(faq?.items || []).length > 5 ? <div className="mt-8 text-center"><button type="button" onClick={() => setShowAllFaq((current) => !current)} className="inline-flex rounded-[999px] border border-[#bc9155] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#bc9155] transition-colors hover:bg-[#bc9155] hover:text-white">{showAllFaq ? "Show Fewer -" : "Show More Questions +"}</button></div> : null}
        </div>
      </section>

      <DarkTrustStrip items={trustBars[1]?.items} />
      <LeadFormSection page={page} data={lead} accent="Project" />
      <FinancingStrip data={financing} />

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 text-center">
            {label(related?.eyebrow || "Related Services")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{related?.title}</h2>
            {related?.subtitle ? <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.8] text-[#5c677d]">{related.subtitle}</p> : null}
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            {(related?.items || []).map((item: any, index: number) => <article key={`${item.title}-${index}`} className="overflow-hidden rounded-[12px] border border-[#e5dac8] bg-[#f8f4ed] shadow-[0_14px_32px_rgba(30,43,67,0.06)]"><div className="h-[220px] overflow-hidden"><img src={media(item.image, "/services/kitchen-remodeling-ct.jpg")} alt={item.title} className="h-full w-full object-cover" /></div><div className="p-6"><h3 className="text-[24px] font-bold">{item.title}</h3><p className="mt-3 text-[14px] leading-[1.76] text-[#5c677d]">{item.summary}</p>{item.url ? linkNode(item.url, <><span>Learn More</span><span>→</span></>, "mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#bc9155] transition-all hover:gap-3") : null}</div></article>)}
          </div>
        </div>
      </section>
    </div>
  );
}
