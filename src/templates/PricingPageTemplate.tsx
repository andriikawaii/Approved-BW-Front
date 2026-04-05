"use client";

import type { CMSPage } from "@/types/cms";
import { AreasSection, FinancingStrip, HeroTrustBar, LeadFormSection, cls, label, linkNode, media, parts, section, sections } from "./template-utils";
import { useEffect, useRef, useState } from "react";

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

/* ── tiny SVG icon bank for cost-factor cards ── */
const factorIcons: Record<string, React.ReactNode> = {
  "project size": <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  "structural": <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5"><path d="M3 21h18"/><path d="M3 21V8l9-5 9 5v13"/><rect x="9" y="13" width="6" height="8"/></svg>,
  "plumbing": <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  "material": <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  "permits": <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>,
  "demolition": <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
};

function pickFactorIcon(title?: string) {
  if (!title) return factorIcons["project size"];
  const lower = title.toLowerCase();
  for (const [key, icon] of Object.entries(factorIcons)) {
    if (lower.includes(key)) return icon;
  }
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>;
}

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
  const rawHeroCtas = (hero?.badges?.length
    ? hero.badges
    : [
        { is_primary: true, label: "Get Your Free Estimate", url: "/free-consultation/" },
        { label: "Fairfield", value: "(203) 919-9616", url: "tel:2039199616" },
        { label: "New Haven", value: "(203) 466-9148", url: "tel:2034669148" },
      ]) as Array<{ is_primary?: boolean; label?: string; value?: string; url?: string }>;
  const estimateCta =
    rawHeroCtas.find((badge) => badge.is_primary)
    || rawHeroCtas.find((badge) => `${badge.label || ""} ${badge.value || ""}`.toLowerCase().includes("estimate"))
    || { is_primary: true, label: "Get Your Free Estimate", url: "/free-consultation/" };
  const fairfieldCta =
    rawHeroCtas.find((badge) => `${badge.label || ""} ${badge.value || ""}`.toLowerCase().includes("fairfield"))
    || rawHeroCtas.find((badge) => `${badge.label || ""} ${badge.value || ""}`.includes("919"));
  const newHavenCta =
    rawHeroCtas.find((badge) => `${badge.label || ""} ${badge.value || ""}`.toLowerCase().includes("new haven"))
    || rawHeroCtas.find((badge) => `${badge.label || ""} ${badge.value || ""}`.includes("466"));
  const heroCtas = [
    { ...estimateCta, is_primary: true, label: "Get Your Free Estimate", value: undefined, url: estimateCta.url || "/free-consultation/" },
    fairfieldCta ? { ...fairfieldCta, label: "Fairfield", value: fairfieldCta.value || "(203) 919-9616", url: fairfieldCta.url || "tel:2039199616" } : null,
    newHavenCta ? { ...newHavenCta, label: "New Haven", value: newHavenCta.value || "(203) 466-9148", url: newHavenCta.url || "tel:2034669148" } : null,
  ].filter(Boolean) as Array<{ is_primary?: boolean; label?: string; value?: string; url?: string }>;

  /* trust strip data — try second CMS trust_bar, otherwise use reference defaults */
  const trustStripCms = sections<any>(page, "trust_bar")[1];

  const fadeRef = useFadeUp();

  return (
    <div ref={fadeRef} className="pricing-page bg-[#f5f1e9] text-[#1e2b43]">

      {/* ══════ HERO ══════ */}
      <section className="relative isolate overflow-hidden bg-[#151e30] px-5 pt-[120px] text-white md:px-10">
        {/* Background image with opacity */}
        <div className="absolute inset-0 bg-cover bg-[center_30%] opacity-[0.72]" style={{ backgroundImage: `url(${media(hero?.background_image, "/hero/builtwell-team-approaching-home-hero-ct.png")})` }} />
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
              <span className="font-semibold text-white">Pricing</span>
            </li>
          </ol>
          {/* Title — matches reference clamp(40px, 4.5vw, 56px) */}
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
          {/* CTA buttons */}
          <div className="pricing-hero-ctas fade-up mt-8" style={{ ...fadeUpStyle, transitionDelay: "0.3s" }}>
            {heroCtas.map((badge, index) => {
              const isPrimary = !!badge.is_primary;
              const text = isPrimary
                ? badge.label || badge.value || "Get Your Free Estimate"
                : badge.label && badge.value
                  ? `${badge.label}: ${badge.value}`
                  : badge.value || badge.label || "";
              return (
                <div key={`${badge.label || "badge"}-${index}`}>
                  {linkNode(
                    badge.url || "#",
                    text,
                    cls("pricing-hero-cta-btn", isPrimary && "pricing-hero-cta-primary"),
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════ TRUST BAR ══════ */}
      <HeroTrustBar items={trust?.items} />

      {/* ══════ BEFORE YOU BEGIN ══════ */}
      <section className="bg-white" style={{ padding: "60px 0" }}>
        <div className="mx-auto max-w-[800px] px-8 text-center">
          <div className="fade-up" style={fadeUpStyle}>
            {label(intro?.eyebrow)}
            {(() => { const p = parts(intro?.title, intro?.highlight_text); return (
              <h2 className="mb-5 font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
                {p.before}{p.accent ? <span className="text-[#bc9155]">{p.accent}</span> : null}{p.after}
              </h2>
            ); })()}
          </div>
          <div className="fade-up" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
            {(intro?.content || "")
              .split("\n\n")
              .filter(Boolean)
              .map((paragraph: string, index: number) => (
                <p key={index} className="mt-4 text-[16px] leading-[1.8] text-[#5c677d]">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </section>

      {/* ══════ PRICING BY SERVICE ══════ */}
      <section className="bg-[#f5f1e9] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="fade-up mb-12 text-center" style={fadeUpStyle}>
            {label(pricing?.eyebrow || "Pricing")}
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              {pricing?.title}
            </h2>
            {pricing?.subtitle ? (
              <p className="mx-auto mt-5 max-w-[700px] text-[17px] leading-[1.75] text-[#5c677d]">{pricing.subtitle}</p>
            ) : null}
          </div>
          <div className="fade-up grid gap-6 md:grid-cols-1 lg:grid-cols-2" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
            {(pricing?.items || []).map((item: any, index: number) => (
              <article
                key={`${item.title || "pricing"}-${index}`}
                className="rounded-[12px] border border-[rgba(30,43,67,0.06)] border-l-[3px] border-l-[#bc9155] bg-white p-7 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(30,43,67,0.08)]"
              >
                <h3 className="text-[20px] font-bold text-[#1e2b43]">{item.title}</h3>
                {item.summary ? <p className="mt-2 text-[14px] leading-[1.75] text-[#5c677d]">{item.summary}</p> : null}
                <div className="mt-4">
                  {(item.tiers || []).map((tier: any, tierIndex: number) => (
                    <div
                      key={`${item.title}-tier-${tierIndex}`}
                      className={cls(
                        "flex items-center justify-between py-[10px] text-[14px]",
                        tierIndex < (item.tiers || []).length - 1 ? "border-b border-[rgba(30,43,67,0.06)]" : "",
                      )}
                    >
                      <span className="font-medium text-[#5c677d]">{tier.label}</span>
                      <span className="font-bold text-[#1e2b43]">{tier.price}</span>
                    </div>
                  ))}
                </div>
                {item.url ? (
                  <div className="mt-3 flex items-center justify-end border-t border-[rgba(30,43,67,0.06)] pt-[10px]">
                    {linkNode(
                      item.url,
                      <>
                        <span>{item.cta_label || "View Full Details"}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </>,
                      "inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#bc9155] transition-all duration-300 hover:gap-2.5",
                    )}
                  </div>
                ) : null}
              </article>
            ))}

            {/* CTA card */}
            {pricing?.cta_card ? (
              <article className="flex flex-col items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,#1e2b43_0%,#151e30_100%)] p-10 text-center text-white">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#bc9155" strokeWidth="1.5" className="mb-5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <h3 className="text-[22px] font-bold text-white">{pricing.cta_card.title}</h3>
                <p className="mt-3 max-w-[420px] text-[14px] leading-[1.7] text-white/70">{pricing.cta_card.body}</p>
                <div className="mt-6 flex w-full max-w-[320px] flex-col gap-2.5">
                  {pricing.cta_card.url
                    ? linkNode(
                        pricing.cta_card.url,
                        <span className="flex items-center justify-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          {pricing.cta_card.label}
                        </span>,
                        "flex min-h-[48px] items-center justify-center rounded-[6px] bg-[#bc9155] px-5 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#a57d48]",
                      )
                    : null}
                  {pricing.cta_card.secondary_url
                    ? linkNode(
                        pricing.cta_card.secondary_url,
                        pricing.cta_card.subtext,
                        "flex min-h-[48px] items-center justify-center rounded-[6px] border border-[#bc9155] px-5 text-[14px] font-semibold text-[#bc9155] transition-all duration-200 hover:bg-[#bc9155] hover:text-white",
                      )
                    : null}
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </section>

      {/* ══════ COST FACTORS ══════ */}
      <section className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="fade-up mb-12 text-center" style={fadeUpStyle}>
            {label(factors?.eyebrow || "Cost Factors")}
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              {factors?.title}
            </h2>
            {factors?.content ? (
              <p className="mx-auto mt-5 max-w-[700px] text-[17px] leading-[1.75] text-[#5c677d]">{factors.content}</p>
            ) : null}
          </div>
          <div className="fade-up grid gap-6 sm:grid-cols-2 xl:grid-cols-3" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
            {(factors?.cards || []).map((card: any, index: number) => (
              <article
                key={`${card.title}-${index}`}
                className="rounded-[12px] bg-[#f5f1e9] p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(30,43,67,0.08)]"
              >
                <div className="mb-4 flex justify-center">{pickFactorIcon(card.title)}</div>
                <h3 className="mb-2 font-sans text-[16px] font-semibold text-[#1e2b43]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {card.title}
                </h3>
                <p className="text-[14px] leading-[1.7] text-[#5c677d]">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ LOCAL MARKET ══════ */}
      <section className="bg-[#f5f1e9] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          <div className="fade-up" style={fadeUpStyle}>
            {label(local?.eyebrow || "Local Context")}
            <h2 className="mb-5 font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              {local?.title}
            </h2>
          </div>
          <div className="fade-up" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
            {(local?.content || "")
              .split("\n\n")
              .filter(Boolean)
              .map((paragraph: string, index: number) => (
                <p key={index} className="mt-4 text-[16px] leading-[1.8] text-[#5c677d]">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </section>

      {/* ══════ INSURANCE RECONSTRUCTION ══════ */}
      <section className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          <div className="fade-up" style={fadeUpStyle}>
            {label(insurance?.eyebrow || "Insurance Work")}
            <h2 className="mb-5 font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              {insurance?.title}
            </h2>
          </div>
          <div className="fade-up" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
            {(insurance?.content || "")
              .split("\n\n")
              .filter(Boolean)
              .map((paragraph: string, index: number) => (
                <p key={index} className="mt-4 text-[16px] leading-[1.8] text-[#5c677d]">
                  {paragraph}
                </p>
              ))}
          </div>
          {/* Insurance carrier chips — rectangular pills matching reference */}
          <div className="fade-up mx-auto mt-8 grid max-w-[700px] grid-cols-5 gap-3" style={{ ...fadeUpStyle, transitionDelay: "0.25s" }}>
            {(insurance?.chips || []).map((chip: string, index: number) => (
              <span
                key={`${chip}-${index}`}
                className="rounded-[8px] border border-[rgba(30,43,67,0.06)] bg-[#f5f1e9] px-2 py-3 text-center text-[13px] font-semibold text-[#1e2b43] transition-all duration-200 hover:border-[#bc9155] hover:shadow-[0_2px_8px_rgba(188,145,85,0.15)]"
              >
                {chip}
              </span>
            ))}
          </div>
          {insurance?.note ? (
            <p className="mt-6 text-[13px] leading-[1.6] italic text-[#5c677d]">{insurance.note}</p>
          ) : null}
        </div>
      </section>

      {/* ══════ WHERE WE WORK ══════ */}
      <AreasSection data={areas} />

      {/* ══════ TRUST STRIP (below Where We Work) ══════ */}
      <PricingTrustStrip data={trustStripCms} />

      {/* ══════ TRUSTED BRANDS — marquee carousel ══════ */}
      <section className="border-t border-[rgba(30,43,67,0.08)] bg-white px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="fade-up mb-10 text-center" style={fadeUpStyle}>
            {label("Trusted Brands")}
            <h2 className="mx-auto max-w-[780px] font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              {logos?.title || "Materials We Stand Behind"}
            </h2>
            {logos?.subtitle ? (
              <p className="mx-auto mt-5 max-w-[700px] text-[17px] leading-[1.75] text-[#5c677d]">{logos.subtitle}</p>
            ) : null}
          </div>
          <div className="fade-up" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
            <BrandsMarquee items={logos?.items || []} />
          </div>
        </div>
      </section>

      {/* ══════ LEAD FORM ══════ */}
      <LeadFormSection page={page} data={lead} accent="Project" />

      {/* ══════ FINANCING ══════ */}
      <FinancingStrip data={financing} />

      <style jsx global>{`
        .pricing-page .pricing-hero-ctas {
          display: flex;
          gap: 14px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }
        .pricing-page .pricing-hero-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 8px;
          background: rgba(10, 18, 35, 0.42);
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #fff;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.3px;
          white-space: nowrap;
          transition: background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .pricing-page .pricing-hero-cta-btn:hover {
          background: rgba(10, 18, 35, 0.62);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }
        .pricing-page .pricing-hero-cta-primary {
          background: #bc9155;
          border: 1px solid #bc9155;
          color: #fff;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }
        .pricing-page .pricing-hero-cta-primary:hover {
          background: #d4a95a;
          border-color: #d4a95a;
          box-shadow: 0 8px 24px rgba(188, 145, 85, 0.4);
        }
        .pricing-page .pricing-hero-cta-btn:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 2px;
          box-shadow: 0 0 0 4px rgba(188, 145, 85, 0.4);
        }
        @media (max-width: 768px) {
          .pricing-page .pricing-hero-ctas {
            flex-direction: column;
            align-items: center;
          }
          .pricing-page .pricing-hero-cta-btn {
            min-height: 44px;
            width: 100%;
            max-width: 300px;
            justify-content: center;
            font-size: 14px;
            padding: 12px 24px;
          }
        }
      `}</style>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Pricing-specific AreasSection with reference-matched hover
   ──────────────────────────────────────────────────────────── */
import { ArrowRight } from "lucide-react";

function PricingAreasSection({ data }: { data: any }) {
  const [countyOpen, setCountyOpen] = useState<Record<number, boolean>>({});
  const titleParts = parts(data?.title, data?.highlight_text);
  const areasFadeRef = useFadeUp();
  const counties = data?.counties || [];
  const expandableCount = counties.filter((county: any) => (county.extra_towns || []).length > 0).length;
  const expandedCount = counties.filter((county: any, index: number) => (county.extra_towns || []).length > 0 && countyOpen[index]).length;
  const shouldMatchCardHeights = expandedCount === 0 || (expandableCount > 0 && expandedCount === expandableCount);

  return (
    <section ref={areasFadeRef} className="bg-[#f5f1e9] px-5 py-20 md:px-10">
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

        <div className={cls("fade-up grid gap-8 lg:grid-cols-2", shouldMatchCardHeights ? "items-stretch" : "items-start")} style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
          {counties.map((county: any, index: number) => {
            const expanded = !!countyOpen[index];
            const mainTowns = county.towns || [];
            const extraTowns = county.extra_towns || [];
            const towns = expanded ? [...mainTowns, ...extraTowns] : mainTowns;
            const links = county.town_links || {};

            return (
              <article
                key={`${county.name || "county"}-${index}`}
                className={cls(
                  "flex flex-col overflow-hidden rounded-[12px] border-b-[3px] border-b-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1.5 hover:border-b-[#bc9155] hover:shadow-[0_16px_40px_rgba(30,43,67,0.1),0_32px_64px_rgba(30,43,67,0.08)]",
                  shouldMatchCardHeights && "h-full",
                )}
              >
                {/* Image with gradient overlay + zoom on hover */}
                <div className="group relative h-[220px] overflow-hidden">
                  <img
                    src={media(county.image, index === 0 ? "/images/areas/fairfield-county.jpg" : "/images/areas/new-haven-county.jpg")}
                    alt={county.image_alt || county.name || "BuiltWell CT service area"}
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

                  {/* Town pills */}
                  <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {towns.map((town: string, townIndex: number) => {
                      const hasLink = !!links[town];
                      const isMainRow = townIndex < mainTowns.length;
                      if (hasLink && isMainRow) {
                        // Linked towns in first rows: full gold hover
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
                      // Non-linked / extra towns: text-only color hover
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
          <p className="mt-8 text-center text-[14px] text-[#5c677d]">
            {data.note}
          </p>
        ) : null}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Brands marquee — infinite auto-scrolling carousel
   ──────────────────────────────────────────────────────────── */
function PricingTrustStrip({ data }: { data?: { items?: Array<{ url?: string }> } }) {
  const items = [
    {
      url: data?.items?.[0]?.url || "https://www.google.com/search?q=builtwell+ct+reviews",
      label: "Google Rating 4.9",
      ariaLabel: "Google Rating 4.9",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#bc9155" stroke="none" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      url: data?.items?.[1]?.url || "https://www.houzz.com/professionals/general-contractors/builtwell-ct",
      label: "Trusted on Houzz",
      ariaLabel: "Trusted on Houzz",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      url: data?.items?.[2]?.url || "https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx",
      label: "CT HIC License #0668405",
      ariaLabel: "CT HIC License #0668405",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M8 2v4M16 2v4M3 10h18" />
        </svg>
      ),
    },
    {
      url: data?.items?.[3]?.url || "https://www.angi.com/companylist/us/ct/orange/builtwell-ct-reviews-",
      label: "Verified on Angi",
      ariaLabel: "Verified on Angi",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="pricing-trust-strip" role="region" aria-label="Trust indicators">
      <div className="pricing-trust-strip-inner">
        {items.map((item, index) => (
          <div key={`${item.label}-${index}`} className="contents">
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              aria-label={item.ariaLabel}
              className="pricing-trust-strip-item"
            >
              <span className="pricing-trust-strip-icon">{item.icon}</span>
              <span>{item.label}</span>
            </a>
            {index < items.length - 1 ? <div className="pricing-trust-strip-divider" /> : null}
          </div>
        ))}
      </div>
      <style jsx global>{`
        .pricing-page .pricing-trust-strip {
          background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%);
          padding: 56px 40px;
          position: relative;
          overflow: hidden;
        }
        .pricing-page .pricing-trust-strip::before {
          content: "";
          position: absolute;
          inset: 0;
          background: url("/hero/builtwell-job-site-aerial-hero-ct.jpg") center/cover no-repeat;
          opacity: 0.1;
        }
        .pricing-page .pricing-trust-strip-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        .pricing-page .pricing-trust-strip-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.4px;
          line-height: 1.35;
          white-space: nowrap;
          text-decoration: none;
          transition: all 0.3s;
          padding: 20px 32px;
          flex: 1;
          min-width: 180px;
          text-align: center;
          transform: translateY(0);
        }
        .pricing-page .pricing-trust-strip-item:hover {
          color: #bc9155;
          transform: translateY(-2px);
        }
        .pricing-page .pricing-trust-strip-icon {
          color: #bc9155;
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 2px 4px rgba(188, 145, 85, 0.3));
        }
        .pricing-page .pricing-trust-strip-icon svg {
          width: 22px;
          height: 22px;
        }
        .pricing-page .pricing-trust-strip-divider {
          width: 1px;
          height: 40px;
          background: rgba(188, 145, 85, 0.3);
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .pricing-page .pricing-trust-strip {
            padding: 40px 20px;
          }
          .pricing-page .pricing-trust-strip-inner {
            gap: 16px 0;
          }
          .pricing-page .pricing-trust-strip-item {
            min-width: calc(50% - 8px);
            padding: 16px 20px;
          }
          .pricing-page .pricing-trust-strip-divider {
            display: none;
          }
        }
        @media (max-width: 520px) {
          .pricing-page .pricing-trust-strip-item {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

function BrandsMarquee({ items }: { items: any[] }) {
  if (!items.length) return null;
  // Double the items for seamless loop
  const doubled = [...items, ...items];
  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className="flex w-max items-center gap-12 hover:[animation-play-state:paused]"
        style={{ animation: "servicesLogoMarquee 32s linear infinite" }}
      >
        {doubled.map((item: any, index: number) => (
          <div
            key={`brand-${index}`}
            className="flex h-[72px] flex-shrink-0 items-center justify-center px-8 opacity-55 transition-opacity duration-200 hover:opacity-100"
          >
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer" title={item.name}>
                <img
                  src={media(item.logo)}
                  alt={item.logo_alt || item.name || "Brand logo"}
                  className="h-[52px] w-auto max-w-[200px] object-contain"
                />
              </a>
            ) : (
              <img
                src={media(item.logo)}
                alt={item.logo_alt || item.name || "Brand logo"}
                className="h-[52px] w-auto max-w-[200px] object-contain"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
