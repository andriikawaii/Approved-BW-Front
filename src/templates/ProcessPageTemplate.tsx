"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { CMSPage } from "@/types/cms";
import { AreasSection, DarkTrustStrip, FinancingStrip, HeroTrustBar, LeadFormSection, cls, label, linkNode, media, parts, section, sections, trustIcon } from "./template-utils";

/* ── fade-up scroll animation hook ── */
function useFadeUp() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const els = container.querySelectorAll<HTMLElement>(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return containerRef;
}

const fadeUpStyle: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(30px)",
  transition: "opacity 0.7s ease, transform 0.7s ease",
};

/* ── trust strip fallback data ── */
const defaultTrustStrip = [
  { icon: "star", label: "Google Rating", value: "4.9", url: "https://www.google.com/search?q=builtwell+ct+reviews" },
  { icon: "shield", label: "BBB A+ Accredited", url: "https://www.bbb.org/search?find_country=USA&find_text=builtwell+ct&find_loc=Orange%2C+CT" },
  { icon: "check", label: "Trusted on Houzz", url: "https://www.houzz.com/professionals/general-contractors/builtwell-ct" },
  { icon: "calendar", label: "CT HIC License #0668405", url: "https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx" },
  { icon: "check", label: "Verified on Angi & Thumbtack", url: "https://www.angi.com/companylist/us/ct/orange/builtwell-ct-reviews-" },
];

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
  const introParts = parts(intro?.title, intro?.highlight_text);
  const valuesParts = parts(values?.title, values?.highlight_text);
  const [openSteps, setOpenSteps] = useState<Record<number, boolean>>({});
  const [showAllFaq, setShowAllFaq] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [countyOpen, setCountyOpen] = useState<Record<number, boolean>>({});
  const fadeRef = useFadeUp();

  const trustStripItems = trustBars[1]?.items || defaultTrustStrip;

  return (
    <div ref={fadeRef} className="bg-[#f5f1e9] text-[#1e2b43]">

      {/* ══════ HERO ══════ */}
      <section className="relative isolate overflow-hidden bg-[#151e30] px-5 pt-[120px] text-white md:px-10">
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-[center_30%] opacity-[0.72]" style={{ backgroundImage: `url(${media(hero?.background_image, "/images/headers/design-planning-header.jpg")})` }} />
        {/* Multi-layer overlay matching reference */}
        <div className="absolute inset-0" style={{
          background: [
            "radial-gradient(ellipse at 97% 97%, rgba(21,30,48,1) 0%, rgba(21,30,48,0.9) 8%, transparent 30%)",
            "radial-gradient(ellipse at 3% 97%, rgba(21,30,48,0.9) 0%, transparent 25%)",
            "linear-gradient(180deg, rgba(21,30,48,0.35) 0%, rgba(21,30,48,0.2) 30%, rgba(21,30,48,0.45) 65%, rgba(21,30,48,0.92) 100%)",
          ].join(", "),
        }} />
        <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-[1240px] flex-col items-center justify-center pb-12 text-center">
          {/* Breadcrumb */}
          <ol className="fade-up mb-5 flex list-none items-center gap-0 text-[13px] font-medium text-white/[0.92] [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]" style={fadeUpStyle}>
            <li>{linkNode("/", "Home", "text-white/85 transition-colors hover:text-[#bc9155]")}</li>
            <li className="before:mx-2.5 before:text-[12px] before:text-[#bc9155] before:content-['›']">
              <span className="font-semibold text-white">Our Process</span>
            </li>
          </ol>
          {/* Title — reference: clamp(40px, 4.5vw, 56px) */}
          <h1 className="fade-up mb-3 max-w-[900px] text-[clamp(40px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.5px] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]" style={{ ...fadeUpStyle, transitionDelay: "0.1s" }}>
            {heroParts.before}
            {heroParts.accent ? <span className="text-[#bc9155]">{heroParts.accent}</span> : null}
            {heroParts.after}
          </h1>
          {/* Subtitle — 17px matching reference */}
          {hero?.subheadline ? (
            <p className="fade-up mx-auto mt-4 max-w-[560px] text-center text-[17px] font-normal leading-[1.7] text-white/[0.82]" style={{ ...fadeUpStyle, transitionDelay: "0.2s" }}>
              {hero.subheadline}
            </p>
          ) : null}
          {/* CTA buttons — reference style */}
          <div className="fade-up mt-8 flex flex-wrap items-stretch justify-center gap-4" style={{ ...fadeUpStyle, transitionDelay: "0.3s" }}>
            {(hero?.badges || []).map((badge: any, index: number) => {
              const isPrimary = !!badge.is_primary;
              return (
                <div key={`${badge.label || "badge"}-${index}`}>
                  {linkNode(
                    badge.url || "#",
                    <div
                      className={cls(
                        "flex min-w-[180px] flex-col items-center rounded-[8px] border px-7 py-4 text-center transition-all duration-300 hover:-translate-y-[2px]",
                        isPrimary
                          ? "border-[#bc9155] border-b-2 border-b-[#a57d48] bg-[#bc9155] text-white hover:border-[#d4a95a] hover:border-b-[#a57d48] hover:bg-[#d4a95a] hover:shadow-[0_8px_24px_rgba(188,145,85,0.4)]"
                          : "border-b-2 border-b-[#bc9155] border-white/[0.18] bg-[rgba(10,18,35,0.42)] text-white backdrop-blur-[12px] hover:border-white/[0.28] hover:border-b-[#bc9155] hover:bg-[rgba(10,18,35,0.62)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3),0_0_0_1px_rgba(188,145,85,0.2)]",
                      )}
                    >
                      <div className={cls("text-[11px] uppercase tracking-[1.2px]", isPrimary ? "opacity-90" : "opacity-70")}>
                        {badge.label}
                      </div>
                      {badge.value ? (
                        <div className="mt-1 text-[18px] font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {badge.value}
                        </div>
                      ) : null}
                    </div>,
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════ TRUST BAR ══════ */}
      <HeroTrustBar items={trustBars[0]?.items} />

      {/* ══════ PROCESS INTRO — "How We Work" ══════ */}
      <section className="border-b border-[rgba(30,43,67,0.06)] bg-white" style={{ padding: "80px 40px" }}>
        <div className="mx-auto max-w-[820px]">
          <div className="fade-up text-center" style={fadeUpStyle}>
            {label(intro?.eyebrow || "How We Work")}
            <h2 className="mb-6 font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              {introParts.before}
              {introParts.accent ? <span className="text-[#bc9155]">{introParts.accent}</span> : null}
              {introParts.after}
            </h2>
          </div>
          <div className="fade-up" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
            {(intro?.content || "").split("\n\n").filter(Boolean).map((paragraph: string, index: number) => (
              <p key={index} className="mb-5 text-[16px] leading-[1.85] text-[#5c677d] last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ THE 5-STEP FRAMEWORK ══════ */}
      <section className="bg-[#f5f1e9] px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="fade-up mb-16 text-center" style={fadeUpStyle}>
            {label(process?.eyebrow || "The 5-Step Framework")}
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              {(() => { const p = parts(process?.title, process?.highlight_text || "Step by Step"); return <>{p.before}{p.accent ? <span className="text-[#bc9155]">{p.accent}</span> : null}{p.after}</>; })()}
            </h2>
          </div>
          <div className="space-y-12">
            {(process?.steps || []).map((item: any, index: number) => {
              const open = !!openSteps[index];
              return (
                <div key={`${item.title}-${index}`} className="fade-up grid items-start gap-9 lg:grid-cols-2" style={{ ...fadeUpStyle, transitionDelay: `${index * 0.08}s` }}>
                  {/* Image — fixed height, no layout shift */}
                  <div className="overflow-hidden rounded-[12px] shadow-[0_8px_32px_rgba(30,43,67,0.1)]">
                    <img
                      src={media(item.image, "/portfolio/builtwell-team-client-arrival-ct.jpeg")}
                      alt={item.title}
                      className="h-[280px] w-full object-cover"
                    />
                  </div>
                  {/* Content card */}
                  <div className="rounded-[12px] border border-[rgba(30,43,67,0.07)] bg-white p-7 shadow-[0_2px_12px_rgba(30,43,67,0.05)]">
                    <p className="text-[16px] font-bold leading-[1.35] text-[#1e2b43]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {`Step ${index + 1}: ${item.title}. ${item.short}`}
                    </p>
                    <p className="mt-4 text-[15px] leading-[1.75] text-[#5c677d]">{item.summary || item.description}</p>
                    {/* Expandable content — only text card grows, image stays fixed */}
                    {open ? (
                      <div className="mt-4 space-y-3.5">
                        {(item.more || []).map((paragraph: string, moreIndex: number) => (
                          <p key={moreIndex} className="text-[15px] leading-[1.75] text-[#5c677d]">{paragraph}</p>
                        ))}
                      </div>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setOpenSteps((current) => ({ ...current, [index]: !current[index] }))}
                      className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#bc9155] transition-colors hover:text-[#9a7340]"
                    >
                      {open ? "Read less" : "Read more"}
                      <svg
                        width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        className={cls("transition-transform duration-300", open ? "rotate-180" : "")}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════ WHY BUILTWELLR — process-step circles like home page ══════ */}
      <section className="relative overflow-hidden px-5 py-24 text-white md:px-10">
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/services/builtwell-team-contractors-ct-05.png')" }} />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,18,34,0.90)_0%,rgba(30,43,67,0.85)_100%)]" />
        <div className="relative z-[1] mx-auto max-w-[1240px]">
          <div className="fade-up mb-16 text-center" style={fadeUpStyle}>
            {label(values?.eyebrow || "Why BuiltWell", true)}
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              {valuesParts.before}
              {valuesParts.accent ? <span className="text-[#bc9155]">{valuesParts.accent}</span> : null}
              {valuesParts.after}
            </h2>
            {values?.content ? (
              <p className="mx-auto mt-5 max-w-[700px] text-[17px] leading-[1.75] text-white/60">{values.content}</p>
            ) : null}
          </div>
          {/* Process-style timeline grid matching home page "Our Process" */}
          <div className="fade-up relative grid gap-0 lg:grid-cols-5" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
            {/* Connecting line */}
            <div className="pointer-events-none absolute left-[10%] right-[10%] top-[34px] hidden h-0.5 bg-[rgba(188,145,85,0.25)] lg:block" />
            {(values?.cards || []).map((card: any, index: number) => (
              <div
                key={`${card.title}-${index}`}
                className="group relative cursor-default rounded-[8px] px-4 py-5 text-center transition-colors hover:bg-[rgba(188,145,85,0.1)]"
              >
                {/* Numbered circle */}
                <div className="relative z-[2] mx-auto -mt-2 mb-5 flex h-[68px] w-[68px] items-center justify-center rounded-full border-[2.5px] border-[#bc9155] bg-[rgba(188,145,85,0.42)] shadow-[0_0_0_4px_rgba(188,145,85,0.12)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#f5e0c0]">
                    {index === 0 && <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />}
                    {index === 1 && <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>}
                    {index === 2 && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                    {index === 3 && <><path d="M3 21h18" /><path d="M3 21V8l9-5 9 5v13" /><rect x="9" y="13" width="6" height="8" /></>}
                    {index === 4 && <><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></>}
                  </svg>
                </div>
                <h3 className="mb-3 font-serif text-[18px] font-bold text-white">{card.title}</h3>
                <p className="text-[14px] leading-[1.65] text-white/70">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ WHERE WE WORK ══════ */}
      <AreasSection data={areas} />

      {/* ══════ FAQ ══════ */}
      <section className="border-t border-[rgba(30,43,67,0.08)] bg-white px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[800px]">
          <div className="fade-up mb-16 text-center" style={fadeUpStyle}>
            {label("FAQ")}
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              {(() => { const p = parts(faq?.title, faq?.highlight_text || "Questions"); return <>{p.before}{p.accent ? <span className="text-[#bc9155]">{p.accent}</span> : null}{p.after}</>; })()}
            </h2>
          </div>
          <div className="fade-up flex flex-col gap-3" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
            {(showAllFaq ? faq?.items || [] : (faq?.items || []).slice(0, 5)).map((item: any, index: number) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={`${item.question}-${index}`}
                  className={cls(
                    "overflow-hidden rounded-[8px] border transition-colors duration-200",
                    isOpen ? "border-[#bc9155]" : "border-[rgba(30,43,67,0.1)]",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq((current) => current === index ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[rgba(188,145,85,0.04)]"
                  >
                    <span className="text-[16px] font-semibold text-[#1e2b43]" style={{ fontFamily: "'Inter', sans-serif" }}>{item.question}</span>
                    <span className="flex-shrink-0 text-[22px] font-light text-[#bc9155]">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen ? (
                    <div className="px-6 pb-5 text-[15px] leading-[1.75] text-[#5c677d]">{item.answer}</div>
                  ) : null}
                </div>
              );
            })}
          </div>
          {(faq?.items || []).length > 5 ? (
            <div className="fade-up mt-8 text-center" style={{ ...fadeUpStyle, transitionDelay: "0.25s" }}>
              <button
                type="button"
                onClick={() => setShowAllFaq((current) => !current)}
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#bc9155] transition-colors hover:text-[#9a7340]"
              >
                {showAllFaq ? "Show Less" : "Show More Questions"}
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className={cls("transition-transform duration-300", showAllFaq ? "rotate-180" : "")}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
      </section>

      {/* ══════ TRUST STRIP ══════ */}
      <DarkTrustStrip items={trustStripItems} />

      {/* ══════ LEAD FORM ══════ */}
      <LeadFormSection page={page} data={lead} accent="Project" />

      {/* ══════ FINANCING ══════ */}
      <FinancingStrip data={financing} />

      {/* ══════ RELATED SERVICES ══════ */}
      <section className="bg-[#f5f1e9] px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="fade-up mb-16 text-center" style={fadeUpStyle}>
            {label(related?.eyebrow || "Related Services")}
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              {(() => { const p = parts(related?.title, related?.highlight_text || "Services"); return <>{p.before}{p.accent ? <span className="text-[#bc9155]">{p.accent}</span> : null}{p.after}</>; })()}
            </h2>
            {related?.subtitle ? (
              <p className="mx-auto mt-5 max-w-[700px] text-[17px] leading-[1.75] text-[#5c677d]">{related.subtitle}</p>
            ) : null}
          </div>
          <div className="fade-up grid gap-8 lg:grid-cols-3" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
            {(related?.items || []).map((item: any, index: number) => (
              <article
                key={`${item.title}-${index}`}
                className="group flex flex-col overflow-hidden rounded-[8px] border-b-2 border-b-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-b-[#bc9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]"
              >
                <div className="h-[220px] overflow-hidden">
                  <img
                    src={media(item.image, "/services/kitchen-remodeling-ct.jpg")}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 pb-8">
                  <h3 className="text-[22px] font-bold">
                    {item.url ? linkNode(item.url, item.title, "text-inherit transition-colors hover:text-[#bc9155]") : item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-[1.7] text-[#5c677d]">{item.summary}</p>
                  {item.url ? (
                    linkNode(
                      item.url,
                      <>
                        <span>Learn More</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </>,
                      "mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#bc9155] transition-all duration-300 hover:gap-2.5",
                    )
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Process-specific AreasSection with reference-matched style
   ──────────────────────────────────────────────────────────── */
function ProcessAreasSection({
  data,
  countyOpen,
  setCountyOpen,
}: {
  data: any;
  countyOpen: Record<number, boolean>;
  setCountyOpen: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}) {
  const titleParts = parts(data?.title, data?.highlight_text);
  const areasFadeRef = useFadeUp();

  return (
    <section ref={areasFadeRef} className="bg-[#f5f1e9] px-5 py-24 md:px-10">
      <div className="mx-auto max-w-[1240px]">
        <div className="fade-up mb-16 text-center" style={fadeUpStyle}>
          {label(data?.eyebrow || "Where We Work")}
          <h2 className="mx-auto max-w-[780px] font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {data?.subtitle ? (
            <p className="mx-auto mt-5 max-w-[700px] text-[17px] leading-[1.75] text-[#5c677d]">{data.subtitle}</p>
          ) : null}
        </div>

        <div className="fade-up grid gap-8 lg:grid-cols-2" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
          {(data?.counties || []).map((county: any, index: number) => {
            const expanded = !!countyOpen[index];
            const mainTowns = county.towns || [];
            const extraTowns = county.extra_towns || [];
            const towns = expanded ? [...mainTowns, ...extraTowns] : mainTowns;
            const links = county.town_links || {};

            return (
              <article
                key={`${county.name || "county"}-${index}`}
                className="flex flex-col overflow-hidden rounded-[12px] border-b-[3px] border-b-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1.5 hover:border-b-[#bc9155] hover:shadow-[0_16px_40px_rgba(30,43,67,0.1),0_32px_64px_rgba(30,43,67,0.08)]"
              >
                {/* Image with gradient overlay + zoom */}
                <div className="group relative h-[220px] overflow-hidden">
                  <img
                    src={media(county.image, index === 0 ? "/images/areas/fairfield-county.jpg" : "/images/areas/new-haven-county.jpg")}
                    alt={county.name || "BuiltWell CT service area"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[rgba(30,43,67,0.4)] to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-7 pb-8">
                  <h3 className="text-[24px] font-bold">{county.name}</h3>
                  {county.phone ? (
                    <p className="mt-1 text-[15px] text-[#5c677d]">
                      Call:{" "}
                      <a href={`tel:${county.phone.replace(/\D/g, "")}`} className="font-semibold text-[#bc9155] hover:underline">
                        {county.phone}
                      </a>
                    </p>
                  ) : null}
                  {county.description ? (
                    <p className="mt-4 border-b border-[rgba(30,43,67,0.06)] pb-5 text-[14px] leading-[1.7] text-[#5c677d]">
                      {county.description}
                    </p>
                  ) : null}

                  {/* Town pills — first 2 rows gold hover, rest text-only hover */}
                  <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {towns.map((town: string, townIndex: number) => {
                      const hasLink = !!links[town];
                      const isMainRow = townIndex < mainTowns.length;
                      if (hasLink && isMainRow) {
                        return (
                          <div key={`${county.name}-${town}-${townIndex}`}>
                            {linkNode(
                              links[town] || county.url || "#",
                              town,
                              "block rounded-full bg-[#f5f1e9] px-3 py-[7px] text-center text-[11px] font-semibold tracking-[0.2px] text-[#1e2b43] transition-all duration-200 hover:bg-[#bc9155] hover:text-white",
                            )}
                          </div>
                        );
                      }
                      return (
                        <span
                          key={`${county.name}-${town}-${townIndex}`}
                          className="block rounded-full bg-[#f5f1e9] px-3 py-[7px] text-center text-[11px] font-semibold tracking-[0.2px] text-[#1e2b43] transition-colors duration-200 hover:text-[#9a7340]"
                        >
                          {town}
                        </span>
                      );
                    })}
                  </div>

                  {extraTowns.length ? (
                    <button
                      type="button"
                      onClick={() => setCountyOpen((c) => ({ ...c, [index]: !c[index] }))}
                      className="mt-3 text-center text-[13px] font-semibold text-[#bc9155] transition-colors hover:text-[#9a7340]"
                    >
                      {expanded ? "Show Less ▴" : "See All Towns +"}
                    </button>
                  ) : null}

                  {county.url
                    ? linkNode(
                        county.url,
                        <>
                          <span>{county.cta_label || `Learn more about ${county.name}`}</span>
                          <ArrowRight className="h-4 w-4" />
                        </>,
                        "mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#bc9155] transition-all duration-300 hover:gap-2.5",
                      )
                    : null}
                </div>
              </article>
            );
          })}
        </div>

        {data?.note ? (
          <p className="fade-up mt-8 text-center text-[14px] text-[#5c677d]" style={{ ...fadeUpStyle, transitionDelay: "0.25s" }}>
            {data.note}
          </p>
        ) : null}
      </div>
    </section>
  );
}
