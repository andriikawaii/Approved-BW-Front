"use client";

import type { CMSPage } from "@/types/cms";
import { DarkTrustStrip, FinancingStrip, HeroTrustBar, LeadFormSection, cls, label, linkNode, media, parts, section, sections } from "./template-utils";
import { useEffect, useRef } from "react";

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

/* ── financing option card icons ── */
const financingIcons: Record<string, React.ReactNode> = {
  savings: <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="24" height="24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"/><path d="M16 3v4M8 3v4M3 9h18"/><circle cx="12" cy="15" r="2"/></svg>,
  heloc: <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="24" height="24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  equity: <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="24" height="24"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 14h4"/></svg>,
  greensky: <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="24" height="24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
};

function pickFinancingIcon(title?: string) {
  if (!title) return financingIcons.savings;
  const lower = title.toLowerCase();
  if (lower.includes("heloc") || lower.includes("line of credit")) return financingIcons.heloc;
  if (lower.includes("equity loan") || lower.includes("home equity loan")) return financingIcons.equity;
  if (lower.includes("greensky") || lower.includes("third")) return financingIcons.greensky;
  return financingIcons.savings;
}

export function FinancingPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<any>(page, "hero");
  const trust = sections<any>(page, "trust_bar")[0];
  const rich = sections<any>(page, "rich_text");
  const lead = section<any>(page, "lead_form");

  /* rich_text sections by order (excluding financing_strip) */
  const contentBlocks = rich.filter((item) => item.style_variant !== "financing_strip");
  const financing = rich.find((item) => item.style_variant === "financing_strip");

  /* We expect:
     0 = Planning intro (white bg)
     1 = Financing options with cards (cream bg)
     2 = Estimates section (white bg)
     3 = Consultations section (cream bg)
  */
  const intro = contentBlocks[0];
  const optionsSection = contentBlocks[1];
  const estimatesSection = contentBlocks[2];
  const consultSection = contentBlocks[3];

  /* trust strip data */
  const trustStripCms = sections<any>(page, "trust_bar")[1];
  const defaultTrustStrip = [
    { icon: "star", label: "Google Rating 4.9", url: "https://www.google.com/search?q=builtwell+ct+reviews" },
    { icon: "shield", label: "BBB A+ Accredited", url: "https://www.bbb.org/search?find_country=USA&find_text=builtwell+ct&find_loc=Orange%2C+CT" },
    { icon: "check", label: "Trusted on Houzz", url: "https://www.houzz.com/professionals/general-contractors/builtwell-ct" },
    { icon: "calendar", label: "CT HIC License #0668405", url: "https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx" },
    { icon: "check", label: "Verified on Angi and Thumbtack", url: "https://www.angi.com/companylist/us/ct/orange/builtwell-ct-reviews-" },
  ];
  const trustStripItems = trustStripCms?.items || defaultTrustStrip;

  const heroParts = parts(hero?.headline, hero?.highlight_text || "Remodeling Project");
  const fadeRef = useFadeUp();

  return (
    <div ref={fadeRef} className="bg-white text-[#1e2b43]">
      <style>{`
        .fin-page .financing-options-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; }
        .fin-page .financing-option-card { background:#fff; border-radius:12px; padding:32px 24px; text-align:center; box-shadow:0 2px 12px rgba(30,43,67,0.06),0 1px 3px rgba(30,43,67,0.04); transition:all 0.35s cubic-bezier(0.4,0,0.2,1); border-bottom:2px solid transparent; }
        .fin-page .financing-option-card:hover { transform:translateY(-4px); border-bottom-color:#BC9155; box-shadow:0 12px 28px rgba(30,43,67,0.1),0 28px 56px rgba(30,43,67,0.12); }
        .fin-page .financing-option-icon { width:56px; height:56px; border-radius:50%; background:rgba(188,145,85,0.1); display:flex; align-items:center; justify-content:center; margin:0 auto 20px; }
        .fin-page .financing-option-icon svg { width:24px; height:24px; }
        @media (max-width:768px) { .fin-page .financing-options-grid { grid-template-columns:1fr; gap:16px; } .fin-page .financing-option-card { padding:24px 18px; } }
        @media (max-width:480px) { .fin-page .financing-options-grid { gap:12px; } .fin-page .financing-option-card { padding:20px 14px; } }
        @media (prefers-reduced-motion:reduce) { .fin-page .financing-option-card { transition:none; } .fin-page .financing-option-card:hover { transform:none; } }
      `}</style>

      <div className="fin-page">
        {/* ══════ HERO ══════ */}
        <section className="relative isolate overflow-hidden bg-[#151e30] px-5 pt-[120px] text-white md:px-10">
          <div className="absolute inset-0 bg-cover bg-[center_30%] opacity-[0.72]" style={{ backgroundImage: `url(${media(hero?.background_image, "/portfolio/builtwell-contractor-handshake-arrival-ct-optimized.jpg")})` }} />
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
                <span className="font-semibold text-white">Financing</span>
              </li>
            </ol>
            <h1 className="fade-up mb-3 max-w-[900px] text-[clamp(40px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.5px] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]" style={{ ...fadeUpStyle, transitionDelay: "0.1s" }}>
              {heroParts.before}
              {heroParts.accent ? <span className="text-[#bc9155]">{heroParts.accent}</span> : null}
              {heroParts.after}
            </h1>
            {hero?.subheadline ? (
              <p className="fade-up mx-auto mt-4 max-w-[560px] text-center text-[17px] font-normal leading-[1.7] text-white/[0.82]" style={{ ...fadeUpStyle, transitionDelay: "0.2s" }}>
                {hero.subheadline}
              </p>
            ) : null}
            {/* CTA buttons */}
            <div className="fade-up mt-8 flex flex-wrap items-stretch justify-center gap-4" style={{ ...fadeUpStyle, transitionDelay: "0.3s" }}>
              {(hero?.badges || []).map((badge: any, index: number) => {
                const isPrimary = !!badge.is_primary;
                return (
                  <div key={`${badge.label || "badge"}-${index}`}>
                    {linkNode(
                      badge.url || "#",
                      <div className={cls(
                        "flex min-w-[180px] flex-col items-center rounded-[8px] border px-7 py-4 text-center transition-all duration-300 hover:-translate-y-[2px]",
                        isPrimary
                          ? "border-[#bc9155] border-b-2 border-b-[#a57d48] bg-[#bc9155] text-white hover:border-[#d4a95a] hover:border-b-[#a57d48] hover:bg-[#d4a95a] hover:shadow-[0_8px_24px_rgba(188,145,85,0.4)]"
                          : "border-b-2 border-b-[#bc9155] border-white/[0.18] bg-[rgba(10,18,35,0.42)] text-white backdrop-blur-[12px] hover:border-white/[0.28] hover:border-b-[#bc9155] hover:bg-[rgba(10,18,35,0.62)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3),0_0_0_1px_rgba(188,145,85,0.2)]",
                      )}>
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
        <HeroTrustBar items={trust?.items} />

        {/* ══════ PLANNING YOUR REMODELING INVESTMENT ══════ */}
        <section className="border-b border-[rgba(30,43,67,0.06)] bg-white" style={{ padding: "80px 40px" }}>
          <div className="mx-auto max-w-[1240px]">
            <div className="fade-up mx-auto max-w-[800px]" style={fadeUpStyle}>
              {label(intro?.eyebrow || "Planning Ahead")}
              {(() => { const p = parts(intro?.title, intro?.highlight_text); return (
                <h2 className="mb-5 font-serif text-[clamp(32px,3.5vw,44px)] font-bold tracking-[-0.5px]">
                  {p.before}{p.accent ? <span className="text-[#bc9155]">{p.accent}</span> : null}{p.after}
                </h2>
              ); })()}
              {(intro?.content || "").split("\n\n").filter(Boolean).map((paragraph: string, index: number) => (
                <p key={index} className="mt-5 text-[16px] leading-[1.85] text-[#5c677d]">{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ FINANCING OPTIONS CARDS ══════ */}
        <section className="bg-[#f5f1e9]" style={{ padding: "80px 40px" }}>
          <div className="mx-auto max-w-[1240px]">
            <div className="fade-up mb-12 text-center" style={{ ...fadeUpStyle, marginBottom: "48px" }}>
              {label(optionsSection?.eyebrow || "Your Options")}
              {(() => { const p = parts(optionsSection?.title, optionsSection?.highlight_text); return (
                <h2 className="mx-auto mb-5 max-w-[780px] font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
                  {p.before}{p.accent ? <span className="text-[#bc9155]">{p.accent}</span> : null}{p.after}
                </h2>
              ); })()}
              {optionsSection?.content ? (
                <p className="mx-auto max-w-[700px] text-[17px] leading-[1.75] text-[#5c677d]">{optionsSection.content}</p>
              ) : null}
            </div>
            <div className="fade-up financing-options-grid" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
              {(optionsSection?.cards || []).map((card: any, index: number) => (
                <div key={`${card.title || "opt"}-${index}`} className="financing-option-card">
                  <div className="financing-option-icon">
                    {pickFinancingIcon(card.title)}
                  </div>
                  <h3 className="mb-2.5 text-[18px] font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>{card.title}</h3>
                  <p className="text-[14px] leading-[1.65] text-[#5c677d]">{card.description}</p>
                  {card.url ? (
                    <a href={card.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-[13px] font-semibold text-[#bc9155]">
                      {card.cta_label || card.title}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ ESTIMATES ══════ */}
        <section className="border-b border-[rgba(30,43,67,0.06)] bg-white" style={{ padding: "80px 40px" }}>
          <div className="mx-auto max-w-[1240px]">
            <div className="fade-up mx-auto max-w-[820px]" style={fadeUpStyle}>
              <div className="mb-7 text-center">
                {label(estimatesSection?.eyebrow || "Your Estimate")}
                {(() => { const p = parts(estimatesSection?.title, estimatesSection?.highlight_text); return (
                  <h2 className="font-serif text-[clamp(28px,3vw,38px)] font-bold tracking-[-0.3px]">
                    {p.before}{p.accent ? <span className="text-[#bc9155]">{p.accent}</span> : null}{p.after}
                  </h2>
                ); })()}
              </div>
              {(estimatesSection?.content || "").split("\n\n").filter(Boolean).map((paragraph: string, index: number) => {
                /* Handle inline links like [process page](/process/) */
                const linkMatch = paragraph.match(/\[([^\]]+)\]\(([^)]+)\)/);
                if (linkMatch) {
                  const beforeLink = paragraph.slice(0, linkMatch.index);
                  const afterLink = paragraph.slice((linkMatch.index || 0) + linkMatch[0].length);
                  return (
                    <p key={index} className="mt-5 text-[16px] leading-[1.85] text-[#5c677d]">
                      {beforeLink}
                      {linkNode(linkMatch[2], linkMatch[1], "font-semibold text-[#bc9155]")}
                      {afterLink}
                    </p>
                  );
                }
                return <p key={index} className="mt-5 text-[16px] leading-[1.85] text-[#5c677d]">{paragraph}</p>;
              })}
            </div>
          </div>
        </section>

        {/* ══════ CONSULTATIONS ══════ */}
        <section className="bg-[#f5f1e9]" style={{ padding: "80px 40px" }}>
          <div className="mx-auto max-w-[1240px]">
            <div className="fade-up mx-auto max-w-[820px]" style={fadeUpStyle}>
              <div className="mb-7 text-center">
                {label(consultSection?.eyebrow || "Get Started")}
                {(() => { const p = parts(consultSection?.title, consultSection?.highlight_text); return (
                  <h2 className="font-serif text-[clamp(28px,3vw,38px)] font-bold tracking-[-0.3px]">
                    {p.before}{p.accent ? <span className="text-[#bc9155]">{p.accent}</span> : null}{p.after}
                  </h2>
                ); })()}
              </div>
              {(consultSection?.content || "").split("\n\n").filter(Boolean).map((paragraph: string, index: number) => {
                /* Handle phone numbers and inline links */
                const linkMatch = paragraph.match(/\[([^\]]+)\]\(([^)]+)\)/);
                if (linkMatch) {
                  const beforeLink = paragraph.slice(0, linkMatch.index);
                  const afterLink = paragraph.slice((linkMatch.index || 0) + linkMatch[0].length);
                  /* Check for more links in afterLink */
                  const secondLinkMatch = afterLink.match(/\[([^\]]+)\]\(([^)]+)\)/);
                  if (secondLinkMatch) {
                    const midText = afterLink.slice(0, secondLinkMatch.index);
                    const endText = afterLink.slice((secondLinkMatch.index || 0) + secondLinkMatch[0].length);
                    return (
                      <p key={index} className="mt-5 text-[16px] leading-[1.85] text-[#5c677d]">
                        {beforeLink}
                        {linkNode(linkMatch[2], linkMatch[1], "font-semibold text-[#bc9155]")}
                        {midText}
                        {linkNode(secondLinkMatch[2], secondLinkMatch[1], "font-semibold text-[#bc9155]")}
                        {endText}
                      </p>
                    );
                  }
                  return (
                    <p key={index} className="mt-5 text-[16px] leading-[1.85] text-[#5c677d]">
                      {beforeLink}
                      {linkNode(linkMatch[2], linkMatch[1], "font-semibold text-[#bc9155]")}
                      {afterLink}
                    </p>
                  );
                }
                /* Handle phone numbers rendered as bold + phone link */
                if (paragraph.includes("Fairfield County:") || paragraph.includes("New Haven County:")) {
                  return (
                    <p key={index} className="mt-2 text-[16px] leading-[1.85] text-[#5c677d]" dangerouslySetInnerHTML={{
                      __html: paragraph
                        .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-[#1e2b43] font-semibold">$1</strong>')
                        .replace(/\((\d{3})\)\s*(\d{3})-(\d{4})/g, '<a href="tel:$1$2$3" class="font-semibold text-[#bc9155]">($1) $2-$3</a>')
                    }} />
                  );
                }
                return <p key={index} className="mt-5 text-[16px] leading-[1.85] text-[#5c677d]">{paragraph}</p>;
              })}
            </div>
          </div>
        </section>

        {/* ══════ TRUST STRIP ══════ */}
        <DarkTrustStrip items={trustStripItems} />

        {/* ══════ LEAD FORM CTA ══════ */}
        <LeadFormSection page={page} data={lead} accent={lead?.title_highlight || "Consultation"} />

        {/* ══════ FINANCING STRIP (GreenSky) ══════ */}
        <FinancingStrip data={financing} />
      </div>
    </div>
  );
}
